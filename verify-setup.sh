#!/bin/bash
# Script de vérification avant déploiement

echo "🔍 Vérification de la configuration Cloud Functions..."
echo ""

# Vérifier les fichiers essentiels
echo "📁 Vérification des fichiers..."
files=(
  "functions/index.js"
  "functions/package.json"
  "firebase.json"
  ".env.production"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file - MANQUANT!"
    exit 1
  fi
done

# Vérifier les dépendances
echo ""
echo "📦 Vérification des dépendances Node.js..."
if [ -d "functions/node_modules" ]; then
  echo "  ✅ node_modules existe"
else
  echo "  ❌ node_modules manquent - Exécutez: cd functions && npm install"
  exit 1
fi

# Valider la syntaxe JavaScript
echo ""
echo "✔️  Validation de la syntaxe..."
if node -c functions/index.js 2>/dev/null; then
  echo "  ✅ functions/index.js - Syntaxe valide"
else
  echo "  ❌ Erreur de syntaxe dans functions/index.js"
  exit 1
fi

# Vérifier firebase.json
echo ""
echo "📋 Vérification de firebase.json..."
if grep -q '"functions"' firebase.json; then
  echo "  ✅ Section 'functions' trouvée"
else
  echo "  ❌ Section 'functions' manquante"
  exit 1
fi

if grep -q '"prerender"' firebase.json; then
  echo "  ✅ Rewrite 'prerender' configuré"
else
  echo "  ⚠️  Rewrite 'prerender' non trouvé - Vérifiez firebase.json"
fi

# Vérifier Firebase CLI
echo ""
echo "🔑 Vérification de Firebase CLI..."
if command -v firebase &> /dev/null; then
  echo "  ✅ firebase-tools installé"
  firebase --version
else
  echo "  ❌ firebase-tools non installé - Exécutez: npm install -g firebase-tools"
  exit 1
fi

# Vérifier l'authentification Firebase
echo ""
echo "🔐 Vérification de l'authentification..."
if firebase projects:list &> /dev/null; then
  echo "  ✅ Authentifié avec Firebase"
  echo ""
  echo "🎯 Projet actif:"
  firebase projects:list | grep -E '\[|default'
else
  echo "  ❌ Non authentifié - Exécutez: firebase login"
  exit 1
fi

# Résumé
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "✅ Toutes les vérifications sont passées!"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "📚 Prochaines étapes:"
echo "1. Compiler le frontend: npm run build"
echo "2. Tester localement: firebase emulators:start --only functions,hosting"
echo "3. Déployer: firebase deploy --only functions,hosting"
echo ""
echo "Pour plus d'infos, consultez: functions/CLOUD_FUNCTIONS_README.md"
