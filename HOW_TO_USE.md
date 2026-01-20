# 📖 Comment Utiliser le Robot de Métadonnées

## 🎯 Usage Basique

### Option 1: Direct (Recommandé)
```javascript
import { useSEOMeta } from '@/composables/useSEOMeta'
import { useMetadataValidator } from '@/composables/useMetadataValidator'

const { setMeta } = useSEOMeta()
const { validateAllMetadata } = useMetadataValidator()

onMounted(() => {
  // Mettre à jour les métadonnées
  setMeta(
    'Titre de la page',
    'Description courte',
    importedImage,  // ou URL
    '/url/de/la/page',
    { type: 'article' }
  )
  
  // Valider après
  setTimeout(() => validateAllMetadata(), 200)
})
```

### Option 2: Centralisé (Plus simple)
```javascript
import { useMetaRobot } from '@/composables/useMetaRobot'

const { setPageMeta, validatePage } = useMetaRobot()

onMounted(() => {
  setPageMeta({
    title: 'Mon Titre',
    description: 'Ma description',
    image: monImage,
    pathname: '/mon/chemin',
    type: 'article'
  })
})
```

---

## 🔧 Configuration Détaillée

### setMeta() - Tous les paramètres
```javascript
setMeta(
  // Paramètres obligatoires
  'Titre de la page',          // titre
  'Description du contenu',    // description
  imageImportedOrUrl,          // image (import ou URL)
  '/url/path',                 // pathname
  
  // Options (optionnelles)
  {
    type: 'article',           // 'website', 'article', etc.
    siteName: 'EGENT-TOGO',    // nom du site
    locale: 'fr_FR',           // langue
    imageWidth: '1200',        // largeur image
    imageHeight: '630'         // hauteur image
  }
)
```

### setPageMeta() - Simplifié
```javascript
setPageMeta({
  title: 'Titre',
  description: 'Description',
  image: imageFile,
  pathname: '/chemin',
  type: 'article',        // optionnel
  validate: true          // optionnel (défaut: true)
})
```

---

## 📊 Résultats Attendus

### Logs Console
```
🤖 [SEO Meta Robot] Métadonnées mises à jour: {
  title: "Titre",
  description: "Description",
  imageUrl: "https://...",
  fullUrl: "https://egenttogo.com/chemin",
  ogType: "article",
  baseTags: 28,
  timestamp: "14:32:45"
}

🤖 [Metadata Validator] Rapport de validation: {
  isValid: true,
  checks: {
    "og:title": { present: true, value: "Titre" },
    "og:image": { present: true, value: "https://..." },
    "og:image_validation": { valid: true, width: 1920, height: 1080 },
    ...
  },
  errors: [],
  warnings: []
}
```

### HTML Généré
```html
<!-- Open Graph -->
<meta property="og:title" content="Titre">
<meta property="og:description" content="Description">
<meta property="og:image" content="https://...">
<meta property="og:type" content="article">
<meta property="og:url" content="https://egenttogo.com/chemin">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Titre">
<meta name="twitter:image" content="https://...">

<!-- Standard -->
<meta name="description" content="Description">
<link rel="canonical" href="https://egenttogo.com/chemin">

<!-- JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Titre",
  "description": "Description",
  "image": "https://..."
}
</script>
```

---

## 🖼️ Types d'Images Supportées

### 1. Import Webpack (Meilleur)
```javascript
import imgArticle from '@/assets/images/article.jpg'

setMeta('Titre', 'Desc', imgArticle, '/chemin')
// ✅ Image optimisée automatiquement
// ✅ Webpack gère la résolution
```

### 2. Chemin Relatif
```javascript
setMeta('Titre', 'Desc', '/src/assets/images/article.jpg', '/chemin')
// ✅ Le robot ajoute le domaine de base
```

### 3. URL Absolue
```javascript
setMeta('Titre', 'Desc', 'https://cdn.example.com/image.jpg', '/chemin')
// ✅ Utilisée telle quelle
```

### 4. Base64
```javascript
setMeta('Titre', 'Desc', 'data:image/png;base64,...', '/chemin')
// ✅ Image encodée directement
```

---

## ✅ Checklist Implémentation

### Dans votre composant Vue:
- [ ] Importer `useSEOMeta`
- [ ] Importer `useMetadataValidator` (optionnel)
- [ ] Importer les images nécessaires
- [ ] Appeler `setMeta()` dans `onMounted()`
- [ ] Ajouter la validation (optionnel)

### Exemple Complet
```vue
<script setup>
import { onMounted } from 'vue'
import { useSEOMeta } from '@/composables/useSEOMeta'
import { useMetadataValidator } from '@/composables/useMetadataValidator'
import imgArticle from '@/assets/images/article.jpg'

const { setMeta } = useSEOMeta()
const { validateAllMetadata } = useMetadataValidator()

onMounted(() => {
  setMeta(
    'Mon Article',
    'Voici une description intéressante',
    imgArticle,
    '/actualites/mon-article',
    { type: 'article' }
  )
  
  setTimeout(() => validateAllMetadata(), 200)
})
</script>
```

---

## 🧪 Tests

### En Console
```javascript
// Vérifier toutes les métadonnées
document.querySelectorAll('meta[property^="og:"]').forEach(m => 
  console.log(`${m.getAttribute('property')}: ${m.content}`)
)

// Vérifier l'image
const ogImg = document.querySelector('meta[property="og:image"]')
console.log('Image URL:', ogImg.content)

// Vérifier l'accessibilité
fetch(ogImg.content, {method: 'HEAD'})
  .then(r => console.log('Image accessible:', r.status === 200))
  .catch(e => console.log('Erreur:', e))
```

### Outils en Ligne
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/

---

## 🐛 Troubleshooting

### Métadonnées non affichées
**Cause:** `setMeta()` not called
```javascript
// ❌ Mauvais
export default {
  created() {
    setMeta(...)  // Ne pas appeler ici!
  }
}

// ✅ Correct
onMounted(() => {
  setMeta(...)  // Appeler ici!
})
```

### Image ne s'affiche pas
**Cause:** URL invalide
```javascript
// ❌ Mauvais
setMeta('Titre', 'Desc', 'image.jpg', '/chemin')  // Chemin incomplet

// ✅ Correct
import img from '@/assets/images/image.jpg'
setMeta('Titre', 'Desc', img, '/chemin')
```

### Les logs du robot n'apparaissent pas
**Cause:** JavaScript non exécuté
```javascript
// ✅ Solution
onMounted(() => {  // Attendre le montage
  setMeta(...)
})

// Vérifier la console du navigateur (F12)
```

---

## 📚 Pour Plus de Détails

- **METADATA_ROBOT_GUIDE.md** - Guide technique complet
- **SOCIAL_MEDIA_TEST_GUIDE.md** - Guide de test
- **QUICK_START.md** - Démarrage rapide
- **CHANGES_SUMMARY.md** - Résumé des modifications

---

## 🚀 Cas d'Usage Courants

### Article Blog
```javascript
setMeta(
  article.title,
  article.excerpt,
  article.image,
  `/actualites/${article.slug}`,
  { type: 'article' }
)
```

### Page Produit
```javascript
setMeta(
  product.name,
  product.description,
  product.image,
  `/produits/${product.id}`,
  { type: 'product' }
)
```

### Page Service
```javascript
setMeta(
  service.title,
  service.description,
  service.image,
  `/services/${service.slug}`,
  { type: 'website' }
)
```

### Page Événement
```javascript
setMeta(
  event.title,
  event.description,
  event.image,
  `/evenements/${event.slug}`,
  { type: 'event' }
)
```

---

## 💡 Conseils Pro

1. **Toujours importer les images** pour que Webpack les optimise
2. **Utiliser une description de 50-160 caractères** pour les moteurs de recherche
3. **Images de 1200x630px** - c'est l'idéal pour tous les réseaux
4. **Tester après chaque changement** sur les outils sociaux
5. **Redéboguer après modification** (les caches existent)

---

## ✨ C'est Tout!

Le robot fait le reste automatiquement. C'est simple, efficace et robuste! 🎉

**Happy coding!** 🚀
