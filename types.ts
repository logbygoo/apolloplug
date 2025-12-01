
export interface Car {
  id: string;
  name: string;
  description?: string;
  imageUrl: string[];
  landingPageImages?: string[]; // New optional field for Hero Slider images
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

export interface Article {
  slug: string;
  title: string;
  publishDate: string;
  thumbnailUrl: string;
  excerpt: string;
  content: string;
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
}

export interface SeoData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}