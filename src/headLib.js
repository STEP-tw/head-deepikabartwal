const take = require("./utilLib.js").take;

const createHeading = function(fileName){
  return "==> "+fileName+" <==";
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
  errorTexts["nf"] = "head:" +wrongInput.slice(2) +": No such file or directory"
  return errorTexts[wrongInput.slice(0,2)];
}

const fetchFileName = function(parameters){
  return parameters[parameters.length-1];
}

const head = function(readFile,parametersToBeUsed,existsSync){
  let fileName = fetchFileName(parametersToBeUsed);
  let numberOfLines = fetchNumberOfLines(parametersToBeUsed[0]);
  if(!existsSync(fileName)){
    return generateErrorText("nf"+fileName);
  }
  let lines = readFile(fileName,'utf-8').split("\n");
  if(numberOfLines==0||parametersToBeUsed.length==1){
    return take(lines,10).join("\n");
  }
  let lastCharacterIndex = parametersToBeUsed[0].length-1;
  if(isNaN(parametersToBeUsed[0][lastCharacterIndex])){
      return generateErrorText(parametersToBeUsed[0])
  }

  return take(lines,numberOfLines).join("\n");
}


module.exports = {
  fetchNumberOfLines,
  fetchNumber,
  generateErrorText,
  head
}
