CREATE TABLE history (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  signal INT NOT NULL,
  watched_timestamp TIMESTAMP
);

CREATE TABLE model_naive AS
  SELECT
    movie_id,
    sum(signal) as watch_count
  FROM history
  GROUP BY movie_id
  ORDER BY watch_count DESC;

ALTER TABLE model_naive
  ADD PRIMARY KEY (movie_id);
