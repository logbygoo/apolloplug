/**
 * Kafelki TikTok na landing `/wypozycz/:id` (sekcja obok 4 atutów).
 * `videoId` z URL; `thumbSrc` — własna miniatura (export z podglądu / CDN).
 */

export type TikTokLandingTile = {
  /** ID z URL: .../video/7627939875727150369 */
  videoId: string;
  /** Miniatura w kaflu przed odtworzeniem */
  thumbSrc: string;
  alt?: string;
  /** Np. „48,2 tys. wyświetleń” */
  viewCountLabel: string;
};

export const TIKTOK_LANDING_TILES: TikTokLandingTile[] = [
  {
    videoId: '7627939875727150369',
    thumbSrc: 'https://img.apolloidea.com/tesla-y/1.jpg',
    alt: 'Klip TikTok @apolloidea — elektryki',
    viewCountLabel: '48,2 tys. wyświetleń',
  },
];

/**
 * URL iframe w modalu (oficjalny player TikTok — ten sam wideo co w osadzaniu przez „Osadź”).
 * Pełny markup `<blockquote class="tiktok-embed" …>…</blockquote>` + `embed.js` bywa kapryśny
 * w dynamicznym React; iframe jest w praktyce równoważny podglądowi z kodu.
 *
 * Przykładowy fragment z osadzania (np. wideo 7627939875727150369) — w razie ręcznego testu w HTML:
 * <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@apolloidea/video/7627939875727150369"
 *   data-video-id="7627939875727150369" style="max-width: 605px; min-width: 325px">…</blockquote>
 * <script async src="https://www.tiktok.com/embed.js"></script>
 */
export function tiktokEmbedSrc(videoId: string): string {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}
