const head = require("./src/headLib.js").head;
const fs = require("fs");
const readFile = fs.readFileSync;
const existsSync = fs.existsSync;
const arguments = process.argv.slice(2);
console.log(head(readFile,arguments,existsSync));


