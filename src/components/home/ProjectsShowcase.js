import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import CTASectionCard from '../ui/CTASectionCard';
import { MovingBorderButton } from '../ui/moving-border-button';
import { useProfiler } from '@/hooks/useProfiler';
import ShaderBackgroundDirect from './ShaderBackgroundDirect';
import BrandMarquee from '../caseStudies/sections/template/BrandMarquee';

// Hook per animazione Lissajous curve (figura a "8" smooth)
const useLissajousAnimation = (isActive, seed = 0) => {
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);
    const wasActiveRef = useRef(false);

    useAnimationFrame((time) => {
        if (!isActive) {
            if (wasActiveRef.current) {
                rotateX.set(0);
                rotateY.set(0);
                x.set(0);
                y.set(0);
                scale.set(1);
                wasActiveRef.current = false;
            }
            return;
        }

        wasActiveRef.current = true;

        const t = (time / 1000 + seed) * 0.8;
        const phase = seed;

        const lissajousX = Math.sin(2 * t + phase) * 12;
        const lissajousY = Math.sin(t) * 10;
        const rotation3DX = Math.sin(t + Math.PI / 4) * 8;
        const rotation3DY = Math.sin(2 * t) * 10;
        const scalePulse = Math.sin(t * 0.7) * 0.05;

        x.set(lissajousX);
        y.set(lissajousY);
        rotateX.set(rotation3DX);
        rotateY.set(rotation3DY);
        scale.set(1 + scalePulse);
    });

    return { rotateX, rotateY, x, y, scale };
};

// Component per singolo progetto con scroll reveal su mobile
const ProjectItem = React.memo(({ project, index, onHover, hoveredProject, isExpanded, onToggleExpand, isActive, isScrollBgEnabled, itemRef }) => {
    const isHovered = hoveredProject?.id === project.id;
    const lissajousAnimation = useLissajousAnimation(isHovered, index * 1.5);

    return (
        <motion.div
            ref={itemRef}
            data-project-id={project.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Background Image - Scroll Reveal (Mobile fino a lg) */}
            {isScrollBgEnabled && (
                <motion.div
                    className="xl:hidden absolute rounded-xl overflow-hidden -inset-x-2 md:-inset-x-4 pointer-events-none"
                    style={{
                        top: 0,
                        bottom: 0,
                    }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                    {/* Dark overlay per leggibilità testo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
                </motion.div>
            )}

            <div
                className="group project-link-item cursor-pointer"
                onMouseEnter={() => onHover(project)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onToggleExpand(project.id)}
            >
                {/* Riga principale con grid solo su XL */}
                <div className="xl:grid xl:grid-cols-[1fr_auto] xl:gap-8 xl:items-center">
                    <div className="project-link-content relative flex items-center gap-4 md:gap-8">
                        {/* Number */}
                        <span className="relative z-10 text-cyan-400/50 font-mono text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300 shrink-0 min-w-[2rem]">
                            {String(project.id).padStart(2, '0')}
                        </span>

                        {/* Project Info with inline plus button */}
                        <div className="relative z-10 project-info-container flex-1">
                            <h3 className="project-title inline">
                                {project.name}
                            </h3>
                            {/* Plus button inline dopo il titolo */}
                            <motion.div
                                className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-lg backdrop-blur-sm border-2 relative ml-8 align-middle bg-white/5"
                                style={{
                                    verticalAlign: 'middle',
                                }}
                                initial={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                                animate={{
                                    rotate: isExpanded ? 45 : 0,
                                    x: isExpanded ? 2 : 0,
                                    y: isExpanded ? 2 : 0,
                                    boxShadow: isExpanded
                                        ? '4px 4px 0px rgba(34, 211, 238, 0.5)'
                                        : '6px 6px 0px rgba(34, 211, 238, 1)',
                                    borderColor: isExpanded
                                        ? 'rgba(34, 211, 238, 0.8)'
                                        : 'rgba(255, 255, 255, 0.3)',
                                }}
                                whileHover={!isExpanded ? {
                                    x: 2,
                                    y: 2,
                                    borderColor: 'rgba(34, 211, 238, 0.6)',
                                } : {}}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                            >
                                <svg
                                    className="w-5 h-5 text-cyan-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </motion.div>
                            <div className="project-meta">
                                <span>{project.category}</span>
                                <span className="text-cyan-400/50">•</span>
                                <span>{project.service}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image a destra - Solo XL, visibile in hover, nascosta se espanso */}
                    <motion.div
                        className="hidden xl:block w-80 h-52 rounded-lg overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isHovered && !isExpanded ? 1 : 0,
                        }}
                        transition={{
                            opacity: { duration: 0.3, ease: "easeOut" }
                        }}
                        style={{
                            perspective: 1000,
                            transformStyle: 'preserve-3d',
                            rotateX: lissajousAnimation.rotateX,
                            rotateY: lissajousAnimation.rotateY,
                            x: lissajousAnimation.x,
                            y: lissajousAnimation.y,
                            scale: lissajousAnimation.scale,
                        }}
                    >
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                {/* Expanded Content - dentro project-link-item, sopra il border */}
                <div
                    className="grid"
                    style={{
                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.35s ease-out',
                    }}
                >
                    <div className="overflow-hidden">
                        <div
                            className="pt-8 pb-4"
                            style={{
                                opacity: isExpanded ? 1 : 0,
                                transition: 'opacity 0.25s ease-out',
                                transitionDelay: isExpanded ? '0.1s' : '0s',
                            }}
                        >
                            {/* Card link - tutta l'area è cliccabile */}
                            <a
                                href={project.link}
                                className="group/card block rounded-xl p-4 lg:p-6 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/10"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                                    {/* Image */}
                                    <div className="lg:w-80 shrink-0">
                                        <div className="relative rounded-xl overflow-hidden aspect-[16/10] lg:aspect-[4/3] transition-transform duration-300 group-hover/card:scale-[1.02]">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            {/* Highlight stat overlay */}
                                            <div className="absolute bottom-4 left-4">
                                                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                                    {project.highlight}
                                                </span>
                                                <span className="block text-xs text-cyan-300 uppercase tracking-wider mt-1">
                                                    {project.highlightLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap gap-2">
                                                <MovingBorderButton
                                                    as="span"
                                                    variant="tag"
                                                    color="cyan"
                                                    className="text-xs font-semibold"
                                                >
                                                    {project.category}
                                                </MovingBorderButton>
                                                <MovingBorderButton
                                                    as="span"
                                                    variant="tag"
                                                    color="cyan"
                                                    className="text-xs font-semibold"
                                                >
                                                    {project.service}
                                                </MovingBorderButton>
                                            </div>
                                            <p className="text-body-lg text-white/80 mt-3 max-w-xl">
                                                {project.description}
                                            </p>
                                        </div>

                                        <span className="inline-flex items-center gap-2 mt-6 text-base font-semibold text-white transition-colors duration-300 group-hover/card:text-cyan-400">
                                            <span>Read Full Case Study</span>
                                            <span className="transition-transform duration-300 group-hover/card:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

const ProjectsShowcase = () => {
    useProfiler('ProjectsShowcase');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [expandedProjectId, setExpandedProjectId] = useState(null);
    const [isScrollBgEnabled, setIsScrollBgEnabled] = useState(true);
    const visibleProjectsRef = useRef(new Set());

    // IntersectionObserver centralizzato - UN SOLO observer per tutti gli items
    const observerRef = useRef(null);

    // Inizializza l'observer una sola volta
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const projectId = Number(entry.target.dataset.projectId);
                    if (entry.isIntersecting) {
                        visibleProjectsRef.current.add(projectId);
                    } else {
                        visibleProjectsRef.current.delete(projectId);
                    }
                });

                const visibleIds = Array.from(visibleProjectsRef.current).sort((a, b) => a - b);
                setActiveProjectId(visibleIds.length > 0 ? visibleIds[0] : null);
            },
            {
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0,
            }
        );

        return () => observerRef.current?.disconnect();
    }, []);

    const handleToggleExpand = useCallback((projectId) => {
        setExpandedProjectId(prev => {
            if (prev === projectId) {
                // Sta chiudendo - aspetta prima di riabilitare il bg
                setTimeout(() => setIsScrollBgEnabled(true), 600);
                return null;
            }
            // Sta aprendo - disabilita il bg
            setIsScrollBgEnabled(false);
            return projectId;
        });
    }, []);

    // Refs per gli elementi osservati - stabile tra i render
    const itemRefsMap = useRef(new Map());

    // Callback ref factory - memorizzata per project ID
    const getItemRef = useCallback((projectId) => (el) => {
        const prevEl = itemRefsMap.current.get(projectId);

        // Se l'elemento è cambiato, unobserve il vecchio
        if (prevEl && prevEl !== el && observerRef.current) {
            observerRef.current.unobserve(prevEl);
        }

        if (el) {
            itemRefsMap.current.set(projectId, el);
            if (observerRef.current) {
                observerRef.current.observe(el);
            }
        } else {
            // Elemento smontato - cleanup
            itemRefsMap.current.delete(projectId);
        }
    }, []);

    const projects = [
        {
            id: 1,
            name: 'Nissan Bulgaria',
            category: 'Automotive',
            service: 'Lead Generation',
            image: '/images/casestudy/nissan-case-study.webp',
            link: '/case-studies/nissan',
            description: 'Transformed a complex user journey into a streamlined lead generation machine, driving qualified test drive requests through precision-targeted campaigns.',
            highlight: '2,000+',
            highlightLabel: 'Test Drives Generated',
        },
        {
            id: 2,
            name: 'Napudreni',
            category: 'Fashion Retail',
            service: 'E-commerce Growth',
            image: '/images/casestudy/napudreni-case-study.webp',
            link: '/case-studies/napudreni',
            description: 'Elevated an emerging fashion brand from limited visibility to market prominence through strategic social engagement and optimized conversion funnels.',
            highlight: '340%',
            highlightLabel: 'Revenue Increase',
        },
        {
            id: 3,
            name: 'Happy Bar & Grill',
            category: 'Restaurant Chain',
            service: 'Brand Awareness',
            image: '/images/casestudy/happy-case-study.webp',
            link: '/case-studies/happy',
            description: "Amplified Bulgaria's favorite restaurant chain's digital presence with hyper-localized campaigns that drove foot traffic across 30+ locations nationwide.",
            highlight: '180%',
            highlightLabel: 'Traffic Growth',
        },
        {
            id: 4,
            name: 'Parfium.bg',
            category: 'E-commerce',
            service: 'Performance Marketing',
            image: '/images/casestudy/parfium.bg-case-study.webp',
            link: '/case-studies/parfium',
            description: 'Maximized holiday season impact with surgical ad optimization, turning Black Friday and Christmas into record-breaking revenue periods.',
            highlight: '12.5x',
            highlightLabel: 'ROAS Achieved',
        },
    ];

    return (
        <section className="projects-showcase-section">
            <div className="projects-showcase-inner">
                {/* Shader Background - versione diretta senza sharedRenderer */}
                <ShaderBackgroundDirect />

                {/* Layout wrapper con flex-col per struttura verticale (come infinity-layout) */}
                <div className="projects-layout">
                    {/* Brand Marquee - fuori dal container per coerenza con InfinityPhilosophy */}
                    <BrandMarquee text="BYLT SHOWS" className="px-3 pt-0 mb-0 md:mb-0 max-w-content w-full" />

                    <div className="projects-showcase-container">

                {/* Content with icon background */}
                <div className="projects-content">
                    {/* Sparkle symbol as background */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                        {/* Glow layer */}
                        <div className="absolute blur-3xl opacity-30">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-[280px] md:w-[400px] lg:w-[520px] h-auto"
                                fill="currentColor"
                            >
                                <defs>
                                    <linearGradient id="sparkleGradientGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.15 }} />
                                        <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.15 }} />
                                        <stop offset="100%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.15 }} />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#sparkleGradientGlow)" d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" />
                            </svg>
                        </div>

                        {/* Main symbol */}
                        <div className="relative">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-[280px] md:w-[400px] lg:w-[520px] h-auto"
                                fill="currentColor"
                            >
                                <defs>
                                    <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.08 }} />
                                        <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.08 }} />
                                        <stop offset="100%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.08 }} />
                                    </linearGradient>
                                </defs>
                                <path fill="url(#sparkleGradient)" d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Background gradient glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent blur-3xl -z-10" />

                    {/* Paragraphs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="projects-paragraphs relative z-10"
                    >
                        <p>
                            Numbers tell stories. <span className="text-white font-semibold">These are the brands that trusted us to write theirs.</span>
                        </p>
                        <p>
                            From automotive giants to emerging e-commerce players, we've partnered with ambitious brands ready to dominate their markets through data-driven strategies and relentless optimization.
                        </p>
                        <p className="text-cyan-400 font-semibold">
                            Real results. Real growth. Real partnerships.
                        </p>
                    </motion.div>
                </div>

                {/* Projects List */}
                <div className="projects-list-container">
                    {/* Projects */}
                    <div>
                        {projects.map((project, index) => (
                            <ProjectItem
                                key={project.id}
                                project={project}
                                index={index}
                                onHover={setHoveredProject}
                                hoveredProject={hoveredProject}
                                isActive={activeProjectId === project.id}
                                isExpanded={expandedProjectId === project.id}
                                isScrollBgEnabled={isScrollBgEnabled}
                                onToggleExpand={handleToggleExpand}
                                itemRef={getItemRef(project.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <CTASectionCard
                    title="Want to see your brand here?"
                    description="Let's create your next success story together."
                    buttonText="Start Your Project"
                    buttonHref="/contact"
                    background="transparent"
                    variant="soft"
                />
                </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
