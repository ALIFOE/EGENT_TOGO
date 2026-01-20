<template>
  <div class="space-y-6">
    <!-- Bouton Ajouter -->
    <button
      @click="showForm = !showForm"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
    >
      {{ showForm ? '✕ Annuler' : '+ Nouveau Produit' }}
    </button>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Modifier Produit' : 'Ajouter Produit' }}</h3>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Titre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Prix -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Prix</label>
            <input
              v-model="formData.price"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <input
              v-model="formData.category"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input
              v-model="formData.slug"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Description courte -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
          <input
            v-model="formData.shortDescription"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description complète</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <!-- Image Upload - Drag & Drop -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
          <div
            @drop="handleImageDrop"
            @dragover.prevent
            @dragenter.prevent
            class="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition"
          >
            <div v-if="!formData.mainImage" class="py-4">
              <p class="text-gray-600 mb-2">📷 Glissez-déposez votre image ici</p>
              <p class="text-sm text-gray-500 mb-4">ou cliquez pour sélectionner</p>
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
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Parcourir
              </button>
            </div>
            <div v-else class="py-4">
              <img
                :src="formData.mainImage"
                alt="Prévisualisation"
                class="max-h-48 mx-auto mb-4 rounded"
              />
              <button
                type="button"
                @click="formData.mainImage = ''"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Changer l'image
              </button>
            </div>
          </div>
          <p v-if="uploadStatus.error" class="text-red-600 text-sm mt-2">{{ uploadStatus.error }}</p>
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

    <!-- Tableau Produits -->
    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Titre</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Catégorie</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Prix</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phare</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" class="border-b border-gray-200 hover:bg-gray-50">
            <td class="px-4 py-3 text-sm text-gray-900">{{ product.title }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ product.category }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ product.price }}</td>
            <td class="px-4 py-3 text-sm">
              <span v-if="product.featured" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">⭐ Oui</span>
              <span v-else class="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Non</span>
            </td>
            <td class="px-4 py-3 text-sm space-x-2">
              <button
                @click="editProduct(product)"
                class="text-blue-600 hover:text-blue-900 font-medium"
              >
                Éditer
              </button>
              <button
                @click="deleteProductConfirm(product.id)"
                class="text-red-600 hover:text-red-900 font-medium"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message Vide -->
    <div v-if="products.length === 0" class="text-center py-12">
      <p class="text-gray-500 text-lg">Aucun produit. Créez-en un pour commencer.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'
import { useImageUpload } from '../composables/useImageUpload'

const { products: productsData, loading, error, addProduct, updateProduct, deleteProduct, initializeProducts } = useFirebaseData()
const products = computed(() => productsData.value || [])
const { uploadStatus, handleImageDrop: uploadImageDrop, handleFileSelect } = useImageUpload()

const showForm = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const fileInput = ref(null)

const formData = ref({
  name: '',
  slug: '',
  price: '',
  category: '',
  shortDescription: '',
  description: '',
  longDescription: '',
  mainImage: '',
  specs: []
})

const defaultFormData = () => ({
  name: '',
  slug: '',
  price: '',
  category: '',
  shortDescription: '',
  description: '',
  longDescription: '',
  mainImage: '',
  specs: []
})

onMounted(() => {
  initializeProducts()
})

function resetForm() {
  formData.value = defaultFormData()
  isEditing.value = false
  editingId.value = null
  showForm.value = false
}

function editProduct(product) {
  formData.value = { ...product }
  isEditing.value = true
  editingId.value = product.id
  showForm.value = true
}

async function handleImageDrop(event) {
  const images = await uploadImageDrop(event)
  if (images && images.length > 0) {
    formData.value.mainImage = images[0].src
    uploadStatus.value.error = null
  }
}

async function handleFileInput(event) {
  const files = event.target.files
  if (files && files.length > 0) {
    const images = await handleFileSelect(files)
    if (images && images.length > 0) {
      formData.value.mainImage = images[0].src
    }
  }
}

async function submitForm() {
  try {
    if (isEditing.value) {
      await updateProduct(editingId.value, formData.value)
    } else {
      await addProduct(formData.value)
    }
    resetForm()
  } catch (err) {
    console.error('Erreur formulaire:', err)
  }
}

async function deleteProductConfirm(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
    try {
      await deleteProduct(id)
    } catch (err) {
      console.error('Erreur suppression:', err)
    }
  }
}
</script>
