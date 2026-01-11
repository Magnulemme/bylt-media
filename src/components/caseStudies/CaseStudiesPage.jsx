import React from 'react';
import { CaseStudiesHero, CaseStudyCTA } from './sections';

const CaseStudiesPage = () => {
    return (
        <div className="relative service-page" style={{ background: '#020617', zIndex: 10 }}>
            <CaseStudiesHero />
            <CaseStudyCTA />
        </div>
    );
};

export default CaseStudiesPage;
