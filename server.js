/**
 * Serveur Prerendering pour EGENT-TOGO
 * Génère les pages HTML avec métadonnées pour les crawlers sociaux
 * 
 * Installation:
 * npm install express puppeteer cors dotenv
 * 
 * Usage:
 * node server.js
 */

import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const CACHE_DIR = path.join(__dirname, 'prerendered');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures

// Middleware
app.use(cors());
app.use(express.json());

// Créer le répertoire cache s'il n'existe pas
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Instance Puppeteer
let browser;

/**
 * Initialiser le navigateur Puppeteer
 */
async function initBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage', // Pour éviter les problèmes de mémoire
        '--disable-gpu'
      ]
    });
  }
  return browser;
}

/**
 * Générer la page avec Puppeteer
 */
async function prerenderPage(url) {
  try {
    const browser = await initBrowser();
    const page = await browser.newPage();

    // Attendre que le contenu soit chargé
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Attendre les métadonnées du robot
    await page.waitForSelector('meta[property="og:title"]', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(500); // Buffer supplémentaire

    // Récupérer le HTML rendu
    const html = await page.content();

    // Fermer la page
    await page.close();

    return html;
  } catch (error) {
    console.error(`Erreur prerendering ${url}:`, error);
    throw error;
  }
}

/**
 * Obtenir le chemin du cache
 */
function getCachePath(slug) {
  return path.join(CACHE_DIR, `${slug}.html`);
}

/**
 * Vérifier si le cache est valide
 */
function isCacheValid(cachePath) {
  if (!fs.existsSync(cachePath)) return false;

  const stats = fs.statSync(cachePath);
  const age = Date.now() - stats.mtimeMs;

  return age < CACHE_TTL;
}

/**
 * Récupérer depuis le cache ou générer
 */
async function getPrerenderedPage(slug) {
  const cachePath = getCachePath(slug);

  // Vérifier le cache
  if (isCacheValid(cachePath)) {
    console.log(`📦 Cache hit: ${slug}`);
    return fs.readFileSync(cachePath, 'utf-8');
  }

  // Générer la page
  console.log(`🤖 Prerendering: ${slug}`);
  const url = `${FRONTEND_URL}/actualites/${slug}`;
  const html = await prerenderPage(url);

  // Sauvegarder dans le cache
  fs.writeFileSync(cachePath, html, 'utf-8');
  console.log(`💾 Sauvegardé en cache: ${slug}`);

  return html;
}

/**
 * Middleware pour déterminer si c'est un crawler
 */
function isCrawler(userAgent) {
  const crawlers = [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
    'slurp',
    'googlebot',
    'bingbot',
    'yandexbot',
    'baiduspider'
  ];

  return crawlers.some(crawler => userAgent.toLowerCase().includes(crawler));
}

/**
 * API: Prerender une page article
 */
app.get('/api/prerender/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Valider le slug
    if (!slug || slug.includes('..')) {
      return res.status(400).json({ error: 'Slug invalide' });
    }

    const html = await getPrerenderedPage(slug);
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('Erreur API prerender:', error);
    res.status(500).json({ 
      error: 'Erreur lors du prerendering',
      message: error.message 
    });
  }
});

/**
 * API: Métadonnées d'un article
 */
app.get('/api/metadata/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Ici, vous pourriez charger les données depuis une DB ou un fichier
    // Pour cet exemple, on renvoie une structure générique
    const metadata = {
      slug,
      title: `Article: ${slug}`,
      description: `Description de l'article: ${slug}`,
      image: `${FRONTEND_URL}/src/assets/images/article-${slug}.jpg`,
      url: `${FRONTEND_URL}/actualites/${slug}`,
      type: 'article',
      updatedAt: new Date().toISOString()
    };

    res.json(metadata);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: Rafraîchir le cache
 */
app.post('/api/cache/refresh/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const cachePath = getCachePath(slug);

    // Supprimer le cache
    if (fs.existsSync(cachePath)) {
      fs.unlinkSync(cachePath);
      console.log(`🗑️ Cache supprimé: ${slug}`);
    }

    // Générer une nouvelle version
    const html = await getPrerenderedPage(slug);

    res.json({
      success: true,
      message: `Cache rafraîchi: ${slug}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * API: Santé du serveur
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    frontendUrl: FRONTEND_URL,
    cacheDir: CACHE_DIR
  });
});

/**
 * Servir les fichiers statiques (build Vue)
 */
app.use(express.static('dist'));

/**
 * Fallback pour les routes du frontend
 */
app.get('*', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';

  // Si c'est un crawler, essayer de prerender
  if (isCrawler(userAgent)) {
    const match = req.path.match(/\/actualites\/([^/]+)/);
    if (match) {
      const slug = match[1];
      getPrerenderedPage(slug)
        .then(html => {
          res.header('Content-Type', 'text/html; charset=utf-8');
          res.send(html);
        })
        .catch(error => {
          console.error('Erreur prerendering fallback:', error);
          res.sendFile(path.join(__dirname, 'dist', 'index.html'));
        });
      return;
    }
  }

  // Pour les utilisateurs normaux, servir l'app Vue
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/**
 * Graceful shutdown
 */
process.on('SIGINT', async () => {
  console.log('\n🛑 Fermeture du serveur...');
  if (browser) {
    await browser.close();
  }
  process.exit(0);
});

/**
 * Démarrer le serveur
 */
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🤖 Serveur Prerendering EGENT-TOGO    ║
║  Port: ${PORT}                            ║
║  Frontend: ${FRONTEND_URL}        ║
║  Cache: ${CACHE_DIR}       ║
╚════════════════════════════════════════╝
  `);
});

export default app;
