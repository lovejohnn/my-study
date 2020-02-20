### redux的使用

> 三大特性
>
> 1. 单一的数据源
> 2. state是只读的不允许修改
> 3. 必须返回一个纯函数

1. 安装,引入

   ```
   yarn add redux
   import Redux from 'redux'
   ```

2. 按需导入可能会更好

   ```
   import { createStore } from 'redux'
   ```

   

1. Store数据展示到Component中？

   store.getState

2. 

1. 通知发送一个axtion 通知store管理员 -reduceers修改数据。给出两个值，返回一个新值state.store收到一个新值，就可以展示了。

   ### 请求数据到Compoennt中

   1. 建立好仓库store   初始化数据 以及 reducer

      ```
      /store/index.js
      //1. 引入
      import {createStore} from 'redux'
      //1. 经过reducer 传入 store数据
      import reducer from './reducer'
      //创建一个数据库
      const store = createStore( reducer );
      
      
      ////数据写哪啊？ createStore 必须要接收一个 reducre 这个 reducre 必须是一个纯函数, 数据就放在reducre中。
      
      export default store;
      
      
      /store/reducer.js
      //默认值store
      const defaultState = {
          n:10
      }
      
      //reducer  从store给出store 和 action
      export default (state=defaultState, action)=>{
      //如果你没给我就用我的默认值，给了就用给了的，且只可读不可修改
          console.log('action',action); //第一次log的话可能是默认值哦
          //修改 在 reducer中
          switch(action.type){
              case "NUM_ADD":
                  //怎么拿数据？因为不能改，我们可以这样
                  let NUMState= {...state};
                  NUMState.n++;
                  return NUMState; //返回一个新的state,给了store,store下次运行就给了view
          }
          return state;//必须要返回一个值。这个值是给 store
      }
      ```

      

   2. 初始化渲染

      ```
      import store from './store/idnex.js'  //导入store方式使用 2.还有使用this.props.store方式
      
      this.state = store.getState(); //数据渲染
      ```

   3. 事件dispatch事件派发

      ```
      handleClick(){
      	let action = {   //action
      		type:"NUM_ADD"
      	}
      	store.dispatch(action) // 事件订阅
      }
      ```

   4. reducer 处理

      ```
      export default (state=defaultState, action)=>{ //action做了封装为全局的默认值
          //修改 在 reducer中
          switch(action.type){  
              case "NUM_ADD":
                  //怎么拿数据？因为不能改，我们可以这样
                  let NUMState= {...state};
                  NUMState.n++;
                  return NUMState; //返回一个新的state,给了store,store下次运行就给了view
          }
          return state;//必须要返回一个值。这个值是给 store
      }
      ```

   5. 事件订阅   view更新

      ```
      构造函数中
      store.subscribe(this.handlefn)  //事件订阅那肯定是订阅一个事件了。
      handlefn(){
      	this.setState( store.getState() );
      }
      ```

      在其他地方使用呢？

      > ActionTypes 



