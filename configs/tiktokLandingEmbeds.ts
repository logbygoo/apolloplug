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
  /** Tylko liczby / skrót, np. „6,2 tys.” (bez słowa „wyświetleń”) */
  viewCountLabel: string;
};

export const TIKTOK_LANDING_TILES: TikTokLandingTile[] = [
  {
    videoId: '7627939875727150369',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7627939875727150369.jpeg',
    alt: 'Klip TikTok @apolloidea Od kilku dni testuję teslę',
    viewCountLabel: '6,2 tys.',
  },
  {
    videoId: '7625350083407629600',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7625350083407629600.jpeg',
    alt: 'Klip TikTok @apolloidea Tesla 3',
    viewCountLabel: '334',
  },
  {
    videoId: '7631466839964519713',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7631466839964519713.jpeg',
    alt: 'Klip TikTok @apolloidea Policja Wrap',
    viewCountLabel: '10,2 tys.',
  },
  {
    videoId: '7631277152431820065',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7631277152431820065.jpeg',
    alt: 'Klip TikTok @apolloidea Kiedy jutro odbieram teslę',
    viewCountLabel: '1,1 tys.',
  },
  {
    videoId: '7629617463453338912',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7629617463453338912.jpeg',
    alt: 'Klip TikTok @apolloidea Dlaczgo ludzie dziwnie patrzą na teslarzy',
    viewCountLabel: '998',
  },
  {
    videoId: '7628301388006575392',
    thumbSrc: 'https://img.apolloidea.com/img/social-media/7628301388006575392.jpeg',
    alt: 'Klip TikTok @apolloidea Elon Tesla Wrap',
    viewCountLabel: '503',
  },
];

/**
 * Iframe: oficjalny `player/v1` z parametrami (autoplay — dokumentacja TikTok;
 * `embed/v2` zazwyczaj sam nie startuje odtwarzania z query).
 */
export function tiktokEmbedSrc(videoId: string): string {
  const q = new URLSearchParams({
    autoplay: '1',
    muted: '0',
  });
  return `https://www.tiktok.com/player/v1/${videoId}?${q.toString()}`;
}
