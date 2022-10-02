const _ = require('lodash');

module.exports = (message = '') => {
  //todo Regex Groups and backreferences is better, const matches = string.matchAll(regexp);
  return (message.match(/(^|\s)@(\w+)/g) || []).map((found) =>
    _.trim(found.replace('@', ''))
  );
};
