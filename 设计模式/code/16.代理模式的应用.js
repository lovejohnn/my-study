// jQuery 中的 $.proxy
// ES6 Proxy

//明星
let star = {
    name: '邓XX',
    age: 23,
    phone: '1324554454'
}
//经纪人
let agent = new Proxy(star, {
    get: function (target, key) {
        if (key === 'phone') {
            //返回经纪人自己的手机号
            return '18633332222'
        }
        if (key === 'price') {
            //明星不报价,经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function (target, key, val) {
        if (key === 'customPrice') {
            if (val < 100000) {
                //最低10w
                throw new Error('价格太低')
            } else {
                target[key] = val
                return true;
            }
        }
    }
})