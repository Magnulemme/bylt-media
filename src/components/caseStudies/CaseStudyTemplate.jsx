import React from 'react';
import {
    CaseStudyHeroSection,
    TheChallenge,
    ProcessGrid,
    OurSolution,
    ResultsDashboard,
    BrandMarquee,
    BeforeByltChart,
    AfterByltChart
} from './sections/template';
import CTASectionCard from '../ui/CTASectionCard';
import ShaderBackgroundDirect from '../home/ShaderBackgroundDirect';

const CaseStudyTemplate = ({ study }) => {
    if (!study) return null;

    return (
        <div className='overflow-hidden'>
            <main style={{ background: '#020617' }} className='service-page'>
            {/* Hero (ora include anche Project Overview) */}
            <CaseStudyHeroSection
                data={study.hero}
                imageUrl={study.imageUrl}
                study={study}
            />

            {/* Content Section */}
            <section className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <TheChallenge challenge={study.challenge} />
                </div>

                {/* Before BYLT - grafico che mostra il declino */}
                <BeforeByltChart headline={study.beforeBylt?.headline || "Something had to change."} />

                {/* Brand Marquee divider - il turning point */}

                {/* Process + Solution con ShaderBackground continuo */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <ShaderBackgroundDirect />
                    </div>
                    <div className="relative">
                    <BrandMarquee />

                        <ProcessGrid process={study.process} description={study.processDescription} />
                        <OurSolution solution={study.solution} />
                    </div>
                </div>

                {/* Brand Marquee reverse divider */}
                <BrandMarquee text="THE BYLT EFFECT" reverse />

                <div className="max-w-6xl mx-auto px-4">
                    <ResultsDashboard results={study.results} />
                </div>

                {/* After BYLT - grafico che mostra la crescita */}
                <AfterByltChart headline={study.afterBylt?.headline} description={study.afterBylt?.description} />
            </section>

            {/* CTA finale */}
            <CTASectionCard
                title={study.cta?.title || "Ready for results like these?"}
                description={study.cta?.description || "Let's discuss how we can help grow your business with data-driven digital marketing."}
                buttonText={study.cta?.buttonText || "Get Free Audit"}
                buttonHref={study.cta?.buttonHref || "/contact"}
            />
        </main>
        </div>
    );
};

export default CaseStudyTemplate;
