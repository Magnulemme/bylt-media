import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    Menu, X, Briefcase, Workflow, Star, Mail, ChevronDown, Search, Users, Globe, 
    BarChart, Bot, TestTube, MousePointer, TrendingUp, Database
} from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeHolo, setActiveHolo] = useState(null);
    const router = useRouter();

    const menuItems = [
        {
            name: 'Services',
            href: '/services',
            icon: <Briefcase size={16} />,
            subItems: [
                { name: 'Paid Search (PPC)', href: '/paidsearch', icon: <Search size={14} /> },
                { name: 'SEO Services', href: '/seo', icon: <TrendingUp size={14} /> },
                { name: 'Social Media Marketing', href: '/socialmedia', icon: <Users size={14} /> },
                { name: 'Analytics & Reporting', href: '/analytics', icon: <BarChart size={14} /> },
                { name: 'Programmatic Advertising', href: '/programmatic', icon: <MousePointer size={14} /> },
                { name: 'Website Development', href: '/websites', icon: <Globe size={14} /> },
                { name: 'Email Marketing', href: '/emailmarketing', icon: <Mail size={14} /> },
                { name: 'Data Science & Analytics', href: '/datascience', icon: <Database size={14} /> },
                { name: 'AI Solutions', href: '/aisolutions', icon: <Bot size={14} /> },
                { name: 'CRO & UX Audits', href: '/croandux', icon: <TestTube size={14} /> },
            ],
        },
        { name: 'About', href: '/about', icon: <Users size={16} /> },
        { name: 'Case Studies', href: '/casestudies', icon: <Star size={16} /> },
        { name: 'Contact', href: '/contact', icon: <Mail size={16} /> },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClass = scrolled ? 'nav-scrolled' : 'nav-transparent';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${navClass}`}>
            <div className="max-w-[var(--breakpoint-content)] mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-20 w-full">
                    <div className="flex-shrink-0 min-w-0">
                        <Link href="/" className="text-3xl font-bold tracking-wider font-inter">
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
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 justify-center">
                        {menuItems.map((item, index) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => setActiveHolo(index)}
                                onMouseLeave={() => setActiveHolo(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                                        router.pathname === item.href
                                            ? 'text-[#B8FFFA]'
                                            : 'text-gray-300 hover:text-[#B8FFFA]'
                                    }`}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                    {item.subItems && <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />}
                                </Link>
                                {item.subItems && (
                                    <div className={`absolute top-full left-0 mt-2 w-auto min-w-[700px] lg:min-w-[800px] rounded-lg shadow-2xl submenu-panel ring-1 ring-gray-700/50 transition-all duration-300 ${activeHolo === index ? 'submenu-visible' : 'submenu-hidden'}`}>
                                        <div className="py-4 px-2 relative">
                                            <div className="grid grid-cols-2 gap-1">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-[#B8FFFA] transition-all duration-200 rounded-md"
                                                        style={{ animationDelay: `${subIndex * 30}ms` }}
                                                    >
                                                        <span className="text-[#B8FFFA] mr-3">{subItem.icon}</span>
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="hidden md:block flex-shrink-0">
                        <Link href="/free-audit" className="quantum-button text-sm lg:text-base">
                            <span>FREE AUDIT</span>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-300 hover:text-white transition-colors duration-300"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 relative">
                        {menuItems.map((item, index) => (
                            <div key={item.name} style={{ animationDelay: `${index * 100}ms` }} className="mobile-menu-item">
                                <Link
                                    href={item.href}
                                    className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:text-[#B8FFFA] transition-colors"
                                    onClick={() => !item.subItems && setIsOpen(false)}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                </Link>
                                {item.subItems && (
                                    <div className="pl-4 mt-2 space-y-1">
                                        {item.subItems.map(subItem => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-[#B8FFFA] transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span className="text-[#B8FFFA] mr-2">{subItem.icon}</span>
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link
                            href="/free-audit"
                            className="block w-full text-center mt-4 quantum-button-mobile"
                            onClick={() => setIsOpen(false)}
                        >
                            FREE AUDIT
                        </Link>
                    </div>
                </div>
            )}

            <style jsx>{`
                .nav-transparent { 
                    background: transparent; 
                }
                .nav-scrolled {
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.5);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .submenu-panel {
                    background: rgba(30, 41, 59, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid #4b5563;
                    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                }
                .submenu-hidden { 
                    opacity: 0; 
                    visibility: hidden; 
                    transform: translateY(-10px); 
                    pointer-events: none;
                }
                .submenu-visible { 
                    opacity: 1; 
                    visibility: visible; 
                    transform: translateY(0); 
                    pointer-events: all;
                }
                
                .quantum-button, .quantum-button-mobile {
                    position: relative; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center;
                    padding: 12px 24px; 
                    font-weight: 600; 
                    color: white;
                    background: #374151;
                    border: 1px solid #4b5563; 
                    border-radius: 8px; 
                    font-family: 'Inter', sans-serif;
                    text-decoration: none; 
                    overflow: hidden; 
                    transition: all 0.3s ease; 
                    cursor: pointer;
                    white-space: nowrap;
                }
                .quantum-button:hover { 
                    background: #B8FFFA; 
                    color: #1e293b; 
                    transform: translateY(-2px); 
                    border-color: #B8FFFA; 
                    box-shadow: 0 4px 12px rgba(184, 255, 250, 0.3);
                }
                .quantum-button-mobile:hover { 
                    background: #B8FFFA; 
                    color: #1e293b; 
                    border-color: #B8FFFA; 
                }

                .mobile-menu {
                    background: rgba(15, 23, 42, 0.98);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(55, 65, 81, 0.5);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                
                .mobile-menu-item {
                    animation: slideInMobile 0.3s ease-out forwards;
                    opacity: 0;
                    transform: translateX(-20px);
                }
                
                @keyframes slideInMobile {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Ensure navigation is always on top */
                nav {
                    z-index: 9999 !important;
                }

                /* Fix for potential text overflow issues */
                .flex.items-center.space-x-8 > div > a {
                    white-space: nowrap;
                }

                /* Ensure submenu doesn't get cut off */
                .relative.group {
                    position: relative;
                }

                /* Better mobile menu positioning */
                @media (max-width: 768px) {
                    .mobile-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        z-index: 1000;
                    }
                }

                /* Responsive navigation adjustments */
                @media (max-width: 1024px) {
                    .hidden.md\\:flex.items-center {
                        space-x: 0.75rem;
                    }
                    
                    .quantum-button {
                        padding: 10px 18px;
                        font-size: 0.875rem;
                    }
                }

                @media (max-width: 1280px) {
                    .min-w-\\[800px\\] {
                        min-width: 700px;
                    }
                }

                @media (max-width: 900px) {
                    .min-w-\\[700px\\] {
                        min-width: 600px;
                    }
                }

                /* Ensure navigation items don't overflow */
                .nav-item-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                /* Fix for potential layout shifts */
                nav {
                    transition: all 0.3s ease;
                }

                /* Better spacing for smaller desktop screens */
                @media (min-width: 768px) and (max-width: 1024px) {
                    .space-x-6 > :not([hidden]) ~ :not([hidden]) {
                        margin-left: 1rem;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navigation;