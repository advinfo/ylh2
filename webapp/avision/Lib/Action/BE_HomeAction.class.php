<?php
/**
 * 观众服务首页，UI后台接口
 *
 */

require_once APP_PATH.'../public/SafeAction.Class.php';
require_once(LIB_PATH.'Model/ChannelModel.php');
require_once(LIB_PATH.'Model/ConsumpModel.php');
require_once(LIB_PATH.'Model/UserModel.php');
require_once(LIB_PATH.'Model/UserPassModel.php');


class BE_HomeAction extends SafeAction {
	protected $isLogin='false';	//是否已登录标志，anonymous用户被排除
	protected $isBoZhu='false';	//播主标志

	function __construct(){
		parent::__construct(1,'back');
		$this->setIdentity();
		//setPara('$scrType','h');
	}
	//设置当前用户的身份标识变量
	protected function setIdentity(){
		//用户是否已登录
		if( $this->author->isLogin(C('OVERTIME')) && $this->author->getUserInfo('account')!='anonymous' ){
			$this->isLogin='true';
			$userExtAttr=$this->author->getUserInfo(UserModel::userExtAttr);
//dump($userExtAttr);	
//dump($_SESSION['userinfo']);	
			if(null!=$userExtAttr['bozhu'] && false!==stripos('junior,normal,senior', $userExtAttr['bozhu']))
				$this->isBoZhu='true';
		}
    	else {
    		$this->isLogin='false';
    		$this->isBoZhu='false';
    	}
	}


    /**
     * 微信授权登录
     * @param int $chnId 频道ID
     * 
     */
	public function wxLogin($chnId = '', $backUrl='')
	{
	    logfile("chnId=".$chnId."  backUrl=".$backUrl,LogLevel::DEBUG);
		if(empty($backUrl))
		{
			if(0 < $chnId)
			{
				$backUrl = U('HDPlayer/play', array('chnId' => $chnId));
			}
			else
			{
				$backUrl = U('Home/index');
			}
		}
		R('WeixinCall/Apply', array($backUrl));
		exit;
	}


    /**
     * 取频道列表信息数据，以Json数组形式返回
     * @param int $type 0：推荐频道，1：我的频道
     * @param string $searchStr	匹配频道关键词或标题
     * @param char $scrType	='w'请求宽屏数据，其它请求竖屏数据
     * @param string $sort [最热|推荐] 排序条件
     * @param int $categoryid   频道分类ID
     *
     */
    public function channelListJson($type=0,$searchStr='',$scrType='',$page=1,$rows=20,$sort='最热',$categoryid='0'){
        //header("Access-Control-Allow-Origin:*");
        //header("Access-Control-Allow-Methods:*");
        //header("Access-Control-Allow-Headers:*");
        try{
            $chnList=$this->channelList($type,$searchStr,$scrType,$page,$rows,$sort,$categoryid);
            //<a href="__ROOT__/player.php/HDPlayer/play/chnId/{$chn.id}" >
            foreach ($chnList as $key=>$val){
                $chnList[$key]['link']=U('HDPlayer/play','chnId='.$val['id']);
                unset($chnList[$key]['attr']);
            }
            //echo json_encode($chnList,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
            //return;
        }catch (Exception $e) {
            $chnList=array();
        }
        Oajax::ajaxReturn($chnList);
    }

    /**
     * 
     * 查询符合条件的频道，并返回包括显示所需数据的数组，出错抛出错误。
     * @param int $type 0：推荐频道，1：我的频道
     * @param string $searchStr
     * 
     * @return Array
     * @throws
     */
    public function channelList($type=0,$searchStr='',$scrType='',$page=1,$rows=20,$sort='',$categoryid='0'){
    	$fields='id,name,descript,attr';
    	$chnArr=array();	//存储要显示的频道信息
		$cond=array('status'=>'normal');	//只取出正常状态的记录
        //默认仅能查看当前代理商的频道
        $agent=C('agent');
        if(null != $agent) $cond['agent']=$agent;

 		$chndb=D('Channel');
//排序
        if('最热'==$sort) {   $sort='entrytimes desc'; }
        elseif('推荐'==$sort) {  $sort='adpush desc';}
        else {  $sort='entrytimes desc'; }


        if(0==$type){
            //一般查询
            //组织查询条件
            if($categoryid>0) $cond['categoryid']=$categoryid;  //指定分类
            if (''!=$searchStr) {
                //按频道名称或关键词查询频道
                $cond['_string'] = "keyword like '%" . $searchStr . "%' or name like '%" . $searchStr . "%' or descript like '%" . $searchStr . "%' ";
            }
            $chnList=$chndb->field($fields)->page($page,$rows)->where($cond)->order($sort)->select();
        } else{
            //当前用户相关频道

            $userId=$this->userId();
            $userId=150649;
            if($userId<=0){
                throw new Exception("请先登录！");
                return;
            }
            //TODO: 这里要优化，先查询uid列表
            $sql="select A.id, name,descript,attr, (CASE when B.type is null then '属主' else B.type end) as rel from __PRE__channel A ";
            $sql .=" left join __PRE__channelreluser B on chnid=A.id  and A.status='normal' where owner=$userId or (uid=$userId and B.status='正常')";
            $sql=str_replace('__PRE__',C('DB_PREFIX'),$sql);
            //$cond['_string']="id in(select chnid from ".C('DB_PREFIX')."channelreluser where uid=".$userId.")";
            $cond['_string']=" owner = $userId";
            $chnList=$chndb->query($sql);

        }

//echo $chndb->getLastSql();
		if(null==$chnList) throw new Exception("没有符合条件的频道！");   	    	
    	//整理查询结果，从属性中取出图片链接
    	//$baseDir=(null!=C('roomImgView'))?C('roomImgView'):'/room/';
    	foreach ($chnList as $key=>$rec){
			
    		$attr=json_decode($rec['attr'],true);
			if('w'==$scrType){
				$chnList[$key]['img']=R('Channel/getPosterImgUrl', array($attr,$rec['id']));
			}else {
				//$chnList[$key]['img']=R('Channel/getLogoImgUrl', array($attr,$rec['id']));
                $chnList[$key]['img']=R('Channel/getPosterImgUrl', array($attr,$rec['id']));
			}
//echo $chnList[$key]['img'],'<br>',$rec['attr'],$rec['id'],'<br>';			
    	}
    	return $chnList;
    }


    /**
     * 登出，然后跳转到$url指向的地址
     * @param string $url 直接的URL如果是Module/Action形式需要先用U函数获得直接地址
     */
    public function logout($url=""){
    	$auth=new authorize();
    	$auth->logout();
        if(''==$url) $url=U('index');
		redirect($url);
    }
    public function authen($account='',$password='',$chnid=0){
    	$auth=new authorize();
    	$ret=$auth->issue($account,$password);
    	if($ret){
			//登录认证成功
//dump($_SESSION[authorize::USERMENU]);		die();	
    		if($chnid>0){	//携带频道参数直接播放指定频道
    			$this->redirect('HDPlayer/play',array('chnId'=>$chnid));
    			//$play=A('HDPlayer');
  			
    			//$play->play($chnid);

    			return;
    		} else {
	    		$this->redirect('index');
    		}
    	}
    	else{
    		$this->assign('errorMsg','账号或密码错误');
    		$this->login();
    	}
    }

    
    /////////////////////////// append by outao 2016-12-05 /////////////////////
	//临时用
	public function clear(){
		setcookie('user', '',time()-3600,'/');
		setCookie(session_name(),'',time()-3600,'/');
		session_unset();
		session_destroy();
	}

	/**
	 * 发送注册验证短信
	 */
	public function smsSend($phone = '')
	{
		//echo '{"result":"true"}';
		$sms = new Sms();
		//生成6位随机数字
		$code = RandNum(6, null, null, 'num');
		echo $sms->SendRegSms($phone, $code, $ip = getip());
	}


    //============新增 outao 2018-05-09===========

    /**
     * 前端接口，提供登录页面的基本信息
     */
    public function loginIniJson($accept=null,$deny=null){
        $acceptUrl=(null!=$accept)?$accept:Osession::getLoginSuccessUri();  //有传入优先使用，否则使用session记录
        if(null==$acceptUrl) $acceptUrl='/ui';  //都没有使用默认值
        $acceptUrl=urlencode($acceptUrl);
logfile('acceptUrl:'.$acceptUrl,LogLevel::DEBUG);
	    $data=array("ThirdpartyLogin"=>array(
	            array("party"=>"YLH","icon"=>"/Public/images/ylh.png","url"=>"ylhLogin"),
                array("party"=>"WX","icon"=>"/Public/images/wxlog.png","url"=>"/home.php/Home/wxLogin?backUrl={$acceptUrl}")
            ));
       Oajax::ajaxReturn($data);
    }

    /**
     * 前端接口通过ajax登录
     * @param $account  用户账号
     * @param $password MD5后的密码
     */
    public function authenJson($account,$password,$accept=''){
        logfile('accept='.$accept);
        $ret=$this->author->issue($account,$password);
        if($ret){
            //登录认证成功
            if('' != $accept) $url=$accept; //传入登录成功页面优先
            else {  //否则从session中查找
                $url=Osession::getLoginSuccessUri();
                if(null==$url) $url="/ui/#/index";   //登录后的默认首页
            }
            Oajax::successReturn(array("url"=>urlencode($url)));
        }
        else{
            Oajax::errorReturn('账号或密码错误');
        }
    }

    /**
     * 前端接口取滚动图片的信息
     */
    public function loginBanner(){
        $b=array(
            array("image"=>"/img/temp/IMG_9461.jpg","link"=>""),
            array("image"=>"/img/temp/IMG_9362.jpg","link"=>""),
            array("image"=>"/img/temp/IMG_1288.jpg","link"=>""),
            array("image"=>"/img/temp/IMG_2038.jpg","link"=>""),
            array("image"=>"/img/temp/IMG_1876.jpg","link"=>"")
        );
        Oajax::ajaxReturn($b);
    }

    /**
     * 前端接口，进入Home页面先调用此功能
     */
    public function initialJson(){

        $json=array();
        if($this->author->autoIssue()){
            //自动登录成功
            $userInfo=$this->author->getUserInfo();
            $json['userinfo']=array("account"=>$userInfo['account'],"nick"=>$userInfo['userName']);
        }else{
            //未能自动登录
            $url=urlencode("/ui/#/index");
            $json['location']="/ui/#/login?accept={$url}";
        }
        Oajax::ajaxReturn($json);
    }

    const CHNCATEGORY='chncategory';	//频道分类编码在数据字典中的分类
    public function chnCategoryJson(){
        $dbDict=D('Dictionary');
        $cond=array("category"=>self::CHNCATEGORY,"sorder"=>array("EGT",0));
        $list=$dbDict->where($cond)->field("ditem as id, dname as text")->order("sorder")->select();
        //dump($list);
        //echo $dbDict->getLastSql();
        Oajax::ajaxReturn($list);
    }

    public function t(){
        echo "ttt11";
        logfile("tt111",8);
    }
}
?>