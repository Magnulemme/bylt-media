import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '../components/layout';
import ShaderBackgroundStandalone from '../components/home/ShaderBackgroundStandalone';
import { ProjectMarquee } from '../components/ui/project-marquee';
import ComparisonTable from '../components/ui/ComparisonTable';
import { whyByltContent } from '../components/caseStudies/constants';
import BrandMarquee from '../components/caseStudies/sections/template/BrandMarquee';
import { Plus, Minus } from 'lucide-react';
import QuoteCard from '../components/ui/QuoteCard';
import { InfiniteMovingCards } from '../components/ui/infinite-moving-cards';

const NeuralContact = dynamic(
    () => import('../components/home/NeuralContact'),
    { ssr: false }
);

const Octahedron3D = dynamic(
    () => import('../components/contact/Octahedron3D'),
    { ssr: false }
);

const AnimatedWaveCanvas = dynamic(
    () => import('../components/services/sections/AnimatedWaveCanvas'),
    { ssr: false }
);


const PROJECTS = [
    { name: 'Nissan', image: '/images/casestudy/nissan-case-study.webp', href: '/case-studies/nissan' },
    { name: 'Happy', image: '/images/casestudy/happy-case-study.webp', href: '/case-studies/happy' },
    { name: 'Napudreni', image: '/images/casestudy/napudreni-case-study.webp', href: '/case-studies/napudreni' },
    { name: 'Brickell', image: '/images/casestudy/brickell-case-study.webp', href: '/case-studies/brickell' },
    { name: 'CSKA', image: '/images/casestudy/cska-case-study.webp', href: '/case-studies/cska' },
    { name: 'Parfium.bg', image: '/images/casestudy/parfium.bg-case-study.webp', href: '/case-studies/parfium' },
];

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/contact') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

const ContactHero = () => {
    return (
        <section className="contact-page-hero px-4">
            <div className="contact-hero-section relative w-full flex flex-col">
                <ShaderBackgroundStandalone onReady={signalPageReady} />

                <div className="relative z-20 text-white mx-auto px-4 flex-1 flex flex-col justify-center items-center contact-hero-container">
                    {/* Text + Octahedron side by side */}
                    <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12 md:mb-16 lg:mb-20 px-4 md:px-6 lg:px-12">
                        {/* Octahedron as background on mobile/tablet */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-30 pointer-events-none">
                            <div className="w-[450px] h-[450px]">
                                <Octahedron3D />
                            </div>
                        </div>

                        <div className="relative z-10 text-center lg:text-left flex-1">
                            <h1 className="heading-page mb-6">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    Let's Build Together
                                </span>
                            </h1>
                            <p className="text-body-lg mb-4 max-w-xl">
                                Ready to transform your digital presence? We're here to listen, strategise, and deliver results that exceed expectations.
                            </p>
                        </div>

                        {/* Octahedron visible on desktop */}
                        <div className="hidden lg:block relative h-[350px] aspect-square overflow-hidden shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[500px] h-[500px]">
                                    <Octahedron3D />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Thumbnails Marquee */}
                    <div className="contact-hero-marquee w-full">
                        <p className="text-label mb-4">Brands We've Helped Grow</p>
                        <ProjectMarquee
                            projects={PROJECTS}
                            speed="35s"
                            pauseOnHover={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const AuditAccordionItem = ({ feature, isOpen, onToggle, index }) => {
    const colors = ["#06b6d4", "#a855f7", "#3b82f6"];
    const titleColor = colors[index % colors.length];

    return (
        <div className="border-b border-slate-700/60 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-4 py-4 text-left transition-opacity hover:opacity-80"
                aria-expanded={isOpen}
            >
                <h4 className="text-lg font-semibold" style={{ color: titleColor }}>
                    {feature.title}
                </h4>
                <motion.div
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all"
                    style={{
                        borderColor: isOpen ? titleColor : 'rgb(51 65 85)',
                        color: isOpen ? titleColor : 'rgb(148 163 184)'
                    }}
                >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="text-body-sm text-slate-400 pb-4">
                            {feature.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FreeAuditSection = () => {
    const [openItems, setOpenItems] = useState({ 0: true });
    const auditFeatures = [
        {
            title: 'Performance Analysis',
            description: 'We analyze your current digital presence, identifying strengths and areas for improvement.',
        },
        {
            title: 'Competitor Insights',
            description: 'Understand how you stack up against competitors and discover untapped opportunities.',
        },
        {
            title: 'Custom Strategy',
            description: 'Receive a tailored action plan with specific recommendations for your business goals.',
        },
    ];

    const toggleItem = (index) => {
        setOpenItems(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <section className="contact-audit-section">
            <div className="contact-audit-container">
                {/* Two Column Layout: Accordion + Next Step */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Accordion - Clean, no borders */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="heading-h2 text-white mb-3">Free Digital Audit</h2>
                        <p className="text-body text-slate-400 mb-6">
                            Get a comprehensive analysis of your digital presence at no cost.
                        </p>
                        <div>
                            {auditFeatures.map((feature, index) => (
                                <AuditAccordionItem
                                    key={index}
                                    feature={feature}
                                    index={index}
                                    isOpen={openItems[index] || false}
                                    onToggle={() => toggleItem(index)}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Next Step Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative rounded-xl bg-slate-950 overflow-hidden"
                    >
                        {/* Wave Background */}
                        <div className="absolute inset-0">
                            <AnimatedWaveCanvas className="w-full h-full" />
                            <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/60 to-slate-950/80" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-6 md:p-8">
                            <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                                Next Step
                            </p>
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                                Ready to see what's possible?
                            </h3>
                            <p className="text-slate-400 text-sm md:text-base mb-6">
                                Fill out the form below and we'll get back to you within 24 hours with your personalized audit.
                            </p>

                            {/* What's Included */}
                            <div className="space-y-3 mb-6">
                                {[
                                    'Performance score',
                                    'Competitor analysis',
                                    '3 actionable recommendations',
                                    '15-min strategy call',
                                ].map((item) => (
                                    <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                                        <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-xs text-cyan-400/80">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>24h response time</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const WhyByltSection = () => {
    return (
        <div className='contact-why-section relative z-30'>
            <div className="contact-why-container">
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
                    others={whyByltContent.others}
                    bylt={whyByltContent.bylt}
                    showHeader={false}
                />
            </div>
        </div>
    );
};

const TESTIMONIALS = [
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

const TestimonialsCarousel = () => {
    return (
        <section className="contact-testimonial-section relative z-30">
            <div className="contact-testimonial-container">
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

            {/* InfiniteMovingCards - Full width */}
            <div className="py-4 pt-8">
                <InfiniteMovingCards
                    items={TESTIMONIALS}
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

const ContactPage = () => {
    return (
        <Layout>
            <Head>
                <title>Contact Us | BYLT Media</title>
                <meta name="description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <link rel="canonical" href="https://www.byltmedia.com/contact" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Contact Us | BYLT Media" />
                <meta property="og:description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <meta property="og:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.byltmedia.com/contact" />
                <meta property="og:site_name" content="BYLT Media" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | BYLT Media" />
                <meta name="twitter:description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <meta name="twitter:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />

                {/* Additional Meta */}
                <meta name="robots" content="index, follow" />
            </Head>
            <ContactHero />
            <div className="contact-audit-marquee-wrapper">
                <BrandMarquee text="BYLT FREE AUDIT" className="contact-audit-marquee" />
            </div>
            <FreeAuditSection />

            {/* Testimonials + Why BYLT */}
            <div className="bg-slate-950 px-4">
                <TestimonialsCarousel />
                <WhyByltSection />
            </div>

            <NeuralContact />
        </Layout>
    );
};

export default ContactPage;
