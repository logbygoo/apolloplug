export interface Location {
  lat: number;
  lng: number;
  type: 'supercharger' | 'greenway' | 'pickup_point' | 'building_company';
  title: string;
  address: string;
  price?: number | null;
}

/** Etykieta opcji miejsc odbioru/zwrotu: nazwa → (W CENIE) lub (cena zł) → adres. */
export function formatLocationSelectLabel(loc: Location): string {
  const included = loc.price == null || loc.price === 0;
  if (included) {
    return `${loc.title} (W CENIE) — ${loc.address}`;
  }
  return `${loc.title} (${loc.price!.toLocaleString('pl-PL')} zł) — ${loc.address}`;
}

export const LOCATIONS: Location[] = [
  { lat: 52.1755, lng: 20.9427, type: 'supercharger', title: 'Supercharger Aleja Krakowska 61', address: 'Aleja Krakowska 61, Warszawa', price: null },
  { lat: 52.2272, lng: 20.9023, type: 'greenway', title: 'Greenway Batalionów Chłopskich 73', address: 'Batalionów Chłopskich 73, Warszawa', price: null },
  { lat: 52.2280, lng: 21.0035, type: 'pickup_point', title: 'Warszawa Centralna', address: 'Aleje Jerozolimskie 54, Warszawa', price: 149 },
  { lat: 52.2968, lng: 21.1189, type: 'supercharger', title: 'Supercharger Radzymińska 334', address: 'Radzymińska 334, Ząbki', price: 190 },
  { lat: 52.1657, lng: 20.9671, type: 'pickup_point', title: 'Lotnisko Chopina', address: 'Żwirki i Wigury 1, Warszawa', price: 99 },
  { lat: 52.2619, lng: 20.9100, type: 'pickup_point', title: 'Lotnisko Babice', address: 'gen. S. Kaliskiego 57, Warszawa', price: 99 },
  { lat: 52.4511, lng: 20.6518, type: 'pickup_point', title: 'Lotnisko Modlin', address: 'Generała Wiktora Thommée 1a, Nowy Dwór Mazowiecki', price: 390 },
  { lat: 52.2330, lng: 20.9818, type: 'building_company', title: 'Biuro apolloidea.com', address: 'Grzybowska 87, Warszawa', price: null },
];
