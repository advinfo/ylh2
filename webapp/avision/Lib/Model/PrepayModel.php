<?php
/**
 * 预付款、订单对象模型
 */

//require_once APP_PATH.'../public/Authorize.Class.php';
class PrepayModel extends Model {



	/**
	 * 
	 * 新增一条预付单(将废弃)
	 * @param $para array
	 *   ["userid"]=>  string(36) "654"
	 *   ["totalfee"]=>  string(20) "100"
	 *   ["callback"]=>  string(20) "action/model"
	 * @return 订单号
	 */
	public function AddNew($para)
	{
		$attr = array();
		$attr['callback'] = $para['callback'];
		$pay = array();
		$pay['userid'] = $para['userid'];
		$pay['attr'] = json_encode($attr);
		$pay['state'] = '等待付款';
		$pay['totalfee'] = $para['totalfee'];
		$pay['tradeno'] = date('YmdHis', time()).substr(microtime(), 2, 6);
		$pay['createtime'] = time();
		$pay['createstr'] = date('Y-m-d H:i:s', time());
		$newid = $this->add($pay);
		if(false == $newid)
		{
			return '';
		}
		return $pay['tradeno'];
	}

	/**
	 * 
	 * 微信jsapi H5支付
	 * @param $data array
	 *   ["prepay_id"]=>  string(36) "wx201610181702070d0297aa9b0521318529"
	 *   ["tradeno"]=>  string(20) "1324324c309eab579860"
	 * @return 
	 */
	public function WxJsapiH5Pay($data)
	{
		$w['tradeno'] = $data['tradeno'];
		$save = array();
		$save['state'] = '已支付';
		$save['paystr'] = $data['prepay_id'];
		$save['paytype'] = 'WXPAY::JSAPI';
		$save['paytime'] = time();
		$save['paytimestr'] = date('Y-m-d H:i:s', time());
		$this->where($w)->save($save);
		//echo $this->getLastSQL();
	}


    /**
     * 添加新的预付订单
     * @param string $subject  订单标题
     * @param int $totalAmt 订单总金额
     * @param array $detail 订单清单
     * @param int $sellerid 销售商户ID
     * @return int  新的订单ID
     * @throws Exception
     */
    /*
	public function newOrder($subject,$totalAmt=0,$detail=null,$sellerid=0){
	    $author=new authorize();
	    if(!$author->isLogin()) throw new Exception('请先登录。');
        if(mb_strlen($subject)<4) throw new Exception('必须填写订单摘要');
        if(0==$sellerid) throw new Exception('必须提供商户ID');

        $rec=array();
        $rec['userid']=$author->getUserInfo('userId');
        $rec['state']='等待付款';
        $rec['totalfee']=$totalAmt;
        $rec['tradeno']=$this->getTradeno();
        $rec['sellerid']=$sellerid;
        $rec['subject']=$subject;
        $rec['createtime']=time();
        if(is_array($detail)) $rec['attr']=json_encode(array('detail'=>$detail),JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
	    //dump($rec);

        $prepayid=$this->add($rec);
        if(1>$prepayid) throw new Exception('添加订单失败.');
        return $prepayid;
    }*/
    /**
     * 生成不可能重复的订单号
     * @return string
     */
	protected function getTradeno(){
	    return sprintf("%s%08x",date('YmdHis', time()),intval(mt_rand(1,2100).substr(microtime(), 2, 6)) );
    }
}
?>