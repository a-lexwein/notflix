library(ggplot2)
ggplot(iris, aes(Sepal.Length, Sepal.Width)) + geom_point()
ggsave('test.png')