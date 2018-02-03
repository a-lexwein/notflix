const { insertIntoHistory } = require('./../database/index');

const handleMessage = async (message, done) => {
  let completions = message.MessageAttributes.completions.StringValue;
  completions = JSON.parse(completions);
  completions
    .map(event => Object.assign(event, { timestamp: new Date().toISOString() }))
    .forEach(async event => insertIntoHistory(event));
  done();
};

module.exports = handleMessage;
