<template>
  <div>
    <!-- Hero Section Services -->
    <div class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative overflow-visible -mt-32 pt-0">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32 md:py-40">
        <!-- Section Titre Hero -->
        <div class="text-center mb-16 md:mb-20">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">SERVICES & <span class="text-secondary">PRODUITS</span></h1>
          <p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Nos services sont conçus pour répondre à vos besoins et vous accompagner dans la réalisation de vos projets.
          </p>
        </div>
      </div>

      <!-- Section Vidéo/Image avec bouton play - déborde sur la section blanche -->
      <div class="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl group mx-4 sm:mx-6 lg:mx-8 mb-0 md:mb-0 -mt-40 md:-mt-56 z-20">
        <img 
          src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=600&fit=crop" 
          alt="Services et Produits EGENT TOGO"
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

    <!-- Services Cards with Images -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos services</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES DURABLES</h2>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Service 1: Électricité Générale -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=400&fit=crop" 
                alt="Électricité générale"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">ÉLECTRICITÉ<br>GÉNÉRALE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 2: Climatisation & Froid -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=400&fit=crop" 
                alt="Climatisation"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">CLIMATISATION<br>& FROID</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 3: Énergie Solaire -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&h=400&fit=crop" 
                alt="Énergie solaire"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">ÉNERGIE<br>SOLAIRE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 4: Plomberie -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" 
                alt="Plomberie"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">PLOMBERIE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 5: Fourniture d'Équipements -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e938aa1ef14?w=500&h=400&fit=crop" 
                alt="Fourniture d'équipements"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">FOURNITURE<br>D'ÉQUIPEMENTS</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 6: Consulting -->
          <div class="group relative overflow-hidden rounded-3xl h-80">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop" 
                alt="Consulting"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">CONSULTING</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button class="bg-[#2F7914] hover:bg-[#1f5009] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- Produits Phares Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos produits</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">DÉCOUVREZ NOS PRODUITS PHARES</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Nous avons des produits conçus pour vous aider à réduire vos coûts d'électricité et à améliorer votre confort. Découvrez-les dès maintenant !
          </p>
        </div>

        <!-- Products Grid - 3 Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          <!-- Product 1: Armoire Billy -->
          <div class="flex flex-col h-full">
            <div class="relative bg-blue-50 rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=389&h=446&fit=crop" 
                alt="Armoire Billy"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 bottom-0 bg-white p-6 rounded-b-3xl">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Armoire Billy</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Solution anti délestage, pour éviter les coupures de courant. Remplace valablement les groupes électrogènes.
                </p>
              </div>
            </div>
          </div>

          <!-- Product 2: Lampadaires EGENT Solar - CENTER/LARGER -->
          <div class="flex flex-col-reverse h-full md:-mt-12">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=389&h=446&fit=crop" 
                alt="Lampadaires EGENT Solar"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 top-0 bg-white p-6 rounded-t-3xl">
                <h3 class="text-3xl font-black text-[#0392C7] mb-2">Lampadaires<br>EGENT SOLAR</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Des lampadaires solaires pour illuminer vos espaces extérieurs tout en réduisant vos coûts d'électricité.
                </p>
              </div>
            </div>
          </div>

          <!-- Product 3: Kit Zoklin -->
          <div class="flex flex-col h-full">
            <div class="relative bg-orange-50 rounded-3xl overflow-hidden shadow-lg">

              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=389&h=446&fit=crop" 
                alt="Kit Zoklin"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 bottom-0 bg-white p-6 rounded-b-3xl">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Kit Zoklin</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Votre solution solaire préconçue pour une installation rapide et facile. Tout inclus pour votre autonomie énergétique.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button class="bg-[#2F7914] hover:bg-[#1f5009] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- CTA Section: Main d'oeuvre qualifiée -->
    <section class="relative overflow-hidden h-[371px] bg-gradient-to-r from-[#1a2b5a] via-[#2c3e7a] to-[#1a2b5a]">
      <!-- Background Image Overlay -->
      <div class="absolute inset-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=371&fit=crop" 
          alt="Main d'oeuvre qualifiée"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#1a2b5a]/95 via-[#2c3e7a]/85 to-[#1a2b5a]/70"></div>

      <!-- Content - Centered -->
      <div class="relative w-full max-w-[1440px] mx-auto h-full px-[189px] flex flex-col items-center justify-center text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          UNE MAIN D'ŒUVRE QUALIFIÉE DISPONIBLE 7/7, PRO-ACTIF POUR NOS DIFFÉRENTS SERVICES
        </h2>
        
        <p class="text-white text-lg mb-8 leading-relaxed opacity-95 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur. Platea tortor consectetur facilisi id malesuada.
        </p>

        <button class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
          Contactez-nous
        </button>
      </div>
    </section>

    <!-- CTA Section: Pannes d'électricité -->
    <section class="relative overflow-hidden bg-white py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">
              DITES AU REVOIR AUX PANNES D'ÉLECTRICITÉ ET AUX FACTURES SALÉES.
            </h2>
            
            <p class="text-gray-700 text-lg mb-8 leading-relaxed">
              Nous vous proposons des solutions d'énergie renouvelable pour votre maison ou votre entreprise à des prix abordables. Une première étape vers un avenir plus vert.
            </p>

            <button class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-300">
              Demander un devis
            </button>
          </div>

          <!-- Right Image -->
          <div class="relative w-[583px] h-[329px]">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1440&h=371&fit=crop" 
              alt="Solutions énergétiques"
              class="w-full h-full object-cover rounded-[19px] shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>

 
  </div>
</template>

<script setup>
</script>
