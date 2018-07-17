<?php
/**
 * 预付款、订单对象模型
 * !!重要!!本model有非标准的跨项目引用，在本文件中不能使用项目路径相关的常量
 */

class PrepayModel extends Model {

    protected $m_record=array();    //订单记录缓存，同表结构。attrArr把attr的Json展开成数组

    public function __set($field,$value){
        $this->m_record[$field]=$value;
    }
    public function __get($field){
        return $this->m_record[$field];
    }
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
		$pay['attr'] = json_encode2($attr);
		$pay['state'] = '等待付款';
		$pay['totalfee'] = $para['totalfee'];
		$pay['tradeno'] = $this->getTradeno();  //date('YmdHis', time()).substr(microtime(), 2, 6);
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
     * 根据缓存数据添加新的预付订单

     * @return int  新的订单记录ID
     * @throws Exception
     */
	public function newOrder(){
        $this->m_record['tradeno'] = $this->getTradeno();  //date('YmdHis', time()).substr(microtime(), 2, 6);
        $this->m_record['createtime'] = time();
        $this->m_record['createstr'] = date('Y-m-d H:i:s', time());
        $this->m_record['attr']=json_encode2($this->m_record['attrArr']);

        $prepayid=$this->add($this->m_record);
        if(1>$prepayid) throw new Exception('添加订单失败.');
        $this->m_record['id']=$prepayid;
        return $prepayid;
    }
    /**
     * 生成不可能重复的订单号
     * @return string
     */
	protected function getTradeno(){
	    return sprintf("%s%08x",date('YmdHis', time()),intval(mt_rand(1,2100).substr(microtime(), 2, 6)) );
    }
}
?>