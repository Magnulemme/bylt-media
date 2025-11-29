// Quick test script to verify EmailJS configuration
// Run with: node test-emailjs.js

const config = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_n63o6ld',
  CONTACT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || 'template_dyst1kp',
  AUDIT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID || 'template_hdpvl9k',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '4X_-fDUBUTai1pokk1uts'
};

console.log('EmailJS Configuration Test:');
console.log('============================');
console.log('Service ID:', config.SERVICE_ID);
console.log('Contact Template ID:', config.CONTACT_TEMPLATE_ID);
console.log('Audit Template ID:', config.AUDIT_TEMPLATE_ID);
console.log('Public Key:', config.PUBLIC_KEY ? `${config.PUBLIC_KEY.substring(0, 10)}...` : 'NOT_SET');
console.log('============================');

// Check if all required values are set
const isConfigured = 
  config.SERVICE_ID !== 'service_YOUR_ID' &&
  config.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' &&
  config.SERVICE_ID.startsWith('service_') &&
  config.PUBLIC_KEY.length > 10;

if (isConfigured) {
  console.log('✅ EmailJS appears to be properly configured!');
} else {
  console.log('❌ EmailJS configuration issues detected:');
  if (config.SERVICE_ID === 'service_YOUR_ID') {
    console.log('  - Service ID not set');
  }
  if (config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    console.log('  - Public Key not set');
  }
  if (!config.SERVICE_ID.startsWith('service_')) {
    console.log('  - Invalid Service ID format');
  }
  if (config.PUBLIC_KEY.length <= 10) {
    console.log('  - Public Key too short');
  }
}

console.log('\nTo test in browser, check the console for detailed EmailJS logs.');