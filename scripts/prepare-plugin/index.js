/* global module */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* global process require */
const replace = require('replace-in-file');
const glob = require('glob');
const fetch = require('node-fetch');

const getLatestVersion = async (package) => {
	const res = await fetch(`https://registry.npmjs.org/${package}`);
	const data = await res.json();

	return data['dist-tags'].latest;
};

async function prepare(_, { nextRelease }) {
	const thisPackage = nextRelease.name.replace(/-v.*/, '');
	const nextVersion = nextRelease.version;
	console.log('Updating package versions for release!\n');
	console.log('Next version is:', nextVersion, '\n');

	const root = process.cwd();
	const files = glob.sync(`${root}/packages/*/package.json`);

	console.log('Files to replace: ', files.join(',\n'), '\n');
	console.log('Replacing to: ', `"${thisPackage}": "^${nextVersion}"`, '\n');

	const replaceConfig = {
		files,
		from: [`"${thisPackage}": "*"`],
		to: [`"${thisPackage}": "^${nextVersion}"`],
	};

	(async () => await replace(replaceConfig))();

	const localFiles = glob.sync(`${root}/packages/${thisPackage.replace('@data-driven-forms/', '')}/package.json`);

	const versions = await Promise.all([
		getLatestVersion('@data-driven-forms/evergreen-component-mapper'),
		getLatestVersion('@data-driven-forms/dnd'),
		getLatestVersion('@data-driven-forms/editor-core'),
		getLatestVersion('@data-driven-forms/editor-pro')
	]);

	const replaceConfig2 = {
		files: localFiles,
		from: [
			'"@data-driven-forms/evergreen-component-mapper": "*"',
			'"@data-driven-forms/dnd": "*"',
			'"@data-driven-forms/editor-core": "*"',
			'"@data-driven-forms/editor-pro": "*"'
		],
		to: [
			`"@data-driven-forms/evergreen-component-mapper": "^${versions[0]}"`,
			`"@data-driven-forms/dnd": "^${versions[1]}"`,
			`"@data-driven-forms/editor-core": "^${versions[2]}"`,
			`"@data-driven-forms/editor-pro": "^${versions[3]}"`
		],
	};

	(async () => await replace(replaceConfig2))();

	console.log('Replacing other packages in ', localFiles, ' with versions ', versions, '\n');

	console.log(`${thisPackage} package version successfully updated!\n`);
};

module.exports = { prepare };
