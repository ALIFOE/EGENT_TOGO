const functions = require('firebase-functions')
const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()

// Configuration
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.egenttogo.com'
const CACHE_DIR = '/tmp/prerendered'

// Middleware
app.use(cors())
app.use(express.json())

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
