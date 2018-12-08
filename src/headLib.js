const take = require("./utilLib.js").take;


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

const parseArgs = function(args){
  if(args[0].startsWith("-")){
    return parseParasWithOption(args);
  }
  return createArgsObject("-n","10",args);
}

const head = function(fs,args){
  let {option,count,filenames} = parseArgs(args);
  const getLines = function(path){
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    let lines = fs.readFileSync(path,'utf-8').split("\n");
    return take(lines,count).join("\n");
  }
  const getLineWithHeadings = function(path){
    let heading = "==> "+path+" <==";
    return heading + "\n" + getLines(path);
  }
  if(filenames.length>1){
    return filenames.map(getLineWithHeadings).join("\n");
  }
  return filenames.map(getLines).join("\n");
}

const createArgsObject = function(type,count,filenames){
  let option = 'lines';
  if(type == '-c'){
    option = 'characters';
  }
  return {option,count,filenames};
}

const validateOption = function(optionParaCandidate){
  return optionParaCandidate == "-n" || optionParaCandidate == "-c;"
}

const parseParasWithOption = function(parameters){
  if(validateOption(parameters[0])){
    return createArgsObject(parameters[0],+parameters[1].slice(1),parameters.slice(2));
  }
  if(!isNaN(parameters[0].slice(1))){
    return createArgsObject("-n",+parameters[0].slice(1),parameters.slice(1));
  }
  return createArgsObject(parameters[0].slice(0,2),+parameters[0].slice(2),parameters.slice(1));
}

module.exports = {
  createArgsObject,
  fetchNumberOfLines,
  fetchNumber,
  generateErrorText,
  parseParasWithOption,
  parseArgs,
  head
}
