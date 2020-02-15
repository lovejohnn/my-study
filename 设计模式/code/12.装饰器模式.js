class Circle {
    draw() {
        console.log('画一个圆形');
    }
}

class Decorator {
    constructor(circle) {  //可以将一个对象传入
        this.circle = circle;
    }
    draw() {   //重写 draw 并加入新功能
        this.circle.draw()
        this.setRedBorder(circle)
    }
    setRedBorder(circle) {
        console.log('设置红色边框')
    }
}

//测试
let circle = new Decorator(new Circle())
circle.draw()

let oldcircle = new Circle()
oldcircle.draw()