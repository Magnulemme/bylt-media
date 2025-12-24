import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import SectionIntro from '../ui/SectionIntro';
import { MovingBorderButton } from '../ui/moving-border-button';

// Component per singolo progetto con scroll reveal su mobile
const ProjectItem = ({ project, index, onHover, hoveredProject, isActive }) => {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <a
                href={project.link}
                className="group project-link-item xl:grid xl:grid-cols-[1fr_auto] xl:gap-8 xl:items-center"
                onMouseEnter={() => onHover(project)}
                onMouseLeave={() => onHover(null)}
            >
                <div className="project-link-content relative flex items-center gap-6 md:gap-12">
                    {/* Background Image - Scroll Reveal (Mobile fino a lg) */}
                    <motion.div
                        className="xl:hidden absolute rounded-lg"
                        style={{
                            top: '-0.75rem',
                            bottom: '-0.75rem',
                            left: 0,
                            right: 0,
                        }}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            scale: isActive ? 1 : 1.1,
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

                    {/* Number */}
                    <span className="relative z-10 text-cyan-400/50 font-mono text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300 flex-shrink-0">
                        {String(project.id).padStart(2, '0')}
                    </span>

                    {/* Project Info */}
                    <div className="relative z-10 project-info-container">
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={hoveredProject?.id === project.id ? {
                        opacity: 1,
                        scale: 1,
                        rotateX: [0, -4, 0, 4, 0],
                        rotateY: [0, 4, 0, -4, 0],
                        x: [0, -8, 0, 8, 0],
                        y: [0, -6, 0, -6, 0],
                    } : {
                        opacity: 0,
                        scale: 0.95,
                        rotateX: 0,
                        rotateY: 0,
                        x: 0,
                        y: 0,
                    }}
                    transition={hoveredProject?.id === project.id ? {
                        opacity: { duration: 0.3, ease: "easeOut" },
                        scale: { duration: 0.3, ease: "easeOut" },
                        rotateX: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: index * 0.3 },
                        rotateY: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: index * 0.3 },
                        x: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: index * 0.3 },
                        y: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: index * 0.3 },
                    } : {
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    style={{
                        perspective: 1000,
                        transformStyle: 'preserve-3d',
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
