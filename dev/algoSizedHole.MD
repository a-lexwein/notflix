Building a microsystem MVP with a Machine Learning sized hole in the middle.
- recommendation engine for a Netflix style app
- The system received updates on event history indicating which users had watched which movies.
- That history needed to be fed into an algorithm resulting in a model stored in a database.
- On the other end, my system handles requests for recommendations.
- Browsing system gives me user_id and I give back a list of movies to be recommended to that user

- Developing interservice communication was a bigger priority than implemented collaborative filter.
- In the mean time, I needed a simpler algorithm to connect the pipes.
- Research collaborative filtering to understand the steps, make sure I knew the IO
- I have a background in data manipulation, so I was comfortable diving in and understanding "just enough"
- Working from both ends, narrowing down the DO COLLAB FILTERING step to as small as it can get
- Naive model recs are user specific, but more popular movies are recommended more often
- In this way, it is a closed ML loop.
- As I transition into the more complicated model, shrinking the size of the question mark on both ends.


two input streams:
  enough info from user history to know when a user watches a movie.
  On the other side, I receive requests with a user_id parameter, and return
- My system input was watch history: user_id watched movie_id at timestamp
  - generates a model.
  - on our way to an item-item collaborative filtering algorithm
- On the other side, I'm responding to a browsing service asking for more recommendations for a user.
  - algorithm's input: user_id, output: list of movie_ids.

1. Learn enough about Collaborative filtering to understand inputs outputs, possible challenges.
2.

stored the naive model,

# Building an algorithm sized hole into an MVP.

My team and I began building a Netflix clone.
two week sprint from ideation to mvp
I was working on a two week sprint for a recommendation engine.

take event history data, turn it into a model.
When given a username, deliver a list of recommendations based on that model.

- For MVP, nailing down inter-service communication was a bigger priority that the algorithm
- so the challenge was:
  - as little algo as possible to connect the pipes
  - built in such a a way that switching to another algorithm wouldn't be more painful that needed.
- working the problem from both ends
- dummy signal
- a naive model that resembles the final model key ways:
- Now just need where clause.

- Risk: putting off the part you don't know how to do.

- Simple model has one row per movie, and is fully sorted, with better recommendations first,
- Complex model has one row per user/movie.
- Possible the table that represents the CF model can just have an extra user_id column, and be numUsers times longer.  Then only refactor would be adding `WHERE user_id = x` to the query.

- a content filitering algo doesn't generate recommendations, it generates guess about how much someone will like a movie

- Start super dumb.
  uniform distribution
  random number generator that takes a bias argument.
- Add in a database
- sort database by popularity;
- Roughest version of something that could be considered machine learning.

- work the problem from both ends

# Refilling water glasses.
Inbox/Outbox SQS architecture.

# Pefect sunday:
- Get lambda hello world
- doing laundry
- getting outside

# inbox/outbox workflow with SQS
- Our microservices primarily talk to each other using SQS
- My system has two inboxes: Browsing gives me

- Advantages of SQS: fast and scalable.
- Different way of thinking from direct HTTP requests.  Building some slack into the system.

- sqs-consumer npm package [https://www.npmjs.com/package/sqs-consumer]
- aws-sdk (set up queues, post messages outside of consumer)
