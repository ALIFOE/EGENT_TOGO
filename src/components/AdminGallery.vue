<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-gray-900">Galerie</h2>
      <button
        @click="showForm = !showForm"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
      >
        <i :class="showForm ? 'fas fa-times' : 'fas fa-plus'"></i>
        {{ showForm ? 'Annuler' : 'Nouvelle Image' }}
      </button>
    </div>

    <!-- Statut Messages -->
    <transition name="fade">
      <div v-if="statusMessage" :class="[
        'p-4 rounded-lg border-l-4 font-semibold',
        statusMessage.includes('✅') 
          ? 'bg-green-50 border-green-500 text-green-800' 
          : 'bg-red-50 border-red-500 text-red-800'
      ]">
        {{ statusMessage }}
      </div>
    </transition>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-xl font-bold text-gray-900 mb-6">
        {{ isEditing ? '✏️ Modifier Image' : '➕ Ajouter Nouvelle Image' }}
      </h3>
      
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Titre et Catégorie -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
            <input
              v-model="formData.title"
              type="text"
              required
              placeholder="Ex: Panneau Solaire Installation"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
            <select
              v-model="formData.category"
              required
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Installations">Installations</option>
              <option value="Équipements">Équipements</option>
              <option value="Clients">Clients</option>
              <option value="Événements">Événements</option>
              <option value="Formation">Formation</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            placeholder="Description de l'image"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
          ></textarea>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
          <div
            @drop.prevent="handleImageDrop"
            @dragover.prevent
            class="border-3 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition bg-blue-50/50"
          >
            <div v-if="!previewImage" class="space-y-3">
              <div class="text-4xl">📸</div>
              <p class="text-gray-700 font-semibold">Glissez-déposez votre image ici</p>
              <p class="text-sm text-gray-600">ou cliquez pour sélectionner</p>
              <input
                type="file"
                @change="handleFileInput"
                accept="image/*"
                class="hidden"
                ref="fileInput"
              />
              <button
                type="button"
                @click="$refs.fileInput?.click()"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition inline-block"
              >
                Sélectionner une image
              </button>
            </div>
            <div v-else-if="isUploadingImage" class="space-y-3">
              <div class="animate-spin text-4xl">⏳</div>
              <p class="text-gray-700 font-semibold">Upload en cours...</p>
            </div>
            <div v-else class="space-y-4">
              <img
                :src="previewImage"
                :alt="formData.title"
                class="max-h-64 mx-auto rounded-lg object-cover"
              />
              <button
                type="button"
                @click="previewImage = ''; formData.imageUrl = ''"
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Changer l'image
              </button>
            </div>
          </div>
        </div>

        <!-- Boutons -->
        <div class="flex gap-4 pt-4 border-t-2 border-gray-200">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
          >
            <i :class="isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-save'"></i>
            {{ isSubmitting ? 'Traitement...' : (isEditing ? 'Mettre à jour' : 'Ajouter') }}
          </button>
          <button
            type="button"
            @click="resetForm"
            class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>

    <!-- Grille des Images -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fas fa-images"></i>
          Images Galerie ({{ gallery.length }})
        </h3>
      </div>

      <!-- Grille -->
      <div v-if="gallery.length > 0" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="image in gallery" 
            :key="image.id"
            class="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <!-- Image -->
            <div class="aspect-video bg-gray-200 overflow-hidden">
              <img
                :src="image.imageUrl"
                :alt="image.title"
                class="w-full h-full object-cover hover:scale-110 transition"
              />
            </div>

            <!-- Infos -->
            <div class="p-4 space-y-3">
              <div>
                <p class="font-semibold text-gray-900">{{ image.title }}</p>
                <p class="text-xs text-gray-500">{{ image.category }}</p>
              </div>
              <p v-if="image.description" class="text-sm text-gray-600 line-clamp-2">{{ image.description }}</p>

              <!-- Actions -->
              <div class="flex gap-2 pt-3 border-t">
                <button
                  @click="editImage(image)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold text-xs transition flex items-center justify-center gap-1"
                >
                  <i class="fas fa-pen"></i>
                  Éditer
                </button>
                <button
                  @click="confirmDelete(image)"
                  class="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-semibold text-xs transition flex items-center justify-center gap-1"
                >
                  <i class="fas fa-trash"></i>
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vide -->
      <div v-else class="p-8 text-center">
        <div class="text-5xl mb-4">🖼️</div>
        <p class="text-gray-600 text-lg font-semibold">Aucune image trouvée</p>
        <p class="text-gray-500 text-sm">Cliquez sur "Nouvelle Image" pour en ajouter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../lib/firebase'

// État
const gallery = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const isUploadingImage = ref(false)
const statusMessage = ref('')
const fileInput = ref(null)
const currentFile = ref(null)
const previewImage = ref(null)  // Preview locale en base64

// Formulaire
const formData = ref({
  title: '',
  category: '',
  description: '',
  imageUrl: ''
})

const defaultFormData = {
  title: '',
  category: '',
  description: '',
  imageUrl: ''
}

// Charger la galerie
const loadGallery = async () => {
  try {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    gallery.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Erreur chargement galerie:', err)
    showStatus('❌ Erreur lors du chargement de la galerie', 'error')
  }
}

// Afficher un statut
const showStatus = (message, type = 'success') => {
  statusMessage.value = message
  setTimeout(() => {
    statusMessage.value = ''
  }, 4000)
}

// Réinitialiser le formulaire
const resetForm = () => {
  formData.value = { ...defaultFormData }
  previewImage.value = null
  currentFile.value = null
  isEditing.value = false
  showForm.value = false
}

// Éditer une image
const editImage = (image) => {
  formData.value = { ...image }
  previewImage.value = image.imageUrl  // URL depuis Firestore
  isEditing.value = true
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Gérer l'image (drag & drop)
const handleImageDrop = (e) => {
  const files = e.dataTransfer.files
  if (files.length > 0) {
    readImage(files[0])
  }
}

// Gérer l'image (sélection fichier)
const handleFileInput = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    readImage(files[0])
  }
}

// Lire l'image
const readImage = (file) => {
  if (!file.type.startsWith('image/')) {
    showStatus('❌ Sélectionnez une image valide', 'error')
    return
  }
  
  if (file.size > 5 * 1024 * 1024) {
    showStatus('❌ L\'image ne doit pas dépasser 5 MB', 'error')
    return
  }
  
  currentFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result  // Preview locale UNIQUEMENT
  }
  reader.onerror = () => {
    showStatus('❌ Erreur lors de la lecture de l\'image', 'error')
  }
  reader.readAsDataURL(file)
}

// Soumettre le formulaire
const submitForm = async () => {
  try {
    isSubmitting.value = true
    statusMessage.value = '⏳ Traitement...'

    // Validation
    if (!formData.value.title || !formData.value.category) {
      throw new Error('Les champs Titre et Catégorie sont obligatoires')
    }

    if (!formData.value.imageUrl && !isEditing.value) {
      throw new Error('Veuillez sélectionner une image')
    }

    let imageUrl = formData.value.imageUrl

    // Si une nouvelle image a été sélectionnée, l'uploader vers Firebase Storage
    if (currentFile.value) {
      isUploadingImage.value = true
      statusMessage.value = '⏳ Upload de l\'image...'
      
      const timestamp = Date.now()
      const fileName = `gallery/${timestamp}_${currentFile.value.name}`
      const fileRef = storageRef(storage, fileName)
      
      await uploadBytes(fileRef, currentFile.value)
      imageUrl = await getDownloadURL(fileRef)
      currentFile.value = null
    }

    const data = {
      title: formData.value.title,
      category: formData.value.category,
      description: formData.value.description || '',
      imageUrl: imageUrl
    }

    if (isEditing.value) {
      // Mise à jour
      await updateDoc(doc(db, 'gallery', formData.value.id), {
        ...data,
        updatedAt: serverTimestamp()
      })
      showStatus('✅ Image mise à jour avec succès!')
    } else {
      // Créer
      await addDoc(collection(db, 'gallery'), {
        ...data,
        createdAt: serverTimestamp()
      })
      showStatus('✅ Image ajoutée avec succès!')
    }

    await loadGallery()
    resetForm()
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  } finally {
    isSubmitting.value = false
    isUploadingImage.value = false
  }
}

// Confirmer la suppression
const confirmDelete = (image) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${image.title}"?`)) {
    deleteImageMethod(image.id)
  }
}

// Supprimer une image
const deleteImageMethod = async (id) => {
  try {
    statusMessage.value = '⏳ Suppression...'
    await deleteDoc(doc(db, 'gallery', id))
    await loadGallery()
    showStatus('✅ Image supprimée avec succès!')
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  }
}

// Charger au montage
onMounted(() => {
  loadGallery()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
