const tail = require("./src/headAndTail.js").tail;
const fs = require("fs");
process.stdout.write(tail(fs,process.argv.slice(2)));



