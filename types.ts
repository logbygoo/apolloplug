export interface Car {
  id: string;
  name: string;
  description?: string;
  imageUrl: string[];
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
  details?: {
    subtitle?: string;
    primaryBtnText?: string;
    primaryBtnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
  }
  available?: boolean;
  priceTiers?: {
    days: string;
    pricePerDay: number;
    kmLimitPerDay: number;
  }[];
  deposit?: number;
  costPerKmOverLimit: number;
}

export interface InvestmentProject {
  id: string;
  carName: string;
  imageUrl: string;
  amountRaised: number;
  goal: number;
  investorCount: number;
}

export interface Article {
  slug: string;
  title: string;
  publishDate: string;
  thumbnailUrl: string;
  excerpt: string;
  content: string;
}
