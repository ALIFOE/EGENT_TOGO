# 📋 PROCHAINE PHASE: Administration des Articles

## 🎯 Objectif
Créer un panel d'administration pour gérer les articles (CRUD) avec:
- Ajouter nouvel article
- Éditer article existant
- Supprimer article
- Visualiser la liste des articles

## 📁 Architecture Proposée

### Fichiers à Créer/Modifier

```
src/pages/
├── AdminNews.vue ✨ À CRÉER
│   ├── Liste des articles existants
│   ├── Modal/Form d'ajout d'article
│   ├── Modal/Form d'édition d'article
│   └── Boutons de suppression
│
└── (Existants - inchangés)
    ├── ArticleDetail.vue ✅
    └── News.vue ✅

src/components/
├── ArticleForm.vue ✨ À CRÉER (optionnel)
│   ├── Input: Titre
│   ├── Input: Slug (auto ou manuel)
│   ├── Select: Catégorie
│   ├── File Input: Image
│   ├── Textarea: Excerpt
│   └── RichText Editor: Contenu HTML
```

## 📊 Structure Firebase

```javascript
// Collection: articles
articles/
├── doc1 {
│   id: "auto-generated",
│   slug: "inauguration-nouveau-centre",
│   title: "Inauguration du nouveau centre de formation",
│   shortTitle: "Inauguration du nouveau centre",
│   category: "Actualité",
│   date: "5 Jan 2026",
│   image: "https://storage.firebase.com/...",
│   excerpt: "Découvrez le lancement officiel...",
│   content: "<h2>Contenu HTML</h2><p>...</p>",
│   seoDescription: "...",
│   keywords: "...",
│   author: "EGENT-TOGO",
│   readingTime: 4,
│   createdAt: Timestamp(Jan 5, 2026),
│   updatedAt: Timestamp(...)
│ }
├── doc2 { ... }
└── doc3 { ... }
```

## 🔧 Composables à Créer/Modifier

### useFirebaseData.js (Déjà Existe)

Ajouter/Améliorer:
```javascript
// Articles CRUD
export function useFirebaseData() {
  // Ajouter
  const addArticle = async (articleData) => {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...articleData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  }

  // Éditer
  const updateArticle = async (articleId, articleData) => {
    await updateDoc(doc(db, 'articles', articleId), {
      ...articleData,
      updatedAt: serverTimestamp()
    })
  }

  // Supprimer
  const deleteArticle = async (articleId) => {
    await deleteDoc(doc(db, 'articles', articleId))
  }

  // Récupérer un article par ID
  const getArticleById = async (articleId) => {
    const docSnap = await getDoc(doc(db, 'articles', articleId))
    return docSnap.data()
  }

  return {
    addArticle,
    updateArticle,
    deleteArticle,
    getArticleById,
    // Autres functions existantes
  }
}
```

## 🎨 UI/UX - AdminNews.vue

### Layout Principal
```
┌────────────────────────────────────────┐
│  📰 ADMINISTRATION DES ARTICLES        │
├────────────────────────────────────────┤
│                                        │
│  [➕ Ajouter un Article]              │
│                                        │
├────────────────────────────────────────┤
│  LISTE DES ARTICLES                   │
├─────────┬──────────────┬────┬─────┬──┤
│ Image   │ Titre        │Cat.│Date │✎ │
├─────────┼──────────────┼────┼─────┼──┤
│ [IMG]   │ Inaugur...   │Act.│5Jan │✎ │
│ [IMG]   │ Partena...   │Par.│2Jan │✎ │
│ [IMG]   │ Nouv. Pr...  │New │1Jan │✎ │
└─────────┴──────────────┴────┴─────┴──┘

Clics:
- ✎ (Crayon) → Éditer article
- [X] (Croix) → Supprimer article
```

### Modal d'Ajout/Édition
```
┌──────────────────────────────────────┐
│  ✎ AJOUTER / ÉDITER ARTICLE          │
├──────────────────────────────────────┤
│                                      │
│  Titre                               │
│  [________________]                  │
│                                      │
│  Slug (auto-généré)                  │
│  [________________]                  │
│                                      │
│  Catégorie                           │
│  [Dropdown: Actualité, Partenariat] │
│                                      │
│  Image d'article                     │
│  [📁 Glisser/déposer ou cliquer]    │
│  [Aperçu Image]                     │
│                                      │
│  Excerpt (résumé court)              │
│  [________________]                  │
│  [Caractères: 0/200]                │
│                                      │
│  Contenu de l'article (HTML)        │
│  [═══ Éditeur Riche ═══]            │
│  [B][I][U][Link][H1]...             │
│  [________________]                  │
│                                      │
│  ⏳ Saving...    [Annuler] [Sauver] │
│                                      │
└──────────────────────────────────────┘
```

## 🎯 Fonctionnalités à Implémenter

### 1. **Génération Automatique du Slug**
```javascript
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
}
```

### 2. **Upload Image Firebase Storage**
```javascript
async function uploadArticleImage(file) {
  const storageRef = ref(storage, `articles/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
```

### 3. **Validation Formulaire**
```javascript
const errors = ref({})

function validateArticle(data) {
  const newErrors = {}
  if (!data.title) newErrors.title = 'Titre requis'
  if (!data.excerpt) newErrors.excerpt = 'Excerpt requis'
  if (!data.content) newErrors.content = 'Contenu requis'
  if (!data.image) newErrors.image = 'Image requise'
  if (data.excerpt.length > 200) newErrors.excerpt = 'Max 200 caractères'
  return newErrors
}
```

### 4. **Éditeur HTML Riche**
Options pour le contenu HTML:
- **Léger**: Textarea simple + balises manuelles
- **Moyen**: SimpleQuill (500KB)
- **Complet**: TipTap (1MB+)

**Recommandé**: SimpleQuill ou TipTap Lite

```vue
<template>
  <!-- Option 1: SimpleQuill -->
  <QuillEditor 
    v-model:content="form.content"
    :modules="editorModules"
    theme="snow"
  />

  <!-- Option 2: TipTap -->
  <EditorContent :editor="editor" />
</template>
```

## 📝 Code Template - AdminNews.vue

```vue
<template>
  <div class="admin-news">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-black text-blue-800">📰 Administration des Articles</h1>
        <button @click="openAddModal" class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2">
          <i class="fas fa-plus"></i> Ajouter un Article
        </button>
      </div>

      <!-- Articles List -->
      <div v-if="articles.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-blue-50">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Image</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Date</th>
              <th class="px-6 py-4 text-center text-sm font-bold text-blue-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in articles" :key="article.id" class="border-t hover:bg-blue-50">
              <td class="px-6 py-4">
                <img :src="article.image" :alt="article.title" class="w-12 h-12 rounded object-cover">
              </td>
              <td class="px-6 py-4 font-semibold text-gray-800">{{ article.title }}</td>
              <td class="px-6 py-4 text-gray-600">{{ article.category }}</td>
              <td class="px-6 py-4 text-gray-600">{{ article.date }}</td>
              <td class="px-6 py-4 text-center space-x-3">
                <button @click="openEditModal(article)" class="text-blue-600 hover:text-orange-500">
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button @click="deleteArticle(article.id)" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash"></i> Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <p class="text-gray-500 mb-4">Aucun article pour le moment</p>
        <button @click="openAddModal" class="bg-orange-500 text-white px-6 py-3 rounded-lg">
          Ajouter le premier article
        </button>
      </div>
    </div>

    <!-- Article Form Modal -->
    <ArticleFormModal 
      v-if="showFormModal"
      :article="editingArticle"
      @save="saveArticle"
      @close="closeFormModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'
import ArticleFormModal from '../components/ArticleFormModal.vue'

const { articles, initializeArticles, addArticle, updateArticle, deleteArticle } = useFirebaseData()
const showFormModal = ref(false)
const editingArticle = ref(null)

onMounted(() => {
  initializeArticles()
})

const openAddModal = () => {
  editingArticle.value = null
  showFormModal.value = true
}

const openEditModal = (article) => {
  editingArticle.value = { ...article }
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  editingArticle.value = null
}

const saveArticle = async (articleData) => {
  if (editingArticle.value?.id) {
    await updateArticle(editingArticle.value.id, articleData)
  } else {
    await addArticle(articleData)
  }
  closeFormModal()
}

const deleteArticleHandler = async (articleId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
    await deleteArticle(articleId)
  }
}
</script>
```

## 🔐 Sécurité Firebase

### Règles Firestore (IMPORTANT!)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Articles - Publique en lecture, Admin en écriture
    match /articles/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
                                       request.auth.token.admin == true;
    }
  }
}
```

## 📅 Plan d'Implémentation

### Phase 1: Backend (Firebase)
- [x] Collection articles existe déjà
- [x] Structure des données validée
- [ ] Ajouter règles Firestore pour sécurité
- [ ] Ajouter timestamps (createdAt, updatedAt)

### Phase 2: Composables
- [ ] Compléter useFirebaseData.js avec CRUD articles
- [ ] Ajouter uploadArticleImage()
- [ ] Ajouter generateSlug()

### Phase 3: UI Components
- [ ] Créer AdminNews.vue
- [ ] Créer ArticleFormModal.vue
- [ ] Créer ArticleForm.vue (optionnel)

### Phase 4: Fonctionnalités
- [ ] Ajouter article
- [ ] Éditer article
- [ ] Supprimer article
- [ ] Upload image
- [ ] Validation formulaire
- [ ] Messages feedback (✅, ❌, ⏳)

### Phase 5: Testing
- [ ] Tester tous les CRUD
- [ ] Tester upload images
- [ ] Tester validation
- [ ] Tester sécurité Firebase

## 🎯 Dépendances Possibles

```json
{
  "devDependencies": {
    "quill": "^1.3.7",           // Éditeur HTML léger
    "quill-blot": "^2.0.0",
    "vue3-quill": "^1.0.0"       // Wrapper Vue 3
  }
}
```

Ou utiliser TipTap si plus puissant nécessaire.

## ✅ Checklist Avant de Commencer

- [x] ArticleDetail.vue ✅ TERMINÉ
- [x] News.vue ✅ TERMINÉ
- [x] Meta Tags Open Graph ✅ TERMINÉ
- [x] Social Sharing ✅ TERMINÉ
- [ ] AdminNews.vue 👈 PROCHAINE ÉTAPE
- [ ] Règles Firestore
- [ ] Upload images Firebase Storage

---

**Status**: 📋 Planifié
**Priority**: 🔴 Haute (pour pouvoir ajouter/éditer articles)
**Effort Estimé**: 2-3 heures

