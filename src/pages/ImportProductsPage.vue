<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-black text-blue-800 mb-2">🚀 Import de Produits</h1>
        <p class="text-gray-600">Importez les 4 produits principaux dans Firebase</p>
      </div>

      <!-- Carte principale -->
      <div class="bg-white rounded-lg shadow-xl p-8 space-y-6">
        <!-- Liste des produits à importer -->
        <div>
          <h2 class="text-xl font-bold text-gray-800 mb-4">Produits à importer:</h2>
          <div class="space-y-2">
            <div v-for="(product, idx) in productsToImport" :key="idx" class="flex items-start gap-3 p-3 bg-blue-50 rounded">
              <span class="text-blue-600 font-bold">{{ idx + 1 }}.</span>
              <div class="flex-1">
                <p class="font-semibold text-gray-800">{{ product.name }}</p>
                <p class="text-sm text-gray-600">{{ product.price }} - {{ product.category }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div v-if="statusMessage" :class="[
          'rounded-lg p-4 text-center font-semibold',
          statusMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        ]">
          {{ statusMessage }}
        </div>

        <!-- Bouton d'import -->
        <div class="flex gap-3">
          <button
            @click="importProducts"
            :disabled="importing || imported"
            :class="[
              'flex-1 font-bold py-3 px-6 rounded-lg transition-all text-white',
              importing ? 'bg-gray-400 cursor-not-allowed' : imported ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            <span v-if="importing" class="flex items-center justify-center gap-2">
              <i class="fas fa-spinner fa-spin"></i> Import en cours...
            </span>
            <span v-else-if="imported" class="flex items-center justify-center gap-2">
              <i class="fas fa-check"></i> Importation terminée
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <i class="fas fa-download"></i> Importer maintenant
            </span>
          </button>
          <router-link
            to="/admin"
            class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <i class="fas fa-arrow-left"></i> Retour
          </router-link>
        </div>

        <!-- Info -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-sm text-gray-700">
            <strong>⚠️ Note:</strong> Cette action importera les 4 produits principaux dans votre base de données Firebase. 
            Vous pouvez modifier ou supprimer ces produits depuis le tableau de bord admin après l'import.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productsToImport, importProductsToFirebase } from '../scripts/importProducts'

const router = useRouter()
const importing = ref(false)
const imported = ref(false)
const statusMessage = ref('')

async function importProducts() {
  importing.value = true
  statusMessage.value = ''
  
  try {
    await importProductsToFirebase()
    imported.value = true
    statusMessage.value = '✅ Les 4 produits ont été importés avec succès!'
    
    // Rediriger après 2 secondes
    setTimeout(() => {
      router.push('/admin')
    }, 2000)
  } catch (error) {
    statusMessage.value = `❌ Erreur lors de l'import: ${error.message}`
    console.error(error)
  } finally {
    importing.value = false
  }
}
</script>

<style scoped>
</style>
