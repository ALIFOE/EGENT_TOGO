# 🔐 Configuration des Règles Firestore

## ⚠️ Problème Actuel

L'erreur `"Missing or insufficient permissions"` signifie que Firestore refuse l'accès aux données à cause des règles de sécurité insuffisantes.

## 🔑 Solution: Configurer les Règles Firestore

### 📍 Où aller?

1. **Ouvrir Firebase Console**
   - https://console.firebase.google.com
   
2. **Sélectionner votre projet** → "egenttogo-edc4e"

3. **Aller à Firestore Database**
   - Menu latéral → Firestore Database
   
4. **Aller à l'onglet "Règles"**
   - Cliquer sur "Règles" en haut

### 📋 Règles à Copier-Coller

Remplacez le contenu actuel par ceci:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ✅ LECTURE: Publique (tout le monde peut lire)
    // ❌ ÉCRITURE: Bloquée pour tous
    
    // Collection: products (Produits)
    match /products/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Collection: articles (Articles/Actualités)
    match /articles/{document=**} {
      allow read: if true;
      allow write: if false;
    }
    
    // Collection: gallery (Galerie)
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### 📝 Étapes d'Installation

1. **Ouvrir l'onglet "Règles"** dans Firestore Database
2. **Supprimer le contenu actuel** (sélectionner tout → supprimer)
3. **Coller les nouvelles règles** ci-dessus
4. **Cliquer sur "Publier"** (bouton en haut à droite)
5. **Attendre la confirmation** (quelques secondes)

### ✅ Vérification

Après la publication, rafraîchissez votre navigateur:
- La page `/actualites` devrait charger les articles
- La page `/produits` devrait charger les produits
- La page `/galerie` devrait charger les photos

### 🔐 Règles Futures (Avec Authentification)

Quand vous ajouterez l'authentification admin, utilisez celles-ci:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Fonction pour vérifier si l'utilisateur est admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    // ✅ LECTURE: Publique
    // ✅ ÉCRITURE: Admin seulement
    
    match /products/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /articles/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

### 🎯 Explication des Règles Actuelles

| Permission | Qui? | Quoi? |
|-----------|------|-------|
| **READ** | `true` (tout le monde) | Lire les données |
| **WRITE** | `false` (personne) | Créer/modifier/supprimer |

### ⏱️ Mode Développement vs Production

**Mode Développement (MAINTENANT)**
- ✅ Lecture: Publique (true)
- ❌ Écriture: Bloquée (false)
- Permet de tester le site public

**Mode Production (PLUS TARD)**
- ✅ Lecture: Publique
- ✅ Écriture: Admin authentifiés seulement
- Sécurisé avec Firebase Auth

### 🆘 Problèmes Courants

**Problem: "Still getting permission errors"**
- Attendez 30 secondes après publication
- Rafraîchissez votre navigateur (Ctrl+Shift+R)
- Vérifiez que vous avez cliqué "Publier"

**Problem: "Can't write to admin anymore"**
- Les règles bloquent l'écriture
- Attendez l'ajout de Firebase Auth
- Utilisez DataImport.vue pour importer les données

### 📚 Références

- [Firestore Security Rules Doc](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Console](https://console.firebase.google.com)

---

**Après avoir configuré ces règles**, votre site devrait fonctionner correctement! 🚀
