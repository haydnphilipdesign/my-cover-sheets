// Simple JotForm Field Extractor - Copy and paste this entire script
(function() {
    console.clear();
    console.log('🔍 JotForm Field Extractor - Simple Version');
    console.log('==========================================\n');
    
    var fields = [];
    var fieldElements = document.querySelectorAll('input[name], select[name], textarea[name]');
    
    console.log('Found ' + fieldElements.length + ' form elements');
    
    for (var i = 0; i < fieldElements.length; i++) {
        var element = fieldElements[i];
        var name = element.getAttribute('name');
        var type = element.type || element.tagName.toLowerCase();
        
        // Skip system fields and very short names
        if (name && name.length > 2 && !name.includes('_') && !name.includes('submit')) {
            fields.push({
                name: name,
                type: type,
                id: element.id || 'no-id'
            });
        }
    }
    
    // Remove duplicates
    var uniqueFields = [];
    var seen = {};
    for (var j = 0; j < fields.length; j++) {
        if (!seen[fields[j].name]) {
            seen[fields[j].name] = true;
            uniqueFields.push(fields[j]);
        }
    }
    
    console.log('\n📋 EXTRACTED FIELDS (' + uniqueFields.length + ' found):');
    console.log('================================');
    
    for (var k = 0; k < uniqueFields.length; k++) {
        var field = uniqueFields[k];
        console.log((k + 1) + '. ' + field.name + ' (' + field.type + ')');
    }
    
    // Generate basic URL for buyer form
    var params = [];
    var commonMappings = {
        'property': 'propertyAddress',
        'address': 'propertyAddress',
        'mls': 'mlsNumber',
        'agent': 'agentName',
        'price': 'salePrice',
        'contract': 'contractDate',
        'acceptance': 'acceptanceDate'
    };
    
    console.log('\n🔗 SUGGESTED URL PARAMETERS:');
    console.log('=============================');
    
    for (var m = 0; m < uniqueFields.length; m++) {
        var fieldName = uniqueFields[m].name;
        var lowerName = fieldName.toLowerCase();
        var mappedTo = null;
        
        // Check for common mappings
        for (var mapping in commonMappings) {
            if (lowerName.indexOf(mapping) !== -1) {
                mappedTo = commonMappings[mapping];
                break;
            }
        }
        
        if (mappedTo) {
            params.push(mappedTo + '={' + fieldName + '}');
            console.log('✓ ' + fieldName + ' → ' + mappedTo);
        } else {
            console.log('? ' + fieldName + ' → (no mapping - you can add manually)');
        }
    }
    
    if (params.length > 0) {
        var baseUrl = 'https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html';
        var fullUrl = baseUrl + '?' + params.join('&');
        
        console.log('\n🚀 COPY THIS URL FOR JOTFORM:');
        console.log('=============================');
        console.log(fullUrl);
        console.log('\n📋 Instructions:');
        console.log('1. Copy the URL above');
        console.log('2. Go to JotForm → Settings → Thank You Page');
        console.log('3. Select "Redirect to an External Link"');
        console.log('4. Paste the URL');
        console.log('5. Save and test!');
    } else {
        console.log('\n⚠️  No common fields detected. Here are your field names:');
        for (var n = 0; n < uniqueFields.length; n++) {
            console.log('- ' + uniqueFields[n].name);
        }
        console.log('\nYou can manually create a URL like:');
        console.log('https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?propertyAddress={' + (uniqueFields[0] ? uniqueFields[0].name : 'yourFieldName') + '}&mlsNumber={yourMlsField}');
    }
    
    return uniqueFields;
})();