const paths = require('./paths');

const apj = require(paths.appPackageJson),
	cr = require(paths.configResource);

const appHost = cr.appHostEnum[process.env.BUILD_ENV];

delete cr.appHostEnum;

module.exports = {
	...cr,
	appHost,
};
