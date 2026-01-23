# ✅ Vérification Rapide - Meta Tags OG

## 🎯 Avez-vous tout en place ?

Répondez OUI à chacune de ces questions avant de déployer.

---

## 📋 Structure Firestore

```
❓ Mes articles sont dans la collection 'articles' ?
   [ ] OUI
   [ ] NON → Changez le code dans functions/index.js ligne ~72
            .collection('articles')

❓ Chaque article a un champ 'slug' unique ?
   [ ] OUI
   [ ] NON → Ajoutez le champ 'slug' à chaque article

❓ Les slugs sont en minuscules avec tirets (kebab-case) ?
   [ ] OUI (ex: notre-engagement-en-faveur-de-la-durabilit)
   [ ] NON → Normalisez les slugs

❓ Les images sont des URL complètes (https://...) ?
   [ ] OUI
   [ ] NON → Convertissez les références en URLs publiques
```

---

## 🔐 Autorisations Firebase

```
❓ Je peux accéder à la console Firebase ?
   [ ] OUI → https://console.firebase.google.com
   [ ] NON → Demandez l'accès à l'administrateur

❓ Je suis propriétaire/éditeur du projet EGENT_TOGO ?
   [ ] OUI
   [ ] NON → Demandez les droits

❓ Les images dans Storage sont accessibles publiquement ?
   [ ] OUI
   [ ] NON → Mettez à jour les règles Storage
```

---

## 💻 Environnement Local

```
❓ Node.js 18+ est installé ?
   [ ] OUI → Vérifiez: node --version
   [ ] NON → Installez https://nodejs.org/

❓ Firebase CLI est installé ?
   [ ] OUI → Vérifiez: firebase --version
   [ ] NON → Installez: npm install -g firebase-tools

❓ Je suis authentifié avec Firebase ?
   [ ] OUI → Vérifiez: firebase auth:list
   [ ] NON → Exécutez: firebase login
```

---

## 📝 Code et Configuration

```
❓ Le fichier functions/index.js est mis à jour ?
   [ ] OUI → Contient la route /article/:slug
   [ ] NON → Cherchez la ligne "app.get('/article/:slug'...)"

❓ Le firebase.json est mis à jour ?
   [ ] OUI → Contient le rewrite pour /article/**
   [ ] NON → Cherchez "source": "/article/:slug"

❓ Le package.json (fonctions) a firebase-admin ?
   [ ] OUI
   [ ] NON → Exécutez: cd functions && npm install firebase-admin
```

---

## 🚀 Prêt à Déployer ?

### Avant de Déployer

- [ ] Commit des changements
  ```bash
  git add .
  git commit -m "feat: add open graph meta tags for articles"
  ```

- [ ] Vérification locale (optionnel)
  ```bash
  firebase emulators:start --only functions
  ```

### Déploiement

- [ ] Déployer les Cloud Functions
  ```bash
  firebase deploy --only functions
  ```

- [ ] Déployer Firebase Hosting
  ```bash
  npm run build  # ou yarn build
  firebase deploy --only hosting
  ```

### Après Déploiement

- [ ] Tester avec le script
  ```bash
  .\test-article-meta.ps1 -Slug "votre-slug"
  ```

- [ ] Vérifier les logs
  ```bash
  firebase functions:log
  ```

- [ ] Tester sur Facebook Debugger
  ```
  https://developers.facebook.com/tools/debug/
  ```

- [ ] Tester sur WhatsApp
  ```
  Collez le lien dans une conversation
  ```

---

## 🔧 Commandes Importantes

### Vérification

```bash
# Vérifier que vous êtes connecté
firebase auth:list

# Vérifier le projet sélectionné
firebase use

# Voir les functions déployées
firebase functions:list

# Voir les logs
firebase functions:log
```

### Déploiement

```bash
# Déployer tout
firebase deploy

# Déployer juste les functions
firebase deploy --only functions

# Déployer juste le hosting
firebase deploy --only hosting

# Afficher les plans de déploiement (sans déployer)
firebase deploy --dry-run
```

### Test

```bash
# Test en local (simulateur)
firebase emulators:start

# Test depuis curl
curl -I https://egenttogo-edc4e.web.app/article/test

# Test avec user-agent Facebook
curl -H "User-Agent: facebookexternalhit/1.1" \
  https://egenttogo-edc4e.web.app/article/test
```

---

## 📊 Points de Contrôle

### 1️⃣ Structure Firestore

```javascript
// ✅ Bon format
{
  id: "123",
  slug: "notre-article",           // ✅ REQUIS
  title: "Mon Article",
  excerpt: "Description courte",
  image: "https://example.com/image.jpg",  // ✅ URL complète
  category: "Actualités",
  date: "2026-01-23T10:00:00Z",
  author: "EGENT-TOGO",
  content: "..."
}
```

### 2️⃣ Accès à Firestore

```bash
# Vérifiez que la Cloud Function peut accéder à Firestore
firebase functions:log | grep "Article"

# Cherchez les messages "Article trouvé" ou "Article non trouvé"
```

### 3️⃣ Meta Tags Générés

```bash
# Vérifiez que les meta tags sont présents
curl https://egenttogo-edc4e.web.app/article/test | grep "og:"

# Cherchez:
# - og:title
# - og:description
# - og:image
# - og:url
```

### 4️⃣ Redirection

```bash
# Vérifiez que la redirection fonctionne
curl -L https://egenttogo-edc4e.web.app/article/test

# Vous devriez voir le contenu de la SPA (index.html)
```

---

## 🎯 Objectifs de Test

### Test 1: Accessible

```
✅ Si vous pouvez accéder à:
   https://egenttogo-edc4e.web.app/article/VOTRE-SLUG
```

### Test 2: Meta Tags

```
✅ Si curl montre:
   <meta property="og:title" ...
   <meta property="og:image" ...
   <meta property="og:description" ...
```

### Test 3: Redirection

```
✅ Si vous êtes redirigé vers:
   /#/article/VOTRE-SLUG
```

### Test 4: Facebook

```
✅ Si Facebook Debugger montre l'image et la description
```

### Test 5: WhatsApp

```
✅ Si l'aperçu s'affiche quand vous partagez le lien
```

---

## 🚨 En Cas de Problème

### Problème: "Article not found" (404)

```
1. Vérifiez que le slug existe dans Firestore
2. Allez sur https://console.firebase.google.com
3. Collection 'articles' → Cherchez l'article
4. Vérifiez le champ 'slug'
```

### Problème: Pas de meta tags

```
1. Vérifiez les logs: firebase functions:log
2. Cherchez des messages d'erreur
3. Testez avec curl: curl https://egenttogo-edc4e.web.app/article/test
4. Vérifiez que Firestore a l'article
```

### Problème: Image ne s'affiche pas

```
1. Vérifiez que l'URL de l'image est complète (https://...)
2. Essayez d'ouvrir l'image dans le navigateur
3. Vérifiez que l'image n'est pas bloquée par les règles Firebase Storage
```

### Problème: Pas de redirection

```
1. Ouvrez DevTools (F12)
2. Allez dans l'onglet "Network"
3. Cliquez sur la requête vers /article/test
4. Vérifiez que vous voyez une redirection (301/302)
```

---

## ✅ Checklist Finale Avant Go Live

- [ ] Tous les articles ont un slug unique
- [ ] Les images sont des URLs complètes
- [ ] Les images sont accessibles publiquement
- [ ] firebase.json est mis à jour
- [ ] functions/index.js est mis à jour
- [ ] Déployé sur production
- [ ] Tests locaux réussis
- [ ] Tests Facebook Debugger réussis
- [ ] Tests WhatsApp réussis

---

## 🎉 Prêt !

Si vous avez coché toutes les cases, vous êtes prêt à déployer ! 🚀

Pour les instructions détaillées, consultez:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [ARTICLE_META_TAGS_SETUP.md](./ARTICLE_META_TAGS_SETUP.md)
