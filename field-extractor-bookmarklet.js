/**
 * JotForm Field Extractor Bookmarklet
 * 
 * To use this as a bookmarklet:
 * 1. Copy the entire minified code below
 * 2. Create a new bookmark in your browser
 * 3. Set the URL as: javascript:(paste code here)
 * 4. Visit any JotForm page and click the bookmark
 */

// Minified version for bookmarklet
const bookmarkletCode = `javascript:(function(){fetch('https://haydnphilipdesign.github.io/my-cover-sheets/field-extractor.js').then(r=>r.text()).then(code=>eval(code)).catch(()=>{alert('Make sure you have internet connection and are on a JotForm page!')})})();`;

console.log('📖 Bookmarklet Code (copy this entire line):');
console.log(bookmarkletCode);

// Alternative self-contained bookmarklet (no external dependencies)
const selfContainedBookmarklet = `javascript:(function(){
    const fields=[];
    document.querySelectorAll('input[name],select[name],textarea[name]').forEach(i=>{
        const n=i.getAttribute('name');
        if(n&&!n.includes('_')&&n.length>2){
            fields.push(n);
        }
    });
    
    if(fields.length===0){
        alert('No fields found! Make sure you are on a JotForm page.');
        return;
    }
    
    const params=fields.map(f=>'propertyAddress={'+f+'}').join('&');
    const url='https://haydnphilipdesign.github.io/my-cover-sheets/buyer.html?'+params;
    
    const w=window.open('','_blank','width=800,height=600');
    w.document.write('<h2>JotForm Fields Found:</h2><ul>');
    fields.forEach(f=>w.document.write('<li>'+f+'</li>'));
    w.document.write('</ul><h3>Generated URL:</h3><textarea style="width:100%;height:100px">'+url+'</textarea><p>Copy this URL and paste it into JotForm Settings > Thank You Page > Redirect URL</p>');
})();`;

console.log('\n📖 Self-Contained Bookmarklet (no internet required):');
console.log(selfContainedBookmarklet);

console.log('\n📋 How to create bookmarklet:');
console.log('1. Copy one of the codes above');
console.log('2. Create new bookmark in your browser');
console.log('3. Paste code as the URL');
console.log('4. Name it "Extract JotForm Fields"');
console.log('5. Click it on any JotForm page!');

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bookmarkletCode,
        selfContainedBookmarklet
    };
}