# 移动App第3天

## ReactJS简介
+ React 起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，**就在2013年5月开源了**。
+ 由于 React 的设计思想极其独特，属于革命性创新，性能出众，代码逻辑却非常简单。所以，越来越多的人开始关注和使用，认为它可能是将来 Web 开发的主流工具。
+ library 类库
+ Framework 框架
+ interfaces 接口  用户界面


## 前端三大主流框架
+ Angular.js：出来最早的前端框架，学习曲线比较陡，NG1学起来比较麻烦，NG2开始，进行了一系列的改革，也开始启用组件化了；在NG中，也支持使用TS（TypeScript超集,强类型校验）进行编程；
+ Vue.js：最火的一门前端框架，它是中国人开发的，对我我们来说，文档要友好一些；2015年诞生咯
+ React.js：最流行的一门框架，因为它的设计很优秀；() 2013年开源了
+ windowsPhone 7    7.5   8   10 微软


## React与vue.js的对比
### 组件化方面
1. 什么是模块化：从 **代码** 的角度，去分析问题，把我们编程时候的业务逻辑，分割到不同的模块中来进行开发，这样能够**方便代码的重用**；
2. 什么是组件化：从 **UI** 的角度，去分析问题，把一个页面，拆分为一些互不相干的小组件，随着我们项目的开发，我们手里的组件会越来越多，最后，我们如果要实现一个页面，可能直接把现有的组件拿过来进行拼接，就能快速得到一个完整的页面， 这样方**便了UI元素的重用**；**组件是元素的集合体**；
3. 组件化的好处：
4. Vue是如何实现组件化的：.vue 组件模板文件，浏览器不识别这样的.vue文件，所以，在运行前，会把 .vue 预先编译成真正的组件；
 + template： UI结构
 + script： 业务逻辑和数据
 + style： UI的样式
5. React如何实现组件化：在React中实现组件化的时候，根本没有 像 .vue 这样的模板文件，而是，直接使用JS代码的形式，去创建任何你想要的组件；
 + React中的组件，都是直接在 js 文件中定义的；
 + React的组件，并没有把一个组件 拆分为 三部分（结构、样式、业务逻辑），而是全部使用JS来实现一个组件的；（也就是说：结构、样式、业务逻辑是混合在JS里面一起编写出来的）

### 开发团队方面
+ React是由FaceBook前端官方团队进行维护和更新的；因此，React的维护开发团队，技术实力比较雄厚；
+ Vue：第一版，主要是有作者 尤雨溪 专门进行维护的，当 Vue更新到 2.x 版本后，也有了一个小团队进行相关的维护和开发；

### 社区方面
+ 在社区方面，React由于诞生的较早，所以社区比较强大，一些常见的问题、坑、最优解决方案，文档、博客在社区中都是可以很方便就能找到的；
+ Vue是近两年才诞生开源出来的，所以，它的社区相对于React来说，要小巧一些，所以，可能有的一些坑，没人踩过；

### 移动APP开发体验方面
+ Vue，结合 Weex 这门技术，提供了 迁移到 移动端App开发的体验（Weex，目前只是一个 小的玩具， 并没有很成功的 大案例；）
+ React，结合 ReactNative，也提供了无缝迁移到 移动App的开发体验（RN用的最多，也是最火最流行的）；



## 为什么要学习React
1. 设计很优秀，是基于组件化的，方便我们UI代码的重用；
2. 开发团队实力强悍，不必担心短更的情况；
3. 社区强大，很多问题都能找到对应的解决方案；
4. 提供了无缝转到 ReactNative 上的开发体验，让我们技术能力得到了拓展；增强了我们的核心竞争力



## React中几个核心的概念
### 虚拟DOM（Virtual Document Object Model）
 + DOM的**本质**是什么：就是用 JS 表示的UI元素（ 浏览器中的js提供 ）
 + DOM和虚拟DOM的区别：
   - DOM是由浏览器中的JS提供功能，所以我们只能人为的使用 浏览器提供的固定的API来操作DOM对象；
   - 虚拟DOM：并不是由浏览器提供的，而是我们程序员手动模拟实现的，类似于浏览器中的DOM，但是有着本质的区别；
 - 为什么要实现虚拟DOM：
 - 什么是React中的虚拟DOM：
 - 虚拟DOM的目的：
![虚拟DOM - 表格排序案例](images/虚拟DOM引入图片.png)

### Diff算法
 - tree diff:新旧DOM树，逐层对比的方式，就叫做 tree diff,每当我们从前到后，把所有层的节点对比完后，必然能够找到那些 需要被更新的元素；
 - component diff：在对比每一层的时候，组件之间的对比，叫做 component diff;当对比组件的时候，如果两个组件的类型相同，则暂时认为这个组件不需要被更新，如果组件的类型不同，则立即将旧组件移除，新建一个组件，替换到被移除的位置；
 - element diff:在组件中，每个元素之间也要进行对比，那么，元素级别的对比，叫做 element diff；
 - key：key这个属性，可以把 页面上的 DOM节点 和 虚拟DOM中的对象，做一层关联关系；
![Diff算法图](images/Diff.png)

## React项目的创建

## Create React App

```
npx create-react-app my-app
```

1. 运行 `cnpm i react react-dom -S` 安装包
2. 在项目中导入两个相关的包：
```
// 1. 在 React 学习中，需要安装 两个包 react  react-dom
// 1.1 react 这个包，是专门用来创建React组件、组件生命周期等这些东西的；
// 1.2 react-dom 里面主要封装了和 DOM 操作相关的包，比如，要把 组件渲染到页面上
// react-cli 安装的react-script 为命令行所需的
import React from 'react'
import ReactDOM from 'react-dom'
```
3. 使用JS的创建虚拟DOM节点：

   **使用 React 提供的JS API来创建 DOM元素**
```
    // 2. 在 react 中，如要要创建 DOM 元素了，只能使用 React 提供的 JS API 来创建，不能【直接】像 Vue 中那样，手写 HTML 元素
    // React.createElement() 方法，用于创建 虚拟DOM 对象，它接收 3个及以上的参数
    // 参数1： 是个字符串类型的参数，表示要创建的元素类型
    // 参数2： 是一个属性对象，表示 创建的这个元素上，有哪些属性
    // 参数3： 从第三个参数的位置开始，后面可以放好多的虚拟DOM对象，这写参数，表示当前元素的子节点
    // <div title="this is a div" id="mydiv">这是一个div</div>

    var myH1 = React.createElement('h1', null, '这是一个大大的H1')

    var myDiv = React.createElement('div', { title: 'this is a div', id: 'mydiv' }, '这是一个div', myH1)
```
4. 使用 ReactDOM 把元素渲染到页面指定的容器中：
```
    // ReactDOM.render('要渲染的虚拟DOM元素', '要渲染到页面上的哪个位置中')
    // 注意： ReactDOM.render() 方法的第二个参数，和vue不一样，不接受 "#app" 这样的字符串，而是需要传递一个 原生的 DOM 对象
    ReactDOM.render(myDiv, document.getElementById('app'))
```

## JSX语法-依赖 babel-preset-react

0. 脚手架里面是 bable-preset-react-app  jsx javascript xml 允许js中写html代码

1. 如要要使用 JSX 语法，必须先运行 `cnpm i babel-preset-react -D`，然后再 `.babelrc` 中添加 语法配置；

2. JSX语法的本质：还是以 React.createElement 的形式来实现的，并没有直接把 用户写的 HTML代码，渲染到页面上；

3. 如果要在 JSX 语法内部，书写 JS 代码了，那么，所有的JS代码，必须写到 {} 内部；

4. 当 编译引擎，在编译JSX代码的时候，如果遇到了`<`那么就把它当作 HTML代码去编译，如果遇到了 `{}` 就把 花括号内部的代码当作 普通JS代码去编译；

5. 在{}内部，可以写任何符合JS规范的代码；

6. 在JSX中，如果要为元素添加`class`属性了，那么，必须写成`className`，因为 `class`在ES6中是一个关键字；和`class`类似，label标签的 `for` 属性需要替换为 `htmlFor`.

7. 在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；

8. 如果要写注释了，注释必须放到 {} 内部

   ```
   {
   	//我是一个注释
   }
   ```

   

9. 循环输出数组的值？

   ```
   var arr = [];
   for(var i=0;i<10;i++){
   	var mydiv = <div>
   		我是一个div哦
   	</div>
   	arr.push( mydiv )
   }
   { arr }
   ```

   使用map输出

   ```
    {/* index.js:1375 Warning: Each child in a list should have a unique "key" prop. 
    主要的原因是 react 底层需要做 DOM diff 算法，需要做唯一性的比较 */}
    <ul>
	{ 
   		this.state.arr.map( (ele, index) => {
    			return (
   				<li key={index}> {ele} </li>
   		   )
   		})
   	}
   </ul>
   ```
   
   
   
   ```
   注意：哪怕你再js中科院写JSX语法了，但是JSX在内部运行的时候，也是先把类似HTML这样的标签代码，转换为了React.createElement的形式
   也就是所，哪怕我们写了JSX这样的标签，也并不是直接把我们的HTML标签渲染到页面上，而是先转换成了React.createElement这样的代码，在渲染到页面中，JSX 是一个队程序员友好的语法糖
   ```
   
   



## React中：第一种创建组件的方式

## 第一种基本组件的创建方式

+ 在  React 中，构造函数，就是一个最基本的组件

+ 如果想要把组件放到页面中，可以把构造函数的名称，当做 组件的的名称，以HTML标签形式映入页面即可

+ 注意，React在解析所有的 标签的时候，是以标签的首字母来区分的，如果标签的首字母是小写则按普通的HTML来解析，如果 首字母 是大写的，则按照 组件的形式去解析

+ 结论：组件的首字母必须是大写

  ```
  function Hello(){
  	return <div>
  		<h1>这是在Hello组件中定义的元素</h1>
  	</div>
  }
  //如果你什么都不想渲染，则return null 
  //在组件中必须要 return 值
  ```

  

### 父组件向子组件传递数据

```
var name = 'zs';
var age = 20;
var Person = {
	username = 'zs',
	address = 'cs'
}
function Hello( props ){
	console.log( name ) //也是可以的
	return <div>
		<h1> 1. 使用变量传数据 { name } </h1>
		<h1> 2. 使用对象传数据 { name } </h1>
		<h1> 3. 使用es6传数据要定义形参props ,且通过props传递的为只读的，不能重新赋值{ props.username }{ props.address } </h1>
	</div>
}
1. <Hello name={ name }></Hello>
2. <Hello name={ Person.name }></Hello>
3. 快速方法: <Hello {...Person} ></Hello>
//这里的...Obj 语法，是ES6中属性扩散，表示把这个对象上的所有属性
```



### 属性扩散

> 见上列子


### 将组件封装到单独的文件中

src/components/Hello.js

```
import React from 'raect'  //组件依赖React

function Hello( props ){

	return <div>
		<h1> 3. 使用es6传数据要定义形参props ,且通过props传递的为只读的，不能重新赋值{ props.username }{ props.address } </h1>
	</div>
}
export default Hello

//解决 在这个js文件中不好写 HTML 代码 
1. 把文件名改为 jsx
2. 注意在webpack.config.js中配置好解析 jsx 和 js的
```

index.js入口文件

```
import Hello from './src/components/Hello.js'
```



## React中：第二种创建组件的方式
### 了解ES6中class关键字的使用

```
class person {
	constructor(name, age){ //构造器
		this.name = name  //实例出来的对象上的属性
		this.age = age
	}
	say = ()=>{  //原型方法  //实例出来的对象上的方法
		console.log(this.name)
	}
	static info = 111; //静态属性 挂载到构造函数身上的
	static sayHello(){ //静态方法
		console.log('22222')
	}
} 
//继承 使用 extends 实现继承 前面的是子类，后面的是父类
//还需要配合 super()
class Chinese extends Person {
	constructor(color, language, name, age){
		this.color = color
		this.language = language
		super( name, age)//注意：当使用 extends 关键字实现了继承，子类的 constructor 构造函数中必须调用 super() 方法，这个 super 表示到了父类中的 constructor 
	}
}
new chinese('yellow', '汉语'， '张三',22)
//父类中的所有属性都能继承到。
静态属性,或方法  的话需要使用 子类构造函数 调用
chinise.父类静态属性
chinise.父类静态方法
```

> 真正的面向对象语言 三部分 继承 封装 多态
>
> 多态 和 接口·虚拟方法有关 定义一个DOM类，有其属性，不能定义方法
>
> class Animal {
>
> ​		say( ){
>
> ​	}
>
> }
>
> //当子类继承了父类之后，必然要继承父类中的方法，但是发现say方法空有其壳，如果子类想要调用say 必须自己先实现这个方法。才能调用。不同的实现
>
> class Cat extends Animal {
>
> ​	say(){
>
> ​	console.log( '喵喵')
>
> }
>
> }


### 基于class关键字创建组件
+ 使用 class 关键字来创建组件,通过extends 关键字继承了 React.components,这个类就是一个组件的模板了，引用：把类的名称以标签的形式,导入到 JSX中使用
```
import React form 'react'
//可简写React.Component  更换导入 import React,{ Component } from 'react'

class Person extends React.Component{
    // 通过报错提示得知：在class创建的组件中，必须定义一个render函数
    render(){
        // 在render函数中，必须返回一个null或者符合规范的虚拟DOM元素
        return <div>
            <h1>这是用 class 关键字创建的组件！{this.props.address}</h1>
        </div>;
    }
}
ReactDOM.render(
<div>
	<Person address = '就是一个字'></Person>
</div> ,
document.getElementById('app')
)
```

> 1. 在class定义的组件中，可以直接使用this.props访问属性,在function 定义的组件必须声明参数props
> 2. 虽然在React dev tools 中，没有显示的说class组件中props是只读的。但测试是不能读写的
> 3. class定义的组件有constructor(props) 在 constructor中必须要调用 super(props) 操作 this.props的话。都要声明形参

## 类组件的状态

```
    // 构造函数：特点：当类被实例化的时候，构造函数自己执行。注意：如果我们的类有继承操作，则必须先调用一下 super 
    // 在类组件里面我们可以手工的使用 props 方法传递属性
    constructor(props){
        super(props); // es6 语法规定的
        // 在构造函数内部定义属性 构造函数内部定义，方法不再这里定义。方法在外部顶部
        // 注意：有状态的组件的属性的名称必须是 state ，并且值必须是对象
        console.log(props);
        
        this.state = {
            mytitle : '类组件的状态数据-标题',
            arr: [12, 23, 34],
            myStyle: {color: 'red', fontSize: '30px'},
        }; 
    }
```



## 两种创建组件方式的对比

1. 用构造函数创建出来的组件：专业的名字叫做“无状态组件”
2. 用class关键字创建出来的组件：专业的名字叫做“有状态组件”

> 用构造函数创建出来的组件，和用class创建出来的组件，这两种不同的组件之间的**本质区别就是**：有无state属性！！！
> 有状态组件和无状态组件之间的本质区别就是：有无state属性！

## 一个小案例，巩固有状态组件和无状态组件的使用
### 通过for循环生成多个组件
1. 数据：
```
CommentList = [
    { user: '张三', content: '哈哈，沙发' },
    { user: '张三2', content: '哈哈，板凳' },
    { user: '张三3', content: '哈哈，凉席' },
    { user: '张三4', content: '哈哈，砖头' },
    { user: '张三5', content: '哈哈，楼下山炮' }
]
```

### style样式

>  可以直接在类组件里面导入css文件。（脚手架的底层会给解决 css依赖）
> import '../css/mystyle.css'
> 使用第三方的 css库
> 第三库不需要写路径（./ ../） 自己去 node_modules 目录下查找同名的包
> import 'bootstrap/dist/css/bootstrap.css';
>
> 注意属性名xx-xx 需要转换为 驼峰名 xxXx
>
> 1. 行内样式 style
>
>    > 注意class类名 class => className  for => htmlFor
>    >
>    >  在组件内部如果要写行内的样式，不能直接写引号方式，必须写一个 对象
>    >
>    > 1. 代表解析js    2. 代表配置对象
>    >
>    > ```
>    > style = {{color: 'red', fontSize: '30px'} } 
>    > ```
>    >
>    > ```
>    > <p style={ this.state.myStyle }>{this.props.id}</p>
>    > ```
>
> 2. class 类名
>
>    > className={{ }}  对象 className='myname'
>
> 3. 外部样式文件
>
>    > 在 index.js入口文件中 import 'some.css'

## 事件 以及 this 指向问题 解决 箭头函数  bind绑定

> 1. 只支持原生的写法 行内
> 2. react 里面的事件的名称的首字母必须大写  onclick -> onClick
> 3. 事件的回调必须是一个函数 ，提供一个js 语境{ }
> 4.  回调函数必须是一个函数，而不是一个函数调用 
> 5. 函数里的evnet对象已经封装好了 函数申明写好参数(event)即可使用
>
> //  react 内部已经把 this 屏蔽了，主要是由于this指向可能不正确。如果我们确实需要使用到this，则我们需要手工的处理。 1. 箭头函数 this肯定确定的  2. bind手动绑定

```
// 相当于 全局定义一个函数
console.log(this) //undefined  
//类外部的回调函数不需要写成 箭头函数 手工的绑定this 当前的组件对象写了也没用，绑定的weindow

function fn(event) {
    console.log('this指向问题', this);// 组件对象
}

类 > return > render > 内部的组件的按钮
<button  onClick={ fn }>删除</button> 	//this->undefined
<button  onClick={ fn.bind(this) }>删除</button>	//this->组件对象

```

```
//类 内部的原型方法
    fnClass1 (event){
        console.log('this指向问题', this);
        console.log('组件的状态', this.state);
    }
    fnClass2 = (event) => {
        console.log('this指向问题', this);
        console.log('组件的状态', this.state);
    }
 类 > return > render > 内部的组件的按钮   
<button onClick={ this.fnClass1 }>确定</button>	//this->undefined
<button onClick={ this.fnClass1.bind(this) }>确定</button>   //this -> 组件对象

<button onClick={ this.fnClass2 }>确定</button>	//方法改成箭头函数可以改变this 指向为 组件对象
```

### 解决字符转义的问题

> //一般是一个分页字符串，实际肯定前端调用接口返回一个分页字符串
> var pageString = '<ul><li><a href="#">1</a></li><li><a href="#">2</a></li></ul>'; 
>
> // react 里面认为 数据默认是不安全，存在隐患，可能产生 xss 攻击，则会把字符串全部进行转义，字符串里面的标签转换成实体符号。浏览器见到这些实体符号，不会当成标签，直接当成字符串输出。有的时候我们确实要输出一些标签代码，例如 分页字符串，还有富文本编辑器生成的内存（editor）。
>
> react里面也提供解决方案。 dangerouslySetInnerHTML
> // https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

```
		{/* 这里的大括号有两个 第一个代表的插入变量，第二个代表是一个对象 */}
        {/* div.innerHTML = pageString */}
        <div dangerouslySetInnerHTML={ { __html: pageString } }>
```

### Convas 与 SVG

1. 在网页开发里面：有很多地方需要使用图片。传统的方式使用 .jpg .png .gif格式的二进制图片文件。

2. img 在html5 里面，引入一些新的API，可以使用一些标签直接创建图片。

   1. 位图（像素点构成的结构，常见的 jpg png gif 都是位图，

      特点：1. 像素 2. 放大 失真（虚化、马赛克）3. 比较小，包含的色彩还是很丰富 255 * 255 * 255 ） 

   2. 矢量图：数学公式构成，矢量（1. 大小 2. 方向 力 牛顿）

      特点：1. 数学计算 2. 无限放大，不会失真，logo 喷绘 户外的广告牌 建筑 CAD 3. 显示的色彩比较少）

     

     在html5里面 可以使用一些标签创建 位图 或者 矢量图。

     html5 里面创建位图的技术使用的 canvas。 （图片：点---线---面---体（三维）---四维（时间） 维纳斯石膏）
     // https://www.runoob.com/html/html5-canvas.html

     html5 里面使用 svg 可以实现矢量图。 https://www.runoob.com/svg/svg-tutorial.html

正是有了这两种技术：才出现很多的图表库。（echarts） https://www.echartsjs.com/examples/zh/index.html#chart-type-line
出现大量的 页游 

使用SVG

需要用到 svg 的地方导入

```
import logo from './logo.svg';
```

加载使用

```
<img src={logo} className="App-logo" alt="logo" />
```

### style样式

## 使用CSS模块化

1. 可以在webpack.config.js中为css-loader启用模块化：
   `css-loader?modules&localIdentName=[name]_[local]-[hash:8]`

2. 使用`:global()`定义全局样式

   > 使用 import '../../css/commetnItem.css'这样子的不是模块化 接收的为空对象 ，
   >
   > 配置好之后
   >
   > 使用 import someName from ',/css/comon.css'导入的则为一个对象。使用
   >
   > someName.box可以使用

3. 想要全局的呢？:global(.title){  }

## 总结
理解React中虚拟DOM的概念
理解React中三种Diff算法的概念
使用JS中createElement的方式创建虚拟DOM
使用ReactDOM.render方法
使用JSX语法并理解其本质
掌握创建组件的两种方式
理解有状态组件和无状态组件的本质区别
理解props和state的区别

## 相关文章
+ [React数据流和组件间的沟通总结](http://www.cnblogs.com/tim100/p/6050514.html)
+ [单向数据流和双向绑定各有什么优缺点？](https://segmentfault.com/q/1010000005876655/a-1020000005876751)
+ [怎么更好的理解虚拟DOM?](https://www.zhihu.com/question/29504639?sort=created)
+ [React中文文档 - 版本较低](http://www.css88.com/react/index.html)
+ [React 源码剖析系列 － 不可思议的 react diff](http://blog.csdn.net/yczz/article/details/49886061)
+ [深入浅出React（四）：虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff?from=timeline&isappinstalled=0)
+ [一看就懂的ReactJs入门教程（精华版）](http://www.cocoachina.com/webapp/20150721/12692.html)
+ [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
+ [将MarkDown转换为HTML页面](http://blog.csdn.net/itzhongzi/article/details/66045880)
+ [win7命令行 端口占用 查询进程号 杀进程](https://jingyan.baidu.com/article/0320e2c1c9cf0e1b87507b26.html)