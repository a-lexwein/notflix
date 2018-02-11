const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

const handleMessage = require('./handleMessageOutbox');

AWS.config.update({ region: 'us-west-2' });
const queueURL = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecs';


const app = Consumer.create({
  queueUrl: `${queueURL}Outbox`,
  messageAttributeNames: ['All'],
  attributeNames: ['SentTimestamp'],
  handleMessage,
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();
