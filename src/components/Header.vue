<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolling ? 'px-4 py-0' : 'px-4 py-3'"
  >
    <div class="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-white/20">
      <nav class="flex justify-between items-center px-4 lg:px-6 py-3 lg:py-4">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center hover:opacity-80 transition-opacity duration-300 group">
          <img src="@/assets/images/logo.png" alt="EGENT TOGO" class="h-10 w-auto group-hover:scale-110 transition-transform duration-300">
        </RouterLink>

        <!-- Menu Desktop -->
        <div class="hidden lg:flex items-center space-x-2">
          <RouterLink 
            to="/" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D080]'"
          >
            ACCUEIL
          </RouterLink>
          <RouterLink 
            to="/a-propos" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/a-propos') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            À PROPOS
          </RouterLink>
          <RouterLink 
            to="/services" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/services') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            SERVICES
          </RouterLink>
          <RouterLink 
            to="/produits" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/produits') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            PRODUITS
          </RouterLink>
          <RouterLink 
            to="/actualites" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/actualites') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            ACTUALITÉS
          </RouterLink>
          <RouterLink 
            to="/galerie" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/galerie') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            NOS RÉALISATIONS
          </RouterLink>
          <RouterLink 
            to="/contact" 
            class="px-3 py-1.5 rounded-lg font-bold text-xs transition-all duration-300"
            :class="isActive('/contact') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
          >
            CONTACT
          </RouterLink>
        </div>

        <!-- CTA Button + Mobile Menu -->
        <div class="flex items-center space-x-2 lg:space-x-3">
          <button class="hidden lg:block bg-[#016E98] hover:bg-[#EE6D08] text-white font-black px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs" @click="navigateTo('/projets')">
            Voir nos projets
          </button>
          <button class="hidden lg:block bg-[#EE6D08] hover:bg-[#016E98] text-white font-black px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs" @click="navigateTo('/devis')">
            Demander un devis
          </button>

          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            @click="mobileMenuOpen = !mobileMenuOpen"
            :class="mobileMenuOpen ? 'bg-gray-100' : ''"
            title="Ouvrir/Fermer le menu"
            aria-label="Ouvrir/Fermer le menu"
          >
            <svg 
              class="w-6 h-6 transition-transform duration-300" 
              :class="mobileMenuOpen ? 'rotate-90' : ''"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden border-t border-gray-200 px-6 pb-4">
          <div class="space-y-2 pt-4">
            <RouterLink 
              to="/" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              ACCUEIL
            </RouterLink>
            <RouterLink 
              to="/a-propos" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/a-propos') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              À PROPOS
            </RouterLink>
            <RouterLink 
              to="/services" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/services') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              SERVICES
            </RouterLink>
            <RouterLink 
              to="/produits" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/produits') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              PRODUITS
            </RouterLink>
            <RouterLink 
              to="/actualites" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/actualites') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              ACTUALITÉS
            </RouterLink>
            <RouterLink 
              to="/galerie" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/galerie') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              NOS RÉALISATIONS
            </RouterLink>
            <RouterLink 
              to="/contact" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/contact') ? 'text-[#EE6D08]' : 'text-[#016E98] hover:text-[#EE6D08]'"
              @click="mobileMenuOpen = false"
            >
              CONTACT
            </RouterLink>
            <div class="space-y-2 mt-4">
              <button class="w-full bg-[#016E98] hover:bg-[#EE6D08] text-white font-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" @click="navigateTo('/projets'); mobileMenuOpen = false">
                Voir nos projets
              </button>
              <button class="w-full bg-[#EE6D08] hover:bg-[#016E98] text-white font-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" @click="navigateTo('/devis'); mobileMenuOpen = false">
                Demander un devis
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const mobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()
const isScrolling = ref(false)
const lastScrollY = ref(0)

// Détecte le scroll vers le bas
const handleScroll = () => {
  const currentScrollY = window.scrollY

  // Padding normal au-dessus de la section Hero (jusqu'à 100px)
  // Padding réduit après (scroll vers le bas)
  isScrolling.value = currentScrollY > 100

  lastScrollY.value = currentScrollY
}

// Vérifie si la route est active
const isActive = (path) => {
  return route.path === path
}

// Navigation
const navigateTo = (path) => {
  router.push(path)
}

// Écoute le scroll
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
