#!/bin/bash

# Test Script pour le Robot de Détection des Métadonnées
# Ce script aide à tester les métadonnées SEO sur différentes pages

echo "🤖 [Metadata Robot Test Script]"
echo "================================"
echo ""
echo "Test des métadonnées SEO pour EGENT-TOGO"
echo ""

# Configuration
BASE_URL="http://localhost:5173"  # Modifier selon votre URL locale

# Couleurs pour l'output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configuration ===${NC}"
echo "Base URL: $BASE_URL"
echo ""

# Fonction pour tester une page
test_page() {
  local PAGE_SLUG=$1
  local PAGE_TITLE=$2
  
  echo -e "${BLUE}Testing: $PAGE_TITLE${NC}"
  echo "URL: $BASE_URL/actualites/$PAGE_SLUG"
  echo ""
  
  # Note: Ce script est informatif. Pour des tests réels, utiliser:
  # - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
  # - Twitter Card Validator: https://cards-dev.twitter.com/validator
  # - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
  echo "Après chargement de cette page, vérifier en console:"
  echo "  🤖 [SEO Meta Robot] - Métadonnées mises à jour"
  echo "  🤖 [Metadata Validator] - Rapport de validation"
  echo "  🤖 [Metadata Summary] - Résumé des métadonnées"
  echo ""
}

# Tests des pages d'articles
echo -e "${YELLOW}=== Tests des Articles ===${NC}"
echo ""

test_page "inauguration-nouveau-centre" "Inauguration du nouveau centre"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: twitter:card = summary_large_image"
echo "✓ Vérifier: image accessible et valide"
echo ""

test_page "partenariat-international" "Partenariat International"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: twitter:image présente"
echo "✓ Vérifier: JSON-LD structuré"
echo ""

test_page "prix-reconnaissance" "Prix et Reconnaissance"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: canonical URL correcte"
echo ""

test_page "ressources-humaines-equipe" "Expansion de l'équipe"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: og:type = article"
echo ""

test_page "durabilite-engagement" "Engagement en faveur de la durabilité"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: description length 50-160"
echo ""

test_page "evenement-clients" "Gala de reconnaissance 2026"
echo "✓ Vérifier: og:image, og:title, og:description"
echo "✓ Vérifier: URL canonique"
echo ""

echo -e "${YELLOW}=== Instructions pour le test manuel ===${NC}"
echo ""
echo "1. Démarrer le serveur de développement:"
echo "   npm run dev"
echo ""
echo "2. Ouvrir la console du navigateur (F12)"
echo ""
echo "3. Aller sur une page d'article, ex:"
echo "   $BASE_URL/actualites/inauguration-nouveau-centre"
echo ""
echo "4. Vérifier les logs du robot en console:"
echo "   - 🤖 [SEO Meta Robot]"
echo "   - 🤖 [Metadata Validator]"
echo "   - 🤖 [Metadata Summary]"
echo ""
echo "5. Tester sur les outils de débogage sociaux:"
echo "   - Facebook: https://developers.facebook.com/tools/debug/"
echo "   - Twitter: https://cards-dev.twitter.com/validator"
echo "   - LinkedIn: https://www.linkedin.com/post-inspector/"
echo ""
echo "6. Chercher dans les éléments HTML (F12 > Elements):"
echo "   - Rechercher 'og:image' → doit être présente"
echo "   - Rechercher 'twitter:card' → doit être 'summary_large_image'"
echo "   - Rechercher 'json+ld' → doit être structurée"
echo ""

echo -e "${YELLOW}=== Checklist de validation ===${NC}"
echo ""
echo "Pour chaque article, vérifier:"
echo "  ☐ og:title présente et correcte"
echo "  ☐ og:description présente et correcte"
echo "  ☐ og:image présente et valide"
echo "  ☐ og:image accessible (URL valide)"
echo "  ☐ og:url correcte"
echo "  ☐ og:type = article"
echo "  ☐ twitter:card = summary_large_image"
echo "  ☐ twitter:image = og:image"
echo "  ☐ description meta présente"
echo "  ☐ canonical URL présente"
echo "  ☐ JSON-LD structuré"
echo "  ☐ Logs de validation réussis (errors = 0)"
echo ""

echo -e "${GREEN}✓ Tests configurés et prêts!${NC}"
echo ""
echo "Exécuter cette commande pour voir les résultats:"
echo "tail -f ~/.npm-global/logs/debug.log"
echo ""
