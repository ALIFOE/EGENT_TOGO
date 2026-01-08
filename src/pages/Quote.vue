<template>
  <div>
    <!-- Hero Section Quote -->
    <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative -mt-32 pt-0 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <!-- Grain effect overlay -->
      <div class="absolute inset-0 opacity-60" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 result=%22noise%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22 opacity=%220.4%22/></svg>'); background-size: 100px 100px;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <!-- Section Titre Hero -->
        <div class="text-center">
          <p class="text-secondary font-semibold mb-4 text-sm uppercase tracking-widest">Obtenir un tarif personnalisé</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Demande de <span class="text-secondary">Devis</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Remplissez ce formulaire pour recevoir un devis personnalisé et gratuit, adapté à vos besoins énergétiques spécifiques.
          </p>
        </div>
      </div>
    </div>

    <!-- Quote Form Section -->
    <section class="bg-white py-20 md:py-32">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Progress Bar -->
        <div class="mb-16">
          <div class="flex items-center justify-between mb-8">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1">
              <div 
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 shadow-md',
                  currentStep === index 
                    ? 'bg-secondary text-white scale-110 shadow-lg' 
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
                  'flex-1 h-2 mx-3 rounded-full transition-all duration-300',
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
            </div>
          </div>
          <div class="text-center">
            <p class="text-gray-600 font-semibold text-lg">Étape {{ currentStep + 1 }} de {{ steps.length }}: <span class="text-secondary">{{ steps[currentStep].title }}</span></p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Step 1: Général -->
          <div v-if="currentStep === 0" class="space-y-6 animate-fadeIn">
            <div class="mb-8">
              <h2 class="text-4xl font-black text-[#05075F] mb-2">{{ steps[0].title }}</h2>
              <p class="text-gray-600 text-lg">Commençons par vos informations personnelles</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Prénom *</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  placeholder="Jean"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Nom *</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  placeholder="Dupont"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Email *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jean@example.com"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Téléphone *</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+228 XX XX XX XX"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Société</label>
                <input 
                  v-model="form.company"
                  type="text" 
                  placeholder="Votre entreprise"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Fonction</label>
                <input 
                  v-model="form.position"
                  type="text" 
                  placeholder="Votre fonction"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Adresse *</label>
              <input 
                v-model="form.address"
                type="text" 
                placeholder="Votre adresse"
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Adresse d'installation</label>
              <input 
                v-model="form.installationAddress"
                type="text" 
                placeholder="Adresse d'installation (si différente)"
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
              />
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Step 2: Technique -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeIn">
            <div class="mb-8">
              <h2 class="text-4xl font-black text-[#05075F] mb-2">{{ steps[1].title }}</h2>
              <p class="text-gray-600 text-lg">Décrivez vos besoins techniques</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Type de client *</label>
                <select 
                  v-model="form.clientType"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="particulier">Particulier</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Consommation (kWh/mois)</label>
                <input 
                  v-model="form.consumption"
                  type="number" 
                  placeholder="500"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Surface à couvrir (m²)</label>
                <input 
                  v-model="form.area"
                  type="number" 
                  placeholder="100"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>

              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                <input 
                  v-model="form.budget"
                  type="number" 
                  placeholder="1000000"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-4 uppercase tracking-widest">Services souhaités</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label class="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all duration-300">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="energie-solaire"
                    class="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F] font-semibold">Énergie Solaire</span>
                </label>
                <label class="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all duration-300">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="climatisation"
                    class="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F] font-semibold">Climatisation & Froid</span>
                </label>
                <label class="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all duration-300">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="electricite"
                    class="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F] font-semibold">Électricité Générale</span>
                </label>
                <label class="flex items-center p-4 border-2 border-gray-300 rounded-xl cursor-pointer hover:border-secondary hover:bg-gray-50 transition-all duration-300">
                  <input 
                    v-model="form.services" 
                    type="checkbox" 
                    value="installation"
                    class="w-5 h-5 text-secondary rounded focus:ring-2 focus:ring-secondary"
                  />
                  <span class="ml-3 text-[#05075F] font-semibold">Installation & Maintenance</span>
                </label>
              </div>
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Step 3: Objectif -->
          <div v-if="currentStep === 2" class="space-y-6 animate-fadeIn">
            <div class="mb-8">
              <h2 class="text-4xl font-black text-[#05075F] mb-2">{{ steps[2].title }}</h2>
              <p class="text-gray-600 text-lg">Présentez vos objectifs</p>
            </div>

            <div>
              <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Objectif principal *</label>
              <select 
                v-model="form.objective"
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
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
              <label class="block text-[#05075F] font-bold text-sm mb-3 uppercase tracking-widest">Message supplémentaire</label>
              <textarea 
                v-model="form.message"
                rows="6"
                placeholder="Décrivez vos besoins, contraintes ou spécificités du projet..."
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <div class="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <input 
                v-model="form.terms"
                type="checkbox" 
                id="terms"
                class="w-5 h-5 mt-1 text-secondary rounded focus:ring-2 focus:ring-secondary cursor-pointer flex-shrink-0"
                required
              />
              <label for="terms" class="text-[#05075F] text-sm cursor-pointer leading-relaxed">
                J'accepte les <span class="font-bold">conditions d'utilisation</span> et la <span class="font-bold">politique de confidentialité</span> de EGENT-TOGO.
              </label>
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-between pt-8 border-t-2 border-gray-200 gap-4">
            <button 
              v-if="currentStep > 0"
              type="button"
              @click="previousStep"
              class="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-[#05075F] rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              <i class="fas fa-arrow-left mr-2"></i>Précédent
            </button>
            <div v-else></div>

            <button 
              v-if="currentStep < steps.length - 1"
              type="button"
              @click="nextStep"
              class="px-8 py-4 bg-secondary hover:bg-orange-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Suivant<i class="fas fa-arrow-right ml-2"></i>
            </button>

            <button 
              v-if="currentStep === steps.length - 1"
              type="submit"
              class="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-widest"
            >
              <i class="fas fa-check-circle mr-2"></i>Envoyer le devis
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <transition name="slide">
          <div v-if="submitMessage" :class="[
            'mt-8 p-6 rounded-xl border-l-4 flex items-start gap-4 transition-all duration-300',
            submitSuccess 
              ? 'bg-green-100 text-green-800 border-l-green-500' 
              : 'bg-red-100 text-red-800 border-l-red-500'
          ]">
            <i :class="[submitSuccess ? 'fas fa-check-circle text-2xl' : 'fas fa-times-circle text-2xl', 'flex-shrink-0']"></i>
            <div>
              <p class="font-bold mb-2">{{ submitSuccess ? 'Succès!' : 'Erreur' }}</p>
              <p>{{ submitMessage }}</p>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Info Section -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <i class="fas fa-clock text-secondary text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Réponse Rapide</h3>
            <p class="text-gray-100">Nous répondons généralement dans les 24 heures</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <i class="fas fa-money-bill text-secondary text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Gratuit & Sans Engagement</h3>
            <p class="text-gray-100">Tous nos devis sont gratuits et sans frais</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <i class="fas fa-headset text-secondary text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Support Personnalisé</h3>
            <p class="text-gray-100">Une équipe dédiée pour vos questions</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStep = ref(0)
const errorMessage = ref('')
const submitMessage = ref('')
const submitSuccess = ref(false)

const steps = [
  { title: 'Général' },
  { title: 'Technique' },
  { title: 'Objectif' }
]

const form = ref({
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
})

const validateStep = () => {
  errorMessage.value = ''

  if (currentStep.value === 0) {
    if (!form.value.firstName.trim()) {
      errorMessage.value = 'Le prénom est requis'
      return false
    }
    if (!form.value.lastName.trim()) {
      errorMessage.value = 'Le nom est requis'
      return false
    }
    if (!form.value.email.trim()) {
      errorMessage.value = 'L\'email est requis'
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errorMessage.value = 'L\'email n\'est pas valide'
      return false
    }
    if (!form.value.phone.trim()) {
      errorMessage.value = 'Le téléphone est requis'
      return false
    }
    if (!form.value.address.trim()) {
      errorMessage.value = 'L\'adresse est requise'
      return false
    }
  }

  if (currentStep.value === 1) {
    if (!form.value.clientType) {
      errorMessage.value = 'Veuillez sélectionner un type de client'
      return false
    }
  }

  if (currentStep.value === 2) {
    if (!form.value.objective) {
      errorMessage.value = 'Veuillez sélectionner un objectif'
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
  if (validateStep()) {
    currentStep.value++
  }
}

const previousStep = () => {
  currentStep.value--
}

const handleSubmit = () => {
  if (validateStep()) {
    submitSuccess.value = true
    submitMessage.value = 'Merci ! Votre demande de devis a été envoyée avec succès. Notre équipe vous contactera sous peu.'
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      currentStep.value = 0
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
      submitMessage.value = ''
    }, 3000)
  }
}
</script>

<style scoped>
/* Input Focus Styles */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(255, 157, 53, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.4s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Button Hover Effects */
button:active {
  transform: scale(0.98);
}

/* Input Transitions */
input,
textarea,
select {
  transition: all 0.3s ease;
}

/* Checkbox and Radio Styling */
input[type="checkbox"],
input[type="radio"] {
  transition: all 0.2s ease;
}

input[type="checkbox"]:hover,
input[type="radio"]:hover {
  transform: scale(1.1);
}

/* Label Hover */
label {
  transition: color 0.3s ease;
}

label:hover {
  color: #FF9D35;
}
</style>
