## react API

```
import React from 'react'
import ReactDom from 'react-dom'
let el=<h1><span>hello</span><span>wrold</span></h1>
console.log(el)
ReactDom.render(el,window.root);
```

1. 利用babel中的babel-preset-react进行转译，调用 `React.createElement(type,props,children)` 生成一个虚拟dom节点:

   ![babel-el](https://user-gold-cdn.xitu.io/2018/10/21/166952b2808e0b9b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

2. `React.createElement`原理简析:

```
function createElement(type,props,children){
    let obj={};
    obj.type=type;
    obj.props={};
    obj.props.children=null;
    for(let key in props){
        obj.props[key]=props[key]
    }
    children.forEach(child => {
        let {type,props,subchildren} = child
        obj.props.children.push(createElement(type,props,subchildren))
    })
    return obj
}

```



![el](https://user-gold-cdn.xitu.io/2018/10/21/1669523df58f4562?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

\3. `ReactDom.render(vnode,root)`会将其渲染出到页面root中:

![index.html](https://user-gold-cdn.xitu.io/2018/10/21/1669531b6d4d143a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

\4. ReactDom.render原理简析：



```
function render(vnode,container){
    if(typeof vnode ==='string') return container.appendChild(document.createTextNode(vnode));
    let{type,props} = vnode;
    let tag = document.createElement(type);
    for(let key in props){
        if(key==='children'){
            Array.from(props[key]).forEach(child => {
                render(child,tag)
            });
        }else{
            tag.setAttribute(key,props[key]);
        }
        
    }
    container.appendChild(tag);
}
复制代码
```

## react组件

### 函数声明组件

1. 函数式声明组件:函数返回一个JSX语法的vnode

```
import React from 'react'
import ReactDom from 'react-dom'
function test(){
    let state = {
        title:'标题',
        context:'内容'
    }
    return (
    <div>
        <h3>{state.title}</h3>
        <p>{state.context}</p>
    </div>
    )
}
ReactDom.render(
<div>
{test()}
{test()}
{test()}    
</div>,window.root);
复制代码
```

1. 将上面的函数声明组件进行一定的包装

```
import React from 'react'
import ReactDom from 'react-dom'
function Test(props){
    let state={
        title:"标题"
    }
    return (
    <div>
        <h3>{state.title}</h3>
        <p>{props.context}</p>
    </div>
    )
}
ReactDom.render(
<div>
<Test context='123'></Test>
<Test context='456'></Test>
<Test context='789'></Test>      
</div>,window.root);
复制代码
```

函数声明组件存在一些问题:

1. 没有this
2. 没有状态，state无法进行动态更改
3. 没有生命周期

### 类组件

类组件消除了函数声明组件的问题，也是现在写react的正常语法。

```
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import PropTypes from 'prop-types'; //属性校验插件

class Clock extends Component {
  state = {
    time: new Date().toLocaleString()
  }
  static propTypes = { 
    name: PropTypes.string.isRequired   //name必填，校验是否填写name属性
  }
   // 组件挂载后调用
  componentDidMount() {
    this.timer = setInterval(() => {
      // 只会覆盖以前的属性类似 Object.assign()
      this.setState({ time: new Date().toLocaleString() })    
    }, 1000)
  }
  
  handleClick = () => { //箭头函数，this用最外层的this，指向当前组件
    ReactDOM.unmountComponentAtNode(window.root)
  }
  
  // 组件卸载前调用，一般用于解绑事件和方法
  componentWillUnmount() { 
    clearInterval(this.timer)
  }
  
  // 默认渲染这个组件会调用render方法
  // 只是在上面函数式声明基础上包了一层函数，这样可以控制其执行时间，添加声明周期
  render() { 
    let {name} = this.props     //一般会解构props
    return <div>
      {name} <span>{this.state.time}</span>
      <button onClick={this.handleClick}>删除</button>
    </div>
  }
}
render(<Clock name='test-clock'/>, window.root);
复制代码
```

## react 生命周期

```
// React16.3 推出了新的声明周期 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
  static defaultProps = { 
    a: 1
  }
  state = {
    num: 0
  }
  constructor(props) {
    console.log('parent-constructor')
    super();
  }

  // react16.3中标识了这个方法会被废弃掉
  // 后期有需要的话 可以放在constructor中替代掉 
  componentWillMount() { 
    console.log('parent-componentWillMount');
  }

  // react的性能优化 immutablejs
  shouldComponentUpdate(){ 
    console.log('parent-shouldComponentUpdate');
    return true
  }
  componentWillReceiveProps(){ 
    console.log('parent-componentWillReceiveProps');
  }
  componentWillUpdate(){
    console.log('parent-componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('parent-componentDidUpdate');
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 0 });
  }
  render() {
    console.log('parent-render');
    return <div>
      <button onClick={this.handleClick}>+</button> 
      {this.state.num}
      <ChildCounter n={this.state.num}></ChildCounter>
      </div>
  }
  componentDidMount() {
    console.log('parent-didmount');
  }
  componentWillUnmount() {
    console.log('parent-组件卸载')
  }
}
class ChildCounter extends Component{
  componentWillMount(){
    console.log('child-componentWillMount')
  }
  render(){
    console.log('child-render');
    return <div>child counter {this.props.n}</div>
  }
  componentDidMount() {
    console.log('child-componentDidMount')
  }
  shouldComponentUpdate(){ 
    console.log('child-shouldComponentUpdate');
    return true
  }
  componentWillUpdate(){
    console.log('child-componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('child-componentDidUpdate');
  }
  
  //16.3中这个方法废弃了
  componentWillReceiveProps(){ 
    console.log('child-componentWillReceiveProps');
  }
}
ReactDOM.render(<Counter></Counter>, window.root);
复制代码
```

- 初次渲染时打印的结果为:

  ![ddd](../img/1.png)

- 组件状态更新时打印的结果为:

  ![](C:\Users\VULCAN\Desktop\my-github\react\react-基础\img\2.png)

  

  从上面可以得出以下结论：

1. 生命周期分为初始化生命周期和组件运行生命周期，初始化生命周期为：constructor->componentWillMount->render->componentDidMount
2. 组件运行生命周期为：(存在props时:componentWillReceiveProps)->shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate
3. 子组件的生命周期嵌在父组件render后，DidMount和DidUpdate前
4. shouldComponentUpdate返回false，组件将不会更新
5. 只有componentWillReceiveProps、componentWillMount、componentDidMount中可以调用setState,不应该在componentWillReceiveProps中调用setState(但是大家还是这么用)

## 受控组件和非受控组件

- 非受控组件：ref操作dom，很方便；可以和一些地三方库结合使用

```
import React,{Component} from 'react';
import {render} from 'react-dom';

class UnControl extends Component{
  b = React.createRef();  // 16.3的api React.createRef()
  handleClick = () =>{
    alert(this.a.value);    // 写法1
    alert(this.b.current.value)     // 写法2
  }
  render(){
    return (<div>
      <input type="text" id="username" ref={dom=>this.a=dom}/>
      <input type="text" id="password" ref={this.b}/>
      <button onClick={this.handleClick}>点击</button>
    </div>)
  }
}
render(<UnControl></UnControl>,window.root);
复制代码
```

- 受控组件：利用e.target和setState来修改状态并控制dom

```
import React from 'react';
import ReactDOM from 'react-dom';

class Control extends React.Component{
  state = {
    a:'hello',
    b:'world'
  }
  changeHandler = (e)=>{
    let val = e.target.name
    this.setState({
      [val]:e.target.value
    })
  }
  render(){
    return (
      <div>
        {this.state.a}
        {this.state.b}
        <input type="text" name="a" value={this.state.a} onChange={this.changeHandler}/>
        <input type="text" name="b" value={this.state.b} onChange={this.changeHandler}/>
      </div>
    )
  }
} 
ReactDOM.render(<Control></Control>,window.root);

复制代码
```

## react数据传递

- 逐级传递：当组件嵌套的层级不超过3层时，使用这种方式传递数据简单，但是嵌套过深时，会很难管理的问题

```
//index.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Second1 from './Second1';
import Second from './Second';
class App extends Component {
  state = {
    count:0
  }
  handleCountChange = (num)=>{
    this.setState({count:num})
  }
  render(){
    return(
      <div>
      <Second count={this.state.count}></Second>
      <Second1 count={this.state.count} countChange={this.handleCountChange}></Second1>
      </div>
    )
  }
}
ReactDOM.render(<App></App>, window.root);
复制代码
//second.js
import React, { Component } from 'react'
export default class Second extends Component {
  render() {
    let {count} = this.props
    return (
      <div>{count}</div>
    )
  }
}
复制代码
//second1.js
import React, { Component } from 'react'
import Third from './Third';
export default class Second1 extends Component {
  render() {
    let {count,countChange} = this.props
    return (
      <Third num={count} numChange={countChange}></Third>
    )
  }
}
复制代码
//third.js
import React, { Component } from 'react';

export default  class Third extends Component {
  handleClick =()=>{
    console.log(this.props.num+1);  
    this.props.numChange(this.props.num+1);
  }
  render(){
    return (
        <span onClick={this.handleClick}>+</span>
    )
  }
}
复制代码
```

- 采用context

```
import React, { Component } from 'react';
import {Provider} from './context';
import ReactDOM from 'react-dom';
import Second1 from './Second1';
import Second from './Second';
class App extends Component {
  state = {
    count:0
  }
  handleCountChange = (num)=>{
    this.setState({count:num})
  }
  render(){
    return(
      // 提供一个contex，上面挂载了全局状态
      <Provider value={{numChange:this.handleCountChange,num:this.state.count}}>
      <Second></Second>
      <Second1></Second1>
      </Provider>
    )
  }
}
ReactDOM.render(<App></App>, window.root);
复制代码
// context.js
import React from 'react';
let { Provider, Consumer } = React.createContext(); //react提供的API
export {Provider,Consumer}
复制代码
// second.js
import React, { Component } from 'react';
import {Consumer} from './context';
export default class Second extends Component {
  render() {
    return (
      <Consumer>
        {(value)=>{
          return <div>{value.num}</div>
        }}
      </Consumer>
    )
  }
}
复制代码
// second1.js
import React, { Component } from 'react'
import Third from './Third';
export default class Second1 extends Component {
  render() {
    return (
      <Third></Third>
    )
  }
}
复制代码
//third.js
import React, { Component } from 'react';
import {Consumer} from './context';
export default  class Third extends Component {
  render(){
    return (<Consumer>
      {(value)=>{   //固定语法value就是Provider中的value
        return <span onClick={()=>{value.numChange(value.num + 1)}}>+</span>
      }}
      </Consumer>)
  }
}
```


