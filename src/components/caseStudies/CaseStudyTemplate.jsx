import React from 'react';
import {
    CaseStudyHeroSection,
    ProjectOverview,
    TheChallenge,
    ProcessGrid,
    OurSolution,
    ResultsDashboard
} from './sections/template';

const CaseStudyTemplate = ({ study }) => {
    if (!study) return null;

    return (
        <div className='overflow-hidden'>
            <main style={{ background: '#020617' }} className='service-page'>
            {/* Hero */}
            <CaseStudyHeroSection
                data={study.hero}
                imageUrl={study.imageUrl}
                client={study.client}
            />

            {/* Content Section */}
            <section className="relative z-10">
                <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                    <ProjectOverview study={study} />
                    <TheChallenge challenge={study.challenge} />
                </div>

                {/* Process - full width */}
                <ProcessGrid process={study.process} />

                <div className="max-w-6xl mx-auto px-4">
                    <OurSolution solution={study.solution} />
                    <ResultsDashboard results={study.results} />
                </div>
            </section>
        </main>
        </div>
    );
};

export default CaseStudyTemplate;
