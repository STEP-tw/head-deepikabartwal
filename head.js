const head = require("./src/headLib.js").head;
const fs = require("fs");
const readFile = fs.readFileSync;
console.log(head(readFile,process.argv));


