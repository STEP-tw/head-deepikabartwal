const {
  createArgsObject,
  parseArgsWithOption,
  parseArgs,
  head,
  tail
} = require('../src/headAndTail.js');
const assert = require('assert');

const fs = {};
fs.readFileSync = function(path, encoding) {
  if (encoding != 'utf-8') return;
  const content = dummyFiles[path];
  if (content == undefined) throw 'no such file ' + path;
  return content;
};
fs.existsSync = function(path) {
  const dummyFiles = {
    'tenLines.txt': generateLines(10),
    'fiveLines.txt': generateLines(5),
    'fifteenLines.txt': generateLines(15),
    'empty.txt': generateLines(0)
  };
  if (dummyFiles[path] == undefined) return false;
  return true;
};

const generateLines = function(numberOfLines) {
  let line = [];
  for (let i = 1; i <= numberOfLines; i++) {
    line.push(i);
  }
  return line.join('\n');
};
const generateLinesFrom = function(startingNum, limit) {
  let arrayLength = limit + 1 - startingNum;
  return new Array(arrayLength)
    .fill(0)
    .map((x, y) => y + startingNum)
    .join('\n');
};

const split = text => text.split(' ');

const dummyFiles = {
  'tenLines.txt': generateLines(10),
  'fiveLines.txt': generateLines(5),
  'fifteenLines.txt': generateLines(15),
  'empty.txt': generateLines(0)
};

describe('head', function() {
  describe('for default values of single file', () => {
    it("'node head empty.txt' should give zero lines", () => {
      let args = ['empty.txt'];
      let actualOutput = head(args, fs);
      assert.equal(actualOutput, '');
    });
    it('node head fifteenLines.text should give 10 lines of given file', function() {
      let actual = head(['fifteenLines.txt'], fs);
      let tenLines = generateLines(10);
      assert.equal(actual, tenLines);
    });
  });

  describe('for default values for smaller file', () => {
    it('node head fiveLines.txt should give 5 lines of small files', () => {
      let actual = head(['fiveLines.txt'], fs);
      let fiveLines = [1, 2, 3, 4, 5].join('\n');
      assert.equal(actual, fiveLines);
    });
  });
  describe('for argument greater than number of lines in file', () => {
    it('node head -10 fiveLines.txt should return 5 lines of the given file', () => {
      let actual = head(split('-10 fiveLines.txt'), fs);
      let fiveLines = [1, 2, 3, 4, 5].join('\n');
      assert.equal(actual, fiveLines);
    });
  });
  describe('for number of lines specifi', () => {
    it('node head -5 tenLines.txt should give 5 lines of given file', function() {
      let actual = head(split('-5 tenLines.txt'), fs);
      let fiveLines = generateLines(5);
      assert.equal(actual, fiveLines);
    });
    it('node head -n5 tenLines.txt should return 5 lines given file', function() {
      let actual = head(split('-n5 tenLines.txt'), fs);
      let fiveLines = generateLines(5);
      assert.equal(actual, fiveLines);
    });
  });

  describe('node head -0 tenLines.txt', function() {
    it('should give illegal line count error for zero', function() {
      let actual = head(split('-0 tenLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- 0';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head missingFile.txt', () => {
    it('should return missing error when missing file is given', function() {
      let actual = head(split('missingFile.txt'), fs);
      let errorMessage = 'head: missingFile.txt: No such file or directory';
      assert.equal(actual, errorMessage);
    });
  });

  describe('node head 3 fiveLines.txt', function() {
    it('should return missing file error for 3 and return 5 lines of second one', function() {
      let actual = head(split('3 fiveLines.txt'), fs);
      let expectedOutput = [
        'head: 3: No such file or directory',
        '==> fiveLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head fiveLines.txt fifteenLines.txt', function() {
    it('should give 5,10 lines of the files with title', function() {
      let actual = head(split('fiveLines.txt fifteenLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        '==> fifteenLines.txt <==',
        generateLines(10)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n5 fiveLines.txt fifteenLines.txt', function() {
    it('should give 5 lines of both files with title', function() {
      let actual = head(split('-n5 fiveLines.txt fifteenLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        '==> fifteenLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n 5 fiveLines.txt fifteenLines.txt', function() {
    it('should give 5 lines of both files with title', function() {
      let actual = head(split('-n 5 fiveLines.txt fifteenLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        '==> fifteenLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n 5 fiveLines.txt abc', function() {
    it('should give 5 lines of first file and error message for second', function() {
      let actual = head(split('-n 5 fiveLines.txt abx'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        'head: abx: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n 5 abc fiveLines.txt', function() {
    it('should give error of first file and 5 lines for second one', function() {
      let actual = head(split('-n 5 abc fiveLines.txt'), fs);
      let expectedOutput = [
        'head: abc: No such file or directory',
        '==> fiveLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n 0 fiveLines.txt', function() {
    it('should give illegal count error for zero as count', function() {
      let actual = head(split('-n 0 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- 0';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n0 fiveLines.txt', function() {
    it('should give illegal count error for zero with -n', function() {
      let actual = head(split('-n0 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- 0';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n -1 fiveLines.txt', function() {
    it('should give illegal count error for negative count', function() {
      let actual = head(split('-n -1 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- -1';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -n a fiveLines.txt', function() {
    it('should give illegal count error for alphabet', function() {
      let actual = head(split('-n a fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -na fiveLines.txt', function() {
    it('should give illegal line count error', function() {
      let actual = head(split('-na fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal line count -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c 1 fiveLines.txt', function() {
    it('should give singleCharacter', function() {
      let actual = head(split('-c 1 fiveLines.txt'), fs);
      let expectedOutput = '1';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c1 fiveLines.txt', function() {
    it('should give 1 as result', function() {
      let actual = head(split('-c1 fiveLines.txt'), fs);
      let expectedOutput = '1';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c0 fiveLines.txt', function() {
    it('should give illegal count error', function() {
      let actual = head(split('-c0 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal byte count -- 0';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c 0 fiveLines.txt', function() {
    it('should give illegal byte error', function() {
      let actual = head(split('-c 0 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal byte count -- 0';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -ca fiveLines.txt', function() {
    it('should give illegal count error', function() {
      let actual = head(split('-ca fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal byte count -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c a fiveLines.txt', function() {
    it('should give illegal count error', function() {
      let actual = head(split('-c a fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal byte count -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node head -c -2 fiveLines.txt', function() {
    it('should give illegal count error', function() {
      let actual = head(split('-c -2 fiveLines.txt'), fs);
      let expectedOutput = 'head: illegal byte count -- -2';
      assert.equal(actual, expectedOutput);
    });
  });
});

describe('createArgsObject', function() {
  it('should return the object of parameters specified in arguments', function() {
    assert.deepEqual(createArgsObject('-n', 100, ['testFile']), {
      option: 'line',
      count: 100,
      delim: '\n',
      filenames: ['testFile']
    });
    assert.deepEqual(
      createArgsObject('-c', 12, ['testfile', 'sampleFile', 'addFunction.js']),
      {
        option: 'byte',
        count: 12,
        delim: '',
        filenames: ['testfile', 'sampleFile', 'addFunction.js']
      }
    );
  });
});

describe('parseArgsWithOption', function() {
  it('should return the object of parameters when -n or -c are specified separately', function() {
    assert.deepEqual(parseArgsWithOption(['-n', '3', 'testfile']), {
      option: 'line',
      count: 3,
      delim: '\n',
      filenames: ['testfile']
    });
  });
  it('should return the object of parameters with -n as option when only count is specified', function() {
    assert.deepEqual(parseArgsWithOption(['-3', 'testfile']), {
      option: 'line',
      count: 3,
      delim: '\n',
      filenames: ['testfile']
    });
  });
  it('should return the object of parameters when -n or -c are specified with count', function() {
    assert.deepEqual(parseArgsWithOption(['-n7', 'testfile']), {
      option: 'line',
      count: 7,
      delim: '\n',
      filenames: ['testfile']
    });
  });
  it('should return the object of parameters when -c is given', function() {
    assert.deepEqual(parseArgsWithOption(['-c3', 'testfile']), {
      option: 'byte',
      count: 3,
      delim: '',
      filenames: ['testfile']
    });
  });
  it('should return the object of parameter when -c and count are separate', function() {
    assert.deepEqual(parseArgsWithOption(['-c', '3', 'testfile']), {
      option: 'byte',
      count: 3,
      delim: '',
      filenames: ['testfile']
    });
  });
});

describe('parseArgs', function() {
  describe('node head file.txt', function() {
    it('should return default parameter object when only file names is given', function() {
      assert.deepEqual(parseArgs(split('file.txt'), fs), {
        option: 'line',
        count: 10,
        delim: '\n',
        filenames: ['file.txt']
      });
    });
  });

  describe('node head -2 file.txt', function() {
    it('should return object with specified options', function() {
      assert.deepEqual(parseArgs(split('-2 testFile'), fs), {
        option: 'line',
        count: 2,
        delim: '\n',
        filenames: ['testFile']
      });
    });
  });
});

describe('tail', function() {
  describe('node tail fifteenLines.txt', function() {
    it('should return last 10 lines of file for default', function() {
      let expectedOutput = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15].join('\n');
      assert.deepEqual(tail(split('fifteenLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail fiveLines.txt', function() {
    it('should return 5 lines of given smaller files for default', function() {
      let expectedOutput = generateLines(5);
      assert.equal(tail(split('fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail tenLines.txt', function() {
    it('should return 10 lines of files for default', function() {
      let expectedOutput = generateLines(10);
      assert.equal(tail(split('tenLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -5 tenLines.txt', function() {
    it('should return 10 lines of files for default', function() {
      let expectedOutput = generateLines(10).slice(10);
      assert.equal(tail(split('-5 tenLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail missing', function() {
    it('should return missing file error', function() {
      let expectedOutput = 'tail: missing: No such file or directory';
      assert.equal(tail(split('missing'), fs), expectedOutput);
    });
  });

  describe('node tail -n3 fiveLines.txt', function() {
    it('should return 3 lines of files as specified', function() {
      let expectedOutput = generateLines(5).slice(4);
      assert.equal(tail(split('-n3 fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -n 3 fiveLines.txt', function() {
    it('should return 3 lines of given file as specified', function() {
      let expectedOutput = generateLines(5).slice(4);
      assert.equal(tail(split('-n 3 fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -n -3 fiveLines.txt', function() {
    it('should return 3 lines of given file', function() {
      let expectedOutput = generateLines(5).slice(4);
      assert.equal(tail(split('-n -3 fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -n 0 fiveLines.txt', function() {
    it('should return empty string for empty file', function() {
      assert.equal(tail(split('-n 0 fiveLines.txt'), fs), '');
    });
  });

  describe('node tail -n0 fiveLines.txt', function() {
    it('should return empty string for empty file', function() {
      assert.equal(tail(split('-n0 fiveLines.txt'), fs), '');
    });
  });

  describe('node tail -na fiveLines.txt', function() {
    it('should return illegal offset error for wrong count parameter', function() {
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(tail(split('-na fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -n -a fiveLines.txt', function() {
    it('should return illegal offset error', function() {
      let expectedOutput = 'tail: illegal offset -- -a';
      assert.equal(tail(split('-n -a fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -c1 fiveLines.txt', function() {
    it('should return last character of given file', function() {
      assert.equal(tail(split('-c1 fiveLines.txt'), fs), '5');
    });
  });

  describe('node tail -c 1 fiveLines.txt', function() {
    it('should return last character of given file', function() {
      assert.equal(tail(split('-c 1 fiveLines.txt'), fs), '5');
    });
  });

  describe('node tail -c 0 fiveLines.txt', function() {
    it('should return nothing for count zero', function() {
      assert.equal(tail(split('-c 0 fiveLines.txt'), fs), '');
    });
  });

  describe('node tail -c0 fiveLines.txt', function() {
    it('should return nothing for count zero', function() {
      assert.equal(tail(split('-c0 fiveLines.txt'), fs), '');
    });
  });

  describe('node tail -ca fiveLines.txt', function() {
    it('should return illegal offset error', function() {
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(tail(split('-ca fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -c a fiveLines.txt', function() {
    it('should return illegal offset error', function() {
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(tail(split('-c a fiveLines.txt'), fs), expectedOutput);
    });
  });

  describe('node tail -c -1 fiveLines.txt', function() {
    it('should return last character of given file', function() {
      assert.equal(tail(split('-c -1 fiveLines.txt'), fs), '5');
    });
  });

  describe('node tail fiveLines.txt fiveLines.txt', function() {
    it('should return last 5 lines of both files', function() {
      let actual = tail(split('fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        '==> fiveLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail fifteenLines.txt fiveLines.txt', function() {
    it('should return 10,5 lines', function() {
      let actual = tail(split('fifteenLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fifteenLines.txt <==',
        generateLines(15).slice(10),
        '==> fiveLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail missing fiveLines.txt', function() {
    it('should return error for first and 5 lines for second file', function() {
      let actual = tail(split('missing fiveLines.txt'), fs);
      let expectedOutput = [
        'tail: missing: No such file or directory',
        '==> fiveLines.txt <==',
        generateLines(5)
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail fiveLines.txt missing', function() {
    it('should return error for last one and return 5 lines of first one', function() {
      let actual = tail(split('fiveLines.txt missing'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        generateLines(5),
        'tail: missing: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -1 fiveLines.txt missing', function() {
    it('should return last line for first and error for missing file', function() {
      let actual = tail(split('-1 fiveLines.txt missing'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        'tail: missing: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -0 fiveLines.txt fiveLines.txt', function() {
    it('should return nothing for both file only heading', function() {
      let actual = tail(split('-0 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -0 fiveLines.txt missing', function() {
    it('should return nothing for first file and error for second', function() {
      let actual = tail(split('-0 fiveLines.txt missing'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        'tail: missing: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -0 missing fiveLines.txt', function() {
    it('should return nothing for first file and error for second', function() {
      let actual = tail(split('-0 missing fiveLines.txt'), fs);
      let expectedOutput = [
        'tail: missing: No such file or directory',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n1 fiveLines.txt fiveLines.txt', function() {
    it('should return last character for both', function() {
      let actual = tail(split('-n1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n 1 fiveLines.txt fiveLines.txt', function() {
    it('should return last character for both', function() {
      let actual = tail(split('-n 1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n -1 fiveLines.txt fiveLines.txt', function() {
    it('should return last character for both files', function() {
      let actual = tail(split('-n -1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n 1 fiveLines.txt missing', function() {
    it('should return 1 line for first file and error for second', function() {
      let actual = tail(split('-n 1 fiveLines.txt missing'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        'tail: missing: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n 0 fiveLines.txt fiveLines.txt', function() {
    it('should return nothing for both files', function() {
      let actual = tail(split('-n 0 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n0 fiveLines.txt fiveLines.txt', function() {
    it('should return nothing for both files', function() {
      let actual = tail(split('-n0 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -n -1 fiveLines.txt fiveLines.txt', function() {
    it('should return last line of both files', function() {
      let actual = tail(split('-n -1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -na fiveLines.txt fiveLines.txt', function() {
    it('should return error for illegal offset', function() {
      let actual = tail(split('-na fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -n a fiveLines.txt fiveLines.txt', function() {
    it('should return error for illegal offset', function() {
      let actual = tail(split('-n a fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -c1 fiveLines.txt fiveLines.txt', function() {
    it('should return 5 in both file with title', function() {
      let actual = tail(split('-c1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -c 1 fiveLines.txt fiveLines.txt', function() {
    it('should return 5 in both file with title', function() {
      let actual = tail(split('-c 1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -c -1 fiveLines.txt fiveLines.txt', function() {
    it('should return 5 in both file with title', function() {
      let actual = tail(split('-c -1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -c0 fiveLines.txt fiveLines.txt', function() {
    it('should return nothing for both files with title', function() {
      let actual = tail(split('-c0 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -c 0 fiveLines.txt fiveLines.txt', function() {
    it('should return nothing for both files with title', function() {
      let actual = tail(split('-c 0 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '',
        '==> fiveLines.txt <==',
        ''
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -c -1 fiveLines.txt fiveLines.txt', function() {
    it('should return 5 in both file with title', function() {
      let actual = tail(split('-c -1 fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        '==> fiveLines.txt <==',
        '5'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
  describe('node tail -ca fiveLines.txt fiveLines.txt', function() {
    it('should return error for illegal offset', function() {
      let actual = tail(split('-na fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -c a fiveLines.txt fiveLines.txt', function() {
    it('should return error for illegal offset', function() {
      let actual = tail(split('-n a fiveLines.txt fiveLines.txt'), fs);
      let expectedOutput = 'tail: illegal offset -- a';
      assert.equal(actual, expectedOutput);
    });
  });

  describe('node tail -c -1 fiveLines.txt missing', function() {
    it('should return 5 for first file and error for missing file', function() {
      let actual = tail(split('-c -1 fiveLines.txt missing'), fs);
      let expectedOutput = [
        '==> fiveLines.txt <==',
        '5',
        'tail: missing: No such file or directory'
      ].join('\n');
      assert.equal(actual, expectedOutput);
    });
  });
});
