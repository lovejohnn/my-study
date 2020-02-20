# 课前复习
1. webpack 的使用
2. webpack 常用的 loaders 和 plugins 知道（笔试题）
3. loaders（处理前） 和 plugins（压缩、拆分 mini-css-extra-plugin） 区别是什么？（笔试题）



# 课程目标（深圳市场 react 很重要）
1. react 简介
2. create-react-app 的基本使用
3. app 目录分析
4. jsx 语法简介
5. jsx 基本语法
6. 函数式组件
7. 类组件
8. 组件样式
9. 组件行为



# 1. react 简介
## 1. react 是什么？
答：react 是 facebook 这个公司于 2013 左右 开源 出来的一个前端的用于构建 UI（user interface 用户界面） 的库（框架）。

官网：https://reactjs.org/
https://zh-hans.reactjs.org/
文档：https://zh-hans.reactjs.org/docs/getting-started.html

GitHub：https://github.com/facebook/react/

Reactjs历史时间轴一览

React诞生的历史原因

总结：react 诞生的原因主要是当时市面上的这些框架都无法满足 facebook 公司的业务需求 (1. 数据量很大，数据不好管理  2. 页面DOM结构不能好复用)

facebook 内部工程师 想办法去解决这些需求，通过努力，找到解决方案，开源了 react。

react 特点：

1. 使用 flux思想 管理数据（flux 就是一种集中化的统一管理数据，和 vuex 类似，但是比vuex 要复杂，但是后期的扩展是非常方便，一般只有在大项目里面才有使用的必要。）（一旦项目做大引入很多的管理思想，束手束脚）

2. 首次引入虚拟DOM 概念（主要的原因是，在前端没有引入MVC概念的时候，在jQuery存在的哪个年代，大家都是DOM操作，通过DOM监听，DOM选取操作，如果操作量不大，也不会产生太大的问题，但是业务一旦复杂，数据量多，则这个时候如果继续DOM操作，还是很消耗性能，浏览器的底层是做渲染和重绘是很消耗性能，我们应该尽可能减少重绘。主要的原因是因为在开发的时候，有的时候，只有部分的数据发生变化，其实页面上主要的DOM结构还没有太大的变化，很多的DOM都可以复用）Facebook的工程师引入 虚拟DOM（使用javascript对象的方式去描述一个DOM结构，然后通过diff算法去比较新的虚拟DOM和旧的虚拟DOM，得出区别（patch 补丁） snabbDOM h函数 patch）。 注意：由于虚拟DOM的引入使得页面的加载性能得到显著的提升，以至于后面的一些其他的MVVM框架，都引入虚拟DOM的概念。例如 vuejs 就是借鉴了 react 里面的 虚拟DOM（virtual DOM）注意： 虚拟DOM的概念是Facebook的工程师想出来的。但是 底层 diff 算法不是Facebook首创，很早有了 diff 算法。


3. 首次提出前端的组件化开发思想。（Facebook通过自己的项目发现，在众多的页面之间，很多的代码结构都是复用，例如像 顶部导航、按钮.... 则把这些可以复用的代码提取出来形成一个一个的代码块，叫做组件，和 vuejs 里面的 组件的概念类似，组件有结构、样式、形成）



## 2. 解决什么了问题？
答：1. 数据统一管理 2. 性能提升 3. 代码复用

## 3. 如何使用？
答：官方文档


## 4. 库和框架有什么区别？（谈谈库和框架之间的区别？）
答： 之前学习 jquery 这个是一个库；之前学习的 vuejs 是一个框架。
简单：库只是一个工具集合（里面封装很多的好用的函数、方法）。框架是一套成熟的解决方案（框架里面可以组织很多的库）。
vuejs 数据驱动，没有DOM操作（vuejs底层还是要DOM操作，尤大大把底层DOM操作封装起来）。


# react 使用
react  的使用需要使用一个官方提供的脚手架进行开发。不像vuejs 直接引入一个 vue.js 文件就可以使用。脚手架的底层使用的 webpack，把 react 里面的一些新特性写的代码做了转换，转换成浏览器可以识别的代码，例如 react 引入一种叫做 jsx 的语法。

```javascript

npm init -y

npx create-react-app my-app
cd my-app
npm start

```

注意1 ：npx 代表是局部安装后面的脚手架 `create-react-app`

## 脚手架提供的常用的命令
1. yarn start  用于在本地启动一个测试服务器：3000端口
2. yarn build  用于打包，打包后的文件可以直接上线
3. yarn test   用于前端测试
4. yarn eject  用于把 webpack 配置文件导出（create-react-app 底层就是 webpack）



# jsx 语法简介
1. 什么是 jsx ?
答：jsx 翻译过来就是 javascript + xml。说白了就是允许开发者可以在 js 语境下直接写 html 代码（标签），不需要使用引号包裹。


2. 为什么要使用 jsx？
答：主要的原因是这样的：react 里面首次引入 虚拟DOM 概念，但是如果使用 react官方原生的API来创建虚拟的DOM，非常的麻烦，不利于开发者写代码。所以官方提出了一个新的语法来方便开发者去写 虚拟DOM，这种语法叫做jsx。

总结：jsx 就是 facebook 工程师为了方便广大的开发者可以快速的开发虚拟DOM。


3. 如何使用 jsx 语法？
答：演示。

## jsx 基本使用
文档：https://zh-hans.reactjs.org/docs/introducing-jsx.html

> // jsx 里面的标签必须要闭合（双标签，闭合表单；单标签自闭合/ br hr input）
> // jsx 里面要嵌入 js 变量，则使用 { } 进行包裹即可，只需要写一个 {}，
> // 不是插值表达式 {{}}
>
> // 现在可以发现通过 {}  可以在 jsx里面嵌入变量，那么 {} 可以写那些数据类型？可以做哪些操作呢？
> // 可以写变量（1. 基本数据类型 直接写 2. 复合数据类型 数组（不错，字符串输出）、对象（不能直接写，调取属性））
>
> // { } 可以做哪些运算操作？ 1. 四则运算 2. 逻辑运算 3. 三目 4. 函数调用
>
> // 总结：在 jsx 里面 语法 < 知道是 jsx 遇到 { 知道是变量插入 
>
> // 在 react 里面如果要遍历复合数据类型，则我们需要作出处理，使用 map 函数直接处理即可。 如果数组元素是是一维的，react里面，默认已经做了遍历操作。 使用jsx 写了一个虚拟DOM。 为了更好的管理虚拟DOM，react建议，把jsx 虚拟DOM写出组件的方式。
> var myDiv = (


# react 里面的组件
1. 什么是组件？
答：组件说白了就是以后自定义的HTML代码片段（可能会高度复用的代码，提取出来，形成一个公共的代码块，可以复用）组件的特点： 1. html结构（属性）render  2. 样式 3. 行为 4. 数据(1. props 2. state)

2. 为什么要学习组件？
答：实现代码的复用。

3. 如何学习组件？
答：在 react 里面组件分为两类（ 1. 函数式组件（无状态）  2. 类组件（有状态 state、无状态 ））

## 函数式组件
使用构造函数的方式去编写一个组件。 
1. 注意：构造函数的首字母必须大写。
2. 函数的返回值是一个 jsx 表达式（jsx注意事项）
语法格式：
```javascript

function MyCompoent(){
    return (
        <div>
            ....
        </div>
    )
}
```

## 类组件
使用 class 关键字去定义一个组件，这种组件叫做类组件。

class 这个关键字是 es6 引入的语法糖，其实就是对构造函数的一个封装。在其他的面向对象语言里面，class 关键是定义一个类。

extends 关键字是 es6 里面引入一个新的特性，可以实现类的继承。解决es5里面的原型链的继承问题。

注意1： 在 react 里面如果要使用类组件，则该组件必须先继承react提供的一父组件。React.Component

注意：类组件必须定义一个 render 方法。返回的返回值是一个 jsx 表达式

语法：
```javascript
class MyDiv extends React.Component {
    render(){
        return (
            <div>
                .....
            </div>
        )
    }
}

```

### 类组件的状态state

```
    // 构造函数：特点：当类被实例化的时候，构造函数自己执行。注意：如果我们的类有继承操作，则必须先调用一下 super 
    // 在类组件里面我们可以手工的使用 props 方法传递属性
    constructor(props){
        super(props); // es6 语法规定的
        // 在构造函数内部定义属性 构造函数内部定义，方法不再这里定义。方法在外部顶部
        // 注意：有状态的组件的属性的名称必须是 state ，并且值必须是对象
        console.log(props);
        // props.id = 12; // 修改props 错误
        
        this.state = {
            mytitle : '类组件的状态数据-标题',
            arr: [12, 23, 34],
            myStyle: {color: 'red', fontSize: '30px'},
        }; 
    }
```



## 事件 以及 this 指向问题 解决 箭头函数  bind绑定

>   1. 只支持原生的写法 行内
>    2. react 里面的事件的名称的首字母必须大写  onclick -> onClick
>    3. 事件的回调必须是一个函数 ，提供一个js 语境{ }
>    4.  回调函数必须是一个函数，而不是一个函数调用 
>5. 函数里的evnet对象已经封装好了 函数申明写好参数(event)即可使用
> 
>    //  react 内部已经把 this 屏蔽了，主要是由于this指向可能不正确。如果我们确实需要使用到this，则我们需要手工的处理。 1. 箭头函数 this肯定确定的  2. bind手动绑定

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



# 扩展阅读
1. https://blog.csdn.net/hhthwx/article/details/80071056
2. https://www.jianshu.com/p/ad533d71f79e
3. https://www.cnblogs.com/fu-fu/p/7232745.html

## 组件的样式
1. 行内样式 style

   > 注意属性名xx-xx 需要转换为 驼峰名 xxXx
   >
   > 注意class类名 class => className  for => htmlFor

2. class 类名

   > className={{ }}  期望的是一个对象

3. 外部样式文件

   > 在 index.js入口文件中 import 'some.css'



## 组件的行为
行为就是我们常提到的事件。在之前学习的原生js的时候，事件绑定有三种：
1. 行内绑定 <div onclick='alert(1)'></div>
2. 外部绑定 document.getElementById('btn').onclick = function(){}
3. 事件监听 document.getElementById('btn).addEventListen('click', fn, false);

注意：但是在react里面只支持行内绑定。

### Convas 与 SVG

> // 1. 在网页开发里面：有很多地方需要使用图片。传统的方式使用 .jpg .png .gif格式的二进制图片文件。img 
> // 2. 在html5 里面，引入一些新的API，可以使用一些标签直接创建图片。（图片： 1. 位图（像素点构成的结构，常见的 jpg png gif 都是位图，特点：1. 像素 2. 放大 失真（虚化、马赛克）3. 比较小，包含的色彩还是很丰富 255 * 255 * 255 ） 2. 矢量图：数学公式构成，矢量（1. 大小 2. 方向 力 牛顿） 特点：1. 数学计算 2. 无限放大，不会失真，logo 喷绘 户外的广告牌 建筑 CAD 3. 显示的色彩比较少）在html5里面 可以使用一些标签创建位图或者矢量图。
> // html5 里面创建位图的技术使用的 canvas。 （图片：点---线---面---体（三维）---四维（时间） 维纳斯石膏）
> // https://www.runoob.com/html/html5-canvas.html
>
> // html5 里面使用 svg 可以实现矢量图。 https://www.runoob.com/svg/svg-tutorial.html
>
> // 正是有了这两种技术：才出现很多的图表库。（echarts） https://www.echartsjs.com/examples/zh/index.html#chart-type-line
> // 出现大量的 页游 

使用SVG

需要用到 svg 的地方导入

```
import logo from './logo.svg';
```

加载使用

```
<img src={logo} className="App-logo" alt="logo" />
```



### 解决字符转义的问题

> //一般是一个分页字符串，实际肯定前端调用接口返回一个分页字符串
> var pageString = '<ul><li><a href="#">1</a></li><li><a href="#">2</a></li></ul>'; 
>
> // react 里面认为 数据默认是不安全，存在隐患，可能产生 xss 攻击，则会把字符串全部进行转义，字符串里面的标签转换成实体符号。浏览器见到这些实体符号，不会当成标签，直接当成字符串输出。有的时候我们确实要输出一些标签代码，例如 分页字符串，还有富文本编辑器生成的内存（editor）。
>
>  react里面也提供解决方案。 dangerouslySetInnerHTML
> // https://zh-hans.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

```
		{/* 这里的大括号有两个 第一个代表的插入变量，第二个代表是一个对象 */}
        {/* div.innerHTML = pageString */}
        <div dangerouslySetInnerHTML={ { __html: pageString } }>
```



### 函数组件 与 类组件

>// 函数式组件和类组件的差异？
>// 第一个差异：数据的接受不一样。
>// 函数式组件通过构造函数的参数传递获取
>// 类组件直接在内部使用 this.props 获取
>
>// 第二个区别：我们一般把函数式组件叫做 无状态组件
>// 第二个区别：我们一般把类组件叫做 有状态组件
>
>// 什么是状态？ state 单词叫做状态。 
>
>// 刚才给组件传值的时候，都是外部数据。有的时候，我们组件需要自己去维护一些数据，我们把自己维护的数据叫做 状态 state。类组件可以自己定义 state , 定义了 state 的类组件，我们叫做有状态的组件，没有定义 state的类组件叫做无状态组件；但是函数式组件不能自己定义 state，只能叫做无状态组件。
>
>// 第三个区别：props 是只读的，不能被修改 但是有状态类组件里面的 state 是可以修改和读

