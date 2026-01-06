<template>
  <footer class="bg-gradient-to-b from-blue-900 to-dark text-white py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Company Logo & Info -->
        <div>
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-secondary to-blue-400 rounded-full flex items-center justify-center">
              <i class="fas fa-bolt text-white text-xl font-bold"></i>
            </div>
            <span class="text-2xl font-black">EGENT-TOGO</span>
          </div>
          <p class="text-blue-200 text-base leading-relaxed">
            Spécialiste des solutions énergétiques durables et innovantes au Togo. Nous transformons votre autonomie énergétique en réalité.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Navigation</h3>
          <ul class="space-y-3 text-blue-200">
            <li><RouterLink to="/" class="hover:text-secondary transition-colors duration-300">Accueil</RouterLink></li>
            <li><RouterLink to="/a-propos" class="hover:text-secondary transition-colors duration-300">À Propos</RouterLink></li>
            <li><RouterLink to="/services" class="hover:text-secondary transition-colors duration-300">Services</RouterLink></li>
            <li><RouterLink to="/produits" class="hover:text-secondary transition-colors duration-300">Produits</RouterLink></li>
            <li><RouterLink to="/galerie" class="hover:text-secondary transition-colors duration-300">Galerie</RouterLink></li>
            <li><RouterLink to="/actualites" class="hover:text-secondary transition-colors duration-300">Actualités</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-secondary transition-colors duration-300">Contact</RouterLink></li>
            <li><RouterLink to="/devis" class="hover:text-secondary transition-colors duration-300">Demander un Devis</RouterLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Services</h3>
          <ul class="space-y-3 text-blue-200">
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Électricité Générale</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Climatisation & Froid</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Énergie Solaire</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Installation</a></li>
            <li><a href="#" class="hover:text-secondary transition-colors duration-300">Maintenance</a></li>
          </ul>
        </div>

        <!-- Follow Us -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Nous Suivre</h3>
          <p class="text-blue-200 mb-6 text-sm leading-relaxed">
            Suivez EGENT-TOGO sur les réseaux sociaux pour les actualités et nouveautés.
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Twitter/X">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-secondary transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-blue-700 pt-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <p class="text-blue-300 text-sm">
            &copy; 2026 EGENT-TOGO. Tous droits réservés.
          </p>
          <!-- <div class="flex justify-center space-x-6 text-blue-300 text-sm">
            <a href="#" class="hover:text-secondary transition-colors duration-300">Politique de confidentialité</a>
            <a href="#" class="hover:text-secondary transition-colors duration-300">Conditions d'utilisation</a>
          </div> -->
          <!-- <p class="text-blue-300 text-sm">
            Développé avec <i class="fas fa-heart text-secondary"></i> pour l'avenir énergétique du Togo
          </p> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
