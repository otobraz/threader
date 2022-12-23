const {
	channelsToCreateThreadsIn,
	answeredTagName,
	answeredThreadAutoArchiveDuration,
	unansweredThreadAutoArchiveDuration,
} = require("../config/config.json");

const MILLISECONDS_TO_SECONDS = 1000;
const SECONDS_TO_MINUTES = 60;

const autoArchiveInactiveThreads = async (client) => {
	console.log(`Running auto archive task\n`);
	for (const channelId of channelsToCreateThreadsIn) {
		await archiveInactiveThreads(client, channelId).catch((error) => {
			console.log("Error while auto archiving inactive threads");
			console.log(`${error}`);
		});
	}
};

const archiveInactiveThreads = async (client, channelId) => {
	console.log(`\nArchiving answered threads in ${channelId}`);
	const openThreads = await getOpenThreads(client, channelId);
	if (!openThreads) return;
	openThreads.forEach((thread) => archiveThreadIfInactive(thread));
};

const archiveThreadIfInactive = async (thread) => {
	const lastMessage = await thread.messages.fetch(thread.lastMessageId);
	const lastMessageTimeStamp = lastMessage.createdTimestamp;
	const threadInactiveFor = timeSinceLastMessageInMinutes(lastMessageTimeStamp, Date.now());
	const inactiveTimeThreshold = isAnswered(thread) ? answeredThreadAutoArchiveDuration : unansweredThreadAutoArchiveDuration;
	if (threadInactiveFor >= inactiveTimeThreshold) {
		thread.setArchived(true);
	}
};

const getOpenThreads = async (client, channelId) => {
	try {
		const channel = await client.channels.fetch(channelId);
		if (!channel) return {};
		const openThreadsMap = await channel.threads.fetchActive();
		return openThreadsMap.threads;
	} catch (error) {
		console.error(`Error while fetching open threads in ${channelId}`);
		console.log(`${error}`);
	}
};

const isAnswered = (thread) => {
	const availableTags = thread.parent.availableTags;

	if (availableTags) return thread.parent.availableTags.some((tag) => tag.name === answeredTagName);

	return thread.name.startsWith("[Answered]");
};

const timeSinceLastMessageInMinutes = (lastMessageTimeStamp, nowTimeStamp) => {
	return (nowTimeStamp - lastMessageTimeStamp) / MILLISECONDS_TO_SECONDS / SECONDS_TO_MINUTES;
};

module.exports = { autoArchiveInactiveThreads };
