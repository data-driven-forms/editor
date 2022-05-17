/* global module */

module.exports = {
	prepare(pluginConfig, { nextRelease, lastRelease, releases }) {
		console.log('RELEASE', JSON.stringify({ pluginConfig, nextRelease, lastRelease, releases }, null, 2));
	},
};
