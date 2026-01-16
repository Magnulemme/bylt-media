import React from 'react';
import {
    CaseStudyHeroSection,
    TheChallenge,
    ProcessGrid,
    OurSolution,
    ResultsDashboard
} from './sections/template';
import ShaderBackground from '../home/ShaderBackground';

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

                {/* Process + Solution con ShaderBackground continuo */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <ShaderBackground />
                    </div>
                    <div className="relative">
                        <ProcessGrid process={study.process} description={study.processDescription} />
                        <OurSolution solution={study.solution} />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    <ResultsDashboard results={study.results} />
                </div>
            </section>
        </main>
        </div>
    );
};

export default CaseStudyTemplate;
