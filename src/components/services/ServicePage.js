import React from 'react';
import { ServiceHero, ServiceWhyBylt, ServiceProcess, ServiceDetails, ServiceCTA } from './sections';
import BrandMarquee from '@/components/caseStudies/sections/template/BrandMarquee';

const ServicePage = ({ service }) => {
    if (!service) return null;

    return (
        <div
            className="relative service-page"
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <ServiceHero service={service} />
            <BrandMarquee text="WHY BYLT" />
            <ServiceWhyBylt service={service} />
            <ServiceProcess service={service} />
            <ServiceDetails service={service} />
            <ServiceCTA />
        </div>
    );
};

export default ServicePage;
