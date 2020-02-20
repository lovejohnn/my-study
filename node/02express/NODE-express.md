## express方法
### 表达()
1. express.json()
>
2. express.static(root,[options])
>该root参数指定从中提供静态资产的根目录。该函数通过req.url与提供的root目录组合来确定要提供的文件。当找不到文件时，它不是发送404响应，而是调用next() 继续下一个中间件，允许堆叠和回退。
>app.use(express.static(root,options));
3. express.Router([options])
>创建一个新的路由器对象。
>var router = express.Router([options]);
>可以添加中间件和HTTP方法路由（如get，put，post，等），以router就像一个应用程序。
4. express.urlencoded([options])
>

### 方法
- app.delete()
- app.get()
```
    app.get(path,cllback[,callback]);
    使用指定的回调函数将HTTP GET请求路由到指定的路径。
```
- app.post()
- app.listen()
- app.put()
- app.render()
- app.route()
- app.set()
- app.get()
- app.use()
```
app.use（[path，] callback [，callback ...]）

在指定的路径上安装指定的中间件函数：当请求的路径的基数匹配时，执行中间件函数path。
```
```
router.use（[path]，[function，...] function）

使用指定的中间件函数或函数，以及可选的安装路径path，默认为“/”。

此方法类似于app.use（）
```
```
在指定的路径上安装指定的中间件函数：当请求的路径的基数匹配时，执行中间件函数path。
```
### 模板引擎基本用法
//安装 npm install art-template
//安装 npm install express-art-template
engine(引擎)
app.engine('html', require('express-art-template'));
//开启模板引擎
app.set('view engine', 'html');

//熏染
 res.render('index.html',{title,infos,arr,datas});



### mongoose 基本使用
1. 连接 
mongoose.connect('mongodb://localhost/test',); //连接到数据库
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}); //
2. 创建构造函数  
const Cat = mongoose.model('Cat', { name: String, age: Number }); // MongoDB ---》 cats 表
3. 实例化对象并赋值
const kitty = new Cat({name : 'tom', age: 33});
4. 保存 
kitty.save().then(()=>{
    console.log('insert ok');
})

5. 查询 直接使用构造函数提供的方法（静态方法)
cat.find((error, data)=>{
    console.log(error);
    console.log(data);
    mongoose.disconnect();//断开数据库连接
})

### 路由概念
-   路由是指应用程序的端点（URI）如何响应客户端请求  方式+路径
- 路由是指确定应用程序如何响应对特定端点的客户端请求，该请求是URI（或路径）和特定HTTP请求方法（GET，POST等）。req.url req.method
每个路由都可以有一个或多个处理函数，这些函数在路由匹配时执行。

### 中间件
Express是一个路由和中间件Web框架，它具有自己的最小功能：Express应用程序本质上是一系列中间件函数调用。
中间件函数是可以访问请求对象 （req），响应对象（res）以及应用程序的请求 - 响应周期中的下一个中间件函数的函数。下一个中间件函数通常由名为的变量表示next。

### 怎么定义路由
-   使用Express app对象的方法定义路由，这些方法对应于HTTP方法; 例如，app.get()处理GET请求和app.post处理POST请求。有关完整列表，请参阅app.METHOD。您还可以使用app.all（）来处理所有HTTP方法
- 并使用app.use（）将中间件指定为回调函数
- 应用程序侦听与指定路由和方法匹配的请求，检测到匹配时，将调用回调处理函数

### 路线方法
- 路由方法从其中一个HTTP方法派生，并附加到express类的实例。app.all('./select',cb)

### 路线路径
- 路径路径与请求方法结合，定义可以进行请求的端点。路径路径可以是字符串，字符串模式或正则表达式。

### 路径参数 req.params
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}

### 回应方法
res.download() 	提示下载文件。
重发（） 	结束响应过程。
res.json（） 	发送JSON响应。
res.jsonp（） 	使用JSONP支持发送JSON响应。
res.redirect（） 	重定向请求。
res.render（） 	渲染视图模板。
res.send（） 	发送各种类型的回复。
res.sendFile（） 	将文件作为八位字节流发送。
res.sendStatus（） 	设置响应状态代码并将其字符串表示形式作为响应主体发送。

### 中间件示例
