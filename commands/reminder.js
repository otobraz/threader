module.exports = {
	name: "reminder",
	description: "Reminds people to archive their thread",
	aliases: ["r"],
	async execute(message) {
		if (message.channel.isThread) {
			const thread = message.channel;
			reminder(thread)
				.then(() => message.delete())
				.catch((err) => {
					message.reply("I couldn't remind the thread owner because the starter message was deleted.");
					console.error(err);
				});
		}
	},
};

const reminder = async (thread) => {
	const starterMessage = await thread.fetchStarterMessage();
	if (starterMessage) {
		await thread.send(`<@${starterMessage.author.id}>, remember to mark your question as answered with \`/answered\``);
	}
};