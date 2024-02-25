function formatstr(){
    const removeDiacritics = require("remove-diacritics");
var string = "tân bảng phong thần";

// Remove diacritics
var newString = removeDiacritics(string);

console.log("Original string: " + string);
console.log("String without diacritics: " + newString);

// Replace spaces with hyphens
var stringWithHyphens = newString.replace(/\s+/g, '-');

console.log("String with hyphens: " + stringWithHyphens);

}