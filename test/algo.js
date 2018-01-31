const { expect } = require('chai');
const weightedRandomInt = require('./../recService/algo/weightedRandomInt.js');

describe('weightedRandomInt', () => {
  it('should return 0 when n=1', () => {
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
