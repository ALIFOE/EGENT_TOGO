#!/bin/bash

# 🧪 Script de test pour la configuration Meta Tags Open Graph
# Usage: bash test-article-meta.sh

echo "🧪 Test Meta Tags Articles - EGENT-TOGO"
echo "========================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SITE_URL="${1:-https://egenttogo-edc4e.web.app}"
ARTICLE_SLUG="${2:-notre-engagement-en-faveur-de-la-durabilit}"

echo "📍 Site URL: $SITE_URL"
echo "📰 Article Slug: $ARTICLE_SLUG"
echo ""

# Test 1: Vérifier que la URL est accessible
echo "1️⃣  Test d'accessibilité..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL/article/$ARTICLE_SLUG")

if [ "$RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ URL accessible (HTTP $RESPONSE)${NC}"
else
    echo -e "${RED}❌ URL non accessible (HTTP $RESPONSE)${NC}"
    exit 1
fi

echo ""

# Test 2: Vérifier les meta tags OG
echo "2️⃣  Vérification des meta tags Open Graph..."
echo ""

# Récupérer le HTML
HTML=$(curl -s -H "User-Agent: facebookexternalhit/1.1" "$SITE_URL/article/$ARTICLE_SLUG")

# Vérifier les meta tags
OG_TITLE=$(echo "$HTML" | grep -o '<meta property="og:title"[^>]*content="[^"]*"' | head -1)
OG_DESC=$(echo "$HTML" | grep -o '<meta property="og:description"[^>]*content="[^"]*"' | head -1)
OG_IMAGE=$(echo "$HTML" | grep -o '<meta property="og:image"[^>]*content="[^"]*"' | head -1)
OG_URL=$(echo "$HTML" | grep -o '<meta property="og:url"[^>]*content="[^"]*"' | head -1)
OG_TYPE=$(echo "$HTML" | grep -o '<meta property="og:type"[^>]*content="[^"]*"' | head -1)

# Afficher les résultats
if [ ! -z "$OG_TITLE" ]; then
    echo -e "${GREEN}✅ og:title${NC}"
    echo "   $OG_TITLE"
else
    echo -e "${RED}❌ og:title MANQUANT${NC}"
fi

if [ ! -z "$OG_DESC" ]; then
    echo -e "${GREEN}✅ og:description${NC}"
    echo "   $OG_DESC"
else
    echo -e "${RED}❌ og:description MANQUANT${NC}"
fi

if [ ! -z "$OG_IMAGE" ]; then
    echo -e "${GREEN}✅ og:image${NC}"
    echo "   $OG_IMAGE"
else
    echo -e "${RED}❌ og:image MANQUANT${NC}"
fi

if [ ! -z "$OG_URL" ]; then
    echo -e "${GREEN}✅ og:url${NC}"
    echo "   $OG_URL"
else
    echo -e "${RED}❌ og:url MANQUANT${NC}"
fi

if [ ! -z "$OG_TYPE" ]; then
    echo -e "${GREEN}✅ og:type${NC}"
    echo "   $OG_TYPE"
else
    echo -e "${RED}❌ og:type MANQUANT${NC}"
fi

echo ""

# Test 3: Vérifier les headers
echo "3️⃣  Vérification des headers HTTP..."
echo ""

HEADERS=$(curl -s -I -H "User-Agent: facebookexternalhit/1.1" "$SITE_URL/article/$ARTICLE_SLUG")

if echo "$HEADERS" | grep -q "Cache-Control"; then
    echo -e "${GREEN}✅ Cache-Control présent${NC}"
    echo "   $(echo "$HEADERS" | grep "Cache-Control")"
else
    echo -e "${YELLOW}⚠️  Cache-Control non détecté${NC}"
fi

if echo "$HEADERS" | grep -q "Content-Type: text/html"; then
    echo -e "${GREEN}✅ Content-Type: text/html${NC}"
else
    echo -e "${RED}❌ Content-Type incorrect${NC}"
fi

echo ""

# Test 4: Vérifier la redirection
echo "4️⃣  Vérification de la redirection..."
echo ""

REFRESH=$(echo "$HTML" | grep -o '<meta http-equiv="refresh"[^>]*content="[^"]*"' | head -1)

if [ ! -z "$REFRESH" ]; then
    echo -e "${GREEN}✅ Redirection automatique configurée${NC}"
    echo "   $REFRESH"
else
    echo -e "${YELLOW}⚠️  Pas de redirection meta détectée${NC}"
fi

echo ""

# Test 5: Checker la structure de la page
echo "5️⃣  Vérification de la structure..."
echo ""

if echo "$HTML" | grep -q "<!DOCTYPE html>"; then
    echo -e "${GREEN}✅ DOCTYPE html présent${NC}"
else
    echo -e "${RED}❌ DOCTYPE html MANQUANT${NC}"
fi

if echo "$HTML" | grep -q '<html lang="fr">'; then
    echo -e "${GREEN}✅ Langue fr configurée${NC}"
else
    echo -e "${RED}❌ Langue non configurée${NC}"
fi

if echo "$HTML" | grep -q '<meta charset="UTF-8">'; then
    echo -e "${GREEN}✅ Charset UTF-8 présent${NC}"
else
    echo -e "${RED}❌ Charset non configuré${NC}"
fi

echo ""
echo "========================================"
echo "🎉 Tests terminés !"
echo ""
echo "📱 Testez sur Facebook Debugger:"
echo "   https://developers.facebook.com/tools/debug/"
echo ""
echo "💬 Testez sur WhatsApp:"
echo "   Collez le lien dans une conversation"
echo ""
