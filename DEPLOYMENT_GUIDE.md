# 🚀 Guide de Déploiement - Prerendering avec Node.js

## Architecture

```
Frontend (Vue.js)          Prerendering Server       Réseaux Sociaux
    ↓                           ↓                          ↓
localhost:5173      →    Node.js + Puppeteer    →   Facebook
dist/               →    + Express              →   Twitter
github.io           →    + Cache                →   LinkedIn
egenttogo.com       →    + API                  →   WhatsApp
```

---

## 🔧 Installation Locale

### 1. Installer les dépendances

```bash
npm install
```

Cela installe:
- `express` - Serveur web
- `puppeteer` - Prerendering
- `cors` - Cross-origin requests
- `dotenv` - Variables d'environnement

### 2. Configurer l'environnement

```bash
# Créer le fichier .env (s'il n'existe pas)
cp .env.example .env

# Modifier selon votre configuration
# FRONTEND_URL=http://localhost:5173
# PORT=3000
```

### 3. Démarrer le serveur

**Terminal 1 - Frontend:**
```bash
npm run dev
# Serveur Vue sur http://localhost:5173
```

**Terminal 2 - Prerendering:**
```bash
npm run dev:server
# Serveur Node.js sur http://localhost:3000
```

### 4. Tester

```bash
# Visiter le frontend
http://localhost:5173/actualites/inauguration-nouveau-centre

# Visiter le serveur prerendering
http://localhost:3000/api/prerender/articles/inauguration-nouveau-centre

# Vérifier la santé du serveur
http://localhost:3000/api/health
```

---

## 📦 Build et Préparation pour Déploiement

### 1. Builder le frontend Vue

```bash
npm run build
# Crée le répertoire 'dist/' avec les fichiers statiques
```

### 2. Préparer le serveur

La structure doit être:
```
project/
├── dist/                 # Build Vue (serveur statique)
├── prerendered/          # Cache prerendu
├── lib/                  # Modules
│   └── metadata.js
├── config/
│   └── deployment.js
├── server.js             # Serveur principal
├── package.json
└── .env
```

### 3. Configurer l'hébergement

---

## 🌍 Déploiement sur GitHub Pages

### Option 1: GitHub Pages + Serveur externe (Recommandé)

**Avantages:**
- GitHub Pages sert le frontend (gratuit)
- Serveur prerendering sur un VPS
- Images et métadonnées dynamiques

**Étapes:**

1. **Préparer le frontend pour GitHub Pages:**
```bash
# Dans vite.config.js
export default {
  base: '/EGENT_TOGO/',
  // ... autres configs
}
```

2. **Builder et déployer sur GitHub Pages:**
```bash
npm run build
# Les fichiers de 'dist/' sont déployés sur GitHub Pages
```

3. **Déployer le serveur Prerendering:**

Options:
- **Heroku** (gratuit avec limitations)
- **Render.com** (gratuit)
- **Railway.app** (gratuit)
- **Fly.io** (gratuit)
- **VPS personnalisé** (DigitalOcean, Linode, etc.)

**Exemple avec Render.com:**

```bash
# 1. Créer un compte sur render.com
# 2. Connecter votre GitHub
# 3. Créer un nouveau "Web Service"
# 4. Configuration:
Build Command:    npm install
Start Command:    npm run server
Environment:      NODE_ENV=production
Variables:        FRONTEND_URL=https://alifoe.github.io/EGENT_TOGO
```

### Option 2: Serveur unique (egenttogo.com)

C'est ce que vous ferez à terme.

---

## 🌐 Déploiement sur egenttogo.com

### Option A: VPS avec Node.js

**Fournisseurs recommandés:**
- DigitalOcean ($5-20/mois)
- Linode ($5-20/mois)
- Vultr ($2.5-20/mois)
- AWS ($1-30/mois)

**Étapes:**

1. **Louer un VPS (Ubuntu 20.04+)**

2. **Installer Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Cloner le projet:**
```bash
cd /var/www
git clone https://github.com/ALIFOE/EGENT_TOGO.git
cd EGENT_TOGO
npm install
```

4. **Configurer l'environnement:**
```bash
cp .env.example .env

# Éditer .env
nano .env

# Ajouter:
NODE_ENV=production
FRONTEND_URL=https://www.egenttogo.com
PORT=3000
```

5. **Builder le frontend:**
```bash
npm run build
```

6. **Configurer Nginx/Apache comme proxy:**

**Nginx:**
```nginx
server {
    listen 80;
    server_name www.egenttogo.com egenttogo.com;
    
    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name www.egenttogo.com egenttogo.com;
    
    # SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/egenttogo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/egenttogo.com/privkey.pem;
    
    # Proxy vers Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Utiliser PM2 pour la persistance:**
```bash
npm install -g pm2

# Démarrer l'app
pm2 start server.js --name "egent-togo"

# Sauvegarder la configuration
pm2 save

# Redémarrage auto au boot
pm2 startup
```

8. **Configurer SSL (Let's Encrypt):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d egenttogo.com -d www.egenttogo.com
```

---

## 🔄 Pipeline CI/CD (GitHub Actions)

Créer `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build
        run: |
          npm install
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      
      - name: Deploy to Production
        run: |
          # Déployer vers votre VPS
          # Utiliser SSH keys ou déploiement personnalisé
          echo "Déploiement vers egenttogo.com"
```

---

## 📊 Monitoring

### Vérifier l'état du serveur

```bash
# Localement
curl http://localhost:3000/api/health

# Production
curl https://www.egenttogo.com/api/health

# Réponse attendue:
{
  "status": "ok",
  "timestamp": "2026-01-17T10:30:00Z",
  "frontendUrl": "https://www.egenttogo.com"
}
```

### Logs du serveur

```bash
# PM2
pm2 logs egent-togo

# Systemd (si utilisé)
journalctl -u egent-togo -f
```

---

## 🧹 Maintenance

### Rafraîchir le cache

```bash
# API pour rafraîchir un article
curl -X POST http://localhost:3000/api/cache/refresh/inauguration-nouveau-centre

# Nettoyer tout le cache
rm -rf prerendered/*
```

### Mettre à jour le code

```bash
# Pull les changements
git pull origin main

# Installer les dépendances
npm install

# Builder
npm run build

# Redémarrer le serveur
pm2 restart egent-togo
```

---

## 🔐 Sécurité

### Variables sensibles

Ne jamais commiter `.env`:
```bash
# .gitignore
.env
prerendered/
node_modules/
dist/
```

### Rate Limiting

Ajouter au serveur:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### CORS sécurisé

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://www.egenttogo.com',
    'https://alifoe.github.io'
  ]
}));
```

---

## 📈 Performance

### Cache dynamique

Le serveur cache les pages pendant 24h:
```javascript
// Régénérer le cache chaque jour
// Ou immédiatement lors d'une mise à jour
```

### Compression

```javascript
const compression = require('compression');
app.use(compression());
```

---

## 🎯 Checklist Déploiement

- [ ] Frontend buildé (`npm run build`)
- [ ] `.env` configuré
- [ ] Dépendances installées (`npm install`)
- [ ] Serveur testé localement
- [ ] GitHub Pages configuré (si utilisé)
- [ ] Domaine pointant vers le serveur
- [ ] SSL/TLS configuré
- [ ] PM2 configuré
- [ ] Monitoring en place
- [ ] Backups en place

---

## 🆘 Troubleshooting

### Images ne s'affichent pas

```bash
# Vérifier que le serveur peut accéder au frontend
curl https://www.egenttogo.com/src/assets/images/headepage.webp

# Vérifier les logs
pm2 logs egent-togo
```

### Cache pas à jour

```bash
# Rafraîchir un article
curl -X POST https://www.egenttogo.com/api/cache/refresh/inauguration-nouveau-centre
```

### Mémoire insuffisante

```bash
# Limiter les instances Puppeteer
# Réduire le CACHE_TTL
# Utiliser CloudFlare pour le cache
```

---

## 📞 Support

Besoin d'aide?
- Vérifier les logs: `pm2 logs`
- Consulter la API: `GET /api/health`
- Tester le prerendering: `GET /api/prerender/articles/:slug`

**Résumé:** Le système est prêt pour GitHub Pages aujourd'hui et egenttogo.com demain! 🚀
