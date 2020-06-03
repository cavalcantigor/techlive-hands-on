module.exports = {

    preset: 'ts-jest',

	testMatch: [
		'**/__tests__/**/*.spec.(ts|js)'
	],

	testPathIgnorePatterns: [
		'/node_modules/',
		'/dist/'
	],

	collectCoverageFrom: [
		"src/**/{!(index),}.ts"
	],

	testEnvironment: 'node',

	coverageThreshold: {
		global: {
			lines: 90,
			branches: 90,
			functions: 90,
			statements: 90,
		}
    },
};
