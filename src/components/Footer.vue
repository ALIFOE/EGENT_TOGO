<template>
  <footer class="bg-[#016E98] text-white py-16 md:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <!-- Company Logo & Info -->
        <div>
          <div class="flex items-center justify-center mb-6 relative">
            <div class="absolute -inset-3 bg-white rounded-lg"></div>
            <img src="@/assets/images/logo.png" alt="EGENT TOGO" class="h-15 w-auto relative z-10">
          </div>
          <p class="text-blue-50 text-base leading-relaxed">
            Nous accompagnons les entreprises comme particulier à réaliser leur projet de système solaire Off-Grid et On-Grid. Nous commercialisons des équipements solaires de qualités rassurantes avec une garantie.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Navigation</h3>
          <ul class="space-y-3 text-blue-50">
            <li><RouterLink to="/" class="hover:text-[#EE6D08] transition-colors duration-300">Accueil</RouterLink></li>
            <li><RouterLink to="/a-propos" class="hover:text-[#EE6D08] transition-colors duration-300">À Propos</RouterLink></li>
            <li><RouterLink to="/services" class="hover:text-[#EE6D08] transition-colors duration-300">Services</RouterLink></li>
            <li><RouterLink to="/produits" class="hover:text-[#EE6D08] transition-colors duration-300">Produits</RouterLink></li>
           <li><RouterLink to="/actualites" class="hover:text-[#EE6D08] transition-colors duration-300">Actualités</RouterLink></li>
            <li><RouterLink to="/galerie" class="hover:text-[#EE6D08] transition-colors duration-300">Galerie</RouterLink></li>
        
            <li><RouterLink to="/contact" class="hover:text-[#EE6D08] transition-colors duration-300">Contact</RouterLink></li>
            <li><RouterLink to="/projets" class="hover:text-[#EE6D08] transition-colors duration-300">Voir nos projets</RouterLink></li>
            <li><RouterLink to="/devis" class="hover:text-[#EE6D08] transition-colors duration-300">Demander un Devis</RouterLink></li>

          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Services</h3>
          <ul class="space-y-3 text-blue-50">
            <li><RouterLink to="/services" class="hover:text-[#EE6D08] transition-colors duration-300">Tous les Services</RouterLink></li>
            <li><RouterLink to="/service/energie-solaire" class="hover:text-[#EE6D08] transition-colors duration-300">Énergie Solaire</RouterLink></li>
            <li><RouterLink to="/service/electricite-generale" class="hover:text-[#EE6D08] transition-colors duration-300">Électricité Générale</RouterLink></li>
            <li><RouterLink to="/service/climatisation-froid" class="hover:text-[#EE6D08] transition-colors duration-300">Climatisation & Froid</RouterLink></li>
            <li><RouterLink to="/service/plomberie" class="hover:text-[#EE6D08] transition-colors duration-300">Plomberie</RouterLink></li>
            <li><RouterLink to="/service/fourniture-equipements" class="hover:text-[#EE6D08] transition-colors duration-300">Fourniture d'Équipements</RouterLink></li>
            <li><RouterLink to="/service/consulting" class="hover:text-[#EE6D08] transition-colors duration-300">consulting</RouterLink></li>
          </ul>
        </div>

        <!-- Follow Us -->
        <div>
          <h3 class="font-black text-xl text-white mb-6">Nous Suivre</h3>
          <p class="text-blue-50 mb-6 text-sm leading-relaxed">
            Suivez EGENT-TOGO sur les réseaux sociaux pour les actualités et nouveautés.
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://www.facebook.com/people/EGENT-TOGO/100036214345608/" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Facebook">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com/EgentTogo" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Twitter/X">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/company/egenttogo/" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/egent_togo/" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Instagram">
              <i class="fab fa-instagram"></i>

            </a>
            <a href="https://www.threads.net/egent_togo/" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="Threads">
              <i class="fab fa-threads"></i>
            </a>
            <a href="https://www.youtube.com/channel/UC-OymaCWKirMuMAzyDN5uYw/featured" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.youtube.com/channel/UC-OymaCWKirMuMAzyDN5uYw/featured" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://api.whatsapp.com/send?phone=22892531455&text=Bonjour%2C%20je%20vous%20contacte%20de%20la%20part%20de%20%2AGo%20Africa%20Online%2A%2C%0A" target="_blank" rel="noopener noreferrer" class="text-blue-200 hover:text-[#EE6D08] transition-colors duration-300 text-2xl hover:scale-110 transform duration-300" title="WhatsApp">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-blue-700 pt-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <p class="text-blue-50 text-sm">
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
