### vue中 keep-alive 的使用

#### 问题描述

> 在业务开发中，会有路由跳转但是返回需要保留数据的场景；vue 中提供了 keep-alive 来处理

#### 解决方案

返回dom不让其重新刷新，在vue-view外面包一层,
当引入keep-alive的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
事件挂载的方法等，只执行一次的放在 mounted 中；组件每次进去执行的方法放在 activated 中；
可以将 是否包裹 keep-alive 通过参数配置；

```
<keep-alive>
    <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
//不需要刷新的路由配置里面配置 meta: {keepAlive: true}, 这个路由则显示在上面标签；
//需要刷新的路由配置里面配置 meta: {keepAlive: false}, 这个路由则显示在下面标签；
```

## 解决vue单页使用keep-alive页面返回不刷新的问题

使用vue单页开发项目时遇到一个很恶心的问题：在列表页点击一条数据进入详情页，按返回键返回列表页时页面刷新了，用户体验非常差啊！！！查阅了一下相关问题，使用<keep-alive>解决这个问题，下面是我的使用心得。

<keep-alive>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。

首先在App.vue页面上有下面一段代码，我们都知道这是页面渲染的地方

```
<router-view></router-view>
```

**把这段代码改成如下：**

```
<keep-alive> 
<router-view v-if="$route.meta.keepAlive"></router-view> 
</keep-alive> 
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

我们能看到这段代码做的逻辑判断，当路由的meta属性的keepAlive属性值为true时页面的状态保存，其他情况下不保存状态。

然后就是给我们路由设置keepAlive属性值，比如我是给主页（列表页）的路由设置了keepAlive属性为true。

```
{ 
name: 'index', 
path: '/index', 
title: '主页', 
component(resolve) { 
require(['views/index.vue'], resolve) 
}, 
meta: { 
pageTitle: '主页', 
keepAlive: true 
} 
}
```



这样设置了之后，主页的状态就会保存，返回键返回到主页时页面不会刷新请求数据了。

但是有问题啊！！！从主页跳到任何页面，再返回主页都不会刷新页面！这并不是我想要的，我只要从详情页返回列表页时不刷新页面，其他情况下是需要刷新的，那么我就需要定制化处理了。大致思路就是从主页跳转到其他页面时把主页的keepAlive值设置为false，从详情页返回主页时把主页的keepAlive值设置为true就好了，代码如下：

主页跳转到其他页面时把主页的keepAlive值设置为false

```
export default {
 data() {
 return {
 };
 },
 mounted() {
 },
 methods: {
 },
 //修改列表页的meta值，false时再次进入页面会重新请求数据。
 beforeRouteLeave(to, from, next) {
 from.meta.keepAlive = false;
 next();
 }
};
```



从详情页返回主页时把主页的keepAlive值设置为true（要做个判断，判断是不是返回到主页的）

```
export default {
 data() {
 return {
 };
 },
 mounted() {
 },
 methods: {
 },
 beforeRouteLeave(to, from, next) {
 if (to.path == "/index") {
 to.meta.keepAlive = true;
 } else {
 to.meta.keepAlive = false;
 }
 next();
 }
};
```

这里使用了beforeRouterLeave(to,from,next){}，它是methods平级的，具体使用方法可以查阅一下。



**注意问题：**

beforeRouterLeave必须写在有配置路由的页面上才有效的，最开始我想写在App.vue页面上，发现根本就不执行的！

## vue中keep-alive缓存滚动条

前言
这几天公司在做一个app，需要嵌套H5页面，于是H5页面的编写就落到了本人的手里，啥都不说just do it 别逼逼！
项目过程中因为做的页面是列表页和详情页，为了接近原生和用户体验好，所以在列表和详情路由切换时候就要缓存列表页数据（路由跳转就是 列表➡详情返回到➡列表），使用户体验更好
怎么实现
keep-alive

第一步，在路由元信息里配置需要缓存的页面，我用的keepAlive表示，名字随便起，只要和后面的一致即可

```
// 长期课程
  {
    path: '/perennialClass',
    name: 'perennialClass',
    component: resolve => require(['@/view/course/perennial-class'], resolve),
    meta: {
      title: "长期课程",
      keepAlive: true
    }
  },
  // 短期课程
  {
    path: '/shortPeriodClass',
    name: 'shortPeriodClass',
    component: resolve => require(['@/view/course/short-period-class'], resolve),
    meta: {
      title: "短期课程",
      keepAlive: true
    }
  },
  // 课程详情
  {
    path: '/courseDetails',
    name: 'courseDetails',
    component: resolve => require(['@/view/course/course-details'], resolve),
    meta: {
      title: "课程详情",
      keepAlive: false
    }
  },
```

**第二步，在app.vue中给添加`<keep-alive></keep-alive>`   `<Router-view v-if="$route.meta.keepAlive"/>`，这里是需要缓存的路由，另一个是不需要缓存的**

```
<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
```

*到此就实现了页面的缓存，本来第一天写完下班时候测试的是可以的，第二天上班发现滚动条位置没有缓存，**还有一点就是当列表页滚动一定距离以后，进入详情页，详情页也会滚动一定距离**，于是乎又寻找其他解方案*

2个问题需要解决

滚动条位置需要记录
进入详情页的时候页面需要滚动到顶部
解决思路

针对第一点，我们要在列表页跳入详情页之前记录下当前滚动条位置，等到由详情页返回列表页以后，把刚才记录的滚动条位置恢复。
针对第二点，在进入详情页时候scrollTop(0);
首先实现记录滚动条位置，我使用vuex记录
在main.js中

```
import store from './store'

// 结合keep-alive 实现记录列表页滚动条位置
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // 要离开页面如果设置为需要缓存，则本页是要记住上滚动高度到vuex中，以便下次进来恢复高度
  if (from.meta.keepAlive == true) {
    store.commit('recordScroll', document.documentElement.scrollTop || document.body.scrollTop); // document.body.scrollTop一定要加不然iOS上会失效，本人亲测，踩坑
  }
  next()
})
router.afterEach((to, from) => {
  // 如果进入后的页面不想需要缓存，则设置scrollTop = 0
  if (to.meta.keepAlive == false) {
    console.log("不需要缓存");
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; // document.body.scrollTop一定要加不然iOS上会失效，本人亲测，踩坑
    }, 10)
  } else {
    console.log("需要缓存" + store.state.scrollTop);
    setTimeout(() => {
      document.documentElement.scrollTop = store.state.scrollTop;
      document.body.scrollTop = store.state.scrollTop; // document.body.scrollTop一定要加不然iOS上会失效，本人亲测，踩坑
    }, 50)
  }
})
```

*vuex代码，在store中*

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scrollTop: 0
  },
  mutations: {
    recordScroll(state, n) {
      state.scrollTop = n
    }
  },
  actions: {

  }
})
```



## vue使用keep-alive保持滚动条位置的实现方法

下班前，20分钟，发一篇。。。
简单介绍，使用keep-alive的时候，返回前一页，没有保持滚动条位置。
事实上，就算不使用keep-alive，位置也没有被记录。
但是，在不使用keep-alive的时候，页面内容会刷新，所以就随他去了……就是这么任性……

## 思路

官方有推荐一个scrollBehavior，[链接](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)，但是上面标注，只在`history.pushState`的浏览器生效，不知道是不是只能开启`history.pushState`才可以使用，看了下实现，挺不友好的，还是自己搞一个吧。。。

实现思路是这样的，首先给路由增加一个对象meta：

```
meta: {
    keepAlive: true,
    scrollTop: 0,
}
```

keepAlive是否需要保持页面，scrollTop记录页面的滚动位置。
然后在app.vue增加如下入口：

```
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

这样就启用keep-alive了。
然后在全局main.ts增加一个全局路由控制：

```
router.beforeEach((to: Route, from: Route, next: () => void) => {    
    if (from.meta.keepAlive) {
    const $content = document.querySelector('#content');
    const scrollTop = $content ? $content.scrollTop : 0;
    from.meta.scrollTop = scrollTop;
  }
  next();
});
```

很简单，离开的时候判断当前页是否需要保持页面，如果需要，记录页面主容器content的滚动位置，写入路由。
然后，每次进入保持好的页面，读取滚动条位置scrollTop，修改主容器的scrollTop，就搞定了：

```
public activated() {
    const scrollTop = this.$route.meta.scrollTop;
    const $content = document.querySelector('#content');
    if (scrollTop && $content) {
      $content.scrollTop = scrollTop;
    }
}
```

看起来很简单哦。

## 遗留问题

1、是不是每个页面都可以记录滚动条位置呢？

```
其实不是的，有的页面，内部有js交互，比如tab交互，不同的tab，页面可滚动的高度不一致，如果不保持页面状态而统一记录滚动位置，有可能导致滚动条的位置错位。
```

2、能不能把activated这一步写到全局的main.ts或者state去呢？

```
有想过这点，但是目前来说，没找到实现的方法。
首先，如果通过router来控制，做不到，全局路由控制只能在页面加载前监听，取不到载入页的元素。
如果写在一个通用的全局函数去控制，比如定义一个state，当页面加载完的时候设置，那需要定义一个mixins来处理，但是对这个mixins不太熟悉，暂时还不知道该怎么做，可能有时间找个方法搞定它。
```

没有啦……

## 后记

今天抽时间看了下官方的`scrollBehavior`，其实还是很简单的，但是我用不上，，，
原因是官方使用的滚动条，针对的是元素是`#app`，但是很遗憾，我的页面布局决定了，我的滚动条应该给`#content`元素。

```
<div id="app">
  <div class="wrap">
    <div id="header">
    <div id="content">
    <div id="footer">
    ...
```

所以`scrollBehavior`只能否决了。
回到mixins，今天也尝试了一下，但是VSC提示我，在`mixin`中的`activated`方法找不到`this.$route`这个属性：

```
类型“VueConstructor<Vue> | ComponentOptions<Vue, DefaultData<Vue>, DefaultMethods<Vue>, DefaultComputed, PropsDefinition<Record<string, any>>, Record<string, any>>”上不存在属性“$route”。
  类型“VueConstructor<Vue>”上不存在属性“$route”。
```

当然，就算提示找不到`$route`，实际上还是找到了的。
但是这里又有一个问题，`mixin`会在当前页每一个组件中都执行一次，在N个组件中会对滚动条操作N次，感觉有点冗赘，不太喜欢。
暂时找不到更好的实现方式了，只能在需要记录的页面单独实现`activated`...

## 搞定

下班前，总算搞定了。不废话，上代码：
自定义一个mixins：

```
//mixin.ts
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class MyMixin extends Vue {
  public activated() {
    const scrollTop = this.$route.meta.scrollTop;
    const $content = document.querySelector('#content');
    if (scrollTop && $content) {
      $content.scrollTop = scrollTop;
    }
  }
}
```

在需要记录scrollTop的页面引入这个mixins：

```
// home.vue
import { Component, Mixins } from 'vue-property-decorator';
import MyMixin from '@/global/mixin';

@Component
export default class Home extends Mixins(MyMixin) {
  // todo ...
}
```

关键在于`Mixins`，在没有使用`Mixins`之前，我们引入的是`Vue`，组件继承的也是`Vue`，现在引入`Mixins`，组件直接继承`Mixins`，然后把我们自定义的`mixins`传递进去，就可以在本页挂载自定义的`Mixins`了。
这么处理，基本完成了记录滚动条的功能，OK～