const { createThread } = require('../utils/threadManager');
const { handleReply } = require('../utils/handleReply');

const { Permissions } = require('discord.js');

module.exports = {
   name: 'messageCreate',
   execute(message) {
      if (message.author.bot) {
         return;
      }

      const botPerms = [
         Permissions.FLAGS.CREATE_PUBLIC_THREADS,
         Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
         Permissions.FLAGS.MANAGE_MESSAGES,
      ];

      if (!message.guild.me.permissions.has(botPerms)) {
         return console.log(
            `Bot is missing permissions on ${message.guild.name}:`,
            '\n',
            `Create public threads: ${message.guild.me.permissions.has(Permissions.FLAGS.CREATE_PUBLIC_THREADS)}`,
            '\n',
            `Send messages in threads: ${message.guild.me.permissions.has(Permissions.FLAGS.CREATE_PUBLIC_THREADS)}`,
            '\n',
            `Manage messages: ${message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)}`
         );
      }

      if (isReply(message)) {
         handleReply(message);
      } else {
         createThread(message);
      }
   },
};

const isReply = (message) => {
   return message.reference;
};
