# 🔒 Guide Sécurité Firestore - EGENT-TOGO

## ⚠️ Problème identifié
Vos règles Firestore permettaient aux utilisateurs publics de créer des documents sans validation, ce qui expose votre base de données au spam et aux abus.

---

## ✅ Solution appliquée

Nous avons renforcé les règles avec **validation stricte** :

### **1. Données publiques (lecture seule)**
- ✅ **Products, Articles, Gallery, Projects**
  - Public peut **LIRE**
  - Seul un admin authentifié peut **CRÉER/MODIFIER/SUPPRIMER**

### **2. Formulaires de contact & Devis (avec validation)**
- ⚠️ Public peut créer, **MAIS** avec validation stricte :
  - ✅ Taille max : 5KB (anti-spam)
  - ✅ Champs obligatoires : `name`, `email`, `message`, `createdAt`
  - ✅ Longueurs minimales :
    - `name` > 0 caractères
    - `email` > 5 caractères
    - `message` > 10 caractères
  - ✅ Types de données vérifiés (string)

---

## 🚀 Appliquer les nouvelles règles

### **Étape 1 : Aller à Firebase Console**
1. Ouvrir https://console.firebase.google.com
2. Sélectionner votre projet **"egenttogo-edc4e"**
3. Aller à **"Firestore Database"** dans le menu gauche

### **Étape 2 : Accéder aux règles**
1. Cliquer sur l'onglet **"Rules"**
2. Vous verrez l'éditeur de règles

### **Étape 3 : Copier les nouvelles règles**
1. Ouvrir le fichier `FIRESTORE_RULES.txt` dans votre projet
2. **Copier TOUT le contenu** (depuis `rules_version = '2';` jusqu'à la fin)

### **Étape 4 : Remplacer les anciennes règles**
1. Dans Firebase Console, **effacer tout** le contenu de l'éditeur
2. **Coller les nouvelles règles**
3. Cliquer sur **"Publish"** (bouton en haut à droite)

### **Étape 5 : Confirmer la publication**
- Attendez 30-60 secondes pour que les règles se propagent
- Un message vert confirmera : "Rules updated successfully" ✅

---

## 📊 Tableau de sécurité

| Collection | Public Read | Public Create | Public Update | Public Delete | Validation |
|-----------|:----------:|:------------:|:------------:|:------------:|:----------:|
| products | ✅ | ❌ | ❌ | ❌ | N/A |
| articles | ✅ | ❌ | ❌ | ❌ | N/A |
| gallery | ✅ | ❌ | ❌ | ❌ | N/A |
| projects | ✅ | ❌ | ❌ | ❌ | N/A |
| contact_forms | ❌ | ✅ | ❌ | ❌ | **Stricte** |
| quotes | ❌ | ✅ | ❌ | ❌ | **Stricte** |

---

## 🛡️ Validations appliquées

### **Formulaires de contact & Devis**

```javascript
// ✅ Ces données sont ACCEPTÉES :
{
  name: "Jean Dupont",           // String, > 0 chars
  email: "jean@example.com",     // String, > 5 chars
  message: "Je veux un devis",   // String, > 10 chars
  createdAt: 1234567890          // Timestamp
}

// ❌ Ces données sont REJETÉES :
{
  name: "",                       // ✗ Vide
  email: "xx@y",                 // ✗ Trop court
  message: "Bonjour"             // ✗ < 10 caractères
}

// ❌ Rejeté si taille > 5KB
// ❌ Rejeté si champs manquants
```

---

## 🔧 Maintenant, mettez à jour votre code

Assurez-vous que lors de la création de formulaires, vous incluez le `createdAt` :

### **Contact Form (useFirebaseData.js)**
```javascript
const addContactForm = async (formData) => {
  try {
    await addDoc(collection(db, 'contact_forms'), {
      ...formData,
      createdAt: new Date()  // ✅ REQUIS par les règles
    })
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

### **Devis (useFirebaseData.js)**
```javascript
const addQuote = async (quoteData) => {
  try {
    await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      createdAt: new Date()  // ✅ REQUIS par les règles
    })
  } catch (error) {
    console.error('Erreur:', error)
  }
}
```

---

## ⚠️ Que se passe-t-il en cas d'erreur ?

Après la publication des règles, si vous obtenez une erreur :

```
FirebaseError: Missing or insufficient permissions
```

**Cela signifie :**
1. ✅ Les règles se propagent (peut prendre 1-2 minutes)
2. ✅ Vous testez avant que les règles soient actives

**Solutions :**
- ⏳ Attendez 2 minutes et réessayez
- 🔄 Rafraîchissez la page
- 🗑️ Vérifiez que vos données respectent la validation
- 📝 Vérifiez la console du navigateur pour les erreurs

---

## 📱 Monitoring & Logs

Pour voir si quelqu'un essaie d'accéder à vos données :

1. Aller à **"Firestore Database"** → **"Firestore Logs"**
2. Chercher les erreurs de type **"Permission denied"**
3. Cela vous montre les tentatives d'accès non autorisé

---

## ✅ Checklist post-implémentation

- [ ] Copié les nouvelles règles du fichier `FIRESTORE_RULES.txt`
- [ ] Publié les règles dans Firebase Console
- [ ] Attendu 30-60 secondes
- [ ] Testé la création d'article en admin ✅
- [ ] Testé la création de formulaire en public ✅
- [ ] Rafraîchi la page publique (les produits s'affichent) ✅
- [ ] Vérifiez qu'un utilisateur public NE PEUT PAS modifier les articles ✅

---

## 🎯 Résumé de sécurité

| Avant | Après |
|-------|-------|
| ❌ N'importe qui peut créer sans validation | ✅ Validation stricte appliquée |
| ❌ Spam potentiel illimité | ✅ Taille max 5KB |
| ❌ Données invalides possibles | ✅ Champs obligatoires vérifiés |
| ✅ Admin protégé | ✅ Admin toujours protégé |

---

## 📞 Besoin d'aide ?

Si vous avez des erreurs après la publication :
1. Vérifiez que tous les champs sont présents
2. Vérifiez que les longueurs sont respectées
3. Attendez que les règles se propagent (1-2 min)
4. Regardez les Firestore Logs pour les détails

**C'est normal si ça prend 30-60 secondes pour que les changements de règles prennent effet !** ⏳
