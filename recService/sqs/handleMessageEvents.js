// const AWS = require('aws-sdk');
//
// AWS.config.update({ region: 'us-west-2' });
//
// const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const { insertIntoHistory } = require('./../database/index');

const handleMessage = async (message, done) => {
  // do some work with `message`
  await insertIntoHistory(JSON.parse(message.body));
  done();
};

module.exports = handleMessage;
