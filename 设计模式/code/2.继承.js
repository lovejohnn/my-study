//父类
class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        alert(`${this.name} eat something`)
    }
    speak() {
        alert(`${this.name},age${this.age}`)
    }
}
//子类继承父类
class Student extends People {
    constructor(name, age, number) {
        super(name, age);
        this.number = number;
    }
    study() {
        alert(`${this.name} study`)
    }
}
//实例
let ming = new Student('ming', 20, 'AAA')
ming.study()
console.log(ming.number)
ming.eat()