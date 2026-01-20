import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

/**
 * Script pour importer les 4 produits dans Firebase
 * À exécuter une seule fois dans la console ou au démarrage
 */

export const productsToImport = [
  {
    name: 'Armoire Billy',
    slug: 'armoire-billy',
    price: '500 000 FCFA',
    category: 'Anti-délestage',
    shortDescription: 'Solution anti délestage performante pour éviter les coupures de courant.',
    description: 'L\'Armoire Billy est une solution anti-délestage innovante et performante conçue pour protéger votre foyer ou votre entreprise contre les coupures de courant. Elle remplace efficacement les groupes électrogènes traditionnels avec zéro émission polluante.',
    mainImage: 'https://via.placeholder.com/600x400?text=Armoire+Billy',
    images: ['https://via.placeholder.com/600x400?text=Armoire+Billy+1', 'https://via.placeholder.com/600x400?text=Armoire+Billy+2'],
    specs: [
      { label: 'Puissance', value: '500W - 5000W' },
      { label: 'Tension', value: '220V/50Hz' },
      { label: 'Dimensions', value: '60cm x 40cm x 30cm' },
      { label: 'Poids', value: '25kg' },
      { label: 'Garantie', value: '2 ans' }
    ]
  },
  {
    name: 'Lampadaires EGENT SOLAR',
    slug: 'lampadaires-egent-solar',
    price: '200 000 FCFA',
    category: 'Énergie Solaire',
    shortDescription: 'Lampadaires solaires autonomes et écologiques pour illuminer vos espaces extérieurs.',
    description: 'Les Lampadaires EGENT SOLAR sont des solutions d\'éclairage solaire autonomes, écologiques et économiques. Parfaits pour illuminer vos routes, places publiques, jardins et espaces extérieurs sans aucun coût d\'électricité.',
    mainImage: 'https://via.placeholder.com/600x400?text=Lampadaires+EGENT',
    images: ['https://via.placeholder.com/600x400?text=Lampadaires+EGENT+1', 'https://via.placeholder.com/600x400?text=Lampadaires+EGENT+2'],
    specs: [
      { label: 'Puissance solaire', value: '10W - 50W' },
      { label: 'Batterie', value: 'Lithium 5000mAh' },
      { label: 'Luminosité', value: '3000-5000 lumens' },
      { label: 'Hauteur', value: '2m à 4m (configurable)' },
      { label: 'Autonomie', value: '12+ heures nuit' },
      { label: 'Garantie', value: '3 ans' }
    ]
  },
  {
    name: 'Kit Zoklin',
    slug: 'kit-zoklin',
    price: '750 000 FCFA',
    category: 'Kits Solaires',
    shortDescription: 'Kit solaire préconçu et complet pour une installation rapide et facile.',
    description: 'Le Kit Zoklin est un système solaire photovoltaïque préconçu et complet, parfait pour débuter votre transition énergétique en toute confiance. Installation rapide, performance garantie.',
    mainImage: 'https://via.placeholder.com/600x400?text=Kit+Zoklin',
    images: ['https://via.placeholder.com/600x400?text=Kit+Zoklin+1', 'https://via.placeholder.com/600x400?text=Kit+Zoklin+2'],
    specs: [
      { label: 'Puissance panneaux', value: '3kW' },
      { label: 'Capacité batterie', value: '5kWh lithium' },
      { label: 'Onduleur', value: 'Hybride 5kVA' },
      { label: 'Production journalière', value: '12-15 kWh (moyenne)' },
      { label: 'Autonomie', value: '2-3 jours' },
      { label: 'Garantie', value: '5 ans' }
    ]
  },
  {
    name: 'Free Water',
    slug: 'free-water',
    price: '350 000 FCFA',
    category: 'Systèmes d\'eau',
    shortDescription: 'Solution innovante de purification d\'eau solaire autonome et écologique.',
    description: 'Free Water est une solution révolutionnaire de purification d\'eau alimentée par l\'énergie solaire. Un système autonome et écologique qui fournit de l\'eau potable sans coûts énergétiques pour vos communautés.',
    mainImage: 'https://via.placeholder.com/600x400?text=Free+Water',
    images: ['https://via.placeholder.com/600x400?text=Free+Water+1', 'https://via.placeholder.com/600x400?text=Free+Water+2'],
    specs: [
      { label: 'Capacité', value: '100-500 L/jour' },
      { label: 'Puissance solaire', value: '1000W' },
      { label: 'Batterie', value: 'Lithium 2kWh' },
      { label: 'Purification', value: 'Multi-étages (99.9%)' },
      { label: 'Durée de vie filtre', value: '12 mois' },
      { label: 'Garantie', value: '3 ans' }
    ]
  }
]

/**
 * Fonction pour importer tous les produits dans Firebase
 */
export async function importProductsToFirebase() {
  try {
    console.log('🚀 Début de l\'import des produits...')
    
    for (const product of productsToImport) {
      await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: serverTimestamp()
      })
      console.log(`✅ Produit ajouté: ${product.name}`)
    }
    
    console.log('✨ Import terminé avec succès!')
    return true
  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error)
    throw error
  }
}
