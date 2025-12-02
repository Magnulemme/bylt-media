import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const SuccessStories = () => {
    const stories = [
        {
            name: 'Happy Bar & Grill',
            logo: '/images/logos/225x170_happy_logo.png',
            industry: 'Restaurant Chain',
            metric: '+45% Brand Engagement',
            quote: 'The campaigns they create on a monthly basis significantly increase brand engagement and traffic to our website.',
        },
        {
            name: 'Napudreni',
            logo: '/images/logos/napudreni.png',
            industry: 'Fashion Brand',
            metric: '75% Traffic Growth',
            quote: 'They are creative and have quite a lot of knowledge about all the new things in marketing.',
        },
        {
            name: 'Nissan',
            logo: '/images/logos/nisan.png',
            industry: 'Automotive Group',
            metric: 'All Time High Sales',
            quote: 'We achieved an All Time High in the sale of cars from an online campaign.',
        },
        {
            name: 'Peugeot',
            logo: '/images/logos/Peugeot-@2x.png',
            industry: 'Automotive Brand',
            metric: '+60% Quality Inquiries',
            quote: 'We\'ve been able to increase the volume of quality inquiries that come from digital ads.',
        },
        {
            name: 'Smart Consultants',
            logo: '/images/logos/smart-tower.png',
            industry: 'Business Consulting',
            metric: '3 Project Success',
            quote: 'We achieved serious sales volumes on three different projects. Quick response, flexibility and expertise.',
        },
    ];

    return (
        <section
            id="success-stories"
            className="relative py-20 overflow-hidden"
            style={{ background: '#020617' }}
        >
            {/* Section Title - Above cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-mono text-sm tracking-wide">
                        6)
                    </span>
                    <span className="text-white font-mono text-sm tracking-wide">
                        Trusted By
                    </span>
                    <span className="text-gray-500 font-mono text-sm tracking-wide">
                        [Partners]
                    </span>
                </div>
            </div>

            {/* Infinite Moving Cards */}
            <InfiniteMovingCards
                items={stories}
                direction="left"
                speed="slow"
                pauseOnHover={false}
                className="py-4"
            />
        </section>
    );
};

export default SuccessStories;
