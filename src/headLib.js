const take = require("./utilLib.js").take;


const generateErrorText = function(wrongInput){
  let errorTexts = {};
  errorTexts["-n"] = "head: illegal line count --" +wrongInput.slice(2);
  errorTexts["-c"] = "head: illegal byte count --" +wrongInput.slice(2);
  errorTexts["nf"] = "head: " +wrongInput.slice(2) +": No such file or directory"
  return errorTexts[wrongInput.slice(0,2)];
}

const parseArgs = function(args){
  if(args[0].startsWith("-")){
    return parseArgsWithOption(args);
  }
  return createArgsObject("-n","10",args);
}

const delimiter = {
  'lines':'\n',
  'characters':''
}

const validateCount = function(countArg){
  return countArg > 0 && !isNaN(countArg) 
}

const head = function(fs,args){
  let {option,count,filenames} = parseArgs(args);
  let delim = delimiter[option];
  if(!validateCount(count)){
    return "head: illegal line count -- "+count;
  }
  const getContent = function(path){
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    let lines = fs.readFileSync(path,'utf-8').split(delim);
    return take(lines,count).join(delim);
  }
  const getContentWithHeadings = function(path){
    let heading = "==> "+path+" <==";
    return heading + "\n" + getContent(path);node
  }
  if(filenames.length>1){
      return filenames.map(getContentWithHeadings).join('\n');
  }
  return filenames.map(getContent).join(delim);
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

const parseArgsWithOption = function(args){
  if(validateOption(args[0])){
    return createArgsObject(args[0],+args[1],args.slice(2));
  }
  if(!isNaN(args[0].slice(1))){
      return createArgsObject("-n",Math.abs(args[0]),args.slice(1));
  }
  return createArgsObject(args[0].slice(0,2),+args[0].slice(2),args.slice(1));
}

module.exports = {
  createArgsObject,
  generateErrorText,
  parseArgsWithOption,
  parseArgs,
  head
}

