# 🧪 Script de test pour la configuration Meta Tags Open Graph (Windows)
# Usage: .\test-article-meta.ps1 -Slug "notre-engagement-en-faveur-de-la-durabilit"

param(
    [string]$SiteUrl = "https://egenttogo-edc4e.web.app",
    [string]$Slug = "notre-engagement-en-faveur-de-la-durabilit"
)

Write-Host "🧪 Test Meta Tags Articles - EGENT-TOGO" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host ""

Write-Host "📍 Site URL: $SiteUrl" -ForegroundColor Cyan
Write-Host "📰 Article Slug: $Slug" -ForegroundColor Cyan
Write-Host ""

$ArticleUrl = "$SiteUrl/article/$Slug"

# Test 1: Vérifier que la URL est accessible
Write-Host "1️⃣  Test d'accessibilité..." -ForegroundColor Yellow
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $ArticleUrl -UserAgent "facebookexternalhit/1.1" -ErrorAction Stop
    Write-Host "✅ URL accessible (HTTP $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ URL non accessible ($($_.Exception.Message))" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Test 2: Vérifier les meta tags OG
Write-Host "2️⃣  Vérification des meta tags Open Graph..." -ForegroundColor Yellow
Write-Host ""

$html = $response.Content

# Vérifier les meta tags
$patterns = @{
    "og:title" = '<meta property="og:title"[^>]*content="([^"]*)"'
    "og:description" = '<meta property="og:description"[^>]*content="([^"]*)"'
    "og:image" = '<meta property="og:image"[^>]*content="([^"]*)"'
    "og:url" = '<meta property="og:url"[^>]*content="([^"]*)"'
    "og:type" = '<meta property="og:type"[^>]*content="([^"]*)"'
}

foreach ($key in $patterns.Keys) {
    if ($html -match $patterns[$key]) {
        Write-Host "✅ $key" -ForegroundColor Green
        Write-Host "   $($matches[1])" -ForegroundColor Gray
    } else {
        Write-Host "❌ $key MANQUANT" -ForegroundColor Red
    }
}

Write-Host ""

# Test 3: Vérifier les headers
Write-Host "3️⃣  Vérification des headers HTTP..." -ForegroundColor Yellow
Write-Host ""

$headers = $response.Headers

if ($headers.ContainsKey("Cache-Control")) {
    Write-Host "✅ Cache-Control présent" -ForegroundColor Green
    Write-Host "   $($headers['Cache-Control'])" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Cache-Control non détecté" -ForegroundColor Yellow
}

if ($response.Headers."Content-Type" -like "*text/html*") {
    Write-Host "✅ Content-Type: text/html" -ForegroundColor Green
} else {
    Write-Host "❌ Content-Type incorrect" -ForegroundColor Red
}

Write-Host ""

# Test 4: Vérifier la redirection
Write-Host "4️⃣  Vérification de la redirection..." -ForegroundColor Yellow
Write-Host ""

if ($html -match '<meta http-equiv="refresh"') {
    Write-Host "✅ Redirection automatique configurée" -ForegroundColor Green
    if ($html -match '<meta http-equiv="refresh"[^>]*content="([^"]*)"') {
        Write-Host "   $($matches[1])" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠️  Pas de redirection meta détectée" -ForegroundColor Yellow
}

Write-Host ""

# Test 5: Checker la structure de la page
Write-Host "5️⃣  Vérification de la structure..." -ForegroundColor Yellow
Write-Host ""

if ($html -match '<!DOCTYPE html>') {
    Write-Host "✅ DOCTYPE html présent" -ForegroundColor Green
} else {
    Write-Host "❌ DOCTYPE html MANQUANT" -ForegroundColor Red
}

if ($html -match '<html lang="fr">') {
    Write-Host "✅ Langue fr configurée" -ForegroundColor Green
} else {
    Write-Host "❌ Langue non configurée" -ForegroundColor Red
}

if ($html -match '<meta charset="UTF-8">') {
    Write-Host "✅ Charset UTF-8 présent" -ForegroundColor Green
} else {
    Write-Host "❌ Charset non configuré" -ForegroundColor Red
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Green
Write-Host "🎉 Tests terminés !" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Testez sur Facebook Debugger:" -ForegroundColor Cyan
Write-Host "   https://developers.facebook.com/tools/debug/" -ForegroundColor Gray
Write-Host ""
Write-Host "💬 Testez sur WhatsApp:" -ForegroundColor Cyan
Write-Host "   Collez le lien dans une conversation" -ForegroundColor Gray
Write-Host ""

# Afficher le HTML si demandé
if ($PSBoundParameters.ContainsKey('Verbose')) {
    Write-Host ""
    Write-Host "📄 HTML brut (premiers 2000 caractères):" -ForegroundColor Yellow
    Write-Host $html.Substring(0, [Math]::Min(2000, $html.Length))
}
