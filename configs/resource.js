module.exports = {
	// 比如 https://www.baidu.com/a/b/index.js
	// 那么，以下几个属性的值可以这么填写
	// appHostEnum => https://www.baidu.com
	// appPath => /a/b
	// appscrList => ['index.js']

	modName: 'utemp', // 兼容amd打包时所必需的的module name
	appScrList: [], // js文件名数组
	appLkList: [], // css文件名数组
	appHostEnum: {
		// cdn发布资源host
		test: '',
		uat: '',
		production: '',
	},
	appPath: '', // 资源发布的path
};
