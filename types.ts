export interface Car {
  id: string;
  name: string;
  description: string;
  imageUrl: string[];
  pricePerDay: number;
  specs: {
    range: string;
    seating: string;
    acceleration: string;
  };
  details?: {
    subtitle?: string;
    primaryBtnText?: string;
    primaryBtnLink?: string;
    secondaryBtnText?: string;
    secondaryBtnLink?: string;
  }
  available?: boolean;
}

export interface InvestmentProject {
  id: string;
  carName: string;
  imageUrl: string;
  amountRaised: number;
  goal: number;
  investorCount: number;
}