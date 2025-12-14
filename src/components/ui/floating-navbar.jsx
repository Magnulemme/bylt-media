"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { MovingBorderButton } from "./moving-border-button";

export const FloatingNav = ({
  className
}) => {
  const { scrollY } = useScroll();
  const [isFloating, setIsFloating] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const navbarRef = useRef(null);
  const hasFloatedRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const direction = current - previous;
    const scrollingUp = direction < 0;

    if (current === 0) {
      // Tornato al top: reset completo
      hasFloatedRef.current = false;
      setIsFloating(false);
      setHideNavbar(false);
    } else if (!hasFloatedRef.current && !scrollingUp) {
      // Scroll iniziale verso il basso: mantieni absolute (scivola via)
      setIsFloating(false);
      setHideNavbar(false);
    } else {
      // Scrolling up o già diventato floating: passa/mantieni fixed
      hasFloatedRef.current = true;
      setIsFloating(true);
      // Nascondi solo quando scrolli verso il basso e oltre 100px
      setHideNavbar(direction > 0 && current >= 100);
    }

    lastScrollY.current = current;
  });

  const handleMouseEnter = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

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

  const navContent = (
    <>
      {/* Logo */}
      <Link href="/" className="text-xl font-bold tracking-wider font-inter flex-shrink-0">
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

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
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
                className="flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-[#B8FFFA]"
              >
                {item.name}
              </Link>
            ) : (
              <span className="flex items-center px-3 py-2 text-sm font-medium transition-colors duration-300 text-gray-300 hover:text-[#B8FFFA] cursor-pointer">
                {item.name}
                {item.subItems && <ChevronDown size={14} className="ml-1 transition-transform group-hover:rotate-180" />}
              </span>
            )}

            {item.subItems && (
              <div className={cn(
                "absolute top-full left-0 mt-2 w-auto min-w-[700px] rounded-lg shadow-2xl ring-1 ring-gray-700/50 transition-all duration-300",
                "bg-[rgba(2,6,23,0.95)] backdrop-blur-xl",
                activeDropdown === index ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
              )}>
                <div className="py-4 px-2">
                  <div className="grid grid-cols-2 gap-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="group/item flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-[#B8FFFA] transition-all duration-200 rounded-md relative"
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

      {/* FREE AUDIT Button - Desktop */}
      <div className="hidden md:flex justify-center">
        <MovingBorderButton
          as="a"
          href="/free-audit"
          borderRadius="0.75rem"
          containerClassName="min-w-[160px] h-12"
          borderClassName="h-12 w-12 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
          className="bg-slate-950/95 border-2 border-slate-700/80 text-white font-bold text-sm"
          duration={2500}
        >
          FREE AUDIT
        </MovingBorderButton>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-md text-gray-300 hover:text-white transition-colors"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 rounded-md shadow-2xl bg-[rgba(2,6,23,0.95)] backdrop-blur-xl border border-gray-700/50 overflow-hidden">
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
    </>
  );

  return (
    <motion.div
      ref={navbarRef}
      className={cn(
        "top-2 w-full z-[5000] hidden md:block",
        isFloating ? "fixed" : "absolute"
      )}
      animate={{
        y: isFloating && hideNavbar ? -100 : 0,
        opacity: isFloating && hideNavbar ? 0 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <div className={cn(
        "flex inset-x-0 mx-auto rounded-md shadow-2xl items-center justify-between px-6 py-3 max-w-6xl",
        "bg-[rgba(2,6,23,0.95)] backdrop-blur-xl",
        isFloating && "border border-gray-700/50",
        className
      )}>
        {navContent}
      </div>
    </motion.div>
  );
};
