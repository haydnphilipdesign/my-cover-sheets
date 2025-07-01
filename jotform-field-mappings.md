# JotForm Field Mappings for Cover Sheets

**Based on your Transaction Intake Form (ID: 251705964264159)**

## 🎯 Optimized Field Mappings

### Core Property & Agent Fields
| Cover Sheet Field | JotForm Field | JotForm Field ID |
|-------------------|---------------|------------------|
| propertyAddress | Property Address | `q2_textbox_2` |
| mlsNumber | MLS Number | `q15_textbox_15` |
| agentName | Agent Name | `q58_agentName` |
| agentEmail | Agent Email | `q59_agentEmail` |
| agentPhone | Agent Phone | `q60_agentPhone[full]` |
| agentRole | Agent Role (for integration) | `q102_agentRole` |

### Financial Fields  
| Cover Sheet Field | JotForm Field | JotForm Field ID |
|-------------------|---------------|------------------|
| salePrice | Sale Price (USD) | `q3_textbox_3` |
| totalCommissionToKW | Your Commission (%) | `q16_textbox_16` |
| commissionSeller | Commission Paid by Seller (%) | `q20_textbox_20` |
| commissionBuyer | Commission Paid by Buyer (%) | `q71_commissionPaid` |

### Date Fields (Using Integration Fields)
| Cover Sheet Field | JotForm Field | JotForm Field ID |
|-------------------|---------------|------------------|
| acceptanceDate | Execution Date (for integration) | `q103_executionDate` |
| closingDate | Closing Date (for integration) | `q104_closingDate104` |
| contractDate | Execution Date (for integration) | `q103_executionDate` |

### Referral Fields
| Cover Sheet Field | JotForm Field | JotForm Field ID |
|-------------------|---------------|------------------|
| referralDuePercent | Referral Fee (%) | `q25_textbox_25` |
| referralTo | Referring Party | `q23_textbox_23` |

### Buyer & Seller Names (Primary Only)
| Cover Sheet Field | JotForm Field | JotForm Field ID |
|-------------------|---------------|------------------|
| buyerName | Buyer 1 Name | `q158_seller1158` |
| sellerName | Seller 1 Name | `q111_seller1` |

### Multiple Sellers (up to 3)
- **Seller 1:** 
  - Name: `q111_seller1`
  - Email: `q141_seller1141`
  - Phone: `q113_seller1113`
  - Address: `q114_seller1114`
- **Seller 2:**
  - Name: `q120_seller2120`
  - Email: `q137_seller2`
  - Phone: `q122_seller2122`
  - Address: `q123_seller2123`
- **Seller 3:** (if fields exist)
  - Name: `q144_sellerName`
  - Email: `q145_sellerEmail`
  - Phone: `q146_sellerPhone`
  - Address: `q147_sellerAddress`

### Multiple Buyers (up to 3)
- **Buyer 1:**
  - Name: `q158_seller1158` (mislabeled but is buyer)
  - Email: `q159_seller1159`
  - Phone: `q160_seller1160`
  - Address: `q161_seller1161`
- **Buyer 2:**
  - Name: `q163_seller2163` (mislabeled but is buyer)
  - Email: `q164_seller2164`
  - Phone: `q165_seller2165`
  - Address: `q166_seller2166`
- **Buyer 3:** (if fields exist)
  - Name: `q153_sellerName153` (mislabeled but is buyer)
  - Email: `q154_sellerEmail154`
  - Phone: `q155_sellerPhone155`
  - Address: `q156_sellerAddress156`

### Fields Not Available in Your Form
These fields would need to be added to your JotForm or left blank:
- `sellersAssistant` (Seller's Assist amount)
- `depositAmount` (Earnest money deposit)
- `inspectionDate`
- `contingencyDate` 
- `septicType` (Septic/Cesspool/Comm/Public)
- `waterSource` (Well/Comm/Public)
- `hoaGatePass`
- `listingAgentPhone`
- `listingAgentEmail`
- `referralForm`

---

## 🚀 Ready-to-Use Redirect URLs

### For Buyer's Agent Cover Sheet
```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&commissionSeller={q20_textbox_20}&commissionBuyer={q71_commissionPaid}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}
```

### For Dual Agent Cover Sheet
```
https://haydnphilipdesign.github.io/my-cover-sheets/dual.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}
```

### For Seller's Agent Cover Sheet
```
https://haydnphilipdesign.github.io/my-cover-sheets/seller.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&buyerName={q158_seller1158}&sellerName={q111_seller1}
```

---

## 🔧 Dynamic Form Selection Based on Agent Role

Since your form has an Agent Role field (`q102_agentRole`), you could use conditional logic to redirect to the appropriate cover sheet:

### Option 1: Use JotForm Conditions
Set up conditions in JotForm to redirect to different URLs based on the agent role selection.

### Option 2: Create a Router Page
Create a simple HTML page that reads the agent role and redirects accordingly:

```javascript
// Example router logic
const agentRole = getUrlParameter('q102_agentRole');
let targetForm = 'buyer.html';

if (agentRole === 'Listing Agent') {
    targetForm = 'seller.html';
} else if (agentRole === 'Dual Agent') {
    targetForm = 'dual.html';
}

// Redirect with all parameters
window.location.href = targetForm + window.location.search;
```

---

## 📋 Setup Instructions

1. **Copy the appropriate URL** based on your needs
2. **Go to JotForm** → Settings → Thank You Page
3. **Select** "Redirect to an External Link"
4. **Paste** the URL
5. **Save** and test

### Testing Tips
- Start with just a few fields to ensure it works
- Add more fields gradually
- The integration fields (marked "for integration") are cleaner for this purpose
- Fields marked with `[full]` like phone numbers will include formatting

---

## 🎯 Quick Implementation

**For fastest setup, use this minimal URL with just the essential fields:**

```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&salePrice={q3_textbox_3}
```

This will populate:
- Property Address
- MLS Number
- Agent Name
- Sale Price

You can add more fields once you confirm these work correctly.