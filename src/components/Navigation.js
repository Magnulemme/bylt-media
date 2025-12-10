import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { FloatingNav } from './ui/floating-navbar';
import { BackToTop } from './ui/back-to-top';

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            name: 'Services',
            subItems: [
                { name: 'Paid Search (PPC)', href: '/paidsearch' },
                { name: 'SEO Services', href: '/seo' },
                { name: 'Social Media Marketing', href: '/socialmedia' },
                { name: 'Analytics & Reporting', href: '/analytics' },
                { name: 'Programmatic Advertising', href: '/programmatic' },
                { name: 'Website Development', href: '/websites' },
                { name: 'Email Marketing', href: '/emailmarketing' },
                { name: 'Data Science & Analytics', href: '/datascience' },
                { name: 'AI Solutions', href: '/aisolutions' },
                { name: 'CRO & UX Audits', href: '/croandux' },
            ],
        },
        { name: 'About', href: '/about' },
        { name: 'Case Studies', href: '/casestudies' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            {/* Desktop: FloatingNav */}
            <FloatingNav />

            {/* Mobile: Simple navbar */}
            <div className="md:hidden bg-[rgba(2,6,23,0.95)] backdrop-blur-xl border-b border-gray-700/50">
                <div className="flex items-center justify-between px-4 py-3">
                    {/* Logo */}
                    <Link href="/" className="text-lg font-bold tracking-wider font-inter">
                        <span style={{
                            background: 'linear-gradient(45deg, #B8FFFA 0%, #B8FFB8 50%, #B8FFFA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>BYLT</span>
                        <span className="text-gray-400">.</span>
                        <span style={{
                            background: 'linear-gradient(45deg, #B8FFB8 0%, #B8FFFA 50%, #B8FFB8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>MEDIA</span>
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
                    <div className="border-t border-gray-700/50 max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-4 space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.name}>
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="block px-3 py-2 text-base font-medium text-gray-200 hover:text-[#B8FFFA] transition-colors rounded-md"
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
                                                            className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-[#B8FFFA] transition-colors"
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
                                <a
                                    href="/free-audit"
                                    className="block w-full text-center py-3 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 bg-[length:200%_200%] animate-gradient rounded-md shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    FREE AUDIT
                                </a>
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
