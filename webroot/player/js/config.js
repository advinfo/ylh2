var Config = {
    domain: 'http://push.av365.cn', //  主机
    url:{
        getMsgsUrl: 'message.json?room=1',                                            //  弹幕获取接口
        getRoomsUrl: 'http://push.av365.cn/home.php/Home/channelListJson',                //  获取频道接口
        getGifgsUrl: 'http://push.av365.cn/home.php/Channel/giftListJson/chnId/1098'     //  礼物获取接口
    },
    breath_interval: 10000,     //  呼吸间隔时间
    clear_interval: 15000,      //  弹幕垃圾车间隔时间
    clear_keynum : 50,          //  页面保持弹幕数目

    room:{                  // 频道列表配置参数
        list_page: 1,           //  起始页数
        list_order: 'hot',      //  起始排序方式
        list_row: 10,           //  查询数目
    }
};
Object.preventExtensions(Config);
Object.seal(Config);
Object.freeze(Config);