<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6" style="color: #016E98">Demandes de Devis</h2>
    
    <div class="mb-4 flex gap-2">
      <button
        @click="loadQuotes"
        class="px-4 py-2 rounded text-white"
        style="background-color: #0392C7"
      >
        Actualiser
      </button>
      <span class="text-sm text-gray-600 pt-2">{{ quotes.length }} devis</span>
    </div>

    <!-- Message si aucun devis -->
    <div v-if="quotes.length === 0" class="text-center py-8 text-gray-500">
      <p>Aucune demande de devis pour le moment.</p>
    </div>

    <!-- Tableau des devis -->
    <div v-else class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr style="background-color: #f5f5f5; border-bottom: 2px solid #016E98">
            <th class="text-left p-3 font-semibold" style="color: #016E98">Nom</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Email</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Service</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Budget</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Date</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Statut</th>
            <th class="text-left p-3 font-semibold" style="color: #016E98">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="quote in quotes"
            :key="quote.id"
            style="border-bottom: 1px solid #ddd"
            :style="{ 'background-color': quote.status === 'new' ? '#fff9e6' : '#f9f9f9' }"
          >
            <td class="p-3 font-semibold">{{ quote.firstName }} {{ quote.lastName }}</td>
            <td class="p-3 text-sm">{{ quote.email }}</td>
            <td class="p-3 text-sm">{{ quote.serviceName }}</td>
            <td class="p-3 text-sm">{{ quote.budget || 'N/A' }} FCFA</td>
            <td class="p-3 text-sm">{{ formatDate(quote.createdAt) }}</td>
            <td class="p-3">
              <span
                v-if="quote.status === 'new'"
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #FF9D35"
              >
                Nouveau
              </span>
              <span
                v-else-if="quote.status === 'viewed'"
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #0392C7"
              >
                Consulté
              </span>
              <span
                v-else
                class="px-3 py-1 rounded text-white text-sm"
                style="background-color: #1abc9c"
              >
                Traité
              </span>
            </td>
            <td class="p-3 space-x-2">
              <button
                @click="viewQuote(quote)"
                class="text-white px-3 py-1 rounded text-sm"
                style="background-color: #0392C7"
              >
                Voir
              </button>
              <button
                @click="deleteQuote(quote.id)"
                class="text-white px-3 py-1 rounded text-sm"
                style="background-color: #e74c3c"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de vue détaillée -->
    <div
      v-if="selectedQuote"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 my-8">
        <h3 class="text-2xl font-bold mb-6" style="color: #016E98">
          Devis de {{ selectedQuote.firstName }} {{ selectedQuote.lastName }}
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <!-- Colonne gauche -->
          <div class="space-y-4">
            <div>
              <label class="font-semibold" style="color: #016E98">Service :</label>
              <p class="text-gray-700">{{ selectedQuote.serviceName }}</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Nom Complet :</label>
              <p class="text-gray-700">{{ selectedQuote.firstName }} {{ selectedQuote.lastName }}</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Email :</label>
              <p class="text-gray-700">
                <a :href="`mailto:${selectedQuote.email}`" style="color: #0392C7" class="hover:underline">
                  {{ selectedQuote.email }}
                </a>
              </p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Téléphone :</label>
              <p class="text-gray-700">
                <a :href="`tel:${selectedQuote.phone}`" style="color: #0392C7" class="hover:underline">
                  {{ selectedQuote.phone }}
                </a>
              </p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Entreprise :</label>
              <p class="text-gray-700">{{ selectedQuote.company || 'N/A' }}</p>
            </div>
          </div>

          <!-- Colonne droite -->
          <div class="space-y-4">
            <div>
              <label class="font-semibold" style="color: #016E98">Adresse :</label>
              <p class="text-gray-700 text-sm">{{ selectedQuote.address }}</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Adresse d'installation :</label>
              <p class="text-gray-700 text-sm">{{ selectedQuote.installationAddress || 'Non spécifiée' }}</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Budget estimé :</label>
              <p class="text-gray-700 font-bold" style="color: #FF9D35">{{ selectedQuote.budget || 'N/A' }} FCFA</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Date :</label>
              <p class="text-gray-700 text-sm">{{ formatDate(selectedQuote.createdAt) }}</p>
            </div>
            <div>
              <label class="font-semibold" style="color: #016E98">Statut :</label>
              <p class="text-gray-700">
                <span
                  class="px-3 py-1 rounded text-white text-sm"
                  :style="{ 'background-color': getStatusColor(selectedQuote.status) }"
                >
                  {{ getStatusLabel(selectedQuote.status) }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <!-- Détails du service -->
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 class="font-bold mb-4" style="color: #016E98">Détails du service</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div v-if="selectedQuote.energyConsumption">
              <p class="text-gray-600"><strong>Consommation d'énergie :</strong> {{ selectedQuote.energyConsumption }} kWh/mois</p>
            </div>
            <div v-if="selectedQuote.roofArea">
              <p class="text-gray-600"><strong>Surface de toiture :</strong> {{ selectedQuote.roofArea }} m²</p>
            </div>
            <div v-if="selectedQuote.buildingType">
              <p class="text-gray-600"><strong>Type de bâtiment :</strong> {{ selectedQuote.buildingType }}</p>
            </div>
            <div v-if="selectedQuote.appliances">
              <p class="text-gray-600"><strong>Électroménagers :</strong> {{ selectedQuote.appliances }}</p>
            </div>
            <div v-if="selectedQuote.installationType">
              <p class="text-gray-600"><strong>Type d'installation :</strong> {{ selectedQuote.installationType }}</p>
            </div>
            <div v-if="selectedQuote.power">
              <p class="text-gray-600"><strong>Puissance requise :</strong> {{ selectedQuote.power }} kW</p>
            </div>
            <div v-if="selectedQuote.areaToClimate">
              <p class="text-gray-600"><strong>Surface à climatiser :</strong> {{ selectedQuote.areaToClimate }} m²</p>
            </div>
            <div v-if="selectedQuote.spaceType">
              <p class="text-gray-600"><strong>Type d'espace :</strong> {{ selectedQuote.spaceType }}</p>
            </div>
            <div v-if="selectedQuote.climateType">
              <p class="text-gray-600"><strong>Type d'installation climatisation :</strong> {{ selectedQuote.climateType }}</p>
            </div>
            <div v-if="selectedQuote.waterPoints">
              <p class="text-gray-600"><strong>Points d'eau :</strong> {{ selectedQuote.waterPoints }}</p>
            </div>
            <div v-if="selectedQuote.equipmentType">
              <p class="text-gray-600"><strong>Type d'équipement :</strong> {{ selectedQuote.equipmentType }}</p>
            </div>
            <div v-if="selectedQuote.quantity">
              <p class="text-gray-600"><strong>Quantité :</strong> {{ selectedQuote.quantity }}</p>
            </div>
            <div v-if="selectedQuote.consultingType">
              <p class="text-gray-600"><strong>Type de consulting :</strong> {{ selectedQuote.consultingType }}</p>
            </div>
            <div v-if="selectedQuote.projectField">
              <p class="text-gray-600"><strong>Domaine du projet :</strong> {{ selectedQuote.projectField }}</p>
            </div>
          </div>
        </div>

        <!-- Message additionnel -->
        <div v-if="selectedQuote.message" class="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 class="font-bold mb-2" style="color: #016E98">Message additionnel</h4>
          <p class="text-gray-700 whitespace-pre-wrap text-sm">{{ selectedQuote.message }}</p>
        </div>

        <!-- Métadonnées -->
        <div v-if="selectedQuote.ipAddress" class="text-xs text-gray-500 mb-4">
          <p>IP: {{ selectedQuote.ipAddress }}</p>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 justify-end">
          <button
            @click="selectedQuote = null"
            class="px-4 py-2 rounded text-gray-700 border"
            style="border-color: #016E98"
          >
            Fermer
          </button>
          <button
            v-if="selectedQuote.status === 'new'"
            @click="markAsViewed(selectedQuote.id); selectedQuote = null"
            class="px-4 py-2 rounded text-white"
            style="background-color: #1abc9c"
          >
            Marquer comme consulté
          </button>
          <a
            :href="`mailto:${selectedQuote.email}`"
            class="px-4 py-2 rounded text-white"
            style="background-color: #0392C7"
          >
            Répondre
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

const quotes = ref([])
const selectedQuote = ref(null)

const loadQuotes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'quotes'))
    quotes.value = snapshot.docs
      .map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      .sort((a, b) => {
        const timeA = a.createdAt?.toDate?.() || new Date(0)
        const timeB = b.createdAt?.toDate?.() || new Date(0)
        return timeB - timeA
      })
  } catch (error) {
    console.error('Erreur chargement devis:', error)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate?.() || new Date(timestamp)
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const getStatusColor = (status) => {
  const colors = {
    'new': '#FF9D35',
    'viewed': '#0392C7',
    'processed': '#1abc9c'
  }
  return colors[status] || '#999'
}

const getStatusLabel = (status) => {
  const labels = {
    'new': 'Nouveau',
    'viewed': 'Consulté',
    'processed': 'Traité'
  }
  return labels[status] || status
}

const viewQuote = (quote) => {
  selectedQuote.value = quote
  if (quote.status === 'new') {
    markAsViewed(quote.id)
  }
}

const markAsViewed = async (quoteId) => {
  try {
    await updateDoc(doc(db, 'quotes', quoteId), {
      status: 'viewed'
    })
    await loadQuotes()
  } catch (error) {
    console.error('Erreur mise à jour:', error)
  }
}

const deleteQuote = async (quoteId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
    try {
      await deleteDoc(doc(db, 'quotes', quoteId))
      await loadQuotes()
      selectedQuote.value = null
    } catch (error) {
      console.error('Erreur suppression:', error)
    }
  }
}

onMounted(() => {
  loadQuotes()
})
</script>
