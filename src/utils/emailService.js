import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_YOUR_ID',
  CONTACT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || 'template_contact',
  AUDIT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID || 'template_audit',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Debug function to check configuration
export const debugEmailJSConfig = () => {
  return EMAILJS_CONFIG;
};

/**
 * Initialize EmailJS with public key
 */
export const initEmailJS = () => {
  const config = debugEmailJSConfig();

  if (config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    throw new Error('EmailJS configuration error: Public key not set');
  }

  emailjs.init(config.PUBLIC_KEY);
};

/**
 * Send contact form email via EmailJS
 * @param {Object} formData - The form data to send
 * @returns {Promise} - EmailJS response
 */
export const sendContactEmail = async (formData) => {
  try {
    // Debug configuration
    const config = debugEmailJSConfig();
    
    // Validate configuration
    if (config.SERVICE_ID === 'service_YOUR_ID') {
      throw new Error('EmailJS Service ID not configured');
    }
    if (config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      throw new Error('EmailJS Public Key not configured');
    }

    // Prepare template parameters
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      company: formData.company || 'Not provided',
      website: formData.website || 'Not provided',
      service_interest: formData.service || 'Not specified',
      budget_range: formData.budget || 'Not specified',
      timeline: formData.timeline || 'Not specified',
      message: formData.message,
      to_name: 'BYLT Media Team',
      reply_to: formData.email,
      submission_date: new Date().toLocaleDateString('en-GB'),
      submission_time: new Date().toLocaleTimeString('en-GB')
    };

    const response = await emailjs.send(
      config.SERVICE_ID,
      config.CONTACT_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      data: response,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
    };
  } catch (error) {
    let errorMessage = 'Something went wrong. Please try again or contact us directly at info@byltmedia.com';
    
    if (error.text) {
      errorMessage = `EmailJS Error: ${error.text}`;
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    
    return {
      success: false,
      error: error.text || error.message || 'Failed to send message',
      message: errorMessage
    };
  }
};

/**
 * Send free audit form email via EmailJS
 * @param {Object} formData - The audit form data to send
 * @returns {Promise} - EmailJS response
 */
export const sendAuditEmail = async (formData) => {
  try {
    // Debug configuration
    const config = debugEmailJSConfig();
    
    // Validate configuration
    if (config.SERVICE_ID === 'service_YOUR_ID') {
      throw new Error('EmailJS Service ID not configured');
    }
    if (config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      throw new Error('EmailJS Public Key not configured');
    }

    // Prepare template parameters
    const templateParams = {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      website: formData.website || 'Not provided',
      audit_type: formData.auditType,
      business_goals: formData.goals || 'Not provided',
      current_challenges: formData.challenges || 'Not provided',
      consent_given: formData.consent ? 'Yes' : 'No',
      to_name: 'BYLT Media Team',
      reply_to: formData.email,
      submission_date: new Date().toLocaleDateString('en-GB'),
      submission_time: new Date().toLocaleTimeString('en-GB')
    };

    const response = await emailjs.send(
      config.SERVICE_ID,
      config.AUDIT_TEMPLATE_ID,
      templateParams
    );

    return {
      success: true,
      data: response,
      message: 'Thank you for requesting a free audit! We\'ll analyze your requirements and send you a detailed report within 48 hours.'
    };
  } catch (error) {
    let errorMessage = 'Something went wrong. Please try again or contact us directly at info@byltmedia.com';
    
    if (error.text) {
      errorMessage = `EmailJS Error: ${error.text}`;
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }

    return {
      success: false,
      error: error.text || error.message || 'Failed to send audit request',
      message: errorMessage
    };
  }
};

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate contact form data
 * @param {Object} formData - Form data to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateContactForm = (formData) => {
  if (!formData.firstName?.trim()) {
    return 'First name is required';
  }
  
  if (!formData.lastName?.trim()) {
    return 'Last name is required';
  }
  
  if (!formData.email?.trim()) {
    return 'Email address is required';
  }
  
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!formData.message?.trim()) {
    return 'Message is required';
  }
  
  if (formData.message.length < 10) {
    return 'Message must be at least 10 characters long';
  }
  
  return null;
};

/**
 * Validate audit form data
 * @param {Object} formData - Form data to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateAuditForm = (formData) => {
  if (!formData.firstName?.trim()) {
    return 'First name is required';
  }
  
  if (!formData.lastName?.trim()) {
    return 'Last name is required';
  }
  
  if (!formData.email?.trim()) {
    return 'Email address is required';
  }
  
  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!formData.auditType?.trim()) {
    return 'Please select an audit type';
  }
  
  return null;
};