const { configureRoutes, parseVersionFromUrl } = require('./router.utils');

let server;

// Mock the express-graphql module
jest.mock('express-graphql', () => jest.fn());

describe('Router Utils Test', () => {

	beforeEach(() => {
		// Mock some of our server properties
		server = {
			env: { IS_PRODUCTION: true },
			app: { use: jest.fn() }
		};
	});

	describe('configureRoutes', () => {

		test('should be able to configure routes without an error', () => {
			function setupRoutes () {
				configureRoutes(server);
			}

			expect(setupRoutes).not.toThrow();
		});

		test('should invoke the expressGraphql module with options and context', () => {
			// Grab a mock
			let { mock } = require('express-graphql');
			// configure routes
			configureRoutes(server);
			// check the mock
			mock.calls.forEach(call => {
				// each argument should be called with a function that takes a req and res
				// and returns them in context with any other provided options
				let arg = call[0];
				// invoke arg and check the results
				let result = arg('req', 'res');
				// check context for all props
				expect(result.context).toBeDefined();
				expect(result.context.req).toEqual('req');
				expect(result.context.res).toEqual('res');
				// Can't test equality because the server's calls change
				expect(result.context.server.env).toEqual(server.env);
				// check that schema is never invalid
				expect(result.schema).toBeDefined();
			});
		});

		test('should not add a graphiql endpoint if IS_PRODUCTION is true', () => {
			// configure routes
			configureRoutes(server);
			// check the calls to server.app.use
			let mock = server.app.use.mock;
			// We should have one per profile per version and one per version
			// we can check for length > 0
			expect(mock.calls.length).toBeGreaterThan(0);
			// the last one for production should be a root schema with
			// the path ending with /([\$])graphql
			let args = mock.calls[mock.calls.length - 1];
			expect(args[0]).toEqual(expect.stringContaining('/([\$])graphql'));
		});

		test('should add a graphiql endpoint if IS_PRODUCTION is false', () => {
			// Override this property for this test
			server.env.IS_PRODUCTION = false;
			// configure routes
			configureRoutes(server);
			// check the calls to server.app.use
			let mock = server.app.use.mock;
			// We should have one per profile per version and one per version
			// we can check for length > 0
			expect(mock.calls.length).toBeGreaterThan(0);
			// the last one for development should be a root schema with
			// the path ending with /([\$])graphiql
			let args = mock.calls[mock.calls.length - 1];
			expect(args[0]).toEqual(expect.stringContaining('/([\$])graphiql'));
		});

	});

	describe('parseVersionFromUrl', () => {

		// NOTE: These test against versions in the VERSION constant from config
		// This makes the test a little mirky since the output depends on a
		// separate global config
		test('should parse the version from the provided url', () => {
			// 3_0_1 is a valid version so it will work
			let version = parseVersionFromUrl('/3_0_1/graphiql', { defaultVersion: '3_0_2' });
			expect(version).toEqual('3_0_1');
		});

		// NOTE: These test against versions in the VERSION constant from config
		// This makes the test a little mirky since the output depends on a
		// separate global config
		test('should default to the defaultVersion if unable to parse a valid version', () => {
			let version = parseVersionFromUrl('/12_0_2/graphiql', { defaultVersion: '3_0_2' });
			expect(version).toEqual('3_0_2');
		});

	});

});