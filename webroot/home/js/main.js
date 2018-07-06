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


//  Swiper滑动
if($('.swiper-container')){
    new Swiper('.swiper-container', {
        autoplay: true,//可选选项，自动滑动
        loop : true,
        pagination: {
            el: '.swiper-pagination',
            bulletClass : 'my-bullet',
            bulletActiveClass: 'my-bullet-active',
        },
    })
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
})


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

$('.rank-nav-item').each(function (i) {
    $(this).on('click',function(){
        $(this).parent().children().removeClass('active');
        $(this).addClass('active')

        $(this).parents('.tab-rank').find('.rank-list').removeClass('active');
        $(this).parents('.tab-rank').find('.rank-list:eq('+i+')').addClass('active');
    })
});



//  面板倒计时
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



//  视频播放
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