const { loadSlashCommands } = require('./utils/commandLoader');
const { loadEvents } = require('./utils/eventLoader');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

require('dotenv').config();
const TOKEN = process.env.TOKEN;


const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
	presence: {
		status: 'online',
		activities: [
			{
				name: 'Learning Channels',
				type: ActivityType.Watching,
			},
			{
				name: 'Thread It!',
				type: ActivityType.Playing,
			},
		],
	},
});

loadSlashCommands(client);
loadEvents(client);

client.login(TOKEN);
