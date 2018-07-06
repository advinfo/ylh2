<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-18
 * Time: 10:40
 */

class WebchatModel extends Model
{
    const LASTMSGID='lastWebchatSendId';    //记录当前用户读取的各频道信息的最大ID值
    const MAXRECORD=100;	//一次返回的最大记录数
    public function getNewMsg($chnid){
        if($chnid<1) return null;

        $fields='id,sendtime,sendername,message,userlevel,viplevel';
        $lastId=$this->getLastMsgId($chnid);
//var_dump($lastId);
//dump($_SESSION);
        $cond=array('chnid'=>$chnid);
        if(null !== $lastId) {
            $cond['id'] = ['GT', $lastId];
            $order='id asc';    //按ID顺序排序
        } else {
            //若没有记录已读取的最大ID取最后的记录
            $order='id desc';
        }
        $recs=$this->field()->where($cond)->order($order)->limit(100)->select();
        if(count($recs)>0){
            //读取到记录
            if(null !== $lastId) {
                $newLast=$recs[count($recs)-1]['id'];
            }else {
                $newLast=$recs[0]['id'];
                $recs=array_reverse($recs);
            }
            $this->setLastMsgId($chnid,$newLast);
        }
        //echo $this->getLastSql();
//var_dump($lastId);

        return $recs;
    }

    /**
     * 设置指定频道在当前session最后发送到前端显示的聊天信息id
     * @param int $chnid    频道id
     * @param int $msgid    最后发送到前端的聊天信息ID
     */
    public function setLastMsgId($chnid,$msgid){
        $_SESSION[self::LASTMSGID][$chnid]=$msgid;
    }

    /**
     * 取指定频道在当前session最后发送到前端显示的聊天信息id
     *
     * @param int $chnid    频道id
     * @return int  若原来未设置返回null
     */
    public function getLastMsgId($chnid){
        return $_SESSION[self::LASTMSGID][$chnid];
    }
}