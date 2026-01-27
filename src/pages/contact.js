import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import Layout from '../components/layout';
import { ProjectMarquee } from '../components/ui/project-marquee';
import ComparisonTable from '../components/ui/ComparisonTable';
import { useWaveBackground } from '../components/services/hooks';
import { whyByltContent } from '../components/caseStudies/constants';
import BrandMarquee from '../components/caseStudies/sections/template/BrandMarquee';

const NeuralContact = dynamic(
    () => import('../components/home/NeuralContact'),
    { ssr: false }
);

const ShaderBackgroundDirect = dynamic(
    () => import('../components/home/ShaderBackgroundDirect'),
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
        <div className="bg-slate-950 service-page max-w-full">
            <section className="contact-hero-section relative flex items-center justify-center overflow-hidden max-w-full">
                <ShaderBackgroundDirect onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

                <div className="contact-hero-container relative z-20">
                    <div className="contact-hero-grid relative flex flex-col lg:grid lg:grid-cols-2 items-center max-w-full">
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
                        className="contact-hero-marquee w-full"
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
        <section className="contact-audit-section">
            <div className="contact-audit-container">
                {/* Section Header */}
                <motion.div
                    className="pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading-h2 text-white mb-4">
                        Free Digital Audit
                    </h2>
                    <p className="text-subheader max-w-2xl">
                        Get a comprehensive analysis of your digital presence at no cost.
                    </p>
                </motion.div>

                <div className="contact-audit-grid">
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
                    className="contact-audit-included grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
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
                    className="contact-audit-wave relative flex flex-col md:flex-row items-center justify-center gap-8"
                >
                    {/* Wave - sfondo su mobile, side-by-side su desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 md:relative md:inset-auto rounded-2xl overflow-hidden flex items-center justify-center"
                    >
                        <AnimatedWaveCanvas className="rounded-2xl min-w-75 h-fit  flex items-center justify-center flex-1" />
                        {/* Overlay scuro solo su mobile */}
                        <div className="absolute inset-0 bg-[#020617]/50 md:hidden rounded-2xl" />
                    </motion.div>

                    {/* Text */}
                    <div className="relative z-10 text-center md:text-left">
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

            </div>

        </section>
    );
};

const WhyByltSection = () => {
    return (
        <div className='contact-why-section relative z-30'>
            <BrandMarquee text="WHY BYLT" className="contact-why-marquee" reverse />
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

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="contact-why-stats"
                >
                    {[
                        { value: '50+', label: 'Happy Clients' },
                        { value: '48h', label: 'Response Time' },
                        { value: '95%', label: 'Client Retention' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const TESTIMONIALS = [
    {
        quote: "BYLT transformed our digital presence completely. Their strategic approach and attention to detail exceeded our expectations.",
        author: "Stefan Ivanov",
        role: "Marketing Director",
        company: "Nissan Bulgaria"
    },
    {
        quote: "Working with BYLT was a game-changer. They delivered results that actually moved the needle for our business.",
        author: "Maria Petrova",
        role: "CEO",
        company: "Happy"
    },
    {
        quote: "Professional, creative, and data-driven. BYLT understood our vision and brought it to life beautifully.",
        author: "Alex Dimitrov",
        role: "Brand Manager",
        company: "Brickell"
    }
];

const TestimonialQuote = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const current = TESTIMONIALS[currentIndex];

    return (
        <section className="contact-testimonial-section relative z-30">
            <div className="contact-testimonial-container">
                {/* Brutalist Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl border border-slate-700 bg-slate-950/80 p-8 md:p-10 overflow-hidden"
                    style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)' }}
                >
                    {/* Gradient Quote Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
                            <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>
                    </div>

                    {/* Quote Text */}
                    <div className="relative h-28 md:h-20">
                        <AnimatePresence mode="wait">
                            <motion.blockquote
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 text-quote text-center"
                            >
                                "{current.quote}"
                            </motion.blockquote>
                        </AnimatePresence>
                    </div>

                    {/* 5-Star Rating */}
                    <div className="flex justify-center gap-1 mt-6 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <motion.svg
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                                className="w-5 h-5 text-cyan-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                        ))}
                    </div>

                    {/* Author */}
                    <AnimatePresence mode="wait">
                        <motion.footer
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center gap-2 text-sm"
                        >
                            <span className="text-white font-medium">{current.author}</span>
                            <span className="text-slate-500">—</span>
                            <span className="text-slate-400">{current.role}</span>
                            <span className="text-slate-500">@</span>
                            <span className="text-cyan-400">{current.company}</span>
                        </motion.footer>
                    </AnimatePresence>
                </motion.div>
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

            {/* Why BYLT + Testimonials with Shader Background */}
            <div className="relative overflow-hidden bg-slate-950 px-4">
                <div className="relative">
                    <ShaderBackgroundDirect />
                    <WhyByltSection />
                    <TestimonialQuote />
                </div>
            </div>

            <NeuralContact />
        </Layout>
    );
};

export default ContactPage;
