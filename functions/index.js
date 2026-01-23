const functions = require('firebase-functions')
const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')

// Initialiser Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp()
}

const app = express()

// Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.egenttogo.com'
const SITE_URL = 'https://egenttogo-edc4e.web.app'
const CACHE_DIR = '/tmp/prerendered'

// Middleware
app.use(cors())
app.use(express.json())

// ============================================
// 🚀 NOUVELLE FONCTION: Articles avec Meta Tags
// ============================================

/**
 * Échapper les caractères HTML
 */
function escapeHtml(text) {
  if (!text) return ''
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Formater la date en français
 */
function formatDate(dateStr) {
  if (!dateStr) return new Date().toLocaleDateString('fr-FR')
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch (e) {
    return String(dateStr)
  }
}

/**
 * Route pour les articles: Génère HTML statique avec meta tags OG
 */
app.get('/article/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const userAgent = (req.headers['user-agent'] || '').toLowerCase()

    // Valider le slug
    if (!slug || slug.includes('..') || slug.includes('/')) {
      return res.status(400).send('<h1>Slug invalide</h1>')
    }

    console.log(`[Article] Requête: ${slug}`)
    console.log(`[Article] User-Agent: ${userAgent.substring(0, 80)}...`)

    // Récupérer l'article depuis Firestore
    const snapshot = await admin.firestore()
      .collection('articles')
      .where('slug', '==', slug)
      .limit(1)
      .get()

    if (snapshot.empty) {
      console.log(`[Article] ❌ Non trouvé: ${slug}`)
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Article non trouvé</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 40px;">
          <h1>Article non trouvé</h1>
          <p><a href="${SITE_URL}/">Retour à l'accueil</a></p>
        </body>
        </html>
      `)
    }

    const article = snapshot.docs[0].data()
    
    // Préparer les données avec échappement HTML
    const titre = escapeHtml(article.title || article.titre || 'Article')
    const description = escapeHtml(article.excerpt || article.description || article.extrait || titre)
    const image = article.image || article.imagePrincipale || article.coverImage || `${SITE_URL}/og-default.png`
    const articleUrl = `${SITE_URL}/article/${slug}`
    const date = article.date ? formatDate(article.date) : formatDate(new Date())
    const author = escapeHtml(article.author || article.auteur || 'EGENT-TOGO')
    const category = escapeHtml(article.category || article.categorie || 'Actualités')

    console.log(`[Article] ✅ Trouvé: ${titre}`)
    console.log(`[Article] Image: ${image}`)

    // Générer le HTML avec meta tags
    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Meta tags de base -->
  <title>${titre} - EGENT-TOGO</title>
  <meta name="description" content="${description}">
  <meta name="author" content="${author}">
  
  <!-- Open Graph (Facebook, WhatsApp, LinkedIn, Discord) -->
  <meta property="og:title" content="${titre}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="EGENT-TOGO" />
  <meta property="og:locale" content="fr_FR" />
  
  <!-- Article spécifique -->
  <meta property="article:published_time" content="${article.date || new Date().toISOString()}" />
  <meta property="article:author" content="${author}" />
  <meta property="article:section" content="${category}" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${titre}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  
  <!-- Redirection automatique vers la SPA Vue.js -->
  <meta http-equiv="refresh" content="0;url=/#/article/${slug}">
  <link rel="canonical" href="${articleUrl}" />
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #016E98 0%, #0392C7 100%);
      color: white;
      padding: 20px;
    }
    
    .container {
      text-align: center;
      max-width: 500px;
    }
    
    .loader {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 30px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    h1 {
      font-size: 28px;
      margin-bottom: 15px;
      font-weight: 700;
    }
    
    p {
      font-size: 16px;
      margin: 15px 0;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    a {
      color: #FF9D35;
      text-decoration: none;
      font-weight: 600;
      transition: opacity 0.3s ease;
    }
    
    a:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
    
    .article-info {
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 12px;
      margin-top: 30px;
      font-size: 14px;
    }
    
    .article-info strong {
      color: #FF9D35;
    }
  </style>
  
  <script>
    // Redirection immédiate
    if (window.location.hash !== '#/article/${slug}') {
      window.location.href = '/#/article/${slug}';
    }
  </script>
</head>
<body>
  <div class="container">
    <div class="loader"></div>
    <h1>Chargement de l'article...</h1>
    <p>${titre}</p>
    <p><a href="/#/article/${slug}">Cliquez ici si vous n'êtes pas redirigé automatiquement</a></p>
    
    <div class="article-info">
      <p><strong>Catégorie:</strong> ${category}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Auteur:</strong> ${author}</p>
    </div>
  </div>
</body>
</html>`

    // Configuration du cache: 1 heure pour les crawlers, 5 minutes pour les utilisateurs
    const isCrawler = userAgent.includes('facebookexternalhit') ||
                      userAgent.includes('twitterbot') ||
                      userAgent.includes('linkedinbot') ||
                      userAgent.includes('whatsapp') ||
                      userAgent.includes('telegram') ||
                      userAgent.includes('googlebot') ||
                      userAgent.includes('bingbot') ||
                      userAgent.includes('discordbot') ||
                      userAgent.includes('pinterest')

    const cacheTime = isCrawler ? 3600 : 300
    res.set('Cache-Control', \`public, max-age=\${cacheTime}, s-maxage=\${cacheTime}\`)
    res.set('Content-Type', 'text/html; charset=utf-8')
    res.send(html)

  } catch (error) {
    console.error('[Article] ❌ Erreur:', error)
    res.status(500).send(\`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Erreur</title>
      </head>
      <body style="font-family: sans-serif; padding: 40px; text-align: center;">
        <h1>❌ Erreur du serveur</h1>
        <p>Une erreur s'est produite lors du chargement de l'article.</p>
        <p><a href="${SITE_URL}/">Retour à l'accueil</a></p>
        <pre style="text-align: left; background: #f5f5f5; padding: 20px; overflow-x: auto;">
\${error.message}
        </pre>
      </body>
      </html>
    \`)
  }
})

// Instance Puppeteer
let browser

/**
 * Initialiser Puppeteer
 */
async function initBrowser() {
  if (!browser) {
    console.log('[Puppeteer] Lancement du navigateur...')
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    })
  }
  return browser
}

/**
 * Déterminer si c'est un crawler social
 */
function isCrawler(userAgent) {
  const crawlers = [
    'facebookexternalhit',      // Facebook
    'twitterbot',               // Twitter/X
    'linkedinbot',              // LinkedIn
    'whatsapp',                 // WhatsApp - IMPORTANT!
    'telegram',                 // Telegram
    'slurp',                    // Yahoo
    'googlebot',                // Google
    'bingbot',                  // Bing
    'yandexbot',                // Yandex
    'baiduspider',              // Baidu
    'discordbot',               // Discord
    'pinterest',                // Pinterest
    'vkontakte',                // VK
    'duckduckbot'               // DuckDuckGo
  ]
  
  const userAgentLower = userAgent.toLowerCase()
  const detected = crawlers.some(crawler => userAgentLower.includes(crawler))
  
  if (detected) {
    console.log(`[Crawler] Détecté: ${userAgent}`)
  }
  
  return detected
}

/**
 * Pré-rendre une page avec Puppeteer
 */
async function prerenderPage(url) {
  try {
    console.log(`[Prerender] Chargement: ${url}`)
    
    const browser = await initBrowser()
    const page = await browser.newPage()

    // Charger la page
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    })

    // Attendre les meta tags OG
    console.log('[Prerender] En attente des meta tags OG...')
    await page.waitForSelector('meta[property="og:title"]', { timeout: 5000 }).catch(() => {
      console.warn('[Prerender] Meta tags OG non trouvés, continuant...')
    })
    
    // Buffer supplémentaire pour s'assurer
    await page.waitForTimeout(500)

    // Récupérer le HTML généré
    const html = await page.content()
    await page.close()

    console.log('[Prerender] ✅ Succès')
    return html
  } catch (error) {
    console.error(`[Prerender] ❌ Erreur:`, error.message)
    throw error
  }
}

/**
 * API: Prérender un article
 */
app.get('/api/prerender/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    // Valider le slug
    if (!slug || slug.includes('..') || slug.includes('/')) {
      return res.status(400).json({ error: 'Slug invalide' })
    }

    console.log(`[API] Requête prerender: ${slug}`)

    const url = `${FRONTEND_URL}/article/${slug}`
    const html = await prerenderPage(url)
    
    res.header('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  } catch (error) {
    console.error('[API] Erreur:', error)
    res.status(500).json({ 
      error: 'Erreur lors du prerendering',
      message: error.message 
    })
  }
})

/**
 * Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    frontendUrl: FRONTEND_URL,
    environment: process.env.NODE_ENV || 'development'
  })
})

/**
 * Fallback: Router pour les crawlers sociaux
 */
app.get('*', (req, res) => {
  const userAgent = req.headers['user-agent'] || ''

  console.log(`[Router] Requête: ${req.path}`)

  // Si c'est un crawler: essayer de pré-rendre
  if (isCrawler(userAgent)) {
    const match = req.path.match(/\/article\/([^/?]+)/)
    if (match) {
      const slug = match[1]
      console.log(`[Router] Détecté crawler pour article: ${slug}`)
      
      prerenderPage(`${FRONTEND_URL}/article/${slug}`)
        .then(html => {
          console.log('[Router] ✅ HTML pré-rendu envoyé au crawler')
          res.header('Content-Type', 'text/html; charset=utf-8')
          res.send(html)
        })
        .catch(error => {
          console.error('[Router] ❌ Erreur prerender fallback:', error)
          res.status(500).send('<h1>Erreur prerendering</h1>')
        })
      return
    }
  }

  // Pour les utilisateurs normaux: répondre avec 404
  // (Firebase Hosting servira index.html via rewrites)
  console.log('[Router] Utilisateur normal, laissez Hosting gérer')
  res.status(404).send('Not Found')
})

// Exporter comme Cloud Function HTTPS
exports.prerender = functions
  .https
  .onRequest(app)
