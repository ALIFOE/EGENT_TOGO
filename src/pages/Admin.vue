<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Admin -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
            <p class="text-gray-500 mt-1">{{ userEmail }}</p>
          </div>
          <div class="flex gap-3">
            <router-link
              to="/admin/import"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              📥 Importer Données
            </router-link>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation -->
      <div class="mb-8 border-b border-gray-200">
        <nav class="flex space-x-8" role="tablist">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'py-4 px-1 font-medium text-sm transition'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="space-y-8">
        <!-- Aperçu -->
        <div v-if="activeTab === 'overview'" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Articles</p>
                <p class="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Services</p>
                <p class="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-full">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Produits</p>
                <p class="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-full">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-gray-500 text-sm">Projets</p>
                <p class="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles -->
        <div v-if="activeTab === 'articles'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Gestion des Articles</h2>
          <div class="text-center py-8 text-gray-500">
            <p>Interface obsolète - Utiliser l'onglet "Actualités"</p>
          </div>
        </div>

        <!-- Services -->
        <div v-if="activeTab === 'services'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Gestion des Services</h2>
          <div class="text-center py-8 text-gray-500">
            <p>Interface de gestion des services à venir</p>
          </div>
        </div>

        <!-- Produits CRUD -->
        <div v-if="activeTab === 'products'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Gestion des Produits</h2>
          <AdminProducts />
        </div>

        <!-- Actualités CRUD -->
        <div v-if="activeTab === 'news'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Gestion des Actualités</h2>
          <AdminNews />
        </div>

        <!-- Galerie CRUD -->
        <div v-if="activeTab === 'gallery'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Gestion de la Galerie</h2>
          <AdminGallery />
        </div>

        <!-- Paramètres -->
        <div v-if="activeTab === 'settings'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-6">Paramètres</h2>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nom du site</label>
              <input type="text" value="EGENT-TOGO" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
              <input type="email" value="contact@egenttogo.com" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminProducts from '../components/AdminProducts.vue'
import AdminNews from '../components/AdminNews.vue'
import AdminGallery from '../components/AdminGallery.vue'

const router = useRouter()
const activeTab = ref('overview')
const userEmail = ref('')

const tabs = [
  { id: 'overview', name: 'Aperçu' },
  { id: 'products', name: 'Produits' },
  { id: 'news', name: 'Actualités' },
  { id: 'gallery', name: 'Galerie' },
  { id: 'settings', name: 'Paramètres' }
]

onMounted(() => {
  // Vérifier que l'utilisateur est connecté
  const authToken = localStorage.getItem('authToken')
  const email = localStorage.getItem('userEmail')

  if (!authToken) {
    router.push('/login')
  } else {
    userEmail.value = email || 'Admin'
  }
})

function handleLogout() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userEmail')
  router.push('/login')
}
</script>
