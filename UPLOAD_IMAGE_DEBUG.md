# 🔧 Guide de Debug - Upload d'Images bloqué

## Problème
L'upload d'image tourne indéfiniment (infinite loading) lors de l'édition d'articles.

## Causes Possibles et Solutions

### 1️⃣ **Règles Firebase Storage Restrictives** ⚠️ CAUSE PRINCIPALE
Les règles par défaut de Firebase Storage refusent les uploads.

**Solution:**
```bash
# Déployer les règles de storage
firebase deploy --only storage:rules --project egenttogo-edc4e
```

Ou exécuter: `deploy-storage-rules.bat`

### 2️⃣ **Timeout Réseau**
L'upload prend trop longtemps (> 60 secondes).

**Solution:**
- Vérifiez votre connexion internet
- Essayez avec une image plus petite (< 2MB)
- Attendez et réessayez

### 3️⃣ **Authentification Firebase Manquante**
L'utilisateur n'est pas authentifié.

**Vérifier:**
- Être connecté en tant qu'administrateur
- Vérifier la console: `console.log(currentUser)` affiche un utilisateur

### 4️⃣ **Erreur Silencieuse dans la Console**
Vérifier les erreurs détaillées dans les DevTools.

**Méthode:**
1. Ouvrir DevTools (F12)
2. Aller à l'onglet **Console**
3. Chercher les messages ❌ rouges
4. Copier le message d'erreur complet

### 5️⃣ **Firestore Permissions Bloquées**
Même si Storage fonctionne, Firestore peut être bloqué.

**Solution:**
Utiliser le script `FIREBASE_PERMISSIONS_FIX.md` pour réinitialiser les règles.

---

## Vérifications Rapides

### ✅ Test 1: Vérifier l'authentification
```javascript
// Dans la console
import { getAuth } from 'firebase/auth'
const auth = getAuth()
console.log('User:', auth.currentUser)
```

### ✅ Test 2: Vérifier Firebase Storage
```javascript
// Dans la console
import { getStorage, ref, listAll } from 'firebase/storage'
const storage = getStorage()
const articlesRef = ref(storage, 'articles/')
listAll(articlesRef).then(res => console.log('Files:', res.items))
```

### ✅ Test 3: Vérifier les logs de l'upload
1. Sélectionner une image
2. Ouvrir DevTools (F12)
3. Chercher les messages avec `📤` `✅` `❌`
4. Reporter le message d'erreur exact

---

## Actions à Prendre MAINTENANT

### 1. Déployer les règles Storage
```bash
cd "C:\Users\conce\Desktop\PROJET_EGENTTOGO\EGENT_TOGO"
firebase deploy --only storage:rules --project egenttogo-edc4e
```

### 2. Attendre la confirmation
```
✅ Deploy complete!

Project Console: https://console.firebase.google.com/project/egenttogo-edc4e
```

### 3. Rafraîchir la page et tester
- Recharger le navigateur (Ctrl+R)
- Essayer d'ajouter une image

### 4. Si ça ne marche pas
- Vérifier les logs console
- Reporter l'erreur exacte

---

## Fichiers Modifiés
- `storage.rules` - Nouvelles règles de sécurité
- `deploy-storage-rules.bat` - Script de déploiement
- `src/composables/useImageUpload.js` - Amélioration des logs + timeout
- `src/components/ArticleFormModal.vue` - Amélioration UI + timeout

---

## Support Firebase
Si l'erreur persiste:
1. Consulter [Firebase Storage Security Rules](https://firebase.google.com/docs/storage/security)
2. Vérifier que le projet Firebase est bien configuré
3. Réinitialiser les règles via Console Firebase (settings > Storage > Rules)
