// sqsDummySend.js
const AWS = require('aws-sdk');
const weightedRandomInt = require('./../algo/weightedRandomInt');
// Set the region
AWS.config.update({ region: 'us-west-2' });
const url = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecsInbox';
// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendRand = () => {
  const params = {
    DelaySeconds: 1,
    MessageAttributes: {
      userID: {
        DataType: 'Number',
        StringValue: weightedRandomInt(1000, 1).toString(),
      },
    },
    MessageBody: 'Next Message',
    QueueUrl: url,
  };
  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};
// send 200 random messages;
let i = 0;
while (i < 200) {
  sendRand();
  i += 1;
}
