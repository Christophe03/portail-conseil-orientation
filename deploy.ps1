# Script de déploiement pour Conseil d'Orientation Mali
Write-Host "🚀 Déploiement de Conseil d'Orientation Mali sur Firebase" -ForegroundColor Green
Write-Host ""

# Construction de l'application
Write-Host "📦 Construction de l'application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la construction" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

Write-Host ""

# Export statique
Write-Host "📤 Export statique..." -ForegroundColor Yellow
npm run export
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de l'export" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

Write-Host ""

# Déploiement sur Firebase
Write-Host "🔥 Déploiement sur Firebase..." -ForegroundColor Yellow
firebase deploy --only hosting
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour continuer"
    exit 1
}

Write-Host ""
Write-Host "✅ Déploiement terminé avec succès !" -ForegroundColor Green
Write-Host "🌐 Site disponible sur : https://conseilorientation-77b13.web.app" -ForegroundColor Cyan
Write-Host ""
Read-Host "Appuyez sur Entrée pour continuer"
