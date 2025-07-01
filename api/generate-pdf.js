/**
 * Vercel Serverless Function for PDF Generation and Email
 * Handles JotForm submissions → PDF → Email to Debbie
 */

import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';
import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set in Vercel environment
    pass: process.env.EMAIL_PASS  // App-specific password
  }
};

const DEBBIE_EMAIL = 'debbie@parealestatesupport.com';

export default async function handler(req, res) {
  console.log('PDF Generation request received');
  
  try {
    // Parse form data from query parameters
    const formData = req.query;
    
    // Determine form type based on agent role
    const agentRole = formData.q102_agentRole || formData.agentRole || '';
    let formType = 'buyer'; // default
    
    if (agentRole.toLowerCase().includes('listing') || agentRole.toLowerCase().includes('seller')) {
      formType = 'seller';
    } else if (agentRole.toLowerCase().includes('dual')) {
      formType = 'dual';
    }
    
    console.log(`Detected form type: ${formType} for agent role: ${agentRole}`);
    
    // Build cover sheet URL
    const baseUrl = 'https://haydnphilipdesign.github.io/my-cover-sheets';
    const coverSheetUrl = buildCoverSheetUrl(baseUrl, formType, formData);
    
    console.log(`Cover sheet URL: ${coverSheetUrl}`);
    
    // Generate PDF
    const pdfBuffer = await generatePDF(coverSheetUrl);
    
    // Create PDF filename
    const filename = createFilename(formData, formType);
    
    // Send email to Debbie
    await sendEmailWithPDF(formData, pdfBuffer, filename, formType);
    
    // Redirect user to thank you page
    const thankYouUrl = `${baseUrl}/thank-you.html?property=${encodeURIComponent(formData.q2_textbox_2 || formData.propertyAddress || 'Property')}&agent=${encodeURIComponent(formData.q58_agentName || formData.agentName || 'Agent')}`;
    
    res.redirect(302, thankYouUrl);
    
  } catch (error) {
    console.error('Error in PDF generation:', error);
    
    // Send fallback email with form data
    try {
      await sendFallbackEmail(req.query);
    } catch (emailError) {
      console.error('Fallback email failed:', emailError);
    }
    
    // Still redirect user to thank you page
    const thankYouUrl = `https://haydnphilipdesign.github.io/my-cover-sheets/thank-you.html?error=processing`;
    res.redirect(302, thankYouUrl);
  }
}

/**
 * Build the cover sheet URL with all form data
 */
function buildCoverSheetUrl(baseUrl, formType, formData) {
  const params = new URLSearchParams();
  
  // Map JotForm fields to cover sheet fields
  const fieldMappings = {
    'propertyAddress': formData.q2_textbox_2 || formData.propertyAddress,
    'mlsNumber': formData.q15_textbox_15 || formData.mlsNumber,
    'agentName': formData.q58_agentName || formData.agentName,
    'contractDate': formData.q103_executionDate || formData.contractDate,
    'salePrice': formData.q3_textbox_3 || formData.salePrice,
    'acceptanceDate': formData.q103_executionDate || formData.acceptanceDate,
    'closingDate': formData.q104_closingDate104 || formData.closingDate,
    'referralDuePercent': formData.q25_textbox_25 || formData.referralDuePercent,
    'referralTo': formData.q23_textbox_23 || formData.referralTo,
    'buyerName': formData.q158_seller1158 || formData.buyerName,
    'sellerName': formData.q111_seller1 || formData.sellerName
  };
  
  // Add form-specific fields
  if (formType === 'buyer') {
    fieldMappings.commissionSeller = formData.q20_textbox_20 || formData.commissionSeller;
    fieldMappings.commissionBuyer = formData.q71_commissionPaid || formData.commissionBuyer;
    fieldMappings.totalCommissionToKW = formData.q16_textbox_16 || formData.totalCommissionToKW;
  } else if (formType === 'dual') {
    fieldMappings.totalCommissionToKW = formData.q16_textbox_16 || formData.totalCommissionToKW;
  }
  
  // Add non-empty parameters
  Object.entries(fieldMappings).forEach(([key, value]) => {
    if (value && value.toString().trim()) {
      params.append(key, value.toString().trim());
    }
  });
  
  return `${baseUrl}/${formType}.html?${params.toString()}`;
}

/**
 * Generate PDF from HTML URL using Puppeteer
 */
async function generatePDF(url) {
  console.log('Starting PDF generation for:', url);
  
  const browser = await puppeteer.launch({
    args: chrome.args,
    defaultViewport: chrome.defaultViewport,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
    ignoreHTTPSErrors: true,
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to cover sheet
    await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for auto-population script to complete
    await page.waitForTimeout(2000);
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '0.15in',
        right: '0.2in',
        bottom: '0.15in',
        left: '0.2in'
      },
      printBackground: true,
      preferCSSPageSize: true
    });
    
    console.log(`PDF generated successfully, size: ${pdfBuffer.length} bytes`);
    return pdfBuffer;
    
  } finally {
    await browser.close();
  }
}

/**
 * Create standardized filename for PDF
 */
function createFilename(formData, formType) {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const agentName = (formData.q58_agentName || formData.agentName || 'Agent').split(' ').pop(); // Last name
  const mlsNumber = (formData.q15_textbox_15 || formData.mlsNumber || 'MLS').replace(/[^a-zA-Z0-9]/g, '');
  const roleMap = { buyer: 'Buyer', dual: 'Dual', seller: 'Seller' };
  
  return `${date}_${roleMap[formType]}_${mlsNumber}_${agentName}.pdf`;
}

/**
 * Send email with PDF attachment to Debbie
 */
async function sendEmailWithPDF(formData, pdfBuffer, filename, formType) {
  console.log('Sending email to Debbie with PDF attachment');
  
  const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
  
  // Extract key information
  const propertyAddress = formData.q2_textbox_2 || formData.propertyAddress || 'Unknown Property';
  const agentName = formData.q58_agentName || formData.agentName || 'Unknown Agent';
  const mlsNumber = formData.q15_textbox_15 || formData.mlsNumber || 'No MLS';
  const salePrice = formData.q3_textbox_3 || formData.salePrice || 'Not specified';
  const closingDate = formData.q104_closingDate104 || formData.closingDate || 'TBD';
  
  const roleNames = { buyer: "Buyer's Agent", dual: 'Dual Agent', seller: 'Listing Agent' };
  const agentRole = roleNames[formType];
  
  const subject = `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Transaction - ${propertyAddress} - ${agentName}`;
  
  const emailBody = `Hi Debbie,

A new real estate transaction has been submitted through the PA Real Estate Support website:

Property: ${propertyAddress}
Agent: ${agentName} (${agentRole})
MLS#: ${mlsNumber}
Sale Price: $${salePrice}
Closing Date: ${closingDate}

The completed cover sheet is attached as a PDF.

Best regards,
PA Real Estate Support Transaction System
Submitted: ${new Date().toLocaleString()}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: DEBBIE_EMAIL,
    subject: subject,
    text: emailBody,
    attachments: [{
      filename: filename,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }]
  };
  
  await transporter.sendMail(mailOptions);
  console.log(`Email sent successfully to ${DEBBIE_EMAIL}`);
}

/**
 * Send fallback email if PDF generation fails
 */
async function sendFallbackEmail(formData) {
  console.log('Sending fallback email with form data');
  
  const transporter = nodemailer.createTransporter(EMAIL_CONFIG);
  
  const propertyAddress = formData.q2_textbox_2 || formData.propertyAddress || 'Unknown Property';
  const agentName = formData.q58_agentName || formData.agentName || 'Unknown Agent';
  
  const formDataText = Object.entries(formData)
    .filter(([key, value]) => value && key.startsWith('q'))
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: DEBBIE_EMAIL,
    subject: `URGENT: Transaction Submission Failed - ${propertyAddress} - ${agentName}`,
    text: `Hi Debbie,

A transaction was submitted but PDF generation failed. Here's the raw form data:

${formDataText}

Please process this manually.

System Error Time: ${new Date().toLocaleString()}
PA Real Estate Support Transaction System`
  };
  
  await transporter.sendMail(mailOptions);
}