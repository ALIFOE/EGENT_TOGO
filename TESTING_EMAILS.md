# 🧪 Guide de Test - Emails de Devis

## Avant de tester

### Prérequis
- ✅ Variables d'environnement configurées (GMAIL_USER, GMAIL_APP_PASSWORD, ADMIN_EMAIL)
- ✅ Firebase CLI installé (`firebase --version`)
- ✅ Cloud Functions déployées (`firebase deploy --only functions`)

---

## Test 1: Vérifier que la fonction est déployée

```bash
# Lister toutes les Cloud Functions
firebase functions:list

# Cherchez: onQuoteSubmitted
# Exemple de sortie:
# ✓ onQuoteSubmitted - firestore.v1.onDocumentCreate
```

---

## Test 2: Vérifier les logs en temps réel

**Ouvrez un terminal et lancez:**
```bash
firebase functions:log --follow
```

Gardez ce terminal ouvert pendant le test.

---

## Test 3: Soumettre un devis de test

### Via le formulaire:

1. Allez sur: **https://www.egenttogo.com/#/quote**
2. Sélectionnez un service (ex: Panneaux solaires)
3. Remplissez les champs:
   - Nom: `Jean Test`
   - Email: `votre-email@gmail.com` (pour recevoir la confirmation)
   - Téléphone: `+228 92 03 15 35`
   - Les champs spécifiques au service
4. Cliquez "Envoyer le devis"
5. Vous devriez voir: ✅ "Votre demande de devis a été envoyée..."

### Vérifier les logs (dans le terminal):
```
📧 Nouveau devis reçu: <ID>
Client: Jean Test
Service: Panneaux solaires
✅ Email admin envoyé à concealiphe4@gmail.com
✅ Email de confirmation envoyé à votre-email@gmail.com
✅ Statut du devis mise à jour
```

---

## Test 4: Vérifier les emails

### Boîte de réception Admin
- Cherchez un email avec le sujet: **[NOUVEAU DEVIS] Panneaux solaires - Jean Test**
- Vérifiez que tous les détails y sont

### Boîte de réception Client
- Cherchez un email avec le sujet: **✅ Votre demande de devis a bien été reçue - EGENT TOGO**
- Vérifiez la confirmation

### Pas d'email reçu?
1. Vérifiez le dossier **SPAM** ⚠️
2. Vérifiez les logs Firebase: `firebase functions:log`
3. Vérifiez que GMAIL_APP_PASSWORD est correct (16 caractères)

---

## Test 5: Vérifier dans Firestore

### Via Firebase Console:

1. Allez sur: https://console.firebase.google.com
2. Projet: `egenttogo-edc4e`
3. Firestore Database
4. Collection: `quotes`
5. Cherchez le dernier document (par createdAt)

### Vérifiez les champs:
```
✅ emailSent: true
✅ emailSentAt: <timestamp>
✅ Tous vos champs du formulaire
```

---

## Test 6: Tester le message de succès

### Vérifier que le message s'affiche:
```
✅ Succès! Votre demande de devis a été envoyée.
Vous recevrez une confirmation par email, et notre 
équipe vous contactera sous peu.
```

Le message devrait s'afficher en **vert** pendant 3 secondes avant réinitialisation.

---

## 🧪 Scénarios de test avancés

### Test 1: Différents services

Testez avec chaque type de service:
- [ ] Panneaux solaires
- [ ] Électricité générale
- [ ] Climatisation
- [ ] Plomberie
- [ ] Fourniture d'équipements
- [ ] Consulting

Pour chacun, vérifiez que les détails spécifiques sont dans l'email.

### Test 2: Formulaires incomplètes

Essayez de soumettre sans remplir tous les champs:
- [ ] Email vide → Devrait être bloqué
- [ ] Téléphone vide → Devrait être bloqué
- [ ] Conditions non acceptées → Devrait être bloqué

### Test 3: Emails invalides

Essayez avec des emails invalides:
- [ ] `test` (sans @) → Devrait être bloqué
- [ ] `test@` (sans domaine) → Devrait être bloqué

---

## 📊 Checklist complète de test

```
TESTS FONCTIONNELS:
[ ] Formulaire accepte les données
[ ] Email admin reçu avec tous les détails
[ ] Email client reçu (confirmation)
[ ] Message de succès affiché
[ ] Données dans Firestore (emailSent: true)

TESTS PAR SERVICE:
[ ] Panneaux solaires
[ ] Électricité générale
[ ] Climatisation
[ ] Plomberie
[ ] Fourniture d'équipements
[ ] Consulting

TESTS D'ERREUR:
[ ] Formulaire vide → Blocage
[ ] Email invalide → Blocage
[ ] Conditions non acceptées → Blocage

VÉRIFICATIONS:
[ ] Logs Firebase affichent les messages
[ ] Firestore contient les données
[ ] Emails formatés correctement
[ ] Pas de messages d'erreur en console
```

---

## 🆘 Dépannage pendant le test

### Problème: "Fonction non trouvée"
**Solution:**
```bash
firebase deploy --only functions
firebase functions:list  # Vérifier qu'elle est là
```

### Problème: "Email non reçu"
**Vérifications:**
```bash
# 1. Vérifier les logs
firebase functions:log

# 2. Chercher des erreurs d'authentification
# "Authentication failed" → Mot de passe Gmail incorrect

# 3. Vérifier la variable d'env
firebase functions:config:get
```

### Problème: "L'email reçu mais vide"
**Solution:**
- Vérifier que l'HTML est correct dans `functions/index.js`
- Vérifier que les données sont correctement transmises

### Problème: "Erreur 500 lors de la soumission"
**Vérifications:**
```bash
# Chercher les erreurs dans les logs
firebase functions:log --follow

# Résoudre l'erreur spécifique
```

---

## 📈 Métriques à suivre

Pendant les tests, notez:
- **Temps de réception des emails:** _____ secondes
- **Nombre de devis reçus:** _____ documents
- **Taux de succès:** _____ %
- **Erreurs rencontrées:** _____

---

## ✅ Test final avant mise en production

```bash
# 1. Tous les tests passent
# 2. Les variables d'env sont configurées en prod
# 3. Les emails arrivent correctement
# 4. Les données Firestore sont sauvegardées
# 5. Le message de succès s'affiche
# 6. Pas d'erreurs dans les logs
```

---

## 🚀 Une fois les tests réussis

1. ✅ Déployer en production: `firebase deploy --only functions`
2. ✅ Partager le lien: https://www.egenttogo.com/#/quote
3. ✅ Informer l'équipe admin de l'email pour recevoir les devis
4. ✅ Tester une vraie demande de devis
5. ✅ Valider que tout fonctionne

---

## 📞 Questions?

Voir les fichiers de documentation:
- `QUICK_START_EMAILS.md` - Démarrage rapide
- `SETUP_EMAIL_QUOTES.md` - Installation détaillée
- `EMAIL_QUOTES_IMPLEMENTATION.md` - Architecture technique

---

**Happy testing! 🧪✨**
