# Guide Firebase Authentication - EGENT TOGO

## ✅ Configuration complète

Firebase Authentication a été intégré au projet EGENT TOGO. Les administrateurs peuvent maintenant se connecter de manière sécurisée.

## 📋 Étapes de configuration

### 1. **Créer des utilisateurs administrateur dans Firebase**

1. Allez sur https://console.firebase.google.com
2. Sélectionnez le projet **egenttogo-edc4e**
3. Dans le menu latéral, cliquez sur **Authentication** (ou **Authentification**)
4. Cliquez sur l'onglet **Users** (ou **Utilisateurs**)
5. Cliquez sur le bouton **Add user** (ou **Ajouter un utilisateur**)
6. Entrez un email (ex: `admin@egenttogo.com`)
7. Entrez un mot de passe (minimum 6 caractères)
8. Cliquez sur **Create user** (ou **Créer l'utilisateur**)

### 2. **Répéter pour chaque administrateur**

Créez autant d'utilisateurs que nécessaire. Chaque administrateur aura son propre compte.

## 🔐 Fonctionnalités implémentées

✅ **Connexion sécurisée** - Utilise Firebase Authentication  
✅ **Persistance de session** - L'utilisateur reste connecté après actualisation  
✅ **Protection des routes** - Les routes `/admin` et `/admin/import` nécessitent une authentification  
✅ **Messages d'erreur localisés** - Erreurs en français  
✅ **Email mémorisé** - Option "Se souvenir de moi"  
✅ **Redirection automatique** - Vers login si non authentifié, vers admin si déjà connecté

## 🔑 Fichiers modifiés

1. **src/lib/firebase.js**
   - Ajout de `getAuth()` pour Firebase Authentication

2. **src/composables/useAuth.js** (NOUVEAU)
   - Composable pour gérer l'authentification
   - Fonctions: `login()`, `logout()`, `registerAdmin()`
   - Gestion des erreurs en français

3. **src/pages/Login.vue**
   - Remplacé les credentials en dur par Firebase Auth
   - Intégration du composable `useAuth`
   - Validation du formulaire

4. **src/router.js**
   - Ajout de `meta: { requiresAuth: true }` aux routes admin
   - Middleware de protection des routes
   - Redirection automatique vers `/login` si non authentifié

5. **src/App.vue**
   - Initialisation de l'authentification au démarrage

## 📝 Notes de sécurité

⚠️ **IMPORTANT**: 
- Ne jamais committer les credentials Firebase dans le code source
- Les credentials sont maintenant en lecture seule dans `firebase.js`
- Configurez les Firestore Rules pour protéger vos données
- Utilisez des mots de passe forts pour les administrateurs

## 🚀 Utilisation

### Pour les administrateurs:

1. Aller à `/login`
2. Entrer email et mot de passe créés dans Firebase
3. Cocher "Se souvenir de moi" (optionnel)
4. Cliquer sur "Se connecter"
5. Accès automatique au tableau de bord admin

### Pour se déconnecter:

Le bouton de déconnexion est dans le composant Header (à ajouter/mettre à jour).

## 🛠️ Prochaines étapes

1. Ajouter un bouton de déconnexion dans le Header
2. Ajouter la création d'administrateurs (avec vérification de droits)
3. Implémenter les rôles d'utilisateurs (admin, modérateur, etc.)
4. Ajouter la réinitialisation de mot de passe (Password Reset)
5. Implémenter les Firestore Rules de sécurité

## 📞 Support

Pour plus d'informations:
- Documentation Firebase: https://firebase.google.com/docs/auth
- Console Firebase: https://console.firebase.google.com
