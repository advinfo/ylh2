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
}