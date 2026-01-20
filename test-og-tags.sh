#!/bin/bash

# 🧪 Test Script - Vérification des Meta Tags Open Graph
# Ce script teste que les meta tags Open Graph sont correctement ajoutés
# à la page ArticleDetail pour le partage social

echo "🚀 Test - Vérification des Meta Tags Open Graph"
echo "================================================"
echo ""

# Configuration
LOCAL_URL="http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre"
FACEBOOK_DEBUG="https://developers.facebook.com/tools/debug/?url="
TWITTER_TEST="https://cards-dev.twitter.com/validator"

echo "📝 URLs pour les tests:"
echo ""
echo "1️⃣ Page Article:"
echo "   $LOCAL_URL"
echo ""
echo "2️⃣ Tester avec Facebook Debugger:"
echo "   Accédez à: $FACEBOOK_DEBUG<URL>"
echo ""
echo "3️⃣ Tester avec Twitter Card Validator:"
echo "   Accédez à: $TWITTER_TEST"
echo ""
echo "================================================"
echo ""

# Fonction pour tester les meta tags avec curl
test_meta_tags() {
  echo "🔍 Vérification des meta tags sur la page..."
  echo ""
  
  # Récupérer le HTML de la page
  RESPONSE=$(curl -s "$LOCAL_URL")
  
  # Vérifier chaque meta tag
  declare -a tags=(
    "og:title"
    "og:description"
    "og:image"
    "og:url"
    "og:type"
    "twitter:card"
    "twitter:image"
    "description"
  )
  
  for tag in "${tags[@]}"; do
    if echo "$RESPONSE" | grep -q "property=\"$tag\"\|name=\"$tag\""; then
      echo "✅ Meta tag trouvé: $tag"
    else
      echo "❌ Meta tag MANQUANT: $tag"
    fi
  done
  
  echo ""
}

# Fonction pour vérifier le JSON-LD
test_json_ld() {
  echo "📊 Vérification du JSON-LD structuré..."
  echo ""
  
  RESPONSE=$(curl -s "$LOCAL_URL")
  
  if echo "$RESPONSE" | grep -q "application/ld+json"; then
    echo "✅ JSON-LD trouvé dans la page"
  else
    echo "❌ JSON-LD MANQUANT"
  fi
  
  echo ""
}

# Fonction pour extraire et afficher les valeurs
show_meta_values() {
  echo "📋 Valeurs des Meta Tags:"
  echo ""
  
  RESPONSE=$(curl -s "$LOCAL_URL")
  
  # Extraire og:title
  OG_TITLE=$(echo "$RESPONSE" | grep -oP '(?<=og:title" content=")[^"]*' | head -1)
  echo "📌 og:title: $OG_TITLE"
  
  # Extraire og:description
  OG_DESC=$(echo "$RESPONSE" | grep -oP '(?<=og:description" content=")[^"]*' | head -1)
  echo "📌 og:description: $OG_DESC"
  
  # Extraire og:image
  OG_IMG=$(echo "$RESPONSE" | grep -oP '(?<=og:image" content=")[^"]*' | head -1)
  echo "📌 og:image: ${OG_IMG:0:80}..."
  
  # Extraire og:url
  OG_URL=$(echo "$RESPONSE" | grep -oP '(?<=og:url" content=")[^"]*' | head -1)
  echo "📌 og:url: $OG_URL"
  
  # Extraire twitter:card
  TW_CARD=$(echo "$RESPONSE" | grep -oP '(?<=twitter:card" content=")[^"]*' | head -1)
  echo "📌 twitter:card: $TW_CARD"
  
  echo ""
}

# Lance les tests
if command -v curl &> /dev/null; then
  echo "🔌 curl détecté - Lancement des vérifications..."
  echo ""
  test_meta_tags
  test_json_ld
  show_meta_values
else
  echo "⚠️  curl n'est pas installé"
  echo "    Tests manuels recommandés dans les navigateurs"
  echo ""
fi

echo "================================================"
echo ""
echo "✅ Tests Manuel Recommandés:"
echo ""
echo "1. Ouvrir la page dans le navigateur"
echo "   $LOCAL_URL"
echo ""
echo "2. Inspecter avec F12 → Éléments (Elements)"
echo "   Chercher les balises <meta property='og:'>"
echo ""
echo "3. Tester le partage social:"
echo "   - Facebook: Copier l'URL et partager"
echo "   - Twitter: Cliquer le bouton Twitter sur la page"
echo "   - LinkedIn: Cliquer le bouton LinkedIn sur la page"
echo ""
echo "4. Vérifier l'aperçu du lien:"
echo "   - L'image doit s'afficher dans l'aperçu"
echo "   - Le titre et description doivent être corrects"
echo ""
echo "================================================"
