# 🔐 Règles Firestore pour Admin Authentifié

## ⚠️ Problème Actuel

L'erreur `"Missing or insufficient permissions"` = Les règles Firestore ne permettent pas l'écriture.

## ✅ Solution: Nouvelles Règles avec Authentification Admin

### 📍 Étapes

1. Allez sur **Firebase Console** → egenttogo-edc4e
2. Cliquez sur **Firestore Database** (menu latéral)
3. Allez à l'onglet **"Règles"** (en haut)
4. **Remplacez tout** par le code ci-dessous
5. Cliquez sur **"Publier"**

### 📋 Copier-Coller Ces Règles

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin Authentication Check
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Products Collection
    match /products/{document=**} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    // Articles Collection
    match /articles/{document=**} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
    
    // Gallery Collection (Images)
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
  }
}
```

## 🎯 Ce Que Ça Fait

✅ **Lecture (Read)**: Tout le monde peut lire (public)
✅ **Écriture (Write)**: Seulement les utilisateurs connectés

## 🚀 Après la Configuration

1. Rafraîchissez la page `/admin/import-gallery`
2. Cliquez sur "Importer toutes les images"
3. Les 36 images s'ajouteront ✅
