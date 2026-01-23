#!/bin/bash

# 🚀 Script pour committer et pousser les changements
# Usage: bash commit-og-meta-tags.sh

echo "📝 Commit des changements Meta Tags OG"
echo "======================================"
echo ""

# Vérifier que git est initialisé
if [ ! -d ".git" ]; then
    echo "❌ Pas de dépôt Git trouvé!"
    exit 1
fi

# Afficher les changements
echo "📊 Changements détectés:"
git status --short
echo ""

# Demander confirmation
read -p "Voulez-vous continuer? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Annulé."
    exit 1
fi

echo ""
echo "🔄 Ajout des fichiers..."
git add .

echo ""
echo "💾 Commit en cours..."
git commit -m "feat(og-meta-tags): implement dynamic open graph meta tags for articles

- Add Cloud Function to generate HTML with OG meta tags
- Support for WhatsApp, Facebook, Discord, Twitter card previews
- Automatic redirection to Vue.js SPA after preview
- Intelligent caching (1h for crawlers, 5min for users)
- No changes to existing Vue.js code
- Complete documentation included

New files:
- ARTICLE_META_TAGS_SETUP.md: Technical documentation
- DEPLOYMENT_GUIDE.md: Step-by-step deployment guide
- QUICK_VERIFICATION.md: Pre-deployment checklist
- VISUAL_ARCHITECTURE.md: Architecture visualization
- test-article-meta.sh: Test script (Bash)
- test-article-meta.ps1: Test script (PowerShell)
- IMPLEMENTATION_SUMMARY.md: Summary of changes

Modified files:
- functions/index.js: Added article meta tags route
- firebase.json: Added rewrites and headers configuration"

echo ""
echo "📤 Affichage de l'historique..."
git log --oneline -3

echo ""
read -p "Voulez-vous pousser vers le dépôt distant? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Push en cours..."
    git push
    echo ""
    echo "✅ Changements poussés avec succès!"
else
    echo "Les changements sont committs mais pas poussés."
fi

echo ""
echo "======================================"
echo "✅ Commit terminé!"
echo ""
echo "Prochaines étapes:"
echo "1. Lire: QUICK_VERIFICATION.md"
echo "2. Suivre: DEPLOYMENT_GUIDE.md"
echo ""
