const slicer = function(inputfile,numberOfLines=10){
  if(inputfile.length<10){
    return inputfile.slice(0,inputfile.length-1);
  }
  return inputfile.slice(0,numberOfLines);
}

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
  errorTexts["nf"] = "head:" +wrongInput.slice(2) +": No such file or directory"
  return errorTexts[wrongInput.slice(0,2)];
}

const fetchFileName = function(parameters){
  return parameters[parameters.length-1];
}

const head = function(readFile,parametersToBeUsed){
  let fileName = fetchFileName(parametersToBeUsed);
  let numberOfLines = fetchNumberOfLines(parametersToBeUsed[0]);
  let lines = readFile(fileName,'utf-8').split("\n");
  if(isNaN(numberOfLines)){
    let output = numberOfLines +"\n"+createHeading(fileName)+"\n"+ slicer(lines).join("\n");
    return output;
  }
  if(numberOfLines==0){
    return slicer(lines).join("\n");
  }
  let lastCharacterIndex = parametersToBeUsed[0].length-1;
  if(isNaN(parametersToBeUsed[0][lastCharacterIndex])){
      return generateErrorText(parametersToBeUsed[0])
  }

  return slicer(lines,numberOfLines).join("\n");
}


module.exports = {
  slicer,
  fetchNumberOfLines,
  fetchNumber,
  generateErrorText,
  head
}
