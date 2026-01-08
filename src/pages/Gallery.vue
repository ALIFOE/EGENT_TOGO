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
        <div class="text-center">
          <p class="text-secondary font-semibold mb-4 text-sm uppercase tracking-widest">Explorez nos réalisations</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Notre <span class="text-secondary">Galerie</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos projets innovants et réalisations concrètes en énergie renouvelable et solutions durables pour le Togo et l'Afrique de l'Ouest.
          </p>
        </div>
      </div>
    </div>

    <!-- Gallery Filter Section -->
    <section class="bg-white py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-3 md:gap-4 mb-16">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300',
              selectedCategory === category 
                ? 'bg-secondary text-white shadow-lg' 
                : 'bg-gray-100 text-[#05075F] hover:bg-gray-200'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Gallery Grid with Animation -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div 
            v-for="(image, index) in filteredGallery" 
            :key="index"
            @click="openLightbox(index)"
            class="gallery-item group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 h-72 cursor-pointer transform hover:scale-105"
          >
            <!-- Image -->
            <img 
              :src="image.src" 
              :alt="image.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <!-- Dark Overlay - très léger -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-30 group-hover:opacity-40 transition-all duration-300"></div>
            
            <!-- Text Overlay at Bottom -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent px-6 py-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <h3 class="text-lg font-black text-white mb-1">{{ image.title }}</h3>
              <p class="text-secondary text-xs font-bold uppercase tracking-widest">{{ image.category }}</p>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredGallery.length === 0" class="text-center py-16">
          <i class="fas fa-image text-gray-300 text-6xl mb-4"></i>
          <p class="text-gray-600 text-lg">Aucune image dans cette catégorie</p>
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
                :src="currentLightboxImage.src" 
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
                    ? 'bg-secondary w-4 h-4' 
                    : 'bg-white/50 hover:bg-white w-3 h-3'
                ]"
              ></button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- Statistics Section -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">Nos <span class="text-secondary">Réalisations</span></h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-secondary to-orange-500 rounded-full mx-auto"></div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="inline-block bg-secondary rounded-full p-4 mb-4">
              <i class="fas fa-check text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-secondary mb-2">500+</h3>
            <p class="text-gray-100 font-semibold">Projets réalisés</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="inline-block bg-secondary rounded-full p-4 mb-4">
              <i class="fas fa-users text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-secondary mb-2">10K+</h3>
            <p class="text-gray-100 font-semibold">Clients satisfaits</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="inline-block bg-secondary rounded-full p-4 mb-4">
              <i class="fas fa-star text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-secondary mb-2">15+</h3>
            <p class="text-gray-100 font-semibold">Années d'expérience</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div class="inline-block bg-secondary rounded-full p-4 mb-4">
              <i class="fas fa-trophy text-white text-3xl"></i>
            </div>
            <h3 class="text-4xl font-black text-secondary mb-2">100%</h3>
            <p class="text-gray-100 font-semibold">Garantie qualité</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-white py-20 md:py-32">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-6 leading-tight">Prêt à concrétiser votre projet ?</h2>
        <p class="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
          Découvrez comment EGENT-TOGO peut transformer votre vision en réalité avec des solutions innovantes et durables.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="px-8 py-4 bg-secondary text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Demander un devis
          </a>
          <a href="/contact" class="px-8 py-4 bg-gray-100 text-[#05075F] font-bold rounded-lg hover:bg-gray-200 transition-all duration-300">
            En savoir plus
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const selectedCategory = ref('Tous')
const isLightboxOpen = ref(false)
const currentLightboxIndex = ref(0)

const categories = [
  'Tous',
  'Installation Solaire',
  'Lampadaires LED',
  'Panneaux Solaires',
  'Pompage Solaire',
  'Formation'
]

const galleryImages = [
  {
    title: 'Panneau solaire installation',
    category: 'Installation Solaire',
    src: new URL('@/assets/images/montage_panneau.jpg', import.meta.url).href
  },
  {
    title: 'Montage panneau photovoltaïque',
    category: 'Installation Solaire',
    src: new URL('@/assets/images/montage_panneau2.jpg', import.meta.url).href
  },
  {
    title: 'Lampadaires LED montés',
    category: 'Lampadaires LED',
    src: new URL('@/assets/images/lampandaire_monté.jpg', import.meta.url).href
  },
  {
    title: 'Installation lampadaire LED',
    category: 'Lampadaires LED',
    src: new URL('@/assets/images/lampandaire_monté2.jpg', import.meta.url).href
  },
  {
    title: 'Lampadaire LED mise en place',
    category: 'Lampadaires LED',
    src: new URL('@/assets/images/lampandaire_monté3.jpg', import.meta.url).href
  },
  {
    title: 'Panneaux photovoltaïques',
    category: 'Panneaux Solaires',
    src: new URL('@/assets/images/panneau4.jpg', import.meta.url).href
  },
  {
    title: 'Installation panneaux montés',
    category: 'Panneaux Solaires',
    src: new URL('@/assets/images/panneau_montés.jpg', import.meta.url).href
  },
  {
    title: 'Projet chantier',
    category: 'Installation Solaire',
    src: new URL('@/assets/images/photo_chantier.jpg', import.meta.url).href
  },
  {
    title: 'Chantier en cours',
    category: 'Installation Solaire',
    src: new URL('@/assets/images/photo_chantier2.jpg', import.meta.url).href
  },
  {
    title: 'Réalisation projet 1',
    category: 'Pompage Solaire',
    src: new URL('@/assets/images/6862757d3ce79-1.jpg', import.meta.url).href
  },
  {
    title: 'Réalisation projet 2',
    category: 'Pompage Solaire',
    src: new URL('@/assets/images/6862757d416a4-2.jpg', import.meta.url).href
  },
  {
    title: 'Réalisation projet 3',
    category: 'Pompage Solaire',
    src: new URL('@/assets/images/6862757d5659b-3.jpg', import.meta.url).href
  },
  {
    title: 'Boutique EGENT-TOGO',
    category: 'Panneaux Solaires',
    src: new URL('@/assets/images/boutique_egent.jpg', import.meta.url).href
  },
  {
    title: 'Réception EGENT',
    category: 'Formation',
    src: new URL('@/assets/images/egent_reception.jpg', import.meta.url).href
  },
  {
    title: 'Photo client',
    category: 'Installation Solaire',
    src: new URL('@/assets/images/photoclient1.jpg', import.meta.url).href
  },
  {
    title: 'Conférence EGENT',
    category: 'Formation',
    src: new URL('@/assets/images/phpto_conf.jpg', import.meta.url).href
  }
]

const filteredGallery = computed(() => {
  if (selectedCategory.value === 'Tous') {
    return galleryImages
  }
  return galleryImages.filter(image => image.category === selectedCategory.value)
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
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeypress)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
