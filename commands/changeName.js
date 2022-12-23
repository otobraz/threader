const { SlashCommandBuilder } = require("discord.js");

const { isCommand } = require("../utils/messageType");

module.exports = {
	name: "name",
	description: "Updates threads' name",
	args: true,
	data: new SlashCommandBuilder()
		.setName("name")
		.setDescription("Updates threads' name")
		.addStringOption((option) => option.setName("title").setDescription("The new title for the thread").setRequired(true)),
	execute(message, _, args) {
		if (!message.channel.isThread()) return;

		const thread = message.channel;

		if (message.content && isCommand(message)) {
			const newName = args.join(" ");
			changeNameTextCommand(message, thread, newName);
		} else {
			const newName = message.options.getString("title");
			changeNameSlashCommand(message, thread, newName);
		}
	},
};

const changeNameSlashCommand = (message, thread, newName) => {
	changeName(thread, message.user.id, newName)
		.then(() => message.reply({ content: "Thread's name was updated", ephemeral: true }))
		.catch((err) => console.error(err));
};

const changeNameTextCommand = (message, thread, newName) => {
	changeName(thread, message.author.id, newName)
		.then(() => message.delete())
		.catch((err) => {
			console.error("Issue when trying to change a thread's name");
			console.error(err);
			console.error("Issue when trying to change a thread's name");
		});
};

const changeName = async (thread, authorId, newName) => {
	const starterMessage = await thread.fetchStarterMessage();
	if (starterMessage && starterMessage.author.id !== authorId) {
		throw `${authorId} tried to change someone else's thread`;
	}
	await thread.setName(newName).catch(console.error);
};
