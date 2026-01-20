/**
 * Composable pour intégrer le serveur de prerendering
 * Utilisé pour GitHub Pages avec serveur external
 */

export function usePrerenderServer() {
  // Variables globales injectées par Vite
  const PRERENDER_SERVER = globalThis.__PRERENDER_SERVER__ || '';
  const ENVIRONMENT = globalThis.__ENVIRONMENT__ || 'development';

  /**
   * Obtenir l'URL de prerendering pour un article
   */
  function getPrerenderUrl(slug) {
    if (!PRERENDER_SERVER) {
      return null; // Pas de serveur configuré
    }
    return `${PRERENDER_SERVER}/api/prerender/articles/${slug}`;
  }

  /**
   * Obtenir les métadonnées d'un article
   */
  async function getArticleMetadata(slug) {
    if (!PRERENDER_SERVER) {
      return null;
    }

    try {
      const response = await fetch(
        `${PRERENDER_SERVER}/api/metadata/articles/${slug}`
      );
      if (!response.ok) throw new Error('Métadonnées non disponibles');
      return await response.json();
    } catch (error) {
      console.error('Erreur métadonnées:', error);
      return null;
    }
  }

  /**
   * Rafraîchir le cache du serveur
   */
  async function refreshCache(slug) {
    if (!PRERENDER_SERVER) {
      return false;
    }

    try {
      const response = await fetch(
        `${PRERENDER_SERVER}/api/cache/refresh/${slug}`,
        { method: 'POST' }
      );
      return response.ok;
    } catch (error) {
      console.error('Erreur rafraîchir cache:', error);
      return false;
    }
  }

  /**
   * Vérifier l'état du serveur
   */
  async function checkHealth() {
    if (!PRERENDER_SERVER) {
      return false;
    }

    try {
      const response = await fetch(`${PRERENDER_SERVER}/api/health`);
      return response.ok;
    } catch (error) {
      console.warn('Serveur prerendering indisponible');
      return false;
    }
  }

  return {
    PRERENDER_SERVER,
    ENVIRONMENT,
    getPrerenderUrl,
    getArticleMetadata,
    refreshCache,
    checkHealth
  };
}
