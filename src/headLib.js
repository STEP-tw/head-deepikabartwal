const slicer = function(inputfile,numberOfLines=10){
  if(inputfile.length<10){
    return inputfile.slice(0,inputfile.length-1);
  }
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
  if(!isNaN(parameter[0])&& parameter[0]!= "-"){
    return generateErrorText("nf"+parameter);
  }
  let integerList = parameter.split("").reduce(fetchNumber,"");
  let numberOfLines = +integerList;
  return numberOfLines;
}
const generateErrorText = function(wrongInput){
  let errorTexts = {};
  errorTexts["-n"] = "head: illegal line count --" +wrongInput.slice(2);
  errorTexts["-c"] = "head: illegal byte count --" +wrongInput.slice(2);
  errorTexts["missingFile"] = "head:" +wrongInput.slice(2) +": No such file or directory"
  return errorTexts[wrongInput.slice(0,2)];
}

const head = function(readFile,parameterList){
  let parametersToBeUsed = fetchParameters(parameterList);
  let numberOfArgument = parametersToBeUsed.length;
  if(numberOfArgument.length == 1){
    return(head(parametersToBeUsed[0]));
  }
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

module.exports = {
  slicer,
  processInputFile,
  fetchParameters,
  fetchNumberOfLines,
  fetchNumber,
  generateErrorText,
  head
}
