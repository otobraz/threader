const { isThreadManager } = require('../utils/permissions');
const { closeThread } = require('../utils/threadManager');
const { channelsToCreateThreadsIn } = require('../config/config.json');

module.exports = {
   name: 'archiveAll',
   description: 'Archives answered threads!',
   aliases: ['archiveall'],
   execute(message, client) {
      if (isThreadManager(message.channel, message.member)) {
         channelsToCreateThreadsIn.forEach((channelId) => {
            archiveAll(client, channelId);
         });
      }
      message.delete().catch(error => console.error(error));
   },
};

const archiveAll = async (client, channelId) => {
   try {
      const channel = await client.channels.fetch(channelId);
      if (channel == undefined) return;
      const activeThreads = await channel.threads.fetchActive();
      activeThreads.threads.filter((thread) => isAnswered(thread)).forEach((thread) => thread.setArchived(true));
   } catch (error) {
      console.error(`Error while fetching channel ${channelId}`);
   }
};

const canArchiveAllThreads = (starterMessage, message) => {
   return isThreadManager(message.channel, message.member);
};

const isAnswered = (thread) => {
   return thread.name.startsWith('[Answered]');
};

const sleep = (m) => new Promise((r) => setTimeout(r, m));