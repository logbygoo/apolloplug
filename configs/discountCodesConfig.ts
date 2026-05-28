export type DiscountCodeType = 'percent' | 'amount';

export type DiscountCodeConfig = {
  code: string;
  type: DiscountCodeType;
  value: number;
  active?: boolean;
};

/**
 * Kody rabatowe dla rezerwacji.
 * - `percent`: wartość procentowa (np. 15 = 15%)
 * - `amount`: wartość kwotowa w PLN (np. 100 = 100 zł)
 */
export const DISCOUNT_CODES: DiscountCodeConfig[] = [
  {
    code: 'ILOVEAPOLLO',
    type: 'percent',
    value: 15,
    active: true,
  },
  {
    code: 'APOLLOWGOOGLE',
    type: 'percent',
    value: 10,
    active: true,
  },
  {
    code: 'APOLLONAOLX',
    type: 'percent',
    value: 10,
    active: true,
  },
];

export function normalizeDiscountCode(input: string): string {
  return input.trim().toUpperCase();
}

export function findActiveDiscountCode(input: string): DiscountCodeConfig | null {
  const normalized = normalizeDiscountCode(input);
  if (!normalized) return null;
  return DISCOUNT_CODES.find((item) => item.active !== false && item.code === normalized) ?? null;
}

export function computeDiscountAmount(totalPrice: number, discount: DiscountCodeConfig): number {
  if (totalPrice <= 0) return 0;
  if (discount.type === 'percent') {
    const amount = Math.round((totalPrice * discount.value) / 100);
    return Math.min(Math.max(amount, 0), totalPrice);
  }
  const amount = Math.round(discount.value);
  return Math.min(Math.max(amount, 0), totalPrice);
}
