# Guide Déploiement GitHub Pages avec Prerendering

## 1. Configuration GitHub Actions Secret

Allez dans votre repo GitHub → Settings → Secrets and variables → Actions

Créez ce secret :
```
PRERENDER_SERVER_URL=https://your-prerender-server.com
```

## 2. Déployer le serveur Prerendering

Le serveur de prerendering doit tourner sur un serveur external (VPS, Heroku, Railway, etc.)

### Option A: Déployer sur Railway (Facile)

1. Créez un compte sur [Railway.app](https://railway.app)
2. Connectez votre GitHub repo
3. Sélectionnez le branch `main`
4. Ajouter les variables d'environnement :
   - `PORT`: 3000
   - `FRONTEND_URL`: https://alifoe.github.io/EGENT_TOGO (ou votre domaine)
   - `NODE_ENV`: production
5. Railway génère une URL publique → Ajoutez-la au secret GitHub

### Option B: Déployer sur Heroku

```bash
# 1. Installer Heroku CLI
# 2. Se connecter
heroku login

# 3. Créer une app
heroku create egent-togo-prerender

# 4. Configurer les variables
heroku config:set FRONTEND_URL=https://alifoe.github.io/EGENT_TOGO -a egent-togo-prerender

# 5. Déployer
git push heroku main

# 6. Vérifier l'URL
heroku open -a egent-togo-prerender
```

### Option C: VPS personnalisé (AWS, DigitalOcean, etc.)

1. SSH sur votre serveur
2. Clonez le repo
3. Installez Node.js
4. Configurez un reverse proxy (Nginx)
5. Utilisez PM2 ou systemd pour auto-restart

## 3. Mettre à jour le workflow GitHub Actions

Dans `.github/workflows/deploy.yml`, le secret est utilisé automatiquement.

Quand vous pushez sur `main` :
1. ✅ Build Vue app avec `VITE_PRERENDER_SERVER` configuré
2. ✅ Déploie sur GitHub Pages
3. ✅ Le site utilise le serveur externe pour la prerendering

## 4. Tester la prerendering

### Depuis GitHub Pages
```bash
# Vérifier les métadonnées
curl https://alifoe.github.io/EGENT_TOGO/actualites/inauguration-nouveau-centre \
  -H "User-Agent: facebookexternalhit"
```

### Avec Facebook Debugger
1. Allez sur [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
2. Entrez: `https://alifoe.github.io/EGENT_TOGO/actualites/inauguration-nouveau-centre`
3. Vérifiez les métadonnées (og:image, og:title, etc.)

### Avec Twitter Card
1. Allez sur [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Entrez votre URL
3. Vérifiez les métadonnées

## 5. Architecture finale

```
GitHub Pages (Frontend)
    ↓
    ├─ Vue App (http://localhost:5173 dev)
    ├─ Métadonnées injected
    └─ Fallback vers serveur prerendering si crawler

External Prerender Server (Railway/Heroku/VPS)
    ↓
    ├─ Express.js (Port 3000)
    ├─ Puppeteer (Headless Chrome)
    ├─ Cache (24h)
    └─ Crawler Detection
```

## 6. Variables d'environnement requises

### Frontend (vite.config.js)
- `VITE_PRERENDER_SERVER`: URL du serveur de prerendering
- `VITE_ENVIRONMENT`: "github-pages" ou "production"

### Backend (server.js)
- `PORT`: 3000
- `FRONTEND_URL`: https://alifoe.github.io/EGENT_TOGO
- `PUPPETEER_HEADLESS`: "new"

## 7. Dépannage

**La prerendering ne fonctionne pas?**
1. Vérifiez que le serveur externe tourne : `curl $PRERENDER_SERVER/api/health`
2. Vérifiez le secret GitHub Actions
3. Vérifiez les logs Railway/Heroku
4. Testez localement : `npm run dev:server` + `npm run dev`

**Les métadonnées n'apparaissent pas sur Facebook?**
1. Utilisez [Facebook Debugger](https://developers.facebook.com/tools/debug/sharing/)
2. Cliquez "Scrape Again" pour rafraîchir le cache Facebook
3. Vérifiez que og:image URL est absolue

**Cache expiré?**
1. Appelez POST `/api/cache/refresh/:slug` sur le serveur
2. Facebook scrape à nouveau après 24h par défaut
