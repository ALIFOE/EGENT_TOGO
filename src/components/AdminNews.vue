<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">📰 Gestion des Articles</h1>
        <p class="text-gray-600">Créez, modifiez et supprimez les articles du blog</p>
      </div>

      <!-- Boutons d'action -->
      <div class="mb-6 flex gap-4">
        <button
          @click="openAddModal"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <i class="fas fa-plus"></i> Ajouter un Article
        </button>
        <button
          @click="refreshArticles"
          class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
        >
          <i class="fas fa-sync"></i> Actualiser
        </button>
      </div>

      <!-- Articles Table -->
      <div v-if="articles && articles.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- En-têtes -->
            <thead class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th class="px-4 py-4 text-left font-semibold">Image</th>
                <th class="px-4 py-4 text-left font-semibold">Titre</th>
                <th class="px-4 py-4 text-left font-semibold">Catégorie</th>
                <th class="px-4 py-4 text-left font-semibold">Date</th>
                <th class="px-4 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <!-- Articles -->
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="article in articles"
                :key="article.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <!-- Image -->
                <td class="px-4 py-4">
                  <img 
                    v-if="article.image"
                    :src="article.image"
                    :alt="article.title"
                    class="h-16 w-20 object-cover rounded"
                    @error="(e) => e.target.src = 'https://via.placeholder.com/80x60?text=No+Image'"
                  />
                  <div v-else class="h-16 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                    <i class="fas fa-image text-xl"></i>
                  </div>
                </td>

                <!-- Titre -->
                <td class="px-4 py-4">
                  <div>
                    <p class="font-semibold text-gray-800 line-clamp-2">{{ article.title }}</p>
                    <p class="text-xs text-gray-500 mt-1">Slug: {{ article.slug }}</p>
                  </div>
                </td>

                <!-- Catégorie -->
                <td class="px-4 py-4">
                  <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {{ article.category }}
                  </span>
                </td>

                <!-- Date -->
                <td class="px-4 py-4 text-gray-600">
                  <span class="text-sm">{{ article.date }}</span>
                </td>

                <!-- Actions -->
                <td class="px-4 py-4">
                  <div class="flex justify-center gap-3">
                    <!-- Voir -->
                    <button
                      @click="viewArticle(article)"
                      class="text-green-600 hover:text-green-700 font-semibold py-1 px-3 rounded hover:bg-green-50 transition-colors"
                      title="Voir l'article"
                    >
                      <i class="fas fa-eye"></i> Voir
                    </button>

                    <!-- Éditer -->
                    <button
                      @click="openEditModal(article)"
                      class="text-blue-600 hover:text-blue-700 font-semibold py-1 px-3 rounded hover:bg-blue-50 transition-colors"
                      title="Éditer l'article"
                    >
                      <i class="fas fa-edit"></i> Éditer
                    </button>

                    <!-- Supprimer -->
                    <button
                      @click="deleteArticleConfirm(article)"
                      class="text-red-600 hover:text-red-700 font-semibold py-1 px-3 rounded hover:bg-red-50 transition-colors"
                      title="Supprimer l'article"
                    >
                      <i class="fas fa-trash"></i> Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Compteur -->
        <div class="bg-gray-50 px-6 py-4 text-sm text-gray-600 border-t">
          <p>Total: <strong>{{ articles.length }}</strong> article{{ articles.length !== 1 ? 's' : '' }}</p>
        </div>
      </div>

      <!-- État vide -->
      <div v-else class="bg-white rounded-lg shadow-md p-12 text-center">
        <i class="fas fa-inbox text-6xl text-gray-400 mb-4 block"></i>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">Aucun article trouvé</h3>
        <p class="text-gray-500 mb-6">Commencez par ajouter votre premier article au blog</p>
        <button
          @click="openAddModal"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
        >
          + Créer le premier article
        </button>
      </div>
    </div>

    <!-- Modal Formulaire -->
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
import { useRouter } from 'vue-router'
import { useFirebaseData } from '../composables/useFirebaseData'
import ArticleFormModal from './ArticleFormModal.vue'

const router = useRouter()
const { articles, initializeArticles, updateNews, deleteNews, addNews } = useFirebaseData()

const showFormModal = ref(false)
const editingArticle = ref(null)

// Charger les articles au montage
onMounted(async () => {
  await initializeArticles()
})

// Actualiser les articles
const refreshArticles = async () => {
  await initializeArticles()
  alert('✅ Articles actualisés!')
}

// Ouvrir le modal pour ajouter
const openAddModal = () => {
  editingArticle.value = null
  showFormModal.value = true
}

// Ouvrir le modal pour éditer
const openEditModal = (article) => {
  editingArticle.value = { ...article }
  showFormModal.value = true
}

// Fermer le modal
const closeFormModal = () => {
  showFormModal.value = false
  editingArticle.value = null
  // Actualiser la liste
  initializeArticles()
}

// Sauvegarder l'article (créer ou mettre à jour)
const saveArticle = async (articleData) => {
  try {
    if (editingArticle.value?.id) {
      // Mise à jour
      await updateNews(editingArticle.value.id, articleData)
      alert('✅ Article mis à jour avec succès!')
    } else {
      // Création (déjà appelée dans le modal, mais au cas où)
      await addNews(articleData)
      alert('✅ Article créé avec succès!')
    }
    closeFormModal()
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}

// Afficher l'article dans la page de détail
const viewArticle = async (article) => {
  await router.push(`/article/${article.slug}`)
}

// Supprimer un article avec confirmation
const deleteArticleConfirm = async (article) => {
  const confirmed = confirm(
    `⚠️ Êtes-vous sûr de vouloir supprimer "${article.title}"?\n\nCette action est irréversible.`
  )

  if (!confirmed) return

  try {
    await deleteNews(article.id)
    alert('✅ Article supprimé!')
    await initializeArticles()
  } catch (error) {
    alert('❌ Erreur lors de la suppression: ' + error.message)
  }
}
</script>

<style scoped>
/* Classe utilitaire pour limiter le texte sur 2 lignes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation au survol */
table tbody tr {
  transition: all 0.2s ease-in-out;
}

table tbody tr:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
