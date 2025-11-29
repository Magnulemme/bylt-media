// WEB3FORMS INTEGRATION - 250 FREE SUBMISSIONS/MONTH, AMAZON INFRASTRUCTURE
// This forwards form submissions directly to your email using Web3Forms

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const formData = req.body;
        
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.auditType) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                required: ['firstName', 'lastName', 'email', 'auditType']
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Prepare data for Web3Forms
        const web3FormsData = {
            access_key: process.env.WEB3FORMS_ACCESS_KEY, // Add this to your .env.local
            subject: `🎯 New Free Audit Request from ${formData.firstName} ${formData.lastName}`,
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            
            // Form fields
            'First Name': formData.firstName,
            'Last Name': formData.lastName,
            'Email': formData.email,
            'Website': formData.website || 'Not provided',
            'Audit Type': formData.auditType,
            'Business Goals': formData.goals || 'Not provided',
            'Current Challenges': formData.challenges || 'Not provided',
            'Consent Given': formData.consent ? 'Yes' : 'No',
            
            // Additional metadata
            'Form Type': 'Free Audit Request',
            'Submitted At': new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' }),
            'User Agent': req.headers['user-agent'] || 'Unknown',
            
            // Spam protection (honeypot) - important for Web3Forms
            botcheck: ''
        };

        // Submit to Web3Forms
        const web3Response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(web3FormsData),
        });

        const result = await web3Response.json();

        if (web3Response.ok && result.success) {
            console.log('✅ Web3Forms submission successful:', result);
            res.status(200).json({ 
                success: true, 
                message: 'Your audit request has been submitted successfully! We\'ll contact you within 24 hours.',
            });
        } else {
            console.error('❌ Web3Forms submission failed:', result);
            throw new Error(`Web3Forms error: ${result.message || 'Unknown error'}`);
        }

    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ 
            error: 'Failed to submit audit request',
            details: 'Please try again or contact us directly at info@byltmedia.com'
        });
    }
}