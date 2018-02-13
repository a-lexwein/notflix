library(dplyr)
library(tidyr)
library(RPostgreSQL)
library(lsa)
library(purrr)
library(purrrlyr)
library(stringr)

# Using a seed
set.seed(68)

con <- DBI::dbConnect(RPostgreSQL::PostgreSQL(), 
  dbname = 'recs',
  host = "localhost",
  port = 5432
)

# pointer to history table
history_db <- tbl(con, "history")

# loads unique entries from history into working memory
# filters by timestamp to ensure reproducibility of the results;
hist <- history_db %>%
  filter(watched_timestamp < '2018-01-11') %>%
  select(user_id, movie_id, signal) %>%
  distinct() %>%
  collect()

DBI::dbDisconnect(con)

generateModelOnSubset <- function(user_count, movie_count) {
  
  users_in_sample <- hist %>%
    select(user_id) %>%
    distinct() %>%
    mutate(ord = runif(1)) %>%
    arrange(ord) %>%
    filter(row_number() < user_count) %>%
    pull(user_id)
  
  movies_in_sample <- hist %>%
    select(movie_id) %>%
    distinct() %>%
    mutate(ord = runif(1)) %>%
    arrange(ord) %>%
    filter(row_number() < movie_count) %>%
    pull(movie_id)
  
  
  # convert to wide for matrix-ing
  # filtering for sample runs
  users <- hist %>%
    filter(user_id %in% users_in_sample) %>%
    filter(movie_id %in% movies_in_sample) %>%
    spread(movie_id, signal, fill = 0)

  
  # Get item-item cosine matrix
  rownames(users) <- users$user_id
  mat <- users %>%
    select(-user_id) %>%
    data.matrix() %>%
    cosine()
  
  ## function to calculate distance
  get_user_cosines <- function(user_row) {
    user_id = getElement(user_row, 'user_id')
    user_row = select(user_row, -user_id) %>% as.numeric
    cos1 <- function(movie_vector) {
      cosine(user_row, movie_vector)
    }
    c(user_id = user_id, apply(mat, FUN= cos1, MARGIN = 1))
  }
  
  ## applies get_user_cosine to every user, and dplyr's it into tidy form
  model_cf <- by_row(users, get_user_cosines, .collate = "cols")
  
  # renames the new columns based on old movie_id, and and then renames the old columns
  colnames <- colnames(model_cf)
  len <- length(colnames)
  colnames[(len/2 + 2) : (len)] <- colnames[2 : (len/2)]
  colnames[2 : (len/2)] <- paste0('x', seq(2 : (len/2))) 
  colnames(model_cf) <- colnames
  
  # 2 (number of movies  + 1), user_id in column
  
  model_cf <- model_cf %>%
    select(-starts_with('x'), -.out1) %>%
    gather(key = movie_id, value = score, -user_id) %>%
    arrange(user_id, desc(score)) %>%
    group_by(user_id) %>%
    mutate(user_rank = row_number()) %>%
    ungroup()
  
  
  ## overwrites model in database
  
  ## instead of writing to postgres, just gonna save as 
  # dbWriteTable(con, "model_cf", model_cf, overwrite = TRUE, row.names = FALSE)
  
  model_cf %>%
    mutate(user_count = user_count, movie_count = movie_count)
}


user_count <- c(20, 50, 100, 500, 1000, 5000, 10000)
movie_count <- c(50, 100, 200, 500)

user_count <- c(20, 50, 100, 500, 1000)
movie_count <- c(50, 100, 200, 500)


hey <- function(x) {
  # iris
  generateModelOnSubset(x$Var1, x$Var2)
}


out <- expand.grid(user_count, movie_count) %>%
  by_row(hey) %>%
  pull(.out) %>%
  bind_rows()


#######

out %>%
  filter(user_id == 0 & movie_id == 10) %>% View
  ggplot(aes(x = user_count, y = movie_count, label = round(score,3))) +
  geom_text(size = 3)


out %>%
  filter(user_id == 1 & movie_count == 50 & user_count == 20) %>%
  View

  ggplot(aes(x = user_count, y = movie_count, label = round(score,3))) +
  geom_text(size = 3)

out %>%
  filter(user_id == 1 & movie_id == 10) %>%
  ggplot(aes(x = movie_count, y = score, color = factor(user_count), group = factor(user_count))) +
    geom_line() +
    geom_point(size = 1.5)

movies_in_all_samples <- hist %>%
  select(movie_id) %>%
  distinct() %>%
  mutate(ord = runif(1)) %>%
  arrange(ord) %>%
  filter(row_number() < 50) %>%
  pull(movie_id)

out %>%
  filter(user_id == 1) %>%
  ggplot(aes(x = user_count, y = score, color = factor(movie_count), group = factor(movie_count))) +
  geom_line() +
  geom_point(size = 1.5) +
  facet_wrap()

# out %>%
#   ggplot(aes(x = user_count, y = score, color = factor(movie_count), group = factor(movie_count))) +
#   geom_line() +
#   geom_point(size = 1.5) +
#   facet_wrap(~movie_id)

