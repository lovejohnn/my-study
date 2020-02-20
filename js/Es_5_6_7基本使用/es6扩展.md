# Es6 扩展

## 字符串扩展

> 1. includes(str) : 判断是否包含指定的字符串
> 2. startsWith(str) : 判断是否以指定字符串开头
> 3. endsWith(str) : 判断是否以指定字符串结尾
> 4. repeat(count) : 重复指定次数

## 数值扩展

> 1. 二进制与八进制数值表示法: 二进制用0b, 八进制用0o
> 2. Number.isFinite(i) : 判断是否是有限大的数
> 3. Number.isNaN(i) : 判断是否是NaN
> 4. Number.isInteger(i) : 判断是否是整数
> 5. Number.parseInt(str) : 将字符串转换为对应的数值
> 6. Math.trunc(i) : 直接去除小数部分

## 数组扩展

> 1. Array.from(v) : 将伪数组对象或可遍历对象转换为真数组
> 2. Array.of(v1, v2, v3) : 将一系列值转换成数组
> 3. find(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素
> 4. findIndex(function(value, index, arr){return true}) : 找出第一个满足条件返回true的元素下标

## 对象扩展

> 1. Object.is(v1, v2)
>   * 判断2个数据是否完全相等
> 2. Object.assign(target, source1, source2..)
>   * 将源对象的属性复制到目标对象上
> 3. 直接操作 __proto__ 属性
>     let obj2 = {};
>     obj2.__proto__ = obj1;

## 对象的深度克隆

>   1、数据类型：
>     * 数据分为基本的数据类型(String, Number, boolean, Null, Undefined)和对象数据类型
>     - 基本数据类型：
>       特点： 存储的是该对象的实际数据
>         - 对象数据类型：
>       特点： 存储的是该对象在栈中引用，真实的数据存放在堆内存里
>       2、复制数据
>             - 基本数据类型存放的就是实际的数据，可直接复制
>       let number2 = 2;
>       let number1 = number2;
>                 - 克隆数据：对象/数组
>       1、区别： 浅拷贝/深度拷贝
>                   判断： 拷贝是否产生了新的数据还是拷贝的是数据的引用
>                   知识点：对象数据存放的是对象在栈内存的引用，直接复制的是对象的引用
>                   let obj = {username: 'kobe'}
>                   let obj1 = obj; // obj1 复制了obj在栈内存的引用
>       2、常用的拷贝技术
>               1). arr.concat(): 数组浅拷贝
>               2). arr.slice(): 数组浅拷贝
>               3). JSON.parse(JSON.stringify(arr/obj)): 数组或对象深拷贝, 但不能处理函数数据
>               4). 浅拷贝包含函数数据的对象/数组
>               5). 深拷贝包含函数数据的对象/数组

## Set和Map数据结构

> 1. Set容器 : 无序不可重复的多个value的集合体
>   * Set()
>   * Set(array)
>   * add(value)
>   * delete(value)
>   * has(value)
>   * clear()
>   * size
> 2. Map容器 : 无序的 key不重复的多个key-value的集合体
>   * Map()
>   * Map(array)
>   * set(key, value)//添加
>   * get(key)
>   * delete(key)
>   * has(key)
>   * clear()
>   * size

## for_of循环

> for(let value of target){}循环遍历
>   1. 遍历数组
>   2. 遍历Set
>   3. 遍历Map
>   4. 遍历字符串
>   5. 遍历伪数组