const parseArgs = function(args) {
  if (args[0].startsWith('-')) {
    return parseArgsWithOption(args);
  }
  return createArgsObject('-n', '10', args);
};

const isInvalidCount = function(countArg) {
  return isNaN(countArg) || countArg < 1;
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
module.exports = {
  parseArgs,
  isInvalidCount,
  parseArgsWithOption,
  isValidOption,
  createArgsObject
};
