# Script de vérification avant déploiement (Windows PowerShell)

Write-Host "🔍 Vérification de la configuration Cloud Functions..." -ForegroundColor Cyan
Write-Host ""

# Vérifier les fichiers essentiels
Write-Host "📁 Vérification des fichiers..." -ForegroundColor Yellow
$files = @(
  "functions\index.js",
  "functions\package.json",
  "firebase.json",
  ".env.production"
)

foreach ($file in $files) {
  if (Test-Path $file) {
    Write-Host "  ✅ $file" -ForegroundColor Green
  } else {
    Write-Host "  ❌ $file - MANQUANT!" -ForegroundColor Red
    exit 1
  }
}

# Vérifier les dépendances
Write-Host ""
Write-Host "📦 Vérification des dépendances Node.js..." -ForegroundColor Yellow
if (Test-Path "functions\node_modules") {
  Write-Host "  ✅ node_modules existe" -ForegroundColor Green
} else {
  Write-Host "  ❌ node_modules manquent - Exécutez: cd functions; npm install" -ForegroundColor Red
  exit 1
}

# Valider la syntaxe JavaScript
Write-Host ""
Write-Host "✔️  Validation de la syntaxe..." -ForegroundColor Yellow
try {
  $output = node -c "functions\index.js" 2>&1
  Write-Host "  ✅ functions\index.js - Syntaxe valide" -ForegroundColor Green
} catch {
  Write-Host "  ❌ Erreur de syntaxe dans functions\index.js" -ForegroundColor Red
  exit 1
}

# Vérifier firebase.json
Write-Host ""
Write-Host "📋 Vérification de firebase.json..." -ForegroundColor Yellow
$firebaseContent = Get-Content firebase.json -Raw
if ($firebaseContent -match '"functions"') {
  Write-Host "  ✅ Section 'functions' trouvée" -ForegroundColor Green
} else {
  Write-Host "  ❌ Section 'functions' manquante" -ForegroundColor Red
  exit 1
}

if ($firebaseContent -match '"prerender"') {
  Write-Host "  ✅ Rewrite 'prerender' configuré" -ForegroundColor Green
} else {
  Write-Host "  ⚠️  Rewrite 'prerender' non trouvé - Vérifiez firebase.json" -ForegroundColor Yellow
}

# Vérifier Firebase CLI
Write-Host ""
Write-Host "🔑 Vérification de Firebase CLI..." -ForegroundColor Yellow
if (Get-Command firebase -ErrorAction SilentlyContinue) {
  Write-Host "  ✅ firebase-tools installé" -ForegroundColor Green
  firebase --version
} else {
  Write-Host "  ❌ firebase-tools non installé - Exécutez: npm install -g firebase-tools" -ForegroundColor Red
  exit 1
}

# Vérifier l'authentification Firebase
Write-Host ""
Write-Host "🔐 Vérification de l'authentification..." -ForegroundColor Yellow
try {
  $projects = firebase projects:list 2>&1
  Write-Host "  ✅ Authentifié avec Firebase" -ForegroundColor Green
  Write-Host ""
  Write-Host "🎯 Projet actif:" -ForegroundColor Cyan
  firebase projects:list | Select-String -Pattern '\[|default'
} catch {
  Write-Host "  ❌ Non authentifié - Exécutez: firebase login" -ForegroundColor Red
  exit 1
}

# Résumé
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ Toutes les vérifications sont passées!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "1. Compiler le frontend: npm run build"
Write-Host "2. Tester localement: firebase emulators:start --only functions,hosting"
Write-Host "3. Déployer: firebase deploy --only functions,hosting"
Write-Host ""
Write-Host "Pour plus d'infos, consultez: functions/CLOUD_FUNCTIONS_README.md"
