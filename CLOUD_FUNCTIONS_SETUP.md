═══════════════════════════════════════════════════════════════════════════════

       🚀 DÉPLOIEMENT CLOUD FUNCTIONS - GUIDE RAPIDE

═══════════════════════════════════════════════════════════════════════════════


📋 POURQUOI CLOUD FUNCTIONS?


✅ Serverless (payer juste pour utilisation)
✅ Intégré Firebase (pas d'infra séparée)
✅ Auto-scale (gère le traffic)
✅ HTTPS automatique
✅ Gratuit tier très généreux (12.5k invocations/jour)
✅ Firebase CLI: firebase deploy --only functions,hosting


═══════════════════════════════════════════════════════════════════════════════

🛠️ ÉTAPES DE CONFIGURATION:


Étape 1: Créer dossier functions
─────────────────────────────────

Terminal:
mkdir functions
cd functions
npm init -y


Étape 2: Installer dépendances
───────────────────────────────

cd functions
npm install \
  firebase-functions \
  firebase-admin \
  express \
  puppeteer \
  cors \
  dotenv


Étape 3: Créer functions/index.js
──────────────────────────────────

Copier server.js → functions/index.js

Modifications:

AVANT (server.js - Express standalone):
────────────────────────────────────────
const app = express()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => { ... })


APRÈS (functions/index.js - Cloud Function):
──────────────────────────────────────────────
const functions = require('firebase-functions')
const app = express()

// Ne PAS appeler app.listen()
// Cloud Functions gère ça

// Exporter comme Cloud Function
exports.prerender = functions
  .https
  .onRequest(app)


Étape 4: Mettre à jour package.json
────────────────────────────────────

functions/package.json:

```json
{
  "name": "egent-togo-functions",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "serve": "firebase emulators:start --only functions",
    "deploy": "firebase deploy --only functions"
  },
  "dependencies": {
    "firebase-functions": "^4.4.0",
    "firebase-admin": "^11.11.0",
    "express": "^4.18.2",
    "puppeteer": "^20.0.0",
    "cors": "^2.8.5"
  }
}
```


Étape 5: Modifier firebase.json
────────────────────────────────

Ajouter configuration functions:

```json
{
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-functions-debug.log"
      ]
    }
  ],
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "/api/**",
        "function": "prerender"
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```


Étape 6: Configurer environment variables
──────────────────────────────────────────

Créer .env.local (local) et .env.production (production):

.env.local:
───────────
VITE_SITE_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173

.env.production:
────────────────
VITE_SITE_URL=https://www.egenttogo.com
FRONTEND_URL=https://www.egenttogo.com


Étape 7: Tester localement
───────────────────────────

Terminal:
firebase emulators:start --only functions,hosting

Attendez:
✓ Emulators ready...
✓ http://localhost:5000

Tester:
http://localhost:5000/api/prerender/articles/test


═══════════════════════════════════════════════════════════════════════════════

📋 CODE COMPLET - functions/index.js


NOUVELLE VERSION (Cloud Functions):
──────────────────────────────────

```javascript
const functions = require('firebase-functions')
const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

// Configuration
const PORT = process.env.PORT || 3000
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.egenttogo.com'
const CACHE_DIR = '/tmp/prerendered' // Cloud Functions utilise /tmp

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
 * Déterminer si c'est un crawler
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
    'baiduspider',
    'discordbot',
    'pinterest',
    'vkontakte',
    'duckduckbot'
  ]
  return crawlers.some(crawler => userAgent.toLowerCase().includes(crawler))
}

/**
 * Pré-rendre une page
 */
async function prerenderPage(url) {
  try {
    const browser = await initBrowser()
    const page = await browser.newPage()

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    })

    // Attendre les meta tags
    await page.waitForSelector('meta[property="og:title"]', { timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(500)

    const html = await page.content()
    await page.close()

    return html
  } catch (error) {
    console.error(`Erreur prerendering ${url}:`, error)
    throw error
  }
}

/**
 * API: Prérender un article
 */
app.get('/api/prerender/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    if (!slug || slug.includes('..')) {
      return res.status(400).json({ error: 'Slug invalide' })
    }

    const url = `${FRONTEND_URL}/article/${slug}`
    const html = await prerenderPage(url)
    
    res.header('Content-Type', 'text/html; charset=utf-8')
    res.send(html)
  } catch (error) {
    console.error('Erreur API prerender:', error)
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
    frontendUrl: FRONTEND_URL
  })
})

/**
 * Fallback pour routing frontend
 */
app.get('*', (req, res) => {
  const userAgent = req.headers['user-agent'] || ''

  // Si crawler: essayer prerender
  if (isCrawler(userAgent)) {
    const match = req.path.match(/\/article\/([^/]+)/)
    if (match) {
      const slug = match[1]
      prerenderPage(`${FRONTEND_URL}/article/${slug}`)
        .then(html => {
          res.header('Content-Type', 'text/html; charset=utf-8')
          res.send(html)
        })
        .catch(error => {
          console.error('Erreur fallback prerender:', error)
          res.status(500).send('<h1>Erreur prerendering</h1>')
        })
      return
    }
  }

  // Sinon: répondre avec index.html (SPA)
  res.status(404).send('<h1>Not Found</h1>')
})

// Exporter comme Cloud Function
exports.prerender = functions
  .https
  .onRequest(app)
```

═══════════════════════════════════════════════════════════════════════════════

🚀 DÉPLOIEMENT EN PRODUCTION:


Étape 1: Build
──────────────

Terminal:
npm run build


Étape 2: Deploy
───────────────

Terminal:
firebase deploy --only functions,hosting


Cela:
✅ Compile TypeScript/JS
✅ Déploie Cloud Function
✅ Déploie Hosting (dist/)
✅ Configure routing


Étape 3: Vérifier
──────────────────

Cloud Functions URL:
https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/prerender

Hosting:
https://www.egenttogo.com/


═══════════════════════════════════════════════════════════════════════════════

⚙️ ROUTING FIREBASE HOSTING:


firebase.json rewrites:
───────────────────────

```json
"rewrites": [
  {
    "source": "/api/**",
    "function": "prerender"
  },
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

Flux:
────

1. www.egenttogo.com/article/test
   → /index.html (SPA, utilisateur normal)

2. WhatsApp requête www.egenttogo.com/article/test
   → Détecte crawler
   → /api/prerender/articles/test
   → Cloud Function pré-rend
   → Retourne HTML avec meta tags


═══════════════════════════════════════════════════════════════════════════════

💰 COÛTS FIREBASE:


Gratuit tier:
─────────────

• Cloud Functions: 2M invocations/mois gratuit
  → Vous avez besoin: ~1 invocation/partage
  → Même avec 1000 partages/jour = 30k invocations/mois
  → Large gratuit!

• Hosting: Gratuit (1GB stockage, 10GB transfert/mois)

• Firestore: Gratuit (1GB stockage, 50k lectures/jour)


À payer (si dépassement):
───────────────────────

• Cloud Functions: $0.40 par million invocations
• Compute time: $0.0000025 par GB-seconde


ESTIMATION POUR VOUS:
─────────────────────

• 100 partages/jour = 3000 partages/mois
• = 3000 invocations Cloud Functions
• = 0 $ (dans gratuit tier)


═══════════════════════════════════════════════════════════════════════════════

🧪 TESTER LOCALEMENT:


Setup:
──────

firebase emulators:start --only functions,hosting


Ouvrir:
───────

http://localhost:5000

Tester:
───────

1. Afficher article:
   http://localhost:5000/article/test

2. Voir code source (Ctrl+U):
   Doit avoir og:title, og:image, etc.

3. Test API directe:
   http://localhost:5000/api/prerender/articles/test


═══════════════════════════════════════════════════════════════════════════════

❓ FAQ:


Q: Combien de temps le prerendering prend?
R: ~2-5 secondes (Puppeteer lance navigateur, charge page, génère HTML)
   Pour users: imperceptible (ils reçoivent index.html d'abord)


Q: Qu'est-ce si Puppeteer crash?
R: Cloud Functions restart automatiquement
   Fallback: retourner 500 error


Q: Cache est où?
R: /tmp/ dans Cloud Functions
   Persiste pendant lifecycle de la fonction
   (~15 min-1h généralement)


Q: Peut-on garder server.js local?
R: Oui! À dev:
   npm run dev (front)
   node server.js (back) - terminal séparé


═══════════════════════════════════════════════════════════════════════════════

📋 CHECKLIST DÉPLOIEMENT CLOUD FUNCTIONS:


□ mkdir functions && npm init -y
□ npm install firebase-functions express puppeteer cors
□ Créer functions/index.js avec code Cloud Function
□ Mettre à jour firebase.json avec functions config
□ Créer .env.production avec VITE_SITE_URL et FRONTEND_URL
□ firebase emulators:start pour tester
□ npm run build
□ firebase deploy --only functions,hosting
□ Vérifier Cloud Functions dashboard
□ Tester www.egenttogo.com/article/...
□ Vérifier Ctrl+U: og: tags présentes
□ Tester Facebook Debugger
□ Tester WhatsApp réel


═══════════════════════════════════════════════════════════════════════════════

RÉSUMÉ:

Avec Cloud Functions:

✅ Meta tags générés pour crawlers sociaux
✅ SPA normale pour utilisateurs
✅ Serverless et auto-scale
✅ Gratuit tier généreux
✅ Intégré Firebase
✅ Déploiement simple


═══════════════════════════════════════════════════════════════════════════════
