import React from 'react';
import { motion } from 'motion/react';

/**
 * SectionTitle Component
 *
 * A flexible title component with multiple animation variants.
 * Uses centralized typography classes from typography.css
 *
 * @param {string} title - The main title text (required)
 * @param {string} subtitle - Optional subtitle/description text
 * @param {string} align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} size - Size: 'sm', 'md', 'lg', 'xl', 'display' (default: 'xl')
 * @param {string} variant - Animation variant: 'blur', 'fade', 'none' (default: 'blur')
 * @param {string} titleClassName - Additional classes for title
 * @param {string} subtitleClassName - Additional classes for subtitle
 * @param {string} containerClassName - Additional classes for container
 * @param {number} delay - Animation delay in seconds (default: 0)
 */
const SectionTitle = ({
  title,
  subtitle,
  align = 'center',
  size = 'xl',
  variant = 'blur',
  titleClassName = '',
  subtitleClassName = '',
  containerClassName = '',
  delay = 0
}) => {
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  // Map size prop to typography.css classes
  // sm → heading-h4, md → heading-h3, lg → heading-h2, xl → heading-h1, display → heading-display
  const titleSizeClasses = {
    sm: 'heading-h4',
    md: 'heading-h3',
    lg: 'heading-h2',
    xl: 'heading-h1',
    display: 'heading-display'
  };

  // Subtitle uses text-body classes from typography.css
  const subtitleSizeClasses = {
    sm: 'text-subheader',
    md: 'text-subheader',
    lg: 'text-subheader',
    xl: 'text-subheader',
    display: 'text-subheader'
  };

  // Title classes: typography class + alignment + white text (headings don't include color)
  const defaultTitleClasses = `${titleSizeClasses[size]} ${alignmentClasses[align]}`;

  // Subtitle classes: typography class + alignment (text-body classes include color)
  const defaultSubtitleClasses = `${subtitleSizeClasses[size]} ${alignmentClasses[align]}`;

  /**
   * Blur to Focus variant
   */
  if (variant === 'blur') {
    return (
      <div className={`mb-6 ${containerClassName}`}>
        <motion.h2
          className={`${defaultTitleClasses} ${titleClassName} mb-6`}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className={`${defaultSubtitleClasses} ${subtitleClassName}`}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  /**
   * Simple Fade variant
   */
  if (variant === 'fade') {
    return (
      <div className={`mb-6 ${containerClassName}`}>
        <motion.h2
          className={`${defaultTitleClasses} ${titleClassName} mb-6`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className={`${defaultSubtitleClasses} ${subtitleClassName}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    );
  }

  /**
   * No animation variant
   */
  return (
    <div className={`mb-6 ${containerClassName}`}>
      <h2 className={`${defaultTitleClasses} ${titleClassName} mb-6`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${defaultSubtitleClasses} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
