flux的基本使用

1. 建立好store

```
const store = {
	//公共的状态
	state:{
		n:10
	},
	//获取state对象
	getState(){
		return this.state;
	}
}
export defualt store
```

2. 展示state

   ```
   import store from 'store.js'
   this.state = store.getState()
   ```

3. 操作 数据

```
1. 给出一个动作 action
2. 这个动作需要给 fispatcher 发送
操作数据的话，需要使用 flux 的 dipatch 进行

```

