import { createRouter, createWebHistory } from 'vue-router'
import { auth } from './lib/firebase'

// Pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Services from './pages/Services.vue'
import ServiceDetail from './pages/ServiceDetail.vue'
import Products from './pages/Products.vue'
import ProductDetail from './pages/ProductDetail.vue'
import Projects from './pages/Projects.vue'
import ProjectDetail from './pages/ProjectDetail.vue'
import Gallery from './pages/Gallery.vue'
import News from './pages/News.vue'
import ArticleDetail from './pages/ArticleDetail.vue'
import Contact from './pages/Contact.vue'
import Quote from './pages/Quote.vue'
import Login from './pages/Login.vue'
import AdminPanel from './pages/AdminPanel.vue'
import DataImport from './pages/DataImport.vue'
import AddImagesToGallery from './pages/AddImagesToGallery.vue'
import ImportProductsPage from './pages/ImportProductsPage.vue'
import Debug from './pages/Debug.vue'

// Composants Admin
import AdminNews from './components/AdminNews.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Accueil' }
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About,
    meta: { title: 'À propos' }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    meta: { title: 'Services' }
  },
  {
    path: '/service/:slug',
    name: 'ServiceDetail',
    component: ServiceDetail,
    meta: { title: 'Détail Service' }
  },
  {
    path: '/produits',
    name: 'Products',
    component: Products,
    meta: { title: 'Produits' }
  },
  {
    path: '/produits/:slug',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: 'Détail Produit' }
  },
  {
    path: '/projets',
    name: 'Projects',
    component: Projects,
    meta: { title: 'Projets' }
  },
  {
    path: '/projets/:slug',
    name: 'ProjectDetail',
    component: ProjectDetail,
    meta: { title: 'Détail Projet' }
  },
  {
    path: '/actualites',
    name: 'News',
    component: News,
    meta: { title: 'Actualités' }
  },
  {
    path: '/article/:slug',
    name: 'ArticleDetail',
    component: ArticleDetail,
    meta: { title: 'Détail Article' }
  },
  {
    path: '/galerie',
    name: 'Gallery',
    component: Gallery,
    meta: { title: 'Galerie' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: { title: 'Contact' }
  },
  {
    path: '/devis',
    name: 'Quote',
    component: Quote,
    meta: { title: 'Devis' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Connexion' }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { title: 'Tableau de bord Admin', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/news',
    name: 'AdminNews',
    component: AdminNews,
    meta: { title: 'Gestion des Articles', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import',
    name: 'DataImport',
    component: DataImport,
    meta: { title: 'Import de Données', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import-gallery',
    name: 'AddImagesToGallery',
    component: AddImagesToGallery,
    meta: { title: 'Importer les Images', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/admin/import-products',
    name: 'ImportProductsPage',
    component: ImportProductsPage,
    meta: { title: 'Importer les Produits', hideLayout: true, requiresAuth: true }
  },
  {
    path: '/debug',
    name: 'Debug',
    component: Debug,
    meta: { title: 'Débogage' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware de protection des routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
  if (requiresAuth) {
    // Vérifier si l'utilisateur est authentifié
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe() // Arrêter l'écoute après la première vérification
      
      if (user) {
        // Utilisateur authentifié
        next()
      } else {
        // Rediriger vers la page de connexion
        next('/login')
      }
    })
  } else {
    next()
  }
})

// Scroll to top on every route change
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
