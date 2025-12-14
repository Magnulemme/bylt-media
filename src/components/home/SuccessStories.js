import React from 'react';
import { motion } from 'motion/react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const SuccessStories = () => {
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
            {/* Section Title - Above cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="flex items-center gap-3 mb-8 justify-end">
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

                {/* Intro Text - Prepares for contact */}
                <div className="max-w-3xl">
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Real Results from Real Partners
                    </motion.h2>
                    <motion.p
                        className="text-lg md:text-xl text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        See why leading brands trust us to drive their growth. Ready to join them?
                    </motion.p>
                </div>
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
