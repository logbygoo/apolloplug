/**
 * Okleiny do Tesla „Lakiernia” (wrap) — pliki PNG do pobrania z CDN.
 * Każdy wzór jest dopasowany do konkretnej generacji: Model 3 albo Model Y.
 */
export type WrapCompatibleModelLabel = 'Tesla 3' | 'Tesla Y';

export type WrapGalleryItem = {
  id: string;
  label: string;
  /** Dla Lakierni — wzór pasuje tylko do wskazanego modelu. */
  compatibleModel: WrapCompatibleModelLabel;
  src: string;
  fileName: string;
};

export const WRAP_GALLERY_ITEMS: WrapGalleryItem[] = [
  {
    id: 'cf-black',
    label: 'Cancer Fighters (black)',
    compatibleModel: 'Tesla 3',
    src: 'https://img.apolloidea.com/img/wrap/wrap-cf-black-apolloidea.png',
    fileName: 'wrap-cf-black-apolloidea.png',
  },
  {
    id: 'cf-white',
    label: 'Cancer Fighters (white)',
    compatibleModel: 'Tesla 3',
    src: 'https://img.apolloidea.com/img/wrap/wrap-cf-white-apolloidea.png',
    fileName: 'wrap-cf-white-apolloidea.png',
  },
  {
    id: 'policja',
    label: 'Polska Policja',
    compatibleModel: 'Tesla 3',
    src: 'https://img.apolloidea.com/img/wrap/wrap-polska-policja-apolloidea.png',
    fileName: 'wrap-polska-policja-apolloidea.png',
  },
  {
    id: 'y-cf',
    label: 'Cancer Fighters',
    compatibleModel: 'Tesla Y',
    src: 'https://img.apolloidea.com/img/wrap/wrap-y-cf-apolloidea.png',
    fileName: 'wrap-y-cf-apolloidea.png',
  },
];

/** Instrukcja montażu w pojeździe — klip TikTok (player embed). */
export const WRAP_INSTALL_TIKTOK_VIDEO_ID = '7628546878182919457';
