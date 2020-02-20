### redux应用

redux操作步骤

> ```
> // 专门为项目提供数据（现在的数据集中化的管理思想）// redux 操作步骤： 
> 1. 下载 redux 
> 2. 引包
> 	import {createStore,combineReducers} from 'redex'
> 3. 导出 createStore 
> 4. 调用函数得到 store(reducer)  可以使用导入方式分割代码reducer
> 4. store 提供三个API（1. getState 2. dispatch 3. subscribe）
> 5. 使用store 给需要使用的组件 传入 store={store}
> ```

1. 给cartlist使用 store

   ```
   <App store={store} />
   ```

2. cartlist使用

   ```
   this.props.store.getState()
   this.props.store.dispatch( ) //事件派发 {type:'XX',id:1} fn => return {}
   this.props.store.subscribe( ) //事件订阅
   事件派发的时候 怎么传值 合适？
   onClick = {()=>{ this.props.store.dispatch({type:"ADD",id:ele.id})  }}
   onClick = {sub(ele.id)}
   ```

3. 组件生命周期 事件订阅,事件卸载

4. 提取各部分文件

   ```
   index.js //负责给出接口 store
   cartReducer.js //负责处理数据
   actionTypes.js // 负责定义好 reducer 里面的action 的type类型
   action.js // 专门负责定义 action 
   ```

   ### 模块导出复习

   

   export 导出  不可以取名字。还需要结构赋值出来。

   ​	export {

   ​		a,

   ​		b

   }

   函数默认导出  默认导出可以自己取名字。

   export default {

   ​	fna,

   ​	fnb

   }

   ### 多个模块同一数据源(cumbineReducers)

   > // 借助 redux 里面提供的一个合并reducer的操作 **combineReducers**

   ```
   import { createStore, combineReducers} from 'redux'
   
   const rootReducer = combineReducers( {cartReducer , adReducer } )
   
   export default createStore(rootReducer)
   ```

   > // 现在的仓库的里面存在两个数据源 store.getState() 返回值的现在是一个对象 {cartReducer: [initState], adReducer: [initState]}

   ```
   故使用请更改 this.porps.store.getState().cartReducer
   ```

   

   

   ### 订阅事件  store.subscript( fn )

   ```
    componentWillMount() {
           //订阅事件
           this.unsubscribe = this.props.store.subscribe(() => {
               this.setState({
                   carlist: this.props.store.getState().cartReducer
               })
           })
       }
   ```

   

