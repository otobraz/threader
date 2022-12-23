const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

const loadSlashCommands = (client) => {
	client.commands = new Collection();

	const commandsPath = path.join(__dirname, "..", "commands");
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			client.commands.set(command.name, command);
		}
	}
};

module.exports = {
	loadCommands: (client) => {
		const commandDir = path.join(__dirname, "..", "commands");
		const commandFiles = fs.readdirSync(commandDir).filter((file) => file.endsWith(".js"));

		for (const file of commandFiles) {
			const command = require(`${commandDir}/${file}`);
			client.commands.set(command.name, command);
		}
	},
	loadSlashCommands,
};
