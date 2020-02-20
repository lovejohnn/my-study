# 后台管理系统
1. 项目初始化
2. 目录规划
3. 路由规划
4. 路由懒加载
5. layout 布局
6. 文章管理模块
-----------------

# 技术栈
1. react
2. react-redux
3. antd
4. axios
5. moment
6. react-router
7. react-loadable
.....

# 项目展示
借助 react + antd + react-router-dom 实现一个后台的 cms 系统。

现在开发的模式：重前端、轻后端。



# antd 简介

## 简介
本次的课程主要是学习  react + antd + react-router-dom  实现一个后台的单页应用。

对于 antd 要了解到，是蚂蚁金服出的一款 UI 组件库（基于react）。

知道几点：antd的生态圈：

1. antd 是一个UI组件库（适合做PC端的后台管理项目（中后台项目）、需要对 react 基础理解非常的深）
2. antd pro 使用 antd 开发好的一个后台管理系统（x-admin）（这个产品对 react 的要求不高，主要是针对那些不会使用 react的后端程序员开发的）
3. antd mobile 是适合做手机端的 SPA 应用的组件库

--------------
4. dva  数据流前端框架
6. umi React 应用开发框架

这两个产品也是蚂蚁金服出的，相当于是一个 react + antd + react-router-dom 的脚手架。

react  的脚手架(create-react-app)

SPA 应用（react + react-router-dom + redux + react-redux+antd）

```shell

yarn add react + react-router-dom + redux + react-redux+antd

```

对于这种命令没有任何的技术含量，只是重复性的操作，那么 蚂蚁金服 前端团队的针对上面的痛点，做了一个脚手架。dva（守望先锋）、umi

## 文档
下去之后，把 antd 的相关的生态圈关键字全部自己去百度查询，做到每个关键字都可以对答如流。


# 项目初始化

参考文档：https://ant.design/docs/react/use-with-create-react-app-cn


## 1. `create-react-app` 初始化项目
```shell

npx create-react-app react-antd

cd react-antd


```

## 2. 安装 `react-app-rewired` `customize-cra` 开启装饰器模式,

```shell
用于高阶组件修饰起来比较麻烦  简单化操作@
yarn add react-app-rewired customize-cra //
yarn add babel-plugin-import //按需加载组件代码和样式的babel插件
@babel/plugin-proposal-decorators
```
### 修改配置的条件

> 此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）。
> 引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 react-app-rewired@2.x 版本的关系，你还需要安装 customize-cra。

其他的配置

1. 引入 react-app-rewired 并修改 package.json 里的启动配置。

   ```
   /* package.json */
   "scripts": {
   -   "start": "react-scripts start",
   +   "start": "react-app-rewired start",
   -   "build": "react-scripts build",
   +   "build": "react-app-rewired build",
   -   "test": "react-scripts test",
   +   "test": "react-app-rewired test",
   }
   ```

2. 在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。

   ```
   npmjs =>  customize-cra 找配置项
   module.exports = function override(config, env) {
     // do stuff with the webpack config...
     return config;
   };
   //去开启装饰器模式
   ```

   ```
   config.override.js 配置
   const {
       override,//重改配置
       addDecoratorsLegacy, //开启装饰器模式
       fixBabelImports,
       addLessLoader
   } = require("customize-cra");
   
   const modifyVars = require('./theme/index.js');
   
   module.exports = override(
       // enable legacy decorators babel plugin
       addDecoratorsLegacy(),  //开启装饰器模式
       fixBabelImports('import', {
           libraryName: 'antd',
           libraryDirectory: 'es',
           style: true,
       }),
       addLessLoader({
           javascriptEnabled: true,
           modifyVars //1DA57A
       }),
   )
   ```

   ### 使用 babel-plugin-import[#](https://ant.design/docs/react/use-with-create-react-app-cn#使用-babel-plugin-import)
   
   > 注意：antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。
   
   [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://ant.design/docs/react/getting-started-cn#按需加载)），现在我们尝试安装它并修改 `config-overrides.js` 文件。
   
   ```
   + const { override, fixBabelImports } = require('customize-cra');
   
   - module.exports = function override(config, env) {
   -   // do stuff with the webpack config...
   -   return config;
   - };
   + module.exports = override(
   +   fixBabelImports('import', {
   +     libraryName: 'antd',
   +     libraryDirectory: 'es',
   +     style: 'css',
   +   }),
   + );
   ```
   
   


参考文档：
https://ant.design/docs/react/use-with-create-react-app-cn

https://www.npmjs.com/package/customize-cra


## 3. 安装 `antd`
```shell
yarn add antd

```

注意： antd 组件库里面的样式都是使用的 less 预编译语言开发的。antd 这个组件库，默认是有一整套完整的样式（theme 主题），有的时候我们自己的产品不喜欢默认的样式，在我们就需要自己定制化的修改。所以就要去修改 antd 相关的主题色。

例如：
```

<Button type="primary">默认色</Button>

对于antd 使用 primary 这个关键字，默认的颜色是蓝色的。

danger 颜色是红色。


```

https://ant.design/docs/react/customize-theme-cn



## 4. 开启 `less` 支持

```shell

yarn add less less-loader

```

## 5. 配置 `antd` 主题

```javascript
module.exports = {
    "@primary-color": "#1890ff", // 全局主色
    "@link-color": "#1890ff", // 链接色
    "@success-color": "#52c41a", // 成功色
    "@warning-color": "#faad14", // 警告色
    "@error-color": "#f5222d", // 错误色
    "@font-size-base": "14px", // 主字号
    "@heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
    "@text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
    "@text-color-secondary": "rgba(0, 0, 0, .45)", // 次文本色
    "@disabled-color ": "rgba(0, 0, 0, .25)", // 失效色
    "@border-radius-base": "4px", // 组件/浮层圆角
    "@border-color-base": "#d9d9d9", // 边框色
    "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", // 浮层阴影
}


```

装饰器的开启



## 6. 安装 `react-router-dom` 开启路由支持

```shell
yarn add react-router-dom

```



## 7. 安装 `axios` 及封装api请求

```shell
yarn add axios
```

## 8. 安装 `redux` `react-redux`

```shell
yarn add redux react-redux

```

## 9. 配置 antd 的中文环境 ( internationalization )

注意：如果开发的项目支持多国语言，一般叫做国际化项目，一般称为 **i18n**。

**i18n** 是 internationalization 单词的简写。

https://ant.design/docs/react/i18n-cn



# 目录规划

> 主页结构  admin.js
>
> ​	页面结构定义
>
> ​	目录结构定义
>
> ​	栅格系统
>
> ​	calc计算方法使用    css3中新的计算属性

```
public
	1.images 放不需要处理的图片 ./404.jpg 即可使用
src 
    1. views  //页面
        1. Login
        2. Admin
            - dashboard
            - article
            - setting
            index.js 一起导出
        3. NotFound
        
    2. components  //组件
    	-FrameOut //公共部分组件
    3. routers  //路由
    4. store  //数据仓库
	5. api
	6. css
	7. utils

```

# 路由规划
1. 公共路由 commonRoutes

2. 私有路由 PrivateRoutes

注意1：在设计路由的时候，我们要考虑好，有些页面是公共的，大家都可以访问；
但是有些页面必须是登录之后，授权后才可以查看。

注意2： 后台里面的一些功能（页面）是需要做权限认证，不同的后台人看到的后台的界面应该是不一样的（超级管理员可以操作后台的任何操作、但是如果是销售人员看到的就是销售订单相关的页面、如果是运维人员看到的就是系统的设置页面）。

一般后台登录后也要设计权限，一般才有的思想就是 **RBAC**（基于角色的权限管理： 

1. 权限（后台的页面） 2. 角色（对权限的封装） 3. 用户）

本次将路由的信息单独的提取一个配置文件

（1. 方便管理 2. 路由信息会在很多地方使用），然后在进行路由的操作。

```
routes.js
import { 
    Article
    Setting } from '../views'

const commonRoutes = [
    {
        pathname : '/login',
        component : Login 
    }
]
export {
    commonRoutes
}
```



## 路由加载显示

> 通过配置好的路由表 显示出来组件
>
> 1. 私有的 要做鉴权操作才能显示的页面
> 2. 公有的 可以显示
> 3. 404 页面，不匹配时显示

> 

```
<Switch>
                {/*根据公有路由对象配置 */}
                {/**私有路由 */}  
                <Route path='/admin' render={(rootprops) => {
                    //到时候做鉴权操作
                    return <App {...rootprops}></App>
                }}></Route>
                {/**公有路由 */}
                {
                    commonRoutes.map((item, i) => {
                        return (
                            <Route path={item.pathname} component={item.component} key={i}></Route>
                        )
                    })
                }
                {/**404路由以及默认路由 */}
                <Redirect from='/' to='/admin' exact ></Redirect>
                <Redirect to="/404" ></Redirect>
            </Switch>
```

### 路由分级

```
/admin 一级路由
	/admin/dashboard 仪表盘 二级路由 privateRoute也有路由鉴权
	/admin/article 新闻
	/admin/setting 设置
	//巧妙布局： 把路由配置给 公共路由 包裹起来。 将私有的放到里面 条件显示
/login
/404 
用户首先进去的页面是什么? / => admin(鉴权是否登录) => loagin(未登录) => 登录 => admin
/ => admin(鉴权是否登录) => loagin(已登录) => admin(等级鉴权) 
-all open 系统管理员
-just dashboard 销售
-jsut dahsboard,setting  运维
```





## 页面布局开始(注意提取公共部分)

> antd 布局  **提取公共部分页面**   骨架

> 样式的更改 index.less

# 路由 组件懒加载
> 通过查看network 看加载情况

https://www.npmjs.com/package/react-loadable

```shell
yarn add react-loadable 
```

查看文档使用 loadable 高阶组件



### 动态渲染数据？根据路由配置

```
const privateRoute = [ //二级菜单
	{
		pathname:''
		component:
		title:
		icon:
		isTop: true //代表是一级菜单
		cihlren:[ //三级菜单
			pathname:
            component:
            title:
            icon:
		]
	}
]

1. 路由名称的动态渲染
2. 如果现在 规定只让显示一级路由呢？
3. /admin/article/edit/:id  文章的编辑
```

## 格式化数据 ， 或者说得到自己想要的格式 数据

## 路由跳转 

> 高级组件 withRouter 它是  react-router-dom中的

### 一个小问题: import 要放到文件最上面去

**模拟数据**

json-server 自己模拟json接口

placehoder 现成接口

rap2.taobao 自定模拟接口及类型

node中文社区现 成接口

```
https://cnodejs.org/api
```

### axios 的扩展使用**interceptors** ---与--axios.create **baseURL**

```
import axios from 'axios'
//数据： https://cnodejs.org/api/v1 baseURL 基础的 URL 地址
//话题接口： https://cnodejs.org/api/v1/topics?page=2&limit=2

//axios 的的另外一种使用方式，一般我们的项目分为
//开发模式 development
// 线上模式 production
//process.env_NODE_ENV node.js运行的环境
// 1. 配置基准地址
const isDev = process.env.NODE_ENV === 'development';
const service = axios.create(
    {
        baseURL :isDev ? 'https://cnodejs.org/api/v1' :'https://cnodejs.org/api/v1',

    }
)
// 2. 可以使用对象的API 进行网络请求的拦截，(1.拦截请求 传递参数token)2.拦截响应，做统一的处理
service.interceptors.request.use((config)=>{
    console.log('请求前的操作',config);
    
    return config;
})
service.interceptors.response.use((response)=>{
    if( response.status === 2220 ){
        return response;
    }else{
        // 统一处理错误
        message.error('系统繁忙中，稍后在试一试....'); //message 为 antd 导入的
    }
    
})
const getTopce = ()=>{
    return service.get('/topics');
}

export {
    getTopce
}
```

### 格式化处理数据 Object.keys  Object.values 这种API

```
var first = res.data.data[0]
   console.log( first );
           
 var keys = Object.keys(first)  Object.keys() 拿到一个对象的keys index => keys 的数组
  console.log(keys);
  //格式化处理
   var rs = [];
            for(let i = 0, length = res.data.length; i < length; i++){
                var tmp = {
                    id: res.data[i]['id'],
                    title: res.data[i]['title'],
                    visit_count: res.data[i]['visit_count'],
                    create_at: res.data[i]['create_at'],
                    author: res.data[i]['author']['loginname'],
                }
                rs.push(tmp);
            }
```

---

```
const mapFieldToChinese = {
    id: '序号',
    title: '标题',
    visit_count: '阅读数',
    create_at: '发布日期',
    author: '作者'
}
keys=[
	0:title,
	1:visit,
	2.create_at,
	3....
]
id: '序号',
title: '标题',
visit_count: '阅读数',
create_at: '发布日期',
author: '作者'
var columns = keys.map(item=>{
                if( item === 'visit_count' ){
                    return {
                        title: mapFieldToChinese[item] ,
                        dataIndex: item,
                        key: item,
                    };
                }
                }
```



# 扩展阅读
1. https://blog.csdn.net/topgum/article/details/82995498
2. https://www.cnblogs.com/we8fans/p/9908227.html
3. https://www.jianshu.com/p/513c5eab17c1
4. https://umijs.org/zh/
5. https://blog.csdn.net/SCU_Cindy/article/details/82432971

## 

动态的根据用户的菜单选项实现浏览器选项卡标题的更改

```
利用 this.props.history.listen((location)=>{}) 这个api 去监听hash变化执行location当前地址栏
```

### 异步请求 loading 效果?

1. 一般是 异步请求开始时 设置一个动画
2. 异步请求完成之后 取消动画 
3. 异步请求失败后 取消动画

> Promise .finally(()=>{  //无论怎么都执行？ finally()
>
> })

## 分页

1. 请求的时候，通过url地址传递参数，请求不同的数据

   ```
   const getTopce = (page=1, limit=5)=>{
       return service.get(`/topics?page=${page}&limit=${limit}`);
   }
   ```

2. 点击的时候传递不同的参数进去

   ```
   handleGettopce(page,limit){
       this.state.loading = true;
       getTopce(page,limit).then((res) => {})
    }
   ```


### React-redux 的使用

https://www.jianshu.com/p/fc08ad78d589



# 需求：

1. 使用 redux 实现后台系统的通信中心的信息的同步（标记为已读--->右侧动态）
2. 实现 excel 导出功能 https://www.npmjs.com/package/xlsx
3. bug修复（修复顶部的 title 的动态变化）

# 扩展阅读

1. https://www.materialui.co/
2. http://www.hewebgl.com/article/articledir/1
3. https://www.npmjs.com/package/xlsx

# 数据可视化

1. d3 可视化库 D3.js
2. dataV 数据可视化 阿里云
3. threejs ThingJS基于three.js封装,是面向物联网3D可视化开发的Javascript库
4. antv 蚂蚁数据可视化
5. echarts  百度
6. highchart 兼容 IE6+、完美支持移动端、图表类型丰富、方便快捷的 HTML5 交互性图表库
7. p5.js 


