const { channelsToCreateThreadsIn } = require('./../config.json');

module.exports = {
   name: 'messageCreate',
   async execute(message) {
      if (channelsToCreateThreadsIn.includes(Number(message.channel.id))) {
         const thread = await message.startThread({
            name: message.member.displayName,
            autoArchiveDuration: 1440,
         });
         console.log(`Created ${thread.name} thread in ${message.channel}`);
      }
   },
};
