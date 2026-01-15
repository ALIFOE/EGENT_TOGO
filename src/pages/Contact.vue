<template>
  <div>
    <!-- Hero Section Contact -->
    <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative -mt-32 pt-0 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <!-- Grain effect overlay -->
      <div class="absolute inset-0 opacity-60" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 result=%22noise%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22 opacity=%220.4%22/></svg>'); background-size: 100px 100px;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <!-- Section Titre Hero -->
        <div id="hero-title" class="text-center">
          <p class="text-[#EE6D08] font-semibold mb-4 text-sm uppercase tracking-widest animate-slideInDown">Nous vous écoutons</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slideInDown animation-delay-200">
            Prenez <span class="text-[#EE6D08]">Contact</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-400">
            Vous avez une question ou un projet ? Notre équipe est à votre écoute pour vous aider à réaliser votre transition énergétique.
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <section class="bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div id="contact-cards" class="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          <!-- Contact Cards -->
          <div class="contact-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-secondary animate-fadeInUp" style="animation-delay: 0s">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-[#EE6D08]/10 flex items-center justify-center group-hover:bg-[#EE6D08] transition-all duration-300">
                <i class="fas fa-map-marker-alt text-[#EE6D08] text-2xl group-hover:text-white transition-all duration-300"></i>
              </div>
              <h3 class="text-xl font-black text-[#016E98]">Adresse</h3>
            </div>
            <p class="text-gray-600 leading-relaxed">
              Rue des Ouvriers, Imm. à deux étages<br>
              100 mètres du goudron<br>
              Totsi Gblenkomé - 04 BP 874<br>
              Lomé - Togo
            </p>
          </div>

          <div class="contact-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-secondary animate-fadeInUp" style="animation-delay: 0.1s">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-[#EE6D08]/10 flex items-center justify-center group-hover:bg-[#EE6D08] transition-all duration-300">
                <i class="fas fa-phone text-[#EE6D08] text-2xl group-hover:text-white transition-all duration-300"></i>
              </div>
              <h3 class="text-xl font-black text-[#016E98]">Téléphone</h3>
            </div>
            <div class="space-y-3">
              <a href="tel:+22892531455" class="text-gray-600 hover:text-secondary transition-colors block font-semibold">
                +228 92 53 14 55
              </a>
              <a href="tel:+22891204373" class="text-gray-600 hover:text-secondary transition-colors block font-semibold">
                +228 91 20 43 73
              </a>
            </div>
          </div>

          <div class="contact-card group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-gray-100 hover:border-secondary animate-fadeInUp" style="animation-delay: 0.2s">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 rounded-full bg-[#EE6D08]/10 flex items-center justify-center group-hover:bg-[#EE6D08] transition-all duration-300">
                <i class="fas fa-envelope text-[#EE6D08] text-2xl group-hover:text-white transition-all duration-300"></i>
              </div>
              <h3 class="text-xl font-black text-[#016E98]">Email</h3>
            </div>
            <div class="space-y-3">
              <a href="mailto:infos@egenttogo.com" class="text-gray-600 hover:text-secondary transition-colors block font-semibold break-all">
                infos@egenttogo.com
              </a>
              <p class="text-xs text-gray-500 mt-4">Réponse dans les 24h</p>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div id="contact-form" class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-16 animate-fadeInUp animation-delay-400">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-black text-[#EE6D08] mb-4 leading-tight">Envoyez-nous un message</h2>
            <p class="text-gray-600 text-lg mb-12">Remplissez le formulaire ci-dessous et notre équipe vous répondra au plus vite.</p>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name & Phone Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Nom & Prénom</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    placeholder="Jean Dupont"
                    class="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Téléphone</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    placeholder="+228 XX XX XX XX"
                    class="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <!-- Email & Subject Row -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Email</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    placeholder="jean@example.com"
                    class="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Objet</label>
                  <select 
                    v-model="form.subject"
                    class="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez un objet</option>
                    <option value="devis">Demander un devis</option>
                    <option value="info">Demander une information</option>
                    <option value="projet">Discuter d'un projet</option>
                    <option value="formation">Demande de formation</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="6"
                  placeholder="Décrivez votre demande en détail..."
                  class="w-full px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <!-- Checkbox -->
              <div class="flex items-start gap-3">
                <input 
                  v-model="form.agree"
                  type="checkbox" 
                  id="agree"
                  class="w-5 h-5 mt-1 rounded border-2 border-gray-300 text-secondary focus:ring-secondary cursor-pointer"
                />
                <label for="agree" class="text-gray-600 text-sm cursor-pointer">
                  J'accepte que mes données soient utilisées pour me recontacter concernant ma demande.
                </label>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                class="w-full bg-secondary hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl uppercase tracking-widest text-sm"
              >
                Envoyer le message
              </button>
            </form>

            <!-- Success Message -->
            <transition name="fade">
              <div v-if="submitMessage" :class="[
                'mt-6 p-6 rounded-xl font-semibold text-center transition-all duration-300 animate-pulse',
                submitSuccess 
                  ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                  : 'bg-red-100 text-red-800 border-2 border-red-300'
              ]">
                <i :class="[submitSuccess ? 'fas fa-check-circle mr-2' : 'fas fa-exclamation-circle mr-2']"></i>
                {{ submitMessage }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Horaires Section -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight animate-slideInDown">Nos <span class="text-[#EE6D08]">Horaires</span></h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-[#EE6D08] to-orange-500 rounded-full mx-auto animate-fadeInUp animation-delay-200"></div>
        </div>

        <div id="horaire-cards" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0s">
            <i class="fas fa-calendar-days text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-4">Jours de Semaine</h3>
            <p class="text-gray-100 font-semibold text-lg">Lundi - Vendredi</p>
            <p class="text-[#EE6D08] font-black text-2xl mt-2">08:00 - 18:00</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0.1s">
            <i class="fas fa-sun text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-4">Samedi</h3>
            <p class="text-gray-100 font-semibold text-lg">Samedi</p>
            <p class="text-[#EE6D08] font-black text-2xl mt-2">09:00 - 15:00</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0.2s">
            <i class="fas fa-moon text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-4">Dimanche</h3>
            <p class="text-gray-100 font-semibold text-lg">Fermé</p>
            <p class="text-[#EE6D08] font-black text-2xl mt-2">-</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section id="map-section" class="bg-white py-20 md:py-32 animate-fadeInUp">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#EE6D08] mb-4 leading-tight animate-slideInDown">Visitez-nous</h2>
          <p class="text-gray-600 text-lg animate-fadeInUp animation-delay-200">Trouvez notre localisation sur la carte</p>
        </div>
        <div class="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-96 border-4 border-gray-100 hover:shadow-3xl transition-all duration-300 animate-fadeInUp animation-delay-400">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.google.com/maps/d/u/0/embed?mid=1y_tbAMeuz_ifDLafJ3l6Y68Rn0bB8k0" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq-section" class="bg-gray-50 py-20 md:py-32">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#EE6D08] mb-4 leading-tight animate-slideInDown">Questions <span class="text-secondary">Fréquentes</span></h2>
          <p class="text-gray-600 text-lg animate-fadeInUp animation-delay-200">Trouvez les réponses à vos questions</p>
        </div>

        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden animate-fadeInUp" :style="{ animationDelay: (0.1 * (index + 1)) + 's' }">
            <button 
              @click="toggleFAQ(index)"
              class="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
            >
              <h3 class="text-lg font-black text-[#016E98] text-left">{{ faq.question }}</h3>
              <i :class="['fas transition-transform duration-300', expandedFAQ === index ? 'fa-chevron-up' : 'fa-chevron-down']" style="color: var(--secondary)"></i>
            </button>
            <transition name="expand">
              <div v-show="expandedFAQ === index" class="px-8 py-6 border-t-2 border-gray-100 bg-gray-50">
                <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'

useCursorFollowText()

// Animation refs
const heroTitleInView = ref(false)
const contactCardsInView = ref(false)
const contactFormInView = ref(false)
const horaireCardsInView = ref(false)
const mapSectionInView = ref(false)
const faqSectionInView = ref(false)

const expandedFAQ = ref(null)

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
  agree: false
})

const submitMessage = ref('')
const submitSuccess = ref(false)

const faqs = ref([
  {
    question: 'Quel est le délai de réponse à ma demande ?',
    answer: 'Nous répondons généralement à tous les messages dans les 24 heures ouvrables. Pour les demandes urgentes, n\'hésitez pas à nous appeler directement.'
  },
  {
    question: 'Proposez-vous des devis gratuits ?',
    answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous analysons votre projet et vous proposons la meilleure solution.'
  },
  {
    question: 'Faites-vous des interventions en dehors de Lomé ?',
    answer: 'Absolument ! Nous intervenons dans tout le Togo et l\'Afrique de l\'Ouest. Contactez-nous pour discuter de votre projet.'
  },
  {
    question: 'Offrez-vous une garantie sur les installations ?',
    answer: 'Oui, nous proposons une garantie complète sur nos installations et maintenons une disponibilité pour le suivi technique.'
  },
  // {
  //   question: 'Comment puis-je suivre ma demande ?',
  //   answer: 'Après soumission, un numéro de suivi vous sera attribué. Vous pourrez nous contacter avec ce numéro pour avoir des nouvelles de votre dossier.'
  // }
])

const toggleFAQ = (index) => {
  expandedFAQ.value = expandedFAQ.value === index ? null : index
}

// Setup Intersection Observer
const setupObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'hero-title') heroTitleInView.value = true
        if (entry.target.id === 'contact-cards') contactCardsInView.value = true
        if (entry.target.id === 'contact-form') contactFormInView.value = true
        if (entry.target.id === 'horaire-cards') horaireCardsInView.value = true
        if (entry.target.id === 'map-section') mapSectionInView.value = true
        if (entry.target.id === 'faq-section') faqSectionInView.value = true
      }
    });
  }, observerOptions)

  // Observe all sections
  const elements = [
    'hero-title',
    'contact-cards',
    'contact-form',
    'horaire-cards',
    'map-section',
    'faq-section'
  ]
  
  elements.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  setupObserver()
})

const handleSubmit = () => {
  // Validation basique
  if (!form.value.name || !form.value.phone || !form.value.email || !form.value.subject || !form.value.message || !form.value.agree) {
    submitMessage.value = 'Veuillez remplir tous les champs et accepter les conditions.'
    submitSuccess.value = false
    return
  }

  // Simuler l'envoi
  submitMessage.value = 'Merci pour votre message ! Nous vous recontacterons très bientôt.'
  submitSuccess.value = true

  // Réinitialiser le formulaire
  setTimeout(() => {
    form.value = { name: '', phone: '', email: '', subject: '', message: '', agree: false }
    submitMessage.value = ''
  }, 4000)
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.contact-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
