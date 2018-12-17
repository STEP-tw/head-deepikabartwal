const { take, last } = require("../src/util.js");

const assert = require("assert");

describe("take", function() {
  it("should return number of lines specified in argument from beginning", function() {
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expectedOutput = [1, 2, 3];
    let actual = take(numberList, 3);
    assert.deepEqual(actual, expectedOutput);
  });
  it("should return same number of lines as input when number of lines specified is more than lines in input", function() {
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let actual = take(numberList, 30);
    assert.deepEqual(actual, expectedOutput);
  });
});

describe("last", function() {
  it("should return number of lines specified in argument from end", function() {
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expectedOutput = [6, 7, 8, 9, 10];
    let actual = last(numberList, 5);
    assert.deepEqual(actual, expectedOutput);
  });
  it("should return as many lines as files contain when count is larger than the number of files", function() {
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let actual = last(numberList, 15);
    assert.deepEqual(actual, expectedOutput);
  });
});
