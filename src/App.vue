<script setup>
import { useRouter } from 'vue-router'
import { watch, onMounted } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { initializeAuth } = useAuth()

// Initialiser l'authentification au démarrage de l'app
onMounted(() => {
  initializeAuth()
})

const updateTitle = (route) => {
  const pageTitle = route.meta?.title || 'Accueil'
  document.title = `EGENT TOGO - ${pageTitle}`
}

// Mettre à jour le titre au chargement initial
updateTitle(router.currentRoute.value)

// Mettre à jour le titre quand la route change
watch(() => router.currentRoute.value, (newRoute) => {
  updateTitle(newRoute)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <Header v-if="!router.currentRoute.value.meta?.hideLayout" />
    <main :class="!router.currentRoute.value.meta?.hideLayout ? 'pt-28' : ''">
      <RouterView />
    </main>
    <Footer v-if="!router.currentRoute.value.meta?.hideLayout" />
  </div>
</template>

<style scoped>
</style>
