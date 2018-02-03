const consumerBrowsing = require('./../sqs/consumerBrowsing');
const consumerEvents = require('./../sqs/consumerEvents');

consumerBrowsing.start();
consumerEvents.start();
