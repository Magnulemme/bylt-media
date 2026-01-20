"use client";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCountUp } from '../../../hooks/useCountUp';

/**
 * Hook per calcolare il top position per centrare verticalmente le card mobile
 */
const useCenteredPosition = (cardRef) => {
  const [topPosition, setTopPosition] = useState('0');

  const calculatePosition = useCallback(() => {
    if (!cardRef?.current) return;

    const viewportHeight = window.innerHeight;
    const cardHeight = cardRef.current.offsetHeight;
    const calculatedTop = Math.max(0, (viewportHeight - cardHeight) / 2);

    setTopPosition(`${calculatedTop}px`);
  }, [cardRef]);

  useEffect(() => {
    const timer = setTimeout(calculatePosition, 100);
    window.addEventListener('resize', calculatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [calculatePosition]);

  return topPosition;
};

/**
 * Hook per calcolare l'altezza delle card dinamicamente in base alla viewport
 */
const useCardHeight = () => {
  const [cardHeight, setCardHeight] = useState('auto');

  const calculateHeight = useCallback(() => {
    const viewportHeight = window.innerHeight;
    // Usa 65% della viewport come base, con min e max
    const targetHeight = viewportHeight * 0.65;
    const minHeight = 280;
    const maxHeight = 500;

    const finalHeight = Math.min(Math.max(targetHeight, minHeight), maxHeight);
    setCardHeight(`${finalHeight}px`);
  }, []);

  useEffect(() => {
    const timer = setTimeout(calculateHeight, 50);
    window.addEventListener('resize', calculateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateHeight);
    };
  }, [calculateHeight]);

  return cardHeight;
};

// Animated Stat Component
const AnimatedStat = ({ value, suffix = '', prefix = '', label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const animatedValue = useCountUp(value, 2000, isVisible);

  return (
    <div ref={ref} className="stats-card">
      <div className="stats-value">
        {prefix}{animatedValue}{suffix}
      </div>
      <div className="text-label-lg font-bold text-slate-400">
        {label}
      </div>
    </div>
  );
};

const MobileSection = ({ campaigns }) => {
  const containerRef = useRef(null);
  const stickyContentRef = useRef(null);
  const cardHeight = useCardHeight();
  const topPosition = useCenteredPosition(stickyContentRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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
          className="sticky overflow-hidden"
          style={{
            top: topPosition
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

      {/* Titolo che appare DOPO lo scroll container */}
      <div className="campaign-header">
        <h3 className="heading-h3 text-white mb-2">
          Creative That Converts
        </h3>
        <p className="text-body-sm">
          Every campaign is crafted to stop the scroll and drive action. From concept to conversion, we deliver creative that performs.
        </p>
      </div>

      {/* Stats grid con animazione */}
      <div className="campaign-stats">
        <div className="stats-grid">
          <AnimatedStat value={500} suffix="+" label="Campaigns" delay={0} />
          <AnimatedStat value={1} suffix="B+" label="Impressions" delay={100} />
          <AnimatedStat value={50} suffix="+" label="Brands" delay={200} />
          <AnimatedStat value={98} suffix="%" label="Retention" delay={300} />
        </div>
      </div>
    </div>
  );
};

const CampaignImage = ({ campaign, index, total, scrollYProgress, cardHeight }) => {
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  // La prima immagine è sempre visibile
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
          className="h-full w-auto object-contain"
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
        className="w-full overflow-hidden flex items-end justify-center"
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
          className="h-full w-auto object-contain"
          style={{
            height: cardHeight,
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
