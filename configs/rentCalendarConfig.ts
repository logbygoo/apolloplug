/**
 * Niedostępność aut do wypożyczenia w określonych dniach (kalendarz na landing `/wypozycz/:id`).
 * Podaj przedziały włącznie: [start, end] w ISO (YYYY-MM-DD), strefa lokalna PL.
 * Łatwe dopisywanie: jedna nowa linia w tablicy `blocked` danej floty, opcjonalnie `note` do orientacji w kodzie.
 */

export type BlockedRentalDateRange = {
  start: string;
  end: string;
  /** Tylko komentarz w konfigu (nie wyświetlamy w UI) */
  note?: string;
};

/**
 * Dla `carId` z `RENTAL_CARS` / `fleetConfig`.
 * Brak wpisu = brak specjalnej blokady (kalendarz pokaże tylko przeszłość itd. jako wyszarzone).
 */
export const RENT_CAR_BLOCKAGES: Record<string, BlockedRentalDateRange[]> = {
  'tesla-3-highland': [
    { start: '2026-04-30', end: '2026-05-03', note: '-' },
  ],
  'tesla-y-juniper': [
    { start: '2026-04-30', end: '2026-05-03', note: '-' },
  ],
  'tesla-x': [],
  'tesla-s': [],
  'tesla-cybertruck': [],
};

const ISO_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseIsoToLocal(s: string): { y: number; m: number; d: number } {
  const m = s.match(ISO_KEY);
  if (!m) throw new Error(`Invalid date: ${s}`);
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) };
}

function localDateKey(y: number, m1to12: number, d: number): string {
  const t = m1to12;
  return `${y}-${String(t).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/** Ekspanduje wszystkie dni w przedziałach do zbioru `YYYY-MM-DD`. */
function expandRangesToSet(ranges: BlockedRentalDateRange[] | undefined): Set<string> {
  const out = new Set<string>();
  if (!ranges?.length) return out;
  for (const { start, end } of ranges) {
    const a = parseIsoToLocal(start);
    const b = parseIsoToLocal(end);
    const t0 = new Date(a.y, a.m - 1, a.d).getTime();
    const t1 = new Date(b.y, b.m - 1, b.d).getTime();
    if (t1 < t0) continue;
    for (let t = t0; t <= t1; t += 864e5) {
      const d = new Date(t);
      out.add(localDateKey(d.getFullYear(), d.getMonth() + 1, d.getDate()));
    }
  }
  return out;
}

const cache = new Map<string, Set<string>>();

/** Klawisze dni, w których auto (wg konfigu) jest zarezerwowane / niedostępne. */
export function getBlockedRentalDateKeysForCar(carId: string): Set<string> {
  let s = cache.get(carId);
  if (!s) {
    s = expandRangesToSet(RENT_CAR_BLOCKAGES[carId]);
    cache.set(carId, s);
  }
  return s;
}

export function isCarBlockedOnDateKey(yyyyMmDd: string, carId: string): boolean {
  return getBlockedRentalDateKeysForCar(carId).has(yyyyMmDd);
}

/** Po edycji `RENT_CAR_BLOCKAGES` w HMR; w produkcji nie trzeba. */
export function clearBlockedRentalDateCacheForTests(): void {
  cache.clear();
}
