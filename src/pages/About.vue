<template>
  <div class="bg-white py-8 md:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Titre -->
      <div class="text-center mb-16 md:mb-20">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-dark mb-4">À PROPOS DE <span class="text-secondary">NOUS</span></h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">Découvrez notre mission, nos valeurs et notre engagement envers l'énergie durable</p>
      </div>

      <!-- Section Vidéo/Image avec bouton play -->
      <div class="mb-16 md:mb-24">
        <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
          <img 
            src="https://via.placeholder.com/1200x500?text=About+Video" 
            alt="À propos d'EGENT TOGO"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <!-- Play button -->
          <button class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-secondary transition-all duration-300 shadow-xl">
              <i class="fas fa-play text-dark text-xl ml-1"></i>
            </div>
          </button>
        </div>
      </div>

      <!-- Section Notre Histoire -->
      <div class="mb-16 md:mb-24">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <!-- Carte verte avec statistiques -->
          <div class="bg-green-600 rounded-3xl p-8 text-white w-80 h-80 flex flex-col justify-around">
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
          <div>
            <h2 class="text-5xl font-black text-blue-900 mb-6">NOTRE HISTOIRE</h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Fondée avec passion et expertise, EGENT TOGO a une histoire marquée par un engagement constant envers l'excellence et le service client. Depuis notre création, nous avons réalisé des projets variés et avons acquis une expérience approfondie dans le domaine des énergies renouvelables et de l'électricité générale. Chaque étape de notre parcours témoigne de notre détermination à être un acteur clé dans le secteur énergétique.
            </p>
          </div>
        </div>
      </div>

      <!-- Section Nos Objectifs et Vision -->
      <div class="mb-16 md:mb-40 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-stretch">
          <!-- Contenu texte gauche -->
          <div class="flex flex-col justify-center">
            <!-- NOS OBJECTIFS -->
            <div class="mb-20 md:mb-24">
              <div class="flex items-center gap-4 mb-8">
                <div class="w-2 h-16 bg-gradient-to-b from-orange-400 to-transparent rounded-full"></div>
                <h2 class="text-4xl md:text-5xl font-black text-dark">NOS OBJECTIFS</h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed">
                Chez EGENT TOGO, notre objectif est de fournir des solutions énergétiques durables en se spécialisant dans la fourniture et l'installation d'équipements solaires ainsi que dans l'électricité générale. Nous nous engageons à offrir des solutions innovantes pour répondre aux besoins énergétiques de nos clients, tout en contribuant activement à la transition vers une énergie propre et renouvelable.
              </p>
            </div>

            <!-- Ligne de séparation -->
            <div class="h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent mb-20 md:mb-24"></div>

            <!-- NOTRE VISION -->
            <div>
              <div class="flex items-center gap-4 mb-8">
                <div class="w-2 h-16 bg-gradient-to-b from-blue-600 to-transparent rounded-full"></div>
                <h2 class="text-4xl md:text-5xl font-black text-dark">NOTRE VISION</h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed">
                Notre vision chez EGENT TOGO est de devenir un leader reconnu dans le domaine des énergies renouvelables en offrant des solutions fiables, durables et innovantes. Nous aspirons à jouer un rôle essentiel dans la création d'un avenir énergétique plus propre et à contribuer au bien-être de nos clients, de nos communautés et de notre planète.
              </p>
            </div>
          </div>

          <!-- Contenu visuel droite - Image portrait avec icônes -->
          <div class="relative h-full min-h-[600px] md:min-h-screen flex items-center justify-center">
            <!-- Image portrait de fond -->
            <div class="relative w-full h-full rounded-3xl overflow-visible shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&h=900&fit=crop" 
                alt="Panneaux solaires - Énergie renouvelable"
                class="w-full h-full object-cover rounded-3xl hover:shadow-3xl transition-shadow duration-500"
              />
              <!-- Gradient overlay subtle -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent rounded-3xl"></div>

              <!-- Icône Objectifs - Carré haut gauche -->
              <div class="absolute top-1/4 left-0 z-10 -translate-x-1/2 group">
                <div class="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 text-white shadow-2xl w-40 h-40 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-95 group-hover:shadow-orange-400/50 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 group-hover:rotate-12 transition-transform duration-300">
                    <i class="fas fa-bullseye text-orange-500 text-2xl"></i>
                  </div>
                  <p class="text-xs font-black text-orange-100 text-center leading-tight">NOS</p>
                  <p class="text-xs font-black text-orange-100 text-center leading-tight">OBJECTIFS</p>
                </div>
              </div>

              <!-- Icône Vision - Carré bas gauche -->
              <div class="absolute bottom-1/4 left-0 z-10 -translate-x-1/2 group">
                <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-2xl w-40 h-40 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-95 group-hover:shadow-blue-600/50 group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                  <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 group-hover:-rotate-12 transition-transform duration-300">
                    <i class="fas fa-eye text-blue-600 text-2xl"></i>
                  </div>
                  <p class="text-xs font-black text-blue-100 text-center leading-tight">NOTRE</p>
                  <p class="text-xs font-black text-blue-100 text-center leading-tight">VISION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      <!-- Section Notre Équipes -->
      <div class="mb-16 md:mb-24 py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white rounded-3xl px-8 md:px-16">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-dark mb-6">NOTRE <span class="text-secondary">ÉQUIPES</span></h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nos experts passionnés sont au cœur de notre succès. Avec une expérience approfondie dans les énergies renouvelables et l'électricité générale, notre équipe s'engage à fournir des solutions innovantes et durables pour transformer votre accès à l'énergie.
          </p>
        </div>

        <!-- Grille d'équipes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Membre 1 -->
          <div class="group">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" 
                alt="Professionnel de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-dark mb-2 group-hover:text-secondary transition-colors duration-300">Koffi Diabaté</h3>
              <p class="text-secondary font-bold text-sm">Chef du département énergie solaire</p>
            </div>
          </div>

          <!-- Membre 2 -->
          <div class="group">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop" 
                alt="Professionnelle de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-dark mb-2 group-hover:text-secondary transition-colors duration-300">Solim Gnitou</h3>
              <p class="text-secondary font-bold text-sm">Chef du département climatisation</p>
            </div>
          </div>

          <!-- Membre 3 -->
          <div class="group">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop" 
                alt="Professionnel de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-dark mb-2 group-hover:text-secondary transition-colors duration-300">Yacine Diallo</h3>
              <p class="text-secondary font-bold text-sm">Chef du département installation</p>
            </div>
          </div>

          <!-- Membre 4 -->
          <div class="group">
            <div class="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" 
                alt="Professionnelle de l'équipe"
                class="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
              <div class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i class="fas fa-star text-white text-lg"></i>
              </div>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-black text-dark mb-2 group-hover:text-secondary transition-colors duration-300">Ama Mensah</h3>
              <p class="text-secondary font-bold text-sm">Chef du département maintenance</p>
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
      <div class="mb-16 md:mb-24 py-16 md:py-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl px-8 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <!-- Contenu texte gauche -->
          <div class="flex flex-col justify-center">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-dark mb-8 leading-tight">
              DITES AU REVOIR AUX <span class="text-secondary">PANNES</span><br/>D'ÉLECTRICITÉ ET<br/>AUX <span class="text-secondary">FACTURES SALÉES.</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              Nous vous proposons des solutions d'énergie renouvelable pour votre maison ou votre entreprise à des prix abordables. Une première étape vers un avenir plus vert et économe en énergie.
            </p>
            <div>
              <button class="bg-gradient-to-r from-secondary to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105">
                Demander un devis
              </button>
            </div>
          </div>

          <!-- Image droite -->
          <div class="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e3c3136db3f0?w=600&h=700&fit=crop" 
              alt="Solutions d'énergie renouvelable"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-300"></div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 md:p-16 text-center">
        <h2 class="text-3xl md:text-4xl font-black text-white mb-6">Prêt à Rejoindre Notre Mission ?</h2>
        <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Contactez-nous pour découvrir comment nous pouvons transformer votre accès à l'énergie.</p>
        <button class="bg-secondary hover:bg-orange-600 text-white font-black px-8 py-4 rounded-full transition-colors duration-300 text-lg">
          Demander un Devis
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
