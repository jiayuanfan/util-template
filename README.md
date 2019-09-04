# 工具类库模板

## 快速开始

```sh
yarn global add @xmly/iris
iris init util-app # 选择工具类库模板
```

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

##### 1、xnpm（业务方以 es6、cjs 形式引入）

**特别注意：发布至 xnpm 需要给 package.json 中的 name 加上@xmly/的前缀**

```sh
npm publish
```

##### 2、cdn（业务方以 umd 形式引入）

```sh
# 测试环境发布
xpm3 te

# uat环境打包
xpm3 uat

# prod环境打包
xpm3 pe
```

## （业务方）快速引入（需要相应的发布）

##### 1、es6、cjs 形式引入

```sh
yarn add @xmly/util-template
或
npm install --save @xmly/util-template
```

```js
import uTemp from '@xmly/util-template';
const uTemp = require('@xmly/util-template');
```

##### 2、umd 形式引入

```html
<!-- 在html中引入打包到cdn的入口文件，即start.js -->
<script src="{cdnHost}/${repName}/${appName}/{appVersion}/{appDir}/start.js"></script>
```

```js
// 如果在componentDidMount()中调用，需写在ready()的回调中（防止外链js未加载完毕）
window.utemp.ready(() => {
	window.utemp.xxxx();
});
```

## 修改 umd 引入的入口文件配置项

```js
// configs/resource.js
module.exports = {
	modName: 'utemp', // 兼容amd打包时所必需的的module name
	repName: 'sr012018', // 发布源名
	appName: 'util-template', // app名
	appVersion: 'last', // 发布上cdn的版本号（推荐写last）
	appDir: 'umd', // 发布上cdn的资源文件夹名（比如dist）
	appScrList: ['index.js'], // 需要加载的js文件名数组（/umd目录下）
	appLkList: [], // 需要加载的css文件名数组（/umd目录下）
	cdnHostEnum: {
		// cdn发布资源host
		test: '//static2.test.ximalaya.com',
		uat: '//s1.uat.xmcdn.com',
		production: '//s1.xmcdn.com',
	},
};
```
