/**
 * Okleiny do Tesla „Lakiernia” (wrap) — pliki PNG do pobrania z CDN.
 */
export type WrapGalleryItem = {
  id: string;
  label: string;
  src: string;
  fileName: string;
};

export const WRAP_GALLERY_ITEMS: WrapGalleryItem[] = [
  {
    id: 'cf-black',
    label: 'Cancer Fighters (ciemne tło)',
    src: 'https://img.apolloidea.com/img/wrap/wrap-cf-black-apolloidea.png',
    fileName: 'wrap-cf-black-apolloidea.png',
  },
  {
    id: 'cf-white',
    label: 'Cancer Fighters (jasne tło)',
    src: 'https://img.apolloidea.com/img/wrap/wrap-cf-white-apolloidea.png',
    fileName: 'wrap-cf-white-apolloidea.png',
  },
  {
    id: 'policja',
    label: 'Polska Policja (demo)',
    src: 'https://img.apolloidea.com/img/wrap/wrap-polska-policja-apolloidea.png',
    fileName: 'wrap-polska-policja-apolloidea.png',
  },
];

/** Instrukcja montażu w pojeździe — klip TikTok (player embed). */
export const WRAP_INSTALL_TIKTOK_VIDEO_ID = '7628546878182919457';
