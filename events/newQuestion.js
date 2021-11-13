// "channelsToCreateThreadsIn" key must be set on the config.json file
const { channelsToCreateThreadsIn } = require('./../config.json');

const { threadNames } = require('./../threadNames.json');

module.exports = {
   name: 'messageCreate',
   async execute(message) {
      if (channelsToCreateThreadsIn.includes(Number(message.channel.id))) {
         await message.startThread({
            name: generateThreadName(message),
            autoArchiveDuration: 1440,
         });
         console.log(
            `${message.member.displayName}(${message.author.id}) started a thread in ${message.channel}`
         );
      }
   },
};

//
String.prototype.format = function () {
   const args = arguments;
   return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
   });
};

const generateThreadName = (message) => {
   const messageIndex = Math.floor(Math.random() * threadNames.length);
   return threadNames[messageIndex].format(message.member.displayName);
};
