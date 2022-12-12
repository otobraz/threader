const { channelsToCreateThreadsIn, threadInitMsg } = require('../config/config.json');
const { threadNames } = require('../config/threadNames.json');
const { threadAutoArchiveDuration } = require('../config/config.json');

const createThread = async (message) => {
   if (message) {
      try {
         if (channelsToCreateThreadsIn.includes(message.channel.id)) {
            await message.startThread({
               name: generateThreadName(message),
               autoArchiveDuration: threadAutoArchiveDuration,
            });
            logThreadCreation(message);
            message.thread.send(`<@${message.author.id}>, ${threadInitMsg}`).catch(console.error);
         }
      } catch (err) {
         console.error('Error when replying to thread');
      }
   }
};

const generateThreadName = (message) => {
   const messageIndex = Math.floor(Math.random() * threadNames.length);
   return threadNames[messageIndex].format(message.member.displayName);
};

const logThreadCreation = (message) => {
   console.log(
      `${message.member.displayName}(${message.author.id}) started a thread in ${message.channel}`
   );
};

const openThread = (thread) => {
   if (thread.name.startsWith('[Answered] -')) {
      const newName = thread.name.replace('[Answered]', '[Open]');
      thread.setName(newName);
   }
};

const closeThread = async (thread) => {
   const oldName = thread.name;

   if (oldName.startsWith(`[Answered] - `)) return;

   const newName = `[Answered] - ${oldName}`;
   thread.setName(newName);
};

const setTags = (thread) => {
   const answeredTag = thread.parent.availableTags.find((tag) => tag.name === 'Answered');
   const notAnsweredTag = thread.parent.availableTags.find((tag) => tag.name === 'Not Answered');
   const tagsToApply = [...new Set(Array(answeredTag.id, ...thread.appliedTags.filter((tag) => tag !== notAnsweredTag.id)))];
   thread.setAppliedTags(tagsToApply);
};

const isForumThread = thread => thread.parent.availableTags;

String.prototype.format = function () {
   const args = arguments;
   return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
   });
};

module.exports = {
   createThread,
   openThread,
   closeThread,
   setTags,
   isForumThread,
};
