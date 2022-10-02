const axios = require('axios');
const logger = require('./logger');
const _ = require('lodash');
module.exports = async (url = '') => {
  try {
    const { data } = await axios.get(url);

    const title = data.match(/<title[^>]*>([^<]+)<\/title>/)[1];
    if (_.isEmpty(title)) {
      logger.log('No title for : ' + url);
      return '';
    }

    return title;
  } catch (e) {
    logger.error(e.message);
    return '';
  }
};
