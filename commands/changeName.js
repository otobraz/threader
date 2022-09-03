module.exports = {
   name: 'name',
   description: 'Updates threads\' name',
   args: true,
   execute(message, client, args) {
      const newName = args.join(' ');
      if (message.channel.isThread) {
         const thread = message.channel;
         changeName(thread, message.author.id, newName)
            .then(() => message.delete())
            .catch(err => {
               console.error('Issue when trying to change a thread\'s name');
               console.error(err);
               console.error('Issue when trying to change a thread\'s name');
            });
      }
   },
};

const changeName = async (thread, authorId, newName) => {
   const starterMessage = await thread.fetchStarterMessage();
   if (starterMessage && starterMessage.author.id !== authorId) {
      throw `${authorId} tried to change someone else's thread`;
   }
   await thread.setName(newName).catch(console.error);
};
