# 项目实战一

## 课程目标


### 文件默认约定
app.js入口文件
public部署静态资源 css js fonts images lib等等
routes部署外部路由 
views 部署 模板html
- 一般还可以有什么？


使用哪些包?
    "art-template": "^4.13.2",
    "body-parser": "^1.19.0",
    "cookie-session": "^1.3.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-art-template": "^1.0.1",
    "mongoose": "^5.6.10",
    "multer": "^1.4.2",
    "request": "^2.88.0"

### 入口文件的编写
app.js

### 配置模板引擎  需要使用到 2个包art-templata 和 express-art-template
```
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

//熏染模板的  res.render('some.html',{rs});
// 模板引擎使用 {{each arr}}   {{$index}} {{$value}} {{/each}} {{if}} {{else}}
//重定向 res.redirect('/some.html'); 

//模板的使用注意使用  结构赋值传值方便  模板中变量，定义的schema结构 ，数据库变量保持一致。
### 改模板，添加数据, 设路由

```
### post请求获得数据 可以使用body-parser包
[link](http://www.expressjs.com.cn/en/resources/middleware/body-parser.html)
1. 导包
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

2. 设置解析
//post 解析设置。
app.use(bodyParser.urlencoded({ extended: false }));

3. 继续设置。
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//post请求  
router.post('/category-add',urlencodedParser, (req, res)=>{
    if (!req.body) return res.sendStatus(400)
      res.send('welcome, ' + req.body.catename);
})

### 使用mongoose 操作数据库
1. 下载并导入包
var  mongoose = require('mongoose');//引入数据库
var schema = {name:String,time:String,type:String,tor:String,desc:String}; //表结构
var Movies = mongoose.model('Movies',schema);  //模型

2. 连接到数据库
mongoose.connect(mongodb://localhost,{ useNewUrlParser: true});

3.  写入到数据库
 var bofei =  new Cat({name:'bofei', age:'22'}); //实例化赋值

 bofei.save().then(function(rs){  //保存到数据库
     console.log(rs);
 })
4. 从数据库读取
    1. 连接
    mongoose.connect("mongodb://localhost/movies",{ useNewUrlParser: true});
    2. 读取
    Movies.find({},(err, rs)=>{
            //查询的rs 为[{},{}]结构
    })
5. 
Mongoose 里，一切都始于Schema。 现在我们来看一个例子：

var kittySchema = mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);
var felyne = new Kitten({ name: 'Felyne' });
console.log(felyne.name); // 'Felyne'

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);
加在 schema methods 属性的函数会编译到 Model 的 prototype， 也会暴露到每个 document 实例：


### 图片上传模块
multer包使用  express支持的中间件
### 图片的上传操作  multer
https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md

1. 客服端 增加一个图片上传的文本域 (二进制的格式，要设置表单编码格式浏览器才能理解)
	之前那种格式是普通的post提交，
	文件上传格式 multipart/form-data 也可同时处理post的
2. 服务器端。
	使用multer将图片保存在服务器
	将图片数据保存到数据库就行了
3. 具体实现。
	
	// 2. post上传数据
var multer  = require('multer')
var fileName = '';
// 定义存储的位置和文件的名称
var storage = multer.diskStorage({
	// destination 定义上传的目录 建议路径 相对路径
    destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
    },
    // 定义文件的名称 保证唯一性
    filename: function (req, file, cb) {
    	fileName = file.fieldname + '-' + Date.now() + path.extname( file.originalname );
    cb(null, fileName )
    }
})
var upload = multer({ storage: storage })
var movieController = require('../controllers/movieController.js');

//图片上传的路由
//multer会添加一个body对象以及file或者file对象到express的request对象中，
//body对象包含表单的文本域信息，file或files对象包含对象表单上传的文件信息
// upload.single('moiveimg') 参数是表单里面file与里面的name属性的值
 //(req.file是 'avater'文件的信息
    //req.file就是 
    //req.body

roter.post('/category-add-pic', upload.single('cateimg'),movieController.addMovie);



### 在nodejs里面把明文转换成md5密文？ nodejs 官方核心模块里面存在md5
+ util中有 Nodejs中的md5模块
```
var crypto = require('crypto');//nodejs核心加密模块

function utilsMd5(string) {
	var md5Hash = crypto.createHash('md5');

	var stringObj = md5Hash.update( string );

	return stringObj.digest('hex');

}

module.exports = {
	utilsMd5  //导出MD5函数
}
```
### 记住登录的状态？ cookie-session中间件
[cook-session](http://www.expressjs.com.cn/en/resources/middleware/cookie-session.html)
//登录记住状态
```
app.js前面部分部署，其他地方就可以使用了 req.session.username = req.body.username;判断请求中
const cookieSession = require('cookie-session')
    // session是敏感的信息，底层需要加密，需要提供一些随机字符串
app.use(cookieSession({
  name: 'session',
  keys: ['ghjkhghjk$%^&*&^%$RTYUIJHVHJhg'],
}));
```
//登录时给一个sesstion
req.session.username = req.body.username;

//退出清除状态
```
router.get('/logout', function (req, res) {
	// 如何才是退出？
	// 1. 退出到登录页面  2. session清除
	req.session.username = null;
	res.redirect('/login');
});
```
//其他各网页 进入条件？
//一个重定向？
if( !req.session.username ){
		// 用户名如果在session不存在，代表用户之前没有登录过。 则跳转到登录页面
		res.redirect('/login');
		return;
	}

### 能够掌握 `管理员` 的登录功能（为什么要登录？ 后台的有些操作必须是有权限的认证）（HTTP协议 无状态）
### 后台管理员
1. 建表的时候，初始化一条记录，超级管理员
{
    name : 'admin',
    password : 'xxx',
    isRole : 'super'
}
2. 定义一个登陆路由 back.js


### 数据库mongoose的模块的一次性导入方案。
### Cannot overwrite `Movies` model once compiled.
原因分析
多次创建模型

var Movies = mongoose.model('Movies',schema);  //模型
问题
1. //同一个模块中重复执行了这行代码。
解决
    //将他放入到头部。模块导出的时候会被缓存起来只执行一次(commojs原理)

2. //多个模块中需要执行这行代码,app.js引用中执行了多次
解决
    1. app.js入口文件只会执行一次？
    2. 在其他外部模块中导出一个函数，这个外部模块在app。js中引用的时候就可以使用这个函数了，在app.js中将我定义的处理数据库的定义值或模块引用传入这个函数，那个外部模块就可以使用这些数据进行操作了。(就可以使用其值了);
+ 结论: 在app.js中定义一个
结论:每个文件就是一个模块。都有自己独立的作用域.通过require引用，和module.export 导出.执行的时候都是执行入口函数app.js的。只执行一次。但会监听！


### MVC

models
views
controllers
congig 
    db.js 配置db
helper封装最底层的代码

1. 了解前台、后台的基本概念
2. 能够了解 `项目需求分析` 和 `数据表设计`
3. 能够掌握 `电影分类` 的增删改查（curd）操作
4. 能够掌握 `电影资源` 的增删改查（curd）操作
5. 能够掌握 `body-parser` 的使用
6. 能够独立完成 `电影图片` 的上传功能
7. 掌握 `multer` 包的使用
8. 能够掌握 `管理员` 的增删改查（curd）操作
9. 掌握加密的意义
10. 了解常见的加密算法
11. 能够掌握 `管理员` 的登录功能
12. 能够掌握 `cookie-session` 的使用
13. 能够掌握 `express的中间件` 的使用