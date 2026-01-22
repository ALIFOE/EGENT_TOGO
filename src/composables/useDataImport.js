/**
 * Composable pour importer les données existantes dans Firebase
 * Importe les produits, articles et galerie depuis les fichiers de données
 */

import { ref } from 'vue'
import { db } from '../lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

export function useDataImport() {
  const importStatus = ref({
    isImporting: false,
    message: '',
    progress: 0,
    error: null,
    stats: {
      productsImported: 0,
      articlesImported: 0,
      projectsImported: 0
    }
  })

  /**
   * Importe les produits dans Firebase
   */
  const importProducts = async () => {
    try {
      importStatus.value.message = 'Import des produits en cours...'
      importStatus.value.stats.productsImported = 0

      const productsData = [
        {
          name: 'Armoire Billy',
          slug: 'armoire-billy',
          price: '500 000 FCFA',
          category: 'Anti-délestage',
          shortDescription: 'Solution anti délestage performante pour éviter les coupures de courant.',
          description: 'L\'Armoire Billy est une solution anti-délestage innovante et performante conçue pour protéger votre foyer contre les coupures de courant.',
          longDescription: '<h3>Caractéristiques principales:</h3><ul><li>Technologie anti-délestage avancée</li><li>Zéro émission polluante</li></ul>',
          mainImage: '/images/montage_panneau.jpg',
          specs: [
            { label: 'Puissance', value: '500W - 5000W' },
            { label: 'Tension', value: '220V/50Hz' }
          ]
        },
        {
          name: 'Lampadaires EGENT SOLAR',
          slug: 'lampadaires-egent-solar',
          price: '200 000 FCFA',
          category: 'Énergie Solaire',
          shortDescription: 'Lampadaires solaires autonomes et écologiques pour illuminer vos espaces.',
          description: 'Les Lampadaires EGENT SOLAR sont des solutions d\'éclairage solaire autonomes et économiques.',
          longDescription: '<h3>Caractéristiques:</h3><ul><li>Panneaux solaires intégrés</li><li>Batterie lithium</li></ul>',
          mainImage: '/images/montage_panneau.jpg',
          specs: [
            { label: 'Puissance', value: '10W - 50W' },
            { label: 'Autonomie', value: '12+ heures' }
          ]
        },
        {
          name: 'Kit Zoklin',
          slug: 'kit-zoklin',
          price: '750 000 FCFA',
          category: 'Kits Solaires',
          shortDescription: 'Kit solaire préconçu et complet pour installation rapide.',
          description: 'Le Kit Zoklin est un système solaire photovoltaïque complet et préconçu.',
          longDescription: '<h3>Composition:</h3><ul><li>Panneaux solaires 3kW</li><li>Onduleur hybride</li></ul>',
          mainImage: '/images/montage_panneau.jpg',
          specs: [
            { label: 'Puissance', value: '3kW' },
            { label: 'Garantie', value: '5 ans' }
          ]
        },
        {
          name: 'Free Water',
          slug: 'free-water',
          price: '350 000 FCFA',
          category: 'Systèmes d\'eau',
          shortDescription: 'Solution innovante de purification d\'eau solaire autonome.',
          description: 'Free Water est une solution révolutionnaire de purification d\'eau alimentée par l\'énergie solaire.',
          longDescription: '<h3>Caractéristiques:</h3><ul><li>Technologie multi-étages</li><li>Alimentation solaire</li></ul>',
          mainImage: '/images/montage_panneau.jpg',
          specs: [
            { label: 'Capacité', value: '100-500 L/jour' },
            { label: 'Puissance', value: 'Solaire' }
          ]
        }
      ]

      for (const product of productsData) {
        const cleanProduct = {
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        await addDoc(collection(db, 'products'), cleanProduct)
        importStatus.value.stats.productsImported++
      }

      importStatus.value.message = `✅ ${importStatus.value.stats.productsImported} produits importés avec succès!`
    } catch (error) {
      importStatus.value.error = `Erreur import produits: ${error.message}`
      console.error('Erreur import produits:', error)
    }
  }

  /**
   * Importe les articles dans Firebase
   */
  const importArticles = async () => {
    try {
      importStatus.value.message = 'Import des articles en cours...'
      importStatus.value.stats.articlesImported = 0

      const articlesData = [
        {
          title: 'Inauguration du nouveau centre de formation',
          shortTitle: 'Inauguration du nouveau centre',
          slug: 'inauguration-nouveau-centre',
          category: 'Actualité',
          date: '5 Jan 2026',
          image: '/images/montage_panneau.jpg',
          excerpt: 'Découvrez le lancement officiel de notre nouveau centre de formation.',
          seoDescription: 'EGENT-TOGO inaugure un nouveau centre de formation moderne équipé de technologies dernier cri.',
          keywords: 'centre de formation, formation, Togo',
          author: 'EGENT-TOGO',
          readingTime: 4,
          content: [
            'EGENT-TOGO a le plaisir d\'annoncer l\'inauguration officielle de son nouveau centre de formation.',
            'Avec une surface de 5000 m², le centre accueille plus de 200 apprenants simultanément.',
            'L\'équipe EGENT TOGO a été très professionnelle et les installations sont ultramodernes.'
          ],
          published: true
        },
        {
          title: 'Partenariat international stratégique',
          shortTitle: 'Partenariat international',
          slug: 'partenariat-international',
          category: 'Partenariat',
          date: '2 Jan 2026',
          image: '/images/montage_panneau.jpg',
          excerpt: 'EGENT-TOGO établit un partenariat stratégique avec des leaders mondiaux.',
          seoDescription: 'EGENT-TOGO signe un partenariat stratégique avec des entreprises internationales majeures.',
          keywords: 'partenariat, collaboration, innovation',
          author: 'EGENT-TOGO',
          readingTime: 3,
          content: [
            'EGENT-TOGO a signé un accord de partenariat historique avec plusieurs entreprises internationales.',
            'Ce partenariat vise à renforcer notre capacité à offrir des solutions innovantes et durables.',
            'Cette alliance stratégique positionne EGENT-TOGO comme un acteur clé du marché africain.'
          ],
          published: true
        },
        {
          title: 'Prix et reconnaissance dans l\'industrie',
          shortTitle: 'Prix et reconnaissance',
          slug: 'prix-reconnaissance',
          category: 'Reconnaissance',
          date: '30 Déc 2025',
          image: '/images/montage_panneau.jpg',
          excerpt: 'EGENT-TOGO reçoit plusieurs distinctions pour son excellence opérationnelle.',
          seoDescription: 'EGENT-TOGO reçoit le prix Excellence et Innovation 2025 pour son excellence.',
          keywords: 'prix, excellence, reconnaissance',
          author: 'EGENT-TOGO',
          readingTime: 3,
          content: [
            'EGENT-TOGO a remporté le prestigieux prix "Excellence et Innovation 2025".',
            'Cette reconnaissance récompense nos efforts continus en matière de qualité et d\'innovation.',
            'Cette récompense nous motive à poursuivre notre quête d\'excellence.'
          ],
          published: true
        },
        {
          title: 'Expansion de notre équipe - Ressources Humaines',
          shortTitle: 'Expansion de notre équipe',
          slug: 'ressources-humaines-equipe',
          category: 'Ressources Humaines',
          date: '25 Déc 2025',
          image: '/images/montage_panneau.jpg',
          excerpt: 'Nous recrutons 50 nouveaux professionnels pour renforcer nos équipes.',
          seoDescription: 'EGENT-TOGO recrute 50 nouveaux professionnels dans divers domaines.',
          keywords: 'recrutement, emploi, carrière',
          author: 'EGENT-TOGO',
          readingTime: 2,
          content: [
            'EGENT-TOGO accélère son recrutement et prévoit d\'intégrer 50 nouveaux collaborateurs.',
            'Cette expansion reflète notre croissance continue et notre ambition de servir davantage de clients.',
            'Nous recherchons des professionnels dans plusieurs domaines: techniques, ventes, gestion.'
          ],
          published: true
        }
      ]

      for (const article of articlesData) {
        const cleanArticle = {
          ...article,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        await addDoc(collection(db, 'articles'), cleanArticle)
        importStatus.value.stats.articlesImported++
      }

      importStatus.value.message = `✅ ${importStatus.value.stats.articlesImported} articles importés avec succès!`
    } catch (error) {
      importStatus.value.error = `Erreur import articles: ${error.message}`
      console.error('Erreur import articles:', error)
    }
  }

  /**
   * Importe les projets comme galerie
   */
  const importProjects = async () => {
    try {
      importStatus.value.message = 'Import des projets en cours...'
      importStatus.value.stats.projectsImported = 0

      const projectsData = [
        {
          title: 'Installation Solaire Résidentielle - Lomé',
          slug: 'installation-solaire-residential',
          category: 'Énergie Solaire',
          date: 'Décembre 2023',
          location: 'Lomé, Togo',
          image: '/images/montage_panneau.jpg',
          shortDescription: 'Installation complète d\'un système solaire de 5kWc pour une maison résidentielle.',
          description: 'Projet d\'installation d\'un système photovoltaïque complet pour une résidence à Lomé.',
          details: '<h3>Caractéristiques:</h3><ul><li>Puissance: 5kWc</li><li>Autonomie énergétique 80%</li><li>Reduction facture 85%</li></ul>'
        },
        {
          title: 'Système de Climatisation Commercial - Kofi',
          slug: 'installation-climatisation-commercial',
          category: 'Climatisation & Froid',
          date: 'Septembre 2023',
          location: 'Kofi, Togo',
          image: '/images/montage_panneau.jpg',
          shortDescription: 'Installation d\'un système de climatisation multi-split pour un bâtiment commercial.',
          description: 'Installation d\'un système de climatisation haute performance pour un complexe commercial.',
          details: '<h3>Spécifications:</h3><ul><li>Type: Système multi-split</li><li>Surface: 500m²</li><li>Économies: 30%</li></ul>'
        },
        {
          title: 'Rénovation Électrique Hôtel 3 étoiles - Aného',
          slug: 'installation-electrique-hotel',
          category: 'Électricité Générale',
          date: 'Juillet 2023',
          location: 'Aného, Togo',
          image: '/images/montage_panneau.jpg',
          shortDescription: 'Rénovation complète du système électrique d\'un hôtel 3 étoiles.',
          description: 'Projet complet de rénovation du système électrique d\'un hôtel.',
          details: '<h3>Scope:</h3><ul><li>Tableaux électriques</li><li>Conformité normes</li><li>Système de secours</li></ul>'
        },
        {
          title: 'Installation Solaire Ferme Piscicole - Tsévié',
          slug: 'installation-solaire-ferme',
          category: 'Énergie Solaire',
          date: 'Mai 2023',
          location: 'Tsévié, Togo',
          image: '/images/montage_panneau.jpg',
          shortDescription: 'Système solaire 10kWc pour alimentation d\'une ferme piscicole.',
          description: 'Installation d\'un système photovoltaïque pour une ferme piscicole autonome énergétiquement.',
          details: '<h3>Configuration:</h3><ul><li>Puissance: 10kWc</li><li>Autonomie: 100%</li><li>Production augmentée 30%</li></ul>'
        }
      ]

      for (const project of projectsData) {
        const cleanProject = {
          ...project,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        await addDoc(collection(db, 'gallery'), cleanProject)
        importStatus.value.stats.projectsImported++
      }

      importStatus.value.message = `✅ ${importStatus.value.stats.projectsImported} projets importés avec succès!`
    } catch (error) {
      importStatus.value.error = `Erreur import projets: ${error.message}`
      console.error('Erreur import projets:', error)
    }
  }

  /**
   * Lance l'import complet de tous les données
   */
  const importAllData = async () => {
    importStatus.value.isImporting = true
    importStatus.value.error = null
    importStatus.value.stats = {
      productsImported: 0,
      articlesImported: 0,
      projectsImported: 0
    }

    try {
      // Import des produits
      importStatus.value.progress = 0
      await importProducts()
      importStatus.value.progress = 33

      // Import des articles
      importStatus.value.progress = 50
      await importArticles()
      importStatus.value.progress = 75

      // Import des projets
      importStatus.value.progress = 90
      await importProjects()
      importStatus.value.progress = 100

      importStatus.value.message = `✅ Import complété! 
      - ${importStatus.value.stats.productsImported} produits
      - ${importStatus.value.stats.articlesImported} articles
      - ${importStatus.value.stats.projectsImported} projets`
    } catch (error) {
      importStatus.value.error = `Erreur lors de l'import: ${error.message}`
      console.error('Erreur import global:', error)
    } finally {
      importStatus.value.isImporting = false
    }
  }

  return {
    importStatus,
    importProducts,
    importArticles,
    importProjects,
    importAllData
  }
}
