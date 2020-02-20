# Express框架
//引包
var express = require('express);
//创建一个app实例
var app = express();

该app对象通常表示Express应用程序。通过调用express()Express模块​​导出的顶级函数来创建它：
该app对象有方法
- 路由HTTP请求; 例如，请参阅app.METHOD和app.param。
- 配置中间件; 看app.route。
- 渲染HTML视图; 看到app.render。
- 注册模板引擎; 看app.engine。

- app.get(path,callback);
使用指定的回调函数将HTTP GET请求路由到指定的路径。

//做出配置针对不同的url请求地址进行响应

    app.get( '/', function(req,  res){
        console.log( req.url );
        console.log( req.method );
        res.write( 'some content' );
    res.end('finaly content');
    })
//1.只能处理get请求
//2. 响应的内容很有限
//监听端口 
var port = 8080;
app.liten(port,function(){
    console.log(`servers running at${port}...`);
})

res.send（[机构]）

发送HTTP响应。

所述body参数可以是一个Buffer对象，一个String，对象，或一个Array。例如：
post请求
application/x-www-form-urlencoded 代表会对 post提交的表单内容进行编码

app.use( )
var articleRouter = require('./routes/article.js');
// 3.2 告诉 app 要使用路由器
app.use( indexRouter );
## Express简介
### Express 是什么？

>基于nodejs开发的一个框架（基于http模块封装，功能更强）。
### 为什么要学习Express呢？

> 加快项目开发，便于团队协作。
### Express入门体验

1. 创建项目目录
2. 初始化 package.json 文件
3. 下载 express 框架
4. 编写入口文件
## Express之路由  routes文件夹配置路由

//内部编写路由
var express = require('express');
var app = express(); //创建app实例
//配置路由
app.get('path,(req,res)=>{});
//监听端口
app.listen(port,()=>{});

引入外置的 路由器 外置路由
routes文件夹配置路由
//index.js
var express = require('express');
var router = express.Router(); //router对象
router.get('/',(req,res)=>{}) //处理请求
moudel.exports = router; //导出路由器

var indexPath = require('./routes/index.js'); //引入
app.use( indexPath ); //告诉app要使用的路由
### 响应文件 templates 下 分文件夹在进行管理（分而治之）html文件 或者 模板文件
// 针对不同的业务逻辑，在 templates 下 分文件夹在进行管理（分而治之）html文件

// 返回 showform.html网页文件 读取文件 框架给我们封装了一个 sendFile 方法，读取文件
	// 注意 第一个参数代表的文件的路径（必须是一个绝对路径）
	// 注意: 一般建议： 1. 一个文件项写一个参数 并且 2. 目录后面加上 / 3. 建议第一个参数还是 __dirname
	var filePath = path.resolve( __dirname, 'templates/', 'showform.html' ) ;
	res.sendFile( filePath );
### 静态文件处理 pbulic   -css -json -images
//可以配置一个目录，用于存放静态资源，以后不需要针对静态资源做路由配置
var publicPath = express.static(path.resolve(__dirname,'public/'));
//app.use( publicPath );
//第一个参数，代表url地址前缀 ， 第二个参数告诉app使用上面操作定义静态资源目录
app.use('/public', publicPaht); 
### 什么是路由？

> 路由就是当浏览器输入一个 URL 地址后，将该请求交给后台的哪一个应用程序进行处理的过程称为路由。
>而这样的操作需要事先在后台定义好规则，定义出来的规则我们叫做 路由规则。

>路由器 
### 路由基本语法
1. 普通语法

   app.HTTP请求类型（请求路径，回调函数）
   ```
   发送  GET请求：app.get（请求路径，回调函数）
   
   发送  POST请求：app.post（请求路径，回调函数）
   
   发送  任意请求：app.all（请求路径，回调函数）
   ```
2. 特殊语法
   app.use（请求路径，回调函数）
   + 区别1：use匹配任意类型请求
   + 区别2：use非完全匹配（ps. 只需要 url前面匹配 请求路径即可匹配）

### 路由参数
> 当在 url 地址后面通过 name=andy&age=12 方式传递 get参数后，如果需要在服务器端进行获取，则可以通过路由参数获取。
基本语法:
```
app.HTTP请求类型（请求路径/:参数1/.../:参数n，回调函数）
```
## 利用 Express 托管静态文件
### 问题思考？
之前使用 Nodejs 内置的 http 模块 做web服务器的时候，如果请求的类型为 css 或者 js 或者 img 的时候，我们需要进行每一个请求的匹配，然后设置相应的 Content-Type 进行返回。但是这样操作很麻烦。如果这种静态资源非常多的话，该如何处理呢？
### 好用的 express.static()
> Express框架中设置了固定语法允许指定目录下的文件被外部访问。
### 实操
```
var express = require('express')
var app = express()
app.use('/public', express.static('public'));

```
## express-generator
### express-generator 是什么？

> express-generator 是一个脚手架工具，有了它之后，就可以快速生成一个基于 Express 的web项目。

### express-generator 安装

```
> npm i express-generator -g
express-generator 包含了 express 命令行工具。通过如下命令即可安装：
$ npm install express-generator -g

```

当安装后，可以打开命令行：输入 express -h

```
>express -h

```
### express-generator 入门使用 express 项目名

```
$ npm install express-generator -g  全局安装
express -h
    -v, --view <engine> 添加对视图引擎（view） <engine> 的支持
express --view=pug myapp 生成myapp

set DEBUG=myapp:* & npm start


> express 项目名称
> cd 项目名称
> npm i 
> npm i art-template express-art-template
```
# 项目开发部署

## 需求

> 将之前开发好的网站使用 Express 进行项目部署。
