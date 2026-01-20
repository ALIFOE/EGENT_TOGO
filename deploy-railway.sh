#!/bin/bash
# Script de déploiement sur Railway

echo "🚀 Déploiement sur Railway..."

# Vérifier que Railway CLI est installé
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI non installé"
    echo "Installez-le: npm install -g @railway/cli"
    exit 1
fi

# Se connecter à Railway
echo "📱 Connexion à Railway..."
railway login

# Créer ou sélectionner le projet
echo "📦 Projet Railway..."
railway init

# Ajouter les variables d'environnement
echo "🔧 Configuration des variables..."
railway variable set PORT 3000
railway variable set NODE_ENV production
railway variable set FRONTEND_URL "https://alifoe.github.io/EGENT_TOGO"
railway variable set PUPPETEER_HEADLESS "new"
railway variable set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD "false"

# Déployer
echo "🌐 Déploiement..."
railway up

# Afficher l'URL
echo ""
echo "✅ Déploiement terminé!"
echo "Votre URL Railway: $(railway domain)"
echo ""
echo "📝 Ajoutez cette URL au secret GitHub Actions:"
echo "  PRERENDER_SERVER_URL=$(railway domain)"
