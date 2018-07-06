<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-6-20
 * Time: 10:40
 */

class GiveModel extends Model{
    const LASTSENDID='lastGiveSendId';    //记录当前用户读取的各频道信息的最大ID值
    const MAXRECORD=100;	//一次返回的最大记录数

    /**
     * 创建新的记录
     * @param $chnid
     * @param $goodsid
     * @param $quantity
     * @param $sender
     * @param $receiver
     * @return mixed    正常返回新建记录的ID，
     * @throws Exception    创建失败时抛出错误
     */
    public function addRec($chnid,$goodsid,$quantity,$sender,$receiver){
        $rec=array('sender'=>$sender, 'receiver'=>$receiver, 'chnid'=>$chnid, 'goodsid'=>$goodsid,'quantity'=>$quantity);
        $recId=$this->add($rec);
        if( 1>$recId ) throw new Exception('创建记录失败。'.$this->getLastSql());
        return $recId;
    }

    /**
     * @param int $chnid
     * @param int $btime    兼容时间戳云YYYY-MM-DD HH:mm:ss
     * @return mixed
     */
    public function getUnread($chnid=0, $btime=0){
        if(0==$btime) $btime=date('Y-m-d');
        if(intval($btime)>9999) $btime=date('Y-m-d H:i:s'); //时间戳转换为时间串
$btime=date('Y-m-d');
        $lastId=$this->getLastMsgId($chnid);    //上次读出的最后一个ID
//$lastId=1;
logfile("getUnread: btime=".$btime." lastId=".$lastId,LogLevel::DEBUG);
        if($lastId>0) $cond="G.id>".$lastId;
        else $cond="occurs>="."'{$btime}'";

        $sql="select G.id,S.username as sender, S.userlevel, S.viplevel, R.username as receiver, L.name as gift, quantity, unix_timestamp(occurs) as stamp".
            " from __PREFIX__give G inner join __PREFIX__user S on G.sender=S.id".
            " inner join __PREFIX__user R on G.receiver=R.id".
            " inner join __PREFIX__goods L on G.goodsid=L.id".
            " where {$cond} order by G.id limit ".self::MAXRECORD;

        $recs=$this->query($sql);
//echo $this->getLastSql();
logfile("getUnread:".$this->getLastSql(),LogLevel::SQL);
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
     * @return int  若原来未设置返回null
     */
    public function getLastMsgId($chnid){
        return $_SESSION[self::LASTSENDID][$chnid];
    }
}