"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
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

  // DEBUG: Monitor scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [debugInfo, setDebugInfo] = useState({
    progress: 0,
    xValue: 0,
    cardsWidth: 0,
    visibleWidth: 0,
    scrollableDistance: 0,
    cardWidths: [],
    cardCount: 0,
    totalGap: 0,
    containerHeight: 0,
    scrollPosition: 0
  });

  const [screenWidth, setScreenWidth] = useState(0);

  // Get screen width only on client side to avoid hydration errors
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const cards = cardsRef.current?.children || [];
      const cardWidths = Array.from(cards).map(card => card.offsetWidth);
      const cardsWidth = cardsRef.current?.scrollWidth || 0;
      const visibleWidth = wrapperRef.current?.clientWidth || 0;

      // Calcola il gap totale
      const totalCardWidth = cardWidths.reduce((sum, width) => sum + width, 0);
      const totalGap = cardsWidth - totalCardWidth;

      setDebugInfo({
        progress,
        xValue: x.get(),
        cardsWidth,
        visibleWidth,
        scrollableDistance: cardsWidth - visibleWidth,
        cardWidths,
        cardCount: cards.length,
        totalGap,
        containerHeight: containerRef.current?.offsetHeight || 0,
        scrollPosition: window.scrollY
      });
    });
    return unsubscribe;
  }, [scrollYProgress, x, cardsRef, wrapperRef, containerRef]);

  return (
    <div className="hidden md:block">
      {/* DEBUG PANEL - Sticky position */}
      <div style={{
        position: 'sticky',
        top: '10px',
        right: '10px',
        marginBottom: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '10px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '320px',
        lineHeight: '1.4'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#00ff00' }}>
          💻 DESKTOP DEBUG (Screen: {screenWidth}px)
        </div>
        <div style={{ color: debugInfo.progress > 0.99 ? '#00ff00' : '#ffffff' }}>
          Progress: {(debugInfo.progress * 100).toFixed(1)}%
        </div>
        <div>X Position: {debugInfo.xValue.toFixed(2)}px</div>
        <div style={{ fontSize: '9px', marginTop: '3px', color: '#888' }}>
          Container H: {debugInfo.containerHeight}px | Scroll: {debugInfo.scrollPosition}px
        </div>

        <div style={{ marginTop: '5px', borderTop: '1px solid #333', paddingTop: '5px' }}>
          <div style={{ color: '#ffaa00', fontWeight: 'bold' }}>📏 DIMENSIONI</div>
          <div>Total Cards Width: {debugInfo.cardsWidth}px</div>
          <div>Visible Width: {debugInfo.visibleWidth}px</div>
          <div>Scrollable: {debugInfo.scrollableDistance}px</div>
        </div>

        <div style={{ marginTop: '5px', borderTop: '1px solid #333', paddingTop: '5px' }}>
          <div style={{ color: '#00ffff', fontWeight: 'bold' }}>🎴 CARD ({debugInfo.cardCount})</div>
          {debugInfo.cardWidths.map((width, i) => (
            <div key={i} style={{ fontSize: '9px' }}>
              Card {i + 1}: {width}px
            </div>
          ))}
          <div style={{ marginTop: '3px', color: '#ff6600' }}>
            Sum Cards: {debugInfo.cardWidths.reduce((sum, w) => sum + w, 0)}px
          </div>
          <div style={{ color: '#ff00ff' }}>
            Total Gap: {debugInfo.totalGap}px
          </div>
          <div style={{ fontSize: '9px', color: '#888' }}>
            Gap/Card: {debugInfo.cardCount > 1 ? (debugInfo.totalGap / (debugInfo.cardCount - 1)).toFixed(1) : 0}px
          </div>
        </div>

        <div style={{ marginTop: '5px', color: isReady ? '#00ff00' : '#ff0000' }}>
          Ready: {isReady ? 'YES ✓' : 'NO ✗'}
        </div>
        <div style={{ fontSize: '9px', marginTop: '5px', opacity: 0.7 }}>
          🔴 Container 500vh | 🔵 Sticky | 🟢 Wrapper | 🟡 Cards
        </div>
      </div>

      {/* Container alto 500vh per dare spazio allo scroll */}
      <div
        style={{
          height: '500vh',
          position: 'relative',
          // DEBUG: background rosso per container scroll
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          outline: '2px solid red',
          zIndex: 1
        }}
        ref={containerRef}
      >
        {/* Area sticky che rimane fissa durante lo scroll */}
        <div
          className="sticky flex flex-col justify-center"
          style={{
            top: '15vh',
            height: '80vh',
            // DEBUG: background blu per area sticky
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            outline: '2px solid blue'
          }}
        >
          <div className="w-full overflow-hidden">
            {/* Wrapper delle card con fade ai bordi */}
            <div
              ref={wrapperRef}
              className="mx-auto w-full relative overflow-x-hidden max-w-content"
              style={{
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.2s ease-out, mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
                maskImage,
                WebkitMaskImage: maskImage,
                // DEBUG: background verde per wrapper
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                outline: '2px solid green'
              }}
            >
              {/* Container delle card che si muove orizzontalmente */}
              <motion.div
                ref={cardsRef}
                className="performance-cards-flex"
                style={{
                  x,
                  height: cardHeight,
                  // DEBUG: background giallo per container cards che si muove
                  backgroundColor: 'rgba(255, 255, 0, 0.1)',
                  outline: '2px solid yellow'
                }}
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
