const { PermissionsBitField } = require('discord.js');

const botHasPerms = (message) => {
	const botRequiredPerms = [
		PermissionsBitField.Flags.CreatePublicThreads,
		PermissionsBitField.Flags.SendMessagesInThreads,
		PermissionsBitField.Flags.ManageMessages,
	];

	const botPerms = message.channel.permissionsFor(message.guild.members.me);
	if (!botPerms.has(botRequiredPerms)) {
		console.log(
			`Bot is missing permissions on ${message.guild.name}:`,
			'\n',
			`Create public threads: ${botPerms.has(PermissionsBitField.Flags.CreatePublicThreads)}`,
			'\n',
			`Send messages in threads: ${botPerms.has(PermissionsBitField.Flags.SendMessagesInThreads)}`,
			'\n',
			`Manage messages: ${botPerms.has(PermissionsBitField.Flags.ManageMessages)}`,
		);
		return false;
	}
	return true;
};

const isThreadManager = (channel, member) => {
	const memberPerms = channel.permissionsFor(member);
	return memberPerms.has(PermissionsBitField.Flags.ManageThreads);
};

module.exports = { isThreadManager, botHasPerms };
