/**
 * Godziny pracy biura (wydanie / zwrot auta w cenie standardowej).
 * Poza tym przedziałem obowiązuje dopłata za pozagodzinowy odbiór lub zwrot.
 */
export const OFFICE_HOURS = {
  /** Początek (włącznie) — pierwsza dostępna „tania” godzina */
  startHour: 8,
  startMinute: 0,
  /** Koniec (włącznie) — ostatnia dostępna „tania” godzina */
  endHour: 20,
  endMinute: 0,
} as const;

/** Dopłata za wydanie lub zwrot poza godzinami pracy biura (każda taka godzina osobno w wyborze). */
export const OUTSIDE_OFFICE_HOURS_SURCHARGE_PLN = 90;

function timeStringToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

const officeStartMinutes = OFFICE_HOURS.startHour * 60 + OFFICE_HOURS.startMinute;
const officeEndMinutes = OFFICE_HOURS.endHour * 60 + OFFICE_HOURS.endMinute;

/** Czy podana godzina (HH:mm) mieści się w godzinach pracy biura. */
export function isWithinOfficeHours(timeHHmm: string): boolean {
  const t = timeStringToMinutes(timeHHmm);
  return t >= officeStartMinutes && t <= officeEndMinutes;
}

/** Etykieta w `<select>` godzin: poza pracą biura dopisek „(+90 zł)”. */
export function formatRentalTimeOptionLabel(timeHHmm: string): string {
  if (isWithinOfficeHours(timeHHmm)) return timeHHmm;
  return `${timeHHmm} (+${OUTSIDE_OFFICE_HOURS_SURCHARGE_PLN} zł)`;
}
