const getPageTitle = require('../utils/getPageTitlev2.js');

module.exports = async (message = '') => {
  //https://mathiasbynens.be/demo/url-regex
  //todo search more for patterns
  const REGEX_URL =
    /\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#/%?=~_|$!:,.;]*[A-Z0-9+&@#/%=~_|$]/gi;
  const urlRegex = new RegExp(REGEX_URL);
  const urls = message.match(urlRegex) || [];

  return await Promise.all(
    urls.map(async (url) => {
      return {
        url: url,
        title: await getPageTitle(url),
      };
    })
  );
};
