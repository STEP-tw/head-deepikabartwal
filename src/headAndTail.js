const take = require('./util/array.js').take;

const parseArgs = function(args) {
  if (args[0].startsWith('-')) {
    return parseArgsWithOption(args);
  }
  return createArgsObject('-n', '10', args);
};

const isInvalidCount = function(countArg) {
  return isNaN(countArg) || countArg < 1;
};

const head = function(args, fs) {
  let { option, delim, count, filenames } = parseArgs(args);
  if (isInvalidCount(count)) {
    return 'head: illegal ' + option + ' count -- ' + count;
  }
  const getContent = function(path) {
    if (!fs.existsSync(path)) {
      return 'head: ' + path + ': No such file or directory';
    }
    let lines = fs.readFileSync(path, 'utf-8').split(delim);
    return take(lines, +count).join(delim);
  };
  const getContentWithHeadings = function(path) {
    let heading = '==> ' + path + ' <==';
    if (!fs.existsSync(path)) {
      return 'head: ' + path + ': No such file or directory';
    }
    return heading + '\n' + getContent(path);
  };
  if (filenames.length > 1) {
    return filenames.map(getContentWithHeadings).join('\n');
  }
  return filenames.map(getContent).join(delim);
};

const createArgsObject = function(type, count, filenames) {
  let option = 'line';
  let delim = '\n';
  if (type == '-c') {
    option = 'byte';
    delim = '';
  }
  return { option, count, delim, filenames };
};

const isValidOption = function(optionCandidate) {
  return optionCandidate === '-n' || optionCandidate === '-c';
};

const parseArgsWithOption = function(args) {
  if (isValidOption(args[0])) {
    return createArgsObject(args[0], args[1], args.slice(2));
  }
  if (!isNaN(args[0].slice(1))) {
    return createArgsObject('-n', args[0].slice(1), args.slice(1));
  }
  return createArgsObject(args[0].slice(0, 2), args[0].slice(2), args.slice(1));
};

const tail = function(args, fs) {
  let { option, count, delim, filenames } = parseArgs(args);
  if (isNaN(count)) {
    return 'tail: illegal offset -- ' + count;
  }
  const getContent = function(path) {
    if (!fs.existsSync(path)) {
      return 'tail: ' + path + ': No such file or directory';
    }
    let lines = fs
      .readFileSync(path, 'utf-8')
      .split(delim)
      .reverse();
    return take(lines, Math.abs(count))
      .reverse()
      .join(delim);
  };
  const getContentWithHeadings = function(path) {
    let heading = '==> ' + path + ' <==';
    if (!fs.existsSync(path)) {
      return 'tail: ' + path + ': No such file or directory';
    }
    return heading + '\n' + getContent(path);
  };
  if (filenames.length > 1) {
    return filenames.map(getContentWithHeadings).join('\n');
  }
  return filenames
    .map(getContent)
    .reverse()
    .join(delim);
};

module.exports = {
  createArgsObject,
  parseArgsWithOption,
  parseArgs,
  head,
  tail
};
