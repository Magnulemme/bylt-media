"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../PerformanceMetrics/hooks/useScrollAnimation';
import { useFadeMask } from '../PerformanceMetrics/hooks/useFadeMask';
import { useCardHeight } from './hooks/useCardHeight';

const DesktopSection = ({ campaigns }) => {
  // reversed=true per scroll da destra a sinistra
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(false, true);
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
            top: stickyTop,
            overflowX: 'clip',
            overflowY: 'visible'
          }}
        >
          <div className="w-full" style={{ overflowX: 'clip', overflowY: 'visible' }}>
            {/* Wrapper con fade ai bordi */}
            <div
              ref={wrapperRef}
              className="mx-auto w-full relative max-w-content"
              style={{
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                overflowX: 'clip',
                overflowY: 'visible',
                maskImage,
                WebkitMaskImage: maskImage
              }}
            >
              {/* Container che si muove orizzontalmente - scroll invertito (dx → sx) */}
              <motion.div
                ref={cardsRef}
                className="flex items-center gap-8 px-8"
                style={{ x }}
              >
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="shrink-0 w-80"
                    style={{ height: cardHeight !== 'auto' ? cardHeight : undefined }}
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.label}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Titolo sotto le card - allineato a sinistra */}
          {showText && (
            <div className="campaign-header text-left">
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

export default DesktopSection;
