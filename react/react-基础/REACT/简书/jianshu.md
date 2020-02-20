### 简书

1. 安装使用 **styled-components**，全局css

   ```
   yarn add styled-components
   ```

   使用：

   ```
   1. 基本组件的使用
   import styled from 'styled-components'
   const HeaderWrapper = styled.div`
   	height:56px;
   	positoin:relative;
   `
   2. 增加属性 styled.a.attrs({
   	href:'/'
   })
   const Logo = styled.a.attrs`
       display:block;
       height:56px;
       width:80px;
   `
   <Logo href='/' />
   3. className
   const NavItem = styled.div`
   	&.left {
   		float:firhgt;
   	}
   `
   4. placeholder 中的样式
   const NavItem = styled.input.attrs({
   	placehodler:'没事'
   })`
   	&.left {
   		float:firhgt;
   	}
   	&::placehodler{
   		color:#ccc;
   	}
   `
   ```

   

2. 公共组件提取 

   ```
   header
   ```

   使用iconfont 

   ``` 
   取到文件- svg -ttf- wwf -eto iconfont.css, 也需要改造 iconfont.css为js
   ```

   使用动画

   ```
   yarn add react-transition-group       github中看使用
   ```

   ```
   简单过度效果
   import { CSSTransition } from 'react-transition-group'
   <CSSTransition
   	in={this.state.focused}
   	timeout={200}
   	classNames = 'slide'
   >
   </CSSTransition>
   挂载的时候回有几个效果
   slide-enter
   slide-enter-active
   slide-exit
   slide-exit-active
   关键样式： transition:al .2s ease-out
   ```

   ### redux / react-readux 的使用

   ### redux-devtools-extension 
   
   > 想使用 开发者工具
   
   ### combineReducer 
   
   > redux 中的多个 reducer
   
   ```
   import { combineReducers  } from 'redux'
   import headerReducer from '../common/header/reducer.js'
   
   combineReducers({
    header : headerReducer
   })
   
   export default combineReducers
   ```
   
   **组件化思想**
   
   ```
   
   ```
   
   

   ### Immutable.js 

   > FaceBook提出来的 ： 可以生成 immutable 对象（不可改变对象)
   >
   > 我们想把 defaulState 变为一个不可变对象

yarn add immutable
1. 引入,改造 defaultState对象为 immutable 对象，为不可变对象 **fromJS()**

      import { fromJS } from 'immutable'
      const defaultState = fromJS({
      	focused : false
      })

2. 改变使用了这个对象的 state.header.focused 也为不可变对象了 **get( )**
   
      ```
      const mapStateToProps = (state)=>{
      	//focused:state.head.focused
      	  focused: state.header.get( 'focused' )  //改造使用 get方法
      	  focused:state.getIn(['header','focused']) //等同于上面。
      }
      ```
   
      
   
   3. reducer 中接收的对象也为 immutable 对象了 **set( )**
   
   ```
   return {
   	focused:true
   }
   //改造使用 set 方法
   return state.set('focused', true);
   ```
   
   4. ajax 获取的数据也变成immutable对象。与 store中的不可变对象保持一致。**fromJS( )**
   
      ```
      import { fromJS } from 'immutable'
      data:fromJS(data)
      ```
   
   5. immutable 的对象，也提供了一个  **map( )** 方法。来遍历展示数据
   
   6. immutable 提供了一个 **toJS( )** 来转化 Immutbale 对象为 普通对象
   
   7. immutable 提供了一个 **marge( )** 来合并
   
   8. redux-immutable
   
      > 统一数据格式
   
   ```
   import { combineReducers  } from 'redux-immutable'
   import headerReducer from '../common/header/reducer.js'
   
   cosnt reducer = combineReducers({
       header : headerReducer
   })
   
   export default reducer
   ```

## redux-thunk  是 redux 的中间件

> 特点：原本我们使用 actoin 的时候，是返回一个对象，而现在可以返回一个函数.
>
> redux-thunk 在 view - store 的中间

public/api/xxx.json

定义格式

```
{
	"success":0,
	"data":[{}]
}
```



**假数据** 利用 areate-react-app 的特性 底层也是一个node的服务器

> 1. 先找路由 2.再找public/api/list.json

代码优化

```
1. import export 
2. 赋值 const { focused, list} = this.props
3. ajax 请求数据没到之前，先不要去遍历空数据,或者说list有数据才遍历
```

换一换分页的实现

1. 一次性请求完所有数据过来，自己分页

2. 通过接口 分页请求。


### 避免不必要的请求

>有些只需要请求一次的话，就不要请求第二次了



### 路由

> 