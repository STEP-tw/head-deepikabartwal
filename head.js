const head = require("./src/head_library.js").head;
const fs = require("fs");

const main = function(){
  let parameters = process.argv;

  console.log(head(fs,parameters));
}
main();


