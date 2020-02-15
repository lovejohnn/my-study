//类 就是模板
class People{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    eat(){
        alert(`${this.name} eat something`)
    }
    speak(){
        alert(`${this.name},age${this.age}`)
    }
}
let zhang = new People('zhang',20)
zhang.eat()
zhang.speak()