/* eslint camelcase: "off" */
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'us-west-2' });
const QueueUrl = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecsEvents';
// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendRand = () => {
  const body = [];

  for (let i = 0; i < 20; i += 1) {
    const user_id = Math.floor(Math.random() * 100000);
    const movie_id = Math.floor(Math.random() * 3000);
    const event = { user_id, movie_id, signal: 1 };
    body.push(event);
  }
  const params = {
    DelaySeconds: 1,
    MessageAttributes: {
      completions: {
        DataType: 'String',
        StringValue: JSON.stringify(body),
      },
    },
    MessageBody: 'Latest user completions',
    QueueUrl,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};
// send some random messages;
for (let i = 0; i < 2000; i += 1) {
  sendRand();
}

// const params = {
//   AttributeNames: [
//     'SentTimestamp',
//   ],
//   MaxNumberOfMessages: 1,
//   MessageAttributeNames: [
//     'All',
//   ],
//   QueueUrl: 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecsOutbox',
//   VisibilityTimeout: 0,
//   WaitTimeSeconds: 0,
// };
//
// sqs.receiveMessage(params, (err,data) => console.log(JSON.stringify(data)));
