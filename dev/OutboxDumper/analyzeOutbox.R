library(tidyverse)
library(lubridate)

logs <- read.delim('/Users/alexwein/codes/notflix/log.txt', sep = '\t', header = FALSE, stringsAsFactors = FALSE)
names(logs) <- c('time_sent', 'algo_id', 'user_id', 'body')

logs <- logs %>%
  mutate(time_sent = as_datetime(time_sent))

logs %>%
  arrange(desc(time_sent)) %>%
  mutate(ddiff = time_sent - lead(time_sent)) %>%
  head(1)

# most recent run before indexing
#            time_sent algo_id user_id
# 1 2018-02-11 00:31:32       0      67


x <- '2018-02-08T19:37:44.343Z'
