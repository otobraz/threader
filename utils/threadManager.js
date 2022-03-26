const { channelsToCreateThreadsIn } = require('../config/config.json');
const { threadNames } = require('../config/threadNames.json');

const createThread = async (message) => {
   if (message) {
      try {
         if (channelsToCreateThreadsIn.includes(Number(message.channel.id))) {
            await message.startThread({
               name: generateThreadName(message),
               autoArchiveDuration: 1440,
            });
            logThreadCreation(message);
         }
      } catch (err) {
         console.log(err);
      }
   }
};

const generateThreadName = (message) => {
   const messageIndex = Math.floor(Math.random() * threadNames.length);
   return threadNames[messageIndex].format(message.member.displayName);
};

const logThreadCreation = (message) => {
   console.log(`${message.member.displayName}(${message.author.id}) started a thread in ${message.channel}`);
};

String.prototype.format = function () {
   const args = arguments;
   return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
   });
};

module.exports = {
   createThread,
};
