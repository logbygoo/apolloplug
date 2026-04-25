/**
 * Czerwony kolor dnia: niedziela lub święto ustawowe w PL.
 * Wielkanoc, Pon. wielkanocny, Boże Ciało — tabela Wielkiej Nocy (2020–2040).
 */

const pad = (n: number) => String(n).padStart(2, '0');
export function localYmdKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d.getTime());
  x.setDate(x.getDate() + n);
  return x;
}

const EASTER_SUNDAY: Record<number, { month: number; day: number }> = {
  2020: { month: 4, day: 12 },
  2021: { month: 4, day: 4 },
  2022: { month: 4, day: 17 },
  2023: { month: 4, day: 9 },
  2024: { month: 3, day: 31 },
  2025: { month: 4, day: 20 },
  2026: { month: 4, day: 5 },
  2027: { month: 3, day: 28 },
  2028: { month: 4, day: 16 },
  2029: { month: 4, day: 1 },
  2030: { month: 4, day: 21 },
  2031: { month: 4, day: 13 },
  2032: { month: 3, day: 28 },
  2033: { month: 4, day: 17 },
  2034: { month: 4, day: 9 },
  2035: { month: 3, day: 25 },
  2036: { month: 4, day: 13 },
  2037: { month: 4, day: 5 },
  2038: { month: 4, day: 25 },
  2039: { month: 4, day: 10 },
  2040: { month: 4, day: 1 },
};

function easterSunday(y: number): Date | null {
  const s = EASTER_SUNDAY[y];
  if (!s) return null;
  return new Date(y, s.month - 1, s.day, 12, 0, 0, 0);
}

/** Czerwony numer dnia: niedziela, albo ustalone święto, albo ruchome (Pon. wielkanocny, Boże Ciało). */
export function isPlRedCalendarDay(d: Date): boolean {
  if (d.getDay() === 0) return true;
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const y = d.getFullYear();
  if (m === 1 && day === 1) return true;
  if (m === 1 && day === 6) return true;
  if (m === 5 && day === 1) return true;
  if (m === 5 && day === 3) return true;
  if (m === 8 && day === 15) return true;
  if (m === 11 && day === 1) return true;
  if (m === 11 && day === 11) return true;
  if (m === 12 && (day === 25 || day === 26)) return true;
  const es = easterSunday(y);
  if (es) {
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
    if (localYmdKey(t) === localYmdKey(addDays(es, 1))) return true;
    if (localYmdKey(t) === localYmdKey(addDays(es, 60))) return true;
  }
  return false;
}
