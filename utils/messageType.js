const { prefix } = require('./../config/config.json');

const isReply = (message) => {
   return message.reference;
};

const isCommand = (message) => {
   if (!message.content.startsWith(prefix) || message.author.bot) {
      return false;
   }
   return true;
};

module.exports = { isReply, isCommand };
