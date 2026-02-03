import React from 'react';
import ShaderBackgroundDirect from '../../home/ShaderBackgroundDirect';
import { FeatureCard, FeaturesAccordion, MainCard, BenefitCard, BenefitsAccordion } from '../cards';
import { useWaveBackground } from '../hooks';


const ServiceHero = ({ service }) => {
    const featuresHeaderWave = useWaveBackground(0);
    const benefitsHeaderWave = useWaveBackground(2);
    return (
        <section className='service-hero-section z-90 relative'>
            {/* Shader Background */}
            <ShaderBackgroundDirect onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

            {/* Content */}
            <div className="service-hero-container relative z-20 text-white">
                {/* Mobile only - MainCard + What is X + Features + Benefits */}
                <div className="md:hidden space-y-4">
                    <MainCard service={service} />

                    {/* Features - Mobile (header + accordion unified, wave only in header) */}
                    <FeaturesAccordion
                        features={service.features}
                        waveBackground={featuresHeaderWave}
                        headline={service.heroWhatIsHeadline || `What is ${service.title}?`}
                        description={service.heroWhatIsDescription || service.description}
                    />

                    {/* Benefits - Mobile (header + accordion unified, wave only in header) */}
                    {service.heroBenefits && (
                        <BenefitsAccordion
                            benefits={service.heroBenefits}
                            waveBackground={benefitsHeaderWave}
                            headline={service.heroBenefitsHeadline}
                            description="Discover the benefits that our service can bring to You and your Company"
                        />
                    )}
                </div>

                {/* Tablet (md → laptop) - MainCard + Features Grid + Benefits */}
                <div className="hidden md:flex md:flex-col laptop:hidden gap-4">
                    <MainCard service={service} />

                    {/* Features Grid: 2 columns */}
                    <div className="grid grid-cols-2 gap-4 items-stretch">
                        {/* Column 1: Feature 0 + Feature 1 - stretch to match column 2 height */}
                        <div className="flex flex-col gap-4">
                            <div className="flex-1"><FeatureCard feature={service.features[0]} index={0} variant="tablet" h="full"/></div>
                            <div className="flex-1"><FeatureCard feature={service.features[1]} index={1} variant="tablet" h="full" /></div>
                        </div>

                        {/* Column 2: What is X (expands) + Feature 2 (natural height) */}
                        <div className="flex flex-col gap-4">
                            {/* What is X - grow to fill remaining space while keeping natural height as minimum */}
                            <div className="relative grow flex flex-col justify-center p-6 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-colors min-h-0">
                                {featuresHeaderWave && (
                                    <div
                                        className="absolute inset-0 transition-opacity duration-300 z-0"
                                        style={{
                                            backgroundImage: `url(${featuresHeaderWave})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />
                                <h2 className="text-left! relative z-10 heading-h2 text-white mb-3 w-full">
                                    {service.heroWhatIsHeadline || `What is ${service.title}?`}
                                </h2>
                                <p className="relative z-10 text-body">
                                    {service.heroWhatIsDescription || service.description}
                                </p>
                            </div>
                            <FeatureCard feature={service.features[2]} index={2} variant="tablet" />
                        </div>
                    </div>

                    {/* Benefits - Tablet: Benefit 1 | Header | Benefit 2 */}
                    {service.heroBenefits && (
                        <div className="grid grid-cols-3 gap-4">
                            <BenefitCard benefit={service.heroBenefits[0]} index={0} />

                            {/* Benefits Header (center) */}
                            <div className="relative h-full flex flex-col justify-center p-6 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-colors">
                                {benefitsHeaderWave && (
                                    <div
                                        className="absolute inset-0 transition-opacity duration-300 z-0"
                                        style={{
                                            backgroundImage: `url(${benefitsHeaderWave})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />
                                <h2 className="relative z-10 heading-h2 text-white">
                                    {service.heroBenefitsHeadline || 'What it means for your brand'}
                                </h2>
                            </div>

                            <BenefitCard benefit={service.heroBenefits[1]} index={1} />
                        </div>
                    )}
                </div>

                {/* Desktop (≥laptop/1152px) - Bento Grid */}
                <div className="hidden laptop:flex laptop:flex-col gap-4">
                    {/* Top row: MainCard + Right Column (Slider + Features Header) */}
                    <div className="grid grid-cols-2 gap-4">
                        <MainCard service={service} />
                        <div className="flex flex-col gap-4 h-full">
                            {/* Feature Card 1 */}
                            <div className="h-fit">
                                <FeatureCard feature={service.features[0]} index={0} />
                            </div>

                            {/* Feature Card 2 */}
                            <div className="h-fit">
                                <FeatureCard feature={service.features[1]} index={1} />
                            </div>

                            {/* What is X */}
                            <div className="relative flex-1 flex flex-col justify-center p-6 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-colors">
                                {/* Wave Background */}
                                {featuresHeaderWave && (
                                    <div
                                        className="absolute inset-0 transition-opacity duration-300 z-0"
                                        style={{
                                            backgroundImage: `url(${featuresHeaderWave})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                )}
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />

                                <h2 className="text-left! relative z-10 heading-h2 text-white mb-3 w-full">
                                    {service.heroWhatIsHeadline || `What is ${service.title}?`}
                                </h2>
                                <p className="relative z-10 text-body">
                                    {service.heroWhatIsDescription || service.description}
                                </p>
                            </div>

                            {/* Feature Card 3 */}
                            <div className="h-fit">
                                <FeatureCard feature={service.features[2]} index={2} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom row: Benefit 1 | Benefits Header | Benefit 2 */}
                    {service.heroBenefits && (
                        <div className="grid grid-cols-3 gap-4">
                            {/* Benefit 1 */}
                            <BenefitCard benefit={service.heroBenefits[0]} index={0} />

                            {/* Benefits Header (center) */}
                            <div className="relative h-full flex flex-col justify-center p-8 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-xl overflow-hidden transition-colors">
                                {/* Wave Background */}
                                {benefitsHeaderWave && (
                                    <div
                                        className="absolute inset-0 transition-opacity duration-300 z-0"
                                        style={{
                                            backgroundImage: `url(${benefitsHeaderWave})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                )}
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/60 z-0" />

                                <h2 className="relative z-10 heading-h2 text-white">
                                    {service.heroBenefitsHeadline || 'What it means for your brand'}
                                </h2>
                            </div>

                            {/* Benefit 2 */}
                            <BenefitCard benefit={service.heroBenefits[1]} index={1} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
