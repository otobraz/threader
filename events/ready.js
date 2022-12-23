const { autoArchiveInactiveThreads } = require("../tasks/archived-inactive-threads");
const { taskInterval } = require("../config/config.json");

const TASK_INTERVAL_IN_MILLISECONDS = taskInterval * 60 * 1000;

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		setInterval(autoArchiveInactiveThreads, TASK_INTERVAL_IN_MILLISECONDS, client);
	},
};
