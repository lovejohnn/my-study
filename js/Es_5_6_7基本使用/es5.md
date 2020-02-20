# Es5

## 1. 严格模式

> 1. 理解:
>
>   * 除了正常运行模式(混杂模式)，ES5添加了第二种运行模式："严格模式"（`strict mode`）。
>   * 顾名思义，这种模式使得Javascript在更严格的语法条件下运行
>
> 2.  目的/作用
>     * 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
>     * 消除代码运行的一些不安全之处，为代码的安全运行保驾护航
>     * 为未来新版本的Javascript做好铺垫
> 3.  使用
>
>   * 在全局或函数的第一条语句定义为: '`use strict`';
>   * 如果浏览器不支持, 只解析为一条简单的语句, 没有任何副作用
>
> 4. 语法和行为改变
>    * 必须用var声明变量
>    * 禁止自定义的函数中的this指向window
>    * 创建eval作用域
>    * 对象不能有重名的属性

## 2. JSON 对象

> 1. JSON.stringify(obj/arr)
>
>   * js对象(数组)转换为json对象(数组)
>
> 2. JSON.parse(json)
>
>   * json对象(数组)转换为js对象(数组)

## 3. Object 扩展

> ES5给Object扩展了一些静态方法, 常用的2个:
> 1. Object.create(prototype, [descriptors])
>   * 作用: 以指定对象为原型创建新的对象
>   * 为新的对象指定新的属性, 并对属性进行描述
>     - value : 指定值
>     - writable : 标识当前属性值是否是可修改的, 默认为false
>     - configurable: 标识当前属性是否可以被删除 默认为false
>     - enumerable： 标识当前属性是否能用for in 枚举 默认为false
> 2. Object.defineProperties(object, descriptors)
>   * 作用: 为指定对象定义扩展多个属性
>     * get ：用来获取当前属性值得回调函数
>     * set ：修改当前属性值得触发的回调函数，并且实参即为修改后的值
>    * 存取器属性：setter,getter一个用来存值，一个用来取值

>  对象本身的两个方法
>     * get propertyName(){} 用来得到当前属性值的回调函数
>         * set propertyName(){} 用来监视当前属性值变化的回调函数

## Array 扩展

> 1. Array.prototype.indexOf(value) : 得到值在数组中的第一个下标
> 2. Array.prototype.lastIndexOf(value) : 得到值在数组中的最后一个下标
> 3. Array.prototype.forEach(function(item, index){}) : 遍历数组
> 4. Array.prototype.map(function(item, index){}) : 遍历数组返回一个新的数组，返回加工之后的值
> 5. Array.prototype.filter(function(item, index){}) : 遍历过滤出一个新的子数组， 返回条件为true的值



## Function 扩展

> 1. Function.prototype.bind(obj) :
>   * 作用: 将函数内的this绑定为obj, 并将函数返回
> 2. 面试题: 区别bind()与call()和apply()?
>   * 都能指定函数中的this
>   * call()/apply()是立即调用函数
>   * bind()是将函数返回