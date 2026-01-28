#!/bin/bash
# Script de configuration rapide pour les emails de devis
# Usage: bash setup-email-quotes.sh

echo "════════════════════════════════════════════════════════════════"
echo "🚀 Configuration des Emails de Devis - EGENT TOGO"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Vérifier si .env.local existe
if [ -f "functions/.env.local" ]; then
    echo "✅ Fichier functions/.env.local trouvé"
else
    echo "⚠️  Fichier functions/.env.local NON trouvé"
    echo ""
    echo "📝 Veuillez créer functions/.env.local avec le contenu suivant:"
    echo ""
    cat << 'EOF'
GMAIL_USER=egenttogo@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=concealiphe4@gmail.com
FRONTEND_URL=https://www.egenttogo.com
EOF
    echo ""
    echo "Remplacez xxxx xxxx xxxx xxxx par votre mot de passe d'application Gmail"
    echo ""
fi

echo ""
echo "📦 Installation des dépendances..."
cd functions
npm install

echo ""
echo "✅ Vérification du package.json..."
if grep -q '"nodemailer"' package.json; then
    echo "✅ nodemailer est installé"
else
    echo "⚠️  nodemailer non trouvé, installation..."
    npm install nodemailer
fi

cd ..

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "📋 Checklist avant déploiement:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "[ ] 1. Variables d'environnement configurées"
echo "       - functions/.env.local créé avec les bonnes valeurs"
echo ""
echo "[ ] 2. Mot de passe Gmail généré"
echo "       - https://myaccount.google.com/security"
echo "       - Authentification 2FA activée"
echo "       - Mot de passe d'application copié"
echo ""
echo "[ ] 3. Dépendances installées"
echo "       - npm install exécuté dans functions/"
echo ""
echo "[ ] 4. Code déployé"
echo "       - firebase deploy --only functions"
echo ""

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "🚀 Pour déployer:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "firebase deploy --only functions"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "✅ Vérifier les logs:"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "firebase functions:log"
echo ""

echo "════════════════════════════════════════════════════════════════"
echo "📧 Configuration terminée!"
echo "════════════════════════════════════════════════════════════════"
