<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-black mb-8">🔧 Débogage Firebase</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Statut Firebase -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold mb-4">📊 Statut</h2>
          <div class="space-y-2 text-sm font-mono">
            <p><strong>Chargement:</strong> {{ loading ? '🟡 Oui' : '🟢 Non' }}</p>
            <p><strong>Erreur:</strong> {{ error ? '🔴 ' + error : '🟢 Aucune' }}</p>
            <p><strong>Produits:</strong> {{ products.length }} trouvés</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-bold mb-4">🎯 Actions</h2>
          <div class="space-y-2">
            <button 
              @click="reloadProducts"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              🔄 Recharger Produits
            </button>
            <button 
              @click="testProduct"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              ✅ Ajouter Test
            </button>
          </div>
        </div>
      </div>

      <!-- Produits JSON -->
      <div class="bg-white p-6 rounded-lg shadow mb-8">
        <h2 class="text-xl font-bold mb-4">📦 Produits (JSON)</h2>
        <div class="bg-gray-100 p-4 rounded overflow-x-auto">
          <pre class="text-xs">{{ JSON.stringify(products, null, 2) }}</pre>
        </div>
      </div>

      <!-- Produits Affichage -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="bg-white p-4 rounded-lg shadow">
          <img 
            :src="product.mainImage || '/images/montage_panneau.jpg'" 
            :alt="product.name"
            class="w-full h-40 object-cover rounded mb-2"
            @error="(e) => e.target.src = '/images/montage_panneau.jpg'"
          />
          <h3 class="font-bold text-lg">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm">{{ product.shortDescription }}</p>
          <p class="font-bold text-blue-600 mt-2">{{ product.price }}</p>
        </div>
      </div>

      <div v-if="products.length === 0" class="text-center py-12 bg-yellow-50 rounded-lg border-2 border-yellow-300 mt-8">
        <p class="text-lg font-bold text-yellow-800">⚠️ Aucun produit trouvé</p>
        <p class="text-yellow-600 mt-2">Vérifiez que:</p>
        <ul class="text-yellow-600 text-sm mt-2 inline-block text-left">
          <li>✓ Firebase est connecté (databaseURL valide)</li>
          <li>✓ La base de données contient des données</li>
          <li>✓ Les règles sont en mode TEST</li>
          <li>✓ Vous avez exécuté DataImport.vue</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'

const { products, loading, error, initializeProducts, addProduct } = useFirebaseData()

async function reloadProducts() {
  console.log('🔄 Rechargement...')
  await initializeProducts()
}

async function testProduct() {
  const testData = {
    name: '🧪 Produit Test ' + new Date().getTime(),
    slug: 'test-' + new Date().getTime(),
    price: '999 FCFA',
    category: 'Test',
    shortDescription: 'Produit test pour débogage',
    description: 'Description test',
    mainImage: '/images/montage_panneau.jpg',
    specs: []
  }
  console.log('➕ Ajout produit test:', testData)
  try {
    const id = await addProduct(testData)
    console.log('✅ Produit test créé avec ID:', id)
  } catch (err) {
    console.error('❌ Erreur:', err)
  }
}

onMounted(() => {
  console.log('🚀 Page Debug montée')
  initializeProducts()
})
</script>
