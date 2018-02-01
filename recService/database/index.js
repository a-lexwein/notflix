const { Client } = require('pg');
const { pluck } = require('underscore');

const client = new Client({
  host: 'localhost',
  database: 'recs',
  port: 5432,
});

client.connect();

// const getMoviesByIndex = (ids, cb) => {
//   const idsString = ids.join(',');
//   const query = `
//   SELECT movie_id
//   FROM model_naive
//   WHERE row_number in (${idsString})
//   `;
//
//   client.query(query, (err, res) => {
//     if (err) console.log(err);
//     cb(res.rows || null);
//   });
// };

const getMoviesByIndex = async (rows) => {
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

module.exports = {
  getMoviesByIndex,
};
