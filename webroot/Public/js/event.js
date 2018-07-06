/**
 * 提供消息订阅功能
 * @type {{list: Array, listen: event.listen, trigger: event.trigger}}
 */
var event = {
    list: [],
    //订阅消息keyx:消息类型,fn:回调函数
    listen: function(key,fn) {
        if(!this.list[key]) {
            this.list[key] = [];
        }
        // 订阅的消息添加到缓存列表中
        this.list[key].push(fn);
    },
    //发送消息
    trigger: function(){
        var key = Array.prototype.shift.call(arguments);
        var fns = this.list[key];
        // 如果没有订阅过该消息的话，则返回
        if(!fns || fns.length === 0) {
            return;
        }
        for(var i = 0,fn; fn = fns[i++];) {
            fn.apply(this,arguments);
        }
    }
};
//所有的普通对象都具有发布订阅功能
var initEvent = function(obj) {
    for(var i in event) {
        obj[i] = event[i];
    }
};

/**
 * 使用示例
 *
 //定义订阅/委托管理对象
 var playEvent={};
 initEvent(playEvent);

 //发送HB消息，及相关数据
 playEvent.trigger("HB",json);

 //订阅消息
 playEvent.listen('HB',lottery.flushBox);
 */
