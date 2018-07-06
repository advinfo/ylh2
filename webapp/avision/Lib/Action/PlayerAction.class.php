<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-11
 * Time: 13:01
 *
 * 播放器后端，与前端UI配合使用
 */

require_once APP_PATH.'../public/SafeAction.Class.php';
require_once COMMON_PATH.'ywzSISDK.php';

require_once(LIB_PATH.'Model/ChannelModel.php');
require_once(LIB_PATH.'Model/ChannelreluserModel.php');
require_once(LIB_PATH.'Model/UserPassModel.php');
require_once(LIB_PATH.'Model/OnlineModel.php');
require_once LIB_PATH.'Model/GiveModel.php';
require_once LIB_PATH.'Model/AnnounceModel.php';

//require_once(LIB_PATH.'Model/StreamModel.php'); //修改为卫星模式后可取消
//require_once(LIB_PATH.'Model/RecordfileModel.php');

require_once(LIB_PATH.'Model/LotteryModel.php');
require_once(LIB_PATH.'Model/WebchatModel.php');

class playerException extends Exception{
    private $text='';
    private $link='';
    /**
     * playerException constructor.
     * @param string $message ”提示信息”
     * @param string $text  按钮上的信息
     * @param string $link  跳转链接
     */
    public function __construct($message = "", $text = "", $link="") {
        parent::__construct($message, 0,null);
        $this->text=$text;
        $this->link=$link;
    }
    public function __get($name){
        if(isset($this->$name)) return $this->$name;
        else throw new Exception('未定义的属性：'.$name);
    }
}

class PlayerAction extends SafeAction {
    protected $dbchn=null;  //频道模型
    protected $dbOnline;    //在线记录模型
    protected $chnRec=null; //当前处理的频道记录
    protected $rcm=0;   //推荐人ID
    function __construct(){
        parent::__construct(2); //不考虑超时
        $this->dbchn=D('channel');
    }

    /**
     * @param int $chnid
     * @param int $vod
     * @param int $rcm  推荐人ID
     */
    public function initialJson($chnid=0,$vod=0,$rcm=0){

        $this->rcm=$rcm;
        $upDal = new UserpassModel();
        if(!empty($rcm))  {
            $upDal->SetUpUser($chnid, $rcm, 'pass');
        }
        $ret=array();
        try{
            if(0==$chnid) throw new playerException('必须提供频道ID','知道了','/ui/#/index');
            $this->chnRec=$this->dbchn->find($chnid);
            if(!is_array($this->chnRec)) throw new playerException('找不到频道：'.$chnid,'知道了','/ui/#/index');
            $this->chnRec['attr']=json_decode($this->chnRec['attr'],true);
            if($this->chnRec['status']!='normal') throw new playerException('频道未启用，请联系播主。','确定','/index.html');

            $this->chkFee();    //检查频道及播主是否有资金播出
            $this->chkLimit();  //检查最大观众限制以及同一账号观众数量限制
            $this->chkUserRight();    //当前用户是否有权进入此频道，若无直接抛出相关错误

            $ret['title']=$this->chnRec['name'];

            $attr=$this->chnRec['attr'];
            //dump($attr);
            $ret['tabs']=(is_array($attr['tabs']))? $ret['tabs']=$attr['tabs']:array(array("text"=>"频道介绍","val"=>101),array("text"=>"点播回放","val"=>104));
            $ret['activetab']=(isset($attr['activetab']))?$attr['activetab']:$ret['tabs'][0]['val'];

            $ret['hbinterval']=C('aliveTime');
            $ret['activeinterval']=600;
            $ret['topimg']=R('Channel/getPosterImgUrl', array($this->chnRec['attr'],$chnid));
            $ret['intr']=$this->chnRec['attr']['info'];
            $ret['airtime']=strtotime($this->chnRec['attr']['livetime']);

            //查看是否有推流
            if(intval($this->chnRec['streamid'])>0){
                $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
                $ret['streamActive']=$sdk->isStreamActive($this->chnRec['streamid']);
            } else{
                $ret['streamActive']=false;
            }
$ret['streamActive']=true;  //TODO
            if($vod>0){
                //申请VOD
                $ret['playmode']='vod';
            }else{
                $ret['playmode']='live';
            }
            //记录传播者
            if($this->userId()>0) {
                $upDal->Rec($chnid,$this->userId(), 'pass');
            }
            //创建在线记录
            $onlineId=$this->newOnline('web',$chnid);
            if(1>$onlineId) throw new playerException('无法创建在线记录。','确定','/ui/#/index');
            $ret['onlineid']=$onlineId;
            $ret['userid']=$this->userId();
            //增加观看计数
            R('Channel/ViewInc',array($this->chnRec['attr'], $this->chnRec, $chnid));
            $this->setPlayInfo('chnid',$chnid);

        }catch (playerException $e){
            $ret['noright']=array("msg"=>$e->getMessage(),"text"=>$e->text,"link"=>$e->link);
            $uri=sprintf("/ui/#/show?chnid=%d&vod=%d&rcm=%d",$chnid,$vod,$rcm);
            Osession::setLoginSuccessUri($uri);
            Osession::setPaySuccessUri($uri);
        }
        //logfile(print_r($ret,true),LogLevel::DEBUG);
        Oajax::ajaxReturn($ret);
    }

    /**
     * 设置播放器相关的持久化信息（信息存储在SESSION变量中
     * @param $name
     * @param $val
     */
    protected function setPlayInfo($name,$val){
        $_SESSION['PlayInfo'][$name]=$val;
    }

    protected function getPlayInfo($name){
        return $_SESSION['PlayInfo'][$name];
    }

    //检查频道及播主是否有资金播出
    private function chkFee(){
        $userDal = new UserModel();
        $fee = $userDal->getAvailableBalance($this->chnRec['owner']);
        if($fee < 0)   {
            //不能进行频道
            throw new playerException('频道已被关闭，请与播主或主办方联系','确定','/index.html');
        }
    }

    //检查最大观众限制以及同一账号观众数量限制
    private function chkLimit(){
        //TODO:
    }

    //根据频道属性及用户与频道关系判断频道是否允许观看，无权观看则抛出错误
    private function chkUserRight(){
        $isLogin=$this->author->autoIssue();
        $chnId=$this->chnRec['id'];
//echo($this->chnRec['type']); die();

        if((! $isLogin || $this->userId()==20 )&& !($this->chnRec['type']=='public')) throw new playerException('请登录后再观看此频道','确定','/ui/#/login');
        if(! $isLogin) $this->author->issue('anonymous','');    //用匿名用户登录方便做在线统计

        if(!$this->isMasterOwner($this->author->getUserInfo(),$this->chnRec) ){
            //若非频道主，助手或平台管理员,且未付费需要做以下检查
            $chnUser = new ChannelreluserModel();
            if($this->chnRec['type']=='private'){
                //会员频道
                $st = $chnUser->WhatViewer($chnId,$this->userId()); // @return 1:可以收看 0:已报名未通过 -1:未报名
                //logfile('WhatViewer:'.$st);
                if(0==$st){
                    throw new playerException('您的申请正在审核中或失效。','确定','/ui/#/index');
                }elseif (-1 == $st){
                    throw new playerException('观看本频道需要您填写一些资料。','继续',U('Channel/SignUp', array('chnId' => $chnId )));
                }

            }

            if(isset($this->chnRec['attr']['userbill']['isbill']) && 'true' == $this->chnRec['attr']['userbill']['isbill']) {
                //收费频道
                $isHaveTicket = $this->IsHaveTicket($chnId);   //检查是否已付费
                if(!$isHaveTicket) throw new playerException('您还没订购此频道。','去订购',U('HDPlayer/chnBill', array('chnId'=>$chnId,'userpass'=>$this->rcm)));
            }
        }

    }

    /**
     * 当前用户是否是频道主，助手或平台管理员
     * @param $userInfo
     * @param $chnInfo
     * @return bool
     */
    protected function isMasterOwner($userInfo, $chnInfo)  {
        if(null != $userInfo)
        {
            $userRoleDb=D('Userrelrole');
            //是否管理员或频道主播
            //主播可以直接进入
            if($userInfo['userId'] == $chnInfo['owner']) return true;

            //助手可以直接进入
            if($userInfo['userId'] == $chnInfo['anchor']) return true;

            //管理员可进入
            if($userRoleDb->isInRole($userInfo['userId'],C('adminGroup'))) return true;
        }
        return false;
    }

    //是否拥有观看票据
    protected function IsHaveTicket($chnId)
    {
        $isHaveTicket = false;

        if(null == $this->author)  {
            //初始化认证模块
            $this->author = new authorize();
        }
        //用户信息
        $userInfo=$this->author->getUserInfo();

        if(null != $userInfo)     {
            $chnUserDal = new ChannelreluserModel();
            $isHaveTicket = $chnUserDal->isHaveTicket($chnId, $userInfo['userId']);
        }

        return $isHaveTicket;
    }

    /**
     * 新建在线记录
     * @param string $objType	在线对象类型
     * @param int $objId		在线对象ID
     * @return	int	$onlineId正常返回在线用户的ID号，同时填写成员变量$onlineArr；失败返回false.
     *
     */
    protected function newOnline($objType, $objId){
        if(null==$this->dbOnline) $this->dbOnline=D('Online');
        if(null==$this->author) $this->author = new authorize();
        /*
                //取IP所在地
                $clientip=$_SERVER['REMOTE_ADDR'];
                $location= @file_get_contents("http://ip.taobao.com/service/getIpInfo.php?ip=".$clientip);

                $location=json_decode($location,true);
        var_dump($location);
                $location=$location['data'];
                $data=array('clientip'=>$clientip);
                if('' != $location['country']) $data['country']=$location['country'];
                if('' != $location['city']) $data['city']=$location['city'];
                if('' != $location['province']) $data['province']=$location['province'];

        */
        //outao 2018-01-30
        $userId=$this->author->getUserInfo('userId');
        if($userId==0) return false;

        $onlineId=$this->dbOnline->newOnline($objType,$objId,$userId, $this->author->getUserInfo('userName') );
        if(false!=$onlineId) {
            $this->onlineArr[]=array("onlineId"=>$onlineId, "objType"=>$objType, "objId"=>$objId);
        }

        return $onlineId;
    }

    public function startOnlineJson($objType,$objId=0){
        $onlineId=$this->newOnline($objType, $objId);
        if(false != $onlineId)
            Oajax::successReturn(array("onlineId"=>$onlineId));
        else
            Oajax::errorReturn('Can not create online record.');
    }

    public function stopOnlineJson($onlineId){
        if(null==$this->dbOnline) $this->dbOnline=D('Online');
        if(false !== $this->dbOnline->setOffline($onlineId))
            Oajax::successReturn();
        else
            Oajax::errorReturn();
    }

    /**
     * 获取频道的客户端收流地址，由于天翼CDN有时间戳防盗链因此获取后应该立即使用
     * @param $chnid 频道ID
     * @return json
     */
    public function getLiveUriJson($chnid){
        try{
            $this->chkUserRight();  //再次检查以免被盗播
            $streamId=$this->dbchn->where("id=".$chnid)->getField('streamid');
            if(1>$streamId) throw new Exception('频道没有绑定直播源。');

            //通过SI调用，向ywz core获取收流地址
            $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
            $json=$sdk->getPlayUri($streamId);
//dump($streamId);
//dump($json);
            $arr=json_decode($json,true);
            if('true'!=$arr['success']) throw new Exception('获取播放地址失败。');

            $hls=$arr['uri'];
        }catch (Exception $e){
            Oajax::errorReturn($e->getMessage());
        }

        Oajax::successReturn(array('uri'=>$hls));
    }

    /**
     * 获取（通过CDN）播放视频文件的地址
     * @param $vodid
     */
    public function getVodUriJson($vodid){
        try{
            //通过SI调用，向ywz core获取点播收流地址
            $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
            $json=$sdk->getVodUri($vodid);
            $arr=json_decode($json,true);
            if('true'!=$arr['success']) throw new Exception('获取播放地址失败。');

            $hls=$arr['uri'];
        }catch (Exception $e){
            Oajax::errorReturn($e->getMessage());
        }
        Oajax::successReturn(array('uri'=>$hls));
    }

    /**
     * @param $onlineID 在线记录数组或Json数组
     */
    public function heartbeatJson($onlineID,$chnid=0){
        $onlineList=(is_array($onlineID))? $onlineID:json_decode($onlineID,true);
        //var_dump($onlineList);//die();
        $ret = array ();
        $item = array();
        //处理在线记录
        foreach ($onlineList as $id){
            //echo $id;
            $item=$this->updateOnline($id);
            if(!empty($item['command']['reject']) || !empty($item['command']['rejectTO']) ) {
                $ret['forcelogout'] = 'true';
                $ret['msg']='您已被强制离线';
                $this->author->logout();
            }
        }



        //读取新的送礼信息
        if(0 != $chnid){
            $dbGive=D('Give');
            $loginTime=$this->author->getUserInfo('activeTime');
            $ret['gift']=$dbGive->getUnread($chnid,$loginTime); //读取未发送过的送礼记录
        }


        //读取新的聊天信息
        if($chnid>0){
            $db=D('Webchat');
            $msgs=$db->getNewMsg($chnid);
            if(is_array($msgs)) $ret['chat']=$msgs;
            //dump($msgs);
        }


        //读取全平台广播信息
//        $ret['broadcast']=array(array('content'=>'现在时间是：'.date('H:i:s'),'stamp'=>time(),'zone'=>mt_rand(1,2)),
//                array('content'=>'中奖号码：'.mt_rand(1000,9999),'stamp'=>time(),'zone'=>mt_rand(1,2)));
        $dbAnnounce=D('Announce');
        $ret['broadcast']=$dbAnnounce->getUnread($chnid);
        if($ret['broadcast']==null) $ret['broadcast']=array();

        //读取抽奖信息
        $dbLottery=D('Lottery');
        $ret['boxs']=$dbLottery->getListInChn($this->getPlayInfo('chnid'));
        foreach ($ret['boxs'] as $k=>$v){
            $ret['boxs'][$k]['enroll_b']=strtotime($v['enroll_b']);
            $ret['boxs'][$k]['enroll_e']=strtotime($v['enroll_e']);
            $ret['boxs'][$k]['draw']=strtotime($v['draw']);
        }
        //dump($ret);
        //$this->postKeepAlive($ret, $playtype, $chnId);
       Oajax::successReturn($ret);
    }

    /**
     * 更新在线记录表。同时取出并发送给在线播放端的命令。
     *
     * 若成功返回符合keepAlive函数返回的数组
     * 若失败返回array('result'=>'false')
     *
     * @param int $onlineId	在线记录ID
     * @return array
     */
    private function updateOnline($onlineId=0){
        if(null==$this->dbOnline) $this->dbOnline=D('Online');

        $ret = array ('result' => 'false' );
        $cond=array("id"=>$onlineId, "isonline"=>'true');

        $onlineRec=$this->dbOnline->field('activetime,refid,command')->where ( $cond)->find();

        if(null==$onlineRec){	//找不到记录或查询出错
            logfile('找不到在线记录：'.$onlineId,1);
            return $ret;
        }
        $data=array('id'=>$onlineId, 'activetime'=>time(), 'command' =>'');
        $result=$this->dbOnline->save($data);
        if(false===$result){
            logfile('更新在线记录失败：'.$onlineId,1);
            return $ret;
        }
        $ret = array ('result' => 'true' );

        if($onlineRec['command']!=null){
            logfile('find command:'.$onlineRec['command'],5);
            $ret ['command'] = json_decode ( $onlineRec['command'], true );
        }

        //是否超过观看时间，需要强制下线？
        if(OnlineModel::isRejectTimeout($onlineId))
        {
            $ret['command']['rejectTO'] = 'true';
        }
        $ret['id'] = $onlineId;

        return $ret;

    }

    public function getVodListJson($chnid){

        $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
        $urlPath='/home.php/SI/getVodList/sichannel/'.$chnid;
        $json=$sdk->sendRequest($urlPath);
        echo $json;
        exit;
    }

    public function t($id){
        echo PHP_VERSION;
        echo version_compare(PHP_VERSION,'5.4.0');
        $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
        $ret=$sdk->isStreamActive($id);
        var_dump($ret);
    }
}