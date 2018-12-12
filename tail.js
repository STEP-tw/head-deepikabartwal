const tail = require("./src/headLib.js").tail;
const fs = require("fs");
process.stdout.write(tail(fs,process.argv.slice(2)));



