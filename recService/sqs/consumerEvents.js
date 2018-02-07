const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

const handleMessage = require('./handleMessageEvents');

AWS.config.update({ region: 'us-west-2' });
const queueUrl = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecsEvents';


const app = Consumer.create({
  queueUrl,
  messageAttributeNames: ['All'],
  handleMessage,
});

app.on('error', (err) => {
  console.log(err.message);
});

module.exports = app;
