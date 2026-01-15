<template>
  <div class="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen">
    <!-- Hero Section Services -->
    <div id="hero-section" class="relative overflow-visible pt-4 pb-12 md:pt-8 md:pb-20">
      <!-- Animated gradient background -->
      <!-- <div class="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-dark -z-10"></div> -->
      
      <!-- Grain effect overlay - Extended behind navbar -->
      <div class="absolute left-0 right-0 bottom-0 -top-32 opacity-60 -z-5" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.1%22 numOctaves=%225%22 result=%22noise%22 /><feColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 /></filter><rect width=%22100%22 height=%22100%22 fill=%22black%22 filter=%22url(%23noise)%22/></svg>'); background-size: 100px 100px;"></div>
      
      <!-- Animated blob elements -->
      <div class="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse -z-5"></div>
      <div class="absolute -bottom-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000 -z-5"></div>
      <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000 -z-5"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left content -->
          <div class="space-y-4 md:space-y-6 animate-fadeInUp animation-delay-200">
            <!-- Badge -->
            <div class="inline-block animate-slideInDown animation-delay-200">
              <div class="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-secondary font-bold text-xs md:text-sm inline-flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                <i class="fas fa-star text-lg"></i>
                NOS SERVICES
              </div>
            </div>

            <!-- Main heading with gradient -->
            <div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate-slideInDown animation-delay-400">
                <span class="text-[#016E98]">
                  SOLUTIONS
                </span>
                <br />
                <span class="bg-gradient-to-r from-[#EE6D08] to-orange-400 bg-clip-text text-transparent">
                  ÉNERGÉTIQUES
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="text-base md:text-lg text-[#016E98] leading-relaxed max-w-xl animate-fadeInUp animation-delay-600">
              Des solutions innovantes et durables pour tous vos besoins énergétiques. Notre expertise au service de votre confort et de votre économie.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 animate-fadeInUp animation-delay-800">
              <button @click="scrollToServices" class="group bg-gradient-to-r from-[#EE6D08] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Explorez nos services</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          <!-- Right side - Image with floating cards -->
          <div class="relative h-80 md:h-[450px] lg:h-[500px] animate-fadeInUp animation-delay-400">
            <!-- Main image -->
            <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl group animate-fadeInUp animation-delay-500">
              <img 
                src="/src/assets/images/panneau_montés.jpg" 
                alt="Services énergétiques"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent group-hover:from-dark/20 transition-all duration-700"></div>
            </div>

            <!-- Floating card 1 - Top right -->
            <div class="absolute top-4 md:top-8 -right-2 md:-right-4 lg:right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 animate-slideInDown animation-delay-600">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#EE6D08] to-orange-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-sun text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-base md:text-lg">Solaire</h3>
              </div>
              <p class="text-xs md:text-sm text-black">Énergie renouvelable et durable</p>
            </div>

            <!-- Floating card 2 - Bottom left -->
            <div class="absolute -bottom-2 md:-bottom-4 left-0 md:left-4 lg:left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 animate-fadeInUp animation-delay-700">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-500 to-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-tools text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-[#EE6D08] text-base md:text-lg">Expertise</h3>
              </div>
              <p class="text-xs md:text-sm text-black">Installation et maintenance</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div class="text-white/50 text-sm font-semibold flex flex-col items-center gap-2">
          <!-- <span>Découvrez plus</span> -->
          <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Services Cards with Images -->
    <section id="services-section" ref="servicesSection" class="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16 lg:mb-20 animate-fadeInUp animation-delay-200">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown animation-delay-200">Nos services</p>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#016E98] leading-tight mb-4 animate-slideInDown animation-delay-400">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES <span class="text-secondary">DURABLES</span></h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed animate-fadeInUp animation-delay-600">Découvrez nos services spécialisés en énergie renouvelable et solutions innovantes</p>
        </div>

        <!-- Services Grid - Responsive -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 lg:mb-16">
          <!-- Service 1: Énergie solaire -->
          <div 
            @click="navigateToService('energie-solaire')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-400 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/panneau_montés.jpg" 
                alt="Énergie solaire"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">ÉNERGIE<br>SOLAIRE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>

          <!-- Service 2: Électricité générale -->
          <div 
            @click="navigateToService('electricite-generale')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-500 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/photo_chantier.jpg" 
                alt="Électricité générale"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">ÉLECTRICITÉ<br>GÉNERALE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>

          <!-- Service 3: Climatisation & Froid -->
          <div 
            @click="navigateToService('climatisation-froid')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-600 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/chauffage_egent.jpg" 
                alt="Climatisation & Froid"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">CLIMATISATION <br>& FROID</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>

          <!-- Service 4: Plomberie -->
          <div 
            @click="navigateToService('plomberie')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-400 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/montage_panneau.jpg" 
                alt="Plomberie"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">PLOMBERIE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>

          <!-- Service 5: Fourniture d'Équipements -->
          <div 
            @click="navigateToService('fourniture-equipements')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-500 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/montage_panneau2.jpg" 
                alt="Fourniture d'équipements"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">FOURNITURE<br>D'ÉQUIPEMENTS</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>

          <!-- Service 6: Consulting -->
          <div 
            @click="navigateToService('consulting')"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-600 cursor-pointer">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/egent_reception.jpg" 
                alt="Consulting"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-4 sm:p-6 rounded-3xl">
              <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">CONSULTING</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <!-- <div class="text-center animate-fadeInUp animation-delay-800">
          <button class="bg-[#2F7914] hover:bg-[#1f5009] text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            En savoir plus
          </button>
        </div> -->
      </div>
    </section>



    <!-- CTA Section: Main d'oeuvre qualifiée -->
    <section id="maindoeuvre-section" class="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 shadow-2xl border border-blue-800/50 mx-4 md:mx-8 rounded-3xl my-8 md:my-12">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 opacity-40">
        <img 
          src="/src/assets/images/chauffage_egent.jpg" 
          alt="Main d'oeuvre qualifiée"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-blue-950/70"></div>

      <!-- Content - Centered -->
      <div class="relative w-full max-w-7xl mx-auto h-auto md:h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-12 md:py-16 space-y-6 animate-fadeInUp animation-delay-400">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight mb-4 md:mb-6 animate-slideInDown animation-delay-400">
          UNE MAIN D'ŒUVRE <span class="text-[#EE6D08]">QUALIFIÉE</span> DISPONIBLE 7/7
        </h2>
        
        <p class="text-white text-base sm:text-lg mb-6 md:mb-8 leading-relaxed opacity-95 max-w-2xl animate-fadeInUp animation-delay-600">
          Notre équipe de techniciens expérimentés est prête à intervenir à tout moment pour vos besoins énergétiques les plus urgents.
        </p>

        <button class="bg-[#FF9D35] hover:bg-orange-600 text-white px-6 sm:px-8 py-3 text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
          Contactez-nous
        </button>
      </div>
    </section>

    <!-- CTA Section: Pannes d'électricité -->
    <section id="pannes-section" class="relative overflow-hidden bg-gradient-to-r from-blue-50/80 to-blue-100/80 backdrop-blur-sm py-12 md:py-20 lg:py-32 border border-blue-200/50 rounded-3xl mx-4 md:mx-8 mb-8 md:mb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-6 animate-fadeInUp animation-delay-400">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-4 md:mb-6 animate-slideInDown animation-delay-400">
              DITES AU REVOIR AUX <span class="text-secondary">PANNES</span> D'ÉLECTRICITÉ
            </h2>
            
            <p class="text-gray-700 text-base sm:text-lg mb-6 md:mb-8 leading-relaxed animate-fadeInUp animation-delay-600">
              Nous vous proposons des solutions d'énergie renouvelable pour votre maison ou votre entreprise à des prix abordables. Une première étape vers un avenir plus vert.
            </p>

            <button class="bg-[#FF9D35] hover:bg-orange-600 text-white px-6 sm:px-8 py-3 text-base font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp animation-delay-800">
              Demander un devis
            </button>
          </div>

          <!-- Right Image -->
          <div class="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp animation-delay-500">
            <img 
              src="/src/assets/images/photo_chantier2.jpg" 
              alt="Solutions énergétiques"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'
import { useRouter } from 'vue-router'

const router = useRouter()

useCursorFollowText()

// Refs for section visibility
const servicesSection = ref(null)
const heroInView = ref(false)
const servicesInView = ref(false)
const mainDoeuvreInView = ref(false)
const pannesInView = ref(false)

const navigateToService = (slug) => {
  router.push(`/service/${slug}`)
}

const scrollToServices = () => {
  if (servicesSection.value) {
    servicesSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const setupObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero-section' && entry.isIntersecting) {
        heroInView.value = true
      }
      if (entry.target.id === 'services-section' && entry.isIntersecting) {
        servicesInView.value = true
      }
      if (entry.target.id === 'maindoeuvre-section' && entry.isIntersecting) {
        mainDoeuvreInView.value = true
      }
      if (entry.target.id === 'pannes-section' && entry.isIntersecting) {
        pannesInView.value = true
      }
    })
  }, options)

  document.getElementById('hero-section')?.addEventListener('load', () => {
    observer.observe(document.getElementById('hero-section'))
  })
  observer.observe(document.getElementById('hero-section'))
  observer.observe(document.getElementById('services-section'))
  observer.observe(document.getElementById('maindoeuvre-section'))
  observer.observe(document.getElementById('pannes-section'))
}

onMounted(() => {
  setupObserver()
})
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

.animate-slide-up {
  animation: slideUp 0.8s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out 0.2s backwards;
}

.animate-fade-in-delayed {
  animation: fadeIn 0.8s ease-out 0.4s backwards;
}

.animate-fade-in-delayed-2 {
  animation: fadeIn 0.8s ease-out 0.6s backwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
  opacity: 0;
}

/* Animation delay utilities */
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}

.delay-2000 {
  animation-delay: 2s;
}

.delay-4000 {
  animation-delay: 4s;
}
</style>
