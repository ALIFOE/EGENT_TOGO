# Configuration des emails de devis automatiques

## 📧 Vue d'ensemble

La solution implémentée envoie automatiquement deux emails quand une demande de devis est reçue:
1. **Email à l'administrateur** - Détails complets du devis avec lien vers Firebase
2. **Email au client** - Confirmation de réception + prochaines étapes

## ✅ Ce qui a été implémenté

### 1. **Cloud Function Firebase** (`functions/index.js`)
- Fonction Firestore Trigger: `onQuoteSubmitted`
- Se déclenche automatiquement quand un document est ajouté à la collection `quotes`
- Envoie les deux emails via Nodemailer/Gmail

### 2. **Dépendances ajoutées** (`functions/package.json`)
- ✅ `nodemailer` - Pour l'envoi d'emails

### 3. **Message amélioré** (`src/pages/Quote.vue`)
- Message de succès mis à jour pour informer le client qu'il recevra une confirmation par email

## 🔧 Configuration requise (IMPORTANT!)

### Étape 1: Créer un mot de passe d'application Gmail

1. Allez sur: https://myaccount.google.com/security
2. Activez l'authentification 2FA si ce n'est pas déjà fait
3. Allez dans "Mots de passe d'application" (en bas)
4. Sélectionnez:
   - Appareil: "Mail"
   - Système d'exploitation: "Windows, Mac, ou Linux"
5. Cliquez "Générer"
6. Copiez le mot de passe généré (16 caractères)

### Étape 2: Configurer les variables d'environnement Firebase

#### Option A: Via Firebase Console (Recommandé pour la production)

1. Allez sur: https://console.firebase.google.com/u/0/project/egenttogo-edc4e/functions/config
2. Cliquez sur "Ajouter variable"
3. Ajoutez les variables suivantes:

| Clé | Valeur |
|-----|--------|
| `GMAIL_USER` | `votre-email@gmail.com` |
| `GMAIL_APP_PASSWORD` | `xxxx xxxx xxxx xxxx` (le mot de passe généré) |
| `ADMIN_EMAIL` | `admin@egenttogo.com` ou votre email |

#### Option B: Via .env.local (Pour développement local)

Créez un fichier `.env.local` dans le dossier `functions/`:

```bash
GMAIL_USER=votre-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=concealiphe4@gmail.com
```

Puis déployez avec:
```bash
firebase deploy --only functions
```

### Étape 3: Déployer les Cloud Functions

```bash
# Aller dans le dossier des fonctions
cd functions

# Installer les dépendances (si pas déjà fait)
npm install

# Retourner à la racine et déployer
cd ..
firebase deploy --only functions
```

## 📝 Exemple de variables d'environnement

```javascript
// Pour développement local dans functions/.env.local
GMAIL_USER=egenttogo@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=concealiphe4@gmail.com

// Pour production dans Firebase Console
GMAIL_USER=egenttogo@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=concealiphe4@gmail.com
```

## 🔍 Vérifier que ça fonctionne

### 1. Vérifier les logs Firebase

```bash
firebase functions:log --region=us-central1
```

Cherchez les messages:
- ✅ `Nouveau devis reçu`
- ✅ `Email admin envoyé à`
- ✅ `Email de confirmation envoyé à`

### 2. Tester manuellement

1. Allez sur `https://www.egenttogo.com/#/quote`
2. Remplissez et soumettez un devis
3. Vérifiez:
   - Que vous avez reçu un email de confirmation
   - Que l'admin a reçu l'email avec tous les détails
   - Que le message de succès s'affiche en vert

### 3. Vérifier dans Firestore

1. Allez sur Firebase Console → Firestore → Collection `quotes`
2. Vérifiez que les champs sont présents:
   - `emailSent: true` ✅ (si email envoyé avec succès)
   - `emailSentAt: <timestamp>` ✅
   - OU `emailError: true` ⚠️ (si erreur)

## 📧 Contenu des emails

### Email à l'admin
```
Sujet: [NOUVEAU DEVIS] {Service} - {Nom Client}

Contient:
- Informations du client (nom, email, téléphone, entreprise)
- Détails du service demandé
- Budget estimé
- Message supplémentaire (si fourni)
- Lien direct vers le devis dans Firebase Console
```

### Email au client
```
Sujet: ✅ Votre demande de devis a bien été reçue - EGENT TOGO

Contient:
- Confirmation de réception
- Résumé de la demande
- Délai de réponse estimé
- Prochaines étapes
- Informations de contact
```

## 🚨 Dépannage

### Problem: "Les emails ne sont pas envoyés"

**Solution 1:** Vérifier les variables d'environnement
```bash
firebase functions:config:get
```

**Solution 2:** Vérifier les logs
```bash
firebase functions:log
```

**Solution 3:** Vérifier que le mot de passe Gmail est correct
- Le mot de passe doit avoir 16 caractères (avec les espaces)
- Il doit être généré via "Mots de passe d'application" (pas votre mot de passe Gmail normal)

### Problem: "GMAIL_APP_PASSWORD not configured"

Ajoutez les variables d'environnement via Firebase Console:
https://console.firebase.google.com/u/0/project/egenttogo-edc4e/functions/config

### Problem: "Email auth failed"

Vérifiez:
1. L'email Gmail est correct: `egenttogo@gmail.com`
2. L'authentification 2FA est activée
3. Le mot de passe d'application est correct (16 caractères)

## 🔐 Sécurité

- ✅ Les mots de passe ne sont **JAMAIS** exposés en frontend
- ✅ Les variables d'environnement sont sécurisées via Firebase Console
- ✅ Les emails sont envoyés côté serveur uniquement
- ✅ Le replyTo des emails admin pointe vers le client (facilite les réponses)

## 📊 Flux complet

```
1. Utilisateur soumet le formulaire de devis
   ↓
2. Données sauvegardées dans Firestore (collection 'quotes')
   ↓
3. Cloud Function se déclenche automatiquement
   ↓
4. Email formaté pour l'admin
5. Email de confirmation pour le client
   ↓
6. Métadonnées mises à jour dans Firestore
   ↓
7. Admin reçoit les détails + lien Firebase
8. Client reçoit confirmation + prochaines étapes
```

## 📞 Support

Pour toute question:
- Consultez les logs Firebase
- Vérifiez les variables d'environnement
- Testez avec un devis de test
