const { EmbedBuilder } = require('discord.js');

const handleReply = async (message) => {
	if (message) {
		const originMessageId = message.reference.messageId;
		const originMessage = await getOriginMessage(message, originMessageId);
		if (originMessage && originMessage.hasThread) {
			await sendReplyToThread(message, originMessage.thread);
			deleteReply(message);
		}
	}
};

const deleteReply = async (replyMessage) => {
	const deletedMessage = await replyMessage.delete();
	console.log(`Deleted message from ${deletedMessage.author.username}`);
};

const sendReplyToThread = async (replyMessage, thread) => {
	const embed = makeEmbed(replyMessage);
	thread
		.send({
			content: `<@${replyMessage.author.id}> has replied to this thread with:`,
			embeds: [embed],
		})
		.then((message) => console.log(`Sent message: ${replyMessage}`))
		.catch((error) => {
			console.error('Error when replying to thread');
			console.error(error);
			console.error('Error when replying to thread');
		});
};

const getOriginMessage = async (replyMessage, originMessageId) => {
	return replyMessage.channel.messages.fetch(originMessageId);
};

const makeEmbed = (replyMessage) => {
	const content = `${replyMessage.content}`;
	const embed = new EmbedBuilder().setDescription(content).setColor('#0047A0');
	if (replyMessage.attachments.size) {
		embed.setImage(replyMessage.attachments.first().url);
	}
	return embed;
};

module.exports = { handleReply };
