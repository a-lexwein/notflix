/* eslint camelcase: "off" */


// this generates 10000 rows.
// to generate millions I ran this terminal command:
// for i in `seq 100`; do node database/dummyHistory.js; done
// but I actually tweaked the generation a little, so db won't fully match distribution from script.
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'recs',
  port: 5432,
});

client.connect();

// start with 1M

// start with uniform distribution
const stamp = `(select timestamp '2017-11-01 00:00:00' +
       random() * (timestamp '2018-02-01 00:00:00' -
                   timestamp '2017-11-01 00:00:00'))`;
const user_id = 'random() * 100000';
const movie_id = 'floor(3000 * (random()^3))';
// const movie_id = `random() * 3000`

let query = `insert into history (user_id, movie_id, signal, watched_timestamp) VALUES (${user_id}, ${movie_id}, 1, ${stamp})`;
const vals = `, (${user_id}, ${movie_id}, 1, ${stamp})`;

for (let i = 1; i < 10000; i += 1) {
  query += vals;
}
query += ';';

client.query(query, (err, res) => {
  console.log(err, res);
  client.end();
});
