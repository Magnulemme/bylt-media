"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../PerformanceMetrics/hooks/useScrollAnimation';
import { useFadeMask } from '../PerformanceMetrics/hooks/useFadeMask';
import { useCardHeight } from './hooks/useCardHeight';
import { useCountUp } from '../../../hooks/useCountUp';

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

const DesktopSection = ({ campaigns }) => {
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(false);
  const stickyContentRef = React.useRef(null);
  const { cardHeight, showText, stickyTop } = useCardHeight(stickyContentRef);
  const maskImage = useFadeMask(isAtStart, isAtEnd, 128);

  return (
    <div className="hidden md:block">
      {/* Container alto per dare spazio allo scroll */}
      <div
        ref={containerRef}
        style={{
          height: '400vh',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Area sticky che rimane fissa durante lo scroll */}
        <div
          ref={stickyContentRef}
          className="sticky flex flex-col"
          style={{
            top: stickyTop
          }}
        >
          <div className="w-full overflow-hidden">
            {/* Wrapper con fade ai bordi */}
            <div
              ref={wrapperRef}
              className="mx-auto w-full relative overflow-x-hidden max-w-content"
              style={{
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                maskImage,
                WebkitMaskImage: maskImage
              }}
            >
              {/* Container che si muove orizzontalmente */}
              <motion.div
                ref={cardsRef}
                className="flex items-center gap-8 px-8"
                style={{ x }}
              >
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="shrink-0 w-80"
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.label}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Titolo sotto le card */}
          {showText && (
            <div className="campaign-header">
              <h3 className="heading-h2 text-white">
                Creative That Converts
              </h3>
              <p className="text-subheader mt-4">
                Every campaign is crafted to stop the scroll and drive action. From concept to conversion, we deliver creative that performs.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats dopo lo sticky */}
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

export default DesktopSection;
