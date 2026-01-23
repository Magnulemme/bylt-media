import React from 'react';

/**
 * FadeMask - Wraps content with a CSS mask fade on the edges.
 *
 * @param {string} fade - 'right' | 'both' | 'none'
 * @param {number} fadeSize - size of the fade in px (default 24)
 * @param {string} className - additional classes for the container
 */
const FadeMask = ({ children, fade = 'both', fadeSize = 24, className = '' }) => {
    const getMask = () => {
        if (fade === 'none') return 'none';
        if (fade === 'right') {
            return `linear-gradient(to right, black, black calc(100% - ${fadeSize}px), transparent)`;
        }
        // both
        return `linear-gradient(to right, transparent, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent)`;
    };

    const mask = getMask();

    return (
        <div
            className={`overflow-hidden ${className}`}
            style={mask !== 'none' ? {
                maskImage: mask,
                WebkitMaskImage: mask
            } : undefined}
        >
            {children}
        </div>
    );
};

export default FadeMask;
