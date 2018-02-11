const {
  getMoviesByIndex,
  getUsersMoviesByIndex,
  getMovieCount,
  insertIntoHistory,
  client,
} = require('./../recService/database/index.js');

const { expect } = require('chai');

describe('getMoviesByIndex', () => {
  it('should return an array of integers of length equal to input length', async () => {
    const res = await getMoviesByIndex([1, 2, 3]);
    expect(Array.isArray(res)).to.equal(true);
    expect(res.length).to.equal(3);
    expect(Math.floor(res[0])).to.equal(res[0]);
    expect(res.every(x => typeof x === 'number')).to.equal(true);
  });

  it('should return an empty array when indices are higher than number of movies', async () => {
    const res = await getMoviesByIndex([1000000]);
    expect(res.length).to.equal(0);
  });

  it('should return an empty array when provided an empty array', async () => {
    const res = await getMoviesByIndex([]);
    expect(res.length).to.equal(0);
  });

  it('should return an empty array when provided non-integers', async () => {
    let res = await getMoviesByIndex(['test', 'me']);
    expect(res.length).to.equal(0);
    res = await getMoviesByIndex([2.1]);
    expect(res.length).to.equal(0);
  });
});

describe('getUsersMoviesByIndex', () => {
  xit('should return an array of integers of length equal to input length', async () => {
    const res = await getUsersMoviesByIndex([1, 2, 3], 0);
    expect(Array.isArray(res)).to.equal(true);
    expect(res.length).to.equal(3);
    expect(Math.floor(res[0])).to.equal(res[0]);
    expect(res.every(x => typeof x === 'number')).to.equal(true);
  }).timeout(60 * 1000);

  xit('should return different values for different users', async () => {
    const res1 = await getUsersMoviesByIndex([1, 2, 3, 5, 50, 100], 1);
    const res2 = await getUsersMoviesByIndex([1, 2, 3, 5, 50, 100], 2);

    expect(res1).to.eql(res1);
    expect(res1).to.not.eql(res2);
  }).timeout(120 * 1000);

  xit('should return an empty array when movie indices are higher than number of movies', async () => {
    const res = await getUsersMoviesByIndex([1000000], 1);
    expect(res.length).to.equal(0);
  }).timeout(60 * 1000);

  xit('should return an empty array when user index is higher than number of users', async () => {
    const res = await getUsersMoviesByIndex([1, 2, 3], 1000000);
    expect(res.length).to.equal(0);
  }).timeout(60 * 1000);
});

describe('getMovieCount', () => {
  it('should return a nonnegative integer', async () => {
    const res = await getMovieCount();
    expect(res).to.be.above(-1);
    expect(res).to.equal(Math.floor(res));
  }).timeout(60 * 1000);
});

describe('insertIntoHistory', () => {
  it('should add one row to history table', async () => {
    const try1 = await client.query('select count(1) from history;');
    const data = {
      movie_id: 1,
      user_id: 1,
      signal: 1,
      timestamp: new Date().toISOString(),
    };
    await insertIntoHistory(data);
    const try2 = await client.query('select count(1) from history;');
    expect(Number(try2.rows[0].count)).to.equal(Number(try1.rows[0].count) + 1);
  }).timeout(60 * 1000);
});
