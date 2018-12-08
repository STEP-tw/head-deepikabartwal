const {
  createArgsObject,
  parseParasWithOption,
  parseArgs,
  generateErrorText,
  fetchNumber,
  head,
  fetchNumberOfLines,
} = require("../src/headLib.js");
const take = require("../src/utilLib.js").take;

const {deepEqual,equal} = require("assert");

const fs = {};

fs.readFileSync = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
};

fs.existsSync = function(path){
  if(dummyFiles[path]==undefined) return false;
  return true;
}

const generateLines = function(numberOfLines){
  let line = [];
  for(let i = 1;i<=numberOfLines;i++){
    line.push(i);
  }
  return line.join("\n");
}

const dummyFiles={
  "tenLines.txt":generateLines(10),
  "fiveLines.txt":generateLines(5),
  "fifteenLines.txt":generateLines(15),
  "empty.txt":generateLines(0),
};

describe('take', function(){
  it('should return 10 lines by default', function(){
    let input = [1,2,3,4,5,6,7,8,9,10,11,12];
    let expected_output = input;
    deepEqual(take(input),expected_output);
  });
  it('should return number of lines specified in argument',function(){
    let input = [1,2,3,4,5,6,7,8,9,10];
    let expected_output = input.slice(0,3);
    deepEqual(take(input,3),expected_output);
  });
  it("should return same number of lines as input when number of lines specified is more than lines in input", function(){
    let input = [1,2,3,4,5,6,7,8,9,10,11,12];
    let expected_output = input;
    deepEqual(take(input,30),expected_output);
  });
});

describe('fetchNumberOfLines', function(){
  it('should give the number only when number is given with option specified', function(){
    deepEqual(fetchNumberOfLines("-n5"),5);
  });
  it('should return number when given with "-" only', function(){
    deepEqual(fetchNumberOfLines("-5"),5);
  });
  it('should return zero when no number is provided with parameter', function(){
    deepEqual(fetchNumberOfLines("-n"),0);
  });
});

describe('fetchNumber', function(){
  it('should give number in string form when argument contains number', function(){
    deepEqual(fetchNumber("","5"),'5');
  });
  it('should give empty string when a non number value is provided', function(){
    deepEqual(fetchNumber("","n"),'');
  });
});

describe('generateErrorText', function(){
  it('should return error for -n', function(){
    deepEqual(generateErrorText("-n10x"),"head: illegal line count --10x");
  });
});

let argv = text => text.split(" ");
describe('head', function(){
  describe("node head empty.txt",()=>{
    it('should give zero lines',()=>{
      equal(head(fs,argv('empty.txt')),'');
    })
  });
  describe("node head fifteenLines.text",()=>{
    it('should give 10 lines', function(){
      let tenLines = generateLines(10);
      equal(head(fs,argv('fifteenLines.txt')),tenLines);
    });
  });
  describe("node head fiveLines.txt",()=>{
    it('should give 5 lines',()=>{
      let fiveLines = generateLines(5);
      equal(head(fs,argv('fiveLines.txt')),fiveLines);
    });
  });

  describe("node head -5 tenLines.txt",()=>{
    it('should give 5 lines', function(){
      let fiveLines = generateLines(5);
      equal(head(fs,argv('-5 tenLines.txt')),fiveLines);
    });
  });
  describe("node head -n5 tenLines.txt",()=>{
    it('should return 5 lines', function(){
      let fiveLines = generateLines(5);
      deepEqual(head(fs,argv('-n5 tenLines.txt')),fiveLines);
    });
  });
  describe("node head missingFile.txt",()=>{
    it('should return error when missing file is given',function(){
      let errorMessage = "head: missingFile.txt: No such file or directory";
      deepEqual(head(fs,argv('missingFile.txt')),errorMessage);
    });
  });
  describe('node head fiveLines.txt fifteenLines.txt', function(){
    it('should give 5,10 lines of the files with title', function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'==> fifteenLines.txt <==',generateLines(10)].join('\n');
      equal(head(fs,argv('fiveLines.txt fifteenLines.txt')),expected_output);
    });
  });
});


describe('createArgsObject',function(){
  it('should return the object of parameters specified in arguments',function(){
    deepEqual(createArgsObject("-n",100,["testFile"]),{"option":"lines","count":100,"filenames":["testFile"]});
    deepEqual(createArgsObject("-c",12,["testfile","sampleFile","addFunction.js"]),{"option":"characters","count":12,"filenames":["testfile","sampleFile","addFunction.js"]});
  });
});

describe('parseParasWithOption',function(){
  it('should return the object of parameters when -n or -c are specified separately',function(){
    deepEqual(parseParasWithOption(["-n","-3","testfile"]),{"option":"lines","count":3,"filenames":["testfile"]});
  });
  it('should return the object of parameters with -n as option when only count is specified',function(){
    deepEqual(parseParasWithOption(["-3","testfile"]),{"option":"lines","count":3,"filenames":["testfile"]});
  });
  it('should return the object of parameters when -n or -c are specified with count',function(){
    deepEqual(parseParasWithOption(["-n7","testfile"]),{"option":"lines","count":7,"filenames":["testfile"]});
  });
});

describe('parseArgs',function(){
  describe('node head file.txt', function(){
    it('should return default parameter object when only file names is given',function(){
      deepEqual(parseArgs(argv('file.txt')),{'option':'lines','count':10,'filenames':['file.txt']});
    });
  });
  describe('node head -2 file.txt', function(){
    it('should return object with specified options',function(){
      deepEqual(parseArgs(argv('-2 testFile')),{'option':'lines','count':2,'filenames':['testFile']});
    });
  });
});

