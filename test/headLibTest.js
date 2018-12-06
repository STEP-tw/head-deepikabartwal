const {
  generateErrorText,
  fetchNumber,
  slicer,
  head,
  fetchNumberOfLines,
} = require("../src/headLib");

const {deepEqual,equal} = require("assert");

const readFile = function(fileName,encoding){
  return dummyFiles[fileName];
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

describe('slicer', function(){
    it('should return 10 lines for no number of lines  specified', function(){
      let input = [1,2,3,4,5,6,7,8,9,10];
      let expected_output = input;
      deepEqual(slicer(input),expected_output);
  });
    it('should return number of lines specified in argument',function(){
      let input = [1,2,3,4,5,6,7,8,9,10];
      let expected_output = input.slice(0,3);
      deepEqual(slicer(input,3),expected_output);
  });
});

describe('fetchNumberOfLines', function(){
  describe('when number is given with -n',function(){
    it('should give the number only', function(){
      let parameter = "-n5";
      let expected_output = 5;
      deepEqual(fetchNumberOfLines(parameter),expected_output);
    });
  });
  describe('when number is given as -5', function(){
    it('should return number', function(){
      deepEqual(fetchNumberOfLines("-5"),5);
    });
  });
  describe('when there is no number given in parameter', function(){
    it('should return zero', function(){
      deepEqual(fetchNumberOfLines("-n"),0);
    });
  });
});

describe('fetchNumber', function(){
  describe('when number is provided as argument',function(){
    it('should give number in string form', function(){
      deepEqual(fetchNumber("",5),'5');
    });
  });
  describe('when a non number value is provided', function(){
    it('should give empty string', function(){
      deepEqual(fetchNumber("","n"),'');
    });
  });
});

describe('generateErrorText', function(){
  describe('for -n',function(){
    it('should return error for -n', function(){
      deepEqual(generateErrorText("-n10x"),"head: illegal line count --10x");
    });
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
