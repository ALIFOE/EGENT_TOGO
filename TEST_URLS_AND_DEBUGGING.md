# 🔗 URLS DE TEST - Blog Social Sharing

## 🌐 URLs Locales (Development)

### Pages Principales
```
Home Page
http://localhost:5174/EGENT_TOGO/

Produits
http://localhost:5174/EGENT_TOGO/produits

Articles/Actualités
http://localhost:5174/EGENT_TOGO/actualites

Galerie
http://localhost:5174/EGENT_TOGO/galerie
```

### Articles Blog (À Tester le Partage Social)
```
Article 1: Inauguration
http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre

Article 2: Partenariat
http://localhost:5174/EGENT_TOGO/article/partenariat-international

Article 3: Nouvelle Promotion
http://localhost:5174/EGENT_TOGO/article/nouvelle-formation-solaire

Article 4: Accord Gouvernement
http://localhost:5174/EGENT_TOGO/article/accord-gouvernement

Article 5: Prix Innovation
http://localhost:5174/EGENT_TOGO/article/prix-innovation
```

### Admin Panel
```
Admin Produits
http://localhost:5174/EGENT_TOGO/admin/products

Admin Galerie
http://localhost:5174/EGENT_TOGO/admin/gallery

Admin Articles (À Créer)
http://localhost:5174/EGENT_TOGO/admin/news
```

## 🧪 Test des Meta Tags

### Méthode 1: Inspecteur Browser (F12)
```
1. Ouvrir une page article: 
   http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre

2. Appuyer F12 → Onglet "Éléments"

3. Chercher dans <head>:
   <meta property="og:title" content="...">
   <meta property="og:image" content="...">
   <meta property="og:description" content="...">
   <meta property="og:url" content="...">
   <meta property="og:type" content="article">
```

### Méthode 2: Console Browser
```javascript
// Copier/Coller dans la console (F12 → Console)

// Vérifier si les meta tags existent
console.log(document.querySelectorAll('meta[property^="og:"]'))

// Voir les valeurs
Array.from(document.querySelectorAll('meta[property^="og:"]'))
  .forEach(tag => console.log(tag.getAttribute('property'), ':', tag.getAttribute('content')))

// Résultat attendu:
// og:title : Inauguration du nouveau centre - EGENT-TOGO
// og:description : Découvrez le lancement officiel...
// og:image : https://...
// og:url : http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
// og:type : article
```

## 🌍 Outils de Test Social Sharing

### Facebook Sharing Debugger
1. Accéder à: https://developers.facebook.com/tools/debug/
2. Coller l'URL article locale ou en prod
3. Vérifier:
   - Aperçu du titre
   - Aperçu de la description
   - **Aperçu de l'image** ✅

### Twitter Card Validator
1. Accéder à: https://cards-dev.twitter.com/validator
2. Coller l'URL article
3. Vérifier:
   - Type card: "summary_large_image"
   - Image s'affiche

### LinkedIn Post Inspector
1. Accéder à: https://www.linkedin.com/post-inspector/
2. Coller l'URL article
3. Vérifier l'aperçu avec image

### Open Graph Inspector (Métadonnées)
1. Accéder à: https://www.opengraphcheck.com/
2. Coller l'URL article
3. Vérifier tous les meta tags OG

## 🧪 Manuel Test Plan

### Test 1: Vérifier les Meta Tags
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. F12 → Éléments
3. Chercher <meta property="og:image">
4. Vérifier que content URL est valide

Expected:
✅ Meta tags présents
✅ Images URLs valides
✅ Contenu non-vide
```

### Test 2: Tester Partage Facebook
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. Cliquer bouton "Facebook" (sidebar right)
3. S'authentifier si nécessaire
4. Voir la page de partage Facebook

Expected:
✅ Aperçu avec TITRE
✅ Aperçu avec DESCRIPTION
✅ Aperçu avec IMAGE ⭐
✅ Aperçu avec URL correcte
```

### Test 3: Tester Partage Twitter
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. Cliquer bouton "Twitter" (sidebar right)
3. S'authentifier si nécessaire
4. Voir la page de composition du tweet

Expected:
✅ Carte Twitter summary_large_image
✅ IMAGE attachée au preview
✅ Titre et description présents
```

### Test 4: Tester Partage LinkedIn
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. Cliquer bouton "LinkedIn" (sidebar right)
3. S'authentifier si nécessaire
4. Voir le modal de partage LinkedIn

Expected:
✅ Aperçu avec IMAGE
✅ Titre présent
✅ Description présente
```

### Test 5: Tester Copier Lien
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. Cliquer bouton "Copier le lien" (🔗)
3. Un alert doit dire "Lien copié dans le presse-papiers!"

Expected:
✅ Alert de confirmation
✅ URL copiée en clipboard
✅ Lien contient l'article slug correct
```

### Test 6: Vérifier Articles Liés
```
Steps:
1. Ouvrir: http://localhost:5174/EGENT_TOGO/article/inauguration-nouveau-centre
2. Scroller jusqu'en bas
3. Voir section "Articles liés"

Expected:
✅ Section "Articles liés" visible
✅ Max 2 articles affichés
✅ Articles sont de la même catégorie (Actualité)
✅ Article courant n'est pas dans la liste
✅ Cliquer sur un article navigue vers lui
```

## 🔍 Debugging Console Commands

```javascript
// Vérifier tous les meta tags
console.table(
  Array.from(document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]'))
    .map(m => ({
      name: m.getAttribute('property') || m.getAttribute('name'),
      content: m.getAttribute('content')
    }))
)

// Vérifier JSON-LD
console.log(
  JSON.parse(
    document.querySelector('script[type="application/ld+json"]').innerHTML
  )
)

// Vérifier image OG
console.log('OG Image:', document.querySelector('meta[property="og:image"]')?.content)

// Vérifier URL actuelle
console.log('Current URL:', window.location.href)

// Vérifier router params
// (Pour Vue Router)
console.log('Route:', document.title)
```

## 🎯 URLs Production (Futures)

**À partir de**: ADMIN_ARTICLES_IMPLEMENTATION_PLAN.md

```
Production URLs (une fois déployé):
https://www.egenttogo.com/article/inauguration-nouveau-centre
https://www.egenttogo.com/actualites
https://www.egenttogo.com/

Avec subpath GitHub Pages:
https://alifoe.github.io/EGENT_TOGO/article/inauguration-nouveau-centre
https://alifoe.github.io/EGENT_TOGO/actualites
```

## 📱 Test sur Mobile

### Test sur Smartphone (Local)
```
1. Trouver l'adresse IP locale:
   ipconfig getifaddr en0  (macOS)
   ou voir dans les réseaux Windows

2. Depuis le téléphone, accéder à:
   http://[IP_ADDRESS]:5174/EGENT_TOGO/article/inauguration-nouveau-centre

3. Vérifier:
   ✅ Design responsive
   ✅ Images chargent correctement
   ✅ Boutons partage clickables
   ✅ Contenu lisible
```

## 🐛 Troubleshooting

### Problème: Meta tags n'apparaissent pas
```
Solution:
1. Vérifier que setMeta() a été appelé
2. Ouvrir F12 Console → voir les logs
3. Vérifier la signature de setMeta() est correcte
4. Rafraîchir la page (Ctrl+Shift+R)
```

### Problème: Image ne s'affiche pas dans aperçu
```
Solutions:
1. Vérifier og:image URL est valide
2. Vérifier l'image existe (pas 404)
3. Vérifier CORS headers si externe
4. Vérifier taille image (min 200x200)
5. Utiliser absolute URL (http://...) pas relative
```

### Problème: Articles liés ne s'affichent pas
```
Solutions:
1. Vérifier Firebase a des articles avec catégories
2. Vérifier catégories correspondent exactement
3. Vérifier article courant a un slug
4. Vérifier relatedArticles.value est rempli
```

## 📊 Checklist de Validation

```
☐ Meta tags présents dans <head>
  ☐ og:title
  ☐ og:description
  ☐ og:image (URL valide)
  ☐ og:url
  ☐ og:type = "article"
  ☐ twitter:card = "summary_large_image"

☐ Contenu page
  ☐ Titre article affiche
  ☐ Image hero affiche
  ☐ Contenu HTML rendu correctement
  ☐ Articles liés visibles
  ☐ Design EGENT-TOGO intact

☐ Boutons partage
  ☐ Facebook clickable
  ☐ Twitter clickable
  ☐ LinkedIn clickable
  ☐ Copier lien clickable

☐ Navigation
  ☐ /actualites charge liste
  ☐ /article/:slug charge détail
  ☐ Clic article → détail fonctionne
  ☐ Articles liés cliquables
  ☐ Bouton retour fonctionne

☐ Performance
  ☐ Page charge rapidement
  ☐ Pas d'erreurs console
  ☐ Images optimisées
  ☐ Pas de rechargement infini
```

---

**Dernière mise à jour**: Janvier 2026
**Status**: ✅ PRÊT POUR TEST
**Prochaines URLs**: Admin news à créer
