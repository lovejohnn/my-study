## 使用antd+redux实现todolist

1. 安装

   ```
   yarn add antd
   ```

2. 样式设置

   ```
   修改 src/App.css，在文件顶部引入 @import '~antd/dist/antd.css';
   ```

3. 高级配置 自定义配置

   ```
    yarn add react-app-rewired customize-cra
   ```

   /* package.json */

   ```
   "scripts": {
   -   "start": "react-scripts start",
   +   "start": "react-app-rewired start",
   -   "build": "react-scripts build",
   +   "build": "react-app-rewired build",
   -   "test": "react-scripts test",
   +   "test": "react-app-rewired test",
   }
   ```

   然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

   ```
   module.exports = function override(config, env) {
     // do stuff with the webpack config...
     return config;
   };
   ```

   ## 专业术语

   store  管理员

   store.dispatch

   store.subscribe

   action

   createStore

   ## 开始redux

   1. 安装

      ```
      yarn add redux
      ```

   2. 

   ## redux插件安装

   ActionTypes的拆分 把变量拆分处理.

   actionCreators.js  拆分 action

   ```
   export const getInputChangeAction = (value)=>{
   	type : CHANE_INPUT_VALUE,
   	value
   }
   handelInputChange(e){
       const action = getINputChangeAction(e.target.value)
       store.dispatch(action);
   }
   ```

   纯函数 给定固定的输入，就一定会有固定的输出，而且不会有任何副作用

   1.ajax    2.异步   3.时间相关的操作 都不算 纯函数

   ## Redux 中发送异步请求  获取数据

   ```
   cdm - axios.get(....)
   怎么发请求 axios fetch josnp
   ```
```
   
1. 怎么模拟数据 ? mac-> 
   1. jsonplacehodler
      2. mock.js
      3. rap2
   
   2. 获取到了 axios请求到的数据后怎么放到 store 中?
   
```
   const action = initFn(res)
      sotre.dispatch(action);
   reducer 代理数据 
      store 修改数据



**Redex-thunk的使用**

1. 配置

  ```
store/index.js
import { createStore, applyMiddleware } from 'redux' //创建图书馆
import reducer from './reducer' //引入笔记本
import thunk from 'redux-thunk'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default store
  ```



   使用Redux-thunk 后 action中可以使用异步的代码了

   使用了 redux-thunk 后，我们的 action 返回值 可以为函数了，

```
store/actionCreator.js
export const initfn = (data)=>{
    return{
        type:INITVALUE,
        data
    }
}
export const gettodolist =()=> {//使用 react-thunk 就可以返回一个函数了  
    return (dispatch)=>{  //且可以传递 dispatch使用
        axios({
            url:'http://localhost:3002/data'
        }).then(res=>{
            let resdata = res.data;
            const action =  initfn(resdata);
            dispatch(action);  //发起 dispatch
        })
    }
}
```



 只要在 生命周期函数中,使用自定的函数

```
todolist.js
componentDidmount(){
   	const action = getTodoList();
   	store.dispatch(action)  //这里为函数时时， 会自动执行
}
```



**reducer.js的处理**

```
export default (state=defaltState, action) =>{

    const newState = JSON.parse(JSON.stringify(state)); //使用深拷贝
    //input 输入实时改变
    if(action.type=== CHANGE_INPUT_VALUE ){
        //拿出state 的 深拷贝
        newState.inputValue = action.value;
        return newState;
    }
}
```

什么是redux中间件？ 

>  就是 dispatch 的封装,判断传入的参数的类型做不同的命令
>
> 1. 函数 在dispatch中执行 2.对象 派发给 store

action 中写函数

```
redux 中间件 在谁和谁之间？ action 和 store之间
1. view 会派发一个 action 
2. action 通过 store 的 dispatch 派发给 store
3. store 接收到 action 连同之前的state 传给 reducer
4. reducer 处理后 返回一个新的数据 给store
5. store 去改变自己的 state
6. store.subscribe()监听  store中数据改变了，store.subscribe()执行。
6. state 改变 view 视图更新 为什么更新后能改变
```

redux-logger 记录日志

redux-saga 解决react异步问题：单独的把异步逻辑拆分出来放到一个文件中去

redux-thunk 解决react异步问题:把异步操作放到action中操作



**redux-sage 中间件的使用**  主要是通过 reducer以外的方式获得 action

**//配置saga中间件**

```

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'  //1

import reducer from './reducers'
import mySaga from './sagas'  //自定义的mysaga文件  //4

// create the saga middleware  //创建 saga 中间件
const sagaMiddleware = createSagaMiddleware()  //2

// mount it on the Store  //挂载到 Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)  //3
)

// then run the saga   //执行 run saga  //运行generator函数他要求我们写yield 
sagaMiddleware.run(mySaga)  //5

// render the application
export default store
```

**//配置 mysaga.js**  也能接受到action了  常用api takeEvery  takeLatest put call 

```
import {takeEvery, put} from 'redux-saga/effects' //提供的一个方法
import {GET_INIT_LIST} from './actionTypes'
import {initListAction} from './actionCreators'

function* getInitList(){
	try{
		let url = ' url:'http://localhost:3002/data'
        const res = yidld axios.get(url);
        const action = initListAction(res.data)
		yield put(action)
	}catch(e){
		console.log('网络请求失败')
	}
	
	console.log('GET_INIT_LIST执行了')//异步逻辑就可以写到这里了
	//generator中就不要使用promise这种形式了
	axios({
            url:'http://localhost:3002/data'
        }).then(res=>{
            let resdata = res.data;
            const action =  initfn(resdata);
           put(action)
        })
}

function* mySaga() {     必须要求是generator函数
 	// yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
 	yield takeLatest("GET_INIT_LIST", getInitList);
 	//takeLatest去捕捉每个 '类型的'
 	//捕捉到 这个类型，执行后面的函数 fetchUser,建议 fetchUser写 generator形式
 	put(action)
}

export default mySaga;
```

**//todolist.js**

```
const action = ()=>{
	return {
		type:GET_INIT_LIST
	}
}
store.dispatch(action)
```

