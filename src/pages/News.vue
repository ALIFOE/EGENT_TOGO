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
            Nos <span class="text-[#EE6D08]">Actualités</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Découvrez les dernières nouvelles, innovations et réalisations du groupe EGENT-TOGO. Suivez notre actualité pour rester connecté à nos développements.
          </p>
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
    <div class="relative -mt-24 md:-mt-32 lg:-mt-40 -mb-12 md:-mb-16 lg:-mb-20 z-20">
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
            <source src="/src/assets/videos/videoauto.mp4" type="video/mp4" />
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
    <section class="bg-gray-50 py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-20">
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-4">Derniers articles</h2>
          <div class="w-24 h-1.5 bg-gradient-to-r from-[#EE6D08] to-orange-500 rounded-full"></div>
        </div>

        <!-- News Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <!-- News Card 1 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Inauguration du nouveau centre"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Actualité
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                5 Jan 2026
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">Découvrez le lancement officiel de notre nouveau centre de formation équipé des dernières technologies.</p>
              <router-link to="/article/inauguration-nouveau-centre" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>

          <!-- News Card 2 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Partenariat international"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Partenariat
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                2 Jan 2026
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">EGENT-TOGO établit un partenariat stratégique avec des leaders mondiaux du secteur.</p>
              <router-link to="/article/partenariat-international" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>

          <!-- News Card 3 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Prix et reconnaissance"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Reconnaissance
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                30 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">EGENT-TOGO reçoit plusieurs distinctions pour son excellence opérationnelle.</p>
              <router-link to="/article/prix-reconnaissance" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>

          <!-- News Card 4 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Événement clients"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Événement
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                28 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">Nous recrutons 50 nouveaux professionnels pour renforcer nos équipes.</p>
              <router-link to="/article/ressources-humaines-equipe" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>

          <!-- News Card 5 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Durabilité"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Durabilité
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                25 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">EGENT-TOGO s\'engage pour la protection de l\'environnement et le développement durable.</p>
              <router-link to="/article/durabilite-engagement" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>

          <!-- News Card 6 -->
          <article class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
            <!-- Image -->
            <div class="relative overflow-hidden h-72 bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" 
                alt="Ressources humaines"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- Category Badge -->
              <div class="absolute top-4 left-4 bg-[#EE6D08] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase">
                Ressources Humaines
              </div>
              <!-- Date Badge -->
              <div class="absolute bottom-4 right-4 bg-dark/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                20 Déc 2025
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-grow">
              <p class="text-gray-700 text-sm leading-relaxed mb-4">Célébrez avec nous notre gala annuel de reconnaissance clients.</p>
              <router-link to="/article/evenement-clients" class="inline-flex items-center text-secondary font-bold text-sm hover:text-orange-600 transition-colors duration-300 mt-auto">
                Lire l'article <i class="fas fa-arrow-right ml-2"></i>
              </router-link>
            </div>
          </article>
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
import { useCursorFollowText } from '../composables/useCursorFollowText'
import { ref, onMounted } from 'vue'

useCursorFollowText()

const videoElement = ref(null)
const videoLoaded = ref(false)

const onLoadStart = () => {
  console.log('Début du chargement de la vidéo...')
}

const onCanPlay = () => {
  console.log('Vidéo prête à être lue')
  videoLoaded.value = true
  if (videoElement.value) {
    videoElement.value.play().catch(err => {
      console.log('Erreur autoplay:', err)
    })
  }
}

const onVideoError = (e) => {
  console.error('Erreur vidéo:', e)
  videoLoaded.value = false
}

onMounted(() => {
  if (videoElement.value) {
    // Ajouter les écouteurs d'événements
    videoElement.value.addEventListener('canplay', onCanPlay)
    videoElement.value.addEventListener('error', onVideoError)
    
    // Essayer de jouer
    const playPromise = videoElement.value.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          videoLoaded.value = true
          console.log('Autoplay réussi')
        })
        .catch(error => {
          console.log('Autoplay non disponible:', error)
        })
    }
  }
})
</script>

<style scoped>
</style>
