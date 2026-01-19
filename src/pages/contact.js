import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '../components/layout';
import { ProjectMarquee } from '../components/ui/project-marquee';
import ComparisonTable from '../components/ui/ComparisonTable';
import { useWaveBackground } from '../components/services/hooks';
import { whyByltContent } from '../components/caseStudies/constants';

const NeuralContact = dynamic(
    () => import('../components/home/NeuralContact'),
    { ssr: false }
);

const ShaderBackground = dynamic(
    () => import('../components/home/ShaderBackground'),
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

const SuccessStories = dynamic(
    () => import('../components/home/SuccessStories'),
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

const ContactHero = () => {
    return (
        <div className="bg-black service-page max-w-full">
            <section className="relative flex items-center justify-center overflow-hidden max-w-full">
                <ShaderBackground onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

                <div className="relative z-20 max-w-6xl mx-auto px-4 py-24 md:py-32">
                    <div className="relative flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-full">
                        {/* Octahedron as background on mobile/tablet */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-30 pointer-events-none">
                            <div className="w-[350px] h-[350px]">
                                <Octahedron3D />
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="relative z-10 text-center lg:text-left w-full lg:w-auto max-w-full">

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter leading-[1.1] mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            >
                                Let's Build Together
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-base md:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                Ready to transform your digital presence? We're here to listen, strategise, and deliver results that exceed expectations.
                            </motion.p>

                            </div>

                        {/* Octahedron visible on desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:block relative h-[350px] overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[400px] h-[400px]">
                                    <Octahedron3D />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Project Thumbnails Marquee */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-16 w-full"
                    >
                        <p className="text-xs text-slate-500 uppercase tracking-widest text-left mb-6">
                            Brands We've Helped Grow
                        </p>
                        <ProjectMarquee
                            projects={PROJECTS}
                            speed="35s"
                            pauseOnHover={true}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const AuditCard = ({ feature, index }) => {
    const waveBg = useWaveBackground(index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ borderColor: 'rgba(34, 211, 238, 0.3)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl border border-white/10 overflow-hidden"
        >
            {/* Wave Background */}
            {waveBg && (
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-slate-950/70" />

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8">
                <motion.div
                    className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-cyan-400"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    {feature.icon}
                </motion.div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {feature.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
};

const FreeAuditSection = () => {
    const auditFeatures = [
        {
            title: 'Performance Analysis',
            description: 'We analyze your current digital presence, identifying strengths and areas for improvement.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Competitor Insights',
            description: 'Understand how you stack up against competitors and discover untapped opportunities.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            title: 'Custom Strategy',
            description: 'Receive a tailored action plan with specific recommendations for your business goals.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
        },
    ];

    return (
        <section className="pt-20 md:pt24" style={{ background: '#020617' }}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="max-w-2xl ml-auto mb-12 md:mb-16">
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter leading-tight text-white text-right mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Get Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Free Audit</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-base md:text-lg text-right"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Before we start working together, we offer a complimentary audit of your digital marketing.
                        This helps us understand your business and shows you exactly where we can add value.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {auditFeatures.map((feature, index) => (
                        <AuditCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* What's Included */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
                >
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
                </motion.div>

                {/* Animated Wave with Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 md:mt-16 relative flex flex-col md:flex-row items-center justify-center gap-8"
                >
                    {/* Wave - sfondo su mobile, side-by-side su desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 md:relative md:inset-auto rounded-2xl overflow-hidden md:h-80 flex items-center justify-center"
                    >
                        <AnimatedWaveCanvas className="rounded-2xl min-w-75 h-[320px]  flex items-center justify-center flex-1" />
                        {/* Overlay scuro solo su mobile */}
                        <div className="absolute inset-0 bg-black/50 md:hidden rounded-2xl" />
                    </motion.div>

                    {/* Text */}
                    <div className="relative z-10 text-center md:text-left py-16 md:py-0">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                            Next Step
                        </p>
                        <h3 className="text-lg md:text-xl font-medium text-white/90 mb-2">
                            Ready to see what's possible?
                        </h3>
                        <p className="text-slate-400 text-sm md:text-base mb-4 max-w-sm">
                            Fill out the form below and we'll get back to you within 24 hours with your personalized audit.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-cyan-400/80">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>24h response time</span>
                        </div>
                    </div>
                </motion.div>

                {/* Why Choose Us - Comparison Table */}
                <div className="mt-16 md:mt-24">
                    <div className="max-w-2xl mb-10">
                        <motion.h3
                            className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter leading-tight text-white text-left mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Why <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Choose Us?</span>
                        </motion.h3>
                        <motion.p
                            className="text-gray-400 text-base md:text-lg text-left"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            {whyByltContent.subheading}
                        </motion.p>
                    </div>

                    <ComparisonTable
                        others={whyByltContent.others}
                        bylt={whyByltContent.bylt}
                        showHeader={false}
                    />

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
                    >
                        {[
                            { value: '50+', label: 'Happy Clients' },
                            { value: '48h', label: 'Response Time' },
                            { value: '95%', label: 'Client Retention' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl md:text-3xl font-semibold text-white">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>


            </div>
        </section>
    );
};

const TESTIMONIALS = [
    {
        quote: "BYLT transformed our digital presence completely. Their strategic approach and attention to detail exceeded our expectations.",
        author: "Marketing Director",
        company: "Nissan Bulgaria"
    },
    {
        quote: "Working with BYLT was a game-changer. They delivered results that actually moved the needle for our business.",
        author: "CEO",
        company: "Happy"
    },
    {
        quote: "Professional, creative, and data-driven. BYLT understood our vision and brought it to life beautifully.",
        author: "Brand Manager",
        company: "Brickell"
    }
];

const TestimonialQuote = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const current = TESTIMONIALS[currentIndex];

    return (
        <section className="py-16 md:py-24" style={{ background: '#020617' }}>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <svg className="w-10 h-10 mx-auto mb-6 text-cyan-400/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div className="relative h-32 md:h-24">
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 text-xl md:text-2xl text-white/90 font-light leading-relaxed"
                        >
                            {current.quote}
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-slate-500 mt-6"
                    >
                        — {current.author}, {current.company}
                    </motion.p>
                </AnimatePresence>
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
            <FreeAuditSection />

            {/* Testimonial Quote Carousel */}
            <TestimonialQuote />

            <NeuralContact />
        </Layout>
    );
};

export default ContactPage;
