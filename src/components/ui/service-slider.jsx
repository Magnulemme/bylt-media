"use client";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

export const ServiceSlider = ({ items, className, showCTA = false, ctaText = "Non sai da dove iniziare? Parliamone", ctaHref = "#contact" }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [allCardsVisible, setAllCardsVisible] = useState(false);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  // Hook per verificare se tutte le card sono visibili (solo al mount e resize)
  useEffect(() => {
    const checkCardsVisibility = () => {
      if (!containerRef.current || !swiperRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const slides = swiperRef.current.slides;

      if (!slides || slides.length === 0) return;

      const firstSlide = slides[0];
      if (!firstSlide) return;

      const firstSlideRect = firstSlide.getBoundingClientRect();

      // Se la prima card inizia dentro il container (o leggermente prima per tolleranza),
      // significa che tutte le card sono visibili per simmetria
      const firstCardVisible = firstSlideRect.left >= containerRect.left - 2;

      console.log('[ServiceSlider] Card visibility check:', {
        containerLeft: containerRect.left,
        firstSlideLeft: firstSlideRect.left,
        firstCardVisible,
        tolerance: 2
      });

      setAllCardsVisible(firstCardVisible);
    };

    checkCardsVisibility();
    window.addEventListener('resize', checkCardsVisibility);

    // Delay check per assicurarsi che Swiper sia inizializzato
    const timeoutId = setTimeout(checkCardsVisibility, 200);

    return () => {
      window.removeEventListener('resize', checkCardsVisibility);
      clearTimeout(timeoutId);
    };
  }, [items.length]);

  // Funzione per calcolare il mask fade dinamico
  const getMaskImage = () => {
    // Nessun fade su mobile (< 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'none';
    }

    // Se tutte le card sono visibili, nessun fade
    if (allCardsVisible) {
      return 'none';
    }

    // Altrimenti usa la logica esistente basata sulla posizione
    if (isBeginning && isEnd) {
      return 'none';
    } else if (isBeginning) {
      return 'linear-gradient(to right, black, black calc(100% - 96px), transparent)';
    } else if (isEnd) {
      return 'linear-gradient(to right, transparent, black 96px, black)';
    } else {
      // In mezzo: nessun fade, tutto visibile
      return 'none';
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Navigation Buttons - Top Right */}
      <div className="service-slider-nav">
        <button
          className={cn(
            "swiper-button-prev-custom w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-cyan-400/30 flex items-center justify-center text-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/10",
            isBeginning
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-blue-500/20 hover:scale-110 cursor-pointer"
          )}
          disabled={isBeginning}
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className={cn(
            "swiper-button-next-custom w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-cyan-400/30 flex items-center justify-center text-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/10",
            isEnd
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-blue-500/20 hover:scale-110 cursor-pointer"
          )}
          disabled={isEnd}
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div
        style={{
          maskImage: getMaskImage(),
          WebkitMaskImage: getMaskImage(),
          transition: 'mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out'
        }}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView="auto"
          centeredSlides={false}
          breakpoints={{
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
          }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
            enabled: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChangeTransitionStart={() => {
            setIsTransitioning(true);
          }}
          onSlideChangeTransitionEnd={() => {
            setIsTransitioning(false);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachEnd={() => {
            setIsEnd(true);
          }}
          onReachBeginning={() => {
            setIsBeginning(true);
          }}
          onFromEdge={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          className="!pb-0"
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx} className="h-auto !w-[280px] md:!w-[42vw] lg:!w-[calc((100%-48px)/3)]">
              <div className="relative group block h-full w-full pb-2 pr-2">
                <Card href={item.showCTA ? undefined : (item.ctaHref || "#contact")}>
                  {item.number && <CardNumber>{item.number}</CardNumber>}
                  {item.icon && <CardIcon>{item.icon}</CardIcon>}
                  <CardContent showCTA={item.showCTA} ctaHref={item.ctaHref} ctaText={item.ctaText}>
                    <CardTitle>{item.title}</CardTitle>
                    {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
                    {item.description && <CardDescription>{item.description}</CardDescription>}
                    {item.capabilities && item.capabilities.length > 0 && (
                      <CardCapabilities capabilities={item.capabilities} label={item.capabilitiesLabel} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Global CTA */}
      {showCTA && (
        <div className="mt-padding-md flex justify-center">
          <a
            href={ctaHref}
            className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
          >
            <span>{ctaText}</span>
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
          </a>
        </div>
      )}

      <style jsx global>{`
        .swiper-slide {
          height: auto;
        }
        .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </div>
  );
};

export const Card = ({ className, children, href, ...props }) => {
  const Component = href ? 'a' : 'div';
  const linkProps = href ? { href } : {};

  return (
    <Component
      {...linkProps}
      {...props}
      className={cn(
        "rounded-lg h-full w-full p-6 bg-black/60 backdrop-blur-sm border-2 border-white/10 hover:border-cyan-400/60 relative z-10 transition-all duration-300 flex flex-col items-start text-left gap-4 group-hover:translate-x-[2px] group-hover:translate-y-[2px] no-underline",
        href ? "cursor-pointer" : "",
        className
      )}
      style={{
        boxShadow: '8px 8px 0px rgba(34, 211, 238, 1)',
        transition: 'all 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '6px 6px 0px rgba(34, 211, 238, 1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '8px 8px 0px rgba(34, 211, 238, 1)';
      }}
    >
      {children}
    </Component>
  );
};

export const CardNumber = ({ className, children }) => {
  return (
    <div className={cn("absolute top-6 right-6 text-7xl font-bold font-inter leading-none", className)}>
      <div className="relative">
        {/* Static number - always visible */}
        <span className="number-static bg-gradient-to-br from-cyan-400/[0.15] to-purple-600/[0.12] bg-clip-text text-transparent transition-opacity duration-500">
          {children}
        </span>
        {/* Animated gradient on hover */}
        <span className="number-animated absolute top-0 left-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent animate-gradient transition-opacity duration-500 bg-[length:200%_200%] opacity-0">
          {children}
        </span>
      </div>
    </div>
  );
};

export const CardIcon = ({ className, children }) => {
  return (
    <div className={cn("w-14 h-14 rounded-lg bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center text-cyan-300 [&>svg]:w-7 [&>svg]:h-7 transition-all duration-300 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50", className)}>
      {children}
    </div>
  );
};

export const CardContent = ({ className, children, showCTA = false, ctaHref = "#contact", ctaText = "Explore Services" }) => {
  return (
    <div className={cn("relative z-10 flex flex-col gap-3.5 flex-1", className)}>
      {children}
      {showCTA && (
        <a
          href={ctaHref}
          onClick={(e) => e.stopPropagation()}
          className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors duration-300 mt-2"
        >
          <span>{ctaText}</span>
          <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
        </a>
      )}
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h3 className={cn("text-2xl font-bold text-white font-inter m-0 leading-tight flex-shrink-0", className)}>
      {children}
    </h3>
  );
};

export const CardSubtitle = ({ className, children }) => {
  return (
    <p className={cn("text-sm text-cyan-400 m-0 font-semibold leading-snug flex-shrink-0", className)}>
      {children}
    </p>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <p className={cn("text-sm text-gray-300 leading-relaxed flex-1", className)}>
      {children}
    </p>
  );
};

export const CardCapabilities = ({ capabilities, label = "Key Capabilities", className }) => {
  return (
    <div className={cn("space-y-3 border-t border-white/10 pt-4 flex-shrink-0", className)}>
      <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {capabilities.slice(0, 4).map((cap, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs text-gray-400"
          >
            <span className="text-cyan-400 mt-0.5">•</span>
            <span className="leading-tight">{cap.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardCTA = ({ className, children }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mt-auto pointer-events-none",
        className
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </div>
  );
};