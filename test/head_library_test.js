const {
  slicer,
  head,
  processInputFile,
  fetchNumberOfLines,
  fetchParameters
} = require("../src/head_library");

const {deepEqual,equal} = require("assert");

describe('slicer', function(){
  describe('for no input',function(){
    it('should return 10 lines', function(){
      let input = ["aimer","aquaTimez","yui","oneOkRock","flow","sketDance","egoist","angela","garnedilia","nanaMizuki"];
      let expected_output = input;
      deepEqual(slicer(input),expected_output);
    });
  });
  describe('for number of lines specified',function(){
    it('should return number of lines sepcified in argument',function(){
      let input = ["aimer","aquaTimez","yui","oneOkRock","flow","sketDance","egoist","angela","garnedilia","nanaMizuki"];
      let expected_output = input.slice(0,3);
      deepEqual(slicer(input,3),expected_output);
    });
  });
});

describe('processInput', function(){
  it('should change file to array form', function(){
    let file = "";
    file += "this is a test file.\n";
    file += "this is another line of test file.\n"
    file += "this is also another line of test file.\n"
    file += "i am just writing random lines\n";
    file += "this is ending of lines";
    let expected_output = file.split("\n");
    deepEqual(processInputFile(file),expected_output);
  });
});

describe('fetchParameters', function(){
  describe('for -n with numbers of lines provided',function(){
    it('should give array of required parameters',function(){
      let parametersList = ["users","file","-n5","testFile"];
      let expected_output = ["-n5","testFile"]
      deepEqual(fetchParameters(parametersList),expected_output);
    });
  });
  describe('for only numbers', function(){
    it('should give the array of required parameters', function(){
      let parametersList = ["users","file","5","testFile"];
      let expected_output = ["5","testFile"]
    });
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
