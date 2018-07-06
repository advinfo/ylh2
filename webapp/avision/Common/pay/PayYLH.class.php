<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-7
 * Time: 21:06
 *
 * 云联惠支付
 */
require_once APP_PATH.'../public/Ou.Function.php';
require_once APP_PATH.'Common/functions.php';
//require_once APP_PATH.'../public/Authorize.Class.php';
require_once APP_PATH.'Conf/YLHconfig.php';
require_once(LIB_PATH.'Model/ThirdpartyuserModel.php');

require 'vendor/autoload.php';

use YunLianHui\OAuth2;

class PayYLH extends PayBase
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

}