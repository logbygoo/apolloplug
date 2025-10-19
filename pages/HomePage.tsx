import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { ChevronDownIcon } from '../constants';

interface FullScreenSectionProps {
  title: string;
  description: string;
  bgImage: string;
  primaryBtn: { text: string; link: string; };
  secondaryBtn?: { text: string; link: string; };
  isFirst?: boolean;
}

const FullScreenSection: React.FC<FullScreenSectionProps> = ({ title, description, bgImage, primaryBtn, secondaryBtn, isFirst = false }) => {
  return (
    <section 
      style={{ backgroundImage: `url(${bgImage})` }} 
      className="h-screen w-full bg-cover bg-center flex flex-col justify-between items-center snap-start"
    >
      <div className="pt-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-md">{description}</p>
      </div>
      <div className="w-full px-4 pb-12 flex flex-col items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          <Link to={primaryBtn.link} className="w-full">
            <Button size="lg" className="w-full uppercase tracking-wider font-medium">{primaryBtn.text}</Button>
          </Link>
          {secondaryBtn && (
            <Link to={secondaryBtn.link} className="w-full">
              <Button size="lg" variant="secondary" className="w-full uppercase tracking-wider font-medium">{secondaryBtn.text}</Button>
            </Link>
          )}
        </div>
        {isFirst && <ChevronDownIcon className="w-8 h-8 mt-4 animate-bounce" />}
      </div>
    </section>
  );
};


const HomePage: React.FC = () => {
  return (
    <div className="snap-y snap-mandatory h-screen w-full overflow-y-auto overflow-x-hidden">
      <FullScreenSection
        title="EV Tech"
        description="A gdyby tak ładować się poniżej 1 zł/kWh?"
        bgImage="https://picsum.photos/seed/ev-future-dark/1920/1080"
        primaryBtn={{ text: 'Zainwestuj w przyszłość', link: '/inwestuj' }}
        secondaryBtn={{ text: 'Zobacz naszą flotę', link: '/flota' }}
        isFirst
      />
      <FullScreenSection
        title="Wynajem Aut"
        description="Elastyczny wynajem najnowszych modeli Tesli na dni, tygodnie lub miesiące."
        bgImage="https://picsum.photos/seed/tesla-interior-dark/1920/1080"
        primaryBtn={{ text: 'Sprawdź ofertę', link: '/wynajem' }}
      />
      <FullScreenSection
        title="Transfery VIP"
        description="Podróżuj w komforcie i stylu z naszymi profesjonalnymi kierowcami."
        bgImage="https://picsum.photos/seed/vip-driver/1920/1080"
        primaryBtn={{ text: 'Dowiedz się więcej', link: '/transfery' }}
      />
      <FullScreenSection
        title="100% Energia Słoneczna"
        description="Nasze stacje ładowania są w pełni zasilane przez panele fotowoltaiczne."
        bgImage="https://picsum.photos/seed/solar-panels-field/1920/1080"
        primaryBtn={{ text: 'Dołącz do rewolucji', link: '/inwestuj' }}
      />
    </div>
  );
};

export default HomePage;
