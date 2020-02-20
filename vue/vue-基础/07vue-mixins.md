## Vue-mixins

> vue中mixins个人理解就是定义一些公用的比较常用的方法，类似我们vue中将一些常用的组件也会抽离出来做成一个公共组件一样，只不过vue中mixins是定义的是法或者计算属性,然后将其混入（合并）到各个组件中使用,方便管理与统一修改。下面举例一些简单的引用用于自己理解和记忆：

先定义一个mixins

```
// 创建一个需要混入的对象
export const mixinHello = {
    created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('Hello');
        }
    }
};
```

在自己的组件中使用

```
import {myMixin} from './../assets/js/mixin';
export default {
    mixins:[myMixin],
    name: 'test',
    data () {
        return {
            msg: 'Welcome to Your project'
        }
    }
}
```

这样输出是结果是怎样的呢？

相当于我们自己的组件是这样子的：

```
export default {

    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your project'
        }
    }，
 created() {
        this.hello();
    },
    methods: {
        hello() {
            console.log('Hello');
        }
    }
}
```

> 注意：
>
> 1. 如果mixin里面有一个created,我们自己的组件里面也有一个created，代码执行是先执行mixin里面的再执行我们自己组件的created，换句话说就是把所有created中的逻辑合并，这里注意不能出现相同的逻辑，不然我们自己组件的就会覆盖掉mixin中的
> 2. 对于methods，component如果里面都有相同的方法，我们自己的组件中的方法将会覆盖掉mixin中的方法。一切按照我们组件优先的原则

例如

![](https://img2018.cnblogs.com/blog/756683/201907/756683-20190705142058598-687794695.png)





## vue computed

看了网上很多资料，对vue的computed讲解自己看的都不是很清晰，今天忙里抽闲，和同事们又闲聊起来，对computed这个属性才有了一个稍微比较清晰的认识，下面的文章有一部分是转自： https://www.w3cplus.com/vue/vue-computed-intro.html © w3cplus.com，

感觉这篇文章上面的例子通俗易懂，所以此处借用了。

自己的理解：

- computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
- computed比较适合对多个变量或者对象进行处理后返回一个结果值，也就是数多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化，举例：购物车里面的商品列表和总金额之间的关系，只要商品列表里面的商品数量发生变化，或减少或增多或删除商品，总金额都应该发生变化。这里的这个总金额使用computed属性来进行计算是最好的选择

与watch之间的区别：

　　刚开始总是傻傻分不清到底在什么时候使用watch，什么时候使用computed。这里大致说一下自己的理解：

- watch主要用于监控vue实例的变化，它监控的变量当然必须在data里面声明才可以，它可以监控一个变量，也可以是一个对象，但是我们不能类似这样监控，比如：

```
watch:{
goodsList.price(newVal,oldVal){
    //监控商品列表中是商品价格
}
}
```

这样会报错。只能监控整个对象或单个变量，如下所示：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
　data(){
　　　　　　　　return {
　　　　　　　　　　example0:"",
　　　　　　　　　　example1:"",
　　　　　　　　　　example2:{
 　　　　　　　　　　　　inner0:1, 　　　　　　　　　
                        　　　innner1:2 　　　　　　　　　
                    　}
　　　　　　}
　　　　},
watch:{
　example0(newVal,oldVal){//监控单个变量
           ……
   }，example2(newVal,oldVal){//监控对象
           ……
   }，
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

- watch一般用于监控路由、input输入框的值特殊处理等等，它比较适合的场景是一个数据影响多个数据

以下内容是摘自https://www.w3cplus.com/vue/vue-computed-intro.html © w3cplus.com：

**计算属性**可用于快速计算视图（**View**）中显示的属性。这些计算将被缓存，并且只在需要时更新。

在Vue中有多种方法为视图设置值：

- 使用指令直接将数据值绑定到视图
- 使用简单的表达式对内容进行简单的转换
- 使用过滤器对内容进行简单的转换

除此之外，我们还可以使用计算属性根据数据模型中的值或一组值来计算显示值。





## 计算属性

计算属性允许我们对指定的视图，复杂的值计算。这些值将绑定到依赖项值，只在需要时更新。

例如，我们可以在数据模型中有一个results数组：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302141425374-1782315819.png)

假设我们想要查看所有主题的总数。我们不能使用filters或expressions来完成这个任务。

- filters：用于简单的数据格式，在应用程序的多个位置都需要它
- expressions：不允许使用流操作或其他复杂的逻辑。他们应该保持简单

这个时候，计算属性就可以派上用场。我们可以向模型中添加一个计算值，如下：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302141805420-374118123.png)

效果如下：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302141929655-867871426.png)

**计算属性 vs 方法**

我们可以使用Vue中的method计算出学科的总分，最终得到的总数结果是相同的。

在上例的基础上，我们把computed区块中的totalMarks函数整体移到methods中。同时在模板中将{{ totalMarks }} 替换成{{ totalMarks() }}。 你最终看到的结果是一样的，如下所示：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302142229964-730914120.png)

虽然这两种方式输出的结果是相同的，但是性能将遭受毁灭性的打击。使用这种方法totalMarks()方法在每次页面渲染时都被执行一次（例如，使用每一个change）。

如果我们有一个计算属性，那么Vue会记住计算的属性所依赖的值（在我们这个示例中，那就是results）。通过这样做，Vue只有在依赖变化时才可以计算值。否则，将返回以前缓存的值。这也意味着**只要results还没有发生改变，多次访问totalMark计算属性会立即返回之前的计算结果，而不必再次执行函数。**

上面两个示例也说明，在Vue中**计算属性是基于它们的依赖进行缓存的，而方法是不会基于它们的依赖进行缓存的。从而使用计算属性要比方法性能更好。**

这也同样意味着下面的计算属性将不再更新，因为Date.now()不是响应式依赖：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302142445599-432706336.png)

相比之下，每当触发重新渲染时，方法的调用方式将总是再次执行函数。因此，函数必须是一个纯函数。它不能有副作用。输出只能依赖于传递给函数的值。

那么我们为什么需要缓存？假设我们有一个性能开销比较大的的计算属性A，它需要遍历一个极大的数组和做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

**计算属性的setter**

计算属性默认只有getter，不过在需要时你也可以提供一个setter

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302142839908-779400171.png)

效果如下：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302142858469-1873818746.png)

你在输入框中输入一个fullName，然后点击set按钮，可以看到对应的效果。你现在再运行app.fullName="Airen liao"时，计算属性的setter会被调用，app.firstName和app.lastName也相应地会被更新。如下图所示：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302143042946-1650123244.gif)

**观察者：**

虽然计算属性在大多数情况下更合适，但有时候也需要一个自定义的watcher。这是为什么Vue通过watch选项提供一个更通用的方法，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。

Vue确实提供了一种更通用的方式来观察和响应Vue实例上的数据变动：watch属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用watch。然而，通常更好的想法是使用计算属性而不是命令式的watch回调。比如下面的示例：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302143246492-509225082.png)

上面代码是命令式的和重复的。将它与计算属性的版本进行比较：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180302143312343-1120005319.png)

 



## Web移动端Fixed布局的解决方案

移动端业务开发，iOS 下经常会有 fixed 元素和输入框(input 元素)同时存在的情况。 但是 fixed 元素在有软键盘唤起的情况下，会出现许多莫名其妙的问题。 这篇文章里就提供一个简单的有输入框情况下的 fixed 布局方案。

**iOS下的 Fixed + Input BUG现象**

让我们先举个栗子，最直观的说明一下这个 BUG 的现象。 常规的 fixed 布局，可能使用如下布局（以下仅示意代码）：

```
<body class="layout-fixed">
    <!-- fixed定位的头部 -->
    <header>
 
    </header>
 
    <!-- 可以滚动的区域 -->
    <main>
        <!-- 内容在这里... -->
    </main>
 
    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
```

对应的样式如下：

```
header, footer, main {
    display: block;
}
 
header {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
}
 
footer {
    position: fixed;
    height: 34px;
    left: 0;
    right: 0;
    bottom: 0;
}
 
main {
    margin-top: 50px;
    margin-bottom: 34px;
    height: 2000px
}
```

 

然后看起来就是下面这个样子。拖动页面时 header 和 footer 已经定位在了对应的位置，目测没问题了。

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180301152823364-1140803409.png)

但接下来问题就来了！如果底部输入框软键盘被唤起以后，再次滑动页面，就会看到如下图所示：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180301152854858-195948908.png)

 

 

 

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180301152942869-943836411.png)

我们看到 fixed 定位好的元素跟随页面滚动了起来… fixed 属性失效了！

这是为什么呢？简单解释下： > **软键盘唤起后，页面的 fixed 元素将失效（即无法浮动，也可以理解为变成了 absolute 定位），所以当页面超过一屏且滚动时，失效的 fixed 元素就会跟随滚动了。**

这便是 iOS 上 fixed 元素和输入框的 bug 。其中不仅限于 type=text 的输入框，凡是软键盘（比如时间日期选择、select 选择等等）被唤起，都会遇到同样地问题。

虽然 isScroll.js 可以很好的解决 fixed 定位滚动的问题，但是不在万不得已的情况下，我们尽量尝试一下不依赖第三方库的布局方案，以简化实现方式。这里抛砖引玉作为参考。

**解决思路：**

既然在 iOS 下由于软键盘唤出后，页面 fixed 元素会失效，导致跟随页面一起滚动，那么**假如——页面不会过长出现滚动，那么即便 fixed 元素失效，也无法跟随页面滚动，也就不会出现上面的问题了。**

那么按照这个思路，如果使 fixed 元素的父级不出现滚动，而将原 body 滚动的区域域移到 main 内部，而 header 和 footer 的样式不变，代码如下：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<body class="layout-scroll-fixed">
    <!-- fixed定位的头部 -->
    <header>

    </header>

    <!-- 可以滚动的区域 -->
    <main>
        <div class="content">
        <!-- 内容在这里... -->
        </div>
    </main>

    <!-- fixed定位的底部 -->
    <footer>
        <input type="text" placeholder="Footer..."/>
        <button class="submit">提交</button>
    </footer>
</body>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
header, footer, main {
    display: block;
}

header {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    top: 0;
}

footer {
    position: fixed;
    height: 34px;
    left: 0;
    right: 0;
    bottom: 0;
}

main {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    /* 使之可以滚动 */
    overflow-y: scroll;
}

main .content {
    height: 2000px;
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这样再来看一下：

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180301153224578-1420243227.png)

 

在原始输入法下， fixed 元素可以定位在页面的正确位置。滚动页面时，由于滚动的是 main 内部的 div，因此 footer 没有跟随页面滚动。

上面貌似解决了问题，但是如果在手机上实际测试一下，会发现 main 元素内的滚动非常不流畅，滑动的手指松开后，滚动立刻停止，失去了原本的流畅滚动特性。百度一下弹性滚动的问题，发现在 webkit 中，下面的属性可以恢复弹性滚动。

在 main 元素上加上该属性，嗯，丝般顺滑的感觉又回来了！

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
main {
    /* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    /* 使之可以滚动 */
    overflow-y: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

另外，这里的 header 和 footer 使用的是 fixed 定位，如果考虑到更老一些的 iOS 系统不支持 fixed 元素，完全可以把 fixed 替换成 absolute 。测试后效果是一样的。

至此一个不依赖第三方库的 fixed 布局就完成了。

**Android 下布局**

谈到了 iOS ，也来简单说一下 Android 下的布局吧。

在 Android2.3+ 中，因为不支持 overflow-scrolling ，因此部分浏览器内滚动会有不流畅的卡顿。但是目前发现在 body 上的滚动还是很流畅的，因此使用第一种在 iOS 出现问题的 fixed 定位的布局就可以了。

如果需要考虑 Android2.3 以下系统，因为不支持 fixed 元素，所以依然要需要考虑使用 isScroll.js 来实现内部滚动。

其实在 fixed 和输入框的问题上，基本思路就是： > 由于 fixed 在软键盘唤起后会失效，导致在页面可以滚动时，会跟随页面一起滚动。因此如果页面无法滚动，那么 fixed 元素即使失效，也不会滚动，也就不会出现 bug 了。

所以可以在这个方面去考虑解决问题。

**其他的一些细节处理**

在细节处理上，其实还有很多要注意的，挑几个实际遇到比较大的问题来说一下：

1. 有时候输入框 focus 以后，会出现软键盘遮挡输入框的情况，这时候可以尝试 input 元素的 scrollIntoView 进行修复。
2. 在 iOS 下使用第三方输入法时，输入法在唤起经常会盖住输入框，只有在输入了一条文字后，输入框才会浮出。目前也不知道有什么好的办法能让唤起输入框时正确显示。这暂时算是 iOS 下的一个坑吧。
3. 有些第三方浏览器底部的工具栏是浮在页面之上的，因此底部 fixed 定位会被工具栏遮挡。解决办法也比较简单粗暴——适配不同的浏览器，调整 fixed 元素距离底部的距离。
4. 最好将 header 和 footer 元素的 touchmove 事件禁止，以防止滚动在上面触发了部分浏览器全屏模式切换，而导致顶部地址栏和底部工具栏遮挡住 header 和 footer 元素。
5. 在页面滚动到上下边缘的时候，如果继续拖拽会将整个 View 一起拖拽走，导致页面的“露底”。

![img](https://images2018.cnblogs.com/blog/756683/201803/756683-20180301153851074-352297604.png)

为了防止页面露底，可以在页面拖拽到边缘的时候，通过判断拖拽方向以及是否为边缘来阻止 touchmove 事件，防止页面继续拖拽。

以上面内滚动 layout-scroll-fixed 布局为例，给出一段代码作为参考

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
// 防止内容区域滚到底后引起页面整体的滚动
var content = document.querySelector('main');
var startY;

content.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
});

content.addEventListener('touchmove', function (e) {
    // 高位表示向上滚动
    // 底位表示向下滚动
    // 1容许 0禁止
    var status = '11';
    var ele = this;

    var currentY = e.touches[0].clientY;

    if (ele.scrollTop === 0) {
        // 如果内容小于容器则同时禁止上下滚动
        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
        // 已经滚到底部了只能向上滚动
        status = '10';
    }

    if (status != '11') {
        // 判断当前的滚动方向
        var direction = currentY - startY > 0 ? '10' : '01';
        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            stopEvent(e);
        }
    }
});
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)



## vue中v-for有时候对页面不会重新渲染，数组变化后如何到渲染页面

**v-for不能进行双向数据绑定，页面渲染完成后，再次更改v-for遍历的数据，js里面打印的数据看到数据值已经更改，但是页面的数据就是没有渲染，这是为什么呢？**

vue中v-for和angularjs中的ng-repeat不用 ，它对页面只进行一次渲染。后续如果需要更改数据且显示在页面上就需要想想其他办法啦~~~

经过多次踩坑发现如下解决办法：

1、将vue引入当前页面，如下图所示：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807113750596-986763556.png)

2、使用Vue.set方法来对数据进行更改及渲染，如下图所示：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807113814690-1714704348.png)
3、还可以通过另外一种方式进行处理：

 **$this.newFileList = $this.newFileList.filter(t => t.id != $this.fileIndex);**



## vue如何缓存页面

**vue如何和ionic的缓存机制一样，可以缓存页面，在A页面跳转至B页面后返回A页面时A页面的数据还在？**

- 在app.vue中将router-view使用keep-alive包起来，使用v-if来判断使用使用被缓存的组件，在keep-alive外面也需要写相同的router-view,用来处理不被缓存的视图组件。

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807113034846-266831079.png)

- 在路由配置里面对需要被缓存的页面进行配置。如下图所示：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807113057690-1905845753.png)

- 这里注意：transition标签下面只能有一个自元素标签，所以使用div将里面的元素包起来。
- 页面缓存后，页面的部分内容又需要进行更新，在这种情况下要如何处理：需要将更改的信息写在activated里面，注意它不是在method里面。例如：

​       activated(){//缓存页面但是还有部分数据需要改动}

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807113318627-2129645352.png)

 

## 什么是vuex

一、关于vuex刚开始学习的时候对于里面的很多名词有很陌生。很难接受这个定义，下面这个链接很好很简单通俗的解释了什么是vuex

我喜欢的vuex网址：https://zhuanlan.zhihu.com/p/24357762

二、vuex主要是vue用来存储数据的，它可以有效的实现更改数据时有使用vue页面的数据实时更新，但是它有一个很大的缺点，就是因为vue是单页应用所以当页面刷新时vuex的数据随之也被清空了，如何实现页面被刷新而数据没有被清空呢？

在讲述之前你首先需要了解vuex的基本概念和使用方式，这里不再赘述，因为网上有很多资料，vue的官网也有很详细的说明。**使用的时候有一点要记住：action，mutation，getter都必须是函数**

**解决方案：**

在此处需要先封装一下vuex,首先来看看封装的文件格式：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104307784-488830379.png)

 

从上图中可以清晰的看到vuex的结构，首先简单的说一下各个文件的意义：

1、action.js 独立出来vuex处理数据的文件，格式如下：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104328893-385346318.png)

2、getter.js 独立出来的vuex获取数据的文件，格式如下：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104356877-1222120440.png)

 

3、 mutation-types.js 独立出来的vuex更改数据和存储数据的文件，此文件是mutation的参数申明文件，格式如下：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104426518-1106721501.png)

 

4、mutations.js 独立出来是mutation文件，在这里处理更改和存储数据，将mutation-types在此处导入，格式如下：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104453862-1979630730.png)

 

5、大boss上场啦，接下来就要说封装的关键点,index.js，先丢代码：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104512862-1406601624.png)

6、在最外层的index.js里面做了，初始化中间件的逻辑，代码如下：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104600424-1020723739.png)

这里借用官方文档中对plugin进行说明，如下图：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104635502-507670164.png)

这样写之后在页面获取和存储数据的方式是：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170807104709502-659172453.png)

 



## [vue如何配置路由 、获取路由的参数、部分刷新页面、缓存页面](https://www.cnblogs.com/gunelark/p/7290777.html)

 

1、路由配置：所有的启动文件都在最初始的main.js文件里面，这个文件中首先需要引入：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170034772-483480958.png)

2、路由文件配置说明：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170135256-1794379324.png)

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170154694-2669614.png)

3、如何获取页面url的参数？

this.$route.query

4、页面之间之间的跳转？

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170220834-2067380892.png)

5、返回历史记录页面

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170241272-321436669.png)

6、在项目中遇到的问题：

- 如何做到页面的部分刷新，如果做到部分页面进入的时候需要刷新，部分页面需要缓存？

​       首选需要了解keep-alive,在路由配置中增加如下代码：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
{
    "path": "/test",
    "component": "test",
    "name": "test",
    "meta": {
        keepAlive: true // 需要被缓存
    }
}
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

​     然后在app.vue里面：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 <div>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件！ -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件！ -->
        </router-view>
  </div>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

新的问题：

这样在相应的页面就可以做的自由缓存信息，但是现在又有一个问题：有的页面需要部分模块刷新，其他地方任然缓存信息，比如有编辑地址的页面，收件人信息需要点击编辑按钮进入编辑页面进行更改然后同步到此页面，而此页面的其他信息都保持页面缓存不变，如何做到这一点呢？

解决办法：

在需要部分刷新的页面，将需要刷新的数据写在activated中，页面会实现自动刷新，如下图所示：

![img](https://images2017.cnblogs.com/blog/756683/201708/756683-20170805170524740-758274248.png)

 