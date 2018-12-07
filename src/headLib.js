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
  errorTexts["nf"] = "head: " +wrongInput.slice(2) +": No such file or directory"
  return errorTexts[wrongInput.slice(0,2)];
}

const fetchFileName = function(parameters){
  return parameters[parameters.length-1];
}
const parseArgs = (args)=>{
  const userInput = {};
  userInput.fileName = fetchFileName(args);
  userInput.numberOfLines = fetchNumberOfLines(args[0]);
  return userInput;
};
const head = function(fs,args){
  let {fileName,numberOfLines} = parseArgs(args);
  if(!fs.existsSync(fileName)){
    return generateErrorText("nf"+fileName);
  }
  let lines = fs.readFileSync(fileName,'utf-8').split("\n");
  if(numberOfLines==0||args.length==1){
    return take(lines,10).join("\n");
  }
  let lastCharacterIndex = args[0].length-1;
  return take(lines,numberOfLines).join("\n");
}

const createParasObject = function(option,count,filenames){
  return {option,count,filenames};
}

const validateOption = function(optionParaCandidate){
  return optionParaCandidate == "-n" || optionParaCandidate == "-c;"
}

const parseParasWithOption = function(parameters){
  if(validateOption(parameters[0])){
    return createParasObject(parameters[0],+parameters[1].slice(1),parameters.slice(2));
  }
  if(!isNaN(parameters[0].slice(1))){
    return createParasObject("-n",+parameters[0].slice(1),parameters.slice(1));
  }
  return createParasObject(parameters[0].slice(0,2),+parameters[0].slice(2),parameters.slice(1));
}

const parseParameters = function(parameters){
  if(parameters[0].startsWith("-")){
    return parseParasWithOption(parameters);
  }
  return createParasObject("-n","10",parameters);
}

module.exports = {
  createParasObject,
  fetchNumberOfLines,
  fetchNumber,
  createHeading,
  generateErrorText,
  parseParasWithOption,
  parseParameters,
  head
}
