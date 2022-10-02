// @todo use better Logger
module.exports = {
  log: (message = '') => {
    console.error(`#Log: ${message}`);
  },
  error: (message = 'Error!') => {
    console.error(`#Error: ${message}`);
  },
};
