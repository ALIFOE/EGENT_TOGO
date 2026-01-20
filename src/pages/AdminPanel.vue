<template>
  <div class="admin-layout flex h-screen bg-gray-100">
    <!-- Sidebar Navigation -->
    <aside class="admin-sidebar w-64 bg-blue-800 text-white shadow-lg flex flex-col">
      <!-- Logo/Header -->
      <div class="p-6 border-b border-blue-700">
        <h2 class="text-2xl font-black">EGENT ADMIN</h2>
        <p class="text-blue-200 text-sm mt-1">Tableau de bord</p>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <button
          @click="currentSection = 'dashboard'"
          :class="[
            'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
            currentSection === 'dashboard'
              ? 'bg-orange-500 text-white font-bold'
              : 'hover:bg-blue-700 text-blue-100'
          ]"
        >
          <i class="fas fa-chart-bar"></i>
          Tableau de bord
        </button>

        <div class="pt-4 border-t border-blue-700">
          <p class="px-4 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">Gestion</p>
          
          <button
            @click="currentSection = 'products'"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
              currentSection === 'products'
                ? 'bg-orange-500 text-white font-bold'
                : 'hover:bg-blue-700 text-blue-100'
            ]"
          >
            <i class="fas fa-box"></i>
            Produits
            <span class="ml-auto bg-red-500 px-2 py-1 text-xs rounded-full">{{ products.length }}</span>
          </button>

          <button
            @click="currentSection = 'articles'"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
              currentSection === 'articles'
                ? 'bg-orange-500 text-white font-bold'
                : 'hover:bg-blue-700 text-blue-100'
            ]"
          >
            <i class="fas fa-newspaper"></i>
            Articles
            <span class="ml-auto bg-red-500 px-2 py-1 text-xs rounded-full">{{ articles.length }}</span>
          </button>

          <button
            @click="currentSection = 'projects'"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
              currentSection === 'projects'
                ? 'bg-orange-500 text-white font-bold'
                : 'hover:bg-blue-700 text-blue-100'
            ]"
          >
            <i class="fas fa-building"></i>
            Projets
            <span class="ml-auto bg-red-500 px-2 py-1 text-xs rounded-full">{{ projects.length }}</span>
          </button>

          <button
            @click="currentSection = 'gallery'"
            :class="[
              'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
              currentSection === 'gallery'
                ? 'bg-orange-500 text-white font-bold'
                : 'hover:bg-blue-700 text-blue-100'
            ]"
          >
            <i class="fas fa-images"></i>
            Galerie
            <span class="ml-auto bg-red-500 px-2 py-1 text-xs rounded-full">{{ gallery.length }}</span>
          </button>
        </div>
      </nav>

      <!-- Logout Button -->
      <div class="p-4 border-t border-blue-700">
        <button
          @click="logout"
          class="w-full px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center gap-2 font-bold"
        >
          <i class="fas fa-sign-out-alt"></i>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Header -->
      <header class="bg-white border-b border-gray-200 px-8 py-4 shadow-sm flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-blue-800">
            <i v-if="currentSection === 'dashboard'" class="fas fa-chart-bar mr-2"></i>
            <i v-if="currentSection === 'products'" class="fas fa-box mr-2"></i>
            <i v-if="currentSection === 'articles'" class="fas fa-newspaper mr-2"></i>
            <i v-if="currentSection === 'projects'" class="fas fa-building mr-2"></i>
            <i v-if="currentSection === 'gallery'" class="fas fa-images mr-2"></i>
            {{ sectionTitle }}
          </h1>
          <p class="text-gray-600 text-sm mt-1">Gérez votre contenu de manière centralisée</p>
        </div>
        <div class="text-right">
          <p class="text-gray-700 font-semibold">{{ currentDate }}</p>
          <p class="text-gray-500 text-sm">Version 1.0</p>
        </div>
      </header>

      <!-- Content Area -->
      <div class="flex-1 overflow-auto p-8">
        <!-- Dashboard Section -->
        <div v-if="currentSection === 'dashboard'" class="space-y-8">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Produits</p>
                  <p class="text-4xl font-black text-blue-800 mt-2">{{ products.length }}</p>
                </div>
                <i class="fas fa-box text-orange-500 text-4xl opacity-20"></i>
              </div>
              <p class="text-gray-500 text-xs mt-4">Total des produits en base</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Articles</p>
                  <p class="text-4xl font-black text-blue-800 mt-2">{{ articles.length }}</p>
                </div>
                <i class="fas fa-newspaper text-blue-500 text-4xl opacity-20"></i>
              </div>
              <p class="text-gray-500 text-xs mt-4">Total des articles publiés</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Photos</p>
                  <p class="text-4xl font-black text-blue-800 mt-2">{{ gallery.length }}</p>
                </div>
                <i class="fas fa-images text-green-500 text-4xl opacity-20"></i>
              </div>
              <p class="text-gray-500 text-xs mt-4">Galerie photos</p>
            </div>

            <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Total</p>
                  <p class="text-4xl font-black text-blue-800 mt-2">{{ products.length + articles.length + gallery.length }}</p>
                </div>
                <i class="fas fa-database text-purple-500 text-4xl opacity-20"></i>
              </div>
              <p class="text-gray-500 text-xs mt-4">Éléments en base</p>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Produits Récents -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-black text-blue-800 mb-4 flex items-center gap-2">
                <i class="fas fa-box text-orange-500"></i>
                Produits Récents
              </h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div v-if="products.length === 0" class="text-center py-8 text-gray-500">
                  <p>Aucun produit</p>
                </div>
                <div
                  v-for="product in products.slice(0, 5)"
                  :key="product.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-orange-50 transition-colors"
                >
                  <div class="flex-1">
                    <p class="font-bold text-gray-800">{{ product.name }}</p>
                    <p class="text-xs text-gray-600">{{ product.price }}</p>
                  </div>
                  <span class="text-xs bg-orange-100 text-orange-800 px-3 py-1 rounded-full">{{ product.category }}</span>
                </div>
              </div>
            </div>

            <!-- Articles Récents -->
            <div class="bg-white rounded-lg shadow p-6">
              <h3 class="text-xl font-black text-blue-800 mb-4 flex items-center gap-2">
                <i class="fas fa-newspaper text-blue-500"></i>
                Articles Récents
              </h3>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                <div v-if="articles.length === 0" class="text-center py-8 text-gray-500">
                  <p>Aucun article</p>
                </div>
                <div
                  v-for="article in articles.slice(0, 5)"
                  :key="article.id"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-blue-50 transition-colors"
                >
                  <div class="flex-1">
                    <p class="font-bold text-gray-800">{{ article.title }}</p>
                    <p class="text-xs text-gray-600">{{ article.date }}</p>
                  </div>
                  <span class="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{{ article.category }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Status Message -->
          <div v-if="statusMessage" :class="['rounded-lg p-4', statusMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800']">
            {{ statusMessage }}
          </div>
        </div>

        <!-- Products Section -->
        <div v-if="currentSection === 'products'" class="space-y-6">
          <div class="flex flex-wrap gap-3 mb-6">
            <router-link
              to="/admin/import-products"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-block"
            >
              📥 Importer les 4 produits
            </router-link>
          </div>
          <ProductsManagement :products="products" @refresh="loadProducts" />
        </div>

        <!-- Articles Section -->
        <div v-if="currentSection === 'articles'" class="space-y-6">
          <ArticlesManagement :articles="articles" @refresh="loadArticles" />
        </div>

        <!-- Projects Section -->
        <div v-if="currentSection === 'projects'" class="space-y-6">
          <ProjectsManagement :projects="projects" @refresh="loadProjects" />
        </div>

        <!-- Gallery Section -->
        <div v-if="currentSection === 'gallery'" class="space-y-6">
          <GalleryManagement :gallery="gallery" @refresh="loadGallery" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ProductsManagement from '../components/AdminProducts.vue'
import ArticlesManagement from '../components/AdminNews.vue'
import ProjectsManagement from '../components/AdminProjects.vue'
import GalleryManagement from '../components/AdminGallery.vue'

const router = useRouter()

const currentSection = ref('dashboard')
const products = ref([])
const articles = ref([])
const projects = ref([])
const gallery = ref([])
const statusMessage = ref('')

const currentDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const sectionTitle = computed(() => {
  const titles = {
    dashboard: 'Tableau de bord',
    products: 'Gestion des Produits',
    articles: 'Gestion des Articles',
    projects: 'Gestion des Projets',
    gallery: 'Gestion de la Galerie'
  }
  return titles[currentSection.value]
})

const loadProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement produits:', error)
    statusMessage.value = '❌ Erreur lors du chargement des produits'
  }
}

const loadProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    
    // Si aucun projet en base, importer les projets statiques
    if (querySnapshot.empty) {
      console.log('Aucun projet trouvé, importation automatique...')
      await importStaticProjects()
      // Recharger après import
      const newSnapshot = await getDocs(collection(db, 'projects'))
      projects.value = newSnapshot.docs.map(mapProjectDoc)
    } else {
      projects.value = querySnapshot.docs.map(mapProjectDoc)
    }
  } catch (error) {
    console.error('Erreur chargement projets:', error)
    statusMessage.value = '❌ Erreur lors du chargement des projets'
  }
}

const mapProjectDoc = (doc) => {
  let data = doc.data()
  
  // Corriger les anciennes URLs d'images
  if (data.mainImage && data.mainImage.includes('/src/assets/images/')) {
    const filename = data.mainImage.split('/').pop()
    data.mainImage = `/EGENT_TOGO/images/${filename}`
  }
  
  if (data.images && Array.isArray(data.images)) {
    data.images = data.images.map(img => {
      if (img && img.includes('/src/assets/images/')) {
        const filename = img.split('/').pop()
        return `/EGENT_TOGO/images/${filename}`
      }
      return img
    })
  }
  
  return {
    ...data,
    id: doc.id  // L'ID Firestore écrase le data.id statique
  }
}

const importStaticProjects = async () => {
  try {
    const { projects: staticProjects } = await import('../data/projects.js')
    
    for (const project of staticProjects) {
      try {
        await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: new Date(),
          importedAt: new Date(),
          isImported: true
        })
      } catch (err) {
        console.error(`Erreur import ${project.slug}:`, err)
      }
    }
  } catch (error) {
    console.error('Erreur import statique:', error)
  }
}

const loadArticles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'))
    articles.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement articles:', error)
    statusMessage.value = '❌ Erreur lors du chargement des articles'
  }
}

const loadGallery = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'))
    gallery.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement galerie:', error)
    statusMessage.value = '❌ Erreur lors du chargement de la galerie'
  }
}

onMounted(async () => {
  await loadProducts()
  await loadProjects()
  await loadArticles()
  await loadGallery()
})

const logout = () => {
  router.push('/login')
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.admin-sidebar {
  max-width: 100%;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

main {
  animation: fadeIn 0.3s ease-out;
}
</style>
