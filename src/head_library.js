const slicer = function(inputfile,numberOfLines=10){
  return inputfile.slice(0,numberOfLines);
}

const processInputFile = function(file){
  let inputFile = file.split("\n");
  return inputFile;
}

const fetchNumber = function(string,character){
  if(!isNaN(character)){
    string = string+character;
  }
  return string;
}

const fetchNumberOfLines = function(parameter){
  let list = [];
  let integerList = parameter.split("").reduce(fetchNumber,"");
  let numberOfLines = +integerList;
  return numberOfLines;
}
const generateErrorText = function(wrongInput){
  let errorTexts = {};
  errorTexts["-n"] = "head: illegal line count --" +wrongInput.slice(2);
  errorTexts["-c"] = "head: illegal byte count --" +wrongInput.slice(2);
  return errorTexts[wrongInput.slice(0,2)];
}

const head = function(readFile,parameterList){
  let parametersToBeUsed = fetchParameters(parameterList);
  let filenameIndex = parametersToBeUsed.length-1;
  let filename = parametersToBeUsed[filenameIndex];
  let lastCharacterIndex = parametersToBeUsed[0].length-1;
  let numberOfLines = fetchNumberOfLines(parametersToBeUsed[0]);
  let file = readFile(filename,'utf-8');
  let inputFile = processInputFile(file);
  if(numberOfLines==0){
    return slicer(inputFile).join("\n");
  }
  if(isNaN(parametersToBeUsed[0][lastCharacterIndex])){
      return generateErrorText(parametersToBeUsed[0])
  }

  return slicer(inputFile,numberOfLines).join("\n");
}

const fetchParameters = function(parameterList){
  let requiredParameters = parameterList.slice(2);
  return requiredParameters;
}

//  let numberOfLines = +requiredParameters[0].slice(2);
//  let fileName = requiredParameters[1];
//  let parametersToBeUsed = [];
//  parametersToBeUsed.push(numberOfLines);
//  parametersToBeUsed.push(fileName);
//  return parametersToBeUsed;
//}
module.exports = {
  slicer,
  processInputFile,
  fetchParameters,
  fetchNumberOfLines,
  fetchNumber,
  generateErrorText,
  head
}
