# Configuration EmailJS pour le Système de Devis

## 📋 Vue d'ensemble

EmailJS est un service qui permet d'envoyer des emails directement depuis le navigateur, **sans serveur backend**. Cela élimine le besoin d'un plan Firebase Blaze payant.

## 🚀 Étapes de Configuration

### 1. Créer un Compte EmailJS

1. Allez sur [emailjs.com](https://www.emailjs.com)
2. Cliquez sur **"Sign Up Free"**
3. Créez un compte avec votre email
4. Vérifiez votre email

### 2. Configurer Gmail pour EmailJS

#### Option A: Utiliser Gmail (Recommandé)

1. Dans le dashboard EmailJS, allez à **Email Services**
2. Cliquez sur **"Add Service"**
3. Sélectionnez **Gmail** comme service
4. Entrez votre email: `egenttogo@gmail.com`
5. Cliquez sur **"Connect Account"**
6. Un pop-up vous demandera d'autoriser EmailJS à accéder à votre Gmail
7. Une fois autorisé, le service est activé automatiquement

### 3. Obtenir Vos Identifiants

1. **Public Key**: 
   - Allez sur **Account > API Keys**
   - Copiez votre `Public Key`

2. **Service ID**:
   - Allez sur **Email Services**
   - Notez votre `Service ID` (ex: `service_xxxxx`)

### 4. Créer les Templates Email

#### Template 1: Email pour l'Admin

1. Allez à **Email Templates**
2. Cliquez **"Create New Template"**
3. Nommez-le: **`template_admin_quote`**
4. Remplacez le contenu par:

```html
<h2>Nouvelle Demande de Devis</h2>

<p><strong>Service:</strong> {{service_name}}</p>
<p><strong>Client:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Téléphone:</strong> {{phone}}</p>
<p><strong>Adresse:</strong> {{address}}</p>
<p><strong>Budget estimé:</strong> {{budget}} FCFA</p>

<p><strong>Message supplémentaire:</strong></p>
<p>{{message}}</p>

<p>ID Devis: {{doc_id}}</p>
```

5. Cliquez **"Save"**

#### Template 2: Email de Confirmation Client

1. Cliquez **"Create New Template"**
2. Nommez-le: **`template_client_quote`**
3. Remplacez le contenu par:

```html
<h2>Merci pour votre Demande de Devis!</h2>

<p>Bonjour {{client_name}},</p>

<p>Nous avons bien reçu votre demande de devis pour le service <strong>{{service_name}}</strong>.</p>

<p>Votre numéro de devis: <strong>{{doc_id}}</strong></p>

<p>Notre équipe d'experts vous contactera dans les 24 heures pour discuter des détails de votre projet et vous fournir un devis personnalisé.</p>

<p>En attendant, n'hésitez pas à nous contacter si vous avez des questions.</p>

<p>Cordialement,<br>
L'équipe EGENT TOGO</p>
```

5. Cliquez **"Save"**

### 5. Configurer src/pages/Quote.vue

Ouvrez `src/pages/Quote.vue` et remplacez les placeholders:

1. Trouvez la ligne avec `emailjs.init({ publicKey: 'YOUR_PUBLIC_KEY_HERE' })`
2. Remplacez `YOUR_PUBLIC_KEY_HERE` par votre Public Key de EmailJS

3. Trouvez les deux appels `emailjs.send()`:
   - Premier appel (email admin): Remplacez `SERVICE_ID_HERE` et `TEMPLATE_ID_ADMIN_HERE`
   - Deuxième appel (email client): Remplacez `SERVICE_ID_HERE` et `TEMPLATE_ID_CLIENT_HERE`

**Exemple après configuration:**
```javascript
emailjs.init({
  publicKey: 'abc123def456'
})

// Email admin
await emailjs.send('service_abc123', 'template_admin_quote', {...})

// Email client
await emailjs.send('service_abc123', 'template_client_quote', {...})
```

## 🔑 Variables de Template

### Variables pour Email Admin
- `{{service_name}}` - Nom du service
- `{{from_name}}` - Nom du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone du client
- `{{address}}` - Adresse
- `{{budget}}` - Budget estimé
- `{{message}}` - Message supplémentaire
- `{{doc_id}}` - ID du devis dans Firestore

### Variables pour Email Client
- `{{client_name}}` - Prénom du client
- `{{service_name}}` - Nom du service
- `{{doc_id}}` - ID du devis

## ✅ Test

1. Ouvrez votre site localement: `npm run dev`
2. Remplissez le formulaire de devis complet
3. Cliquez sur "Envoyer le devis"
4. Vérifiez vos emails (admin et client)

## 📊 Limites Gratuites EmailJS

- **5,000 emails/mois** - Gratuit
- **Stockage illimité** des templates
- **Support illimité**

Pour votre usage (quelques devis par jour), le plan gratuit est amplement suffisant.

## 🆘 Troubleshooting

### Les emails ne s'envoient pas?

1. **Vérifiez la Public Key**
   - Assurez-vous qu'elle est correctement remplacée dans Quote.vue

2. **Vérifiez le Service ID**
   - Allez à **Email Services** et copiez exactement le Service ID

3. **Vérifiez les IDs de Template**
   - Allez à **Email Templates** et copiez exactement les IDs

4. **Vérifiez la console du navigateur**
   - Ouvrez F12 > Console pour voir les erreurs EmailJS

5. **Test via EmailJS Dashboard**
   - Dans Email Templates, cliquez "Test it" pour tester le template directement

### Gmail demande une authentification?

- Cela ne devrait pas se produire si vous avez suivi l'étape 2
- Si ça arrive, allez à **Email Services** et reconnectez Gmail

## 🔒 Sécurité

- Votre **Public Key** est publique (c'est normal, c'est prévu pour)
- Vos identifiants sensibles restent protégés par EmailJS
- Gmail est en lecture seule (EmailJS ne peut qu'envoyer, pas accéder)

## 📝 Fichiers Modifiés

- `src/pages/Quote.vue` - Ajout EmailJS au lieu de Cloud Functions
- `package.json` - Ajout `@emailjs/browser`

## ✨ Avantages de cette Solution

✅ **Pas de serveur à gérer**
✅ **Pas de plan Firebase Blaze payant**
✅ **Gratuit (5000 emails/mois)**
✅ **Temps de réponse rapide**
✅ **Templates personnalisables**
✅ **Suivi des envois**

## 📞 Support

- EmailJS Support: https://www.emailjs.com/docs/
- Dashboard: https://dashboard.emailjs.com/
