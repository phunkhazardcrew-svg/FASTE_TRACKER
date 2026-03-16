#!/bin/bash
# === FASTEN_TRACKER GitHub Deploy ===
# Vor Nutzung: Ersetze DEIN_USERNAME mit deinem GitHub-Usernamen

USERNAME="DEIN_USERNAME"
REPO="FASTEN_TRACKER"

echo "📦 FASTEN_TRACKER → GitHub Pages Deploy"
echo "========================================="

# Repo erstellen (braucht GitHub CLI oder manuell)
echo ""
echo "1) Erstelle das Repo auf github.com/new → Name: FASTEN_TRACKER → Public → Create"
echo "   Oder mit GitHub CLI: gh repo create $REPO --public"
echo ""

cd "$(dirname "$0")"

git init
git add index.html sw.js manifest.json
git commit -m "🚀 Fasten Companion PWA - initial deploy"
git branch -M main
git remote add origin "https://github.com/$USERNAME/$REPO.git"
git push -u origin main

echo ""
echo "✅ Pushed! Jetzt noch GitHub Pages aktivieren:"
echo "   → Settings → Pages → Branch: main → Save"
echo ""
echo "🌐 Deine App wird verfügbar unter:"
echo "   https://$USERNAME.github.io/$REPO/"
echo ""
echo "📱 Diese URL auf dem Xiaomi in Chrome öffnen → Installieren!"
