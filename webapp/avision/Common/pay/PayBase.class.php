<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-7
 * Time: 21:02
 *
 * 第三方支付基本类
 * 不同的第三方支付类文件默认存放在相同目录下，文件名Pay.$第三方标识.class.php
 */

require_once APP_PATH.'../public/Authorize.Class.php';

abstract class PayBase
{
    protected $prepay=null;   //订单数据模型
    /**
     * 取实例
     * @param string $party 支付方式或支付通道
     * @param string $name  对应支付处理通道处理类文件名称
     */
    static public function instance($party,$name=''){
        $className=(''==$name)?'Pay'.$party : $name;
        $fileName=COMMON_PATH.'pay/'.$className.'.class.php';

//var_dump($fileName);
        if(is_file($fileName)){
            include_once($fileName);
            return new $className();
        }
        else {
            return null;
        }
     }

     //子类必须实现以下抽象方法

    /**
     * 处理订单支付
     * @return mixed
     */
     abstract public function pay();

    /**
     * 关联订单数据模型
     * @param $model
     */
    public function bindData($model){
        $this->prepay=clone $model;
    }

    /**
     * 生成YWZ系统的订单
      * @return string   YWZ系统的订单识别字串，注意不是订单记录号。
     * @throws Exception
     */
    public function createOrder(){
        $this->validate();
        $rt=$this->prepay->newOrder();
        if($rt>0) return $this->prepay->tradeno;
        else throw new Exception('新建订单失败.');
    }

    /**
     * 新建订单前检查数据合法性，之类中可重写或扩充校验方法
     * 在父类的方法中只进行公共的基本校验
     */
    public function validate(){
        $userInfo=authorize::getUserInfo(); //取当前用户信息
        //dump($userInfo);
        if(null==$userInfo) throw new Exception('请先登录！');
        if($this->prepay->userid != $userInfo['userId']) throw new Exception('付费用户不符。');
        if($this->prepay->totalfee <=0) throw new Exception('订单金额应大于0');

    }

}