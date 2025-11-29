import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeHolo, setActiveHolo] = useState(null);
    const hoverTimeoutRef = useRef(null);
    const router = useRouter();

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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hover menu with delay for better UX
    const handleMouseEnter = (index) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setActiveHolo(index);
    };

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setActiveHolo(null);
        }, 300); // 300ms delay before hiding the menu
    };

    const navClass = scrolled ? 'nav-scrolled' : 'nav-transparent';

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${navClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex justify-between items-center h-20 w-full">
                    <div className="flex-shrink-0 min-w-0">
                        <Link href="/" className="text-2xl font-bold tracking-wider font-inter">
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
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                                            router.pathname === item.href
                                                ? 'text-[#B8FFFA]'
                                                : 'text-gray-300 hover:text-[#B8FFFA]'
                                        }`}
                                    >
                                        {item.name}
                                        {item.subItems && <ChevronDown size={14} className="ml-1 transition-transform group-hover:rotate-180" />}
                                    </Link>
                                ) : (
                                    <span
                                        className="flex items-center px-3 lg:px-4 py-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap text-gray-300 hover:text-[#B8FFFA] cursor-pointer"
                                    >
                                        {item.name}
                                        {item.subItems && <ChevronDown size={14} className="ml-1 transition-transform group-hover:rotate-180" />}
                                    </span>
                                )}
                                {item.subItems && (
                                    <div className={`absolute top-full left-0 mt-2 w-auto min-w-[700px] lg:min-w-[800px] rounded-lg shadow-2xl submenu-panel ring-1 ring-gray-700/50 transition-all duration-300 ${activeHolo === index ? 'submenu-visible' : 'submenu-hidden'}`}>
                                        <div className="py-4 px-2 relative">
                                            <div className="grid grid-cols-2 gap-1">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subItem.name}
                                                        href={subItem.href}
                                                        className="group/item flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-[#B8FFFA] transition-all duration-200 rounded-md relative"
                                                        style={{ animationDelay: `${subIndex * 30}ms` }}
                                                    >
                                                        <span className="text-cyan-400 mr-2 group-hover/item:opacity-0 transition-opacity duration-200">→</span>
                                                        <span className="text-cyan-400 mr-2 absolute left-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">{'{'}</span>
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
                        <a
                            href="/free-audit"
                            className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 bg-[length:200%_200%] animate-gradient rounded-lg transition-transform duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            FREE AUDIT
                        </a>
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
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:text-[#B8FFFA] transition-colors"
                                        onClick={() => !item.subItems && setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className="flex items-center px-3 py-2 text-base font-medium text-gray-200 hover:text-[#B8FFFA] transition-colors">
                                        {item.name}
                                    </span>
                                )}
                                {item.subItems && (
                                    <div className="pl-4 mt-2 space-y-1">
                                        {item.subItems.map(subItem => (
                                            <Link
                                                key={subItem.name}
                                                href={subItem.href}
                                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-[#B8FFFA] transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <span className="text-cyan-400 mr-2">→</span>
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="mt-4 flex justify-center">
                            <a
                                href="/free-audit"
                                className="inline-flex items-center justify-center h-11 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 bg-[length:200%_200%] animate-gradient rounded-lg transition-transform duration-300 shadow-lg hover:shadow-xl w-full max-w-xs"
                                onClick={() => setIsOpen(false)}
                            >
                                FREE AUDIT
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .nav-transparent {
                    background: rgba(2, 6, 23, 0.95);
                    backdrop-filter: blur(20px);
                }
                .nav-scrolled {
                    background: rgba(2, 6, 23, 0.98);
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

                nav {
                    z-index: 9999 !important;
                }

                .flex.items-center.space-x-8 > div > a {
                    white-space: nowrap;
                }

                .relative.group {
                    position: relative;
                }

                @media (max-width: 768px) {
                    .mobile-menu {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        z-index: 1000;
                    }
                }

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

                .nav-item-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                nav {
                    transition: all 0.3s ease;
                }

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
