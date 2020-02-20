首先我们实现的是登录模块



/*
async和await

1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */

```
消灭回调函数
 if (!err) {
     const { username, password } = values;
     reqLogin(username, password).then((response)=>{
         console.log('请求成功了',response.data);
      }).catch((error)=>{
        console.log('请求错误',error);
      })
  }
	async 离最近的函数左侧
  try {
   	const response = await reqLogin(username, password)
  	console.log( '请求成功',response.data );
   } catch (error) {
  	console.log('请求失败了吧？',error);
  }        
                
```

> 项目初始化。做的一些事情
>
> 1. 装饰器，2.自定义antd主题，3.antd按需打包。
>
> 在jsx中引入图片，需要使用导入方式。
>
> 静态的文件放在 public 中即可
>
> git 管理项目
>
> antd表单高阶组件，高阶函数，登录申明式验证，自定义验证
>
> postman 接口测试
>
> 封装axios请求。1.处理post get请求, 2. BackURL  3.统一处理错误
>
> 代理服务器跨越请求
>
> async和await 解决回调函数。
>
> 登录维持, 自动登录 1. 原生 localstorage  2. store.js库
>
> Nav-lfet 路由匹配动态生成，二级路由
>
> 不是路由组件，想要拿到props，使用高阶组件 withRouter 获取 history location match
>
> *debugger*打断点的使用，以及点击子菜单后，刷新自动打开已点击子列表功能(使用点击的那项的路由是否有children)
>
> webpack-dev-server 运行自己打包的代码 http-proxy-middleware代理
>
> jsonp天气请求封装, 时间动态显示并按格式输出
>
> 退出登录功能实现
>
> 封装一个 link-button  无状态的,主要是搞清楚接收 props , 以及 props.chidern 可以自定义样式。
>
> 异步请求商品分类信息,并使用 loading 管理
>
> 根据一级商品分类id，获取二级分类列表并展示。1. setState()是异步的 2. setState传函数。setState(obj, callback)callbak在成功更新状态后，再执行的。
>
> 组件太多了。抽离组件
>
> 1. category  -> add-form ->fix-form
>
> 组件传值。传值绑定。子组件传递父组件
>
> prop-types的使用
>
> antd table 的 form api careate()   { resetFields , getFieldDecorator('parentName',({})(渲染部分)) , getFieldValue('parentName')} =  this.props.form
>
> debugger的实用。以及 Sources catl + p 查找文件





未找到模块:无法解析“jest-resolve/build/default_resolver”in 'D:\ABOOK\Code\React-Project\react-admin\node_modules\jest-pnp-resolver”

Module not found: Can't resolve 'jest-resolve/build/default_resolver' in 'D:\ABOOK\Code\React-Project\react-admin\node_modules\jest-pnp-resolver'

这个错误发生在构建期间，不能取消。

解决：vscode 自动生成的无用代码导致的问题。



问题

```
Refused to apply style from 'http://localhost:3000/charts/css/reset.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```

public 中 index.html中的引入的css路径是  ./css/index.css  而路由现在是http://localhost:3000/charts/bar   那么则这个css找不到

解决，去掉  .  使用 /css/index.css



1. table =>  form对象里面的  validateFields( )
2. 分页技术，纯前台分页  一次获取所有的数据,翻页不需要再发请求
   1. 
3. 基于后台的分页 每次只获取当前页的数据 翻页时要发请求

onChange:(paegNum) => {this.getProducts(pageNum)}

getProducts(pageNum)      

 接收的参数就是我们要传入的参数。这样的活这样简写  

onChange:(paegNum) => this.getProducts



dom元素  innnerTHML 的react使用版本

```
danderouslySetInnerHTML ={{__html:'<h1>这里可以写html代码</h1>'}}
```

使用路由编程式跳转时还可以传递一个  state过去

```
onClick={()=>{this.props.history.push('/product/detail',{prodeuct})}}
接收 this.propr.location.state.prodeuct
```

异步显示分类名称

```
一次性发出多个请求。通过多个await方式发送多个请求。后面一个请求时在前一个请求成功返回之后才发送
一次性发出过个请求。只有都成功了，才正常处理
Promise.all([])
const results = Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
const cName1 = results[0].data.name
const cName2 = results[1].data.name
```

图片上传分析   

父组件调用子组件的方法。在父组件中通过ref得到子组件标签对象也就是组件对象。得到其方法.

react-draft-wysiwyg  

what you see is what you get



菜单权限管理。

```

```



换一种方式直接  操作 state  

1. 通过结构赋值方式  const roles = [...this.state.roles]

2. 深拷贝  const roles = JSON.parse(JSON.string(roles));

   更新部分简洁写法：(函数写法)

   ```
   this.setState(state=>({
   	roles:[..state.roles,rold]  //添加一个role
   }))
   ```