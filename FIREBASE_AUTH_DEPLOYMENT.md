# 🚀 Configuration et déploiement - Firebase Authentication

## ✅ Dépendances

Firebase est déjà installé dans votre `package.json`:

```json
"firebase": "^12.8.0"
```

### Vérifier l'installation
```bash
npm list firebase
# Doit afficher: firebase@12.8.0
```

Si Firebase n'est pas installé:
```bash
npm install firebase@^12.8.0
```

---

## 🔧 Variables d'environnement

Actuellement, les credentials Firebase sont dans `src/lib/firebase.js`. 

### Pour production, créer un fichier `.env`:

```bash
# .env
VITE_FIREBASE_API_KEY=AIzaSyAMdQcFCUcZd6Lqj2oyb6VZRKd2Z_PvDcI
VITE_FIREBASE_AUTH_DOMAIN=egenttogo-edc4e.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://egenttogo-edc4e-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=egenttogo-edc4e
VITE_FIREBASE_STORAGE_BUCKET=egenttogo-edc4e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=359885972724
VITE_FIREBASE_APP_ID=1:359885972724:web:6b8da32020f60ac6926aa1
```

### Mettre à jour `src/lib/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

---

## 🏗️ Structure du projet

Après l'implémentation:

```
src/
├── composables/
│   ├── useAuth.js                 ✨ NOUVEAU
│   ├── useCrudData.js
│   └── ...autres composables
├── pages/
│   ├── Login.vue                  🔄 MODIFIÉ
│   └── AdminPanel.vue
├── components/
│   ├── Header.vue                 🔄 MODIFIÉ
│   └── ...autres composants
├── lib/
│   └── firebase.js                🔄 MODIFIÉ
├── App.vue                        🔄 MODIFIÉ
├── router.js                      🔄 MODIFIÉ
└── main.js
```

---

## 🚀 Commandes utiles

### Développement
```bash
# Démarrer le serveur de développement
npm run dev

# Le site est accessible à http://localhost:5173
```

### Build
```bash
# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview
```

### Serveur
```bash
# Démarrer le serveur Node
npm run server

# Ou démarrer et builder
npm start
```

---

## 📝 Checklist de déploiement

### Avant le déploiement
- [ ] Tester la connexion en développement
- [ ] Tester les routes protégées
- [ ] Vérifier les messages d'erreur
- [ ] Tester sur mobile
- [ ] Vérifier la console pour les erreurs

### Configuration Firebase
- [ ] Activer Authentication > Email/Password
- [ ] Créer les utilisateurs administrateurs
- [ ] Configurer les Firestore Rules
- [ ] Activer les domaines autorisés
- [ ] Activer HTTPS

### Avant le go-live
- [ ] Backup des données
- [ ] Plan de rollback
- [ ] Monitoring en place
- [ ] Support prêt
- [ ] Documentation à jour

---

## 🔒 Sécurité en production

### Firestore Rules recommandées

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Refuser tout par défaut
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Admin peut accéder à admin data
    match /admin/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/admins).data.uids;
    }
  }
}
```

### Restrictions de domaine

1. Allez à Firebase Console
2. Authentification > Fournisseurs > Email/Password
3. Dans "Domaines autorisés", ajoutez:
   - localhost:5173 (développement)
   - egenttogo.tg (production)
   - www.egenttogo.tg (production)

### Rate limiting

Ajouter au router ou au composable:

```javascript
const loginAttempts = {}
const MAX_ATTEMPTS = 5
const ATTEMPT_WINDOW = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email) {
  const now = Date.now()
  const attempts = loginAttempts[email] || []
  
  // Nettoyer les anciennes tentatives
  loginAttempts[email] = attempts.filter(t => now - t < ATTEMPT_WINDOW)
  
  if (loginAttempts[email].length >= MAX_ATTEMPTS) {
    throw new Error('Trop de tentatives. Réessayez plus tard.')
  }
  
  loginAttempts[email].push(now)
}
```

---

## 🧪 Test avant production

### Tester tous les scénarios
```bash
1. npm run build
2. npm run preview
3. Ouvrir http://localhost:4173
4. Tester la connexion
5. Tester les routes protégées
6. Tester la déconnexion
```

### Vérifier les logs
```
Console (F12) > Aucune erreur critique
Network > Aucune requête bloquée
Application > Local Storage contient firebase:auth
```

---

## 📊 Monitoring

### Points à surveiller
- Tentatives de connexion échouées
- Erreurs d'authentification
- Performance de l'auth
- Accès à des pages protégées

### Firebase Console
- Authentication > Fournisseurs > Email/Password > Utilisateurs actifs
- Firestore > Logs > Filtrer par authentification
- Google Cloud > Logs > Filtrer par firebase

---

## 🔄 Mise à jour future

### Pour ajouter de nouvelles fonctionnalités

#### Ajouter le 2FA
```javascript
// Dans useAuth.js
export async function enableTwoFactor(user) {
  // Générer un secret 2FA
  // Envoyer un QR code
  // Vérifier le code
}
```

#### Ajouter les rôles d'utilisateurs
```javascript
// Ajouter dans Firestore
db.collection('users').doc(uid).set({
  email: user.email,
  role: 'admin', // ou 'modérateur', 'viewer'
  permissions: ['read', 'write', 'delete']
})
```

#### Ajouter la réinitialisation de mot de passe
```javascript
import { sendPasswordResetEmail } from 'firebase/auth'

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email)
}
```

---

## 📱 Support des navigateurs

### Navigateurs supportés
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

### Navigateurs mobiles
- ✅ Chrome mobile
- ✅ Safari mobile
- ✅ Firefox mobile
- ✅ Samsung Internet

---

## 🐛 Dépannage

### Erreur: "Can't access Firestore"
**Solution**: Vérifier les Firestore Rules

### Erreur: "Authentication is not enabled"
**Solution**: Aller à Firebase Console > Authentication > Enable Email/Password

### Erreur: "Domain not authorized"
**Solution**: Ajouter le domaine aux "Domaines autorisés"

### Erreur: "Permission denied"
**Solution**: Vérifier que l'utilisateur a les permissions appropriées

---

## 📞 Ressources

| Ressource | Lien |
|-----------|------|
| Documentation | [FIREBASE_AUTH_INDEX.md](FIREBASE_AUTH_INDEX.md) |
| Guide technique | [FIREBASE_AUTH_GUIDE.md](FIREBASE_AUTH_GUIDE.md) |
| Checklist | [FIREBASE_AUTH_CHECKLIST.md](FIREBASE_AUTH_CHECKLIST.md) |
| Plan de test | [FIREBASE_AUTH_TEST_PLAN.md](FIREBASE_AUTH_TEST_PLAN.md) |

---

## ✅ Validation finale

Avant de déployer, vérifier:

- [ ] npm install réussi
- [ ] npm run dev fonctionne
- [ ] npm run build réussi
- [ ] Pas d'erreurs dans la console
- [ ] Connexion fonctionne
- [ ] Routes protégées bloquent l'accès
- [ ] Déconnexion fonctionne
- [ ] Sessions persistantes
- [ ] Responsive sur mobile

---

**Prêt pour le déploiement!** 🚀
