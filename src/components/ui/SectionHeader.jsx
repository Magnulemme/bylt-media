import React from 'react';
import { motion } from 'motion/react';

/**
 * SectionHeader Component
 *
 * A reusable section header with consistent styling across the site.
 * Supports alignment, optional tags, and animation.
 *
 * @param {string} title - The section title (required)
 * @param {string} tag - Optional tag/category in brackets (e.g., "Performance")
 * @param {string} align - Alignment: 'left', 'center', 'right' (default: 'left')
 * @param {string} className - Additional container classes
 * @param {boolean} animate - Enable entrance animation (default: true)
 */
const SectionHeader = ({
  title,
  tag,
  align = 'left',
  className = '',
  animate = true
}) => {
  // Alignment mapping
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  const content = (
    <div className={`flex items-center gap-3 ${alignmentClasses[align]} ${className}`}>
      <span className="text-label text-white">
        {title}
      </span>
      {tag && (
        <span className="text-label text-slate-500">
          [{tag}]
        </span>
      )}
    </div>
  );

  // Return with or without animation
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, x: align === 'right' ? 20 : align === 'left' ? -20 : 0, y: align === 'center' ? 20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default SectionHeader;
