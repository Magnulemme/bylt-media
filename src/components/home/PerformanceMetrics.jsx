"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import RevenueChart from './PerformanceMetrics/RevenueChart';
import TrafficDistributionChart from './PerformanceMetrics/TrafficDistributionChart';
import ROASTrendChart from './PerformanceMetrics/ROASTrendChart';
import ConversionTrendChart from './PerformanceMetrics/ConversionTrendChart';
import KPICard from './PerformanceMetrics/KPICard';
import {
  performanceData,
  roasData,
  channelPerformanceData,
  trafficMixData,
  kpis
} from './PerformanceMetrics/constants';

// Desktop/Tablet Scroll Component
const DesktopScrollSection = ({
  containerRef,
  stickyWrapperRef,
  cardsRef,
  isReady,
  getMaskImage,
  x,
  performanceData,
  roasData,
  channelPerformanceData,
  trafficMixData,
  kpis,
  cardHeight,
  showStickyText
}) => (
  <div className="hidden md:block">
    <div style={{ height: '500vh' }} ref={containerRef}>
      <div className="sticky flex flex-col justify-center" style={{ top: '15vh', height: '80vh' }}>
        <div className="w-full overflow-hidden">
          <div
            ref={stickyWrapperRef}
            className="mx-auto w-full relative overflow-x-hidden max-w-content"
            style={{
              opacity: isReady ? 1 : 0,
              transition: 'opacity 0.2s ease-out, mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
              maskImage: getMaskImage(),
              WebkitMaskImage: getMaskImage()
            }}
          >
            <motion.div
              ref={cardsRef}
              className="performance-cards-flex"
              style={{ x, height: cardHeight }}
            >
              <div className="flex-shrink-0 w-[45vw] lg:w-[32vw] [&>div]:!h-full [&>div>div]:!h-full">
                <ConversionTrendChart data={channelPerformanceData} />
              </div>
              <div className="flex-shrink-0 w-[45vw] lg:w-[32vw] [&>div]:!h-full [&>div>div]:!h-full">
                <ROASTrendChart data={roasData} />
              </div>
              <div className="flex-shrink-0 w-[45vw] lg:w-[32vw] [&>div]:!h-full [&>div>div]:!h-full">
                <TrafficDistributionChart data={trafficMixData} />
              </div>
              <div className="flex-shrink-0 w-[45vw] lg:w-[32vw]">
                <KPICard roasData={roasData} kpis={kpis} />
              </div>
              <div className="flex-shrink-0 w-[45vw] lg:w-[32vw] [&>div]:!h-full [&>div>div]:!h-full">
                <RevenueChart data={performanceData} />
              </div>
            </motion.div>
          </div>
        </div>
        {/* Testo descrittivo sotto le card - mostrato solo se c'è abbastanza spazio */}
        {showStickyText && (
          <div className="performance-sticky-text-container">
            <div className="performance-sticky-text-content">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                The Numbers Speak for Themselves
              </h3>
              <p className="text-base md:text-lg text-gray-400">
                Total transparency on performance. Every metric is tracked, analyzed, and optimized to maximize your return on investment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Mobile Scroll Component
const MobileScrollSection = ({
  containerRef,
  stickyWrapperRef,
  cardsRef,
  cardRef,
  isReady,
  getMaskImage,
  x,
  performanceData,
  roasData,
  channelPerformanceData,
  trafficMixData,
  kpis
}) => (
  <div className="md:hidden">
    <div style={{ height: '500vh' }} ref={containerRef}>
      <div className="sticky flex items-center" style={{ top: '20vh' }}>
        <div className="max-w-content mx-auto w-full relative">
          <div
            ref={stickyWrapperRef}
            className="overflow-hidden -mx-4 sm:-mx-6"
            style={{
              opacity: isReady ? 1 : 0,
              transition: 'opacity 0.2s ease-out, mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
              maskImage: getMaskImage(),
              WebkitMaskImage: getMaskImage()
            }}
          >
            <motion.div
              ref={cardsRef}
              className="flex items-stretch"
              style={{ x }}
            >
              <div className="flex-shrink-0 w-screen px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                <ConversionTrendChart data={channelPerformanceData} />
              </div>
              <div className="flex-shrink-0 w-screen px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                <ROASTrendChart data={roasData} />
              </div>
              <div className="flex-shrink-0 w-screen px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                <TrafficDistributionChart data={trafficMixData} />
              </div>
              <div className="flex-shrink-0 w-screen px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                <RevenueChart data={performanceData} />
              </div>
              <div className="flex-shrink-0 w-screen px-4" ref={cardRef}>
                <KPICard isMobile roasData={roasData} kpis={kpis} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PerformanceMetrics = () => {
  const mobileContainerRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const mobileCardsRef = useRef(null);
  const desktopCardsRef = useRef(null);
  const stickyWrapperRef = useRef(null);
  const mobileStickyWrapperRef = useRef(null);
  const cardRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [scrollableDistance, setScrollableDistance] = useState(0);
  const [mobileScrollableDistance, setMobileScrollableDistance] = useState(0);
  const [cardHeight, setCardHeight] = useState('auto');
  const [showStickyText, setShowStickyText] = useState(true);

  // Stati per gestire il fade ai bordi
  const [desktopIsBeginning, setDesktopIsBeginning] = useState(false);
  const [desktopIsEnd, setDesktopIsEnd] = useState(true);
  const [mobileIsBeginning, setMobileIsBeginning] = useState(false);
  const [mobileIsEnd, setMobileIsEnd] = useState(true);

  // Motion values per il controllo diretto della posizione X
  const desktopX = useMotionValue(0);
  const mobileX = useMotionValue(0);

  // Hook per calcolare l'altezza disponibile per le card
  const calculateCardHeight = useCallback(() => {
    // Altezza totale disponibile nell'area sticky
    const viewportHeight = window.innerHeight;
    const stickyHeight = viewportHeight * 0.8; // 80vh

    // Spazio stimato per il testo (titolo + sottotitolo + margini)
    // Tablet: ~120px, Desktop: ~140px
    const textHeight = window.innerWidth >= 1024 ? 140 : 120;
    const marginTop = 64; // mt-16 = 4rem = 64px

    // Calcola altezza disponibile per le card
    const availableHeightWithText = stickyHeight - textHeight - marginTop;
    const minHeight = 300;

    // Se non c'è abbastanza spazio per le card con il testo, nascondi il testo
    if (availableHeightWithText < minHeight) {
      setShowStickyText(false);
      // Ricalcola senza il testo
      const availableHeight = stickyHeight - 32; // Solo un piccolo margine
      const maxHeight = 500;
      const finalHeight = Math.min(Math.max(availableHeight, minHeight), maxHeight);
      setCardHeight(`${finalHeight}px`);
    } else {
      setShowStickyText(true);
      // Calcola con il testo
      const maxHeight = 500;
      const finalHeight = Math.min(Math.max(availableHeightWithText, minHeight), maxHeight);
      setCardHeight(`${finalHeight}px`);
    }
  }, []);

  // Mobile scroll progress
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"]
  });

  // Desktop/Tablet scroll progress
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"]
  });

  // Calcola le distanze scrollabili
  const calculateDistances = useCallback(() => {
    // Calcola prima l'altezza delle card per desktop
    calculateCardHeight();

    // Desktop
    if (desktopCardsRef.current && stickyWrapperRef.current) {
      const cardsWidth = desktopCardsRef.current.scrollWidth;
      const visibleWidth = stickyWrapperRef.current.clientWidth;
      const distance = cardsWidth - visibleWidth;
      setScrollableDistance(distance);
      // Imposta subito la posizione iniziale (prima card visibile)
      desktopX.set(0);
      // Inizializza gli stati del fade (siamo all'inizio)
      setDesktopIsBeginning(true);
      setDesktopIsEnd(false);
    }

    // Mobile
// Nel calculateDistances, per mobile:
if (mobileCardsRef.current) {
  const cardsWidth = mobileCardsRef.current.scrollWidth;
  // Su mobile le card sono w-screen, quindi usiamo la viewport reale
  const visibleWidth = window.innerWidth;
  const distance = cardsWidth - visibleWidth;
  setMobileScrollableDistance(distance);
  mobileX.set(-distance);
  // Inizializza gli stati del fade (siamo alla fine)
  setMobileIsBeginning(false);
  setMobileIsEnd(true);
}
  }, [desktopX, mobileX, calculateCardHeight]);

  // Inizializzazione
  useEffect(() => {
    // Aspetta che il DOM sia pronto
    const timer = setTimeout(() => {
      calculateDistances();
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [calculateDistances]);

  // Ricalcola su resize
  useEffect(() => {
    const handleResize = () => {
      calculateDistances();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDistances]);

  // Sincronizza scroll desktop
  useEffect(() => {
    if (!isReady || scrollableDistance === 0) return;

    const unsubscribe = desktopScrollProgress.on('change', (progress) => {
      // progress: 0 → 1
      // x: 0 → -scrollableDistance (invertito)
      // Quando progress = 0, vedi la prima card (x = 0)
      // Quando progress = 1, vedi l'ultima card (x = -scrollableDistance)
      const newX = -scrollableDistance * progress;
      desktopX.set(newX);

      // Aggiorna stati per il fade
      // All'inizio: progress vicino a 0 (x vicino a 0)
      setDesktopIsBeginning(progress < 0.000001);
      // Alla fine: progress vicino a 1 (x vicino a -scrollableDistance)
      setDesktopIsEnd(progress > 0.999999);
    });

    return unsubscribe;
  }, [isReady, scrollableDistance, desktopScrollProgress, desktopX]);

  // Sincronizza scroll mobile
  useEffect(() => {
    if (!isReady || mobileScrollableDistance === 0) return;

    const unsubscribe = mobileScrollProgress.on('change', (progress) => {
      const newX = -mobileScrollableDistance * (1 - progress);
      mobileX.set(newX);

      // Aggiorna stati per il fade
      setMobileIsBeginning(progress > 0.98);
      setMobileIsEnd(progress < 0.02);
    });

    return unsubscribe;
  }, [isReady, mobileScrollableDistance, mobileScrollProgress, mobileX]);

  // Funzioni per calcolare il maskImage dinamico
  const getDesktopMaskImage = () => {
    if (desktopIsBeginning && desktopIsEnd) {
      return 'none';
    } else if (desktopIsBeginning) {
      return 'linear-gradient(to right, black, black calc(100% - 128px), transparent)';
    } else if (desktopIsEnd) {
      return 'linear-gradient(to right, transparent, black 128px, black)';
    } else {
      return 'linear-gradient(to right, transparent, black 128px, black calc(100% - 128px), transparent)';
    }
  };

  const getMobileMaskImage = () => {
    if (mobileIsBeginning && mobileIsEnd) {
      return 'none';
    } else if (mobileIsBeginning) {
      return 'linear-gradient(to right, black, black calc(100% - 64px), transparent)';
    } else if (mobileIsEnd) {
      return 'linear-gradient(to right, transparent, black 64px, black)';
    } else {
      return 'linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)';
    }
  };

  return (
    <div className="performance-section">
      <DesktopScrollSection
        containerRef={desktopContainerRef}
        stickyWrapperRef={stickyWrapperRef}
        cardsRef={desktopCardsRef}
        isReady={isReady}
        getMaskImage={getDesktopMaskImage}
        x={desktopX}
        performanceData={performanceData}
        roasData={roasData}
        channelPerformanceData={channelPerformanceData}
        trafficMixData={trafficMixData}
        kpis={kpis}
        cardHeight={cardHeight}
        showStickyText={showStickyText}
      />

      {/* Section intro - only for mobile */}
      <div className="max-w-content mx-auto relative z-10">
        <MobileScrollSection
          containerRef={mobileContainerRef}
          stickyWrapperRef={mobileStickyWrapperRef}
          cardsRef={mobileCardsRef}
          cardRef={cardRef}
          isReady={isReady}
          getMaskImage={getMobileMaskImage}
          x={mobileX}
          performanceData={performanceData}
          roasData={roasData}
          channelPerformanceData={channelPerformanceData}
          trafficMixData={trafficMixData}
          kpis={kpis}
        />
      </div>
    </div>
  );
};

export default PerformanceMetrics;