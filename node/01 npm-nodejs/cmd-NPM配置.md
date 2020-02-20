## 初识Nodejs


浏览器 | 内核    
-------|---------
IE     | Trident 
FireFox| Gecko   
Chrome | WebKit  
Safari | WebKit  
Opera  | Presto  
Edge   | Chakra  

## Node.js的诞生
![image](img/2.png)

- 作者Ryan Dahl 瑞恩·达尔
    + 2004 纽约 读数学博士 
    + 2006 退学到智利 转向开发 
    + 2009.5对外宣布node项目，年底js大会发表演讲 
    + 2010 加入Joyent云计算公司 
    + 2012 退居幕后

> Node.js 是一种建立在Google Chrome’s v8 engine上的 non-blocking (非阻塞）, event-driven （基于事件的） I/O平台. 
Node.js平台使用的开发语言是JavaScript，平台提供了操作系统低层的API，方便做服务器端编程，具体包括文件操作、进程操作、通信操作等系统模块

## Node.js可以用来做什么？

- 具有复杂逻辑的动态网站 
- WebSocket服务器 
- 命令行工具 
- 带有图形界面的本地应用程序 
- ......
### cmd 管理员权限  ctrl + shilf + enter
## 终端基本使用
### 常见端口
 注意：端口的数字0-65535 但是需要注意：1024以下的端口不建议使用。
  这些端口一般被其他的 软件已经默认使用了。
 例如 apache |nginx 80 mysql： 3306
 mongod 27017 redis 6379
 sshd 22
 ftpd 21
 https 443
### windows 下的基本的命令

1. 如何开始一个黑窗口（DOS） 命令行窗口，有的人也管叫做 shell（壳，人机交互的接口）
	1. CLI（command line interface） 命令行的交互  命令行shell
	2. GUI (graph user interface ) 图形化的交互 桌面shell （底层还是调用的 CLI）

2. 打开一个黑窗口
	1. window + r 键--》 cmd
	2. Windows10 搜索 windows + s 输入关键字 cmd
	3. windows + x 键 可以打开一个 powershell（Windows10 一个加强版的 CLI）
    4. window + r 键-->> cmd + ctrl + shift + enter 为管理员权限
    5. 在路径中输入 cmd + 回车 也可以在那个路径开启黑窗口
### 打开应用
- notepad 打开记事本
- mspaint 打开画图
- calc 打开计算机
- write 写字板
- sysdm.cpl 打开环境变量设置窗口
- services.msc  监听服务
- ipconfig	查看 本机的IP地址
- ping命令
### 常用命令
- md 创建目录
- rmdir(rd) 删除目录，目录内没有文档。
- echo on a.txt 创建空文件
- del 删除文件
- rm 文件名 删除文件
- cat 文件名 查看文件内容
- cat > 文件名 向文件中写上内容。
- ipconfig/all 查看ip地址
- cd 切换目录 . 当前 .. 返回上层.

- tab补齐
### Linux 
- pwd 打印当前的工作目录（当前所处的位置）
- ls 列出文件信息（等同 windows的 dir 命令） list
- mkdir xxx文件夹 创建目录
- touch xxx文件名 创建文件.
- cat xxx文件名 查看文件内容
- echo "内容" > 文件名 往文件里面加东西(覆盖式)
- echo "内容" >> 文件名 追加
## Node.js开发环境准备

1. 普通安装方式[官方网站](https://nodejs.org/zh-cn/)

2. 多版本安装方式
    - 卸载已有的Node.js
    - 下载[nvm](https://github.com/coreybutler/nvm-windows)
    - 在C盘创建目录dev
    - 在dev目中中创建两个子目录nvm和nodejs
    - 并且把nvm包解压进去nvm目录中
    - 在install.cmd文件上面右键选择【以管理员身份运行】
    - 打开的cmd窗口直接回车会生成一个settings.txt文件，修改文件中配置信息
    - 配置nvm和Node.js环境变量
        + NVM_HOME:C:\dev\nvm
        + NVM_SYMLINK:C:\dev\nodejs
    - 把配置好的两个环境变量加到Path中   %NVM_HOME%；   %NVM_SYMLINK%;
    - .vbs扩充脚本 vbs.reg
    > Windows Registry Editor Version 5.00
    [HKEY_CLASSES_ROOT\.VBS]
    @="VBSFile"
    [HKEY_CLASSES_ROOT\.VBS\PersistentHandler]
    @="{5e941d80-bf96-11cd-b579-08002b30bfeb}"

## nvm常用的命令
- nvm list 查看当前安装的Node.js所有版本
- nvm install 版本号 安装指定版本的Node.js
- nvm uninstall 版本号 卸载指定版本的Node.js
- nvm use 版本号 选择指定版本的Node.js
- nvm install latest 安装最新的Node

## NPM常用命令
[配置link](https://blog.csdn.net/jianleking/article/details/79130667)
npm config ls
npm config ls -l
清除缓存数据
npm cache verify
如报错 -4048 时使用

### 淘宝 NPM 镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

### 配置npm相关环境 （全局安装）
默认路径 C:\Users\VULCAN\AppData\Roaming\npm\
我们要先配置npm的全局模块的存放路径以及cache的路径，例如我希望将以上两个文件夹放在NodeJS的主目录下，便在NodeJs下新建"node_global"及"node_cache"两个文件夹

启动cmd，输入：(设置全局安装路径和缓存路径)

npm config set cache "D:\Program Files\Nodejs\node_global"
npm config set prefix "D:\Program Files\Nodejs\node_cache"
### 查看全局安装是否更改成功
命令运行完后，可打开 “C:\Users\Administrator.CN-20151209RINA\.npmrc” 文件查看，文件是否更改成功，右键用记事本打开文件

所以，其实修改路径除了cmd命令，也可以直接修改 .npmrc 文件，添加以下两行，路径更换为自己的目录
prefix=D:\Program Files\Nodejs\node_global
cache=D:\Program Files\Nodejs\node_cache
### 删除NPM全局路径配置
方法是删除 “C:\Users\VULCAN\.npmrc” 这个文件。如果.npmrc不在这个目录下，就全局搜一下


## Node.js之HelloWorld
- 命令行方式REPL
    命令行的交互式环境REPL
- 运行文件方式
- 全局对象概览
var exports = module.exports;
## 服务器端模块化
- 服务器端模块化规范CommonJS与实现Node.js
- 模块导出与引入
- 模块导出机制分析
- 模块加载规则
    + 模块查找 不加扩展名的时候会按照如下后缀顺序进行查找 .js .json .node

### MongoDB 命令

- 安装mongod软件 

- 创建 mongosever文件夹 子目录 config log db

- 设定服务端配置启动 输入命令行 --dbpath --logpath
- mongod.exe --dbpath D:\seversoft\mongodbsever\db --logpath D:\seversoft\mongodbsever\log\mongo.txt

- 配置window服务
1.  编写 config/mongod.conf

如下
systemLog:
    destination: file
    path: D:\seversoft\mongodbsever\log\mongo.txt
storage:
    dbPath:  D:\seversoft\mongodbsever\db
2. --install配置指令
 mongod.exe --config D:\seversoft\mongodbsever\config\mongod.conf --install

服务端指令
- start mongo 启动 mongo
- net start mongodb 启动服务
- net stop mongodb 关闭服务
- mongod.exe --remove 移出服务。

- 查看端口服务  netstat -anb | findstr 27017

- 本身没有设置环境变量时，不能直接在win+R cmd里输入指令 mongo/mongod c/s

- 客户端指令
    show dbs 显示数据库列表
    use students
    db.stu.insert({name:'aaa'})
    db.stu.find();
    db.stu.find({name : 'aaa' });
- mongodb port=27017
- 查看所有端口服务 netstat -anb



#### 使用 skip() 与 limit() 实现分页

思考实现分页需要哪些数据：

1. pageNum 当前第几页 1
2. pageSize 每页显示多少条 10
3. totalSize 一共有多少条数据
4. totalPage 一共有几页

第一页： db.xxx.find().skip(0).limit(10)
第二页： db.xxx.find().skip(10).limit(10)
第三页： db.xxx.find().skip(20).limit(10)
第四页： db.xxx.find().skip(30).limit(10)

