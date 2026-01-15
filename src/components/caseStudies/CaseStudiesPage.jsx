import React from 'react';
import { CaseStudiesHero, WhyBylt, CaseStudyCTA } from './sections';

const CaseStudiesPage = () => {
    return (
        <div className="relative service-page" style={{ background: '#020617', zIndex: 10 }}>
            <CaseStudiesHero />
            <WhyBylt />
            <CaseStudyCTA />
        </div>
    );
};

export default CaseStudiesPage;
