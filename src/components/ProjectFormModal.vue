<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 border-b flex justify-between items-center">
        <h2 class="text-2xl font-bold text-white">
          {{ project ? '✎ Éditer le Projet' : '➕ Ajouter un Projet' }}
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
            placeholder="Ex: Installation Solaire Résidentielle"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p v-if="errors.title" class="text-red-600 text-xs mt-1">{{ errors.title }}</p>
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Slug (URL-friendly) *</label>
          <input 
            v-model="form.slug"
            type="text"
            placeholder="installation-solaire-residential"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
          />
          <p v-if="errors.slug" class="text-red-600 text-xs mt-1">{{ errors.slug }}</p>
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Catégorie *</label>
          <input 
            v-model="form.category"
            type="text"
            placeholder="Ex: Énergie Solaire"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p v-if="errors.category" class="text-red-600 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <!-- Localisation -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Localisation *</label>
          <input 
            v-model="form.location"
            type="text"
            placeholder="Ex: Lomé, Togo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p v-if="errors.location" class="text-red-600 text-xs mt-1">{{ errors.location }}</p>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Date *</label>
          <input 
            v-model="form.date"
            type="text"
            placeholder="Ex: Décembre 2023"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <p v-if="errors.date" class="text-red-600 text-xs mt-1">{{ errors.date }}</p>
        </div>

        <!-- Image Principale -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Image principale *</label>
          <div 
            @dragover.prevent="dragOverImage = true"
            @dragleave.prevent="dragOverImage = false"
            @drop.prevent="dragOverImage = false; const files = $event.dataTransfer.files; if (files.length) handleImageFile(files[0])"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors"
            :class="dragOverImage ? 'border-green-500 bg-green-50' : 'hover:border-gray-400'"
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
              class="text-green-600 hover:text-green-700 font-semibold"
            >
              <i class="fas fa-cloud-upload-alt text-3xl mb-2"></i>
              <p>Glissez une image ou cliquez pour sélectionner</p>
            </button>
          </div>

          <!-- Image Preview -->
          <div v-if="form.mainImage" class="mt-4">
            <img 
              :src="form.mainImage"
              alt="Preview"
              class="max-w-xs rounded-lg"
              @error="(e) => e.target.src = 'https://via.placeholder.com/300'"
            />
          </div>

          <p v-if="errors.mainImage" class="text-red-600 text-xs mt-1">{{ errors.mainImage }}</p>
        </div>

        <!-- Description courte -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Description courte *</label>
          <textarea 
            v-model="form.description"
            placeholder="Brève description du projet"
            rows="3"
            maxlength="300"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/300 caractères</p>
          <p v-if="errors.description" class="text-red-600 text-xs mt-1">{{ errors.description }}</p>
        </div>

        <!-- Détails (HTML) -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">Détails du projet *</label>
          <textarea 
            v-model="form.details"
            placeholder="Détails complets avec HTML (balises h3, ul, li, etc.)"
            rows="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-xs"
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">Vous pouvez utiliser du HTML: &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.</p>
          <p v-if="errors.details" class="text-red-600 text-xs mt-1">{{ errors.details }}</p>
        </div>

        <!-- Boutons d'action -->
        <div class="flex gap-4 pt-6 border-t">
          <button 
            @click="$emit('close')"
            type="button"
            class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 transition-colors"
          >
            Annuler
          </button>
          <button 
            @click="submitForm"
            :disabled="saving"
            type="button"
            class="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <i v-if="saving" class="fas fa-spinner animate-spin"></i>
            {{ saving ? 'Sauvegarde...' : (project ? '💾 Mettre à jour' : '➕ Créer') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFirebaseData } from '../composables/useFirebaseData'

const emit = defineEmits(['close', 'refresh'])

const props = defineProps({
  project: {
    type: Object,
    default: null
  }
})

const { addProject, updateProject } = useFirebaseData()
const imageInput = ref(null)
const dragOverImage = ref(false)
const saving = ref(false)

const form = ref({
  title: '',
  slug: '',
  category: '',
  location: '',
  date: '',
  mainImage: '',
  description: '',
  details: ''
})

const errors = ref({
  title: '',
  slug: '',
  category: '',
  location: '',
  date: '',
  mainImage: '',
  description: '',
  details: ''
})

onMounted(() => {
  if (props.project) {
    form.value = {
      title: props.project.title,
      slug: props.project.slug,
      category: props.project.category,
      location: props.project.location,
      date: props.project.date,
      mainImage: props.project.mainImage,
      description: props.project.description,
      details: props.project.details
    }
  }
})

const generateSlug = () => {
  form.value.slug = form.value.title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const handleImageSelect = (e) => {
  const files = e.target.files
  if (files.length > 0) {
    handleImageFile(files[0])
  }
}

const handleImageFile = (file) => {
  if (!file.type.startsWith('image/')) {
    errors.value.mainImage = '❌ Veuillez sélectionner une image'
    return
  }

  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > 5) {
    errors.value.mainImage = `❌ Image trop grosse (${fileSizeMB.toFixed(1)}MB). Maximum 5MB.`
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    compressImage(e.target.result, (compressedBase64) => {
      form.value.mainImage = compressedBase64
      errors.value.mainImage = ''
    })
  }
  reader.readAsDataURL(file)
}

const compressImage = (base64Data, callback) => {
  const img = new Image()
  img.onload = () => {
    const canvas = document.createElement('canvas')
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
    
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
    callback(compressedBase64)
  }
  img.src = base64Data
}

const validateForm = () => {
  errors.value.title = !form.value.title.trim() ? '❌ Le titre est requis' : ''
  errors.value.slug = !form.value.slug.trim() ? '❌ Le slug est requis' : ''
  errors.value.category = !form.value.category.trim() ? '❌ La catégorie est requise' : ''
  errors.value.location = !form.value.location.trim() ? '❌ La localisation est requise' : ''
  errors.value.date = !form.value.date.trim() ? '❌ La date est requise' : ''
  errors.value.mainImage = !form.value.mainImage ? '❌ L\'image est requise' : ''
  errors.value.description = !form.value.description.trim() ? '❌ La description est requise' : ''
  errors.value.details = !form.value.details.trim() ? '❌ Les détails sont requis' : ''

  return !Object.values(errors.value).some(e => e)
}

const submitForm = async () => {
  if (!validateForm()) return

  saving.value = true
  try {
    if (props.project) {
      await updateProject(props.project.id, form.value)
    } else {
      await addProject(form.value)
    }
    emit('refresh')
  } catch (err) {
    alert('❌ Erreur: ' + err.message)
  } finally {
    saving.value = false
  }
}
</script>
