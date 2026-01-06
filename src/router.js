import { createRouter, createWebHashHistory } from 'vue-router'

// Pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Services from './pages/Services.vue'
import Products from './pages/Products.vue'
import Gallery from './pages/Gallery.vue'
import News from './pages/News.vue'
import Contact from './pages/Contact.vue'
import Quote from './pages/Quote.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/a-propos',
    name: 'About',
    component: About
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/produits',
    name: 'Products',
    component: Products
  },
  {
    path: '/actualites',
    name: 'News',
    component: News
  },
  {
    path: '/galerie',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/devis',
    name: 'Quote',
    component: Quote
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
