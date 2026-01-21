/**
 * Utility for constructing URLs with proper base path
 * Works with both local dev (/) and GitHub Pages (/EGENT_TOGO/)
 */

export function getImageUrl(imagePath) {
  const baseUrl = import.meta.env.BASE_URL
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return `${baseUrl}${cleanPath}`
}

export const imageUrls = {
  montagePanneau: getImageUrl('images/montage_panneau.jpg'),
  photChantier: getImageUrl('images/photo_chantier.jpg'),
  egentReception: getImageUrl('images/egent_reception.jpg'),
  chauffageEgent: getImageUrl('images/chauffage_egent.jpg'),
  montagePanneau2: getImageUrl('images/montage_panneau2.jpg'),
  photChantier2: getImageUrl('images/photo_chantier2.jpg'),
}
