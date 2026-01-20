/**
 * Module de gestion des métadonnées pour le prerendering
 * Centralise toutes les données des articles pour le serveur
 */

// Données des articles (synchronisées avec src/data/articles.js)
const articlesMetadata = {
  'inauguration-nouveau-centre': {
    slug: 'inauguration-nouveau-centre',
    title: 'Inauguration du nouveau centre de formation',
    shortTitle: 'Inauguration du nouveau centre',
    category: 'Actualité',
    date: '5 Jan 2026',
    image: '/src/assets/images/headepage.webp',
    excerpt: 'Découvrez le lancement officiel de notre nouveau centre de formation équipé des dernières technologies.',
    description: 'EGENT-TOGO inaugure un nouveau centre de formation moderne équipé de technologies dernier cri. Découvrez nos installations ultramodernes et nos formations professionnelles.',
    keywords: 'centre de formation, formation professionnelle, Togo, technologie, éducation',
    author: 'EGENT-TOGO',
    readingTime: 4,
    ogType: 'article'
  },
  'partenariat-international': {
    slug: 'partenariat-international',
    title: 'Partenariat international stratégique',
    shortTitle: 'Partenariat international',
    category: 'Partenariat',
    date: '2 Jan 2026',
    image: '/src/assets/images/photo_conf3.jpg',
    excerpt: 'EGENT-TOGO établit un partenariat stratégique avec des leaders mondiaux du secteur.',
    description: 'EGENT-TOGO signe un partenariat stratégique avec des entreprises internationales majeures pour renforcer ses solutions innovantes.',
    keywords: 'partenariat international, collaboration, innovation, solutions techniques',
    author: 'EGENT-TOGO',
    readingTime: 3,
    ogType: 'article'
  },
  'prix-reconnaissance': {
    slug: 'prix-reconnaissance',
    title: 'Prix et reconnaissance dans l\'industrie',
    shortTitle: 'Prix et reconnaissance',
    category: 'Reconnaissance',
    date: '30 Déc 2025',
    image: '/src/assets/images/prix1.jpg',
    excerpt: 'EGENT-TOGO reçoit plusieurs distinctions pour son excellence opérationnelle.',
    description: 'EGENT-TOGO remporte le prix "Excellence et Innovation 2025" pour sa contribution au développement des compétences.',
    keywords: 'prix excellence, innovation, reconnaissance industrie',
    author: 'EGENT-TOGO',
    readingTime: 4,
    ogType: 'article'
  },
  'ressources-humaines-equipe': {
    slug: 'ressources-humaines-equipe',
    title: 'Expansion de notre équipe - Ressources Humaines',
    shortTitle: 'Expansion RH',
    category: 'Ressources Humaines',
    date: '25 Déc 2025',
    image: '/src/assets/images/photo_conf2.jpg',
    excerpt: 'Nous recrutons 50 nouveaux professionnels pour renforcer nos équipes.',
    description: 'EGENT-TOGO recrute 50 nouveaux collaborateurs pour accompagner sa croissance continue et servir davantage de clients.',
    keywords: 'recrutement, emploi, carrière, Togo',
    author: 'EGENT-TOGO',
    readingTime: 3,
    ogType: 'article'
  },
  'durabilite-engagement': {
    slug: 'durabilite-engagement',
    title: 'Notre engagement en faveur de la durabilité',
    shortTitle: 'Durabilité et engagement',
    category: 'Durabilité',
    date: '22 Déc 2025',
    image: '/src/assets/images/photo_chantier2.jpg',
    excerpt: 'EGENT-TOGO s\'engage pour la protection de l\'environnement et le développement durable.',
    description: 'EGENT-TOGO lance un programme ambitieux de durabilité pour réduire son empreinte carbone de 40% d\'ici 2030.',
    keywords: 'durabilité, environnement, développement durable, Togo',
    author: 'EGENT-TOGO',
    readingTime: 4,
    ogType: 'article'
  },
  'evenement-clients': {
    slug: 'evenement-clients',
    title: 'Événement clients - Gala de reconnaissance 2026',
    shortTitle: 'Gala clients 2026',
    category: 'Événement',
    date: '20 Déc 2025',
    image: '/src/assets/images/photo_chantier.jpg',
    excerpt: 'Célébrez avec nous notre gala annuel de reconnaissance clients.',
    description: 'Rejoignez EGENT-TOGO pour son Gala de Reconnaissance Clients 2026 le 15 février à Lomé.',
    keywords: 'événement, gala, clients, reconnaissance',
    author: 'EGENT-TOGO',
    readingTime: 2,
    ogType: 'event'
  }
};

/**
 * Obtenir les métadonnées d'un article par slug
 */
function getArticleMetadata(slug) {
  return articlesMetadata[slug] || null;
}

/**
 * Obtenir toutes les métadonnées des articles
 */
function getAllArticlesMetadata() {
  return Object.values(articlesMetadata);
}

/**
 * Générer l'URL absolue d'une image
 */
function getImageUrl(relativePath, baseUrl) {
  if (!relativePath) return null;

  // Si c'est déjà une URL absolue
  if (relativePath.startsWith('http')) {
    return relativePath;
  }

  // Construire l'URL absolue
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  return `${baseUrl}/${cleanPath}`;
}

/**
 * Construire les balises meta pour un article
 */
function buildMetaTags(article, baseUrl) {
  const url = `${baseUrl}/actualites/${article.slug}`;
  const imageUrl = getImageUrl(article.image, baseUrl);

  const metaTags = {
    og: {
      title: article.title,
      description: article.description || article.excerpt,
      image: imageUrl,
      'image:width': '1200',
      'image:height': '630',
      'image:secure_url': imageUrl,
      url: url,
      type: article.ogType || 'article',
      site_name: 'EGENT-TOGO',
      locale: 'fr_FR'
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      image: imageUrl,
      site: '@egenttogo',
      creator: '@egenttogo'
    },
    standard: {
      title: `${article.title} - EGENT-TOGO`,
      description: article.description || article.excerpt,
      keywords: article.keywords,
      author: article.author,
      'content-type': 'text/html; charset=utf-8',
      language: 'fr'
    },
    canonical: url
  };

  return metaTags;
}

/**
 * Générer le HTML des meta tags
 */
function generateMetaTagsHTML(metaTags) {
  let html = '';

  // Open Graph
  for (const [key, value] of Object.entries(metaTags.og)) {
    html += `  <meta property="og:${key}" content="${escapeHtml(value)}">\n`;
  }

  // Twitter
  for (const [key, value] of Object.entries(metaTags.twitter)) {
    html += `  <meta name="twitter:${key}" content="${escapeHtml(value)}">\n`;
  }

  // Standard meta tags
  for (const [key, value] of Object.entries(metaTags.standard)) {
    if (value) {
      html += `  <meta name="${key}" content="${escapeHtml(value)}">\n`;
    }
  }

  // Canonical
  html += `  <link rel="canonical" href="${metaTags.canonical}">\n`;

  return html;
}

/**
 * Générer le JSON-LD pour un article
 */
function generateJsonLD(article, baseUrl) {
  const url = `${baseUrl}/actualites/${article.slug}`;
  const imageUrl = getImageUrl(article.image, baseUrl);

  return {
    '@context': 'https://schema.org',
    '@type': article.ogType === 'event' ? 'Event' : 'NewsArticle',
    headline: article.title,
    description: article.description || article.excerpt,
    image: imageUrl,
    url: url,
    datePublished: new Date(article.date).toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'EGENT-TOGO',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    }
  };
}

/**
 * Échapper les caractères HTML
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export {
  articlesMetadata,
  getArticleMetadata,
  getAllArticlesMetadata,
  buildMetaTags,
  generateMetaTagsHTML,
  generateJsonLD,
  getImageUrl,
  escapeHtml
};
