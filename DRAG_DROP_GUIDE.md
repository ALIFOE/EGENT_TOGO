# 📸 Guide d'Upload d'Images (Drag & Drop)

## ✅ Fonctionnalité Disponible

Vous pouvez maintenant **glisser-déposer** des images directement dans l'admin pour:
- ✏️ Ajouter des produits
- 📝 Ajouter des articles
- 🏗️ Ajouter des projets à la galerie

## 🚀 Comment Utiliser

### Étape 1: Accéder à l'Admin

1. Allez à `/admin`
2. Connectez-vous avec:
   - Email: `admin@egenttogo.com`
   - Password: `password123`

### Étape 2: Ajouter un Produit Avec Image

1. Cliquez sur l'onglet **"Produits"**
2. Cliquez sur **"+ Nouveau Produit"**
3. Remplissez les champs:
   - **Titre:** Nom du produit
   - **Prix:** Ex: "500 000 FCFA"
   - **Catégorie:** Ex: "Énergie Solaire"
   - **Slug:** URL-friendly (ex: mon-produit)
   - **Description:** Courte description
   - **Description complète:** Détails complets

### Étape 3: Ajouter l'Image (Drag & Drop)

**Option A - Glisser-Déposer:**
1. Glissez votre image depuis votre ordinateur
2. Déposez-la dans la zone pointillée bleue
3. L'image s'affichera automatiquement en aperçu

**Option B - Cliquer:**
1. Cliquez sur le bouton **"Parcourir"**
2. Sélectionnez votre image
3. L'image s'affichera automatiquement

### Étape 4: Valider

1. Cliquez sur **"Créer"** ou **"Mettre à jour"**
2. ✅ Produit sauvegardé avec image!

---

## 📋 Spécifications Techniques

| Caractéristique | Détails |
|---|---|
| **Formats supportés** | JPG, PNG, WEBP, GIF |
| **Taille max** | 5 MB par image |
| **Stockage** | En base64 dans Firebase |
| **Nombre d'images** | Illimité |
| **Qualité** | Conservation optimale |

---

## 💡 Exemples d'Utilisation

### Exemple 1: Ajouter un Produit Solaire

```
Titre: Kit Solaire Pro
Slug: kit-solaire-pro
Prix: 1 500 000 FCFA
Catégorie: Kits Solaires
Description: Kit solaire complet avec installation
Image: [Glissez votre photo de kit]
```

### Exemple 2: Ajouter un Article

```
Titre: Nouvelle Installation en Togo
Slug: installation-janvier-2026
Catégorie: Actualités
Image: [Glissez la photo du projet]
```

### Exemple 3: Ajouter un Projet Galerie

```
Titre: Installation - Residence Lomé
Slug: residence-lome-2026
Catégorie: Énergie Solaire
Image: [Glissez la photo du résultat]
```

---

## ⚡ Avantages du Drag & Drop

✅ **Rapide** - Pas de clic multiple
✅ **Intuitif** - Glissez simplement
✅ **Visuel** - Aperçu immédiat
✅ **Sécurisé** - Validation automatique
✅ **Responsive** - Fonctionne sur tous appareils

---

## 🔄 Cycle Complet

```
1. Ajouter Produit
   ↓
2. Glisser l'image
   ↓
3. Voir aperçu
   ↓
4. Cliquer "Créer"
   ↓
5. Produit visible sur /produits
   ↓
6. Modifier depuis /admin si besoin
```

---

## ❌ Dépannage

### L'image n'apparaît pas
- Vérifiez le format (JPG, PNG, WEBP, GIF)
- Vérifiez la taille (max 5MB)
- Essayez de recharger la page

### Le drag-drop ne marche pas
- Assurez-vous que vous glissez directement sur la zone bleue
- Essayez avec une autre image
- Vérifiez votre navigateur (Chrome, Firefox, Edge, Safari)

### L'image est trop grande
- Réduisez la taille avant l'upload (< 5MB)
- Compressez l'image (utilisez TinyPNG.com)
- Diminuez la résolution

---

## 🎯 Prochaines Étapes

Une fois l'image ajoutée:
- ✅ Elle s'affiche sur `/produits`, `/actualites`, `/projets`
- ✅ Elle est sauvegardée dans Firebase
- ✅ Elle persiste même après actualisation
- ✅ Elle est synchronisée en temps réel sur le site public

---

**Besoin d'aide?** Consultez l'admin ou le guide Firebase complet.
