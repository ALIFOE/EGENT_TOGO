<template>
  <div>
    <!-- Admin Edit/Delete Buttons -->
    <div v-if="isAdmin" class="fixed top-24 right-8 z-40 flex gap-3">
      <button
        @click="openEditModal"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 font-semibold"
      >
        <i class="fas fa-edit"></i> Éditer
      </button>
      <button
        @click="deleteArticleConfirm"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 font-semibold"
      >
        <i class="fas fa-trash"></i> Supprimer
      </button>
    </div>

    <!-- Hero Section -->
    <section class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8">
          <i class="fas fa-arrow-left"></i>
          Retour aux actualités
        </button>

        <!-- Article Hero -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Image -->
          <div v-if="article" class="rounded-3xl overflow-hidden h-96 bg-gray-100">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Info -->
          <div v-if="article" class="flex flex-col justify-between">
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3">
                {{ article.category }}
              </p>
              <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6">
                {{ article.title }}
              </h1>
              
              <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                <p class="text-gray-600 text-sm mb-2">Publié le</p>
                <p class="text-2xl font-black text-[#0392C7]">{{ article.date }}</p>
              </div>

              <p class="text-gray-700 text-lg leading-relaxed mb-8">
                {{ article.excerpt }}
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <router-link to="/contact" class="bg-[#FF9D35] hover:bg-[#FF8214] text-white px-8 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-envelope"></i>
                  Nous contacter
                </router-link>
                <router-link to="/actualites" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-newspaper"></i>
                  Autres actualités
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Left: Content -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-3xl p-8 shadow-lg">
              <!-- Article Content -->
              <div v-if="article" class="prose prose-lg max-w-none">
                <div 
                  v-if="article.content"
                  class="text-gray-700 space-y-6 leading-relaxed"
                  v-html="article.content"
                ></div>
                <div v-else class="text-gray-500 italic">
                  Contenu de l'article non disponible
                </div>
              </div>
            </div>

            <!-- Related Articles -->
            <div v-if="relatedArticles.length > 0" class="mt-16">
              <h2 class="text-3xl font-black text-[#016E98] mb-8">Articles liés</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <router-link
                  v-for="relatedArticle in relatedArticles"
                  :key="relatedArticle.id"
                  :to="`/article/${relatedArticle.slug}`"
                  class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div class="h-48 overflow-hidden bg-gray-100">
                    <img 
                      :src="relatedArticle.image"
                      :alt="relatedArticle.title"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div class="p-6">
                    <p class="text-[#FF9D35] font-semibold text-xs uppercase tracking-widest mb-2">
                      {{ relatedArticle.category }}
                    </p>
                    <h3 class="text-xl font-bold text-[#016E98] mb-3 group-hover:text-[#FF9D35] transition-colors line-clamp-2">
                      {{ relatedArticle.title }}
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-2">
                      {{ relatedArticle.excerpt }}
                    </p>
                    <p class="text-gray-500 text-xs mt-4">
                      {{ relatedArticle.date }}
                    </p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Right: Info -->
          <div>
            <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20">
              <h3 class="text-2xl font-black text-[#016E98] mb-8">Informations</h3>
              <div v-if="article" class="space-y-6">
                <!-- Category -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-2">Catégorie</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.category }}</p>
                </div>

                <!-- Date -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-2">Date</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.date }}</p>
                </div>

                <!-- Share -->
                <div class="border-b border-gray-200 pb-4">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase mb-3">Partager</p>
                  <div class="flex gap-3 flex-wrap">
                    <button @click="shareOnFacebook" title="Facebook" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-facebook-f"></i>
                    </button>
                    <button @click="shareOnTwitter" title="Twitter" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button @click="shareOnLinkedIn" title="LinkedIn" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-linkedin-in"></i>
                    </button>
                    <button @click="copyToClipboard" title="Copier le lien" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fas fa-link"></i>
                    </button>
                  </div>
                </div>

                <!-- Info Box -->
                <div class="bg-blue-50 rounded-2xl p-6">
                  <div class="flex items-start gap-4">
                    <i class="fas fa-lightbulb text-[#0392C7] text-2xl mt-1"></i>
                    <div>
                      <p class="font-bold text-[#016E98] mb-2">À savoir</p>
                      <p class="text-sm text-gray-700">
                        Restez informé des dernières actualités de EGENT-TOGO.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Edit Article -->
    <ArticleFormModal
      v-if="showEditModal"
      :article="editingArticle"
      @save="saveArticle"
      @close="closeEditModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'
import ArticleFormModal from '../components/ArticleFormModal.vue'

const { setMeta } = useSEOMeta()
const { deleteNews, updateNews } = useFirebaseData()
const router = useRouter()
const route = useRoute()

const article = ref(null)
const articles = ref([])
const relatedArticles = ref([])
const loading = ref(true)
const isAdmin = ref(false)
const showEditModal = ref(false)
const editingArticle = ref(null)

const loadArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'))
    articles.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement articles:', error)
  }
}

const findRelatedArticles = () => {
  if (!article.value) return
  
  relatedArticles.value = articles.value
    .filter(a => 
      a.id !== article.value.id && 
      a.category === article.value.category
    )
    .slice(0, 2)
}

onMounted(async () => {
  // Vérifier si l'utilisateur est admin
  auth.onAuthStateChanged((user) => {
    isAdmin.value = !!user
  })

  await loadArticles()
  
  const articleSlug = route.params.slug
  const foundArticle = articles.value.find(a => a.slug === articleSlug)
  
  if (foundArticle) {
    article.value = { ...foundArticle }
    findRelatedArticles()
    
    // Utiliser la signature correcte de setMeta : (title, description, image, pathname, options)
    setMeta(
      `${article.value.title} - EGENT-TOGO`,
      article.value.excerpt,
      article.value.image,
      `/article/${articleSlug}`,
      {
        type: 'article',
        siteName: 'EGENT-TOGO'
      }
    )
  } else {
    router.push('/actualites')
    return
  }
  
  loading.value = false
})

const goBack = () => {
  router.push('/actualites')
}

// Admin Functions
const openEditModal = () => {
  editingArticle.value = { ...article.value }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingArticle.value = null
}

const saveArticle = async (articleData) => {
  try {
    await updateNews(article.value.id, articleData)
    article.value = { ...article.value, ...articleData }
    closeEditModal()
    alert('✅ Article mis à jour avec succès!')
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}

const deleteArticleConfirm = async () => {
  if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer "${article.value.title}"?\n\nCette action est irréversible.`)) {
    return
  }

  try {
    await deleteNews(article.value.id)
    alert('✅ Article supprimé!')
    router.push('/actualites')
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}

const shareOnFacebook = () => {
  const url = window.location.href
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
}

const shareOnTwitter = () => {
  const url = window.location.href
  const text = article.value?.title || 'Article intéressant'
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
}

const shareOnLinkedIn = () => {
  const url = window.location.href
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    alert('Lien copié dans le presse-papiers!')
  } catch (error) {
    console.error('Erreur copie:', error)
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose-lg :deep(ul) {
  list-style: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose-lg :deep(li) {
  margin-bottom: 0.5rem;
}

.prose-lg :deep(h3) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #016E98;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
