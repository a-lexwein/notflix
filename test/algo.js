const { expect } = require('chai');
const weightedRandomInt = require('./../recService/algo/weightedRandomInt.js');
const algoPicker = require('./../recService/algo/algoPicker.js');

describe('weightedRandomInt', () => {
  it('should return 0 when n = 1', () => {
    const x = weightedRandomInt(1);
    expect(x).to.equal(0);
  });
  it('when exp > 1, small numbers should appear more frequently', () => {
    let i = 0;
    const arr = [];
    while (i < 300) {
      i += 1;
      arr.push(weightedRandomInt(10, 3));
    }
    const counts = {};
    for (let j = 0; j < arr.length; j += 1) {
      counts[arr[j]] = 1 + (counts[arr[j]] || 0);
    }
    expect(counts[1]).to.be.above(counts[9]);
  });
  it('when exp < 1, small numbers should appear more frequently', () => {
    let i = 0;
    const arr = [];
    while (i < 300) {
      i += 1;
      arr.push(weightedRandomInt(10, 0.8));
    }
    const counts = {};
    for (let j = 0; j < arr.length; j += 1) {
      counts[arr[j]] = 1 + (counts[arr[j]] || 0);
    }
    expect(counts[1]).to.be.below(counts[9]);
  });
});

describe('algoPicker(numMovies, numRecs)', () => {
  it('should return an array of length numPicks, with values between 0 and numMovies', () => {
    const { recs } = algoPicker(100, 10);
    expect(recs.length).to.equal(10);
    expect(Math.max(...recs)).to.be.below(101);
    expect(Math.min(...recs)).to.be.above(-1);
  });
  it('When algoId = 1, small numbers should appear more frequently', () => {
    let { recs, algoIndex } = algoPicker(100, 100);
    while (algoIndex !== 1) {
      ({ recs, algoIndex } = algoPicker(100, 100));
    }
    const avg = recs.reduce((acc, x) => acc + x) / recs.length;
    expect(avg).to.be.below(50);
  });
  it('When algoId = 2, small numbers should appear more frequently', () => {
    let { recs, algoIndex } = algoPicker(100, 100);
    while (algoIndex !== 2) {
      ({ recs, algoIndex } = algoPicker(100, 100));
    }
    const avg = recs.reduce((acc, x) => acc + x) / recs.length;
    expect(avg).to.be.below(50);
  });
});
