# 🚀 Configuration Meta Tags Open Graph pour Articles

## 📋 Architecture Implémentée

Vous avez une **SPA Vue.js** avec une page détail d'article dynamique (`ArticleDetail.vue`) qui gère tous les articles selon le `slug`.

### ✅ Le Problème (Résolu)

**Avant :**
```
URL partagée → https://egenttogo-edc4e.web.app/article/mon-article
                ↓
        Vue Router charge ArticleDetail.vue
                ↓
        JavaScript récupère l'article depuis Firebase
                ↓
        ❌ WhatsApp/Facebook ne voient RIEN (pas de JavaScript côté serveur)
```

**Après (NOUVELLE SOLUTION):**
```
URL partagée → https://egenttogo-edc4e.web.app/article/mon-article
                ↓
        Cloud Function génère HTML STATIQUE avec meta tags OG
                ↓
        ✅ WhatsApp/Facebook voient l'image et la description
                ↓
        Redirection automatique vers votre SPA Vue.js (#/article/...)
```

---

## 🛠️ Implémentation Complète

### 1️⃣ Cloud Function (functions/index.js)

✅ **Nouvelles fonctionnalités ajoutées :**

- ✅ Route `/article/:slug` qui récupère l'article depuis **Firestore**
- ✅ Génération du **HTML statique** avec tous les meta tags OG
- ✅ Échappement HTML pour sécurité
- ✅ Détection des crawlers (WhatsApp, Facebook, Discord, etc.)
- ✅ Cache intelligent: 1h pour crawlers, 5min pour utilisateurs
- ✅ Page de redirection élégante avec loader
- ✅ Gestion d'erreurs 404

### 2️⃣ Firebase Configuration (firebase.json)

✅ **Rewrites configurés :**

```json
"rewrites": [
  {
    "source": "/article/:slug",
    "function": "prerender"
  },
  // ... autres routes
]
```

✅ **Headers personnalisés :**

```json
"headers": [
  {
    "source": "/article/**",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=3600, s-maxage=3600"
      }
    ]
  }
]
```

---

## 📊 Meta Tags Générés

Pour chaque article, les meta tags suivants sont créés :

### Open Graph (Facebook, WhatsApp, LinkedIn)
```html
<meta property="og:title" content="Titre de l'article - EGENT-TOGO" />
<meta property="og:description" content="Description courte" />
<meta property="og:image" content="URL_IMAGE" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="https://egenttogo-edc4e.web.app/article/slug" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="EGENT-TOGO" />

<!-- Métadonnées d'article -->
<meta property="article:published_time" content="DATE_ISO" />
<meta property="article:author" content="AUTEUR" />
<meta property="article:section" content="CATEGORIE" />
```

### Twitter Card
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Titre" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="URL_IMAGE" />
```

### Balises Standard
```html
<title>Titre de l'article - EGENT-TOGO</title>
<meta name="description" content="Description" />
<meta name="author" content="AUTEUR" />
<link rel="canonical" href="URL_ARTICLE" />
```

---

## 🚀 Déploiement

### Étape 1 : Vérifiez les dépendances

```bash
cd functions
npm install
# firebase-admin doit être présent pour accéder à Firestore
```

### Étape 2 : Déployez les Cloud Functions

```bash
firebase deploy --only functions

# Ou, pour plus de contrôle :
firebase deploy --only functions:prerender
```

### Étape 3 : Déployez Firebase Hosting

```bash
firebase deploy --only hosting
```

### Étape 4 : Déployement complet

```bash
firebase deploy
```

### ✅ Vérification du déploiement

```bash
# Vérifiez les logs
firebase functions:log

# Testez une URL
curl -I "https://egenttogo-edc4e.web.app/article/votre-slug"
```

---

## 🧪 Tests

### 1. Test Direct dans le Navigateur

```
https://egenttogo-edc4e.web.app/article/votre-article-slug
```

✅ Vous devriez voir :
- Page de chargement avec loader
- Redirection automatique vers `/#/article/votre-slug`
- SPA Vue.js se charge correctement

### 2. Test avec Facebook Debugger

1. Allez sur [Facebook Developers - Debugger](https://developers.facebook.com/tools/debug/)
2. Entrez : `https://egenttogo-edc4e.web.app/article/votre-slug`
3. Cliquez "Scrape Again"
4. ✅ Vous devriez voir l'image et la description

### 3. Test WhatsApp/Messenger

1. Copiez le lien : `https://egenttogo-edc4e.web.app/article/votre-slug`
2. Collez dans une conversation WhatsApp/Messenger
3. ✅ L'aperçu avec image devrait s'afficher

### 4. Test avec curl (voir les meta tags)

```bash
curl -H "User-Agent: facebookexternalhit/1.1" \
  "https://egenttogo-edc4e.web.app/article/votre-slug" \
  | grep "og:"
```

---

## ⚙️ Structure Firestore Attendue

Vos documents articles doivent avoir cette structure :

```javascript
{
  id: "article-id",
  slug: "votre-article-slug",           // ✅ REQUIS - doit être unique
  title: "Titre de l'article",
  excerpt: "Description courte pour les aperçus",
  image: "https://...",                 // ✅ URL publique de l'image
  category: "Catégorie",
  date: "2026-01-23T10:00:00Z",
  author: "Nom de l'auteur",
  content: "...",
  // ... autres champs
}
```

### ⚠️ Champs Importants

| Champ | Utilisé pour | Fallback |
|-------|-------------|----------|
| `slug` | Routing | ❌ REQUIS |
| `title` ou `titre` | Meta tags | "Article" |
| `excerpt` | Description OG | title |
| `image` ou `imagePrincipale` | Image OG | og-default.png |
| `category` ou `categorie` | Meta tags article | "Actualités" |
| `date` | Published time | Now |
| `author` ou `auteur` | Author meta | "EGENT-TOGO" |

---

## 🔍 Vérification des Meta Tags

### 1. Dans DevTools (F12)

```html
<!-- Cherchez ces lignes -->
<meta property="og:image" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
```

### 2. Avec des outils en ligne

- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [SEOChecker](https://www.seochecker.com/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

## 📝 Champs de Remplacement (Fallbacks)

La Cloud Function accepte plusieurs noms de champs pour compatibilité :

```javascript
// Title
article.title || article.titre

// Image
article.image || article.imagePrincipale || article.coverImage

// Description
article.excerpt || article.description || article.extrait

// Category
article.category || article.categorie

// Author
article.author || article.auteur

// Date
article.date || new Date().toISOString()
```

---

## 🚨 Dépannage

### Les meta tags n'apparaissent pas

1. ✅ Vérifiez que le **slug existe** dans Firestore
2. ✅ Vérifiez que l'**image est publique** (URL complète)
3. ✅ Testez avec curl :
   ```bash
   curl "https://egenttogo-edc4e.web.app/article/test" | grep "og:"
   ```

### WhatsApp ne montre pas l'aperçu

1. ✅ Attendez 5-10 secondes après le premier partage
2. ✅ Testez dans [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. ✅ Vérifiez que l'image URL est **publiquement accessible**
4. ✅ L'image doit faire **1200x630 minimum**

### La redirection ne fonctionne pas

1. ✅ Vérifiez les logs Firebase : `firebase functions:log`
2. ✅ Testez dans DevTools → Network → voyez si la redirection 301/302 est présente
3. ✅ Vérifiez le Cache-Control (ne doit pas être > 7200)

### Article non trouvé (404)

1. ✅ Vérifiez l'**orthographe du slug**
2. ✅ Vérifiez que l'article **existe vraiment** dans Firestore
3. ✅ Allez sur la console Firestore : https://console.firebase.google.com
4. ✅ Cherchez votre article manuellement

---

## 🎯 Utilisation Après Déploiement

### ✅ Nouveaux liens à partager

**Au lieu de :**
```
❌ https://alifoe.github.io/EGENT_TOGO/article/mon-article
```

**Partagez maintenant :**
```
✅ https://egenttogo-edc4e.web.app/article/mon-article
```

### 📱 Le flux complet

1. Utilisateur reçoit le lien sur WhatsApp/Facebook
2. Cloud Function récupère l'article de Firestore
3. Génère du **HTML statique** avec meta tags OG
4. **WhatsApp/Facebook voient l'aperçu** avec image ✅
5. Utilisateur clique le lien
6. Redirection automatique vers `/#/article/votre-slug`
7. Vue Router charge **ArticleDetail.vue**
8. SPA s'affiche normalement ✅

---

## 📊 Performance & Cache

### Cache Strategy

| Utilisateur | Cache Duration | Raison |
|------------|-----------------|---------|
| Crawler (Facebook, WhatsApp, etc.) | 1 heure (3600s) | Ils scrappent rarement, cache plus longue |
| Utilisateur normal | 5 minutes (300s) | Mise à jour plus rapide pour l'affichage |

### ✅ Headers Envoyés

```
Cache-Control: public, max-age=3600, s-maxage=3600
Content-Type: text/html; charset=utf-8
```

---

## 🔐 Sécurité

### ✅ Implémentée

- ✅ **Échappement HTML** pour toutes les données utilisateur
- ✅ **Validation du slug** (pas de chemins relatifs `../`)
- ✅ **Vérification Firestore** directement (pas de SQL injection possible)
- ✅ **CORS activé** pour les requêtes légitimes
- ✅ **Gestion d'erreurs** sans révéler les détails système

---

## 📚 Ressources

- [Open Graph Protocol](https://ogp.me/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
- [Firebase Hosting Rewrites](https://firebase.google.com/docs/hosting/full-config)

---

## ✅ Checklist Finale

- [ ] Cloud Functions déployées (`firebase deploy --only functions`)
- [ ] firebase.json mis à jour avec rewrites
- [ ] Articles dans Firestore ont tous un `slug` unique
- [ ] Les images sont **publiquement accessibles** (URL complète)
- [ ] Test en local : `curl "http://localhost/article/slug"`
- [ ] Test sur production : Facebook Debugger
- [ ] Test WhatsApp/Messenger : partage un lien
- [ ] Vérifiez les logs : `firebase functions:log`

---

## 🎉 Résultat Final

Après déploiement :

✅ Les liens partagés sur WhatsApp/Facebook affichent les bonnes images
✅ Les utilisateurs sont redirigés vers votre SPA Vue.js
✅ Pas de modification de votre code Vue.js existant
✅ Fonctionne pour TOUS les articles automatiquement
✅ Cache intelligent pour les performances

**C'est l'architecture moderne pour les SPA avec routes dynamiques ! 🚀**
