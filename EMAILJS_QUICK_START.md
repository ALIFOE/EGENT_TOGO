# ✅ ÉTAPES IMMÉDIATES - Configuration EmailJS

## Étape 1: Créer Compte EmailJS et Obtenir les Clés (5 min)

1. Allez sur https://www.emailjs.com
2. Cliquez **"Sign Up Free"**
3. Inscrivez-vous avec votre email
4. Confirmez votre email
5. Connectez-vous au dashboard

**Vous avez maintenant:**
- Dashboard ouvert

## Étape 2: Connecter Gmail (2 min)

Dans le dashboard EmailJS:

1. Allez **Email Services** (menu gauche)
2. Cliquez **"Add Service"**
3. Sélectionnez **Gmail**
4. Entrez: `egenttogo@gmail.com`
5. Cliquez **"Connect Account"**
6. Autorisez EmailJS à accéder à Gmail (pop-up)
7. Attendez le message de succès

**Copie le Service ID** (ex: `service_abc123def456`)

## Étape 3: Récupérer Votre Public Key (1 min)

1. Allez **Account** (menu gauche)
2. Cliquez **API Keys**
3. **Copiez votre Public Key** (longue chaîne)

## Étape 4: Créer Template Admin (3 min)

1. Allez **Email Templates**
2. Cliquez **"Create New Template"**
3. **Nom:** `template_admin_quote`
4. **Email To:** `infos@egenttogo.com`
5. **Subject:** `Nouvelle Demande de Devis - {{service_name}}`
6. **Body (remplacez tout par):**

```
Bonjour,

Vous avez reçu une nouvelle demande de devis.

SERVICE: {{service_name}}
CLIENT: {{from_name}}
EMAIL: {{from_email}}
TÉLÉPHONE: {{phone}}
ADRESSE: {{address}}
BUDGET: {{budget}} FCFA

MESSAGE:
{{message}}

ID DEVIS: {{doc_id}}

Cordialement,
Système Automatisé EGENT TOGO
```

7. Cliquez **Save**
8. **Copiez le Template ID** (ex: `template_abc123`)

## Étape 5: Créer Template Client (3 min)

1. Cliquez **"Create New Template"**
2. **Nom:** `template_client_quote`
3. **Email To:** `{{from_email}}`
4. **Subject:** `Votre demande de devis reçue ✓`
5. **Body:**

```
Bonjour {{client_name}},

Merci pour votre demande de devis pour {{service_name}}.

Numéro de Devis: {{doc_id}}

Notre équipe d'experts vous contactera dans les 24 heures pour discuter de votre projet et vous envoyer un devis personnalisé.

Cordialement,
L'équipe EGENT TOGO
```

6. Cliquez **Save**
7. **Copiez le Template ID** (ex: `template_def456`)

## Étape 6: Mettre à Jour Quote.vue (2 min)

Ouvrez `src/pages/Quote.vue` et cherchez (Ctrl+F):

### Ligne 747 - Remplacer:
```javascript
emailjs.init({
  publicKey: 'YOUR_PUBLIC_KEY_HERE'
})
```

Par (remplacez avec vos vraies valeurs):
```javascript
emailjs.init({
  publicKey: 'VOTRE_PUBLIC_KEY_LONG_ICI'
})
```

### Ligne ~1114 - Remplacer `SERVICE_ID_HERE`:
Trouvez les deux lignes avec `emailjs.send('SERVICE_ID_HERE'` et remplacez par votre Service ID:
```javascript
await emailjs.send('service_abc123def456', 'template_admin_quote', {
```

### Même ligne - Remplacer `TEMPLATE_ID_ADMIN_HERE`:
```javascript
await emailjs.send('service_abc123def456', 'template_admin_quote', {
```

### Ligne ~1125 - Remplacer pour client:
```javascript
await emailjs.send('service_abc123def456', 'template_client_quote', {
```

## Étape 7: Tester (5 min)

Dans le terminal:
```bash
npm run dev
```

1. Ouvrez http://localhost:5173
2. Allez à "Demande de Devis"
3. Remplissez le formulaire complet
4. Cliquez "Envoyer le devis"
5. Regardez dans les deux emails:
   - `infos@egenttogo.com` - Email admin
   - Votre email de test - Email confirmation

✅ **Si les deux emails arrivent, c'est fini!**

## 📌 Résumé des Valeurs à Copier

| Élément | Où le Trouver | Où le Mettre |
|---------|---------------|--------------|
| **Public Key** | Account → API Keys | Ligne 747 de Quote.vue |
| **Service ID** | Email Services | Ligne ~1114 et ~1125 de Quote.vue |
| **Template ID Admin** | Email Templates → template_admin_quote | Ligne ~1114 de Quote.vue |
| **Template ID Client** | Email Templates → template_client_quote | Ligne ~1125 de Quote.vue |

## ❓ Questions?

Consultez `EMAILJS_SETUP.md` pour plus de détails.
