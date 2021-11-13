const fs = require('fs');
const keepAlive = require('./server');

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

const eventFiles = fs
   .readdirSync('./events')
   .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
   const event = require(`./events/${file}`);
   if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
   } else {
      client.on(event.name, (...args) => event.execute(...args, client));
   }
}

keepAlive();
client.login(TOKEN);
