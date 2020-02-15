//自己封装的 ajax ，使用方式如下
/*
ajax({
    url:'/getData',
    type:'Post',
    dataType:'json',
    data:{
        id:"123"
    }
}).done(function(){})
*/

//但因为历史原因，代码中全部都是
// $.ajax({....})


//做一层适配器
var $ = {
    ajax: function (options) {
        return this.ajax(options);
    }
}