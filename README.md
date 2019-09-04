# 工具类库模板

## 简介

公司内部难免会存在提供工具类库、组件库的需求，而搭建模板是很耗时的

目的：想要小伙伴们更专注在编写项目代码上，而不是把时间耗费在搭建框架上

## 特点

1. 提供 es、cjs 引入方式，使用 npm 包
2. 提供 umd 引入方式，动态加载主体 js
3. 使用 rollup 进行打包
4. 命令行一键打包，极简的打包配置

## 快速打包

```sh
# 测试环境打包
yarn build:test;

# uat环境打包
yarn build:uat;

# prod环境打包
yarn build:prod;
```

## 快速发布

#### 1、npm（业务方以 es6、cjs 形式引入）

```sh
yarn build:[[env]] && npm publish
```

#### 2、cdn（业务方以 umd 形式引入）

**提供打包后 umd 文件夹下的 start.js 即可**

## （业务方）快速引入（需要相应的发布）

**以下工具库项目名均暂用 util-template 代替**

#### 1、es6、cjs 形式引入

```sh
yarn add util-template
或
npm install --save util-template
```

```js
import uTemp from 'util-template'; // es6
const uTemp = require('util-template'); // cjs
```

#### 2、umd 形式引入

```html
<!-- 在html中引入打包到cdn的入口文件，即start.js -->
<script src="${appHost}/${appPath}/start.js"></script>
```

```js
// 如果在componentDidMount()中调用，需写在ready()的回调中（防止外链js未加载完毕）
window.utemp.ready(() => {
	window.utemp.xxxx();
});
```

## 修改 umd 引入的入口文件配置项

```js
// 文件目录
// configs/resource.js
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
```
