import React, { useEffect, useRef } from 'react';
import { PageHeader } from '../components/ui';
import { PhoneIcon } from '../components/HeroIcons';
import Seo from '../components/Seo';
import { MAPS_API_KEY } from '../configs/mapsConfig';
import { 
  SmsIcon, 
  WhatsAppIcon, 
  TelegramIcon, 
  MessengerIcon, 
  InstagramIcon, 
  TikTokIcon 
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

      const locations = [
        { lat: 52.1755, lng: 20.9427, type: 'supercharger', title: 'Aleja Krakowska 61 (Supercharger)' },
        { lat: 52.2968, lng: 21.1189, type: 'supercharger', title: 'Radzymińska 334, Ząbki (Supercharger)' },
        { lat: 52.2272, lng: 20.9023, type: 'greenway', title: 'Batalionów Chłopskich 73 (Greenway)' },
      ];
      
      const superchargerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
            <path d="M13.5 2.25a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zM13.125 6a.75.75 0 00-1.25 0v3.375a.75.75 0 001.5 0V6.375a.75.75 0 00-.25-.563zM10.875 6a.75.75 0 011.25 0v3.375a.75.75 0 01-1.5 0V6.375a.75.75 0 01.25-.563zM12 9.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM12 15a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zM13.125 15.188a.75.75 0 00-1.25 0v3.187a.75.75 0 001.5 0v-3.188a.75.75 0 00-.25-.562zM10.875 15.188a.75.75 0 011.25 0v3.187a.75.75 0 01-1.5 0v-3.188a.75.75 0 01.25-.562z" />
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
            <path d="M12.53 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06z" />
            <path d="M15.53 11.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06z" />
        </svg>`;

      const greenwaySvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>`;

      const superchargerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<div style="width:36px;height:36px;border-radius:50%;background-color:#ef4444;display:flex;align-items:center;justify-content:center;">${superchargerSvg}</div>`),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };

      const greenwayIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<div style="width:36px;height:36px;border-radius:50%;background-color:#22c55e;display:flex;align-items:center;justify-content:center;">${greenwaySvg}</div>`),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };


      locations.forEach(loc => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.title,
          icon: loc.type === 'supercharger' ? superchargerIcon : greenwayIcon,
        });
      });
    });
  }, []);

  return (
    <div ref={mapRef} className="w-full h-[500px] bg-secondary rounded-lg overflow-hidden relative">
      {MAPS_API_KEY === 'TUTAJ_WSTAW_SWOJ_KLUCZ_API' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-4 z-10">
          <div>
            <h3 className="text-xl font-bold">Mapa jest nieaktywna</h3>
            <p className="mt-2 text-sm">Wprowadź klucz API Google Maps, aby ją włączyć.</p>
          </div>
        </div>
      )}
    </div>
  );
};


const ContactPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Kontakt' }];

  const contactMethods = [
    { name: 'Telefon', icon: PhoneIcon, href: 'tel:500308400' },
    { name: 'SMS', icon: SmsIcon, href: 'sms:500308400' },
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
                        <method.icon className="w-10 h-10 text-muted-foreground group-hover:text-foreground transition-colors" />
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
                    <p>ApolloPlug Sp. z o.o.</p>
                    <p>ul. Elektryczna 1</p>
                    <p>00-001 Warszawa</p>
                    <p>NIP: 123-456-78-90</p>
                    <p>REGON: 1234567890</p>
                </div>
            </section>
            <section>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Licencja Taxi Premium</h2>
                  <div className="bg-secondary p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold text-foreground">Warszawa</p>
                    <p className="text-sm text-muted-foreground">Licencja nr 12345/XYZ/2024</p>
                </div>
            </section>
        </div>

        <section>
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Punkty odbioru</h2>
            <ContactMap />
        </section>
      </div>
    </div>
  );
};

export default ContactPage;