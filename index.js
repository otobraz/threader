const keepAlive = require('./server');
const { loadCommands } = require('./utils/commandLoader');
const { loadEvents } = require('./utils/eventLoader');

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const { Client, Intents } = require('discord.js');

const client = new Client({
   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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

loadCommands(client);
loadEvents(client);

client.on('debug', (e) => console.log(e));

client.login(TOKEN);
