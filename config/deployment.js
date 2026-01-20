/**
 * Configuration d'hébergement et déploiement
 * Supporte GitHub Pages et egenttogo.com
 */

const deploymentConfig = {
  // Développement local
  development: {
    name: 'Development',
    frontendUrl: 'http://localhost:5173',
    serverUrl: 'http://localhost:3000',
    baseUrl: 'http://localhost:5173',
    prerender: false,
    cache: true,
    cacheTTL: 3600000 // 1 heure
  },

  // GitHub Pages (actuellement)
  'github-pages': {
    name: 'GitHub Pages',
    frontendUrl: 'https://alifoe.github.io/EGENT_TOGO',
    serverUrl: 'https://prerender.egenttogo.com', // À configurer
    baseUrl: 'https://alifoe.github.io/EGENT_TOGO',
    prerender: true,
    cache: true,
    cacheTTL: 86400000 // 24 heures
  },

  // egenttogo.com (cible finale)
  production: {
    name: 'Production (egenttogo.com)',
    frontendUrl: 'https://www.egenttogo.com',
    serverUrl: 'https://www.egenttogo.com',
    baseUrl: 'https://www.egenttogo.com',
    prerender: true,
    cache: true,
    cacheTTL: 86400000 // 24 heures
  }
};

/**
 * Obtenir la configuration selon l'environnement
 */
function getConfig(env = process.env.NODE_ENV || 'development') {
  const envName = env === 'production' ? 'github-pages' : env;
  return deploymentConfig[envName] || deploymentConfig.development;
}

/**
 * Configuration du serveur
 */
const serverConfig = {
  // Port
  port: process.env.PORT || 3000,

  // Répertoires
  dirs: {
    cache: './prerendered',
    dist: './dist',
    public: './public'
  },

  // Timeouts
  timeouts: {
    render: 30000,
    cache: 86400000
  },

  // Puppeteer
  puppeteer: {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  },

  // Crawlers à détecter
  crawlers: [
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegram',
    'slurp',
    'googlebot',
    'bingbot',
    'yandexbot',
    'baiduspider'
  ]
};

export { deploymentConfig, getConfig, serverConfig };
