const { createThread } = require('../utils/threadManager');
const { handleReply } = require('../utils/handleReply');

module.exports = {
   name: 'messageCreate',
   execute(message) {
      if (message.author.bot) {
         return;
      }
      if (isReply(message)) {
         handleReply(message);
      } else {
         createThread(message);
      }
   },
};

const isReply = (message) => {
   return message.reference;
};
