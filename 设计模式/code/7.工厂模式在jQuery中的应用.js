class jQuery {
    constructor(selector) {  //传入 选择的 dom 元素
        let slice = Array.prototype.slice;  //获取到数组的 slice 方法
        let dom = slice.call(document.querySelectorAll(selector)); //将伪数组 转换为数组
        let len = dom ? dom.length : 0;  //如果有dom元素的话，获取其数组长度，没有的话为0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]    //遍历dom数组，将其依次绑定到实例对象上
        }
        this.length = len  //设置实例对象的length
        this.selector = selector || ''
    }
    append(node) {
        //对象可调用的方法
        console.log('append 方法 已经调用')
    }
    addClass(name) {
       
    }
    html(data) {

    }
}

window.$ = function (selector) {
    return new jQuery(selector)
}