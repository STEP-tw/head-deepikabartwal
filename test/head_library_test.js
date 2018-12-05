const {
  head,
  outputGenerator,
  processInputFile,
  processParameters
} = require("../src/head_library");

const {deepEqual,equal} = require("assert");

describe('head', function(){
  describe('for no input',function(){
    it('should return 10 lines', function(){
      let input = ["aimer","aquaTimez","yui","oneOkRock","flow","sketDance","egoist","angela","garnedilia","nanaMizuki"];
      let expected_output = input;
      deepEqual(head(input),expected_output);
    });
  });
  describe('for number of lines specified',function(){
    it('should return number of lines sepcified in argument',function(){
      let input = ["aimer","aquaTimez","yui","oneOkRock","flow","sketDance","egoist","angela","garnedilia","nanaMizuki"];
      let expected_output = input.slice(0,3);
      deepEqual(head(input,3),expected_output);
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

describe('processParameters', function(){
  it('should give array of required parameters',function(){
    let parametersList = ["users","file","-n5","testFile"];
    let expected_output = [5,"testFile"]
    deepEqual(processParameters(parametersList),expected_output);
  });
});
