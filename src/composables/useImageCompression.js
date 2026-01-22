/**
 * Composable pour compresser les images en base64 sans Firebase Storage
 * Solution gratuite qui évite les frais Firebase Storage
 */

import { ref } from 'vue'

export function useImageCompression() {
  const compressionStatus = ref({
    isCompressing: false,
    progress: 0,
    error: null,
    originalSize: 0,
    compressedSize: 0
  })

  /**
   * Compresser une image et la retourner en base64 compressé
   * Cible: < 300KB pour tenir dans Firestore
   */
  const compressImage = async (file, maxSizeKB = 300) => {
    return new Promise((resolve, reject) => {
      compressionStatus.value.isCompressing = true
      compressionStatus.value.error = null
      compressionStatus.value.originalSize = file.size
      compressionStatus.value.progress = 0

      try {
        // Lire le fichier d'origine
        const reader = new FileReader()
        
        reader.onload = (e) => {
          try {
            compressionStatus.value.progress = 20
            
            // Créer une image
            const img = new Image()
            img.onload = () => {
              compressionStatus.value.progress = 40
              
              // Créer un canvas pour redimensionner
              const canvas = document.createElement('canvas')
              let width = img.width
              let height = img.height
              
              // Redimensionner si trop grand
              const maxDimension = 1200
              if (width > maxDimension || height > maxDimension) {
                const ratio = Math.min(maxDimension / width, maxDimension / height)
                width = Math.floor(width * ratio)
                height = Math.floor(height * ratio)
              }
              
              canvas.width = width
              canvas.height = height
              
              const ctx = canvas.getContext('2d')
              ctx.drawImage(img, 0, 0, width, height)
              
              compressionStatus.value.progress = 60
              
              // Compresser avec qualité progressive
              let quality = 0.85
              let compressedBase64 = ''
              let compressedSizeKB = 0
              
              do {
                compressedBase64 = canvas.toDataURL('image/jpeg', quality)
                // Calculer la taille en KB (en enlevant le préfixe "data:image/jpeg;base64,")
                compressedSizeKB = (compressedBase64.length * 0.75) / 1024
                quality -= 0.05
              } while (compressedSizeKB > maxSizeKB && quality > 0.1)
              
              compressionStatus.value.progress = 80
              compressionStatus.value.compressedSize = compressedBase64.length
              
              // Vérifier que la compression a fonctionné
              if (compressedSizeKB > maxSizeKB) {
                throw new Error(`Impossible de compresser l'image sous ${maxSizeKB}KB. Taille finale: ${Math.round(compressedSizeKB)}KB. Utilisez une image plus petite ou de meilleure qualité.`)
              }
              
              console.log(`✅ Image compressée: ${Math.round(file.size / 1024)}KB → ${Math.round(compressedSizeKB)}KB`)
              
              compressionStatus.value.progress = 100
              compressionStatus.value.isCompressing = false
              
              resolve({
                base64: compressedBase64,
                sizeKB: compressedSizeKB,
                originalSizeKB: file.size / 1024,
                compressionRatio: Math.round((1 - compressedSizeKB / (file.size / 1024)) * 100)
              })
            }
            
            img.onerror = () => {
              throw new Error('Impossible de charger l\'image. Vérifiez le format.')
            }
            
            img.src = e.target.result
          } catch (error) {
            compressionStatus.value.error = error.message
            compressionStatus.value.isCompressing = false
            reject(error)
          }
        }
        
        reader.onerror = () => {
          throw new Error('Erreur de lecture du fichier')
        }
        
        reader.readAsDataURL(file)
      } catch (error) {
        compressionStatus.value.error = error.message
        compressionStatus.value.isCompressing = false
        reject(error)
      }
    })
  }

  /**
   * Valider qu'un fichier peut être compressé
   */
  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 10 * 1024 * 1024 // 10MB (avant compression)

    if (!validTypes.includes(file.type)) {
      compressionStatus.value.error = 'Format d\'image non supporté. Utilisez JPEG, PNG, GIF ou WebP.'
      return false
    }

    if (file.size > maxSize) {
      compressionStatus.value.error = 'L\'image ne doit pas dépasser 10 MB avant compression.'
      return false
    }

    return true
  }

  return {
    compressionStatus,
    compressImage,
    isValidImageFile
  }
}
