### state props

1. 组件的state, 每个组件维护的状态。
2. 组件要接收的外部数据,比如 ajax 传入的数据
3. 组件的 props 接收的参数.

```
ShopCar
ShopRow
TotalBlaock
1. ShopRow 和 TotalBloack 的状态提升到ShopCar ,这两个组件需要的信息由 ShopCar来提供。也就是 props 接收 ShopCar 的数据
1. 他内部的 选中状态怎么搞？
ShopRow 所需要的属性和功能
ShopRow
1. img 商品图片 总价 等等
2. isChecked 商品选中状态  实现功能，由父组件传递过来这个函数，由子组件去执行，由父组件自己改变自己的状态。
3. handleCheck 改变商品选中状态的行为
4. handleCountChange 改变商品数量的行为  都交给父组件来干即可，也是父组件状态的改变


ShopCar 
需要给子组件提供信息，需要商品信息数组状态，全选状态，总价状态


ShopCar为ShopRow和TotalBlock提供商品的信息,于是得到以下状态和功能:
状态:
1. shopCarList: this.props.shopCarList //获取商品信息
2. isCheckedAll: false //全选状态,默认为false
3. totalPrice: 0 //商品总价状态,默认为0

功能:
1. handleCheckAll: 处理全选
2. handleCheck: 处理每一项商品的选中状态
3. handleCountChange: 处理每一项商品的数量改变
4. handleTotalPrice: 处理总价计算
5. handleHaveCheck: 判断是否有商品选中
6. handleRemove: 处理商品移除
7. handleBuy: 处理购买
```

