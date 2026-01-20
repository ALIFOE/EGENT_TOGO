# 🚀 Importer les Données - Démarrage Rapide

## En 3 étapes simples

### 1️⃣ Vérifier les Règles Firebase (IMPORTANT)

Allez sur: https://console.firebase.google.com

1. Sélectionnez le projet **egenttogo-edc4e**
2. Realtime Database → Onglet **"Rules"**
3. Remplacez le contenu par:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

4. Cliquez le bouton bleu **"Publish"** (en haut à droite)

---

### 2️⃣ Se Connecter au Tableau de Bord Admin

URL: `http://localhost:5174/EGENT_TOGO/admin`

**Identifiants:**
- Email: `admin@egenttogo.com`
- Mot de passe: `password123`

---

### 3️⃣ Importer les Données

Dans le tableau de bord:
1. Cliquez sur le bouton vert **"📥 Importer Données"** (en haut à droite)
2. Sur la page d'import, cliquez **"🚀 Importer Tout"**
3. Attendez la confirmation ✅

---

## ✅ Vérifier que ça a Marché

Une fois l'import terminé:

- Allez sur `/produits` → Vous verrez les 4 produits
- Allez sur `/actualites` → Vous verrez les 4 articles  
- Allez sur `/projets` → Vous verrez les 4 projets

---

## 🎯 Ensuite?

Vous pouvez maintenant:
- ✏️ Éditer les produits/articles/projets depuis l'admin
- ➕ Créer de nouveaux éléments
- 🗑️ Supprimer des éléments
- **Tout change en temps réel sur les pages publiques!**

---

💡 **Besoin d'aide?** Consultez [DATA_IMPORT_GUIDE.md](DATA_IMPORT_GUIDE.md) pour plus de détails.
