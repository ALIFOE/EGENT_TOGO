<template>
  <div>
    <!-- Hero Section -->
    <section 
      class="relative overflow-visible -mt-32 pt-0 pb-20 md:pb-32 bg-gradient-to-br from-blue-900 via-blue-800 to-dark"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div class="flex items-center justify-center">
          <div class="z-10 max-w-3xl text-center">
            <h1 class="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              NOUS VOUS
              <span class="text-secondary">ÉCOUTONS</span>
            </h1>
            <p class="text-white text-lg mb-8 opacity-100">
              Vous avez une question ou un projet ? Contactez-nous et découvrez comment nous pouvons vous aider à réaliser votre transition énergétique.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-12 leading-tight">Informations de Contact</h2>

            <!-- Location -->
            <div class="mb-10">
              <div class="flex items-start space-x-4 mb-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10">
                    <i class="fas fa-map-marker-alt text-secondary text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-black text-[#05075F] text-lg mb-2">Adresse</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Rue des Ouvriers, Imm. à deux étages<br>
                    100 mètres du goudron<br>
                    Totsi Gblenkomé - 04 BP 874<br>
                    Lomé - Togo
                  </p>
                </div>
              </div>
            </div>

            <!-- Phone -->
            <div class="mb-10">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10">
                    <i class="fas fa-phone text-secondary text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-black text-[#05075F] text-lg mb-2">Téléphone</h3>
                  <p class="text-gray-600 leading-relaxed">
                    <a href="tel:+22892531455" class="hover:text-secondary transition-colors">+228 92 53 14 55</a><br>
                    <a href="tel:+22891204373" class="hover:text-secondary transition-colors">+228 91 20 43 73</a>
                  </p>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="mb-10">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10">
                    <i class="fas fa-envelope text-secondary text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-black text-[#05075F] text-lg mb-2">Email</h3>
                  <p class="text-gray-600">
                    <a href="mailto:infos@egenttogo.com" class="hover:text-secondary transition-colors">infos@egenttogo.com</a>
                  </p>
                </div>
              </div>
            </div>

            <!-- Hours -->
            <div>
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-full bg-secondary/10">
                    <i class="fas fa-clock text-secondary text-xl"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-black text-[#05075F] text-lg mb-2">Horaires</h3>
                  <p class="text-gray-600 leading-relaxed">
                    Lundi - Vendredi : 08:00 - 18:00<br>
                    Samedi : 09:00 - 14:00<br>
                    Dimanche : Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-12 leading-tight">Envoyez-nous un message</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Nom & Prénom</label>
                <input 
                  v-model="form.name"
                  type="text" 
                  placeholder="Jean Dupont"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Téléphone</label>
                <input 
                  v-model="form.phone"
                  type="tel" 
                  placeholder="+228 XX XX XX XX"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Email</label>
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="jean@example.com"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Objet</label>
                <select 
                  v-model="form.subject"
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] focus:outline-none focus:border-secondary transition-colors duration-300"
                  required
                >
                  <option value="">Sélectionnez un objet</option>
                  <option value="devis">Demander un devis</option>
                  <option value="info">Demander une information</option>
                  <option value="projet">Discuter d'un projet</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-[#05075F] font-bold text-sm mb-3">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="6"
                  placeholder="Décrivez votre demande en détail..."
                  class="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg text-[#05075F] placeholder-gray-400 focus:outline-none focus:border-secondary transition-colors duration-300 resize-none"
                  required
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                class="w-full bg-secondary hover:bg-orange-600 text-white font-black py-3 rounded-lg transition-colors duration-300 transform hover:scale-105"
              >
                Envoyer le message
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="submitMessage" class="mt-6 p-4 rounded-lg" :class="submitSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ submitMessage }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section (Optional) -->
    <section class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-black text-[#05075F] mb-12 text-center leading-tight">Visitez-nous</h2>
        <div class="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-96">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.737279356194!2d1.2239!3d6.1256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x101fb37aedbfbfbf%3A0x1a1a1a1a1a1a1a1a!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2s!4v1234567890" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

const submitMessage = ref('')
const submitSuccess = ref(false)

const handleSubmit = () => {
  // Validation basique
  if (!form.value.name || !form.value.phone || !form.value.email || !form.value.subject || !form.value.message) {
    submitMessage.value = 'Veuillez remplir tous les champs'
    submitSuccess.value = false
    return
  }

  // Simuler l'envoi
  submitMessage.value = 'Merci pour votre message ! Nous vous recontacterons très bientôt.'
  submitSuccess.value = true

  // Réinitialiser le formulaire
  setTimeout(() => {
    form.value = { name: '', phone: '', email: '', subject: '', message: '' }
    submitMessage.value = ''
  }, 3000)
}
</script>

<style scoped>
input:focus,
textarea:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1);
}
</style>
