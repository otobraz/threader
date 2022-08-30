const { isThreadManager } = require('./../utils/permissions');
const { closeThread } = require('../utils/threadManager');

module.exports = {
   name: 'answered',
   description: 'Archives current thread!',
   aliases: ['a', 'archive'],
   execute(message) {
      if (message.channel.isThread) {
         const thread = message.channel;
         answered(thread, message).catch((err) => {
            console.error('Something happened when I tried to archive a thread');
            console.error(err);
         });
      }
   },
};

const answered = async (thread, message) => {
   const starterMessage = await thread.fetchStarterMessage();
   if (starterMessage && canArchiveThread(starterMessage, message)) {
      await thread.setAutoArchiveDuration(60);
      await closeThread(thread);
      await thread.send(
         `<@${message.author.id}> has marked this thread as answered`
      );
      thread.setArchived(true);
   } else {
      await message.reply('Only thread owners can mark their threads as answered');
   }
};

const canArchiveThread = (starterMessage, message) => {
   return starterMessage.author.id === message.author.id || isThreadManager(message.channel, message.member);
};
