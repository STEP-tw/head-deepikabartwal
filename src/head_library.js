const slicer = function(inputfile,numberOfLines=10){
  return inputfile.slice(0,numberOfLines);
}

const processInputFile = function(file){
  let inputFile = file.split("\n");
  return inputFile;
}

const fetchNumberOfLines = function(parameter){
  let list = [];
  let integerList = parameter.split("").reduce((accumulator,x)=>{
    if(!isNaN(x)) {console.log(x); accumulator.push(x);}
    return accumulator},[]);
  let numberOfLines = +integerList.join("");
  return numberOfLines;
}

const head = function(fs,parameterList){
  let parametersToBeUsed = fetchParameters(parameterList);
  let filename = parametersToBeUsed[1];
  let numberOfLines = parametersToBeUsed[0];
  let file = fs.readFileSync(filename,'utf-8');
  let inputFile = processInputFile(file);
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
  head
}
