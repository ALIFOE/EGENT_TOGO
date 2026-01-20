# 🚀 Guide Rapide - Robot de Détection des Métadonnées

## 📌 Démarrage Rapide

### 1. Démarrer le serveur
```bash
npm run dev
```

### 2. Ouvrir un article
```
http://localhost:5173/actualites/inauguration-nouveau-centre
```

### 3. Ouvrir la console (F12)
Chercher les logs:
```
🤖 [SEO Meta Robot] 
🤖 [Metadata Validator]
🤖 [Metadata Summary]
```

---

## 🧪 Tests Rapides

### Test 1: Vérifier les métadonnées en console
```javascript
// Afficher toutes les métadonnées OG
document.querySelectorAll('meta[property^="og:"]').forEach(m => 
  console.log(`${m.getAttribute('property')}: ${m.content}`)
)
```

### Test 2: Vérifier l'image
```javascript
const img = document.querySelector('meta[property="og:image"]').content
console.log('Image:', img)
fetch(img).then(r => console.log('Accessible:', r.status === 200))
```

### Test 3: Vérifier JSON-LD
```javascript
const ld = document.querySelector('script[type="application/ld+json"]')
console.log(JSON.parse(ld.textContent))
```

---

## 🔗 Outils de Test

### Facebook
👉 https://developers.facebook.com/tools/debug/

Coller l'URL et voir la prévisualisation avec l'image

### Twitter
👉 https://cards-dev.twitter.com/validator

Vérifier que le card type est `summary_large_image`

### LinkedIn
👉 https://www.linkedin.com/post-inspector/

Voir la prévisualisation exacte

### WhatsApp
Partager directement et vérifier l'aperçu

---

## 📋 Checklist Articles

### Inauguration du nouveau centre
- **URL:** `/actualites/inauguration-nouveau-centre`
- **Image:** `imgHeadepage` (headepage.webp)
- **À vérifier:** og:title, og:image, twitter:card

### Partenariat International
- **URL:** `/actualites/partenariat-international`
- **Image:** `imgPhotoConf3` (photo_conf3.jpg)
- **À vérifier:** og:description, og:image:width

### Prix et Reconnaissance
- **URL:** `/actualites/prix-reconnaissance`
- **Image:** `imgPrix1` (prix1.jpg)
- **À vérifier:** og:type = article

### Expansion RH
- **URL:** `/actualites/ressources-humaines-equipe`
- **Image:** `imgPhotoConf2` (photo_conf2.jpg)
- **À vérifier:** twitter:image

### Durabilité
- **URL:** `/actualites/durabilite-engagement`
- **Image:** `imgPhotoChantier2` (photo_chantier2.jpg)
- **À vérifier:** og:image:secure_url

### Gala Clients
- **URL:** `/actualites/evenement-clients`
- **Image:** `imgPhotoChantier` (photo_chantier.jpg)
- **À vérifier:** JSON-LD

---

## 🤖 Logs du Robot

Quand un article charge, on voit:

```
🤖 [SEO Meta Robot] Métadonnées mises à jour: {
  title: "...",
  description: "...",
  imageUrl: "https://...",
  fullUrl: "https://...",
  ogType: "article",
  baseTags: 28,
  timestamp: "14:32:45"
}
```

✅ Si vous voyez ce log = Succès!

---

## ⚠️ Erreurs Courantes

### Image ne s'affiche pas
1. Vérifier en console: `document.querySelector('meta[property="og:image"]').content`
2. Aller sur Facebook Sharing Debugger
3. Cliquer "Redéboguer"

### Métadonnées manquantes
1. Vérifier les logs du robot
2. S'assurer que `onMounted()` s'est exécuté
3. Rafraîchir la page (F5)

### JSON-LD absent
1. Vérifier: `document.querySelector('script[type="application/ld+json"]')`
2. Consulter la console pour les erreurs

---

## 📚 Documentation Complète

- **METADATA_ROBOT_GUIDE.md** - Guide technique complet
- **SOCIAL_MEDIA_TEST_GUIDE.md** - Guide de test réseaux sociaux
- **CHANGES_SUMMARY.md** - Résumé des modifications
- **test-metadata-robot.sh** - Script de test

---

## 💡 Conseils

1. **Toujours tester sur Facebook d'abord** - C'est le plus strict
2. **Redéboguer après les changements** - Les caches sont utilisés
3. **Les dimensions recommandées:** 1200x630px
4. **HTTPS seulement** - Utiliser `og:image:secure_url`

---

## ✅ Validation

Le robot valide automatiquement:
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Images accessibles
- ✅ Meta description
- ✅ Canonical URL
- ✅ JSON-LD

**Tout est automatique!** 🚀

---

## 🎉 C'est fait!

Le système est prêt. Les images s'affichent correctement au partage. 

**Enjoy!** 😊
