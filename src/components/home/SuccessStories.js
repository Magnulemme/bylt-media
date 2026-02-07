import React from 'react';
import { motion } from 'motion/react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import QuoteCard from '../ui/QuoteCard';
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
            className="success-stories-section"
            style={{ background: '#020617' }}
        >
            {/* Section intro */}
            <div className="success-stories-header max-w-content mx-auto">
                <div className="max-w-3xl mb-8 md:mb-12 lg:mb-16">
                    <motion.h2
                        className="heading-h1 text-white text-left mb-6"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Real Results from <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Real Partners</span>
                    </motion.h2>
                    <motion.p
                        className="text-subheader text-left"
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
            <div className="py-4 pt-8">
                <InfiniteMovingCards
                    items={stories}
                    direction="left"
                    speed="normal"
                    pauseOnHover={false}
                    className="pb-2"
                    renderItem={(item, idx) => (
                        <QuoteCard
                            quote={item.quote}
                            author={item.name}
                            role={item.author}
                            company={item.industry}
                            logo={item.logo}
                            brutalist={true}
                            showRating={true}
                            animate={false}
                            index={idx}
                            className="w-80 h-full"
                        />
                    )}
                />
            </div>
        </section>
    );
};

export default SuccessStories;
