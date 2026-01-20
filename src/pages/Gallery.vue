<template>
  <div>
    <!-- Hero Section Gallery -->
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
          <p class="text-[#EE6D08] font-semibold mb-4 text-sm uppercase tracking-widest animate-slideInDown">Explorez nos réalisations</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slideInDown animation-delay-200">
            Nos <span class="text-[#EE6D08]">Réalisations</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-400">
            Découvrez nos projets innovants et réalisations concrètes en énergie renouvelable et solutions durables pour le Togo et l'Afrique de l'Ouest.
          </p>
        </div>
      </div>
    </div>

    <!-- Gallery Filter Section -->
    <section class="bg-white py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Buttons -->
        <div id="filter-buttons" class="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          <button 
            v-for="(category, index) in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 animate-fadeInUp',
              selectedCategory === category 
                ? 'bg-[#EE6D08] text-white shadow-lg' 
                : 'bg-gray-100 text-[#016E98] hover:bg-gray-200'
            ]"
            :style="{ animationDelay: (0.05 * index) + 's' }"
          >
            {{ category }}
          </button>
        </div>

        <!-- Gallery Grid with Animation -->
        <div id="gallery-items" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <!-- Loading State -->
          <div v-if="loading" class="col-span-full flex justify-center items-center py-20">
            <div class="text-lg text-gray-600">Chargement de la galerie...</div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="col-span-full bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-800">Erreur lors du chargement de la galerie : {{ error }}</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="filteredGallery.length === 0" class="col-span-full text-center py-20">
            <p class="text-lg text-gray-600">Aucune image disponible dans cette catégorie.</p>
          </div>

          <!-- Gallery Images (Dynamic) -->
          <div 
            v-for="(image, index) in filteredGallery" 
            v-else
            :key="image.id"
            @click="openLightbox(index)"
            class="gallery-item group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-72 cursor-pointer transform hover:scale-105 animate-fadeInUp"
            :style="{ animationDelay: (0.08 * (index % 3)) + 's' }"
          >
            <!-- Image -->
            <img 
              :src="image.image"
              :alt="image.title || 'Galerie image'"
              class="w-full h-full object-cover group-hover:brightness-50 transition-all duration-500"
              @error="(e) => e.target.src = '@/assets/images/montage_panneau2.jpg'"
            />
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
              <div>
                <h3 class="text-white font-bold text-lg mb-1">{{ image.title }}</h3>
                <p class="text-orange-400 text-sm font-semibold">{{ image.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <teleport to="body">
      <transition name="fade">
        <div v-if="isLightboxOpen" class="fixed inset-0 z-50 bg-black/95 backdrop-blur" @click="closeLightbox">
          <!-- Content Container -->
          <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-4" @click.stop>
            <!-- Close Button -->
            <button 
              @click="closeLightbox"
              class="absolute top-6 right-6 text-white hover:text-secondary transition-colors duration-300 z-60"
            >
              <i class="fas fa-times text-3xl"></i>
            </button>

            <!-- Main Image Container -->
            <div class="flex flex-col items-center justify-center flex-1">
              <!-- Main Image -->
              <img 
                :src="currentLightboxImage.image" 
                :alt="currentLightboxImage.title"
                class="max-w-full max-h-[70vh] object-contain rounded-2xl"
              />

              <!-- Image Info -->
              <div class="text-center mt-8 text-white">
                <h3 class="text-xl font-black mb-2">{{ currentLightboxImage.title }}</h3>
                <p class="text-secondary text-xs font-bold uppercase tracking-widest mb-2">{{ currentLightboxImage.category }}</p>
                <p class="text-gray-400 text-sm">{{ currentLightboxIndex + 1 }} / {{ filteredGallery.length }}</p>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <button 
                v-if="currentLightboxIndex > 0"
                @click="previousImage"
                class="text-white hover:text-secondary transition-all duration-300 hover:scale-125 p-2"
              >
                <i class="fas fa-chevron-left text-5xl"></i>
              </button>
            </div>

            <div class="absolute right-4 top-1/2 -translate-y-1/2">
              <button 
                v-if="currentLightboxIndex < filteredGallery.length - 1"
                @click="nextImage"
                class="text-white hover:text-secondary transition-all duration-300 hover:scale-125 p-2"
              >
                <i class="fas fa-chevron-right text-5xl"></i>
              </button>
            </div>

            <!-- Bottom Navigation Dots -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-2xl">
              <button 
                v-for="(image, index) in filteredGallery" 
                :key="index"
                @click.stop="currentLightboxIndex = index"
                :class="[
                  'rounded-full transition-all duration-300',
                  index === currentLightboxIndex 
                    ? 'bg-[#EE6D08] w-4 h-4' 
                    : 'bg-white/50 hover:bg-white w-3 h-3'
                ]"
              ></button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Statistics Section -->
    <section id="stats-section" class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight animate-slideInDown">Nos <span class="text-[#EE6D08]">Réalisations</span></h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-[#EE6D08] to-orange-500 rounded-full mx-auto animate-fadeInUp animation-delay-200"></div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0s">
            <div class="inline-block bg-[#EE6D08] rounded-full p-4 mb-4">
              <i class="fas fa-check text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-[#EE6D08] mb-2">500+</h3>
            <p class="text-gray-100 font-semibold">Projets réalisés</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0.1s">
            <div class="inline-block bg-[#EE6D08] rounded-full p-4 mb-4">
              <i class="fas fa-users text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-[#EE6D08] mb-2">10K+</h3>
            <p class="text-gray-100 font-semibold">Clients satisfaits</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0.2s">
            <div class="inline-block bg-[#EE6D08] rounded-full p-4 mb-4">
              <i class="fas fa-star text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-[#EE6D08] mb-2">15+</h3>
            <p class="text-gray-100 font-semibold">Années d'expérience</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style="animation-delay: 0.3s">
            <div class="inline-block bg-[#EE6D08] rounded-full p-4 mb-4">
              <i class="fas fa-trophy text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-[#EE6D08] mb-2">100%</h3>
            <p class="text-gray-100 font-semibold">Garantie qualité</p>
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

    <!-- CTA Section -->
    <section id="cta-section" class="bg-white py-20 md:py-32">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
        <h2 class="text-4xl md:text-5xl font-black text-[#EE6D08] mb-6 leading-tight animate-slideInDown">Prêt à concrétiser votre projet ?</h2>
        <p class="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed animate-fadeInUp animation-delay-200">
          Découvrez comment EGENT-TOGO peut transformer votre vision en réalité avec des solutions innovantes et durables.
        </p>
        <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="px-8 py-4 bg-secondary text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Demander un devis
          </a>
          <a href="/Contact" class="px-8 py-4 bg-gray-100 text-[#016E98] font-bold rounded-lg hover:bg-gray-200 transition-all duration-300">
            En savoir plus
          </a>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'

const { setMeta } = useSEOMeta()
const { gallery, loading, initializeGallery } = useFirebaseData()

onMounted(() => {
  initializeGallery()
})

const selectedCategory = ref('Tous')
const isLightboxOpen = ref(false)
const currentLightboxIndex = ref(0)

const categories = computed(() => {
  const allCategories = new Set()
  allCategories.add('Tous')
  gallery.value.forEach(item => {
    if (item.category) allCategories.add(item.category)
  })
  return Array.from(allCategories)
})

const filteredGallery = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return gallery.value
  }
  return gallery.value.filter(image => image.category === selectedCategory.value)
})

const currentLightboxImage = computed(() => {
  return filteredGallery.value[currentLightboxIndex.value] || {}
})

const openLightbox = (index) => {
  currentLightboxIndex.value = index
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (currentLightboxIndex.value < filteredGallery.value.length - 1) {
    currentLightboxIndex.value++
  }
}

const previousImage = () => {
  if (currentLightboxIndex.value > 0) {
    currentLightboxIndex.value--
  }
}

const handleKeypress = (event) => {
  if (!isLightboxOpen.value) return
  
  if (event.key === 'Escape') {
    closeLightbox()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'ArrowLeft') {
    previousImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeypress)
  
  setMeta(
    'Galerie - Nos Réalisations - EGENT-TOGO',
    'Découvrez nos réalisations en énergie solaire, lampadaires LED et solutions durables au Togo.',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    '/galerie'
  )
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeypress)
})
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

.gallery-item {
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
</style>
