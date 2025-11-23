// Konfiguracja cennika dla usług transferu

export const TRANSFERS_CONFIG = {
  baseFare: 25, // Opłata startowa w PLN
  pricePerKm: {
    'tesla-3-highland': 9.50,
    'tesla-y-jupiter': 11.00,
    'tesla-x': 15.50,
    'tesla-cybertruck': 27.00,
  } as Record<string, number>,
};
