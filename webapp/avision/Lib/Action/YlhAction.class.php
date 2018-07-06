<?php
/**
 * 云联惠SDK接口控制器
 */
require_once APP_PATH.'../public/Ou.Function.php';
require_once APP_PATH.'Common/functions.php';
require_once APP_PATH.'../public/Authorize.Class.php';
require_once APP_PATH.'Conf/YLHconfig.php';
require_once(LIB_PATH.'Model/ThirdpartyuserModel.php');
require_once COMMON_PATH.'author/AuthorBase.class.php';
require_once(LIB_PATH.'Model/PrepayModel.php');

require 'vendor/autoload.php';

use YunLianHui\OAuth2;

class YlhAction extends Action{

	protected $oauth_client=null;   //认证接口对象

    public function __construct(){
        parent::__construct(1);
        session_start();
        $config=YLHconfig::$config;
        $this->oauth_client= new OAuth2($config['gatewayUrl'],$config['client_id'],$config['client_secret'],$config['client_private_key'],$config['redirect_uri']);
    }
	/**
	 * 
	 * SDK用户认证后回调
	 */
	public function callback(){
		//$str='GET='.print_r($_GET,true)."\n";
		//$str .='POST='.print_r($_POST,true);
		//logfile($str,LogLevel::DEBUG);
        session_start();
        $config=YLHconfig::$config;
        //$oauth_client = new OAuth2($config['gatewayUrl'],$config['client_id'],$config['client_secret'],$config['client_private_key'],$config['redirect_uri']);
        $authInfo=array();  //记录从YLH返回的所有授权及通信信息

        try{
            $token=$this->oauth_client->getAccessTokenFromCode($_REQUEST['code']);
            $str= "换取token成功<br />令牌：".$token['access_token']."<br />有效期：".$token['expires_in']
                ."<br />作用域：".$token['scope']
                ."<br />刷新令牌：".$token['refresh_token']
            ;
            logfile($str,LogLevel::DEBUG);
            $authInfo=$token;

            $userid=$this->oauth_client->sendAnResourceRequest([
                'client_id' => $config['client_id'],
                'access_token' => $token['access_token'],
                'timestamp' => (string)time(),
            ],'api/v2/getUserId');
            logfile( "获取id成功<br />user_id：".$userid['user_id'],LogLevel::DEBUG);
            $authInfo['openid']=$userid['user_id']; //标准化字段名处理

            $result=$this->oauth_client->sendAnResourceRequest([
                'client_id' => $config['client_id'],
                'access_token' => $token['access_token'],
                'timestamp' => (string)time(),
            ],'api/v2/getUserInfo');
            $str= "获取info成功<br />member_id：".$result['member_id']
                ."<br />member_class：".$result['member_class']
                ."<br />member_type：".$result['member_type']
                ."<br />mobile：".$result['mobile']
                ."<br />rcm_id：".$result['rcm_id']
                ."<br />email：".$result['email'];
            logfile($str,LogLevel::DEBUG);
            foreach ($result as $key=>$val) $authInfo[$key]=$val;
            $authInfo['nickname']=$result['member_id']; //标准化字段名处理

            //在直播系统中注册用户（若需要）并登录
            $this->register($authInfo);

            $uri=Osession::getLoginSuccessUri();
            if(null==$uri) $uri=U('Home/index');

        }catch (\YunLianHui\ApiException $exception){
            $str=print_r('接口请求失败<br> '.'错误信息是:'.$exception->getMessage(),true);
            logfile($str,LogLevel::DEBUG);
            $uri=Osession::getLoginFalseUri();
            if(null==$uri) $uri=U('Home/login');
            setPara('loginMsg','登录失败');
        }
        logfile('New URI:'.$uri,LogLevel::DEBUG);
        //var_dump($_SESSION);

        redirect($uri);

    }

    /**
     * 跳转到YLH会员认证授权页面，完成认证后，携带access_code回调redirect_uri
     */
	public function auth(){
	    $config=YLHconfig::$config;
	    Osession::setLastWorking('auth');
        $oauth_client = new OAuth2($config['gatewayUrl'],$config['client_id'],$config['client_secret'],$config['client_private_key'],$config['redirect_uri']);
        header('Location: '.$oauth_client->getAuthorizationUrl($config['redirect_uri'],'basic_info'));
        //申请pay_points授权时，YLH接口会弹出手机短信认证
    }

    /**
     * 根据YLH返回的认证信息，查询该会员是否已经在YWZ上注册。若未注册则自动注册。然后自动登录。
     * 若已注册刷新token
     */
    protected function register($authInfo){
        $dbtpu=D('Thirdpartyuser');
        $userid=$dbtpu->getUserId(party::YLH, $authInfo['openid']);
        $authInfo['party']=party::YLH;
        if($userid==null || $userid<1) $userid=$dbtpu->register($authInfo); //新增
        else $dbtpu->update($authInfo); //更新

        //查找用户账号及密码强行登录
        $dbUser=D('User');
        $user=$dbUser->where('id='.$userid)->field('account,password')->find();
        if(null==$user) throw new Exception('后台登录失败。');
        $authorize=new authorize();
        $rt=$authorize->issue($user['account'],$user['password']);
logfile("register:after author:".$_SESSION['userinfo']['account'],LogLevel::DEBUG);
logfile("register sessionid:".session_id());
        if($rt==false) throw new Exception('内部错误，登录失败');
    }

    /**
     * 支付完成后前端页面
     */
    public function payReturn(){
        logfile('pay return');
        echo 'pay return';
    }

    /**
     * 支付结果后台通知
     */
    public function payNotify(){
        logfile('pay notify');
        echo 'pay notify';
    }

    public function test($work=''){
        $auth=AuthorBase::instance('YLH');
        $dbPrepay=D('Prepay');
        $detail=array(array('name'=>'红玫瑰','qty'=>19,'price'=>89),array('name'=>'黑玫瑰','qty'=>80,'price'=>109));
        //$orderid=$dbPrepay->newOrder('99朵玫瑰',9988,$detail,157523);
//echo 'id='.$orderid;
       // $auth->pay(2328);
 //return;
        /*
        echo "testing register......<br>";
        $data=array(
            'access_token'=>'acc002',
            'expires_in'=>'20',
            'scope'=>'base',
            'refresh_token'=>'ref002',
            'openid'=>'open002',
            'nickname'=>'user002',
            'mobile'=>'139002',
            'rcm_id'=>'rcm001',
            'token_type'=>'bb'
        );
        echo 'now is:'.time().'<br>';
        try{
            $this->register($data);
            echo 'sucess<br>';
        }catch (Exception $e){
            echo 'err:'.$e->getMessage().'<br>';
        }
        dump($_SESSION['userinfo']);
        */
        //session_destroy();
        //unset($_SESSION);
       // dump($_SESSION);return_url,notify_url,
        $config=YLHconfig::$config;
        $webVar=array('work'=>'','openid'=>'5e93104481a4b60adb5a2b3273405826','member_id'=>'吴小莉','member_class'=>'','member_type'=>'','mobile'=>'9','rcm_id'=>'5','email'=>'111',
            'expires'=>0,'access_token'=>'20a70f480b9427247d1ddb952c3878ebd5654acb','refresh_token'=>'8f249ecc43a66bfffd3174c5d03d73e5f2030e50',
            'out_trade_no'=>123,'subject'=>'order1','total_amount'=>987,'body'=>'good12,good2','order_token'=>'','userid'=>157214);
        $webVar=getRec($webVar,false);
        switch ($work){
            case 'getUserId':
                $userid=$this->oauth_client->sendAnResourceRequest([
                    'client_id' => $config['client_id'],
                    'access_token' => $webVar['access_token'],
                    'timestamp' => (string)time(),
                ],'api/v2/getUserId');
                $webVar['msg']= "获取id成功user_id：".$userid['user_id'];
                $webVar['openid']=$userid['user_id']; //标准化字段名处理
                break;
            case 'getUserInfo':
                $result=$this->oauth_client->sendAnResourceRequest([
                    'client_id' => $config['client_id'],
                    'access_token' => $webVar['access_token'],
                    'timestamp' => (string)time(),
                ],'api/v2/getUserInfo');
                $webVar['msg']= "获取info成功member_id：".$result['member_id']
                    ."<br />member_class：".$result['member_class']
                    ."<br />member_type：".$result['member_type']
                    ."<br />mobile：".$result['mobile']
                    ."<br />rcm_id：".$result['rcm_id']
                    ."<br />email：".$result['email'];

                break;
            case 'refresh': //刷新令牌，令牌刷新后，会获得新的access_token及reflash_token.同时旧的reflash_token失效，但旧的access_token在原有效期内依然有效
                $result=$this->oauth_client->sendAnResourceRequest([
                    'client_id' => $config['client_id'],
                    'client_secret' => $config['client_secret'],
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $webVar['refresh_token'],
                    'timestamp' => (string)time(),
                ],'api/v2/oauth/token');
                dump($result);
                $webVar['expires']=date("Y-m-d H:i:s",$result['expires_in']+time());
                break;
            case 'refreshByUserid':
                $auth->refreshToken($webVar['userid']);
                echo "refresh token ok!";
                break;
            case 'payInit':
                $result=$this->oauth_client->sendAnResourceRequest([
                    'client_id' => $config['client_id'],
                    'return_url' => $config['return_url'],
                    'notify_url' => $config['notify_url'],

                    'access_token' => $webVar['access_token'],
                    'out_trade_no' => $webVar['out_trade_no'],
                    'subject' => $webVar['subject'],
                    'body' => $webVar['body'],
                    'total_amount' => $webVar['total_amount'],
                    'timestamp' => (string)time(),
                ],'api/v2/payInit');
                dump($result);
                $webVar['order_token']=$result['data']['order_token'];
                break;
            case 'oderQuery':
                $result=$this->oauth_client->sendAnResourceRequest([
                    'client_id' => $config['client_id'],
                    'out_trade_no' => $webVar['out_trade_no'],
                    'timestamp' => (string)time(),
                ],'api/v2/oderQuery');
                dump($result);
                break;
            case 'Cashier': //跳转到支付平台支付
                header('Location: '.$config['gatewayPay'].'/?order_token='.$webVar['order_token']);
                break;
        }

        $this->assign($webVar);
        $this->display('test');
    }

}
?>