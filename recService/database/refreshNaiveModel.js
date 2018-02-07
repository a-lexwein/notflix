const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'recs',
  port: 5432,
});

client.connect();

const query = `
truncate model_naive;
INSERT INTO model_naive
  SELECT *,
    row_number () OVER () as row_number
    FROM
    (SELECT
      movie_id,
      sum(signal) as watch_count
    FROM history
    GROUP BY movie_id
    ORDER BY watch_count DESC) a;
`;

const refresh = () => client.query(query, (err, res) => {
  console.log(err, res);
});

// TODO: handle client.end() properly.

module.exports = refresh;
