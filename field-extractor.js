/**
 * JotForm Field Name Extractor
 * 
 * Paste this code into your browser console on any JotForm page
 * to automatically extract all field names and generate redirect URLs
 */

// Method 1: Extract from JotForm Builder (RECOMMENDED)
function extractFromBuilder() {
    console.log('🔍 Extracting JotForm field names...\n');
    
    const fields = [];
    
    // Find all form fields
    const inputs = document.querySelectorAll('input[name], select[name], textarea[name]');
    
    inputs.forEach(input => {
        const name = input.getAttribute('name');
        const label = findFieldLabel(input);
        
        if (name && !name.includes('_') && name.length > 2) {
            fields.push({
                name: name,
                label: label || 'Unknown',
                type: input.type || input.tagName.toLowerCase()
            });
        }
    });
    
    // Also check for fields in the builder interface
    const builderFields = document.querySelectorAll('[data-type]');
    builderFields.forEach(field => {
        const uniqueName = field.querySelector('.form-field-unique-name, .unique-name, [data-component="unique-name"]');
        const labelElement = field.querySelector('.form-field-label, .field-label, h3, .form-label');
        
        if (uniqueName && uniqueName.textContent) {
            const name = uniqueName.textContent.trim();
            const label = labelElement ? labelElement.textContent.trim() : 'Unknown';
            
            if (!fields.find(f => f.name === name)) {
                fields.push({
                    name: name,
                    label: label,
                    type: field.getAttribute('data-type') || 'unknown'
                });
            }
        }
    });
    
    return fields;
}

function findFieldLabel(input) {
    // Try to find associated label
    const id = input.getAttribute('id');
    if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) return label.textContent.trim();
    }
    
    // Look for nearby text
    const parent = input.closest('.form-field, .field-container, .form-group');
    if (parent) {
        const label = parent.querySelector('label, .field-label, h3');
        if (label) return label.textContent.trim();
    }
    
    return null;
}

// Method 2: Extract from Form Source Code
function extractFromSource() {
    console.log('🔍 Extracting from form source...\n');
    
    const html = document.documentElement.outerHTML;
    const fieldPattern = /name=['"]([^'"_]+)['"][^>]*>/g;
    const fields = [];
    
    let match;
    while ((match = fieldPattern.exec(html)) !== null) {
        const name = match[1];
        if (name.length > 2 && !fields.includes(name)) {
            fields.push({
                name: name,
                label: 'Extracted from source',
                type: 'unknown'
            });
        }
    }
    
    return fields;
}

// Method 3: Generate Cover Sheet URLs
function generateCoverSheetURLs(fields) {
    const baseURLs = {
        buyer: 'https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html',
        dual: 'https://haydnphilipdesign.github.io/my-cover-sheets/dual.html',
        seller: 'https://haydnphilipdesign.github.io/my-cover-sheets/seller.html'
    };
    
    // Map common field patterns to our field names
    const fieldMappings = {
        // Property info
        'property': 'propertyAddress',
        'address': 'propertyAddress',
        'propertyAddress': 'propertyAddress',
        
        // MLS
        'mls': 'mlsNumber',
        'mlsNumber': 'mlsNumber',
        'listingNumber': 'mlsNumber',
        
        // Agent
        'agent': 'agentName',
        'agentName': 'agentName',
        'realtor': 'agentName',
        
        // Dates
        'contractDate': 'contractDate',
        'contract': 'contractDate',
        'acceptanceDate': 'acceptanceDate',
        'acceptance': 'acceptanceDate',
        'inspectionDate': 'inspectionDate',
        'inspection': 'inspectionDate',
        'contingencyDate': 'contingencyDate',
        'contingency': 'contingencyDate',
        'closingDate': 'closingDate',
        'closing': 'closingDate',
        
        // Financial
        'price': 'salePrice',
        'salePrice': 'salePrice',
        'purchasePrice': 'salePrice',
        'deposit': 'depositAmount',
        'depositAmount': 'depositAmount',
        'earnestMoney': 'depositAmount',
        'sellersAssist': 'sellersAssistant',
        'sellerAssist': 'sellersAssistant',
        'sellersAssistant': 'sellersAssistant',
        
        // Commission
        'commission': 'totalCommissionToKW',
        'commissionSeller': 'commissionSeller',
        'commissionBuyer': 'commissionBuyer',
        'totalCommission': 'totalCommissionToKW',
        
        // Referral
        'referralPercent': 'referralDuePercent',
        'referralDue': 'referralDuePercent',
        'referralTo': 'referralTo',
        'referralForm': 'referralForm',
        
        // Utilities
        'septic': 'septicType',
        'septicType': 'septicType',
        'waste': 'septicType',
        'water': 'waterSource',
        'waterSource': 'waterSource',
        'waterType': 'waterSource',
        
        // Contact
        'agentEmail': 'agentEmail',
        'email': 'agentEmail',
        'agentPhone': 'listingAgentPhone',
        'phone': 'listingAgentPhone',
        'listingAgentPhone': 'listingAgentPhone',
        'listingAgentEmail': 'listingAgentEmail',
        
        // HOA
        'hoaGate': 'hoaGatePass',
        'gatePass': 'hoaGatePass',
        'hoaGatePass': 'hoaGatePass'
    };
    
    const urlParams = [];
    
    fields.forEach(field => {
        const fieldName = field.name.toLowerCase();
        let mappedField = null;
        
        // Direct match
        if (fieldMappings[fieldName]) {
            mappedField = fieldMappings[fieldName];
        } else {
            // Fuzzy match
            for (const [pattern, target] of Object.entries(fieldMappings)) {
                if (fieldName.includes(pattern.toLowerCase()) || pattern.toLowerCase().includes(fieldName)) {
                    mappedField = target;
                    break;
                }
            }
        }
        
        if (mappedField) {
            urlParams.push(`${mappedField}={${field.name}}`);
        }
    });
    
    const paramString = urlParams.join('&');
    
    return {
        buyer: `${baseURLs.buyer}?${paramString}`,
        dual: `${baseURLs.dual}?${paramString}`,
        seller: `${baseURLs.seller}?${paramString}`
    };
}

// Main execution function
function runFieldExtractor() {
    console.clear();
    console.log('🚀 JotForm Field Extractor Starting...\n');
    
    // Try builder method first
    let fields = extractFromBuilder();
    
    // Fallback to source extraction if no fields found
    if (fields.length === 0) {
        console.log('⚠️  No fields found in builder, trying source extraction...');
        fields = extractFromSource();
    }
    
    if (fields.length === 0) {
        console.log('❌ No form fields found. Make sure you\'re on a JotForm page.');
        return;
    }
    
    console.log(`✅ Found ${fields.length} fields:\n`);
    
    // Display fields table
    console.table(fields);
    
    // Generate URLs
    const urls = generateCoverSheetURLs(fields);
    
    console.log('\n📋 COPY-PASTE READY URLs:\n');
    console.log('🏠 BUYER FORM:');
    console.log(urls.buyer);
    console.log('\n🏢 DUAL FORM:');
    console.log(urls.dual);
    console.log('\n🏡 SELLER FORM:');
    console.log(urls.seller);
    
    console.log('\n💡 Instructions:');
    console.log('1. Copy the URL for your form type');
    console.log('2. Go to JotForm → Settings → Thank You Page');
    console.log('3. Select "Redirect to an External Link"');
    console.log('4. Paste the URL');
    console.log('5. Save and test!');
    
    // Return data for further use
    return {
        fields: fields,
        urls: urls
    };
}

// Auto-run when pasted in console
console.log('🔧 JotForm Field Extractor Loaded!');
console.log('📋 Run: runFieldExtractor()');
console.log('📱 Or just wait 3 seconds for auto-run...\n');

// Auto-run after 3 seconds
setTimeout(() => {
    runFieldExtractor();
}, 3000);