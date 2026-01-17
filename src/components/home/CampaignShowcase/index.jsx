"use client";
import React, { useState, useEffect } from 'react';
import DesktopSection from './DesktopSection';
import MobileSection from './MobileSection';
import { CAMPAIGNS } from './constants';

const CampaignShowcase = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Durante SSR, renderizza entrambe con CSS
  if (!isMounted) {
    return (
      <div className="campaign-showcase-section">
        <div className="md:hidden">
          <MobileSection campaigns={CAMPAIGNS} />
        </div>
        <div className="hidden md:block">
          <DesktopSection campaigns={CAMPAIGNS} />
        </div>
      </div>
    );
  }

  return (
    <div className="campaign-showcase-section">
      {isMobile ? (
        <MobileSection campaigns={CAMPAIGNS} />
      ) : (
        <DesktopSection campaigns={CAMPAIGNS} />
      )}
    </div>
  );
};

export default CampaignShowcase;
