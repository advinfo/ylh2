
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
    var list_categoryid = '';                       //  分类
    var list_row = Config.room.list_row;
    var list_is_end = [];

    var loadListData_on = true; // 开关
    function loadListData(){

        if (loadListData_on && !list_is_end[list_order + '-' + list_categoryid]){

            $('#list-container').css('display','flex');
            $('#list-search-container').hide();
            loadListData_on = false;
            $('#loading').css({'display':'flex'});
            $.ajax({
                url: list_url,
                type: 'get',
                async: true,
                data: {
                    scrType: 'h',
                    page:list_page,
                    rows: list_row,
                    sort: list_order,
                    type: 0,
                    categoryid:list_categoryid
                },
                success: function (result) {
                    result = JSON.parse(result);
                    if(result.length){
                        var html = '';
                        for (var item in result){
                            html+='<a href="'+ list_domain + result[item]['link'] +'" target="_blank" class="list-item">\
                            <img src="'+ list_domain + result[item]['img'] +'" alt="">\
                            <div class="item-title">'+result[item]['name']+'</div>\
                            <div class="item-description">'+result[item]['descript']+'</div>\
                        </a>';
                        }
                        list_page++;
                        $('#list-container').append(html);
                    }else{
                        list_is_end[list_order + '-' + list_categoryid] = true;
                    }
                    loadListData_on = true;
                    $('#loading').hide();
                },
                error: function(res){
                    console.log(res);
                    loadListData();
                }
            })
        }
    };
    loadListData()

//  移除数据
    sessionStorage.removeItem('room_list');
//  切换排序
    function list_change(t,order){
        $('#list-search').find('input').val('');
        $('#list-container').css('display','flex');
        $('#list-search-container').hide();
        loadListData_on = true;
        setRoomToSessionStorage($('#list-container').html(),list_page,list_order+'-'+list_categoryid);

        $(t).parent().find('.sort').removeClass('active');
        $(t).addClass('active');

        // 从localStorage获取数据
        var room_list = getRoomToSessionStorage(order+'-'+list_categoryid)
        list_order = order; //新的排列
        if(room_list){
            $('#list-container').html(room_list.data);
            list_page = room_list.page;
        }else{
            $('#list-container').html("");
            list_page = 1;
            loadListData();
        }
    }
    //  分类选择
    function list_select(t,text,value){
        $(t).parent().find('.list-select-text').text(text);
        $('#list-search').find('input').val('');

        $('#list-container').css('display','flex');
        $('#list-search-container').hide();
        loadListData_on = true;
        setRoomToSessionStorage($('#list-container').html(),list_page,list_order+'-'+list_categoryid);

        $(t).parent().addClass('active');

        // 从localStorage获取数据
        var room_list = getRoomToSessionStorage(list_order+'-'+value)

        list_categoryid = value;
        if(room_list){
            $('#list-container').html(room_list.data);
            list_page = room_list.page;
        }else{
            $('#list-container').html("");
            list_page = 1;
            loadListData();
        }
    }
    //  搜素房间
    function search_room(){
        var keyword = $('#list-search').find('input').val().trim();
        if(keyword){
            $('#list-container').hide();
            $('#list-search-container').css('display','flex');

            loadListData_on = false;
            $('#loading').css({'display':'flex'});
            $.ajax({
                url: list_url,
                type: 'get',
                async: true,
                data: {
                    searchStr: keyword,
                    scrType: 'h',
                    rows: 100,
                    type: 0,
                },
                success: function (result) {
                    result = JSON.parse(result);
                    var html = '';
                    if(result.length){
                        var html = '';
                        for (var item in result){
                            html+='<a href="'+ list_domain + result[item]['link'] +'" target="_blank" class="list-item">\
                        <img src="'+ list_domain + result[item]['img'] +'" alt="">\
                        <div class="item-title">'+result[item]['name']+'</div>\
                        <div class="item-description">'+result[item]['descript']+'</div>\
                    </a>';
                        }
                    }
                    $('input[name="search"]').blur()
                    $('#list-search-container').html(html);
                    $('#loading').hide();
                },
                error: function(res){
                    console.log(res);
                    alert('数据获取失败');
                }
            })
        }else{
            alert('请输入搜索关键词')
        }
        event.preventDefault();
        return false;
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