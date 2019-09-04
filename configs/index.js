const paths = require('./paths');

const apj = require(paths.appPackageJson),
	cr = require(paths.configResource);

const appName = cr.appName || apj.name,
	repName = cr.repName || apj.xpm3.rep,
	cdnHost = cr.cdnHostEnum[process.env.BUILD_ENV];

delete cr.appName;
delete cr.repName;
delete cr.cdnHostEnum;

module.exports = {
	...cr,
	appName,
	repName,
	cdnHost,
};
