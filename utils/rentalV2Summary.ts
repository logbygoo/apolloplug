import { ADDITIONAL_OPTIONS } from '../configs/rentConfig';
import { LOCATIONS } from '../configs/locationsConfig';
import type { Car } from '../types';

export type RentalPeriodState = {
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnDate: string;
  returnTime: string;
  returnLocation: string;
};

const getPriceForCar = (price: number | Readonly<{ [key: string]: number }>, carId: string): number => {
  if (typeof price === 'number') return price;
  return price[carId] ?? 0;
};

/** Próg „do darmowej opcji” — komunikat pod opisem tylko gdy `1…MAX` dób brakuje do progu. */
export const FREE_OPTION_HINT_MAX_GAP_DAYS = 4;

export type AdditionalOption = (typeof ADDITIONAL_OPTIONS)[number];

function optionHasIsFree(
  opt: AdditionalOption
): opt is AdditionalOption & { is_free: number } {
  return 'is_free' in opt && typeof (opt as { is_free?: unknown }).is_free === 'number';
}

export function isAdditionalOptionFreeByRentalLength(
  opt: AdditionalOption,
  rentalDays: number
): boolean {
  if (rentalDays <= 0 || !optionHasIsFree(opt)) return false;
  return rentalDays >= opt.is_free;
}

/** Cena jednostkowa (przed mnożnikiem dni) z uwzględnieniem progu darmowej opcji. */
export function getAdditionalOptionUnitPrice(
  opt: AdditionalOption,
  carId: string,
  rentalDays: number
): number {
  const base = getPriceForCar(opt.price, carId);
  if (isAdditionalOptionFreeByRentalLength(opt, rentalDays)) return 0;
  return base;
}

/** Mianownik: „1 dobę”, „2 doby”, „5 dób” (formalnie doby, nie „dni”). */
export function formatDobyAccusative(n: number): string {
  if (n < 1) return `${n} dób`;
  if (n === 1) return '1 dobę';
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return `${n} doby`;
  return `${n} dób`;
}

/**
 * Tekst zachęty: tylko gdy rezerwacja jest krótsza niż próg, a brak ≤ 4 dób do progu.
 * Zwraca `null`, gdy brak `is_free` lub komunikat byłby nieadekwatny.
 */
export function getFreeOptionProximityHint(
  opt: AdditionalOption,
  rentalDays: number
): string | null {
  if (rentalDays <= 0 || !optionHasIsFree(opt)) return null;
  if (rentalDays >= opt.is_free) return null;
  const gap = opt.is_free - rentalDays;
  if (gap < 1 || gap > FREE_OPTION_HINT_MAX_GAP_DAYS) return null;
  return `Dodaj ${formatDobyAccusative(gap)} aby otrzymać tę opcję za darmo`;
}

export type RentalV2SummaryResult = {
  rentalDays: number;
  rentalPrice: number;
  optionsPrice: number;
  totalPrice: number;
  deposit: number;
  totalWithDeposit: number;
  totalKmLimit: number;
  costPerKmOverLimit: number;
  pickupFee: number;
  returnFee: number;
  tierPricePerDay: number;
  tierKmLimitPerDay: number;
};

export function computeRentalV2Summary(
  rentalPeriod: RentalPeriodState,
  model: Car,
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>
): RentalV2SummaryResult {
  const { pickupDate, returnDate, pickupTime, returnTime, pickupLocation, returnLocation } = rentalPeriod;

  const defaultReturn: RentalV2SummaryResult = {
    rentalDays: 0,
    rentalPrice: 0,
    optionsPrice: 0,
    totalPrice: 0,
    deposit: 5000,
    totalWithDeposit: 5000,
    totalKmLimit: 0,
    costPerKmOverLimit: 0,
    pickupFee: 0,
    returnFee: 0,
    tierPricePerDay: 0,
    tierKmLimitPerDay: 0,
  };

  if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
    const dep = additionalOptions.deposit ? 0 : model.deposit || 5000;
    return { ...defaultReturn, deposit: dep, totalWithDeposit: dep };
  }

  const start = new Date(`${pickupDate}T${pickupTime}`);
  const end = new Date(`${returnDate}T${returnTime}`);

  if (start >= end) {
    const dep = additionalOptions.deposit ? 0 : model.deposit || 5000;
    return { ...defaultReturn, deposit: dep, totalWithDeposit: dep };
  }

  const diffTime = end.getTime() - start.getTime();
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const tier =
    model.priceTiers?.find((t) => {
      const range = t.days.match(/\d+/g);
      if (!range) return false;
      const min = parseInt(range[0], 10);
      let max: number;
      if (range.length > 1) {
        max = parseInt(range[1], 10);
      } else if (t.days.includes('+') || t.days.includes('-')) {
        max = Infinity;
      } else {
        max = min;
      }
      return rentalDays >= min && rentalDays <= max;
    }) || { pricePerDay: model.pricePerDay, kmLimitPerDay: 250 };

  const rentalPrice = rentalDays * tier.pricePerDay;
  const totalKmLimit = rentalDays * tier.kmLimitPerDay;
  const costPerKmOverLimit = model.costPerKmOverLimit || 0;

  let optionsPrice = 0;
  ADDITIONAL_OPTIONS.forEach((opt) => {
    if (additionalOptions[opt.id]) {
      const unit = getAdditionalOptionUnitPrice(opt, model.id, rentalDays);
      optionsPrice += opt.type === 'per_day' ? unit * rentalDays : unit;
    }
  });

  const pickupLoc = LOCATIONS.find((loc) => loc.title === pickupLocation);
  const pickupFee = pickupLoc?.price || 0;

  const returnLoc = LOCATIONS.find((loc) => loc.title === returnLocation);
  const returnFee = returnLoc?.price || 0;

  const totalPrice = rentalPrice + optionsPrice + pickupFee + returnFee;
  const baseDeposit = model.deposit || 5000;
  const deposit = additionalOptions.deposit ? 0 : baseDeposit;
  const totalWithDeposit = totalPrice + deposit;

  return {
    rentalDays,
    rentalPrice,
    optionsPrice,
    totalPrice,
    deposit,
    totalWithDeposit,
    totalKmLimit,
    costPerKmOverLimit,
    pickupFee,
    returnFee,
    tierPricePerDay: tier.pricePerDay,
    tierKmLimitPerDay: tier.kmLimitPerDay,
  };
}

/** Podsumowanie v2: „1 dzień”, „2 dni”, „5 dni” itd. */
export function formatPolishRentalDays(n: number): string {
  if (n <= 0) return '-';
  if (n === 1) return '1 dzień';
  return `${n} dni`;
}

export function buildV2OptionLines(
  model: Car,
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>,
  rentalDays: number
) {
  return ADDITIONAL_OPTIONS.filter((opt) => additionalOptions[opt.id]).map((opt) => {
    const unit = getAdditionalOptionUnitPrice(opt, model.id, rentalDays);
    if (unit === 0) {
      return { id: opt.id, fullName: opt.name, detail: 'Wliczone w cenę' };
    }
    const detail =
      opt.type === 'per_day'
        ? `${unit.toLocaleString('pl-PL')} zł/db`
        : `${unit.toLocaleString('pl-PL')} zł`;
    return { id: opt.id, fullName: opt.name, detail };
  });
}
