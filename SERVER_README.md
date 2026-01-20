# 🤖 Serveur Prerendering EGENT-TOGO

## Vue d'ensemble

Serveur **Node.js/Express avec Puppeteer** pour le prerendering des pages articles afin que les métadonnées SEO et les images s'affichent correctement sur les réseaux sociaux.

---

## 🎯 Fonctionnalités

✅ **Prerendering automatique** avec Puppeteer
✅ **Cache intelligent** (24h TTL)
✅ **Détection des crawlers** (Facebook, Twitter, LinkedIn, etc.)
✅ **API complète** pour gérer les métadonnées
✅ **Métadonnées enrichies** (Open Graph, Twitter Cards, JSON-LD)
✅ **Support multi-domaine** (localhost, GitHub Pages, production)
✅ **Gestion des images** (résolution, cache)
✅ **Logging détaillé** et monitoring

---

## 📋 Installation

### 1. Dépendances

```bash
npm install
```

Installe:
- `express` - Framework web
- `puppeteer` - Prerendering
- `cors` - Cross-origin
- `dotenv` - Config

### 2. Configuration

Créer ou éditer `.env`:

```env
# Développement
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Production (décommentez selon votre configuration)
# NODE_ENV=production
# FRONTEND_URL=https://www.egenttogo.com
```

---

## 🚀 Utilisation

### Développement

**Terminal 1 - Frontend Vue:**
```bash
npm run dev
```

**Terminal 2 - Serveur Prerendering:**
```bash
npm run dev:server
```

Puis visiter: `http://localhost:3000`

### Production

```bash
npm run build
npm start
```

---

## 📡 API

### GET `/api/health`
Vérifier la santé du serveur.

**Réponse:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-17T10:30:00Z",
  "frontendUrl": "http://localhost:5173"
}
```

### GET `/api/prerender/articles/:slug`
Obtenir le HTML prerendu d'un article.

**Exemple:**
```bash
curl http://localhost:3000/api/prerender/articles/inauguration-nouveau-centre
```

**Réponse:** HTML complet de la page avec métadonnées.

### GET `/api/metadata/articles/:slug`
Obtenir uniquement les métadonnées d'un article (JSON).

**Exemple:**
```bash
curl http://localhost:3000/api/metadata/articles/inauguration-nouveau-centre
```

**Réponse:**
```json
{
  "slug": "inauguration-nouveau-centre",
  "title": "Inauguration du nouveau centre de formation",
  "description": "EGENT-TOGO inaugure un nouveau centre...",
  "image": "https://egenttogo.com/src/assets/images/headepage.webp",
  "url": "https://egenttogo.com/actualites/inauguration-nouveau-centre",
  "type": "article"
}
```

### POST `/api/cache/refresh/:slug`
Rafraîchir le cache d'un article.

**Exemple:**
```bash
curl -X POST http://localhost:3000/api/cache/refresh/inauguration-nouveau-centre
```

**Réponse:**
```json
{
  "success": true,
  "message": "Cache rafraîchi: inauguration-nouveau-centre",
  "timestamp": "2026-01-17T10:30:00Z"
}
```

---

## 🔄 Flux de Fonctionnement

```
Requête Facebook/Twitter
        ↓
Serveur détecte le crawler
        ↓
Vérifier le cache
        ├─ Valide? → Retourner le cache
        └─ Expiré? → Prerender avec Puppeteer
                        ↓
                   Générer HTML
                        ↓
                   Ajouter métadonnées
                        ↓
                   Sauvegarder en cache
                        ↓
                   Retourner au crawler
```

---

## 📦 Structure du Projet

```
EGENT_TOGO/
├── server.js              # Serveur principal
├── lib/
│   └── metadata.js        # Gestion des métadonnées
├── config/
│   └── deployment.js      # Configuration déploiement
├── prerendered/           # Cache (généré)
├── dist/                  # Build Vue (à générer)
├── .env                   # Variables d'environnement
├── package.json
└── DEPLOYMENT_GUIDE.md    # Guide de déploiement
```

---

## 🔧 Configuration

### Puppeteer

Personnalisable dans `server.js`:

```javascript
const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu'
  ]
});
```

### Cache

Configuration dans `server.js`:

```javascript
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures
```

### Crawlers Détectés

Dans `server.js`:

```javascript
const crawlers = [
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegram'
];
```

---

## 📊 Métadonnées Générées

Pour chaque article, le serveur génère:

### Open Graph (Facebook, LinkedIn)
- `og:title`
- `og:description`
- `og:image` (avec dimensions)
- `og:url`
- `og:type` (article/event)
- `og:site_name`
- `og:locale`

### Twitter Cards
- `twitter:card` (summary_large_image)
- `twitter:title`
- `twitter:description`
- `twitter:image`

### Meta Standards
- `description`
- `keywords`
- `canonical`

### JSON-LD (Schema.org)
- Type: NewsArticle ou Event
- Headline, description, image
- URL, date, author

---

## 🧪 Test

### Localement

```bash
# 1. Démarrer les serveurs
npm run dev      # Terminal 1
npm run dev:server  # Terminal 2

# 2. Tester les endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/prerender/articles/inauguration-nouveau-centre

# 3. Vérifier le cache
ls -la prerendered/
```

### Avec les outils sociaux

- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

Coller l'URL et voir la prévisualisation.

---

## 🚀 Déploiement

### GitHub Pages + Serveur Externe

1. Build Vue: `npm run build`
2. Déployer le frontend sur GitHub Pages
3. Déployer le serveur sur Render.com, Railway, Fly.io, etc.

### egenttogo.com (Production)

Voir `DEPLOYMENT_GUIDE.md` pour les instructions détaillées.

---

## 🐛 Debugging

### Logs

```bash
# Terminal (si lanché localement)
npm run dev:server

# Production (avec PM2)
pm2 logs egent-togo
```

### Vérifier une page

```bash
# Télécharger le HTML prerendu
curl http://localhost:3000/api/prerender/articles/inauguration-nouveau-centre > article.html

# Ouvrir dans le navigateur
open article.html

# Vérifier les métadonnées
grep 'og:title' article.html
grep 'og:image' article.html
```

### Tester l'accessibilité image

```bash
# Dans la console Node.js
const metadata = require('./lib/metadata');
const article = metadata.getArticleMetadata('inauguration-nouveau-centre');
console.log(article.image);

# Puis vérifier l'URL dans le navigateur
```

---

## ⚙️ Optimisations

### Mémoire

```javascript
// Limiter les instances Puppeteer
const MAX_BROWSERS = 1; // Une seule instance
```

### Performance

```javascript
// Réduire le timeout du cache
const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 heures

// Ou désactiver le cache
const CACHE_TTL = 0; // Toujours régénérer
```

### Compression

```javascript
const compression = require('compression');
app.use(compression());
```

---

## 📈 Monitoring

### Health Check

```bash
# Vérifier régulièrement la santé
curl -I http://localhost:3000/api/health
```

### Cache Stats

```bash
# Voir la taille du cache
du -sh prerendered/

# Nombre de fichiers
ls -l prerendered/ | wc -l
```

### Logs Erreurs

```bash
# Chercher les erreurs
npm run dev:server 2>&1 | grep Error
```

---

## 🔐 Sécurité

### CORS

```javascript
// Configurer les domaines autorisés
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://www.egenttogo.com',
    'https://alifoe.github.io'
  ]
}));
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### Variables Sensibles

Ne jamais commiter `.env`:

```bash
# .gitignore
.env
prerendered/
node_modules/
```

---

## 🎯 Checklist

- [ ] Dépendances installées
- [ ] `.env` configuré
- [ ] Frontend buildé (`npm run build`)
- [ ] Serveur lancé (`npm run dev:server`)
- [ ] API testée
- [ ] Cache fonctionnel
- [ ] Métadonnées vérifiées
- [ ] Crawlers détectés
- [ ] Logs en ordre

---

## 📚 Ressources

- **Express.js:** https://expressjs.com
- **Puppeteer:** https://pptr.dev
- **Open Graph:** https://ogp.me
- **Schema.org:** https://schema.org

---

## 🆘 FAQ

**Q: Pourquoi Puppeteer?**
A: Il rend le JavaScript et attend les métadonnées, contrairement aux crawlers qui voient du HTML vide.

**Q: Combien ça coûte?**
A: Le serveur coûte $5-20/mois sur un VPS. GitHub Pages est gratuit.

**Q: Peut-on utiliser une autre solution?**
A: Oui: Prerender.io (payant), SSR Vue (complexe), ou API statique (limité).

**Q: Comment mettre à jour les articles?**
A: Éditer `lib/metadata.js` et rafraîchir le cache.

---

**Status:** ✅ Production-Ready

Le serveur est prêt pour GitHub Pages aujourd'hui et egenttogo.com demain! 🚀
