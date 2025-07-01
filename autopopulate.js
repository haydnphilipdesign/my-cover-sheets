/**
 * JotForm Auto-Population Script for Cover Sheets
 * Populates form fields based on URL parameters matching JotForm Unique Names
 */

(function() {
    'use strict';
    
    /**
     * Parse URL parameters and return as an object
     */
    function getUrlParameters() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        
        for (const [key, value] of urlParams) {
            params[key] = decodeURIComponent(value);
        }
        
        return params;
    }
    
    /**
     * Sanitize input to prevent XSS attacks
     */
    function sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[<>\"'&]/g, function(match) {
                const escapeMap = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#x27;',
                    '&': '&amp;'
                };
                return escapeMap[match];
            })
            .trim();
    }
    
    /**
     * Populate text input fields
     */
    function populateTextField(fieldName, value) {
        const elements = document.querySelectorAll(`input[data-field="${fieldName}"]`);
        const sanitizedValue = sanitizeInput(value);
        
        elements.forEach(element => {
            if (element.type === 'text') {
                element.value = sanitizedValue;
            }
        });
    }
    
    /**
     * Populate checkbox fields (for septicType and waterSource)
     * Expects comma-separated values like "Septic,Well" or single values
     */
    function populateCheckboxField(fieldName, value) {
        // First, uncheck all checkboxes for this field
        const allCheckboxes = document.querySelectorAll(`input[data-field="${fieldName}"]`);
        allCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Parse the values (comma-separated or single value)
        const values = value.split(',').map(v => v.trim());
        
        // Check the matching checkboxes
        values.forEach(val => {
            const sanitizedVal = sanitizeInput(val);
            const checkbox = document.querySelector(`input[data-field="${fieldName}"][value="${sanitizedVal}"]`);
            if (checkbox && checkbox.type === 'checkbox') {
                checkbox.checked = true;
            }
        });
    }
    
    /**
     * Main population function
     */
    function populateFields() {
        const params = getUrlParameters();
        
        // Field mapping - defines which fields are checkboxes vs text
        const checkboxFields = ['septicType', 'waterSource'];
        
        // Iterate through all parameters and populate matching fields
        Object.keys(params).forEach(fieldName => {
            const value = params[fieldName];
            
            if (!value) return; // Skip empty values
            
            if (checkboxFields.includes(fieldName)) {
                populateCheckboxField(fieldName, value);
            } else {
                populateTextField(fieldName, value);
            }
        });
        
        // Log successful population for debugging
        console.log('Cover Sheet Auto-Population Complete:', Object.keys(params).length, 'parameters processed');
    }
    
    /**
     * Initialize auto-population when DOM is ready
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', populateFields);
        } else {
            populateFields();
        }
    }
    
    // Start the auto-population process
    init();
    
})();