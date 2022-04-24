const { channelsToCreateThreadsIn } = require('../config/config.json');

module.exports = {
   name: 'messageDelete',
   execute(message) {
      if (channelsToCreateThreadsIn.includes(Number(message.channel.id)) && message.hasThread) {
         message.thread.delete('Someone deleted the starter message').catch((err) => {
            console.error('Error when someone deleted a starter message');
            console.log(err.message);
            console.error('Error when someone deleted a starter message');
         });
      }
   },
};
