"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../PerformanceMetrics/hooks/useScrollAnimation';
import { useFadeMask } from '../PerformanceMetrics/hooks/useFadeMask';

const DesktopSection = ({ campaigns }) => {
  const { containerRef, cardsRef, wrapperRef, x, isReady, isAtStart, isAtEnd } = useScrollAnimation(false);
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
          className="sticky top-0 flex items-center justify-center"
          style={{ height: '100vh' }}
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
                    className="flex-shrink-0"
                  >
                    <img
                      src={campaign.image}
                      alt={campaign.label}
                      className="h-[70vh] max-h-[700px] w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSection;
