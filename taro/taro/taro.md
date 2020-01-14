# taro

### taro 官网

[taro](https://taro-docs.jd.com/taro/docs/README.html):  遵循React语法规范的多端开发解决方案

### 安装使用

1. 安装Taro 开发工具 @tarojs/cli
2. 使用npm 或者 yarn 全局安装 或者直接使用 npx
3. $npm install -g @tarojs/cli
4. $yarn global add @tarojs/cli

### 开发打包命令

 1. 使用命令创建模板项目

    taro init myApp

 2. 开发期间启动命令

    npm run dev:h5 web

    npm run dev:weapp 微信小程序

    npm run dev:alipay  支付宝小程序

    npm run dev:swan 百度小程序

    npm run dev:rn  ReactNative

3. npm 5.2+ 也可在不全局安装的情况下使用 npx 创建模板项目npx @tarojs/cli init myApp 



### taro 全局安装失败的问题(个人问题)

1. npm list 查看全局的包

2. npm install 全局安装好所有包

3.  cnpm install global @tarojs/cli@1.3.34

### 系统上禁止运行脚本的解决办法

https://blog.csdn.net/wqnmlgbsz/article/details/100654258





### 路由

> 在 **Taro** 中，路由功能是默认自带的，不需要开发者进行额外的路由配置。
>
> 我们只需要在入口文件的 `config` 配置中指定好 `pages`，然后就可以在代码中通过 **Taro** 提供的 API 来跳转到目的页面

例如：跳转到目的页面，打开新页面

```
Taro.navigateTo({
	url:'/pages/page/path/name'
})
//还支持promise
import Taro from '@tarojs/taro'

Taro.navigateTo(params).then(...)
```

相关 api

```
Taro.navigateTo( )

Taro.redirectTO( )

Taro.switchTab( )

Taro.navigateBack({ delta : 2 } )

Taro.reLaunch( )

Taro.getCurrentPages( ).length
```

路由参数

```
// 传入参数 id=2&type=test
Taro.navigateTo({
  url: '/pages/page/path/name?id=2&type=test'
})

样的话，在跳转成功的目标页的生命周期方法里就能通过 this.$router.params 获取到传入的参数，例如上述跳转，在目标页的 componentWillMount 生命周期里获取入参

class C extends Taro.Component {
  componentWillMount () {
    console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
  }
}
```



### 条件渲染

> 适配小程序的话，最好使用 三元表达式

!一定不能再render 函数之外定义 jsx 在taro 小程序中是不可以的,H5中可以

### 列表渲染

  ! Taro中不能再用 map处理数据，只负责展示 ,要么就先处理好

### this.props.children 

### 事件处理

! 注意 this 指向  也不能采用箭头函数的方式，只能采用 .bind 改变指向

! event  阻止事件冒泡  event.stopPropagetion() 不能用return false

! event 永远在最后一个，默认传递的

! 父组件传函数给子组件的时候  需要给属性加一个 on,在小程序中

! Taro 的环境变量   判别环境  process.env.TARO_ENV  只能在开发期使用

```
const isH5 = process.env.TARO_ENV == 'h5';
if(isH5){
	require('./h5.less')
}else if(!isH5){
	require('./weapp.less')
}
```

! Taro 支持less css  不能用 id选择器 标签选择器  属性选择器 后代选择器 不一定生效

!  类选择器  必须定义 className 

！自定义组件  只对当前组件有效

! 最好采用 flex 布局, 适配比较好





### 切换分类请求页面跳转

1. 切换分类时重新请求

2. 如果跳转的是当前页面的话，就不需要再次请求，用于减少服务器开销

3. 页面的跳转

4. Taro.navigateTo为什么不能频繁使用

   ```
   因为：小程序规定webview的切换 不能超过5层，会认为你过于复杂。类似replace push 增加路由地址   用push 没有路由地址。所以可以多个使用.
   ```

   

