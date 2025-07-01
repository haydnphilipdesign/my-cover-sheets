# JotForm Direct Redirect Setup Guide

**Setup Time: ~5 minutes per form**  
**No coding required - just copy and paste!**

## Step 1: Choose Your Cover Sheet Type

Select the appropriate redirect URL template based on your form:

### 🏠 **Buyer's Agent Cover Sheet**

**Copy this URL template:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={propertyAddress}&mlsNumber={mlsNumber}&agentName={agentName}&contractDate={contractDate}&salePrice={salePrice}&acceptanceDate={acceptanceDate}&inspectionDate={inspectionDate}&contingencyDate={contingencyDate}&depositAmount={depositAmount}&commissionSeller={commissionSeller}&commissionBuyer={commissionBuyer}&sellersAssistant={sellersAssistant}&totalCommissionToKW={totalCommissionToKW}&referralDuePercent={referralDuePercent}&referralTo={referralTo}&referralForm={referralForm}&closingDate={closingDate}&hoaGatePass={hoaGatePass}&listingAgentPhone={listingAgentPhone}&listingAgentEmail={listingAgentEmail}&septicType={septicType}&waterSource={waterSource}
```

### 🏢 **Dual Agent Cover Sheet**

**Copy this URL template:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/dual.html?propertyAddress={propertyAddress}&mlsNumber={mlsNumber}&agentName={agentName}&contractDate={contractDate}&salePrice={salePrice}&acceptanceDate={acceptanceDate}&inspectionDate={inspectionDate}&contingencyDate={contingencyDate}&sellersAssistant={sellersAssistant}&totalCommissionToKW={totalCommissionToKW}&referralDuePercent={referralDuePercent}&referralForm={referralForm}&closingDate={closingDate}&septicType={septicType}&waterSource={waterSource}
```

### 🏡 **Seller's Agent Cover Sheet**

**Copy this URL template:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/seller.html?propertyAddress={propertyAddress}&mlsNumber={mlsNumber}&agentName={agentName}&contractDate={contractDate}&salePrice={salePrice}&acceptanceDate={acceptanceDate}&sellersAssistant={sellersAssistant}&referralDuePercent={referralDuePercent}&referralForm={referralForm}&septicType={septicType}&waterSource={waterSource}
```

---

## Step 2: Set Up JotForm Redirect

### A. Access JotForm Settings
1. **Log into JotForm** and open your form
2. Click **Settings** in the form builder
3. Go to **Thank You Page** section
4. Select **"Redirect to an External Link"**

### B. Paste and Configure URL
1. **Paste the URL template** you copied from Step 1
2. **Replace placeholders** with your actual JotForm field names (see Step 3)
3. **Save** your settings

---

## Step 3: Replace Field Placeholders

You need to replace `{fieldName}` placeholders with your actual JotForm field names.

### How to Find Your JotForm Field Names

1. **In JotForm form builder**, click on any field
2. **Go to Properties panel** (right side)
3. **Look for "Unique Name"** - this is what you'll use
4. **Copy the unique name** exactly as shown

### Example Replacement

**Before (template):**
```
propertyAddress={propertyAddress}&mlsNumber={mlsNumber}
```

**After (with your field names):**
```
propertyAddress={propertyAddress42}&mlsNumber={mlsListing}
```

### 📋 **Quick Reference: Most Common Fields**

Replace these placeholders with your JotForm unique names:

| **Placeholder** | **Your JotForm Field** | **Form Label** |
|----------------|------------------------|----------------|
| `{propertyAddress}` | ➡️ `{yourFieldName}` | Property Address |
| `{mlsNumber}` | ➡️ `{yourFieldName}` | MLS Number |
| `{agentName}` | ➡️ `{yourFieldName}` | Agent Name |
| `{contractDate}` | ➡️ `{yourFieldName}` | Contract Date |
| `{salePrice}` | ➡️ `{yourFieldName}` | Sale Price |
| `{acceptanceDate}` | ➡️ `{yourFieldName}` | Acceptance Date |

**💡 Tip:** You don't need to use ALL fields. Remove any `&fieldName={fieldName}` pairs you don't have in your form.

### Example: Minimal Setup

If you only have 4 fields, your URL might look like:
```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={propertyAddress42}&mlsNumber={mlsListing}&agentName={agentName15}&salePrice={salePrice23}
```

---

## Step 4: Test Your Setup

### A. Test Submission
1. **Fill out your JotForm** with sample data
2. **Submit the form**
3. **Verify** you're redirected to the cover sheet
4. **Check** that fields are populated correctly

### B. Troubleshooting

**❌ Fields not populating?**
- Check that field names match exactly (case-sensitive)
- Verify the unique names in JotForm properties
- Remove any fields you don't have from the URL

**❌ Redirect not working?**
- Ensure "Redirect to an External Link" is selected
- Check the URL was pasted correctly
- Try with a simple URL first (fewer fields)

**❌ Special characters look wrong?**
- JotForm automatically handles URL encoding
- No action needed on your part

---

## Step 5: Advanced Configuration (Optional)

### Multi-Value Checkbox Fields

For fields like septic type and water source that can have multiple values:

**Setup in JotForm:**
- Use checkboxes with these exact values:
  - **Septic Type:** `Septic`, `Cesspool`, `Comm`, `Public`
  - **Water Source:** `Well`, `Comm`, `Public`

**Result:** Multiple selections will be comma-separated automatically.

### Field Customization

**Add new fields:**
1. Add `&newField={newFieldName}` to your URL
2. Add `data-field="newField"` to the HTML input
3. Test the integration

**Remove fields:**
- Simply delete the `&fieldName={fieldName}` part from the URL

---

## 🎯 Quick Start Checklist

- [ ] Choose your cover sheet type (Buyer/Dual/Seller)
- [ ] Copy the appropriate URL template
- [ ] Go to JotForm → Settings → Thank You Page
- [ ] Select "Redirect to an External Link"
- [ ] Paste the URL template
- [ ] Replace 3-5 key field placeholders with your JotForm field names
- [ ] Save settings
- [ ] Test with a form submission
- [ ] Verify fields populate correctly

**That's it! Your JotForm will now automatically populate cover sheets.**

---

## 📞 Support

**Issues?** Check these common solutions:

1. **Fields not found:** Verify unique names in JotForm field properties
2. **Partial population:** Remove unused fields from the URL
3. **Encoding errors:** JotForm handles this automatically
4. **Testing:** Use the test URLs in `sample-urls.txt`

**Still need help?** Open an issue in the GitHub repository with:
- Your JotForm field names
- The URL you're using
- What's not working