/**
 * 抽奖控制类
 * 依赖：jquery,publicFunction.js
 */

function lottery() {
    this.msgCont='lotteryMsgCont';   //信息显示容器 加this是类的全局属性，var仅是函数私有变量, 没限定是类全局属性
    this.m_container='';
    this.m_showUrl='';
    _this=this;
}

/**
 * 初始化抽奖对象
 * @param container 指定显示抽奖内容的div容器id，若不提供使用默认值
 */
lottery.prototype.init=function(container="lotteryCont"){
    this.m_container=container;
    //alert(this.m_container);
    //点击抽奖箱后显示相关信息窗口的容器

    var html='<div id='+ lottery.msgCont +'></div>';

    $("body").append(html);
    console.log(html);
}

/**
 * 调用后台按照提供的参数以及抽奖状态显示相关信息
 * @param id    抽奖id
 * @param attr  前端提供的其它参数信息。json，后台解析为参数数组
 */
lottery.prototype.showMsg=function(id,attr){
    $.post(this.m_showUrl,{id:id,attr:attr},function(data){
        $('#'+lottery.msgCont).html(data);
        //console.log(this.m_container);
        //console.log(_me.m_container);
        //console.log(data);
    },'html');
}
lottery.prototype.hidden=function(){
    $('#'+lottery.msgCont).html('');
}

lottery.prototype.flushBox=function(json){
    console.log("flushbox");
    console.log(json);

    console.log(_this.m_container);
}

