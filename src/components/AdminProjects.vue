<template>
  <div class="space-y-6">
    <!-- Boutons d'action -->
    <div class="flex flex-wrap gap-3">
      <button
        @click="showForm = !showForm"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        {{ showForm ? '✕ Annuler' : '+ Nouveau Projet' }}
      </button>
    </div>

    <!-- Messages de statut -->
    <div v-if="statusMessage" :class="['rounded-lg p-4', statusMessage.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200']">
      {{ statusMessage }}
    </div>

    <!-- Formulaire -->
    <div v-if="showForm" class="bg-white p-6 rounded-lg border border-gray-200">
      <h3 class="text-lg font-semibold mb-4">{{ isEditing ? 'Modifier Projet' : 'Ajouter Projet' }}</h3>
      
      <form @submit.prevent="submitForm" class="space-y-4">
        <!-- Titre -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre du projet *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Installation Solaire Résidentielle"
          />
        </div>

        <!-- Catégorie et Localisation -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <input
              v-model="formData.category"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Énergie Solaire"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input
              v-model="formData.location"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Lomé, Togo"
            />
          </div>
        </div>

        <!-- Date et Slug -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              v-model="formData.date"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Décembre 2023"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input
              v-model="formData.slug"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="installation-solaire-residential"
            />
          </div>
        </div>

        <!-- Description courte -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
          <textarea
            v-model="formData.shortDescription"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Résumé court du projet"
          ></textarea>
        </div>

        <!-- Description complète -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description complète</label>
          <textarea
            v-model="formData.description"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Description détaillée du projet"
          ></textarea>
        </div>

        <!-- Image Upload - Drag & Drop -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Image principale</label>
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
                @click="$refs.fileInput.click()"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sélectionner une image
              </button>
            </div>
            <div v-else class="relative inline-block">
              <img :src="formData.mainImage" :alt="formData.title" class="h-32 rounded" />
              <button
                type="button"
                @click="formData.mainImage = ''"
                class="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Caractéristiques principales -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Caractéristiques principales</label>
          <div class="space-y-2">
            <div v-for="(char, idx) in formData.mainCharacteristics" :key="idx" class="flex gap-2">
              <input
                v-model="formData.mainCharacteristics[idx]"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="formData.mainCharacteristics.splice(idx, 1)"
                class="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
              >
                🗑️
              </button>
            </div>
            <button
              type="button"
              @click="formData.mainCharacteristics.push('')"
              class="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              + Ajouter une caractéristique
            </button>
          </div>
        </div>

        <!-- Avantages -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Avantages</label>
          <div class="space-y-2">
            <div v-for="(adv, idx) in formData.advantages" :key="idx" class="flex gap-2">
              <input
                v-model="formData.advantages[idx]"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                @click="formData.advantages.splice(idx, 1)"
                class="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg"
              >
                🗑️
              </button>
            </div>
            <button
              type="button"
              @click="formData.advantages.push('')"
              class="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              + Ajouter un avantage
            </button>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex gap-3 pt-4 border-t">
          <button
            v-if="isEditing"
            type="button"
            @click="deleteProject"
            class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
          >
            🗑️ Supprimer
          </button>
          <div class="flex-1"></div>
          <button
            type="button"
            @click="showForm = false"
            class="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="isSaving"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg inline-flex items-center gap-2"
          >
            <i v-if="!isSaving" class="fas fa-save"></i>
            <i v-else class="fas fa-spinner fa-spin"></i>
            {{ isSaving ? 'Sauvegarde...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Tableau des projets -->
    <div v-if="!showForm" class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="projects.length === 0" class="p-8 text-center text-gray-500">
        <p class="text-lg">Aucun projet. Cliquez sur "Nouveau Projet" pour commencer.</p>
      </div>
      <div v-else class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-900">Titre</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-900">Catégorie</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-900">Localisation</th>
              <th class="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
              <th class="px-6 py-4 text-center text-sm font-bold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr v-for="proj in projects" :key="proj.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img v-if="proj.mainImage" :src="proj.mainImage" :alt="proj.title" class="w-10 h-10 rounded object-cover" />
                  <span class="font-semibold text-gray-900">{{ proj.title }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{{ proj.category }}</span>
              </td>
              <td class="px-6 py-4 text-gray-600">{{ proj.location }}</td>
              <td class="px-6 py-4 text-gray-600">{{ proj.date }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <router-link
                    :to="`/projets/${proj.slug}`"
                    class="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-bold rounded transition"
                    target="_blank"
                    title="Voir le projet"
                  >
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <button
                    @click="editProject(proj)"
                    class="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold rounded transition"
                    title="Éditer"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="confirmDelete(proj)"
                    class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold rounded transition"
                    title="Supprimer"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['refresh'])

const showForm = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const statusMessage = ref('')
const fileInput = ref(null)

const formData = ref({
  title: '',
  category: '',
  location: '',
  date: '',
  slug: '',
  shortDescription: '',
  description: '',
  mainImage: '',
  mainCharacteristics: [],
  advantages: []
})

const resetForm = () => {
  formData.value = {
    title: '',
    category: '',
    location: '',
    date: '',
    slug: '',
    shortDescription: '',
    description: '',
    mainImage: '',
    mainCharacteristics: [],
    advantages: []
  }
  isEditing.value = false
}

const editProject = (project) => {
  // Les projets viennent déjà des props depuis Firebase, pas besoin de vérifier
  formData.value = JSON.parse(JSON.stringify(project))
  formData.value.id = project.id
  isEditing.value = true
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleImageDrop = (e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  if (files.length > 0) {
    readImage(files[0])
  }
}

const handleFileInput = (e) => {
  if (e.target.files.length > 0) {
    readImage(e.target.files[0])
  }
}

const readImage = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.mainImage = e.target.result
  }
  reader.readAsDataURL(file)
}

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a')
    .replace(/[ù]/g, 'u')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

const submitForm = async () => {
  if (!formData.value.title || !formData.value.category) {
    alert('Veuillez remplir au moins le titre et la catégorie')
    return
  }

  try {
    isSaving.value = true

    if (!formData.value.slug) {
      formData.value.slug = generateSlug(formData.value.title)
    }

    const projectData = {
      ...formData.value,
      mainCharacteristics: formData.value.mainCharacteristics.filter(c => c.trim()),
      advantages: formData.value.advantages.filter(a => a.trim())
    }

    if (isEditing.value) {
      if (!formData.value.id) {
        throw new Error('ID du projet manquant')
      }
      const projectRef = doc(db, 'projects', String(formData.value.id))
      await updateDoc(projectRef, {
        ...projectData,
        updatedAt: serverTimestamp()
      })
      statusMessage.value = '✅ Projet mis à jour avec succès!'
    } else {
      await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp()
      })
      statusMessage.value = '✅ Projet créé avec succès!'
    }

    setTimeout(() => {
      statusMessage.value = ''
      resetForm()
      showForm.value = false
      emit('refresh')
    }, 2000)
  } catch (error) {
    console.error('Erreur:', error)
    statusMessage.value = `❌ Erreur: ${error.message}`
  } finally {
    isSaving.value = false
  }
}

const confirmDelete = (project) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}"?`)) {
    deleteProject(project.id)
  }
}

const deleteProject = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error('ID du projet manquant')
    }
    const projectRef = doc(db, 'projects', String(projectId))
    await deleteDoc(projectRef)
    statusMessage.value = '✅ Projet supprimé avec succès!'

    setTimeout(() => {
      statusMessage.value = ''
      resetForm()
      showForm.value = false
      emit('refresh')
    }, 2000)
  } catch (error) {
    console.error('Erreur:', error)
    statusMessage.value = `❌ Erreur: ${error.message}`
  }
}

const importProjects = async () => {
  try {
    isImporting.value = true
    statusMessage.value = '⏳ Importation en cours...'

    // Importer les projets statiques
    const { projects: staticProjects } = await import('../data/projects.js')

    // Supprimer tous les projets existants
    const querySnapshot = await getDocs(collection(db, 'projects'))
    for (const docSnapshot of querySnapshot.docs) {
      await deleteDoc(doc(db, 'projects', docSnapshot.id))
    }

    // Ajouter les 4 projets statiques
    let count = 0
    for (const project of staticProjects) {
      try {
        const projectData = {
          id: project.id,
          slug: project.slug,
          title: project.title,
          category: project.category,
          location: project.location,
          date: project.date,
          description: project.description,
          shortDescription: project.shortDescription || project.description,
          details: project.details || '',
          mainImage: project.mainImage,
          images: project.images || [],
          results: project.results || [],
          mainCharacteristics: project.mainCharacteristics || [],
          advantages: project.advantages || [],
          team: project.team || [],
          testimonial: project.testimonial || {},
          createdAt: serverTimestamp(),
          importedAt: serverTimestamp(),
          isImported: true
        }

        await addDoc(collection(db, 'projects'), projectData)
        count++
      } catch (err) {
        console.error(`Erreur import ${project.slug}:`, err)
      }
    }

    statusMessage.value = `✅ ${count} projet(s) importé(s) avec succès!`
    setTimeout(() => {
      statusMessage.value = ''
      emit('refresh')
    }, 3000)
  } catch (error) {
    console.error('Erreur import:', error)
    statusMessage.value = `❌ Erreur: ${error.message}`
  } finally {
    isImporting.value = false
  }
}

const deleteAllProjects = async () => {
  if (!confirm('⚠️ ATTENTION: Ceci va supprimer TOUS les projets de la base de données!\n\nÊtes-vous absolument sûr?')) {
    return
  }

  try {
    isDeleting.value = true
    statusMessage.value = '⏳ Suppression en cours...'

    const querySnapshot = await getDocs(collection(db, 'projects'))
    const deletePromises = querySnapshot.docs.map(docSnapshot => 
      deleteDoc(doc(db, 'projects', docSnapshot.id))
    )
    
    await Promise.all(deletePromises)

    statusMessage.value = `✅ ${querySnapshot.docs.length} projet(s) supprimé(s)!`
    setTimeout(() => {
      statusMessage.value = ''
      emit('refresh')
    }, 2000)
  } catch (error) {
    console.error('Erreur suppression:', error)
    statusMessage.value = `❌ Erreur: ${error.message}`
  } finally {
    isDeleting.value = false
  }
}
</script>

<style scoped>
input, textarea {
  transition: all 0.2s;
}

input:focus, textarea:focus {
  @apply border-blue-500 shadow-lg;
}
</style>
