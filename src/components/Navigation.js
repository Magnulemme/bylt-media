import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingNav } from './ui/floating-navbar';
import { MobileMenuFab } from './ui/back-to-top';
import { MovingBorderButton } from './ui/moving-border-button';

// Animation variants per staggered menu
const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        }
    }
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        filter: 'blur(10px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: 'blur(5px)',
        transition: {
            duration: 0.2
        }
    }
};

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAccordionOpen, setMobileAccordionOpen] = useState(null);
    const pathname = usePathname();

    // Chiudi il menu quando cambia la route (dopo la navigazione)
    useEffect(() => {
        setMobileMenuOpen(false);
        setMobileAccordionOpen(null);
    }, [pathname]);

    useEffect(() => {
        if (mobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

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
        { name: 'Case Studies', href: '/case-studies' },
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
                className="lg:hidden relative z-[5000]"
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
                        onClick={() => {
                            setMobileMenuOpen(!mobileMenuOpen);
                            if (mobileMenuOpen) setMobileAccordionOpen(null);
                        }}
                        className="p-2 rounded-md text-gray-300 hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Fullscreen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 z-[4999] bg-[#020617] flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Menu Content - Centrato con scroll */}
                        <div className="flex-1 overflow-y-auto px-6 pt-20 pb-8">
                            <motion.nav
                                className="flex flex-col items-center gap-1 w-full max-w-sm mx-auto min-h-full justify-center"
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {menuItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                        className="w-full"
                                    >
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                className="block text-center py-3 text-2xl font-semibold text-gray-200 hover:text-[#B8FFFA] transition-colors duration-300"
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <div className="w-full">
                                                <button
                                                    onClick={() => setMobileAccordionOpen(mobileAccordionOpen === index ? null : index)}
                                                    className="flex items-center justify-center gap-2 w-full py-3 text-2xl font-semibold text-gray-200 hover:text-[#B8FFFA] transition-colors duration-300"
                                                >
                                                    {item.name}
                                                    {item.subItems && (
                                                        <ChevronDown
                                                            size={22}
                                                            className={`transition-transform duration-300 ${mobileAccordionOpen === index ? 'rotate-180' : ''}`}
                                                        />
                                                    )}
                                                </button>
                                                {item.subItems && (
                                                    <motion.div
                                                        initial={false}
                                                        animate={{
                                                            height: mobileAccordionOpen === index ? "auto" : 0,
                                                            opacity: mobileAccordionOpen === index ? 1 : 0
                                                        }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="flex flex-col items-center gap-1 py-3 mt-2">
                                                            {item.subItems.map((subItem, subIndex) => (
                                                                <motion.div
                                                                    key={subItem.name}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: subIndex * 0.03 }}
                                                                >
                                                                    <Link
                                                                        href={subItem.href}
                                                                        className="block py-2 text-base text-gray-400 hover:text-[#B8FFFA] transition-colors duration-200"
                                                                    >
                                                                        {subItem.name}
                                                                    </Link>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {/* CTA Button */}
                                <motion.div
                                    variants={itemVariants}
                                    className="mt-8 w-full flex justify-center"
                                >
                                    <MovingBorderButton
                                        as="a"
                                        href="/free-audit"
                                        borderRadius="0.75rem"
                                        containerClassName="min-w-[220px] h-14"
                                        borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                        className="border-2 border-slate-700/80 text-white font-bold text-base bg-slate-950"
                                        duration={2500}
                                    >
                                        Get Free Audit
                                    </MovingBorderButton>
                                </motion.div>
                            </motion.nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile: Floating menu button */}
            <MobileMenuFab
                isOpen={mobileMenuOpen}
                onToggle={() => {
                    setMobileMenuOpen(!mobileMenuOpen);
                    if (mobileMenuOpen) setMobileAccordionOpen(null);
                }}
            />
        </>
    );
};

export default Navigation;
