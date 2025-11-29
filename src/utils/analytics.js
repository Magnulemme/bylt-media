// Google Analytics and Tag Manager Utilities
// /src/utils/analytics.js

// Google Analytics tracking functions
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track conversions
export const trackConversion = (conversionId, conversionLabel) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `${conversionId}/${conversionLabel}`
    })
  }
}

// Track form submissions
export const trackFormSubmission = (formName) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  })
}

// Track case study views
export const trackCaseStudyView = (caseStudyName) => {
  event({
    action: 'view',
    category: 'Case Study',
    label: caseStudyName,
  })
}

// Track service page views
export const trackServiceView = (serviceName) => {
  event({
    action: 'view',
    category: 'Service',
    label: serviceName,
  })
}

// Track external link clicks
export const trackExternalLink = (url) => {
  event({
    action: 'click',
    category: 'External Link',
    label: url,
  })
}

// Track downloads
export const trackDownload = (fileName) => {
  event({
    action: 'download',
    category: 'File',
    label: fileName,
  })
}

// Track phone number clicks
export const trackPhoneClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Phone Number',
  })
}

// Track email clicks
export const trackEmailClick = () => {
  event({
    action: 'click',
    category: 'Contact',
    label: 'Email Address',
  })
}

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  event({
    action: 'scroll',
    category: 'Engagement',
    label: `${percentage}%`,
  })
}

// Enhanced E-commerce tracking for case studies
export const trackCaseStudyInteraction = (caseStudyName, action) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      'custom_parameter_1': caseStudyName,
      'event_category': 'Case Study Interaction',
      'event_label': `${caseStudyName} - ${action}`
    })
  }
}

// Track video engagement (if you add videos)
export const trackVideoEngagement = (videoTitle, action, progress = 0) => {
  event({
    action: action, // 'play', 'pause', 'complete', '25%', '50%', '75%'
    category: 'Video',
    label: `${videoTitle} - ${progress}%`,
  })
}

// Track CTA button clicks with enhanced data
export const trackCTA = (ctaText, pageLocation, ctaPosition) => {
  event({
    action: 'click',
    category: 'CTA',
    label: `${ctaText} | ${pageLocation} | ${ctaPosition}`,
  })
}

// Track search functionality (if implemented)
export const trackSiteSearch = (searchTerm, resultsCount) => {
  event({
    action: 'search',
    category: 'Site Search',
    label: searchTerm,
    value: resultsCount,
  })
}

// Track user engagement time
export const trackEngagementTime = (timeOnPage, pageName) => {
  event({
    action: 'engagement_time',
    category: 'User Engagement',
    label: pageName,
    value: Math.round(timeOnPage / 1000), // Convert to seconds
  })
}

// Track newsletter signups
export const trackNewsletterSignup = (location) => {
  event({
    action: 'signup',
    category: 'Newsletter',
    label: location,
  })
}

// Track social media clicks
export const trackSocialClick = (platform, location) => {
  event({
    action: 'click',
    category: 'Social Media',
    label: `${platform} - ${location}`,
  })
}

export default {
  pageview,
  event,
  trackConversion,
  trackFormSubmission,
  trackButtonClick,
  trackCaseStudyView,
  trackServiceView,
  trackExternalLink,
  trackDownload,
  trackPhoneClick,
  trackEmailClick,
  trackScrollDepth,
  trackCaseStudyInteraction,
  trackVideoEngagement,
  trackCTA,
  trackSiteSearch,
  trackEngagementTime,
  trackNewsletterSignup,
  trackSocialClick
}
