import React from 'react';
import { CaseStudiesHero, WhyBylt, CaseStudyCTA } from './sections';
import BrandMarquee from './sections/template/BrandMarquee';

const CaseStudiesPage = () => {
    return (
        <div className="relative service-page max-w-(--breakpoint-outer) mx-auto" style={{ background: '#020617', zIndex: 10 }}>
            <div className="case-studies-hero-wrapper">
                <CaseStudiesHero />
            </div>
            <div className="case-studies-reveal-section">
                <BrandMarquee text="WHY CHOOSE BYLT" className="case-studies-marquee pt-0 mb-0 md:mb-0" />
            </div>
            <WhyBylt />
            <CaseStudyCTA />
        </div>
    );
};

export default CaseStudiesPage;
