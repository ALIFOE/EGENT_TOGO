/**
 * Meta Robot - Composable Central pour les Métadonnées
 * 
 * Utilisation simple:
 * import { useMetaRobot } from '@/composables/useMetaRobot'
 * const { setPageMeta, validatePage } = useMetaRobot()
 */

import { useSEOMeta } from './useSEOMeta'
import { useMetadataValidator } from './useMetadataValidator'

export function useMetaRobot() {
  const { setMeta } = useSEOMeta()
  const { validateAllMetadata, getSummary, generateSharePreview } = useMetadataValidator()

  /**
   * Définir les métadonnées d'une page article
   */
  const setPageMeta = async (config) => {
    const {
      title,
      description,
      image,
      pathname,
      type = 'website',
      validate = true
    } = config

    // Appeler le robot SEO
    setMeta(title, description, image, pathname, {
      type,
      siteName: 'EGENT-TOGO',
      locale: 'fr_FR',
      imageWidth: '1200',
      imageHeight: '630'
    })

    // Valider si demandé
    if (validate) {
      setTimeout(async () => {
        await validateAllMetadata()
      }, 100)
    }

    return {
      title,
      description,
      image,
      pathname,
      type
    }
  }

  /**
   * Valider la page actuelle et retourner un rapport
   */
  const validatePage = async () => {
    const validation = await validateAllMetadata()
    const summary = getSummary()
    const preview = generateSharePreview()

    return {
      isValid: validation.isValid,
      validation,
      summary,
      preview
    }
  }

  /**
   * Obtenir un résumé rapide
   */
  const getPageSummary = () => {
    return getSummary()
  }

  /**
   * Générer une prévisualisation pour le partage
   */
  const getSharePreview = () => {
    return generateSharePreview()
  }

  /**
   * Afficher les métadonnées dans la console de manière lisible
   */
  const printMetadata = () => {
    const summary = getSummary()
    console.group('📄 Métadonnées de la Page')
    console.log('Titre:', summary.title)
    console.log('Description:', summary.description)
    console.log('Image:', summary.ogImage)
    console.log('URL:', summary.url)
    console.log('Canonical:', summary.urlCanonical)
    console.groupEnd()
  }

  /**
   * Vérifier rapidement si tout est OK
   */
  const quickCheck = async () => {
    const report = await validatePage()
    
    if (report.isValid) {
      console.log('✅ [Meta Robot] Toutes les métadonnées sont correctes!')
    } else {
      console.log('⚠️ [Meta Robot] Il y a des problèmes à corriger')
    }
    
    return report
  }

  return {
    setPageMeta,      // Ajouter/mettre à jour les métadonnées
    validatePage,     // Valider la page
    getPageSummary,   // Obtenir un résumé
    getSharePreview,  // Obtenir aperçu partage
    printMetadata,    // Afficher les métadonnées
    quickCheck        // Vérification rapide
  }
}

/**
 * Exemples d'utilisation:
 * 
 * // Dans ArticleDetail.vue
 * import { useMetaRobot } from '@/composables/useMetaRobot'
 * 
 * const { setPageMeta, validatePage } = useMetaRobot()
 * 
 * onMounted(() => {
 *   setPageMeta({
 *     title: article.title,
 *     description: article.excerpt,
 *     image: article.image,
 *     pathname: `/actualites/${article.slug}`,
 *     type: 'article'
 *   })
 * })
 * 
 * // Vérification rapide
 * const report = await validatePage()
 * console.log('Métadonnées valides:', report.isValid)
 */
