**一、Redux与组件**

 

react-redux是一个第三方插件使我们在react上更方便的来使用redux这个数据架构

 

React-Redux提供connect方法,用于从UI组件生成容器组件，connect的意思就是将两种组件连起来

 

参考文章：https://github.com/reduxjs/react-redux

 

**二、react-redux的基本用法**

(1)、引入

import {Provider} from "react-redux";

 

在根组件外层嵌套一个Provider.   **Provider的作用就是将store传递给每一个子组件，每一个子组件就都可以使用store了，不需要重复的在组件中引入store**

![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181030210800334-33819356.png)

(2)、connect进行连接

(1)、在子组件中引入connect

import { connect } from "react-redux";

 

 

(2)进行连接

export default connect(mapStateToProps)(组件名称)

 

 

connect()():

第一个括号里面有三个参数

第一个参数：mapStateToProps

解释：

mapStateToProps其实就是一个规则，把store里面的state映射到当前组件的 props中

 

 

第二个参数：mapDispatchToProps

解释：

(1)、mapDispatcherToProps 这个方法用来修改数据，这个方法中有一个参数为dispatch. 

(2)、如果说mapStateToProps是将store的数据拿到当前组件使用,那么mapDispatcherToProps就是提高了一些方法让你如果进行数据的修改(方法需要自己去写，依旧要把action返回给Store)，这个方法被映射的this.props中。dispatch是用来发送action的

第二个括号:需要传递组件名称

![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181030210842338-1973431797.png)

mapStateToProps这个函数的主要用途就是将state中的items数据映射到prop中的items中去，简单来说就是我们调用公共的数据store。但是**频繁的在组件中引入store操作过于麻烦，因此我们将当前list组件进行了一个数据连接，这个数据就是从store中的state映射到props中**

 

mapStateToProps

作用：

建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。

mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染

 

调用的时候this.props.【key值】

 

mapDispatchToProps

作用：

用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象

![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181030210904236-1576754694.png)

mapDispatchProps的用法

 

const mapDispatchProps = (dispatch)=>({

函数名称:function(){

dispatch(action)

}

})

mapDispatchProps函数需要返回出去一个函数 这个函数中用dispatch传递一个action

 

最终子组件变成了UI组件 connect返回最终的容器组件，react-redux建议我们把所有的数据都放在store中

 

调用：this.props.函数名称()

 

 ![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181030210923061-870108200.png)

 

# react-redux

**react-actions** 

import { createAtion, handleActionos }  from 'redux-actions'

createAtoin 创建 actoin handleActions 验证action

**react-redux 是赋值 redux 的。**

> 1.  Provider  减少store的引入, 当父组件引入 store 后，子组件就都有拥有 store 了(必须包裹所根组件), Provider 身上引入了 store后 其他组件都不需要了
> 2. connect 用来将组件与 store 进行相关联，以及将 UI层 和 逻辑层  进行拆分

不是单独使用的是配合 redux 使用的

1. 安装

