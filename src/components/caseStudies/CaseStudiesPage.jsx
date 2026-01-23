import React from 'react';
import { CaseStudiesHero, WhyBylt, CaseStudyCTA } from './sections';
import BrandMarquee from './sections/template/BrandMarquee';

const CaseStudiesPage = () => {
    return (
        <div className="relative service-page" style={{ background: '#020617', zIndex: 10 }}>
            <CaseStudiesHero />
            <BrandMarquee text="WHY CHOOSE BYLT" className="pt-24 md:pt-32" />
            <WhyBylt />
            <CaseStudyCTA />
        </div>
    );
};

export default CaseStudiesPage;
