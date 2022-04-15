const { Permissions } = require('discord.js');

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

const isThreadManager = (channel, member) => {
   const memberPerms = channel.permissionsFor(member);
   return memberPerms.has(Permissions.FLAGS.MANAGE_THREADS);
};

module.exports = { isThreadManager, botHasPerms };
