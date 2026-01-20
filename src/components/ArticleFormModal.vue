<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-4 border-b flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">
          {{ article ? '✎ Éditer l\'Article' : '➕ Ajouter un Article' }}
        </h2>
        <button 
          @click="$emit('close')"
          class="text-white hover:text-gray-200 text-2xl"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <div class="p-6 space-y-6">
        <!-- Titre -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Titre *</label>
          <input 
            v-model="form.title"
            @input="generateSlug"
            type="text"
            placeholder="Ex: Inauguration du nouveau centre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p v-if="errors.title" class="text-red-600 text-xs mt-1">{{ errors.title }}</p>
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Slug (URL-friendly) *</label>
          <input 
            v-model="form.slug"
            type="text"
            placeholder="inauguration-nouveau-centre"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
          />
          <p class="text-xs text-gray-500 mt-1">Sera utilisé dans l'URL: /article/{{ form.slug }}</p>
          <p v-if="errors.slug" class="text-red-600 text-xs mt-1">{{ errors.slug }}</p>
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Catégorie *</label>
          <select 
            v-model="form.category"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Actualité">Actualité</option>
            <option value="Partenariat">Partenariat</option>
            <option value="Formation">Formation</option>
            <option value="Événement">Événement</option>
            <option value="Innovation">Innovation</option>
            <option value="Promotion">Promotion</option>
          </select>
          <p v-if="errors.category" class="text-red-600 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- Image -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Image de l'article *</label>
          <div 
            @dragover.prevent="dragOverImage = true"
            @dragleave.prevent="dragOverImage = false"
            @drop.prevent="handleImageDrop"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors"
            :class="dragOverImage ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'"
          >
            <input 
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              class="hidden"
              ref="imageInput"
            />
            <button 
              @click="$refs.imageInput.click()"
              type="button"
              class="text-blue-600 hover:text-blue-700 font-semibold"
            >
              <i class="fas fa-cloud-upload-alt text-3xl mb-2"></i>
              <p>Glissez une image ou cliquez pour sélectionner</p>
            </button>
          </div>

          <!-- Image Preview -->
          <div v-if="form.image" class="mt-4">
            <img 
              :src="form.image"
              alt="Preview"
              class="max-w-xs rounded-lg"
              @error="(e) => e.target.src = 'https://via.placeholder.com/300'"
            />
          </div>

          <p v-if="errors.image" class="text-red-600 text-xs mt-1">{{ errors.image }}</p>
        </div>

        <!-- Excerpt (Résumé) -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Résumé court (Excerpt) *</label>
          <textarea 
            v-model="form.excerpt"
            placeholder="Résumé court de l'article (apparaîtra sur la page de liste)"
            rows="3"
            maxlength="200"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">{{ form.excerpt.length }}/200 caractères</p>
          <p v-if="errors.excerpt" class="text-red-600 text-xs mt-1">{{ errors.excerpt }}</p>
        </div>

        <!-- Contenu HTML -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Contenu de l'article *</label>
          <QuillEditor 
            v-model="form.content"
            class="rounded-lg border border-gray-300"
          />
          <p class="text-xs text-gray-500 mt-2">
            💡 Utilisez l'éditeur ci-dessus pour formatter votre texte. Pas besoin de connaître le HTML!
          </p>
          <p v-if="errors.content" class="text-red-600 text-xs mt-1">{{ errors.content }}</p>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Date</label>
          <input 
            v-model="form.date"
            type="text"
            placeholder="Ex: 5 Jan 2026"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <!-- Auteur -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Auteur</label>
          <input 
            v-model="form.author"
            type="text"
            placeholder="Ex: EGENT-TOGO"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
        <button 
          @click="$emit('close')"
          class="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Annuler
        </button>
        <button 
          @click="submitForm"
          :disabled="saving"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
        >
          <span v-if="saving">⏳ Sauvegarde...</span>
          <span v-else>
            <i class="fas fa-save"></i> {{ article ? 'Mettre à jour' : 'Créer' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'
import QuillEditor from './QuillEditor.vue'

const props = defineProps({
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'close'])

const { addNews } = useFirebaseData()

const imageInput = ref(null)
const dragOverImage = ref(false)
const saving = ref(false)

const form = reactive({
  title: '',
  slug: '',
  category: '',
  image: '',
  excerpt: '',
  content: '',
  date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }),
  author: 'EGENT-TOGO'
})

const errors = reactive({
  title: '',
  slug: '',
  category: '',
  image: '',
  excerpt: '',
  content: ''
})

// Pré-remplir le formulaire si édition
watch(() => props.article, (newArticle) => {
  if (newArticle) {
    form.title = newArticle.title || ''
    form.slug = newArticle.slug || ''
    form.category = newArticle.category || ''
    form.image = newArticle.image || ''
    form.excerpt = newArticle.excerpt || ''
    form.content = newArticle.content || ''
    form.date = newArticle.date || ''
    form.author = newArticle.author || 'EGENT-TOGO'
  }
}, { immediate: true })

// Générer automatiquement le slug à partir du titre
const generateSlug = () => {
  const slug = form.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)
  
  // Ne générer que si on crée, pas si on édite
  if (!props.article) {
    form.slug = slug
  }
}

// Traiter le drop d'image
const handleImageDrop = (e) => {
  dragOverImage.value = false
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleImageFile(files[0])
  }
}

// Traiter la sélection d'image
const handleImageSelect = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    handleImageFile(files[0])
  }
}

// Convertir l'image en Base64 (avec compression)
const handleImageFile = (file) => {
  if (!file.type.startsWith('image/')) {
    errors.image = '❌ Veuillez sélectionner une image'
    return
  }

  // Vérifier taille initiale
  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > 5) {
    errors.image = `❌ Image trop grosse (${fileSizeMB.toFixed(1)}MB). Maximum 5MB.`
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    // Compresser l'image avant stockage
    compressImage(e.target.result, (compressedBase64) => {
      form.image = compressedBase64
      errors.image = ''
    })
  }
  reader.readAsDataURL(file)
}

// Compresser l'image (réduire dimensions et qualité)
const compressImage = (base64Data, callback) => {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
    
    // Réduire à 1200px max en largeur (bon pour web)
    let width = img.width
    let height = img.height
    const maxWidth = 1200
    
    if (width > maxWidth) {
      height = (height * maxWidth) / width
      width = maxWidth
    }
    
    canvas.width = width
    canvas.height = height
    
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
    
    // Convertir en JPEG avec qualité réduite (0.7 = 70%)
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
    callback(compressedBase64)
  }
  img.src = base64Data
}

// Valider le formulaire
const validateForm = () => {
  errors.title = ''
  errors.slug = ''
  errors.category = ''
  errors.image = ''
  errors.excerpt = ''
  errors.content = ''

  if (!form.title.trim()) errors.title = 'Le titre est requis'
  if (!form.slug.trim()) errors.slug = 'Le slug est requis'
  if (!form.category.trim()) errors.category = 'La catégorie est requise'
  if (!form.image) errors.image = 'L\'image est requise'
  if (!form.excerpt.trim()) errors.excerpt = 'Le résumé est requis'
  if (!form.content.trim()) errors.content = 'Le contenu est requis'

  return !Object.values(errors).some(e => e !== '')
}

// Soumettre le formulaire
const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  try {
    saving.value = true

    if (props.article) {
      // Édition - l'article existe
      emit('save', {
        title: form.title,
        slug: form.slug,
        category: form.category,
        image: form.image,
        excerpt: form.excerpt,
        content: form.content,
        date: form.date,
        author: form.author
      })
    } else {
      // Création - nouvel article
      await addNews({
        title: form.title,
        slug: form.slug,
        category: form.category,
        image: form.image,
        excerpt: form.excerpt,
        content: form.content,
        date: form.date,
        author: form.author
      })
      alert('✅ Article créé avec succès!')
      emit('close')
    }
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
textarea {
  font-family: 'Courier New', monospace;
  resize: vertical;
}
</style>
