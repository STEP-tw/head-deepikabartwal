const head = require("./src/headLib.js").head;
const fs = require("fs");
const readFile = fs.readFileSync;
const arguments = process.argv.slice(2);
console.log(head(readFile,arguments));


