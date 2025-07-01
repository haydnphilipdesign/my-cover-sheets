# 🚀 Easy JotForm Field Extraction

**No more manual field hunting!** These methods automatically extract all your JotForm field names and generate ready-to-use redirect URLs.

---

## Method 1: Browser Console (EASIEST) ⭐

### Step-by-Step:

1. **Open your JotForm** (builder or preview page)
2. **Open browser console**:
   - **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` → Click "Console" tab
   - **Firefox**: Press `F12` → Click "Console" tab
   - **Safari**: Press `Cmd+Opt+I` → Click "Console" tab

3. **Copy and paste this code**:
   ```javascript
   fetch('https://haydnphilipdesign.github.io/my-cover-sheets/field-extractor.js').then(r=>r.text()).then(code=>eval(code))
   ```

4. **Press Enter** and wait 3 seconds

5. **Copy the generated URL** from the console output

**That's it!** The script automatically:
- ✅ Finds all your field names
- ✅ Maps them to cover sheet fields  
- ✅ Generates complete redirect URLs
- ✅ Shows you exactly what to copy/paste

---

## Method 2: Manual Field Inspector

### A. From JotForm Builder:

1. **Open your form in JotForm builder**
2. **Click on each field** you want to map
3. **Look at the Properties panel** (right side)
4. **Find "Unique Name"** - copy this exactly
5. **Repeat** for all fields you need

### B. Common Field Name Patterns:

JotForm typically uses these patterns:

| **Field Type** | **Common Names** | **Examples** |
|---------------|------------------|--------------|
| Property Address | `propertyAddress`, `address`, `property` | `propertyAddress42` |
| MLS Number | `mlsNumber`, `mls`, `listing` | `mlsNumber15` |
| Agent Name | `agentName`, `agent`, `realtor` | `agentName8` |
| Sale Price | `salePrice`, `price`, `purchasePrice` | `salePrice23` |
| Contract Date | `contractDate`, `contract` | `contractDate12` |

---

## Method 3: Form Source Inspection

### For Advanced Users:

1. **Open your JotForm** in browser
2. **Right-click** → "View Page Source"
3. **Search for** `name="` to find field names
4. **Look for patterns** like `name="fieldName123"`
5. **Copy the field names** (ignore numbers at the end)

---

## Method 4: JotForm API (Most Complete)

### If you have many forms:

1. **Get your JotForm API key**:
   - Go to [JotForm API page](https://www.jotform.com/myaccount/api)
   - Copy your API key

2. **Use this JavaScript in browser console**:
   ```javascript
   // Replace YOUR_API_KEY with your actual key
   const apiKey = 'YOUR_API_KEY';
   const formId = 'YOUR_FORM_ID'; // From your form URL
   
   fetch(`https://api.jotform.com/form/${formId}?apikey=${apiKey}`)
   .then(r => r.json())
   .then(data => {
       console.log('📋 Form Fields:');
       Object.values(data.content.questions).forEach(q => {
           console.log(`${q.name}: "${q.text}"`);
       });
   });
   ```

---

## Method 5: Browser Extension (Coming Soon)

We're working on a browser extension that will:
- ✅ One-click field detection
- ✅ Automatic URL generation  
- ✅ Direct JotForm integration
- ✅ Multi-form management

---

## 🎯 Recommended Workflow

### For Most Users:
1. **Use Method 1** (Browser Console) - it's automatic and foolproof
2. **Copy the generated URL** 
3. **Paste into JotForm** redirect settings
4. **Test with a form submission**

### For Power Users:
1. **Use Method 4** (API) for multiple forms
2. **Save field mappings** for future use
3. **Automate with scripts** if needed

---

## 🔧 Troubleshooting

### "No fields found"
- Make sure you're on the actual JotForm page (not settings)
- Try the form preview page instead of builder
- Use Method 2 (manual) as backup

### "Script error"
- Check your internet connection
- Try copying the script from `field-extractor.js` file directly
- Use Method 2 (manual) as backup

### "Fields not mapping correctly"
- The auto-mapping is smart but not perfect
- Edit the generated URL to remove unused fields
- Add custom mappings manually if needed

---

## 💡 Pro Tips

### Quick Field Testing:
```javascript
// Test if a field name works
const testField = 'yourFieldName';
console.log(`Test URL: buyer.html?propertyAddress={${testField}}`);
```

### Bulk Field Processing:
```javascript
// Process multiple forms at once
const formIds = ['form1', 'form2', 'form3'];
formIds.forEach(id => {
    // Run extraction for each form
});
```

### Custom Field Mapping:
```javascript
// Add your own field mappings
const customMappings = {
    'myCustomField': 'propertyAddress',
    'specialField': 'salePrice'
};
```

---

## ⚡ Quick Start

**Just want to get started fast?**

1. Open your JotForm
2. Open browser console (`F12`)
3. Paste: `fetch('https://haydnphilipdesign.github.io/my-cover-sheets/field-extractor.js').then(r=>r.text()).then(code=>eval(code))`
4. Copy the generated URL
5. Paste into JotForm redirect settings

**Done in under 2 minutes!**