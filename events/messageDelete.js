const { channelsToCreateThreadsIn } = require('../config/config.json');

module.exports = {
   name: 'messageDelete',
   execute(message) {
      if (channelsToCreateThreadsIn.includes(Number(message.channel.id)) && message.hasThread) {
         message.thread.delete('Someone deleted the starter message').catch((err) => console.log(err.message));
      }
   },
};
