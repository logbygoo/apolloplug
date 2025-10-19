import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { CAR_FLEET } from '../constants';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroCars = CAR_FLEET.filter(car => car.details);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroCars.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === heroCars.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentCar = heroCars[currentIndex];
  
  return (
    <section className="relative h-[calc(100vh-56px)] w-full text-foreground">
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentCar.imageUrl[1]})` }}
      >
        <div className="container mx-auto h-full flex flex-col justify-between items-center text-center px-4 py-16">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-semibold">{currentCar.details?.subtitle?.includes("Model") ? "Poznaj " + currentCar.name : currentCar.name}</h1>
            {currentCar.details?.subtitle && <p className="mt-2 text-lg">{currentCar.details.subtitle}</p>}
          </div>
          <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={currentCar.details?.primaryBtnLink || '#'}>
                <Button size="lg" variant="primary" className="w-64">{currentCar.details?.primaryBtnText}</Button>
              </Link>
              <Link to={currentCar.details?.secondaryBtnLink || '#'}>
                <Button size="lg" variant="secondary" className="w-64">{currentCar.details?.secondaryBtnText}</Button>
              </Link>
            </div>
             <div className="flex gap-2">
              {heroCars.map((_, index) => (
                <div key={index} className={`h-1.5 w-6 rounded-full ${currentIndex === index ? 'bg-foreground' : 'bg-foreground/20'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="bg-background">
      <HeroSlider />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-md overflow-hidden h-[60vh]">
              <img src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Model-Y-spin-So-White-LHD" alt="Model Y Standard" className="w-full h-full object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h2 className="text-4xl font-semibold">Model Y Standard</h2>
                <div className="mt-4 flex gap-4">
                   <Button variant="primary">Zamów teraz</Button>
                   <Button variant="secondary" className="bg-white/90 text-black">Dowiedz się więcej</Button>
                </div>
              </div>
            </div>
             <div className="relative rounded-md overflow-hidden h-[60vh]">
              <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY20P,$PPSW,$DV4W,$IPB1&view=FRONT34&model=my&size=1920&bkba_opt=2&crop=0,0,0,0&" alt="Model Y" className="w-full h-full object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h2 className="text-4xl font-semibold">Model Y</h2>
                 <div className="mt-4 flex gap-4">
                   <Button variant="primary">Zamów teraz</Button>
                   <Button variant="secondary" className="bg-white/90 text-black">Dowiedz się więcej</Button>
                </div>
              </div>
            </div>
          </div>
           <div className="flex justify-center gap-2 mt-6">
                <div className="h-2 w-2 rounded-full bg-foreground" />
                <div className="h-2 w-2 rounded-full bg-foreground/20" />
                <div className="h-2 w-2 rounded-full bg-foreground/20" />
                <div className="h-2 w-2 rounded-full bg-foreground/20" />
                <div className="h-2 w-2 rounded-full bg-foreground/20" />
            </div>
        </div>
      </section>
      
      <section className="py-12 bg-zinc-100">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold">Poznaj Teslę</h2>
            <p className="mt-2 text-foreground/70">Umów się na jazdę już dziś.</p>
            <Button variant="outline" className="mt-4 border-foreground/50 hover:bg-foreground hover:text-background">Umów się na jazdę próbną</Button>
          </div>
           <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold">Sklep Tesla</h2>
            <p className="mt-2 text-foreground/70">Kupuj akcesoria samochodowe i gadżety z logo Tesla.</p>
            <Button variant="outline" className="mt-4 border-foreground/50 hover:bg-foreground hover:text-background">Kup teraz</Button>
          </div>
        </div>
      </section>

      <section className="relative">
        <img src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/charging-access-hero-desktop.jpg" alt="Mapa ładowarek Tesla" className="w-full h-auto object-cover"/>
        <div className="absolute inset-0 bg-white/20" />
        <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-semibold">Doładuj samochód</h2>
            <p className="mt-2">Zobacz dostępną w pobliżu sieć stacji Tesla Supercharger i Destination Charger.</p>
            <div className="mt-8 flex justify-center items-end gap-12">
                <div>
                    <p className="text-4xl font-bold">14,045 <span className="text-red-500 text-3xl">+</span></p>
                    <p>Supercharger</p>
                </div>
                 <div>
                    <p className="text-4xl font-bold">4,663 <span className="text-gray-500 text-3xl">+</span></p>
                    <p>Stacje Destination Chargers</p>
                </div>
            </div>
             <div className="mt-8 flex justify-center gap-4">
               <Button variant="dark" size="lg">Wyświetl sieć</Button>
               <Button variant="secondary" size="lg">Dowiedz się więcej</Button>
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-md overflow-hidden h-[60vh]">
              <img src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Powerwall-Desktop.jpg" alt="Powerwall" className="w-full h-full object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-semibold">Powerwall</h2>
                <p>Zachowaj włączone światła podczas przerw w dostawie prądu</p>
                <div className="mt-4">
                   <Button variant="primary">Dowiedz się więcej</Button>
                </div>
              </div>
            </div>
             <div className="relative rounded-md overflow-hidden h-[60vh]">
              <img src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Megapack-Desktop.jpg" alt="Megapack" className="w-full h-full object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h2 className="text-4xl font-semibold">Megapack</h2>
                <p>Ogromne akumulatory do zasilania sieci energetycznej</p>
                 <div className="mt-4">
                   <Button variant="primary">Dowiedz się więcej</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;