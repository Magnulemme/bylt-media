import React from 'react';
import { useProfiler } from '@/hooks/useProfiler';
import PartnersLogos from '@/components/shared/PartnersLogos';

const DemoReveal = () => {
    useProfiler('DemoReveal');

    return (
        <section className="demo-reveal-section">
            <div className="demo-reveal-container">
                <PartnersLogos />
            </div>
        </section>
    );
};

export default DemoReveal;
