import React, { useRef } from 'react';
import DesktopTimeline from './DesktopTimeline';
import MobileTimeline from './MobileTimeline';
import TimelineStyles from './TimelineStyles';
import { processSteps } from './constants';

const EngineTimeline = () => {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="engine-timeline-section"
        >
            <div className="relative z-10">
                <DesktopTimeline processSteps={processSteps} />
                <MobileTimeline processSteps={processSteps} />
            </div>

            <TimelineStyles />
        </section>
    );
};

export default EngineTimeline;
