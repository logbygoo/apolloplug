import React, { useEffect, useMemo } from 'react';
import { COMPANY_DETAILS } from '../configs/companyDetails';
import { CAR_FLEET } from '../configs/fleetConfig';
import { LOCATIONS } from '../configs/locationsConfig';
import { ADDITIONAL_OPTIONS, RENTAL_CARS } from '../configs/rentConfig';
import { RENTAL_LANDING_FAQ } from '../configs/rentalLandingFaq';
import { SEO_CONFIG } from '../configs/seoConfig';
import { TRANSFERS_CONFIG } from '../configs/transfersConfig';

const AGENT_PAGE_TITLE = 'Apollo Idea - baza wiedzy oferty';

const stripHtml = (s: string): string => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const formatPrice = (n: number): string => `${n.toLocaleString('pl-PL')} zł`;

const AgentKnowledgePage: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    const setMeta = (name: string, value: string) => {
      const selector = `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute('content');
      el.setAttribute('content', value);
      return () => {
        if (created) {
          el?.remove();
          return;
        }
        if (prev == null) el?.remove();
        else el?.setAttribute('content', prev);
      };
    };

    document.title = AGENT_PAGE_TITLE;
    const restoreRobots = setMeta('robots', 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate');
    const restoreGooglebot = setMeta(
      'googlebot',
      'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate'
    );

    return () => {
      document.title = prevTitle;
      restoreRobots();
      restoreGooglebot();
    };
  }, []);

  const content = useMemo(() => {
    const rentableCars = RENTAL_CARS.filter((c) => c.visible !== false && c.available !== false);
    const fastPickupCars = CAR_FLEET.filter((c) => c.availableIn1h === true);
    const serviceItems = [
      { name: 'Wypozyczalnia', path: '/wypozyczalnia' },
      { name: 'Rezerwacja online', path: '/rezerwacja' },
      { name: 'Auto z kierowca', path: '/transfery' },
      { name: 'Zakup auta EV', path: '/zakup' },
      { name: 'Ubezpieczenia EV', path: '/ubezpieczenia' },
      { name: 'Finansowanie EV', path: '/finansowanie' },
      { name: 'Wrap i naklejki Tesla', path: '/wrap' },
    ];

    const locationList = LOCATIONS.map(
      (l) => `- ${l.title}: ${l.address}${l.price == null || l.price === 0 ? ' (w cenie)' : ` (${formatPrice(l.price)})`}`
    );

    const servicesList = serviceItems.map((svc) => {
      const seo = SEO_CONFIG[svc.path];
      const desc = seo?.description ? stripHtml(seo.description) : 'Opis uslugi niedostepny.';
      return `- ${svc.name} (${svc.path})\n  ${desc}`;
    });

    const rentableCarsList = rentableCars.map((car) => {
      const specs = car.specs
        ? `zasieg: ${car.specs.range}, miejsca: ${car.specs.seating}, 0-100: ${car.specs.acceleration}`
        : 'specyfikacja: brak';
      return `- ${car.name} [${car.id}] - ${specs}`;
    });

    const rentalPriceList: string[] = [];
    rentableCars.forEach((car) => {
      rentalPriceList.push(`- ${car.name} [${car.id}]`);
      if (car.priceTiers?.length) {
        car.priceTiers.forEach((tier) => {
          rentalPriceList.push(
            `  * ${tier.days}: ${formatPrice(tier.pricePerDay)} / dobe, limit ${tier.kmLimitPerDay} km/dobe`
          );
        });
      } else {
        rentalPriceList.push(`  * cena bazowa: ${formatPrice(car.pricePerDay)} / dobe`);
      }
      rentalPriceList.push(`  * kaucja: ${formatPrice(car.deposit ?? 0)}`);
      rentalPriceList.push(`  * koszt ponad limit: ${formatPrice(car.costPerKmOverLimit)} / km`);
    });

    const transferPrices = rentableCars.map((car) => {
      const perKm = TRANSFERS_CONFIG.pricePerKm[car.id];
      const perKmTxt = typeof perKm === 'number' ? `${perKm.toLocaleString('pl-PL')} zl/km` : 'brak';
      return `- ${car.name}: oplata startowa ${formatPrice(TRANSFERS_CONFIG.baseFare)}, dalej ${perKmTxt}`;
    });

    const optionsPricing = ADDITIONAL_OPTIONS.map((opt) => {
      const priceTxt =
        typeof opt.price === 'number'
          ? `${formatPrice(opt.price)}${opt.type === 'per_day' ? ' / dobe' : ''}`
          : `${Object.entries(opt.price)
              .map(([carId, price]) => `${carId}: ${formatPrice(price)}`)
              .join(', ')}${opt.type === 'per_day' ? ' / dobe' : ''}`;
      const freeRule =
        'is_free' in opt && typeof opt.is_free === 'number'
          ? `, gratis od ${opt.is_free} dob, auto-check: ${'is_free_checked' in opt && opt.is_free_checked ? 'tak' : 'nie'}`
          : '';
      return `- ${opt.name}: ${stripHtml(opt.description)}. Cena: ${priceTxt}${freeRule}`;
    });

    const fastPickupList =
      fastPickupCars.length > 0
        ? fastPickupCars.map((car) => `- ${car.name} [${car.id}]`)
        : ['- Obecnie brak aut oznaczonych jako dostepne w 30 min.'];

    const faqList = RENTAL_LANDING_FAQ.flatMap((faq, i) => [
      `${i + 1}. ${stripHtml(faq.question)}`,
      `   Kategorie: ${faq.categories.join(', ')}`,
      `   Odpowiedz: ${stripHtml(faq.answer)}`,
    ]);

    const lines = [
      'Opis o Apollo',
      `${COMPANY_DETAILS.website} to marka uslug EV rozwijana przez ${COMPANY_DETAILS.name}.`,
      stripHtml(SEO_CONFIG['/'].description),
      '',
      'Lista uslug + krotki opis',
      ...servicesList,
      '',
      'Lista aut dostepnych do wypozyczenia',
      ...rentableCarsList,
      '',
      'Cennik aut dostepnych do wypozyczenia',
      ...rentalPriceList,
      '',
      'Cennik uslug dodatkowych (rezerwacja)',
      ...optionsPricing,
      '',
      'Cennik uslugi auto z kierowca',
      ...transferPrices,
      '',
      'Lista aut dostepnych na juz z odbiorem w 30 min',
      ...fastPickupList,
      '',
      'Pelna lista FAQ',
      ...faqList,
      '',
      'Dane kontaktowe',
      `Firma: ${COMPANY_DETAILS.name}`,
      `Adres: ${COMPANY_DETAILS.address}`,
      `NIP: ${COMPANY_DETAILS.nip}`,
      `REGON: ${COMPANY_DETAILS.regon}`,
      `KRS: ${COMPANY_DETAILS.krs}`,
      `Kapital zakladowy: ${COMPANY_DETAILS.capital}`,
      `Telefon: ${COMPANY_DETAILS.phone}`,
      `Email: ${COMPANY_DETAILS.email}`,
      `WWW: ${COMPANY_DETAILS.website}`,
      '',
      'Punkty odbioru i zwrotu',
      ...locationList,
    ];

    return lines.join('\n');
  }, []);

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground md:px-8">
      <pre className="mx-auto w-full max-w-5xl whitespace-pre-wrap break-words font-sans text-sm leading-6">{content}</pre>
    </main>
  );
};

export default AgentKnowledgePage;
