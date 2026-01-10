import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import SectionIntro from '../ui/SectionIntro';
import { MovingBorderButton } from '../ui/moving-border-button';
import { useProfiler } from '@/hooks/useProfiler';
import ShaderBackground from './ShaderBackground';

// Hook per animazione Lissajous curve (figura a "8" smooth)
const useLissajousAnimation = (isActive, seed = 0) => {
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);

    useAnimationFrame((time) => {
        if (!isActive) {
            // Ritorna a 0 quando non in hover
            rotateX.set(0);
            rotateY.set(0);
            x.set(0);
            y.set(0);
            scale.set(1);
            return;
        }

        // Time in secondi con seed offset - velocizzato
        const t = (time / 1000 + seed) * 0.8;

        // Lissajous curve: x = A*sin(at + δ), y = B*sin(bt)
        // Ratio 2:1 crea figura a "8" orizzontale (infinity)
        const phase = seed;

        // Movimento ellittico a "8" - più deciso
        const lissajousX = Math.sin(2 * t + phase) * 12;
        const lissajousY = Math.sin(t) * 10;

        // Rotazione 3D sincronizzata - più marcata
        const rotation3DX = Math.sin(t + Math.PI / 4) * 8;
        const rotation3DY = Math.sin(2 * t) * 10;

        // Scale pulsante più evidente
        const scalePulse = Math.sin(t * 0.7) * 0.05;

        // Applica i valori direttamente (senza spring)
        x.set(lissajousX);
        y.set(lissajousY);
        rotateX.set(rotation3DX);
        rotateY.set(rotation3DY);
        scale.set(1 + scalePulse);
    });

    return {
        rotateX,
        rotateY,
        x,
        y,
        scale,
    };
};

// Component per singolo progetto con scroll reveal su mobile
const ProjectItem = ({ project, index, onHover, hoveredProject, isExpanded, onToggleExpand, isActive, isScrollBgEnabled, onVisibilityChange }) => {
    const isHovered = hoveredProject?.id === project.id;
    const lissajousAnimation = useLissajousAnimation(isHovered, index * 1.5);
    const itemRef = useRef(null);

    // Notifica al parent quando entra/esce dalla zona centrale
    useEffect(() => {
        const element = itemRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                onVisibilityChange(project.id, entry.isIntersecting);
            },
            {
                rootMargin: '-40% 0px -40% 0px',
                threshold: 0,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [project.id, onVisibilityChange]);

    return (
        <motion.div
            ref={itemRef}
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
                        <span className="relative z-10 text-cyan-400/50 font-mono text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0 min-w-[2rem]">
                            {String(project.id).padStart(2, '0')}
                        </span>

                        {/* Project Info with inline plus button */}
                        <div className="relative z-10 project-info-container flex-1">
                            <h3 className="project-title inline">
                                {project.name}
                            </h3>
                            {/* Plus button inline dopo il titolo */}
                            <motion.div
                                className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-white/30 group-hover:border-cyan-400/60 relative transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px] ml-8 align-middle"
                                style={{
                                    boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)',
                                    verticalAlign: 'middle',
                                }}
                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                transition={{ duration: 0.3 }}
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

                {/* Expanded Content with CTA - dentro project-link-item, sopra il border */}
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
                            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                                {/* Image */}
                                <div className="lg:w-80 flex-shrink-0">
                                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] lg:aspect-[4/3]">
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
                                        <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">
                                            {project.category} · {project.service}
                                        </span>
                                        <p className="text-white/80 text-base md:text-lg leading-relaxed mt-3 max-w-xl">
                                            {project.description}
                                        </p>
                                    </div>

                                    <a
                                        href={project.link}
                                        className="inline-flex items-center gap-2 mt-6 text-cyan-400 font-semibold text-sm group/cta hover:text-cyan-300 transition-colors w-fit"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span className="border-b border-cyan-400/50 group-hover/cta:border-cyan-300 pb-0.5">
                                            Read Full Case Study
                                        </span>
                                        <svg
                                            className="w-4 h-4 transition-transform group-hover/cta:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsShowcase = () => {
    useProfiler('ProjectsShowcase');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [activeProjectId, setActiveProjectId] = useState(null);
    const [expandedProjectId, setExpandedProjectId] = useState(null);
    const [isScrollBgEnabled, setIsScrollBgEnabled] = useState(true);
    const visibleProjectsRef = useRef(new Set());

    const handleToggleExpand = (projectId) => {
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
    };

    // Callback per quando un progetto entra/esce dalla zona centrale
    const handleVisibilityChange = useCallback((projectId, isVisible) => {
        if (isVisible) {
            visibleProjectsRef.current.add(projectId);
        } else {
            visibleProjectsRef.current.delete(projectId);
        }

        const visibleIds = Array.from(visibleProjectsRef.current).sort((a, b) => a - b);
        setActiveProjectId(visibleIds.length > 0 ? visibleIds[0] : null);
    }, []);

    const projects = [
        {
            id: 1,
            name: 'Nissan Bulgaria',
            category: 'Automotive',
            service: 'Lead Generation',
            image: '/images/casestudy/nissan-case-study.webp',
            link: '/case-studies-nissan',
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
            link: '/case-studies-napudreni',
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
            link: '/case-studies-happy',
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
            link: '/case-studies-parfium',
            description: 'Maximized holiday season impact with surgical ad optimization, turning Black Friday and Christmas into record-breaking revenue periods.',
            highlight: '12.5x',
            highlightLabel: 'ROAS Achieved',
        },
    ];

    return (
        <section className="projects-showcase-section">
            <div className="projects-showcase-inner">
                {/* Shader Background */}
                <ShaderBackground />

                <div className="projects-showcase-container">
                {/* Section Title */}
                <SectionIntro
                    title="Our Work"
                    subtitle="Explore our portfolio of successful campaigns and strategic partnerships that drive measurable results."
                    align="center"
                    maxWidth="3xl"
                    size="xl"
                    variant="blur"
                />

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
                                onVisibilityChange={handleVisibilityChange}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    className="projects-cta-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center">
                                                <MovingBorderButton
                                                    type="submit"
                                                    borderRadius="0.75rem"
                                                    containerClassName="min-w-[240px] h-16"
                                                    borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                                    className="border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed bg-slate-950"
                                                    duration={2500}
                                                >
                                                    View all projects
                                                </MovingBorderButton>
                                            </div>
                </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
