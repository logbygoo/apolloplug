import React from 'react';
import Seo from '../components/Seo';
import { Input, Label, PageHeader } from '../components/ui';
import { SEO_CONFIG } from '../configs/seoConfig';
import { SparklesIcon, BoltIcon, CalendarDaysIcon, BanknotesIcon, CheckIcon } from '../icons';

type PromotionItem = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const ACTIVE_PROMOTIONS: PromotionItem[] = [
  {
    title: 'Darmowa +1 doba',
    description: 'Oceń naszą wypożyczalnię i otrzymaj darmowe przedłużenie najmu o 1 dobę.',
    Icon: SparklesIcon,
  },
  {
    title: 'Kup Teslę z Apollo',
    description:
      'Skorzystaj z naszego linku polecającego Tesla i zamów swoje auto z rabatem, pakietem ładowania i darmowym wypożyczeniem w Apollo.',
    Icon: BoltIcon,
  },
  {
    title: 'Weekend z Apollo',
    description: 'Wynajmij auto w piątek na 2 doby, a trzecią otrzymaj gratis.',
    Icon: CalendarDaysIcon,
  },
  {
    title: 'Kod rabatowy -15%',
    description: 'Zapisz się do naszego klubu Apollo i otrzymaj kod rabatowy.',
    Icon: BanknotesIcon,
  },
];

const checkboxBaseClass =
  'relative mt-0.5 mr-3 h-5 w-5 rounded-sm flex-shrink-0 border border-background/30 bg-white/10';

const PromotionsPage: React.FC = () => {
  return (
    <div className="min-w-0 bg-background text-foreground">
      <Seo {...SEO_CONFIG['/promocje']} />

      <PageHeader
        className="max-w-5xl"
        introMaxWidthClassName="max-w-none"
        title="Promocje i Kody Rabatowe"
        subtitle="Aktualne akcje promocyjne Apollo oraz klubowe oferty specjalne dla osób zapisanych na listę marketingową."
        breadcrumbs={[{ name: 'Promocje' }]}
      />

      <section className="pb-8 md:pb-10">
        <div className="container mx-auto grid max-w-5xl gap-8 px-4 md:px-6">
          <div className="rounded-2xl border border-black bg-black p-6 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Apollo Klub</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Zgarnij kod rabatowy -15%</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
              Dołącz do listy marketingowej i odbierz kod na wynajem. Formularz jest gotowy wizualnie, a wysyłkę
              podłączymy w kolejnym kroku.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="promoPhone" className="text-white">
                  Telefon
                </Label>
                <Input
                  id="promoPhone"
                  type="tel"
                  placeholder="Np. 500 000 000"
                  className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              <div>
                <Label htmlFor="promoEmail" className="text-white">
                  E-mail
                </Label>
                <Input
                  id="promoEmail"
                  type="email"
                  placeholder="Np. kontakt@apolloidea.com"
                  className="mt-2 border-white/20 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <label htmlFor="promoTerms" className="flex cursor-pointer items-start text-sm text-white/85">
                <input id="promoTerms" type="checkbox" className="absolute h-0 w-0 opacity-0" />
                <span className={checkboxBaseClass}>
                  <CheckIcon className="absolute inset-[2px] h-3 w-3 text-white/30" />
                </span>
                <span>Akceptuję regulamin i politykę prywatności.</span>
              </label>
              <label htmlFor="promoMarketing" className="flex cursor-pointer items-start text-sm text-white/85">
                <input id="promoMarketing" type="checkbox" className="absolute h-0 w-0 opacity-0" />
                <span className={checkboxBaseClass}>
                  <CheckIcon className="absolute inset-[2px] h-3 w-3 text-white/30" />
                </span>
                <span>Wyrażam zgodę na kontakt marketingowy e-mail i telefoniczny.</span>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-md bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Odbieram -15%
              </button>
              <span className="text-xs text-white/60">Bez podpinania backendu na tym etapie.</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Aktualnie aktywne promocje</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Przegląd ofert specjalnych dostępnych teraz dla klientów Apollo.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {ACTIVE_PROMOTIONS.map(({ title, description, Icon }) => (
                <article key={title} className="rounded-lg border border-border bg-card p-5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PromotionsPage;
