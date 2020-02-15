
// 父类  ts 代码
class Person {
    public name;
    public age;
    protected weight; //定义protected 属性
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.weight = 100
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`My name is ${this.name}, age${this.age}`)
    }
}

// 子类 
class BadPerson extends Person{
    public number;
    private girlfriend; //定义 private 属性
    constructor(name,age,number){
        super(name,age);
        this.number = number;
        this.girlfriend = 'xiaohon';
    }
    study(){
        alert(`${this.name} study`)
    }
    getWeight(){
        alert(`${this.weight}`)
    }
}

//实例
let xiaoqiang = new BadPerson('xiaoqiang',20,'DDD')
//console.log(xiaoqiang.girlfriend); //报错 private 仅仅对自己开放
xiaoqiang.getWeight(); //获取的是父类中实例属性 protected 的weight可以访问到