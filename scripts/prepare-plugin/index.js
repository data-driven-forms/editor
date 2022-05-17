/* global module */

module.exports = {
	prepare(pluginConfig, context) {
		console.log('RELEASE', JSON.stringify({ pluginConfig, context }, null, 2));
	},
};
