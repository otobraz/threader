const { Events } = require('discord.js');

module.exports = {
   name: Events.ThreadCreate,
   execute(thread) {
      if (!thread.parent.availableTags) return;

      const notAnsweredTag = thread.parent.availableTags.find((tag) => tag.name === 'Not Answered');
      
      if (!notAnsweredTag) return;
      
      const tagsToApply = Array(notAnsweredTag.id, ...thread.appliedTags);
      thread.setAppliedTags(tagsToApply);
   },
};
