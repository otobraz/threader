const fs = require('fs');

const Discord = require('discord.js');
const { token } = require('./config.json');

const { Client, Intents } = require('discord.js');

const client = new Client({
   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commandFolders = fs
   .readdirSync('./commands')
   .filter((file) => !file.endsWith('.js'));

for (const folder of commandFolders) {
   const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith('.js'));
   for (const file of commandFiles) {
      // set a new item in the Collection
      // with the key as the command name and the value as the exported module
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
   }
}

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

// login to Discord with your app's token
// client.login(process.env.TOKEN);
client.login(token);
