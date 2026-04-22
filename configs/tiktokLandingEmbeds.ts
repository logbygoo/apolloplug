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

/** Origin docelowy dla `postMessage` do playera TikTok w iframe. */
export const TIKTOK_PLAYER_ORIGIN = 'https://www.tiktok.com' as const;

/**
 * Sterowanie playerem osadzonym (Host → player). W praktyce autoplay bywa wyciszony
 * mimo `muted=0` w URL — wtedy po interakcji / `onPlayerReady` wywołaj `unMute`.
 * @see https://developers.tiktok.com/doc/embed-player
 */
export function postTiktokPlayerCommand(
  iframe: HTMLIFrameElement | null,
  command: 'play' | 'pause' | 'mute' | 'unMute',
): void {
  const w = iframe?.contentWindow;
  if (!w) return;
  try {
    w.postMessage({ type: command, 'x-tiktok-player': true }, TIKTOK_PLAYER_ORIGIN);
  } catch {
    /* no-op */
  }
}

/**
 * Iframe: `player/v1` — `fullscreen_button=0` (bez pełnego ekranu),
 * `music_info=0` / `description=0` (mniej klikalnych elementów do TikToka).
 * @see https://developers.tiktok.com/doc/embed-player
 */
export function tiktokEmbedSrc(videoId: string): string {
  const q = new URLSearchParams({
    autoplay: '1',
    muted: '0',
    fullscreen_button: '0',
    music_info: '0',
    description: '0',
  });
  return `https://www.tiktok.com/player/v1/${videoId}?${q.toString()}`;
}
