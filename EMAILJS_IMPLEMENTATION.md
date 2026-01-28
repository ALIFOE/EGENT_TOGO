# EMAILJS - Exemple de Configuration Complète

## 📦 Ce qui a été installé

```bash
npm install @emailjs/browser
```

## 🔧 Configuration dans Quote.vue

### Import (Ligne 747)
```javascript
import emailjs from '@emailjs/browser'

// Initialiser EmailJS avec votre clé publique
emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY_HERE'
})
```

## 📧 Fonctionnement des Emails

### Email 1: Notification à l'Admin
**Destinataire:** `infos@egenttogo.com`

Envoyé automatiquement quand un client soumet un devis.

**Variables utilisées:**
- `from_email` - Email du client
- `from_name` - Nom du client
- `service_name` - Service demandé
- `phone` - Téléphone
- `address` - Adresse
- `budget` - Budget estimé
- `message` - Message supplémentaire
- `doc_id` - ID du devis

### Email 2: Confirmation au Client
**Destinataire:** Email du client (dynamique)

Confirmation de réception et numéro de devis.

**Variables utilisées:**
- `from_email` - Email du client
- `client_name` - Prénom du client
- `service_name` - Service demandé
- `doc_id` - Numéro de devis unique

## 🎯 Architecture du Système

```
Client remplit le formulaire
        ↓
    Valide les données
        ↓
Sauvegarde dans Firestore (DB)
        ↓
Envoie emails via EmailJS
        ├─→ Email Admin
        └─→ Email Client
        ↓
Affiche message de succès
```

## ✨ Avantages de cette Approche

| Aspect | Cloud Functions | EmailJS |
|--------|-----------------|---------|
| **Coût** | $25/mois (Blaze) | Gratuit* |
| **Serveur** | Nécessaire | Pas besoin |
| **Setup** | Complexe | Facile |
| **Maintenance** | Requise | Minimale |
| **Limite** | 2M/mois | 5000/mois* |

*Plan gratuit EmailJS

## 📝 Flux de Données Complet

### 1. Collecte des données
```javascript
const quoteData = {
  firstName: form.value.firstName,
  lastName: form.value.lastName,
  email: form.value.email,
  phone: form.value.phone,
  // ... autres champs
}
```

### 2. Sauvegarde Firestore
```javascript
const docRef = await addDoc(collection(db, 'quotes'), {
  ...quoteData,
  createdAt: serverTimestamp(),
  status: 'new'
})
```

### 3. Envoi Email Admin via EmailJS
```javascript
await emailjs.send(
  'SERVICE_ID',           // Votre Service ID Gmail
  'TEMPLATE_ID_ADMIN',    // Template admin
  {
    to_email: 'infos@egenttogo.com',
    from_email: form.value.email,
    from_name: `${form.value.firstName} ${form.value.lastName}`,
    service_name: getSelectedServiceName(),
    phone: form.value.phone,
    address: form.value.address,
    message: form.value.message,
    budget: form.value.budget || 'Non spécifié',
    doc_id: docRef.id
  }
)
```

### 4. Envoi Email Client via EmailJS
```javascript
await emailjs.send(
  'SERVICE_ID',           // Même Service ID
  'TEMPLATE_ID_CLIENT',   // Template client
  {
    to_email: form.value.email,
    from_name: 'EGENT TOGO',
    client_name: form.value.firstName,
    service_name: getSelectedServiceName(),
    doc_id: docRef.id
  }
)
```

### 5. Affichage du résultat
```javascript
if (emailError) {
  submitSuccess.value = false
  submitMessage.value = 'Devis enregistré, email échoué'
} else {
  submitSuccess.value = true
  submitMessage.value = 'Succès! Emails envoyés'
}
```

## 🔍 Code Réel dans Quote.vue

Voir la section `<script setup>` à partir de la ligne 747.

### Fonction `submitQuoteToFirebase()` (ligne ~1100)
- Valide le formulaire
- Sauvegarde dans Firestore
- Appelle EmailJS pour admin
- Appelle EmailJS pour client
- Affiche le résultat

## 📊 Données Stockées dans Firestore

Collection: `quotes`

Chaque document contient:
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  service: string,
  serviceName: string,
  budget: number,
  message: string,
  createdAt: timestamp,
  status: 'new',
  ipAddress: string,
  userAgent: string
  // + champs spécifiques au service
}
```

## 🚀 Déploiement

1. **Code source**: Déployez normalement avec `npm run build`
2. **EmailJS**: Aucune configuration serveur nécessaire
3. **Firebase**: Continuez à utiliser Firestore sans besoin Blaze

## 🔐 Sécurité

- **Public Key**: OK d'être publique (c'est conçu pour)
- **Gmail**: Autorisé via OAuth2 (EmailJS ne stocke pas le mot de passe)
- **Templates**: Sauvegardés chez EmailJS (sécurisé)
- **Données**: Sauvegardées dans Firestore + transmises via HTTPS

## ❌ Si ça ne marche pas

1. **Vérifiez la console** (F12 → Console)
2. **Vérifiez le Public Key** (Account → API Keys)
3. **Vérifiez le Service ID** (Email Services)
4. **Vérifiez les Template IDs** (Email Templates)
5. **Test dans EmailJS Dashboard** (Email Templates → Test it)

## 📞 Support

- **EmailJS**: https://www.emailjs.com/docs/
- **Dashboard**: https://dashboard.emailjs.com/
- **Guide Complet**: Voir `EMAILJS_SETUP.md`
