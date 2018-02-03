const consumerBrowsing = require('./../sqs/consumerBrowsing');
const consumerEvents = require('./../sqs/consumerEvents');
const refresh = require('./../database/refreshNaiveModel.js');

// refresh model on init, and every 2 hours of uptime.
refresh();
const twoHours = 60 * 60 * 1000 * 2;
setInterval(refresh, twoHours);

// start SQS polling for both inboxes.
consumerBrowsing.start();
consumerEvents.start();
