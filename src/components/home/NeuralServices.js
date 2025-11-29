import { useState } from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { TrendingUp, Search, Code, BrainCircuit, ChevronDown } from 'lucide-react';
import AnimatedNeuralNetwork from './AnimatedNeuralNetwork';

const NeuralServices = () => {
    const [openService, setOpenService] = useState(null);
    const sectionRef = useQuantumScrollAnim(0.1);

    const services = [
        { id: 'paid-media', title: 'Paid Media', subtitle: 'Precision-targeted ad campaigns', icon: <TrendingUp size={24} />, description: 'Our Paid Media strategies are engineered for maximum ROI. We leverage data-driven insights to create, manage, and optimise campaigns across all major platforms.', capabilities: [ { name: 'PPC Campaign Management' }, { name: 'Social Media Advertising' }, { name: 'Display & Video Ads' }, { name: 'Conversion Rate Optimisation' } ] },
        { id: 'seo', title: 'SEO', subtitle: 'Dominate search engine rankings', icon: <Search size={24} />, description: 'We elevate your digital presence with comprehensive SEO strategies. From technical audits to content creation and link building, we focus on sustainable growth.', capabilities: [ { name: 'Technical SEO Audits' }, { name: 'Content Strategy & Creation' }, { name: 'Link Building & Outreach' }, { name: 'Local & International SEO' } ] },
        { id: 'web-dev', title: 'Website Development', subtitle: 'High-performance, scalable websites', icon: <Code size={24} />, description: 'Your website is your digital flagship. We build secure, scalable, and lightning-fast websites using modern frameworks with a focus on exceptional user experience.', capabilities: [ { name: 'Next.js & React Development' }, { name: 'Headless CMS Integration' }, { name: 'E-commerce Solutions' }, { name: 'Performance Optimisation' } ] },
        { id: 'ai-solutions', title: 'AI & Automation', subtitle: 'Integrate intelligence into your business', icon: <BrainCircuit size={24} />, description: 'Unlock new efficiencies with our bespoke AI solutions. We develop and integrate custom AI models, automation workflows, and data analysis tools.', capabilities: [ { name: 'Custom AI Model Development' }, { name: 'Business Process Automation' }, { name: 'Data Analysis & Insights' }, { name: 'API Integration' } ] },
    ];

    const toggleService = (id) => {
        setOpenService(openService === id ? null : id);
    };

    return (
        <section id="services" className="py-24 bg-slate-900/50 relative">
            <AnimatedNeuralNetwork />
            <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 quantum-anim">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Integrated Services
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        A synergistic approach to digital dominance. Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results.
                    </p>
                </div>

                <div className="accordion-container">
                    {services.map((service) => (
                        <div key={service.id} className={`accordion-item ${openService === service.id ? 'open' : ''}`}>
                            <button
                                className="accordion-header"
                                onClick={() => toggleService(service.id)}
                                aria-expanded={openService === service.id}
                                aria-controls={`content-${service.id}`}
                            >
                                <div className="header-content">
                                    <div className="header-icon">
                                        {service.icon}
                                    </div>
                                    <div className="header-text">
                                        <h3 className="header-title">{service.title}</h3>
                                        <p className="header-subtitle">{service.subtitle}</p>
                                    </div>
                                </div>
                                <div className="accordion-arrow">
                                    <ChevronDown size={24} />
                                </div>
                            </button>
                            <div
                                id={`content-${service.id}`}
                                className="accordion-panel"
                                style={{ maxHeight: openService === service.id ? '1000px' : '0px' }}
                            >
                                <div className="accordion-panel-content">
                                    <p>{service.description}</p>
                                    <div className="capability-matrix">
                                        <h4>Capability Matrix</h4>
                                        <ul className="capability-grid">
                                            {service.capabilities.map((cap, i) => (
                                                <li key={i} className="capability-item">
                                                    <div className="capability-badge">
                                                        <div className="capability-icon">
                                                            <div className="pulse-dot"></div>
                                                        </div>
                                                        <span className="capability-name">{cap.name}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .accordion-container { display: flex; flex-direction: column; gap: 1rem; }
                .accordion-item { background: rgba(30, 41, 59, 0.5); border-radius: 12px; border: 1px solid rgba(55, 65, 81, 0.5); backdrop-filter: blur(8px); transition: all 0.3s ease-in-out; }
                .accordion-item.open { border-color: #B8FFFA; background: rgba(184, 255, 250, 0.05); }
                .accordion-header { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1.25rem 1.5rem; text-align: left; cursor: pointer; background: transparent; border: none; color: white; }
                .header-content { display: flex; align-items: center; gap: 1.25rem; }
                .header-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: white; background: rgba(75, 85, 99, 0.5); transition: all 0.3s ease; }
                .accordion-item.open .header-icon { background: #B8FFFA; color: #111827; }
                .header-text { text-align: left; }
                .header-title { font-size: 1.125rem; font-weight: 600; font-family: 'Inter', sans-serif; }
                .header-subtitle { font-size: 0.875rem; color: #9ca3af; margin-top: 2px; }
                .accordion-arrow { transition: transform 0.3s ease; }
                .accordion-item.open .accordion-arrow { transform: rotate(180deg); color: #B8FFFA; }
                .accordion-panel { overflow: hidden; transition: max-height 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0); }
                .accordion-panel-content { padding: 0 1.5rem 1.5rem 1.5rem; color: #d1d5db; font-size: 1rem; line-height: 1.6; }
                .capability-matrix { margin-top: 1.5rem; border-top: 1px solid rgba(55, 65, 81, 0.5); padding-top: 1.5rem; }
                .capability-matrix h4 { font-size: 1rem; font-weight: 600; color: white; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
                .capability-grid { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
                .capability-item { transition: all 0.3s ease; }
                .accordion-item.open .capability-item { animation: fadeInItem 0.5s ease forwards; opacity: 0; }
                @keyframes fadeInItem { to { opacity: 1; } }
                .capability-item:nth-child(1) { animation-delay: 0.1s; }
                .capability-item:nth-child(2) { animation-delay: 0.2s; }
                .capability-item:nth-child(3) { animation-delay: 0.3s; }
                .capability-item:nth-child(4) { animation-delay: 0.4s; }
                .capability-badge { display: flex; align-items: center; padding: 1rem; gap: 0.75rem; background: rgba(255, 255, 255, 0.03); border-radius: 12px; }
                .capability-icon { width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; position: relative; flex-shrink: 0; }
                .pulse-dot { width: 8px; height: 8px; background: #B8FFFA; border-radius: 50%; animation: pulseDot 2s ease-in-out infinite; }
                @keyframes pulseDot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.7; } }
                .capability-name { font-size: 0.95rem; font-weight: 500; color: #e5e7eb; flex-grow: 1; }
                @media (max-width: 768px) { .capability-grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default NeuralServices;
