/**
 * Composable pour gérer les métadonnées Open Graph et les métadonnées de prévisualisation
 * Optimisé pour la prévisualisation de lien sur Facebook, LinkedIn, Twitter et autres réseaux sociaux
 * Robot de détection automatique des métadonnées pour partage sur les réseaux sociaux
 */

export function useSEOMeta() {
  // Déterminer le domaine de base
  const getBaseUrl = () => {
    if (typeof window === 'undefined') return 'https://egenttogo.com'
    
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return `${protocol}//localhost:5173`
    }
    if (hostname.includes('github.io')) {
      return 'https://alifoe.github.io/EGENT_TOGO'
    }
    if (hostname.includes('egenttogo.com')) {
      return 'https://www.egenttogo.com'
    }
    
    return `${protocol}//${hostname}`
  }

  /**
   * Convertir une image locale en URL absolue
   * Gère les images importées de webpack et les chemins relatifs
   */
  const resolveImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    const baseUrl = getBaseUrl()
    
    // Si c'est déjà une URL absolue (http/https)
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    
    // Si c'est une URL de données (base64)
    if (imagePath.startsWith('data:')) {
      return imagePath
    }
    
    // Si c'est un blob Webpack (image importée en Vue)
    if (imagePath.includes('/') || imagePath.includes('\\')) {
      // Pour les images dans src/assets, on les sert depuis /src/assets/
      return `${baseUrl}/src${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
    }
    
    // Chemin par défaut
    return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
  }

  /**
   * Valider que les métadonnées sont correctement définies
   */
  const validateMetaTags = () => {
    const checks = {
      ogTitle: !!document.querySelector('meta[property="og:title"]'),
      ogDescription: !!document.querySelector('meta[property="og:description"]'),
      ogImage: !!document.querySelector('meta[property="og:image"]'),
      ogUrl: !!document.querySelector('meta[property="og:url"]'),
      twitterCard: !!document.querySelector('meta[name="twitter:card"]'),
      twitterImage: !!document.querySelector('meta[name="twitter:image"]'),
      description: !!document.querySelector('meta[name="description"]'),
      canonical: !!document.querySelector('link[rel="canonical"]')
    }
    
    const isValid = Object.values(checks).every(v => v === true)
    
    console.log('🤖 [SEO Meta Validator] Vérification des métadonnées:', {
      isValid,
      details: checks,
      timestamp: new Date().toLocaleTimeString()
    })
    
    return { isValid, details: checks }
  }

  const setMeta = (title, description, imagePath, pathname = '/', options = {}) => {
    const baseUrl = getBaseUrl()
    
    // Résoudre l'URL de l'image avec le robot de détection
    const imageUrl = resolveImageUrl(imagePath)
    
    // Construire l'URL complète
    const fullUrl = `${baseUrl}${pathname}`

    // Mettre à jour le titre de la page
    document.title = `${title}`

    // Valeurs par défaut des options
    const ogType = options.type || 'website'
    const imageWidth = options.imageWidth || '1200'
    const imageHeight = options.imageHeight || '630'
    const locale = options.locale || 'fr_FR'
    const siteName = options.siteName || 'EGENT-TOGO'

    // Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: imageWidth },
      { property: 'og:image:height', content: imageHeight },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:secure_url', content: imageUrl }, // URL sécurisée
      { property: 'og:url', content: fullUrl },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
      
      // Twitter Card (Summary Large Image)
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: title },
      { name: 'twitter:site', content: '@egenttogo' },
      { name: 'twitter:creator', content: '@egenttogo' },
      
      // Meta Description et Keywords
      { name: 'description', content: description },
      { name: 'keywords', content: 'électricité, énergie solaire, climatisation, Togo, EGENT' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'language', content: 'French' },
      
      // Canonical URL
      { rel: 'canonical', href: fullUrl },
    ]

    // Supprimer les anciennes métadonnées
    ogTags.forEach(tag => {
      let selector
      if (tag.property) {
        selector = `meta[property="${tag.property}"]`
      } else if (tag.name) {
        selector = `meta[name="${tag.name}"]`
      } else if (tag.rel) {
        selector = `link[rel="${tag.rel}"]`
      }
      
      if (selector) {
        const existing = document.querySelector(selector)
        if (existing) existing.remove()
      }
    })

    // Ajouter les nouvelles métadonnées
    ogTags.forEach(tag => {
      if (tag.rel) {
        // Gestion des liens canoniques
        const link = document.createElement('link')
        link.rel = tag.rel
        link.href = tag.href
        document.head.appendChild(link)
      } else {
        // Gestion des balises meta
        const meta = document.createElement('meta')
        if (tag.property) {
          meta.setAttribute('property', tag.property)
        } else if (tag.name) {
          meta.setAttribute('name', tag.name)
        }
        meta.content = tag.content
        document.head.appendChild(meta)
      }
    })

    // Ajouter les données structurées JSON-LD pour meilleure reconnaissance par les moteurs
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'NewsArticle' : 'WebPage',
      headline: title,
      description: description,
      image: imageUrl,
      url: fullUrl,
      datePublished: new Date().toISOString(),
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/src/assets/images/logo.png` // Adapter le chemin si nécessaire
        }
      }
    }

    // Supprimer les anciennes données JSON-LD
    const oldJsonLd = document.querySelector('script[type="application/ld+json"]')
    if (oldJsonLd) oldJsonLd.remove()

    // Ajouter les nouvelles données JSON-LD
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLdData)
    document.head.appendChild(script)

    // Log du robot de détection pour vérification
    console.log('🤖 [SEO Meta Robot] Métadonnées mises à jour:', {
      title,
      description,
      imageUrl,
      fullUrl,
      ogType,
      baseTags: Object.keys(ogTags).length,
      timestamp: new Date().toLocaleTimeString()
    })

    // Valider après mise à jour
    setTimeout(() => {
      validateMetaTags()
    }, 100)
  }

  return {
    setMeta,
    validateMetaTags,
    resolveImageUrl
  }
}
