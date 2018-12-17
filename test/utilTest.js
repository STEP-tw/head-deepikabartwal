const take = require("../src/util.js").take;

const { deepEqual, equal } = require("assert");

describe("take", function() {
  it("should return number of lines specified in argument", function() {
    let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expected_output = [1, 2, 3];
    deepEqual(take(input, 3), expected_output);
  });
  it("should return same number of lines as input when number of lines specified is more than lines in input", function() {
    let input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    deepEqual(take(input, 30), expectedOutput);
  });
});
