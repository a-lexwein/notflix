library(dplyr)
library(tidyr)
library(RPostgreSQL)
library(lsa)
library(purrrlyr)
library(stringr)

con <- DBI::dbConnect(RPostgreSQL::PostgreSQL(), 
  dbname = 'recs',
  host = "localhost",
  port = 5432
)

# pointer to history table
history_db <- tbl(con, "history")

# loads unique entries from history into working memory
# currenty limiting # of movies.
hist <- history_db %>%
  select(user_id, movie_id, signal) %>%
  distinct() %>%
  filter(movie_id < 100) %>%
  collect()

# convert to wide for matrix-ing
users <- hist %>%
  spread(movie_id, signal, fill = 0)

# Get item-item cosine matrix
rownames(users) <- users$user_id
mat <- users %>%
  select(-user_id) %>%
  data.matrix() %>%
  cosine()

## function to compute every record.
get_user_cosines <- function(user_row) {
  user_id = getElement(user_row, 'user_id')
  user_row = select(user_row, -user_id) %>% as.numeric
  cos1 <- function(movie_vector) {
    cosine(user_row, movie_vector)
  }
  c(user_id = user_id, apply(mat, FUN= cos1, MARGIN = 1))
}

## applies get_user_cosine to every user, and dplyr's it into tidy form
model_cf <- by_row(users, get_user_cosines, .collate = "cols") %>%
  select(user_id, starts_with('.out'), -.out1) %>%
  gather(key = movie_id, value = score, -user_id) %>%
  mutate(movie_id = as.integer(str_sub(movie_id,5)) - 2)  %>% # minus 2 works but is clunky.
  arrange(user_id, desc(score)) %>%
  group_by(user_id) %>%
  mutate(user_rank = row_number())

## overwrites model in database
dbWriteTable(con, "model_cf", model_cf, overwrite = TRUE, row.names = FALSE)