import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Input, Label, Button } from '../components/ui';
import { RENTAL_CARS } from '../configs/rentConfig';
import { MAPS_API_KEY } from '../configs/mapsConfig';
import { TRANSFERS_CONFIG } from '../configs/transfersConfig';
import { CreditCardIcon, CheckIcon, ChevronDownIcon, ClockIcon, ArrowRightIcon, CurrencyDollarIcon, CalendarDaysIcon } from '../components/HeroIcons';
import type { Car } from '../types';
import Seo from '../components/Seo';
import { createTransferAdminEmailPayload, createTransferCustomerEmailPayload } from '../configs/notifications/emailTemplates';
import { createTransferAdminSmsPayload, createTransferCustomerSmsPayload } from '../configs/notifications/smsTemplates';

// Declare the global 'google' object to fix TypeScript errors.
declare const google: any;

// Helper to load Google Maps script
const loadGoogleMapsScript = (callback: () => void) => {
  if (typeof google !== 'undefined' && google.maps && google.maps.marker) {
    callback();
    return;
  }
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,directions,marker`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
     existingScript.addEventListener('load', callback);
  }
};

const today = new Date().toISOString().split('T')[0];
const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
});

interface HourlyPackage {
  id: string;
  label: string;
  price: number;
}

const hourlyPackages: HourlyPackage[] = [
  { id: '1h', label: '1h - 290zl', price: 290 },
  { id: '3h', label: '3h - 790 zł', price: 790 },
  { id: '6h', label: '6h - 1490 zł', price: 1490 },
  { id: '10h', label: '10h - 2390 zł', price: 2390 },
];

export interface TransferFormData {
    pickupDate: string;
    pickupTime: string;
    pickupAddress: any | null;
    destinationAddress: any | null;
    transferType: 'someone' | 'package' | 'hourly';
    selectedCar: Car | null;
    selectedPackage: HourlyPackage | null;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    driverMessage: string;
}

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

const PackageCard: React.FC<{ item: HourlyPackage; isSelected: boolean; onSelect: () => void; }> = ({ item, isSelected, onSelect }) => (
    <div
        onClick={onSelect}
        className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer ${
            isSelected ? 'border-foreground bg-secondary/50' : 'border-border bg-card hover:bg-secondary/25'
        }`}
    >
        <div className="flex items-center gap-4">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'border-foreground bg-foreground' : 'border-border'}`}>
                {isSelected && <CheckIcon className="w-3 h-3 text-background" strokeWidth={4} />}
            </div>
            <p className="font-medium">{item.label}</p>
        </div>
        <span className="text-sm font-semibold">{item.price} zł</span>
    </div>
);


const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-secondary p-4 rounded-lg flex items-center gap-4">
        <div className="text-foreground/70">{icon}</div>
        <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="font-bold text-lg">{value}</p>
        </div>
    </div>
);

const AgreementCheckbox: React.FC<{
  id: string;
  label: React.ReactNode;
  isChecked: boolean;
  onToggle: () => void;
}> = ({ id, label, isChecked, onToggle }) => (
    <div className="flex items-start">
        <label htmlFor={id} className="flex items-start cursor-pointer group">
            <input id={id} type="checkbox" checked={isChecked} onChange={onToggle} className="absolute w-0 h-0 opacity-0" />
            <div className={`relative mt-0.5 mr-3 h-5 w-5 rounded-sm flex-shrink-0 flex items-center justify-center transition-all ${isChecked ? 'bg-foreground' : 'bg-secondary'}`}>
                {isChecked && <CheckIcon className="w-3.5 h-3.5 text-background" strokeWidth={3} />}
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
        </label>
    </div>
);

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

const TransfersPage: React.FC = () => {
  const [map, setMap] = useState<any | null>(null);
  const [directionsService, setDirectionsService] = useState<any | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(null);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<'details' | 'customer' | 'payment' | 'submitted'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TransferFormData>({
    pickupDate: today,
    pickupTime: getInitialPickupTime(),
    pickupAddress: null,
    destinationAddress: null,
    transferType: 'someone',
    selectedCar: RENTAL_CARS.find(c => c.available) || null,
    selectedPackage: null,
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    driverMessage: '',
  });

  const [routeStats, setRouteStats] = useState<{ distance: string; duration: string; price: number } | null>(null);
  const [mapMarkers, setMapMarkers] = useState<{ pickup: any | null, destination: any | null }>({ pickup: null, destination: null });
  const [userLocationMarker, setUserLocationMarker] = useState<any | null>(null);
  const [agreements, setAgreements] = useState({ terms: false, marketing: false });

  const setFormValue = <K extends keyof TransferFormData>(key: K, value: TransferFormData[K]) => {
      setFormData(prev => ({...prev, [key]: value}));
  };

  const availableTimeOptions = useMemo(() => {
    if (formData.pickupDate !== today) {
        return timeOptions;
    }
    const earliestPickupDate = new Date();
    earliestPickupDate.setMinutes(earliestPickupDate.getMinutes() + 60);
    if (earliestPickupDate.toISOString().split('T')[0] !== today) return [];
    const earliestHour = earliestPickupDate.getHours();
    const earliestMinute = earliestPickupDate.getMinutes();
    return timeOptions.filter(time => {
        const [h, m] = time.split(':').map(Number);
        if (h > earliestHour) return true;
        if (h === earliestHour && m >= earliestMinute) return true;
        return false;
    });
  }, [formData.pickupDate]);

  useEffect(() => {
    const earliestPickupDate = new Date();
    earliestPickupDate.setMinutes(earliestPickupDate.getMinutes() + 60);
    const earliestDateString = earliestPickupDate.toISOString().split('T')[0];
    if (formData.pickupDate < earliestDateString) {
      setFormValue('pickupDate', earliestDateString);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!availableTimeOptions.includes(formData.pickupTime)) {
        setFormValue('pickupTime', availableTimeOptions[0] || '');
    }
  }, [availableTimeOptions, formData.pickupTime]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;
      class PulsingDotOverlay extends google.maps.OverlayView {
          private position: any;
          private div: HTMLDivElement | null;
          constructor(position: any) { super(); this.position = position; this.div = null; }
          onAdd() {
              this.div = document.createElement('div');
              this.div.className = 'pulsing-dot';
              this.div.style.position = 'absolute';
              this.getPanes()!.overlayMouseTarget.appendChild(this.div);
          }
          draw() {
              const overlayProjection = this.getProjection();
              if (!overlayProjection || !this.div) return;
              const sw = overlayProjection.fromLatLngToDivPixel(this.position);
              this.div.style.left = (sw.x - 9) + 'px';
              this.div.style.top = (sw.y - 9) + 'px';
          }
          onRemove() {
              if (this.div) { (this.div.parentNode as HTMLElement).removeChild(this.div); this.div = null; }
          }
      }
      
      const mapInstance = new google.maps.Map(mapRef.current, { center: { lat: 52.2297, lng: 21.0122 }, zoom: 12, disableDefaultUI: true, styles: [{ stylers: [{ saturation: -100 }] }], });
      setMap(mapInstance);
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: mapInstance, suppressMarkers: true }));

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
            mapInstance.setCenter(userLocation);
            mapInstance.setZoom(15);
            if (userLocationMarker) userLocationMarker.setMap(null);
            const marker = new PulsingDotOverlay(new google.maps.LatLng(userLocation));
            marker.setMap(mapInstance);
            setUserLocationMarker(marker);
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: userLocation }, (results: any, status: any) => {
                if (status === 'OK' && results && results[0]) {
                    if (pickupInputRef.current) pickupInputRef.current.value = results[0].formatted_address;
                    const placeResult = { name: results[0].address_components[0]?.short_name || 'Twoja lokalizacja', formatted_address: results[0].formatted_address, geometry: { location: results[0].geometry.location } };
                    setFormValue('pickupAddress', placeResult);
                }
            });
          }, () => {}, { enableHighAccuracy: true }
        );
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!map || !pickupInputRef.current || !destinationInputRef.current) return;
    const setupAutocomplete = (inputRef: React.RefObject<HTMLInputElement>, setAddress: (place: any | null) => void) => {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current!);
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(['name', 'geometry', 'formatted_address']);
        autocomplete.addListener('place_changed', () => { const place = autocomplete.getPlace(); if (place.geometry) setAddress(place); });
        return autocomplete;
    };
    setupAutocomplete(pickupInputRef, (p) => setFormValue('pickupAddress', p));
    setupAutocomplete(destinationInputRef, (p) => setFormValue('destinationAddress', p));
  }, [map]);

  useEffect(() => {
    if (formData.transferType === 'hourly') {
        setFormValue('destinationAddress', null);
        if (destinationInputRef.current) destinationInputRef.current.value = '';
        setRouteStats(null);
        directionsRenderer?.setDirections({ routes: [] });
    } else {
        setFormValue('selectedPackage', null);
    }
  }, [formData.transferType, directionsRenderer]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateRoute = useCallback(() => {
    if (formData.transferType === 'hourly' || !directionsService || !directionsRenderer || !formData.pickupAddress?.geometry?.location || !formData.destinationAddress?.geometry?.location) {
      if (formData.transferType !== 'hourly') {
          setRouteStats(null);
          directionsRenderer?.setDirections({ routes: [] });
      }
      return;
    }
    directionsService.route({ origin: formData.pickupAddress.geometry.location, destination: formData.destinationAddress.geometry.location, travelMode: google.maps.TravelMode.DRIVING },
      (result: any, status: any) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          if (route.distance && route.duration && formData.selectedCar) {
            const distanceKm = route.distance.value / 1000;
            const pricePerKm = TRANSFERS_CONFIG.pricePerKm[formData.selectedCar.id] || 3.0;
            const price = TRANSFERS_CONFIG.baseFare + distanceKm * pricePerKm;
            setRouteStats({ distance: route.distance.text, duration: route.duration.text, price: price });
          }
        } else {
          setRouteStats(null);
        }
      }
    );
  }, [directionsService, directionsRenderer, formData.pickupAddress, formData.destinationAddress, formData.selectedCar, formData.transferType]);

  useEffect(() => {
    if (map) {
        mapMarkers.pickup?.setMap(null);
        mapMarkers.destination?.setMap(null);
        const newMarkers: { pickup: any | null, destination: any | null } = { pickup: null, destination: null };
        const pickupIcon = { path: google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#6b7280', fillOpacity: 1, strokeWeight: 0 };
        const destinationIcon = { path: 'M-4 -4 H 4 V 4 H -4 Z', scale: 2, fillColor: '#111827', fillOpacity: 1, strokeWeight: 0, anchor: new google.maps.Point(0, 0) };
        if(formData.pickupAddress?.geometry?.location) newMarkers.pickup = new google.maps.Marker({ position: formData.pickupAddress.geometry.location, map: map, title: "Odbiór", icon: pickupIcon });
        if(formData.destinationAddress?.geometry?.location) newMarkers.destination = new google.maps.Marker({ position: formData.destinationAddress.geometry.location, map: map, title: "Cel", icon: destinationIcon });
        setMapMarkers(newMarkers);
    }
    calculateRoute();
  }, [formData.pickupAddress, formData.destinationAddress, map, calculateRoute]);

  const summary = useMemo(() => {
    const carName = formData.selectedCar?.name || '-';
    const date = `${new Date(formData.pickupDate).toLocaleDateString('pl-PL')} ${formData.pickupTime}`;
    const pickup = formData.pickupAddress?.name || '-';
    
    let price = 0;
    let priceText = '-';
    let destination = '-';
    let distance = '-';
    let duration = '-';

    if (formData.transferType === 'hourly') {
        price = formData.selectedPackage?.price || 0;
        destination = 'Usługa na godziny';
        distance = formData.selectedPackage?.label || '-';
    } else {
        price = routeStats?.price || 0;
        destination = formData.destinationAddress?.name || '-';
        distance = routeStats?.distance || '-';
        duration = routeStats?.duration || '-';
    }
    priceText = price > 0 ? price.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' }) : '-';

    return { carName, date, pickup, destination, distance, duration, price: priceText, rawPrice: price };
  }, [formData, routeStats]);
  
  const handleNextStep = (e: React.FormEvent) => {
      e.preventDefault();
      if (step === 'details') {
          // Add validation for step 1
          setStep('customer');
      } else if (step === 'customer') {
          // Add validation for step 2
          if (!agreements.terms) {
            alert("Proszę zaakceptować regulamin.");
            return;
          }
          setStep('payment');
      } else if (step === 'payment') {
          handleFinalSubmit();
      }
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
        const adminEmailPayload = createTransferAdminEmailPayload(formData, summary);
        const adminEmailResponse = await fetch("https://mail.apolloplug.com", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(adminEmailPayload),
        });
        if (!adminEmailResponse.ok) throw new Error("Admin email failed");

        // Fire and forget customer/sms notifications
        const customerEmailPayload = createTransferCustomerEmailPayload(formData, summary);
        fetch("https://mail.apolloplug.com", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerEmailPayload),
        }).catch(e => console.warn("Customer email failed", e));
        
        const adminSmsPayload = createTransferAdminSmsPayload(formData, summary);
        fetch("https://apollosms.spam01.workers.dev/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(adminSmsPayload) }).catch(e => console.warn("Admin SMS failed", e));
        
        const customerSmsPayload = createTransferCustomerSmsPayload(formData);
        fetch("https://apollosms.spam01.workers.dev/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(customerSmsPayload) }).catch(e => console.warn("Customer SMS failed", e));

        setStep('submitted');
    } catch (error) {
        console.error("Failed to submit transfer order:", error);
        alert("Wystąpił błąd podczas wysyłania zamówienia. Proszę spróbować ponownie.");
    } finally {
        setIsLoading(false);
    }
  };

    const getButtonText = () => {
        if (isLoading) return 'Przetwarzanie...';
        switch (step) {
            case 'details': return 'Przejdź do danych';
            case 'customer': return 'Przejdź do płatności';
            case 'payment': return 'Zapłać i zamów';
            default: return '';
        }
    };
    
    const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
      <textarea
        className={`block py-2.5 px-0 w-full text-sm text-foreground bg-transparent border-0 border-b-2 border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary peer min-h-[120px] ${className}`}
        ref={ref} {...props}
      />
    ));

    if (step === 'submitted') {
      return (
        <div className="container mx-auto max-w-2xl px-4 md:px-6 py-32 text-center flex flex-col items-center justify-center min-h-[calc(100vh-112px)]">
          <h1 className="text-4xl font-bold tracking-tight">Dziękujemy za zamówienie!</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Potwierdzenie zamówienia na {formData.selectedCar?.name} zostało wysłane na adres {formData.customerEmail}.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-8" variant="primary">
            Zamów kolejny przejazd
          </Button>
        </div>
      );
    }

    const pillButtonClasses = (isActive: boolean) =>
      `inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium h-11 px-8 transition-colors disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`;


  return (
    <div className="bg-background text-foreground">
      <Seo title="Transfery VIP Tesla" description="Zamów profesjonalny i dyskretny transfer VIP naszą luksusową flotą Tesli. Idealne na lotnisko, spotkania biznesowe i specjalne okazje." />
      <div ref={mapRef} className="w-full h-[40vh] bg-secondary relative">
          {MAPS_API_KEY === 'TUTAJ_WSTAW_SWOJ_KLUCZ_API' && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-4 z-10">
                <div> <h3 className="text-xl font-bold">Mapa jest nieaktywna</h3> <p className="mt-2 text-sm">Wprowadź klucz API Google Maps w pliku <code className="bg-white/20 px-1 rounded">configs/mapsConfig.ts</code>, aby ją włączyć.</p> </div>
            </div>
          )}
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
            <div className="lg:col-span-2">
                <form id="transfer-form" className="space-y-10" onSubmit={handleNextStep}>
                    {step === 'details' && (
                        <>
                            <section>
                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <span className='font-medium text-sm text-muted-foreground'>Wybierz rodzaj podróży</span>
                                    <button type="button" onClick={() => setFormValue('transferType', 'someone')} className={pillButtonClasses(formData.transferType === 'someone')}>Dla kogoś</button>
                                    <button type="button" onClick={() => setFormValue('transferType', 'package')} className={pillButtonClasses(formData.transferType === 'package')}>Paczka</button>
                                    <button type="button" onClick={() => setFormValue('transferType', 'hourly')} className={pillButtonClasses(formData.transferType === 'hourly')}>Kierowca na godziny</button>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <Input id="pickupDate" type="date" value={formData.pickupDate} onChange={e => setFormValue('pickupDate', e.target.value)} min={today} required className="pr-10 h-10" />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><CalendarDaysIcon className="h-5 w-5 text-muted-foreground" /></div>
                                        </div>
                                        <div className="relative">
                                            <select id="pickupTime" value={formData.pickupTime} onChange={e => setFormValue('pickupTime', e.target.value)} className="block w-full rounded-md bg-secondary px-3 text-sm ring-offset-background border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 appearance-none" required>{availableTimeOptions.length > 0 ? availableTimeOptions.map(t => <option key={t} value={t}>{t}</option>) : <option disabled>Brak dostępnych godzin</option>}</select>
                                            <ChevronDownIcon className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-muted-foreground pointer-events-none"/>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><div className="w-2.5 h-2.5 bg-muted-foreground rounded-full" /></div>
                                        <Input id="pickupAddress" ref={pickupInputRef} placeholder=" " required className="pl-10" />
                                        <Label htmlFor="pickupAddress" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-10 peer-focus:start-10 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skąd</Label>
                                    </div>
                                    {formData.transferType !== 'hourly' ? (
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><div className="w-2.5 h-2.5 bg-foreground" /></div>
                                            <Input id="destinationAddress" ref={destinationInputRef} placeholder=" " required className="pl-10"/>
                                            <Label htmlFor="destinationAddress" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] start-10 peer-focus:start-10 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dokąd</Label>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 pt-4">
                                            <p className="text-sm font-medium">Wybierz pakiet godzin</p>
                                            {hourlyPackages.map(pkg => <PackageCard key={pkg.id} item={pkg} isSelected={formData.selectedPackage?.id === pkg.id} onSelect={() => setFormValue('selectedPackage', pkg)} />)}
                                        </div>
                                    )}
                                </div>
                            </section>
                            {formData.transferType !== 'hourly' && (
                                <section><h2 className="text-2xl font-bold tracking-tight mb-6">Statystyki trasy</h2><div className="grid sm:grid-cols-3 gap-4"><StatCard icon={<ArrowRightIcon className="w-6 h-6" />} title="Dystans" value={routeStats?.distance || '---'} /><StatCard icon={<ClockIcon className="w-6 h-6" />} title="Czas podróży" value={routeStats?.duration || '---'} /><StatCard icon={<CurrencyDollarIcon className="w-6 h-6" />} title="Szacowana cena" value={routeStats?.price ? `${routeStats.price.toFixed(2)} zł` : '---'} /></div></section>
                            )}
                            <section><h2 className="text-2xl font-bold tracking-tight mb-6">Wybór auta</h2><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{RENTAL_CARS.filter(c => c.available).map(car => (<ModelCard key={car.id} car={car} isSelected={formData.selectedCar?.id === car.id} onSelect={() => setFormValue('selectedCar', car)} />))}</div></section>
                        </>
                    )}
                    {step === 'customer' && (
                        <section><h2 className="text-2xl font-bold tracking-tight mb-6">Dane zamawiającego</h2><div className="grid sm:grid-cols-2 gap-8">
                            <div className="relative"><Input id="customerName" placeholder=" " value={formData.customerName} onChange={e => setFormValue('customerName', e.target.value)} required /><Label htmlFor="customerName" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Imię i nazwisko</Label></div>
                            <div className="relative"><Input id="customerPhone" type="tel" placeholder=" " value={formData.customerPhone} onChange={e => setFormValue('customerPhone', e.target.value)} required /><Label htmlFor="customerPhone" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telefon</Label></div>
                            <div className="sm:col-span-2 relative"><Input id="customerEmail" type="email" placeholder=" " value={formData.customerEmail} onChange={e => setFormValue('customerEmail', e.target.value)} required /><Label htmlFor="customerEmail" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</Label></div>
                            <div className="sm:col-span-2 relative"><Textarea id="driverMessage" placeholder=" " value={formData.driverMessage} onChange={e => setFormValue('driverMessage', e.target.value)} /><Label htmlFor="driverMessage" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Wiadomość dla kierowcy (opcjonalnie)</Label></div>
                            <div className="sm:col-span-2 space-y-3"><AgreementCheckbox id="terms" label={<>Akceptuję regulamin świadczenia usług.*</>} isChecked={agreements.terms} onToggle={() => setAgreements(p => ({...p, terms: !p.terms}))} /><AgreementCheckbox id="marketing" label="Wyrażam zgodę na otrzymywanie informacji handlowych." isChecked={agreements.marketing} onToggle={() => setAgreements(p => ({...p, marketing: !p.marketing}))} /></div></div></section>
                    )}
                    {step === 'payment' && (
                        <section>
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Metoda płatności</h2>
                            <div className="space-y-3">
                                <div className="border rounded-lg transition-colors duration-300 border-sky-300">
                                    <div className="flex items-center gap-4 p-4 cursor-default transition-colors bg-secondary/50 rounded-t-lg">
                                        <CreditCardIcon className="w-8 h-8 text-foreground" />
                                        <span className="font-medium">Karta płatnicza</span>
                                        <div className="ml-auto">
                                            <div className="h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all border-foreground bg-foreground">
                                                <CheckIcon className="w-3.5 h-3.5 text-background" strokeWidth={4} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="p-6 bg-sky-50 border-t border-sky-300">
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">Dane karty płatniczej</h3>
                                                <div className="grid gap-8">
                                                    <div className="relative">
                                                        <Input id="cardNumber" placeholder=" " required className="bg-transparent" />
                                                        <Label htmlFor="cardNumber" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Numer karty</Label>
                                                        <CreditCardIcon className="absolute right-0 top-2.5 w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-8">
                                                        <div className="relative">
                                                            <Input id="cardExpiry" placeholder=" " required className="bg-transparent" />
                                                             <Label htmlFor="cardExpiry" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data ważności (MM/RR)</Label>
                                                        </div>
                                                        <div className="relative">
                                                            <Input id="cardCVC" placeholder=" " required className="bg-transparent" />
                                                            <Label htmlFor="cardCVC" className="absolute text-sm text-muted-foreground duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kod CVC</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
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
                            <div className="flex justify-between"><span className="text-muted-foreground">Dystans/Pakiet</span><span className="font-medium text-right">{summary.distance}</span></div>
                            {formData.transferType !== 'hourly' && <div className="flex justify-between"><span className="text-muted-foreground">Czas</span><span className="font-medium text-right">{summary.duration}</span></div>}
                        </div>
                        <div className="flex justify-between text-xl font-bold text-primary border-t border-border pt-4 mt-2">
                            <span>Do zapłaty</span><span>{summary.price}</span>
                        </div>
                        <Button form="transfer-form" type="submit" size="lg" className="w-full" disabled={isLoading || summary.rawPrice <= 0}>{getButtonText()}</Button>
                        {step === 'customer' && <Button onClick={() => setStep('details')} variant="secondary" className="w-full" type="button" disabled={isLoading}>Wróć do szczegółów</Button>}
                        {step === 'payment' && <Button onClick={() => setStep('customer')} variant="secondary" className="w-full" type="button" disabled={isLoading}>Wróć do danych</Button>}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransfersPage;