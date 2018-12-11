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

const separator= {
  'line':'\n',
  'byte':''
}

const invalidCount = function(countArg){
  return isNaN(countArg - 0)||countArg<1;
}

const head = function(fs,args){
  let {option,count,filenames} = parseArgs(args);
  let delim = separator[option];
  if(invalidCount(count)){
    return "head: illegal "+option+" count -- "+count;
  }
  const getContent = function(path){
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    let lines = fs.readFileSync(path,'utf-8').split(delim);
    return take(lines,+count).join(delim);
  }
  const getContentWithHeadings = function(path){
    let heading = "==> "+path+" <==";
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    return heading + "\n" + getContent(path);node
  }
  if(filenames.length>1){
      return filenames.map(getContentWithHeadings).join('\n');
  }
  return filenames.map(getContent).join(delim);
}

const createArgsObject = function(type,count,filenames){
  let option = 'line';
  if(type == '-c'){
    option = 'byte';
  }
  return {option,count,filenames};
}

const validateOption = function(optionParaCandidate){
  return optionParaCandidate == "-n" || optionParaCandidate == "-c";
}

const parseArgsWithOption = function(args){
  if(validateOption(args[0])){
    return createArgsObject(args[0],args[1],args.slice(2));
  }
  if(!isNaN(args[0].slice(1))){
      return createArgsObject("-n",args[0].slice(1),args.slice(1));
  }
  return createArgsObject(args[0].slice(0,2),args[0].slice(2),args.slice(1));
}

const tail = function(fs,args){
  let {option,count,filenames} = parseArgs(args);
  let delim = separator[option];
  if(isNaN(count)){
    return "head: illegal "+option+" count -- "+count;
  }
  const getContent = function(path){
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    let lines = fs.readFileSync(path,'utf-8').split(delim).reverse();
        return take(lines,Math.abs(count)).reverse().join(delim);
  }
  const getContentWithHeadings = function(path){
    let heading = "==> "+path+" <==";
    if(!fs.existsSync(path)){
      return generateErrorText("nf"+path);
    }
    return heading + "\n" + getContent(path);node
  }
  if(filenames.length>1){
      return filenames.map(getContentWithHeadings).join('\n');
  }
  return filenames.map(getContent).reverse().join(delim);
}


module.exports = {
  createArgsObject,
  generateErrorText,
  parseArgsWithOption,
  parseArgs,
  head,
  tail
}

