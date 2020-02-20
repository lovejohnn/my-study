### React 应用程序的组成部分：元素和组

虚拟dom元素结构 type:Object

React.createElement()创建的元素

```
Object$$typeof: 
Symbol(react.element)
key: null
props: children: "jsx的p中定义的文字"id: "one"
__proto__: Object
ref: null
type: "p"
_owner: null
_store: {validated: true}
_self: null
_source: {fileName: "D:\ABOOK\Code\blackcode\01react-start\onereact\src\App.jsx", lineNumber: 5}
__proto__: Object
```

这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。





JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。