<template>
  <div>
    <!-- Hero Section Products -->
    <div class="relative overflow-visible pt-4 pb-12 md:pt-8 md:pb-20">
      <!-- Animated gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-dark -z-10"></div>
      
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
            <div class="inline-block">
              <div class="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-secondary font-bold text-xs md:text-sm inline-flex items-center gap-2 hover:bg-white/20 transition-all duration-300">
                <i class="fas fa-star text-lg"></i>
                NOS PRODUITS
              </div>
            </div>

            <!-- Main heading with gradient -->
            <div>
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span class="text-blue-800">
                  SOLUTIONS
                </span>
                <br />
                <span class="bg-gradient-to-r from-secondary to-orange-400 bg-clip-text text-transparent">
                  PERFORMANTES
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="text-base md:text-lg text-blue-800 leading-relaxed max-w-xl">
              Découvrez notre gamme de produits conçus pour réduire vos coûts d'électricité et améliorer votre confort de vie.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <button class="group bg-gradient-to-r from-secondary to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Découvrir les Produits</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          <!-- Right side - Image with floating cards -->
          <div class="relative h-80 md:h-[450px] lg:h-[500px]">
            <!-- Main image -->
            <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl group">
              <img 
                src="/src/assets/images/montage_panneau.jpg" 
                alt="Produits EGENT TOGO"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent group-hover:from-dark/20 transition-all duration-700"></div>
            </div>

            <!-- Floating card 1 - Top right -->
            <div class="absolute top-4 md:top-8 -right-2 md:-right-4 lg:right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-secondary to-orange-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-box text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-blue-800 text-base md:text-lg">Premium</h3>
              </div>
              <p class="text-xs md:text-sm text-black">Produits de qualité supérieure</p>
            </div>

            <!-- Floating card 2 - Bottom left -->
            <div class="absolute -bottom-2 md:-bottom-4 left-0 md:left-4 lg:left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6 w-56 md:w-64 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-shield-alt text-lg md:text-xl"></i>
                </div>
                <h3 class="font-black text-blue-900 text-base md:text-lg">Garantie</h3>
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
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos produits phares</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">DÉCOUVREZ NOS MEILLEURES SOLUTIONS</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Nos solutions énergétiques sont conçues avec les meilleures technologies disponibles pour vous garantir performance, durabilité et économies d'énergie.
          </p>
        </div>

        <!-- Products Grid - 3 Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          <!-- Product 1: Armoire Billy -->
          <div class="flex flex-col h-full">
            <div class="relative bg-blue-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group">
              <img 
                src="/src/assets/images/armoireBilly_monté.jpg" 
                alt="Armoire Billy"
                class="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="bg-white p-6">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Armoire Billy</h3>
                <p class="text-gray-700 text-sm leading-relaxed mb-4">
                  Solution anti délestage performante pour éviter les coupures de courant. Remplace efficacement les groupes électrogènes sans émission polluante.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-[#FF9D35] font-black">À partir de 500 000 FCFA</span>
                  <button @click="navigateTo('/produits/armoire-billy')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product 2: Lampadaires EGENT Solar -->
          <div class="flex flex-col-reverse h-full md:-mt-12">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow group">
              <img 
                src="/src/assets/images/lampendaire_monté.jpg" 
                alt="Lampadaires EGENT Solar"
                class="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="bg-white p-6">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Lampadaires<br>EGENT SOLAR</h3>
                <p class="text-gray-700 text-sm leading-relaxed mb-4">
                  Lampadaires solaires autonomes et écologiques pour illuminer vos routes, places publiques et espaces extérieurs sans frais d'électricité.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-[#FF9D35] font-black">À partir de 200 000 FCFA</span>
                  <button @click="navigateTo('/produits/lampadaires-egent-solar')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Product 3: Kit Zoklin -->
          <div class="flex flex-col h-full">
            <div class="relative bg-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group">
              <img 
                src="/src/assets/images/montage_panneau2.jpg" 
                alt="Kit Zoklin"
                class="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="bg-white p-6">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Kit Zoklin</h3>
                <p class="text-gray-700 text-sm leading-relaxed mb-4">
                  Kit solaire préconçu et complet pour une installation rapide et facile. Parfait pour débuter votre transition énergétique en toute confiance.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-[#FF9D35] font-black">À partir de 750 000 FCFA</span>
                  <button @click="navigateTo('/produits/kit-zoklin')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    <section class="relative overflow-hidden h-auto md:h-[371px] bg-gradient-to-r from-[#1a2b5a] via-[#2c3e7a] to-[#1a2b5a] py-12 md:py-0">
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
        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          UNE MAIN D'ŒUVRE QUALIFIÉE DISPONIBLE 7/7
        </h2>
        
        <p class="text-white text-lg mb-8 leading-relaxed opacity-95 max-w-2xl">
          Nos techniciens expérimentés et certifiés sont à votre service pour installer vos produits avec professionnalisme et garantie de qualité.
        </p>

        <button @click="navigateTo('/contact')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
          Contactez-nous
        </button>
      </div>
    </section>

    <!-- CTA Section: Commandez vos produits -->
    <section class="relative overflow-hidden bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">
              COMMANDEZ VOTRE SOLUTION ÉNERGÉTIQUE DÈS AUJOURD'HUI
            </h2>
            
            <p class="text-gray-700 text-lg mb-8 leading-relaxed">
              Nos produits sont conçus pour offrir des performances optimales et une durabilité exceptionnelle. Investissez dans des solutions éprouvées et reconnues mondialement pour transformer votre autonomie énergétique.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="navigateTo('/contact')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
                Demander un devis
              </button>
              <button @click="navigateTo('/services')" class="bg-gray-200 hover:bg-gray-300 text-[#05075F] px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
                Voir nos services
              </button>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
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

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>
