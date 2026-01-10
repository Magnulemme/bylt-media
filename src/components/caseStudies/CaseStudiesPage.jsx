import React from 'react';
import { CaseStudiesHero, CaseStudiesGrid, CaseStudyCTA } from './sections';

const CaseStudiesPage = () => {
    return (
        <div
            className="relative"
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <CaseStudiesHero />
            <CaseStudiesGrid />
            <CaseStudyCTA />
        </div>
    );
};

export default CaseStudiesPage;
