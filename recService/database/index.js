const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'recs',
  port: 5432,
});

client.connect();

const getMoviesByIndex = (ids) => {
  const idsString = ids.join(',');
  const query = `
  SELECT movie_id
  FROM model_naive
  WHERE row_number in (${idsString})
  `;

  client.query(query, (err, res) => {
    console.log(err, res);
  });
};

module.exports = {
  getMoviesByIndex,
};
