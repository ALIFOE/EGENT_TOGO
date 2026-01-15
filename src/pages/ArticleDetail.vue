<template>
  <div>
    <!-- Hero Section with Article Info -->
    <section id="hero-section" class="bg-white pt-20 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button @click="goBack" class="flex items-center gap-2 text-[#0392C7] hover:text-[#FF9D35] font-semibold mb-8 transition-colors animate-fadeInUp animation-delay-200">
          <i class="fas fa-arrow-left"></i>
          Retour aux actualités
        </button>

        <!-- Main Article Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Featured Image Section -->
          <div class="flex flex-col gap-4 animate-fadeInUp animation-delay-300">
            <!-- Main Image -->
            <div class="relative bg-gray-100 rounded-3xl overflow-hidden h-96">
              <img 
                :src="article.image" 
                :alt="article.title"
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Article Info Section -->
          <div class="flex flex-col justify-between animate-fadeInUp animation-delay-400">
            <!-- Header -->
            <div>
              <p class="text-[#FF9D35] font-semibold text-sm uppercase tracking-widest mb-3 animate-slideInDown animation-delay-400">{{ article.category }}</p>
              <h1 class="text-4xl md:text-5xl font-black text-[#016E98] mb-6 leading-tight animate-slideInDown animation-delay-500">{{ article.title }}</h1>
              
              <!-- Date -->
              <div class="bg-blue-50 rounded-2xl p-6 mb-8 animate-fadeInUp animation-delay-500">
                <p class="text-gray-600 text-sm mb-2">Publié le</p>
                <p class="text-2xl font-black text-[#0392C7]">{{ article.date }}</p>
              </div>

              <!-- Excerpt -->
              <p class="text-gray-700 text-lg leading-relaxed mb-8 animate-fadeInUp animation-delay-600">
                {{ article.excerpt }}
              </p>

              <!-- Quick Info -->
              <div class="space-y-3 mb-8 animate-fadeInUp animation-delay-700">
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Article complet et détaillé</span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="fas fa-check-circle text-[#2F7914] text-xl"></i>
                  <span class="text-gray-700">Actualités régulièrement mises à jour</span>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-800">
                <router-link to="/contact" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-envelope"></i>
                  Nous contacter
                </router-link>
                <router-link to="/actualites" class="border-2 border-[#0392C7] hover:bg-blue-50 text-[#0392C7] px-8 py-3 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                  <i class="fas fa-newspaper"></i>
                  Autres actualités
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content Section -->
    <section id="detail-section" class="bg-gray-50 py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Left: Article Content -->
          <div class="md:col-span-2">
            <div class="bg-white rounded-3xl p-8 shadow-lg animate-fadeInUp animation-delay-300">
              <h2 class="text-3xl font-black text-[#016E98] mb-8 animate-slideInDown animation-delay-400">Contenu de l'article</h2>
              <div class="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p 
                  v-for="(paragraph, index) in article.content" 
                  :key="index"
                  class="text-lg leading-relaxed"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right: Article Info -->
          <div>
            <div class="bg-white rounded-3xl p-8 shadow-lg sticky top-20 animate-fadeInUp animation-delay-400">
              <h3 class="text-2xl font-black text-[#016E98] mb-8 animate-slideInDown animation-delay-500">Informations</h3>
              <div class="space-y-6">
                <!-- Category -->
                <div class="border-b border-gray-200 pb-4 animate-fadeInUp animation-delay-600">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">Catégorie</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.category }}</p>
                </div>

                <!-- Date -->
                <div class="border-b border-gray-200 pb-4 animate-fadeInUp animation-delay-700">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-2">Date de publication</p>
                  <p class="text-lg font-bold text-[#016E98]">{{ article.date }}</p>
                </div>

                <!-- Share -->
                <div class="border-b border-gray-200 pb-4 animate-fadeInUp animation-delay-800">
                  <p class="text-sm text-[#FF9D35] font-semibold uppercase tracking-widest mb-3">Partager</p>
                  <div class="flex gap-3">
                    <a href="#" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-blue-50 hover:bg-[#FF9D35] text-[#0392C7] hover:text-white transition-all flex items-center justify-center">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Additional Info Box -->
              <div class="mt-8 bg-blue-50 rounded-2xl p-6 animate-fadeInUp animation-delay-900">
                <div class="flex items-start gap-4">
                  <i class="fas fa-lightbulb text-[#0392C7] text-2xl mt-1"></i>
                  <div>
                    <p class="font-bold text-[#016E98] mb-2">À savoir</p>
                    <p class="text-sm text-gray-700">
                      Restez informé des dernières actualités de EGENT-TOGO. Consulter notre blog régulièrement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Articles Section -->
    <section id="related-section" class="bg-white py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-[#016E98] leading-tight mb-6 animate-fadeInUp animation-delay-200">AUTRES ACTUALITÉS</h2>
          <p class="text-gray-600 text-lg max-w-2xl mx-auto animate-fadeInUp animation-delay-300">
            Découvrez nos autres articles et actualités
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(related, index) in relatedArticles" 
            :key="related.id"
            @click="navigateToArticle(related.slug)"
            :class="['bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 duration-300', 'animate-fadeInUp', `animation-delay-${400 + index * 100}`]"
          >
            <img 
              :src="related.image" 
              :alt="related.title"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-black text-[#0392C7] mb-2">{{ related.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ related.excerpt }}</p>
              <p class="text-[#FF9D35] font-black text-sm">{{ related.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section id="cta-section" class="bg-gradient-to-r from-[#016E98] to-[#0392C7] py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-8 animate-slideInDown animation-delay-200">VOUS AVEZ DES QUESTIONS ?</h2>
        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
          Notre équipe est disponible pour répondre à vos questions et vous fournir plus d'informations.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-600">
          <router-link to="/contact" class="bg-[#FF9D35] hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Nous contacter
          </router-link>
          <router-link to="/actualites" class="border-2 border-white hover:bg-white/10 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors">
            Retour aux actualités
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCursorFollowText } from '../composables/useCursorFollowText'

// Import images
import imgHeadepage from '@/assets/images/headepage.webp'
import imgPhotoConf3 from '@/assets/images/photo_conf3.jpg'
import imgPrix1 from '@/assets/images/prix1.jpg'
import imgPhotoConf2 from '@/assets/images/photo_conf2.jpg'
import imgPhotoChantier2 from '@/assets/images/photo_chantier2.jpg'
import imgPhotoChantier from '@/assets/images/photo_chantier.jpg'

const route = useRoute()
const router = useRouter()
useCursorFollowText()
const heroInView = ref(false)
const detailInView = ref(false)
const relatedInView = ref(false)
const ctaInView = ref(false)

// Articles data
const articlesData = {
  'inauguration-nouveau-centre': {
    id: 1,
    slug: 'inauguration-nouveau-centre',
    title: 'Inauguration du nouveau centre de formation',
    category: 'Actualité',
    date: '5 Jan 2026',
    image: imgHeadepage,
    excerpt: 'Découvrez le lancement officiel de notre nouveau centre de formation équipé des dernières technologies.',
    content: [
      'EGENT-TOGO a le plaisir d\'annoncer l\'inauguration officielle de son nouveau centre de formation dernier cri. Situé au cœur de Lomé, ce centre moderne dispose des infrastructures les plus avancées pour offrir une formation de qualité.',
      'Avec une surface de 5000 m², le centre accueille plus de 200 apprenants simultanément et dispose de 15 salles de formation équipées de technologies dernière génération, incluant la réalité augmentée et les simulations interactives.',
      'Cet investissement conséquent reflète notre engagement envers l\'excellence en formation professionnelle et le développement des compétences au Togo. Le centre offrira des formations dans les domaines de l\'électricité, de la plomberie, de la climatisation et bien d\'autres secteurs clés.',
      'Les premiers apprenants ont déjà commencé à bénéficier des installations ultramodernes et des formateurs expérimentés mis en place par EGENT-TOGO.'
    ]
  },
  'partenariat-international': {
    id: 2,
    slug: 'partenariat-international',
    title: 'Partenariat international stratégique',
    category: 'Partenariat',
    date: '2 Jan 2026',
    image: imgPhotoConf3,
    excerpt: 'EGENT-TOGO établit un partenariat stratégique avec des leaders mondiaux du secteur.',
    content: [
      'EGENT-TOGO a signé un accord de partenariat historique avec plusieurs entreprises internationales majeures. Ce partenariat vise à renforcer notre capacité à offrir des solutions innovantes et durables.',
      'Cette collaboration nous permettra d\'accéder à de nouvelles technologies et d\'élargir notre réseau de distribution à l\'échelle mondiale. Les partenaires internationaux reconnaissent l\'excellence et la fiabilité de nos services au Togo et en Afrique de l\'Ouest.',
      'Le partenariat couvre plusieurs domaines : la formation professionnelle, le déploiement de solutions technologiques, et le transfert de compétences. Les deux parties s\'engagent à créer des opportunités durables pour le développement économique régional.',
      'Cette alliance stratégique positionne EGENT-TOGO comme un acteur clé du marché africain et ouvre de nouvelles perspectives pour nos clients et partenaires.'
    ]
  },
  'prix-reconnaissance': {
    id: 3,
    slug: 'prix-reconnaissance',
    title: 'Prix et reconnaissance dans l\'industrie',
    category: 'Reconnaissance',
    date: '30 Déc 2025',
    image: imgPrix1,
    excerpt: 'EGENT-TOGO reçoit plusieurs distinctions pour son excellence opérationnelle.',
    content: [
      'EGENT-TOGO a remporté le prestigieux prix "Excellence et Innovation 2025" décerné par la chambre de commerce du Togo. Cette reconnaissance récompense nos efforts continus en matière de qualité et d\'innovation.',
      'Cette distinction souligne notre engagement envers l\'excellence en service client, la formation continue de nos équipes et l\'adoption de technologies de pointe. Nous sommes fiers d\'être reconnus par nos pairs et nos clients.',
      'Le jury a particulièrement apprécié nos initiatives de durabilité environnementale et notre contribution au développement des compétences dans le secteur des services techniques.',
      'Cette récompense nous motive à poursuivre notre quête d\'excellence et à maintenir les normes élevées qui nous caractérisent depuis notre création.'
    ]
  },
  'ressources-humaines-equipe': {
    id: 4,
    slug: 'ressources-humaines-equipe',
    title: 'Expansion de notre équipe - Ressources Humaines',
    category: 'Ressources Humaines',
    date: '25 Déc 2025',
    image: imgPhotoConf2,
    excerpt: 'Nous recrutons 50 nouveaux professionnels pour renforcer nos équipes.',
    content: [
      'EGENT-TOGO accélère son recrutement et prévoit d\'intégrer 50 nouveaux collaborateurs au cours du premier trimestre 2026. Cette expansion reflète notre croissance continue et notre ambition de servir davantage de clients.',
      'Nous recherchons des professionnels dans plusieurs domaines : techniques, ventes, gestion de projets, ressources humaines et informatique. Les candidats retenus bénéficieront d\'un programme de formation complet et d\'une carrière prometteuse.',
      'Nous croyons que notre succès dépend de la qualité de nos collaborateurs. C\'est pourquoi nous offrons des salaires compétitifs, des avantages sociaux attrayants et un environnement de travail inclusif et dynamique.',
      'Si vous êtes intéressé par une opportunité chez EGENT-TOGO, consultez notre rubrique "Carrières" pour découvrir les postes disponibles et soumettre votre candidature.'
    ]
  },
  'durabilite-engagement': {
    id: 5,
    slug: 'durabilite-engagement',
    title: 'Notre engagement en faveur de la durabilité',
    category: 'Durabilité',
    date: '22 Déc 2025',
    image: imgPhotoChantier2,
    excerpt: 'EGENT-TOGO s\'engage pour la protection de l\'environnement et le développement durable.',
    content: [
      'EGENT-TOGO a lancé un programme ambitieux de durabilité visant à réduire son empreinte carbone de 40% d\'ici 2030. Ce programme comprend plusieurs initiatives concrètes pour l\'environnement.',
      'Nous avons investi dans des équipements économes en énergie, des véhicules électriques pour nos équipes, et des programmes de sensibilisation à la protection de l\'environnement. Chaque équipe est responsable de contribuer aux objectifs de durabilité.',
      'Nos projets de formation intègrent également des modules sur les pratiques durables et les technologies vertes. Nous croyons que l\'éducation est clé pour bâtir un avenir plus durable.',
      'Chez EGENT-TOGO, la durabilité n\'est pas qu\'une responsabilité, c\'est une opportunité de créer de la valeur à long terme pour nos clients, nos collaborateurs et notre communauté.'
    ]
  },
  'evenement-clients': {
    id: 6,
    slug: 'evenement-clients',
    title: 'Événement clients - Gala de reconnaissance 2026',
    category: 'Événement',
    date: '20 Déc 2025',
    image: imgPhotoChantier,
    excerpt: 'Célébrez avec nous notre gala annuel de reconnaissance clients.',
    content: [
      'EGENT-TOGO est ravi de vous inviter à son Gala de Reconnaissance Clients 2026, prévu le 15 février à Lomé. Cet événement prestigieux réunit nos plus fidèles clients pour célébrer une année de succès mutuels.',
      'Le gala comprendra des présentations des innovations 2026, des témoignages de clients satisfaits, et un dîner gourmet. C\'est l\'occasion idéale de rencontrer notre équipe de direction et de nouer des relations commerciales précieuses.',
      'Des prix spéciaux seront remis aux partenaires les plus fidèles et aux projets les plus innovants réalisés en 2025. Nous espérons pouvoir compter sur votre présence pour célébrer ensemble.',
      'Les invitations ont été envoyées à tous nos clients majeurs. Si vous n\'avez pas reçu la vôtre, veuillez nous contacter directement pour plus de détails et pour confirmer votre présence.'
    ]
  }
}

const article = computed(() => {
  return articlesData[route.params.slug] || articlesData['inauguration-nouveau-centre']
})

const relatedArticles = computed(() => {
  return Object.values(articlesData)
    .filter(a => a.slug !== route.params.slug)
    .slice(0, 3)
})

const setupObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.id === 'hero-section') {
        heroInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'detail-section') {
        detailInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'related-section') {
        relatedInView.value = entry.isIntersecting;
      } else if (entry.target.id === 'cta-section') {
        ctaInView.value = entry.isIntersecting;
      }
    });
  }, observerOptions);

  const sections = ['hero-section', 'detail-section', 'related-section', 'cta-section'];
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
};

onMounted(() => {
  setTimeout(() => {
    setupObserver();
  }, 100);
})

const goBack = () => {
  router.push('/actualites')
}

const navigateToArticle = (slug) => {
  router.push(`/article/${slug}`)
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slideInDown {
  animation: slideInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-700 { animation-delay: 0.7s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-900 { animation-delay: 0.9s; }

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
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
