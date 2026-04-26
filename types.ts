/** Zdjęcia landing `/wypozycz/:id` — `src` pełne, miniatura: `src` z `-min` przed `.jpg`. */
export type LandingPageImageEntry = {
  src: string;
  alt: string;
};

/** Ikony w sekcji „Dlaczego” na landing wynajmu — mapowanie w `RentalCarLandingPage`. */
export type RentalLandingFeatureIconKey = 'bolt' | 'sparkles' | 'shieldCheck' | 'key';

export type RentalLandingFeatureBlock = {
  icon: RentalLandingFeatureIconKey;
  title: string;
  desc: string;
};

/** Treść marketingowa landing `/wypozycz/:carId` (per auto w `rentalLandingPageContent.ts`). */
export type RentalLandingPageContent = {
  /** Pod H1 w hero; domyślnie z fallbacku. */
  heroSubtitle?: string;
  /** Nagłówek sekcji; domyślnie „Dlaczego {nazwa z floty}?”. */
  whyHeading?: string;
  /** Akapit pod „Dlaczego”. */
  whyLead: string;
  /** Dokładnie 4 karty zalet. */
  features: [
    RentalLandingFeatureBlock,
    RentalLandingFeatureBlock,
    RentalLandingFeatureBlock,
    RentalLandingFeatureBlock,
  ];
  /** Dolny blok SEO — bezpieczny HTML (np. `<p>`, `<h3>`, `<ul>`). */
  longDescriptionHtml: string;
};

export interface Car {
  id: string;
  name: string;
  description?: string;
  imageUrl: string[];
  landingPageImages?: LandingPageImageEntry[];
  pricePerDay: number;
  specs?: {
    range: string;
    seating: string;
    acceleration: string;
    color?: string;
    interiorColor?: string;
    drive?: string;
    version?: string;
  };
  available?: boolean;
  /**
   * Tylko w `CAR_FLEET`: auto możliwe do odbioru w ~1h (pasek „online” na listingach). Domyślnie `false` / brak = nie.
   */
  availableIn1h?: boolean;
  /** `false` = nie pokazuj karty w „Wybierz model” na kroku 1 rezerwacji (auto nadal w konfigu, landingi itd.). Domyślnie jak `true`. */
  visible?: boolean;
  priceTiers?: {
    days: string;
    pricePerDay: number;
    kmLimitPerDay: number;
  }[];
  deposit?: number;
  costPerKmOverLimit: number;
}

export interface HeroCar {
  id: string;
  name: string;
  imageUrl: string;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  theme?: 'dark' | 'light';
}

export interface BlogPost {
  id: string;
  project_id: number;
  status: string;
  name: string; // Title
  slug: string;
  date_published: string;
  date_modified: string;
  content: string;
  thumbnailUrl?: string; // Optional override for local/mock data
}

export interface SeoData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}