const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	appPackageJson: resolveApp('package.json'),
	config: resolveApp('configs/index.js'),
	configResource: resolveApp('configs/resource.js'),
};
