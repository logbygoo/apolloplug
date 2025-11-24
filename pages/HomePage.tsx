import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import { HERO_CARS } from '../configs/homeConfig';
import { BoltIcon, PowerIcon, KeyIcon, Cog6ToothIcon, ShieldCheckIcon, SparklesIcon } from '../components/HeroIcons';
import Seo from '../components/Seo';
import { MAPS_API_KEY } from '../configs/mapsConfig';

// Declare google for TypeScript
declare const google: any;

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const heroCars = HERO_CARS;

  useEffect(() => {
    // Preload images for smoother transitions
    heroCars.forEach(car => {
      const img = new Image();
      img.src = car.imageUrl;
    });
  }, [heroCars]);

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
  const isDarkTheme = currentCar.theme === 'dark';
  
  return (
    <section 
      className={`relative h-[500px] w-full ${isDarkTheme ? 'text-white' : 'text-foreground'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${isDarkTheme ? 'bg-white/20' : 'bg-black/20'} z-10`}>
        <div 
          key={currentIndex}
          className={`h-full ${isDarkTheme ? 'bg-white' : 'bg-foreground'}`}
          style={{
            animation: 'progressBarFill 10s linear forwards',
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        />
      </div>
      
      <div className="absolute inset-0 w-full h-full">
        {heroCars.map((car, index) => (
            <div
                key={car.id}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                    currentIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${car.imageUrl})` }}
                role="img"
                aria-label={car.name}
                aria-hidden={currentIndex !== index}
            />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative container mx-auto h-full flex flex-col justify-between items-center text-center px-4 py-16">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-semibold text-shadow-md">{currentCar.subtitle?.includes("Model") ? "Poznaj " + currentCar.name : currentCar.name}</h1>
          {currentCar.subtitle && <p className="mt-2 text-lg text-shadow">{currentCar.subtitle}</p>}
        </div>
        <div className="flex flex-col items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            {currentCar.primaryBtnText && currentCar.primaryBtnLink && (
              <Link to={currentCar.primaryBtnLink}>
                <Button size="lg" variant="primary" className="w-64">{currentCar.primaryBtnText}</Button>
              </Link>
            )}
            {currentCar.secondaryBtnText && currentCar.secondaryBtnLink && (
              <Link to={currentCar.secondaryBtnLink}>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className={`w-64 ${isDarkTheme ? 'bg-white/20 !text-white border border-white/50 hover:bg-white/30' : ''}`}
                >
                  {currentCar.secondaryBtnText}
                </Button>
              </Link>
            )}
          </div>
           <div className="flex gap-2">
            {heroCars.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  currentIndex === index
                    ? (isDarkTheme ? 'bg-white' : 'bg-foreground')
                    : (isDarkTheme ? 'bg-white/20 hover:bg-white/40' : 'bg-foreground/20 hover:bg-foreground/40')
                }`}
                aria-label={`Przejdź do slajdu ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-md bg-black/10 hover:bg-black/20 text-white z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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

const AnimatedTimeline = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const timelineSteps = [
        {
            icon: KeyIcon,
            title: "Decyzja o zakupie",
            description: "To moment, w którym zaczyna się cała przygoda. Jeśli zastanawiasz się nad wejściem w świat elektryków, pomożemy Ci przejść przez pierwsze pytania i wątpliwości. Wyjaśnimy jak wygląda codzienna jazda, ładowanie i koszty. Dostaniesz konkretne wskazówki, które pozwolą Ci świadomie wybrać auto, które naprawdę będzie Ci pasowało.",
            buttons: [],
        },
        {
            icon: Cog6ToothIcon,
            title: "Jazda próbna i Testy",
            description: "Trudno podjąć decyzję, jeśli nie poczujesz auta na żywo. Umówimy Cię na jazdę próbną, żebyś spokojnie sprawdził jak auto przyspiesza i zachowuje się w mieście. Możesz też wynająć je na dzień, tydzień albo dłużej, aby poznać je w prawdziwych, codziennych sytuacjach.",
            buttons: [
                { text: "Wynajmij EV", url: "/wynajem" },
                { text: "Zamów z kierowcą", url: "/transfery" }
            ]
        },
        {
            icon: ShieldCheckIcon,
            title: "Zamówienie",
            description: "Kiedy wybór jest już pewny, bierzemy na siebie cały proces zamawiania auta. Pilnujemy formalności i sprawdzamy kolejne etapy realizacji. Masz stały kontakt i wiesz, co dzieje się z Twoim zamówieniem, ale nie musisz zajmować się papierologią.",
            buttons: [
                { text: "Kup z ApolloPlug", url: "/zakup" }
            ]
        },
        {
            icon: SparklesIcon,
            title: "Oczekiwanie na VIN",
            description: "Czas oczekiwania bywa nużący, dlatego w tym okresie możesz korzystać z auta od nas. Dostajesz je na preferencyjnych warunkach, żebyś mógł swobodnie jeździć i nie martwić się o zastępstwo. To wygodne rozwiązanie, dzięki któremu spokojnie doczekasz właściwego samochodu.",
            buttons: [
                { text: "Wynajem", url: "/wynajem" }
            ]
        },
        {
            icon: SparklesIcon,
            title: "Finansowanie",
            description: "Wspólnie przeanalizujemy różne formy finansowania, żeby dobrać tę, która będzie wygodna i przejrzysta. Leasing, kredyt lub płatność gotówką – każda opcja ma swoje plusy. Współpracujemy z wieloma firmami, więc możesz liczyć na konkretne propozycje.",
            buttons: [
                { text: "Zapytaj o finansowanie", url: "/kontakt" }
            ]
        },
        {
            icon: SparklesIcon,
            title: "Ubezpieczenie",
            description: "Dobre ubezpieczenie daje spokój już od pierwszego dnia. Pomożemy Ci wybrać polisę dopasowaną do Twoich potrzeb i wartości auta. Przejdziemy przez kilka wariantów, żebyś wiedział, czym różnią się poszczególne opcje.",
            buttons: [
                { text: "Sprawdź oferty", url: "/ubezpieczenia" }
            ]
        },
        {
            icon: SparklesIcon,
            title: "Odbiór auta ❤️",
            description: "Kiedy auto w końcu dociera, chcemy żeby ten moment był dla Ciebie przyjemny i bezstresowy. Możemy pojechać z Tobą na odbiór i dopilnować oględzin, albo zrobić to za Ciebie i dostarczyć samochód pod wskazany adres.",
            buttons: [],
        },
    ];
    
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setActiveStep(prev => (prev + 1) % timelineSteps.length);
        }, 5000); // Change step every 5 seconds
        
        return () => clearInterval(timer);
    }, [activeStep, isPaused, timelineSteps.length]);

    const progressHeight = activeStep > 0 ? `${(activeStep / (timelineSteps.length - 1)) * 100}%` : '0%';

    return (
        <section className="py-12 md:py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Twoja Droga do Własnego EV</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">Z nami przejdziesz przez cały proces bezproblemowo. Od pierwszej jazdy próbnej, aż po odbiór kluczyków.</p>
                </div>

                <div className="relative max-w-lg mx-auto">
                    <div className="timeline-line-bg-vertical"></div>
                    <div className="timeline-line-progress-vertical" style={{ height: progressHeight }}></div>
                    <div className="space-y-12 relative">
                        {timelineSteps.map((step, index) => (
                            <div 
                                key={index} 
                                className="timeline-step-container-vertical" 
                                onClick={() => setActiveStep(index)}
                                onMouseEnter={() => {
                                    if (index === activeStep) {
                                        setIsPaused(true);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setIsPaused(false);
                                }}
                            >
                                <div className={`timeline-step-vertical ${index <= activeStep ? 'active' : ''}`}>
                                    {index === activeStep && (
                                        <svg key={activeStep} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+12px)] h-[calc(100%+12px)] -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                className="countdown-progress"
                                                cx="50" cy="50" r="49.5"
                                                fill="transparent"
                                                strokeWidth="2"
                                                strokeDasharray="311.02"
                                                strokeDashoffset="0"
                                            />
                                        </svg>
                                    )}
                                    <step.icon className="w-8 h-8 relative" />
                                </div>
                                <div className="timeline-content-vertical">
                                    <p className={`timeline-title-vertical ${index === activeStep ? 'active' : ''}`}>{step.title}</p>
                                    <div className={`overflow-hidden transition-all duration-500 ${index === activeStep ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                                        <p className="text-muted-foreground">{step.description}</p>
                                        {step.buttons && step.buttons.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                {step.buttons.map((button, btnIndex) => (
                                                    <Link 
                                                        key={btnIndex}
                                                        to={button.url} 
                                                        className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium px-4 py-2 rounded-full"
                                                    >
                                                        {button.text}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const loadGoogleMapsScript = (callback: () => void) => {
  if (typeof google !== 'undefined' && google.maps) {
    callback();
    return;
  }
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=marker,places,directions`;
    script.id = 'googleMapsScript';
    document.body.appendChild(script);
    script.onload = () => {
      callback();
    };
  } else {
     existingScript.addEventListener('load', callback);
  }
};

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 52.237049, lng: 21.017532 },
        zoom: 11,
        disableDefaultUI: true,
        styles: [{ stylers: [{ saturation: -100 }] }],
      });

      const locations = [
        { lat: 52.232, lng: 21.010, type: 'supercharger', title: 'Supercharger Złote Tarasy' },
        { lat: 52.260, lng: 20.982, type: 'supercharger', title: 'Supercharger Arkadia' },
        { lat: 52.205, lng: 21.010, type: 'destination', title: 'Destination Charger Hotel' },
        { lat: 52.170, lng: 20.967, type: 'destination', title: 'Destination Charger Business Park' },
      ];
      
      const superchargerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
            <path d="M13.5 2.25a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zM13.125 6a.75.75 0 00-1.25 0v3.375a.75.75 0 001.5 0V6.375a.75.75 0 00-.25-.563zM10.875 6a.75.75 0 011.25 0v3.375a.75.75 0 01-1.5 0V6.375a.75.75 0 01.25-.563zM12 9.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zM12 15a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3zM13.125 15.188a.75.75 0 00-1.25 0v3.187a.75.75 0 001.5 0v-3.188a.75.75 0 00-.25-.562zM10.875 15.188a.75.75 0 011.25 0v3.187a.75.75 0 01-1.5 0v-3.188a.75.75 0 01.25-.562z" />
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
            <path d="M12.53 8.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06z" />
            <path d="M15.53 11.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06z" />
        </svg>`;

      const destinationChargerSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" width="24px" height="24px">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
        </svg>`;

      const superchargerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<div style="width:36px;height:36px;border-radius:50%;background-color:#ef4444;display:flex;align-items:center;justify-content:center;">${superchargerSvg}</div>`),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };

      const destinationChargerIcon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`<div style="width:36px;height:36px;border-radius:50%;background-color:#71717a;display:flex;align-items:center;justify-content:center;">${destinationChargerSvg}</div>`),
        scaledSize: new google.maps.Size(36, 36),
        anchor: new google.maps.Point(18, 18),
      };


      locations.forEach(loc => {
        new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: map,
          title: loc.title,
          icon: loc.type === 'supercharger' ? superchargerIcon : destinationChargerIcon,
        });
      });
    });
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full bg-secondary relative">
      {MAPS_API_KEY === 'TUTAJ_WSTAW_SWOJ_KLUCZ_API' && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-center p-4 z-10">
          <div>
            <h3 className="text-xl font-bold">Mapa jest nieaktywna</h3>
            <p className="mt-2 text-sm">Wprowadź klucz API Google Maps w pliku <code className="bg-white/20 px-1 rounded">configs/mapsConfig.ts</code>, aby ją włączyć.</p>
          </div>
        </div>
      )}
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
      <Seo 
        title="ApolloPlug - Wynajem i transfery autami Tesla"
        description="Doświadcz przyszłości motoryzacji. Wynajmuj Tesle, korzystaj z transferów VIP i inwestuj w elektromobilność. ApolloPlug - Twoje centrum EV."
      />
      <HeroSlider />
      
      <HorizontalCarousel items={vehicleCarouselItems} />

      <AnimatedTimeline />

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
                    <BoltIcon className="w-5 h-5"/>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Supercharger</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <p className="text-4xl font-bold tracking-tight">4717</p>
                  <div className="w-10 h-10 rounded-full bg-zinc-500 flex items-center justify-center text-white shadow-md">
                    <PowerIcon className="w-6 h-6"/>
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