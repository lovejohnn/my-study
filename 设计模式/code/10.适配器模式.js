class Adaptee {
    specificRequest() {
        return '德国标准的插头'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()//初始化的时候就将旧接口类初始化了
    }
    request() {
        let info = this.adaptee.specificRequest(); //使用旧接口的函数
        return `${info}-> 转换器 -> 中国标准插头`
    }
}

//测试
let target = new Target()
let newInfo = target.request()
console.log( newInfo )
