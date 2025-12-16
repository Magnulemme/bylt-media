import React from 'react';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

/**
 * SectionIntro Component
 *
 * Complete section introduction with optional tag, title, and description.
 * Combines SectionHeader (tag) and SectionTitle (title + subtitle) for a complete intro block.
 *
 * @param {string} tag - Optional tag text (e.g., "Services", "Process")
 * @param {string} tagLabel - Optional tag label in brackets (e.g., "Performance")
 * @param {string} title - Main title text (required)
 * @param {string} subtitle - Optional subtitle/description
 * @param {string} align - Alignment: 'left', 'center', 'right' (default: 'center')
 * @param {string} maxWidth - Max width class: 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '5xl', '7xl', 'full' (default: '2xl')
 * @param {string} size - Size for title: 'sm', 'md', 'lg', 'xl' (default: 'lg')
 * @param {string} variant - Animation variant: 'blur', 'scroll-reveal', 'fade', 'none' (default: 'blur')
 * @param {string} spacing - Bottom spacing: 'sm', 'md', 'lg', 'xl' (default: 'lg')
 * @param {string} className - Additional container classes
 * @param {boolean} animateTag - Enable tag animation (default: true)
 */
const SectionIntro = ({
  tag,
  tagLabel,
  title,
  subtitle,
  align = 'center',
  maxWidth = '2xl',
  size = 'lg',
  variant = 'blur',
  spacing = 'lg',
  className = '',
  animateTag = true
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
    '7xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  // Spacing classes
  const spacingClasses = {
    sm: 'mb-8',
    md: 'mb-12',
    lg: 'mb-16',
    xl: 'mb-24'
  };

  // Margin alignment based on text alignment
  const marginClasses = {
    left: '',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  return (
    <div className={`${maxWidthClasses[maxWidth]} ${marginClasses[align]} ${spacingClasses[spacing]} ${className}`}>
      {/* Optional Tag */}
      {tag && (
        <div className="mb-8">
          <SectionHeader
            title={tag}
            tag={tagLabel}
            align={align}
            animate={animateTag}
          />
        </div>
      )}

      {/* Title + Subtitle */}
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
