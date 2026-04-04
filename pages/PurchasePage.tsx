import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Button } from '../components/ui';
import Seo from '../components/Seo';
import { DocumentTextIcon, KeyIcon, BanknotesIcon, ShieldCheckIcon, SparklesIcon, HomeIcon } from '../icons';
import { SEO_CONFIG } from '../configs/seoConfig';
import { TESLA_REFERRAL_LINK, purchaseReferralBanner } from '../configs/purchaseConfig';
import { CheckIcon } from '../icons';

const features = [
  {
    icon: DocumentTextIcon,
    title: 'Cały proces w jednym miejscu',
    description: 'Zapomnij o skomplikowanych formularzach i dziesiątkach telefonów. Poprowadzimy Cię przez cały proces zamówienia, od wyboru idealnej konfiguracji, przez złożenie zamówienia u producenta, aż po finalizację formalności. Monitorujemy każdy etap, informując Cię na bieżąco.',
  },
  {
    icon: KeyIcon,
    title: 'Auto zastępcze na czas oczekiwania',
    description: 'Oczekiwanie na nowe auto nie musi oznaczać przerwy w mobilności. Na preferencyjnych warunkach udostępnimy Ci jeden z naszych pojazdów elektrycznych, abyś mógł komfortowo jeździć, aż do dnia odbioru Twojego wymarzonego samochodu.',
  },
  {
    icon: BanknotesIcon,
    title: 'Optymalne finansowanie',
    description: 'Leasing, kredyt, a może wynajem długoterminowy? Przeanalizujemy Twoje potrzeby i pomożemy wybrać najkorzystniejszą formę finansowania. Dzięki współpracy z wiodącymi instytucjami, zapewniamy konkurencyjne warunki i minimum formalności.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Dedykowane ubezpieczenie',
    description: 'Samochód elektryczny zasługuje na najlepszą ochronę. Znajdziemy dla Ciebie polisę OC/AC/NNW idealnie dopasowaną do specyfiki EV, gwarantującą szeroki zakres ochrony i spokój na każdej trasie.',
    ctaText: 'Sprawdź oferty ubezpieczeń',
    ctaLink: '/ubezpieczenia',
  },
  {
    icon: SparklesIcon,
    title: 'Bezstresowy odbiór',
    description: 'Dzień odbioru to wyjątkowa chwila. Możemy towarzyszyć Ci w salonie, aby profesjonalnie zweryfikować stan techniczny pojazdu, lub zająć się wszystkim za Ciebie i dopilnować formalności.',
  },
  {
    icon: HomeIcon,
    title: 'Dostawa pod sam dom',
    description: 'Na Twoje życzenie, po załatwieniu wszystkich formalności, dostarczymy gotowe do drogi, lśniące auto prosto pod Twój dom. Skup się na przyjemności z pierwszej jazdy, a logistykę zostaw nam.',
  },
];


const PurchasePage: React.FC = () => {
  const breadcrumbs = [{ name: 'Zakup' }];
  return (
    <div className="bg-background text-foreground">
      <Seo {...SEO_CONFIG['/zakup']} />
      <PageHeader
        title="Zamów z nami swoje EV"
        subtitle="Zajmiemy się wszystkim za Ciebie – od konfiguracji, przez finansowanie, aż po dostawę pod same drzwi. Skup się na przyjemności z jazdy, resztę zostaw nam."
        breadcrumbs={breadcrumbs}
      />
      
      <div className="container mx-auto max-w-5xl px-4 md:px-6 pb-16 md:pb-24">
        <section className="pt-8 md:pt-10" aria-labelledby="tesla-referral-heading">
          <div className="rounded-2xl border border-white/10 bg-black text-white shadow-2xl shadow-black/25">
            <div className="flex flex-col gap-8 px-6 py-8 md:flex-row md:items-stretch md:gap-10 md:px-10 md:py-10">
              <div className="min-w-0 flex-1 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  {purchaseReferralBanner.eyebrow}
                </p>
                <h2
                  id="tesla-referral-heading"
                  className="text-2xl font-bold tracking-tight text-white md:text-3xl"
                >
                  {purchaseReferralBanner.headline}
                </h2>
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  {purchaseReferralBanner.description}
                </p>
                <ul className="mt-6 space-y-4 border-t border-white/10 pt-6">
                  {purchaseReferralBanner.benefits.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black">
                        <CheckIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-1 text-sm text-white/65 leading-relaxed">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-center gap-4 border-t border-white/10 pt-6 md:w-[min(100%,280px)] md:shrink-0 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <a
                  href={TESLA_REFERRAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {purchaseReferralBanner.ctaLabel}
                </a>
                <p className="text-center text-xs leading-relaxed text-white/45 md:text-left">
                  {purchaseReferralBanner.footnote}
                </p>
                <p className="rounded-lg bg-white/5 px-3 py-2 text-center font-mono text-[11px] text-white/50 break-all md:text-left">
                  {TESLA_REFERRAL_LINK.replace(/^https?:\/\//, '')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
            <div className="space-y-24">
              {features.map((feature, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className={`flex justify-center items-center ${!isEven ? 'md:order-last' : ''}`}>
                      <feature.icon className="w-40 h-40 text-primary/10" strokeWidth={1} />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      {feature.ctaLink && feature.ctaText && (
                        <div className="mt-6">
                          <Link to={feature.ctaLink}>
                            <Button variant="secondary">{feature.ctaText}</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center bg-secondary py-16 px-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Gotowy na Elektryczną Rewolucję?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Porozmawiajmy o Twoim nowym samochodzie. Jesteśmy tu, aby odpowiedzieć na wszystkie Twoje pytania i pomóc Ci rozpocząć niezwykłą przygodę z elektromobilnością.
          </p>
          <div className="mt-8">
            <Link to="/kontakt">
              <Button size="lg">Skontaktuj się z nami</Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PurchasePage;