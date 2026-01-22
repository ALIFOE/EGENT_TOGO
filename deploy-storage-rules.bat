@echo off
REM Déployer les règles Firebase Storage
echo 📋 Déploiement des règles Firebase Storage...
firebase deploy --only storage:rules --project egenttogo-edc4e
echo ✅ Règles déployées!
