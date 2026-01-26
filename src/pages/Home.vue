<template>
  <div>
    <!-- Hero Section -->
    <div class="flex justify-center pt-8 pb-4 animate-pulse">
      <span class="text-xl md:text-2xl font-black text-[#2F7914] tracking-widest uppercase animate-bounce"></span>
    </div>
    <section 
      id="home" 
      class="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center overflow-hidden -mt-24 md:-mt-48 pt-0"
      :style="{ backgroundImage: `url(${hero1})` }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-start justify-center">
        <div class="flex items-start justify-center w-full">
          <!-- Content -->
          <div class="z-10 max-w-4xl text-center pt-16 md:pt-40 px-2 sm:px-4">
            <h1 class="text-4xl md:text-5xl lg:text-5xl font-black leading-tight drop-shadow-lg animate-fadeInUp translate-y-6">
              <span class="text-white">Écrivons l'Avenir de </span>
              <span class="text-white">l'Énergie</span>
              <br />
              <span class="text-white">au Togo et en Afrique.</span>
            </h1>
            <!-- <p class="text-white text-lg mb-8 opacity-100 animate-fadeInUp animation-delay-200">
              Rejoignez-nous pour bâtir des solutions durables et innovantes, adaptées aux besoins énergétiques de demain au Togo et en Afrique.
            </p> -->
            <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
              <button @click="navigateTo('/devis')" class="btn-primary rounded-lg hover:scale-105 transition-transform duration-300">Demander un devis</button>
              <button @click="navigateTo('/galerie')" class="btn-secondary rounded-lg hover:scale-105 transition-transform duration-300">Voir nos projets</button>
            </div> -->
          </div>
        </div>
      </div>
    </section>
    <!-- Contact Info Section - déborde sur la section blanche -->
    <!-- <div class="px-4 -mt-12 mb-12 relative z-10 animate-fadeInUp animation-delay-600">
      <div class="max-w-7xl mx-auto bg-[#2F7914] rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
        <div class="px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-center">
            <div class="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 animate-slideInDown" style="animation-delay: 0s">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white hover:bg-[#FF9D35] transition-colors duration-300">
                  <i class="fas fa-map-marker-alt text-[#2F7914] text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white text-sm font-semibold leading-relaxed">Rue des Ouvriers,<br>Totsi Gblenkomé<br>04 BP 874 - Lomé, Togo</p>
              </div>
            </div>
            <div class="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 animate-slideInDown" style="animation-delay: 0.1s">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white hover:bg-[#FF9D35] transition-colors duration-300">
                  <i class="fas fa-phone text-[#2F7914] text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white font-semibold">+228 92 53 14 55</p>
                <p class="text-white font-semibold">+228 91 20 43 73</p>
              </div>
            </div>
            <div class="flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 animate-slideInDown" style="animation-delay: 0.2s">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white hover:bg-[#FF9D35] transition-colors duration-300">
                  <i class="fas fa-envelope text-[#2F7914] text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white font-semibold">infos@egenttogo.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- About Section -->
    <section id="about-section" class="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div class="order-2 md:order-1 transition-all duration-1000" :class="aboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">L’EXPERTISE SOLAIRE AU TOGO</p>
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight">LEADER DE VOTRE TRANSITION ÉNERGÉTIQUE.</h2>
            
            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
              Depuis 2019, EGENT TOGO s’impose comme la référence en solutions solaires à Lomé et dans la sous-région. Nous ne nous contentons pas d’installer des panneaux : nous concevons des systèmes durables qui garantissent la continuité de vos activités et de votre confort.
            </p>

            <button @click="navigateTo('/a-propos')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-300">Confier mon projet à un expert</button>
          </div>

          <!-- Image -->
          <div class="order-1 md:order-2 transition-all duration-1000" :class="aboutInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'">
            <img 
              src="/src/assets/images/montage_panneau.jpg" 
              alt="Énergie autonome"
              class="w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="bg-gradient-to-br from-white to-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 animate-fadeInUp">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">Nos services</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES DURABLES</h2>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Service 1: Energie Solaire -->
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer transition-all duration-500 hover:scale-105 animate-fadeInUp" style="animation-delay: 0s">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/Energysolaire.webp" 
                alt="Électricité générale"
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
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:rotate-90">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 2: Climatisation & Froid -->
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer transition-all duration-500 hover:scale-105 animate-fadeInUp" style="animation-delay: 0.15s">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/electricitegen.webp" 
                alt="Climatisation"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <!-- Gradient Overlay (stays still) -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
            
            <!-- Text Content -->
            <div class="absolute inset-0 flex items-end justify-between p-6 rounded-3xl">
              <h3 class="text-2xl md:text-3xl font-black text-white">ÉLECTRICITE<br>GÉNERALE</h3>
            </div>
            
            <!-- Button -->
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>

          <!-- Service 3: Énergie Solaire -->
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer transition-all duration-500 hover:scale-105 animate-fadeInUp" style="animation-delay: 0.3s">
            <!-- Image Container with Zoom Effect -->
            <div class="absolute inset-0 overflow-hidden rounded-3xl">
              <img 
                src="/src/assets/images/friod.webp" 
                alt="Énergie solaire"
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
            <div class="absolute -bottom-3 -right-3 w-20 h-20 bg-[#2F7914] rounded-full flex items-center justify-center transition-transform duration-300 ring-[12px] ring-white shadow-lg hover:scale-110 group-hover:rotate-90">
              <i class="fas fa-arrow-right text-white text-lg"></i>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button @click="navigateTo('/services')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-choose-section" class="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <!-- Image -->
          <div class="order-2 md:order-1 transition-all duration-1000" :class="whyChooseInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'">
            <img 
              src="/src/assets/images/FP.png" 
              alt="Pourquoi nous choisir"
              class="w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="order-1 md:order-2 transition-all duration-1000" :class="whyChooseInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">Nos valeurs</p>
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight">POURQUOI CHOISIR LES SOLUTIONS EGENT TOGO ?</h2>
            
            <p class="text-gray-600 mb-12 leading-relaxed text-lg">
              EGENT TOGO se distingue par son engagement envers la qualité, l'innovation et la satisfaction client. Nous utilisons uniquement des équipements certifiés et nos techniciens sont formés aux dernières technologies en matière d'énergie renouvelable.
            </p>

            <div class="grid grid-cols-2 gap-6">
              <!-- Feature 1 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 hover:-translate-y-2 animate-fadeInUp" style="animation-delay: 0s">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-gem text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-lg mb-3">Équipement de Qualité</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Tous nos équipements sont certifiés et proviennent de marques internationales réputées pour leur durabilité.</p>
              </div>

              <!-- Feature 2 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 hover:-translate-y-2 animate-fadeInUp" style="animation-delay: 0.1s">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-bolt text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-lg mb-3">Énergie Durable</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Nos solutions réduisent votre consommation d'électricité et votre empreinte carbone pour un avenir plus vert.</p>
              </div>

              <!-- Feature 3 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 hover:-translate-y-2 animate-fadeInUp" style="animation-delay: 0.2s">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-shield-alt text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-lg mb-3">Installation sécurisée</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Nos installations respectent les normes de sécurité internationales pour protéger votre investissement.</p>
              </div>

              <!-- Feature 4 -->
              <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 hover:scale-105 hover:-translate-y-2 animate-fadeInUp" style="animation-delay: 0.3s">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-users text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#016E98] text-lg mb-3">Technicien qualifié</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Notre équipe dispose de certifications professionnelles et d'années d'expérience en installations énergétiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section id="partners-section" class="bg-gradient-to-br from-white to-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 animate-fadeInUp">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">Nos partenaires</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6">Ils nous font confiance</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Ils sont nombreux à nous faire confiance
          </p>
        </div>

        <!-- Partners Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          <!-- Partner 1 - TotalEnergies -->
          <div class="flex items-center justify-center h-40 w-40 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group animate-fadeInUp p-4" style="animation-delay: 0s">
            <img 
              src="/src/assets/images/totalenergies.svg"
              alt="TotalEnergies"
              class="w-full h-full object-contain group-hover:scale-125 transition-transform duration-300"
            />
          </div>

          <!-- Partner 2 - Ecobank -->
          <div class="flex items-center justify-center h-40 w-40 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group animate-fadeInUp p-4" style="animation-delay: 0.1s">
            <img 
              src="/src/assets/images/Ecobank_logo1.png" 
              alt="Ecobank"
              class="w-full h-full object-contain group-hover:scale-125 transition-transform duration-300"
            />
          </div>

          <!-- Partner 3 - OIM -->
          <div class="flex items-center justify-center h-40 w-40 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group animate-fadeInUp p-4" style="animation-delay: 0.2s">
            <img 
              src="/src/assets/images/Logo_OIM.png" 
              alt="OIM"
              class="w-full h-full object-contain group-hover:scale-125 transition-transform duration-300"
            />
          </div>

          <!-- Partner 4 - FAO -->
          <div class="flex items-center justify-center h-40 w-40 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group animate-fadeInUp p-4" style="animation-delay: 0.3s">
            <img 
              src="/src/assets/images/FAO2.png" 
              alt="FAO"
              class="w-full h-full object-contain group-hover:scale-125 transition-transform duration-300"
            />
          </div>

          <!-- Partner 5 - CREFERL -->
          <div class="flex items-center justify-center h-40 w-40 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer group animate-fadeInUp p-4" style="animation-delay: 0.4s">
            <img 
              src="/src/assets/images/crefer2.png" 
              alt="CREFER"
              class="w-full h-full object-contain group-hover:scale-125 transition-transform duration-300"
            />
          </div>
        </div>

        <!-- Partnership CTA -->
        <div class="text-center mt-20">
          <p class="text-gray-600 text-lg mb-6">Intéressé par un partenariat ?</p>
          <button @click="navigateTo('/contact')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform duration-300">
            Nous contacter
          </button>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products-section" class="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20 animate-fadeInUp">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">Nos produits phares</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6">DÉCOUVREZ NOS PRODUITS PHARES</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Nous proposons une gamme complète de solutions énergétiques pour particuliers et entreprises, conçues pour optimiser votre consommation et maximiser vos économies.
          </p>
        </div>

        <!-- Products Grid - Dynamic from Firebase (Kit Zoklin en premier) -->
        <div v-if="products && products.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          <div 
            v-for="(product, index) in getSortedProducts()" 
            :key="product.id" 
            class="flex flex-col h-full transition-all duration-500 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer group" 
            :class="productsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'" 
            :style="{ transitionDelay: `${index * 0.15}s` }"
            @click="navigateTo(`/produits/${product.slug || product.id}`)"
          >
            <!-- Product Image Section -->
            <div v-if="product.image || product.mainImage" class="relative w-full h-auto overflow-hidden bg-gray-200 flex items-center justify-center">
              <img 
                :src="product.image || product.mainImage" 
                :alt="product.name || product.title || 'Produit'"
                class="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                @error="(e) => e.target.src = '/images/montage_panneau.jpg'"
              />
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
            <!-- Placeholder if no image -->
            <div v-else class="w-full h-80 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div class="text-center">
                <i class="fas fa-image text-gray-400 text-4xl mb-2 block"></i>
                <p class="text-gray-500 text-sm">Image à venir</p>
              </div>
            </div>

            <!-- Product Info Card -->
            <div class="bg-white p-6 flex flex-col flex-grow">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-xl font-black text-[#0392C7] group-hover:text-[#EE6D08] transition-colors flex-grow">{{ product.name || product.title || 'Produit' }}</h3>
                <span v-if="product.featured" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold whitespace-nowrap ml-2">⭐ Phare</span>
              </div>
              
              <!-- Clean Description Text -->
              <p class="text-gray-700 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                {{ cleanHtml(product.description || product.shortDescription) || 'Découvrez ce produit innovant.' }}
              </p>

              <!-- Price if available -->
              <p v-if="product.price" class="text-[#FF9D35] font-black text-lg mb-4">{{ product.price }}</p>

              <!-- Detail Button -->
              <button 
                @click.stop="navigateTo(`/produits/${product.slug || product.id}`)"
                class="w-full bg-[#0392C7] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#016E98] transition-colors duration-300 cursor-pointer mt-auto"
              >
                Détail
              </button>
            </div>
          </div>
        </div>
        
        <!-- No Products Message -->
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">Chargement des produits en cours...</p>
        </div>

        <!-- View All CTA Button -->
        <div class="text-center">
          <router-link 
            to="/produits" 
            class="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF9D35] to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-10 py-4 rounded-full font-black text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Voir tous nos produits</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials-section" class="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20 animate-fadeInUp">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest animate-pulse">Témoignages</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6">CE QUE NOS CLIENTS DISENT DE NOUS</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Découvrez les histoires de réussite de nos clients qui ont transformé leur consommation énergétique grâce à nos solutions innovantes.
          </p>
        </div>

        <!-- Testimonials Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Testimonial 1 -->
          <div class="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fadeInUp" style="animation-delay: 0s">
            <!-- Top Gradient Bar -->
            <div class="h-1 bg-gradient-to-r from-[#EE6D08] via-[#FF9D35] to-[#016E98] rounded-t-3xl"></div>
            
            <!-- Profile Image -->
            <!-- Profile Image -->
            <div class="flex justify-center -mt-12 relative z-10">
              <img 
                src="/src/assets/images/testimonials/testimony-01.png" 
                alt="VON WALTER"
                
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover testimonial-image cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div class="p-8 pt-6">
              <!-- Stars -->
              <div class="flex items-center gap-1 mb-8 justify-center">
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
              </div>

              <!-- Quote -->
              <p class="text-gray-700 text-base leading-relaxed mb-8 italic text-center">
                "L'argent c'est important, mais le plus important est de bien dormir. Avec l'installation de EGENT TOGO depuis 4ans, je dors sans soucis parce que j'ai de l'énergie à tout moment. Je suis satisfait, et j'ai déjà recommandé EGENT TOGO à mes contacts."
              </p>

              <!-- Client Info -->
              <div class="flex flex-col items-center justify-center pt-4 border-t border-gray-200">
                <h4 class="font-black text-[#016E98] text-base">VON WALTER</h4>
                <p class="text-gray-500 text-sm">Retraité électricien</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 2 -->
          <div class="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fadeInUp" style="animation-delay: 0.15s">
            <!-- Top Gradient Bar -->
            <div class="h-1 bg-gradient-to-r from-[#016E98] via-[#EE6D08] to-[#2F7914] rounded-t-3xl"></div>
            
            <!-- Profile Image -->
            <div class="flex justify-center -mt-12 relative z-10">
              <img 
                src="/src/assets/images/testimonials/testimony-02.png" 
                alt="Famille ALOMASSOR"
                
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover testimonial-image cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            <div class="p-8 pt-6">
              <!-- Stars -->
              <div class="flex items-center gap-1 mb-8 justify-center">
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
              </div>

              <!-- Quote -->
              <p class="text-gray-700 text-base leading-relaxed mb-8 italic text-center">
                "Nous sommes autonomes en énergie électrique grace à EGENT TOGO. Après le choix de notre kit Zoklin, l'équipe EGENT TOGO a réalisé les travaux en 48h, nous sommes autonomes en énergie électrique."
              </p>

              <!-- Client Info -->
              <div class="flex flex-col items-center justify-center pt-4 border-t border-gray-200">
                <h4 class="font-black text-[#016E98] text-base">Famille ALOMASSOR</h4>
                <p class="text-gray-500 text-sm">Couple retraité</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 3 -->
          <!-- <div class="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fadeInUp" style="animation-delay: 0.3s"> -->
            <!-- Top Gradient Bar -->
            <!-- <div class="h-1 bg-gradient-to-r from-[#2F7914] via-[#8AB00D] to-[#EE6D08] rounded-t-3xl"></div> -->
            
            <!-- Profile Image -->
            <!-- <div class="flex justify-center -mt-12 relative z-10">
              <img 
                src="/src/assets/images/testimony-01.png" 
                alt="VON WALTER"
                @click="openLightbox('/src/assets/images/testimony-01.png')"
                class="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover testimonial-image"
              />
            </div> -->
            
            <!-- <div class="p-8 pt-6"> -->
              <!-- Stars -->
              <!-- <div class="flex items-center gap-1 mb-8 justify-center">
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
                <i class="fas fa-star text-[#FF9D35] text-xl"></i>
              </div> -->

              <!-- Quote -->
              <!-- <p class="text-gray-700 text-base leading-relaxed mb-8 italic text-center">
                "Les lampadaires EGENT Solar ont illuminé notre quartier sans aucun coût d'électricité. C'est écologique, fiable et vraiment innovant. Bravo à EGENT TOGO pour cette solution!"
              </p> -->

              <!-- Client Info -->
              <!-- <div class="flex flex-col items-center justify-center pt-4 border-t border-gray-200">
                <h4 class="font-black text-[#016E98] text-base">Ekué Laurent</h4>
                <p class="text-gray-500 text-sm">Syndic, Kpalimé</p>
              </div>
            </div> -->
          <!-- </div> -->
        </div>

        <!-- Stats Section -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"> -->
          <!-- Stat 1 -->
          <!-- <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105 animate-fadeInUp" style="animation-delay: 0s">
            <div class="flex items-center justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#EE6D08] to-[#FF9D35] flex items-center justify-center">
                <i class="fas fa-check-circle text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-4xl font-black text-[#016E98] mb-2">500+</h3>
            <p class="text-gray-600 font-semibold">Clients Satisfaits</p>
          </div> -->

          <!-- Stat 2 -->
          <!-- <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105 animate-fadeInUp" style="animation-delay: 0.1s">
            <div class="flex items-center justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#016E98] to-[#0392C7] flex items-center justify-center">
                <i class="fas fa-project-diagram text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-4xl font-black text-[#016E98] mb-2">1000+</h3>
            <p class="text-gray-600 font-semibold">Projets Réalisés</p>
          </div> -->

          <!-- Stat 3 -->
          <!-- <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105 animate-fadeInUp" style="animation-delay: 0.2s">
            <div class="flex items-center justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#2F7914] to-[#8AB00D] flex items-center justify-center">
                <i class="fas fa-leaf text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-4xl font-black text-[#016E98] mb-2">2000+</h3>
            <p class="text-gray-600 font-semibold">Tonnes CO2 Évitées</p>
          </div> -->

          <!-- Stat 4 -->
          <!-- <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:scale-105 animate-fadeInUp" style="animation-delay: 0.3s">
            <div class="flex items-center justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF9D35] to-[#EE6D08] flex items-center justify-center">
                <i class="fas fa-award text-white text-2xl"></i>
              </div>
            </div>
            <h3 class="text-4xl font-black text-[#016E98] mb-2">10+</h3>
            <p class="text-gray-600 font-semibold">Ans d'Expérience</p>
          </div>
        </div> -->

        <!-- CTA -->
        <!-- <div class="text-center">
          <p class="text-gray-700 text-lg mb-6">Rejoignez nos clients satisfaits et transformez votre consommation énergétique dès aujourd'hui!</p>
          <button @click="navigateTo('/devis')" class="bg-gradient-to-r from-[#EE6D08] to-[#FF9D35] hover:from-[#d95c07] hover:to-orange-600 text-white px-10 py-4 text-lg font-black rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md">
            Demander un devis gratuit
          </button>
        </div> -->
      </div>
    </section>

    <!-- CTA Section: Dites au revoir aux pannes -->
    <section id="cta-section" class="bg-gradient-to-r from-[#0392C7]/10 to-[#016E98]/10 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div class="transition-all duration-1000" :class="ctaInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'">
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-8">DITES AU REVOIR AUX PANNES<br>D'ÉLECTRICITÉ ET<br>AUX FACTURES SALÉES.</h2>
            
            <p class="text-[#016E98] mb-8 leading-relaxed text-lg">
              Nous vous proposons des solutions d'énergie renouvelable adaptées à votre maison ou votre entreprise à des prix abordables. Rejoignez les centaines de clients satisfaits qui ont déjà réduit leurs factures d'électricité.
            </p>

          <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Demander un devis
          </button>
          </div>

          <!-- Image -->
          <div class="transition-all duration-1000" :class="ctaInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'">
            <img 
              src="/src/assets/images/DAUREVOIR.png" 
              alt="Professionnelle énergie solaire"
              class="w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox Modal -->
    <div v-if="selectedImage" class="lightbox-overlay" @click="closeModal">
      <button class="lightbox-close-btn" @click="closeModal" title="Fermer (Esc)">
        <i class="fas fa-times"></i>
      </button>
      <div class="lightbox-content" @click.stop>
        <img 
          :src="selectedImage" 
          alt="Image agrandie" 
          class="lightbox-image"
          @error="(e) => {
            console.error('Erreur chargement image:', selectedImage)
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23ccc%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2220%22 fill=%22%23999%22%3EImage non trouvée%3C/text%3E%3C/svg%3E'
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'
import hero1 from '/src/assets/images/headepage.webp?url'

// Initialize Google Analytics
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-65BEBH9XRC');
}

const router = useRouter()
const { setMeta } = useSEOMeta()
const { products, listenToProducts, unlistenToProducts } = useFirebaseData()

useCursorFollowText()
const aboutInView = ref(false)
const productsInView = ref(false)
const whyChooseInView = ref(false)
const testimonialsInView = ref(false)
const ctaInView = ref(false)
const selectedImage = ref(null)

const closeModal = () => {
  selectedImage.value = null
}

const openLightbox = (imageSrc) => {
  console.log('Opening lightbox with image:', imageSrc)
  selectedImage.value = imageSrc
}

// Intersection Observer pour les animations
const setupObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'about-section' && entry.isIntersecting) {
        aboutInView.value = true
      }
      if (entry.target.id === 'products-section' && entry.isIntersecting) {
        productsInView.value = true
      }
      if (entry.target.id === 'why-choose-section' && entry.isIntersecting) {
        whyChooseInView.value = true
      }
      if (entry.target.id === 'testimonials-section' && entry.isIntersecting) {
        testimonialsInView.value = true
      }
      if (entry.target.id === 'cta-section' && entry.isIntersecting) {
        ctaInView.value = true
      }
    })
  }, { threshold: 0.1 })

  const sections = [
    'about-section',
    'products-section',
    'why-choose-section',
    'testimonials-section',
    'cta-section'
  ]

  sections.forEach(id => {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  })
}

onMounted(() => {
  setupObserver()
  
  // 🔄 Activer le listener en temps réel pour les produits
  listenToProducts()
  
  // ✅ SEO OPTIMISÉ POUR LA PAGE D'ACCUEIL
  setMeta(
    'EGENT TOGO - Solutions Énergie Solaire & Climatisation au Togo',
    'EGENT TOGO: leader des solutions d\'énergie solaire, climatisation et électricité durable au Togo. 500+ projets réalisés, 10K+ clients. Devis gratuit.',
    '/src/assets/images/montage_panneau.jpg',
    '/',
    {
      type: 'website',
      siteName: 'EGENT TOGO',
      imageWidth: '1200',
      imageHeight: '630'
    }
  )
  
  // Ajouter l'event listener pour la touche Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  })
})

// 🛑 Nettoyer le listener au démontage du composant
onUnmounted(() => {
  unlistenToProducts()
})

// Navigation vers une route
const navigateTo = (path) => {
  router.push(path)
}

// Scroll vers la section contact (Footer)
const scrollToContact = () => {
  const footer = document.querySelector('footer')
  if (footer) {
    footer.scrollIntoView({ behavior: 'smooth' })
  }
}

// 🧹 Nettoyer le HTML depuis l'éditeur Quill
const cleanHtml = (html) => {
  if (!html) return ''
  
  // Enlever tous les tags HTML
  let text = html
    .replace(/<[^>]*>/g, ' ') // Enlever tous les tags
    .replace(/&nbsp;/g, ' ') // Remplacer &nbsp;
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Remplacer les espaces multiples
    .trim()
  
  // Limiter à 150 caractères max pour l'affichage
  return text.length > 150 ? text.substring(0, 150) + '...' : text
}

// 🎯 Trier les produits pour mettre Kit Zoklin en premier
const getSortedProducts = () => {
  if (!products.value || products.value.length === 0) return []
  
  const sorted = [...products.value]
  const kitZoklin = sorted.find(p => 
    p.name?.toLowerCase().includes('zoklin') || 
    p.title?.toLowerCase().includes('zoklin')
  )
  
  if (kitZoklin) {
    // Enlever Kit Zoklin de la liste
    const filteredProducts = sorted.filter(p => p.id !== kitZoklin.id)
    // Remettre Kit Zoklin en premier
    return [kitZoklin, ...filteredProducts].slice(0, 3)
  }
  
  return sorted.slice(0, 3)
}
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(238, 109, 8, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(238, 109, 8, 0.6);
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

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: zoomIn 0.3s ease-out;
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.lightbox-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  font-size: 28px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 51;
}

.lightbox-close-btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

.testimonial-image {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.testimonial-image:hover {
  transform: scale(1.05);
}
</style>
