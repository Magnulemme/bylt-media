"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollProgress } from './hooks/useScrollProgress';

/**
 * Hook per calcolare l'altezza delle card dinamicamente in base alla viewport
 */
const DEBUG = true;
const log = (...args) => DEBUG && console.log('📱 [MobileSection]', ...args);

const useCardHeight = (imageRef) => {
  const [cardHeight, setCardHeight] = useState('auto');

  useEffect(() => {
    const measureImage = () => {
      if (!imageRef?.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      if (rect.height > 0) {
        log('useCardHeight (from image):', { imageHeight: rect.height });
        setCardHeight(`${rect.height}px`);
      }
    };

    // Misura dopo che l'immagine è caricata
    const img = imageRef?.current;
    if (img) {
      if (img.complete) {
        measureImage();
      } else {
        img.addEventListener('load', measureImage);
      }
    }

    window.addEventListener('resize', measureImage);
    return () => {
      window.removeEventListener('resize', measureImage);
      img?.removeEventListener('load', measureImage);
    };
  }, [imageRef]);

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


const MobileSection = ({ campaigns }) => {
  const stickyContentRef = useRef(null);
  const firstImageRef = useRef(null);
  const cardHeight = useCardHeight(firstImageRef);
  const topPosition = useCenteredPosition(stickyContentRef, cardHeight);

  // Usa useScrollProgress per inizializzazione corretta con micro-scroll forzato
  const { containerRef, scrollYProgress, isReady } = useScrollProgress(true);

  return (
    <div className="md:hidden">
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
                imageRef={index === 0 ? firstImageRef : null}
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

      {/* What's Included */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="campaign-stats grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
      >
        {[
          'Performance score',
          'Competitor analysis',
          '3 actionable recommendations',
          '15-min strategy call',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
            <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const CampaignImage = ({ campaign, index, total, scrollYProgress, cardHeight, imageRef }) => {
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
          ref={imageRef}
          src={campaign.image}
          alt={campaign.label}
          className="w-[80vw] h-auto object-contain"
          loading="eager"
        />
      </div>
    );
  }

  // Reveal con clip-path: da nascosto (100% dall'alto) a visibile (0%)
  const revealEnd = start + (end - start) * 0.85;
  const clipTop = useTransform(
    scrollYProgress,
    [start, revealEnd],
    [100, 0]
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
      className="absolute flex items-center justify-center"
      style={{
        zIndex: index + 1,
        width: '100%',
        height: '100%',
        clipPath: useTransform(clipTop, (v) => `inset(${v}% 0 0 0)`),
      }}
    >
      {/* Immagine sempre centrata come la prima, rivelata dal basso con clip-path */}
      <motion.img
        src={campaign.image}
        alt={campaign.label}
        className="w-[80vw] h-auto object-contain"
        style={{
          filter: useTransform(blurAmount, (v) => `blur(${v}px)`),
        }}
      />
    </motion.div>
  );
};

export default MobileSection;
