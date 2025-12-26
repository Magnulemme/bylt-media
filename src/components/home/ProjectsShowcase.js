import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from 'motion/react';
import SectionIntro from '../ui/SectionIntro';
import { MovingBorderButton } from '../ui/moving-border-button';
import { useProfiler } from '@/hooks/useProfiler';

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
const ProjectItem = ({ project, index, onHover, hoveredProject, isActive }) => {
    // Lissajous animation per immagine hover
    const isHovered = hoveredProject?.id === project.id;
    const lissajousAnimation = useLissajousAnimation(isHovered, index * 1.5);

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Background Image - Scroll Reveal (Mobile fino a lg) */}
            <motion.div
                className="xl:hidden absolute rounded-xl overflow-hidden -inset-x-2 md:-inset-x-4"
                style={{
                    top: 0,
                    bottom: 0,
                }}
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

            <a
                href={project.link}
                className="group project-link-item xl:grid xl:grid-cols-[1fr_auto] xl:gap-8 xl:items-center"
                onMouseEnter={() => onHover(project)}
                onMouseLeave={() => onHover(null)}
            >
                <div className="project-link-content relative flex items-center gap-4 md:gap-8">
                    {/* Number */}
                    <span className="relative z-10 text-cyan-400/50 font-mono text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0 min-w-[2rem]">
                        {String(project.id).padStart(2, '0')}
                    </span>

                    {/* Project Info */}
                    <div className="relative z-10 project-info-container flex-1">
                        <h3 className="project-title">
                            {project.name}
                        </h3>
                        <div className="project-meta">
                            <span>{project.category}</span>
                            <span className="text-cyan-400/50">•</span>
                            <span>{project.service}</span>
                        </div>
                    </div>

                    {/* Arrow - Brutalist Style */}
                    <div
                        className="hidden md:flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-white/30 group-hover:border-cyan-400/60 relative z-10 transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px] flex-shrink-0"
                        style={{
                            boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '4px 4px 0px rgba(34, 211, 238, 1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '6px 6px 0px rgba(34, 211, 238, 1)';
                        }}
                    >
                        <svg
                            className="w-5 h-5 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1"
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
                    </div>
                </div>

                {/* Hover Underline Effect - Positioned over existing border */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 xl:hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredProject?.id === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                />

                {/* Image a destra - Solo XL, sempre visibile quando in hover */}
                <motion.div
                    className="hidden xl:block w-80 h-52 rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
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
            </a>
        </motion.div>
    );
};

const ProjectsShowcase = () => {
    useProfiler('ProjectsShowcase');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);

    const projectsListRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: projectsListRef,
        offset: ["start end", "end center"]
    });

    const projects = [
        {
            id: 1,
            name: 'Nissan Bulgaria',
            category: 'Automotive',
            service: 'Lead Generation',
            image: '/images/casestudy/nissan-case-study.webp',
            link: '/case-studies-nissan'
        },
        {
            id: 2,
            name: 'Napudreni',
            category: 'Fashion Retail',
            service: 'E-commerce Growth',
            image: '/images/casestudy/napudreni-case-study.webp',
            link: '/case-studies-napudreni'
        },
        {
            id: 3,
            name: 'Happy Bar & Grill',
            category: 'Restaurant Chain',
            service: 'Brand Awareness',
            image: '/images/casestudy/happy-case-study.webp',
            link: '/case-studies-happy'
        },
        {
            id: 4,
            name: 'Parfium.bg',
            category: 'E-commerce',
            service: 'Performance Marketing',
            image: '/images/casestudy/parfium.bg-case-study.webp',
            link: '/case-studies-parfium'
        },
    ];

    // Calcola quale progetto è attivo in base allo scroll progress
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            // Se siamo alla fine dello scroll, nessun progetto attivo
            if (latest >= 0.95) {
                setActiveProjectIndex(-1);
                return;
            }

            // Dividi il range per il numero di progetti
            const numProjects = projects.length;
            const segmentSize = 1 / numProjects;

            // Calcola l'indice del progetto attivo
            const newIndex = Math.min(
                Math.floor(latest / segmentSize),
                numProjects - 1
            );

            setActiveProjectIndex(newIndex);
        });

        return () => unsubscribe();
    }, [scrollYProgress, projects.length]);

    return (
        <section className="projects-showcase-section">
            <div className="projects-showcase-container">
                {/* Section Title */}
                <SectionIntro
                    title="Our Work"
                    subtitle="Explore our portfolio of successful campaigns and strategic partnerships that drive measurable results."
                    align="left"
                    maxWidth="3xl"
                    size="xl"
                    variant="blur"
                />

                {/* Projects List */}
                <div
                    ref={projectsListRef}
                    className="projects-list-container"
                >
                    {/* Projects */}
                    <div>
                        {projects.map((project, index) => (
                            <ProjectItem
                                key={project.id}
                                project={project}
                                index={index}
                                onHover={setHoveredProject}
                                hoveredProject={hoveredProject}
                                isActive={index === activeProjectIndex}
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
        </section>
    );
};

export default ProjectsShowcase;
