<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-7
 * Time: 17:37
 */

require_once APP_PATH.'../public/Ou.Function.php';
require_once APP_PATH.'Common/functions.php';
//require_once APP_PATH.'../public/Authorize.Class.php';
require_once APP_PATH.'Conf/YLHconfig.php';
require_once(LIB_PATH.'Model/ThirdpartyuserModel.php');
require_once(LIB_PATH.'Model/PrepayModel.php');

require 'vendor/autoload.php';

use YunLianHui\OAuth2;

class AuthorYLH extends AuthorBase
{
    const PARTY='YLH';  //

    protected $oauth_client=null;   //认证接口对象
    protected $config; //配置数组

    public function __construct(){
        //parent::__construct();
        //session_start();
        $this->config=YLHconfig::$config;
        $config=YLHconfig::$config;
        $this->oauth_client= new OAuth2($config['gatewayUrl'],$config['client_id'],$config['client_secret'],$config['client_private_key'],$config['redirect_uri']);
    }

    /**
     * @param $userid   刷新此用户ID本平台的access_token & refresh_token
     *
     * @throws Exception
     */
    public function refreshToken($userid){
        //取用户的refresh_token
        $db=D('Thirdpartyuser');
//$i=['party'=>'YLH','access_token'=>'d66bb1122','refresh_token'=>'7464'];
//$db->update($i,1);
//return;
        $refreshToken=$db->getRefreshToken($userid,self::PARTY);
//var_dump($refreshToken);
        $result=$this->oauth_client->sendAnResourceRequest([
            'client_id' => $this->config['client_id'],
            'client_secret' => $this->config['client_secret'],
            'grant_type' => 'refresh_token',
            'refresh_token' => $refreshToken,
            'timestamp' => (string)time(),
        ],'api/v2/oauth/token');
        $db->update($result,$userid,self::PARTY);
        //dump($result);
        //$webVar['expires']=date("Y-m-d H:i:s",$result['expires_in']+time());
    }

    /**
     * @param $prepayid
     * @throws \YunLianHui\ApiException
     */
    public function pay($prepayid){
        $dbPrepay=D('Prepay');  //预付单、订单表
        $prepay=$dbPrepay->where('id='.$prepayid)->find();
        if(!is_array($prepay)) throw new Exception('找不到此预付单：'.$prepayid);
        $attr=json_decode($prepay['attr'],true);
        $detail= (null!=$attr['detail'])?json_encode($attr['detail'],JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE):' ';

        $dbtpu=D('Thirdpartyuser');
        $accessToken=$dbtpu->getAccessToken($prepay['sellerid'],self::PARTY);
        $result=$this->oauth_client->sendAnResourceRequest([
            'client_id' => $this->config['client_id'],
            'return_url' => $this->config['return_url'],
            'notify_url' => $this->config['notify_url'],

            'access_token' => $accessToken,
            'out_trade_no' => $prepay['tradeno'],
            'subject' => $prepay['subject'],
            'body' => 'aaa',
            'total_amount' => $prepay['totalfee'],
            'timestamp' => (string)time(),
        ],'api/v2/payInit');
var_dump($result);
        if($result['error_code']!='0') throw new Exception('支付接口返回错误：'.$result['error_code']);
        $orderToken=$result['data']['order_token'];

    }
}