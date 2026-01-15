<template>
  <div>
    <div v-if="!project" class="flex items-center justify-center min-h-screen">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-else>
    <!-- Hero Section with Project Images -->
    <section id="hero-section" class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors animate-fadeInUp animation-delay-200">
          <i class="fas fa-arrow-left"></i>
          Retour aux projets
        </button>

        <!-- Project Header -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Images Section -->
          <div class="flex flex-col gap-4 animate-fadeInUp animation-delay-300">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="currentImage" 
                :alt="project.title"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails -->
            <div v-if="project.images && project.images.length > 1" class="grid grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in project.images"
                :key="index"
                :src="image"
                :alt="`${project.title} - Image ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                @click="currentImage = image"
              />
            </div>
          </div>

          <!-- Project Info Section -->
          <div class="flex flex-col justify-between animate-fadeInUp animation-delay-400">
            <!-- Header -->
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3 animate-slideInDown animation-delay-400">{{ project.category }}</p>
              <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight animate-slideInDown animation-delay-500">{{ project.title }}</h1>
              
              <!-- Project Info Cards -->
              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3">
                  <i class="fas fa-calendar text-[#FF9D35] text-xl"></i>
                  <span class="text-gray-700"><strong>Date:</strong> {{ project.date }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-map-marker-alt text-[#FF9D35] text-xl"></i>
                  <span class="text-gray-700"><strong>Localisation:</strong> {{ project.location }}</span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-lg leading-relaxed mb-8 animate-fadeInUp animation-delay-600">
                {{ project.description }}
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
                <button @click="navigateTo('/contact')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-envelope"></i>
                  Similaire pour vous?
                </button>
                <button @click="navigateTo('/devis')" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-file-contract"></i>
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Details Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none text-gray-700" v-html="project.details"></div>
      </div>
    </section>

    <!-- Results Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Résultats Clés</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div 
            v-for="(result, index) in project.results"
            :key="index"
            class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center animate-fadeInUp"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <p class="text-3xl md:text-4xl font-black text-[#FF9D35] mb-2">{{ result.metric }}</p>
            <p class="text-gray-700 font-semibold">{{ result.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Notre Équipe</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(member, index) in project.team"
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-fadeInUp"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-[#FF9D35] to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <i class="fas fa-user text-white text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold text-[#016E98] text-center mb-1">{{ member.name }}</h3>
            <p class="text-gray-600 text-sm text-center">{{ member.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-8">Témoignage Client</h2>
        
        <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12">
          <div class="flex justify-center mb-6">
            <div class="flex gap-1">
              <i class="fas fa-star text-[#FF9D35]"></i>
              <i class="fas fa-star text-[#FF9D35]"></i>
              <i class="fas fa-star text-[#FF9D35]"></i>
              <i class="fas fa-star text-[#FF9D35]"></i>
              <i class="fas fa-star text-[#FF9D35]"></i>
            </div>
          </div>
          
          <p class="text-white text-lg md:text-xl leading-relaxed mb-6 italic">
            "{{ project.testimonial.content }}"
          </p>
          
          <div>
            <p class="text-[#FF9D35] font-bold text-lg">{{ project.testimonial.author }}</p>
            <p class="text-white/80 text-sm">{{ project.testimonial.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Autres Projets</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="relatedProject in relatedProjects"
            :key="relatedProject.id"
            @click="navigateToProject(relatedProject.slug)"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="relatedProject.mainImage"
                :alt="relatedProject.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div class="p-6">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">{{ relatedProject.category }}</p>
              <h3 class="text-xl font-bold text-[#016E98] mb-2">{{ relatedProject.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ relatedProject.shortDescription }}</p>
              <button class="text-[#FF9D35] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Découvrir <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 shadow-2xl border border-blue-800/50 mx-4 md:mx-8 rounded-3xl my-8 md:my-12">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 opacity-40">
        <img 
          :src="project.mainImage" 
          :alt="project.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-blue-950/70"></div>

      <!-- Content -->
      <div class="relative w-full max-w-7xl mx-auto h-auto md:h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-12 md:py-16 space-y-6 animate-fadeInUp animation-delay-400">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6">
          Prêt pour un projet transformateur ?
        </h2>
        
        <p class="text-white text-base sm:text-lg mb-6 md:mb-8 leading-relaxed opacity-95 max-w-2xl">
          Contactez notre équipe pour discuter de votre projet. Nous sommes prêts à transformer vos idées en réalité.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="navigateTo('/contact')" class="group bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-envelope"></i>
            Nous contacter
          </button>
          <button @click="navigateTo('/devis')" class="group border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-file-contract"></i>
            Demander un devis
          </button>
        </div>
      </div>
    </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { projects } from '../data/projects.js'

const router = useRouter()
const route = useRoute()

const project = ref(null)
const currentImage = ref(null)

const relatedProjects = computed(() => {
  return projects.filter(p => p.id !== project.value.id).slice(0, 3)
})

const loadProject = () => {
  const slug = route.params.slug
  project.value = projects.find(p => p.slug === slug)
  
  if (project.value) {
    currentImage.value = project.value.mainImage
  }
}

const goBack = () => {
  router.back()
}

const navigateTo = (path) => {
  router.push(path)
}

const navigateToProject = (slug) => {
  router.push(`/projets/${slug}`)
}

router.afterEach(() => {
  loadProject()
})

loadProject()
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose h3 {
  color: #016E98;
  font-weight: 900;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.prose ul {
  list-style: none;
  padding-left: 0;
}

.prose li {
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.prose li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #2F7914;
  font-weight: bold;
}

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
