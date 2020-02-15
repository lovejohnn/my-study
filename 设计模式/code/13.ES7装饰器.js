//一个简单的  demo  没有配置 es7环境
@testDec
class Demo {
    //...
}
function testDec(target) {
    target.isDec = true;
}
alert(Demo.isDec)  // true


//装饰器的原理
@decorator
class A { }

//等同于
class A { }
A = decorator(A) || A;



// mixins  可以传值的

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() {
        alert('foo')
    }
}
@mixins(Foo)
class MyClass {

}

let obj = new MyClass()
obj.foo()



