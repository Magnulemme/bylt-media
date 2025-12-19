import React from 'react';
import { motion } from 'motion/react';

/**
 * SectionTitle Component
 *
 * A flexible title component with multiple animation variants.
 * Note: For scroll-reveal word-by-word animation, use the custom ScrollRevealText
 * component in your specific file (to avoid hydration issues).
 *
 * @param {string} title - The main title text (required)
 * @param {string} subtitle - Optional subtitle/description text
 * @param {string} align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} size - Size: 'sm', 'md', 'lg', 'xl' (default: 'lg')
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

  // Size classes for title
  const titleSizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl lg:text-4xl',
    lg: 'text-2xl md:text-4xl',
    xl: 'text-3xl md:text-4xl lg:text-5xl'
  };

  // Size classes for subtitle
  const subtitleSizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg',
    xl: 'text-lg md:text-xl'
  };

  // Default title classes
  const defaultTitleClasses = `font-bold font-inter leading-tight text-white ${titleSizeClasses[size]} ${alignmentClasses[align]}`;

  // Default subtitle classes
  const defaultSubtitleClasses = `text-gray-400 ${subtitleSizeClasses[size]} ${alignmentClasses[align]}`;

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
