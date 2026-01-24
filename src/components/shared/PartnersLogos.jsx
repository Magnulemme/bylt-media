import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const PartnersLogos = () => {
    return (
        <div className="partners-grid">
            {/* Column 1: BYLT Partner of MarketiseMe */}
            <motion.div
                className="partner-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-label-lg">
                    Official Partner of
                </p>
                <motion.a
                    href="https://marketiseme.com/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group transition-transform duration-300 hover:-translate-y-1"
                >
                    <Image
                        src="/images/partners/marketise-me-logo.svg"
                        alt="Marketise Me"
                        width={200}
                        height={96}
                        className="partner-logo group-hover:opacity-100"
                    />
                </motion.a>
            </motion.div>

            {/* Column 2: MarketiseMe Partners with Google & Meta */}
            <motion.div
                className="partner-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <p className="text-label-lg">
                    MarketiseMe is Official Partner of
                </p>
                <div className="partner-logos-group">
                    <motion.div
                        className="group transition-transform duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Image
                            src="/images/partners/partners logos/google-partner-logo-min.svg"
                            alt="Google Partner"
                            width={200}
                            height={96}
                            className="partner-logo group-hover:opacity-100"
                        />
                    </motion.div>

                    <motion.div
                        className="group transition-transform duration-300 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Image
                            src="/images/partners/partners logos/meta_partner_logo.png"
                            alt="Meta Business Partner"
                            width={200}
                            height={96}
                            className="partner-logo group-hover:opacity-100"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default PartnersLogos;
