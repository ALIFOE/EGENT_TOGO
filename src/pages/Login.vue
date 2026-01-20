<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card Login -->
      <div class="bg-white rounded-lg shadow-2xl p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">EGENT-TOGO</h1>
          <p class="text-gray-500 mt-2">Connexion Admin</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              placeholder="admin@egenttogo.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="error || authError" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ error || authError }}
          </div>

          <!-- Loading -->
          <div v-if="loading" class="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
            Connexion en cours...
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Demandes d'accès?
            <a href="/contact" class="text-blue-600 hover:text-blue-700 font-medium">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>

      <!-- Info Box -->
      <div class="mt-6 bg-white/10 rounded-lg p-4 text-white text-center text-sm">
        <p>Cette zone est réservée aux administrateurs</p>
        <p class="text-white/80 mt-1">Authentification via Firebase</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, loading, error: authError } = useAuth()

const form = ref({
  email: 'admin@egenttogo.com',
  password: '',
  remember: false
})

const showPassword = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''

  try {
    // Validation
    if (!form.value.email || !form.value.password) {
      error.value = 'Veuillez remplir tous les champs'
      return
    }

    // Connexion avec Firebase
    await login(form.value.email, form.value.password)

    // Stocker l'email si "se souvenir de moi" est coché
    if (form.value.remember) {
      localStorage.setItem('rememberedEmail', form.value.email)
    } else {
      localStorage.removeItem('rememberedEmail')
    }

    // Rediriger vers admin
    router.push('/admin')
  } catch (err) {
    error.value = authError.value || 'Erreur de connexion'
  }
}

// Charger l'email mémorisé au démarrage
if (localStorage.getItem('rememberedEmail')) {
  form.value.email = localStorage.getItem('rememberedEmail')
  form.value.remember = true
}
</script>

<style scoped>
input:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
</style>
