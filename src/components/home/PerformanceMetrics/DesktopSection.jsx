"use client";
import React from 'react';
import { motion } from 'framer-motion';
import RevenueChart from './RevenueChart';
import TrafficDistributionChart from './TrafficDistributionChart';
import ROASTrendChart from './ROASTrendChart';
import ConversionTrendChart from './ConversionTrendChart';
import KPICard from './KPICard';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useCardHeight } from './hooks/useCardHeight';
import { useFadeMask } from './hooks/useFadeMask';

/**
 * Sezione desktop/tablet
 * Le card scrollano orizzontalmente da sinistra a destra
 */
const DesktopSection = ({ performanceData, roasData, channelPerformanceData, trafficMixData, kpis }) => {
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(false);
  const { cardHeight, showText } = useCardHeight();
  const maskImage = useFadeMask(isAtStart, isAtEnd, 128);

  return (
    <div className="hidden md:block">
      {/* Container alto 500vh per dare spazio allo scroll */}
      <div style={{ height: '500vh' }} ref={containerRef}>
        {/* Area sticky che rimane fissa durante lo scroll */}
        <div className="sticky flex flex-col justify-center" style={{ top: '15vh', height: '80vh' }}>
          <div className="w-full overflow-hidden">
            {/* Wrapper delle card con fade ai bordi */}
            <div
              ref={wrapperRef}
              className="mx-auto w-full relative overflow-x-hidden max-w-content"
              style={{
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.2s ease-out, mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
                maskImage,
                WebkitMaskImage: maskImage
              }}
            >
              {/* Container delle card che si muove orizzontalmente */}
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

          {/* Testo sotto le card (se c'è spazio) */}
          {showText && (
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
};

export default DesktopSection;
