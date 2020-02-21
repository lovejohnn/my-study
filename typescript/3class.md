1. es5继承

2. ts继承

3. 类里面的修饰符

   ```
   public ：公有 在类里面、子类外面都可以访问到
   protected 保护类型 在类里面、子类里面都可以访问。在类外面都没法访问
   private 私有 在类里面可以访问，子类，类外部都没法访问
   属性如果不加修饰符 默认是公有
   ```

4. 静态属性  

   ```
   //es5
   function Person(){
   	
   }
   Person.name = 'nice';
   //ts
   static sex = '男'   //静态方法
   ```

   

5. 静态方法

   ```
   //es5
   function Person(){
   	
   }
   Person.say=function(){}
   
   //ts
   static print:void{
   	//静态方法里面不能直接调用 类里面的属性
   	//想要调用的属性的话。则为静态属性了
   }
   Person.print()
   ```

6. 多态： 父类定义一个方法不去实现，让继承他的子类去实现，每一个子类有不同的表现

   多态属性继承

   ```
   class Animal{
   	public name:string;
   	constructor(name:string){
   		this.name = name;
   	}
   	eat(){   //具体吃什么不知道，具体吃什么？继承他的子类去实现，每一个子类有不同的表现.    多态属于继承。重写方法。实现不同
   		console.log('吃的方法')
   	}
   }
   
   class Dog extends Animal{
   
   	constructor(name:string){
   		super(name);
   	}
   	eat(){
   		return this.name+'吃肉'
   	}
   }
   ```

7. 抽象类  抽象 方法 

   typescript 中的抽象类：他是提供其他类继承的积累，不能直接被实例化

   用abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

   ```
   abstract class Animal{
   	public name:string;
   	constructor(name:string){
   		this.name = name;
   	}
   	abstract eat():string;
   }
   
   class Dog extends Animal{
   	constructor(name:string){
   		super(name);
   	}
   	eat():string{       //必须要定义方法，且类型要一致
   		return 'string';   
   	}
   }
   ```

   

   