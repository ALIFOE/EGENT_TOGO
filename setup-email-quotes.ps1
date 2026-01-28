# Script de configuration rapide pour les emails de devis
# Usage: .\setup-email-quotes.ps1

Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 Configuration des Emails de Devis - EGENT TOGO" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Vérifier si .env.local existe
$envFile = "functions\.env.local"
if (Test-Path $envFile) {
    Write-Host "✅ Fichier functions\.env.local trouvé" -ForegroundColor Green
} else {
    Write-Host "⚠️  Fichier functions\.env.local NON trouvé" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📝 Veuillez créer functions\.env.local avec le contenu suivant:" -ForegroundColor Yellow
    Write-Host ""
    $content = @"
GMAIL_USER=egenttogo@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=concealiphe4@gmail.com
FRONTEND_URL=https://www.egenttogo.com
"@
    Write-Host $content -ForegroundColor White
    Write-Host ""
    Write-Host "Remplacez xxxx xxxx xxxx xxxx par votre mot de passe d'application Gmail" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "📦 Installation des dépendances..." -ForegroundColor Cyan
Push-Location functions
npm install
Pop-Location

Write-Host ""
Write-Host "✅ Vérification du package.json..." -ForegroundColor Cyan
$packageJson = Get-Content "functions\package.json" -Raw
if ($packageJson -match '"nodemailer"') {
    Write-Host "✅ nodemailer est installé" -ForegroundColor Green
} else {
    Write-Host "⚠️  nodemailer non trouvé, installation..." -ForegroundColor Yellow
    Push-Location functions
    npm install nodemailer
    Pop-Location
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📋 Checklist avant déploiement:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "[ ] 1. Variables d'environnement configurées" -ForegroundColor White
Write-Host "       - functions\.env.local créé avec les bonnes valeurs" -ForegroundColor Gray
Write-Host ""
Write-Host "[ ] 2. Mot de passe Gmail généré" -ForegroundColor White
Write-Host "       - https://myaccount.google.com/security" -ForegroundColor Gray
Write-Host "       - Authentification 2FA activée" -ForegroundColor Gray
Write-Host "       - Mot de passe d'application copié" -ForegroundColor Gray
Write-Host ""
Write-Host "[ ] 3. Dépendances installées" -ForegroundColor White
Write-Host "       - npm install exécuté dans functions/" -ForegroundColor Gray
Write-Host ""
Write-Host "[ ] 4. Code déployé" -ForegroundColor White
Write-Host "       - firebase deploy --only functions" -ForegroundColor Gray
Write-Host ""

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚀 Pour déployer:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "firebase deploy --only functions" -ForegroundColor Green
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Vérifier les logs:" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "firebase functions:log" -ForegroundColor Green
Write-Host ""

Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📧 Configuration terminée!" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
