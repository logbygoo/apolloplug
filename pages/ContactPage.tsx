import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/ui';
import { PhoneIcon } from '../components/HeroIcons';
import Seo from '../components/Seo';
import { MAPS_API_KEY } from '../configs/mapsConfig';
import { 
  EnvelopeIcon, 
  WhatsAppIcon, 
  TelegramIcon, 
  MessengerIcon, 
  InstagramIcon, 
  TikTokIcon,
  superchargerMapIconSvg,
  greenwayMapIconSvg,
  pickupPointMapIconSvg,
  ArrowTopRightOnSquareIcon
} from '../components/HeroIcons';

// Declare google for TypeScript
declare const google: any;

const loadGoogleMapsScript = (callback: () => void) => {
  if (typeof google !== 'undefined' && google.maps) {
    callback();
    return;
  }
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=marker`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
     existingScript.addEventListener('load', callback);
  }
};

interface Location {
  lat: number;
  lng: number;
  type: 'supercharger' | 'greenway' | 'pickup_point';
  title: string;
  address: string;
  price?: number | null;
}

const locations: Location[] = [
  { lat: 52.1657, lng: 20.9671, type: 'pickup_point', title: 'Lotnisko Chopina', address: 'Żwirki i Wigury 1, Warszawa', price: 0 },
  { lat: 52.2619, lng: 20.9100, type: 'pickup_point', title: 'Lotnisko Babice', address: 'gen. S. Kaliskiego 57, Warszawa', price: 100 },
  { lat: 52.2280, lng: 21.0035, type: 'pickup_point', title: 'Warszawa Centralna', address: 'Aleje Jerozolimskie 54, Warszawa', price: 0 },
  { lat: 52.1755, lng: 20.9427, type: 'supercharger', title: 'Supercharger Aleja Krakowska 61', address: 'Aleja Krakowska 61, Warszawa', price: null },
  { lat: 52.2968, lng: 21.1189, type: 'supercharger', title: 'Supercharger Radzymińska 334', address: 'Radzymińska 334, Ząbki', price: null },
  { lat: 52.2272, lng: 20.9023, type: 'greenway', title: 'Greenway Batalionów Chłopskich 73', address: 'Batalionów Chłopskich 73, Warszawa', price: null },
];

const ContactMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 52.23, lng: 20.99 },
        zoom: 11,
        disableDefaultUI: true,
        styles: [{ stylers: [{ saturation: -100 }] }],
      });
      
      const superchargerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(superchargerMapIconSvg),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };

      const greenwayIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(greenwayMapIconSvg),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };

      const pickupPointIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(pickupPointMapIconSvg),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };

      const getIcon = (type: Location['type']) => {
        switch (type) {
          case 'supercharger': return superchargerIcon;
          case 'greenway': return greenwayIcon;
          case 'pickup_point': return pickupPointIcon;
          default: return undefined;
        }
      }

      locations.forEach(loc => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.title,
          icon: getIcon(loc.type),
        });
      });
    });
  }, []);

  return (
    <div ref={mapRef} className="w-full h-[500px] bg-secondary rounded-lg overflow-hidden relative" />
  );
};

const LocationItem: React.FC<{ location: Location }> = ({ location }) => {
  const getIconSvg = (type: Location['type']) => {
    switch (type) {
      case 'supercharger': return superchargerMapIconSvg;
      case 'greenway': return greenwayMapIconSvg;
      case 'pickup_point': return pickupPointMapIconSvg;
      default: return '';
    }
  };
  
  const iconSrc = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(getIconSvg(location.type))}`;
  const navLink = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-border last:border-b-0">
      <img src={iconSrc} alt={`${location.type} icon`} className="w-9 h-9 flex-shrink-0"/>
      <div className="flex-grow">
        <h3 className="font-semibold text-foreground">{location.title}</h3>
        <p className="text-sm text-muted-foreground">{location.address}</p>
        {location.price !== null && typeof location.price !== 'undefined' && (
          <p className="text-sm text-foreground mt-1">
            {location.price > 0 ? `Wydanie/zwrot: ${location.price} zł` : 'Wydanie/zwrot bezpłatny'}
          </p>
        )}
      </div>
      <a href={navLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors p-2 rounded-md bg-secondary hover:bg-muted">
        <span className="hidden sm:inline">Nawiguj</span>
        <ArrowTopRightOnSquareIcon className="w-5 h-5"/>
      </a>
    </div>
  );
};


const ContactPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Kontakt' }];

  const contactMethods = [
    { name: 'Telefon', icon: PhoneIcon, href: 'tel:500308400' },
    { name: 'SMS', icon: EnvelopeIcon, href: 'sms:500308400' },
    { name: 'WhatsApp', icon: WhatsAppIcon, href: 'https://wa.me/48500308400' },
    { name: 'Telegram', icon: TelegramIcon, href: 'https://t.me/apolloplug' },
    { name: 'Messenger', icon: MessengerIcon, href: 'https://m.me/apolloplug' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/apolloplug' },
    { name: 'TikTok', icon: TikTokIcon, href: 'https://tiktok.com/@apolloplug' },
  ];

  return (
    <div className="bg-background">
      <Seo
        title="Kontakt"
        description="Skontaktuj się z nami w sprawie wynajmu Tesli, transferów VIP lub inwestycji. Jesteśmy dostępni telefonicznie, mailowo oraz w naszym biurze w Warszawie."
      />
      <PageHeader 
        title="Kontakt"
        subtitle="Masz pytania? Chcesz nawiązać współpracę? Jesteśmy do Twojej dyspozycji."
        breadcrumbs={breadcrumbs}
      />
      <div className="container mx-auto max-w-4xl px-4 md:px-6 pb-16 md:pb-24 space-y-16">
        <div className="text-center">
            <a href="tel:500308400" className="text-4xl md:text-6xl font-bold tracking-tight text-foreground hover:text-primary transition-colors block">
                500 308 400
            </a>
            <a href="mailto:office@apolloplug.com" className="mt-4 text-xl md:text-2xl text-muted-foreground hover:text-primary transition-colors block">
                office@apolloplug.com
            </a>
        </div>

        <section className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Wybierz formę kontaktu</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-6 max-w-3xl mx-auto">
                {contactMethods.map(method => (
                    <a key={method.name} href={method.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 p-4 bg-secondary rounded-lg hover:bg-muted transition-colors group">
                        <method.icon className="w-10 h-10 group-hover:text-foreground transition-colors" />
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{method.name}</span>
                    </a>
                ))}
            </div>
            <p className="mt-8 text-muted-foreground">Możesz się z nami kontaktować w dowolny, ulubiony sposób.</p>
        </section>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Podmiot odpowiedzialny</h2>
                <div className="text-muted-foreground space-y-1">
                    <p>apolloplug.com należy do forfinance sp. z o.o., ul. grzybowska 97, 00-844 warszawa, nip: 527-283-91-27, tel. 500-308-400, mail. office@apolloplug.com</p>
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Licencja Taxi Premium</h2>
                  <div className="bg-secondary p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold text-foreground">Warszawa</p>
                    <p className="text-sm text-muted-foreground"></p>
                </div>
            </section>
        </div>

        <section>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Punkty odbioru i ładowania</h2>
            <div className="mb-6 bg-card border border-border rounded-lg p-4">
              {locations.map(loc => <LocationItem key={loc.title} location={loc} />)}
            </div>
            <ContactMap />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
