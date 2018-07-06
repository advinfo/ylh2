<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-6-22
 * Time: 15:24
 */

class AnnounceModel extends Model{
    const LASTSENDID = 'lastAnnounceSendId';    //记录当前用户读取的各频道信息的最大ID值
    const MAXRECORD = 100;    //一次返回的最大记录数


    public function getUnread($chnid = 0) {
        $now=date('Y-m-d H:i:s');
        $lastId=$this->getLastMsgId($chnid);    //上次读出的最后一个ID
//$lastId=0;
        $cond="chnid in ({$chnid},0) and '{$now}' between btime and etime and (id>{$lastId} or `loop`=1 )";


        $recs=$this->field('id,speed,zone,UNIX_TIMESTAMP(createtime) as stamp,content,attr')
            ->where($cond)->select();
//echo $this->getLastSql();
        if(count($recs)>0){
            //读取到记录
            $newLast=$recs[count($recs)-1]['id'];
            $this->setLastMsgId($chnid,$newLast);
        }
        return $recs;
    }

    /**
     * 设置指定频道在当前session最后发送到前端显示的送礼信息id
     * @param int $chnid    频道id
     * @param int $msgid    最后发送到前端的送礼信息ID
     */
    public function setLastMsgId($chnid,$msgid){
        $_SESSION[self::LASTSENDID][$chnid]=$msgid;
    }

    /**
     * 取指定频道在当前session最后发送到前端显示的送礼信息id
     *
     * @param int $chnid    频道id
     * @return int  若原来未设置返回0
     */
    public function getLastMsgId($chnid) {
        $rt = $_SESSION[self::LASTSENDID][$chnid];
        if (null == $rt) $rt = 0;
        return $rt;
    }
}