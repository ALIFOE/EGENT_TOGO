<template>
  <div>
    <!-- Hero Section Products -->
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
          <div class="space-y-4 md:space-y-6">
            <!-- Badge -->
            <div class="inline-block animate-slideInDown animation-delay-200">
              <div class="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-secondary font-bold text-xs md:text-sm inline-flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                <i class="fas fa-star text-lg"></i>
                NOS PRODUITS
              </div>
            </div>

            <!-- Main heading with gradient -->
            <div class="animate-slideInDown animation-delay-400">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span class="text-[#016E98]">
                  SOLUTIONS
                </span>
                <br />
                <span class="bg-gradient-to-r from-[#EE6D08] to-orange-400 bg-clip-text text-transparent">
                  PERFORMANTES
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="text-base md:text-lg text-[#016E98] leading-relaxed max-w-xl animate-fadeInUp animation-delay-600">
              Découvrez notre gamme de produits conçus pour réduire vos coûts d'électricité et améliorer votre confort de vie.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 animate-fadeInUp animation-delay-800">
              <button @click="scrollToProduits" class="group bg-gradient-to-r from-[#EE6D08] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Découvrir les Produits</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          <!-- Right side - Image with floating cards -->
          <div class="relative h-80 md:h-[450px] lg:h-[500px]">
            <!-- Main image -->
            <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl group animate-fadeInUp animation-delay-400">
              <img 
                src="/src/assets/images/montage_panneau.jpg" 
                alt="Produits EGENT TOGO"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent group-hover:from-dark/20 transition-all duration-700"></div>
            </div>

            <!-- Floating card 1 - Top right -->
            <div class="absolute top-4 md:top-8 -right-2 md:-right-4 lg:right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 animate-slideInDown animation-delay-600">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#EE6D08] to-orange-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-box text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-base md:text-lg">Premium</h3>
              </div>
              <p class="text-xs md:text-sm text-black">Produits de qualité supérieure</p>
            </div>

            <!-- Floating card 2 - Bottom left -->
            <div class="absolute -bottom-2 md:-bottom-4 left-0 md:left-4 lg:left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 animate-fadeInUp animation-delay-600">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-[#016E98] to-[#016E98] rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-shield-alt text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-[#EE6D08] text-base md:text-lg">Garantie</h3>
              </div>
              <p class="text-xs md:text-sm text-black">Service client disponible 24/7</p>
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

    <!-- Produits Phares Section -->
    <section id="produits-section" ref="produitsPhares" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown animation-delay-200">Nos produits phares</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6 animate-slideInDown animation-delay-400">DÉCOUVREZ NOS MEILLEURES SOLUTIONS</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-600">
            Nos solutions énergétiques sont conçues avec les meilleures technologies disponibles pour vous garantir performance, durabilité et économies d'énergie.
          </p>
        </div>

        <!-- Products Grid - 3 Column Layout -->
        <div v-if="loading" class="text-center py-12">
          <p class="text-gray-600 text-lg">Chargement des produits...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-600 text-lg">Erreur: {{ error }}</p>
          <p class="text-gray-600 mt-2">Les produits seront affichés ci-dessous une fois Firebase configuré</p>
        </div>

        <!-- Produits Firebase -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-end">
          <!-- Message débogage -->
          <div v-if="products.length === 0" class="col-span-full bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
            <p class="font-bold text-yellow-800">📊 Statut:</p>
            <p class="text-yellow-700 text-sm">Chargement: {{ loading }} | Erreur: {{ error ? error : 'Aucune' }}</p>
            <p class="text-yellow-700 text-sm">Produits trouvés: {{ products.length }}</p>
            <!-- <p class="text-yellow-600 text-xs mt-2">Vérifiez que:</p>
            <ul class="text-yellow-600 text-xs list-disc ml-4">
              <li>Vous avez cliqué sur "Importer Tout" à /admin/import</li>
              <li>Les règles Firebase sont en mode TEST (allow read, write)</li>
              <li>Vous avez ajouté au moins un produit en admin</li>
            </ul> -->
          </div>

          <div v-for="(product, index) in products" :key="product.id" class="flex flex-col h-full animate-fadeInUp" :style="{ animationDelay: (0.1 * index) + 's' }">
            <div class="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group h-full flex flex-col">
              <!-- Image -->
              <img 
                :src="product.mainImage || product.image || '/vite.svg'" 
                :alt="product.name || product.title"
                class="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
                @error="(e) => e.target.src = '/vite.svg'"
              />
              
              <!-- Content -->
              <div class="bg-white p-6 flex flex-col flex-grow">
                <div class="flex items-start justify-between mb-2">
                  <h3 class="text-2xl font-black text-[#0392C7]">{{ product.name || product.title }}</h3>
                  <span v-if="product.featured" class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">⭐ Phare</span>
                </div>
                
                <p class="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">
                  {{ product.shortDescription || product.description }}
                </p>
                
                <div class="space-y-4 mt-auto">
                  <p class="text-[#FF9D35] font-black text-lg">{{ product.price }}</p>
                  <button @click="navigateTo('/produits/' + (product.slug || product.id))" class="w-full bg-[#0392C7] hover:bg-[#016E98] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                    Détail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Produits par défaut si Firebase vide -->
        <div v-if="!loading && !error && products.length === 0" class="bg-blue-50 rounded-3xl p-8 mb-16 text-center">
          <p class="text-gray-600 text-lg">Aucun produit disponible pour le moment.</p>
          <p class="text-gray-500 mt-2">Les produits créés dans l'admin apparaîtront ici en temps réel</p>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <!-- <button @click="navigateTo('/contact')" class="bg-[#2F7914] hover:bg-[#1f5009] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">
            Voir tous les produits
          </button> -->
        </div>
      </div>
    </section>

    <!-- CTA Section: Main d'oeuvre qualifiée -->
    <section id="qualifiee-section" class="relative overflow-hidden h-auto md:h-[371px] bg-gradient-to-r from-[#1a2b5a] via-[#2c3e7a] to-[#1a2b5a] py-12 md:py-0">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 opacity-40 hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=371&fit=crop" 
          alt="Main d'oeuvre qualifiée"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#1a2b5a]/95 via-[#2c3e7a]/85 to-[#1a2b5a]/70"></div>

      <!-- Content - Centered -->
      <div class="relative w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-6 animate-slideInDown animation-delay-200">
          UNE MAIN D'ŒUVRE QUALIFIÉE DISPONIBLE 7/7
        </h2>
        
        <p class="text-white text-lg mb-8 leading-relaxed opacity-95 max-w-2xl animate-fadeInUp animation-delay-400">
          Nos techniciens expérimentés et certifiés sont à votre service pour installer vos produits avec professionnalisme et garantie de qualité.
        </p>

        <button @click="navigateTo('/contact')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300 animate-fadeInUp animation-delay-600">
          Contactez-nous
        </button>
      </div>
    </section>

    <!-- CTA Section: Commandez vos produits -->
    <section id="commandez-section" class="relative overflow-hidden bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6 animate-slideInDown animation-delay-200">
              COMMANDEZ VOTRE SOLUTION ÉNERGÉTIQUE DÈS AUJOURD'HUI
            </h2>
            
            <p class="text-gray-700 text-lg mb-8 leading-relaxed animate-fadeInUp animation-delay-400">
              Nos produits sont conçus pour offrir des performances optimales et une durabilité exceptionnelle. Investissez dans des solutions éprouvées et reconnues mondialement pour transformer votre autonomie énergétique.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-600">
              <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
                Demander un devis
              </button>
              <button @click="navigateTo('/services')" class="bg-gray-200 hover:bg-gray-300 text-[#016E98] px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
                Voir nos services
              </button>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp animation-delay-400">
            <img 
              src="/src/assets/images/photo_chantier2.jpg" 
              alt="Nos produits"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

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
  opacity: 0;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-700 { animation-delay: 0.7s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-900 { animation-delay: 0.9s; }
</style>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'

const router = useRouter()
const { setMeta } = useSEOMeta()
const { products, loading, error, initializeProducts } = useFirebaseData()
useCursorFollowText()

const produitsPhares = ref(null)
const heroInView = ref(false)
const produitInView = ref(false)
const qualifieeInView = ref(false)
const commandezInView = ref(false)

const setupObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero-section') {
        heroInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'produits-section') {
        produitInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'qualifiee-section') {
        qualifieeInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'commandez-section') {
        commandezInView.value = entry.isIntersecting;
      }
    });
  }, observerOptions);

  const sections = ['hero-section', 'produits-section', 'qualifiee-section', 'commandez-section'];
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
};

onMounted(() => {
  setupObserver()
  initializeProducts()
  
  // Définir les métadonnées Open Graph pour la page Produits
  setMeta(
    'Produits - EGENT-TOGO',
    'Découvrez nos produits phares : Kit Zoklin, FreeWater, Lampadaires EGENT SOLAR et Armoire Billy.',
    '/src/assets/images/montage_panneau2.jpg',
    '/produits'
  )
})

const navigateTo = (path) => {
  router.push(path)
}

const scrollToProduits = () => {
  if (produitsPhares.value) {
    produitsPhares.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
