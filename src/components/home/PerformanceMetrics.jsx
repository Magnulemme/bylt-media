"use client";
import React from 'react';
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
  return (
    <div className="performance-section">
      {/* Desktop/Tablet */}
      <DesktopSection
        performanceData={performanceData}
        roasData={roasData}
        channelPerformanceData={channelPerformanceData}
        trafficMixData={trafficMixData}
        kpis={kpis}
      />

      {/* Mobile */}
      <MobileSection
        performanceData={performanceData}
        roasData={roasData}
        channelPerformanceData={channelPerformanceData}
        trafficMixData={trafficMixData}
        kpis={kpis}
      />

      {/* Stili globali per le card mobile */}
      <style jsx global>{`
        /* ==========================================
           MOBILE CARDS - RESPONSIVE SIZING
           ========================================== */
        .performance-mobile-cards {
          overflow: visible !important;
          max-height: 550px;
        }

        .performance-mobile-card {
          flex-shrink: 0;
          width: 100%;
          max-width: 500px;
          max-height: 550px;
        }

        /* Hide optional cards on very small screens (< 300px) */
        @media (max-width: 299px) {
          .performance-mobile-card-optional {
            display: none;
          }
        }

        /* ==========================================
           SIMPLIFY CHART DETAILS ON SMALL SCREENS
           ========================================== */

        /* Very small screens (< 360px) */
        @media (max-width: 359px) {
          .performance-mobile-card .mt-4.pt-4.border-t p.text-xs.text-gray-500:last-child {
            display: none;
          }

          .performance-mobile-card > div > div {
            padding: 1rem !important;
          }

          .performance-mobile-card h3 {
            font-size: 0.75rem !important;
          }

          .performance-mobile-card p.text-xs.text-gray-600 {
            display: none;
          }

          .performance-mobile-card .flex.items-center.justify-between.mb-4 {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }

          .performance-mobile-card .flex.gap-3.text-xs,
          .performance-mobile-card .flex.gap-4.text-xs {
            flex-direction: column !important;
            gap: 0.25rem !important;
            align-items: flex-start !important;
          }

          .performance-mobile-card .mt-4.pt-4.border-t > .flex.items-center.justify-between {
            align-items: flex-start !important;
          }

          .performance-mobile-card .flex.items-baseline.gap-2 {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.25rem !important;
          }

          .performance-mobile-card .flex.items-center.gap-2 {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.25rem !important;
          }

          .performance-mobile-card .text-2xl {
            font-size: 1.25rem !important;
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
