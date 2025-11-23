import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Input, Label, Button } from '../components/ui';
import { RENTAL_CARS } from '../configs/rentConfig';
import { MAPS_API_KEY } from '../configs/mapsConfig';
import { TRANSFERS_CONFIG } from '../configs/transfersConfig';
import { PayUIcon, RevolutPayIcon } from '../constants';
import { CreditCardIcon, BuildingLibraryIcon, BanknotesIcon, CheckIcon, ChevronDownIcon, ClockIcon, MapPinIcon, ArrowRightIcon, CurrencyDollarIcon } from '../components/HeroIcons';
import type { Car } from '../types';
import Seo from '../components/Seo';

// Declare the global 'google' object to fix TypeScript errors.
declare const google: any;

// Helper to load Google Maps script
const loadGoogleMapsScript = (callback: () => void) => {
  // FIX: Use 'google' directly instead of 'window.google' to align with the global declaration and resolve all google-related TypeScript errors.
  if (typeof google !== 'undefined' && google.maps) {
    callback();
    return;
  }
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,directions`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
     // If script is already loading, add the callback to the onload event
     existingScript.addEventListener('load', callback);
  }
};

const today = new Date().toISOString().split('T')[0];
const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
});

const getInitialPickupTime = () => {
    const earliestPickupDate = new Date();
    earliestPickupDate.setMinutes(earliestPickupDate.getMinutes() + 60);

    const earliestHour = earliestPickupDate.getHours();
    const earliestMinute = earliestPickupDate.getMinutes();

    return timeOptions.find(time => {
        const [h, m] = time.split(':').map(Number);
        if (h > earliestHour) return true;
        if (h === earliestHour && m >= earliestMinute) return true;
        return false;
    }) || timeOptions[0];
};

const ModelCard: React.FC<{ car: Car; isSelected: boolean; onSelect: () => void; }> = ({ car, isSelected, onSelect }) => {
    const isAvailable = car.available !== false;
    return (
        <div
            onClick={isAvailable ? onSelect : undefined}
            className={`relative cursor-pointer rounded-lg border p-4 transition-all flex flex-col h-full ${
                isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card'
            } ${
                isAvailable ? 'hover:border-foreground/50' : 'opacity-50 cursor-not-allowed'
            }`}
        >
            <div className={`absolute top-3 right-3 h-5 w-5 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-foreground text-background' : 'bg-secondary'}`}>
                {isSelected && <CheckIcon className="w-3.5 h-3.5" strokeWidth={3} />}
            </div>
            {!isAvailable && (
                <div className="absolute top-2 left-2 bg-muted text-muted-foreground text-xs font-bold px-2 py-1 rounded">
                    Wkrótce
                </div>
            )}
            <img src={car.imageUrl[0]} alt={car.name} className="w-full h-24 object-contain mb-2" />
            <div className="mt-auto text-center">
                <h3 className="font-semibold text-sm">{car.name}</h3>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-secondary p-4 rounded-lg flex items-center gap-4">
        <div className="text-foreground/70">{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="font-bold text-lg">{value}</p>
        </div>
    </div>
);

const TransfersPage: React.FC = () => {
  // FIX: Replaced google.maps.Map with any to resolve TypeScript error.
  const [map, setMap] = useState<any | null>(null);
  // FIX: Replaced google.maps.DirectionsService with any to resolve TypeScript error.
  const [directionsService, setDirectionsService] = useState<any | null>(null);
  // FIX: Replaced google.maps.DirectionsRenderer with any to resolve TypeScript error.
  const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  const [pickupDate, setPickupDate] = useState(today);
  const [pickupTime, setPickupTime] = useState(getInitialPickupTime);
  // FIX: Replaced google.maps.places.PlaceResult with any to resolve TypeScript error.
  const [pickupAddress, setPickupAddress] = useState<any | null>(null);
  // FIX: Replaced google.maps.places.PlaceResult with any to resolve TypeScript error.
  const [destinationAddress, setDestinationAddress] = useState<any | null>(null);
  const [routeStats, setRouteStats] = useState<{ distance: string; duration: string; price: number } | null>(null);
  const [transferType, setTransferType] = useState<'self' | 'someone' | 'package'>('self');

  const [selectedCar, setSelectedCar] = useState<Car | null>(RENTAL_CARS.find(c => c.available) || null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  // FIX: Replaced google.maps.Marker with any to resolve TypeScript error.
  const [mapMarkers, setMapMarkers] = useState<{ pickup: any | null, destination: any | null }>({ pickup: null, destination: null });

  const availableTimeOptions = useMemo(() => {
    if (pickupDate !== today) {
        return timeOptions;
    }

    const earliestPickupDate = new Date();
    earliestPickupDate.setMinutes(earliestPickupDate.getMinutes() + 60);

    if (earliestPickupDate.toISOString().split('T')[0] !== today) {
        return [];
    }

    const earliestHour = earliestPickupDate.getHours();
    const earliestMinute = earliestPickupDate.getMinutes();

    return timeOptions.filter(time => {
        const [h, m] = time.split(':').map(Number);
        if (h > earliestHour) return true;
        if (h === earliestHour && m >= earliestMinute) return true;
        return false;
    });
  }, [pickupDate]);

  useEffect(() => {
    // On mount, check if the initial time caused a date roll-over
    const earliestPickupDate = new Date();
    earliestPickupDate.setMinutes(earliestPickupDate.getMinutes() + 60);
    const earliestDateString = earliestPickupDate.toISOString().split('T')[0];

    if (pickupDate < earliestDateString) {
      setPickupDate(earliestDateString);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!availableTimeOptions.includes(pickupTime)) {
        setPickupTime(availableTimeOptions[0] || '');
    }
  }, [availableTimeOptions, pickupTime]);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: 52.2297, lng: 21.0122 }, // Warsaw
        zoom: 12,
        disableDefaultUI: true,
        styles: [{ stylers: [{ saturation: -100 }] }],
      });
      
      setMap(mapInstance);
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: mapInstance, suppressMarkers: true }));

      // Try to get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            mapInstance.setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => { console.log("Błąd geolokalizacji lub odmowa dostępu."); }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!map || !pickupInputRef.current || !destinationInputRef.current) return;

    // FIX: Replaced google.maps.places.PlaceResult with any to resolve TypeScript error.
    const setupAutocomplete = (inputRef: React.RefObject<HTMLInputElement>, setAddress: (place: any | null) => void) => {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current!);
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(['name', 'geometry', 'formatted_address']);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                setAddress(place);
            }
        });
        return autocomplete;
    };
    
    setupAutocomplete(pickupInputRef, setPickupAddress);
    setupAutocomplete(destinationInputRef, setDestinationAddress);

  }, [map]);

  const calculateRoute = useCallback(() => {
    if (!directionsService || !directionsRenderer || !pickupAddress?.geometry?.location || !destinationAddress?.geometry?.location) {
      setRouteStats(null);
      directionsRenderer?.setDirections({ routes: [] }); // Clear route
      return;
    }

    directionsService.route(
      {
        origin: pickupAddress.geometry.location,
        destination: destinationAddress.geometry.location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          if (route.distance && route.duration && selectedCar) {
            const distanceKm = route.distance.value / 1000;
            const pricePerKm = TRANSFERS_CONFIG.pricePerKm[selectedCar.id] || 3.0;
            const price = TRANSFERS_CONFIG.baseFare + distanceKm * pricePerKm;

            setRouteStats({
              distance: route.distance.text,
              duration: route.duration.text,
              price: price,
            });
          }
        } else {
          console.error(`Błąd wyznaczania trasy: ${status}`);
          setRouteStats(null);
        }
      }
    );
  }, [directionsService, directionsRenderer, pickupAddress, destinationAddress, selectedCar]);

  useEffect(() => {
    if (map) {
        // Clear previous markers
        mapMarkers.pickup?.setMap(null);
        mapMarkers.destination?.setMap(null);
        
        // FIX: Replaced google.maps.Marker with any to resolve TypeScript error.
        const newMarkers: { pickup: any | null, destination: any | null } = { pickup: null, destination: null };

        if(pickupAddress?.geometry?.location){
            newMarkers.pickup = new google.maps.Marker({
                position: pickupAddress.geometry.location,
                map: map,
                title: "Odbiór",
            });
        }
        if(destinationAddress?.geometry?.location){
            newMarkers.destination = new google.maps.Marker({
                position: destinationAddress.geometry.location,
                map: map,
                title: "Cel",
            });
        }
        setMapMarkers(newMarkers);
    }
    calculateRoute();
  }, [pickupAddress, destinationAddress, map, calculateRoute]);

  const summary = useMemo(() => {
    return {
      carName: selectedCar?.name || '-',
      pickup: pickupAddress?.name || '-',
      destination: destinationAddress?.name || '-',
      date: `${new Date(pickupDate).toLocaleDateString('pl-PL')} ${pickupTime}`,
      distance: routeStats?.distance || '-',
      duration: routeStats?.duration || '-',
      price: routeStats?.price?.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }) || '-',
    };
  }, [selectedCar, pickupAddress, destinationAddress, pickupDate, pickupTime, routeStats]);
  
  const paymentMethods = [
      { id: 'card', name: 'Karta płatnicza', icon: CreditCardIcon },
      { id: 'payu', name: 'PayU', icon: PayUIcon },
      { id: 'revolut', name: 'RevolutPay', icon: RevolutPayIcon },
      { id: 'transfer', name: 'Przelew', icon: BuildingLibraryIcon },
      { id: 'cash', name: 'Płatność przy odbiorze', icon: BanknotesIcon },
  ];

  return (
    <div className="bg-background text-foreground">
      <Seo
        title="Transfery VIP Tesla"
        description="Zamów profesjonalny i dyskretny transfer VIP naszą luksusową flotą Tesli. Idealne na lotnisko, spotkania biznesowe i specjalne okazje."
      />
      
      <div ref={mapRef} className="w-full h-[40vh] bg-secondary relative">
          {MAPS_API_KEY === 'TUTAJ_WSTAW_SWOJ_KLUCZ_API' && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-4 z-10">
                <div>
                    <h3 className="text-xl font-bold">Mapa jest nieaktywna</h3>
                    <p className="mt-2 text-sm">Wprowadź klucz API Google Maps w pliku <code className="bg-white/20 px-1 rounded">configs/mapsConfig.ts</code>, aby ją włączyć.</p>
                </div>
            </div>
          )}
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
            <div className="lg:col-span-2">
                <form className="space-y-10">
                    <section>
                        <div className="flex gap-2 mb-8">
                            <Button
                                type="button"
                                variant={transferType === 'self' ? 'primary' : 'secondary'}
                                onClick={() => setTransferType('self')}
                                className="rounded-full"
                            >
                                Dla siebie
                            </Button>
                            <Button
                                type="button"
                                variant={transferType === 'someone' ? 'primary' : 'secondary'}
                                onClick={() => setTransferType('someone')}
                                className="rounded-full"
                            >
                                Dla kogoś
                            </Button>
                            <Button
                                type="button"
                                variant={transferType === 'package' ? 'primary' : 'secondary'}
                                onClick={() => setTransferType('package')}
                                className="rounded-full"
                            >
                                Paczka
                            </Button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="pickupDate">Kiedy</Label>
                                <div className="grid sm:grid-cols-2 gap-4 mt-1">
                                    <Input id="pickupDate" type="date" value={pickupDate} onChange={e => setPickupDate(e.target.value)} min={today} required />
                                    <div className="relative">
                                        <select id="pickupTime" value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-12 appearance-none" required>
                                            {availableTimeOptions.length > 0 ? (
                                                availableTimeOptions.map(t => <option key={t} value={t}>{t}</option>)
                                            ) : (
                                                <option disabled>Brak dostępnych godzin</option>
                                            )}
                                        </select>
                                        <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="pickupAddress">Skąd</Label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <div className="w-2.5 h-2.5 bg-muted-foreground rounded-full" />
                                        </div>
                                        <Input id="pickupAddress" ref={pickupInputRef} placeholder="Wpisz adres początkowy" required className="pl-10" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="destinationAddress">Dokąd</Label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                            <div className="w-2.5 h-2.5 bg-foreground" />
                                        </div>
                                        <Input id="destinationAddress" ref={destinationInputRef} placeholder="Wpisz adres docelowy" required className="pl-10"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold tracking-tight mb-6">Statystyki trasy</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            <StatCard icon={<ArrowRightIcon className="w-6 h-6" />} title="Dystans" value={routeStats?.distance || '---'} />
                            <StatCard icon={<ClockIcon className="w-6 h-6" />} title="Czas podróży" value={routeStats?.duration || '---'} />
                            <StatCard icon={<CurrencyDollarIcon className="w-6 h-6" />} title="Szacowana cena" value={routeStats?.price ? `${routeStats.price.toFixed(2)} zł` : '---'} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight mb-6">2. Wybór auta</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                           {RENTAL_CARS.filter(c => c.available).map(car => (
                                <ModelCard key={car.id} car={car} isSelected={selectedCar?.id === car.id} onSelect={() => setSelectedCar(car)} />
                           ))}
                        </div>
                    </section>
                    
                     <section>
                        <h2 className="text-2xl font-bold tracking-tight mb-6">3. Dane zamawiającego</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                           <div><Label htmlFor="customerName">Imię i nazwisko</Label><Input id="customerName" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="mt-1"/></div>
                           <div><Label htmlFor="customerPhone">Telefon</Label><Input id="customerPhone" type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} required className="mt-1"/></div>
                           <div className="sm:col-span-2"><Label htmlFor="customerEmail">E-mail</Label><Input id="customerEmail" type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required className="mt-1"/></div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold tracking-tight mb-6">4. Metoda płatności</h2>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {paymentMethods.map(method => {
                                const isSelected = selectedPaymentMethod === method.id;
                                return (
                                    <div key={method.id} onClick={() => setSelectedPaymentMethod(method.id)}
                                        className={`flex items-center gap-4 p-4 cursor-pointer border rounded-lg transition-colors ${isSelected ? 'border-foreground bg-secondary/50' : 'bg-card hover:bg-secondary/25'}`}>
                                        <method.icon className="w-6 h-6 text-foreground" />
                                        <span className="font-medium text-sm">{method.name}</span>
                                        <div className="ml-auto">
                                            <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'border-foreground bg-foreground' : 'border-border'}`}>
                                                {isSelected && <CheckIcon className="w-3 h-3 text-background" strokeWidth={4} />}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                </form>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <div className="space-y-6 bg-secondary p-6 rounded-lg">
                        <h2 className="text-3xl font-bold">Podsumowanie</h2>
                        <div className="space-y-3 border-t border-border pt-4 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Pojazd</span><span className="font-medium text-right">{summary.carName}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Termin</span><span className="font-medium text-right">{summary.date}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Odbiór</span><span className="font-medium text-right max-w-[60%] truncate">{summary.pickup}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Cel</span><span className="font-medium text-right max-w-[60%] truncate">{summary.destination}</span></div>
                             <div className="flex justify-between"><span className="text-muted-foreground">Dystans</span><span className="font-medium text-right">{summary.distance}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Czas</span><span className="font-medium text-right">{summary.duration}</span></div>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-4 mt-2">
                            <span>Do zapłaty</span><span>{summary.price}</span>
                        </div>
                        <Button size="lg" className="w-full">Zapłać</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;