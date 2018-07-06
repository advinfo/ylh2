window.onload = function(){
    //  适配尺寸调整
    var baseSize = 16, // 基数
        baseWidth = 375, //量取值大小
        fontSize =  (document.documentElement.clientWidth / baseWidth * baseSize);
    document.getElementsByTagName('html')[0].style.fontSize = fontSize+'px';
    window.addEventListener('resize',function(){
        document.getElementsByTagName('html')[0].style.fontSize = fontSize =  (document.documentElement.clientWidth / baseWidth * baseSize)+'px';
    });
}



if($('.tab-container')){
    var tab_container = new Swiper('.tab-container', {
        on: {
            slideChangeTransitionStart: function(){
                if (isAndroid){
                    $('#chat-input').blur();
                }
                tab_change(this.activeIndex);
            },
        },
    })
    function tab_change(index) {
        $('.tab-nav-item').removeClass('active');
        $('.tab-nav-item:eq('+index+')').addClass('active');
    }
    $('.tab-nav-item').each(function(i){
        $(this).on('click',function(event){
            tab_change(i);
            tab_container.slideTo(i, 500, false);//切换到第一个slide，速度为1秒
        })
    })
}


var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//  跳转到PC端
if(!(isiOS || isAndroid)){
    window.location.href = '/home.php/Home/login?scrType=w';
}

if(isAndroid){
    $('.chat-bar').css({
        'position':'fixed',
        'bottom':'0',
        'z-index': '2'
    })
    $('.chat-msg').css({
        'padding-bottom':$('.chat-bar').height() + 10,
    });
}

window.addEventListener("resize", function() {
    if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA") {
        window.setTimeout(function() {
            document.activeElement.scrollIntoViewIfNeeded();
        },10);
    }
});


if($('#chat-input')){
    $('#chat-input').on('click',function(){
        if(isAndroid){
            $('.show-app').append($('#chat-bar'))
            $(this).focus();
        }

        $('#chat-send').children().removeClass('active');
        $('.chat-submit').addClass('active');

        $(this).on('blur',function(){
            if(isAndroid) {
                $('.tab-chat').append($('#chat-bar'));
            }
            if(!$('#chat-input').val().trim()){
                $('#chat-send').children().removeClass('active');
                $('.chat-more').addClass('active');
            }
            $('.chat-msg').animate({scrollTop:100000},1);
        })
    })
}

/**
 * ===========================
 *  面板倒计时
 * ===========================
 **/
!function(){
    var dist_time = $('#wait-count').data('time');
    if(dist_time > new Date().getTime()/1000){
        $('#c-wait').removeClass('hide');
        $('#c-tab').addClass('hide');
    }else{
        $('.wait-text').html('直播正在进行 / 已经结束')
        $('.wait-subscribe').hide()
    }
    if($('#c-wait') && $('#c-wait').css('display') != 'none'){
        var wait_timer = setInterval(function(){
            wait_count();
        },1000);
        function wait_count(){
            var now_time = parseInt(new Date().getTime()/1000);
            var diff_time = dist_time - now_time;
            if(diff_time == 0){
                clearInterval(wait_timer);
                window.location.reload();
            }
            var day = Math.floor(diff_time/(86400));
            if(day < 10){
                day =('00' + day.toString()).slice(-2);
            }
            var show_time = [
                day,
                ('00' + Math.floor(diff_time%(86400) / (3600)).toString()).slice(-2),
                ('00' + Math.floor(diff_time%(3600) / (60)).toString()).slice(-2),
                ('00' + Math.floor(diff_time%(60)).toString()).slice(-2)];

            $('#wait-count').find('span').each(function(i){
                $(this).html(show_time[i])
            })
        }
        wait_count();
        $('#video_controls').hide();
    }
}();


/**
 * ===========================
 *  视频播放
 * ===========================
 **/

!function () {
    var video_controls = document.getElementById('video_controls'); //  控制层
    var videoPlay = document.getElementById('video_play');  //  播放按钮
    var videoFullScreen = document.getElementById('video_fullscreen');  //  全屏按钮
    var videoPlayer = document.getElementById('videoPlayer');   //  视频源

    var VideoObj = {
        'playing' : false,
        'fullScreen': false,
        'poster' : true,
        'controls_show': false,
    };

    //  浮出控制面板
    if(video_controls){
        video_controls.addEventListener('click',function () {
            event.preventDefault();
            if (!VideoObj.controls_show){
                VideoObj.controls_show = true;
                this.style.opacity = 1;
                setTimeout(function(){
                    this.style.opacity = 0;
                    VideoObj.controls_show = false;
                }.bind(this),5000);
            }
        })
    }

    //  播放/停止
    if(videoPlayer){
        videoPlay.addEventListener('click',function (event) {
            event.preventDefault();
            if (VideoObj.playing){
                video_pause()
            }else{
                video_play()
            }
        });
    }
    function video_play(){
        if(VideoObj.poster){
            var videoPoster = document.getElementById('v-poster');
            videoPoster.parentNode.removeChild(videoPoster);
            VideoObj.poster = false;
        }
        videoPlay.classList.remove('bg_video_play');
        videoPlay.classList.add('bg_video_pause');
        videoPlayer.play();
        VideoObj.playing = true;
    }
    function video_pause(){
        videoPlay.classList.remove('bg_video_pause');
        videoPlay.classList.add('bg_video_play');
        videoPlayer.pause();
        VideoObj.playing = false;
    }

    //  进入全屏
    if(videoFullScreen){
        videoFullScreen.addEventListener('click',function(){
            event.preventDefault();
            requestFullScreen(videoPlayer);
        })
    }
    function requestFullScreen(video) {
        // android，请求全屏
        if (typeof video.webkitRequestFullScreen === 'function') {
            video.webkitRequestFullScreen();
        }
        //ios，请求全屏
        if(typeof video.webkitEnterFullscreen === 'function') {
            video.webkitEnterFullscreen();
        }
    }
    // android 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
    $(document).on('webkitfullscreenchange', function(event) {
        if(document.webkitIsFullScreen) {
            video_play()
        } else {
            video_pause()
        }
    });
    // ios 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
    $(videoPlayer).on('webkitbeginfullscreen', function() {
        video_play()
    }).on('webkitendfullscreen', function() {
        video_pause()
    });
}(window);

/**
 * ===========================
 * 礼物获取
 * ===========================
 **/
//  礼物对象
    var Gifts = {
        list : [],           //  礼物列表
        num :  1,            //  选择礼物数目
        activeGift: null,  //  选中的礼物索引
        numObj: $('.gifts-num').find('span'),   //  数目节点对象
        init: function(){
            this.num = 1;
            this.activeGift = null;
            $('#gifts-text').html('');
            $('.gifts-item').removeClass('active');
            this.numObj.text(this.num);
        },
        select_gift: function(t,id){
            var gift = findByKey('id',id, this.list);
            if(gift.disableNote){
                this.alert(gift.disableNote);
                return;
            }
            $('.gifts-item').removeClass('active');
            $(t).addClass('active');

            this.activeGift = gift;
            this.upDataText(gift.price * this.num);
        },
        reduce:function () {
            if(parseInt(this.numObj.text()) == 1){
                return ;
            }
            this.num = (parseInt(this.numObj.text()) - 1)
            this.numObj.text(this.num);
            if(this.activeGift){
                this.upDataText();
            }

        },
        add: function () {
            this.num = (parseInt(this.numObj.text()) + 1)
            this.numObj.text(this.num);
            if(this.activeGift){
                this.upDataText();
            }
        },
        upDataText: function(){
            $('#gifts-text').html('送出 <span>'+ this.activeGift.name +'</span> 总价：<span class="acColor">'+ this.activeGift.price * this.num +'</span>')
        },
        lack: function(){
            var win = '<div class="chat-window">\
                        <div class="chat-guess">\
                            <p style="padding: 30px;">储物箱有XX个，尚缺XX个</p>\
                            <span class="chat-window-close" id="chat-window-close">×</span>\
                            <div class="gifts-btns" >\
                                <a href="javascript" class="acBtn gifts-btn">有多少送多少</a>\
                                <a href="#" class="acBtn gifts-btn">去购买</a>\
                            </div>\
                        </div>\
                    </div>';
            $('.tab-chat').append(win);
            $('#chat-window-close').on('click',function () {
                $('.chat-window').remove();
            });
        },
        alert: function(msg,time){
            time = time ? time : 2000;
            $('body').append('<div class="alert">'+msg+'</div>');
            setTimeout(function(){
                $('.alert').remove();
            },time);
        }
    }

//  礼物列表
    $('#chat-show-gifts').on('click',function(){
        // var win = '<div class="chat-window">\
        //                         <div class="chat-code">\
        //                             <p style="margin-top:30px;margin-bottom:30px">本功能稍后推出~敬请期待~</p>\
        //                             <div class="chat-confirm"><button id="chat-window-confirm">确认</button></div>\
        //                             <span class="chat-window-close" id="chat-window-close">×</span>\
        //                         </div>\
        //                     </div>';
        // $('.show-app').append(win);
        // $('#chat-window-close').on('click',function () {
        //     $('.chat-window').remove();
        // })
        // $('#chat-window-confirm').on('click',function () {
        //     $('.chat-window').remove();
        // })



        getGifts(); //  获取礼物
        $('#gifts-window').show();
        $('#gifts-window').on('click',function(){
            $(this).hide()
        })

    })

    $('#gifts-send').on('click',function(event){
        if(Gifts.activeGift){
            Gifts.lack();
        }else{
            Gifts.alert('请选择礼物')
        }
    })

    function getGifts(){
        Gifts.init();
        if(Gifts.list.length){
            $('#gifts-window').show();
            return;
        }
        $('#gifts-wrapper').html('<div class="loading" id="loading_gift" style="display: flex;"><img src="img/loading.png" alt=""></div>');
        var giftsDomain = Config.domain;
        var getGifgsUrl = Config.url.getGifgsUrl;
        $.ajax({
            url:  getGifgsUrl,
            type: 'get',
            async: true,
            success: function (result) {
                result = JSON.parse(result);
                result.sort(sortByKey('order','asc'));

                Gifts.list = result;

                if(result.length){
                    var htmlNode = '';
                    $.each(result,function(i,arr){
                        if(i%8 == 0){
                            htmlNode +='<div class="swiper-slide gifts-rows">';
                        }
                        if(arr.disableNote){
                            htmlNode+='<a href="javascript:;" onclick="Gifts.select_gift(this,'+ arr.id +')" class="gifts-item"> \
                                    <img src="img/temp/11.jpg" class="gift-img ban" alt="">\
                                    <div class="gifts-value"><i class="gifts-icon"></i><p>'+ arr.price +'</p></div>\
                                    <span>'+ arr.name +'</span>\
                                    </a>';
                        }else{
                            htmlNode+='<a href="javascript:;" onclick="Gifts.select_gift(this,'+ arr.id +')" class="gifts-item"> \
                                    <img src="img/temp/11.jpg" class="gift-img" alt="">\
                                    <div class="gifts-value"><i class="gifts-icon"></i><p>'+ arr.price +'</p></div>\
                                    <span>'+ arr.name +'</span>\
                                    </a>';
                        }

                        if(i%8 == 7 || i == result.length - 1){
                            htmlNode +='</div>';
                        }
                    });
                    $('#gifts-wrapper').append(htmlNode);
                    //  实例化滑动插件
                    new Swiper('.gifts-container', {
                        pagination: {
                            el: '.gifts-pagination',
                            bulletClass : 'gifts-bullet',
                            bulletActiveClass: 'gifts-bullet-active',
                        }
                    });
                    $('#loading_gift').remove();
                }
            },
            error: function(e){

            }
        });
    }


/**
 * ===========================
 *  排行榜获取
 * ===========================
**/
!function () {
    if($('#tab-rank').length){
        $('#tab-rank').html('<div class="loading" id="loading_rank" style="display: flex;"><img src="img/loading.png" alt=""></div>');
        $.ajax({
            url: Config.url.getRanksUrl,
            type: 'get',
            async: true,
            success: function (result) {
                $('#loading_rank').remove();
                result = JSON.parse(result);
                if(result.length){
                    var navNode = '<div class="rank-nav">';
                    var listContainerNode = '<div class="rank-container">';
                    for(var key in result){
                        var active = '';
                        if(key == 0){
                            active = 'active';
                        }
                        navNode+='<div class="rank-nav-item '+ active +'">'+ result[key].rank +'</div>';

                        var listNode = '<div class="rank-list '+ active +'">';
                        var lists = result[key].list;
                        for(var k in lists){
                            switch (k){
                                case '0':
                                    listNode+='<div class="rank-list-item">\
                                                    <div class="bg-tab_rank1"></div>\
                                                    <div class="rank-info">\
                                                        <p><span class="chat-vip-user">'+ lists[k].name +'</span></p>\
                                                        <p class="rank-build">'+ lists[k].value +'</p>\
                                                    </div>\
                                                </div>';
                                    break;
                                case '1':
                                    listNode+='<div class="rank-list-item">\
                                                    <div class="bg-tab_rank2"></div>\
                                                    <div class="rank-info">\
                                                        <p><span class="chat-vip-user">'+ lists[k].name +'</span></p>\
                                                        <p class="rank-build">'+ lists[k].value +'</p>\
                                                    </div>\
                                                </div>';
                                    break;
                                case '2':
                                    listNode+='<div class="rank-list-item">\
                                                    <div class="bg-tab_rank3"></div>\
                                                    <div class="rank-info">\
                                                        <p><span class="chat-vip-user">'+ lists[k].name +'</span></p>\
                                                        <p class="rank-build">'+ lists[k].value +'</p>\
                                                    </div>\
                                                </div>';
                                    break;
                                default:
                                    listNode+='<div class="rank-list-item">\
                                                    <div class="rank-other">NO.'+ (parseInt(k)+1) +'</div>\
                                                    <div class="rank-info">\
                                                        <p><span class="chat-vip-user">'+ lists[k].name +'</span></p>\
                                                        <p class="rank-build">'+ lists[k].value +'</p>\
                                                    </div>\
                                                </div>';
                                    break;
                            }
                        }
                        listNode+='</div>';

                        listContainerNode+=listNode;
                    }
                    navNode+='</div>';
                    listContainerNode+='</div>';
                    $('#tab-rank').html(navNode+listContainerNode);
                    //  绑定事件
                    $('.rank-nav-item').each(function (i) {
                        $(this).on('click',function(){
                            $(this).parent().children().removeClass('active');
                            $(this).addClass('active')

                            $(this).parents('.tab-rank').find('.rank-list').removeClass('active');
                            $(this).parents('.tab-rank').find('.rank-list:eq('+i+')').addClass('active');
                        })
                    });
                }else{
                    $('#tab-rank').html('<p style="margin-top:30px;text-align:center">暂无数据</p>');
                }
            }
        });
    }
}(window);

//  登陆
var Login = {
    switch_on: true,
    doLogin: function(){
        if(!this.switch_on){
            return false;
        }
        this.switch_on = false;  // 防止重复发送
        $('#app').append('<div class="win-loading" id="loading_login" ><img src="img/loading.png" alt=""></div>');
        $('#login-form input[type=password]').val(function () {
            return $.md5($(this).val())
        });
        $.ajax({
            type: 'POST',
            url: Config.url.getLoginUrl,
            context: this,
            data: $('#login-form').serialize(),
            success: function(result){
                result = JSON.parse(result);
                if(result.success == "true"){
                    window.location.href = Config.domain + result.url;
                }else{
                    $('.l-tips').text(result.msg).show();
                }
                this.switch_on = true;
                $('#loading_login').remove();
            },
            error: function(xhr){
                $('.l-tips').text("登陆失败").show();
                this.switch_on = true;
                $('#loading_login').remove();
            }
        })
    }
}

//  页面初始化

var Page = {
    init: function(){
        if(!$('.login-app').length){
            this.getLoginInfo();
        }
        if($('#l-link').length){
            this.getThridList();
        }
        if($('#banner').length){
            this.getBanner()
        }
        if($('#list-select').length){
            this.getRoomType()
        }
    },
    //  获取登陆基础信息
    getLoginInfo: function () {
        $.get(Config.url.getLoginInfo,function (result) {
            result = JSON.parse(result);
            if(result.location){
                window.location.href = result.location;
            }
        });
    },
    // 获取第三方登陆接口
    getThridList: function(){
        $.get(Config.url.getThirdUrl,function (result) {
            result = JSON.parse(result);
            var thirdList = result.ThirdpartyLogin;
            var htmlNode = '';
            $.each(thirdList,function(i,arr){
                var link = arr.url ||  'javascript:;';
                htmlNode += '<a href="'+link+'" target="_blank"><img src="'+Config.domain + arr.icon+'" alt="'+arr.party+'"></a>';
            });
            $('#l-link').html(htmlNode);
        })
    },
    // 获取Banner
    getBanner: function () {
        $.get(Config.url.getBannerUrl,function(result){
            result = JSON.parse(result);
            var htmlNode = '';
            $.each(result,function(i,arr){
                var link = arr.link ||  'javascript:;';
                htmlNode += '<div class="swiper-slide">\
                                <a href="'+ link +'"><img src="'+ Config.domain + arr.image+'" alt=""></a>\
                             </div>';
            });
            $('#banner').html(htmlNode);

            new Swiper('.banner-container', {
                autoplay: true,//可选选项，自动滑动
                loop : true,
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass : 'my-bullet',
                    bulletActiveClass: 'my-bullet-active',
                },
            })
        })
    },
    //  获取频道分类
    getRoomType: function() {
        $.get(Config.url.getRoomType, function (result) {
            result = JSON.parse(result);
            if(result.length){
                var htmlNode = '<div class="list-select-text">分类</div>\
                                    <select name="" id="list_select" onchange="list_select(this,this.options[this.options.selectedIndex].innerHTML,this.options[this.options.selectedIndex].value)">\
                                    <option value="">分类</option>';
                            $.each(result,function(i,arr){
                                htmlNode+='<option value="'+arr.id+'">'+arr.text+'</option>';
                            })
                         htmlNode+='</select>';
                            $('#list-select').html(htmlNode);
            }
        })
    }
};
Page.init()

//  回到顶部
function toTop(){
    $('.app-container').animate({scrollTop:0},500);
}

//  对象按键位排序
function sortByKey(key,order){
    return function (a,b) {
        if(order == 'asc'){
            return a[key] - b[key];
        }else{
            return b[key] - a[key];
        }
    }
}
//  从对象中查找指定key-value的子
function findByKey(key,value,obj){
    for(var i in obj){
        if(obj[i][key] == value){
            return obj[i];
        }
    }
}
//  时间戳转格式
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return m + '-' + d+' '+h+':'+minute;
};
