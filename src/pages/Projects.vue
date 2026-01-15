<template>
  <div>
    <!-- Hero Section Projects -->
    <div id="hero-section" class="relative overflow-visible pt-4 pb-12 md:pt-8 md:pb-20">
      <!-- Animated gradient background -->
      <div class="absolute left-0 right-0 bottom-0 -top-32 opacity-60 -z-5" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.1%22 numOctaves=%225%22 result=%22noise%22 /><feColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 /></filter><rect width=%22100%22 height=%22100%22 fill=%22black%22 filter=%22url(%23noise)%22/></svg>'); background-size: 100px 100px;"></div>
      
      <!-- Animated blob elements -->
      <div class="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse -z-5"></div>
      <div class="absolute -bottom-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000 -z-5"></div>
      <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000 -z-5"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <!-- Left content --> 
          <div class="space-y-4 md:space-y-6 animate-fadeInUp animation-delay-200">
            <!-- Badge -->
            <div class="inline-block animate-slideInDown animation-delay-200">
              <div class="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-secondary font-bold text-xs md:text-sm inline-flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                <i class="fas fa-star text-lg"></i>
                NOS PROJETS
              </div>
            </div>

            <!-- Main heading with gradient -->
            <div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight animate-slideInDown animation-delay-400">
                <span class="text-[#016E98]">
                  RÉALISATIONS
                </span>
                <br />
                <span class="bg-gradient-to-r from-[#EE6D08] to-orange-400 bg-clip-text text-transparent">
                  CONCRÈTES
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="text-base md:text-lg text-[#016E98] leading-relaxed max-w-xl animate-fadeInUp animation-delay-600">
              Découvrez nos plus belles réalisations. Des projets menés à bien qui transforment des vies et contribuent à une transition énergétique durable.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 animate-fadeInUp animation-delay-800">
              <button @click="scrollToProjects" class="group bg-gradient-to-r from-[#EE6D08] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Découvrez nos projets</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          <!-- Right side - Image -->
          <div class="relative h-80 md:h-[450px] lg:h-[500px] animate-fadeInUp animation-delay-400">
            <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl group animate-fadeInUp animation-delay-500">
              <img 
                src="/src/assets/images/panneau_montés.jpg" 
                alt="Nos projets"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent group-hover:from-dark/20 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div class="text-white/50 text-sm font-semibold flex flex-col items-center gap-2">
          <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <section id="projects-section" ref="projectsSection" class="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16 lg:mb-20 animate-fadeInUp animation-delay-200">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown animation-delay-200">Nos réalisations</p>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#016E98] leading-tight mb-4 animate-slideInDown animation-delay-400">PROJETS <span class="text-secondary">RÉUSSIS</span></h2>
          <p class="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed animate-fadeInUp animation-delay-600">Explorez nos réalisations les plus remarquables et découvrez comment nous transformons les projets en succès</p>
        </div>

        <!-- Projects Grid - Responsive -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 lg:mb-16">
          <div 
            v-for="(project, index) in projects"
            :key="project.id"
            @click="navigateToProject(project.slug)"
            class="group relative overflow-hidden rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 hover:shadow-2xl transition-shadow duration-300 animate-fadeInUp animation-delay-400 cursor-pointer"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                :src="project.mainImage" 
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex flex-col items-end justify-between p-4 sm:p-6 rounded-3xl">
              <div class="text-right">
                <span class="inline-block px-3 py-1 bg-[#FF9D35] text-white text-xs font-bold rounded-full">{{ project.category }}</span>
              </div>
              <div class="w-full">
                <h3 class="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight mb-2">{{ project.title }}</h3>
                <p class="text-white/80 text-sm">{{ project.location }}</p>
              </div>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-all duration-300 ring-[8px] sm:ring-[10px] md:ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:bg-[#1f5009]">
              <i class="fas fa-arrow-right text-white text-sm sm:text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center animate-fadeInUp animation-delay-800">
          <p class="text-gray-600 mb-6">Vous avez un projet similaire?</p>
          <button @click="navigateTo('/contact')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2">
            <i class="fas fa-envelope"></i>
            Nous contacter pour votre projet
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div class="animate-fadeInUp animation-delay-200">
            <div class="text-4xl md:text-5xl font-black text-[#FF9D35] mb-2">{{ projects.length }}+</div>
            <p class="text-white text-lg">Projets réalisés</p>
          </div>
          <div class="animate-fadeInUp animation-delay-300">
            <div class="text-4xl md:text-5xl font-black text-[#FF9D35] mb-2">50+</div>
            <p class="text-white text-lg">Clients satisfaits</p>
          </div>
          <div class="animate-fadeInUp animation-delay-400">
            <div class="text-4xl md:text-5xl font-black text-[#FF9D35] mb-2">100%</div>
            <p class="text-white text-lg">Réussite de projets</p>
          </div>
          <div class="animate-fadeInUp animation-delay-500">
            <div class="text-4xl md:text-5xl font-black text-[#FF9D35] mb-2">7 ans</div>
            <p class="text-white text-lg">D'expérience</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '../data/projects.js'

const router = useRouter()
const projectsSection = ref(null)

const scrollToProjects = () => {
  if (projectsSection.value) {
    projectsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateToProject = (slug) => {
  router.push(`/projets/${slug}`)
}

const navigateTo = (path) => {
  router.push(path)
}
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

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-slideInDown {
  animation: slideInDown 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.animation-delay-700 {
  animation-delay: 700ms;
}

.animation-delay-800 {
  animation-delay: 800ms;
}
</style>
