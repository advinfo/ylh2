
(function(){
    if(!($('.c-tab') && $('.c-tab').css('display') != 'none')){
        return ;
    }
    var breath_interval = Config.breath_interval;    //  呼吸间隔时间
    var clear_interval = Config.clear_interval;     //  弹幕垃圾车间隔时间
    var clear_keynum = Config.clear_keynum;          //  页面保持弹幕数目

    //  心跳通讯获取弹幕
    var chat_timer = setInterval(function(){
        getChatMsg();   //  通讯获取弹幕
    },breath_interval);
    // 定时清除旧节点
    var clear_timer = setInterval(function(){
        var msg_length = $('#chat-msg').find('li').length;
        if(msg_length > clear_keynum){
            //  开始清除弹幕
            var delIndex = msg_length - clear_keynum - 1;
            $('#chat-msg').find('li:lt('+delIndex+')').remove()
        }
    },clear_interval);

    //  发起通讯
    function getChatMsg(){
        var msg_timer = null;
        $.ajax({
            url : Config.url.getMsgsUrl,
            type: 'get',
            async: true,
            success: function(result){
                var msg = result.msg;
                var box = result.box;

                //  弹幕礼物信息
                showMsg(msg,msg_timer);
                //  宝箱信息
                showBox(box);
            },error: function(error){
                console.log(error)
            }

        })
    }
    getChatMsg();

    function showMsg(msg,msg_timer) {
        var time_interval = Math.floor(breath_interval/msg.length);  //  信息输出间隔
        var index = 0;      //  索引
        msg_timer = setInterval(function(){
            $('.chat-msg').animate({scrollTop:100000},1);
            var item  = msg[index];
            var htmlNode = '<li>';
            switch (item.type){
                case 1: //  欢迎用户
                    htmlNode+='<span>欢迎</span>';
                    if(item.user_vip){
                        htmlNode+='<span class="chat-vip">VIP</span>';
                    }
                    htmlNode+='<span class="chat-level">'+item.user_level+'</span><span class="chat-user">'+item.user_name+'</span> <span>来到本直播间来到本直播间</span>';
                    break;
                case 2: //  用户发言
                    if(item.user_vip){
                        htmlNode+='<span class="chat-vip">VIP</span>';
                    }
                    htmlNode+='<span class="chat-level">'+item.user_level+'</span><span class="chat-user">'+item.user_name+'</span> <span>'+item.msg_content+'</span>';
                    break;
                case 3: //  赠送礼物
                    if(item.user_vip){
                        htmlNode+='<span class="chat-vip">VIP</span>';
                    }
                    htmlNode+='<span class="chat-level">'+item.user_level+'</span><span class="chat-user">'+item.user_name+'</span> <span>送出礼物</span><span class="chat-gift-text"> '+item.msg_gifts+'×'+item.msg_gifts_num+'</span>';
                    break;
            }
            htmlNode+='</li>';
            $('#chat-msg').append(htmlNode);
            if(index == msg.length - 1){
                clearTimeout(msg_timer); //  清空定时器
            }
            index++;
        },time_interval)
    }

    function showBox(boxes){
        var boxContainer = $('#chat-box');

        if(!boxes){ return;}
        $.each(boxes,function (i,box) {
            switch (box.type){
                case 1: show_box_1(box);break;  //  定时抽奖
                case 2: show_box_2(box);break;  //  即兴抽奖
                case 3: show_box_3(box);break;  //  竞猜抽奖
            }
        })

        //  定时抽奖
        function show_box_1(box){
            //  获取箱子ID
            var box_id = 'box_1_' + box.id;
            if($('#'+box_id).length){
                return ;
            }
            var htmlNode = '<a href="javascript:;" class="box-base" id="'+box_id+'" style="background-image: url(img/icon/box_1.png);">\
                                <div class="box-count-icon"></div>\
                                <div class="box-text" ></div>\
                            </a>';
            boxContainer.append(htmlNode);

            //  点击弹出暗语
            $('#'+box_id).on('click',function(){
                var win = '<div class="chat-window">\
                                <div class="chat-code">\
                                    <p style="margin-top:30px;margin-bottom:30px">本功能稍后推出~敬请期待~</p>\
                                    <div class="chat-confirm"><button id="chat-window-confirm">确认</button></div>\
                                    <span class="chat-window-close" id="chat-window-close">×</span>\
                                </div>\
                            </div>';
                $('.show-app').append(win);
                $('#chat-window-close').on('click',function () {
                    $('.chat-window').remove();
                })
                $('#chat-window-confirm').on('click',function () {
                    $('.chat-window').remove();
                })

                // var win = '<div class="chat-window">\
                //                 <div class="chat-code">\
                //                     <p>请输入您的暗号</p>\
                //                     <input type="text" class="chat-input"  placeholder="请输入您的暗号">\
                //                     <div class="chat-confirm"><button>确认</button></div>\
                //                     <span class="chat-window-close" id="chat-window-close">×</span>\
                //                 </div>\
                //             </div>';
                // $('.show-app').append(win);
                // $('#chat-window-close').on('click',function () {
                //     $('.chat-window').remove();
                // })
            });

            //  倒计时
            var box_second = box.second;
            var minute = ('00'+Math.floor(box_second/60).toString()).slice(-2);
            var second = ('00'+Math.floor(box_second%60).toString()).slice(-2);
            var box_node = boxContainer.find('#'+box_id).find('.box-text');
            var timer = setInterval(function(){
                //  通知开奖（即兴抽奖）
                if(box_second == 0){
                    clearInterval(timer);
                    //  判断是否中奖
                    //  -----------------------------------------------------------




                    //  -----------------------------------------------------------
                    $('#'+box_id).remove();
                }
                second = ('00'+Math.floor(box_second%60).toString()).slice(-2);
                box_node.text(minute+':'+second);
                box_second--;
                if (second == '00'){
                    minute = ('00'+Math.floor(box_second/60).toString()).slice(-2);
                }
            },1000)
        }

        //  即兴抽奖
        function show_box_2(box){
            //  获取箱子ID
            var box_id = 'box_2_' + box.id;
            if($('#'+box_id).length){
                return ;
            }
            var htmlNode = '<a href="javascript:;" class="box-base" id="'+box_id+'" style="background-image: url(img/icon/box_2.png);">\
                                <div class="box-text" >待开奖</div>\
                            </a>';
            boxContainer.append(htmlNode);

            //  点击弹出暗语
            $('#'+box_id).on('click',function(){
                var win = '<div class="chat-window">\
                                <div class="chat-code">\
                                    <p style="margin-top:30px;margin-bottom:30px">本功能稍后推出~敬请期待~</p>\
                                    <div class="chat-confirm"><button id="chat-window-confirm">确认</button></div>\
                                    <span class="chat-window-close" id="chat-window-close">×</span>\
                                </div>\
                            </div>';
                $('.show-app').append(win);
                $('#chat-window-close').on('click',function () {
                    $('.chat-window').remove();
                })
                $('#chat-window-confirm').on('click',function () {
                    $('.chat-window').remove();
                })


                // //  判断是否中奖
                // //  -----------------------------------------------------------
                //     alert('判断是否中奖...')
                //
                //
                //
                // //  -----------------------------------------------------------
                // $('#'+box_id).remove();
                // clearInterval(timer);
            });
            //  倒计时
            var box_second = box.second;
            var timer = setInterval(function(){
                //  通知开奖（即兴抽奖）
                if(box_second == 0){
                    clearInterval(timer);
                    $('#'+box_id).remove();
                }
                box_second--;
            },1000)
        }

        //  竞猜抽奖
        function show_box_3(box){
            //  获取箱子ID
            var box_id = 'box_3_' + box.id;
            if($('#'+box_id).length){
                return ;
            }
            var htmlNode = '<a href="javascript:;" class="box-base" id="'+box_id+'" style="background-image: url(img/icon/box_3.png);">\
                                <div class="box-text" >参加竞猜</div>\
                            </a>';
            boxContainer.append(htmlNode);

            //  点击弹出竞猜
            $('#'+box_id).on('click',function(){
                var win = '<div class="chat-window">\
                                <div class="chat-code">\
                                    <p style="margin-top:30px;margin-bottom:30px">本功能稍后推出~敬请期待~</p>\
                                    <div class="chat-confirm"><button id="chat-window-confirm">确认</button></div>\
                                    <span class="chat-window-close" id="chat-window-close">×</span>\
                                </div>\
                            </div>';
                $('.show-app').append(win);
                $('#chat-window-close').on('click',function () {
                    $('.chat-window').remove();
                })
                $('#chat-window-confirm').on('click',function () {
                    $('.chat-window').remove();
                })


                // var win = '<div class="chat-window">\
                //                 <div class="chat-guess">\
                //                     <p>免费领取彩票包项</p>\
                //                     <div class="chat-guess-options">';
                //                         $.each(box.options,function (i,option) {
                //                             win+='<a href="javascript:;">'+option.name+'</a>'
                //                         })
                //                         win+='</div>\
                //                     <div class="chat-confirm"><button>确认</button></div>\
                //                     <span class="chat-window-close" id="chat-window-close">×</span>\
                //                 </div>\
                //             </div>';
                // $('.show-app').append(win);
                // $('#chat-window-close').on('click',function () {
                //     $('.chat-window').remove();
                // });
                //
                // $('.chat-guess-options').find('a').each(function(){
                //     $(this).on('click',function () {
                //         $(this).parent().find('a').removeClass('active');
                //         $(this).addClass('active');
                //     })
                // });
            });

            //  倒计时
            var box_second = box.second;
            var box_node = boxContainer.find('#'+box_id).find('.box-text');
            var timer = setInterval(function(){
                //  时间结束
                if(box_second == 0){
                    clearInterval(timer);
                    $('#'+box_id).remove();
                }
                box_second--;
            },1000)
        }
    }
})(window);

