<template>
  <div class="bg-gradient-to-b from-gray-40 via-gray-100 to-gray-200 min-h-screen">
    <!-- Hero Section About -->
    <div class="relative overflow-visible pt-2 pb-8 md:pt-4 md:pb-12 lg:pb-16">
      <!-- Animated gradient background -->
      <!-- <div class="absolute inset-0 bg-gradient-to-br from-dark via-blue-900 to-indigo-900 -z-10"></div> -->
      
      <!-- Grain effect overlay - Extended behind navbar -->
      <div class="absolute left-0 right-0 bottom-0 -top-32 opacity-60 -z-5" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%221.1%22 numOctaves=%225%22 result=%22noise%22 /><feColorMatrix in=%22noise%22 type=%22saturate%22 values=%220%22 /></filter><rect width=%22100%22 height=%22100%22 fill=%22black%22 filter=%22url(%23noise)%22/></svg>'); background-size: 100px 100px;"></div>
      
      <!-- Animated blob elements -->
      <div class="absolute top-10 right-5 sm:top-20 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse -z-5"></div>
      <div class="absolute -bottom-16 left-10 sm:-bottom-20 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000 -z-5"></div>
      <div class="absolute top-1/3 left-1/4 w-56 sm:w-80 h-56 sm:h-80 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000 -z-5"></div>

      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-center">
          <!-- Left content -->
          <div class="space-y-2 sm:space-y-3 md:space-y-4 animate-fadeInUp">
            <!-- Badge -->
            <div class="inline-block">
              <div class="px-2 sm:px-3 py-0.5 sm:py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-secondary font-bold text-xs inline-flex items-center gap-1 sm:gap-2 hover:bg-white/20 transition-all duration-300 animate-slideInDown" style="animation-delay: 0s">
                <i class="fas fa-star text-xs sm:text-lg"></i>
                <span class="hidden sm:inline">À PROPOS D'EGENT-TOGO</span>
                <span class="sm:hidden">À PROPOS</span>
              </div>
            </div>

            <!-- Main heading with gradient -->
            <div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight animate-slideInDown" style="animation-delay: 0.1s">
                <span class="text-[#016E98]">
                  DÉCOUVREZ
                </span>
                <br />
                <span class="bg-gradient-to-r from-[#EE6D08] to-orange-400 bg-clip-text text-transparent inline-block animate-pulse">
                  NOTRE MISSION
                </span>
              </h1>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm md:text-base lg:text-lg text-[#016E98] leading-relaxed max-w-xl animate-fadeInUp animation-delay-200">
              Une histoire d'expertise et d'engagement envers l'énergie durable. Depuis 2015, nous transformons vos besoins énergétiques en solutions innovantes.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4 md:pt-6 animate-fadeInUp animation-delay-400">
              <button @click="navigateTo('/Actualites')" class="group bg-gradient-to-r from-[#EE6D08] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-black text-xs sm:text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>Nous suivre</span>
                <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </button>
            </div>
          </div>

          <!-- Right side - Image with floating cards -->
          <div id="hero-image" class="relative h-56 sm:h-64 md:h-80 lg:h-[420px] transition-all duration-1000" :class="heroImageInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
            <!-- Main image -->
            <div class="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group">
              <img 
                src="/src/assets/images/montage_panneau.jpg" 
                alt="À propos d'EGENT TOGO"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-tr from-dark/40 via-transparent to-transparent group-hover:from-dark/20 transition-all duration-700"></div>
            </div>

            <!-- Floating card 1 - Top right -->
            <div class="absolute top-1 sm:top-3 md:top-6 -right-1 sm:-right-2 md:-right-3 lg:right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 w-40 sm:w-48 md:w-56 lg:w-64 shadow-lg sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20">
              <div class="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div class="w-7 sm:w-9 md:w-10 lg:w-12 h-7 sm:h-9 md:h-10 lg:h-12 bg-gradient-to-br from-[#EE6D08] to-orange-400 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-bolt text-xs sm:text-base md:text-lg lg:text-xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-xs sm:text-sm md:text-base lg:text-lg">Innovation</h3>
              </div>
              <p class="text-[10px] sm:text-xs md:text-sm text-black leading-tight">Solutions de demain</p>
            </div>

            <!-- Floating card 2 - Bottom left -->
            <div class="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 left-0 sm:left-2 md:left-3 lg:left-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 w-40 sm:w-48 md:w-56 lg:w-64 shadow-lg sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20">
              <div class="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div class="w-7 sm:w-9 md:w-10 lg:w-12 h-7 sm:h-9 md:h-10 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                  <i class="fas fa-leaf text-xs sm:text-base md:text-lg lg:text-xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-xs sm:text-sm md:text-base lg:text-lg">Durabilité</h3>
              </div>
              <p class="text-[10px] sm:text-xs md:text-sm text-black leading-tight">Énergie propre</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div class="text-white/40 text-xs sm:text-sm font-semibold flex flex-col items-center gap-1">
          <!-- <span class="hidden sm:inline">Découvrez plus</span> -->
          <svg class="w-4 sm:w-5 h-4 sm:h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Section Notre Histoire -->
    <div id="history-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-16 md:mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <!-- Carte verte avec statistiques -->
          <div class="bg-green-600 rounded-3xl p-8 text-white w-80 h-80 flex flex-col justify-around transition-all duration-1000 hover:shadow-2xl" :class="historyInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
            <div>
              <div class="text-5xl font-black mb-1">70%</div>
              <p class="text-sm font-semibold">Plus durable</p>
              <div class="h-1 bg-white/50 mt-2"></div>
            </div>
            <div>
              <div class="text-5xl font-black mb-1">120</div>
              <p class="text-sm font-semibold">Clients satisfaits</p>
              <div class="h-1 bg-white/50 mt-2"></div>
            </div>
            <div>
              <div class="text-5xl font-black mb-1">30%</div>
              <p class="text-sm font-semibold">D'économie</p>
            </div>
          </div>

          <!-- Contenu texte -->
          <div class="animate-fadeInUp animation-delay-200">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown">Notre Histoire</p>
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight animate-slideInDown animation-delay-200">NOTRE HISTOIRE</h2>
            <p class="text-lg text-gray-700 leading-relaxed animate-fadeInUp animation-delay-400">
              Tout commence en 2017 avec une ambition simple : apporter des solutions d'efficacité énergétique et d'électricité fiables là où le réseau montrait ses limites. Au fil des années, EGENT TOGO est devenue une référence en ingénierie électrique et en énergie solaire au Togo.<br>
              <br>
​Face au manque de techniciens qualifiés sur le marché, nous avons franchi une étape décisive en créant CREFER dès 2019, notre centre de formation spécialisé. Cette synergie unique nous permet aujourd'hui de garantir des installations d'une qualité irréprochable, portées par des experts formés aux standards internationaux.
            </p>
          </div>
        </div>
      </div>

      <!-- Section Nos Objectifs et Vision -->
      <div id="objectives-section" class="mb-16 md:mb-40 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-stretch">
          <!-- Contenu texte gauche -->
          <div class="flex flex-col justify-center">
            <!-- NOS OBJECTIFS -->
            <div class="mb-20 md:mb-24 animate-fadeInUp">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-2 h-16 bg-gradient-to-b from-orange-400 to-transparent rounded-full"></div>
                <div>
                  <p class="text-[#FF9D35] font-semibold mb-1 text-sm uppercase tracking-widest animate-slideInDown"></p>
                  <h2 class="text-4xl md:text-5xl font-black text-[#016E98] animate-slideInDown animation-delay-200">Notre objectif</h2>
                </div>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed animate-fadeInUp animation-delay-400">
                L'objectif principal d'EGENT TOGO est de démocratiser l'accès à l'énergie solaire au Togo, tout en formant une nouvelle génération de techniciens experts au sein du CREFER pour garantir l'excellence et la durabilité des installations énergétiques à travers la région.
              </p>
            </div>

            <!-- Ligne de séparation -->
            <div class="h-1 bg-gradient-to-r from-[#FF9D35] via-[#FF9D35]/50 to-transparent mb-20 md:mb-24 animate-fadeInUp animation-delay-200"></div>

            <!-- NOTRE VISION -->
            <div class="animate-fadeInUp animation-delay-400">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-2 h-16 bg-gradient-to-b from-blue-600 to-transparent rounded-full"></div>
                <div>
                  <p class="text-[#FF9D35] font-semibold mb-1 text-sm uppercase tracking-widest animate-slideInDown"></p>
                  <h2 class="text-4xl md:text-5xl font-black text-[#016E98] animate-slideInDown animation-delay-200">NOTRE VISION</h2>
                </div>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed animate-fadeInUp animation-delay-400">
                Notre vision est de devenir le leader incontesté de la transition énergétique en Afrique de l'Ouest. Nous aspirons à un Togo où chaque foyer, chaque ferme et chaque entreprise dispose d'une énergie propre, inépuisable et abordable.
              </p>
            </div>
          </div>

          <!-- Contenu visuel droite - Image portrait avec icônes -->
          <VisualContentSection />
        </div>
      </div>

      <!-- Section Pourquoi choisir EGENT TOGO -->
      <div id="advantages-section" class="mb-16 md:mb-24 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <!-- Image gauche -->
          <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-1000" :class="advantagesInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
            <img 
              src="/src/assets/images/photo_chantier.jpg" 
              alt="Équipe EGENT TOGO"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
          </div>

          <!-- Contenu droite avec cartes -->
          <div class="animate-fadeInUp">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown">Nos Avantages</p>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-[#016E98] mb-8 leading-tight animate-slideInDown animation-delay-200">
              POURQUOI CHOISIR LES<br/><span class="text-[#FF9D35]">SOLUTIONS EGENT TOGO</span> ?
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-12 animate-fadeInUp animation-delay-400">
              Nous nous engageons à fournir les meilleures solutions énergétiques avec expertise, fiabilité et engagement envers votre satisfaction. Chaque projet est réalisé avec précision et professionnalisme pour garantir votre succès énergétique.
            </p>

            <!-- Grille de 4 cartes -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <!-- Carte 1 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-fadeInUp" style="animation-delay: 0s">
                <div class="w-12 h-12 bg-[#EE6D08]/10 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-gem text-[#EE6D08] text-2xl"></i>
                </div>
                <h3 class="text-lg font-black text-[#016E98]">Équipement de Qualité</h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  Nous sélectionnons uniquement des équipements conformes aux normes internationales pour assurer performance et durabilité maximales.
                </p>
              </div>

              <!-- Carte 2 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-fadeInUp" style="animation-delay: 0.15s">
                <div class="w-12 h-12 bg-[#EE6D08]/10 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-leaf text-[#EE6D08] text-2xl"></i>
                </div>
                <h3 class="text-lg font-black text-[#016E98]">Énergie Durable</h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  Nos solutions énergétiques respectent l'environnement tout en réduisant votre consommation et vos factures pour un avenir plus vert et économique.
                </p>
              </div>

              <!-- Carte 3 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-fadeInUp" style="animation-delay: 0.3s">
                <div class="w-12 h-12 bg-[#EE6D08]/10 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-check-circle text-[#EE6D08] text-2xl"></i>
                </div>
                <h3 class="text-lg font-black text-[#016E98]">Installation sécurisée</h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  Nos équipes respectent les normes de sécurité strictes et utilisent les meilleures pratiques pour une installation fiable et sans risque.
                </p>
              </div>

              <!-- Carte 4 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-fadeInUp" style="animation-delay: 0.45s">
                <div class="w-12 h-12 bg-[#EE6D08]/10 rounded-lg flex items-center justify-center mb-4">
                  <i class="fas fa-users text-[#EE6D08] text-2xl"></i>
                </div>
                <h3 class="text-lg font-black text-[#016E98]">Technicien qualifié</h3>
                <p class="text-sm text-gray-600 leading-relaxed">
                  Notre équipe de techniciens certifiés possède une expertise approfondie pour garantir des installations optimales et un support technique d'excellence.
                </p>
              </div>
            </div>

            <!-- Boutons de navigation -->
            <!-- <div class="flex items-center gap-4 mt-8">
              <button class="w-12 h-12 bg-dark/20 hover:bg-dark/30 text-dark rounded-full flex items-center justify-center transition-colors duration-300">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="w-12 h-12 bg-dark/20 hover:bg-dark/30 text-dark rounded-full flex items-center justify-center transition-colors duration-300">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Section Notre Équipes -->
      <div id="team-section" class="mb-16 md:mb-24 py-16 md:py-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl px-8 md:px-16">
        <div class="text-center mb-16 md:mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown">Notre Équipe</p>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-[#016E98] mb-6 animate-slideInDown animation-delay-200">NOTRE <span class="text-[#FF9D35]">ÉQUIPES</span></h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-400">
            Nos experts passionnés sont au cœur de notre succès. Avec une expérience approfondie dans les énergies renouvelables et l'électricité générale, notre équipe s'engage à fournir des solutions innovantes et durables pour transformer votre accès à l'énergie.
          </p>
        </div>

        <!-- Grille d'équipes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Membre 1 -->
          <div class="group animate-fadeInUp" style="animation-delay: 0s">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="/src/assets/images/egent_reception.jpg" 
                alt="Professionnelle de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-[#016E98] group-hover:text-[#EE6D08] transition-colors duration-300">Koffi Diabaté</h3>
              <p class="text-[#EE6D08] font-bold text-sm">Chef du département énergie solaire</p>
            </div>
          </div>

          <!-- Membre 2 -->
          <div class="group animate-fadeInUp" style="animation-delay: 0.1s">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="/src/assets/images/chauffage_egent.jpg" 
                alt="Professionnelle de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-[#016E98] group-hover:text-[#EE6D08] transition-colors duration-300">Solim Gnitou</h3>
              <p class="text-[#EE6D08] font-bold text-sm">Chef du département climatisation</p>
            </div>
          </div>

          <!-- Membre 3 -->
          <div class="group animate-fadeInUp" style="animation-delay: 0.2s">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="/src/assets/images/photo_chantier.jpg" 
                alt="Professionnel de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-[#016E98] group-hover:text-[#EE6D08] transition-colors duration-300">Yacine Diallo</h3>
              <p class="text-[#EE6D08] font-bold text-sm">Chef du département installation</p>
            </div>
          </div>

          <!-- Membre 4 -->
          <div class="group animate-fadeInUp" style="animation-delay: 0.3s">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="/src/assets/images/montage_panneau2.jpg" 
                alt="Professionnelle de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-[#016E98] group-hover:text-[#EE6D08] transition-colors duration-300">Ama Mensah</h3>
              <p class="text-[#EE6D08] font-bold text-sm">Chef du département maintenance</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Nos Valeurs -->
      <!-- <div class="mb-16 md:mb-24">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-black text-dark mb-4">Nos Valeurs</h2>
          <p class="text-lg text-gray-600">Les principes qui guident nos actions</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> -->
          <!-- Valeur 1 -->
          <!-- <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-leaf text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Durabilité</h3>
            <p class="text-gray-600 leading-relaxed">Nous nous engageons à fournir des solutions respectueuses de l'environnement et durables.</p>
          </div> -->

          <!-- Valeur 2 -->
          <!-- <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-lightbulb text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Innovation</h3>
            <p class="text-gray-600 leading-relaxed">Nous développons constamment de nouvelles technologies énergétiques.</p>
          </div> -->

          <!-- Valeur 3 -->
          <!-- <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-b-4 border-secondary">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
              <i class="fas fa-handshake text-secondary text-3xl"></i>
            </div>
            <h3 class="text-2xl font-black text-dark mb-4">Engagement</h3>
            <p class="text-gray-600 leading-relaxed">Nous nous engageons envers nos clients et nos communautés locales.</p>
          </div>
        </div>
      </div> -->

      <!-- Section CTA - Solutions d'Énergie -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
      <div id="cta-about-section" class="mb-16 md:mb-24 py-16 md:py-24 bg-gradient-to-r from-blue-50/80 to-blue-100/80 backdrop-blur-sm rounded-3xl px-8 md:px-16 border border-blue-200/50">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <!-- Contenu texte gauche -->
          <div class="flex flex-col justify-center animate-fadeInUp">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-slideInDown">Solutions Énergétiques</p>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-[#016E98] mb-8 leading-tight animate-slideInDown animation-delay-200">
              DITES AU REVOIR AUX <span class="text-[#FF9D35]">PANNES</span><br/>D'ÉLECTRICITÉ ET<br/>AUX <span class="text-[#FF9D35]">FACTURES SALÉES.</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 animate-fadeInUp animation-delay-400">
              Nous vous proposons des solutions d'énergie renouvelable pour votre maison ou votre entreprise à des prix abordables. Une première étape vers un avenir plus vert et économe en énergie.
            </p>
            <div class="animate-fadeInUp animation-delay-400">
              <button @click="navigateTo('/devis')" class="bg-gradient-to-r from-[#EE6D08] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105">
                Demander un devis
              </button>
            </div>
          </div>

          <!-- Image droite -->
          <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group transition-all duration-1000" :class="ctaAboutInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
            <img 
              src="/src/assets/images/photo_chantier2.jpg" 
              alt="Solutions d'énergie renouvelable"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-blue-800/50 animate-fadeInUp">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-6 animate-slideInDown">Prêt à Rejoindre Notre Mission ?</h2>
        <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">Contactez-nous pour découvrir comment nous pouvons transformer votre accès à l'énergie.</p>
        <button @click="navigateTo('/Contact')" class="bg-[#EE6D08] hover:bg-orange-600 text-white font-black px-8 py-4 rounded-full transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg animate-fadeInUp animation-delay-400">
          Rejoignez-nous
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'
import VisualContentSection from '../components/VisualContentSection.vue'

const router = useRouter()
useCursorFollowText()

const navigateTo = (path) => {
  router.push(path)
}

// Reactive refs for animations
const heroImageInView = ref(false)
const historyInView = ref(false)
const objectivesInView = ref(false)
const advantagesInView = ref(false)
const teamInView = ref(false)
const ctaAboutInView = ref(false)

// Setup Intersection Observer
const setupObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'hero-image') heroImageInView.value = true
        if (entry.target.id === 'history-section') historyInView.value = true
        if (entry.target.id === 'objectives-section') objectivesInView.value = true
        if (entry.target.id === 'advantages-section') advantagesInView.value = true
        if (entry.target.id === 'team-section') teamInView.value = true
        if (entry.target.id === 'cta-about-section') ctaAboutInView.value = true
      }
    })
  }, observerOptions)

  // Observe all sections
  const elements = [
    'hero-image',
    'history-section',
    'objectives-section',
    'advantages-section',
    'team-section',
    'cta-about-section'
  ]
  
  elements.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  setupObserver()
})
</script>
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

@keyframes shimmer {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

.delay-2000 {
  animation-delay: 2s;
}

.delay-4000 {
  animation-delay: 4s;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

h1 {
  animation: slideInUp 0.8s ease-out;
}

p {
  animation: slideInUp 0.8s ease-out 0.1s backwards;
}

button {
  animation: slideInUp 0.8s ease-out 0.2s backwards;
}

.group > div {
  animation: slideInUp 0.8s ease-out 0.3s backwards;
}
</style>