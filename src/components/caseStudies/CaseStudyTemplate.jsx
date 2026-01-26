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
            <section className="relative z-10 max-w-(--breakpoint-outer) mx-auto">
                <div className="max-w-(--breakpoint-content) mx-auto px-(--margin-safe-x) py-padding-lg">
                    <TheChallenge challenge={study.challenge} />
                </div>

                {/* Before BYLT - grafico che mostra il declino */}
                <BeforeByltChart headline={study.beforeBylt?.headline || "Something had to change."} />

                {/* Process + Solution con ShaderBackground continuo */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <ShaderBackgroundDirect />
                    </div>
                    <div className="relative">
                        {/* Brand Marquee - usa breakpoint-outer */}
                        <BrandMarquee />

                        <div className="max-w-(--breakpoint-content) mx-auto">
                            <ProcessGrid process={study.process} description={study.processDescription} />
                            <OurSolution solution={study.solution} />
                        </div>
                    </div>
                </div>

                {/* Brand Marquee reverse divider - usa breakpoint-outer */}
                <BrandMarquee text="THE BYLT EFFECT" reverse />

                <div className="max-w-(--breakpoint-content) mx-auto px-(--margin-safe-x)">
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
