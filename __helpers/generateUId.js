const generateUId = (maxNumRand, prefix = '', suffix = '') => {
  const time = Date.now();
  const rnd = Math.floor(Math.random() * maxNumRand);

  return `${prefix}${Math.floor(time + rnd)}${suffix}`;
};

module.exports = generateUId;
