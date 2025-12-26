import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import { SectionIntro } from '../ui/section-headers';
import { useProfiler } from '@/hooks/useProfiler';

const SuccessStories = () => {
    useProfiler('SuccessStories');
    const stories = [
        {
            name: 'Happy Bar & Grill',
            logo: '/images/logos/225x170_happy_logo.png',
            industry: 'Restaurant Chain',
            metric: '+45% Brand Engagement',
            quote: 'The campaigns they create on a monthly basis significantly increase brand engagement and traffic to our website.',
            rating: 5,
            author: 'Marketing Director'
        },
        {
            name: 'Napudreni',
            logo: '/images/logos/napudreni.png',
            industry: 'Fashion Brand',
            metric: '75% Traffic Growth',
            quote: 'They are creative and have quite a lot of knowledge about all the new things in marketing.',
            rating: 5,
            author: 'Founder'
        },
        {
            name: 'Nissan',
            logo: '/images/logos/nisan.png',
            industry: 'Automotive Group',
            metric: 'All Time High Sales',
            quote: 'We achieved an All Time High in the sale of cars from an online campaign.',
            rating: 5,
            author: 'Sales Manager'
        },
        {
            name: 'Peugeot',
            logo: '/images/logos/Peugeot-@2x.png',
            industry: 'Automotive Brand',
            metric: '+60% Quality Inquiries',
            quote: 'We\'ve been able to increase the volume of quality inquiries that come from digital ads.',
            rating: 5,
            author: 'Digital Lead'
        },
        {
            name: 'Smart Consultants',
            logo: '/images/logos/smart-tower.png',
            industry: 'Business Consulting',
            metric: '3 Project Success',
            quote: 'We achieved serious sales volumes on three different projects. Quick response, flexibility and expertise.',
            rating: 5,
            author: 'CEO'
        },
    ];

    return (
        <section
            id="success-stories"
            className="relative pt-20 pb-4 overflow-hidden"
            style={{ background: '#020617' }}
        >
            {/* Section intro */}
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
                <SectionIntro
                    title="Real Results from Real Partners"
                    subtitle="See why leading brands trust us to drive their growth. Ready to join them?"
                    align="left"
                    maxWidth="3xl"
                    size="xl"
                    variant="blur"
                />
            </div>

            {/* Infinite Moving Cards - con padding verticale per gli shadow */}
            <div className="py-4">
                <InfiniteMovingCards
                    items={stories}
                    direction="left"
                    speed="slow"
                    pauseOnHover={false}
                />
            </div>
        </section>
    );
};

export default SuccessStories;
