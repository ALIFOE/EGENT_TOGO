<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header avec bouton retour -->
      <div class="flex items-center justify-between mb-8">
        <router-link
          to="/admin"
          class="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-lg transition-all duration-200 border border-white/30"
        >
          <i class="fas fa-arrow-left"></i>
          Retour
        </router-link>
        <h1 class="text-4xl font-black text-white flex items-center gap-3">
          <i class="fas fa-images text-orange-400"></i>
          Importer Galerie
        </h1>
        <div></div>
      </div>

      <!-- Card Principal -->
      <div class="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header Card -->
        <div class="bg-gradient-to-r from-blue-600 to-orange-500 p-8 text-white">
          <h2 class="text-2xl font-bold mb-2">🚀 Ajouter les Images à la Galerie</h2>
          <p class="text-blue-100 text-sm">Importez automatiquement toutes les images du dossier assets/images vers Firestore</p>
        </div>

        <!-- Content -->
        <div class="p-8 space-y-8">
          <!-- Info Box -->
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-lg p-6">
            <div class="flex items-start gap-4">
              <i class="fas fa-circle-info text-blue-600 text-2xl mt-1"></i>
              <div>
                <h3 class="font-bold text-blue-900 mb-2">Ici's comment ça fonctionne:</h3>
                <ul class="text-blue-800 text-sm space-y-1">
                  <li>✅ <strong>Étape 1:</strong> Cliquez sur "Nettoyer et Réimporter"</li>
                  <li>✅ <strong>Étape 2:</strong> L'ancienne galerie sera vidée</li>
                  <li>✅ <strong>Étape 3:</strong> Les 36+ images seront ajoutées automatiquement</li>
                  <li>✅ <strong>Étape 4:</strong> Vérifiez les résultats ci-dessous</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 flex-wrap">
            <button
              @click="addAllImages"
              :disabled="loading"
              class="flex-1 min-w-64 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
            >
              <i :class="[loading ? 'fas fa-spinner fa-spin' : 'fas fa-sync-alt', 'text-xl group-hover:scale-110 transition-transform']"></i>
              <span>{{ loading ? 'Traitement en cours...' : '🔄 Nettoyer et Réimporter' }}</span>
            </button>

            <router-link
              to="/galerie"
              class="flex-1 min-w-64 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3 group"
            >
              <i class="fas fa-eye text-xl group-hover:scale-110 transition-transform"></i>
              <span>👁️ Voir la Galerie</span>
            </router-link>
          </div>

          <!-- Status Message -->
          <transition
            enter-active-class="animate-slideInDown"
            leave-active-class="animate-slideOutUp"
          >
            <div v-if="status" class="p-6 rounded-lg border-l-4 font-semibold" :class="statusClass">
              <div class="flex items-center gap-3">
                <i :class="[status.includes('✅') ? 'fas fa-check-circle text-2xl' : 'fas fa-exclamation-circle text-2xl']"></i>
                <span>{{ status }}</span>
              </div>
            </div>
          </transition>

          <!-- Results Section -->
          <transition
            enter-active-class="animate-fadeInUp"
            leave-active-class="animate-fadeOutDown"
          >
            <div v-if="results.length > 0" class="space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-2xl font-bold text-gray-800">📋 Résultats d'Import</h3>
                <span class="text-sm font-semibold px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                  {{ results.length }} images
                </span>
              </div>

              <!-- Stats Cards -->
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-4">
                  <p class="text-green-700 text-sm font-semibold uppercase mb-1">Succès</p>
                  <p class="text-3xl font-black text-green-600">{{ results.filter(r => r.success).length }}</p>
                </div>
                <div class="bg-gradient-to-br from-red-50 to-red-100 border border-red-300 rounded-lg p-4">
                  <p class="text-red-700 text-sm font-semibold uppercase mb-1">Erreurs</p>
                  <p class="text-3xl font-black text-red-600">{{ results.filter(r => !r.success).length }}</p>
                </div>
              </div>

              <!-- Results List -->
              <div class="space-y-2 max-h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div 
                  v-for="(result, index) in results"
                  :key="index"
                  class="p-3 rounded-lg border-l-4 transition-all hover:shadow-md text-sm animate-slideInLeft"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                  :class="result.success 
                    ? 'bg-green-100 border-green-500 text-green-800' 
                    : 'bg-red-100 border-red-500 text-red-800'"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-bold truncate">{{ result.name }}</span>
                    <span class="flex-shrink-0 ml-2">
                      {{ result.success ? '✅ Ajoutée' : '❌ ' + result.error }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Tips Section -->
          <div class="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
            <h4 class="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <i class="fas fa-lightbulb"></i>
              Conseils
            </h4>
            <ul class="text-orange-800 text-sm space-y-2">
              <li>💡 La première importation peut prendre quelques secondes</li>
              <li>💡 Une fois terminée, actualisez la page galerie pour voir les images</li>
              <li>💡 Tous les images sont sauvegardées dans Firestore et persistent</li>
              <li>💡 Vous pouvez ré-exécuter ce script pour mettre à jour la galerie</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="mt-8 text-center text-white/70 text-sm">
        <p>© 2026 EGENT-TOGO Admin • Galerie d'images</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query } from 'firebase/firestore'
import { db } from '../lib/firebase'

const loading = ref(false)
const status = ref('')
const results = ref([])

const statusClass = computed(() => {
  if (!status.value) return ''
  return status.value.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
})

// Importer dynamiquement toutes les images
const imageModules = import.meta.glob('/src/assets/images/**/*.{jpg,jpeg,png,webp}', { eager: true })

// Créer un mapping nom => URL
const imageUrlMap = {}
for (const [path, module] of Object.entries(imageModules)) {
  const filename = path.split('/').pop()
  imageUrlMap[filename] = module.default
}

// Liste de toutes les images du dossier assets/images
const allImages = [
  { name: '6862757d3ce79-1.jpg', category: 'Montage' },
  { name: '6862757d416a4-2.jpg', category: 'Montage' },
  { name: '6862757d5659b-3.jpg', category: 'Montage' },
  { name: '692fe9eb8e887-1002342633.jpg', category: 'Autres' },
  { name: 'armoireBilly_monté.jpg', category: 'Montage' },
  { name: 'armoire_billy2.jpg', category: 'Montage' },
  { name: 'boutique_egent.jpg', category: 'Boutique' },
  { name: 'chauffage_egent.jpg', category: 'Chauffage' },
  { name: 'couleurs.png', category: 'Autres' },
  { name: 'egent_reception.jpg', category: 'Bureau' },
  { name: 'freewater.jpeg', category: 'Eau' },
  { name: 'headepage.webp', category: 'Header' },
  { name: 'headpage3.png', category: 'Header' },
  { name: 'hero1.jpg', category: 'Hero' },
  { name: 'lampandaire_monté2.jpg', category: 'Lampadaire' },
  { name: 'lampandaire_monté3.jpg', category: 'Lampadaire' },
  { name: 'lampendaire_monté.jpg', category: 'Lampadaire' },
  { name: 'logo.png', category: 'Logo' },
  { name: 'logo_marque.png', category: 'Logo' },
  { name: 'montage_panneau.jpg', category: 'Montage Panneau' },
  { name: 'montage_panneau2.jpg', category: 'Montage Panneau' },
  { name: 'panneau4.jpg', category: 'Panneau' },
  { name: 'panneau_montés.jpg', category: 'Panneau' },
  { name: 'photoclient1.jpg', category: 'Clients' },
  { name: 'photo_chantier.jpg', category: 'Chantier' },
  { name: 'photo_chantier2.jpg', category: 'Chantier' },
  { name: 'photo_conf2.jpg', category: 'Conférence' },
  { name: 'photo_conf3.jpg', category: 'Conférence' },
  { name: 'phpto_conf.jpg', category: 'Conférence' },
  { name: 'prix1.jpg', category: 'Prix' },
  { name: 'prix2.jpg', category: 'Prix' },
  { name: 'prix3.jpg', category: 'Prix' },
  { name: 'produit_ panneau2.jpg', category: 'Produit' },
  { name: 'produit_lampandaire3.jpg', category: 'Produit' },
  { name: 'produit_lampendaire2.jpg', category: 'Produit' },
  { name: 'imagefont01.jpg', category: 'Font', folder: 'custom/' }
]

// Nettoyer l'ancienne galerie
async function cleanOldGallery() {
  try {
    status.value = '🗑️ Nettoyage de l\'ancienne galerie...'
    const galleryCollection = collection(db, 'gallery')
    const snapshot = await getDocs(galleryCollection)
    
    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(db, 'gallery', docSnap.id))
    }
    
    status.value = '✅ Galerie nettoyée'
  } catch (err) {
    console.error('Erreur nettoyage:', err)
    status.value = `⚠️ Erreur nettoyage: ${err.message}`
  }
}

async function addAllImages() {
  loading.value = true
  results.value = []

  try {
    // D'abord nettoyer
    await cleanOldGallery()
    
    status.value = 'Ajout des images en cours...'
    const galleryCollection = collection(db, 'gallery')

    for (const imageData of allImages) {
      try {
        const imageUrl = imageUrlMap[imageData.name]
        
        if (!imageUrl) {
          results.value.push({
            name: imageData.name,
            success: false,
            error: 'Image non trouvée'
          })
          continue
        }

        await addDoc(galleryCollection, {
          title: imageData.name.replace(/\.[^/.]+$/, ''), // Nom sans extension
          image: imageUrl,
          src: imageUrl,
          category: imageData.category,
          createdAt: serverTimestamp(),
          description: `${imageData.category} - ${imageData.name}`
        })

        results.value.push({
          name: imageData.name,
          success: true
        })
      } catch (err) {
        results.value.push({
          name: imageData.name,
          success: false,
          error: err.message
        })
      }
    }

    const successCount = results.value.filter(r => r.success).length
    status.value = `✅ ${successCount} images ajoutées avec succès sur ${results.value.length}`
  } catch (err) {
    status.value = `❌ Erreur: ${err.message}`
  } finally {
    loading.value = false
  }
}
</script>
