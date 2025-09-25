# EmailJS Setup Instructions

Your contact form is now ready to send real emails! Follow these steps to activate it:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your preferred email provider
4. Follow the setup instructions
5. Note down your **Service ID**

## 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

4. Note down your **Template ID**

## 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**

## 5. Configure Your App
1. Create a file called `.env.local` in your project root
2. Add these lines (replace with your actual values):

```
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## 6. Test Your Form
1. Restart your development server: `npm start`
2. Go to your contact form
3. Fill out and submit a test message
4. Check your email for the message!

## Template Variables Used
- `{{from_name}}` - Name from the form
- `{{from_email}}` - Email from the form  
- `{{message}}` - Message from the form
- `{{to_email}}` - Your email (keanlouis30@gmail.com)

## Troubleshooting
- Make sure your `.env.local` file is in the project root
- Restart the server after adding environment variables
- Check the browser console for error messages
- Verify your EmailJS service and template are active

That's it! Your contact form will now send real emails to keanlouis30@gmail.com! 🚀
