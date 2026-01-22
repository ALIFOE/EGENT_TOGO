<template>
  <div class="p-6 space-y-6">
    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
      <h2 class="text-lg font-bold text-yellow-800 mb-2">🔧 Outil de Maintenance - Articles</h2>
      <p class="text-yellow-700">Cet outil permet de nettoyer les articles avec des images invalides</p>
    </div>

    <!-- Articles problématiques -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-red-600 text-white px-6 py-4">
        <h3 class="text-lg font-bold">Articles avec images invalides</h3>
      </div>
      
      <div class="p-6 space-y-4">
        <div v-if="problematicArticles.length === 0" class="text-center py-8">
          <p class="text-green-600 text-lg font-semibold">✅ Tous les articles sont en bon état!</p>
        </div>

        <div v-for="article in problematicArticles" :key="article.id" class="border border-red-200 rounded-lg p-4 space-y-3 bg-red-50">
          <div>
            <p class="font-semibold text-gray-900">{{ article.title }}</p>
            <p class="text-xs text-gray-500">ID: {{ article.id }}</p>
          </div>

          <div class="bg-white p-3 rounded border border-red-200">
            <p class="text-xs font-mono text-red-700 break-words">{{ article.image?.substring(0, 100) }}...</p>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-700">Options:</p>
            <div class="flex gap-2">
              <button
                @click="fixArticle(article)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
              >
                <i class="fas fa-magic"></i> Réparer
              </button>
              <button
                @click="deleteArticle(article)"
                class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
              >
                <i class="fas fa-trash"></i> Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions globales -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="font-bold text-blue-900 mb-4">Actions Globales</h3>
      <button
        @click="checkAllArticles"
        class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        <i class="fas fa-search"></i> Vérifier tous les articles
      </button>
    </div>

    <!-- Statut -->
    <div v-if="statusMessage" :class="[
      'p-4 rounded-lg border-l-4 font-semibold',
      statusMessage.includes('✅') 
        ? 'bg-green-50 border-green-500 text-green-800' 
        : 'bg-red-50 border-red-500 text-red-800'
    ]">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

const problematicArticles = ref([])
const statusMessage = ref('')

// SVG placeholder encodé pour fonctionner offline
const placeholderSVG = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22%3E%3Crect width=%22600%22 height=%22400%22 fill=%22%23e0e0e0%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2224%22 fill=%22%23999%22%3EGENT-TOGO%3C/text%3E%3C/svg%3E'

// Vérifier tous les articles
const checkAllArticles = async () => {
  try {
    statusMessage.value = '⏳ Vérification en cours...'
    const querySnapshot = await getDocs(collection(db, 'articles'))
    
    problematicArticles.value = []
    
    querySnapshot.forEach(docSnapshot => {
      const article = docSnapshot.data()
      const image = article.image
      
      // Déterminer si l'image est invalide
      const isInvalid = 
        !image ||  // Pas d'image
        image.startsWith('data:') ||  // Base64 encodé
        image.startsWith('/images/') ||  // URL relative au lieu de Firebase Storage
        (!image.startsWith('http') && !image.startsWith('https') && !image.includes('firebasestorage'))  // Pas une URL absolue valide
      
      if (isInvalid) {
        problematicArticles.value.push({
          id: docSnapshot.id,
          ...article
        })
      }
    })
    
    statusMessage.value = `✅ ${problematicArticles.value.length} article(s) avec image(s) problématique(s) trouvé(s)`
  } catch (err) {
    statusMessage.value = `❌ Erreur: ${err.message}`
  }
}

// Réparer un article (remplacer l'image par une image par défaut)
const fixArticle = async (article) => {
  if (!confirm(`Êtes-vous sûr de vouloir remplacer l'image de "${article.title}" par une image par défaut?`)) {
    return
  }

  try {
    statusMessage.value = '⏳ Réparation en cours...'
    
    await updateDoc(doc(db, 'articles', article.id), {
      image: placeholderSVG,
      updatedAt: serverTimestamp()
    })
    
    // Retirer de la liste
    problematicArticles.value = problematicArticles.value.filter(a => a.id !== article.id)
    statusMessage.value = `✅ Article "${article.title}" réparé!`
  } catch (err) {
    statusMessage.value = `❌ Erreur: ${err.message}`
  }
}

// Supprimer un article
const deleteArticle = async (article) => {
  if (!confirm(`Êtes-vous sûr de vouloir supprimer "${article.title}"?`)) {
    return
  }

  try {
    statusMessage.value = '⏳ Suppression en cours...'
    await deleteDoc(doc(db, 'articles', article.id))
    
    problematicArticles.value = problematicArticles.value.filter(a => a.id !== article.id)
    statusMessage.value = `✅ Article "${article.title}" supprimé!`
  } catch (err) {
    statusMessage.value = `❌ Erreur: ${err.message}`
  }
}

// Charger au montage
onMounted(() => {
  checkAllArticles()
})
</script>
