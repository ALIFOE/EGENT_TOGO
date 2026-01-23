# 🚀 Guide de Déploiement - Meta Tags OG pour Articles

## ⚡ Quick Start (5 minutes)

### 1️⃣ Préparez votre code

```bash
# Allez à la racine du projet
cd c:\Users\conce\Desktop\PROJET_EGENTTOGO\EGENT_TOGO

# Vérifiez que tout est commit
git status

# Si des changements, commit les
git add .
git commit -m "feat: add open graph meta tags for articles"
```

### 2️⃣ Déployez les Cloud Functions

```bash
# Déployez uniquement les functions
firebase deploy --only functions

# ✅ Attendez que ça finisse (1-2 minutes)
# Vous devriez voir : "✔️  Deploy complete!"
```

### 3️⃣ Déployez Firebase Hosting

```bash
# Assurez-vous que votre dist/ est à jour
npm run build  # ou yarn build (Vite)

# Déployez le hosting
firebase deploy --only hosting

# ✅ Attendez que ça finisse (30 secondes)
```

### 4️⃣ Vérifiez le déploiement

```bash
# Test rapide avec PowerShell
.\test-article-meta.ps1 -Slug "votre-article-slug"

# Ou avec curl
curl -I https://egenttogo-edc4e.web.app/article/votre-article-slug
```

---

## 📋 Checklist de Pré-Déploiement

Avant de déployer, vérifiez :

- [ ] Tous les articles dans Firestore ont un champ `slug` unique
- [ ] Les images des articles sont des URLs complètes (https://...)
- [ ] Les images sont **publiquement accessibles** (vérifiez Firebase Storage rules)
- [ ] Vous êtes connecté à Firebase : `firebase login`
- [ ] Vous avez les droits d'accès au projet Firebase (vérifiez dans console.firebase.google.com)

---

## 📊 Étapes Détaillées

### Étape 1 : Installer Firebase CLI (si nécessaire)

```bash
# Installez Firebase CLI globalement
npm install -g firebase-tools

# Vérifiez l'installation
firebase --version
```

### Étape 2 : Authentifiez-vous

```bash
# Connectez-vous à votre compte Firebase
firebase login

# Sélectionnez le bon projet
firebase use ALIFOE/EGENT_TOGO
# ou
firebase use egenttogo-edc4e
```

### Étape 3 : Déploiement Complet

```bash
# Option A: Déploiement complet (recommandé)
firebase deploy

# Option B: Déployer séparément
firebase deploy --only functions
firebase deploy --only hosting
```

### Étape 4 : Vérifiez les logs

```bash
# Affichage en temps réel des logs
firebase functions:log

# Ou affichage des derniers logs
firebase functions:log --limit 50
```

---

## 🧪 Tests Après Déploiement

### Test 1 : Vérification rapide

```bash
# Windows PowerShell
.\test-article-meta.ps1

# Ou bash/zsh
bash test-article-meta.sh
```

### Test 2 : Test manuel

```bash
# Ouvrez votre navigateur et allez à
https://egenttogo-edc4e.web.app/article/VOTRE-SLUG

# Attendez quelques secondes
# Vous devriez être redirigé vers /#/article/VOTRE-SLUG
```

### Test 3 : Vérifier les meta tags dans le code source

```bash
# Affiche le code source brut (premier 1000 caractères)
curl -H "User-Agent: facebookexternalhit/1.1" \
  https://egenttogo-edc4e.web.app/article/VOTRE-SLUG \
  | head -c 1000
```

### Test 4 : Facebook Debugger

1. Allez sur https://developers.facebook.com/tools/debug/
2. Entrez l'URL complète : `https://egenttogo-edc4e.web.app/article/VOTRE-SLUG`
3. Cliquez "Scrape Again"
4. Vérifiez que l'image s'affiche

### Test 5 : WhatsApp

1. Copiez le lien : `https://egenttogo-edc4e.web.app/article/VOTRE-SLUG`
2. Collez dans une conversation WhatsApp
3. L'aperçu avec image devrait s'afficher dans 5-10 secondes

---

## 🔄 Redéploiement (mise à jour)

Si vous changez le code de la Cloud Function :

```bash
# Commitez les changements
git add functions/index.js
git commit -m "fix: update article meta tags handling"

# Redéployez
firebase deploy --only functions
```

---

## 📍 URL de Production

Après déploiement, tous les liens doivent être :

```
✅ https://egenttogo-edc4e.web.app/article/MON-SLUG

❌ NE PAS utiliser
   https://alifoe.github.io/EGENT_TOGO/article/MON-SLUG
   https://www.egenttogo.com/article/MON-SLUG (ancienne URL)
```

---

## 🚨 Dépannage

### Erreur: "permission denied"

```bash
# Assurez-vous que vous êtes connecté
firebase login

# Changez de projet si nécessaire
firebase use egenttogo-edc4e
```

### Erreur: "Could not deploy functions"

```bash
# Vérifiez que Node.js 18+ est installé
node --version

# Réinstallez les dépendances
cd functions
npm install
cd ..

# Redéployez
firebase deploy --only functions
```

### Les meta tags ne s'affichent pas

```bash
# Vérifiez les logs en temps réel
firebase functions:log

# Testez avec curl
curl -H "User-Agent: facebookexternalhit/1.1" \
  https://egenttogo-edc4e.web.app/article/test \
  | grep "og:title"
```

### La redirection ne fonctionne pas

Vérifiez :
1. Que le slug dans l'URL existe dans Firestore
2. Les logs Firebase Functions: `firebase functions:log`
3. Que l'image est accessible (essayez d'ouvrir l'URL de l'image seule)

---

## 📊 Monitoring Après Déploiement

### Vérifier les performances

```bash
# Affiche l'utilisation des ressources
firebase functions:list

# Affiche les données de performance
firebase functions:log --limit 100 | grep "Article"
```

### Voir les erreurs

```bash
# Affiche les dernières erreurs
firebase functions:log --limit 50 | grep -i "error"
```

---

## 🔄 Rollback (si nécessaire)

Si quelque chose ne fonctionne pas, vous pouvez revenir à la version précédente :

```bash
# Via Git (si vous avez une branche)
git checkout <commit-hash> functions/index.js

# Ou redéployez la fonction Puppeteer existante
firebase deploy --only functions

# Puis attendez quelques minutes (Firebase met en cache)
```

---

## 📱 Partage Après Déploiement

### Comment partager un article ?

**Pas de changement dans votre code Vue.js!** Juste la URL change :

**Article list (News.vue) :**
```vue
<!-- Existant - pas de changement -->
<router-link :to="'/article/' + article.slug">
```

**Lorsque vous partagez sur WhatsApp/Facebook :**
```
Copiez cette URL:
https://egenttogo-edc4e.web.app/article/votre-slug

❌ Ne partagez PAS:
   https://alifoe.github.io/EGENT_TOGO/article/votre-slug
```

**Les utilisateurs qui cliquent vont :**
1. Sur `https://egenttogo-edc4e.web.app/article/votre-slug`
2. Cloud Function répond avec le HTML + meta tags OG
3. Redirection automatique vers `/#/article/votre-slug`
4. SPA Vue.js se charge normalement

---

## ✅ Vérification Finale

```bash
# 1. Vérifiez que les functions sont déployées
firebase functions:list

# 2. Testez une URL
curl -I https://egenttogo-edc4e.web.app/article/test

# 3. Vérifiez qu'il y a une redirection
curl -L https://egenttogo-edc4e.web.app/article/test | grep "location"

# 4. Testez dans Facebook Debugger
# https://developers.facebook.com/tools/debug/
```

---

## 📞 Support

Si vous avez des problèmes :

1. **Vérifiez les logs:** `firebase functions:log`
2. **Testez en local:** Émulez les functions avec `firebase emulators:start`
3. **Consultez la documentation:** [Article_META_TAGS_SETUP.md](./ARTICLE_META_TAGS_SETUP.md)
4. **Vérifiez Firebase Console:** https://console.firebase.google.com/

---

## 🎉 C'est Tout!

Après ces étapes, votre architecture meta tags devrait être opérationnelle ! 

✅ Meta tags générés
✅ Images affichées sur WhatsApp/Facebook
✅ Redirection automatique vers SPA Vue.js
✅ Aucun changement dans votre code Vue.js

**Bonne chance! 🚀**
