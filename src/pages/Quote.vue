<template>
  <div>
    <!-- Hero Section Quote -->
    <div id="hero-quote" class="bg-gradient-to-br from-blue-900 via-blue-800 to-dark relative -mt-32 pt-0 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <!-- Grain effect overlay -->
      <div class="absolute inset-0 opacity-60" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noiseFilter%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 result=%22noise%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noiseFilter)%22 opacity=%220.4%22/></svg>'); background-size: 100px 100px;"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <!-- Section Titre Hero -->
        <div class="text-center">
          <p class="text-[#EE6D08] font-semibold mb-4 text-sm uppercase tracking-widest animate-slideInDown animation-delay-200">Obtenir un tarif personnalisé</p>
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-slideInDown animation-delay-400">
            Demande de <span class="text-[#EE6D08]">Devis</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-600">
            Remplissez ce formulaire pour recevoir un devis personnalisé et gratuit, adapté à vos besoins énergétiques spécifiques.
          </p>
        </div>
      </div>
    </div>

    <!-- Quote Form Section -->
    <section id="form-section" class="bg-white py-20 md:py-32">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Service Selection -->
        <div v-if="!selectedService" class="mb-16 animate-fadeInUp animation-delay-200">
          <!-- Header Section -->
          <div class="text-center mb-16">
            <div class="inline-block mb-4">
              <span class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest">Commençons</span>
            </div>
            <h2 class="text-5xl md:text-6xl font-black text-[#016E98] mb-6 leading-tight">
              Quel service vous <span class="bg-gradient-to-r from-[#FF9D35] to-orange-500 bg-clip-text text-transparent">intéresse</span> ?
            </h2>
            <p class="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Nous proposons une large gamme de solutions adaptées à vos besoins. Sélectionnez le service qui correspond à votre projet pour recevoir un devis personnalisé.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div 
              v-for="(service, index) in services"
              :key="service.id"
              @click="selectService(service.id)"
              class="group relative h-full cursor-pointer animate-fadeInUp"
              :style="{ animationDelay: `${200 + index * 80}ms` }"
            >
              <!-- Card Container -->
              <div class="h-full rounded-3xl overflow-hidden bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <!-- Background Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-all duration-500" :class="service.bgGradient"></div>

                <!-- Content -->
                <div class="relative p-8 h-full flex flex-col items-center justify-between text-center">
                  <!-- Icon Container -->
                  <div class="mb-6">
                    <div class="relative w-20 h-20 mx-auto">
                      <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" :class="service.bgGradient"></div>
                      <div class="relative w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br transition-all duration-500" :class="service.bgGradient">
                        <i :class="[service.icon, 'text-3xl text-white group-hover:scale-125 transition-transform duration-500']"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Text Content -->
                  <div class="flex-1 mb-6">
                    <h3 class="text-2xl font-bold text-[#016E98] mb-3 group-hover:text-[#FF9D35] transition-colors duration-300">
                      {{ service.name }}
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {{ service.description }}
                    </p>
                  </div>

                  <!-- Bottom Accent Line -->
                  <div class="w-0 h-1 bg-gradient-to-r from-[#FF9D35] to-orange-500 rounded-full group-hover:w-12 transition-all duration-500 mb-4"></div>

                  <!-- CTA Button -->
                  <button class="px-6 py-2.5 bg-gradient-to-r from-[#FF9D35] to-orange-500 text-white rounded-full font-semibold text-sm shadow-md hover:shadow-lg transform group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    Sélectionner
                    <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </button>
                </div>

                <!-- Border glow on hover -->
                <div class="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#FF9D35]/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <!-- Info Box -->
          <div class="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 animate-fadeInUp animation-delay-600">
            <div class="flex items-start gap-4">
              <i class="fas fa-info-circle text-[#FF9D35] text-2xl flex-shrink-0 mt-1"></i>
              <div>
                <h4 class="text-lg font-bold text-[#016E98] mb-2">Besoin d'aide pour choisir ?</h4>
                <p class="text-gray-700">
                  Notre équipe d'experts est disponible pour vous conseiller. Contactez-nous pour une consultation gratuite et sans engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar (shown after service selection) -->
        <div v-if="selectedService" class="mb-16 animate-fadeInUp animation-delay-200">
          <!-- Back to Services Button -->
          <button 
            @click="resetService"
            class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors"
          >
            <i class="fas fa-arrow-left"></i>
            Retour aux services
          </button>

          <div class="flex items-center justify-between mb-8">
            <div v-for="(step, index) in steps" :key="index" class="flex items-center flex-1 animate-fadeInUp" :style="{ animationDelay: `${0.3 + index * 0.1}s` }">
              <div 
                :class="[
                  'w-14 h-14 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 shadow-md',
                  currentStep === index 
                    ? 'bg-[#EE6D08] text-white scale-110 shadow-lg' 
                    : index < currentStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                ]"
              >
                <template v-if="index < currentStep">
                  <i class="fas fa-check"></i>
                </template>
                <template v-else>
                  {{ index + 1 }}
                </template>
              </div>
              <div 
                v-if="index < steps.length - 1" 
                :class="[
                  'flex-1 h-2 mx-3 rounded-full transition-all duration-300',
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
            </div>
          </div>
          <div class="text-center animate-fadeInUp animation-delay-400">
            <p class="text-gray-600 font-semibold text-lg">Étape {{ currentStep + 1 }} de {{ steps.length }}: <span class="text-[#EE6D08]">{{ steps[currentStep].title }}</span></p>
          </div>
        </div>

        <!-- Form -->
        <form v-if="selectedService" @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Step 1: General Info -->
          <div v-if="currentStep === 0" class="space-y-6 animate-fadeInUp animation-delay-300">
            <div class="mb-8 animate-slideInDown animation-delay-300">
              <h2 class="text-4xl font-black text-[#EE6D08] mb-2">{{ steps[0].title }}</h2>
              <p class="text-gray-600 text-lg animate-fadeInUp animation-delay-400">Commençons par vos informations personnelles</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="animate-fadeInUp animation-delay-400">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Prénom *</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  placeholder="Jean"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div class="animate-fadeInUp animation-delay-500">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Nom *</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  placeholder="Dupont"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div class="animate-fadeInUp animation-delay-600">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Email *</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jean@example.com"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div class="animate-fadeInUp animation-delay-700">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Téléphone *</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+228 XX XX XX XX"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  required
                />
              </div>

              <div class="animate-fadeInUp animation-delay-800">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Société</label>
                <input 
                  v-model="form.company"
                  type="text" 
                  placeholder="Votre entreprise"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>

              <div class="animate-fadeInUp animation-delay-900">
                <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Fonction</label>
                <input 
                  v-model="form.position"
                  type="text" 
                  placeholder="Votre fonction"
                  class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                />
              </div>
            </div>

            <div class="animate-fadeInUp animation-delay-700">
              <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Adresse *</label>
              <input 
                v-model="form.address"
                type="text" 
                placeholder="Votre adresse"
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                required
              />
            </div>

            <div class="animate-fadeInUp animation-delay-800">
              <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Adresse d'installation</label>
              <input 
                v-model="form.installationAddress"
                type="text" 
                placeholder="Adresse d'installation (si différente)"
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
              />
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Step 2: Service-specific fields -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeInUp animation-delay-300">
            <div class="mb-8 animate-slideInDown animation-delay-300">
              <h2 class="text-4xl font-black text-[#016E98] mb-2">{{ steps[1].title }}</h2>
              <p class="text-gray-600 text-lg animate-fadeInUp animation-delay-400">{{ getServiceDescription() }}</p>
            </div>

            <!-- Service-specific fields component -->
            <div v-if="selectedService === 'energie-solaire'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Consommation annuelle (kWh) *</label>
                  <input 
                    v-model="form.solarConsumption"
                    type="number" 
                    placeholder="5000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Surface toiture disponible (m²) *</label>
                  <input 
                    v-model="form.roofArea"
                    type="number" 
                    placeholder="50"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-600">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type de bâtiment *</label>
                  <select 
                    v-model="form.buildingType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="residence">Résidence</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industriel</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-700">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                  <input 
                    v-model="form.budget"
                    type="number" 
                    placeholder="1000000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div v-if="selectedService === 'electricite-generale'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type d'installation *</label>
                  <select 
                    v-model="form.installationType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="nouveau">Nouvelle installation</option>
                    <option value="renovation">Rénovation</option>
                    <option value="extension">Extension</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Puissance requise (kW) *</label>
                  <input 
                    v-model="form.power"
                    type="number" 
                    placeholder="10"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-600">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Nombre de points de distribution</label>
                  <input 
                    v-model="form.distributionPoints"
                    type="number" 
                    placeholder="20"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-700">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                  <input 
                    v-model="form.budget"
                    type="number" 
                    placeholder="500000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div v-if="selectedService === 'climatisation'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Surface à climatiser (m²) *</label>
                  <input 
                    v-model="form.areaToClimate"
                    type="number" 
                    placeholder="100"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type d'espace *</label>
                  <select 
                    v-model="form.spaceType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="residence">Résidence</option>
                    <option value="bureau">Bureau</option>
                    <option value="commerce">Commerce</option>
                    <option value="industrie">Industrie</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-600">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type d'installation souhaité *</label>
                  <select 
                    v-model="form.climateType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="split">Split</option>
                    <option value="cassette">Cassette</option>
                    <option value="centralisee">Centralisée</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-700">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                  <input 
                    v-model="form.budget"
                    type="number" 
                    placeholder="2000000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div v-if="selectedService === 'plomberie'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type de travaux *</label>
                  <select 
                    v-model="form.plumbingType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="installation">Installation neuve</option>
                    <option value="reparation">Réparation</option>
                    <option value="renovation">Rénovation</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Nombre de points d'eau *</label>
                  <input 
                    v-model="form.waterPoints"
                    type="number" 
                    placeholder="5"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-600">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Matériau préféré *</label>
                  <select 
                    v-model="form.material"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="cuivre">Cuivre</option>
                    <option value="pvc">PVC</option>
                    <option value="inox">Inox</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-700">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                  <input 
                    v-model="form.budget"
                    type="number" 
                    placeholder="500000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div v-if="selectedService === 'fournitures'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type d'équipements souhaités *</label>
                  <select 
                    v-model="form.equipmentType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="panneaux">Panneaux solaires</option>
                    <option value="batteries">Batteries de stockage</option>
                    <option value="onduleurs">Onduleurs</option>
                    <option value="climatiseurs">Climatiseurs</option>
                    <option value="sanitaires">Articles sanitaires</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Quantité requise *</label>
                  <input 
                    v-model="form.quantity"
                    type="number" 
                    placeholder="10"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-600">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Marque ou modèle préféré</label>
                  <input 
                    v-model="form.preferredBrand"
                    type="text" 
                    placeholder="Ex: Sunpower, Tesla, etc."
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-700">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Budget estimé (FCFA)</label>
                  <input 
                    v-model="form.budget"
                    type="number" 
                    placeholder="1000000"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div v-if="selectedService === 'consulting'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-fadeInUp animation-delay-400">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Type de consulting *</label>
                  <select 
                    v-model="form.consultingType"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  >
                    <option value="">Sélectionnez</option>
                    <option value="audit">Audit énergétique</option>
                    <option value="conception">Conception de projet</option>
                    <option value="optimisation">Optimisation de consommation</option>
                    <option value="formation">Formation technique</option>
                  </select>
                </div>

                <div class="animate-fadeInUp animation-delay-500">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Durée estimée (jours)</label>
                  <input 
                    v-model="form.duration"
                    type="number" 
                    placeholder="5"
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                  />
                </div>

                <div class="animate-fadeInUp animation-delay-600 md:col-span-2">
                  <label class="block text-[#016E98] font-bold text-sm mb-3 uppercase tracking-widest">Domaine principal du projet *</label>
                  <input 
                    v-model="form.projectField"
                    type="text" 
                    placeholder="Ex: Énergie renouvelable, Efficacité énergétique, etc."
                    class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Step 3: Final Confirmation -->
          <div v-if="currentStep === 2" class="space-y-6 animate-fadeInUp animation-delay-300">
            <div class="mb-8 animate-slideInDown animation-delay-300">
              <h2 class="text-4xl font-black text-[#016E98] mb-2">{{ steps[2].title }}</h2>
              <p class="text-gray-600 text-lg animate-fadeInUp animation-delay-400">Confirmez vos informations et validez votre demande</p>
            </div>

            <div class="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
              <h3 class="text-xl font-bold text-[#016E98] mb-6">Résumé de votre demande</h3>
              <div class="space-y-4">
                <div class="flex justify-between pb-3 border-b border-blue-300">
                  <span class="text-gray-700"><strong>Service:</strong></span>
                  <span class="text-[#016E98] font-semibold">{{ getSelectedServiceName() }}</span>
                </div>
                <div class="flex justify-between pb-3 border-b border-blue-300">
                  <span class="text-gray-700"><strong>Nom:</strong></span>
                  <span class="text-[#016E98] font-semibold">{{ form.firstName }} {{ form.lastName }}</span>
                </div>
                <div class="flex justify-between pb-3 border-b border-blue-300">
                  <span class="text-gray-700"><strong>Email:</strong></span>
                  <span class="text-[#016E98] font-semibold">{{ form.email }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-700"><strong>Téléphone:</strong></span>
                  <span class="text-[#016E98] font-semibold">{{ form.phone }}</span>
                </div>
              </div>
            </div>

            <div class="animate-fadeInUp animation-delay-500">
              <label class="block text-[#016E98] font-bold text-sm mb-4 uppercase tracking-widest">Message supplémentaire</label>
              <textarea 
                v-model="form.message"
                rows="5"
                placeholder="Ajoutez des détails ou des informations supplémentaires..."
                class="w-full px-6 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-[#016E98] placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <div class="flex items-start gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <input 
                v-model="form.terms"
                type="checkbox" 
                id="terms"
                class="w-5 h-5 mt-1 text-secondary rounded focus:ring-2 focus:ring-secondary cursor-pointer flex-shrink-0"
                required
              />
              <label for="terms" class="text-[#016E98] text-sm cursor-pointer leading-relaxed">
                J'accepte les <span class="font-bold">conditions d'utilisation</span> et la <span class="font-bold">politique de confidentialité</span> de EGENT-TOGO.
              </label>
            </div>

            <!-- Error Message -->
            <transition name="slide">
              <div v-if="errorMessage" class="p-6 bg-red-100 border-l-4 border-red-500 text-red-800 rounded-lg flex items-start gap-4">
                <i class="fas fa-exclamation-circle text-2xl flex-shrink-0"></i>
                <div>
                  <p class="font-bold mb-1">Erreur de validation</p>
                  <p>{{ errorMessage }}</p>
                </div>
              </div>
            </transition>
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-between pt-8 border-t-2 border-gray-200 gap-4">
            <button 
              v-if="currentStep > 0"
              type="button"
              @click="previousStep"
              class="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-[#016E98] rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              <i class="fas fa-arrow-left mr-2"></i>Précédent
            </button>
            <div v-else></div>

            <button 
              v-if="currentStep < steps.length - 1"
              type="button"
              @click="nextStep"
              class="px-8 py-4 bg-secondary hover:bg-orange-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Suivant<i class="fas fa-arrow-right ml-2"></i>
            </button>

            <button 
              v-if="currentStep === steps.length - 1"
              type="submit"
              :disabled="isSubmitting"
              class="px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg uppercase tracking-widest flex items-center gap-2"
            >
              <i v-if="!isSubmitting" class="fas fa-check-circle"></i>
              <i v-else class="fas fa-spinner animate-spin"></i>
              {{ isSubmitting ? 'Envoi...' : 'Envoyer le devis' }}
            </button>
          </div>
        </form>

        <!-- Success Message -->
        <transition name="slide">
          <div v-if="submitMessage" :class="[
            'mt-8 p-6 rounded-xl border-l-4 flex items-start gap-4 transition-all duration-300',
            submitSuccess 
              ? 'bg-green-100 text-green-800 border-l-green-500' 
              : 'bg-red-100 text-red-800 border-l-red-500'
          ]">
            <i :class="[submitSuccess ? 'fas fa-check-circle text-2xl' : 'fas fa-times-circle text-2xl', 'flex-shrink-0']"></i>
            <div>
              <p class="font-bold mb-2">{{ submitSuccess ? 'Succès!' : 'Erreur' }}</p>
              <p>{{ submitMessage }}</p>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- Info Section -->
    <section id="info-section" class="bg-gradient-to-r from-blue-900 via-blue-800 to-dark py-20 md:py-32 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-400">
            <i class="fas fa-clock text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Réponse Rapide</h3>
            <p class="text-gray-100">Nous répondons généralement dans les 24 heures</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-500">
            <i class="fas fa-money-bill text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Gratuit & Sans Engagement</h3>
            <p class="text-gray-100">Tous nos devis sont gratuits et sans frais</p>
          </div>

          <div class="bg-white/10 backdrop-blur rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-600">
            <i class="fas fa-headset text-[#EE6D08] text-4xl mb-4"></i>
            <h3 class="text-xl font-black text-white mb-2">Support Personnalisé</h3>
            <p class="text-gray-100">Une équipe dédiée pour vos questions</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useCursorFollowText } from '../composables/useCursorFollowText'
import { useSEOMeta } from '../composables/useSEOMeta'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

// Charger Google Analytics dynamiquement
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date())
  gtag('config', 'G-65BEBH9XRC')
  
  // Charger le script Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-65BEBH9XRC'
  document.head.appendChild(script)
}

useCursorFollowText()
const { setMeta } = useSEOMeta()

const currentStep = ref(0)
const selectedService = ref(null)
const errorMessage = ref('')
const submitMessage = ref('')
const submitSuccess = ref(false)
const isSubmitting = ref(false)
const heroInView = ref(false)
const formInView = ref(false)
const infoInView = ref(false)

const services = [
  {
    id: 'energie-solaire',
    name: 'Énergie Solaire',
    description: 'Installation de panneaux solaires et systèmes photovoltaïques',
    icon: 'fas fa-sun',
    bgGradient: 'from-yellow-400 via-orange-400 to-orange-600',
    accentColor: 'bg-yellow-400'
  },
  {
    id: 'electricite-generale',
    name: 'Électricité Générale',
    description: 'Installation et maintenance des systèmes électriques',
    icon: 'fas fa-bolt',
    bgGradient: 'from-blue-400 via-blue-500 to-blue-700',
    accentColor: 'bg-blue-400'
  },
  {
    id: 'climatisation',
    name: 'Climatisation & Froid',
    description: 'Systèmes de climatisation et de refroidissement',
    icon: 'fas fa-snowflake',
    bgGradient: 'from-cyan-400 via-blue-400 to-blue-600',
    accentColor: 'bg-cyan-400'
  },
  {
    id: 'plomberie',
    name: 'Plomberie',
    description: 'Installation et réparation de systèmes de plomberie',
    icon: 'fas fa-water',
    bgGradient: 'from-teal-400 via-cyan-500 to-blue-600',
    accentColor: 'bg-teal-400'
  },
  {
    id: 'fournitures',
    name: 'Fourniture d\'Équipements',
    description: 'Vente d\'équipements et de matériel spécialisé',
    icon: 'fas fa-cube',
    bgGradient: 'from-purple-400 via-purple-500 to-purple-700',
    accentColor: 'bg-purple-400'
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Audit énergétique et conseil en optimisation',
    icon: 'fas fa-chart-line',
    bgGradient: 'from-pink-400 via-rose-500 to-red-600',
    accentColor: 'bg-pink-400'
  }
]

const steps = [
  { title: 'Informations' },
  { title: 'Détails du Service' },
  { title: 'Confirmation' }
]

const form = ref({
  // General
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  address: '',
  installationAddress: '',
  message: '',
  terms: false,
  
  // Solar
  solarConsumption: '',
  roofArea: '',
  buildingType: '',
  
  // Electricity
  installationType: '',
  power: '',
  distributionPoints: '',
  
  // Climate
  areaToClimate: '',
  spaceType: '',
  climateType: '',
  
  // Plumbing
  plumbingType: '',
  waterPoints: '',
  material: '',
  
  // Equipment
  equipmentType: '',
  quantity: '',
  preferredBrand: '',
  
  // Consulting
  consultingType: '',
  duration: '',
  projectField: '',
  
  // Common
  budget: ''
})

const selectService = (serviceId) => {
  selectedService.value = serviceId
  currentStep.value = 0
}

const resetService = () => {
  selectedService.value = null
  currentStep.value = 0
  // Reset only service-specific fields but keep general info
  form.value = {
    ...form.value,
    solarConsumption: '',
    roofArea: '',
    buildingType: '',
    installationType: '',
    power: '',
    distributionPoints: '',
    areaToClimate: '',
    spaceType: '',
    climateType: '',
    plumbingType: '',
    waterPoints: '',
    material: '',
    equipmentType: '',
    quantity: '',
    preferredBrand: '',
    consultingType: '',
    duration: '',
    projectField: '',
    budget: ''
  }
}

const getSelectedServiceName = () => {
  const service = services.find(s => s.id === selectedService.value)
  return service ? service.name : ''
}

const getServiceDescription = () => {
  const service = services.find(s => s.id === selectedService.value)
  if (!service) return ''
  
  const descriptions = {
    'energie-solaire': 'Remplissez les détails de votre installation solaire',
    'electricite-generale': 'Décrivez vos besoins en électricité générale',
    'climatisation': 'Précisez vos besoins en climatisation',
    'plomberie': 'Détaillez vos travaux de plomberie',
    'fournitures': 'Spécifiez les équipements souhaités',
    'consulting': 'Définissez vos objectifs de consulting'
  }
  
  return descriptions[selectedService.value] || ''
}

const setupObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero-quote') {
        heroInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'form-section') {
        formInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'info-section') {
        infoInView.value = entry.isIntersecting;
      }
    });
  }, observerOptions);

  const sections = ['hero-quote', 'form-section', 'info-section'];
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
};

onMounted(() => {
  setupObserver()
  
  // Définir les métadonnées Open Graph pour la page Devis
  setMeta(
    'Devis - EGENT-TOGO',
    'Demandez un devis personnalisé pour vos projets énergétiques. Réponse rapide et professionnelle d\'EGENT-TOGO.',
    '/src/assets/images/panneau4.jpg',
    '/devis'
  )
})

const validateStep = () => {
  errorMessage.value = ''

  if (currentStep.value === 0) {
    if (!form.value.firstName.trim()) {
      errorMessage.value = 'Le prénom est requis'
      return false
    }
    if (!form.value.lastName.trim()) {
      errorMessage.value = 'Le nom est requis'
      return false
    }
    if (!form.value.email.trim()) {
      errorMessage.value = 'L\'email est requis'
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
      errorMessage.value = 'L\'email n\'est pas valide'
      return false
    }
    if (!form.value.phone.trim()) {
      errorMessage.value = 'Le téléphone est requis'
      return false
    }
    if (!form.value.address.trim()) {
      errorMessage.value = 'L\'adresse est requise'
      return false
    }
  }

  if (currentStep.value === 1) {
    // Service-specific validations
    if (selectedService.value === 'energie-solaire') {
      if (!form.value.solarConsumption) {
        errorMessage.value = 'La consommation annuelle est requise'
        return false
      }
      if (!form.value.roofArea) {
        errorMessage.value = 'La surface de toiture est requise'
        return false
      }
      if (!form.value.buildingType) {
        errorMessage.value = 'Le type de bâtiment est requis'
        return false
      }
    }
    
    if (selectedService.value === 'electricite-generale') {
      if (!form.value.installationType) {
        errorMessage.value = 'Le type d\'installation est requis'
        return false
      }
      if (!form.value.power) {
        errorMessage.value = 'La puissance requise est requise'
        return false
      }
    }
    
    if (selectedService.value === 'climatisation') {
      if (!form.value.areaToClimate) {
        errorMessage.value = 'La surface à climatiser est requise'
        return false
      }
      if (!form.value.spaceType) {
        errorMessage.value = 'Le type d\'espace est requis'
        return false
      }
      if (!form.value.climateType) {
        errorMessage.value = 'Le type d\'installation est requis'
        return false
      }
    }
    
    if (selectedService.value === 'plomberie') {
      if (!form.value.plumbingType) {
        errorMessage.value = 'Le type de travaux est requis'
        return false
      }
      if (!form.value.waterPoints) {
        errorMessage.value = 'Le nombre de points d\'eau est requis'
        return false
      }
      if (!form.value.material) {
        errorMessage.value = 'Le matériau est requis'
        return false
      }
    }
    
    if (selectedService.value === 'fournitures') {
      if (!form.value.equipmentType) {
        errorMessage.value = 'Le type d\'équipement est requis'
        return false
      }
      if (!form.value.quantity) {
        errorMessage.value = 'La quantité est requise'
        return false
      }
    }
    
    if (selectedService.value === 'consulting') {
      if (!form.value.consultingType) {
        errorMessage.value = 'Le type de consulting est requis'
        return false
      }
      if (!form.value.projectField) {
        errorMessage.value = 'Le domaine du projet est requis'
        return false
      }
    }
  }

  if (currentStep.value === 2) {
    if (!form.value.terms) {
      errorMessage.value = 'Vous devez accepter les conditions d\'utilisation'
      return false
    }
  }

  return true
}

const nextStep = () => {
  if (validateStep()) {
    currentStep.value++
  }
}

const previousStep = () => {
  currentStep.value--
}

const handleSubmit = () => {
  if (validateStep()) {
    submitQuoteToFirebase()
  }
}

const submitQuoteToFirebase = async () => {
  try {
    isSubmitting.value = true
    submitMessage.value = '⏳ Envoi de votre devis...'

    // Préparer les données du formulaire
    const quoteData = {
      // Informations générales
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      company: form.value.company,
      position: form.value.position,
      address: form.value.address,
      installationAddress: form.value.installationAddress,
      service: selectedService.value,
      serviceName: getSelectedServiceName(),
      message: form.value.message,
      budget: form.value.budget,
      
      // Champs spécifiques au service
      solarConsumption: form.value.solarConsumption,
      roofArea: form.value.roofArea,
      buildingType: form.value.buildingType,
      installationType: form.value.installationType,
      power: form.value.power,
      distributionPoints: form.value.distributionPoints,
      areaToClimate: form.value.areaToClimate,
      spaceType: form.value.spaceType,
      climateType: form.value.climateType,
      plumbingType: form.value.plumbingType,
      waterPoints: form.value.waterPoints,
      material: form.value.material,
      equipmentType: form.value.equipmentType,
      quantity: form.value.quantity,
      preferredBrand: form.value.preferredBrand,
      consultingType: form.value.consultingType,
      duration: form.value.duration,
      projectField: form.value.projectField,
      
      // Métadonnées
      status: 'new',
      createdAt: serverTimestamp(),
      ipAddress: await getClientIP(),
      userAgent: navigator.userAgent
    }

    // Sauvegarder dans Firebase
    await addDoc(collection(db, 'quotes'), quoteData)

    submitSuccess.value = true
    submitMessage.value = '✅ Merci ! Votre demande de devis a été envoyée avec succès. Notre équipe vous contactera sous peu.'

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      resetService()
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        address: '',
        installationAddress: '',
        solarConsumption: '',
        roofArea: '',
        buildingType: '',
        installationType: '',
        power: '',
        distributionPoints: '',
        areaToClimate: '',
        spaceType: '',
        climateType: '',
        plumbingType: '',
        waterPoints: '',
        material: '',
        equipmentType: '',
        quantity: '',
        preferredBrand: '',
        consultingType: '',
        duration: '',
        projectField: '',
        budget: '',
        message: '',
        terms: false
      }
      submitMessage.value = ''
    }, 3000)
  } catch (error) {
    console.error('Erreur envoi devis:', error)
    submitSuccess.value = false
    submitMessage.value = ' l\'envoi en cour, Veuillez réessayer.'
  } finally {
    isSubmitting.value = false
  }
}

// Fonction pour obtenir l'IP du client
const getClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return 'unknown'
  }
}
</script>

<style scoped>
/* Input Focus Styles */
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(255, 157, 53, 0.1);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.4s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

/* Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Button Hover Effects */
button:active {
  transform: scale(0.98);
}

/* Input Transitions */
input,
textarea,
select {
  transition: all 0.3s ease;
}

/* Checkbox and Radio Styling */
input[type="checkbox"],
input[type="radio"] {
  transition: all 0.2s ease;
}

input[type="checkbox"]:hover,
input[type="radio"]:hover {
  transform: scale(1.1);
}

/* Label Hover */
label {
  transition: color 0.3s ease;
}

label:hover {
  color: #FF9D35;
}

/* Animations */
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

/* Animation Utilities */
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fadeIn {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

/* Delay Utilities */
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-700 {
  animation-delay: 0.7s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-900 {
  animation-delay: 0.9s;
}
</style>
