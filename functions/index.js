const functions = require('firebase-functions')
const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const admin = require('firebase-admin')
const nodemailer = require('nodemailer')

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
// � HELPER FUNCTIONS FOR EMAIL
// ============================================

/**
 * Configurer le transporteur Nodemailer avec Gmail
 */
const getTransporter = () => {
  const gmailUser = process.env.GMAIL_USER || 'egenttogo@gmail.com'
  const gmailPassword = process.env.GMAIL_APP_PASSWORD
  
  if (!gmailPassword) {
    console.warn('⚠️ GMAIL_APP_PASSWORD non configuré.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword || 'dummy'
    }
  })
}

/**
 * Obtenir le nom du service
 */
const getServiceName = (serviceId) => {
  const services = {
    'panneaux-solaires': 'Panneaux solaires',
    'electricite-generale': 'Électricité générale',
    'climatisation': 'Climatisation',
    'plomberie': 'Plomberie',
    'fournitures': 'Fourniture d\'équipements',
    'consulting': 'Consulting'
  }
  return services[serviceId] || serviceId
}

/**
 * Formater les données du devis pour l'email
 */
const formatQuoteData = (quoteData) => {
  const serviceInfo = []
  
  switch(quoteData.service) {
    case 'panneaux-solaires':
      if (quoteData.energyConsumption) serviceInfo.push(`<tr><td><strong>Consommation énergétique:</strong></td><td>${quoteData.energyConsumption} kWh/mois</td></tr>`)
      if (quoteData.roofArea) serviceInfo.push(`<tr><td><strong>Surface du toit:</strong></td><td>${quoteData.roofArea} m²</td></tr>`)
      if (quoteData.buildingType) serviceInfo.push(`<tr><td><strong>Type de bâtiment:</strong></td><td>${quoteData.buildingType}</td></tr>`)
      if (quoteData.appliances) serviceInfo.push(`<tr><td><strong>Électroménagers:</strong></td><td>${quoteData.appliances}</td></tr>`)
      break
    
    case 'electricite-generale':
      if (quoteData.installationType) serviceInfo.push(`<tr><td><strong>Type d'installation:</strong></td><td>${quoteData.installationType}</td></tr>`)
      if (quoteData.power) serviceInfo.push(`<tr><td><strong>Puissance requise:</strong></td><td>${quoteData.power} kW</td></tr>`)
      if (quoteData.distributionPoints) serviceInfo.push(`<tr><td><strong>Points de distribution:</strong></td><td>${quoteData.distributionPoints}</td></tr>`)
      break
    
    case 'climatisation':
      if (quoteData.buildingType) serviceInfo.push(`<tr><td><strong>Type de bâtiment:</strong></td><td>${quoteData.buildingType}</td></tr>`)
      if (quoteData.areaToClimate) serviceInfo.push(`<tr><td><strong>Surface à climatiser:</strong></td><td>${quoteData.areaToClimate} m²</td></tr>`)
      if (quoteData.climateType) serviceInfo.push(`<tr><td><strong>Type de climatisation:</strong></td><td>${quoteData.climateType}</td></tr>`)
      if (quoteData.appliances) serviceInfo.push(`<tr><td><strong>Équipements:</strong></td><td>${quoteData.appliances}</td></tr>`)
      break
    
    case 'plomberie':
      if (quoteData.plumbingType) serviceInfo.push(`<tr><td><strong>Type de travaux:</strong></td><td>${quoteData.plumbingType}</td></tr>`)
      if (quoteData.waterPoints) serviceInfo.push(`<tr><td><strong>Points d'eau:</strong></td><td>${quoteData.waterPoints}</td></tr>`)
      if (quoteData.material) serviceInfo.push(`<tr><td><strong>Matériau:</strong></td><td>${quoteData.material}</td></tr>`)
      break
    
    case 'fournitures':
      if (quoteData.equipmentType) serviceInfo.push(`<tr><td><strong>Type d'équipement:</strong></td><td>${quoteData.equipmentType}</td></tr>`)
      if (quoteData.quantity) serviceInfo.push(`<tr><td><strong>Quantité:</strong></td><td>${quoteData.quantity}</td></tr>`)
      if (quoteData.preferredBrand) serviceInfo.push(`<tr><td><strong>Marque préférée:</strong></td><td>${quoteData.preferredBrand}</td></tr>`)
      break
    
    case 'consulting':
      if (quoteData.consultingType) serviceInfo.push(`<tr><td><strong>Type de consulting:</strong></td><td>${quoteData.consultingType}</td></tr>`)
      if (quoteData.duration) serviceInfo.push(`<tr><td><strong>Durée estimée:</strong></td><td>${quoteData.duration} jours</td></tr>`)
      if (quoteData.projectField) serviceInfo.push(`<tr><td><strong>Domaine:</strong></td><td>${quoteData.projectField}</td></tr>`)
      break
  }
  
  return serviceInfo.join('')
}

// ============================================
// 🚀 ARTICLE ROUTES
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
    const author = escapeHtml(article.author || article.auteur || 'EGENT TOGO')
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
  <title>${titre} - EGENT TOGO</title>
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
  <meta property="og:site_name" content="EGENT TOGO" />
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

// ============================================
// 📧 CLOUD FUNCTION HTTP: Envoi des emails de devis
// ============================================

/**
 * Cloud Function HTTP: Envoie les emails de devis
 * Appelée directement depuis le frontend
 * 
 * POST /sendQuoteEmails
 * Body: { quoteData: {...} }
 */
exports.sendQuoteEmails = functions.https.onRequest(async (req, res) => {
  try {
    // Vérifier que c'est une requête POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Méthode non autorisée' })
    }

    const quoteData = req.body
    const quoteId = quoteData.docId // ID du document Firestore

    console.log(`📧 Nouveau devis reçu via HTTP: ${quoteId}`)
    console.log(`Client: ${quoteData.firstName} ${quoteData.lastName}`)
    console.log(`Service: ${quoteData.serviceName}`)

    // Vérifier les données requises
    if (!quoteData.email || !quoteData.firstName || !quoteData.lastName) {
      return res.status(400).json({ error: 'Données incomplètes' })
    }

    const transporter = getTransporter()
    const adminEmail = process.env.ADMIN_EMAIL || 'infos@egenttogo.com'
    const clientEmail = quoteData.email
    const serviceName = quoteData.serviceName || getServiceName(quoteData.service)
    const createdAt = quoteData.createdAt ? new Date(quoteData.createdAt).toLocaleString('fr-FR') : new Date().toLocaleString('fr-FR')

    const serviceDetailsHtml = formatQuoteData(quoteData)

    // ============================================
    // EMAIL 1: À L'ADMINISTRATEUR
    // ============================================
    const adminEmailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #016E98 0%, #0392C7 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #016E98;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #FF9D35;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table tr {
      border-bottom: 1px solid #eee;
    }
    table tr:last-child {
      border-bottom: none;
    }
    table td {
      padding: 12px;
      vertical-align: top;
    }
    table td:first-child {
      font-weight: 600;
      color: #016E98;
      width: 35%;
    }
    .service-badge {
      display: inline-block;
      background-color: #FF9D35;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Nouvelle demande de devis</h1>
      <p>Une demande de devis vient d'être soumise sur votre site</p>
    </div>
    
    <div class="content">
      <div class="section">
        <span class="service-badge">${serviceName}</span>
        <table>
          <tr>
            <td><strong>Date de soumission:</strong></td>
            <td>${createdAt}</td>
          </tr>
          <tr>
            <td><strong>Identifiant du devis:</strong></td>
            <td><code>${quoteId}</code></td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">👤 Informations du client</div>
        <table>
          <tr>
            <td><strong>Nom:</strong></td>
            <td>${quoteData.firstName} ${quoteData.lastName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td><a href="mailto:${clientEmail}">${clientEmail}</a></td>
          </tr>
          <tr>
            <td><strong>Téléphone:</strong></td>
            <td>${quoteData.phone}</td>
          </tr>
          ${quoteData.company ? `<tr><td><strong>Entreprise:</strong></td><td>${quoteData.company}</td></tr>` : ''}
          ${quoteData.position ? `<tr><td><strong>Poste:</strong></td><td>${quoteData.position}</td></tr>` : ''}
          ${quoteData.address ? `<tr><td><strong>Adresse:</strong></td><td>${quoteData.address}</td></tr>` : ''}
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">📋 Détails du service</div>
        <table>
          ${serviceDetailsHtml}
          ${quoteData.installationAddress ? `<tr><td><strong>Lieu d'installation:</strong></td><td>${quoteData.installationAddress}</td></tr>` : ''}
          ${quoteData.budget ? `<tr><td><strong>Budget estimé:</strong></td><td>${quoteData.budget} FCFA</td></tr>` : ''}
        </table>
      </div>
      
      ${quoteData.message ? `
      <div class="section">
        <div class="section-title">💬 Message supplémentaire</div>
        <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #FF9D35;">
          ${quoteData.message.replace(/\n/g, '<br>')}
        </p>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p>Email automatique d'EGENT TOGO • Ne pas répondre à cet email</p>
      <p><a href="https://www.egenttogo.com">www.egenttogo.com</a></p>
    </div>
  </div>
</body>
</html>`

    // ============================================
    // EMAIL 2: AU CLIENT (CONFIRMATION)
    // ============================================
    const clientEmailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #016E98 0%, #0392C7 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .success-box {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .info-box {
      background-color: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5576;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table tr {
      border-bottom: 1px solid #eee;
    }
    table td {
      padding: 12px;
      vertical-align: top;
    }
    table td:first-child {
      font-weight: 600;
      color: #016E98;
      width: 35%;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Merci pour votre demande</h1>
      <p>Votre demande de devis a bien été reçue</p>
    </div>
    
    <div class="content">
      <div class="success-box">
        <strong>✓ Succès!</strong> Votre demande de devis a bien été envoyée et enregistrée. Notre équipe l'examinera et vous contactera très bientôt avec un devis détaillé.
      </div>
      
      <div class="section">
        <table>
          <tr>
            <td><strong>Service:</strong></td>
            <td>${serviceName}</td>
          </tr>
          <tr>
            <td><strong>Référence:</strong></td>
            <td><code style="background-color: #f5f5f5; padding: 4px 8px; border-radius: 3px;">${quoteId}</code></td>
          </tr>
        </table>
      </div>
      
      <div class="info-box">
        <strong>📞 Délai de réponse:</strong> Notre équipe vous contactera par téléphone ou par email d'ici 24 à 48 heures.
      </div>
    </div>
    
    <div class="footer">
      <p>Merci d'avoir choisi EGENT TOGO</p>
      <p><a href="https://www.egenttogo.com">www.egenttogo.com</a></p>
    </div>
  </div>
</body>
</html>`

    // ============================================
    // ENVOYER LES EMAILS
    // ============================================

    // Email à l'admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'egenttogo@gmail.com',
      to: adminEmail,
      subject: `[NOUVEAU DEVIS] ${serviceName} - ${quoteData.firstName} ${quoteData.lastName}`,
      html: adminEmailHtml,
      replyTo: clientEmail
    })
    console.log(`✅ Email admin envoyé à ${adminEmail}`)

    // Email de confirmation au client
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'egenttogo@gmail.com',
      to: clientEmail,
      subject: '✅ Votre demande de devis a bien été reçue - EGENT TOGO',
      html: clientEmailHtml
    })
    console.log(`✅ Email de confirmation envoyé à ${clientEmail}`)

    return res.status(200).json({
      success: true,
      message: 'Emails envoyés avec succès',
      quoteId: quoteId
    })

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi des emails:', error)
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// ============================================
// 📧 CLOUD FUNCTION: Envoi des emails de devis
// ============================================

/**
 * Configurer le transporteur Nodemailer avec Gmail
 * Variables d'environnement requises:
 * - GMAIL_USER: votre email Gmail
 * - GMAIL_APP_PASSWORD: mot de passe d'application Gmail (16 caractères)
 * - ADMIN_EMAIL: email de l'administrateur qui recevra les devis
 */
const getTransporter = () => {
  const gmailUser = process.env.GMAIL_USER || 'egenttogo@gmail.com'
  const gmailPassword = process.env.GMAIL_APP_PASSWORD
  
  if (!gmailPassword) {
    console.warn('⚠️ GMAIL_APP_PASSWORD non configuré. Les emails ne seront pas envoyés.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword || 'dummy'
    }
  })
}

/**
 * Obtenir le nom du service en fonction de l'ID
 */
const getServiceName = (serviceId) => {
  const services = {
    'panneaux-solaires': 'Panneaux solaires',
    'electricite-generale': 'Électricité générale',
    'climatisation': 'Climatisation',
    'plomberie': 'Plomberie',
    'fournitures': 'Fourniture d\'équipements',
    'consulting': 'Consulting'
  }
  return services[serviceId] || serviceId
}

/**
 * Formater les données du devis pour l'email HTML
 */
const formatQuoteData = (quoteData) => {
  const serviceInfo = []
  
  switch(quoteData.service) {
    case 'panneaux-solaires':
      if (quoteData.energyConsumption) serviceInfo.push(`<tr><td><strong>Consommation énergétique:</strong></td><td>${quoteData.energyConsumption} kWh/mois</td></tr>`)
      if (quoteData.roofArea) serviceInfo.push(`<tr><td><strong>Surface du toit:</strong></td><td>${quoteData.roofArea} m²</td></tr>`)
      if (quoteData.buildingType) serviceInfo.push(`<tr><td><strong>Type de bâtiment:</strong></td><td>${quoteData.buildingType}</td></tr>`)
      if (quoteData.appliances) serviceInfo.push(`<tr><td><strong>Électroménagers:</strong></td><td>${quoteData.appliances}</td></tr>`)
      break
    
    case 'electricite-generale':
      if (quoteData.installationType) serviceInfo.push(`<tr><td><strong>Type d'installation:</strong></td><td>${quoteData.installationType}</td></tr>`)
      if (quoteData.power) serviceInfo.push(`<tr><td><strong>Puissance requise:</strong></td><td>${quoteData.power} kW</td></tr>`)
      if (quoteData.distributionPoints) serviceInfo.push(`<tr><td><strong>Nombre de points de distribution:</strong></td><td>${quoteData.distributionPoints}</td></tr>`)
      break
    
    case 'climatisation':
      if (quoteData.buildingType) serviceInfo.push(`<tr><td><strong>Type de bâtiment:</strong></td><td>${quoteData.buildingType}</td></tr>`)
      if (quoteData.areaToClimate) serviceInfo.push(`<tr><td><strong>Surface à climatiser:</strong></td><td>${quoteData.areaToClimate} m²</td></tr>`)
      if (quoteData.climateType) serviceInfo.push(`<tr><td><strong>Type de climatisation:</strong></td><td>${quoteData.climateType}</td></tr>`)
      if (quoteData.appliances) serviceInfo.push(`<tr><td><strong>Équipements:</strong></td><td>${quoteData.appliances}</td></tr>`)
      break
    
    case 'plomberie':
      if (quoteData.plumbingType) serviceInfo.push(`<tr><td><strong>Type de travaux:</strong></td><td>${quoteData.plumbingType}</td></tr>`)
      if (quoteData.waterPoints) serviceInfo.push(`<tr><td><strong>Nombre de points d'eau:</strong></td><td>${quoteData.waterPoints}</td></tr>`)
      if (quoteData.material) serviceInfo.push(`<tr><td><strong>Matériau:</strong></td><td>${quoteData.material}</td></tr>`)
      break
    
    case 'fournitures':
      if (quoteData.equipmentType) serviceInfo.push(`<tr><td><strong>Type d'équipement:</strong></td><td>${quoteData.equipmentType}</td></tr>`)
      if (quoteData.quantity) serviceInfo.push(`<tr><td><strong>Quantité:</strong></td><td>${quoteData.quantity}</td></tr>`)
      if (quoteData.preferredBrand) serviceInfo.push(`<tr><td><strong>Marque préférée:</strong></td><td>${quoteData.preferredBrand}</td></tr>`)
      break
    
    case 'consulting':
      if (quoteData.consultingType) serviceInfo.push(`<tr><td><strong>Type de consulting:</strong></td><td>${quoteData.consultingType}</td></tr>`)
      if (quoteData.duration) serviceInfo.push(`<tr><td><strong>Durée estimée:</strong></td><td>${quoteData.duration} jours</td></tr>`)
      if (quoteData.projectField) serviceInfo.push(`<tr><td><strong>Domaine du projet:</strong></td><td>${quoteData.projectField}</td></tr>`)
      break
  }
  
  return serviceInfo.join('')
}

/**
 * Cloud Function: Se déclenche quand un devis est ajouté
 * Envoie un email à l'admin ET une confirmation au client
 */
exports.onQuoteSubmitted = functions.firestore
  .document('quotes/{quoteId}')
  .onCreate(async (snap, context) => {
    try {
      const quoteData = snap.data()
      const quoteId = context.params.quoteId
      
      console.log(`📧 Nouveau devis reçu: ${quoteId}`)
      console.log(`Client: ${quoteData.firstName} ${quoteData.lastName}`)
      console.log(`Service: ${quoteData.serviceName}`)
      
      const transporter = getTransporter()
      const adminEmail = process.env.ADMIN_EMAIL || 'concealiphe4@gmail.com'
      const clientEmail = quoteData.email
      const serviceName = quoteData.serviceName || getServiceName(quoteData.service)
      const createdAt = quoteData.createdAt ? quoteData.createdAt.toDate().toLocaleString('fr-FR') : new Date().toLocaleString('fr-FR')
      
      const serviceDetailsHtml = formatQuoteData(quoteData)
      
      // ============================================
      // EMAIL 1: À L'ADMINISTRATEUR
      // ============================================
      const adminEmailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #016E98 0%, #0392C7 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #016E98;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #FF9D35;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table tr {
      border-bottom: 1px solid #eee;
    }
    table tr:last-child {
      border-bottom: none;
    }
    table td {
      padding: 12px;
      vertical-align: top;
    }
    table td:first-child {
      font-weight: 600;
      color: #016E98;
      width: 35%;
    }
    .service-badge {
      display: inline-block;
      background-color: #FF9D35;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .cta-button {
      display: inline-block;
      background-color: #FF9D35;
      color: white;
      padding: 12px 30px;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 20px;
    }
    .cta-button:hover {
      background-color: #E88D20;
    }
    .quote-id {
      background-color: #f9f9f9;
      padding: 15px;
      border-left: 4px solid #016E98;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      margin: 20px 0;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }
    .footer a {
      color: #016E98;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Nouvelle demande de devis</h1>
      <p>Une demande de devis vient d'être soumise sur votre site</p>
    </div>
    
    <div class="content">
      <div class="section">
        <span class="service-badge">${serviceName}</span>
        <table>
          <tr>
            <td><strong>Date de soumission:</strong></td>
            <td>${createdAt}</td>
          </tr>
          <tr>
            <td><strong>Identifiant du devis:</strong></td>
            <td><code>${quoteId}</code></td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">👤 Informations du client</div>
        <table>
          <tr>
            <td><strong>Nom:</strong></td>
            <td>${quoteData.firstName} ${quoteData.lastName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td><a href="mailto:${clientEmail}">${clientEmail}</a></td>
          </tr>
          <tr>
            <td><strong>Téléphone:</strong></td>
            <td>${quoteData.phone}</td>
          </tr>
          ${quoteData.company ? `<tr><td><strong>Entreprise:</strong></td><td>${quoteData.company}</td></tr>` : ''}
          ${quoteData.position ? `<tr><td><strong>Poste:</strong></td><td>${quoteData.position}</td></tr>` : ''}
          ${quoteData.address ? `<tr><td><strong>Adresse:</strong></td><td>${quoteData.address}</td></tr>` : ''}
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">📋 Détails du service</div>
        <table>
          ${serviceDetailsHtml}
          ${quoteData.installationAddress ? `<tr><td><strong>Lieu d'installation:</strong></td><td>${quoteData.installationAddress}</td></tr>` : ''}
          ${quoteData.budget ? `<tr><td><strong>Budget estimé:</strong></td><td>${quoteData.budget} FCFA</td></tr>` : ''}
        </table>
      </div>
      
      ${quoteData.message ? `
      <div class="section">
        <div class="section-title">💬 Message supplémentaire</div>
        <p style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #FF9D35;">
          ${quoteData.message.replace(/\n/g, '<br>')}
        </p>
      </div>
      ` : ''}
      
      <div class="section" style="text-align: center;">
        <a href="https://console.firebase.google.com/u/0/project/egenttogo-edc4e/firestore/databases/-default-/data/quotes/${quoteId}" class="cta-button">
          Voir le devis complet
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p>Email automatique d'EGENT TOGO • Ne pas répondre à cet email</p>
      <p><a href="https://www.egenttogo.com">www.egenttogo.com</a></p>
    </div>
  </div>
</body>
</html>`

      // ============================================
      // EMAIL 2: AU CLIENT (CONFIRMATION)
      // ============================================
      const clientEmailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #016E98 0%, #0392C7 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    .header p {
      opacity: 0.9;
      font-size: 14px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #016E98;
      margin-bottom: 15px;
    }
    .success-box {
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .success-box strong {
      color: #0c5520;
    }
    .info-box {
      background-color: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5576;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    table tr {
      border-bottom: 1px solid #eee;
    }
    table td {
      padding: 12px;
      vertical-align: top;
    }
    table td:first-child {
      font-weight: 600;
      color: #016E98;
      width: 35%;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #999;
      border-top: 1px solid #eee;
    }
    .footer a {
      color: #016E98;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✅ Merci pour votre demande</h1>
      <p>Votre demande de devis a bien été reçue</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="success-box">
          <strong>✓ Succès!</strong> Votre demande de devis a bien été envoyée et enregistrée. Notre équipe l'examinera et vous contactera très bientôt avec un devis détaillé.
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">📋 Résumé de votre demande</div>
        <table>
          <tr>
            <td><strong>Service:</strong></td>
            <td>${serviceName}</td>
          </tr>
          <tr>
            <td><strong>Référence:</strong></td>
            <td><code style="background-color: #f5f5f5; padding: 4px 8px; border-radius: 3px;">${quoteId}</code></td>
          </tr>
          <tr>
            <td><strong>Date de soumission:</strong></td>
            <td>${createdAt}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="info-box">
          <strong>📞 Délai de réponse:</strong> Notre équipe vous contactera par téléphone ou par email d'ici 24 à 48 heures pour affiner les détails et vous proposer les meilleures solutions.
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">💡 Prochaines étapes</div>
        <ol style="margin-left: 20px;">
          <li style="margin-bottom: 10px;">Notre équipe examinera votre demande</li>
          <li style="margin-bottom: 10px;">Nous prendrons contact avec vous pour clarifier les détails</li>
          <li style="margin-bottom: 10px;">Vous recevrez un devis détaillé et personnalisé</li>
          <li>Nous pourrons discuter des modalités de mise en œuvre</li>
        </ol>
      </div>
      
      <div class="section">
        <div class="section-title">📞 Contactez-nous</div>
        <table>
          <tr>
            <td><strong>Téléphone:</strong></td>
            <td>+228 92 03 15 35<br>+228 92 28 53 73</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td><a href="mailto:info@egenttogo.com">info@egenttogo.com</a></td>
          </tr>
          <tr>
            <td><strong>Site:</strong></td>
            <td><a href="https://www.egenttogo.com">www.egenttogo.com</a></td>
          </tr>
        </table>
      </div>
    </div>
    
    <div class="footer">
      <p>Merci d'avoir choisi EGENT TOGO</p>
      <p><a href="https://www.egenttogo.com">www.egenttogo.com</a></p>
    </div>
  </div>
</body>
</html>`

      // ============================================
      // ENVOYER LES EMAILS
      // ============================================
      
      // Email à l'admin
      await transporter.sendMail({
        from: process.env.GMAIL_USER || 'egenttogo@gmail.com',
        to: adminEmail,
        subject: `[NOUVEAU DEVIS] ${serviceName} - ${quoteData.firstName} ${quoteData.lastName}`,
        html: adminEmailHtml,
        replyTo: clientEmail
      })
      console.log(`✅ Email admin envoyé à ${adminEmail}`)
      
      // Email de confirmation au client
      await transporter.sendMail({
        from: process.env.GMAIL_USER || 'egenttogo@gmail.com',
        to: clientEmail,
        subject: '✅ Votre demande de devis a bien été reçue - EGENT TOGO',
        html: clientEmailHtml
      })
      console.log(`✅ Email de confirmation envoyé à ${clientEmail}`)
      
      // Mettre à jour le statut du devis dans Firestore
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      })
      console.log(`✅ Statut du devis mise à jour`)
      
      return {
        success: true,
        message: 'Emails envoyés avec succès',
        quoteId: quoteId
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des emails:', error)
      
      // Mettre à jour le statut d'erreur
      await snap.ref.update({
        emailError: true,
        emailErrorMessage: error.message,
        errorAt: admin.firestore.FieldValue.serverTimestamp()
      })
      
      throw new functions.https.HttpsError('internal', 'Erreur lors de l\'envoi des emails: ' + error.message)
    }
  })
