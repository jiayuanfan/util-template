module.exports = {
	modName: 'utemp', // 兼容amd打包时所必需的的module name
	repName: 'sr012018', // 发布源名
	appName: 'util-template', // app名
	appVersion: 'last', // 发布上cdn的版本号（推荐写last）
	appDir: 'umd', // 发布上cdn的资源文件夹名（比如dist）
	appScrList: ['index.js'], // js文件名数组
	appLkList: [], // css文件名数组
	cdnHostEnum: {
		// cdn发布资源host
		test: '//static2.test.ximalaya.com',
		uat: '//s1.uat.xmcdn.com',
		production: '//s1.xmcdn.com',
	},
};
