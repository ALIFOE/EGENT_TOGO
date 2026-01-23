<template>
  <div>
    <!-- Admin Edit/Delete Buttons -->
    <div v-if="isAdmin" class="fixed top-28 right-6 z-40 flex flex-col gap-3">
      <button
        @click="openEditModal"
        class="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg shadow-xl transition-all flex items-center gap-2 font-semibold text-sm hover:scale-105"
        title="Éditer ce projet"
      >
        <i class="fas fa-edit"></i> Éditer
      </button>
      <button
        @click="deleteProjectConfirm"
        class="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow-xl transition-all flex items-center gap-2 font-semibold text-sm hover:scale-105"
        title="Supprimer ce projet"
      >
        <i class="fas fa-trash"></i> Supprimer
      </button>
    </div>

    <div v-if="!project" class="flex items-center justify-center min-h-screen">
      <p class="text-xl text-gray-500">Chargement...</p>
    </div>

    <div v-else>
      <!-- Hero Section -->
      <section class="bg-white pt-20 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Back Button -->
          <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors">
            <i class="fas fa-arrow-left"></i>
            Retour aux projets
          </button>

          <!-- Main Project Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Images Section -->
            <div class="flex flex-col gap-4">
              <!-- Main Image -->
              <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
                <img 
                  :src="currentImage" 
                  :alt="project.title"
                  class="w-full h-full object-cover"
                />
              </div>
              
              <!-- Thumbnails -->
              <div v-if="project.images && project.images.length > 1" class="grid grid-cols-3 gap-4">
                <img 
                  v-for="(image, index) in project.images"
                  :key="index"
                  :src="image"
                  :alt="`${project.title} - Image ${index + 1}`"
                  class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  @click="currentImage = image"
                />
              </div>
            </div>

            <!-- Project Info Section -->
            <div class="flex flex-col justify-between">
              <!-- Header -->
              <div>
                <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3">{{ project.category }}</p>
                <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight">{{ project.title }}</h1>
                
                <!-- Project Info -->
                <div class="bg-blue-50 rounded-2xl p-6 mb-8">
                  <div class="space-y-4">
                    <div class="flex items-start gap-3">
                      <i class="fas fa-calendar text-[#FF9D35] mt-1 flex-shrink-0"></i>
                      <div>
                        <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest">Date</p>
                        <p class="text-[#016E98] font-medium">{{ project.date }}</p>
                      </div>
                    </div>
                    <div class="flex items-start gap-3">
                      <i class="fas fa-map-marker-alt text-[#FF9D35] mt-1 flex-shrink-0"></i>
                      <div>
                        <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest">Localisation</p>
                        <p class="text-[#016E98] font-medium">{{ project.location }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p class="text-gray-700 text-lg leading-relaxed mb-8">
                  {{ stripHtml(project.description) }}
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                  <router-link to="/contact" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-envelope"></i>
                    Nous contacter
                  </router-link>
                  <router-link to="/projets" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <i class="fas fa-arrow-right"></i>
                    Autres projets
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="bg-gray-50 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Left: Description -->
            <div class="md:col-span-2">
              <div class="bg-white rounded-3xl p-8 shadow-lg">
                <h2 class="text-3xl font-black text-[#016E98] mb-8">À propos de ce projet</h2>
                <div v-if="project.details" class="prose prose-lg max-w-none text-gray-700 mb-8" v-html="project.details"></div>

                <!-- Caractéristiques principales -->
                <div v-if="project.mainCharacteristics && project.mainCharacteristics.length > 0" class="mt-12 pt-8 border-t-2 border-gray-200">
                  <h3 class="text-2xl font-black text-[#016E98] mb-6">Caractéristiques principales:</h3>
                  <ul class="space-y-3">
                    <li v-for="(char, idx) in project.mainCharacteristics" :key="idx" class="flex items-start gap-3">
                      <i class="fas fa-check-circle text-[#2F7914] text-lg mt-1 flex-shrink-0"></i>
                      <span class="text-gray-700">{{ char }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Avantages -->
                <div v-if="project.advantages && project.advantages.length > 0" class="mt-12 pt-8 border-t-2 border-gray-200">
                  <h3 class="text-2xl font-black text-[#016E98] mb-6">Avantages:</h3>
                  <ul class="space-y-3">
                    <li v-for="(adv, idx) in project.advantages" :key="idx" class="flex items-start gap-3">
                      <i class="fas fa-star text-[#FF9D35] text-lg mt-1 flex-shrink-0"></i>
                      <span class="text-gray-700">{{ adv }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Right: Additional Info -->
            <div>
              <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20">
                <h3 class="text-2xl font-black text-[#016E98] mb-8">Résumé</h3>
                <div class="space-y-6">
                  <div class="border-b border-gray-200 pb-4 last:border-b-0">
                    <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">Catégorie</p>
                    <p class="text-lg font-bold text-[#016E98]">{{ project.category }}</p>
                  </div>
                  <div class="border-b border-gray-200 pb-4 last:border-b-0">
                    <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">Date</p>
                    <p class="text-lg font-bold text-[#016E98]">{{ project.date }}</p>
                  </div>
                  <div class="border-b border-gray-200 pb-4 last:border-b-0">
                    <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">Localisation</p>
                    <p class="text-lg font-bold text-[#016E98]">{{ project.location }}</p>
                  </div>
                </div>

                <!-- Info Box -->
                <div class="mt-8 bg-blue-50 rounded-2xl p-6">
                  <div class="flex items-start gap-4">
                    <i class="fas fa-lightbulb text-[#0392C7] text-2xl mt-1"></i>
                    <div>
                      <p class="font-bold text-[#016E98] mb-2">À savoir</p>
                      <p class="text-sm text-gray-700">
                        Ce projet a été réalisé avec le souci du détail et l'excellence en tête.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section v-if="project.results && project.results.length > 0" class="bg-gradient-to-r from-[#016E98] to-[#0392C7] py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-4">Résultats Clés</h2>
            <p class="text-white/90 text-lg">Les chiffres qui parlent</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(result, index) in project.results" :key="index" class="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 hover:bg-white/15 hover:border-[#FF9D35]/50 transition-all duration-300 text-center hover:scale-105 cursor-default">
              <div class="text-5xl font-black text-[#FF9D35] mb-4">{{ result.metric }}</div>
              <div class="text-white font-semibold text-lg">{{ result.description }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Projects -->
      <section v-if="relatedProjects.length > 0" class="bg-white py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6">AUTRES PROJETS</h2>
            <p class="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez nos autres réalisations
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <router-link
              v-for="proj in relatedProjects"
              :key="proj.id"
              :to="`/projets/${proj.slug}`"
              class="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-300 group"
            >
              <div class="h-48 overflow-hidden bg-gray-100">
                <img 
                  :src="proj.mainImage || proj.images?.[0]"
                  :alt="proj.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div class="p-6">
                <h3 class="text-xl font-black text-[#0392C7] mb-2">{{ proj.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ proj.description }}</p>
                <p class="text-[#FF9D35] font-black text-sm">{{ proj.date }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal Edit Project -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold">Éditer le projet</h2>
          <button @click="closeEditModal" class="text-white hover:bg-white/20 p-2 rounded-lg transition">
            <i class="fas fa-times text-2xl"></i>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Titre du projet</label>
              <input 
                v-model="editForm.title"
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
              <label class="block text-sm font-bold text-gray-700 mb-2">Localisation</label>
              <input 
                v-model="editForm.location"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Date</label>
              <input 
                v-model="editForm.date"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <!-- Slug -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Slug (URL)</label>
            <input 
              v-model="editForm.slug"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <QuillEditor 
              v-model="editForm.description"
              class="rounded-lg border border-gray-300"
            />
            <p class="text-xs text-gray-500 mt-2">
              💡 Utilisez l'éditeur ci-dessus pour formatter votre texte. Pas besoin de connaître le HTML!
            </p>
          </div>

          <!-- Image principale -->
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
                :alt="editForm.title" 
                class="w-full max-h-64 object-cover rounded-lg shadow-lg"
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

          <!-- Images Multiples -->
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
                @click="addImagesToProject"
                type="button"
                class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                <i class="fas fa-check mr-2"></i>Ajouter {{ pendingImages.length }} image(s) au projet
              </button>
            </div>

            <!-- Affichage des images existantes -->
            <div v-if="editForm.images && editForm.images.length > 0" class="mt-6">
              <h4 class="text-sm font-bold text-gray-700 mb-3">Images existantes du projet</h4>
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

          <!-- Résultats -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">
              <i class="fas fa-chart-line mr-2 text-[#0392C7]"></i>
              Résultats clés:
            </label>
            <div class="space-y-3">
              <div v-for="(result, idx) in editForm.results" :key="idx" class="flex gap-3">
                <div class="flex-1">
                  <input 
                    v-model="editForm.results[idx].metric"
                    type="text"
                    placeholder="Ex: +50%"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                  />
                  <input 
                    v-model="editForm.results[idx].description"
                    type="text"
                    placeholder="Ex: Augmentation de rendement"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  @click="editForm.results.splice(idx, 1)"
                  type="button"
                  class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition h-fit"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <button
                @click="editForm.results.push({ metric: '', description: '' })"
                type="button"
                class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
              >
                <i class="fas fa-plus"></i> Ajouter un résultat
              </button>
            </div>
          </div>

          <!-- À propos du projet -->
          <div>
            <h3 class="text-lg font-black text-[#016E98] mb-6 flex items-center gap-2">
              <i class="fas fa-info-circle text-[#0392C7]"></i>
              À propos du projet
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
                    placeholder="Ex: Installation solaire haute performance"
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
                    placeholder="Ex: Économies d'énergie considérables"
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

          <!-- Status Message -->
          <div v-if="editStatus" :class="[
            'p-4 rounded-lg text-sm font-medium',
            editStatus.includes('✅') ? 'bg-green-50 text-green-800' : editStatus.includes('⏳') ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'
          ]">
            {{ editStatus }}
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-8 py-4 flex gap-3 justify-between border-t">
          <button
            @click="deleteProjectConfirm"
            type="button"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            <i class="fas fa-trash mr-2"></i>Supprimer
          </button>
          <div class="flex gap-3">
            <button
              @click="closeEditModal"
              type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
            <button
              @click="saveProject"
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
    <section class="bg-gradient-to-r from-[#016E98] to-[#0392C7] py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-8">PRÊT À PASSER À L'ACTION ?</h2>
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Nos experts sont disponibles pour discuter de votre prochain projet.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/contact" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Nous contacter
          </router-link>
          <router-link to="/projets" class="border-2 border-white hover:bg-white/10 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Voir tous les projets
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../lib/firebase'
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useSEOMeta } from '../composables/useSEOMeta'
import { useFirebaseData } from '../composables/useFirebaseData'
import { projects as staticProjects } from '../data/projects.js'
import QuillEditor from '../components/QuillEditor.vue'

// Google Analytics - Dynamic Loading
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date())
  gtag('config', 'G-65BEBH9XRC')
  
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-65BEBH9XRC'
  document.head.appendChild(script)
}

const { setMeta } = useSEOMeta()
const { deleteProject } = useFirebaseData()
const router = useRouter()
const route = useRoute()

// Fonction pour nettoyer les balises HTML
const stripHtml = (html) => {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

const project = ref(null)
const projects = ref([])
const currentImage = ref(null)
const isAdmin = ref(false)
const showEditModal = ref(false)
const isSaving = ref(false)
const editStatus = ref('')
const isDraggingImages = ref(false)
const isDraggingMainImage = ref(false)
const pendingImages = ref([])

const editForm = ref({
  title: '',
  category: '',
  location: '',
  date: '',
  slug: '',
  description: '',
  details: '',
  mainImage: '',
  images: [],
  results: [],
  mainCharacteristics: [],
  advantages: []
})

const relatedProjects = computed(() => {
  if (!project.value || !projects.value) return []
  return projects.value
    .filter(p => p.id !== project.value.id && p.category === project.value.category)
    .slice(0, 3)
})

const loadProjects = async () => {
  try {
    // Charger UNIQUEMENT depuis Firebase (source unique de vérité)
    const querySnapshot = await getDocs(collection(db, 'projects'))
    const firebaseProjects = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id  // L'ID Firestore écrase le data.id statique
    }))
    projects.value = firebaseProjects
    
    // Si aucun projet en base, importer les projets statiques
    if (projects.value.length === 0) {
      await importStaticProjects()
    }
  } catch (error) {
    console.error('Erreur chargement projets Firebase:', error?.message)
    projects.value = []
  }
}

const importStaticProjects = async () => {
  try {
    const { projects: staticProjects } = await import('../data/projects.js')
    
    for (const project of staticProjects) {
      try {
        await addDoc(collection(db, 'projects'), {
          ...project,
          createdAt: new Date(),
          importedAt: new Date(),
          isImported: true
        })
      } catch (err) {
        console.error(`Erreur import ${project.slug}:`, err)
      }
    }
    
    // Recharger après import
    await loadProjects()
  } catch (error) {
    console.error('Erreur import statique:', error)
  }
}

const findProject = () => {
  const slug = route.params.slug
  const foundProject = projects.value.find(p => p.slug === slug)
  
  if (foundProject) {
    project.value = { ...foundProject }
    currentImage.value = foundProject.mainImage || foundProject.images?.[0]
    
    setMeta(
      `${project.value.title} - EGENT-TOGO`,
      project.value.description,
      currentImage.value,
      `/projets/${slug}`,
      { type: 'article', siteName: 'EGENT-TOGO' }
    )
  } else {
    router.push('/projets')
  }
}

onMounted(async () => {
  auth.onAuthStateChanged((user) => {
    isAdmin.value = !!user
  })

  await loadProjects()
  findProject()
})

const goBack = () => {
  router.back()
}

// Admin Functions - Edit
const openEditModal = () => {
  editForm.value = {
    title: project.value.title || '',
    category: project.value.category || '',
    location: project.value.location || '',
    date: project.value.date || '',
    slug: project.value.slug || '',
    description: project.value.description || '',
    details: project.value.details || '',
    mainImage: project.value.mainImage || '',
    images: project.value.images ? JSON.parse(JSON.stringify(project.value.images)) : [],
    results: project.value.results ? JSON.parse(JSON.stringify(project.value.results)) : [],
    mainCharacteristics: project.value.mainCharacteristics ? JSON.parse(JSON.stringify(project.value.mainCharacteristics)) : [],
    advantages: project.value.advantages ? JSON.parse(JSON.stringify(project.value.advantages)) : []
  }
  pendingImages.value = []
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    title: '',
    category: '',
    location: '',
    date: '',
    slug: '',
    description: '',
    details: '',
    mainImage: '',
    images: [],
    results: [],
    mainCharacteristics: [],
    advantages: []
  }
  editStatus.value = ''
  pendingImages.value = []
}

// Image handling
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

const addImagesToProject = () => {
  if (pendingImages.value.length > 0) {
    const newImages = pendingImages.value.map(img => img.src)
    if (!editForm.value.images) {
      editForm.value.images = []
    }
    editForm.value.images = [...editForm.value.images, ...newImages]
    pendingImages.value = []
    editStatus.value = `✅ ${newImages.length} image(s) ajoutée(s) au projet!`
  }
}

// Save Project
const saveProject = async () => {
  // Vérifier que l'ID existe et le convertir en string
  const projectId = String(project.value?.id || '')
  
  if (!projectId) {
    editStatus.value = '❌ Erreur: ID projet non trouvé'
    return
  }

  isSaving.value = true
  editStatus.value = '⏳ Sauvegarde en cours...'

  try {
    const updateData = {
      title: editForm.value.title,
      category: editForm.value.category,
      location: editForm.value.location,
      date: editForm.value.date,
      slug: editForm.value.slug,
      description: editForm.value.description,
      details: editForm.value.details,
      mainImage: editForm.value.mainImage,
      results: editForm.value.results,
      mainCharacteristics: editForm.value.mainCharacteristics,
      advantages: editForm.value.advantages,
      updatedAt: new Date()
    }

    if (editForm.value.images) {
      updateData.images = editForm.value.images
    }

    // Vérifier si c'est un projet statique (ID commence par 'static_')
    if (projectId.startsWith('static_')) {
      // Pour les projets statiques, on crée un nouveau document Firebase
      const docRef = await addDoc(collection(db, 'projects'), {
        ...updateData,
        createdAt: new Date(),
        isFromStatic: true
      })
      
      // Mettre à jour l'ID du projet avec l'ID Firebase généré
      project.value.id = docRef.id
      editStatus.value = '✅ Projet créé avec succès dans la base de données!'
    } else {
      // Pour les projets Firebase existants, on met à jour
      const projectRef = doc(db, 'projects', projectId)
      await updateDoc(projectRef, updateData)
      editStatus.value = '✅ Projet mis à jour avec succès!'
    }

    project.value = {
      ...project.value,
      ...editForm.value
    }
    currentImage.value = editForm.value.mainImage
    
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

const deleteProjectConfirm = async () => {
  if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer "${project.value.title}"?\n\nCette action est irréversible.`)) {
    return
  }

  try {
    const projectId = String(project.value.id || '')
    if (!projectId) {
      throw new Error('ID projet non trouvé')
    }
    await deleteProject(projectId)
    alert('✅ Projet supprimé!')
    router.push('/projets')
  } catch (error) {
    alert('❌ Erreur: ' + error.message)
  }
}
</script>

<style scoped>
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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
