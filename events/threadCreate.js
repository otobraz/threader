const { Events } = require('discord.js');
const { unansweredTagName } = require('../config/config.json');

module.exports = {
   name: Events.ThreadCreate,
   execute(thread) {
      if (!thread.parent.availableTags) return;

      const notAnsweredTag = thread.parent.availableTags.find((tag) => tag.name === unansweredTagName);

      if (!notAnsweredTag) return;

      const tagsToApply = Array(notAnsweredTag.id, ...thread.appliedTags);
      thread.setAppliedTags(tagsToApply);
   },
};
