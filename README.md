# Real Estate Cover Sheets with JotForm Auto-Population

This project provides three real estate cover sheet forms that can be automatically populated with data from JotForm submissions via URL parameters.

## Features

- **Three Form Types**: Buyer's Agent, Dual Agent, and Seller's Agent cover sheets
- **Auto-Population**: 24 mapped JotForm fields automatically populate form inputs
- **Checkbox Support**: Multi-value fields for septic type and water source
- **XSS Protection**: Input sanitization prevents cross-site scripting attacks
- **Responsive Design**: Print-optimized layouts that work on all devices
- **GitHub Pages Ready**: Deploy instantly with no server required

## Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or clone this repository**
2. **Enable GitHub Pages** in repository settings
3. **Access your forms** at: `https://yourusername.github.io/my-cover-sheets/`

### Option 2: Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/my-cover-sheets.git
   cd my-cover-sheets
   ```

2. **Serve locally**:
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**: `http://localhost:8000`

## Usage

### Basic URL Structure

```
[form-name].html?field1=value1&field2=value2&field3=value3
```

### Example URLs

**Buyer Form:**
```
buyer.html?propertyAddress=123%20Main%20St&mlsNumber=ML12345&agentName=John%20Doe&salePrice=450000
```

**Dual Form:**
```
dual.html?propertyAddress=456%20Oak%20Ave&mlsNumber=ML54321&agentName=Jane%20Smith&contractDate=2024-01-15
```

**Seller Form:**
```
seller.html?propertyAddress=789%20Pine%20Dr&mlsNumber=ML67890&agentName=Bob%20Wilson&salePrice=525000
```

### Checkbox Fields

For fields with multiple checkboxes (septic type and water source), use comma-separated values:

```
buyer.html?septicType=Septic,Public&waterSource=Well,Comm
```

## Field Mappings

### Common Fields (All Forms)

| JotForm Field Name | Form Label | Forms |
|-------------------|------------|--------|
| `propertyAddress` | PROPERTY: | All |
| `mlsNumber` | MLS# | All |
| `agentName` | Agent: | All |
| `contractDate` | CONTRACT DATE: | All |
| `salePrice` | Price: $ / PRICE: $ | All |
| `acceptanceDate` | ACCEPTANCE DATE: | All |
| `sellersAssistant` | SELLER'S ASSIST: | All |
| `referralDuePercent` | Referral Due: % | All |
| `referralForm` | Referral Form: | All |
| `septicType` | Septic checkboxes | All |
| `waterSource` | Water checkboxes | All |

### Buyer-Specific Fields

| JotForm Field Name | Form Label |
|-------------------|------------|
| `inspectionDate` | Inspection Date: |
| `contingencyDate` | Contingency Date: |
| `depositAmount` | DEPOSIT: $ |
| `commissionSeller` | Commission Paid by Seller: |
| `commissionBuyer` | Commission Paid by Buyer: |
| `totalCommissionToKW` | Total Commission to KW: |
| `referralTo` | TO: |
| `closingDate` | CLOSING DATE: |
| `hoaGatePass` | Pass at HOA Gate: |
| `listingAgentPhone` | Phone: (under Title Agent) |
| `listingAgentEmail` | Email: (under Title Agent) |

### Dual-Specific Fields

| JotForm Field Name | Form Label |
|-------------------|------------|
| `inspectionDate` | Inspection Date: |
| `contingencyDate` | Contingency Date: |
| `totalCommissionToKW` | Commission: |
| `closingDate` | CLOSING DATE: |

### Checkbox Field Values

**Septic Type Options:**
- `Septic`
- `Cesspool` 
- `Comm`
- `Public`

**Water Source Options:**
- `Well`
- `Comm`
- `Public`

## URL Encoding

When building URLs, certain characters must be encoded:

| Character | Encoded | Example |
|-----------|---------|---------|
| Space | `%20` | `123%20Main%20St` |
| Percent | `%25` | `3%25` (for "3%") |
| Comma | `%2C` | `Septic%2CPublic` |
| Ampersand | `%26` | `Smith%26Co` |

## Integration with JotForm

### Method 1: Redirect After Submission

1. In JotForm, go to **Settings** → **Thank You Page**
2. Select **Redirect to an External Link**
3. Use this URL template:
   ```
   https://yourusername.github.io/my-cover-sheets/buyer.html?propertyAddress={propertyAddress}&mlsNumber={mlsNumber}&agentName={agentName}&salePrice={salePrice}
   ```
4. Replace `{fieldName}` with actual JotForm field names

### Method 2: Webhook Integration

1. Set up a webhook endpoint that receives JotForm submissions
2. Process the data and redirect to the appropriate cover sheet URL
3. Use server-side URL building for complex field mappings

### Method 3: Zapier/Make Integration

1. Create a Zap/Scenario triggered by JotForm submissions
2. Use a "Webhooks" action to redirect to the cover sheet URL
3. Map JotForm fields to URL parameters

## Customization

### Adding New Fields

1. **Add data-field attribute** to the input in HTML:
   ```html
   <input type="text" data-field="newFieldName" class="input-field">
   ```

2. **Update autopopulate.js** if the field requires special handling (like checkboxes):
   ```javascript
   const checkboxFields = ['septicType', 'waterSource', 'newCheckboxField'];
   ```

3. **Test** with sample URL parameters

### Styling Changes

- Modify the `<style>` section in each HTML file
- Maintain print-friendly CSS for physical forms
- Test both screen and print layouts

### Adding New Form Types

1. **Copy an existing HTML file** (e.g., `buyer.html` → `new-form.html`)
2. **Update the title** and form-specific content
3. **Add data-field attributes** to inputs
4. **Include the autopopulate.js script**
5. **Update documentation**

## File Structure

```
├── buyer.html          # Buyer's agent cover sheet
├── dual.html           # Dual agent cover sheet  
├── seller.html         # Seller's agent cover sheet
├── autopopulate.js     # Auto-population script
├── test.html           # Testing page
├── sample-urls.txt     # Sample URLs for testing
└── README.md          # This documentation
```

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **JavaScript**: ES6+ features used (URL, URLSearchParams)
- **Print Support**: Optimized CSS for physical printing

## Security

- **XSS Prevention**: All input values are sanitized
- **No Server Required**: Client-side only, no data stored
- **URL Parameters**: Data visible in browser history (not suitable for sensitive info)

## Troubleshooting

### Fields Not Populating

1. **Check URL parameters**: Ensure field names match exactly
2. **Check browser console**: Look for error messages
3. **Verify data-field attributes**: Ensure they match parameter names
4. **Test with simple values**: Avoid special characters initially

### Checkbox Issues

1. **Use exact values**: `Septic`, `Cesspool`, `Comm`, `Public`, `Well`
2. **Comma-separated**: Multiple values should be comma-separated
3. **URL encoding**: Encode commas as `%2C` in URLs

### Print Layout Problems

1. **Use print preview**: Test print layout before printing
2. **Check page margins**: Adjust in print settings if needed
3. **Verify font sizes**: Some browsers scale fonts differently

## Development

### Local Testing

```bash
# Start local server
python3 -m http.server 8000

# Test with sample URLs
open "http://localhost:8000/buyer.html?propertyAddress=123%20Test%20St&mlsNumber=TEST123"
```

### Code Structure

- **HTML**: Semantic structure with data-field attributes
- **CSS**: Print-optimized responsive design
- **JavaScript**: Self-contained auto-population module

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request with detailed description

## License

This project is provided as-is for real estate professional use. Modify and distribute freely.

## Support

For issues or questions:
1. Check this README
2. Review sample-urls.txt for examples
3. Test with the included test.html file
4. Open an issue in the GitHub repository

---

**Quick Links:**
- [Live Demo](https://yourusername.github.io/my-cover-sheets/)
- [Sample URLs](sample-urls.txt)
- [Test Page](test.html)