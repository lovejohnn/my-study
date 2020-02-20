# Redux的使用          



**一、flux的缺陷**

 

因为dispatcher和Store可以有多个互相管理起来特别麻烦

 

**二、什么是redux**

 

其实redux就是Flux的一种进阶实现。它是一个应用数据流框架，主要作用应用状态的管理

 

设计思想：

(1)、web应用就是一个状态机，视图和状态一一对应

(2)、所有的状态保存在一个对象里面

 

三大原则：

(1)、单一数据源

整个store被储存在一个Object tree(对象树)中，并且这个Object tree只存在于唯一一个store中

(2)、state是只读的

唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象

 

(3)、使用纯函数来修改(reducer)

为了描述action如何改变state tree,你需要编写reducers

 

**三、redux适用的场景**

 

(1)、用户的使用方式复杂

(2)、不同身份的用户有不同的使用方式（比如普通用户和管理员）

(3)、多个用户之间可以协作

(4)、与服务器大量交互，或者使用了WebSocket

(5)、View要从多个来源获取数据

**当项目多交互、多数据源的时候必须用到redux**

 

从组件的角度来看什么时候用到redux

(1)、某个组件的状态，需要共享

(2)、某个状态需要在任何地方都可以拿到

(3)、一个组件需要改变全局状态

(4)、一个组件需要改变另一个组件的状态

 

**四、redux的工作流程**

​                     ![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181029220416051-179406485.png)

如果我们有一个组件，那么想要获取数据就需要从Store中获取数据，当组件需要改变Store数据的时候。需要**创建一个Action**,然后通过 **dispatch(action) 传递给Store**，然后Store把Action转发给Reducers. Reducers会拿到**previousState(以前的state数据) 和action**。然后将**previousState和action进行结合做新的数据(store)修改**。然后生成一个新的数据传递给Store 。Store发送改变那么View也会发生改变

 

 

**五、创建Store**

 

 

 

在Flux中Store是我们手动创建的，但是在redux中Store是redux提供的

 

(1)、安装 yarn add redux --dev

 

(2)、引入 import { createStore } from "redux";

 

(3)、创建一个store = createStore(reducer)

 

这样创建一个store我们没有办法进行存值，因此我们需要在createState中传递一个参数reducer这个参数就相当于Flux中的dispatcher遗留产物。这个遗留产物有一个规范就是内部必须是一个纯函数

 

(4)、创建reducer.js

![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181029220457146-1506376201.png)

这个函数里面有2个参数一个是state，另一个是action。

state指的是store中的数据

action指的是View修改数据的时候传递过来的action

 

这个函数必须返回一个新的数据，而且还不能对老的数据进行修改(Reducer函数中不能改变state，必须返回一个全新的对象)

 

我们可以先把这个state设置一个默认值defaultState。在defaultState这个对象中我们可以定义一些初始的数据

 

官方解释reducer:

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器

 

(5)、导出Store

 ![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181029220551639-522380455.png)

导出的store这个对象中默认自带了一些方法

(1)、dispatch：用来传递action

(2)、getState：返回值就相当于this.state中的数据,里面存放着公共的数据

(3)、replaceReducer：

(4)、subscribe：监听数据的改变，必须传递一个函数

(5)、Symbol(observable)：

 

**六、创建Action**

 

**七、将Action传递给store**  

 

方法：store.dispatch(action)

当调用完这个方法后action会自动传递给reducer,这也是我们为什么在reducer中定义参数action    的原因。在reducer中我们会对action中的type进行比较，如果比较成功则返回一个新的state

 

**八、监听数据的改变**

store.subscribe()

 

 

**九、如何将reducer拆分成多个reducers**

 

(1)、引入combineReducers

import { combineReducers, createStore } from "redux";

 

(2)、合并多个reducers

let reducer = combineReducers({ todoReducers, tabReducers })

 

(3)、创建store

let store = createStore(reducer)

 

栗子：

![img](https://img2018.cnblogs.com/blog/917454/201810/917454-20181029220609378-592085174.png)

 

 

注意：在使用state的时候要注意使用的谁的state

 

**十、纯函数的概念**

 

同样的输入必须得到同样的输出

 

约束：

不得修改参数

不能调用系统I/O的API

不能调用Date.now()或者Math.random()等不纯的方法，因为每次得到值是不一样的结果 

 

**十一、redux与flux的区别**

 

Redux没有Dispatcher,且不支持多个store，Redux只有一个单一的store和一个根级的reducer函数。随着应有的不断变大，根级的reducer要拆分成多个小的reducers，分别独立的操作state的不同部分，而不是添加新的 stores。这就像一个 React 应用只有一个根级的组件，这个根组件又由很多小组件构成