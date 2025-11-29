// Microsoft/Outlook SMTP Email Service - Secure with App Passwords
import nodemailer from 'nodemailer';

class MicrosoftEmailService {
    constructor() {
        this.transporter = nodemailer.createTransporter({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.OUTLOOK_USER, // hello@byltmedia.com
                pass: process.env.OUTLOOK_APP_PASSWORD, // App Password, not real password!
            },
        });
    }

    async sendTeamNotification(formData) {
        const recipients = process.env.EMAIL_TO?.split(',') || ['lorenzo@byltmedia.com', 'teo@byltmedia.com'];
        
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0; font-size: 24px;">🔔 New Contact Form Submission</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">BYLT Media Website</p>
                </div>
                
                <div style="padding: 25px; background: #f8fafc;">
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1e293b; margin-top: 0;">📋 Contact Details</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569; width: 30%;">Name:</td>
                                <td style="padding: 12px 8px; color: #1e293b;">${formData.firstName} ${formData.lastName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Email:</td>
                                <td style="padding: 12px 8px;"><a href="mailto:${formData.email}" style="color: #0ea5e9; text-decoration: none;">${formData.email}</a></td>
                            </tr>
                            ${formData.phone ? `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Phone:</td>
                                <td style="padding: 12px 8px;"><a href="tel:${formData.phone}" style="color: #0ea5e9; text-decoration: none;">${formData.phone}</a></td>
                            </tr>
                            ` : ''}
                            ${formData.company ? `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Company:</td>
                                <td style="padding: 12px 8px; color: #1e293b;">${formData.company}</td>
                            </tr>
                            ` : ''}
                            ${formData.website ? `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Website:</td>
                                <td style="padding: 12px 8px;"><a href="${formData.website}" target="_blank" style="color: #0ea5e9; text-decoration: none;">${formData.website}</a></td>
                            </tr>
                            ` : ''}
                            ${formData.service ? `
                            <tr>
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Service:</td>
                                <td style="padding: 12px 8px; color: #1e293b;">${formData.service}</td>
                            </tr>
                            ` : ''}
                        </table>
                    </div>
                    
                    ${formData.message ? `
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1e293b; margin-top: 0;">💬 Message</h3>
                        <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9; color: #1e293b; line-height: 1.6;">
                            ${formData.message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                        <h4 style="margin: 0 0 12px 0; color: #065f46; font-size: 16px;">✅ Next Steps</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #065f46;">
                            <li style="margin-bottom: 6px;">Respond within 24 hours</li>
                            <li style="margin-bottom: 6px;">Schedule discovery call if qualified</li>
                            <li style="margin-bottom: 6px;">Add to CRM/pipeline</li>
                            <li>Send follow-up resources if needed</li>
                        </ul>
                    </div>
                </div>
                
                <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0;">🚀 This notification was sent from your BYLT Media website contact form</p>
                    <p style="margin: 5px 0 0 0;">Powered by secure Gmail SMTP</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"BYLT Media Website" <${process.env.OUTLOOK_USER}>`,
            to: recipients.join(', '),
            subject: `🔔 New Contact: ${formData.firstName} ${formData.lastName} - ${formData.service || 'General Inquiry'}`,
            html: htmlContent,
            replyTo: formData.email, // Easy to reply directly to the customer
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { 
                success: true, 
                messageId: info.messageId,
                recipients: recipients.length,
                service: 'microsoft-outlook'
            };
        } catch (error) {
            console.error('Microsoft Outlook team notification error:', error);
            throw error;
        }
    }

    async sendAuditTeamNotification(formData) {
        const recipients = process.env.EMAIL_TO?.split(',') || ['lorenzo@byltmedia.com', 'teo@byltmedia.com'];
        
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0; font-size: 24px;">📊 New Free Audit Request</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">High-Value Lead Alert</p>
                </div>
                
                <div style="padding: 25px; background: #f8fafc;">
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1e293b; margin-top: 0;">👤 Client Information</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569; width: 30%;">Name:</td>
                                <td style="padding: 12px 8px; color: #1e293b;">${formData.firstName} ${formData.lastName}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Email:</td>
                                <td style="padding: 12px 8px;"><a href="mailto:${formData.email}" style="color: #7c3aed; text-decoration: none;">${formData.email}</a></td>
                            </tr>
                            ${formData.phone ? `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Phone:</td>
                                <td style="padding: 12px 8px;"><a href="tel:${formData.phone}" style="color: #7c3aed; text-decoration: none;">${formData.phone}</a></td>
                            </tr>
                            ` : ''}
                            ${formData.company ? `
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Company:</td>
                                <td style="padding: 12px 8px; color: #1e293b;">${formData.company}</td>
                            </tr>
                            ` : ''}
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Website:</td>
                                <td style="padding: 12px 8px;"><a href="${formData.website}" target="_blank" style="color: #7c3aed; text-decoration: none;">${formData.website}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Audit Type:</td>
                                <td style="padding: 12px 8px;"><span style="background: #7c3aed; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${formData.auditType}</span></td>
                            </tr>
                        </table>
                    </div>
                    
                    ${formData.goals ? `
                    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #1e293b; margin-top: 0;">🎯 Client Goals</h3>
                        <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b; color: #1e293b; line-height: 1.6;">
                            ${formData.goals.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <h4 style="margin: 0 0 12px 0; color: #dc2626; font-size: 16px;">⚡ Urgent Action Required</h4>
                        <ul style="margin: 0; padding-left: 20px; color: #dc2626;">
                            <li style="margin-bottom: 6px;"><strong>Perform ${formData.auditType}</strong> for ${formData.website}</li>
                            <li style="margin-bottom: 6px;">Deliver comprehensive report within <strong>48-72 hours</strong></li>
                            <li style="margin-bottom: 6px;">Schedule follow-up call to present findings</li>
                            <li>Convert to paid client with actionable recommendations</li>
                        </ul>
                    </div>
                </div>
                
                <div style="background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0;">📊 This audit request was submitted via your BYLT Media website</p>
                    <p style="margin: 5px 0 0 0;">High-value lead - prioritize response</p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"BYLT Media Website" <${process.env.OUTLOOK_USER}>`,
            to: recipients.join(', '),
            subject: `📊 URGENT: New Audit Request - ${formData.firstName} ${formData.lastName} (${formData.auditType})`,
            html: htmlContent,
            replyTo: formData.email,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { 
                success: true, 
                messageId: info.messageId,
                recipients: recipients.length,
                service: 'microsoft-outlook'
            };
        } catch (error) {
            console.error('Microsoft Outlook audit notification error:', error);
            throw error;
        }
    }

    async sendCustomerConfirmation(formData) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: bold;">BYLT MEDIA</h1>
                    <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Free Audit Request Confirmed</p>
                </div>
                
                <div style="padding: 40px; background: white; text-align: center;">
                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">Thank you!</h2>
                    
                    <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                        We've received your free digital audit request and our team is already reviewing it.
                    </p>
                    
                    <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 30px;">
                        Our experts will deliver your comprehensive audit report within <strong>48 hours</strong>.
                    </p>
                    
                    <a href="https://byltmedia.com" style="display: inline-block; background: #22d3ee; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Visit Our Website</a>
                </div>

                <div style="background: #1e293b; color: white; padding: 25px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">Need to reach us?</p>
                    <p style="margin: 0; font-size: 16px;">
                        <a href="mailto:hello@byltmedia.com" style="color: #22d3ee; text-decoration: none;">hello@byltmedia.com</a>
                    </p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"BYLT Media Team" <${process.env.OUTLOOK_USER}>`,
            to: formData.email,
            subject: `✅ Your Free Audit is Coming! (${formData.auditType || 'Digital Audit'})`,
            html: htmlContent,
            replyTo: process.env.OUTLOOK_USER,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { 
                success: true, 
                messageId: info.messageId,
                recipient: formData.email,
                service: 'microsoft-outlook-customer-confirmation'
            };
        } catch (error) {
            console.error('Microsoft Outlook customer confirmation error:', error);
            throw error;
        }
    }

    async sendContactConfirmation(formData) {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: bold;">BYLT MEDIA</h1>
                    <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Message Received</p>
                </div>
                
                <div style="padding: 40px; background: white; text-align: center;">
                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">Thank you!</h2>
                    
                    <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
                        We've received your message and our team will review it shortly.
                    </p>
                    
                    <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 30px;">
                        We'll get back to you within <strong>24 hours</strong> during business days (Monday-Friday).
                    </p>
                    
                    <a href="https://byltmedia.com" style="display: inline-block; background: #22d3ee; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Visit Our Website</a>
                </div>

                <div style="background: #1e293b; color: white; padding: 25px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 14px;">Need to reach us?</p>
                    <p style="margin: 0; font-size: 16px;">
                        <a href="mailto:hello@byltmedia.com" style="color: #22d3ee; text-decoration: none;">hello@byltmedia.com</a>
                    </p>
                </div>
            </div>
        `;

        const mailOptions = {
            from: `"BYLT Media Team" <${process.env.OUTLOOK_USER}>`,
            to: formData.email,
            subject: `✉️ Message Received - We'll Respond Within 24 Hours`,
            html: htmlContent,
            replyTo: process.env.OUTLOOK_USER,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            return { 
                success: true, 
                messageId: info.messageId,
                recipient: formData.email,
                service: 'microsoft-outlook-contact-confirmation'
            };
        } catch (error) {
            console.error('Microsoft Outlook contact confirmation error:', error);
            throw error;
        }
    }
}

export default MicrosoftEmailService;