import { ref } from 'vue'
import { collection, getDocs, query, orderBy, where, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function useFirebaseData() {
  const products = ref([])
  const articles = ref([])
  const projects = ref([])
  const gallery = ref([])
  const loading = ref(false)
  const error = ref(null)

  const initializeProducts = async () => {
    try {
      loading.value = true
      error.value = null
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      products.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (err) {
      console.error('Erreur chargement produits:', err)
      error.value = err.message
      products.value = []
    } finally {
      loading.value = false
    }
  }

  const addProduct = async (productData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: serverTimestamp()
      })
      await initializeProducts()
      return docRef.id
    } catch (err) {
      console.error('Erreur ajout produit:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'products', id)
      await updateDoc(docRef, {
        ...productData,
        updatedAt: serverTimestamp()
      })
      await initializeProducts()
    } catch (err) {
      console.error('Erreur mise à jour produit:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'products', id)
      await deleteDoc(docRef)
      await initializeProducts()
    } catch (err) {
      console.error('Erreur suppression produit:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const initializeArticles = async () => {
    try {
      loading.value = true
      error.value = null
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      articles.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (err) {
      console.error('Erreur chargement articles:', err)
      error.value = err.message
      articles.value = []
    } finally {
      loading.value = false
    }
  }

  const initializeGallery = async () => {
    try {
      loading.value = true
      error.value = null
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      gallery.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (err) {
      console.error('Erreur chargement galerie:', err)
      error.value = err.message
      gallery.value = []
    } finally {
      loading.value = false
    }
  }

  const addGalleryImage = async (imageData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...imageData,
        createdAt: serverTimestamp()
      })
      await initializeGallery()
      return docRef.id
    } catch (err) {
      console.error('Erreur ajout image:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateGalleryImage = async (id, imageData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'gallery', id)
      await updateDoc(docRef, {
        ...imageData,
        updatedAt: serverTimestamp()
      })
      await initializeGallery()
    } catch (err) {
      console.error('Erreur mise à jour image:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteGalleryImage = async (id) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'gallery', id)
      await deleteDoc(docRef)
      await initializeGallery()
    } catch (err) {
      console.error('Erreur suppression image:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Alias pour les articles (news)
  const initializeNews = async () => {
    return await initializeArticles()
  }

  const addNews = async (newsData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = await addDoc(collection(db, 'articles'), {
        ...newsData,
        createdAt: serverTimestamp()
      })
      await initializeArticles()
      return docRef.id
    } catch (err) {
      console.error('Erreur ajout article:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateNews = async (id, newsData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'articles', id)
      await updateDoc(docRef, {
        ...newsData,
        updatedAt: serverTimestamp()
      })
      await initializeArticles()
    } catch (err) {
      console.error('Erreur mise à jour article:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteNews = async (id) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'articles', id)
      await deleteDoc(docRef)
      await initializeArticles()
    } catch (err) {
      console.error('Erreur suppression article:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Projects CRUD
  const initializeProjects = async () => {
    loading.value = true
    error.value = null
    
    try {
      // Charger les projets statiques en premier
      let allProjects = []
      try {
        const { projects: staticProjects } = await import('../data/projects.js')
        allProjects = staticProjects.map((proj, idx) => ({
          id: proj.id || `static_${proj.slug}_${idx}`,
          ...proj
        }))
      } catch (staticErr) {
        console.warn('Avertissement: Impossible de charger les projets statiques:', staticErr)
      }
      
      // Essayer de charger depuis Firebase
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const firebaseProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        // Ajouter les projets Firebase à la liste
        allProjects = [...allProjects, ...firebaseProjects]
      } catch (firebaseErr) {
        console.warn('Avertissement: Impossible de charger les projets Firebase:', firebaseErr?.message)
        // Les projets statiques restent chargés
      }
      
      // S'assurer qu'on a au moins les projets statiques
      if (allProjects.length === 0) {
        throw new Error('Aucun projet disponible')
      }
      
      projects.value = allProjects
    } catch (err) {
      console.error('Erreur critique initialisation projets:', err)
      error.value = err.message
      projects.value = []
    } finally {
      loading.value = false
    }
  }

  const addProject = async (projectData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: serverTimestamp()
      })
      await initializeProjects()
      return docRef.id
    } catch (err) {
      console.error('Erreur ajout projet:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProject = async (id, projectData) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'projects', id)
      await updateDoc(docRef, {
        ...projectData,
        updatedAt: serverTimestamp()
      })
      await initializeProjects()
    } catch (err) {
      console.error('Erreur mise à jour projet:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProject = async (id) => {
    try {
      loading.value = true
      error.value = null
      const docRef = doc(db, 'projects', id)
      await deleteDoc(docRef)
      await initializeProjects()
    } catch (err) {
      console.error('Erreur suppression projet:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Importer les projets statiques dans Firebase
  const importProjectsToFirebase = async () => {
    try {
      loading.value = true
      error.value = null
      
      // Charger les projets statiques
      const { projects: staticProjects } = await import('../data/projects.js')
      
      let importedCount = 0
      const errors = []
      
      for (const project of staticProjects) {
        try {
          console.log(`📥 Tentative d'import du projet: ${project.slug}`)
          
          // Ajouter directement le projet
          await addDoc(collection(db, 'projects'), {
            id: project.id,
            slug: project.slug,
            title: project.title,
            category: project.category,
            location: project.location,
            date: project.date,
            description: project.description,
            shortDescription: project.shortDescription || project.description,
            details: project.details || '',
            mainImage: project.mainImage,
            images: project.images || [],
            results: project.results || [],
            mainCharacteristics: project.mainCharacteristics || [],
            advantages: project.advantages || [],
            team: project.team || [],
            testimonial: project.testimonial || {},
            createdAt: serverTimestamp(),
            importedAt: serverTimestamp(),
            isImported: true
          })
          
          console.log(`✅ Projet importé: ${project.slug}`)
          importedCount++
        } catch (projErr) {
          console.error(`❌ Erreur import ${project.slug}:`, projErr)
          errors.push(`${project.slug}: ${projErr.message}`)
        }
      }
      
      if (errors.length > 0) {
        error.value = `Import partiel: ${errors.length} erreur(s)`
        console.warn('Erreurs lors de l\'import:', errors)
      }
      
      await initializeProjects()
      return { success: true, count: importedCount, errors }
    } catch (err) {
      console.error('Erreur critique import projets:', err)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    articles,
    projects,
    gallery,
    loading,
    error,
    initializeProducts,
    initializeArticles,
    initializeGallery,
    addProduct,
    updateProduct,
    deleteProduct,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    initializeNews,
    addNews,
    updateNews,
    deleteNews,
    initializeProjects,
    addProject,
    updateProject,
    deleteProject,
    importProjectsToFirebase
  }
}
