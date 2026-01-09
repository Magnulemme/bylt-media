import React from 'react';
import { ServiceHero, ServiceDetails, ServiceCTA } from './sections';

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
            <ServiceDetails service={service} />
            <ServiceCTA />
        </div>
    );
};

export default ServicePage;
