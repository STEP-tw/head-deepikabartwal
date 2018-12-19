const take = function(list, numberOfElements) {
  return list.slice(0, numberOfElements);
};

const last = function(list, count) {
  return list.slice(-count);
};

module.exports = {
  take,
  last
};
