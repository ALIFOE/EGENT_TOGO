<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">📥 Import d'Articles</h1>
        <p class="text-gray-600">Importez tous les articles depuis https://alifoe.github.io/EGENT_TOGO/actualites</p>
      </div>

      <!-- Étapes du processus -->
      <div class="mb-8 flex justify-between items-center">
        <div 
          v-for="(step, idx) in steps"
          :key="idx"
          class="flex flex-col items-center flex-1"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 transition-all"
            :class="{
              'bg-blue-600': currentStep > idx,
              'bg-blue-500 scale-110': currentStep === idx,
              'bg-gray-300': currentStep < idx
            }"
          >
            {{ currentStep > idx ? '✓' : idx + 1 }}
          </div>
          <p class="text-sm font-semibold text-center text-gray-700">{{ step }}</p>
        </div>
      </div>

      <!-- Contenu -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Étape 1: Récupération -->
        <div v-if="currentStep === 0">
          <h2 class="text-2xl font-bold mb-4">🔍 Étape 1: Récupération des articles</h2>
          
          <div v-if="!articlesLoaded" class="space-y-4">
            <p class="text-gray-600">Cliquez sur le bouton pour récupérer tous les articles de la page actualités.</p>
            
            <button
              @click="fetchArticles"
              :disabled="loading"
              class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <span v-if="loading">⏳ Récupération en cours...</span>
              <span v-else>
                <i class="fas fa-download"></i> Récupérer les articles
              </span>
            </button>

            <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p class="font-bold">❌ Erreur</p>
              <p>{{ error }}</p>
            </div>
          </div>

          <!-- Résultat -->
          <div v-else class="space-y-4">
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              <p class="font-bold">✅ {{ articles.length }} articles récupérés!</p>
            </div>

            <!-- Aperçu articles -->
            <div class="space-y-3 max-h-96 overflow-y-auto">
              <div 
                v-for="(article, idx) in articles.slice(0, 5)"
                :key="idx"
                class="border border-gray-200 rounded p-4 hover:bg-gray-50"
              >
                <div class="flex gap-4">
                  <img 
                    v-if="article.image"
                    :src="article.image"
                    :alt="article.title"
                    class="w-20 h-20 object-cover rounded"
                    @error="(e) => e.target.src = 'https://via.placeholder.com/80'"
                  />
                  <div class="flex-1">
                    <p class="font-bold text-gray-800">{{ article.title }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ article.excerpt.substring(0, 100) }}...</p>
                    <div class="flex gap-2 mt-2 text-xs">
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ article.category }}</span>
                      <span class="text-gray-500">{{ article.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="articles.length > 5" class="text-center text-gray-500 text-sm py-2">
                ... et {{ articles.length - 5 }} autres articles
              </div>
            </div>

            <button
              @click="nextStep"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Continuer vers l'import →
            </button>
          </div>
        </div>

        <!-- Étape 2: Vérification -->
        <div v-else-if="currentStep === 1">
          <h2 class="text-2xl font-bold mb-4">✓ Étape 2: Vérification des données</h2>
          
          <div class="space-y-4">
            <div class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              <p class="font-bold">{{ articles.length }} articles prêts à être importés</p>
              <p class="text-sm mt-1">Tous les articles seront sauvegardés dans la collection Firebase "articles"</p>
            </div>

            <!-- Tableau de vérification -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-4 py-2 text-left">Titre</th>
                    <th class="px-4 py-2 text-left">Catégorie</th>
                    <th class="px-4 py-2 text-left">Date</th>
                    <th class="px-4 py-2 text-center">Image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(article, idx) in articles.slice(0, 10)" :key="idx" class="border-b hover:bg-gray-50">
                    <td class="px-4 py-2 truncate">{{ article.title }}</td>
                    <td class="px-4 py-2">
                      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {{ article.category }}
                      </span>
                    </td>
                    <td class="px-4 py-2 text-xs text-gray-600">{{ article.date }}</td>
                    <td class="px-4 py-2 text-center">
                      <span v-if="article.image" class="text-green-600">✓</span>
                      <span v-else class="text-red-600">✗</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p v-if="articles.length > 10" class="text-center text-gray-500 text-sm py-2">
                ... et {{ articles.length - 10 }} autres articles
              </p>
            </div>

            <div class="flex gap-3">
              <button
                @click="currentStep = 0"
                class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                ← Retour
              </button>
              <button
                @click="nextStep"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Importer dans Firebase →
              </button>
            </div>
          </div>
        </div>

        <!-- Étape 3: Import -->
        <div v-else-if="currentStep === 2">
          <h2 class="text-2xl font-bold mb-4">📤 Étape 3: Import en cours...</h2>
          
          <div class="space-y-4">
            <!-- Progression globale -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <p class="font-semibold">Progression globale</p>
                <p class="text-sm text-gray-600">{{ imported }}/{{ articles.length }}</p>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  class="bg-green-500 h-full transition-all duration-300"
                  :style="{ width: (imported / articles.length * 100) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Articles en cours -->
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div 
                v-for="(article, idx) in articles"
                :key="idx"
                class="flex items-center gap-3 p-3 rounded border transition-all"
                :class="{
                  'border-green-400 bg-green-50': importStatus[idx] === 'success',
                  'border-red-400 bg-red-50': importStatus[idx] === 'error',
                  'border-yellow-400 bg-yellow-50': importStatus[idx] === 'pending',
                  'border-gray-200': !importStatus[idx]
                }"
              >
                <div class="flex-shrink-0">
                  <span v-if="importStatus[idx] === 'success'" class="text-green-600 font-bold">✓</span>
                  <span v-else-if="importStatus[idx] === 'error'" class="text-red-600 font-bold">✗</span>
                  <span v-else-if="importStatus[idx] === 'pending'" class="text-yellow-600 font-bold">⏳</span>
                  <span v-else class="text-gray-400">•</span>
                </div>
                <div class="flex-1 truncate">
                  <p class="text-sm font-semibold text-gray-800 truncate">{{ article.title }}</p>
                </div>
                <p v-if="importStatus[idx] === 'error'" class="text-xs text-red-600">
                  Erreur
                </p>
              </div>
            </div>

            <!-- Message en cours -->
            <div v-if="importing" class="text-center py-4">
              <p class="text-gray-600 font-semibold">⏳ Importation en cours... Ne fermez pas cette page!</p>
            </div>
          </div>
        </div>

        <!-- Étape 4: Résultat -->
        <div v-else-if="currentStep === 3">
          <h2 class="text-2xl font-bold mb-4">✨ Étape 4: Résultat</h2>
          
          <div class="space-y-6">
            <!-- Statistiques -->
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-green-100 rounded-lg p-6 text-center">
                <p class="text-4xl font-bold text-green-600">{{ imported }}</p>
                <p class="text-green-800 font-semibold">Importés</p>
              </div>
              <div class="bg-red-100 rounded-lg p-6 text-center">
                <p class="text-4xl font-bold text-red-600">{{ failed }}</p>
                <p class="text-red-800 font-semibold">Échoués</p>
              </div>
              <div class="bg-blue-100 rounded-lg p-6 text-center">
                <p class="text-4xl font-bold text-blue-600">{{ articles.length }}</p>
                <p class="text-blue-800 font-semibold">Total</p>
              </div>
            </div>

            <!-- Message de succès -->
            <div 
              v-if="failed === 0"
              class="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg"
            >
              <p class="font-bold text-lg">🎉 Import réussi à 100%!</p>
              <p class="mt-2">Tous les articles ont été sauvegardés dans la base Firebase avec succès.</p>
            </div>

            <div 
              v-else
              class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg"
            >
              <p class="font-bold text-lg">⚠️ Import partiellement réussi</p>
              <p class="mt-2">{{ imported }} article(s) importé(s), {{ failed }} erreur(s) détectée(s).</p>
            </div>

            <!-- Articles échoués -->
            <div v-if="failed > 0" class="space-y-3">
              <p class="font-bold text-gray-800">Articles avec erreur:</p>
              <div 
                v-for="(article, idx) in articles"
                :key="idx"
                v-if="importStatus[idx] === 'error'"
                class="border border-red-300 bg-red-50 rounded p-3"
              >
                <p class="font-semibold text-red-800">{{ article.title }}</p>
                <p class="text-sm text-red-600 mt-1">{{ importErrors[idx] }}</p>
              </div>
            </div>

            <!-- Boutons finaux -->
            <div class="flex gap-3">
              <button
                @click="goToAdmin"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                📰 Aller au panneau admin
              </button>
              <button
                @click="resetImport"
                class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Recommencer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-gray-600 text-sm">
        <p>© EGENT-TOGO - Import automatique d'articles</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFirebaseData } from '../composables/useFirebaseData'

const router = useRouter()
const { addNews } = useFirebaseData()

const steps = ['Récupération', 'Vérification', 'Import', 'Résultat']
const currentStep = ref(0)

const articles = ref([])
const loading = ref(false)
const error = ref(null)
const articlesLoaded = ref(false)
const importing = ref(false)
const imported = ref(0)
const failed = ref(0)
const importStatus = ref({})
const importErrors = ref({})

// Récupérer les articles de la page
const fetchArticles = async () => {
  loading.value = true
  error.value = null

  try {
    // Récupérer la page actualités
    const response = await fetch('https://alifoe.github.io/EGENT_TOGO/actualites')
    if (!response.ok) throw new Error('Erreur réseau')
    
    const html = await response.text()
    
    // Parser le HTML avec DOMParser
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    // Chercher tous les articles (adapter les sélecteurs selon la structure réelle)
    const articleElements = doc.querySelectorAll('article, .article, .news-item, [data-article]')
    
    if (articleElements.length === 0) {
      throw new Error('Aucun article trouvé. La structure de la page a peut-être changé.')
    }

    articles.value = []
    
    articleElements.forEach((element, idx) => {
      try {
        // Extraire le titre
        let title = element.querySelector('h2, h3')?.textContent?.trim() || 
                   element.querySelector('a')?.textContent?.trim() || 
                   ''
        
        if (!title) return

        // Extraire l'image
        const imgSrc = element.querySelector('img')?.src || 
                      element.querySelector('img')?.dataset?.src || 
                      ''
        
        // Convertir les URLs relatives en absolues
        let image = imgSrc
        if (imgSrc && !imgSrc.startsWith('http')) {
          image = new URL(imgSrc, 'https://alifoe.github.io/EGENT_TOGO/').href
        }

        // Extraire le résumé
        const excerpt = element.querySelector('p')?.textContent?.trim() || 
                       title

        // Extraire la catégorie
        const categoryElem = element.querySelector('[class*="category"], [class*="badge"], [class*="tag"]')
        const category = categoryElem?.textContent?.trim() || 'Actualité'

        // Extraire la date
        const dateElem = element.querySelector('[class*="date"], [class*="time"], time')
        const date = dateElem?.textContent?.trim() || 
                    dateElem?.dateTime ||
                    new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })

        // Générer le slug
        const slug = title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .slice(0, 50)

        articles.value.push({
          title,
          slug,
          category,
          date,
          image,
          excerpt: excerpt.substring(0, 200),
          content: `<h2>${title}</h2><p>${excerpt}</p>`
        })
      } catch (err) {
        console.warn('Erreur parsing article:', err)
      }
    })

    if (articles.value.length === 0) {
      throw new Error('Aucun article valide trouvé après parsing')
    }

    articlesLoaded.value = true
  } catch (err) {
    error.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Passer à l'étape suivante
const nextStep = () => {
  if (currentStep.value === 2) {
    // Lancer l'import
    importArticles()
  } else {
    currentStep.value++
  }
}

// Importer les articles dans Firebase
const importArticles = async () => {
  importing.value = true
  imported.value = 0
  failed.value = 0
  importStatus.value = {}
  importErrors.value = {}

  for (let idx = 0; idx < articles.value.length; idx++) {
    const article = articles.value[idx]
    importStatus.value[idx] = 'pending'

    try {
      await addNews({
        title: article.title,
        slug: article.slug,
        category: article.category,
        date: article.date,
        image: article.image,
        excerpt: article.excerpt,
        content: article.content,
        author: 'EGENT-TOGO'
      })

      importStatus.value[idx] = 'success'
      imported.value++
    } catch (err) {
      importStatus.value[idx] = 'error'
      importErrors.value[idx] = err.message
      failed.value++
    }

    // Petite pause pour ne pas surcharger Firebase
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  importing.value = false
  currentStep.value = 3
}

// Aller au panneau admin
const goToAdmin = () => {
  router.push('/admin/news')
}

// Réinitialiser le formulaire
const resetImport = () => {
  currentStep.value = 0
  articles.value = []
  articlesLoaded.value = false
  imported.value = 0
  failed.value = 0
  importStatus.value = {}
  importErrors.value = {}
}
</script>

<style scoped>
/* Animations pour la progression */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
