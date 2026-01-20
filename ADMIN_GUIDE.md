# 🎛️ Guide d'Administration - Système CRUD Firebase

## 📋 Vue d'ensemble

Le système d'administration EGENT-TOGO vous permet de gérer facilement :
- ✅ **Produits** - Créer, modifier, supprimer
- ✅ **Articles** - Publier des actualités  
- ✅ **Galerie** - Ajouter et organiser les photos

Toutes les données sont stockées en **Firebase Firestore** et synchronisées en temps réel sur les pages publiques.

---

## 🔑 Accès Admin

### URL
```
https://votre-domaine.com/admin
```

### Connexion
Les utilisateurs autorisés peuvent accéder au tableau de bord admin une fois connectés.

---

## 📦 Gestion des Produits

### Créer un Produit

1. Allez à l'onglet **"Produits"**
2. Remplissez le formulaire:
   - **Nom** : Nom du produit (ex: Kit Zoklin)
   - **Slug** : URL-friendly (ex: kit-zoklin)
   - **Catégorie** : Type de produit (ex: Énergie Solaire)
   - **Prix** : Prix d'affichage (ex: 500 000 FCFA)
   - **Description courte** : Résumé (150-200 caractères)
   - **Description** : Texte détaillé
   - **HTML Détaillé** : Contenu HTML personnalisé (optionnel)
   - **Image principale** : URL de l'image (https://...)
   - **Images supplémentaires** : Une URL par ligne
   - **Spécifications** : JSON format
   - **Caractéristiques** : Une par ligne

3. Cliquez sur **"➕ Ajouter"**

### Format des Spécifications (JSON)
```json
[
  {"label": "Puissance", "value": "5kW"},
  {"label": "Tension", "value": "220V/50Hz"},
  {"label": "Poids", "value": "25kg"}
]
```

### Éditer un Produit

1. Trouvez le produit dans la liste
2. Cliquez sur le bouton **"✏️"**
3. Modifiez les champs souhaités
4. Cliquez sur **"✅ Mettre à jour"**

### Supprimer un Produit

1. Cliquez sur le bouton **"🗑️"** à côté du produit
2. Confirmez la suppression
3. Le produit est immédiatement supprimé

---

## 📰 Gestion des Articles

### Créer un Article

1. Allez à l'onglet **"Articles"**
2. Remplissez le formulaire:
   - **Titre** : Titre principal
   - **Slug** : URL-friendly (ex: inauguration-nouveau-centre)
   - **Catégorie** : Catégorie (ex: Actualité, Partenariat)
   - **Date** : Date de publication (ex: 5 Jan 2026)
   - **Image** : URL d'image
   - **Résumé** : 150-160 caractères maximum
   - **Contenu** : Paragraphes séparés par des lignes vides
   - **Publié** : Cochez pour publier

3. Cliquez sur **"➕ Ajouter"**

### Format du Contenu

Séparez chaque paragraphe par une ligne vide :

```
Premier paragraphe de votre article...

Deuxième paragraphe avec plus de détails...

Troisième paragraphe pour conclure...
```

### Éditer un Article

1. Cliquez sur **"✏️"** à côté de l'article
2. Modifiez les informations
3. Cliquez sur **"✅ Mettre à jour"**

### Supprimer un Article

1. Cliquez sur **"🗑️"**
2. Confirmez la suppression

---

## 🖼️ Gestion de la Galerie

### Ajouter une Photo

1. Allez à l'onglet **"Galerie"**
2. Remplissez le formulaire:
   - **Titre** : Nom de la photo
   - **Catégorie** : Sélectionnez dans la liste
   - **URL Image** : Lien HTTPS complet
   - **Description** : Details optionnels

3. Cliquez sur **"➕ Ajouter"**

### Catégories Disponibles
- Installation Solaire
- Lampadaires LED
- Panneaux Solaires
- Climatisation
- Électricité
- Autre

### Éditer une Photo

1. Cliquez sur **"✏️"** sur la photo
2. Modifiez les informations
3. Cliquez sur **"✅ Mettre à jour"**

### Supprimer une Photo

1. Cliquez sur **"🗑️"** sur la photo
2. Confirmez

---

## 🌐 Pages Publiques Affectées

Vos données apparaissent automatiquement sur:

### Produits
- **Page liste** : `/produits`
- **Page détail** : `/produits/[slug]`

Affiche:
- Grille de tous les produits
- Images et descriptions
- Prix et caractéristiques
- Boutons d'action (devis, contact)

### Articles
- **Page liste** : `/actualites`
- **Page détail** : `/article/[slug]`

Affiche:
- Actualités récentes
- Images et résumés
- Contenu complet de l'article
- Date de publication

### Galerie
- **Page** : `/galerie`

Affiche:
- Grille de photos filtrables
- Filtrage par catégorie
- Lightbox pour agrandissement
- Navigation au clavier

---

## 🔗 URLs Importants

### Données des Produits
Doivent être visibles sur:
- https://votre-domaine.com/produits
- https://votre-domaine.com/produits/kit-zoklin
- https://votre-domaine.com/produits/free-water
- https://votre-domaine.com/produits/lampadaires-egent-solar
- https://votre-domaine.com/produits/armoire-billy

### Articles
- https://votre-domaine.com/actualites
- https://votre-domaine.com/article/inauguration-nouveau-centre
- https://votre-domaine.com/article/partenariat-international
- https://votre-domaine.com/article/prix-reconnaissance
- etc...

### Galerie
- https://votre-domaine.com/galerie

---

## ⚠️ Points Importants

### Images
- ✅ Utilisez des URLs HTTPS complètes
- ✅ Optimisez la taille des images (< 2MB)
- ✅ Formats recommandés: JPG, PNG, WebP
- ❌ N'utilisez pas de chemins locaux

### Slugs
- ✅ Utilisez des minuscules
- ✅ Utilisez des tirets pour les espaces
- ✅ Évitez les accents et caractères spéciaux
- ❌ Exemples invalides: "Mon Produit", "Produit_2025"

### Textes
- ✅ Les articles supportent les retours à la ligne
- ✅ Utilisez des paragraphes clairs
- ✅ Gardez un résumé court pour les articles
- ❌ N'utilisez pas de HTML dans les textes normaux

### JSON (Spécifications)
- ✅ Utilisez un JSON valide
- ✅ Testez avec jsonlint.com si besoin
- ❌ Les erreurs JSON seront ignorées

---

## 🐛 Dépannage

### Les produits n'apparaissent pas
1. Vérifiez que vous avez cliqué sur **"Ajouter"**
2. Vérifiez que vous êtes connecté
3. Vérifiez les règles Firebase (mode TEST)

### Les images ne s'affichent pas
1. Vérifiez que l'URL est HTTPS
2. Testez l'URL dans votre navigateur
3. Vérifiez CORS si besoin

### Les articles ne sont pas publiés
1. Assurez-vous que **"Publié"** est coché
2. Vérifiez le slug (pas d'espaces ni caractères spéciaux)

---

## 📞 Support

Pour toute question ou problème:
1. Vérifiez votre connexion Internet
2. Vérifiez les logs navigateur (F12)
3. Contactez l'équipe technique

---

## 🚀 Bonnes Pratiques

1. **Sauvegardez régulièrement** vos textes (copie locale)
2. **Testez les liens** après publication
3. **Utilisez des images optimisées** pour la vitesse
4. **Organisez vos photos** par catégorie
5. **Mettez à jour régulièrement** le contenu
6. **Vérifiez l'orthographe** avant publication

---

**Dernière mise à jour**: 18 Janvier 2026  
**Version du système**: 1.0  
**Firebase**: Firestore
