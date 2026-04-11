import type { Car, LandingPageImageEntry } from '../types';

/** Miniatura: `.../1.jpg` → `.../1-min.jpg` (przed `.jpg`). */
export function landingImageThumbSrc(fullSrc: string): string {
  return fullSrc.replace(/\.jpg$/i, '-min.jpg');
}

/** Lista do galerii: landing albo fallback `imageUrl`. */
export function getLandingGallerySource(car: Car): LandingPageImageEntry[] {
  if (car.landingPageImages && car.landingPageImages.length > 0) {
    return car.landingPageImages.map((entry, i) => ({
      src: entry.src,
      alt: entry.alt.trim() || `Zdjęcie ${i + 1}`,
    }));
  }
  return car.imageUrl.map((src, i) => ({
    src,
    alt: `Zdjęcie ${i + 1}`,
  }));
}

function shuffleArray<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Kolejność losowa przy każdym zestawieniu listy (np. nowe `useMemo` po wejściu na stronę / zmianie auta). */
export function getShuffledLandingGallery(car: Car): LandingPageImageEntry[] {
  return shuffleArray(getLandingGallerySource(car));
}
