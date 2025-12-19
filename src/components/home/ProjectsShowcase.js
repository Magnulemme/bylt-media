import React, { useState } from 'react';
import { motion } from 'motion/react';
import SectionIntro from '../ui/SectionIntro';

const ProjectsShowcase = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

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
                    className="projects-list-container"
                    onMouseMove={handleMouseMove}
                >
                    {/* Projects */}
                    <div>
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <a
                                    href={project.link}
                                    className="group project-link-item"
                                >
                                    <div className="project-link-content">
                                        {/* Number */}
                                        <span className="text-cyan-400/50 font-mono text-sm md:text-base group-hover:text-cyan-400 transition-colors duration-300">
                                            {String(project.id).padStart(2, '0')}
                                        </span>

                                        {/* Project Info */}
                                        <div className="project-info-container">
                                            <h3
                                                className="project-title"
                                                onMouseEnter={() => setHoveredProject(project)}
                                                onMouseLeave={() => setHoveredProject(null)}
                                            >
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
                                            className="hidden md:flex items-center justify-center w-12 h-12 rounded-lg bg-white/5 backdrop-blur-sm border-2 border-white/30 group-hover:border-cyan-400/60 relative z-10 transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
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
                                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: hoveredProject?.id === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ transformOrigin: 'left' }}
                                    />
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating Image - Follows Mouse */}
                    {hoveredProject && (
                        <motion.div
                            className="hidden lg:block fixed pointer-events-none z-[9999]"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                                left: `${mousePosition.x + 40}px`,
                                top: `${mousePosition.y - 160}px`,
                            }}
                        >
                            <div className="w-[420px] h-[280px] rounded-lg overflow-hidden border border-cyan-400/40">
                                <img
                                    src={hoveredProject.image}
                                    alt={hoveredProject.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* CTA */}
                <motion.div
                    className="projects-cta-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <a
                        href="/casestudies"
                        className="btn-secondary group"
                    >
                        <span>View All Projects</span>
                        <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;
