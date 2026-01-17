"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MobileSection = ({ campaigns }) => {
  const containerRef = useRef(null);

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
        {/* Area sticky centrale */}
        <div
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Stack di immagini - ogni nuova viene rivelata dal basso */}
            {campaigns.map((campaign, index) => (
              <CampaignImage
                key={campaign.id}
                campaign={campaign}
                index={index}
                total={campaigns.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CampaignImage = ({ campaign, index, total, scrollYProgress }) => {
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
          height: '65vh',
        }}
      >
        <img
          src={campaign.image}
          alt={campaign.label}
          className="h-[65vh] max-h-150 w-auto object-contain"
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
        height: '65vh',
      }}
    >
      {/* Container interno che cresce */}
      <motion.div
        className="w-full overflow-hidden flex items-end justify-center"
        style={{
          height: containerHeight, // Cresce da 0% a 100%
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%)',
        }}
      >
        {/* Immagine sempre alla dimensione finale con blur */}
        <motion.img
          src={campaign.image}
          alt={campaign.label}
          className="h-[65vh] max-h-150 w-auto object-contain"
          style={{
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