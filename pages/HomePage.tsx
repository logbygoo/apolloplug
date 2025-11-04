import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { HERO_CARS } from '../configs/homeConfig';
import { LightningIcon, PlugIcon } from '../constants';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroCars = HERO_CARS;

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === heroCars.length - 1 ? 0 : prevIndex + 1));
  }, [heroCars.length]);

  useEffect(() => {
    if (isHovered) return;

    const slideInterval = setInterval(goToNext, 10000); // Set to 10 seconds
    return () => clearInterval(slideInterval);
  }, [currentIndex, isHovered, goToNext]); // Reset timer on slide change or hover change

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroCars.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentCar = heroCars[currentIndex];
  
  return (
    <section 
      className="relative h-[500px] w-full text-foreground"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-foreground/20 z-10">
        <div 
          key={currentIndex}
          className="h-full bg-foreground"
          style={{
            animation: 'progressBarFill 10s linear forwards',
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        />
      </div>
      
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${currentCar.imageUrl})` }}
      >
        <div className="container mx-auto h-full flex flex-col justify-between items-center text-center px-4 py-16">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-semibold">{currentCar.subtitle?.includes("Model") ? "Poznaj " + currentCar.name : currentCar.name}</h1>
            {currentCar.subtitle && <p className="mt-2 text-lg">{currentCar.subtitle}</p>}
          </div>
          <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={currentCar.primaryBtnLink || '#'}>
                <Button size="lg" variant="primary" className="w-64">{currentCar.primaryBtnText}</Button>
              </Link>
              <Link to={currentCar.secondaryBtnLink || '#'}>
                <Button size="lg" variant="secondary" className="w-64">{currentCar.secondaryBtnText}</Button>
              </Link>
            </div>
             <div className="flex gap-2">
              {heroCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 w-6 rounded-full transition-colors ${currentIndex === index ? 'bg-foreground' : 'bg-foreground/20 hover:bg-foreground/40'}`}
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </section>
  );
};

// --- New Horizontal Carousel ---

interface CarouselItem {
  image: string;
  category: string;
  title: string;
  subtitle?: string;
  primaryBtnText: string;
  secondaryBtnText: string;
}

const CarouselCard: React.FC<{ item: CarouselItem }> = ({ item }) => (
  <div className="relative w-[calc(100vw-3rem)] md:w-[800px] h-[60vh] flex-shrink-0 snap-start overflow-hidden rounded-md">
    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
    <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col items-center text-center">
      <p className="font-semibold">{item.category}</p>
      <h3 className="text-3xl font-bold">{item.title}</h3>
      {item.subtitle && <p className="text-sm mt-1">{item.subtitle}</p>}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button variant="primary">{item.primaryBtnText}</Button>
        <Button variant="secondary" className="bg-white/90 text-black hover:bg-white/80">{item.secondaryBtnText}</Button>
      </div>
    </div>
  </div>
);

const HorizontalCarousel: React.FC<{ items: CarouselItem[] }> = ({ items }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
  return (
    <section className="py-12 md:py-20 w-full">
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 md:px-6 scroll-pl-4 md:scroll-pl-6"
      >
        {items.map((item, index) => (
             <div key={index}>
                <CarouselCard item={item} />
            </div>
        ))}
      </div>
    </section>
  );
};

const GoogleMap = () => {
  return (
    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://i.imgur.com/7Yf2b0s.png')" }}>
      <div className="w-full h-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
        <div className="text-center text-white p-6 bg-black/60 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold">Mapa jest tymczasowo niedostępna</h3>
          <p className="mt-2 text-sm">
            Wystąpił problem z wczytaniem mapy.
          </p>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {

  const vehicleCarouselItems: CarouselItem[] = [
    {
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Model-3-Main-Hero-Desktop-LHD-Animation-Glob",
      category: 'Sportowy sedan',
      title: 'Model 3',
      subtitle: 'Już za 194 990 zł',
      primaryBtnText: 'Zamów teraz',
      secondaryBtnText: 'Dowiedz się więcej',
    },
    {
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Homepage-Model-Y-Hero-Desktop",
      category: 'Średniej wielkości SUV',
      title: 'Model Y',
      subtitle: 'Już za 219 990 zł',
      primaryBtnText: 'Zamów teraz',
      secondaryBtnText: 'Dowiedz się więcej',
    },
    {
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto:best/Model-X-Main-Hero-Desktop-LHD",
      category: 'Luksusowy SUV',
      title: 'Model X',
      subtitle: 'Niedoścignione osiągi',
      primaryBtnText: 'Zamów teraz',
      secondaryBtnText: 'Dowiedz się więcej',
    },
    {
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-S.png",
      category: 'Luksusowy sedan',
      title: 'Model S',
      subtitle: 'Przyszłość jest teraz',
      primaryBtnText: 'Zamów teraz',
      secondaryBtnText: 'Dowiedz się więcej',
    },
  ];

  return (
    <div className="bg-background">
      <HeroSlider />
      
      <HorizontalCarousel items={vehicleCarouselItems} />

      <section className="h-[50vh] w-full bg-zinc-200">
        <GoogleMap />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex-1 max-w-lg text-center md:text-left">
              <h2 className="text-4xl font-semibold tracking-tight">Doładuj samochód</h2>
              <p className="mt-3 text-foreground/70">
                Zobacz dostępną w pobliżu sieć stacji Tesla Supercharger i Destination Charger.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button variant="primary" size="lg">Wyświetl sieć</Button>
                <Button variant="secondary" size="lg">Dowiedz się więcej</Button>
              </div>
            </div>

            <div className="flex items-start gap-8 sm:gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <p className="text-4xl font-bold tracking-tight">14 075</p>
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md">
                    <LightningIcon className="w-5 h-5"/>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Supercharger</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <p className="text-4xl font-bold tracking-tight">4717</p>
                  <div className="w-10 h-10 rounded-full bg-zinc-500 flex items-center justify-center text-white shadow-md">
                    <PlugIcon className="w-6 h-6"/>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Stacje Destination Chargers</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary rounded-lg relative overflow-hidden group">
            <div className="p-8 pb-32">
              <h2 className="text-3xl font-semibold">Poznaj Teslę</h2>
              <p className="mt-2 text-foreground/70">Umów się na jazdę już dziś.</p>
              <Button variant="secondary" className="mt-6 bg-white hover:bg-zinc-200 text-secondary-foreground shadow-sm">Umów się na jazdę próbną</Button>
            </div>
            <img 
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-20-inch-Performance-Wheel-and-Tire-Package-Desktop.png"
              alt="Koło Tesli"
              className="absolute w-[350px] h-auto -right-12 -bottom-16 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="bg-secondary rounded-lg relative overflow-hidden group">
            <div className="p-8 pb-32">
              <h2 className="text-3xl font-semibold">Sklep Tesla</h2>
              <p className="mt-2 text-foreground/70">Kupuj akcesoria samochodowe i gadżety z logo Tesla.</p>
              <Button variant="secondary" className="mt-6 bg-white hover:bg-zinc-200 text-secondary-foreground shadow-sm">Kup teraz</Button>
            </div>
            <img 
              src="https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Roof-Rack-v2-Desktop.png" 
              alt="Bagażnik dachowy Tesli"
              className="absolute w-[450px] h-auto -right-16 bottom-0 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;