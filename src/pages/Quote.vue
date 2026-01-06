<template>
  <div>
    <!-- Hero Section -->
    <section 
      class="relative overflow-visible -mt-32 pt-0 pb-20 md:pb-32 bg-gradient-to-br from-blue-900 via-blue-800 to-dark"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div class="flex items-center justify-center">
          <div class="z-10 max-w-3xl text-center">
            <h1 class="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              DEMANDE DE
              <span class="text-secondary">DEVIS</span>
            </h1>
            <p class="text-white text-lg mb-8 opacity-100">
              Remplissez ce formulaire pour recevoir un devis personnalisé adapté à vos besoins énergétiques.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Form Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Progress Bar -->
        <div class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1">
              <div 
                :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300',
                  currentStep === index 
                    ? 'bg-secondary text-white scale-110' 
                    : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                ]"
              >
                <template v-if="index < currentStep">
                  <i class="fas fa-check"></i>
                </template>
                <template v-else>
                  {{ index + 1 }}
                </template>
              </div>
              <div 
                v-if="index < steps.length - 1" 
                :class="[
                  'flex-1 h-1 mx-2 transition-all duration-300',
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
            </div>
          </div>
          <div class="text-center text-gray-600">
            <p class="font-semibold">Étape {{ currentStep + 1 }} de {{ steps.length }}: {{ steps[currentStep].title }}</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Step 1: Général -->
          <div v-if="currentStep === 0" class="space-y-6 animate-fadeIn">
            <h2 class="text-3xl font-black text-[#05075F] mb-8">{{ steps[0].title }}</h2>
            <p class="text-gray-600 mb-6">Données générales du projet</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Prénom *</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  placeholder="Jean"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Nom *</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  placeholder="Dupont"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Email *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jean@example.com"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Téléphone *</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+228 XX XX XX XX"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Société</label>
                <input 
                  v-model="form.company"
                  type="text" 
                  placeholder="Votre entreprise"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Fonction</label>
                <input 
                  v-model="form.position"
                  type="text" 
                  placeholder="Votre fonction"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3">Adresse *</label>
              <input 
                v-model="form.address"
                type="text" 
                placeholder="Votre adresse"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3">Adresse d'installation</label>
              <input 
                v-model="form.installationAddress"
                type="text" 
                placeholder="Adresse d'installation (si différente)"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
              />
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p class="font-bold">⚠️ Erreur</p>
              <p>{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Step 2: Technique -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeIn">
            <h2 class="text-3xl font-black text-[#05075F] mb-8">{{ steps[1].title }}</h2>
            <p class="text-gray-600 mb-6">Données techniques du projet</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Type de client *</label>
                <select 
                  v-model="form.clientType"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="particulier">Particulier</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Consommation électrique (kWh/mois)</label>
                <input 
                  v-model="form.consumption"
                  type="number" 
                  placeholder="500"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Surface à couvrir (m²)</label>
                <input 
                  v-model="form.area"
                  type="number" 
                  placeholder="100"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Budget estimé (FCFA)</label>
                <input 
                  v-model="form.budget"
                  type="number" 
                  placeholder="1000000"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3">Services souhaités</label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="energie-solaire"
                    class="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F]">Énergie Solaire</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="climatisation"
                    class="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F]">Climatisation & Froid</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="electricite"
                    class="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F]">Électricité Générale</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="installation"
                    class="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F]">Installation & Maintenance</span>
                </label>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p class="font-bold">⚠️ Erreur</p>
              <p>{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Step 3: Objectif -->
          <div v-if="currentStep === 2" class="space-y-6 animate-fadeIn">
            <h2 class="text-3xl font-black text-[#05075F] mb-8">{{ steps[2].title }}</h2>
            <p class="text-gray-600 mb-6">Votre objectif</p>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3">Objectif principal *</label>
              <select 
                v-model="form.objective"
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] focus:outline-none focus:border-secondary transition-colors duration-300"
                required
              >
                <option value="">Sélectionnez un objectif</option>
                <option value="autonomie">Atteindre l'autonomie énergétique</option>
                <option value="reduction">Réduire ma facture d'électricité</option>
                <option value="ecologie">Adopter une solution écologique</option>
                <option value="fiabilite">Améliorer la fiabilité de l'électricité</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3">Message supplémentaire</label>
              <textarea 
                v-model="form.message"
                rows="6"
                placeholder="Décrivez vos besoins, contraintes ou spécificités du projet..."
                class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300 resize-none"
              ></textarea>
            </div>

            <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <input 
                v-model="form.terms"
                type="checkbox" 
                class="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                required
              />
              <label class="text-[#05075F] text-sm">
                J'accepte les conditions d'utilisation et la politique de confidentialité
              </label>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p class="font-bold">⚠️ Erreur</p>
              <p>{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-between pt-8 border-t border-gray-200">
            <button 
              v-if="currentStep > 0"
              type="button"
              @click="previousStep"
              class="bg-gray-200 hover:bg-gray-300 text-[#05075F] px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Précédent
            </button>
            <div v-else></div>

            <button 
              v-if="currentStep < steps.length - 1"
              type="button"
              @click="nextStep"
              class="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Suivant
            </button>

            <button 
              v-if="currentStep === steps.length - 1"
              type="submit"
              class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-colors duration-300"
            >
              Envoyer le devis
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="submitMessage" class="mt-8 p-6 rounded-lg" :class="submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          <p class="font-bold mb-2">{{ submitSuccess ? 'Succès!' : 'Erreur' }}</p>
          <p>{{ submitMessage }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const submitMessage = ref('')
const submitSuccess = ref(false)
const errorMessage = ref('')

const steps = [
  { title: 'Général', description: 'Données générales' },
  { title: 'Technique', description: 'Données techniques' },
  { title: 'Objectif', description: 'Votre objectif' }
]

const form = ref({
  // Step 1
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  address: '',
  installationAddress: '',
  // Step 2
  clientType: '',
  consumption: '',
  area: '',
  budget: '',
  services: [],
  // Step 3
  objective: '',
  message: '',
  terms: false
})

const validateStep = (step) => {
  errorMessage.value = ''

  if (step === 0) {
    // Validation Step 1: Général
    if (!form.value.firstName.trim()) {
      errorMessage.value = 'Veuillez entrer votre prénom'
      return false
    }
    if (!form.value.lastName.trim()) {
      errorMessage.value = 'Veuillez entrer votre nom'
      return false
    }
    if (!form.value.email.trim()) {
      errorMessage.value = 'Veuillez entrer votre email'
      return false
    }
    if (!form.value.email.includes('@')) {
      errorMessage.value = 'Veuillez entrer un email valide'
      return false
    }
    if (!form.value.phone.trim()) {
      errorMessage.value = 'Veuillez entrer votre numéro de téléphone'
      return false
    }
    if (!form.value.address.trim()) {
      errorMessage.value = 'Veuillez entrer votre adresse'
      return false
    }
  }

  if (step === 1) {
    // Validation Step 2: Technique
    if (!form.value.clientType) {
      errorMessage.value = 'Veuillez sélectionner le type de client'
      return false
    }
    if (!form.value.consumption.trim()) {
      errorMessage.value = 'Veuillez entrer votre consommation'
      return false
    }
    if (!form.value.area.trim()) {
      errorMessage.value = 'Veuillez entrer la surface'
      return false
    }
    if (!form.value.budget) {
      errorMessage.value = 'Veuillez sélectionner un budget'
      return false
    }
    if (form.value.services.length === 0) {
      errorMessage.value = 'Veuillez sélectionner au moins un service'
      return false
    }
  }

  if (step === 2) {
    // Validation Step 3: Objectif
    if (!form.value.objective) {
      errorMessage.value = 'Veuillez sélectionner votre objectif principal'
      return false
    }
    if (!form.value.terms) {
      errorMessage.value = 'Vous devez accepter les conditions d\'utilisation'
      return false
    }
  }

  return true
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  }
}

const previousStep = () => {
  errorMessage.value = ''
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const handleSubmit = () => {
  if (!validateStep(currentStep.value)) {
    submitSuccess.value = false
    return
  }

  // Simuler l'envoi
  submitMessage.value = 'Merci! Votre demande de devis a été reçue. Notre équipe vous contactera très bientôt pour discuter de votre projet.'
  submitSuccess.value = true

  // Réinitialiser le formulaire
  setTimeout(() => {
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      address: '',
      installationAddress: '',
      clientType: '',
      consumption: '',
      area: '',
      budget: '',
      services: [],
      objective: '',
      message: '',
      terms: false
    }
    currentStep.value = 0
    submitMessage.value = ''
    errorMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
