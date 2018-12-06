const {
  generateErrorText,
  fetchNumber,
  take,
  head,
  fetchNumberOfLines,
} = require("../src/headLib");

const {deepEqual,equal} = require("assert");

const readFile = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
};

const existsSync = function(path){
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
    let expected_output = input.slice(0,10);
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

describe('head', function(){
  it('should give 10 lines of files as default', function(){
    let expected_output = generateLines(10);
    deepEqual(head(readFile,["fifteenLines.txt"]),expected_output);
  });
  it('should return the no of lines mentioned', function(){
    let parameters = ["-5","tenLines.txt"];
    let expected_output = generateLines(5);
    deepEqual(head(readFile,parameters),expected_output);
  });
  it('should return the number of lines mentioned with -n', function(){
    let parameters = ["-n5","tenLines.txt"];
    let expected_output = generateLines(5);
    deepEqual(head(readFile,parameters),expected_output);
  });
});
