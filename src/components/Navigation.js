import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { FloatingNav } from './ui/floating-navbar';
import { BackToTop } from './ui/back-to-top';
import { MovingBorderButton } from './ui/moving-border-button';

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            name: 'Services',
            subItems: [
                { name: 'Paid Search (PPC)', href: '/services/paid-search' },
                { name: 'SEO Services', href: '/services/seo' },
                { name: 'Social Media Marketing', href: '/services/social-media' },
                { name: 'Analytics & Reporting', href: '/services/analytics' },
                { name: 'Programmatic Advertising', href: '/services/programmatic' },
                { name: 'Website Development', href: '/services/websites' },
                { name: 'Email Marketing', href: '/services/email-marketing' },
                { name: 'Data Science & Analytics', href: '/services/data-science' },
                { name: 'AI Solutions', href: '/services/ai-solutions' },
                { name: 'CRO & UX Audits', href: '/services/cro' },
            ],
        },
        { name: 'About', href: '/about' },
        { name: 'Case Studies', href: '/casestudies' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* Desktop only: FloatingNav */}
            <div className="hidden lg:block">
                <FloatingNav />
            </div>

            {/* Mobile + Tablet: Simple navbar */}
            <div
                className="lg:hidden relative z-5000 backdrop-blur-x"
                style={{
                    background: '#020617'
                }}
            >
                <div className="flex items-center justify-between px-4 pt-4" >
                    {/* Logo */}
                    <Link href="/" className="text-lg font-bold tracking-wide font-mono transition-opacity duration-300 active:opacity-70">
                        <span className="logo-gradient-bylt">BYLT</span>
                        <span className="text-gray-500">.</span>
                        <span className="text-white">MEDIA</span>
                    </Link>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-md text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.name}>
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="mobile-menu-link"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <>
                                            <span className="block px-3 py-2 text-base font-medium text-gray-200">
                                                {item.name}
                                            </span>
                                            {item.subItems && (
                                                <div className="pl-4 space-y-1">
                                                    {item.subItems.map(subItem => (
                                                        <Link
                                                            key={subItem.name}
                                                            href={subItem.href}
                                                            className="mobile-submenu-link"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            <span className="text-cyan-400 mr-2">→</span>
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                            <div className="pt-2">
                                <MovingBorderButton
                                    as="a"
                                    href="/free-audit"
                                    borderRadius="0.75rem"
                                    containerClassName="w-full h-12"
                                    borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                    className="bg-slate-950/95 border-2 border-slate-700/80 text-white font-bold text-sm"
                                    duration={2500}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    FREE AUDIT
                                </MovingBorderButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile: BackToTop button */}
            <BackToTop />
        </>
    );
};

export default Navigation;
