const fs = require('fs');
const path = require('path');

const { Collection } = require('discord.js');

module.exports = {
   loadCommands: (client) => {
      const commandDir = path.join(__dirname, '..', 'commands');
      console.log(commandDir);
      client.commands = new Collection();
      const commandFiles = fs.readdirSync(commandDir).filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
         const command = require(`${commandDir}/${file}`);
         client.commands.set(command.name, command);
      }
   },
};
