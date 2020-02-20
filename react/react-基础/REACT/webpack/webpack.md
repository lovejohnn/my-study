# 课程目标

1. Webpack 基础介绍
2. Webpack 的基本配置项讲解
3. 入口与出口及单页面与多页面
4. loaders 配置使用
5. 插件 配置使用

# webpack 学习

## 0. 思考：之前前端开发带来的痛点？
1. 开发的时候，我们写的代码是有注释，有空格（文件比较大）在开发环境中注释有意义的，但是在生产环境中，注释是没有意义的。代码应该是尽可能压缩的足够小（网络请求）如果我们没有借助一些其他工具的时候，我们需要手工的把 xxx.js 转换 xxx.mini.js 文件。（文件美化）

2. 我们的js在发展的过程中，出现很多的新特性，例如 es6 箭头函数、class 语法糖，Promise等。这些新的特性在不做处理的时候是很难在低版本的浏览器适应。尝试做转换，手工的转换 在线转换工具。（js兼容性）

3. 我们的css开发，在发展过程中，也出现一些预处理的css，例如 less sass stylus等....这些预处理的css 写起来非常的方便，但是这些预处理的文件浏览器默认是不支持的，则我们需要做转换，可以借助一些在线转换工具转换成 css 文件。（css预处理）

.....

思考：如何去解决上面的问题？
答：在发展的过程中，出现了很多的解决方案。
1. 最先的是手工处理。xxx.js ====压缩的工具====xxx.mini.js 文件（手工）
2. 使用第三方的构建化工具（1. grunt 2. gulp）中间产物 性能可以
3. 慢慢的又出现一些更好的构建工具（ webpack 工具）


## 1. webpack 是什么？
> webpack 是一个 第三方的 自动化的 构建工具，可以使得我们的项目开发完全的自动化，或者叫做工程化。可以做哪些自动化呢？答：可以实现类似：js代码的压缩、合并；js兼容性的处理（es6\es7----es5）；处理预处理的css，还可以解决css兼容性问题 -webkit -moz- css3新特性 css前缀；可以实现图片的编码 base64 进行内嵌；.......

https://www.webpackjs.com/

## 2. 为什么要学习webpack？
> 实现工程化管理。解决上面提出的哪些痛点。


## 3. 如何学习 webpack？
https://www.webpackjs.com/guides/installation/
遵循三步:
1. 先看官方文档的 指南
2. 概念
3. 配置使用
4. API


## 4. webpack里面的一些重要的概念
1. 入口：就是一个js文件，这个是项目执行的开始。我们尽可能做单一入口的开发。（入口文件一般都是使用一些比较新的特性编写的代码，例如 es6 es7 ，还可以直接引入 css 直接引入 图片.... 这个入口文件里面做了很多的依赖，并且还有使用一些新的语法，浏览器并不能识别）

2. 出口：通过 webpack 构建工具把入口文件进行转换（1. 依赖问题 2. 兼容性）生成的文件叫做出口文件，这种文件浏览器可以识别的。

3. loaders：首先我们使用的 webpack本身的能力很有限。它能够做转换出来主要是依赖第三方开发者为其提供的一些叫做 loaders 包（工具）进行处理。是 webpack 调用这些 loaders 工具做的转换。webpack是一个管理者，loaders 底下做事的工具。对不同的转换需要不同的loaders进行处理，例如处理 js新特性，需要使用 babel-loader ；less文件需要使用 less-loder ；例如 .vue 单组件文件需要使用 vue-loader；


4. plugins：也是的webpack提供的一种机制，可以扩充 webpack 的功能。

5. 注意： loaders 和 plugins 有啥区别？
相同点：都是做工程中文件的处理。
不同点：**loaders 更多的是处理转换前文件。plugins处理转换后的文件。**
例如：
处理前：index.less (1. less语法 2. 注释、空格、换行)

借助：less-loader 可以把 less 文件转换为 css 文件

转换后：index.css（1. css 语法 2. 注释、空格、换行）

借助：第三方的插件可以使用 css 的压缩、去除注释



# webpack 的入门使用
1. 组织一些工程目录
2. 安装webpack工具
3. 使用

## 注意
> 目前来说 webpack的最新的稳定的版本 4.40.2

## 安装
本次课程学习的 4.x ；注意：在外面的企业还有使用的 3.x
```
npm init -y

npm install  webpack webpack-cli --save-dev

可以替换为 yarn 安装

yarn init -y
yarn add webpack webpack-cli --dev

```

解释：
1. --save-dev 代表这个包是一个开发依赖，只有在开发阶段在会使用；项目上线后是不需要使用该包。
2. 现在的开发，不建议把这类开发依赖安装成全局包。以前都是把这些开发依赖安装成全局包，可以在任何命令行执行。

3. 以前例如：3.x 安装，安装成一个全局包(非常不好的 版本高低依赖和版本高低兼容性)
```

npm install  webpack@3.x -g

```


例如有些包不是开发依赖，而是项目依赖。例如我们的项目使用基于 vuejs开发
```
npm install vue --save (项目依赖)
npm install vue --save--dev(开发依赖)
npm install vue 默认为项目依赖
```


## 基本使用
1. 注意：由于我们把 webpack 作为局部安装的，不是全局包，所以在执行 webpack 命令的时候，需要在前面加上 npx

2. 注意：webapck4.x 开始，引入一些新特性（**零配置**），不需要配置文件情况下，就可以执行的；

3. **查看帮助**
```
E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack> npx webpack --help

```

4. 具体执行（切换到工程目录 src 同级目录）
```
E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack>npx webpack --mode development

```
注意：--mode development 代表使用开发模式，这个时候打包生成的 main.js 文件不会被压缩

```
E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack>npx webpack --mode production

```
注意： --mode production 代表使用生成模式，这个时候打包生成的 main.js 文件会被压缩

## 优化处理
每次要手工的执行打包的命令，很麻烦，webpack 提供了一个 --watch 选项
```
E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack>npx webpack --mode development  --watch --progress --profile

```
--watch 监视文件的变化，只要文件变了，立马打包
--progress 打印编译的进度条
--profile 打印编译耗时


思考：还有些问题处理？
1. 上面的优化确实可以监听文件，但是选项太多，如果后面要重新执行，还是需要些选项，很麻烦
2. 对于打包后的文件，需要手工的在 index.html 文件引入

## webpack的配置文件的使用
```javascript
//1.  该文件的名称默认情况下，只能使用webpack.config.js 后期可以改
//2. 该文件需要使用 commonjs 规范导出配置项(配置项该如何写？)
const path = require('path'); // nodejs 自带的核心模块，负责路径的解析 resovle join

module.exports = {
  mode: 'development', // 开启开发模式 还有生产模式production
  entry: './src/index.js', // a. 项目入口文件 src/index.js

  // 出口文件，打包后的文件，浏览器可以识别 必须写绝对路径 __dirname 变量代表的是当前脚本所处的绝对路径（这种特殊的变量是 nodejs 自带，叫做魔术变量）__file
  // __dirname === E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
    //默认 main.js 一般人习惯叫做 bundle.js  bundle一簇 绣球花
  }
};


```

### package.json 的 script 配置快速启动

```
/package.json

"main": "index.js",
  "scripts": {
    "dev": "webpack --watch --progress --profile",
    "build": "webpack --config webpack.config-production.js"，
    "server": "webpack-dev-server"  //NPM package.json脚本是一种方便有用的方法，可以运行本地安装的二进制文件，而无需关心它们的完整路径 npm run server //NPM将为您自动引用二进制node_modules文件，并执行文件或命令。
  },
 1. 执行 npm run dev 或者 yarn run dev  
 2. 找到 package.json 中 scripts 中的定义命令  "dev": "webpack --watch --progress --profile",
 3. 然后去执行默认的 webpack.config.js 
 故相当于 npx webpack --watch --progress --profile 

最简单的打包 (npx webpack)  会去执行默认的 webpack.config.js如果你写了的话
 
```



**webpack**

>// 2. 前端开发有一个非常有名的第三方工具 loadsh （commonjs规范）
>
>现在的 webpack 可以解决依赖性的问题；可以支持 es6 模块化 commonjs 模块化（放心大干的在 入口文件index.js里面写 各种各样的 js规范，webpack都有可以识别）
>
>// 问题要亟待解决：每次写完代码都要手工的执行 npx webpack --mode developement



# webpack 常见插件和 loaders

1. **html-webpack-plugin** 为指定 html 文件引入资源文件 **( 插件)**   

   > 解决的东西或者说需求：
   > 1. 需要手工的引入 bundle.js 文件。
   > 2. 想要压缩HTML模板文件

   ```
   
   const HtmlWebpackPlugin = require('html-webpack-plugin')  //commmon.js规范
   const path = require('path')
   
   module.exports = {
     mode: 'development', // 开启开发者模式，production生产模式
     entry: 'index.js',
     output: {
       path: __dirname + '/dist',
       filename: 'index_bundle.js'
     },
     plugins: [
       new HtmlWebpackPlugin({   //实例化时候配置插件
       	  // 设置两项 1. 模板的路径 2. 生成文件的名称
         template: './templates/index.html', // 建议使用 绝对路径 path.resolve()
         filename: 'index.html', // 编译后生成的具体文件的名称
         // 压缩处理
         minify: { // 压缩HTML文件
           removeComments: true, // 移除HTML中的注释
           collapseWhitespace: true, // 删除空白符与换行符
           minifyCSS: true// 压缩内联css
         },
       })
     ]
   }
   ```

2. **webpack-dev-server** 开启一个调试服务器

   > 注意1：这个插件的底层：就是一个 webpack + express 框架，其了一个web服务。
   > 注意2：这个插件使用后，生成的 index.html 文件和 bundle.js 文件是在内存里面，并不会实时写入到 dist 文件下。（为了提升效率，现在是开发阶段，没必要每次都把打包文件实时写入到磁盘，写入磁盘是IO操作，一般IO操作是很慢的。内存是高速设备、硬盘低速设备。）
   >
   > 开发时： yarn run dev  +  yarn run serve
   >
   > 开发完毕后： 我们可以使用 `npm run build` 生成 bundle.js 文件

   ```
   
   1. 安装 yarn add webpack-dev-server --dev
   webpack.config.js配置
   devServer:{
   	host: '192.168.0.103', //自己的端口。我们调试时用Localhost即可。默认也是localhost
       port: 3000,
       open: true, // 代表打开默认的浏览器 第三方的脚手架，已经全部配置好了的。 知道一下基本的原理即可。
     }
   ```

3. **css-loader** 处理 css 样式

   > js 中 css 模块化 
   >
   > 解决webpack 不识别 css
   >
   > /index.js 入口文件中
   > import 'reset.css' //css模块化

   ```
   
   css-loader 让 webpack识别 css
   	webpack.config.js配置：
   	
   style-loader 动态生成css 到index.hmtl中
   	webpack.config.js配置：
   
   	{
           test: /\.css$/i,
           // style-loader 负责把依赖的 css 生成一个 style标签，放置在模板的DOM 里面 MiniCssExtractPlugin.loader 插件。
           use: [
             {
               loader: MiniCssExtractPlugin.loader,
             },
             'css-loader'], // 并不会把 引入的 css 放置在 网页的DOM 
           // 注意：一种依赖可以使用多个loader进行处理，执行顺序是 从右到左,从后到前执行
         }
   ```

   > 问题 1. 原生css 2.后期的bootstrap 3 less sass stylus 混在一s起的处理

   

4. **url-loader** ,可以处理字体库

   ```
   在解决了css依赖之后使用了，bootstarp.css 里面有 引入了字体库,导致错误.我们需要使用一个处理字体库的包
    // 处理字体依赖
         {
           test: /\.(eot|woff2?|ttf|svg)$/,
           use: ['url-loader'], // 并不需要把 loader使用对象的方式进行配置
         }
   ```

5. **sass-loader 处理 sass 文件**

6. **less-loader 处理 less 文件**

   ```
   index.js入口文件中使用less
   import 'some.less'
   注意：
   less-loader :桥梁，webpack 通过 less-loader 调用 less 解析
   less ：真正把 less 语法转为 css 语法
   js 中引入 css 依赖: css-loader
   把css 放入 index.html依赖 ： style-loader 创建 style放入index.html中
   
   webpack 配置:
    // 处理 less 依赖
         {
           test: /\.less$/,
           use: [{
             loader: MiniCssExtractPlugin.loader, // 默认情况下 webpack 利用 MiniCssExtractPlugin 把 css 单独的提取出来形成一个唯一的 css 文件，其实可以配置，文件的切分，可以根据 css 文件的大小把 css 分成多个。 放置一起减少 http 请求数。
           },
            'css-loader', 'less-loader'],  // 执行顺序 右到左
           // loader: 'less-loader', // compiles Less to CSS 尝试在一个js文件引入 css 解决依赖 css-loader. style-loader 
         }
   正则匹配 .less 文件。
   loader : ['style-loader', 'css-loader','less-loader']; 执行顺序从右到左
   ```

7. **file-loader** 处理  图片

   > index.js
   > import 'app.css' /background:url(some.img)
   > webpack 无法处理图片这种二进制的文件依赖
   > 使用file-load 可以打包
   > 问题：
   >
   > 1. 处理的过程中会给图片改名称，我们不希望的,再做配置
   > 2. name : '[path][name].[ext]', webpack内置变量name处理的文件名，ext扩展名,path处理的路径。
   >    	name : 'images/[name]-[hash]-[hash-8].[ext]'           //hash可避免冲突哦

   ```
   // 负责图片的依赖
         {
           test: /\.(png|jpe?g|gif)$/i,
           use: [
             {
               loader: 'url-loader', // 注意： url-loader也是可以处理图片，并且 url-loader 内部就是使用 file-loader
               options: {
                 // t1-7e8f81a9e10402f509e9551ecd031d58-7e8f81a9.jpg
                 name: 'images/[name]-[hash]-[hash:8].[ext]',
                 publicPath: '/', // 代表网站根目录下
                 // 含义：低于8kb 图片全部转换为内嵌编码
                 limit: 8192, // 200Byte 问题
   
   
               },
               // name: '[name].[ext]', // [name] [ext] webpack内置的变量，代表当前的处理文件名称和后缀名 [hash] 代表是一个唯一的 32位16进制字符串 可以修改长度 8
               
             },
           ],
         }
   2. js css img 放入指定文件夹里面 
   ```

8. u**rl-loader 负责图片转码成 base64**

   ```
   url-loader内部实现也是通过 file-loader实现的，可替换file-loader
    // 负责图片的依赖
         {
           test: /\.(png|jpe?g|gif)$/i,
           use: [
             {
               loader: 'url-loader', // 注意： url-loader也是可以处理图片，并且 url-loader 内部就是使用 file-loader
               options: {
                 // t1-7e8f81a9e10402f509e9551ecd031d58-7e8f81a9.jpg
                 name: 'images/[name]-[hash]-[hash:8].[ext]',
                 publicPath: '/', // 代表网站根目录下
                 // 含义：低于8kb 图片全部转换为内嵌编码
                 limit: 8192, // 200Byte 问题
               },
               // name: '[name].[ext]', // [name] [ext] webpack内置的变量，代表当前的处理文件名称和后缀名 [hash] 代表是一个唯一的 32位16进制字符串 可以修改长度 8
               
             },
           ],
         }
   ```

   

9. **mini-css-extract-plugin** 负责抽取css文件 **( 插件)**

   ```
   插件负责把css提取为一个单独的文件夹里
   1. 注意在此前用了 style-loader的话，代替即可。
   2. 默认情况下，单独提取出来，合并到一个css了
   modudle:{
   	rulus:[
   		{
           test: /\.css$/i,
           // style-loader 负责把依赖的 css 生成一个 style标签，放置在模板的DOM 里面 MiniCssExtractPlugin.loader
           use: [
             {
               loader: MiniCssExtractPlugin.loader,  //使用这个代替 style-loader
             },
             'css-loader'], // 并不会把 引入的 css 放置在 网页的DOM 
           // 注意：一种依赖可以使用多个loader进行处理，执行顺序是 从右到左
         }
   	]
   },
    plugins: [
       new MiniCssExtractPlugin({
         // Options similar to the same options in webpackOptions.output
         // all options are optional
         filename: 'css/[name]-[hash:8].css', // [name] 原文件的名称
       })
   ```

   

10. **JS 分文件 打包**

   ```
   output: {
       path: path.resolve(__dirname, 'dist'), 
       filename: 'js/bundle.js',
       //默认 main.js 一般人习惯叫做 bundle.js  bundle一簇 绣球花
     }
   ```

   

11. **webpack里面自动调用 babel** 

    >  使用 babel-loader

    ```
    配置：
    
      module:{
       rules:[
       		...下面代码
       ]
      }
      ..........................................................
        // 处理 js 文件 兼容性 .mjs 文件（现在由于 模块化的概念已经在前端很普及，语言的规范者，建议 纯js模块 使用 .mjs 结尾）
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
             // 排除：node_modules bower_components
            use: {
              loader: 'babel-loader',
              options: {
                // preset-env 代表把 es6+  env environment 环境 语法糖，简化写法。
                //  如果不使用简化写法，则需要记住每一个插件的名称，然后使用对应名称进行转换。全部转换为 es5
                presets: ['@babel/preset-env']
              }
            }
          }
    ```

    

12. **babel** 负责 js 处理

    1. babel 是什么？
       答： 是一个编译工具，可以把 es6+（es6 es7 es8...） 的语法特性转换为 es5 浏览器可识别的语法。

    2. 为什么要使用 babel？ 
       答：要保证使用新特性编写js文件可以在一些低版本的浏览器进行兼容。

    3. 如何使用？
       答：可以查看官网。
       https://www.babeljs.cn/

    4. babel 命令行使用
       
    > 注意：@babel/core @babel/cli @babel/preset-env 只能把 es6 语法特性转换为 es5语法。 箭头函数、let const；无法处理一些为浏览器扩充的全局的API，例如 Promise Set Symbol...
       >
       > 注意：@babel/polyfill 就是为了解决低版本浏览器不存在的 API，例如 Promise Set Symbol...   polyfill 单词翻译过来 垫片
       
    5. 使用

       1. 运行以下命令安装所需的包（package）：

          ```
          npm install --save-dev @babel/core @babel/cli @babel/preset-env (项目依赖)
          
          npm install --save @babel/polyfill (生产环境)
          ```

       2. 在项目的根目录下创建一个命名为 `babel.config.js` 的配置文件，其内容为：

          ```
          const presets = [
            [
              "@babel/env"
            ],
          ];
          module.exports = { presets };
          ```

       3. 运行此命令将 `src` 目录下的所有代码编译到 `lib` 目录：

          ```
          ./node_modules/.bin/babel src --out-dir lib        or npx babel
          ```

          ### 核心库

          Babel 的核心功能包含在 [@babel/core](https://www.babeljs.cn/docs/babel-core) 模块中。通过以下命令安装：

          ```
          npm install --save-dev @babel/core
          ```

          ### CLI 命令行工具

          [@babel/cli](https://www.babeljs.cn/docs/babel-cli) 是一个能够从终端（命令行）使用的工具。下面是其安装命令和基本用法：

          ```
          npm install --save-dev @babel/core @babel/cli
          
          ./node_modules/.bin/babel src --out-dir lib
          ```

          


# 扩展资料
1. https://www.jianshu.com/p/08a60756ffda
2. https://segmentfault.com/a/1190000012536871?utm_source=tag-newest
3. https://www.cnblogs.com/cangqinglang/p/8964460.html
4. https://www.jianshu.com/p/45c520046a8e
5. http://koala-app.com/index-zh.html

