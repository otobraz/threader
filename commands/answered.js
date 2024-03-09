const { isThreadManager } = require("../utils/permissions");
const { closeThread, setTags, isForumThread } = require("../utils/threadManager");
const { SlashCommandBuilder } = require("discord.js");
const { rolesThatCanArchiveThreads } = require("../config/config.json");

module.exports = {
	name: "answered",
	description: "Archives current thread!",
	aliases: ["a", "archive"],
	data: new SlashCommandBuilder().setName("answered").setDescription("Archives current thread!"),
	execute(interaction) {
		if (interaction.channel.isThread()) {
			const thread = interaction.channel;
			answered(thread, interaction).catch((err) => {
				interaction.reply({ content: "Something went wrong when I tried to archive the thread", ephemeral: true });
				console.error(err);
			});
		}
	},
};

const answered = async (thread, interaction) => {
	if (isForumThread(thread)) return handleForumThreads(thread, interaction);
	handleDefaultThreads(thread, interaction);
};

const handleDefaultThreads = async (thread, interaction) => {
	const starterMessage = await getStarterMessage(thread);

	if (!starterMessage) {
		return await interaction.reply({
			content: "Thread could not be archived. Thread owner could not be determined because starter message was deleted.",
			ephemeral: true,
		});
	}

	if (!canArchiveDefaultThread(starterMessage, interaction)) {
		return await interaction.reply({
			content: "Only thread owners can mark their threads as answered", ephemeral: true,
		});
	}

	await closeThread(thread);
	setTimeout(function() { thread.setArchived(true); }, 1000);
	await interaction.reply(
		`<@${interaction.member.id}> has marked this thread as answered. It will be archived after 1 day of inactivity.`);
};

const handleForumThreads = async (thread, interaction) => {
	if (!canArchiveForumThread(thread.ownerId, interaction)) {
		return await interaction.reply({
			content: "Only thread owners can mark their threads as answered", ephemeral: true 
		});
	}
	setTags(thread);
	await interaction.reply(
		`<@${interaction.member.id}> has marked this thread as answered. It will be archived after 1 day of inactivity.`
	);
};

const canArchiveForumThread = (ownerId, interaction) => {
	return ownerId === interaction.member.id ||
				interaction.member.roles.cache.some(role => rolesThatCanArchiveThreads.includes(role.id)) ||
				isThreadManager(interaction.channel, interaction.member);
};

const canArchiveDefaultThread = (starterMessage, interaction) => {
	return starterMessage.author.id === interaction.member.id ||
				interaction.member.roles.cache.some(role => rolesThatCanArchiveThreads.includes(role.id)) ||
				isThreadManager(interaction.channel, interaction.member);
};

const getStarterMessage = async (thread) => {
	try {
		return await thread.fetchStarterMessage();
	} catch {
		return undefined;
	}
};