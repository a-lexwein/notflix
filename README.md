# notflix
Movie Recommendation Engine

This repo contains a Recommendation Engine micro-service, for an movie app inspired by Netflix.  It was my System Design Capstone at Hack Reactor, the culmination of a 12 week immersive software development bootcamp.

The service is written in Javascript using Node with a PostgreSQL database.

The system uses a collaborative filtering algorithm implemented in R to generate personalized movie recommendations based on what movies each user has watched in the system.  There is also a second, less complex algorithm that delivers recommendations based on global movie popularity, implemented in Javascript.

Inter-service communication was handled with Amazon's Simple Queue Service.

Browsing and Watching Service - Chris Chen
Movie Inventory Service - Ted Anyansi
Events Service - Sam Martin

Open source:
Node.js and R languages
npm packages
R packages

## Roadmap

View the project roadmap [here](LINK_TO_DOC)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Other Information

(TODO: fill this out with details about your project. Suggested ideas: architecture diagram, schema, and any other details from your app plan that sound interesting.)
