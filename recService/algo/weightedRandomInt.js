// selects a number between 0 and n (exclusive)
// when exp === 1, distribution is uniform
// the the higher x is, the more often small numbers will be returned
const weightedRandomInt = (n, exp = 1) => {
  let x = Math.random();
  x **= exp;
  x *= n;
  x = Math.floor(x);
  return x;
};


module.exports = weightedRandomInt;
