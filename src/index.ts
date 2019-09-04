import { init, ready } from './load';

// 可以通过 process.env.BUILD_ENV 获取当前编译环境
const env = process.env.BUILD_ENV;

// 追加ready方法给到umd打包的全局对象
export { env, ready };

// 请保证执行init()，触发异步加载完成回调
init();
