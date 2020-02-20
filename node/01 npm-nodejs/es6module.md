###  module引入文件的特点

1. 只能在服务器环境下

2. 谷歌支持，其他浏览器不支持。脚手架处理就ok

3. 配合 import导入  exprot导出

4. import 命令具有提示效果

5.  export可以导出内容,导出的内容在import中可以接收到

6. 语法 

   ```
   import {  } from "module";
       基本使用  import "url";
           import "./a.js";
           a();  //不能直接用，需import导入 导出的内容
   ```

   谷歌报错 时 更改配置文件  chrome://flags/

7. 指定引入的 变量，函数名，类名，需与导出的一致
           import {a,b,c} from "./a.js";
            a();
            console.log(b);

```
2 4. 模块的整体加载*  除了指定加载某个输出值，还可以使用整体加载，即用星号(*)指定一个对象，所有输出值都加载在这个对象上面。
    /import * as other from "./a.js";
     //使用时要加上自己定义的别名
     other.a();
     console.log(other.b);

3 as 改名
     import { v1 as simple,moudelV2 as v2} from "./a.js";
     //不使用改名的值呢？ //会报错
     //console.log(v1);
     console.log(simple);
     console.log(v2);

4 import 命令具有提升效果
         console.log(simple);
          console.log(v2);
     import { v1 as simple,moudelV2 as v2} from "./a.js";
        
5 export语句输出的接口，与其对应的值是动态绑定关系(引入类型)，即通过该接口，可以取到模块内部实时的值。
          console.log(foo);
     import {foo} from "./a.js";

6. export default命令
    1只能使用一次。输出一个默认方法。
    2 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
    匿名函数的 moudel可以直接起名字
     import niming from "./a.js";
     niming();
```