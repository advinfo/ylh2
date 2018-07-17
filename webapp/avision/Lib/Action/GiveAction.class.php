<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-6-19
 * Time: 20:55
 * 礼品功能服务端接口
 */
require_once APP_PATH.'../public/SafeAction.Class.php';
require_once LIB_PATH.'Model/GiveModel.php';
require_once LIB_PATH.'Model/JewelboxModel.php';
require_once LIB_PATH.'Model/GoodsModel.php';
require_once LIB_PATH.'Model/ChannelModel.php';
require_once LIB_PATH.'Model/ConsumpModel.php';
require_once(LIB_PATH.'Model/PrepayModel.php');

require_once COMMON_PATH.'pay/PayBase.class.php';

class GiveAction extends SafeAction{
    const GIFT_CATEGORY='virtual';

    protected $dbGive=null;   //送礼记录数据模型

    public function __construct()   {
        parent::__construct(2,'/ui/#/login');
        $this->dbGive=D('Give');
    }

    /**
     * 处理前端礼物发送功能
     * @param $chnId
     * @param $goodsId
     * @param $qty
     * @param int $sender
     * @param int $receiver
     */
    public function send($chnId,$goodsId,$qty,$sender=0,$receiver=0){

        try{
            $retArr=array();    //记录返回数组

            //检查发送者信息
            if(!$this->author->isLogin()) throw new Exception('请先登录');
            $userid=$this->userId();
            $userLevel=$this->author->getUserInfo('userlevel');
            $vipLevel=$this->author->getUserInfo('viplevel');
            if($userid!=$sender) throw new Exception('送礼用户信息不符:'.$userid);
            $loginTime=$this->author->getUserInfo('activeTime');

            //接收者信息
            if(0==$receiver){
                $dbChn=D('Channel');
                $rt=$dbChn->where('id='.$chnId)->getField('owner');
                if(null==$rt) throw new Exception('找不到收礼人。');
                $receiver=$rt;
            }

            //检查赠送者是否有足够的礼物
            $dbJewelbox=D('Jewelbox');
            $qtyInBox=$dbJewelbox->getQty($userid,$goodsId);
            if($qty>$qtyInBox){
                //宝箱内数量不足
                $retArr['loadUrl']=U('askBuy');
                $retArr['para']=array('chnId'=>$chnId,'goodsId'=>$goodsId,'qty'=>$qty,'sender'=>$sender,'receiver'=>$receiver,
                        'qtyInBox'=>$qtyInBox);
                throw new Exception('宝箱内礼物数量不足');
            }

            //检查礼物是否可赠送，是否有权赠送
            if(null==$goodsId) throw new Exception('必须指定要赠送的礼物');
            $dbGoods=D('Goods');
            $cond=array('id'=>$goodsId,'category'=>self::GIFT_CATEGORY,'status'=>'正常');
            $goodsRec=$dbGoods->where($cond)->find();
//echo $dbGoods->getLastSql();
//dump($goodsRec);
            if(count($goodsRec)<1 ) throw new Exception('找不到要赠送的礼物');
            if( $goodsRec['userlevel']>$userLevel || $goodsRec['viplevel']>$vipLevel) throw new Exception('您的等级不足');

            //处理赠送事务
            $dbJewelbox->startTrans();
            try{
                $recId=$this->dbGive->addRec($chnId,$goodsId,$qty,$sender,$receiver);   //创建赠送记录
                if($recId<1) throw new Exception('');
                $cond=array('userid'=>$userid,'goodsid'=>$goodsId);
                $data=array();
                $data['quantity']=array('exp','quantity-'.$qty);
                $data['amount']=array('exp','amount+'.$qty);
                $rt=$dbJewelbox->where($cond)->save($data);
                if($rt<1) throw new Exception('');
//echo $dbJewelbox->getLastSql();
//dump($rt);
            }catch (Exception $Ex){
                $dbJewelbox->rollback();
                throw new Exception('内部错误，送礼失败。');
            }
            $dbJewelbox->commit();



            $recs=$this->dbGive->getUnread($chnId,$loginTime); //读取未发送过的送礼记录
            $retArr['gifts']=$recs;
//dump($recs);
            Oajax::successReturn($retArr);
        }catch (Exception $e){
            Oajax::errorReturn($e->getMessage(), $retArr);
        }
    }

    /**
     * 取频道可用礼品列表
     * @param int $chnId 频道ID
     */
    public function giftListJson($chnId=0){
        header("Access-Control-Allow-Origin:*");
        header("Access-Control-Allow-Methods:*");
        header("Access-Control-Allow-Headers:*");
        $dbChannel=D('Channel');
        $dbGoods=D('Goods');
        $userLevel=$this->author->getUserInfo('userlevel');
        $vipLevel=$this->author->getUserInfo('viplevel');
        //var_dump($userLevel,$vipLevel);
        //dump($_SESSION['userinfo']);
        try{
            if($chnId<1) throw new Exception('频道ID错误：'.$chnId);
            $gift=getExtAttr($dbChannel,array("id"=>$chnId),"gift");
            //dump($gift);
            $cond=array('category'=>'virtual','status'=>'正常');

            //频道有定义限定礼物范围，没定义取全部礼物
            if(count($gift)>0) {
                $goodIds='';
                foreach ($gift as $key=>$val){
                    if(''==$goodIds) $goodIds=$val['id'];
                    else $goodIds .=','.$val['id'];
                }
                $cond['id']=array('in',$goodIds);
            }

            $fields='id,price_c as price,value,name,detail,picture,userlevel,viplevel';
            $goods=$dbGoods->where($cond)->field($fields)->order('value')->select();
            //echo $dbGoods->getLastSql();
            //dump($goods);
            foreach ($goods as $key=>$val){
                $order=$this->searchOrder($gift,$val['id']);
                if(0==$order) $order=$val['value'];
                $goods[$key]['order']=$order;
                $goods[$key]['picture']=$dbGoods->getFullImgUrl($val['picture']);
                if(0!=$val['userlevel'] && $val['userlevel']>$userLevel) $goods[$key]['disableNote']='要求用户等级'.$val['userlevel'].'以上。';
                elseif(0!=$val['viplevel'] && $val['viplevel']>$vipLevel) $goods[$key]['disableNote']='要求VIP等级'.$val['viplevel'].'以上。';
                else $goods[$key]['disableNote']='';
            }


            //dump($goods);
            echo json_encode($goods,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
        }catch (Exception $e){
            echo '[]';	//返回空数组
            logfile($e->getMessage(),LogLevel::WARN);
        }
        return;
        //echo $dbChannel->getLastSql();


    }
    //在$gift按商品ID，查找排列顺序
    private function searchOrder($gift,$goodId){
        foreach ($gift as $key=>$val){
            if($val['id']==$goodId) return intval($val['order']);
        }
        return 0;
    }
    //送礼商品不足时弹出购买界面
    public function askBuy(){
        $webVarTpl=array('chnId'=>0,'goodsId'=>0,'qty'=>0,'sender'=>0,'receiver'=>0, 'qtyInBox'=>0);
        $webVar=getRec($webVarTpl,false);   //没传入新值，则保留默认值
        $webVar['buyQty']=$webVar['qty']-$webVar['qtyInBox'];   //需要购买的数量
        try{
            if(1>$webVar['chnId'] || 1>$webVar['goodsId']) throw new Exception('参数错误！');
            if($webVar['qty']<=$webVar['qtyInBox']) throw new Exception('土豪！');
            $uid=$this->userId();
            if(1>$uid || $uid != $webVar['sender']) throw new Exception('不知道谁送的礼！');

            $dbGoods=D('Goods');
            $cond=array('id'=>$webVar['goodsId'],'category'=>self::GIFT_CATEGORY,'status'=>'正常');
            $goodsRec=$dbGoods->where($cond)->find();
//echo $dbGoods->getLastSql();
//dump($goodsRec);
            if(count($goodsRec)<1 ) throw new Exception('找不到要赠送的礼物');
            $webVar['goodsName']=$goodsRec['name'];
            $webVar['unitPrice']=$goodsRec['price_c'];
            $webVar['amount']=$webVar['unitPrice']*$webVar['buyQty'];

        }catch (Exception $e){
            echo $e->getMessage();
            return; //出现异常只可能是非法调用因此不考虑界面
        }
        $this->assign($webVar);
        $tm=date('YmdHis', time());

        $this->display();
    }

    //支付，并显示支付结果
    public function launchPay(){
        //dump($_REQUEST);
        $webVar=array();
        $prepay=D('Prepay');
        //填写新记录数据
        $prepay->userid=$this->userId();
        $prepay->stat='等待付款';
        $prepay->totalfee=$_POST['amount']; //订单总金额
        $prepay->paytype=$_POST['paychannel'];
        //$prepay->ellerid=0;   //销售这用户ID，当前没有商家，默认是系统账号system
        $prepay->subject="购买{$_POST['buyQty']}个，{$_POST['goodsName']}。";
        $prepay->attrArr=array(
            "detail"=>array(    //订单明细列表，一张订单可能有多种货物
                array("goodsId"=>$_POST['goodsId'], "goodsName"=>$_POST['goodsName'], "unitPrice"=>$_POST['unitPrice'], "qty"=>$_POST['buyQty'])
            ),
            "sender"=>$_POST['sender'], //送礼者
            "receiver"=>$_POST['receiver'],     //收礼者
            "chnId"=>$_POST['chnId']        //发生的频道
        );
        try{
            //业务对象实例
            $pay=PayBase::instance($_POST['paychannel']);
            if(null==$pay) throw new Exception('不支持此支付通道：'.$_POST['paychannel']);
            $pay->bindData($prepay);
            $tradeno=$pay->createOrder();    //内部进行数据合理校验，抛出错误.正常返回订单号
            $pay->pay();
            $webVar['msg']="付款成功";
        }catch (Exception $ex){
            $webVar['msg']= $ex->getMessage();
        }
        $this->assign($webVar);
        $this->display();
    }
}