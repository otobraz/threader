const { loadSlashCommands } = require('./utils/commandLoader');
const { loadEvents } = require('./utils/eventLoader');

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
   presence: {
      status: 'online',
      activities: [
         {
            name: 'Learning Channels',
            type: 'WATCHING',
         },
         {
            name: 'Thread It!',
            type: 'PLAYING',
         },
      ],
   },
});

loadSlashCommands(client);
loadEvents(client);

client.login(TOKEN);
