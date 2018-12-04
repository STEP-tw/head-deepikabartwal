const head = function(inputfile,numberOfLines=10){
  return inputfile.slice(0,numberOfLines);
}

const processInput = function(file){
  let inputFile = file.split("\n");
  return inputFile;
}

const outputGenerator = function(fs,filename){
  let file = fs.readFileSync(filename,'utf-8');
  let inputFile = processInput(file);
  return head(inputFile).join("\n");
}

module.exports = {
  head,
  processInput,
  outputGenerator
}
