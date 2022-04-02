module.exports = {
   name: 'archive',
   description: 'Archives current thread!',
   execute(message) {
      if (message.channel.isThread) {
         const thread = message.channel;
         archive(thread, message.author.id);
      }
   },
};

const archive = (thread, authorId) => {
   thread
      .fetchStarterMessage()
      .then((starterMessage) => {
         if (starterMessage.author.id === authorId) {
            thread.send(`<@${authorId}> has archived this thread`).then(thread.setArchived(true));
         }
      })
      .catch((err) => {
         console.error('Something happened when I tried to archive a thread');
         console.error(err);
      });
};
