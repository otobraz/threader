const { createThread } = require('../utils/threadManager');
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

      checkPerms(message);

      if (isCommand(message)) {
         const args = message.content.slice(prefix.length).trim().split(/ +/);
         const commandName = args.shift().toLowerCase();
         const command =
            client.commands.get(commandName) ||
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
         try {
            command.execute(message, args);
         } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
         }
      } else {
         newQuestion(message);
      }
   },
};

const checkPerms = (message) => {
   const botRequiredPerms = [
      Permissions.FLAGS.CREATE_PUBLIC_THREADS,
      Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
      Permissions.FLAGS.MANAGE_MESSAGES,
   ];

   const botPerms = message.channel.permissionsFor(message.guild.me);

   if (!botPerms.has(botRequiredPerms)) {
      return console.log(
         `Bot is missing permissions on ${message.guild.name}:`,
         '\n',
         `Create public threads: ${botPerms.has(Permissions.FLAGS.CREATE_PUBLIC_THREADS)}`,
         '\n',
         `Send messages in threads: ${botPerms.has(Permissions.FLAGS.SEND_MESSAGES_IN_THREADS)}`,
         '\n',
         `Manage messages: ${botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES)}`
      );
   }
};

const newQuestion = (message) => {
   if (isReply(message)) {
      handleReply(message);
   } else {
      createThread(message);
   }
};
