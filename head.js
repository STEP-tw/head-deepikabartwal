const head = require("./src/headAndTail.js").head;
const fs = require("fs");
process.stdout.write(head(process.argv.slice(2), fs));
