**webpack目录**

- [第1课: 安装webpack和webpack-dev-server](https://segmentfault.com/a/1190000012536871)
- [第2课: 配置文件](https://segmentfault.com/a/1190000012536917)
- [第3课: 做为node的一个模块来使用](https://segmentfault.com/a/1190000012560205)
- [第4课: 插件篇](https://segmentfault.com/a/1190000012541460)
- [第5课: 模块篇](https://segmentfault.com/a/1190000012552628)
- [**第6课: 在Vue开发中使用webpack**](https://segmentfault.com/a/1190000012560228)

------

**本文参考文档**
[vue](https://cn.vuejs.org/index.html)   [vuex](https://vuex.vuejs.org/zh-cn/)   [vue-router](https://router.vuejs.org/zh-cn/)   [vue-loader](https://vue-loader.vuejs.org/zh-cn/)   [awesome-vue精彩的vue](https://github.com/vuejs/awesome-vue)       [vue-cli](https://github.com/vuejs/vue-cli)

**写在前面**
vue官方已经写好一个vue-webpack模板vue_cli，原本自己写一个，发现官方写得已经够好了，自己写显得有点多余，但为了让大家熟悉webpack，决定还是一步一步从0开始写，但源文件就直接拷贝官方的

**准备工作**

1. 新建文件夹`D:\03www2018\study\vue2017`，下面`根目录`指的就是这个目录

2. 生成package.json， `根目录>cnpm init`

3. 安装webpack和webpack开发服务器， `根目录>cnpm i -D webpack webpack-dev-server`

4. 安装vue、vuex、vue-router，`根目录>cnpm i -S vue vuex vue-router`

5. 下载vue_cli的webpack模板中src这个[源文件夹](https://github.com/vuejs-templates/webpack/tree/develop/template)到`根目录\src`中

6. 常用必装loader, `根目录>cnpm i -D xxxxx`

   - eslint-loader + eslint 代码规范
   - babel-core babel核心
   - babel-preset-env
   - babel-preset-stage-0
   - babel-loader
   - less + less-loader或其它css预处理器，如sass+sass-loader
   - css-loader 导入css文件
   - style-loader 将css文件注入到style标签中
   - postcss-loader
   - html-loader
   - url-loader + file-loader 处理图片/音频视频/字体，不建议单独使用file-loader
   - vue-loader + css-loader + vue-template-compiler 导入vue组件

7. 常用必装plugin,第三方插件安装`cnpm i -D xxx-webpack-plugin`

   - html-webpack-plugin
   - extract-text-webpack-plugin

8. webpack和webpack-dev-server配置

   ```
   // 根目录>build/webpack.base.conf.js
   module.exports = {
   const path = require('path')
   const HtmlWebpackPlugin = require('html-webpack-plugin')
   const ExtractTextPlugin = require('extract-text-webpack-plugin')
   module.exports = {
     // 第一部分: 文件的输入和输出
     context: path.resolve(__dirname, '../src'),
     entry: './main',
     output: {
       path: path.resolve(__dirname, '../dist'),
       filename: './app.js' // dist文件夹不存在时，会自动创建
     },
     // 第二部分: 效率方面
     resolve: {
       extensions: ['.js', '.vue', '.json'],
       alias: {
         'vue$': 'vue/dist/vue.esm.js',
         '@': path.resolve('src')
       }
     },
     // 第三部分：处理不同的模块类型,分js+vue|react类，图片,样式，音频视频，字体几大块
     module: {
       rules: [
         // 01----js部分
         // eslint规范代码
         // babel实现js兼容，以便浏览器识别
         // 识别vue组件
         {
           test: /\.js$/, // 对js文件使用eslint来检查代码的规范
           loader: 'eslint-loader',
           enforce: 'pre', // 但为了保险，建议单独给eslint-loader指定pre值，有关loader的优先级，参考https://webpack.js.org/configuration/module/#rule-enforce
           include: [path.resolve('src')], // 只有些目录下的js文件才使用eslint-loader
           options: {}
         },
         {
           test: /\.vue$/,
           loader: 'vue-loader',
           options: {}
         },
         // 02----图片部分
         {
           test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
           loader: 'url-loader',
           options: {
             limit: 10,
             outputPath: 'static/',
             name: 'img/[name].[hash:7].[ext]' //最后生成的图片完整路径是 output.path+ outputPath+name
           }
         },
         // 03----样式处理
         {
           test: /\.css$/,
           use: ExtractTextPlugin.extract({
             fallback: 'style-loader',
             use: 'css-loader'
           })
         }
         // 04----音频视频
   
         // 05----字体
       ]
     },
     // 第四部分：插件，功能很多
     plugins: [
       // 01----生产首页
       new HtmlWebpackPlugin({
         title: 'hello,零和壹在线课堂', // html5文件中<title>部分
         filename: 'index.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
         // 也是 context+template是最后模板的完整路径，./不能少
         template: './index.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
         inject: 'body' // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
   
       }),
       new ExtractTextPlugin('styles.css')
     ],
     // 第五部分: 服务器的配置
     devServer: {
       contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
       port: 9000, //端口改为9000
       open: true
     }
   }
   
   }
   ```

9. package.json配置

   ```
   {
    "name": "vue2017",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
   "a": "webpack --config ./build/webpack.base.conf.js",
   "b": "webpack-dev-server --config ./build/webpack.base.conf.js",
   "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
   "eslint": "^4.14.0",
   "eslint-loader": "^1.9.0",
   "webpack": "^3.10.0",
   "webpack-dev-server": "^2.9.7"
    },
    "dependencies": {
   "vue": "^2.5.13",
   "vue-router": "^3.0.1",
   "vuex": "^3.0.1"
    }
   }
   ```

10. .eslintrc.js配置

    ```
    // cnpm i -D eslint-plugin-html
    // cnpm i -D babel-eslint
    // cnpm i -D eslint-config-standard (依赖 eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard)
    module.exports = {
      root: true,
      parser: 'babel-eslint', // 默认的解析器为espree,这里指定为 babel-eslint，参考 https://github.com/babel/babel-eslint
      parserOptions: { // 解析器的选项，默认支持  ECMAScript 5
        sourceType: 'module'
      },
      env: {
        browser: true, // 环境定义为浏览器
      },
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      extends: 'standard',
      plugins: [ //第3方插件 eslint-plugin-html，
        'html'
      ],
      rules: {
        'generator-star-spacing': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
      }
     }
    ```

安装vue
`D:\03www2018\study\webpack2018>cnpm i vue -S`

如果有下面的报错

```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)
```

> 解释: 运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数
> 修改 D:/03www2018/study/webpack2018/build/webpackfile.js

```
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
```

最简单的例子

```
D:\03www2018\study\webpack2018\today\wang\home.js
import Vue from 'vue';
const app = new Vue({
  template: '<div>hello wolr</div>'
}).$mount('#main')
```

# 导入第一个vue组件

```
// D:\03www2018\study\webpack2018\today\wang\home.js
import App from "./app.vue"
import Vue from 'vue';
const app = new Vue({
  template: '<App />',
  components:{App}
}).$mount('#main')
// D:\03www2018\study\webpack2018\today\wang\App.vue 
<template>
<div>上午好</div>
</template>
```

报错

```
Uncaught Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
```

安装并配置 vue-loader

> 官方文档 [https://vue-loader.vuejs.org/...](https://vue-loader.vuejs.org/zh-cn/options.html#loaders)

```
D:\03www2018\study\webpack2018>cnpm i vue-loader -D
```

提示要安装css-loader和vue-template-compiler，现在将这两个也一起安装

```
D:\03www2018\study\webpack2018>cnpm i css-loader vue-template-compiler -D
```

现在就可以正常显示vue组件

# 处理css文件

```
// D:\03www2018\study\webpack2018\today\wang\app.css
body{
    color:#09f;
}
```

处理单独的css文件
没有装css-loader会报错

```
ERROR in ./today/wang/app.css
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
```

安装和配置

> 官方文档: [https://webpack.js.org/loader...](https://webpack.js.org/loaders/css-loader/)

```
D:\03www2018\study\webpack2018>cnpm i -D css-loader
{
    test: /\.css$/,
    loader: 'css-loader', 
}, 
```

对上面导入的css一般有两种处理，一是使用style-loader将css嵌入到html文件的style标签中，一种是单独存在一个文件中

style-loader

> 官方文档: [https://webpack.js.org/loader...](https://webpack.js.org/loaders/style-loader/)

```
D:\03www2018\study\webpack2018>cnpm i style-loader -D
{
    test: /\.css$/,
    loader: 'style-loader!css-loader', 
}, 
```

多个loader是从右到左执行，多个loader之间用!连接，上面多个loader也可以写在数组的形式

```
{
    test: /\.css$/,
    use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
    ]
}
```

这种写法是，从下到上执行，先执行css-loader再执行style-loader

将css文件单独打包到一个文件
这要使用到ExtractTextWebpackPlugin插件

# 处理less/sass等文件

这要用到less-loader或sass-loader，同时得安装less或sass，如果没安装会报错

```
 [Vue warn]: Error in beforeCreate hook: "Error: Cannot find module "!!vue-loader/node_modules/vue-style-loader!css-loader!../../node_modules/_vue-loader@13.6.0@vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-381730fa","scoped":false,"hasInlineConfig":false}!less-loader!../../node_modules/_vue-loader@13.6.0@vue-loader/lib/selector?type=styles&index=0&bustCache!./app.vue""
```

ave组件的内容

```
<template>
    <div class='morning'>上午好</div>
</template>
<style lang='less'>
    @color:#f96;
    .morning{
        color:@color
    }
</style>
```

安装less和less-loader

```
D:\03www2018\study\webpack2018>cnpm i -D less less-loader
```

配置

```
{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
    // fallback: "style-loader", //备用，如果提取不成功时，会使用style-loader来处理css
    use: "css-loader"
    })
    /*use: [
    { loader: "style-loader" },
    { loader: "css-loader" }
    ]*/
}, 

{
    test: /\.less$/,
    use: [
         {
             loader: "style-loader" // creates style nodes from JS strings
         },
        {
        loader: "css-loader" // translates CSS into CommonJS
        },
        {
        loader: "less-loader" // compiles Less to CSS
        }
    ]
},
```

上面这个例子，只有导入的css文件单单独存在一个文件中，vue组件中的less归到了style中了，

> 说明：在vue组件<style>中，如果lang="less"，在vue-loader中默认配置好了less，无须另外配置
> 说明: 上面例子是配置的是单独的less文件，不适合uve中的less
> 说明：如何将vue中的less也放到单独的css文件中呢? 参考[https://vue-loader.vuejs.org/...](https://vue-loader.vuejs.org/zh-cn/options.html#extractcss)

```
{
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        extractCSS: true
    }
}
```

但上面有个缺点，会覆盖之前css中的配置中生成style.css文件，如何解决呢?

```
const path = require('path');
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextPlugin('css/[name]-two.css');

module.exports={    
    plugins: [
        extractCSS,
        extractLESS
    ],
    
    module: {
        rules: [
            
             {
                test: /\.css$/,
                use: extractCSS.extract({
                 // fallback: "style-loader", //备用，如果提取不成功时，会使用style-loader来处理css
                 use: "css-loader"
                })
        
            }, 

              {
                  test: /\.vue$/,
                  loader: 'vue-loader',
                  options: {
                     // extractCSS: true
                     extractCSS: function(){
                         return extractLESS
                     }
                    }
                }
        ]
    },  
}
```

导入图片

```
// D:\03www2018\study\webpack2018\today\wang\App.vue中增加图片
<template>
    <div class='morning'>
    <img src="../images/logo.jpg" />
    <img src="../images/a.jpg" />
    上午好
    </div>
</template>
<style lang='less'>
    @color:#f96;
    .morning{
        color:@color
    }
</style>
```

如果安装并配置好了url-loader，图片会生成data:image格式
发现生成`<img src="data:image/jpeg;base64,bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArICIzNDk0NWM0MDMyMWQyMDk3YTY5Zjg2MGZkNWQ1M2FlZC5qcGciOw==">`，但是不显示出图片，url-loader不配置会显示图片，显示如下<img src="34945c40321d2097a69f860fd5d53aed.jpg">

安装
D:03www2018studywebpack2018>cnpm i url-loader -D

安装
D:03www2018studywebpack2018>cnpm i file-loader -D