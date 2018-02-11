const { appendFile } = require('fs');

const handleMessage = async (message, done) => {
  const body = message.Body;
  const sentTime = Number(message.Attributes.SentTimestamp);
  const algoID = message.MessageAttributes.algoID.StringValue;
  const userID = message.MessageAttributes.userID.StringValue;

  const row = [new Date(sentTime).toISOString(), algoID, userID, body].join('\t') + '\n';
  console.log(row);
  appendFile('log.txt', row, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
  done();
};

module.exports = handleMessage;
