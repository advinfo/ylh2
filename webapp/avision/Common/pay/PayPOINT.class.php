<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-7-16
 * Time: 16:03
 * 点数支付业务处理类
 */
require_once(LIB_PATH.'Model/ConsumpModel.php');
require_once(LIB_PATH.'Model/JewelboxModel.php');

class PayPOINT extends PayBase
{
    const SYSTEMOPERATOR=3;
    public function pay(){
        //准备消费记录数据
        $userid=$this->prepay->userid;  //支付账号ID
        $goodsid=$this->prepay->attrArr['detail'][0]['goodsId'];
        $quantity=$this->prepay->attrArr['detail'][0]['qty'];
        $consump=D('Consump');
        $consumpRec=array("userid"=>$userid, "receipt"=>0, "payment"=>$this->prepay->totalfee,
            "objtype"=>ConsumpModel::$TYPE['gift'], "objid"=>$goodsid,
            "qty"=>$quantity, "operator"=>self::SYSTEMOPERATOR,
            "name"=>$this->prepay->attrArr['detail'][0]['goodsName'], "note"=>$this->prepay->subject,
            "prepayid"=>$this->prepay->id,"happen"=>date("Y-m-d H:i:s"));
//dump($consumpRec);
//dump($this->prepay);
//dump(ConsumpModel::$TYPE);
        //需要同时修改消费表，和宝箱数据
        $consump=D('Consump');
        $jewelbox=D('Jewelbox');
        $balance=$consump->getBalance($userid);   //点数余额
//echo $consump->getLastSql();
        if($this->prepay->totalfee>$balance) throw new Exception('点数余额不足，请先充值:'.$this->prepay->totalfee.'>'.$balance);
        $consump->startTrans();
        try{
            $consump->addRec($consumpRec);  //新建消费记录
            $jewelbox->updateOrInsert($userid,$goodsid,$quantity);    //$userid,$goodsid,$quantity
        }catch (Exception $e){
            $consump->rollback();
            throw new Exception($e->getMessage());  //继续往外抛错误
        }
        $consump->commit();

    }

    /**
     * 新建订单前校验数据
     */
    public function validate(){
        parent::validate(); //调用父类方法进行基本校验
        //若需要增加此支付通道的特有校验
    }
}