const head = require("./src/headLib.js").head;
const fs = require("fs");
process.stdout.write(head(fs,process.argv.slice(2)));


