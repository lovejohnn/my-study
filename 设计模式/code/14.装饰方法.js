//装饰方法
function readonly(target, name, descriptor) {
    //descriptor 属性描述对象 Object.defineProperty 中会用到
    /*
    {
        value: specifiedFunction,
        enumerable:false,
        configurable:true,
        writable:true
    }
    */
    descriptor.writable = false;
    return descriptor;
}

class Person {
    constructor() {
        this.first = "A";
        this.last = "B";
    }
    //装饰方法
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}


var p = new Person()
console.log(p.name)  //报错，name 已成为 只读属性

//////////////////////////////////////////////////////


function log(target, name, descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function () {
        console.log(`Calling ${name} with`, arguments);
        return oldValue.apply(this.arguments);
    }
    return descriptor;
}
//
class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

const math = new Math();
const result = math.add(2, 4) //执行add时会自动打印日志
console.log('result', result);