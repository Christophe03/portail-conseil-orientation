@echo off
echo 🚀 Déploiement de Conseil d'Orientation Mali sur Firebase
echo.

echo 📦 Construction de l'application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la construction
    pause
    exit /b 1
)

echo.
echo 📤 Export statique...
call npm run export
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'export
    pause
    exit /b 1
)

echo.
echo 🔥 Déploiement sur Firebase...
call firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du déploiement
    pause
    exit /b 1
)

echo.
echo ✅ Déploiement terminé avec succès !
echo 🌐 Site disponible sur : https://conseilorientation-77b13.web.app
echo.
pause
