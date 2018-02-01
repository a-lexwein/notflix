// Get things from inbox.
// check if inbox has anything in it.

// take an id from inbox.

// for each message, do recs, and add to outbox.

// message is a stringified list of integers
// attributes: user_id, algo_id
const AWS = require('aws-sdk');
const { getMoviesByIndex, getMovieCount } = require('./../database/index.js');

AWS.config.update({ region: 'us-west-2' });

const algoPicker = require('./../algo/algoPicker');

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueURL = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecs';

// const movieCount = 1000; // once db is set up, get movieCount from there.
let movieCount;
getMovieCount().then((data) => {
  movieCount = data;
});
const numRecs = 50;

const params = {
  AttributeNames: [
    'SentTimestamp',
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All',
  ],
  QueueUrl: `${queueURL}Inbox`,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, async (err, data) => {
  if (err) {
    console.log('Receive Error', err);
  } else if (data.Messages) {
    const deleteParams = {
      QueueUrl: `${queueURL}Inbox`,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    const userId = data.Messages[0].MessageAttributes.userID.StringValue;
    const algoPicks = algoPicker(movieCount, numRecs);
    const movieIds = await getMoviesByIndex(algoPicks.recs);
    const outParams = {
      DelaySeconds: 1,
      MessageAttributes: {
        userID: {
          DataType: 'Number',
          StringValue: userId,
        },
        algoID: {
          DataType: 'Number',
          StringValue: algoPicks.algoIndex.toString(),
        },
      },
      MessageBody: JSON.stringify(movieIds),
      QueueUrl: `${queueURL}Outbox`,
    };

    sqs.deleteMessage(deleteParams, (errD, dataD) => {
      if (errD) {
        console.log('Delete Error', errD);
      } else {
        console.log('Message Deleted', dataD);
      }
    });
    sqs.sendMessage(outParams, (errS, dataS) => {
      if (errS) {
        console.log('Error', errS);
      } else {
        console.log('Success', dataS.MessageId);
      }
    });
  }
});
