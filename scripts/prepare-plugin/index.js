/* global module */

module.exports = {
	prepare(pluginConfig, { pkg, options }, cb) {
		console.log('RELEASE', JSON.stringify({ pluginConfig, pkg, options, cb }, null, 2));
	},
};
