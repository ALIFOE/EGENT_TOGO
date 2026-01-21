<template>
  <div class="min-h-screen bg-[#016E98] flex items-center justify-center p-4">
    <!-- Éléments de décoration -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
    
    <div class="w-full max-w-md relative z-10">
      <!-- Card Login -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header bar -->
        <div class="h-2 bg-[#EE6D08]"></div>
        
        <div class="p-8 md:p-10">
          <!-- Logo -->
          <div class="text-center mb-8">
            <img 
              src="@/assets/images/logo.png" 
              alt="EGENT TOGO Logo" 
              class="h-16 w-auto mx-auto mb-4 drop-shadow-lg hover:scale-110 transition-transform duration-300"
            >
            <!-- <h1 class="text-3xl font-black text-[#016E98]">EGENT-TOGO</h1> -->
            <p class="text-sm font-semibold text-[#EE6D08] mt-2 tracking-widest uppercase">Espace Administrateur</p>
          </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-[#016E98] mb-2">
              📧 Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE6D08] focus:border-transparent outline-none transition duration-200 hover:border-[#016E98]"
              placeholder="admin@egenttogo.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-[#016E98] mb-2">
              🔐 Mot de passe
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EE6D08] focus:border-transparent outline-none transition duration-200 hover:border-[#016E98]"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3.5 text-[#016E98] hover:text-[#EE6D08] transition-colors"
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
          <div class="flex items-center pt-2">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="w-4 h-4 accent-[#EE6D08] border-gray-300 rounded focus:ring-[#EE6D08]"
            />
            <label for="remember" class="ml-2 block text-sm font-medium text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="error || authError" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm font-medium">
            ⚠️ {{ error || authError }}
          </div>

          <!-- Loading -->
          <div v-if="loading" class="p-4 bg-blue-50 border-l-4 border-[#016E98] rounded-lg text-[#016E98] text-sm font-medium">
            ⏳ Connexion en cours...
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#EE6D08] hover:bg-[#d95c07] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            {{ loading ? '⏳ Connexion...' : '✨ Se connecter' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-grow border-t border-gray-200"></div>
          <span class="px-3 text-sm text-gray-500">ou</span>
          <div class="flex-grow border-t border-gray-200"></div>
        </div>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Pas d'accès ?
            <a href="/contact" class="font-semibold text-[#EE6D08] hover:text-[#016E98] transition-colors">
              Contactez-nous
            </a>
          </p>
        </div>
      </div>

      <!-- Info Box -->
      <div class="mt-6 bg-white rounded-xl shadow-lg p-5 border-l-4 border-[#2F7914]">
        <div class="flex items-start space-x-3">
          <span class="text-2xl">🔒</span>
          <div>
            <p class="text-sm font-semibold text-[#016E98]">Zone Sécurisée</p>
            <p class="text-xs text-gray-600 mt-1">Réservée aux administrateurs d'EGENT-TOGO</p>
            <p class="text-xs text-gray-500 mt-1">Authentification sécurisée via Firebase</p>
          </div>
        </div>
      </div>
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
