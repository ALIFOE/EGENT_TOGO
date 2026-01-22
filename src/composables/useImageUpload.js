/**
 * Composable pour gérer les uploads d'images vers Firebase Storage
 * Évite le problème de limite 1MB de Firestore en stockant les images dans Cloud Storage
 */

import { ref } from 'vue'
import { storage } from '@/lib/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export function useImageUpload() {
  const uploadStatus = ref({
    isUploading: false,
    progress: 0,
    error: null,
    success: false
  })

  /**
   * Valide si le fichier est une image valide
   */
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      uploadStatus.value.error = 'Format d\'image non supporté. Utilisez JPEG, PNG, GIF, WebP ou SVG.'
      return false
    }

    if (file.size > maxSize) {
      uploadStatus.value.error = 'L\'image ne doit pas dépasser 5 MB.'
      return false
    }

    return true
  }

  /**
   * Upload une image vers Firebase Storage et retourne l'URL publique
   */
  const uploadImageToStorage = async (file, folder = 'images') => {
    if (!isValidImageFile(file)) {
      throw new Error(uploadStatus.value.error)
    }

    try {
      uploadStatus.value.isUploading = true
      uploadStatus.value.error = null
      uploadStatus.value.progress = 0

      // Créer un path unique avec timestamp
      const timestamp = Date.now()
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`
      const filePath = `${folder}/${fileName}`
      
      console.log('🚀 Firebase Upload:', { filePath, fileSize: file.size })
      
      // Référence Firebase Storage
      const fileRef = storageRef(storage, filePath)

      // Upload le fichier
      const snapshot = await uploadBytes(fileRef, file)
      uploadStatus.value.progress = 50
      
      console.log('📤 Fichier uploadé, récupération URL...')
      
      // Récupérer l'URL publique avec token
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      console.log('✅ URL récupérée:', downloadURL)
      
      // S'assurer que l'URL a le paramètre alt=media pour éviter les erreurs CORS
      const finalURL = downloadURL.includes('alt=media') 
        ? downloadURL 
        : `${downloadURL}${downloadURL.includes('?') ? '&' : '?'}alt=media`

      uploadStatus.value.progress = 100
      uploadStatus.value.success = true
      
      return finalURL
    } catch (error) {
      console.error('❌ Erreur upload image:', error)
      uploadStatus.value.error = error.message
      throw new Error(`Erreur upload: ${error.message}`)
    } finally {
      uploadStatus.value.isUploading = false
    }
  }

  /**
   * Réinitialiser le statut
   */
  const resetStatus = () => {
    uploadStatus.value = {
      isUploading: false,
      progress: 0,
      error: null,
      success: false
    }
  }

  return {
    uploadStatus,
    uploadImageToStorage,
    isValidImageFile,
    resetStatus
  }
}
