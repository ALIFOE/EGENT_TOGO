# 🚀 Configuration rapide Firebase Authentication

## ⚡ En 5 minutes

### Étape 1: Activer Firebase Authentication
```
1. Allez sur https://console.firebase.google.com
2. Sélectionnez le projet: egenttogo-edc4e
3. Cliquez sur "Authentication" (ou "Authentification")
4. Cliquez sur "Get Started"
5. Sélectionnez "Email/Password"
6. Cliquez sur "Enable" (ou "Activer")
7. Cliquez sur "Save" (ou "Enregistrer")
```

### Étape 2: Créer un utilisateur administrateur
```
1. Dans Authentication, allez à l'onglet "Users" (ou "Utilisateurs")
2. Cliquez sur "Add user" (ou "Ajouter un utilisateur")
3. Entrez:
   - Email: admin@egenttogo.com
   - Password: Un mot de passe fort (min 6 caractères)
4. Cliquez sur "Create user" (ou "Créer l'utilisateur")
```

### Étape 3: C'est prêt!
```
L'application peut maintenant:
✅ Se connecter avec Firebase Auth
✅ Protéger les routes admin
✅ Gérer les sessions utilisateur
✅ Afficher les messages d'erreur en français
```

## 🔐 Connexion

- **URL**: /login
- **Email**: admin@egenttogo.com (ou votre email)
- **Mot de passe**: Le mot de passe créé dans Firebase
- **Accès admin**: /admin (après connexion)

## ❌ Problèmes courants

### "Email ou mot de passe incorrect"
- ✓ Vérifiez que l'utilisateur existe dans Firebase Console
- ✓ Vérifiez que l'email est exact (sensible à la casse)
- ✓ Vérifiez que le mot de passe est correct

### "Email invalide"
- ✓ Vérifiez le format de l'email
- ✓ Exemple valide: admin@egenttogo.com

### "Le mot de passe est trop faible"
- ✓ Minimum 6 caractères
- ✓ Utilisez un mélange de lettres, chiffres et caractères spéciaux

### Pas d'accès à /admin après connexion
- ✓ Vérifiez que vous êtes connecté (vérifiez le logo dans le Header)
- ✓ Vérifiez que l'onglet browser local storage contient l'utilisateur Firebase
- ✓ Rafraîchissez la page

## 📱 Interfaces admin

| Route | Description | Protégée |
|---|---|---|
| `/login` | Formulaire de connexion | Non |
| `/admin` | Tableau de bord admin | ✅ Oui |
| `/admin/import` | Import de données | ✅ Oui |

## 🎯 Fichiers clés

- `src/composables/useAuth.js` - Logique d'authentification
- `src/pages/Login.vue` - Formulaire de connexion
- `src/router.js` - Protéction des routes
- `src/components/Header.vue` - Bouton de déconnexion

## 📚 Documentation complète

Voir: [FIREBASE_AUTH_GUIDE.md](FIREBASE_AUTH_GUIDE.md)

## 💡 Conseils

1. **Créer plusieurs comptes admin**
   - Chaque administrateur devrait avoir son propre compte
   - Ne pas partager les mots de passe

2. **Mots de passe forts**
   - Utilisez un gestionnaire de mots de passe
   - Minimum 12 caractères en production
   - Mélange de types de caractères

3. **Sécurité**
   - Activez HTTPS en production
   - Configurez les règles Firestore
   - Limitez les tentatives de connexion échouées

4. **Gestion des sessions**
   - La session persiste même après fermeture du navigateur
   - Pour se déconnecter: Cliquez sur "Déconnexion" dans le Header
   - Ou: Effacez les cookies du navigateur

## ✅ Vérification

Pour vérifier que tout fonctionne:

```javascript
1. Ouvrez la console du navigateur (F12)
2. Allez à l'onglet "Application" > "Local Storage"
3. Vous devriez voir une clé "firebase:" avec vos données d'authentification
4. Si vous êtes connecté, `user.value` contient les données de l'utilisateur
```

## 🚨 Sécurité en production

- [ ] Activer les Firestore Security Rules
- [ ] Configurer les domaines autorisés dans Firebase Console
- [ ] Utiliser des variables d'environnement pour les credentials
- [ ] Activer le rate limiting sur les tentatives de connexion
- [ ] Implémenter le 2FA pour les administrateurs
- [ ] Auditer régulièrement les accès

---

**Besoin d'aide?** Consultez la documentation Firebase: https://firebase.google.com/docs/auth
