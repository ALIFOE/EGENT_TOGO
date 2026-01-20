/**
 * Composable pour gérer les données CRUD
 * Stockage local avec localStorage pour la démo
 */

import { ref, computed } from 'vue'

export function useCrudData() {
  // ==================== PRODUITS ====================
  const products = ref([
    {
      id: 1,
      title: 'Armoire Billy',
      description: 'Système de stockage complet',
      image: '/src/assets/images/armoire_billy.jpg',
      price: '500 000 FCFA',
      category: 'Stockage',
      featured: true,
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      title: 'Lampadaires EGENT Solar',
      description: 'Éclairage solaire haute performance',
      image: '/src/assets/images/lampadaire.jpg',
      price: '250 000 FCFA',
      category: 'Éclairage',
      featured: true,
      createdAt: '2026-01-10'
    },
    {
      id: 3,
      title: 'Kit Zoklin',
      description: 'Kit complet d\'installation solaire',
      image: '/src/assets/images/kit_zoklin.jpg',
      price: '1 500 000 FCFA',
      category: 'Énergie',
      featured: true,
      createdAt: '2026-01-10'
    }
  ])

  // ==================== ACTUALITÉS ====================
  const news = ref([
    {
      id: 1,
      title: 'Inauguration nouveau centre',
      slug: 'inauguration-nouveau-centre',
      description: 'Découvrez notre nouveau centre à Lomé',
      content: 'Contenu complet de l\'article...',
      image: '/src/assets/images/custom/imagefont01.jpg',
      category: 'Événement',
      published: true,
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      title: 'Partenariat International',
      slug: 'partenariat-international',
      description: 'Un nouveau partenariat avec des acteurs mondiaux',
      content: 'Contenu complet de l\'article...',
      image: '/src/assets/images/custom/imagefont02.jpg',
      category: 'Partenariat',
      published: true,
      createdAt: '2026-01-09'
    }
  ])

  // ==================== GALERIE ====================
  const gallery = ref([
    {
      id: 1,
      title: 'Panneau solaire installation',
      category: 'Installation Solaire',
      src: '/src/assets/images/montage_panneau.jpg',
      createdAt: '2026-01-10'
    },
    {
      id: 2,
      title: 'Lampadaires LED montés',
      category: 'Lampadaires LED',
      src: '/src/assets/images/lampandaire_monté3.jpg',
      createdAt: '2026-01-10'
    }
  ])

  // ==================== MÉTHODES PRODUITS ====================
  function addProduct(product) {
    const newProduct = {
      ...product,
      id: Math.max(...products.value.map(p => p.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
    products.value.push(newProduct)
    return newProduct
  }

  function updateProduct(id, updatedProduct) {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updatedProduct }
      return products.value[index]
    }
    return null
  }

  function deleteProduct(id) {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
      return true
    }
    return false
  }

  function getProduct(id) {
    return products.value.find(p => p.id === id)
  }

  // ==================== MÉTHODES ACTUALITÉS ====================
  function addNews(article) {
    const newArticle = {
      ...article,
      id: Math.max(...news.value.map(n => n.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
    news.value.push(newArticle)
    return newArticle
  }

  function updateNews(id, updatedArticle) {
    const index = news.value.findIndex(n => n.id === id)
    if (index !== -1) {
      news.value[index] = { ...news.value[index], ...updatedArticle }
      return news.value[index]
    }
    return null
  }

  function deleteNews(id) {
    const index = news.value.findIndex(n => n.id === id)
    if (index !== -1) {
      news.value.splice(index, 1)
      return true
    }
    return false
  }

  function getNews(id) {
    return news.value.find(n => n.id === id)
  }

  // ==================== MÉTHODES GALERIE ====================
  function addGalleryImage(image) {
    const newImage = {
      ...image,
      id: Math.max(...gallery.value.map(g => g.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
    gallery.value.push(newImage)
    return newImage
  }

  function updateGalleryImage(id, updatedImage) {
    const index = gallery.value.findIndex(g => g.id === id)
    if (index !== -1) {
      gallery.value[index] = { ...gallery.value[index], ...updatedImage }
      return gallery.value[index]
    }
    return null
  }

  function deleteGalleryImage(id) {
    const index = gallery.value.findIndex(g => g.id === id)
    if (index !== -1) {
      gallery.value.splice(index, 1)
      return true
    }
    return false
  }

  function getGalleryImage(id) {
    return gallery.value.find(g => g.id === id)
  }

  return {
    // Produits
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    
    // Actualités
    news,
    addNews,
    updateNews,
    deleteNews,
    getNews,
    
    // Galerie
    gallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    getGalleryImage
  }
}
