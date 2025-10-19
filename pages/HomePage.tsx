import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { CAR_FLEET } from '../constants';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroCars = CAR_FLEET.filter(car => car.details);

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => {
        const isLastSlide = prevIndex === heroCars.length - 1;
        return isLastSlide ? 0 : prevIndex + 1;
    });
  }, [heroCars.length]);

  useEffect(() => {
    const slideInterval = setInterval(goToNext, 5000);
    return () => clearInterval(slideInterval);
  }, [goToNext]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroCars.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const currentCar = heroCars[currentIndex];
  
  return (
    <section className="relative h-[500px] w-full text-foreground">
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
  <div className="relative w-[calc(100vw-3rem)] md:w-[450px] h-[60vh] flex-shrink-0 snap-start overflow-hidden rounded-md">
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
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = itemRefs.current.findIndex(el => el === entry.target);
                        if (index !== -1) {
                            setActiveIndex(index);
                        }
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                threshold: 0.5,
            }
        );

        itemRefs.current.forEach(item => {
            if (item) observer.observe(item);
        });

        return () => {
            itemRefs.current.forEach(item => {
                if (item) observer.unobserve(item);
            });
        };
    }, [items]);
    
  return (
    <section className="py-12 md:py-20 w-full">
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pl-6 md:pl-12 pr-6 md:pr-12"
      >
        {items.map((item, index) => (
             <div ref={el => { itemRefs.current[index] = el; }} key={index}>
                <CarouselCard item={item} />
            </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, index) => (
          <div key={index} className={`h-2 w-2 rounded-full transition-colors ${activeIndex === index ? 'bg-foreground' : 'bg-foreground/20'}`} />
        ))}
      </div>
    </section>
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

  const energyCarouselItems: CarouselItem[] = [
      {
          image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Powerwall-Desktop.jpg",
          category: 'Energia dla domu',
          title: 'Powerwall',
          subtitle: 'Zachowaj włączone światła podczas przerw w dostawie prądu',
          primaryBtnText: 'Dowiedz się więcej',
          secondaryBtnText: 'Zamów',
      },
      {
          image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Homepage-Megapack-Desktop.jpg",
          category: 'Rozwiązania dla firm',
          title: 'Megapack',
          subtitle: 'Ogromne akumulatory do zasilania sieci energetycznej',
          primaryBtnText: 'Dowiedz się więcej',
          secondaryBtnText: 'Zapytaj o ofertę',
      },
      {
          image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/solar-panels-hero-desktop.jpg",
          category: 'Odnawialne źródła',
          title: 'Panele słoneczne',
          subtitle: 'Produkuj czystą energię ze słońca',
          primaryBtnText: 'Dowiedz się więcej',
          secondaryBtnText: 'Kalkulacja',
      }
  ];

  return (
    <div className="bg-background">
      <HeroSlider />
      
      <HorizontalCarousel items={vehicleCarouselItems} />
      
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
               <Button variant="primary" size="lg">Wyświetl sieć</Button>
               <Button variant="secondary" size="lg">Dowiedz się więcej</Button>
            </div>
        </div>
      </section>

      <HorizontalCarousel items={energyCarouselItems} />

    </div>
  );
};

export default HomePage;
