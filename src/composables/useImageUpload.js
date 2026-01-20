/**
 * Composable pour gérer les uploads d'images avec drag & drop
 * Stocke les images en base64 dans Firebase
 */

import { ref } from 'vue'

export function useImageUpload() {
  const uploadStatus = ref({
    isUploading: false,
    progress: 0,
    error: null,
    success: false
  })

  /**
   * Convertit un fichier en base64
   */
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  /**
   * Valide si le fichier est une image
   */
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    if (!validTypes.includes(file.type)) {
      uploadStatus.value.error = 'Format non supporté. Utilisez JPG, PNG, WEBP ou GIF.'
      return false
    }
    
    if (file.size > maxSize) {
      uploadStatus.value.error = 'Image trop grande. Maximum 5MB.'
      return false
    }
    
    return true
  }

  /**
   * Gère le drop d'images (drag & drop)
   */
  const handleImageDrop = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    const files = event.dataTransfer?.files || event.target?.files || []
    const imageResults = []
    
    uploadStatus.value.isUploading = true
    uploadStatus.value.error = null
    uploadStatus.value.progress = 0
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        if (!isValidImageFile(file)) {
          continue
        }
        
        const base64 = await fileToBase64(file)
        imageResults.push({
          src: base64,
          name: file.name,
          size: file.size,
          type: file.type
        })
        
        uploadStatus.value.progress = Math.round(((i + 1) / files.length) * 100)
      }
      
      if (imageResults.length > 0) {
        uploadStatus.value.success = true
        uploadStatus.value.progress = 100
      }
      
      return imageResults
    } catch (error) {
      uploadStatus.value.error = `Erreur upload: ${error.message}`
      console.error('Erreur upload:', error)
      throw error
    } finally {
      uploadStatus.value.isUploading = false
    }
  }

  /**
   * Traite les fichiers sélectionnés via input file
   */
  const handleFileSelect = async (files) => {
    return handleImageDrop({
      dataTransfer: { files },
      preventDefault: () => {},
      stopPropagation: () => {}
    })
  }

  /**
   * Crée une URL temporaire pour un blob
   */
  const createObjectURL = (blob) => {
    return URL.createObjectURL(blob)
  }

  /**
   * Libère la mémoire d'une URL blob
   */
  const revokeObjectURL = (url) => {
    URL.revokeObjectURL(url)
  }

  return {
    uploadStatus,
    handleImageDrop,
    handleFileSelect,
    fileToBase64,
    isValidImageFile,
    createObjectURL,
    revokeObjectURL
  }
}
