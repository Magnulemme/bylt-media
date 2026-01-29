import React, { useRef, useState, useEffect } from 'react';
import DemoTimeline from './DemoTimeline';
import DemoTimelineMobile from './DemoTimelineMobile';
import TimelineStyles from './TimelineStyles';
import { useProfiler } from '@/hooks/useProfiler';

const EngineTimeline = () => {
    useProfiler('EngineTimeline [ShaderBG]');
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024); // lg breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Durante SSR e hydration iniziale, renderizza entrambe con CSS
    if (!isMounted) {
        return (
            <section
                ref={sectionRef}
                id="process"
                className="engine-timeline-section"
            >
                <div className="relative z-10">
                    <DemoTimeline />
                    <DemoTimelineMobile />
                </div>
                <TimelineStyles />
            </section>
        );
    }

    // Dopo il mount, renderizza solo la sezione appropriata
    return (
        <section
            ref={sectionRef}
            id="process"
            className="engine-timeline-section"
        >
            <div className="relative z-10">
                {isMobile ? (
                    <DemoTimelineMobile />
                ) : (
                    <DemoTimeline />
                )}
            </div>

            <TimelineStyles />
        </section>
    );
};

export default EngineTimeline;
