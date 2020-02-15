class SingleObject {
    login() {
        console.log('login...')
    }
}
/*
SingleObject.getInstance = (function () {  //自执行函数  且会执行一次
    let instance;  //初始化一个变量存储实例对象
    return function () {  //返回一个函数
        if (!instance) {  //如果没有实例，则初始化对象，赋值给变量
            instance = new SingleObject();
        }
        return instance;  //如果有实例，直接返回实例对象
    }
})()
// 测试这里 只能使用静态函数 getInstance 不能 new SingleObject()
let obj11 = SingleObject.getInstance();
obj11.login()
let obj2 = SingleObject.getInstance();
obj2.login()
console.log(obj11 === obj2) //两者必须完全相等

*/
let creator = (function () {  //自执行函数  且会执行一次
    let instance;  //初始化一个变量存储实例对象
    return function () {  //返回一个函数
        if (!instance) {  //如果没有实例，则初始化对象，赋值给变量
            instance = new SingleObject();
        }
        return instance;  //如果有实例，直接返回实例对象
    }
})()
let obj11 = creator();
obj11.login()
let obj2 = creator();
obj2.login()
console.log(obj11 === obj2) //两者必须完全相等

