# Guide de Test - Synchronisation Temps Réel Firebase

## Étape 1: Configurer Firebase

### 1.1 Créer un projet Firebase
1. Aller sur https://console.firebase.google.com
2. Cliquer sur "Créer un nouveau projet"
3. Nommer le projet: `EGENT-TOGO` (ou autre)
4. Accepter les conditions et créer

### 1.2 Obtenir les clés API
1. Dans Firebase Console, aller à "Paramètres du projet" (⚙️)
2. Aller à l'onglet "Comptes de service"
3. Cliquer sur "Configuration de l'application"
4. Copier les informations (apiKey, projectId, databaseURL, etc.)

### 1.3 Ajouter les clés au projet
Modifier `src/lib/firebase.js`:

```javascript
// Ligne 1-11, remplacer par vos clés:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  databaseURL: "https://your-project.firebaseio.com"
};
```

### 1.4 Créer le Realtime Database
1. Dans Firebase Console, aller à "Realtime Database"
2. Cliquer "Créer une base de données"
3. Choisir une région (ex: us-central1)
4. Démarrer en mode TEST (pour développement)
5. Cliquer "Créer"

---

## Étape 2: Démarrer l'Application

### 2.1 Terminal 1 - Vite Development Server
```bash
cd c:\Users\conce\Desktop\PROJET_EGENTTOGO\EGENT_TOGO
npm run dev
```

Vous verrez:
```
Local:        http://localhost:5173/EGENT_TOGO/
```

### 2.2 Terminal 2 - Express Prerendering Server (Optionnel)
```bash
node server.js
```

Vous verrez:
```
Server running on http://localhost:3000
```

---

## Étape 3: Tester la Synchronisation Temps Réel

### Test 1: Admin Panel → Products Page

#### Préparation
1. Ouvrir deux onglets côte à côte:
   - Onglet 1: http://localhost:5173/EGENT_TOGO/admin
   - Onglet 2: http://localhost:5173/EGENT_TOGO/products

#### Se connecter au Panel Admin
1. Dans l'onglet Admin, entrer:
   - Email: `admin@egenttogo.com`
   - Mot de passe: `password123`
2. Cliquer "Se connecter"
3. Vous devez voir le dashboard avec 5 onglets

#### Créer un Produit
1. Dans le dashboard, aller à l'onglet "Produits"
2. Remplir le formulaire:
   - **Titre**: "Panneau Solaire Test"
   - **Prix**: "250000 FCFA"
   - **Catégorie**: "Panneaux Solaires"
   - **URL Image**: https://via.placeholder.com/300x200?text=Test+Panneau
   - **Description**: "Un panneau de test pour vérifier la synchronisation"
   - **Phare**: Cocher la case
3. Cliquer "Ajouter le produit"
4. **Attendre 1-2 secondes**

#### Vérifier la Synchronisation
1. Basculer vers l'onglet Products (onglet 2)
2. Le produit doit apparaître immédiatement! ✨
3. Il doit être en haut du grid avec l'animation
4. La badge "⭐ Phare" doit être visible

**Résultat attendu**:
```
Onglet Admin:    Produit créé → Bouton d'ajout désactivé
                 ↓ (Firebase sauvegarde)
Firebase:        Données ajoutées à /products
                 ↓ (Listener détecte le changement)
Onglet Products: ✨ Produit apparaît immédiatement!
```

---

### Test 2: Admin Panel → News Page

#### Créer un Article
1. Dans le dashboard admin, aller à l'onglet "Actualités"
2. Remplir le formulaire:
   - **Titre**: "Nouvel Article de Test"
   - **Slug**: "article-test"
   - **Description**: "Ceci est un article de test pour vérifier la sync"
   - **Contenu**: "Contenu complet de l'article..."
   - **URL Image**: https://via.placeholder.com/400x300?text=Article+Test
   - **Catégorie**: "Actualité"
   - **Publié**: Cocher la case
3. Cliquer "Ajouter l'actualité"

#### Vérifier la Synchronisation
1. Aller à http://localhost:5173/EGENT_TOGO/news
2. Chercher l'article "Nouvel Article de Test"
3. L'article doit apparaître dans la section "Derniers articles"
4. La badge "Publié" doit être visible

---

### Test 3: Admin Panel → Gallery Page

#### Ajouter une Image à la Galerie
1. Dans le dashboard admin, aller à l'onglet "Galerie"
2. Remplir le formulaire:
   - **Titre**: "Installation Solaire Test"
   - **URL Image**: https://via.placeholder.com/500x400?text=Installation+Test
   - **Catégorie**: "Installation Solaire"
3. Cliquer "Ajouter l'image"

#### Vérifier la Synchronisation
1. Aller à http://localhost:5173/EGENT_TOGO/gallery
2. L'image doit apparaître dans la galerie
3. La catégorie "Installation Solaire" doit être listée dans les filtres
4. Cliquer sur la catégorie doit filtrer l'image correctement

---

## Étape 4: Vérifier les Données dans Firebase

### Firebase Console
1. Aller sur https://console.firebase.google.com
2. Sélectionner votre projet
3. Aller à "Realtime Database"
4. Vous devez voir la structure:

```
EGENT_TOGO
├── gallery
│   └── [image-id]
│       ├── category: "Installation Solaire"
│       ├── image: "https://via.placeholder.com/..."
│       ├── title: "Installation Solaire Test"
│       └── createdAt: 1234567890
├── news
│   └── [article-id]
│       ├── category: "Actualité"
│       ├── content: "Contenu complet..."
│       ├── description: "Ceci est un article..."
│       ├── image: "https://via.placeholder.com/..."
│       ├── published: true
│       ├── slug: "article-test"
│       ├── title: "Nouvel Article de Test"
│       └── createdAt: 1234567890
└── products
    └── [product-id]
        ├── category: "Panneaux Solaires"
        ├── description: "Un panneau de test..."
        ├── featured: true
        ├── image: "https://via.placeholder.com/..."
        ├── price: "250000 FCFA"
        ├── title: "Panneau Solaire Test"
        └── createdAt: 1234567890
```

---

## Étape 5: Tester les Modifications en Temps Réel

### Modifier un Produit
1. Admin Panel → Onglet "Produits"
2. Cliquer sur le bouton "Éditer" du produit créé
3. Changer le prix de "250000 FCFA" à "300000 FCFA"
4. Cliquer "Modifier le produit"
5. **Immédiatement**, aller à /products
6. Le prix doit être à jour! ✨

### Supprimer un Produit
1. Admin Panel → Onglet "Produits"
2. Cliquer sur le bouton "Supprimer" (poubelle)
3. Confirmer la suppression
4. **Immédiatement**, aller à /products
5. Le produit doit avoir disparu! ✨

---

## Dépannage

### Les données ne s'affichent pas?

**Vérification 1: Firebase Config**
```javascript
// Ouvrir Console (F12) → Onglet Console
// Taper:
window.firebaseConfig

// Vérifier que les clés ne sont pas "undefined"
```

**Vérification 2: Données dans Firebase**
```
Firebase Console → Realtime Database
Vérifier que /products, /news, /gallery existent
Vérifier qu'ils contiennent des données
```

**Vérification 3: Erreurs dans la Console**
```
F12 → Console
Chercher des messages d'erreur rouge
Si erreur Firebase: "Permission denied" → Revoir les règles
```

### Le formulaire d'admin ne sauvegarde pas?

**Vérification 1: Règles de Sécurité**
```
Firebase Console → Realtime Database → Règles
Doit avoir .write au moins en mode test
```

**Vérification 2: Authentification**
```
Vérifier qu'on est connecté à l'admin
Vérifier que le token est sauvegardé dans localStorage
```

### Les images ne s'affichent pas?

**Solution**: Utiliser des URLs valides
```javascript
// ✅ Bon - URLs valides:
https://via.placeholder.com/300x200
https://images.unsplash.com/photo-...
https://your-domain.com/image.jpg

// ❌ Mauvais - URLs locales ne fonctionnent pas avec Firebase:
/src/assets/images/photo.jpg
@/assets/images/photo.jpg
```

---

## Résumé des Tests

| Test | Étape | Résultat attendu |
|------|-------|------------------|
| Produit créé | Admin → créer produit | Apparaît instantanément dans /products |
| Article créé | Admin → créer article | Apparaît instantanément dans /news |
| Image ajoutée | Admin → ajouter image | Apparaît instantanément dans /gallery |
| Produit modifié | Admin → éditer produit | Changement visible en <1s dans /products |
| Produit supprimé | Admin → supprimer produit | Disparaît en <1s de /products |
| Catégories filtrées | Gallery → sélectionner catégorie | Seules les images de la catégorie s'affichent |

---

## Console Utiles

### Voir tous les produits
```javascript
// Console (F12)
import { getDatabase, ref, get } from 'firebase/database'
import { db } from './src/lib/firebase'

get(ref(db, 'products')).then(snap => console.log(snap.val()))
```

### Effacer une collection entière (ATTENTION!)
```javascript
// Seulement en développement!
import { getDatabase, ref, remove } from 'firebase/database'
import { db } from './src/lib/firebase'

remove(ref(db, 'products'))  // Efface tous les produits
remove(ref(db, 'news'))      // Efface tous les articles
remove(ref(db, 'gallery'))   // Efface toutes les images
```

---

## Prochaines Étapes

Une fois les tests validés ✅:

1. **Configurer les règles de sécurité** (Important!)
   - Ne pas laisser le database en mode TEST en production

2. **Ajouter l'authentification Firebase**
   - Intégrer Firebase Auth au lieu du token localStorage

3. **Déployer sur GitHub Pages**
   - Frontend automatiquement déployé

4. **Déployer le serveur Express**
   - Sur Railway ou autre VPS

5. **Configurér les métadonnées sociales**
   - Prerendering avec Puppeteer

---

## Performance

**Vitesse de synchronisation**:
- ⚡ Création/Modification: **< 500ms**
- ⚡ Suppression: **< 500ms**
- ⚡ Affichage du changement: **< 1000ms**

C'est la puissance des websockets de Firebase! 🚀

---

## Support

Si vous avez des questions:
1. Consulter les erreurs dans la console (F12)
2. Vérifier les logs Firebase Console
3. Vérifier la structure des données
4. Vérifier les règles de sécurité
