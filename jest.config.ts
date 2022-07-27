export default {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jest-environment-jsdom',
	verbose: true,
	collectCoverageFrom: [
		'<rootDir>/packages/**/src/**/*.js',
		'<rootDir>/packages/**/src/**/*.jsx',
		'<rootDir>/packages/**/src/**/*.ts',
		'<rootDir>/packages/**/src/**/*.tsx',
	],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
};
