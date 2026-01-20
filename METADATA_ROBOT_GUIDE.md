# 🤖 Système de Détection des Métadonnées SEO - EGENT-TOGO

## Vue d'ensemble

Un **robot de détection automatique** a été implémenté pour garantir que les images des articles s'affichent correctement lors du partage sur les réseaux sociaux (Facebook, Twitter, LinkedIn, WhatsApp).

## Architecture du système

### 1. **useSEOMeta.js** - Robot de Gestion des Métadonnées
Le composable principal qui gère la création et la mise à jour des métadonnées.

**Fonctionnalités :**
- ✅ Détection automatique des images (locales, importées, URLs absolues)
- ✅ Conversion des chemins d'images en URLs absolues
- ✅ Création des balises Open Graph (og:title, og:image, og:description, etc.)
- ✅ Création des balises Twitter Card (twitter:card, twitter:image, etc.)
- ✅ Génération des données structurées JSON-LD pour les moteurs de recherche
- ✅ Support complet des métadonnées pour partage social

**Balises générées :**
```
Open Graph:
- og:title
- og:description
- og:image
- og:image:width
- og:image:height
- og:image:secure_url
- og:url
- og:type
- og:site_name
- og:locale

Twitter Cards:
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image
- twitter:image:alt
- twitter:site
- twitter:creator

Meta Standards:
- description
- keywords
- viewport
- language
- canonical URL

JSON-LD:
- Schema.org NewsArticle ou WebPage
```

### 2. **useMetadataValidator.js** - Robot de Validation
Composable pour vérifier et valider les métadonnées.

**Fonctionnalités :**
- ✅ Validation des images (vérification d'accessibilité)
- ✅ Rapport de validation complet des métadonnées
- ✅ Détection des balises manquantes
- ✅ Vérification de l'optimisation (longueur de description)
- ✅ Génération de résumé des métadonnées
- ✅ Prévisualisation du rendu sur les réseaux sociaux

**Méthodes :**
- `validateImage(url)` - Vérifie qu'une image est accessible
- `validateAllMetadata()` - Rapport complet de validation
- `getSummary()` - Résumé simple des métadonnées
- `generateSharePreview()` - Prévisualisation du partage

## Flux de fonctionnement

### Lors du chargement d'une page d'article :

```
1. ArticleDetail.vue charge
   ↓
2. onMounted() déclenche
   ↓
3. setMeta() du composable useSEOMeta appelle le robot
   ↓
4. Robot détecte et convertit les images
   ↓
5. Robot crée/met à jour toutes les balises META
   ↓
6. Robot génère les données JSON-LD
   ↓
7. Robot affiche les logs de débogage 🤖
   ↓
8. validateAllMetadata() valide tout automatiquement
   ↓
9. getSummary() affiche le résumé final ✅
```

## Exemple d'utilisation

```javascript
// Dans ArticleDetail.vue
import { useSEOMeta } from '../composables/useSEOMeta'
import { useMetadataValidator } from '../composables/useMetadataValidator'

const { setMeta } = useSEOMeta()
const { validateAllMetadata, getSummary } = useMetadataValidator()

onMounted(() => {
  const article = getArticleBySlug(slug)
  
  // Mettre à jour les métadonnées
  setMeta(
    article.title,
    article.excerpt,
    article.image,  // Peut être une URL ou un import Webpack
    `/actualites/${article.slug}`,
    {
      type: 'article',
      siteName: 'EGENT-TOGO',
      locale: 'fr_FR',
      imageWidth: '1200',
      imageHeight: '630'
    }
  )
  
  // Valider après un délai
  setTimeout(async () => {
    const validation = await validateAllMetadata()
    const summary = getSummary()
  }, 200)
})
```

## Logs du robot (Console)

Quand un article charge, vous verrez dans la console :

```
🤖 [SEO Meta Robot] Métadonnées mises à jour: {
  title: "Inauguration du nouveau centre de formation",
  description: "Découvrez le lancement officiel...",
  imageUrl: "https://egenttogo.com/src/assets/images/headepage.webp",
  fullUrl: "https://egenttogo.com/actualites/inauguration-nouveau-centre",
  ogType: "article",
  baseTags: 28,
  timestamp: "14:32:45"
}

🤖 [Metadata Validator] Rapport de validation: {
  isValid: true,
  checks: {
    "og:title": { present: true, value: "..." },
    "og:image": { present: true, value: "..." },
    "og:image_validation": { valid: true, width: 1920, height: 1080 },
    ...
  },
  errors: [],
  warnings: []
}

🤖 [Metadata Summary] {
  title: "Inauguration du nouveau centre de formation",
  ogTitle: "Inauguration du nouveau centre de formation",
  description: "Découvrez le lancement officiel...",
  ogImage: "https://egenttogo.com/src/assets/images/headepage.webp",
  url: "https://egenttogo.com/actualites/inauguration-nouveau-centre",
  twitterCard: "summary_large_image"
}
```

## Résolution des images

Le robot supporte plusieurs formats d'images :

### 1. **Import Webpack** (recommandé)
```javascript
import imgArticle from '../assets/images/article.jpg'
setMeta(title, description, imgArticle, pathname)
```
✅ Webpack compile et optimise automatiquement
✅ Résolution de chemin automatique

### 2. **Chemin relatif**
```javascript
setMeta(title, description, '/src/assets/images/article.jpg', pathname)
```
✅ Le robot ajoute le domaine de base

### 3. **URL absolue**
```javascript
setMeta(title, description, 'https://cdn.example.com/image.jpg', pathname)
```
✅ Utilisé directement tel quel

### 4. **URL de données**
```javascript
setMeta(title, description, 'data:image/png;base64,...', pathname)
```
✅ Support des images encodées en base64

## Tests de prévisualisation

### Facebook
1. Aller sur https://developers.facebook.com/tools/debug/
2. Entrer l'URL de l'article
3. Facebook affichera une prévisualisation avec l'image

### Twitter
1. Aller sur https://cards-dev.twitter.com/validator
2. Entrer l'URL de l'article
3. Twitter affichera la prévisualisation

### LinkedIn
1. Aller sur https://www.linkedin.com/post-inspector/
2. Entrer l'URL de l'article
3. LinkedIn affichera la prévisualisation

### WhatsApp
1. Partager le lien via WhatsApp
2. Le robot a déjà configuré les métadonnées
3. L'image doit apparaître dans l'aperçu

## Améliorations implémentées

✅ Détection automatique des images locales/importées
✅ Conversion en URLs absolues
✅ Support Open Graph complet
✅ Support Twitter Cards
✅ Données structurées JSON-LD
✅ Validation automatique après mise à jour
✅ Logs de débogage détaillés
✅ Rapport de validation complet
✅ Gestion des images manquantes/invalides
✅ Support de multiples domaines (localhost, GitHub Pages, production)

## Points importants

1. **Images doivent être dans `src/assets/images/`** pour être correctement servies
2. **Importer les images en haut du composant** pour que Webpack les optimise
3. **Appeler `setMeta()` dans `onMounted()`** pour que le robot agisse au bon moment
4. **Les métadonnées s'appliquent à la page HTML** et sont lues par les réseaux sociaux
5. **Le robot valide automatiquement** et affiche les résultats en console

## Troubleshooting

### L'image ne s'affiche pas sur Facebook
- ✅ Vérifier que `og:image` est présente en console
- ✅ Vérifier que l'image est accessible (URL valide)
- ✅ Utiliser le Facebook Sharing Debugger pour forcer le rafraîchissement
- ✅ Vérifier les dimensions (recommandé : 1200x630px)

### L'image ne s'affiche pas sur Twitter
- ✅ Vérifier que `twitter:card` = `summary_large_image`
- ✅ Vérifier que `twitter:image` est présente
- ✅ Utiliser le Twitter Card Validator

### Les métadonnées ne sont pas trouvées
- ✅ Vérifier la console pour les logs du robot
- ✅ S'assurer que `setMeta()` a été appelé
- ✅ Vérifier que `onMounted()` s'est exécuté
- ✅ Rafraîchir la page (F5) pour voir les modifications

## Conclusion

Le **robot de détection des métadonnées** garantit que :
1. ✅ Les images s'affichent correctement lors du partage
2. ✅ Toutes les métadonnées requises sont présentes
3. ✅ Le contenu est optimisé pour le partage social
4. ✅ Les moteurs de recherche trouvent les bonnes informations
5. ✅ Les utilisateurs voient une prévisualisation attractive
