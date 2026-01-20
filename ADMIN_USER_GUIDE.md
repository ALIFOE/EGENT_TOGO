# 👨‍💼 Guide d'utilisation pour l'administrateur

## Vue d'ensemble

Vous avez maintenant accès à l'interface d'administration sécurisée d'EGENT TOGO. Cette interface vous permet de gérer tous les contenus du site.

## 🔐 Accès administrateur

### Connexion

1. **Allez à**: `/login` ou cliquez sur le lien de connexion
2. **Entrez**: Votre email administrateur
3. **Entrez**: Votre mot de passe
4. **Cliquez**: "Se connecter"
5. **Redirection**: Vers le tableau de bord admin (`/admin`)

### Session

- **Persistance**: Votre session persiste même après fermeture du navigateur
- **Sécurité**: Vous serez automatiquement déconnecté après inactivité prolongée
- **Déconnexion**: Cliquez sur "Déconnexion" dans le Header quand vous avez terminé

## 📊 Tableau de bord administrateur

### Accès
- **URL**: `/admin`
- **Protection**: Réservée aux utilisateurs authentifiés
- **Redirection**: Vers `/login` si vous ne êtes pas connecté

### Fonctionnalités

Dans le tableau de bord, vous pouvez:

| Section | Actions possibles |
|---------|-------------------|
| **Produits** | Ajouter, modifier, supprimer |
| **Services** | Ajouter, modifier, supprimer |
| **Actualités/Articles** | Ajouter, modifier, supprimer |
| **Projets/Portfolio** | Ajouter, modifier, supprimer |
| **Galerie** | Uploader, organiser, supprimer images |

## 📥 Import de données

### Accès
- **URL**: `/admin/import`
- **Protection**: Réservée aux utilisateurs authentifiés

### Capacités
- Importer des données en masse
- Mettre à jour les informations existantes
- Télécharger les données actuelles

## 🖼️ Gestion des contenus

### Pour ajouter un produit
```
1. Aller à /admin
2. Cliquer sur "Produits"
3. Cliquer sur "Ajouter un produit"
4. Remplir les informations:
   - Nom
   - Description
   - Prix
   - Images
   - Catégorie
5. Cliquer "Enregistrer"
```

### Pour modifier un contenu
```
1. Aller à /admin
2. Sélectionner le contenu à modifier
3. Cliquer sur "Modifier"
4. Changer les informations
5. Cliquer "Enregistrer"
```

### Pour supprimer un contenu
```
1. Aller à /admin
2. Sélectionner le contenu à supprimer
3. Cliquer sur "Supprimer"
4. Confirmer la suppression
```

## 📸 Gestion des images

### Upload d'images
- **Formats supportés**: JPG, PNG, WebP, GIF
- **Taille max**: 5 MB (par défaut)
- **Dimensions recommandées**:
  - Produits: 800x600px minimum
  - Galerie: 1200x800px minimum
  - Miniatures: 300x300px

### Optimisation
- Les images sont automatiquement optimisées
- Les miniatures sont créées automatiquement
- Les formats modernes (WebP) sont supportés

## 🔒 Sécurité et bonnes pratiques

### ✅ À faire
- ✓ Utiliser un mot de passe fort (12+ caractères)
- ✓ Changer régulièrement votre mot de passe
- ✓ Se déconnecter quand vous avez terminé
- ✓ Ne pas partager vos identifiants
- ✓ Notifier l'admin si vous oubliez votre mot de passe

### ❌ À éviter
- ✗ Partager votre compte administrateur
- ✗ Utiliser le même mot de passe partout
- ✗ Laisser votre session active sans surveillance
- ✗ Modifier des données sensibles sans confirmation
- ✗ Publier du contenu non vérifié

## 🆘 Problèmes courants

### "Je ne peux pas me connecter"

**Solution**:
1. Vérifiez votre email (respect de la casse)
2. Vérifiez votre mot de passe
3. Vérifiez votre connexion internet
4. Contactez l'administrateur système

### "J'ai oublié mon mot de passe"

**Solution**:
1. Contactez l'administrateur système
2. L'administrateur réinitialisera votre mot de passe via Firebase Console
3. Vous recevrez un nouveau mot de passe temporaire
4. Changez-le lors de votre prochaine connexion

### "Je suis automatiquement déconnecté"

**Raison**: Session expirée pour des raisons de sécurité (inactivité prolongée)

**Solution**:
1. Reconnectez-vous
2. Marquez-vous comme "Se souvenir de moi" pour une session plus longue
3. Contactez l'admin pour augmenter la durée de session

### "Une erreur s'affiche lors de l'enregistrement"

**Solution**:
1. Vérifiez que tous les champs obligatoires sont remplis
2. Vérifiez la taille des fichiers (images, documents)
3. Vérifiez votre connexion internet
4. Essayez de actualiser la page
5. Contactez le support si le problème persiste

## 📞 Support

### Problèmes techniques
- **Email**: support@egenttogo.tg
- **Téléphone**: +228 XXXXXXX
- **Chat**: Via le site (selon disponibilité)

### Compte administrateur
- **Email**: admin@egenttogo.tg
- **Téléphone**: +228 XXXXXXX

## 📋 Workflow recommandé

### Quotidien
1. Vérifier les nouvelles demandes de contact
2. Répondre aux messages des clients
3. Ajouter/modifier les produits selon les stocks
4. Publier les actualités pertinentes

### Hebdomadaire
1. Mettre à jour le portfolio/réalisations
2. Ajouter les nouveaux témoignages clients
3. Vérifier et mettre à jour les tarifs
4. Sauvegarder les données importantes

### Mensuellement
1. Analyser les statistiques du site
2. Faire un backup des données
3. Vérifier les liens cassés
4. Mettre à jour la SEO
5. Planifier le contenu du mois suivant

## 🎯 KPIs à suivre

Mesurez l'impact de vos actions:

| Métrique | Objectif | Fréquence |
|----------|----------|-----------|
| **Visiteurs** | 500+/mois | Mensuel |
| **Conversions** | 5%+ des visiteurs | Mensuel |
| **Temps de page** | <3s | Continu |
| **Taux de rebond** | <50% | Mensuel |
| **Contacts reçus** | 10+/mois | Mensuel |

## 🚀 Prochaines étapes

Après la configuration:

1. [ ] Ajouter vos premiers produits
2. [ ] Uploader vos images de galerie
3. [ ] Écrire les premières actualités
4. [ ] Configurer l'email de contact
5. [ ] Tester les formulaires
6. [ ] Publier sur les réseaux sociaux
7. [ ] Configurer l'analytique (Google Analytics)
8. [ ] Mettre en place le SEO

## 📚 Ressources

- **Manuel complet**: [FIREBASE_AUTH_GUIDE.md](FIREBASE_AUTH_GUIDE.md)
- **Démarrage rapide**: [FIREBASE_AUTH_QUICK_START.md](FIREBASE_AUTH_QUICK_START.md)
- **Dépannage**: [FIREBASE_AUTH_CHECKLIST.md](FIREBASE_AUTH_CHECKLIST.md)
- **Documentation Firebase**: https://firebase.google.com/docs

---

**Bienvenue dans l'équipe EGENT TOGO!** 🎉

Vous avez maintenant tous les outils pour gérer et développer le site. N'hésitez pas à contacter le support en cas de problème.
