"use client";
import React, { useState, useEffect } from 'react';
import DesktopSection from './PerformanceMetrics/DesktopSection';
import MobileSection from './PerformanceMetrics/MobileSection';
import {
  performanceData,
  roasData,
  channelPerformanceData,
  trafficMixData,
  kpis
} from './PerformanceMetrics/constants';

const PerformanceMetrics = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Imposta mounted su true per evitare hydration mismatch
    setIsMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Durante SSR e hydration iniziale, renderizza entrambe con CSS (come prima)
  // Dopo il mount, switcha al rendering condizionale
  if (!isMounted) {
    return (
      <div className="performance-section">
        <div className="md:hidden">
          <MobileSection
            performanceData={performanceData}
            roasData={roasData}
            channelPerformanceData={channelPerformanceData}
            trafficMixData={trafficMixData}
            kpis={kpis}
          />
        </div>
        <div className="hidden md:block">
          <DesktopSection
            performanceData={performanceData}
            roasData={roasData}
            channelPerformanceData={channelPerformanceData}
            trafficMixData={trafficMixData}
            kpis={kpis}
          />
        </div>
      </div>
    );
  }

  // Dopo il mount, renderizza solo la sezione appropriata
  return (
    <div className="performance-section">
      {isMobile ? (
        <MobileSection
          performanceData={performanceData}
          roasData={roasData}
          channelPerformanceData={channelPerformanceData}
          trafficMixData={trafficMixData}
          kpis={kpis}
        />
      ) : (
        <DesktopSection
          performanceData={performanceData}
          roasData={roasData}
          channelPerformanceData={channelPerformanceData}
          trafficMixData={trafficMixData}
          kpis={kpis}
        />
      )}

      {/* Stili globali per le card mobile */}
      <style jsx global>{`
        /* ==========================================
           MOBILE CAROUSEL - NEGATIVE MARGIN
           ========================================== */
        .performance-carousel-mobile {
          margin-left: -1rem;
          margin-right: -1rem;
        }

        @media (min-width: 640px) {
          .performance-carousel-mobile {
            margin-left: -1.5rem;
            margin-right: -1.5rem;
          }
        }

        @media (min-width: 768px) {
          .performance-carousel-mobile {
            margin-left: 0;
            margin-right: 0;
          }
        }

        /* ==========================================
           MOBILE CARDS - RESPONSIVE SIZING
           ========================================== */
        .performance-mobile-cards {
          overflow: visible !important;
          max-height: 550px;
        }

        .performance-mobile-card {
          flex-shrink: 0;
          width: calc(100% - 60px) !important;
          min-width: 250px !important;
          max-width: 420px !important;
          max-height: 550px;
        }

        /* Smaller margin on very small screens */
        @media (max-width: 360px) {
          .performance-mobile-card {
            width: calc(100% - 30px) !important;
          }
        }

        /* Tablet+ sizing adjustments */
        @media (min-width: 500px) {
          .performance-mobile-card {
            max-width: 520px;
          }
        }

        @media (min-width: 640px) {
          .performance-mobile-card {
            max-width: 540px;
          }
        }

        @media (min-width: 768px) {
          .performance-mobile-card {
            max-width: 600px;
          }
        }
      `}</style>
    </div>
  );
};

export default PerformanceMetrics;
