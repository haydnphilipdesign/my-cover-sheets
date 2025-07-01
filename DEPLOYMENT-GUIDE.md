# 🚀 Deployment Guide: PDF Automation System

**Complete setup guide for automated PDF generation and email system**

---

## 📋 **Pre-Deployment Checklist**

### **1. Email Setup (Required)**
You'll need a Gmail account for sending emails to Debbie:

**Option A: Use existing Gmail**
- Enable 2-factor authentication
- Generate app-specific password
- Save credentials for Vercel environment variables

**Option B: Create dedicated Gmail account**
- Create: `parealestatesupport.automation@gmail.com`
- Enable 2-factor authentication
- Generate app-specific password

### **2. Vercel Account**
- Sign up at [vercel.com](https://vercel.com) (free)
- Connect your GitHub account
- No payment method required for this usage

---

## 🛠 **Step 1: Deploy to Vercel**

### **A. Deploy from GitHub**
1. **Push current code** to GitHub (already done)
2. **Go to Vercel Dashboard**
3. **Click "New Project"**
4. **Import** `my-cover-sheets` repository
5. **Configure settings:**
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: `echo "No build required"`
   - Output Directory: `./`

### **B. Environment Variables**
In Vercel dashboard, add these environment variables:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-specific-password
```

### **C. Deploy**
- Click **"Deploy"**
- Wait ~2 minutes for deployment
- Note your Vercel URL: `https://your-project.vercel.app`

---

## 📧 **Step 2: Configure Email**

### **A. Gmail App Password Setup**
1. **Go to Gmail Settings** → Security
2. **Enable 2-Factor Authentication** (required)
3. **Generate App Password:**
   - App: "Mail"
   - Device: "Vercel Server"
4. **Copy the 16-character password**
5. **Add to Vercel environment variables**

### **B. Test Email Function**
```bash
# Test email endpoint (replace with your Vercel URL)
curl "https://your-project.vercel.app/api/generate-pdf?test=true&q2_textbox_2=123%20Test%20St&q58_agentName=Test%20Agent"
```

---

## 📝 **Step 3: Update JotForm**

### **A. JotForm Redirect URL**
Replace your current JotForm redirect with:

```
https://your-project.vercel.app/api/generate-pdf?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&commissionSeller={q20_textbox_20}&commissionBuyer={q71_commissionPaid}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}&q102_agentRole={q102_agentRole}
```

### **B. JotForm Settings**
1. **Go to JotForm** → Settings → Thank You Page
2. **Select** "Redirect to an External Link"
3. **Paste** the URL above (replace `your-project` with actual URL)
4. **Save** settings

---

## 🧪 **Step 4: Testing**

### **A. End-to-End Test**
1. **Submit your JotForm** with test data
2. **Check user sees thank you page** (~3 seconds)
3. **Check Debbie receives email** with PDF attachment
4. **Verify PDF content** matches form submission

### **B. Test URLs**

**Direct API test:**
```
https://your-project.vercel.app/api/generate-pdf?propertyAddress=123%20Test%20Street&mlsNumber=TEST123&agentName=John%20Doe&salePrice=350000&q102_agentRole=Buyer%27s%20Agent
```

**Expected flow:**
- User redirected to thank you page
- PDF generated and emailed to Debbie
- Console logs visible in Vercel dashboard

---

## 📊 **Step 5: Monitoring**

### **A. Vercel Dashboard**
- **Functions tab:** Monitor PDF generation calls
- **Logs:** View detailed function execution
- **Analytics:** Track usage and performance

### **B. Email Monitoring**
- **Check Gmail Sent folder** for outgoing emails
- **Monitor bounce rates** (should be 0 with valid email)
- **Track delivery confirmations**

### **C. Error Handling**
The system includes automatic fallbacks:
- PDF fails → Send plain text email with form data
- Email fails → Log error, still show user success
- Invalid data → Generate PDF with available fields

---

## 🔧 **Customization Options**

### **A. Email Templates**
Edit `api/generate-pdf.js` to customize:
- Email subject lines
- Email body content
- PDF filenames
- Error messages

### **B. PDF Options**
Modify PDF generation settings:
```javascript
// In generatePDF function
const pdfBuffer = await page.pdf({
  format: 'Letter',
  margin: { top: '0.15in', right: '0.2in', bottom: '0.15in', left: '0.2in' },
  printBackground: true,
  preferCSSPageSize: true
});
```

### **C. Thank You Page**
Customize `thank-you.html`:
- Branding and colors
- Contact information
- Redirect timing
- Additional messaging

---

## 💰 **Cost Breakdown**

### **Vercel (Free Tier)**
- 100 GB-hours/month function execution
- 100,000 requests/month
- Typical usage: ~50 transactions/month = $0

### **Gmail API**
- Free for reasonable usage
- Rate limits: 250 quota units/user/100 seconds

### **Total Monthly Cost: $0**

---

## 🚨 **Troubleshooting**

### **Common Issues:**

**1. PDF Generation Fails**
- Check Vercel function logs
- Verify cover sheet URLs are accessible
- Test with simpler data first

**2. Email Not Sending**
- Verify Gmail app password is correct
- Check environment variables in Vercel
- Test with direct Gmail login

**3. JotForm Not Redirecting**
- Verify redirect URL is exactly correct
- Check for URL encoding issues
- Test redirect URL directly in browser

**4. Thank You Page Not Loading**
- Verify Vercel deployment is successful
- Check for JavaScript errors in browser console
- Test thank-you.html directly

### **Debug Mode**
Add `&debug=true` to any URL to see detailed logging:
```
https://your-project.vercel.app/api/generate-pdf?debug=true&propertyAddress=Test
```

---

## 📞 **Support Contacts**

**Vercel Support:** [vercel.com/support](https://vercel.com/support)
**Gmail Setup:** [support.google.com](https://support.google.com)
**JotForm Support:** [jotform.com/help](https://jotform.com/help)

---

## ✅ **Go-Live Checklist**

- [ ] Vercel deployment successful
- [ ] Email credentials configured
- [ ] Test email sent and received
- [ ] JotForm redirect URL updated
- [ ] End-to-end test completed
- [ ] Debbie notified of new system
- [ ] Backup plan documented
- [ ] Monitoring enabled

**System is ready for production use! 🎉**