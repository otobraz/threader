const { createThread, openThread } = require('../utils/threadManager');
const { channelsToCreateThreadsIn } = require('../config/config.json');
const { handleReply } = require('../utils/handleReply');
const { isReply, isCommand } = require('../utils/messageType');
const { prefix } = require('./../config/config.json');
const { botHasPerms } = require('./../utils/permissions');

module.exports = {
   name: 'messageCreate',
   execute(message, client) {
      if (message.author.bot) {
         return;
      }

      if (channelsToCreateThreadsIn.includes(Number(message.channel.id))) {
         if (botHasPerms(message)) {
            newQuestion(message);
         }
      } else if (isCommandInAThread(message)) {
         if (botHasPerms(message)) {
            executeCommand(message, client);
         }
      }
      // else if (isValidThread(message)) {
      //    openThread(message.channel);
      // }
   },
};

const newQuestion = (message) => {
   if (isReply(message)) {
      handleReply(message);
   } else {
      createThread(message);
   }
};

const executeCommand = (message, client) => {
   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const commandName = args.shift().toLowerCase();
   const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
   if (command) {
      try {
         command.execute(message, args);
      } catch (error) {
         console.error('Error when executing a command');
         console.error(error);
         console.error('Error when executing a command');
         message.reply('There was an error trying to execute that command!');
      }
   }
};

const isCommandInAThread = (message) => {
   return isCommand(message) && isValidThread(message);
};

const isValidThread = (message) => {
   return message.channel.isThread() && channelsToCreateThreadsIn.includes(Number(message.channel.parentId));
};
