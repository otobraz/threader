// const { createThread } = require('../utils/threadManager');
// const { handleReply } = require('../utils/handleReply');

// const { Permissions } = require('discord.js');

// module.exports = {
//    name: 'messageCreate',
//    execute(message) {
//       if (message.author.bot) {
//          return;
//       }

//       const botRequiredPerms = [
//          Permissions.FLAGS.CREATE_PUBLIC_THREADS,
//          Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
//          Permissions.FLAGS.MANAGE_MESSAGES,
//       ];

//       const botPerms = message.channel.permissionsFor(message.guild.me);

//       if (!botPerms.has(botRequiredPerms)) {
//          return console.log(
//             `Bot is missing permissions on ${message.guild.name}:`,
//             '\n',
//             `Create public threads: ${botPerms.has(Permissions.FLAGS.CREATE_PUBLIC_THREADS)}`,
//             '\n',
//             `Send messages in threads: ${botPerms.has(Permissions.FLAGS.SEND_MESSAGES_IN_THREADS)}`,
//             '\n',
//             `Manage messages: ${botPerms.has(Permissions.FLAGS.MANAGE_MESSAGES)}`
//          );
//       }

//       if (isReply(message)) {
//          handleReply(message);
//       } else {
//          createThread(message);
//       }
//    },
// };

// const isReply = (message) => {
//    return message.reference;
// };
