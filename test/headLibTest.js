const {
  createArgsObject,
  parseArgsWithOption,
  parseArgs,
  head,
  tail
} = require("../src/headAndTail.js");
const take = require("../src/util.js").take;

const {deepEqual,equal} = require("assert");

const fs = {};

fs.readFileSync = function(path,encoding){
  if(encoding!='utf-8') return;
  const content = dummyFiles[path];
  if(content == undefined) throw ('no such file ' + path);
  return content;
};

fs.existsSync = function(path){
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

let split = text => text.split(" ");

describe('take', function(){
  it('should return 10 lines by default', function(){
    let input = [1,2,3,4,5,6,7,8,9,10];
    let expected_output = input;
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


describe('head', function(){
  it("'node head empty.txt' should give zero lines",()=>{
    let args = split('empty.txt');
    let actualOutput = head(fs,args);
    equal(actualOutput,'');
  })
  describe("node head fifteenLines.text",()=>{
    it('should give 10 lines', function(){
      let tenLines = generateLines(10);
      equal(head(fs,split('fifteenLines.txt')),tenLines);
    });
  });
  describe("node head fiveLines.txt",()=>{
    it('should give 5 lines',()=>{
      let fiveLines = generateLines(5);
      equal(head(fs,split('fiveLines.txt')),fiveLines);
    });
  });
  describe("node head -5 tenLines.txt",()=>{
    it('should give 5 lines', function(){
      let fiveLines = generateLines(5);
      equal(head(fs,split('-5 tenLines.txt')),fiveLines);
    });
  });
  describe('node head -0 tenLines.txt',function(){
    it('should give illegal line count error',function(){
      let expected_output = 'head: illegal line count -- 0';
      equal(head(fs,split('-0 tenLines.txt')),expected_output);
    });
  });
  describe('node head -n5 tenLines.txt',()=>{
    it('should return 5 lines', function(){
      let fiveLines = generateLines(5);
      deepEqual(head(fs,split('-n5 tenLines.txt')),fiveLines);
    });
  });
  describe("node head missingFile.txt",()=>{
    it('should return error when missing file is given',function(){
      let errorMessage = "head: missingFile.txt: No such file or directory";
      deepEqual(head(fs,split('missingFile.txt')),errorMessage);
    });
  });
  describe('node head 3 fiveLines.txt',function(){
    it('should return missing file error for 3 and return 5 lines of second one',function(){
      let expected_output = ['head: 3: No such file or directory','==> fiveLines.txt <==',generateLines(5)].join('\n');
      deepEqual(head(fs,split('3 fiveLines.txt')),expected_output);
    });
  });
  describe('node head fiveLines.txt fifteenLines.txt', function(){
    it('should give 5,10 lines of the files with title', function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'==> fifteenLines.txt <==',generateLines(10)].join('\n');
      deepEqual(head(fs,split('fiveLines.txt fifteenLines.txt')),expected_output);
    });
  });
  describe('node head -n5 fiveLines.txt fifteenLines.txt',function(){
    it('should give 5 lines of both files with title',function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'==> fifteenLines.txt <==',generateLines(5)].join('\n');
      deepEqual(head(fs,split('-n5 fiveLines.txt fifteenLines.txt')),expected_output);
    });
  });
  describe('node head -n 5 fiveLines.txt fifteenLines.txt',function(){
    it('should give 5 lines of both files with title',function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'==> fifteenLines.txt <==',generateLines(5)].join('\n');
      deepEqual(head(fs,split('-n 5 fiveLines.txt fifteenLines.txt')),expected_output);
    });
  });
  describe('node head -n 5 fiveLines.txt abc',function(){
    it('should give 5 lines of first file and error message for second',function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'head: abx: No such file or directory'].join('\n');
      deepEqual(head(fs,split('-n 5 fiveLines.txt abx')),expected_output);
    });
  });
  describe('node head -n 5 abc fiveLines.txt',function(){
    it('should give error of first file and 5 lines for second one',function(){
      let expected_output = ['head: abc: No such file or directory','==> fiveLines.txt <==',generateLines(5)].join('\n');
      equal(head(fs,split('-n 5 abc fiveLines.txt')),expected_output);
    });
  });
  describe('node head -n 0 fiveLines.txt',function(){
    it('should give illegal count error for zero as count',function(){
      let expected_output = "head: illegal line count -- 0";
      deepEqual(head(fs,split('-n 0 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -n0 fiveLines.txt',function(){
    it('should give illegal count error for zero with -n',function(){
      let expected_output = "head: illegal line count -- 0";
      deepEqual(head(fs,split('-n0 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -n -1 fiveLines.txt',function(){
    it('should give illegal count error for negative count',function(){
      let expected_output = "head: illegal line count -- -1";
      deepEqual(head(fs,split('-n -1 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -n a fiveLines.txt',function(){
    it('should give illegal count error for alphabet',function(){
      let expected_output = "head: illegal line count -- a";
      deepEqual(head(fs,split('-n a fiveLines.txt')),expected_output);
    });
  });
  describe('node head -na fiveLines.txt',function(){
    it('should give illegal line count error',function(){
      let expected_output = "head: illegal line count -- a";
      deepEqual(head(fs,split('-na fiveLines.txt')),expected_output);
    })
  })
  describe('node head -c 1 fiveLines.txt',function(){
    it('should give singleCharacter',function(){
      let expected_output = '1';
      equal(head(fs,split('-c 1 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -c1 fiveLines.txt',function(){
    it('should give 1 as result',function(){
      let expected_output = '1';
      equal(head(fs,split('-c1 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -c0 fiveLines.txt',function(){
    it('should give illegal count error',function(){
      let expected_output = 'head: illegal byte count -- 0'
      equal(head(fs,split('-c0 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -c 0 fiveLines.txt',function(){
    it('should give illegal byte error',function(){
      let expected_output = 'head: illegal byte count -- 0'
      equal(head(fs,split('-c 0 fiveLines.txt')),expected_output);
    });
  });
  describe('node head -ca fiveLines.txt',function(){
    it('should give illegal count error',function(){
      let expected_output = 'head: illegal byte count -- a';
      equal(head(fs,split('-ca fiveLines.txt')),expected_output);
    });
  });
  describe('node head -c a fiveLines.txt',function(){
    it('should give illegal count error',function(){
      let expected_output = 'head: illegal byte count -- a';
        equal(head(fs,split('-c a fiveLines.txt')),expected_output);
    });
  });
  describe('node head -c -2 fiveLines.txt',function(){
    it('should give illegal count error',function(){
      let expected_output = 'head: illegal byte count -- -2';
      equal(head(fs,split('-c -2 fiveLines.txt')),expected_output);
    });
  });
});


describe('createArgsObject',function(){
  it('should return the object of parameters specified in arguments',function(){
    deepEqual(createArgsObject("-n",100,["testFile"]),{"option":"line","count":100,"filenames":["testFile"]});
    deepEqual(createArgsObject("-c",12,["testfile","sampleFile","addFunction.js"]),{"option":"byte","count":12,"filenames":["testfile","sampleFile","addFunction.js"]});
  });
});

describe('parseArgsWithOption',function(){
  it('should return the object of parameters when -n or -c are specified separately',function(){
    deepEqual(parseArgsWithOption(["-n","3","testfile"]),{"option":"line","count":3,"filenames":["testfile"]});
  });
  it('should return the object of parameters with -n as option when only count is specified',function(){
    deepEqual(parseArgsWithOption(["-3","testfile"]),{"option":"line","count":3,"filenames":["testfile"]});
  });
  it('should return the object of parameters when -n or -c are specified with count',function(){
    deepEqual(parseArgsWithOption(["-n7","testfile"]),{"option":"line","count":7,"filenames":["testfile"]});
  });
  it('should return the object of parameters when -c is given',function(){
    deepEqual(parseArgsWithOption(["-c3","testfile"]),{'option':'byte','count':3,'filenames':['testfile']});
  });
  it('should return the object of parameter when -c and count are separate',function(){
    deepEqual(parseArgsWithOption(['-c','3','testfile']),{'option':'byte','count':3,'filenames':['testfile']});
  });
});

describe('parseArgs',function(){
  describe('node head file.txt', function(){
    it('should return default parameter object when only file names is given',function(){
      deepEqual(parseArgs(split('file.txt')),{'option':'line','count':10,'filenames':['file.txt']});
    });
  });
  describe('node head -2 file.txt', function(){
    it('should return object with specified options',function(){
      deepEqual(parseArgs(split('-2 testFile')),{'option':'line','count':2,'filenames':['testFile']});
    });
  });
});
describe('tail',function(){
  describe('node tail fifteenLines.txt',function(){
    it('should return last 10 lines of file',function(){
      let expected_output = generateLines(15).split('\n').slice(5).join('\n');
      deepEqual(tail(fs,split('fifteenLines.txt')),expected_output);
    });
  });
  describe('node tail fiveLines.txt',function(){
    it('should return 5 lines',function(){
      let expected_output = generateLines(5);
      equal(tail(fs,split('fiveLines.txt')),expected_output);
    });
  });
  describe('node tail tenLines.txt',function(){
    it('should return 10 lines',function(){
      let expected_output = generateLines(10);
      equal(tail(fs,split('tenLines.txt')),expected_output);
    });
  });
  describe('node tail -5 tenLines.txt',function(){
    it('should return 10 lines',function(){
      let expected_output = generateLines(10).slice(10);
      equal(tail(fs,split('-5 tenLines.txt')),expected_output);
    });
  });
  describe('node tail missing',function(){
    it('should return missing file error',function(){
      let expected_output = 'tail: missing: No such file or directory';
      equal(tail(fs,split('missing')),expected_output);
    });
  });
  describe('node tail -n3 fiveLines.txt',function(){
    it('should return 3 lines',function(){
      let expected_output = generateLines(5).slice(4);
      equal(tail(fs,split('-n3 fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n 3 fiveLines.txt',function(){
    it('should return 3 lines',function(){
      let expected_output = generateLines(5).slice(4);
      equal(tail(fs,split('-n 3 fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n -3 fiveLines.txt',function(){
    it('should return 3 lines',function(){
      let expected_output = generateLines(5).slice(4);
      equal(tail(fs,split('-n -3 fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n 0 fiveLines.txt',function(){
    it('should return empty string',function(){
      equal(tail(fs,split('-n 0 fiveLines.txt')),'');
    });
  });
  describe('node tail -n0 fiveLines.txt',function(){
    it('should return empty string',function(){
      equal(tail(fs,split('-n0 fiveLines.txt')),'');
    });
  });
  describe('node tail -na fiveLines.txt',function(){
    it('should return illegal offset error',function(){
      let expected_output = 'tail: illegal offset -- a'
      equal(tail(fs,split('-na fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n -a fiveLines.txt',function(){
    it('should return illegal offset error',function(){
      let expected_output = 'tail: illegal offset -- -a'
      equal(tail(fs,split('-n -a fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c1 fiveLines.txt',function(){
    it('should return 5',function(){
      equal(tail(fs,split('-c1 fiveLines.txt')),'5');
    });
  });
  describe('node tail -c 1 fiveLines.txt',function(){
    it('should return 5',function(){
      equal(tail(fs,split('-c 1 fiveLines.txt')),'5');
    });
  });
  describe('node tail -c 0 fiveLines.txt',function(){
    it('should return nothing',function(){
      equal(tail(fs,split('-c 0 fiveLines.txt')),'');
    });
  });
  describe('node tail -c0 fiveLines.txt',function(){
    it('should return nothing',function(){
      equal(tail(fs,split('-c0 fiveLines.txt')),'');
    });
  });
  describe('node tail -ca fiveLines.txt',function(){
    it('should return illegal offset error',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-ca fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c a fiveLines.txt',function(){
    it('should return illegal offset error',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-c a fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c -1 fiveLines.txt',function(){
    it('should return 5',function(){
      equal(tail(fs,split('-c -1 fiveLines.txt')),'5');
    });
  });
  describe('node tail fiveLines.txt fiveLines.txt',function(){
    it('should return 5 lines of each file',function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'==> fiveLines.txt <==',generateLines(5)].join('\n');
      equal(tail(fs,split('fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail fifteenLines.txt fiveLines.txt',function(){
    it('should return 10,5 lines',function(){
      let expected_output = ['==> fifteenLines.txt <==',generateLines(15).slice(10),'==> fiveLines.txt <==',generateLines(5)].join('\n');
      equal(tail(fs,split('fifteenLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail missing fiveLines.txt',function(){
    it('should return error for first and 5 lines for second file',function(){
      let expected_output = ['tail: missing: No such file or directory','==> fiveLines.txt <==',generateLines(5)].join('\n');
      equal(tail(fs,split('missing fiveLines.txt')),expected_output);
    });
  });
  describe('node tail fiveLines.txt missing',function(){
    it('should return error for last one and return 5 lines of first one',function(){
      let expected_output = ['==> fiveLines.txt <==',generateLines(5),'tail: missing: No such file or directory'].join('\n');
      equal(tail(fs,split('fiveLines.txt missing')),expected_output);
    }) ;
  });
  describe('node tail -1 fiveLines.txt missing',function(){
    it('should return last line for first and error for missing file',function(){
      let expected_output = ['==> fiveLines.txt <==','5','tail: missing: No such file or directory'].join('\n');
      equal(tail(fs,split('-1 fiveLines.txt missing')),expected_output);
    });
  });
  describe('node tail -0 fiveLines.txt fiveLines.txt',function(){
    it('should return nothing for both file only heading',function(){
      let expected_output = ['==> fiveLines.txt <==','','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-0 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -0 fiveLines.txt missing',function(){
    it('should return nothing for first file and error for second',function(){
      let expected_output = ['==> fiveLines.txt <==','','tail: missing: No such file or directory'].join('\n');
      equal(tail(fs,split('-0 fiveLines.txt missing')),expected_output);
    });
  });
  describe('node tail -0 missing fiveLines.txt',function(){
    it('should return nothing for first file and error for second',function(){
      let expected_output = ['tail: missing: No such file or directory','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-0 missing fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 for each',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-n1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n 1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 for each',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-n 1 fiveLines.txt fiveLines.txt')),expected_output); 
    });
  });
  describe('node tail -n -1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 for each',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-n -1 fiveLines.txt fiveLines.txt')),expected_output); 
    });
  });
  describe('node tail -n 1 fiveLines.txt missing',function(){
    it('should return 1 line for first file and error for second',function(){
      let expected_output = ['==> fiveLines.txt <==','5','tail: missing: No such file or directory'].join('\n');
      equal(tail(fs,split('-n 1 fiveLines.txt missing')),expected_output);
    });
  });
  describe('node tail -n 0 fiveLines.txt fiveLines.txt',function(){
    it('should return nothing for both files',function(){
      let expected_output = ['==> fiveLines.txt <==','','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-n 0 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n0 fiveLines.txt fiveLines.txt',function(){
    it('should return nothing for both files',function(){
      let expected_output = ['==> fiveLines.txt <==','','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-n0 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n -1 fiveLines.txt fiveLines.txt',function(){
    it('should return last line of both files',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-n -1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -na fiveLines.txt fiveLines.txt',function(){
    it('should return error for illegal offset',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-na fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -n a fiveLines.txt fiveLines.txt',function(){
    it('should return error for illegal offset',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-n a fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 in both file with title',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-c1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c 1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 in both file with title',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-c 1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c -1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 in both file with title',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-c -1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c0 fiveLines.txt fiveLines.txt',function(){
    it('should return nothing for both files with title',function(){
      let expected_output = ['==> fiveLines.txt <==','','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-c0 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c 0 fiveLines.txt fiveLines.txt',function(){
    it('should return nothing for both files with title',function(){
      let expected_output = ['==> fiveLines.txt <==','','==> fiveLines.txt <==',''].join('\n');
      equal(tail(fs,split('-c 0 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c -1 fiveLines.txt fiveLines.txt',function(){
    it('should return 5 in both file with title',function(){
      let expected_output = ['==> fiveLines.txt <==','5','==> fiveLines.txt <==','5'].join('\n');
      equal(tail(fs,split('-c -1 fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -ca fiveLines.txt fiveLines.txt',function(){
    it('should return error for illegal offset',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-na fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c a fiveLines.txt fiveLines.txt',function(){
    it('should return error for illegal offset',function(){
      let expected_output = 'tail: illegal offset -- a';
      equal(tail(fs,split('-n a fiveLines.txt fiveLines.txt')),expected_output);
    });
  });
  describe('node tail -c -1 fiveLines.txt missing',function(){
    it('should return 5 for first file and error for missing file',function(){
      let expected_output = ['==> fiveLines.txt <==','5','tail: missing: No such file or directory'].join('\n');
      equal(tail(fs,split('-c -1 fiveLines.txt missing')),expected_output);
    });
  });
});
