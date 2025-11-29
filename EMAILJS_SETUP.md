# EmailJS Setup Guide for BYLT Media

## 🚀 Quick Setup Instructions

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (300 emails/month)
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for ease)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**
4. Follow the connection wizard
5. **Note your Service ID** (e.g., `service_abc123`)

### 3. Create Email Templates

#### Contact Form Template
1. Go to **Email Templates** → **Create New Template**
2. Template ID: `template_contact`
3. **Template Content:**
```html
Subject: 💬 New Contact Message from {{from_name}}

Hello BYLT Media Team,

You have received a new contact form submission:

**Contact Details:**
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Company: {{company}}
- Website: {{website}}

**Project Details:**
- Service Interest: {{service_interest}}
- Budget Range: {{budget_range}}
- Timeline: {{timeline}}

**Message:**
{{message}}

**Submission Info:**
- Date: {{submission_date}}
- Time: {{submission_time}}

---
This message was sent via the BYLT Media contact form.
Reply directly to this email to respond to {{from_name}}.
```

#### Auto-Reply Template (Optional)
1. Create another template: `template_contact_reply`
2. **Template Content:**
```html
Subject: Thanks for contacting BYLT Media!

Hi {{from_name}},

Thank you for reaching out to BYLT Media! We've received your message about {{service_interest}} and will get back to you within 24 hours.

Here's a summary of what you sent:
- Service Interest: {{service_interest}}
- Timeline: {{timeline}}

In the meantime, feel free to browse our case studies and learn more about our services at www.byltmedia.com.

Best regards,
The BYLT Media Team

---
This is an automated response. Please do not reply to this email.
```

#### Free Audit Template
1. Create template: `template_audit`
2. **Template Content:**
```html
Subject: 🎯 New Free Audit Request from {{from_name}}

Hello BYLT Media Team,

New free audit request received:

**Contact Details:**
- Name: {{from_name}}
- Email: {{from_email}}
- Website: {{website}}

**Audit Details:**
- Audit Type: {{audit_type}}
- Business Goals: {{business_goals}}
- Current Challenges: {{current_challenges}}
- Consent Given: {{consent_given}}

**Submission Info:**
- Date: {{submission_date}}
- Time: {{submission_time}}

---
Please prepare the audit report and send it within 48 hours.
```

### 4. Get Your Credentials
1. Go to **Integration** in EmailJS dashboard
2. Copy these values:
   - **Service ID**: `service_xxxxx`
   - **Public Key**: `your_public_key`
   - **Template IDs**: `template_contact`, `template_audit`

### 5. Update Environment Variables
Update your `.env.local` file:
```bash
# Replace with your actual values from EmailJS dashboard
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_your_actual_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_contact
NEXT_PUBLIC_EMAILJS_AUDIT_TEMPLATE_ID=template_audit
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 6. Test Your Forms
1. Start your development server: `npm run dev`
2. Go to your contact page
3. Fill out and submit the form
4. Check your email for the message
5. Check EmailJS dashboard for delivery status

## 🔧 Advanced Configuration

### Add Auto-Reply
To send automatic replies to users:
1. Modify the form submission to send two emails
2. First email: notification to you
3. Second email: auto-reply to user

### Rate Limiting
EmailJS free plan includes:
- ✅ 300 emails/month
- ✅ Real-time delivery
- ✅ Templates with variables
- ✅ Multiple email services

### Spam Protection
Forms include basic validation:
- Required field checking
- Email format validation
- Message length validation

## 🚨 Important Notes

1. **Public Key Safety**: EmailJS public keys are safe to expose in frontend code
2. **No Backend Needed**: EmailJS works directly from the browser
3. **Reliable Delivery**: Uses your connected email service for sending
4. **Template Variables**: All form fields are passed as template variables
5. **Error Handling**: Built-in error handling with user-friendly messages

## 📝 What Changed

✅ **Removed**: Web3Forms API routes (`/api/contact.js`, `/api/free-audit.js`)
✅ **Removed**: Old email service utilities
✅ **Added**: Clean EmailJS integration
✅ **Added**: Client-side form validation
✅ **Added**: Better error handling and user feedback
✅ **Updated**: Both contact and free-audit forms

Your forms will now work directly from the frontend with EmailJS!