var chnId = getQueryString('chnId') || null;
var Config = {
    domain: '//push.av365.cn', //  主机
    url:{
        getMsgsUrl: 'message.json?room=1',                                               //  弹幕获取接口
        getLoginInfo: '//push.av365.cn/home.php/Home/initialJson',                       //  登陆状态基础信息接口
        getThirdUrl: '//push.av365.cn/home.php/Home/loginIniJson',                       //  第三方登陆列表接口
        getLoginUrl: '//push.av365.cn/home.php/Home/authenJson',                         //  本地登陆接口
        getBannerUrl: '//push.av365.cn/home.php/Home/loginBanner',                       //  获取Banner接口
        getRoomsUrl: '//push.av365.cn/home.php/Home/channelListJson',                    //  获取频道接口
        getRoomType: '//push.av365.cn/home.php/Channel/chnCategoryJson',                 //  获取频道分类接口
        getGifgsUrl: '//push.av365.cn/home.php/Channel/giftListJson/chnId/' + chnId,     //  礼物获取接口
        getRanksUrl: '//push.av365.cn/home.php/User/rankingJson/chnId/' + chnId,         //  排行榜获取接口
    },
    breath_interval: 10000,     //  呼吸间隔时间
    clear_interval: 15000,      //  弹幕垃圾车间隔时间
    clear_keynum : 50,          //  页面保持弹幕数目

    room:{                  // 频道列表配置参数
        list_page: 1,           //  起始页数
        list_order: '最热',      //  起始排序方式
        list_row: 10,           //  查询行数
    }
};
Object.preventExtensions(Config);
Object.seal(Config);
Object.freeze(Config);

//  获取Url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}