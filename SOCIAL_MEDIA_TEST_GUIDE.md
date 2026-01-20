# 🤖 Guide de Test des Métadonnées sur les Réseaux Sociaux

## Test avec les Outils Officiels

### 1. 📘 Facebook Sharing Debugger

**URL:** https://developers.facebook.com/tools/debug/

**Étapes:**
1. Aller sur le site
2. Entrer l'URL d'une page d'article, ex:
   - `https://egenttogo.com/actualites/inauguration-nouveau-centre`
3. Cliquer sur "Déboguer"
4. Facebook affichera:
   - ✅ Titre (og:title)
   - ✅ Description (og:description)
   - ✅ Image (og:image)
   - ✅ Type de partage
5. Si l'image ne s'affiche pas:
   - Cliquer "Redéboguer" pour forcer le rafraîchissement
   - Vérifier que l'image est accessible
   - Vérifier dimensions: recommandé 1200x630px

**À chercher:**
```
og:title: ✓ Présente
og:description: ✓ Présente  
og:image: ✓ Présente et accessible
og:url: ✓ Correcte
og:type: ✓ article
```

---

### 2. 🐦 Twitter Card Validator

**URL:** https://cards-dev.twitter.com/validator

**Étapes:**
1. Aller sur le site
2. Entrer l'URL d'une page d'article
3. Cliquer sur "Check"
4. Twitter affichera la prévisualisation exacte

**À chercher:**
```
twitter:card: ✓ summary_large_image
twitter:title: ✓ Présente
twitter:description: ✓ Présente
twitter:image: ✓ Présente et accessible
```

**Note:** Pour que Twitter montre l'image, les dimensions recommandées sont 1200x675px

---

### 3. 💼 LinkedIn Post Inspector

**URL:** https://www.linkedin.com/post-inspector/

**Étapes:**
1. Aller sur le site
2. Entrer l'URL d'une page d'article
3. Voir la prévisualisation exacte
4. LinkedIn utilisera:
   - og:title
   - og:description
   - og:image

**À chercher:**
```
Title: ✓ Présente
Description: ✓ Présente
Image: ✓ Présente et bien formatée
```

---

### 4. 💬 WhatsApp / Telegram

**Méthode de test directe:**

1. Copier le lien de l'article
2. Partager sur WhatsApp / Telegram
3. L'application affichera l'aperçu automatiquement
4. L'image devrait s'afficher si les métadonnées sont correctes

**À vérifier:**
```
Titre visible
Description visible
Image affichée
```

---

### 5. 🔍 Test HTML Direct (Console Navigateur)

**Étapes:**
1. Ouvrir une page d'article
2. Appuyer sur F12 (Outils de développement)
3. Aller dans l'onglet "Elements" ou "Inspector"
4. Chercher les balises meta:

**Commandes console:**
```javascript
// Vérifier toutes les métadonnées
document.querySelectorAll('meta[property^="og:"]').forEach(m => {
  console.log(`${m.getAttribute('property')}: ${m.content}`)
})

// Vérifier les Twitter Cards
document.querySelectorAll('meta[name^="twitter:"]').forEach(m => {
  console.log(`${m.getAttribute('name')}: ${m.content}`)
})

// Vérifier le JSON-LD
const jsonLd = document.querySelector('script[type="application/ld+json"]')
if (jsonLd) console.log(JSON.parse(jsonLd.textContent))

// Vérifier l'image Open Graph
const ogImage = document.querySelector('meta[property="og:image"]')
console.log('OG Image:', ogImage?.content)

// Tester l'accessibilité de l'image
const img = new Image()
img.onload = () => console.log('✅ Image accessible')
img.onerror = () => console.log('❌ Image non accessible')
img.src = ogImage?.content
```

---

## ✅ Checklist de Validation Complète

### Pour chaque article, vérifier:

**Balises Open Graph (obligatoires):**
- [ ] `og:title` - Titre de l'article
- [ ] `og:description` - Description courte
- [ ] `og:image` - URL absolue de l'image
- [ ] `og:url` - URL complète de la page
- [ ] `og:type` - Doit être "article"
- [ ] `og:site_name` - "EGENT-TOGO"

**Balises Open Graph (optionnelles mais recommandées):**
- [ ] `og:image:width` - 1200
- [ ] `og:image:height` - 630
- [ ] `og:image:secure_url` - HTTPS
- [ ] `og:locale` - "fr_FR"

**Balises Twitter (recommandées):**
- [ ] `twitter:card` - "summary_large_image"
- [ ] `twitter:title` - Titre
- [ ] `twitter:description` - Description
- [ ] `twitter:image` - URL image
- [ ] `twitter:site` - "@egenttogo"

**Balises Meta Standards:**
- [ ] `description` - Meta description
- [ ] `keywords` - Mots-clés
- [ ] `canonical` - URL canonique

**Données Structurées:**
- [ ] `JSON-LD` - Script de données structurées
- [ ] Type correct: "NewsArticle" pour articles

**Accessibilité des images:**
- [ ] Image accessible via HTTP/HTTPS
- [ ] Dimensions appropriées (min 1200x630)
- [ ] Format: JPEG, PNG, GIF, WebP
- [ ] Taille raisonnable (< 5MB)

---

## 🚨 Problèmes Courants et Solutions

### Problème 1: Image ne s'affiche pas sur Facebook
**Causes possibles:**
- ❌ URL d'image invalide/inaccessible
- ❌ Image servie en HTTP sur HTTPS
- ❌ Dimensions trop petites (< 200x200)
- ❌ Format non supporté

**Solution:**
1. Vérifier en console: `document.querySelector('meta[property="og:image"]').content`
2. Tester l'accessibilité de l'URL dans le navigateur
3. Utiliser Facebook Sharing Debugger
4. Cliquer "Redéboguer" pour forcer le rafraîchissement
5. Vérifier que l'image fait min 1200x630

### Problème 2: Title/Description incorrects
**Causes possibles:**
- ❌ `setMeta()` non appelé
- ❌ Appelé avant que les données soient chargées
- ❌ `onMounted()` pas exécuté

**Solution:**
1. Vérifier les logs console: chercher "🤖 [SEO Meta Robot]"
2. S'assurer que `setMeta()` est dans `onMounted()`
3. Attendre que les données d'article se chargent
4. Rafraîchir la page (F5)

### Problème 3: Métadonnées non trouvées en HTML
**Causes possibles:**
- ❌ JavaScript désactivé
- ❌ Dynamique non rendue
- ❌ Délai d'exécution trop court

**Solution:**
1. Vérifier que JS est activé
2. Attendre que Vue.js rende les métadonnées
3. Vérifier dans les sources (Ctrl+U)
4. Utiliser le Metadata Robot Validator

### Problème 4: Twitter n'affiche pas l'image
**Causes possibles:**
- ❌ Pas de `twitter:card: summary_large_image`
- ❌ Image non HTTPS
- ❌ Dimensions incorrect

**Solution:**
1. Vérifier `twitter:card` = "summary_large_image"
2. Vérifier que `twitter:image` est HTTPS
3. Dimensions recommandées: 1200x675px
4. Utiliser Twitter Card Validator

---

## 📊 Résumé des Dimensions Recommandées

| Réseau | Dimension | Format | Notes |
|--------|-----------|--------|-------|
| Facebook | 1200x630 | JPG/PNG | Aspect ratio 1.91:1 |
| Twitter | 1200x675 | JPG/PNG/GIF | Aspect ratio 16:9 |
| LinkedIn | 1200x627 | JPG/PNG | Aspect ratio 1.91:1 |
| WhatsApp | 500x500+ | JPG/PNG | Carré ou rectangulaire |
| Général | 1200x630 | WebP | Moderne et optimisé |

---

## 🎯 Workflow de Test Complet

```
1. Charger l'article → http://localhost:5173/actualites/...
   ↓
2. Ouvrir Console (F12)
   ↓
3. Chercher "🤖 [SEO Meta Robot]" → Vérifier les données
   ↓
4. Vérifier en HTML que les balises meta sont présentes
   ↓
5. Aller sur Facebook Sharing Debugger → Tester
   ↓
6. Aller sur Twitter Card Validator → Tester
   ↓
7. Aller sur LinkedIn Post Inspector → Tester
   ↓
8. Partager un lien de test sur WhatsApp → Vérifier
   ↓
9. ✅ SUCCÈS - Métadonnées correctes!
```

---

## 🤖 Commandes Utiles pour la Console

```javascript
// Afficher toutes les métadonnées OG
console.table(Array.from(document.querySelectorAll('meta[property^="og:"]')).map(m => ({
  property: m.getAttribute('property'),
  content: m.content
})))

// Valider les images
document.querySelectorAll('[src^="http"]').forEach(img => {
  fetch(img.src, {method: 'HEAD'}).then(r => 
    console.log(`${r.status === 200 ? '✅' : '❌'} ${img.src}`)
  ).catch(() => console.log(`❌ ${img.src}`))
})

// Vérifier si JSON-LD existe
const ld = document.querySelector('script[type="application/ld+json"]')
console.log(ld ? '✅ JSON-LD présent' : '❌ JSON-LD manquant')

// Valider og:image
const ogImg = document.querySelector('meta[property="og:image"]')?.content
const img = new Image()
img.onload = () => console.log(`✅ og:image accessible (${img.width}x${img.height})`)
img.onerror = () => console.log('❌ og:image non accessible')
img.src = ogImg
```

---

## Conclusion

Le **robot de détection des métadonnées** garantit que:
- ✅ Toutes les métadonnées sont présentes
- ✅ Les images s'affichent correctement
- ✅ Le partage social fonctionne parfaitement
- ✅ Les moteurs de recherche trouvent les bonnes infos

**Rapport complet généré automatiquement en console lors du chargement!** 🚀
