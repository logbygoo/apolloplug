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
    return defaultReturn;
  }

  const start = new Date(`${pickupDate}T${pickupTime}`);
  const end = new Date(`${returnDate}T${returnTime}`);

  if (start >= end) {
    return defaultReturn;
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
      const price = getPriceForCar(opt.price, model.id);
      optionsPrice += opt.type === 'per_day' ? price * rentalDays : price;
    }
  });

  const pickupLoc = LOCATIONS.find((loc) => loc.title === pickupLocation);
  const pickupFee = pickupLoc?.price || 0;

  const returnLoc = LOCATIONS.find((loc) => loc.title === returnLocation);
  const returnFee = returnLoc?.price || 0;

  const totalPrice = rentalPrice + optionsPrice + pickupFee + returnFee;
  const deposit = model.deposit || 5000;
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
  if (n <= 0) return '—';
  if (n === 1) return '1 dzień';
  return `${n} dni`;
}

export function buildV2OptionLines(
  model: Car,
  additionalOptions: Record<(typeof ADDITIONAL_OPTIONS)[number]['id'], boolean>
) {
  return ADDITIONAL_OPTIONS.filter((opt) => additionalOptions[opt.id]).map((opt) => {
    const unit = getPriceForCar(opt.price, model.id);
    const detail =
      opt.type === 'per_day'
        ? `${unit.toLocaleString('pl-PL')} zł/db`
        : `${unit.toLocaleString('pl-PL')} zł`;
    return { id: opt.id, fullName: opt.name, detail };
  });
}
