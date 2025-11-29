import React from 'react';
import { motion } from 'motion/react';

// Clients Intermezzo - Text section between clients and partners
const ClientsIntermezzo = () => {
    return (
        <section className="relative pt-8 overflow-hidden" style={{ background: '#020617' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                <motion.h3
                    className="text-2xl md:text-4xl font-bold font-inter text-center leading-tight text-white mb-6"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Brands that trust us to deliver results
                </motion.h3>
                <motion.p
                    className="text-gray-400 text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    Join the companies that have transformed their digital presence
                </motion.p>
            </div>

            {/* Bottom gradient for separation */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, rgba(2, 6, 23, 0.8))',
                }}
            />
        </section>
    );
};

export default ClientsIntermezzo;
