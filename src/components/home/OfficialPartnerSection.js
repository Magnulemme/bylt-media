import React from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';

// Optimized Official Partner Section with reduced animations
const OfficialPartnerSection = () => {
    const sectionRef = useQuantumScrollAnim(0.1);

    return (
        <div
            ref={sectionRef}
            className="py-16 bg-slate-900 quantum-anim partner-section relative overflow-hidden"
            style={{
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <div
                        className="section-connector mb-8"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="connector-line"></div>
                        <div className="connector-dot"></div>
                        <div className="connector-line"></div>
                    </div>
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced partnership-title">
                            Official UK Partner
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Partnership Info */}
                    <div
                        className="partnership-info"
                        style={{ willChange: 'transform' }}
                    >
                        <div
                            className="partner-logo-container mb-8"
                            style={{ contain: 'layout style paint' }}
                        >
                            <div className="logo-glow-effect">
                                <a
                                    href="https://marketiseme.com/en/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="partner-logo-link"
                                >
                                    <img
                                        src="/images/partners/marketise-me-logo.svg"
                                        alt="Marketise Me"
                                        className="partner-logo"
                                        loading="lazy"
                                    />
                                </a>
                            </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-inter text-center">
                            Growth Through
                            <span className="text-[#B8FFFA]"> Strategic Partnership</span>
                        </h3>

                        <p className="text-base text-gray-300 leading-relaxed mb-6 text-center max-w-md mx-auto">
                            We have partnered with Marketise Me to deliver proven strategies across 4 continents.
                            Average ROAS of 9.5x with €200M+ in managed ad spend.
                        </p>

                        <div
                            className="partnership-benefits"
                            style={{ contain: 'layout style' }}
                        >
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">10+ Years Experience</h4>
                                    <p className="text-gray-400">Proven track record across multiple markets</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Data-Driven Strategy</h4>
                                    <p className="text-gray-400">Every campaign backed by comprehensive analytics</p>
                                </div>
                            </div>

                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Long-Term Partnership</h4>
                                    <p className="text-gray-400">We focus on sustainable growth, not quick wins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Platform Partners */}
                    <div
                        className="platform-partners"
                        style={{ willChange: 'transform' }}
                    >
                        <div className="partners-header mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-inter text-center">
                                Official Partners of
                            </h3>
                        </div>

                        <div
                            className="partner-logos-grid"
                            style={{ contain: 'layout style' }}
                        >
                            <div className="partner-logo-item">
                                <img
                                    src="/images/partners/partners logos/google-partner-logo-min.svg"
                                    alt="Google Partner"
                                    className="platform-logo"
                                    loading="lazy"
                                />
                            </div>

                            <div className="partner-logo-item">
                                <img
                                    src="/images/partners/partners logos/meta_partner_logo.png"
                                    alt="Meta Business Partner"
                                    className="platform-logo"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <div
                            className="trust-stats"
                            style={{ contain: 'layout style paint' }}
                        >
                            <div className="stat-item">
                                <div className="stat-number">9.5x</div>
                                <div className="stat-label">Average ROAS</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">€200M+</div>
                                <div className="stat-label">Ad Spend Managed</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">4</div>
                                <div className="stat-label">Continents</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .partner-section {
                    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                    position: relative;
                }

                .partner-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0.3;
                }

                .section-connector {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .connector-line {
                    width: 3rem;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                }

                .connector-dot {
                    width: 8px;
                    height: 8px;
                    background: #B8FFFA;
                    border-radius: 50%;
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.5);
                    animation: simplePulse 3s ease-in-out infinite;
                }

                @keyframes simplePulse {
                    0%, 100% { transform: scale3d(1, 1, 1); opacity: 1; }
                    50% { transform: scale3d(1.1, 1.1, 1); opacity: 0.8; }
                }

                .partnership-title {
                    background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 50%, #ffffff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.025em;
                    text-shadow: 0 0 30px rgba(184, 255, 250, 0.3);
                }

                .partner-logo-container {
                    display: flex;
                    justify-content: center;
                    position: relative;
                }

                .logo-glow-effect {
                    position: relative;
                    padding: 2rem;
                    border-radius: 20px;
                    background: rgba(30, 41, 59, 0.3);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.2s ease;
                }

                .logo-glow-effect:hover {
                    border-color: rgba(184, 255, 250, 0.4);
                    background: rgba(30, 41, 59, 0.5);
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.05);
                }

                .partner-logo-link {
                    display: inline-block;
                    transition: transform 0.2s ease;
                }

                .partner-logo-link:hover {
                    transform: scale3d(1.02, 1.02, 1);
                }

                .partner-logo {
                    height: 5rem;
                    width: auto;
                    opacity: 0.95;
                    filter: brightness(1.1) contrast(1.1);
                    transition: all 0.2s ease;
                }

                .partner-logo:hover {
                    opacity: 1;
                }

                .partnership-benefits {
                    display: grid;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }

                .benefit-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 16px;
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: hidden;
                }

                .benefit-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .benefit-item:hover {
                    border-color: rgba(184, 255, 250, 0.4);
                    background: rgba(30, 41, 59, 0.5);
                    transform: translate3d(0, -1px, 0);
                }

                .benefit-item:hover::before {
                    opacity: 0.5;
                }

                .benefit-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(184, 255, 250, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 1px solid rgba(184, 255, 250, 0.2);
                }

                .benefit-dot {
                    width: 12px;
                    height: 12px;
                    background: #B8FFFA;
                    border-radius: 50%;
                    box-shadow: 0 0 15px rgba(184, 255, 250, 0.5);
                    animation: simplePulse 3s ease-in-out infinite;
                }

                .partners-header {
                    text-align: center;
                }

                .partner-logos-grid {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin-bottom: 3rem;
                }

                .partner-logo-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background: transparent;
                    border-radius: 0;
                    border: none;
                    transition: all 0.2s ease;
                    position: relative;
                    overflow: visible;
                    min-width: auto;
                    min-height: auto;
                }

                .partner-logo-item::before {
                    display: none;
                }

                .partner-logo-item:hover {
                    background: transparent;
                    transform: translate3d(0, -2px, 0);
                    box-shadow: none;
                }

                .partner-logo-item:hover::before {
                    display: none;
                }

                .partner-logo-item .platform-logo {
                    height: 6rem;
                    width: auto;
                    opacity: 0.95;
                    transition: all 0.2s ease;
                    filter: brightness(1.1) contrast(1.05);
                }

                .partner-logo-item:hover .platform-logo {
                    opacity: 1;
                    transform: scale3d(1.05, 1.05, 1);
                    filter: brightness(1.2) contrast(1.1);
                }

                .trust-stats {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: rgba(184, 255, 250, 0.05);
                    border-radius: 16px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    backdrop-filter: blur(5px);
                }

                .stat-item {
                    text-align: center;
                    flex: 1;
                }

                .stat-divider {
                    width: 1px;
                    height: 3rem;
                    background: linear-gradient(180deg, transparent, #B8FFFA, transparent);
                    margin: 0 1rem;
                }

                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #B8FFFA;
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 0.5rem;
                    display: block;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: #9CA3AF;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 500;
                }

                @media (min-width: 768px) {
                    .partner-logo { height: 6rem; }
                    .stat-number { font-size: 1.75rem; }
                }

                @media (max-width: 768px) {
                    .partner-logos-grid {
                        flex-direction: column;
                        align-items: center;
                        gap: 1.5rem;
                    }
                    .partner-logo-item {
                        min-width: 100px;
                        min-height: 100px;
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 1024px) {
                    .trust-stats {
                        flex-direction: column;
                        gap: 2rem;
                    }
                    .stat-divider {
                        width: 3rem;
                        height: 1px;
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default OfficialPartnerSection;
