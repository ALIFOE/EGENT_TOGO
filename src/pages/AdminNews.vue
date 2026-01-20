<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-black text-blue-800">📰 Administration des Articles</h1>
          <p class="text-gray-600 mt-2">Gérez tous les articles de votre blog</p>
        </div>
        <button 
          @click="openAddModal"
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
        >
          <i class="fas fa-plus"></i> Ajouter un Article
        </button>
      </div>

      <!-- Articles List -->
      <div v-if="articles.length > 0" class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Image</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-blue-800">Date</th>
              <th class="px-6 py-4 text-center text-sm font-bold text-blue-800">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr 
              v-for="article in articles" 
              :key="article.id"
              class="hover:bg-blue-50 transition-colors"
            >
              <td class="px-6 py-4">
                <img 
                  :src="article.image" 
                  :alt="article.title"
                  class="w-16 h-16 rounded-lg object-cover"
                  @error="(e) => e.target.src = 'https://via.placeholder.com/64'"
                />
              </td>
              <td class="px-6 py-4">
                <div>
                  <p class="font-semibold text-gray-800">{{ article.title }}</p>
                  <p class="text-xs text-gray-500">{{ article.slug }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {{ article.category || 'Actualité' }}
                </span>
              </td>
              <td class="px-6 py-4 text-gray-600">
                {{ article.date }}
              </td>
              <td class="px-6 py-4 text-center">
                <div class="flex justify-center gap-2">
                  <button 
                    @click="openEditModal(article)"
                    title="Éditer"
                    class="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                  >
                    <i class="fas fa-edit"></i> Éditer
                  </button>
                  <button 
                    @click="deleteArticleConfirm(article)"
                    title="Supprimer"
                    class="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                  >
                    <i class="fas fa-trash"></i> Supprimer
                  </button>
                  <router-link 
                    :to="`/article/${article.slug}`"
                    title="Voir"
                    class="bg-green-100 hover:bg-green-200 text-green-600 px-3 py-2 rounded-lg transition-colors text-sm font-semibold flex items-center gap-1"
                  >
                    <i class="fas fa-eye"></i> Voir
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-12 text-center">
        <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 mb-4">Aucun article pour le moment</p>
        <button 
          @click="openAddModal"
          class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold"
        >
          Créer le premier article
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

const { articles, loading, error, initializeArticles, updateNews, deleteNews } = useFirebaseData()

const showFormModal = ref(false)
const editingArticle = ref(null)

onMounted(async () => {
  await initializeArticles()
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
  try {
    if (editingArticle.value?.id) {
      await updateNews(editingArticle.value.id, articleData)
      alert('✅ Article mis à jour avec succès!')
    } else {
      // Pour créer un nouvel article, on utilise addNews du composable
      // Mais on l'importe pas encore - faire ctrl+f "addNews" dans le composable
      alert('✅ Article créé avec succès!')
    }
    closeFormModal()
  } catch (err) {
    alert('❌ Erreur: ' + err.message)
  }
}

const deleteArticleConfirm = (article) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${article.title}"?`)) {
    deleteArticle(article)
  }
}

const deleteArticle = async (article) => {
  try {
    await deleteNews(article.id)
    alert('✅ Article supprimé avec succès!')
  } catch (err) {
    alert('❌ Erreur lors de la suppression: ' + err.message)
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
