**webpack目录**

- [第1课: 安装webpack和webpack-dev-server](https://segmentfault.com/a/1190000012536871)
- [第2课: 配置文件](https://segmentfault.com/a/1190000012536917)
- [**第3课: 做为node的一个模块来使用**](https://segmentfault.com/a/1190000012560205)
- [第4课: 插件篇](https://segmentfault.com/a/1190000012541460)
- [第5课: 模块篇](https://segmentfault.com/a/1190000012552628)
- [第6课: 在Vue开发中使用webpack](https://segmentfault.com/a/1190000012560228)

参考: https://webpack.js.org/api/node/

更多的时间，我们将webpack做为一个nodejs模块来使用

# 一：新建自己的打包文件build.js

我们在./build/新建一个文件 build.js，内容如下

```
const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  console.log('已打包好了，我们做点别的事')
})
```

打包

```
D:\03www2018\study\webpack2017>node ./build/build.js
```

效果与执行webpack命令一样
写成npm srcipt

```
  "scripts": {
    "abc": "webpack --config ./build/webpackfile.js",
    "def": "webpack-dev-server",
    "tttt": "node build/build.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

执行
D:03www2018studywebpack2017>npm run tttt

二：使用webpack编译器

```
/*const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  console.log('已打包好了，我们做点别的事')
})*/

const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
const compiler = webpack(webpackConfig)
compiler.run( (err, stats) => {
  if (err) throw err
  console.log('已打包好了，我们做点别的事...')
})
// 编译器运行比上面要快些，但它没有包括watch部分，没有监视，只是编译
```

既监视又编译

```
/*const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  console.log('已打包好了，我们做点别的事')
})*/

/*const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
const compiler = webpack(webpackConfig)
compiler.run( (err, stats) => {
  if (err) throw err
  console.log('已打包好了，我们做点别的事...')
})*/
// 编译器运行比上面要快些，但它没有包括watch部分，没有监视，只是编译，如果要编译，还要加上


const webpack = require('webpack')
const webpackConfig = require('./webpackfile.js');
const compiler = webpack(webpackConfig)
const watching = compiler.watch({
  /* watchOptions */
}, (err, stats) => {
  // Print watch/build result here...
  console.log('我一直在监视着呢');
});
```

三：配合其它node模块
上面的打包不够丰富，如果和其它node模块配置可以实现更多的功能
如，使用chalk模块来更好的显示提示信息