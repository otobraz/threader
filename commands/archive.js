const { archiveInactiveThreads } = require("../tasks/archived-inactive-threads");

module.exports = {
	name: "archiveAll",
	description: "Archives answered threads!",
	aliases: ["archiveall"],
	execute(client) {
		archiveInactiveThreads(client, "701524388486316142");
	},
};
