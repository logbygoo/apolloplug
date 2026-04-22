/**
 * Oficjalne profile (spójne z kontaktem / stopką). Koryguj URL, jeśli kanał ma inną ścieżkę.
 */
export const SOCIAL_MEDIA_LINKS = [
  { id: 'tiktok' as const, href: 'https://www.tiktok.com/@apolloidea', label: 'TikTok' },
  { id: 'instagram' as const, href: 'https://www.instagram.com/apolloidea', label: 'Instagram' },
  { id: 'facebook' as const, href: 'https://www.facebook.com/apolloidea', label: 'Facebook' },
  { id: 'youtube' as const, href: 'https://www.youtube.com/@apolloidea', label: 'YouTube' },
] as const;
