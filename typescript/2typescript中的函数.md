1. 申明函数的返回值参数类型    没有返回值的类型  :void

2. 定义方法传参类型

3. 方法可选参数

   ```
   function getInfo(name:string,age?:number):string{   	//age?:number可选参数，且需要配置到参数列表最后
   	return `${name}+${age}`;
   }
   ```

4. 默认参数

   ```
   function getInfo(name:string,age?:number=20):string{   	//age?number=20这里有默认参数
   	return `${name}+${age}`;
   }
   ```

5. 剩余参数

   ```
   function getAdd(a:number,b:number,c:number):number{   	
   	return a+b+c;
   }
   getAdd(1,2,3)
   function getAdd(a:number,b:number,...result:number[]):number{  
   	let sum = a+b;
   	for(let i=0,length=result.length;i<length;i++){
   		sum +=result[i];
   	}
   	return sum;
   }
   ```

6. ts中的函数重载

   ```
   java中方法的重载：重载值得是两个或者两个以上的同名函数，但是他们的参数不一样，这时会出现重载的情况，
   typescritp中的重载：通过为同一个函数提供多个函数类型定义类试下多种功能的目的
   ts 为了兼容es5 es6跟java重载的写法有区别
   function getInfo(number: string): string;
   function getInfo(age: number):number;
   function getInfo(str:any):any{
       if(typeof str === "string"){
           //这里就是第一个函数内部执行的东西。
           //这里根据参数走第一个函数，所以返回值是 string
           return typeof str;   //string
       }else{
           return typeof str;  //number
       }
   }
   
   function getInfo(name: string): string;
   function getInfo(name: string, age: number): string;
   function getInfo(name: any, age?: any): any {
       if (age) {
           //这里就是第一个函数内部执行的东西。
           //这里根据参数走第一个函数，所以返回值是 string
           return `名字${name}和年龄${age}`;
       } else {
           return `只有姓名${name}`;
       }
   }
   ```

   