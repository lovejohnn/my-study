# **课程梳理**

## **课程总结**

 

### **MVC的总结**

\1. 后台项目继续优化-采用MVC分层思想

 

\2. 什么是MVC？为什么要使用MVC？

答：MVC 是一种分层的思想。

M：Model（模型）的简写，代表是对数据库的操作。

V：View（视图）的简写，用于做数据的展示和收集数据，说白了就是HTML网页

C：Controller（控制器）的简写，用于业务逻辑的判断（由控制器来决定是否需要模型的参与或者是否需要视图的参与）

俗话：一个将军两个小兵。

 

\3. 为什么要使用MVC？

答：使用MVC分层之后，各行其职，后期便于管理和维护，还便于团队协作，便于新功能的增加。增加一个新的功能

\1. 控制器

\2. 模型

\3. 视图

 

\4. MVC的命名的规则：

答： 

控制器命名： 业务逻辑（Member） + Controller + .js

模型命名： 业务逻辑（Member） + Model+ .js

 

\5. MVC 是一种开发思想，最先是在后端流行起来，慢慢引入前端，存在了前端MVC，不能照搬，形成 MVP---> MV*----->MVVM。

 

\6. 代码层面

(1) 实现文件夹的建立

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps1.jpg) 

(2) 上代码

① 路由

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps2.jpg) 

② 控制器

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps3.jpg) 

③ 模型

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps4.jpg) 

 

④ 视图

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps5.jpg) 

 

### **前端分离总结**

#### **为什么要前后端分离？**

答： 现在是移动互联网的时代，存在多终端，但是数据肯定的唯一。因此我们只需提供一套数据，其他的终端来请求我们的数据即可。

 

#### **如何实现前后端分离？**

答：通过 API接口 实现（API接口就是一个一个url地址，请求url地址的时候，会返回json格式的数据）

 

 

#### **如何写接口？**

答：就是在后端写代码，判断一下请求的参数、安全性处理，调用数据库里面的数据。返回进行返回。接口写好之后，写接口的文档。方便接口的调用方。

 

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps6.jpg) 

 

 

#### **前端开发**

\1. 前端编写静态网页

\2. 使用 ajax 发送网络请求（参考上面的 接口文档 ）

\3. 根据返回的数据做出业务判断

\4. 处理数据

\5. DOM操作放置在页面

 

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps7.jpg) 

 

#### **前端开发-跨域请求**

\1. 为什么会出现跨域请求？

答：主要的原因是很有可能接口的调用方和接口的提供方不再同一个域名下。这个时候出现跨域请求。

 

\2. 跨域请求带来的问题？

答：由于浏览器同源政策的影响，导致ajax请求回来的数据的被浏览器丢弃掉。

 

 

\3. 如何解决跨域带来的问题？

答： 

\1. jsonp（1. 只支持get请求 2. 需要服务器端支持）

\2. cors（服务器端设置响应头）

\3. 同域代理（ajax先请求自己域名下的一个服务器，然后自己的服务器向接口提供方法是网络获取数据，然后在返回）（nodejs 如何在服务器端发送请求 request 包可以实现。）

![img](file:///C:\Users\VULCAN\AppData\Local\Temp\ksohtml11812\wps8.jpg) 

 

 

 

 

 

 