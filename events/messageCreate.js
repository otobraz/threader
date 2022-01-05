const { createThread } = require('../utils/threadManager');
const { channelsToCreateThreadsIn } = require('../config/config.json');
const { handleReply } = require('../utils/handleReply');
const { isReply, isCommand } = require('../utils/messageType');
const { prefix } = require('./../config/config.json');

const { Permissions } = require('discord.js');

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
      } else if (
         isCommand(message) &&
         message.channel.isThread() &&
         channelsToCreateThreadsIn.includes(Number(message.channel.parentId))
      ) {
         if (botHasPerms(message)) {
            executeCommand(message, client);
         }
      }
   },
};

const botHasPerms = (message) => {
   const botRequiredPerms = [
      Permissions.FLAGS.CREATE_PUBLIC_THREADS,
      Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
      Permissions.FLAGS.MANAGE_MESSAGES,
   ];

   const botPerms = message.channel.permissionsFor(message.guild.me);

   if (!botPerms.has(botRequiredPerms)) {
      console.log(
         `Bot is missing permissions on ${message.guild.name}:`,
         '\n',
         `Create public threads: ${botPerms.has(Permissions.FLAGS.CREATE_PUBLIC_THREADS)}`,
         '\n',
         `Send messages in threads: ${botPerms.has(Permissions.FLAGS.SEND_MESSAGES_IN_THREADS)}`,
         '\n',
         `Manage messages: ${botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES)}`
      );
      return false;
   }
   return true;
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
         console.error(error);
         message.reply('there was an error trying to execute that command!');
      }
   }
};
