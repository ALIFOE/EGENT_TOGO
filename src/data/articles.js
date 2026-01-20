/**
 * Articles/Actualités Data
 * Données centralisées pour les articles avec métadonnées complètes pour le SEO
 */

import imgHeadepage from '../assets/images/headepage.webp'
import imgPhotoConf3 from '../assets/images/photo_conf3.jpg'
import imgPrix1 from '../assets/images/prix1.jpg'
import imgPhotoConf2 from '../assets/images/photo_conf2.jpg'

export const articlesData = {
  'inauguration-nouveau-centre': {
    id: 1,
    slug: 'inauguration-nouveau-centre',
    title: 'Inauguration du nouveau centre de formation',
    shortTitle: 'Inauguration du nouveau centre',
    category: 'Actualité',
    date: '5 Jan 2026',
    image: imgHeadepage,
    excerpt: 'Découvrez le lancement officiel de notre nouveau centre de formation équipé des dernières technologies.',
    seoDescription: 'EGENT-TOGO inaugure un nouveau centre de formation moderne équipé de technologies dernier cri. Découvrez nos installations ultramodernes et nos formations professionnelles.',
    keywords: 'centre de formation, formation professionnelle, Togo, technologie, éducation',
    author: 'EGENT-TOGO',
    readingTime: 4,
    content: [
      'EGENT-TOGO a le plaisir d\'annoncer l\'inauguration officielle de son nouveau centre de formation dernier cri. Situé au cœur de Lomé, ce centre moderne dispose des infrastructures les plus avancées pour offrir une formation de qualité.',
      'Avec une surface de 5000 m², le centre accueille plus de 200 apprenants simultanément et dispose de 15 salles de formation équipées de technologies dernière génération, incluant la réalité augmentée et les simulations interactives.',
      'Cet investissement conséquent reflète notre engagement envers l\'excellence en formation professionnelle et le développement des compétences au Togo. Le centre offrira des formations dans les domaines de l\'électricité, de la plomberie, de la climatisation et bien d\'autres secteurs clés.',
      'Les premiers apprenants ont déjà commencé à bénéficier des installations ultramodernes et des formateurs expérimentés mis en place par EGENT-TOGO.'
    ]
  },
  'partenariat-international': {
    id: 2,
    slug: 'partenariat-international',
    title: 'Partenariat international stratégique',
    shortTitle: 'Partenariat international',
    category: 'Partenariat',
    date: '2 Jan 2026',
    image: imgPhotoConf3,
    excerpt: 'EGENT-TOGO établit un partenariat stratégique avec des leaders mondiaux du secteur.',
    seoDescription: 'EGENT-TOGO signe un partenariat stratégique avec des entreprises internationales majeures pour renforcer ses solutions innovantes et sa distribution mondiale.',
    keywords: 'partenariat international, collaboration, innovation, solutions techniques',
    author: 'EGENT-TOGO',
    readingTime: 3,
    content: [
      'EGENT-TOGO a signé un accord de partenariat historique avec plusieurs entreprises internationales majeures. Ce partenariat vise à renforcer notre capacité à offrir des solutions innovantes et durables.',
      'Cette collaboration nous permettra d\'accéder à de nouvelles technologies et d\'élargir notre réseau de distribution à l\'échelle mondiale. Les partenaires internationaux reconnaissent l\'excellence et la fiabilité de nos services au Togo et en Afrique de l\'Ouest.',
      'Le partenariat couvre plusieurs domaines : la formation professionnelle, le déploiement de solutions technologiques, et le transfert de compétences. Les deux parties s\'engagent à créer des opportunités durables pour le développement économique régional.',
      'Cette alliance stratégique positionne EGENT-TOGO comme un acteur clé du marché africain et ouvre de nouvelles perspectives pour nos clients et partenaires.'
    ]
  },
  'prix-reconnaissance': {
    id: 3,
    slug: 'prix-reconnaissance',
    title: 'Prix et reconnaissance dans l\'industrie',
    shortTitle: 'Prix et reconnaissance',
    category: 'Reconnaissance',
    date: '30 Déc 2025',
    image: imgPrix1,
    excerpt: 'EGENT-TOGO reçoit plusieurs distinctions pour son excellence opérationnelle.',
    seoDescription: 'EGENT-TOGO reçoit le prix Excellence et Innovation 2025 pour son excellence en service client et ses initiatives durables.',
    keywords: 'prix, excellence, reconnaissance, industrie, innovation',
    author: 'EGENT-TOGO',
    readingTime: 3,
    content: [
      'EGENT-TOGO a remporté le prestigieux prix "Excellence et Innovation 2025" décerné par la chambre de commerce du Togo. Cette reconnaissance récompense nos efforts continus en matière de qualité et d\'innovation.',
      'Cette distinction souligne notre engagement envers l\'excellence en service client, la formation continue de nos équipes et l\'adoption de technologies de pointe. Nous sommes fiers d\'être reconnus par nos pairs et nos clients.',
      'Le jury a particulièrement apprécié nos initiatives de durabilité environnementale et notre contribution au développement des compétences dans le secteur des services techniques.',
      'Cette récompense nous motive à poursuivre notre quête d\'excellence et à maintenir les normes élevées qui nous caractérisent depuis notre création.'
    ]
  },
  'ressources-humaines-equipe': {
    id: 4,
    slug: 'ressources-humaines-equipe',
    title: 'Expansion de notre équipe - Ressources Humaines',
    shortTitle: 'Expansion de notre équipe',
    category: 'Ressources Humaines',
    date: '25 Déc 2025',
    image: imgPhotoConf2,
    excerpt: 'Nous recrutons 50 nouveaux professionnels pour renforcer nos équipes.',
    seoDescription: 'EGENT-TOGO recrute 50 nouveaux professionnels dans divers domaines. Découvrez les opportunités de carrière avec nous.',
    keywords: 'recrutement, emploi, carrière, ressources humaines, Togo',
    author: 'EGENT-TOGO',
    readingTime: 2,
    content: [
      'EGENT-TOGO accélère son recrutement et prévoit d\'intégrer 50 nouveaux collaborateurs au cours du premier trimestre 2026. Cette expansion reflète notre croissance continue et notre ambition de servir davantage de clients.',
      'Nous recherchons des professionnels dans plusieurs domaines : techniques, ventes, gestion de projets, ressources humaines et informatique. Les candidats retenus bénéficieront d\'un programme de formation complet et d\'une carrière prometteuse.',
      'EGENT-TOGO offre un environnement de travail dynamique et inclusif où l\'innovation et l\'excellence sont valorisées. Nous investissons continuellement dans le développement professionnel de nos équipes.',
      'Si vous êtes intéressé par une carrière avec EGENT-TOGO, n\'hésitez pas à consulter notre page carrière ou à nous contacter directement.'
    ]
  }
}

/**
 * Récupère un article par son slug
 * @param {string} slug - Le slug de l'article
 * @returns {object} - Les données de l'article ou article par défaut
 */
export function getArticleBySlug(slug) {
  return articlesData[slug] || articlesData['inauguration-nouveau-centre']
}

/**
 * Récupère tous les articles
 * @returns {array} - Tableau de tous les articles
 */
export function getAllArticles() {
  return Object.values(articlesData)
}

/**
 * Récupère les articles connexes (exclut l'article courant)
 * @param {string} currentSlug - Le slug de l'article courant
 * @param {number} limit - Nombre d'articles à retourner
 * @returns {array} - Tableau d'articles connexes
 */
export function getRelatedArticles(currentSlug, limit = 3) {
  return Object.values(articlesData)
    .filter(article => article.slug !== currentSlug)
    .slice(0, limit)
}

export default articlesData
