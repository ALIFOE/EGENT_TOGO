<template>
  <div>
    <div v-if="!service" class="flex items-center justify-center min-h-screen">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-else>
    <!-- Hero Section with Service Images -->
    <section id="hero-section" class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors animate-fadeInUp animation-delay-200">
          <i class="fas fa-arrow-left"></i>
          Retour aux services
        </button>

        <!-- Main Service Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Images Section -->
          <div class="flex flex-col gap-4 animate-fadeInUp animation-delay-300">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="currentImage" 
                :alt="service.name"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Thumbnails -->
            <div v-if="service.images && service.images.length > 1" class="grid grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in service.images"
                :key="index"
                :src="image"
                :alt="`${service.name} - Image ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                @click="currentImage = image"
              />
            </div>
          </div>

          <!-- Service Info Section -->
          <div class="flex flex-col justify-between animate-fadeInUp animation-delay-400">
            <!-- Header -->
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3 animate-slideInDown animation-delay-400">{{ service.category }}</p>
              <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight animate-slideInDown animation-delay-500">{{ service.name }}</h1>
              
              <!-- Description -->
              <p class="text-gray-700 text-lg leading-relaxed mb-8 animate-fadeInUp animation-delay-600">
                {{ service.description }}
              </p>

              <!-- Key Features -->
              <div class="space-y-3 mb-8 animate-fadeInUp animation-delay-700">
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Expertise professionnelle reconnue</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Installation et maintenance garanties</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Support technique 24/7</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
                <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-file-contract"></i>
                  Demander un devis
                </button>
                <button @click="navigateTo('/contact')" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-phone"></i>
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Nos Points Forts</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(feature, index) in service.features"
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fadeInUp"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <div class="w-12 h-12 bg-gradient-to-br from-[#FF9D35] to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <i class="fas fa-star text-white"></i>
            </div>
            <h3 class="text-lg font-bold text-[#016E98] mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Specifications Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Spécifications</h2>
        
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(spec, index) in service.specifications"
              :key="index"
              class="border-l-4 border-[#FF9D35] pl-6 py-4"
            >
              <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">{{ spec.label }}</p>
              <p class="text-[#016E98] font-bold text-lg">{{ spec.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Avantages et Bénéfices</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(benefit, index) in service.benefits"
            :key="index"
            class="flex gap-4 items-start animate-fadeInUp"
            :style="{ animationDelay: `${200 + index * 100}ms` }"
          >
            <div class="w-8 h-8 rounded-full bg-[#2F7914] flex items-center justify-center flex-shrink-0 mt-1">
              <i class="fas fa-check text-white text-sm"></i>
            </div>
            <p class="text-gray-700 text-lg">{{ benefit }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Full Description Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="prose prose-lg max-w-none text-gray-700" v-html="service.longDescription"></div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 shadow-2xl border border-blue-800/50 mx-4 md:mx-8 rounded-3xl my-8 md:my-12">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 opacity-40">
        <img 
          :src="service.mainImage" 
          :alt="service.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-blue-950/70"></div>

      <!-- Content -->
      <div class="relative w-full max-w-7xl mx-auto h-auto md:h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center py-12 md:py-16 space-y-6 animate-fadeInUp animation-delay-400">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6 animate-slideInDown animation-delay-400">
          Prêt à transformer votre projet ?
        </h2>
        
        <p class="text-white text-base sm:text-lg mb-6 md:mb-8 leading-relaxed opacity-95 max-w-2xl animate-fadeInUp animation-delay-600">
          Nos équipes sont à votre disposition pour discuter de votre projet et vous proposer la meilleure solution.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800 justify-center">
          <button @click="navigateTo('/devis')" class="group bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-file-contract"></i>
            Demander un devis gratuit
          </button>
          <button @click="navigateTo('/contact')" class="group border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <i class="fas fa-phone"></i>
            Nous appeler
          </button>
        </div>

        <div class="pt-6 md:pt-8 text-white/80 text-sm">
          <p>Consultation gratuite et sans engagement</p>
        </div>
      </div>
    </section>

    <!-- Related Services Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-black text-[#016E98] mb-12 text-center">Services Complémentaires</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="relatedService in relatedServices"
            :key="relatedService.id"
            @click="navigateToService(relatedService.slug)"
            class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="relatedService.image"
                :alt="relatedService.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div class="p-6">
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-2">{{ relatedService.category }}</p>
              <h3 class="text-xl font-bold text-[#016E98] mb-3">{{ relatedService.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ relatedService.shortDescription }}</p>
              <button class="text-[#FF9D35] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Découvrir <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  </div>
</template>

<script>
import { services } from '../data/services.js';

export default {
  name: 'ServiceDetail',
  data() {
    return {
      service: null,
      currentImage: null,
      services: services
    };
  },
  computed: {
    relatedServices() {
      return this.services.filter(s => s.id !== this.service.id).slice(0, 3);
    }
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    navigateToService(slug) {
      this.$router.push(`/service/${slug}`);
    },
    loadService() {
      const slug = this.$route.params.slug;
      this.service = this.services.find(s => s.slug === slug);
      
      if (this.service) {
        this.currentImage = this.service.mainImage;
      }
    }
  },
  watch: {
    '$route'() {
      this.loadService();
    }
  },
  mounted() {
    this.loadService();
  }
};
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
