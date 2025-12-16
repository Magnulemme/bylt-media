import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import SectionHeader from '../ui/SectionHeader';
import ClientsIntermezzo from './ClientsIntermezzo';
import { motion } from 'motion/react';

// Shared Portfolio Carousel using CSS sticky positioning
const DemoReveal = () => {

    return (
        <section
            className="pt-16 overflow-hidden"
            style={{
                position: 'sticky',
                bottom: 0,
                background: '#020617',
                zIndex: 0,
                clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"
            }}
        >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-12 max-w-5xl mx-auto">
                    {/* Column 1: BYLT Partner of MarketiseMe */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-4 md:mb-6">
                            Official Partner of
                        </p>
                        <motion.a
                            href="https://marketiseme.com/en/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block group transition-transform duration-300 hover:-translate-y-1"
                        >
                            <img
                                src="/images/partners/marketise-me-logo.svg"
                                alt="Marketise Me"
                                className="h-16 md:h-20 lg:h-24 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-110 mx-auto"
                                loading="lazy"
                            />
                        </motion.a>
                    </motion.div>

                    {/* Column 2: MarketiseMe Partners with Google & Meta */}
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-sm md:text-base text-gray-400 uppercase tracking-wider mb-4 md:mb-6">
                            MarketiseMe is Official Partner of
                        </p>
                        <div className="flex items-center justify-center gap-6 md:gap-8">
                            <motion.div
                                className="group transition-transform duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <img
                                    src="/images/partners/partners logos/google-partner-logo-min.svg"
                                    alt="Google Partner"
                                    className="h-16 md:h-20 lg:h-24 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-110"
                                    loading="lazy"
                                />
                            </motion.div>

                            <motion.div
                                className="group transition-transform duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <img
                                    src="/images/partners/partners logos/meta_partner_logo.png"
                                    alt="Meta Business Partner"
                                    className="h-16 md:h-20 lg:h-24 w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-110"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DemoReveal;
