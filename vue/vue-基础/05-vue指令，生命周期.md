##### 前言：

> 基于vue 2+ 写一份知识总结，可以说是学习笔记

##### 目录：

> 一、vue实例的基本结构
> 二、vue事件处理、绑定属性
> 三、vue指令、自定义指令
> 四、vue过滤器
> 五、vue数据监听
> 六、vue组件
> 七、vue-router
> 八、axios
>
> 九、生命周期

##### 一、Vue 实例的基本结构

[Vue官网API](https://cn.vuejs.org/v2/api/)



```xml
 <div id="app">
   <p>{{msg}}<p>
 </div>
```



```undefined
 Welcome
```



```jsx
var vm = new Vue({
  el: '#app', //等价于后面的 .$mount('#app') 用其中之一就可以了
  render: h => h(App), //理解不够深入，参考（https://cn.vuejs.org/v2/api/?#render）
  data: { 
    //页面响应的数据都放在这里如上（组件只接受 function 且必须返回一个对象），zhicvm.$data 访问这里面的data
    msg: 'Welcome',
  },
  props:{
    //props 可以是数组或对象，接收任何值
  },
  methods:  {
    //页面或组件定义的方法的集合，可通过 vm.reset() 直接调用
    reset: function(){
      this.msg = '这是重新设置之后的数据'
    }
  },
  computed: {
    //计算属性(computed)与方法(methods) 类似，如果计算数据量比较大，建议放到这里
    //计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。
    //参考（https://cn.vuejs.org/v2/api/?#computed）
  },
  components：{
    // 局部组件注册的地方
    'component-a': ComponentA,
    'component-b': ComponentB
  },
  directives: {
    // 局部指令注册的地方
    focus: {
      // 指令的定义
      inserted: function (el,binding) {
        el.focus(); 
      }
    }
  },
  filters:{
    // 局部过滤器注册的地方
  },
  //生命周期钩子
  beforeCreate: function (){}, //在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
  created: function (){},//在实例创建完成后被立即调用。
  beforeMount: function (){},//在挂载开始之前被调用：相关的 render 函数首次被调用。
  mounted: function (){},//el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
  beforeUpdate: function (){},//数据更新时调用，发生在虚拟 DOM 打补丁之前。
  updated: function (){},//由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  beforeDestroy: function (){},//实例销毁之前调用。在这一步，实例仍然完全可用。
  destroyed: function (){
    //Vue 实例销毁后调用。
    //调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
  },
}).$mount('#app')
```

##### 二、Vue 事件处理、绑定属性

[v-on：](https://cn.vuejs.org/v2/api/?#v-on)

> 1、绑定事件监听器。用在普通元素上时，只能监听[**原生 DOM 事件**](https://developer.mozilla.org/zh-CN/docs/Web/Events)（如：click、keyup/down、mouseenter/over/move/down/out 等）。也可以监听自定义事件即 methods 里面的事件。
>  2、在监听原生 DOM 事件时，方法以事件为唯一的参数。如果使用内联语句，语句可以访问一个 $event 属性：v-on:click="handle('ok', $event)"。



```swift
修饰符：
.stop - 调用 event.stopPropagation()。阻止冒泡
.prevent - 调用 event.preventDefault()。阻止默认事件
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
```



```xml
用法：
<!-- 内联语句 -->
<button v-on:click="doThat('hello', $event)"></button>

<!-- 缩写 -->
<button @click="doThis"></button>

<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>

<!-- 对象语法 (2.4.0+) -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
.
.
.
```

- v-on 还提供了[按键修饰符](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)



```css
键盘按钮的别名
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```



```cpp
// 可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名
// 使用 方式 `v-on:keyup.f1` ，f1 这个名字你可以任意取，你知道是什么意思就可以了
Vue.config.keyCodes.f1 = 112
```

[v-bind：](https://cn.vuejs.org/v2/api/?#v-bind)

> 动态地绑定一个或多个特性，或一个组件 prop 到表达式。



```xml
<!-- 绑定一个属性 -->
<img v-bind:src="imageSrc">

<!-- 缩写 -->
<img :src="imageSrc">

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName">

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]">

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定一个有属性的对象 -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。“prop”必须在 my-component 中声明。-->
<my-component :prop="someThing"></my-component>
.
.
.
```

#### 三、Vue 指令、自定义指令

[Vue指令：](https://cn.vuejs.org/v2/api/?#指令)

v-text：



```xml
<span v-text="msg"></span>
<!-- 和下面的一样 -->
<span>{{msg}}</span>
```

v-html：



```xml
//输出真正的 HTML
<div v-html="html"></div>

data{
  html:'<strong>我是真正的html</strong>'
}
```

v-show：



```dart
//根据表达式之真假值，切换元素的 display CSS 属性。
<h1 v-show="ok">Hello!</h1>
```

v-if、v-if-else、v-else：



```xml
//v-if 是“真正”的条件渲染，如果条件为假，dom不会渲染在页面当中
//v-show 会一直渲染在dom当中
//当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。
<h1 v-if="ok">Yes</h1>

<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>

<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

v-for：



```xml
//基于源数据多次渲染元素或模板块。
<div v-for="item in items">
  {{ item.text }}
</div>

//另外也可以为数组索引指定别名 (或者用于对象的键)：val->对象的键值  key->对象的键  index->对象的下标
<div v-for="(item, index) in items"></div>
<div v-for="(val, key) in object"></div>
<div v-for="(val, key, index) in object"></div>
```

v-model：作用于<input>、<select>、<textarea>，
 当v-model作用于 **多个复选框**、**当选择按钮**、**选择框** 时，都是把这些标签的value值赋值给v-model的变量



```jsx
修饰符：
.lazy - 取代 `input` 监听 `change` 事件
.number- 输入字符串转为数字
.trim- 输入首尾空格过滤

<input v-model="message" placeholder="edit me">
<textarea v-model="message" placeholder="add multiple lines"></textarea>

// 选择框
<select v-model="selected">
   <option disabled value="">请选择</option>
   <option>A</option>
   <option>B</option>
   <option>C</option>
</select>

// 用 v-for 渲染的动态选项：
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
.
.
.
```

v-pre：



```kotlin
//跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
//Mustache 标签：{{ }}
<span v-pre>{{ this will not be compiled }}</span>
```

v-cloak：



```jsx
//这个指令保持在元素上直到关联实例结束编译
css:
[v-cloak] {
  display: none;
}
html:
<div v-cloak>
  {{ message }}
</div>
```

v-once：



```xml
只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```

[Vue自定义指令：](https://cn.vuejs.org/v2/guide/custom-directive.html)

[指令的钩子函数：](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数) 一个指令定义对象可以提供如下几个钩子函数 (均为可选)：



```go
`bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

`inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

`update`：1、所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
          2、指令的值可能发生了改变，也可能没有。
          3、你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

`componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

`unbind`：只调用一次，指令与元素解绑时调用。
```

[钩子函数的参数](https://cn.vuejs.org/v2/guide/custom-directive.html#钩子函数参数) (即 el、binding、vnode 和 oldVnode)。



```ruby
`el`：指令所绑定的元素，可以用来直接操作 DOM 。

`binding`：一个对象，包含以下属性：
    `name`：指令名，不包括 `v-` 前缀。
    `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
    `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

`vnode`：Vue 编译生成的虚拟节点。移步(https://cn.vuejs.org/v2/api/#VNode%E6%8E%A5%E5%8F%A3) 来了解更多详情。

`oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。
```



```jsx
// 注册一个全局自定义指令 `v-focus`
// 在这里需要注意一下，给一个全局指令命名的时候不要加 `v-` 前缀，用在dom的时候再加上
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,binding) {
    // 聚焦元素
    el.focus();
    console.log(binding.value) //=>666
  }
})

//如果想注册局部指令，组件中也接受一个 directives 的选项：
directives: {
  focus: {
    // 指令的定义
    inserted: function (el,binding) {
      el.focus(); 
      console.log(binding.value) //=>666
    }
  }
}

//然后你可以在模板中任何元素上使用新的 v-focus 属性，如下：
<input v-focus="6666">  // 6666 可用data 里面的变量替换，建议传简单数据类型
```

> 一个正常的业务不可能只有一个指令，如果把所有的指令都注册在main.js里面会不好管理，所以最好放在一个统一文件 directives.js
>  这里就产生了两个问题：
>  1、怎么把directives.js 这个文件引用到main.js
>  2、Vue.directives() 支不支持链式调用（因为老版本angular 支持，所以做一个假想）



```jsx
// 第二个问题很好解决，经过测试，Vue.directives() 不支持链式调用 `Vue.directives().directives()`

// 第一个问题：经过查阅相关资料之后可以以插件的形式引入
// 这种方式引入暂时还没有发现有其他的问题

// main.js
import directives from './directives.js'
Vue.use(directives);

// directives.js
export default{
  // install 方法会默认在main.js里面调用
  install(Vue){
    Vue.directive('focus',{
      inserted(el,binding){
        el.focus();
      }
    });
    Vue.directive('data',{
      inserted(el){
        console.log(el)
      }
    });
    //有多个就继续往这里添加就好了
  }
}
```

#### 四、Vue 过滤器

[Vue 过滤器的用法](https://cn.vuejs.org/v2/guide/filters.html)

> 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)。
>  与指令的用法类似，但过滤器一定要有返回值，也不支持链式调用

> **这里需要注意的地方是，vue 2.0 之后移除了自带的过滤器**



```csharp
// 在双花括号中
{{ message | capitalize }}

// 在 `v-bind` 中
<div v-bind:id="rawId | formatId"></div>

// 局部注册过滤器
filters: {
  // 首字母大写
  capitalize: function (value) {
    // value 就是 ‘|’ 符号前面的值
    if (!value) return '';
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

// 注册全局过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return '';
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```



```csharp
// 过滤器传值
{{ number | dual(2) }}

Vue.filter('dual', function (value,type) {
  // 回调函数里面默认有 value ,在页面上传过来的值会依次添加在后面
  console.log(type)  // => 2
  if (!value) return '';
  if (typeof value !== "number") return alert(value + ' 不是数字');
  if( parseInt(type) === 2 ){
    return value = value > 10 ? value : '0' + value
  }
  return value
})
```



```csharp
// 过滤器的插件用法，与 directives.js 一致
// main.js
import directives from './filters.js'
Vue.use(filters);

// filters.js
export default {
  install(Vue){
    Vue.filter('dual', function (value,type) {
      if (!value) return '';
      if (typeof value !== "number") return alert(value + ' 不是数字');
      if( parseInt(type) === 2 ){
        return value = value > 10 ? value : '0' + value
      }
      return value
    })
  }
}
```

#### 五、Vue 数据监听

[Vue 数据监听 watch](https://cn.vuejs.org/v2/api/#watch)



```jsx
// watch 基本用法与注意事项
data: {
  a: 1,
  e: {
    f: {
      g: 5
    }
  },
  items: [
    { message: 'Foo' },
    { message: 'Bar' }
  ],
}
mounted: function(){
  this.a = 2；
  this.e.f.g = 10;
  this.$set(this.items, 0, { message: 'AAA' });  // $set 赋值
  this.items[0] = { message: 'AAA' };  // 直接赋值
},
watch: {
  // 最简单最直接的监听方式，能监听简单的数据变化，这种方法默认就是执行 handler: function(){}
  // 注意：这种方式监听不到对象的变化
  a: function(val, oldVal){
    console.log(val);  // => 变化之后的数据
    console.log(oldVal); // => 变化之前的数据
  },
  // 深度监听，这里要注意一下，这样的方式打印出来两个值都是变化之后的值
  // deep 的值默认为false，如果不写或者deep: false 都不能监听到对象值的变化
  e: {
    handler: function (val, oldVal) {
      console.log(val);  // => 变化之后的数据
      console.log(oldVal);  // => 变化之后的数据
    },
    deep: true, 
  },
  // 如果要精准监听的对象值的变化，可以用这种方法
  'e.f.g': function (val, oldVal) {
    console.log(val);  // => 变化之后的数据
    console.log(oldVal);  // => 变化之前的数据
  },
  // 监听数组
  // 由于 JavaScript 的限制，Vue 不能检测 this.items[0] = { message: 'AAA' }; 这种方式赋值的变化
  // 所以你要用 $set、或者数组变异的方法赋值
  items: function(val, oldVal){
    console.log(val);  // => 变化之后的数据
    console.log(oldVal);  // => 变化之后的数据
  },
}
```

[Vue 数组更新检测](https://cn.vuejs.org/v2/guide/list.html#数组更新检测)

官网的介绍：**由于 JavaScript 的限制，Vue 不能检测以下变动的数组**
 换句话来说：**这样赋值不触发视图更新**

- 1、当你利用索引直接设置一个项时，例如：



```kotlin
this.items[indexOfItem] = newValue  // indexOfItem 是指数组的index 下标
```

- 2、当你修改数组的长度时，例如：



```kotlin
this.items.length = newLength
```

要解决上面问题，你可以用以下方式解决：

###### 1、[Vue.set( target, key, value)](https://cn.vuejs.org/v2/api/#Vue-set) ，set方法有下面3个参数

- {Object | Array} target  -- 给谁设置值（对象，数组）都可以
- {string | number} key -- 给对象设值，key 就是对象的key，给数组设值，key 就是数组的下标 index
- {any} value -- 添加任何值都可以

###### 2、数组变异的方式

[push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)：将一个或多个元素添加到数组的末尾，并返回新数组的长度。
 [pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)：从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
 [shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)：从数组中删除第一个元素，并返回该元素的值。
 [unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)：将一个或多个元素添加到数组的开头，并返回新数组的长度。
 [splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)：通过删除现有元素和/或添加新元素来更改一个数组的内容。
 [sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)：用[就地（ in-place ）的算法](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability)对数组的元素进行排序，并返回数组。 sort 排序不一定是[稳定的](https://zh.wikipedia.org/wiki/排序算法#.E7.A9.A9.E5.AE.9A.E6.80.A7)。默认排序顺序是根据字符串Unicode码点。
 [reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)：将数组中元素的位置颠倒。

#### 六、Vue 组件

[Vue 组件基础](https://cn.vuejs.org/v2/guide/components.html)

> 组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。
>  注意：**组件没有 el 这样根实例特有的选项；而根实例没有 props 这个子组件特有的属性**

- Vue.component( 组件名 ,{ 选项 }) 全局注册



```jsx
// 全局注册组件的时候必须写在Vue实例创建之前
// 下面这几种方式是等价的
import Vue from 'vue'
var MyComponent = Vue.extend({
  template:"<h1>我是全局组件</h1>"
});
Vue.component("my-component",MyComponent);

// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })
```

- 通常情况下一个组件肯定是由很多html标签组成的，如果全部写在template 里会非常难看且没有语法高亮提示，有没有其他解决办法？还真有



```xml
// 一个定义模板的方式是在一个 <script> 元素中，并为其带上 text/x-template 的类型，然后通过一个 id 将模板引用过去。
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>

// 另一个定义模板的方式是在一个 <template> 元素中，通过一个 id 将模板引用过去；在单文件组件 .vue 当中，id可以省略；
<template id="hello-world-template">
  <p>Hello hello hello</p>
</template>

Vue.component("my-component",{
    template:"#hello-world-template"
});
```

- 引入外部单文件组件注册成全局组件



```jsx
// .vue 
// 在单文件组件中 template 标签下只能有一个根元素
// 如果硬要有多个根元素，你只能在多个根元素中添加 v-if、v-else-if、v-else 来判断什么时候用哪个根元素
<template>
  <div class="home">
    <p>{{getting}}</p>
  </div>
  <!-- <p>这样是不行的</p> -->
</template>
<script>
  export default {
    name: "home",  // 便于在vue-devtools 调试中提供更加友好的警告信息
    data: function () {
      return {
        getting: 'welcome'
      }
    }
  }
</script>
<style scoped>
// 局部css样式
</style>
```



```jsx
// main.js
import home from './components/home/home'
Vue.component('home',home);
```

- 局部注册组件



```jsx
// 每个vue 实例都会有一个 components 的选项，而组件是可复用的 Vue 实例，所以每个组件都有components 选项
// 引入外部文件注册成局部组件
import home from './components/home/home'
new Vue({
  el:"#app",
  components: {
    home, // 等价于home: home，ES6对象中属性的简洁表示，ES6(http://es6.ruanyifeng.com/#docs/object)
  }
});
```



```jsx
// 直接在components 选项中写，(不推荐这种用法)
new Vue({
  el:"#app",
  components: {
    loading: {
      data: function () {
        return {
          getting: 'welcome'
        }
      },
      components:{
       // 这里还可以嵌套局部组件... 
      }
    }
  }
});
```

- ###### 组件间的传值

[通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components-props.html)

- 注意：这种传值方式是[单向数据流](https://cn.vuejs.org/v2/guide/components-props.html#单向数据流)，不可逆。



```jsx
// HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。
// 这意味着当你使用 DOM 中的模板时，驼峰命名法的 prop 名需要使用其等价的 短横线分隔命名命名。
// 如果使用字符串模板，那么这个限制就不存在了。
Vue.component('my-component', {
  props: ['myTitle'],
  template: '<h3>{{ myTitle}}</h3>'
})

// HTML
<my-component my-title='hello world'></my-component>
```



```jsx
// 上述例子只是一个静态数据传输，如果你要动态传输数据，可以用 v-bind 绑定一个属性
// 也可以用v-bind 的缩写形式
<my-component v-bind:my-title='hello world'></my-component> 
```



```jsx
// 任何类型的值都可以传递给 prop，prop 允许很多个
// 如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind，如：
obj: {
  id: 1,
  title: 'Hello World'
}
<my-component v-bind='obj'></my-component>
// 等价于：
<my-component 
  v-bind:id='obj.id'
  v-bind:title='obj.title'
></my-component>
```

[Prop 还提供验证的方式指定传什么值](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)



```tsx
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组且一定会从一个工厂函数返回默认值
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

既然 prop 的单向的，那如果子组件向父组件传值怎么办？

- 子传父，使用 [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html) 的方式



```csharp
// 子组件,子组件可以通过$emit() 广播一个事件给父组件
// 命名的这个事件名没有限制，子组件与父组件的名字保持一致就可以了
<button v-on:click="$emit('broadcast')">向父组件广播这个事件</button>

// $emit() 这个方法也可以写在 子组件的 methods 里面
<button v-on:click="broadcast">向父组件广播这个事件</button>
methods: {
  broadcast(){
    this.$emit('broadcast')
    // 如果要传值，就使用$emit(事件名, 值) 的第二个参数
    this.$emit('broadcast', value)
  }
} 
```



```dart
// 在父组件中，父组件可以用 v-on 监听子组件触发的 `broadcast` 事件，类似监听Dom 事件一样的用法
<my-component v-on:broadcast='catchYou'></my-component>
methods: {
  catchYou(val){
    // 子组件传过来的值就会作为第一个参数传入这个方法 
    console.log(val)
  }
} 
// 在组件的表达式里面，你可以通过$event 访问到子组件传递过来的值
<my-component v-on:broadcast='$event'></my-component>
```

- 组件的一些其他用法，感兴趣可以去了解 [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)   [动态组件 & 异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)
- [单元素/组件的过渡](https://cn.vuejs.org/v2/guide/transitions.html#单元素-组件的过渡)

#### 七、vue-router

- 贴一段 app 构建的案例。官网API [点这里](https://router.vuejs.org/zh-cn/essentials/getting-started.html)



```xml
<!-- 这里我让 app.vue作为最大的渲染层，渲染tabs -->
<!-- 这里我模拟的是一个商场app，下面几个tab；点击`tab`直接渲染在`tabs`的<router-view></router-view>上 -->
<!-- tabs 之外的页面直接渲染在app.vue 的<router-view></router-view>上 -->
<!--  app.vue -->
<div id="app">
  <router-view></router-view>
</div>

<!-- tabs.vue -->
<div class="tabs">
  <router-view></router-view>
  <nav class="nav">
    <router-link class="nav-link" to="home">
      <i></i>
      <p>首页</p>
    </router-link>
  <nav>
</div>
```



```jsx
// 以下一些配置是简单要用到的，高级的用法请看官网
// router.js
import tabs from './components/tabs/tabs'
import home from './components/home/home'
const router =  new VueRouter({
  mode: 'history',  // 可选值: "hash" 、 "history" 、 "abstract" 
  linkActiveClass: 'active',  // 默认值: "router-link-active" 全局配置 <router-link> 的默认『激活 class 类名』
  routes: [
    {
      path: "/tabs",    // 指向的路径
      name: "tabs",   // 命名路由，可以通过这个名称跳转到这个组件
      component: tabs, // 指向路径加载的组件
      children: [  // 嵌套路由也有跟父级一样的选项
        {
          path:"home",
          name: "home",
          component: home, 
        }
      ]
    },
    {
      path: '/',
      redirect: '/tabs/home'   // 重定向，即无目标地址的时候转到这个路径
    }
  ]
});
export default router;
```



```jsx
// main.js
import router from './router.js'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```

- [router-link](https://router.vuejs.org/zh/api/#router-link) 的几种跳转方式



```xml
<!-- 字符串模式，可以说是静态模式，不用v-bind -->
<router-link to="home">Home</router-link>

<!-- 下面几种是动态模式 -->
<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 跳转到命名的路由 -->
<!-- 这里有需要注意的地方是，如果路由有传值，那这里的params 就不能省略-->
<router-link :to="{ name: 'user' , params: { userId }}">User</router-link>
```

- router 传值的几种方式
   **注意：如果提供了 path，params 会被忽略，取而代之的是提供路由的 name 或手写完整的带有参数的 path，同样的规则也适用于 router-link 组件的 to 属性**
- 另外的传参方式，有兴趣可以了解一下 [props](https://router.vuejs.org/zh/guide/essentials/passing-props.html#布尔模式)



```kotlin
// 在函数里面
this.$router.push({ name: 'user', params: { userId }})
this.$router.push({ path: `/user/${userId}` })  // `${ }` 是ES6 的模板字符串概念，标识符是 ` `
// 这里的 params 不生效
this.$router.push({ path: '/user', params: { userId }})
```



```xml
// router-link 传值
<router-link :to="{ name: 'user',params: { userId } }">User</router-link>
<router-link :to="{ path: `/user/${userId}` }">User</router-link>
// 这里的 params 不生效
<router-link :to="{ path: '/user', params: { userId }}">User</router-link>
```

- 目标组件取值
   **这里要很小心，是 `this.$route`，不是 `this.$router`，没有 r 的**



```csharp
// 使用这种方式获取路由传过来的值
this.$route.params.userId
```

- 路由的命名视图，这里贴的是官网的例子，官网API [点这里](https://router.vuejs.org/zh/guide/essentials/named-views.html#嵌套命名视图)



```xml
<!-- html -->
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```



```cpp
// js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: { // 这里的 `components` 要跟上面的 `component` 区分一下，有多个视图渲染的时候有 `s`，别漏了
        default: Foo,  // 这是默认指定的 Foo 这个组件，也就是在没有命名的<router-view>上渲染
        a: Bar,  // 这里一一对应有 name 属性的<router-view>就可以了
        b: Baz
      }
    }
  ]
})
```

- 几种导航的方法，官网 [点这里](https://router.vuejs.org/zh/guide/essentials/navigation.html)
   下面几种方法跟 window.history 的几种方法很像，其实就是仿照 [window.history](https://developer.mozilla.org/zh-CN/docs/Web/API/History)



```kotlin
// 往路由历史新增一条记录，相关参数参考官网
this.$router.push(location, onComplete?, onAbort?)

// 替换掉当前的记录
this.$router.replace(location, onComplete?, onAbort?)

// 在浏览器记录中前进一步，等同于 this.$router.forward()
this.$router.go(1)
this.$router.forward()

// 后退一步记录，等同于 this.$router.back()
this.$router.go(-1)
this.$router.back()

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

- 路由跳转的时候支持过度动效，感兴趣可以去玩一下，官网 [点这里](https://router.vuejs.org/zh/guide/advanced/transitions.html#单个路由的过渡) （还有其他更加高级的用法要靠自己去[查阅](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)了）

#### 八、axios

[axios 英文文档](https://www.npmjs.com/package/axios)
 [axios 中文文档 — 对英文文档的翻译](https://www.kancloud.cn/yunye/axios/234845)
 **axios 是基于 ES6 的 Promise 写的，具体可以看** [Promise 相关说明](http://es6.ruanyifeng.com/#docs/promise)



```cpp
// npm 安装
npm i axiso  // 等价于 npm install axios ，i 是 install 的简写 
```

**axios 的一些简单用法**



```jsx
// GET 请求
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求可以这样做
axios.get('/user', {
  params: {
    ID: 12345
  }
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
```



```jsx
// POST 请求
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```



```jsx
//  执行多个并发请求
function getUserAccount() {
  return axios.get('/user/12345');
}
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
// 这两个方法返回的都是 Promise 对象，这两个请求方法都成功返回的时候，下面方法才返回成功。
// 这两个方法中有一个返回不成功就算返回失败 
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

**通过向 `axios` 传递相关配置来创建请求**

- axios(config)



```kotlin
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

- axios(url[, config])



```csharp
// 发送 GET 请求（默认的方法）
axios('/user/12345');
```

**为方便，axios 还为支持的请求方法提供了别名，如：**
 *注意：在使用别名方法时， `url`、`method`、`data` 这些属性都不必在配置中指定。*

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

**处理并发请求的助手函数**

- axios.all(iterable)
- axios.spread(callback)

#### 九、生命周期 



![img](https://img2018.cnblogs.com/blog/756683/201907/756683-20190705142725424-609513468.png)

Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。通俗说就是 Vue 实例从创建到销毁的过程，就是生命周期。

1. beforecreate : 
   完成实例初始化，初始化非响应式变量
   this指向创建的实例；
   可以在这加个loading事件；
   data computed watch methods上的方法和数据均不能访问

2. created
   实例创建完成
   完成数据(data props computed)的初始化 导入依赖项。
   可访问data computed watch methods上的方法和数据
   未挂载DOM,不能访问$el,$ref为空数组
   可在这结束loading，还做一些初始化，实现函数自执行,
   可以对data数据进行操作，可进行一些请求，请求不易过多，避免白屏时间太长。
   若在此阶段进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中

3. berofeMount
   有了el,编译了template|/outerHTML
   能找到对应的template,并编译成render函数

4. mounted
   完成创建vm.$el，和双向绑定，
   完成挂载DOM 和渲染;可在mounted钩子对挂载的dom进行操作
   即有了DOM 且完成了双向绑定 可访问DOM节点,$ref
   可在这发起后端请求，拿回数据，配合路由钩子做一些事情；
   可对DOM 进行操作

5. beforeUpdate
   数据更新之前
   可在更新前访问现有的DOM,如手动移除添加的事件监听器；

6. updated :
   完成虚拟DOM的重新渲染和打补丁；
   组件DOM 已完成更新；
   可执行依赖的dom 操作
   注意：不要在此函数中操作数据，会陷入死循环的。

7. activated:
   在使用vue-router时有时需要使用<keep-alive></keep-alive>来缓存组件状态，这个时候created钩子就不会被重复调用了，
   如果我们的子组件需要在每次加载的时候进行某些操作，可以使用activated钩子触发

8. deactivated 
   for keep-alive 组件被移除时使用

9. beforeDestroy： 
   在执行app.$destroy()之前
   可做一些删除提示，如：你确认删除XX吗？ 
   可用于销毁定时器，解绑全局时间 销毁插件对象

10. destroyed ：

    ```
    当前组件已被删除，销毁监听事件 组件 事件 子实例也被销毁
    这时组件已经没有了，你无法操作里面的任何东西了。
    ```

**子父组件的生命周期**

- 仅当子组件完成挂载后，父组件才会挂载
- 当子组件完成挂载后，父组件会主动执行一次beforeUpdate/updated钩子函数（仅首次）
- 父子组件在data变化中是分别监控的，但是在更新props中的数据是关联的（可实践）
- 销毁父组件时，先将子组件销毁后才会销毁父组件
- 兄弟组件的初始化（mounted之前）分开进行，挂载是从上到下依次进行
- 当没有数据关联时，兄弟组件之间的更新和销毁是互不关联的
- mixin中的生命周期与引入该组件的生命周期是仅仅关联的，且mixin的生命周期优先执行





#### 十、vue api的使用

### Vue.use(plugins) 注册一个插件

例子：



```jsx
import Vue from 'vue'
import Router from 'vue-router'

// 不要忘了调用此方法
Vue.use(VueRouter)
```

------

### Vue.directive()创建或者获取自定义指令



```jsx
// 注册(指令函数)
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
```

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。
   钩子函数的参数 有( `el`、`binding`、`vnode` 和 `oldVnode`)。
   组件内局部添加：



```jsx
export default {
  name: 'FilterDemo',
  /* 局部指令 */
  directives:{
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {

    }
  }    
}
```

------

### Vue.filter() 注册或者获取全局的过滤器

用在v-bind或者{{}}插入值之后，用 `|`隔开
 参数：
 {string} id
 {Function} [definition]
 定义过滤器有两种方式，
 (1) 全局过滤器，我们可以直接在vue对象上使用filter方法注册过滤器，这种全局注册的过滤器在任何一个组件内都可以使用。
 (2)组件内部的过滤器，注册组件内部过滤器则只能在当前组件内使用，接下来我们使用这两种方式注册过滤器函数。
 例子：



```csharp
//全局过滤器
import Vue from 'vue';
Vue.filter('formatString', function (value) {
  var msg = value.length > 10 ? value.slice(0,3): value;
  return msg;
});
```



```csharp
//局部过滤器
export default {
  name: 'FilterDemo',
  /* 局部过滤器 */
  filters:{
    formatString: function(value){
      var msg = value.length > 10 ? value.slice(0,3): value;
      return msg;
    }
  },
  data () {
    return {

    }
  }    
}
```



```jsx
//使用
<template>
  <div id="app">
    {{msg | formatString}}
    {{student.name | formatString}}
    <ChildComponent v-bind:message="msg | formatString"></ChildComponent>
  </div>
</template>
```

------

### Vue.nextTick([callback,context]) 在DOM更新之后调用回调函数

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
 参数：
 {Function} [callback]
 {Object} [context]
 例子：



```jsx
//全局
Vue.nextTick(function () {
  // DOM 更新了
})；

//组件内部
export default {
  name: 'App',
  data(){
    return {
      msg: "启动测试页面啦啦啦",
      student: {
        name: 1,
        age: 2,
      }
    } 
  },
  mounted(){
    this.msg="已经更新完毕";
    //也可以在methods方法里面添加
    this.$nextTick(function(){
      console.log("nextTick操作")
    })
  }
```

------

### Vue.set(target, propertyName/index, value) 或者 this.$set(target, propertyName/index, value)

向响应式数据添加一个属性，并且保证该属性也是响应式的，且能够触发视图的更新。



```kotlin
export default {
  name: 'App',
  data(){
    return {
      msg: "启动测试页面啦啦啦",
      student: {
        name: 1,
        age: 2,
      }
    } 
  },
  mounted(){
    this.$set(this.student, "sex","女");
  }
}
```

------

### Vue.delete( target, propertyName/index )

删除一个对象的属性，如果属性是响应式的，确保删除属性并且更新视图

------

### Vue.mixin()

混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

------

### Vue.compile(template)

参数： template {string}
 在 render 函数中编译模板字符串。只在独立构建时有效

------

### Vue.observable( object )

让一个对象可响应。Vue 内部会用它来处理 `data` 函数返回的对象。

返回的对象可以直接用于[渲染函数](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Frender-function.html)和[计算属性](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fcomputed.html)内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：



```jsx
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

在 Vue 2.x 中，被传入的对象会直接被 `Vue.observable` 改变，所以如[这里展示的](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Finstance.html%23%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95)，它和被返回的对象是同一个对象。在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行修改仍然是不可响应的。因此，为了向前兼容，我们推荐始终操作使用 `Vue.observable` 返回的对象，而不是传入源对象。

