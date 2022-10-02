module.exports = (message = '') => {
  return (message.match(/\(([a-zA-Z0-9_]{1,15})\)/g) || []).map((match) =>
    match.slice(1, match.length - 1)
  );
};
