module.exports = {
   name: 'name',
   description: "Updates threads' name",
   args: true,
   execute(message, args) {
      const newName = args.join(' ');
      if (message.channel.isThread) {
         const thread = message.channel;
         changeName(thread, message.author.id, newName)
            .then(() => message.delete())
            .catch(console.error);
      }
   },
};

const changeName = async (thread, authorId, newName) => {
   const starterMessage = await thread.fetchStarterMessage();
   if (starterMessage.author.id !== authorId) {
      throw `${authorId} tried to change someone else's thread`;
   }
   await thread.setName(newName).catch(console.error);
};
