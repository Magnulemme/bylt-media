"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import RevenueChart from './RevenueChart';
import TrafficDistributionChart from './TrafficDistributionChart';
import ROASTrendChart from './ROASTrendChart';
import ConversionTrendChart from './ConversionTrendChart';
import KPICard from './KPICard';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useFadeMask } from './hooks/useFadeMask';

/**
 * Sezione mobile
 * Le card scrollano orizzontalmente da destra a sinistra
 * Le card sono centrate verticalmente nello schermo con altezza fissa per sincronizzazione
 */
const MobileSection = ({ performanceData, roasData, channelPerformanceData, trafficMixData, kpis }) => {
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(true);
  const maskImage = useFadeMask(isAtStart, isAtEnd, 64);

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
    totalGap: 0
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
        totalGap
      });
    });
    return unsubscribe;
  }, [scrollYProgress, x, cardsRef, wrapperRef]);

  return (
    <div className="md:hidden">
      {/* DEBUG PANEL - Sticky position */}
      <div style={{
        position: 'sticky',
        top: '10px',
        left: '10px',
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
          📱 MOBILE (Screen: {screenWidth}px)
        </div>
        <div style={{ color: debugInfo.progress > 0.99 ? '#00ff00' : '#ffffff' }}>
          Progress: {(debugInfo.progress * 100).toFixed(1)}%
        </div>
        <div>X Position: {debugInfo.xValue.toFixed(2)}px</div>

        <div style={{ marginTop: '5px', borderTop: '1px solid #333', paddingTop: '5px' }}>
          <div style={{ color: '#ffaa00', fontWeight: 'bold' }}>📏 DIMENSIONI</div>
          <div>Total Cards Width: {debugInfo.cardsWidth}px</div>
          <div>Visible Width: {debugInfo.visibleWidth}px</div>
          <div style={{ color: '#ff6600' }}>Scrollable: {debugInfo.scrollableDistance}px</div>
          <div style={{ color: '#ff0000', fontWeight: 'bold' }}>
            DIFF: {debugInfo.cardsWidth - debugInfo.visibleWidth}px
          </div>
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

        <div style={{ marginTop: '5px', borderTop: '1px solid #333', paddingTop: '5px' }}>
          <div style={{ color: '#ffff00', fontSize: '9px' }}>
            Expected X at 100%: 0px
          </div>
          <div style={{ color: debugInfo.progress > 0.99 ? (Math.abs(debugInfo.xValue) < 5 ? '#00ff00' : '#ff0000') : '#888888' }}>
            Current X diff: {Math.abs(debugInfo.xValue).toFixed(2)}px
          </div>
        </div>

        <div style={{ marginTop: '5px', color: isReady ? '#00ff00' : '#ff0000' }}>
          Ready: {isReady ? 'YES ✓' : 'NO ✗'}
        </div>
        <div style={{ fontSize: '9px', marginTop: '5px', opacity: 0.7 }}>
          🔴 Container 400vh | 🔵 Sticky | 🟢 Wrapper | 🟡 Cards
        </div>
      </div>

      {/* Container alto per dare spazio allo scroll */}
      <div
        style={{
          height: '400vh',
          position: 'relative',
          // DEBUG: background rosso per container scroll
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          outline: '2px solid red',
          zIndex: 1
        }}
        ref={containerRef}
      >
        {/* Area sticky centrata verticalmente */}
        <div
          className="sticky overflow-x-clip flex items-center"
          style={{
            top: '20vh',
            // DEBUG: background blu per area sticky
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            outline: '2px solid blue',
            zIndex: 2
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
                WebkitMaskImage: maskImage,
                // DEBUG: background verde per wrapper
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                outline: '2px solid green'
              }}
            >
              {/* Container delle card che si muove orizzontalmente */}
              <motion.div
                ref={cardsRef}
                className="flex items-stretch performance-mobile-cards gap-4"
                style={{
                  x,
                  // DEBUG: background giallo per container cards che si muove
                  backgroundColor: 'rgba(255, 255, 0, 0.1)',
                  outline: '2px solid yellow'
                }}
              >
                {/* Revenue Chart - Always show (most important) */}
                <div className="performance-mobile-card [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <RevenueChart data={performanceData} />
                </div>

                {/* ROAS Trend - Always show (key metric) */}
                <div className="performance-mobile-card [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ROASTrendChart data={roasData} />
                </div>

                {/* KPI Card - Always show (summary) */}
                <div className="performance-mobile-card">
                  <KPICard isMobile roasData={roasData} kpis={kpis} />
                </div>

                {/* Conversion & Traffic - Hide on very small screens (< 300px) */}
                <div className="performance-mobile-card performance-mobile-card-optional [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <ConversionTrendChart data={channelPerformanceData} />
                </div>
                <div className="performance-mobile-card performance-mobile-card-optional [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                  <TrafficDistributionChart data={trafficMixData} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSection;
