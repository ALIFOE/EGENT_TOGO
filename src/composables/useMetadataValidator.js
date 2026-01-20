/**
 * Composable Robot de Validation des Métadonnées
 * Détecte automatiquement les métadonnées manquantes ou incorrectes pour le partage sur réseaux sociaux
 * Vérifie que les images s'affichent correctement lors du partage
 */

export function useMetadataValidator() {
  /**
   * Vérifier si une image est accessible et valide
   */
  const validateImage = (imageUrl) => {
    return new Promise((resolve) => {
      if (!imageUrl) {
        resolve({ valid: false, reason: 'URL image vide' })
        return
      }

      const img = new Image()
      const timeout = setTimeout(() => {
        resolve({ valid: false, reason: 'Timeout - Image non accessible' })
      }, 5000)

      img.onload = () => {
        clearTimeout(timeout)
        resolve({ 
          valid: true, 
          width: img.width, 
          height: img.height,
          url: imageUrl
        })
      }

      img.onerror = () => {
        clearTimeout(timeout)
        resolve({ valid: false, reason: 'Erreur de chargement image' })
      }

      img.src = imageUrl
    })
  }

  /**
   * Vérifier tous les métadonnées requises
   */
  const validateAllMetadata = async () => {
    const report = {
      timestamp: new Date().toLocaleString(),
      isValid: true,
      checks: {},
      warnings: [],
      errors: []
    }

    // 1. Vérifier les balises Open Graph
    const ogChecks = {
      'og:title': document.querySelector('meta[property="og:title"]'),
      'og:description': document.querySelector('meta[property="og:description"]'),
      'og:image': document.querySelector('meta[property="og:image"]'),
      'og:url': document.querySelector('meta[property="og:url"]'),
      'og:type': document.querySelector('meta[property="og:type"]')
    }

    Object.entries(ogChecks).forEach(([key, meta]) => {
      if (meta) {
        report.checks[key] = {
          present: true,
          value: meta.content || meta.getAttribute('content')
        }
      } else {
        report.checks[key] = { present: false }
        report.errors.push(`Métadonnée manquante: ${key}`)
      }
    })

    // 2. Vérifier les Twitter Cards
    const twitterChecks = {
      'twitter:card': document.querySelector('meta[name="twitter:card"]'),
      'twitter:title': document.querySelector('meta[name="twitter:title"]'),
      'twitter:description': document.querySelector('meta[name="twitter:description"]'),
      'twitter:image': document.querySelector('meta[name="twitter:image"]')
    }

    Object.entries(twitterChecks).forEach(([key, meta]) => {
      if (meta) {
        report.checks[key] = {
          present: true,
          value: meta.content
        }
      } else {
        report.warnings.push(`Métadonnée Twitter optionnelle manquante: ${key}`)
      }
    })

    // 3. Vérifier les images Open Graph et Twitter
    const ogImage = document.querySelector('meta[property="og:image"]')
    const twitterImage = document.querySelector('meta[name="twitter:image"]')

    if (ogImage) {
      const imageUrl = ogImage.content
      const imageValidation = await validateImage(imageUrl)
      report.checks['og:image_validation'] = imageValidation

      if (!imageValidation.valid) {
        report.errors.push(`Image OG invalide: ${imageValidation.reason}`)
      }
    }

    if (twitterImage) {
      const imageUrl = twitterImage.content
      const imageValidation = await validateImage(imageUrl)
      report.checks['twitter:image_validation'] = imageValidation

      if (!imageValidation.valid) {
        report.warnings.push(`Image Twitter invalide: ${imageValidation.reason}`)
      }
    }

    // 4. Vérifier la métadescription
    const description = document.querySelector('meta[name="description"]')
    if (!description) {
      report.errors.push('Meta description manquante')
    } else {
      report.checks['description'] = {
        present: true,
        length: description.content.length,
        optimal: description.content.length >= 50 && description.content.length <= 160
      }
    }

    // 5. Vérifier le canonical
    const canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      report.warnings.push('Lien canonical manquant')
    } else {
      report.checks['canonical'] = {
        present: true,
        href: canonical.href
      }
    }

    // 6. Vérifier JSON-LD
    const jsonLd = document.querySelector('script[type="application/ld+json"]')
    report.checks['json_ld'] = {
      present: !!jsonLd,
      type: jsonLd ? 'NewsArticle ou WebPage' : 'absent'
    }

    // Déterminer si valide
    report.isValid = report.errors.length === 0

    // Log du rapport
    console.log('🤖 [Metadata Validator] Rapport de validation:', report)

    return report
  }

  /**
   * Obtenir un résumé simple des métadonnées
   */
  const getSummary = () => {
    const summary = {
      title: document.title || 'Non défini',
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || 'Non défini',
      description: document.querySelector('meta[name="description"]')?.content || 'Non défini',
      ogImage: document.querySelector('meta[property="og:image"]')?.content || 'Non défini',
      url: window.location.href,
      urlCanonical: document.querySelector('link[rel="canonical"]')?.href || 'Non défini',
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || 'Non défini'
    }

    console.log('🤖 [Metadata Summary]', summary)
    return summary
  }

  /**
   * Générer un rapport de prévisualisation pour le partage
   */
  const generateSharePreview = () => {
    const ogImage = document.querySelector('meta[property="og:image"]')?.content
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content
    const ogDescription = document.querySelector('meta[property="og:description"]')?.content

    return {
      image: ogImage,
      title: ogTitle,
      description: ogDescription,
      preview: `
        Image: ${ogImage ? '✅ Définie' : '❌ Manquante'}
        Titre: ${ogTitle ? '✅ Défini' : '❌ Manquant'}
        Description: ${ogDescription ? '✅ Définie' : '❌ Manquante'}
      `
    }
  }

  return {
    validateImage,
    validateAllMetadata,
    getSummary,
    generateSharePreview
  }
}
