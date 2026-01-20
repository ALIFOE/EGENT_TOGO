# ✅ Checklist Firebase Authentication

## Phase 1: Configuration Firebase Console

- [ ] Aller à https://console.firebase.google.com
- [ ] Sélectionner le projet **egenttogo-edc4e**
- [ ] Aller à **Authentication** (Authentification)
- [ ] Cliquer sur **Get Started** (ou voir les options d'authentification)
- [ ] Sélectionner **Email/Password** (Email/Mot de passe)
- [ ] Activer le fournisseur d'authentification

## Phase 2: Créer un utilisateur administrateur

- [ ] Dans **Authentication** > **Users**, cliquer **Add user**
- [ ] Entrer un email (ex: `admin@egenttogo.com`)
- [ ] Entrer un mot de passe (min 6 caractères)
- [ ] Cliquer **Create user** (Créer l'utilisateur)
- [ ] Vérifier que l'utilisateur apparaît dans la liste

## Phase 3: Tester l'application

### Test de connexion
- [ ] Ouvrir l'application sur `/login`
- [ ] Entrer l'email créé
- [ ] Entrer le mot de passe
- [ ] Cliquer sur "Se connecter"
- [ ] Vérifier la redirection vers `/admin`

### Test de déconnexion
- [ ] Cliquer sur le bouton "Déconnexion" dans le Header
- [ ] Vérifier la redirection vers la page d'accueil
- [ ] Vérifier que le bouton "Déconnexion" a disparu

### Test d'erreurs
- [ ] Essayer de se connecter avec un email invalide
  - Vérifier le message d'erreur en français
- [ ] Essayer de se connecter avec un mot de passe incorrect
  - Vérifier le message d'erreur approprié
- [ ] Essayer d'accéder à `/admin` sans être connecté
  - Vérifier la redirection vers `/login`

### Test de persistance
- [ ] Se connecter
- [ ] Vérifier que vous êtes redirigé vers `/admin`
- [ ] Rafraîchir la page (F5)
- [ ] Vérifier que vous restez sur `/admin` (session persistée)
- [ ] Fermer le navigateur et le rouvrir
- [ ] Vérifier que vous êtes toujours connecté (si le navigateur garde les cookies)

### Test mobile
- [ ] Ouvrir sur un mobile ou en mode responsive
- [ ] Tester la connexion
- [ ] Vérifier que le bouton "Déconnexion" apparaît dans le menu mobile
- [ ] Tester la déconnexion depuis le menu mobile

## Phase 4: Vérification du code

### Fichiers créés/modifiés
- [ ] `src/composables/useAuth.js` existe et contient les fonctions d'auth
- [ ] `src/lib/firebase.js` importe et exporte `auth`
- [ ] `src/pages/Login.vue` utilise `useAuth`
- [ ] `src/router.js` protège les routes admin
- [ ] `src/App.vue` initialise l'auth au démarrage
- [ ] `src/components/Header.vue` affiche le bouton de déconnexion

### Fonctionnalités activées
- [ ] Connexion Firebase fonctionnelle
- [ ] Persistance de session (localStorage)
- [ ] Protection des routes admin
- [ ] Redirection automatique vers `/login` si non authentifié
- [ ] Redirection automatique vers `/admin` après connexion
- [ ] Messages d'erreur en français
- [ ] Bouton de déconnexion visible et fonctionnel

## Phase 5: Sécurité et production

- [ ] Vérifier les Firestore Rules (voir FIREBASE_SECURITY_RULES.md)
- [ ] Configurer les domaines autorisés dans Firebase Console
- [ ] Activer HTTPS en production
- [ ] Tester sur plusieurs navigateurs
- [ ] Tester sur multiple appareils (mobile, tablette, desktop)

## Phase 6: Documentation et formation

- [ ] Lire [FIREBASE_AUTH_QUICK_START.md](FIREBASE_AUTH_QUICK_START.md)
- [ ] Lire [FIREBASE_AUTH_GUIDE.md](FIREBASE_AUTH_GUIDE.md)
- [ ] Lire [FIREBASE_AUTH_IMPLEMENTATION.md](FIREBASE_AUTH_IMPLEMENTATION.md)
- [ ] Former les administrateurs sur l'utilisation
- [ ] Créer une documentation pour la gestion des utilisateurs

## Phase 7: Monitoring et maintenance

- [ ] Monitorer les tentatives de connexion échouées
- [ ] Vérifier les logs Firebase
- [ ] Mettre en place une politique de mots de passe forts
- [ ] Planifier les mises à jour de sécurité
- [ ] Implémenter le rate limiting (prochaine étape)
- [ ] Implémenter le 2FA (prochaine étape)

## 🐛 Dépannage

Si vous rencontrez des problèmes:

1. **Vérifier la console du navigateur** (F12 > Console)
   - Chercher les messages d'erreur JavaScript
   - Chercher les erreurs Firebase

2. **Vérifier le Local Storage** (F12 > Application > Local Storage)
   - Chercher les clés `firebase:` pour vérifier la session

3. **Vérifier les Firestore Rules**
   - Aller à Firebase Console > Firestore Database > Rules
   - Vérifier que l'authentification est correctement configurée

4. **Redémarrer l'application**
   - Vider le cache du navigateur
   - Redémarrer le serveur de développement
   - Vérifier que Firebase est accessible

## ✅ Validation finale

Quand tout est en place, vous devriez avoir:

✅ Une connexion sécurisée avec Firebase Auth  
✅ Des routes admin protégées  
✅ Une gestion des sessions persistante  
✅ Un bouton de déconnexion dans le Header  
✅ Des messages d'erreur localisés en français  
✅ Une redirection automatique appropriée  

**Tout est prêt!** L'admin peut maintenant écrire via l'interface admin sécurisée.

---

**Date de configuration**: _______________  
**Configurationateur**: _______________  
**Notes**: _______________
