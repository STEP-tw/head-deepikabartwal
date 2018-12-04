const {
  head,
  outputGenerator,
  processInput
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

