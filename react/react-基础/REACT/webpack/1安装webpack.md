**前提条件**

- 电脑装了一个全新的nodejs，最好是LTS版本,旧的nodejs版本可能没使用webpack的新功能，也可能会丢失一些依赖的包
- 先安装好facebook 的    **yarn  npm install -g yarn**
- 我的安装环境是win10

# 一：安装webpack和webpack-dev-server

### 1.准备工作

- 新建项目文件夹`D:\01webpack` 下面简写为 `根目录`
- 新建npm配置文件package.josn,`根目录>yarn init`

### 2.项目局部安装webpack和webpack-dev-server

- 不建议全局安装webpack和webpack-dev-server
- 局部安装webpack `根目录>`  **yarn add webpack --dev**
- 局部安装server `根目录>**yarn add webpack-dev-server --dev**
- webpack4.x 还需要安装 根目录>**yarn add webpack-cli  --dev**
- 会自动生成node_modules文件夹,下有804个文件夹(485+319server)个文件夹，这些包都是webpack的依赖
- package.json中增加了刚安装的包webpack的配置

```
"devDependencies": {
    "webpack": "^4.40.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.1"
  }
```

> 说明1: devDependencies是开发依赖，只会在打包过程中用到，不会包含到最后的代码中
> 说明2: 如果想安装指定版本的webpack，使用yarn add  --dev webpack@<版本号>格式

### 3.熟悉webpack命令行各参数的意思

- 有关命令行各参数的用法，`根目录>"node_modules/.bin/webpack" -h`
- 上面这个执行webpack很不方便，修改`根目录>package.json`，在script加上两条

```
  "scripts": {
  	"dev": "webpack  --watch --progress --profile",
    "build": "webpack --config webpack.config-production.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "webpack-dev-server"
  },
  
```

> --watch监视文件的变化，只要文件变了，立马打包 
>
> --progress打印编译的进度条 
>
> --profile打印编译耗时

- 命令行的选项其实都可以写在配置文件webpack.config.js中，写在配置文件中更方便更强大。webpack启动时要读取配置文件，参数--config指定读取哪个配置文件，如果没有使用--config指定，会默认在`根目录`中找`webpack.config.js`或`webpackfile.js`这个文件,有关配置文件的命名随意定，但最好带上环境，如`webpack.base|dev|prod.conf.js`

```
命令自己去查
```

### 4.准备项目文件夹及文件

为了更好地演示和学习webpack，请建好下列文件夹和文件

```
项目根目录
│   package.json
├───node_modules
│       └╌╌ 下面是npm包
├───dist
│     └╌╌╌╌╌logo.jpg 
│  
│╌╌╌╌webpack.dev.conf.js
│╌╌╌╌webpack.prod.conf.js
├───src
│   ├╌╌╌╌╌ index.js
│   └╌╌╌╌╌tmp
│         ├╌╌╌╌╌home.js
│         ├╌╌╌╌╌about.js
│         └╌╌╌╌╌contact.js
│   └╌╌╌╌╌template
│         └╌╌╌╌╌daqi.html // 为hmtl插件的模板
│   └╌╌╌╌╌images
│         └╌╌╌╌╌logo.jpg  
```

先只需写这几个文件，后面会陆续补充

# 二：打包



## 准备配置文件

- `根目录/webpack.dev.conf.js`的内容如下，这是史上最简单的配置文件了

```
var path = requre('path')

modudle.exports = {
	mode: 'development', // 开启开发模式
    entry: './src/index.js', // a. 项目入口文件 src/index.js
  
  // 出口文件，打包后的文件，浏览器可以识别 必须写绝对路径 __dirname 变量代表的是当前脚本所处的绝对路径（这种特殊的变量是 nodejs 自带，叫做魔术变量）__file
  // __dirname === E:\L03_react\giteeComH5-1908\day16_webpack\01-first-webpack 根路径
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'js/bundle.js',		//习惯性
  }
}
```

- `根目录/src/index.js`中随便写一句

```
console.log('hello,欢迎来到webpack  test')
```

## 打包

`D:\webpack>yarn run dev,

```
D:\ABOOK\Code\qingf\webpack1>yarn run dev
yarn run v1.17.3
$ webpack  --watch --progress --profile
10% building 0/0 modules 0 active
webpack is watching the files…
<i> [webpack.Progress] 36ms building
Hash: 6660fa0c892bf899b434
Version: webpack 4.40.2
Time: 84ms
Built at: 2019-09-17 8:32:49 PM
       Asset      Size  Chunks             Chunk Names
js/bundle.js  3.81 KiB    main  [emitted]  main
Entrypoint main = js/bundle.js
[./src/index.js] 46 bytes {main} [built]
    factory:27ms building:8ms = 35ms
```

打开打包后的文件看下,整体是一个自执行文件，每个文件是一个模块做为自执行函数的参数

> 此时输出一个文件 dist/js/bundle.js  注意此时文件内容没有被压缩

# 三：开启服务器

先启动看下，`根目录>yarn run server
从启动的信息中可以看到，它包含了上面的打包，项目的网址是`http://localhost:8080/`，可以在浏览器中打开看下效果，但由于没有指定入口文件，所以会显示当前目录的内容,有一点必须明白，服务器打包的后的文件并没有物理存在电脑上，只是在**内存**中，为了方便教程的讲解，在这里先讲下服务器的配置，有关全部配置的讲解，请参考下[一篇文章:配置文件详解](https://segmentfault.com/a/1190000012536917)

1. / 新建一个文件index.html

```

```



## 3.1 使用HtmlWebpackPlugin插件生成首页

首页一般为一个html文件，我们到现在还没有定义，为了方便，顺便提前了解一下webpack的插件功能，我这里使用HtmlWebpackPlugin来生成首页，插件的使用基本相同，分以下几步

- 第一步安装 `根目录>yarn add --dev html-webpack-plugin`
- 修改配置文件 `根目录webpack.config.js`

生成的html文件只在内存中，并没有存在物理磁盘上，来看一下生成的内容,留心下生成的js文件中的hash值，它的长度是8位，就是上面hashDigestLength: 8定义的



**html-webpack-plugin的用途**

- 对于打包的文件名中有hash的，这个插件是必选，因为每次源文件修改，打包后的名字就不一样
- 生成一个html5模板文件，可适用于lodash模板，也可以利用自己定义的加载器
- **js注入**，打包后的js文件会自动注入到html文件的body结尾部分(默认，也可以注入到head部分)
- **css文件注入**,假如你使用ExtractTextPlugin插件(这个插件也是必须要了解的)将css文件是单独剥离出来，不放在html中的style标签内，它会自动将css链接注入到link标签中

**html-webpack-plugin插件完整配置**

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
    template: './src/template/daqi.html', //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:head, // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}


module.exports = {
    entry: './src/index', //index.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]index.js',
        hashDigestLength: 8
    },
    plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //先不配置插件，看看效果
    devServer: {
      contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器
      index:'front.html' // 与HtmlWebpackPlugin中配置filename一样
    }
}
```

## 3.2 devServer常用配置

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
    template: './src/template/daqi.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}
module.exports = {
    entry: './src/main', //main.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]app.js',
        hashDigestLength: 8
    },
    plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //先不配置插件，看看效果
    devServer: {
      contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist
      port: 9000, //端口改为9000
      host: '192.168.0.103', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
      open:true, // 自动打开浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      compress:true //压缩
    }
}
```

结合服务器和html插件，最后生成的配置文件如下

```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
    // 也是 context+template是最后模板的完整路径，./不能少
    template: './template/daqi.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}


module.exports = {
    context: path.resolve(__dirname,'../src'), //D:\03www2018\study\webpack2017\build\src
    entry: './main', //main.js中的js可以省略，前面的./不能省
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename: './[hash]app.js',
        hashDigestLength: 8
    },
    module: {        
        rules: [       

            ]
      },
    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackPluginConfig), // 生成首页html5文件，外部插件需要安装
        new webpack.DefinePlugin({BJ: JSON.stringify('北京'),}) // 内置插件，无须安装，可以理解为它是webpack实例的一个方法，该插件相当于apache等web服务器上定义一个常量
    ], 
    devServer: {
      contentBase: path.resolve(__dirname, "../dist"), //网站的根目录为 根目录/dist，这个路径一般与output.path一致，因为html插件生成的html5页是放在output.path这个目录下
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器，每次启动服务器会自动打开默认的浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      compress:true //压缩
    }
}
```

## 3.3 给首页加一张图片

```
// D:\03www2018\study\webpack2017\src\template\daqi.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>大奇模板</title>
  </head>
  <body>
      <div style="background-color:#eee;font-size:16px;">欢迎来到零和壹在线课堂1234</div>
      <div id='hello'></div>
      <img src='/img/logo2.jpg' data-src='../images/logo.jpg' />  
  </body>
</html>
```

- webpack，通过使用`file-loader`可以将图片当成一个模块，使用require来导入，进一步可以使用`url-loader`将图片转成base64-data
- 使用图片的场景大致分四种，html文件中使用src标签，样式的background中设定背景，js文件中元素.innerHTML='<img src="logo.jpg" />'的方式，最后一种是在vue或react等框架中使用，今天要讲的是第一种，如何处理html文件src标签中的图片
- html文件中图片的处理有两种，一种是象正常使用图片一样，不打包，但图片必须放在打包生成文件目录下，如`./dist/logo.jpg`，也就是最后的入口front.html文件可以读到的位置，在front.html中使用`<img src='./logo.jpg'/>`,表示logo.jpg与最后生成的front.html是同级目录。但实际工作中，往往图片放在与打包前的html模板文件一起的，需要将图片和html模板文件分别打包到./dist下，这使用`html-loader`是解决不了的，官网及网上大部分教程讲得不是特别清楚，在这里我详细讲下，这里就要用到file-loader，否则会报错`Error: Child compilation failed: Module parse failed: Unexpected character '�' (1:0)You may need an appropriate loader to handle this file type.`

第1步：安装html-loader和file-loader,`根目录/cnpm i -D html-loader file-loader`
**file-loader**处理require('./logo.jpg')这种类型，将图片当成一个js模块
**html-loader**是将html中src标签中配置有特定data属性的图片，转为由require的方式来导入。也就是说，它只是标识为哪些图片需要由require的方式导入，但具体require导入，得需要file-loader插件，
第2步：在webpack.conf.js中配置这两个加载器

```
module: {
        rules: [
        {
            test: /\.html$/, 
            use: {
                loader: 'html-loader',
                options: {
                 attrs: [':data-src']
                }
            }
        },
     {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                //name: '[path][name].[ext]',
                name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                //useRelativePath:true,
                outputPath: 'img/' // 后面的/不能少
            }  
          }
        ]
      },
        ]
      },
```

第3步：在html文件src标签中引用图片
`<img src='/img/logo2.jpg' data-src='../images/logo.jpg' />`
这里注意，data-src是打包前图片位置，src是打包后图片的url

# 四: 手机或其它电脑访问该服务器

实际开发中，需要手机或其它设备如ipad即时访问该服务器
**服务器**: 就是开启webpack-dev-server这台电脑
**其它设备**：下面以同一网络下的手机为例(同一wifi就行)
第一步：配置服务器

```
devServer: {
    contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: 9000, 
    open: true,
    host: '192.168.0.103' //请在dos下，输入ipconfig可以找到当前电脑的ip
}
```

第二步：在手机上找一个合适的浏览器，输入 `192.168.0.103:9000`就可以访问
说明：有少数浏览器打开是空白网页，我使用uc浏览器ok，ip地址和端口与你自己的设置有关，我上面只是我的设置