const AWS = require('aws-sdk');

const algoPicker = require('./../algo/algoPicker');
const { getMoviesByIndex, getMovieCount } = require('./../database/index.js');

AWS.config.update({ region: 'us-west-2' });

let movieCount;
getMovieCount().then((data) => {
  movieCount = data;
});
const numRecs = 50;


const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueURL = 'https://sqs.us-west-2.amazonaws.com/521939927944/notflixRecs';

const handleMessage = async (message, done) => {
  // do some work with `message`
  const userId = message.MessageAttributes.userID.StringValue;
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

  sqs.sendMessage(outParams, (errS, dataS) => {
    if (errS) {
      console.log('Error', errS);
    } else {
      console.log('Success', dataS.MessageId);
    }
  });
  done();
};

module.exports = handleMessage;
