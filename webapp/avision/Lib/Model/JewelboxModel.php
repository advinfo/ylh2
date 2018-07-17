<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-6-21
 * Time: 20:49
 */

class JewelboxModel extends Model{

    /**
     * @param $userid
     * @param $goodsid
     * @return mixed    指定用户拥有指定商品的数量，出错返回false
     */
    public function getQty($userid,$goodsid){
        $qty=$this->where(array('userid'=>$userid, 'goodsid'=>$goodsid))->getField('quantity');
        if(null==$qty) return 0;
        return $qty;
    }

    /**
     * 把新的物品加入到用户宝箱中，若宝箱已存在增加数量，若不存在增加一条记录
     * @param $userid
     * @param $goodsid
     * @param $quantity
     * @return mixed    1-更新了记录，int-新插入记录的ID
     * @throws Exception
     */
    public function updateOrInsert($userid,$goodsid,$quantity){
        $sql="update ".C("DB_PREFIX")."jewelbox set quantity=quantity+$quantity".
            " where userid=$userid and goodsid=$goodsid ";
//echo $sql;
        $rt=$this->execute($sql,true);   //返回影响的记录数
//echo $rt;
        if($rt > 1 || $rt===false ){
            logfile("Jewelbox updated $rt records:".$sql,LogLevel::EMERG);
            throw new Exception("内部错误！关键字错误。");
        }elseif ($rt==0){
            //需要新增
            $this->userid=$userid;
            $this->goodsid=$goodsid;
            $this->quantity=$quantity;
            $rt=$this->add();
            if(1> $rt){
                logfile("Jewelbox insert failer:".$sql,LogLevel::EMERG);
                throw new Exception("内部错误！无法新增记录。");
            }

        }
        return $rt;    //更新或新增了一条记录
    }
}