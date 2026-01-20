# 🚀 Configuration Firebase - Guide Rapide

## Étapes à Suivre (5 minutes)

### 1. Créer Firebase Project
```
https://console.firebase.google.com → "Create Project" → "egent-togo"
```

### 2. Créer Realtime Database
```
Realtime Database → Create Database → Test Mode → Activer
```

### 3. Copier Configuration
```
Project Settings (⚙️) → Vos applications → Web (</>) → Copier tout
```

### 4. Ajouter à src/lib/firebase.js
```javascript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "votre-projet.firebaseapp.com",
  databaseURL: "https://votre-projet-default-rtdb.firebaseio.com",
  projectId: "votre-projet",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

### 5. Redémarrer le serveur
```bash
npm run dev
```

### 6. Tester
```
Accédez à http://localhost:5173/EGENT_TOGO/admin
- Connectez-vous avec admin@egenttogo.com / password123
- Allez à "Produits" → "+ Nouveau Produit"
- Créez un produit test
- Les données s'afficheront en temps réel dans Firebase Console
```

## ✅ Vérification

1. Ouvrez Firebase Console → Realtime Database
2. Vous devriez voir votre structure :
```
egent-togo-database
  ├── products
  │   └── nouveaux produits apparaissent ici
  ├── news
  │   └── nouveaux articles apparaissent ici
  └── gallery
      └── nouvelles images apparaissent ici
```

## 🔗 Liens Utiles

- Firebase Console: https://console.firebase.google.com
- Documentation Firebase: https://firebase.google.com/docs
- Realtime Database Rules: https://firebase.google.com/docs/rules

---

**Si cela fonctionne, félicitations! 🎉**
Vous avez une base de données temps réel en ligne!
