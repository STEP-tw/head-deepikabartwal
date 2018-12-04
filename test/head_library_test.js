const {
  head,
  outputGenerator,
  processInput
} = require("../src/head_library");

const {deepEqual,equal} = require("assert");

describe('head', function(){
  it('should return 10 lines if number of lines not mentioned', function(){
    let input = ["aimer","aquaTimez","yui","oneOkRock","flow","sketDance","egoist","angela","garnedilia","nanaMizuki"];
    let expected_output = input;
    deepEqual(head(input),expected_output);
  });
});

