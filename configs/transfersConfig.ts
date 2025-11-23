// Konfiguracja cennika dla usług transferu

export const TRANSFERS_CONFIG = {
  baseFare: 25, // Opłata startowa w PLN
  pricePerKm: {
    'tesla-3-highland': 3.50,
    'tesla-y-jupiter': 4.00,
    'tesla-x': 5.50,
    'tesla-cybertruck': 7.00,
  } as Record<string, number>,
};
