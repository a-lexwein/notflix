const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

const handleMessage = require('./handleMessageBrowsing');

AWS.config.update({ region: 'us-west-2' });
const queueURL = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecs';


const app = Consumer.create({
  queueUrl: `https://sqs.us-west-2.amazonaws.com/361004913048/job_queue`,
  messageAttributeNames: ['All'],
  handleMessage,
});

app.on('error', (err) => {
  console.log(err.message);
});

module.exports = app;
