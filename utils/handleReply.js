const { MessageEmbed } = require('discord.js');

const handleReply = async (message) => {
   const originMessageId = message.reference.messageId;
   const originMessage = await getOriginMessage(message, originMessageId);
   if (originMessage.hasThread) {
      await sendReplyToThread(message, originMessage.thread);
      await deleteReply(message);
   }
};

const deleteReply = async (replyMessage) => {
   const deletedMessage = await replyMessage.delete();
   console.log(`Deleted message from ${deletedMessage.author.username}`);
};

const sendReplyToThread = async (replyMessage, thread) => {
   const embed = makeEmbed(replyMessage);
   await thread.send({
      content: `<@${replyMessage.author.id}> has replied to this thread with:`,
      embeds: [embed],
   });
};

const getOriginMessage = async (replyMessage, originMessageId) => {
   return await replyMessage.channel.messages.fetch(originMessageId);
};

const makeEmbed = (replyMessage) => {
   const content = `${replyMessage.content}`;
   const embed = new MessageEmbed().setDescription(content).setColor('#0047A0');
   if (replyMessage.attachments.size) {
      embed.setImage(replyMessage.attachments.first().url);
   }
   return embed;
};

module.exports = { handleReply };
