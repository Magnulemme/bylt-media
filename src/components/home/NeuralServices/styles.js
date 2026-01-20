export const SWIPER_STYLES = `
  /* Tablet (≥768px): 330px */
  @media (min-width: 768px) {
    .services-3d-swiper .swiper-slide {
      width: 330px !important;
    }
  }

  /* Desktop (≥1200px): 420px */
  @media (min-width: 1200px) {
    .services-3d-swiper .swiper-slide {
      width: 420px !important;
    }
  }

  /* Card flex layout */
  .services-3d-swiper .swiper-slide .service-slide-content > a {
    display: flex;
    flex-direction: column;
  }

  /* CTA highlighted on card hover for active slide */
  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] {
    color: #22d3ee;
  }

  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] span:last-child {
    transform: translateX(4px);
  }

  /* Icon glow on card hover for active slide */
  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="w-14 h-14"] {
    background-color: rgba(34, 211, 238, 0.15);
    border-color: rgba(34, 211, 238, 0.5);
    box-shadow: 0 0 16px rgba(34, 211, 238, 0.2);
  }

  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="w-14 h-14"] svg {
    color: #22d3ee;
  }

  /* Number gradient animation on card hover */
  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="absolute top-6 right-6"] .number-static {
    opacity: 0;
  }

  .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="absolute top-6 right-6"] .number-animated {
    opacity: 1;
  }

  /* Ensure card pointer on active slide */
  .services-3d-swiper .swiper-slide-active .service-slide-content > a[href] {
    cursor: pointer;
  }

  /* Disable default card hover translate in swiper */
  .services-3d-swiper .swiper-slide .service-slide-content > a:hover {
    transform: none !important;
  }

  /* Hover effects for INACTIVE slides - tablet+ only */
  @media (min-width: 500px) {
    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content:hover div[class*="w-14 h-14"] {
      background-color: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.18);
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
    }

    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content:hover div[class*="w-14 h-14"] svg {
      color: rgb(148, 163, 184); /* slate-400 */
    }

    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content {
      cursor: pointer;
    }
  }

  /* Remove swiper default overflow */
  .services-3d-swiper,
  .services-3d-swiper .swiper-wrapper {
    overflow: visible !important;
  }

  /* Hide scrollbar */
  .services-3d-swiper::-webkit-scrollbar,
  .services-3d-swiper .swiper-wrapper::-webkit-scrollbar,
  .swiper-3d-container::-webkit-scrollbar {
    display: none;
  }

  .services-3d-swiper,
  .services-3d-swiper .swiper-wrapper,
  .swiper-3d-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Force hide all scrollbars in the container */
  .max-w-content:has(.swiper-3d-container)::-webkit-scrollbar {
    display: none !important;
  }

  .max-w-content:has(.swiper-3d-container) {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  /* Add padding bottom to prevent clipping */
  .services-3d-swiper {
    padding-bottom: 100px !important;
    margin-bottom: -100px !important;
  }

  /* Mobile Small (<500px): No effects */
  .services-3d-swiper .swiper-slide .service-slide-content {
    transition: all 0.5s ease;
    opacity: 1;
    z-index: 1;
    transform: none;
  }

  /* Tablet+ (≥500px): Fade effect + 3D transforms */
  @media (min-width: 500px) {
    .services-3d-swiper .swiper-slide .service-slide-content {
      transform: scale(0.85) translateZ(-200px) rotateY(0deg);
      opacity: 0.4;
    }

    .services-3d-swiper .swiper-slide-active .service-slide-content {
      transform: scale(1) translateZ(0) rotateY(0deg);
      opacity: 1;
    }

    .services-3d-swiper .swiper-slide-prev .service-slide-content {
      transform: scale(0.85) translateZ(-200px) rotateY(15deg);
    }

    .services-3d-swiper .swiper-slide-next .service-slide-content {
      transform: scale(0.85) translateZ(-200px) rotateY(-15deg);
    }
  }

  /* Tablet+ (≥500px): Muted styles for inactive slides */
  @media (min-width: 500px) {
    .services-3d-swiper .swiper-slide .service-number {
      opacity: 0.4;
    }

    .services-3d-swiper .swiper-slide .service-title {
      color: rgb(100, 116, 139); /* slate-500 */
    }

    .services-3d-swiper .swiper-slide .service-subtitle {
      color: rgb(71, 85, 105); /* slate-600 */
    }

    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content div[class*="w-14 h-14"] {
      background-color: rgba(255, 255, 255, 0.03);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content div[class*="w-14 h-14"] svg {
      color: rgb(100, 116, 139); /* slate-500 */
    }

    /* Active slide full color */
    .services-3d-swiper .swiper-slide-active .service-number {
      opacity: 1;
    }

    .services-3d-swiper .swiper-slide-active .service-title {
      color: white;
    }

    .services-3d-swiper .swiper-slide-active .service-subtitle {
      color: rgb(34, 211, 238);
    }
  }
`;
