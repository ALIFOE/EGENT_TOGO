<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolling ? 'px-4 py-0' : 'px-4 py-4'"
  >
    <div class="max-w-7xl mx-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white/20">
      <nav class="flex justify-between items-center px-6 lg:px-8 py-4 lg:py-5">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300 group">
          <div class="relative w-12 h-12">
            <svg viewBox="0 0 100 100" class="w-full h-full group-hover:scale-110 transition-transform duration-300">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#0369a1" stroke-width="2"/>
              <path d="M50 20 L60 40 L50 40 L50 70 L40 50 L50 50 Z" fill="#FF9500"/>
              <circle cx="50" cy="75" r="4" fill="#22c55e"/>
            </svg>
          </div>
          <span class="text-xl font-black text-dark hidden sm:inline-block font-bold">EGENT-TOGO</span>
        </RouterLink>

        <!-- Menu Desktop -->
        <div class="hidden lg:flex items-center space-x-2">
          <RouterLink 
            to="/" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            ACCUEIL
          </RouterLink>
          <RouterLink 
            to="/a-propos" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/a-propos') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            À PROPOS
          </RouterLink>
          <RouterLink 
            to="/services" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/services') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            SERVICES
          </RouterLink>
          <RouterLink 
            to="/produits" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/produits') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            PRODUITS
          </RouterLink>
          <RouterLink 
            to="/actualites" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/actualites') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            ACTUALITÉS
          </RouterLink>
          <RouterLink 
            to="/galerie" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/galerie') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            GALERIE
          </RouterLink>
          <RouterLink 
            to="/contact" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/contact') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            CONTACT
          </RouterLink>
          <RouterLink 
            to="/devis" 
            class="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300"
            :class="isActive('/devis') ? 'text-secondary' : 'text-dark hover:text-secondary'"
          >
            DEVIS
          </RouterLink>
        </div>

        <!-- CTA Button + Mobile Menu -->
        <div class="flex items-center space-x-4">
          <button class="hidden lg:block bg-secondary hover:bg-orange-600 text-white font-black px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm" @click="navigateTo('/devis')">
            Demander un devis
          </button>

          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
            @click="mobileMenuOpen = !mobileMenuOpen"
            :class="mobileMenuOpen ? 'bg-gray-100' : ''"
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
              :class="isActive('/') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              ACCUEIL
            </RouterLink>
            <RouterLink 
              to="/a-propos" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/a-propos') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              À PROPOS
            </RouterLink>
            <RouterLink 
              to="/services" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/services') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              SERVICES
            </RouterLink>
            <RouterLink 
              to="/produits" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/produits') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              PRODUITS
            </RouterLink>
            <RouterLink 
              to="/actualites" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/actualites') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              ACTUALITÉS
            </RouterLink>
            <RouterLink 
              to="/galerie" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/galerie') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              GALERIE
            </RouterLink>
            <RouterLink 
              to="/contact" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/contact') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              CONTACT
            </RouterLink>
            <RouterLink 
              to="/devis" 
              class="block px-4 py-3 rounded-lg font-bold transition-all duration-300"
              :class="isActive('/devis') ? 'text-secondary' : 'text-dark hover:text-secondary'"
              @click="mobileMenuOpen = false"
            >
              DEVIS
            </RouterLink>
            <button class="w-full bg-secondary hover:bg-orange-600 text-white font-black px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4" @click="navigateTo('/devis'); mobileMenuOpen = false">
              Demander un devis
            </button>
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
