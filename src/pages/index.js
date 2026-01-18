import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';

// Static import per FuturisticHero - nel bundle principale per navigazione veloce
import FuturisticHero from '../components/home/FuturisticHero';

// Dynamic imports per componenti below-the-fold (lazy loaded)
const GrainyBgSection = dynamic(
    () => import('../components/home/GrainyBgSection'),
    { ssr: false }
);

const EngineTimeline = dynamic(
    () => import('../components/home/EngineTimeline'),
    { ssr: false }
);

const ProjectsShowcase = dynamic(
    () => import('../components/home/ProjectsShowcase'),
    { ssr: false }
);

const NeuralContact = dynamic(
    () => import('../components/home/NeuralContact'),
    { ssr: false }
);

// Static imports for components without 3D
import SuccessStories from '../components/home/SuccessStories';
import DemoReveal from '@/components/home/DemoReveal';
import OfficialPartnerSection from '@/components/home/OfficialPartnerSection';

// Main App Component
const ByltMediaLandingPageV8 = () => {
    return (
        <Layout>
            <Head>
                <title>BYLT Media - We Build Digital Futures</title>
                <meta name="description" content="BYLT Media is a future-forward digital agency specialising in Performance Marketing, SEO, Web Development, and AI Solutions." />
                <link rel="icon" href="/favicon.ico" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://www.byltmedia.com/" />

                {/* Open Graph Tags for Social Media */}
                <meta property="og:title" content="BYLT Media - We Build Digital Futures" />
                <meta property="og:description" content="BYLT Media is a future-forward digital agency specialising in Performance Marketing, SEO, Web Development, and AI Solutions." />
                <meta property="og:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.byltmedia.com/" />
                <meta property="og:site_name" content="BYLT Media" />
                <meta property="og:locale" content="en_GB" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="BYLT Media - We Build Digital Futures" />
                <meta name="twitter:description" content="BYLT Media is a future-forward digital agency specialising in Performance Marketing, SEO, Web Development, and AI Solutions." />
                <meta name="twitter:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />

                {/* Additional SEO Meta Tags */}
                <meta name="keywords" content="digital marketing agency, performance marketing, SEO, web development, AI solutions, Google Ads, PPC, social media marketing, data science" />
                <meta name="author" content="BYLT Media" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Preconnect for Performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "BYLT Media",
                            "alternateName": "BYLT Media Ltd",
                            "url": "https://www.byltmedia.com",
                            "logo": "https://www.byltmedia.com/favicon.ico",
                            "description": "BYLT Media is a future-forward digital agency specialising in Performance Marketing, SEO, Web Development, and AI Solutions.",
                            "foundingDate": "2020",
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "GB",
                                "addressRegion": "England"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "contactType": "customer service",
                                "areaServed": ["GB", "EU"],
                                "availableLanguage": ["English"],
                                "url": "https://www.byltmedia.com/contact"
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/bylt-media"
                            ],
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "5.0",
                                "reviewCount": "50"
                            },
                            "knowsAbout": [
                                "Digital Marketing",
                                "Performance Marketing",
                                "Search Engine Optimization",
                                "Web Development",
                                "Artificial Intelligence",
                                "Google Ads",
                                "Social Media Marketing",
                                "E-commerce",
                                "Conversion Rate Optimization"
                            ],
                            "areaServed": [
                                {
                                    "@type": "Country",
                                    "name": "United Kingdom"
                                },
                                {
                                    "@type": "Place",
                                    "name": "European Union"
                                }
                            ],
                            "sameAs": [
                                "https://www.linkedin.com/company/bylt-media"
                            ],
                            "service": [
                                {
                                    "@type": "Service",
                                    "name": "Performance Marketing",
                                    "description": "Data-driven paid advertising campaigns"
                                },
                                {
                                    "@type": "Service",
                                    "name": "SEO Services",
                                    "description": "Search engine optimisation for organic growth"
                                },
                                {
                                    "@type": "Service",
                                    "name": "Web Development",
                                    "description": "Custom website development and design"
                                },
                                {
                                    "@type": "Service",
                                    "name": "AI Solutions",
                                    "description": "Artificial intelligence and automation services"
                                }
                            ]
                        })
                    }}
                />
            </Head>
            <GlobalStyles />
            <FuturisticHero />
            <DemoReveal />
            <OfficialPartnerSection />
            <GrainyBgSection />
            <EngineTimeline />
            <ProjectsShowcase />
            <SuccessStories />
            <NeuralContact />
        </Layout>
    );
};

export default ByltMediaLandingPageV8;
