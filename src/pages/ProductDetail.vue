<template>
  <div>
    <div v-if="!product" class="flex items-center justify-center min-h-screen">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-else>
    <!-- Admin Edit Button -->
    <div v-if="isAdmin" class="fixed top-24 right-8 z-40">
      <button
        @click="openEditModal"
        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2 font-semibold"
      >
        <i class="fas fa-edit"></i> Éditer ce produit
      </button>
    </div>

    <!-- Hero Section with Product Images -->
    <section id="hero-section" class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors animate-fadeInUp animation-delay-200">
          <i class="fas fa-arrow-left"></i>
          Retour aux produits
        </button>

        <!-- Main Product Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Images Section -->
          <div class="flex flex-col gap-4 animate-fadeInUp animation-delay-300">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="product.mainImage || '/vite.svg'" 
                :alt="product.name"
                class="w-full h-full object-cover"
                @error="(e) => e.target.src = '/vite.svg'"
              />
            </div>
            
            <!-- Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in product.images"
                :key="index"
                :src="image || '/vite.svg'"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                @click="product.mainImage = image"
                @error="(e) => e.target.src = '/vite.svg'"
              />
            </div>
          </div>

          <!-- Product Info Section -->
          <div class="flex flex-col justify-between animate-fadeInUp animation-delay-400">
            <!-- Header -->
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3 animate-slideInDown animation-delay-400">{{ product.category }}</p>
              <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight animate-slideInDown animation-delay-500">{{ product.name }} - EGENT-TOGO</h1>
              
              <!-- Price -->
              <div class="bg-blue-50 rounded-2xl p-6 mb-8 animate-fadeInUp animation-delay-500">
                <p class="text-gray-600 text-sm mb-2">À partir de</p>
                <p class="text-4xl font-black text-[#0392C7]">{{ product.price }}</p>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-lg leading-relaxed mb-8 animate-fadeInUp animation-delay-600">
                {{ product.description }}
              </p>

              <!-- Quick Features -->
              <div class="space-y-3 mb-8 animate-fadeInUp animation-delay-700">
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Installation rapide et simple</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Garantie complète incluse</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Support technique 24/7</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
                <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-shopping-cart"></i>
                  Demander un devis
                </button>
                <button @click="navigateTo('/contact')" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-phone"></i>
                  Nous contacter
                </button>
              </div>

              <!-- Free Water CTA -->
              <div v-if="product.slug !== 'free-water'" class="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 class="text-xl font-black text-[#016E98] mb-4">Découvrez aussi Free Water</h3>
                <p class="text-gray-600 mb-4">Solution innovante de purification d'eau solaire autonome et écologique.</p>
                <button @click="navigateToProduct('free-water')" class="bg-[#0392C7] hover:bg-[#016E98] text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                  <i class="fas fa-info-circle"></i>
                  Voir les détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Detailed Description Section -->
    <section id="detail-section" class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Left: Description -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-3xl p-8 shadow-lg animate-fadeInUp animation-delay-300">
              <h2 class="text-3xl font-black text-[#016E98] mb-8 animate-slideInDown animation-delay-400">À propos de ce produit</h2>
              <div class="prose prose-lg max-w-none text-gray-700" v-html="product.longDescription"></div>

              <!-- Caractéristiques principales -->
              <div v-if="product.mainCharacteristics && product.mainCharacteristics.length > 0" class="mt-12 pt-8 border-t-2 border-gray-200">
                <h3 class="text-2xl font-black text-[#016E98] mb-6">Caractéristiques principales:</h3>
                <ul class="space-y-3">
                  <li v-for="(char, idx) in product.mainCharacteristics" :key="idx" class="flex items-start gap-3">
                    <i class="fas fa-check-circle text-[#2F7914] text-lg mt-1 flex-shrink-0"></i>
                    <span class="text-gray-700">{{ char }}</span>
                  </li>
                </ul>
              </div>

              <!-- Avantages -->
              <div v-if="product.advantages && product.advantages.length > 0" class="mt-12 pt-8 border-t-2 border-gray-200">
                <h3 class="text-2xl font-black text-[#016E98] mb-6">Avantages:</h3>
                <ul class="space-y-3">
                  <li v-for="(adv, idx) in product.advantages" :key="idx" class="flex items-start gap-3">
                    <i class="fas fa-star text-[#FF9D35] text-lg mt-1 flex-shrink-0"></i>
                    <span class="text-gray-700">{{ adv }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right: Specifications -->
          <div>
            <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20 animate-fadeInUp animation-delay-400">
              <h3 class="text-2xl font-black text-[#016E98] mb-8 animate-slideInDown animation-delay-500">Caractéristiques</h3>
              <div class="space-y-6">
                <div v-for="(spec, index) in product.specs" :key="spec.label" :class="['border-b border-gray-200 pb-4 last:border-b-0', 'animate-fadeInUp', `animation-delay-${600 + index * 100}`]">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">{{ spec.label }}</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ spec.value }}</p>
                </div>
              </div>

              <!-- Additional Info Box -->
              <div class="mt-8 bg-blue-50 rounded-2xl p-6 animate-fadeInUp animation-delay-800">
                <div class="flex items-start gap-4">
                  <i class="fas fa-shield-alt text-[#0392C7] text-2xl mt-1"></i>
                  <div>
                    <p class="font-bold text-[#016E98] mb-2">Couverture complète</p>
                    <p class="text-sm text-gray-700">
                      Tous nos produits sont couverts par une garantie complète et un service après-vente premium.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products Section -->
    <section id="related-section" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6 animate-fadeInUp animation-delay-200">AUTRES PRODUITS</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
            Découvrez nos autres solutions énergétiques
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <router-link 
            v-for="(relatedProduct, index) in relatedProducts" 
            :key="relatedProduct.id"
            :to="'/produits/' + relatedProduct.slug"
            :class="['bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300', 'animate-fadeInUp', `animation-delay-${400 + index * 100}`]"
          >
            <img 
              :src="relatedProduct.mainImage" 
              :alt="relatedProduct.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-black text-[#0392C7] mb-2 hover:text-[#EE6D08] transition-colors">{{ relatedProduct.name }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ relatedProduct.shortDescription }}</p>
              <p class="text-[#FF9D35] font-black text-lg">{{ relatedProduct.price }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta-section" class="bg-gradient-to-r from-[#016E98] to-[#0392C7] py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-8 animate-slideInDown animation-delay-200">PRÊT À PASSER À L'ACTION ?</h2>
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
          Nos experts sont disponibles pour vous aider à choisir la solution idéale pour vos besoins énergétiques.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-600">
          <button @click="navigateTo('/devis')" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Demander un devis
          </button>
          <button @click="navigateTo('/contact')" class="border-2 border-white hover:bg-white/10 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Nous contacter
          </button>
        </div>
      </div>
    </section>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold">Éditer le produit</h2>
          <button @click="showEditModal = false" class="text-white hover:bg-white/20 p-2 rounded-lg transition">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Nom du produit</label>
              <input 
                v-model="editForm.name"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
              <input 
                v-model="editForm.category"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Prix</label>
              <input 
                v-model="editForm.price"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
              <input 
                v-model="editForm.slug"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Description courte -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Description courte</label>
            <textarea 
              v-model="editForm.shortDescription"
              rows="2"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Description complète -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Description complète</label>
            <textarea 
              v-model="editForm.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Long Description (HTML) -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Description longue (HTML)</label>
            <textarea 
              v-model="editForm.longDescription"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="HTML autorisé. Ex: <h3>Titre</h3> <ul><li>Item</li></ul>"
            ></textarea>
          </div>

          <!-- Images -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">Image principale (glisser-déposer)</label>
            
            <!-- Zone Drag & Drop pour image principale -->
            <div 
              @dragover="handleDragOverMainImage"
              @dragleave="handleDragLeaveMainImage"
              @drop="handleDropMainImage"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-4',
                isDraggingMainImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400'
              ]"
            >
              <i class="fas fa-image text-3xl text-gray-400 mb-3 block"></i>
              <p class="text-gray-600 font-semibold mb-1">Glissez votre image principale ici</p>
              <p class="text-sm text-gray-500 mb-3">ou</p>
              <label class="inline-block">
                <span class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors">
                  <i class="fas fa-folder-open mr-2"></i>Sélectionner une image
                </span>
                <input 
                  type="file"
                  accept="image/*"
                  @change="handleMainImageSelect"
                  class="hidden"
                />
              </label>
            </div>

            <!-- Aperçu de l'image principale -->
            <div v-if="editForm.mainImage" class="mt-4 relative">
              <img 
                :src="editForm.mainImage" 
                :alt="editForm.name" 
                class="w-full max-h-64 object-cover rounded-lg shadow-lg"
                @error="(e) => e.target.src = 'https://via.placeholder.com/400'"
              />
              <button
                @click="editForm.mainImage = ''"
                type="button"
                class="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
                title="Supprimer l'image"
              >
                <i class="fas fa-trash text-sm"></i>
              </button>
            </div>

            <!-- Option d'URL textuelle -->
            <div class="mt-4">
              <label class="block text-xs font-semibold text-gray-600 mb-2">Ou entrer une URL d'image</label>
              <input 
                v-model="editForm.mainImage"
                type="text"
                placeholder="https://..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <!-- Images Multiples avec Drag & Drop -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">Images supplémentaires (glisser-déposer)</label>
            
            <!-- Zone Drag & Drop -->
            <div 
              @dragover="handleDragOver"
              @dragleave="handleDragLeave"
              @drop="handleDrop"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                isDraggingImages ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400'
              ]"
            >
              <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3 block"></i>
              <p class="text-gray-600 font-semibold mb-1">Glissez vos images ici</p>
              <p class="text-sm text-gray-500 mb-3">ou</p>
              <label class="inline-block">
                <span class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer transition-colors">
                  <i class="fas fa-folder-open mr-2"></i>Sélectionner des images
                </span>
                <input 
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleImageSelect"
                  class="hidden"
                />
              </label>
            </div>

            <!-- Aperçu des images en attente -->
            <div v-if="pendingImages.length > 0" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="image in pendingImages" :key="image.id" class="relative group">
                <img 
                  :src="image.src" 
                  :alt="image.fileName"
                  class="w-full h-24 object-cover rounded-lg shadow-md"
                />
                <button
                  @click="removeImage(image.id)"
                  type="button"
                  class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <i class="fas fa-times text-sm"></i>
                </button>
                <p class="text-xs text-gray-600 mt-1 truncate">{{ image.fileName }}</p>
              </div>
            </div>

            <!-- Bouton d'ajout des images -->
            <div v-if="pendingImages.length > 0" class="mt-4">
              <button
                @click="addImagesToProduct"
                type="button"
                class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <i class="fas fa-check mr-2"></i>Ajouter {{ pendingImages.length }} image(s) au produit
              </button>
            </div>

            <!-- Affichage des images existantes -->
            <div v-if="editForm.images && editForm.images.length > 0" class="mt-6">
              <h4 class="text-sm font-bold text-gray-700 mb-3">Images existantes du produit</h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(image, idx) in editForm.images" :key="idx" class="relative group">
                  <img 
                    :src="image" 
                    :alt="'Image ' + (idx + 1)"
                    class="w-full h-24 object-cover rounded-lg shadow-md"
                  />
                  <button
                    @click="editForm.images.splice(idx, 1)"
                    type="button"
                    class="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- À propos de ce produit -->
          <div>
            <h3 class="text-lg font-black text-[#016E98] mb-6 flex items-center gap-2">
              <i class="fas fa-info-circle text-[#0392C7]"></i>
              À propos de ce produit
            </h3>

            <!-- Caractéristiques principales -->
            <div class="mb-6">
              <label class="block text-sm font-bold text-gray-700 mb-3">
                <i class="fas fa-list mr-2 text-[#FF9D35]"></i>
                Caractéristiques principales:
              </label>
              <div class="space-y-3">
                <div v-for="(char, idx) in editForm.mainCharacteristics" :key="idx" class="flex gap-3">
                  <textarea 
                    v-model="editForm.mainCharacteristics[idx]"
                    type="text"
                    placeholder="Ex: Panneaux solaires intégrés haute efficacité"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="1"
                  ></textarea>
                  <button
                    @click="editForm.mainCharacteristics.splice(idx, 1)"
                    type="button"
                    class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <button
                  @click="editForm.mainCharacteristics.push('')"
                  type="button"
                  class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
                >
                  <i class="fas fa-plus"></i> Ajouter une caractéristique
                </button>
              </div>
            </div>

            <!-- Avantages -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-3">
                <i class="fas fa-star mr-2 text-[#FF9D35]"></i>
                Avantages:
              </label>
              <div class="space-y-3">
                <div v-for="(adv, idx) in editForm.advantages" :key="idx" class="flex gap-3">
                  <textarea 
                    v-model="editForm.advantages[idx]"
                    type="text"
                    placeholder="Ex: Zéro frais d'électricité"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="1"
                  ></textarea>
                  <button
                    @click="editForm.advantages.splice(idx, 1)"
                    type="button"
                    class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <button
                  @click="editForm.advantages.push('')"
                  type="button"
                  class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
                >
                  <i class="fas fa-plus"></i> Ajouter un avantage
                </button>
              </div>
            </div>
          </div>

          <!-- Specifications -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">Caractéristiques</label>
            <div class="space-y-3">
              <div v-for="(spec, idx) in editForm.specs" :key="idx" class="flex gap-3">
                <input 
                  v-model="spec.label"
                  type="text"
                  placeholder="Label"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  v-model="spec.value"
                  type="text"
                  placeholder="Valeur"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  @click="editForm.specs.splice(idx, 1)"
                  type="button"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <button
                @click="editForm.specs.push({ label: '', value: '' })"
                type="button"
                class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
              >
                <i class="fas fa-plus"></i> Ajouter une caractéristique
              </button>
            </div>
          </div>

          <!-- Status Message -->
          <div v-if="editStatus" :class="[
            'p-4 rounded-lg text-sm font-medium',
            editStatus.includes('✅') ? 'bg-green-50 text-green-800' : editStatus.includes('⏳') ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'
          ]">
            {{ editStatus }}
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-8 py-4 flex gap-3 justify-end border-t">
          <button
            @click="showEditModal = false"
            type="button"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
          >
            Annuler
          </button>
          <button
            @click="saveProduct"
            :disabled="isSaving"
            :class="[
              'text-white px-6 py-2 rounded-lg font-semibold transition',
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            <i v-if="isSaving" class="fas fa-spinner fa-spin mr-2"></i>
            {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder les modifications' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { collection, getDocs, query, doc, updateDoc } from 'firebase/firestore'
import { db, auth } from '../lib/firebase'
import { useSEOMeta } from '../composables/useSEOMeta'

// Initialize Google Analytics
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-65BEBH9XRC');
}

const { setMeta } = useSEOMeta()
const router = useRouter()
const route = useRoute()

const product = ref(null)
const products = ref([])
const loading = ref(true)
const showEditModal = ref(false)
const isSaving = ref(false)
const editStatus = ref('')
const isAdmin = ref(false)
const isDraggingImages = ref(false)
const isDraggingMainImage = ref(false)
const pendingImages = ref([])

const editForm = ref({
  name: '',
  category: '',
  price: '',
  slug: '',
  shortDescription: '',
  description: '',
  longDescription: '',
  mainImage: '',
  mainCharacteristics: [],
  advantages: [],
  specs: []
})

const relatedProducts = computed(() => {
  if (!product.value || !products.value) return []
  return products.value.filter(p => p.slug !== product.value.slug).slice(0, 3)
})

const loadProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'))
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Erreur chargement produits:', error)
  }
}

const checkAdminStatus = () => {
  // Vérifier si l'utilisateur est connecté
  const unsubscribe = auth.onAuthStateChanged((user) => {
    isAdmin.value = !!user
    unsubscribe()
  })
}

const openEditModal = () => {
  // Copier les données du produit dans le formulaire
  editForm.value = {
    name: product.value.name || '',
    category: product.value.category || '',
    price: product.value.price || '',
    slug: product.value.slug || '',
    shortDescription: product.value.shortDescription || '',
    description: product.value.description || '',
    longDescription: product.value.longDescription || '',
    mainImage: product.value.mainImage || '',
    mainCharacteristics: product.value.mainCharacteristics ? JSON.parse(JSON.stringify(product.value.mainCharacteristics)) : [],
    advantages: product.value.advantages ? JSON.parse(JSON.stringify(product.value.advantages)) : [],
    specs: product.value.specs ? JSON.parse(JSON.stringify(product.value.specs)) : []
  }
  // Réinitialiser les images pendantes
  pendingImages.value = []
  showEditModal.value = true
}

const handleDragOver = (e) => {
  e.preventDefault()
  isDraggingImages.value = true
}

const handleDragLeave = () => {
  isDraggingImages.value = false
}

const handleDragOverMainImage = (e) => {
  e.preventDefault()
  isDraggingMainImage.value = true
}

const handleDragLeaveMainImage = () => {
  isDraggingMainImage.value = false
}

const handleDropMainImage = (e) => {
  e.preventDefault()
  isDraggingMainImage.value = false
  
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  if (files.length > 0) {
    processMainImageFile(files[0])
  }
}

const handleMainImageSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
  if (files.length > 0) {
    processMainImageFile(files[0])
  }
}

const processMainImageFile = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    editForm.value.mainImage = e.target.result
    editStatus.value = `✅ Image principale mise à jour: ${file.name}`
  }
  reader.readAsDataURL(file)
}

const handleDrop = (e) => {
  e.preventDefault()
  isDraggingImages.value = false
  
  const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

const handleImageSelect = (e) => {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'))
  processImageFiles(files)
}

const processImageFiles = (files) => {
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      pendingImages.value.push({
        id: Date.now() + Math.random(),
        src: e.target.result,
        fileName: file.name,
        file: file
      })
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (id) => {
  pendingImages.value = pendingImages.value.filter(img => img.id !== id)
}

const addImagesToProduct = () => {
  if (pendingImages.value.length > 0) {
    const newImages = pendingImages.value.map(img => img.src)
    if (!editForm.value.images) {
      editForm.value.images = []
    }
    editForm.value.images = [...editForm.value.images, ...newImages]
    pendingImages.value = []
    editStatus.value = `✅ ${newImages.length} image(s) ajoutée(s) au produit!`
  }
}

const saveProduct = async () => {
  if (!product.value?.id) {
    editStatus.value = '❌ Erreur: ID produit non trouvé'
    return
  }

  isSaving.value = true
  editStatus.value = '⏳ Sauvegarde en cours...'

  try {
    const productRef = doc(db, 'products', product.value.id)
    const updateData = {
      name: editForm.value.name,
      category: editForm.value.category,
      price: editForm.value.price,
      slug: editForm.value.slug,
      shortDescription: editForm.value.shortDescription,
      description: editForm.value.description,
      longDescription: editForm.value.longDescription,
      mainImage: editForm.value.mainImage,
      mainCharacteristics: editForm.value.mainCharacteristics,
      advantages: editForm.value.advantages,
      specs: editForm.value.specs,
      updatedAt: new Date()
    }

    // Ajouter les images si elles existent
    if (editForm.value.images) {
      updateData.images = editForm.value.images
    }

    await updateDoc(productRef, updateData)

    // Mettre à jour le produit affiché
    product.value = {
      ...product.value,
      ...editForm.value
    }

    editStatus.value = '✅ Produit mis à jour avec succès!'
    
    setTimeout(() => {
      showEditModal.value = false
      editStatus.value = ''
    }, 2000)
  } catch (error) {
    editStatus.value = `❌ Erreur: ${error.message}`
    console.error('Erreur sauvegarde:', error)
  } finally {
    isSaving.value = false
  }
}

onMounted(async () => {
  checkAdminStatus()
  await loadProducts()
  
  const productSlug = route.params.slug
  const foundProduct = products.value.find(p => p.slug === productSlug)
  
  if (foundProduct) {
    product.value = { ...foundProduct }
    
    // ✅ SEO OPTIMISÉ POUR LA PAGE PRODUIT
    setMeta(
      `${product.value.name} - ${product.value.category} EGENT-TOGO`,
      product.value.shortDescription || product.value.description || `Découvrez ${product.value.name}, une solution ${product.value.category} de qualité d\'EGENT-TOGO. Livré avec garantie et support technique.`,
      product.value.mainImage,
      `/produits/${productSlug}`,
      {
        type: 'product',
        siteName: 'EGENT-TOGO',
        imageWidth: '1200',
        imageHeight: '630'
      }
    )
  } else {
    router.push('/produits')
    return
  }
  
  loading.value = false
})

function goBack() {
  router.push('/produits')
}

function navigateTo(path) {
  router.push(path)
}

function navigateToProduct(slug) {
  router.push(`/produits/${slug}`)
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

.prose-lg :deep(ul) {
  list-style: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose-lg :deep(li) {
  margin-bottom: 0.5rem;
}

.prose-lg :deep(h3) {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #016E98;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
