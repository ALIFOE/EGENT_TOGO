<template>
  <div>
    <!-- Hero Section -->
    <section 
      id="home" 
      class="relative overflow-visible -mt-32 pt-0 pb-20 md:pb-32 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero1})` }"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div class="flex items-center justify-center">
          <!-- Content -->
          <div class="z-10 max-w-3xl text-center">
            <h1 class="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              ÉCRIVONS L'AVENIR DE
              <span class="text-secondary font-black">L'ÉNERGIE</span>
              AU TOGO
            </h1>
            <p class="text-white text-lg mb-8 opacity-100">
              Rejoignez-nous pour bâtir des solutions durables et innovantes, adaptées aux besoins énergétiques de demain au Togo et en Afrique.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button @click="navigateTo('/devis')" class="btn-primary rounded-lg">Demander un devis</button>
              <button @click="navigateTo('/galerie')" class="btn-secondary rounded-lg">Voir nos projets</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="px-4 -mt-12 mb-12 relative z-10">
      <div class="max-w-7xl mx-auto bg-[#2F7914] rounded-3xl shadow-lg overflow-hidden">
        <div class="px-6 lg:px-8 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
                  <i class="fas fa-map-marker-alt text-[#2F7914] text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white text-sm font-semibold leading-relaxed">Rue des Ouvriers,<br>Totsi Gblenkomé<br>04 BP 874 - Lomé, Togo</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
                  <i class="fas fa-phone text-[#2F7914] text-xl"></i>
                </div>
              </div>
              <div>
                <p class="text-white font-semibold">+228 92 53 14 55</p>
                <p class="text-white font-semibold">+228 91 20 43 73</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center h-14 w-14 rounded-full bg-white">
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
    </div>

    <!-- About Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div class="order-2 md:order-1">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">À PROPOS DE NOUS</p>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-6 leading-tight">VOTRE AVENIR D'AUTONOMIE ÉNERGÉTIQUE AVEC NOUS</h2>
            
            <p class="text-gray-600 mb-8 leading-relaxed text-lg">
              Chez EGENT TOGO, notre objectif est de fournir des solutions énergétiques durables en se spécialisant dans la fourniture et l'installation d'équipements solaires ainsi que dans l'électricité générale. Depuis 2015, nous accompagnons les particuliers et les entreprises togolaises vers l'autonomie énergétique.
            </p>

            <button @click="navigateTo('/a-propos')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
          </div>

          <!-- Image -->
          <div class="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1509391366360-2e938148ae23?w=500&h=400&fit=crop" 
              alt="Énergie autonome"
              class="w-full rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos services</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight">NOUS OFFRONS DES SOLUTIONS ÉNERGÉTIQUES DURABLES</h2>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Service 1: Électricité Générale -->
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer">
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
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer">
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
          <div @click="navigateTo('/services')" class="group relative overflow-hidden rounded-3xl h-80 cursor-pointer">
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
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button @click="navigateTo('/services')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <!-- Image -->
          <div class="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=600&fit=crop" 
              alt="Pourquoi nous choisir"
              class="w-full rounded-3xl shadow-2xl"
            />
          </div>

          <!-- Content -->
          <div class="order-1 md:order-2">
            <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos valeurs</p>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-6 leading-tight">POURQUOI CHOISIR LES SOLUTIONS EGENT TOGO ?</h2>
            
            <p class="text-gray-600 mb-12 leading-relaxed text-lg">
              EGENT TOGO se distingue par son engagement envers la qualité, l'innovation et la satisfaction client. Nous utilisons uniquement des équipements certifiés et nos techniciens sont formés aux dernières technologies en matière d'énergie renouvelable.
            </p>

            <div class="grid grid-cols-2 gap-6">
              <!-- Feature 1 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-gem text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#05075F] text-lg mb-3">Équipement de Qualité</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Tous nos équipements sont certifiés et proviennent de marques internationales réputées pour leur durabilité.</p>
              </div>

              <!-- Feature 2 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-bolt text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#05075F] text-lg mb-3">Énergie Durable</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Nos solutions réduisent votre consommation d'électricité et votre empreinte carbone pour un avenir plus vert.</p>
              </div>

              <!-- Feature 3 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-shield-alt text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#05075F] text-lg mb-3">Installation sécurisée</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Nos installations respectent les normes de sécurité internationales pour protéger votre investissement.</p>
              </div>

              <!-- Feature 4 -->
              <div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div class="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF9D35]/10 mb-4">
                  <i class="fas fa-users text-[#FF9D35] text-2xl"></i>
                </div>
                <h3 class="font-black text-[#05075F] text-lg mb-3">Technicien qualifié</h3>
                <p class="text-gray-600 text-sm leading-relaxed">Notre équipe dispose de certifications professionnelles et d'années d'expérience en installations énergétiques.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <p class="text-[#FF9D35] font-semibold mb-3 text-sm uppercase tracking-widest">Nos produits</p>
          <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-6">DÉCOUVREZ NOS PRODUITS PHARES</h2>
          <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Nous proposons une gamme complète de solutions énergétiques pour particuliers et entreprises, conçues pour optimiser votre consommation et maximiser vos économies.
          </p>
        </div>

        <!-- Products Grid - 3 Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
          <!-- Product 1: Armoire Billy -->
          <div class="flex flex-col h-full">
            <div class="relative bg-blue-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" @click="navigateTo('/products')">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=389&h=446&fit=crop" 
                alt="Armoire Billy"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 bottom-0 bg-white p-6 rounded-b-3xl">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Armoire Billy</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Solution anti délestage performante pour éviter les coupures de courant. Remplace efficacement les groupes électrogènes avec zéro émission.
                </p>
              </div>
            </div>
          </div>

          <!-- Product 2: Lampadaires EGENT Solar - CENTER/LARGER -->
          <div class="flex flex-col-reverse h-full md:-mt-12">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow cursor-pointer" @click="navigateTo('/products')">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=389&h=446&fit=crop" 
                alt="Lampadaires EGENT Solar"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 top-0 bg-white p-6 rounded-t-3xl">
                <h3 class="text-3xl font-black text-[#0392C7] mb-2">Lampadaires<br>EGENT SOLAR</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Lampadaires solaires autonomes et écologiques pour illuminer vos routes, places publiques et espaces extérieurs sans coût d'électricité.
                </p>
              </div>
            </div>
          </div>

          <!-- Product 3: Kit Zoklin -->
          <div class="flex flex-col h-full">
            <div class="relative bg-orange-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer" @click="navigateTo('/products')">

              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=389&h=446&fit=crop" 
                alt="Kit Zoklin"
                class="w-[389px] h-[446px] object-cover"
              />
              <div class="absolute inset-x-0 bottom-0 bg-white p-6 rounded-b-3xl">
                <h3 class="text-2xl font-black text-[#0392C7] mb-2">Kit Zoklin</h3>
                <p class="text-gray-700 text-sm leading-relaxed">
                  Kit solaire préconçu et complet pour une installation rapide et facile. Parfait pour débuter votre transition énergétique en toute confiance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="text-center">
          <button @click="navigateTo('/products')" class="btn-primary rounded-lg px-8 py-3 text-lg font-semibold">En savoir plus</button>
        </div>
      </div>
    </section>

    <!-- CTA Section: Dites au revoir aux pannes -->
    <section class="bg-[#EDFAFF] py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] leading-tight mb-8">DITES AU REVOIR AUX PANNES<br>D'ÉLECTRICITÉ ET<br>AUX FACTURES SALÉES.</h2>
            
            <p class="text-[#05075F] mb-8 leading-relaxed text-lg">
              Nous vous proposons des solutions d'énergie renouvelable adaptées à votre maison ou votre entreprise à des prix abordables. Rejoignez les centaines de clients satisfaits qui ont déjà réduit leurs factures d'électricité.
            </p>

          <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-300">
            Demander un devis
          </button>
          </div>

          <!-- Image -->
          <div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop" 
              alt="Professionnelle énergie solaire"
              class="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import hero1 from '/src/assets/images/hero1.jpg?url'

const router = useRouter()

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
</script>
