####  packgae.json 配置
```
{
  "name": "02-npm",
  "version": "1.0.0",
  "description": "",
  "main": "01-demo.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node 01-demo.js",
    "dev": "node 01-demo.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "moment": "^2.24.0",
    "nzh": "^1.0.4"
  }
}
```
npm start执行  start 语句 进而执行 node 01-demo.js
### REPL环境

> REPL是 Read Eval Print Loop的间歇，翻译过来就是： 交互式解释器)。通俗一点理解 REPL 是一个可以执行JavaScript代码的环境，类似于浏览器中的 Console控制台 ，可以做一些代码测试。
按 **ctrl + 两次c **  退出REPL环境

### nodejs运行js代码

> 使用REPL可以执行js代码，但是这样如果要写大规模的代码，这些写起来很繁琐，所以，我们一般不会在REPL环境下写代码，而是将代码写在一个单独的.js文件中，然后调用 **node** 命令执行该文件里面的代码。

```
E:\code\day1>node E:\code\day1\test.js
node命令行执行了代码！

```
注意：

1. 文件的路径可以是绝对路径
2. 文件的路径也可以是相对路径，但是如果是相对路径执行，请确保是在当前文件所在的文件夹下打开的命令行窗口。

## Nodejs之模块

> nodejs一个重要的特性就是模块化，模块就是node.js对常用功能进行分组的方式。 
### node是什么？
nodejs 是什么？ 答： nodejs 就是一个软件，软件安装后，可以提供一个 js 运行环境。
### node repl环境
nodejs 提供了 repl 环境，可以编写 js 代码，不方便。 更建议 使用 文件的方式保存我们的代码，然后 通过 node 命令执行文件里面的代码。
### node 模块化发展历程
serverjs - commonjs - AMD - CMD -es6 moudel(官方)
单个文件过大、变量的冲突-----》 更加规范管理代码----》 规范

serverjs 规范（早、 定义 nodejs）
commonjs 规范（common 通用 使用于任何可以执行javascript的环境）（1. 一个文件就是一个模块， 里面的东西都是私有。 2. module.exports 导出 3. require('./模块名称')）
AMD 规范 require.js （异步加载）
玉伯 CMD规范（国内 ）seajs 已死
es6 模块化
nodejs 里面使用的 commonjs 规范(复习)

一个文件一个模块。 里面的东西都是私有。

导出 module.exports

require('./模块的名称')

如果有多个模块可以组织成一个包（package-->npm）



### Nodejs的模块规范


> `Nodejs`使用模块化来组织JS代码，模块规范采用**CommonJS规范**。 
>
> 1. 在CommonJS规范中，通过 `require()` 方法，以此引入一个模块的API到当前上下文中。
> 2. 通过 `module.exports` 对象用于导出当前模块的方法和变量。
>
> 注意：传递给requrie()方法的参数，它必须是符合小驼峰命名的字符串，或者是以`.`、`..`开头的相对路径，或者绝对路径，它可以没有文件名后缀`.js`。 

### 模块分类 

1. 核心模块
2. 第三方模块
3. 自定义模块
如果有多个模块可以组织成一个包（package-->npm）
### 常用的包

    nodemon
### 其他打包工具
    bower yarn

### 常见核心模块讲解
Node-module
### 常用全局变量：
        var path =require('path')//导入path模块
        console.log(__filename);//当前文件绝对路径
        console.log(__dirname);//当前文件所在目录的绝对路径
### path模块
        1、path.dirname()  :获取目录
        2、path.basename() ：获取文件名.扩展名(我们统称为全名)
        3、path.extname()  : 获取扩展名（ext:extend）
        4、path.parse()    : 将一个路径转换成一个js对象
        5、path.format()   ：将一个js对象转换成路径
        6、path.join()     : 拼接多个路径成一个路径(相当路径)
        7、path.resole()   :绝对路径
### url模块：
        url.parse():将一个url转换成js对象
        url.format():将一个urlobj对象转换成url字符串
### querystring模块：
        var querystring = require('querystring');//导入querystring模块
        1、querystring.parse()     : 将一个类似于 id=1&name=ivan的字符串转换成{id:1,name:'ivan'}的js对象
        2、querystring.stringify() : 将一个类似于{id:1,name:'ivan'}的js对象的字符串转换成 id=1&name=ivan
        3、querytring.escape()     : 可以将http://www.baidu.com/dd/?id=1&name=中文 转换成                                    http%3A%2F%2Fwww.baidu.com%2Fdd%2F%3Fid%3D1%26name%3D%E4%B8%AD%E6%96%8              7  作用是：防止中文乱码
        4、querytring.unescape()   : 将http%3A%2F%2Fwww.baidu.com%2Fdd%2F%3Fid%3D1%26name%3D%E4%B8%AD%E6%96%87 还原成正常的url
###  fs模块：
        node  js大部分api都给你提供两种调用方法：同步sync和异步（回调函数）
        fs模块：主要对文件进行读写
        var fs =require('fs');引入fs模块
同步:（for example）
        var result=fs.readFileSync('./index.html');//读取文件
        fs.writeFileSync('./index.html',result);//写入文件
异步:（for example）
        fs.readFile有两个函数，第一个是要读取的文件路径，第二个是读取完成以后的回调函数
        fs.readFile('./index.html',function(err,data)){
        if(err){
             console.log(err);
             return;
        }
        fs.writeFile('./index.html',data,function(err)){
        if(err){
             console.log(err);
         return;
    }
         console.log('success'）
        })
        })
注释：
node js 运行过程中ctrl+c打断
module.export=("copy":copy)//导出copy方法
var copy=require("./07fs模块").copy;
###  http模块
        1.导入一个http的包
        var http=require('http')
2.创建一个socket服务器 
        var server = http.createServer();
3. 接收请求(监听request事件)
        req:request(请求)代表的是浏览器的请求报文对象 (获取浏览器发送过来的一些数据，例如url和参数等等)
        res:response（响应）代表的是响应给浏览器的响应报文对象，服务器向浏览器发送的一些数据都是通过它来操作
server.on('request',function(req,res){
    //这个里面的主要操作有两个：
    //1.学习req对象中的常用的属性
    //1.0.1 获取到请求url字符串(请求的url的路径+参数)
    console.log(req.url);
    //1.0.2 获取请求的方式
    console.log(req.method);
    //1.0.3 研究req对象
    console.log(req);
    //2、学习res中的常用属性和方法
    //2.0.1 设置响应报文头(注意点：设置方法一定要写到res.end()之前才有用)
    //当响应中文浏览器解释为乱码的时候，请输入charset=utf8
    res.setHeader('Content-Type','text/html;charset=utf8');
    //2.0.1 想要浏览器不一直等待，必须要执行end()方法响应回去
    //注意点：多次利用end()方法发送数据回去，只有第一次有用，这个时候可以使用res.write(),但是必须在end()之前
    res.write('hello <br />');
    res.write('hello111 <br />');
    res.end('填入想要响应回去的数据');
});
server.listen(8888,'127.0.0.1',function(){
    console.log('web服务器已经启动');
});

#### HTTP模块 

node核心模块之一，用于搭建HTTP服务器；

中文手册 http://nodejs.cn/api/http.html

+ 搭建web服务器
+ HTTP请求与响应
+ 响应文本
+ 响应HTML代码
+ 响应 HTML 页面
+ 响应其他静态资源
#### URL模块
```
Url {
  protocol: 'https:',  protocol协议
  slashes: true,  斜杠语法
  auth: null,  authority权利 author作者
  host: 'www.baidu.com',  主机 域名
  port: null, 端口
  hostname: 'www.baidu.com',  
  hash: 拼凑 有锚点就   #?&三个  可以截取后面的search 和 query  和 path
   '#aa?wd=html5&rsv_spt=1&rsv_iqid=0xd74f73150004fc27&issp=1',
  search: null,?$这个部分
  query: null,  name=zhang$age=23这个部分。
  pathname: '/s',
  path: '/s', 路径   没被截取的话 /s?&
  href:
   'https://www.baidu.com/s#aa?wd=html5&age=10 }
```

