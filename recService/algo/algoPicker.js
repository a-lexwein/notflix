const weightedRandomInt = require('./weightedRandomInt');

const algos = [
  n => weightedRandomInt(n, 1),
  n => weightedRandomInt(n, 3),
];


const algoPicker = (numMovies, numRecs) => {
  const algoIndex = Math.floor(Math.random() * algos.length);

  const recs = new Array(numRecs).fill(0).map(() => algos[algoIndex](numMovies));

  const out = { algoIndex, recs };
  return out;
};

module.exports = algoPicker;
