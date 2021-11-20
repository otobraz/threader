module.exports = {
   name: 'archive',
   description: 'Archives current thread!',
   execute(message) {
      if (message.channel.isThread) {
         const thread = message.channel;
         try {
            archive(thread, message.author.id);
         } catch (err) {
            console.log(err);
         }
      }
   },
};

const archive = async (thread, authorId) => {
   const starterMessage = await thread.fetchStarterMessage();
   if (starterMessage.author.id === authorId) {
      await thread.send(`<@${authorId}> has archived this thread`);
      await thread.setArchived(true);
   }
};
