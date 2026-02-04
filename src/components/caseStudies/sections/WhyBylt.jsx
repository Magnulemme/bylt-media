import React from 'react';
import { motion } from 'motion/react';
import { whyByltContent } from '../constants';
import ComparisonTable from '../../ui/ComparisonTable';
import QuoteCard from '../../ui/QuoteCard';
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards';

// Testimonials data
const testimonials = [
    {
        id: 1,
        quote: 'The campaigns they create on a monthly basis significantly increase brand engagement and traffic to our website.',
        author: 'Happy Bar & Grill',
        role: 'Marketing Director',
        company: 'Restaurant Chain',
    },
    {
        id: 2,
        quote: 'They are creative and have quite a lot of knowledge about all the new things in marketing.',
        author: 'Napudreni',
        role: 'Founder',
        company: 'Fashion Brand',
    },
    {
        id: 3,
        quote: 'We achieved an All Time High in the sale of cars from an online campaign.',
        author: 'Nissan',
        role: 'Sales Manager',
        company: 'Automotive',
    },
    {
        id: 4,
        quote: "We've been able to increase the volume of quality inquiries that come from digital ads.",
        author: 'Peugeot',
        role: 'Digital Lead',
        company: 'Automotive',
    },
    {
        id: 5,
        quote: 'We achieved serious sales volumes on three different projects. Quick response, flexibility and expertise.',
        author: 'Smart Consultants',
        role: 'CEO',
        company: 'Consulting',
    },
];

const WhyBylt = () => {
    const { others, bylt } = whyByltContent;

    return (
        <section
            className="case-studies-why-bylt-section relative overflow-hidden"
            style={{ background: '#020617' }}
        >
            <div className="case-studies-why-bylt-container relative z-10">
                {/* Section Header */}
                <motion.div
                    className="pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-h2 text-white mb-4">
                        Why Choose BYLT
                    </h2>
                    <p className="text-subheader max-w-2xl">
                        See how we compare to traditional agencies and why businesses choose us.
                    </p>
                </motion.div>

                <ComparisonTable
                    others={others}
                    bylt={bylt}
                    showHeader={false}
                />

                {/* Testimonials Section */}
                <div className="case-studies-quote">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-h2 text-white mb-4 text-right w-full">
                            What Our Clients Say
                        </h2>
                        <p className="text-subheader text-right w-full">
                            Real feedback from real partners who trusted us to drive their growth.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* InfiniteMovingCards - Full width outside container */}
            <div className="py-4 pt-8">
                <InfiniteMovingCards
                    items={testimonials}
                    direction="left"
                    pauseOnHover={true}
                    className="pb-2"
                    renderItem={(item, idx) => (
                        <QuoteCard
                            quote={item.quote}
                            author={item.author}
                            role={item.role}
                            company={item.company}
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

export default WhyBylt;
