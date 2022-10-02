const data = {
  'http://www.nbcolympics.com': 'Paris 2024 Olympic Games | NBC Olympics',
  'https://twitter.com/jdorfman/status/430511497475670016':
    'Justin Dorfman on Twitter: "nice @littlebigdetail from @HipChat (shows hex colors when pasted in chat). http://t.co/7cI6Gjy5pq" / Twitter',
};
module.exports = async (url = '') => {
  return data[url];
};
