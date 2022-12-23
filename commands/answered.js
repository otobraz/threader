const { isThreadManager } = require("../utils/permissions");
const { closeThread, setTags, isForumThread } = require("../utils/threadManager");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	name: "answered",
	description: "Archives current thread!",
	aliases: ["a", "archive"],
	data: new SlashCommandBuilder().setName("answered").setDescription("Archives current thread!"),
	execute(interaction) {
		if (interaction.channel.isThread) {
			const thread = interaction.channel;
			answered(thread, interaction).catch((err) => {
				console.error("Something happened when I tried to archive a thread");
				console.error(err);
			});
		}
	},
};

const answered = async (thread, interaction) => {
	const starterMessage = await thread.fetchStarterMessage();
	if (starterMessage && canArchiveThread(starterMessage, interaction)) {
		if (isForumThread(thread)) {
			setTags(thread);
		} else {
			await closeThread(thread);
			setTimeout(function() {
				thread.setArchived(true);
			}, 1000);
		}
		await interaction.reply(`<@${interaction.member.id}> has marked this thread as answered`);
	} else {
		await interaction.reply({ content: "Only thread owners can mark their threads as answered", ephemeral: true });
	}
};

const canArchiveThread = (starterMessage, interaction) => {
	return starterMessage.author.id === interaction.member.id || isThreadManager(interaction.channel, interaction.member);
};
