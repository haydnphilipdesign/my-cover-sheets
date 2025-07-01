# 🧪 Test URLs with Fake Data

**Click these URLs to see exactly how your JotForm data will populate the cover sheets!**

---

## 🏠 **Buyer's Agent Cover Sheet Test**

**Test URL with complete fake data:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress=123%20Main%20Street%20Stroudsburg%20PA%2018360&mlsNumber=MLS12345&agentName=Sarah%20Johnson&contractDate=01/15/2024&salePrice=450000&acceptanceDate=01/16/2024&commissionSeller=3&commissionBuyer=2.5&totalCommissionToKW=4.5&referralDuePercent=10&referralTo=ABC%20Realty&closingDate=03/01/2024&buyerName=John%20%26%20Mary%20Smith&sellerName=Robert%20Wilson
```

**[👆 CLICK TO TEST BUYER FORM](https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress=123%20Main%20Street%20Stroudsburg%20PA%2018360&mlsNumber=MLS12345&agentName=Sarah%20Johnson&contractDate=01/15/2024&salePrice=450000&acceptanceDate=01/16/2024&commissionSeller=3&commissionBuyer=2.5&totalCommissionToKW=4.5&referralDuePercent=10&referralTo=ABC%20Realty&closingDate=03/01/2024&buyerName=John%20%26%20Mary%20Smith&sellerName=Robert%20Wilson)**

**What you should see populated:**
- ✅ Property: `123 Main Street Stroudsburg PA 18360`
- ✅ MLS#: `MLS12345`
- ✅ Agent: `Sarah Johnson`
- ✅ Contract Date: `01/15/2024`
- ✅ Price: `450000`
- ✅ Acceptance Date: `01/16/2024`
- ✅ Commission Paid by Seller: `3`
- ✅ Commission Paid by Buyer: `2.5`
- ✅ Total Commission to KW: `4.5`
- ✅ Referral Due: `10`%
- ✅ TO: `ABC Realty`
- ✅ Closing Date: `03/01/2024`
- ✅ Buyer: `John & Mary Smith`
- ✅ Seller: `Robert Wilson`

---

## 🏢 **Dual Agent Cover Sheet Test**

**Test URL with complete fake data:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/dual.html?propertyAddress=456%20Oak%20Avenue%20Pocono%20Pines%20PA%2018350&mlsNumber=MLS67890&agentName=Michael%20Davis&contractDate=02/01/2024&salePrice=375000&acceptanceDate=02/02/2024&totalCommissionToKW=6&referralDuePercent=15&closingDate=04/15/2024&buyerName=Jennifer%20Thompson&sellerName=David%20%26%20Lisa%20Brown
```

**[👆 CLICK TO TEST DUAL FORM](https://haydnphilipdesign.github.io/my-cover-sheets/dual.html?propertyAddress=456%20Oak%20Avenue%20Pocono%20Pines%20PA%2018350&mlsNumber=MLS67890&agentName=Michael%20Davis&contractDate=02/01/2024&salePrice=375000&acceptanceDate=02/02/2024&totalCommissionToKW=6&referralDuePercent=15&closingDate=04/15/2024&buyerName=Jennifer%20Thompson&sellerName=David%20%26%20Lisa%20Brown)**

**What you should see populated:**
- ✅ Property: `456 Oak Avenue Pocono Pines PA 18350`
- ✅ MLS#: `MLS67890`
- ✅ Agent: `Michael Davis`
- ✅ Contract Date: `02/01/2024`
- ✅ Price: `375000`
- ✅ Acceptance Date: `02/02/2024`
- ✅ Commission: `6`
- ✅ Referral Due: `15`%
- ✅ Closing Date: `04/15/2024`
- ✅ Buyer: `Jennifer Thompson`
- ✅ Seller: `David & Lisa Brown`

---

## 🏡 **Seller's Agent Cover Sheet Test**

**Test URL with complete fake data:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/seller.html?propertyAddress=789%20Pine%20Drive%20East%20Stroudsburg%20PA%2018301&mlsNumber=MLS54321&agentName=Jessica%20Rodriguez&contractDate=01/20/2024&salePrice=625000&acceptanceDate=01/21/2024&referralDuePercent=12&referralTo=XYZ%20Properties&buyerName=Mark%20%26%20Susan%20Garcia&sellerName=Thomas%20Anderson
```

**[👆 CLICK TO TEST SELLER FORM](https://haydnphilipdesign.github.io/my-cover-sheets/seller.html?propertyAddress=789%20Pine%20Drive%20East%20Stroudsburg%20PA%2018301&mlsNumber=MLS54321&agentName=Jessica%20Rodriguez&contractDate=01/20/2024&salePrice=625000&acceptanceDate=01/21/2024&referralDuePercent=12&referralTo=XYZ%20Properties&buyerName=Mark%20%26%20Susan%20Garcia&sellerName=Thomas%20Anderson)**

**What you should see populated:**
- ✅ Property: `789 Pine Drive East Stroudsburg PA 18301`
- ✅ MLS#: `MLS54321`
- ✅ Agent: `Jessica Rodriguez`
- ✅ Contract Date: `01/20/2024`
- ✅ Price: `625000`
- ✅ Acceptance Date: `01/21/2024`
- ✅ Referral Due: `12`%
- ✅ TO: `XYZ Properties`
- ✅ Buyer: `Mark & Susan Garcia`
- ✅ Seller: `Thomas Anderson`

---

## 🔀 **Smart Router Test**

**Test URL that automatically routes based on agent role:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress=321%20Elm%20Court%20Bushkill%20PA%2018324&mlsNumber=MLS99999&agentName=Robert%20Kim&contractDate=03/05/2024&salePrice=525000&acceptanceDate=03/06/2024&commissionSeller=2.5&commissionBuyer=3&totalCommissionToKW=5.5&referralDuePercent=8&referralTo=Premier%20Realty&closingDate=05/10/2024&buyerName=Amanda%20Mitchell&sellerName=Steven%20%26%20Carol%20Lee&q102_agentRole=Dual%20Agent
```

**[👆 CLICK TO TEST ROUTER (Dual Agent)](https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress=321%20Elm%20Court%20Bushkill%20PA%2018324&mlsNumber=MLS99999&agentName=Robert%20Kim&contractDate=03/05/2024&salePrice=525000&acceptanceDate=03/06/2024&commissionSeller=2.5&commissionBuyer=3&totalCommissionToKW=5.5&referralDuePercent=8&referralTo=Premier%20Realty&closingDate=05/10/2024&buyerName=Amanda%20Mitchell&sellerName=Steven%20%26%20Carol%20Lee&q102_agentRole=Dual%20Agent)**

**What should happen:**
1. ⏳ Loading screen appears: "Detected: Dual Agent"
2. 🔀 Automatically redirects to dual.html
3. ✅ All data populates in the dual agent form

---

## 🧪 **Testing Different Agent Roles**

### Test Router with "Buyer's Agent":
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress=555%20Maple%20Lane&agentName=Test%20Agent&q102_agentRole=Buyer%27s%20Agent
```
**Should route to:** `buyer.html`

### Test Router with "Listing Agent":
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress=666%20Cedar%20Ave&agentName=Test%20Agent&q102_agentRole=Listing%20Agent
```
**Should route to:** `seller.html`

### Test Router with "Dual Agent":
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress=777%20Birch%20St&agentName=Test%20Agent&q102_agentRole=Dual%20Agent
```
**Should route to:** `dual.html`

---

## 📝 **Testing Checklist**

**For each test URL above:**

1. **Click the link** ✅
2. **Check console** (F12) for auto-population logs ✅
3. **Verify fields populate** with the expected data ✅
4. **Print preview** to ensure layout looks correct ✅
5. **Test on mobile** if possible ✅

**Expected Console Output:**
```
Cover Sheet Auto-Population Complete: X parameters processed
```

---

## 🔧 **JotForm Integration Test URLs**

**These URLs use your actual JotForm field IDs:**

### Buyer Form (JotForm Fields):
```
https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&commissionSeller={q20_textbox_20}&commissionBuyer={q71_commissionPaid}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}
```

### Smart Router (JotForm Fields):
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&commissionSeller={q20_textbox_20}&commissionBuyer={q71_commissionPaid}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}&q102_agentRole={q102_agentRole}
```

---

## 🎯 **What to Copy for JotForm**

**Use this URL in JotForm Settings → Thank You Page → Redirect:**
```
https://haydnphilipdesign.github.io/my-cover-sheets/router.html?propertyAddress={q2_textbox_2}&mlsNumber={q15_textbox_15}&agentName={q58_agentName}&contractDate={q103_executionDate}&salePrice={q3_textbox_3}&acceptanceDate={q103_executionDate}&commissionSeller={q20_textbox_20}&commissionBuyer={q71_commissionPaid}&totalCommissionToKW={q16_textbox_16}&referralDuePercent={q25_textbox_25}&referralTo={q23_textbox_23}&closingDate={q104_closingDate104}&buyerName={q158_seller1158}&sellerName={q111_seller1}&q102_agentRole={q102_agentRole}
```

**This single URL will:**
- ✅ Auto-detect agent role
- ✅ Route to correct form type
- ✅ Populate all available fields
- ✅ Handle buyer/seller names
- ✅ Work for all transaction types