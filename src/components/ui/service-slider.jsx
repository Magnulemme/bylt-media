"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';

export const ServiceSlider = ({ items, className }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const getMaskImage = () => {
    if (isBeginning && isEnd) {
      // Single slide or all slides visible
      return 'none';
    } else if (isBeginning) {
      // At the start - no fade on left, minimal fade on right edge only
      return 'linear-gradient(to right, black 0%, black calc(100% - 80px), transparent 100%)';
    } else if (isEnd) {
      // At the end - minimal fade on left edge only, no fade on right
      return 'linear-gradient(to right, transparent 0%, black 80px, black 100%)';
    } else {
      // In the middle - minimal fade on both edges
      return 'linear-gradient(to right, transparent 0%, black 80px, black calc(100% - 80px), transparent 100%)';
    }
  };

  return (
    <div className={cn("relative py-10 pb-12 px-20", className)}>
      <div
        className="relative transition-all duration-300"
        style={{
          maskImage: getMaskImage(),
          WebkitMaskImage: getMaskImage(),
        }}
      >
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView="auto"
        centeredSlides={true}
        centeredSlidesBounds={true}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
          enabled: true,
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onReachEnd={(swiper) => {
          setIsEnd(true);
        }}
        onReachBeginning={(swiper) => {
          setIsBeginning(true);
        }}
        onFromEdge={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        className="!pb-0"
      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx} className="h-auto !w-[380px]">
            <motion.div
              className="relative group block h-full w-full pb-2 pr-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <Card href={item.ctaHref || "#contact"}>
                {item.number && <CardNumber>{item.number}</CardNumber>}
                {item.icon && <CardIcon>{item.icon}</CardIcon>}
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
                  {item.description && <CardDescription>{item.description}</CardDescription>}
                  {item.capabilities && item.capabilities.length > 0 && (
                    <CardCapabilities capabilities={item.capabilities} label={item.capabilitiesLabel} />
                  )}
                </CardContent>
                <CardCTA>
                  {item.ctaText || "Learn More"}
                </CardCTA>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>

      {/* Custom Navigation Buttons */}
      <div className={cn(
        "swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-blue-500/20 flex items-center justify-center text-cyan-400 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg shadow-cyan-500/10",
        isBeginning && "opacity-0 pointer-events-none"
      )}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className={cn(
        "swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-2 border-cyan-400/30 hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-blue-500/20 flex items-center justify-center text-cyan-400 cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg shadow-cyan-500/10",
        isEnd && "opacity-0 pointer-events-none"
      )}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>

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

export const Card = ({ className, children, href = "#" }) => {
  return (
    <a
      href={href}
      className={cn(
        "rounded-lg h-full w-full p-6 bg-black/60 backdrop-blur-sm border-2 border-white/10 hover:border-cyan-400/60 relative z-10 transition-all duration-300 flex flex-col items-start text-left gap-4 group-hover:translate-x-[2px] group-hover:translate-y-[2px] cursor-pointer no-underline",
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
    </a>
  );
};

export const CardNumber = ({ className, children }) => {
  return (
    <div className={cn("absolute top-6 right-6 text-7xl font-bold font-inter leading-none", className)}>
      <div className="relative">
        {/* Static number - always visible */}
        <span className="bg-gradient-to-br from-cyan-400/[0.15] to-purple-600/[0.10] bg-clip-text text-transparent group-hover:opacity-0 transition-opacity duration-500">
          {children}
        </span>
        {/* Animated gradient on hover */}
        <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-600/40 bg-clip-text text-transparent animate-gradient transition-opacity duration-500 bg-[length:200%_200%]">
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

export const CardContent = ({ className, children }) => {
  return (
    <div className={cn("relative z-10 flex flex-col gap-3.5 flex-1 mb-4", className)}>
      {children}
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
