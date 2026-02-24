import React from 'react';
import SectionTitle from './SectionTitle';

/**
 * SectionIntro Component
 *
 * Section introduction with title and optional description.
 * Manages centralized spacing with content below using the design system.
 *
 * @param {string} title - Main title text (required)
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} maxWidth - Max width class: 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '5xl', '7xl', 'full' (default: '2xl')
 * @param {string} size - Size for title: 'sm', 'md', 'lg', 'xl' (default: 'xl')
 * @param {string} variant - Animation variant: 'blur', 'scroll-reveal', 'fade', 'none' (default: 'blur')
 * @param {string} className - Additional container classes
 */
const SectionIntro = ({
  title,
  subtitle,
  align = 'center',
  maxWidth = '2xl',
  size = 'xl',
  variant = 'blur',
  className = ''
}) => {
  // Max width classes
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '5xl': 'max-w-5xl',
    '7xl': 'max-w-[var(--breakpoint-content)]',
    full: 'max-w-full'
  };

  // Margin alignment based on text alignment
  const marginClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  return (
    <div className={`section-intro-container ${maxWidthClasses[maxWidth]} ${marginClasses[align]} ${className}`}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        align={align}
        size={size}
        variant={variant}
      />
    </div>
  );
};

export default SectionIntro;
