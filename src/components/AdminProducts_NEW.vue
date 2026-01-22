<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-gray-900">Gestion des Produits</h2>
      <button
        @click="showForm = !showForm"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center gap-2"
      >
        <i :class="showForm ? 'fas fa-times' : 'fas fa-plus'"></i>
        {{ showForm ? 'Annuler' : 'Nouveau Produit' }}
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
        {{ isEditing ? '✏️ Modifier Produit' : '➕ Créer Nouveau Produit' }}
      </h3>
      
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Grille Principale -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Nom -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Nom du Produit *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Ex: Armoire Billy"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Catégorie *</label>
            <input
              v-model="formData.category"
              type="text"
              required
              placeholder="Ex: Anti-délestage"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Prix -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Prix *</label>
            <input
              v-model="formData.price"
              type="text"
              required
              placeholder="Ex: 500 000 FCFA"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Slug (URL)</label>
            <input
              v-model="formData.slug"
              type="text"
              placeholder="auto-généré"
              class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        <!-- Description Courte -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description Courte</label>
          <input
            v-model="formData.shortDescription"
            type="text"
            placeholder="Décrivez le produit en une ligne"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Description Complète</label>
          <textarea
            v-model="formData.description"
            rows="4"
            placeholder="Description détaillée du produit"
            class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition resize-none"
          ></textarea>
        </div>

        <!-- Image Upload -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Image du Produit</label>
          <div
            @drop.prevent="handleImageDrop"
            @dragover.prevent
            class="border-3 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition bg-blue-50/50"
          >
            <div v-if="!formData.mainImage" class="space-y-3">
              <div class="text-4xl">🖼️</div>
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
            <div v-else class="space-y-4">
              <img
                :src="formData.mainImage"
                :alt="formData.name"
                class="max-h-64 mx-auto rounded-lg object-cover"
              />
              <button
                type="button"
                @click="formData.mainImage = ''"
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
            {{ isSubmitting ? 'Traitement...' : (isEditing ? 'Mettre à jour' : 'Créer') }}
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

    <!-- Tableau des Produits -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header du Tableau -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <i class="fas fa-box"></i>
          Produits ({{ products.length }})
        </h3>
      </div>

      <!-- Tableau -->
      <div v-if="products.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Prix</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-700">Image</th>
              <th class="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm text-gray-900 font-semibold">{{ product.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-700">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 font-semibold">{{ product.price }}</td>
              <td class="px-6 py-4 text-sm">
                <img 
                  v-if="product.mainImage" 
                  :src="product.mainImage" 
                  :alt="product.name"
                  class="h-10 w-10 rounded object-cover"
                />
                <span v-else class="text-gray-400 text-xs">Pas d'image</span>
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex justify-center gap-2">
                  <button
                    @click="editProduct(product)"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1"
                  >
                    <i class="fas fa-pen"></i>
                    Éditer
                  </button>
                  <button
                    @click="confirmDelete(product)"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1"
                  >
                    <i class="fas fa-trash"></i>
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Vide -->
      <div v-else class="p-8 text-center">
        <div class="text-5xl mb-4">📦</div>
        <p class="text-gray-600 text-lg font-semibold">Aucun produit trouvé</p>
        <p class="text-gray-500 text-sm">Cliquez sur "Nouveau Produit" pour en créer un</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs, query, orderBy, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

// État
const products = ref([])
const showForm = ref(false)
const isEditing = ref(false)
const isSubmitting = ref(false)
const statusMessage = ref('')
const fileInput = ref(null)

// Formulaire
const formData = ref({
  name: '',
  category: '',
  price: '',
  slug: '',
  shortDescription: '',
  description: '',
  mainImage: ''
})

const defaultFormData = {
  name: '',
  category: '',
  price: '',
  slug: '',
  shortDescription: '',
  description: '',
  mainImage: ''
}

// Charger les produits
const loadProducts = async () => {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (err) {
    console.error('Erreur chargement produits:', err)
    showStatus('❌ Erreur lors du chargement des produits', 'error')
  }
}

// Générer un slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a')
    .replace(/[ù]/g, 'u')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
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
  isEditing.value = false
  showForm.value = false
}

// Éditer un produit
const editProduct = (product) => {
  formData.value = { ...product }
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
  
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.mainImage = e.target.result
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
    if (!formData.value.name || !formData.value.category || !formData.value.price) {
      throw new Error('Les champs Nom, Catégorie et Prix sont obligatoires')
    }

    // Auto-générer le slug s'il est vide
    if (!formData.value.slug) {
      formData.value.slug = generateSlug(formData.value.name)
    }

    const data = {
      name: formData.value.name,
      category: formData.value.category,
      price: formData.value.price,
      slug: formData.value.slug,
      shortDescription: formData.value.shortDescription || '',
      description: formData.value.description || '',
      mainImage: formData.value.mainImage || ''
    }

    if (isEditing.value) {
      // Mise à jour
      await updateDoc(doc(db, 'products', formData.value.id), {
        ...data,
        updatedAt: serverTimestamp()
      })
      showStatus('✅ Produit mis à jour avec succès!')
    } else {
      // Créer
      await addDoc(collection(db, 'products'), {
        ...data,
        createdAt: serverTimestamp()
      })
      showStatus('✅ Produit créé avec succès!')
    }

    await loadProducts()
    resetForm()
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  } finally {
    isSubmitting.value = false
  }
}

// Confirmer la suppression
const confirmDelete = (product) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${product.name}"?`)) {
    deleteProductMethod(product.id)
  }
}

// Supprimer un produit
const deleteProductMethod = async (id) => {
  try {
    statusMessage.value = '⏳ Suppression...'
    await deleteDoc(doc(db, 'products', id))
    await loadProducts()
    showStatus('✅ Produit supprimé avec succès!')
  } catch (err) {
    console.error('Erreur:', err)
    showStatus(`❌ ${err.message}`, 'error')
  }
}

// Charger au montage
onMounted(() => {
  loadProducts()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
