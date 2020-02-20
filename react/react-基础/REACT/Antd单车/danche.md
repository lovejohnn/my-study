### 修改webpack 配置,支持 less

> 1. 直接yarn eject配置出来
>
> 2. 修改 config 配置 webpack.config.dev.js 和webpack.prod.js
>
>    注意webpack 的配置是从右到左，从下到上生效的

> 一个对 create-react-app 进行自定义配置的社区解决方案
>
> yarn add react-app-rewired customize-cra



Antd 后台管理系统一般配置.

> yarn add <packageName> 默认为yarn --save 是 yarn 默认的开发依赖
>
> yarn add <packageName> --dev 依赖会记录在 package.json 的 devDependencies 下 生产环境
>
> 常用命令 https://www.cnblogs.com/lililia/p/10482169.html

react-router.dom antd less lessloader redux react-redux



### 目录划分

主页结构  admin.js

​	页面结构定义

​	目录结构定义

​	栅格系统 import {  Row, Col } from  antd对象，包括很多组件，按需引入组件

​	calc计算方法使用    css3中新的计算属性https://www.html.cn/book/css/values/functional/calc().htm



### 样式 less

```
less 编写
1. 嵌套
2. 变量定义 @colorA:'red'   color:@colorA
mixin
函数
导入 
```

### 路由划分

menuConfig.js

本应该是后台动态渲染的菜单

并且有 权限划分，不同级别的看到的权限页面都不一样

### 渲染组件内容

左侧 navleft 渲染

```
import MenuConfig form '....menuConfig.js' //引入路由配置。

通过componentWillMount(){  //首次页面加载完成渲染配置
	const menuTreeNode = this.renderMenu(MenuConfig)
	this.setState({
		menuTreeNode
	})
}
//菜单渲染
renderMenu=(data)=>{   //确定this指向
	return data.map((item)=>{ 
		if(itme.chiren){  //如果还有子菜单
			return (
				<SubMenu title={item.title} key={item.key}>
					{this.renderMenu(item.childer)}
				</SubMenu>
			)
		}
		return <Menu.Item  key={item.key}>item.title</Menu.Item>
	})
}
//使用递归方式，熏染返回的数据 进行渲染
```

### header组件编写

```
一些细节数据，比如登录后才能看到的数据也是传入后生成的。欢迎，河畔一角
通过
this.setState({
	usernaem:this.props.usernaem
})
一些数据通过 redux 获取到
首页等等面包屑 breakcrumb  天气 weather 时间date 

1. 先编写静态页面
2. 实现交互
3. 时间相关的处理
	1. 自己写一个utils
	2. 使用 moment库
4. 百度天气接口，请求天气
```

> 调试技巧：souse  atrl+p 可以直接找文件

**jsonp的再次封装，封装Promise**

```
import JsonP from 'jsonp' //把第三方插件再次封装,可以控制状态码，错误处理
export default class Axios {
	static jsonp(){
		return new Promise((resolve,reject)=>{
			JsonP(options.url,{
				param:"callback"
			},functon(err,response){
				//TODO
				debugger;
				if(response,status==='succese'){
					resolve(response);
				}else{
					reject(responese.message)
				}
			})
		})
	}

}
```

### 底部组件实现

+ 底部组件实现
+ Home页面实现
+ 使用Css实现箭头图标-border透明 transparent

less 的导入 @import '路径' 



### React Router 4.0

+ 第一节：react router 4.0基本概念介绍

  核心概念及用法介绍

  ```
  react-router 3.0以前
  react-router-dom  //基础包，浏览器端使用
  4.0 版本中已不需要路由配置，一切皆为组件
  react-router ：提供了一些router的核心api ，包含Router,Route,Switch
  react-router-dom:提供组件
  ```

  核心用法:

  ```
  HashRouter和BrowserRouter
  Route: path exact component render
  NavLink Link 
  Switch
  Rirect
  ```

  ```
  Link
  	定义 : <Route path="three/:number" /> 
  	取值：this.props.match.parmas.number
  Link：//一个基本的location对象{ pathname:'/', sreach:'', hash:'', key:'', state:{} }
  HashRouter是# 不会发起请求 BrowsRouter / 会发起请求
  ```

  

+ 第二节：react router 4.0 dome介绍

  4.0 基本路由功能实现，混合组件化 	

  4.0基本路由功能 				配置化 : Link 和 Route分开 

  404 <Route component={<Error/>} 404页面

  url中的id值  <Route path="/admin/:mainId" component={ Detail } this.props.match.params.mainId

+ 第三节：项目路由实战开发



Antd UI组件

Ant Design UI 基础组件

Button组件的使用

> 常 用 < Button type="primary" shape="circle" loading={true} icon="search"></Button>

Modal组件使用

> 常用的属性 Modal title visible={} onCancel={} okText cancelText
>
> 需要修改antd样式。在antd系统样式中修改提供的第三方方式   ui.less  在原有样式中添加。不影响其他的使用。
>
> 封装起来。添加一些就可以使用

```
事件传参？ 自定义一个函数。来回调我们要执行的函数
onClick={ ()=>this.this.handleOpen('showmodel') }
handleOpen = (type)=>{
	
}

变量应用的技巧
handleOpen = (type)=>{
	this.setState({
		[type]:true
	})
}
```



Loading组件使用

```
Spin  旋转
```



Notice组件使用

> 常用

Message组件使用

Tab组件使用

Gallery组件使用

Carousel组件使用

> Card Radio单选。



Antd Table组件

> 项目工程化   Mock数据   Axios封装  ，错误拦截 Loading处理

接口 https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/open_city

1. 封装axios 

2. 封装分页功能？  utils.js中

   ```
   data,传数据啊 callback回调啊
   pagination(data, callback){
   	return {
   		onChange:(curreent)=>{
   			callback(current)
   		},
   		surrent:data.result.page,
   		pageSize:data.result.page_size,
   		total:data.result.total,
   		showTotal:()=>{
   			return `共x条`
   		},
   		showQuickJumper:true
   	}
   	 
   }
   ```

   

## 城市管理模块



