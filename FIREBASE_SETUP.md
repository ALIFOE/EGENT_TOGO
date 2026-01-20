# 🔥 Installation Firebase pour EGENT-TOGO

## 1️⃣ Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com)
2. Cliquez **"Créer un projet"**
3. Nommez-le : `egent-togo` (ou similaire)
4. Acceptez les conditions et créez

## 2️⃣ Créer une Realtime Database

1. Dans le panneau gauche, allez à **"Realtime Database"**
2. Cliquez **"Créer une base de données"**
3. Choisissez la région la plus proche
4. **IMPORTANT** : Sélectionnez **"Mode TEST"** (pour développement)
   - Plus tard, vous configurerez les règles de sécurité
5. Cliquez **"Activer"**

## 3️⃣ Récupérer votre configuration

1. Allez à **"Project Settings"** (⚙️ en bas à gauche)
2. Cliquez sur l'onglet **"Vos applications"**
3. Cliquez l'icône **`</>`** pour ajouter une app web
4. Nommez-la : `egent-togo-web`
5. Copiez toute la configuration Firebase

## 4️⃣ Ajouter la configuration à votre projet

Remplacez les valeurs dans `src/lib/firebase.js` :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",  // Votre clé API
  authDomain: "egent-togo.firebaseapp.com",
  databaseURL: "https://egent-togo-default-rtdb.firebaseio.com",
  projectId: "egent-togo",
  storageBucket: "egent-togo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
}
```

## 5️⃣ Mettre à jour les composants Admin

Les fichiers suivants utilisent maintenant Firebase :
- `src/components/AdminProducts.vue` → utilise `useFirebaseData()`
- `src/components/AdminNews.vue` → utilise `useFirebaseData()`
- `src/components/AdminGallery.vue` → utilise `useFirebaseData()`

## 6️⃣ Structure Firebase

Votre base de données aura cette structure :

```
egent-togo-database
├── products/
│   ├── productId1
│   │   ├── title: "Produit 1"
│   │   ├── price: "500 000 FCFA"
│   │   └── createdAt: "2026-01-17T..."
│   └── productId2
├── news/
│   ├── articleId1
│   │   ├── title: "Article 1"
│   │   ├── slug: "article-1"
│   │   └── createdAt: "2026-01-17T..."
│   └── articleId2
└── gallery/
    ├── imageId1
    │   ├── title: "Image 1"
    │   ├── category: "Installation Solaire"
    │   └── createdAt: "2026-01-17T..."
    └── imageId2
```

## 7️⃣ Sécurité (Important pour Production)

Une fois en production, modifiez les règles Firebase :

1. Allez à **"Realtime Database"** > **"Règles"**
2. Remplacez par :

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth.uid != null"
    },
    "news": {
      ".read": true,
      ".write": "auth.uid != null"
    },
    "gallery": {
      ".read": true,
      ".write": "auth.uid != null"
    }
  }
}
```

## ✅ Avantages Firebase

- ✅ **Temps réel** : Les modifications s'affichent instantanément
- ✅ **Gratuit** : 100 connexions simultanées, 1GB stockage
- ✅ **Pas de backend** : Tout est géré par Google
- ✅ **Facile** : Pas de configuration compliquée
- ✅ **Production-ready** : Utilisé par des millions d'apps

## 🚀 Alternatives si vous préférez un autre service

Si vous voulez utiliser une autre base de données :

### Supabase (PostgreSQL)
```bash
npm install @supabase/supabase-js
```
Guide complet disponible sur https://supabase.com/docs

### MongoDB Atlas (NoSQL)
```bash
npm install mongodb axios
```
Nécessite un backend API (Express.js)

## 🆘 Dépannage

### "Failed to resolve import"
- Vérifiez que `src/lib/firebase.js` existe
- Vérifiez que `src/composables/useFirebaseData.js` existe

### "Firebase configuration missing"
- Copiez votre config Firebase depuis https://console.firebase.google.com

### "Permission denied" ou erreurs d'écriture
- Changez le mode DATABASE de "Locked" à "TEST" dans les règles Firebase

### Les données ne s'affichent pas
- Ouvrez la console navigateur (F12)
- Vérifiez les erreurs
- Assurez-vous que Firebase est initialisé

---

**Une fois configuré, vous aurez :**
- 📊 Admin panel CRUD temps réel
- 💾 Données sauvegardées en ligne
- 📱 Synchronisation instantanée
- 🔒 Sécurité intégrée
