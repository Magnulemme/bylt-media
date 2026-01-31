"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import StatsGrid from '../../shared/StatsGrid';
import { useScrollProgress } from './hooks/useScrollProgress';

/**
 * Hook per calcolare l'altezza delle card dinamicamente in base alla viewport
 */
const DEBUG = true;
const log = (...args) => DEBUG && console.log('📱 [MobileSection]', ...args);

const useCardHeight = () => {
  const [cardHeight, setCardHeight] = useState('auto');

  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const targetHeight = viewportHeight * 0.65;
      const minHeight = 280;
      const maxHeight = 500;

      const finalHeight = Math.min(Math.max(targetHeight, minHeight), maxHeight);
      log('useCardHeight:', { viewportHeight, targetHeight, finalHeight });
      setCardHeight(`${finalHeight}px`);
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  return cardHeight;
};

/**
 * Hook per calcolare il top position per centrare verticalmente le card mobile.
 * Dipende da cardHeight per ricalcolare quando l'altezza cambia.
 */
const useCenteredPosition = (cardRef, cardHeight) => {
  const [topPosition, setTopPosition] = useState('0');

  useEffect(() => {
    const calculatePosition = () => {
      if (!cardRef.current) return;

      const viewportHeight = window.innerHeight;
      const elementHeight = cardRef.current.offsetHeight;
      const rect = cardRef.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(cardRef.current);
      const parentStyle = cardRef.current.parentElement ? window.getComputedStyle(cardRef.current.parentElement) : null;
      const calculatedTop = Math.max(0, (viewportHeight - elementHeight) / 2);

      log('useCenteredPosition:', {
        viewportHeight,
        elementHeight,
        calculatedTop,
        cardHeight,
        rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
        padding: { top: computedStyle.paddingTop, bottom: computedStyle.paddingBottom },
        parentPadding: parentStyle ? { top: parentStyle.paddingTop, bottom: parentStyle.paddingBottom } : null,
      });

      setTopPosition(`${calculatedTop}px`);
    };

    // Aspetta un frame per assicurarsi che il DOM abbia applicato cardHeight
    requestAnimationFrame(calculatePosition);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
    };
  }, [cardRef, cardHeight]); // Ricalcola quando cardHeight cambia

  return topPosition;
};

// Stats data for CampaignShowcase
const campaignStats = [
  { value: 500, suffix: '+', label: 'Campaigns' },
  { value: 1, suffix: 'B+', label: 'Impressions' },
  { value: 50, suffix: '+', label: 'Brands' },
  { value: 98, suffix: '%', label: 'Retention' },
];

const MobileSection = ({ campaigns }) => {
  const stickyContentRef = useRef(null);
  const cardHeight = useCardHeight();
  const topPosition = useCenteredPosition(stickyContentRef, cardHeight);

  // Usa useScrollProgress per inizializzazione corretta con micro-scroll forzato
  const { containerRef, scrollYProgress, isReady } = useScrollProgress(true);

  return (
    <div className="md:hidden mt-16">
      {/* Container alto per dare spazio allo scroll */}
      <div
        ref={containerRef}
        style={{
          height: `${campaigns.length * 100}vh`,
          position: 'relative'
        }}
      >
        {/* Area sticky con solo le immagini - centrata verticalmente */}
        <div
          className="sticky"
          style={{
            top: topPosition,
            overflowX: 'clip',
            overflowY: 'visible',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <div
            ref={stickyContentRef}
            className="relative w-full flex items-center justify-center"
            style={{
              height: cardHeight
            }}
          >
            {/* Stack di immagini - ogni nuova viene rivelata dal basso */}
            {campaigns.map((campaign, index) => (
              <CampaignImage
                key={campaign.id}
                campaign={campaign}
                index={index}
                total={campaigns.length}
                scrollYProgress={scrollYProgress}
                cardHeight={cardHeight}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Titolo che appare DOPO lo scroll container - allineato a sinistra */}
      <div className="campaign-header text-left">
        <h3 className="heading-h2 text-white">
          Creative That Converts
        </h3>
        <p className="text-subheader mt-4">
          Every campaign is crafted to stop the scroll and drive action. From concept to conversion, we deliver creative that performs.
        </p>
      </div>

      {/* Stats grid con animazione */}
      <div className="campaign-stats">
        <StatsGrid stats={campaignStats} />
      </div>
    </div>
  );
};

const CampaignImage = ({ campaign, index, total, scrollYProgress, cardHeight }) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  // La prima immagine è sempre visibile - allineata in basso come le altre
  if (index === 0) {
    return (
      <div
        className="absolute flex items-center justify-center"
        style={{
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={campaign.image}
          alt={campaign.label}
          className="w-[80vw] h-auto object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Container che cresce in altezza, finisce all'85% per mostrare l'immagine completa
  const revealEnd = start + (end - start) * 0.85;
  const containerHeight = useTransform(
    scrollYProgress,
    [start, revealEnd],
    ['0%', '100%']
  );

  // Blur che va da 5px a 0px, finisce all'85% della transizione
  const blurEnd = start + (end - start) * 0.85;
  const blurAmount = useTransform(
    scrollYProgress,
    [start, blurEnd],
    [5, 0]
  );

  return (
    <motion.div
      className="absolute flex items-end justify-center overflow-hidden"
      style={{
        zIndex: index + 1,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Container interno che cresce */}
      <motion.div
        className="w-full overflow-hidden flex items-center justify-center"
        style={{
          height: containerHeight,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)',
        }}
      >
        {/* Immagine sempre alla dimensione finale con blur */}
        <motion.img
          src={campaign.image}
          alt={campaign.label}
          className="w-[80vw] h-auto object-contain"
          style={{
            filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
            WebkitMaskImage: `url(${campaign.image})`,
            maskImage: `url(${campaign.image})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default MobileSection;
