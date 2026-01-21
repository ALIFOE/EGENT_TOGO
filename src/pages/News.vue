<template>
  <div>
    <!-- Hero Section News -->
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
          <p class="text-[#EE6D08] font-semibold mb-4 text-sm uppercase tracking-widest">Restez informé</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Actualités EGENT TOGO  
          </h1>
          <!-- <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières nouvelles, innovations et réalisations du groupe EGENT-TOGO. <br>
            <br>Suivez notre actualité pour rester connecté à nos développements.
          </p> -->
        </div>
      </div>

      <!-- Image Section -->
      <!-- <div class="relative w-full h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <img 
          src="@/assets/images/custom/imagefont01.jpg" 
          alt="EGENT-TOGO Services"
          class="w-full h-full object-cover"
        />
      </div> -->
    </div>

    <!-- Video Section - Overlapping Hero and News -->
    <div class="relative -mt-24 md:-mt-34 lg:-mt-40 -mb-12 md:-mb-16 lg:-mb-20 z-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 lg:h-96 bg-black group">
          <!-- Video ou Image Fallback -->
          <video 
            ref="videoElement"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            class="w-full h-full object-cover"
            @canplay="onCanPlay"
            @error="onVideoError"
            @loadstart="onLoadStart"
          >
            <source src="/src/assets/videos/Spotconf.mp4" type="video/mp4" />
          </video>
          
          <!-- Image de fallback (affichée si vidéo vide) -->
          <img 
            v-if="!videoLoaded"
            src="https://images.unsplash.com/photo-1509391366360-2e0b3f3446ea?w=1200&h=600&fit=crop" 
            alt="EGENT-TOGO Actualités"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>

    <!-- Dernières vidéos Section -->
    <section class="bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-4">Dernières shorts</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-[#EE6D08] to-orange-500 rounded-full"></div>
        </div>

        <!-- Shorts Videos Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-20">
          <!-- Short 1 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <div class="relative overflow-hidden h-96 bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/0hsRFnVH0nI" 
                title="Court métrage 1"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
            <div class="p-6">
              <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Court métrage</p>
              <a href="https://www.youtube.com/watch?v=0hsRFnVH0nI" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
              </a>
            </div>
          </div>

          <!-- Short 2 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <div class="relative overflow-hidden h-96 bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/htTP3kpQsJ8" 
                title="Court métrage 2"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
            <div class="p-6">
              <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Court métrage</p>
              <a href="https://www.youtube.com/watch?v=htTP3kpQsJ8" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
              </a>
            </div>
          </div>

          <!-- Short 3 -->
          <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <div class="relative overflow-hidden h-96 bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/BLHFLc475cY" 
                title="Court métrage 3"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
            <div class="p-6">
              <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Court métrage</p>
              <a href="https://www.youtube.com/watch?v=BLHFLc475cY" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Full Videos -->
        <div>
          <h3 class="text-2xl md:text-3xl font-black text-[#016E98] mb-10">Nos vidéos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <!-- Video 1 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div class="relative overflow-hidden bg-black" style="padding-bottom: 56.25%; height: 0;">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/UB04n_ZhA0U" 
                  title="Vidéo 1"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen
                  class="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div class="p-6">
                <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Présentation</p>
                <a href="https://www.youtube.com/watch?v=UB04n_ZhA0U" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                  Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
                </a>
              </div>
            </div>

            <!-- Video 2 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div class="relative overflow-hidden bg-black" style="padding-bottom: 56.25%; height: 0;">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/gicyBGLAZSk" 
                  title="Vidéo 2"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen
                  class="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div class="p-6">
                <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Formation</p>
                <a href="https://www.youtube.com/watch?v=gicyBGLAZSk" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                  Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
                </a>
              </div>
            </div>

            <!-- Video 3 -->
            <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div class="relative overflow-hidden bg-black" style="padding-bottom: 56.25%; height: 0;">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/RV8AqnfORK4" 
                  title="Vidéo 3"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen
                  class="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <div class="p-6">
                <p class="text-secondary font-bold text-xs uppercase tracking-widest mb-3">Actualité</p>
                <a href="https://www.youtube.com/watch?v=RV8AqnfORK4" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300">
                  Voir sur YouTube <i class="fas fa-youtube ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- News Grid Section -->
    <section class="bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-4">Derniers articles</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-[#EE6D08] to-orange-500 rounded-full"></div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="text-lg text-gray-600">⏳ Chargement des articles...</div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p class="text-red-800">❌ Erreur lors du chargement des articles : {{ error }}</p>
        </div>

        <!-- News Grid -->
        <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Article Card (Dynamic) -->
          <article 
            v-for="(article, index) in articles" 
            :key="article.id"
            @click="navigateTo('/article/' + article.slug)"
            class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full cursor-pointer hover:scale-105"
            :style="{ animationDelay: (0.1 * index) + 's' }"
          >
            <!-- Image -->
            <div class="relative overflow-hidden h-56 bg-gray-200">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1509391366360-2e0b3f3446ea?w=400&h=300&fit=crop'"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                {{ article.category || 'Actualité' }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <router-link :to="'/article/' + article.slug" class="text-xl font-bold text-[#016E98] mb-3 line-clamp-2 hover:text-[#EE6D08] transition-colors block">{{ article.title }}</router-link>
              <p class="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">{{ article.excerpt }}</p>
              <div class="flex justify-between items-center mt-auto">
                <span class="text-gray-500 text-xs">{{ article.date }}</span>
                <span class="text-[#0392C7] font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <p class="text-lg text-gray-600">Aucun article disponible pour le moment.</p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">Restez Informé</h2>
        <p class="text-lg md:text-xl text-gray-100 mb-12">
          Abonnez-vous à notre newsletter pour recevoir les dernières actualités, innovations et opportunités du groupe EGENT-TOGO.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input 
            type="email" 
            placeholder="Votre adresse email" 
            class="flex-1 px-6 py-4 rounded-lg text-dark font-semibold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-blue-900"
          />
          <button class="bg-[#EE6D08] hover:bg-orange-600 text-white font-black px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
            S'abonner
          </button>
        </div>
        <p class="text-sm text-gray-300 mt-6">Nous respectons votre vie privée. Désinscription possible à tout moment.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'

// Google Analytics - Dynamic Loading
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date())
  gtag('config', 'G-65BEBH9XRC')
  
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-65BEBH9XRC'
  document.head.appendChild(script)
}

const router = useRouter()
const { setMeta } = useSEOMeta()
const { articles, loading, error, initializeArticles } = useFirebaseData()

const videoElement = ref(null)
const videoLoaded = ref(false)

const onCanPlay = () => {
  videoLoaded.value = true
}

const onVideoError = () => {
  videoLoaded.value = false
}

onMounted(async () => {
  await initializeArticles()
  
  // \u2705 SEO OPTIMIS\u00c9 POUR LA PAGE ACTUALIT\u00c9S
  setMeta(
    'Actualit\u00e9s EGENT-TOGO - Derni\u00e8res Nouvelles en \u00c9nergie Solaire au Togo',
    'Restez inform\u00e9 des derni\u00e9res actualit\u00e9s, innovations et r\u00e9alisations d\'EGENT-TOGO en \u00e9nergie solaire, climatisation et solutions durables au Togo.',
    '/src/assets/images/montage_panneau.jpg',
    '/actualites',
    {
      type: 'website',
      siteName: 'EGENT-TOGO',
      imageWidth: '1200',
      imageHeight: '630'
    }
  )
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
</style>
