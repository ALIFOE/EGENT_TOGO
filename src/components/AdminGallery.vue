<template>
  <div class="space-y-6">
    <!-- Boutons Action -->
    <div class="flex gap-3 flex-wrap">
      <button
        @click="showForm = !showForm"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        {{ showForm ? '✕ Annuler' : '+ Ajouter Image' }}
      </button>
      
      <router-link
        to="/admin/import-gallery"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition inline-block"
      >
        📥 Importer les images du dossier
      </router-link>
    </div>

    <!-- Zone Glisser-Déposer -->
    <div
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      :class="[
        'border-2 border-dashed rounded-lg p-12 text-center transition-colors',
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      ]"
    >
      <div class="space-y-4">
        <div class="text-5xl">📸</div>
        <div>
          <p class="text-lg font-semibold text-gray-700">Glissez-déposez vos images ici</p>
          <p class="text-sm text-gray-500 mt-2">ou cliquez pour sélectionner des fichiers</p>
        </div>
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          @change="handleFileSelect"
          class="hidden"
        />
        <button
          @click="$refs.fileInput.click()"
          type="button"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Choisir des fichiers
        </button>
      </div>
    </div>

    <!-- Messages de progression -->
    <div v-if="uploadingFiles.length > 0" class="space-y-2">
      <div v-for="(file, idx) in uploadingFiles" :key="idx" class="bg-blue-50 p-4 rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">{{ file.name }}</span>
          <span class="text-xs text-gray-500">{{ Math.round(file.progress) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all"
            :style="{ width: file.progress + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Formulaire pour les métadonnées -->
    <div v-if="showForm || pendingImages.length > 0" class="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Modifier Image' : 'Ajouter Images' }}</h3>
      
      <!-- Images en attente de métadonnées -->
      <div v-if="pendingImages.length > 0" class="space-y-4 border-b pb-4">
        <div v-for="(pending, idx) in pendingImages" :key="'pending-' + idx" class="bg-gray-50 p-4 rounded-lg">
          <div class="flex gap-4">
            <img
              :src="pending.preview"
              :alt="pending.file.name"
              class="w-24 h-24 object-cover rounded"
            />
            <div class="flex-1 space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  v-model="pending.title"
                  type="text"
                  placeholder="Titre de l'image"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  v-model="pending.category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option v-for="cat in categories" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>
              <button
                @click="removePendingImage(idx)"
                type="button"
                class="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
        <button
          @click="submitPendingImages"
          type="button"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Ajouter {{ pendingImages.length }} image{{ pendingImages.length > 1 ? 's' : '' }}
        </button>
      </div>

      <!-- Formulaire standard (édition ou ajout URL) -->
      <form v-if="showForm && pendingImages.length === 0" @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Titre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              v-model="formData.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner une catégorie</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>
        </div>

        <!-- Image URL -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            v-model="formData.image"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="/src/assets/images/..."
          />
          <p class="text-xs text-gray-500 mt-1">Collez une URL d'image</p>
        </div>

        <!-- Aperçu Image -->
        <div v-if="formData.image" class="border border-gray-200 rounded-lg p-3">
          <img :src="formData.image" :alt="formData.title" class="max-h-40 max-w-full" @error="handleImageError" />
        </div>

        <!-- Boutons -->
        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {{ isEditing ? 'Mettre à jour' : 'Créer' }}
          </button>
          <button
            type="button"
            @click="resetForm"
            class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Grille Galerie -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="image in gallery" :key="image.id" class="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
        <!-- Image -->
        <div class="relative overflow-hidden h-48 bg-gray-200">
          <img :src="image.image" :alt="image.title" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" @error="(e) => e.target.src = '/EGENT_TOGO/images/montage_panneau2.jpg'" />
        </div>

        <!-- Info -->
        <div class="p-4">
          <h3 class="font-semibold text-gray-900 text-sm">{{ image.title }}</h3>
          <p class="text-xs text-gray-500 mt-1">{{ image.category }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ image.createdAt }}</p>

          <!-- Actions -->
          <div class="flex gap-2 mt-4">
            <button
              @click="editImage(image)"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded text-sm"
            >
              Éditer
            </button>
            <button
              @click="deleteImageConfirm(image.id)"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded text-sm"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Vide -->
    <div v-if="gallery.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
      <p class="text-gray-500 text-lg">Aucune image. Ajouter-en pour commencer.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'

const { gallery, loading, error, addGalleryImage, updateGalleryImage, deleteGalleryImage, initializeGallery } = useFirebaseData()

const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const isDragging = ref(false)
const fileInput = ref(null)
const uploadingFiles = ref([])
const pendingImages = ref([])

const categories = [
  'Installation Solaire',
  'Lampadaires LED',
  'Panneaux Solaires',
  'Pompage Solaire',
  'Formation'
]

const formData = ref({
  title: '',
  category: '',
  image: ''
})

const defaultFormData = () => ({
  title: '',
  category: '',
  image: ''
})

onMounted(() => {
  initializeGallery()
})

function resetForm() {
  formData.value = defaultFormData()
  isEditing.value = false
  editingId.value = null
  showForm.value = false
  pendingImages.value = []
}

function editImage(image) {
  formData.value = { ...image }
  isEditing.value = true
  editingId.value = image.id
  showForm.value = true
  pendingImages.value = []
}

async function submitForm() {
  try {
    if (isEditing.value) {
      await updateGalleryImage(editingId.value, formData.value)
    } else {
      await addGalleryImage(formData.value)
    }
    resetForm()
  } catch (err) {
    console.error('Erreur formulaire:', err)
  }
}

async function deleteImageConfirm(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
    try {
      await deleteGalleryImage(id)
    } catch (err) {
      console.error('Erreur suppression:', err)
    }
  }
}

function handleImageError(e) {
  console.error('Erreur chargement image:', e)
}

// Gestion du drag and drop
function handleDrop(event) {
  isDragging.value = false
  const files = event.dataTransfer.files
  processFiles(files)
}

function handleFileSelect(event) {
  const files = event.target.files
  processFiles(files)
}

function processFiles(files) {
  showForm.value = true
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    
    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      console.warn(`${file.name} n'est pas une image`)
      continue
    }

    // Créer une prévisualisation
    const reader = new FileReader()
    reader.onload = (e) => {
      pendingImages.value.push({
        file: file,
        preview: e.target.result,
        title: file.name.replace(/\.[^/.]+$/, ''),
        category: ''
      })
    }
    reader.readAsDataURL(file)
  }
}

function removePendingImage(index) {
  pendingImages.value.splice(index, 1)
}

async function submitPendingImages() {
  try {
    for (const pending of pendingImages.value) {
      // Convertir le fichier en base64 pour le stockage
      const reader = new FileReader()
      reader.onload = async (e) => {
        // Ajouter le tracking de progression
        const fileIndex = uploadingFiles.value.findIndex(f => f.name === pending.file.name)
        if (fileIndex === -1) {
          uploadingFiles.value.push({
            name: pending.file.name,
            progress: 0
          })
        }

        // Simuler la progression
        const uploadProgress = setInterval(() => {
          const idx = uploadingFiles.value.findIndex(f => f.name === pending.file.name)
          if (idx !== -1 && uploadingFiles.value[idx].progress < 90) {
            uploadingFiles.value[idx].progress += Math.random() * 30
          }
        }, 200)

        try {
          await addGalleryImage({
            title: pending.title,
            category: pending.category,
            image: e.target.result
          })

          // Marquer comme complété
          const idx = uploadingFiles.value.findIndex(f => f.name === pending.file.name)
          if (idx !== -1) {
            uploadingFiles.value[idx].progress = 100
          }
          clearInterval(uploadProgress)
        } catch (err) {
          console.error('Erreur upload:', err)
          clearInterval(uploadProgress)
        }
      }
      reader.readAsDataURL(pending.file)
    }

    // Attendre un peu puis nettoyer
    setTimeout(() => {
      uploadingFiles.value = []
      pendingImages.value = []
      resetForm()
    }, 1000)
  } catch (err) {
    console.error('Erreur soumission images:', err)
  }
}
</script>
