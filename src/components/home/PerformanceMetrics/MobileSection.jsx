"use client";
import React from 'react';
import { motion } from 'framer-motion';
import ChartCard from './ChartCard';
import KPICard from './KPICard';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useFadeMask } from './hooks/useFadeMask';
import { useCenteredPosition } from './hooks/useCenteredPosition';

/**
 * Sezione mobile
 * Le card scrollano orizzontalmente da destra a sinistra
 * Le card sono centrate verticalmente nello schermo con altezza fissa per sincronizzazione
 */
const MobileSection = ({ performanceData, roasData, channelPerformanceData, trafficMixData, kpis }) => {
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(true);
  const maskImage = useFadeMask(isAtStart, isAtEnd, 64);
  const topPosition = useCenteredPosition(wrapperRef);

  return (
    <div className="md:hidden">
      {/* Container alto per dare spazio allo scroll */}
      <div
        style={{
          height: '400vh',
          position: 'relative',
          zIndex: 1
        }}
        ref={containerRef}
      >
        {/* Area sticky centrata verticalmente */}
        <div
          className="sticky overflow-x-clip flex items-center"
          style={{
            top: topPosition,
            zIndex: 2,
            paddingRight: '1rem'
          }}
        >
          <div className="w-full">
            {/* Wrapper delle card con fade ai bordi */}
            <div
              ref={wrapperRef}
              className="overflow-hidden"
              style={{
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.2s ease-out',
                maskImage,
                WebkitMaskImage: maskImage
              }}
            >
              {/* Container delle card che si muove orizzontalmente */}
              <motion.div
                ref={cardsRef}
                className="flex items-stretch performance-mobile-cards gap-4"
                style={{
                  x
                }}
              >
                {/* Revenue Chart - Always show (most important) */}
                <div className="performance-mobile-card [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ChartCard type="revenue" data={performanceData} />
                </div>

                {/* ROAS Trend - Always show (key metric) */}
                <div className="performance-mobile-card [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ChartCard type="roas" data={roasData} />
                </div>

                {/* KPI Card - Always show (summary) */}
                <div className="performance-mobile-card">
                  <KPICard roasData={roasData} kpis={kpis} />
                </div>

                {/* Conversion & Traffic - Hide on very small screens (< 300px) */}
                <div className="performance-mobile-card performance-mobile-card-optional [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ChartCard type="conversion" data={channelPerformanceData} />
                </div>
                <div className="performance-mobile-card performance-mobile-card-optional [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ChartCard type="traffic" data={trafficMixData} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testo che appare DOPO lo scroll container */}
      <div className="performance-mobile-text-container">
        <h3 className="heading-h3 text-white mb-2">
          The Numbers Speak for Themselves
        </h3>
        <p className="text-body-sm">
          Total transparency on performance. Every metric is tracked, analyzed, and optimized to maximize your return on investment.
        </p>
      </div>
    </div>
  );
};

export default MobileSection;
