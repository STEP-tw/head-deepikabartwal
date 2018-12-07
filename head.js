const head = require("./src/headLib.js").head;
const fs = require("fs");
const parameters = process.argv.slice(2);
console.log(head(fs,parameters));


