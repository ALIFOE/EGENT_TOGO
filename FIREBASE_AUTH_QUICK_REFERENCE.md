# ⚡ Accès rapide - Firebase Authentication

## 🚀 3 étapes pour commencer

### Étape 1: Configurer Firebase (2 min)
```
1. Allez sur: https://console.firebase.google.com
2. Sélectionnez: egenttogo-edc4e
3. Cliquez: Authentication > Get Started
4. Activez: Email/Password
5. C'est done! ✅
```

### Étape 2: Créer un utilisateur (1 min)
```
1. Allez sur: Authentication > Users
2. Cliquez: Add user
3. Entrez: admin@egenttogo.com
4. Entrez: Un mot de passe
5. Cliquez: Create user
6. C'est done! ✅
```

### Étape 3: Tester (2 min)
```
1. Allez sur: /login
2. Entrez: admin@egenttogo.com
3. Entrez: Votre mot de passe
4. Cliquez: Se connecter
5. Vous êtes sur /admin ✅
```

**Total: 5 minutes!** ⏱️

---

## 📱 Liens rapides

### Configuration
| Lien | Destination |
|------|------------|
| 🔗 [Console Firebase](https://console.firebase.google.com) | Gestion du projet |
| 🔗 [Google Cloud Console](https://console.cloud.google.com) | Infrastructure |

### Documentation
| Document | Lire en |
|----------|--------|
| 📖 [Vue d'ensemble](FIREBASE_AUTH_INDEX.md) | 5 min |
| ⚡ [Démarrage rapide](FIREBASE_AUTH_QUICK_START.md) | 5 min |
| 📚 [Guide complet](FIREBASE_AUTH_GUIDE.md) | 20 min |
| 👨‍💼 [Guide utilisateur](ADMIN_USER_GUIDE.md) | 15 min |

### Code
| Fichier | Lire si |
|---------|---------|
| 💻 [useAuth.js](src/composables/useAuth.js) | Vous êtes dev |
| 🔐 [firebase.js](src/lib/firebase.js) | Vous changez les credentials |
| 🔌 [router.js](src/router.js) | Vous ajoutez des routes |

---

## 🆘 Questions rapides

**Q: Comment me connecter?**
```
→ Allez à /login
→ Entrez votre email et mot de passe Firebase
→ Cliquez "Se connecter"
```

**Q: Comment me déconnecter?**
```
→ Cliquez sur "Déconnexion" dans le Header
→ Vous êtes redirigé vers la page d'accueil
```

**Q: J'ai oublié mon mot de passe?**
```
→ Contactez l'administrateur système
→ Allez à Firebase Console > Authentication > Users
→ Sélectionnez l'utilisateur
→ Cliquez "Reset password"
```

**Q: Comment créer un nouvel admin?**
```
→ Allez à: https://console.firebase.google.com
→ Sélectionnez: egenttogo-edc4e
→ Allez à: Authentication > Users
→ Cliquez: Add user
→ Entrez email et password
→ Cliquez: Create user
```

**Q: Comment tester la connexion?**
```
→ Créez un utilisateur test dans Firebase
→ Allez à /login
→ Entrez les credentials de test
→ Vérifiez la redirection vers /admin
```

**Q: Pourquoi je suis redirigé vers /login?**
```
→ Vous n'êtes pas authentifié
→ Veuillez vous connecter d'abord
```

---

## 🔑 Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la production
npm run preview

# Démarrer le serveur Node
npm run server

# Installer les dépendances
npm install
```

---

## ✅ Checklist rapide

- [ ] Firebase Authentication activée
- [ ] Utilisateur admin créé
- [ ] Connexion fonctionne
- [ ] Redirection vers /admin OK
- [ ] Déconnexion fonctionne
- [ ] Routes protégées bloquent
- [ ] Responsive sur mobile

---

## 🎯 Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Tab` | Aller au champ suivant |
| `Enter` | Soumettre le formulaire |
| `Ctrl+L` | Aller à /login |
| `F12` | Ouvrir la console |
| `F5` | Rafraîchir la page |

---

## 📊 États

```
NON CONNECTÉ
├─ Accès public ✅
├─ Accès admin ❌ → Redirection /login
└─ Peut se connecter

CONNECTÉ
├─ Accès public ✅
├─ Accès admin ✅
└─ Peut se déconnecter
```

---

## 🔐 Sécurité

```
✅ Mots de passe hachés (Firebase)
✅ Sessions persistantes
✅ Routes protégées
✅ Pas de stockage de password
✅ Validation des champs
```

---

## 📞 Support

**Email**: support@egenttogo.tg  
**Chat**: Disponible sur le site  
**Docs**: [FIREBASE_AUTH_INDEX.md](FIREBASE_AUTH_INDEX.md)  

---

## 📈 Prochaines étapes

- [ ] Tester complètement
- [ ] Créer les utilisateurs admin
- [ ] Configurer les règles Firestore
- [ ] Ajouter le 2FA
- [ ] Implémenter la réinitialisation de mot de passe

---

## 💡 Conseil pro

> Sauvegardez vos credentials Firebase dans un endroit sûr (gestionnaire de mots de passe)

---

**Besoin d'aide?** Consultez [FIREBASE_AUTH_INDEX.md](FIREBASE_AUTH_INDEX.md) 📚
