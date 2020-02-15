// 主题，保存状态，状态变化之后触发所有观察者对象
class Subject {
    constructor() {
        this.state = 0; //内部状态
        this.observers = []  //存放所有的  观察者
    }
    getState() {  //获取内部状态的方法
        return this.state;
    }
    setState(state) {  //设置内部状态的方法
        this.state = state;
        this.notifyAllObservers()  //触发所有的  观察者的 事件
    }
    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attach(observer) {   //添加观察者的方法
        this.observers.push(observer)
    }
}


//观察者
class Observer {
    constructor(name, subject) {
        this.name = name;  //观察者的名字
        this.subject = subject;   //绑定主题
        this.subject.attach(this)  //添加观察者
    }
    update() {  //观察者的 事件
        console.log(`${this.name} update, state:${this.subject.getState()}`)
    }
}

//测试
let s = new Subject();
let ol = new Observer('ol', s)
s.setState(1)
s.setState(10)