const head = function(inputfile,numberOfLines=10){
  return inputfile.slice(0,numberOfLines);
}

const processInputFile = function(file){
  let inputFile = file.split("\n");
  return inputFile;
}

const outputGenerator = function(fs,parameterList){
  let parametersToBeUsed = processParameters(parameterList);
  let filename = parametersToBeUsed[1];
  let numberOfLines = parametersToBeUsed[0];
  let file = fs.readFileSync(filename,'utf-8');
  let inputFile = processInputFile(file);
  return head(inputFile,numberOfLines).join("\n");
}

const processParameters = function(parameterList){
  let requiredParameters = parameterList.slice(2);
  let numberOfLines = +requiredParameters[0].slice(2);
  let fileName = requiredParameters[1];
  let parametersToBeUsed = [];
  parametersToBeUsed.push(numberOfLines);
  parametersToBeUsed.push(fileName);
  return parametersToBeUsed;
}
module.exports = {
  head,
  processInputFile,
  processParameters,
  outputGenerator
}
