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

const dummyFiles={};
dummyFiles["testFile"] = "ram\n";
dummyFiles["testFile"] += "shyam\n";
dummyFiles["testFile"] += "seeta\n";
dummyFiles["testFile"] += "geeta\n";
dummyFiles["testFile"] += "radha\n";
dummyFiles["testFile"] += "athul\n";
dummyFiles["testFile"] += "arif\n";
dummyFiles["testFile"] += "keerthy\n";
dummyFiles["testFile"] += "reshmi\n";
dummyFiles["testFile"] += "pichiPuli\n";
dummyFiles["testFile"] += "sai ganesh\n";
dummyFiles["testFile"] += "leela";

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
  describe('for default inputs',function(){
    it('should give 10 lines of files as default', function(){
      let expected_output = "ram\n";
      expected_output += "shyam\n";
      expected_output += "seeta\n";
      expected_output += "geeta\n";
      expected_output += "radha\n";
      expected_output += "athul\n";
      expected_output += "arif\n";
      expected_output += "keerthy\n";
      expected_output += "reshmi\n";
      expected_output += "pichiPuli";
      deepEqual(head(readFile,["testFile"]),expected_output);
    });
  });
  describe('for only number of lines provided', function(){
    it('should return the no of lines mentioned', function(){
      let inputString = "node ./head.js -5 testFile";
      let parameters = inputString.split(" ").slice(2);
      let expected_output = "ram\n";
      expected_output += "shyam\n";
      expected_output += "seeta\n";
      expected_output += "geeta\n";
      expected_output += "radha";
      deepEqual(head(readFile,parameters),expected_output);
    });
  });
  describe('for number of lines provided with -n', function(){
    it('should return the number of lines mentioned with -n', function(){
      let inputString = "node ./head.js -n5 testFile";
      let parameters = inputString.split(" ").slice(2);
      let expected_output = "ram\n";
      expected_output += "shyam\n";
      expected_output += "seeta\n";
      expected_output += "geeta\n";
      expected_output += "radha";
      deepEqual(head(readFile,parameters),expected_output);
    });
  });
});
