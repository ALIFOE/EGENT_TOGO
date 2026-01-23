# 🚀 Script pour committer et pousser les changements (Windows)
# Usage: .\commit-og-meta-tags.ps1

Write-Host "📝 Commit des changements Meta Tags OG" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""

# Vérifier que git est initialisé
if (!(Test-Path ".git")) {
    Write-Host "❌ Pas de dépôt Git trouvé!" -ForegroundColor Red
    exit 1
}

# Afficher les changements
Write-Host "📊 Changements détectés:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Demander confirmation
$confirmation = Read-Host "Voulez-vous continuer? (y/n)"
if ($confirmation -ne "y" -and $confirmation -ne "Y") {
    Write-Host "Annulé."
    exit 1
}

Write-Host ""
Write-Host "🔄 Ajout des fichiers..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "💾 Commit en cours..." -ForegroundColor Cyan
$commitMessage = @"
feat(og-meta-tags): implement dynamic open graph meta tags for articles

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
- firebase.json: Added rewrites and headers configuration
"@

git commit -m $commitMessage

Write-Host ""
Write-Host "📤 Affichage de l'historique..." -ForegroundColor Yellow
git log --oneline -3

Write-Host ""
$pushConfirm = Read-Host "Voulez-vous pousser vers le dépôt distant? (y/n)"
if ($pushConfirm -eq "y" -or $pushConfirm -eq "Y") {
    Write-Host ""
    Write-Host "🚀 Push en cours..." -ForegroundColor Cyan
    git push
    Write-Host ""
    Write-Host "✅ Changements poussés avec succès!" -ForegroundColor Green
} else {
    Write-Host "Les changements sont committs mais pas poussés." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Green
Write-Host "✅ Commit terminé!" -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Lire: QUICK_VERIFICATION.md"
Write-Host "2. Suivre: DEPLOYMENT_GUIDE.md"
Write-Host ""
