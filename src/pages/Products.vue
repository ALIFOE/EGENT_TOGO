<template>
  <div>
    <!-- Hero Section Products -->
    <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative overflow-visible -mt-32 pt-0">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32 md:py-40">
        <!-- Section Titre Hero -->
        <div class="text-center mb-16 md:mb-20">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">NOS <span class="text-secondary">PRODUITS</span></h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos produits conçus pour vous aider à réduire vos coûts d'électricité et à améliorer votre confort de vie.
          </p>
        </div>
      </div>

      <!-- Section Image avec bouton -->
      <div class="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl group mx-4 sm:mx-6 lg:mx-8 mb-0 md:mb-0 -mt-40 md:-mt-56 z-20">
        <img 
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop" 
          alt="Nos Produits EGENT TOGO"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        <!-- Play button -->
        <button class="absolute inset-0 flex items-center justify-center group">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-2xl transform group-hover:scale-110">
            <i class="fas fa-play text-dark text-3xl ml-1"></i>
          </div>
        </button>
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
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=389&h=446&fit=crop" 
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
                  <button @click="navigateTo('/contact')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=389&h=446&fit=crop" 
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
                  <button @click="navigateTo('/contact')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
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
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=389&h=446&fit=crop" 
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
                  <button @click="navigateTo('/contact')" class="bg-[#0392C7] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm">
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
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1440&h=371&fit=crop" 
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
