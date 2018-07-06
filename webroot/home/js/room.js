
    //--------------上拉加载更多---------------

//获取滚动条当前的位置
    function getScrollTop(scrollObj) {
        var scrollTop = 0;
        if(scrollObj && scrollObj.scrollTop) {
            scrollTop = scrollObj.scrollTop;
        } else if(document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }

//获取当前可视范围的高度
    function getClientHeight(scrollObj) {
        var clientHeight = 0;
        if(document.body.clientHeight && scrollObj.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, scrollObj.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, scrollObj.clientHeight);
        }
        return clientHeight;
    }

//获取文档完整的高度
    function getScrollHeight(scrollObj) {
        return Math.max(document.body.scrollHeight, scrollObj.scrollHeight);
    }

//滚动事件触发
    var scroll_container = document.getElementById('scroll-container');
    if(scroll_container){
        scroll_container.onscroll = function() {
            if(getScrollTop(this) + getClientHeight(this) + 60 > getScrollHeight(this)) {
                loadListData(list_order);
            }
        }
    }

//-----------------结束--------------------

//  异步加载数据
    var list_domain = Config.domain;
    var list_url = Config.url.getRoomsUrl;
    var list_page = Config.room.list_page;      //  起始页数
    var list_order = Config.room.list_order;    //  起始排序方式
    var list_row = Config.room.list_row;
    var is_end = false;

    var loadListData_on = true; // 开关
    function loadListData(order){
        if (loadListData_on && !is_end){
            loadListData_on = false;
            $('#loading').css({'display':'flex'})
            $.ajax({
                url: list_url,
                type: 'get',
                async: true,
                data: {
                    type: 0,
                    scrType: 'h',
                    page:list_page,
                    rows: list_row,
                    order: list_order
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if(result.length){
                        var html = '';
                        for (var item in result){
                            html+='<a href="#" target="_blank" class="list-item">\
                            <img src="'+ list_domain + result[item]['img'] +'" alt="">\
                            <div class="item-title">'+result[item]['name']+'</div>\
                            <div class="item-description">'+result[item]['descript']+'</div>\
                        </a>';
                        }
                        list_page++;
                        $('#list-container').append(html);
                    }else{
                        is_end = true;  //  本页结束
                    }
                    loadListData_on = true;
                    $('#loading').hide();
                },
                error: function(res){
                    console.log(res);
                    alert('数据获取失败');
                }
            })
        }
    };
    loadListData(list_order)

//  移除数据
    sessionStorage.removeItem('room_list');
//  切换排序
    function list_change(t,order){
        setRoomToSessionStorage($('#list-container').html(),list_page,list_order);

        $(t).parent().children().removeClass('active');
        $(t).addClass('active');

        // 从localStorage获取数据
        var room_list = getRoomToSessionStorage(order)
        if(room_list){
            $('#list-container').html(room_list.data);
            list_page = room_list.page;
        }else{
            $('#list-container').html("");
            loadListData(order);
            list_page = 1;
            is_end = false;
        }
        list_order = order;


    }
//  设置房间信息到本地存储
    function setRoomToSessionStorage(data,page,order){
        var room_list = JSON.parse(sessionStorage.getItem('room_list'));
        if(!room_list){
            room_list = {};
        }
        room_list[order] = {
            'data' : data,
            'page' : page
        };
        sessionStorage.setItem('room_list', JSON.stringify(room_list));
    }
//  从本地存储获取房间信息
    function getRoomToSessionStorage(order){
        var room_list = JSON.parse(sessionStorage.getItem('room_list'));
        if(room_list){
            return room_list[order];
        }
    }