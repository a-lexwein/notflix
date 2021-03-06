/* eslint camelcase: "off" */

const { Client } = require('pg');
const { pluck } = require('underscore');

const client = new Client({
  host: 'localhost',
  database: 'recs',
  port: 5432,
});

client.connect();

const getMoviesByIndex = async (rowsIn) => {
  const rows = rowsIn
    .filter(x => typeof x === 'number' && Math.floor(x) === x);
  if (rows.length === 0) {
    return [];
  }

  const rowsString = rows.join(',');
  const query = `
  SELECT movie_id
  FROM model_naive
  WHERE row_number in (${rowsString})
  `;
  let x;
  try {
    x = await client.query(query);
    x = pluck(x.rows, 'movie_id');
  } catch (err) {
    console.log(err);
  }
  return x;
};

const getUsersMoviesByIndex = async (rows, userID) => {
  const rowsString = rows.join(',');
  const query = `
  SELECT movie_id
  FROM model_cf
  WHERE user_rank in (${rowsString})
    AND user_id = ${userID};
  `;
  let x;
  try {
    x = await client.query(query);
    x = pluck(x.rows, 'movie_id');
  } catch (err) {
    console.log(err);
  }
  return x;
};

const getMovieCount = async () => {
  const query = 'SELECT count(1) as cnt FROM model_naive;';
  let x;
  try {
    x = await client.query(query);
    x = x.rows[0].cnt;
  } catch (err) {
    console.log(err);
  }
  return Number(x);
};

const insertIntoHistory = async ({
  movie_id, user_id, signal, timestamp,
}) => {
  const query = `
  INSERT INTO history (user_id, movie_id, signal, watched_timestamp)
    VALUES (${user_id}, ${movie_id}, ${signal}, '${timestamp}');
  `;
  console.log(query);
  try {
    await client.query(query);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMoviesByIndex,
  getUsersMoviesByIndex,
  getMovieCount,
  insertIntoHistory,
  client,
};
