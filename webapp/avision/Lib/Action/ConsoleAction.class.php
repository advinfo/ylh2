<?php
/**
 * 直播控制台相关服务，为播主提供的功能
 */
//require_once APP_PATH.'../public/SafeAction.Class.php';
//require_once APP_PATH.'../public/AdminMenu.class.php';
require_once COMMON_PATH.'AdminBaseAction.class.php';

require_once COMMON_PATH.'package.class.php';
require_once COMMON_PATH.'stream.class.php';
require_once COMMON_PATH.'platform.class.php';
require_once APP_PATH.'../public/FileUpload.Class.php';
require_once LIB_PATH.'Model/ConsumpModel.php';
require_once(LIB_PATH.'Model/ConsumpUserViewModel.php');
require_once LIB_PATH.'Model/ChannelModel.php';
require_once LIB_PATH.'Model/RecordfileModel.php';
require_once(LIB_PATH.'Model/UserrelroleModel.php');
require_once LIB_PATH.'Model/StreamModel.php';
require_once LIB_PATH.'Model/StreamDetailViewModel.php';
require_once LIB_PATH.'Action/ChannelAction.class.php';
require_once APP_PUBLIC.'aliyun/Sms.Class.php';
require_once(LIB_PATH.'Model/UserPassModel.php');

class ConsoleAction extends AdminBaseAction {
	
    
	public function overView(){
		$this->baseAssign();
		$webvar=array();
		$chn = new ChannelAction();

		//播主认证信息
		$userExtAttr=$this->auth->getUserInfo(UserModel::userExtAttr);
		$phoneVerify=$userExtAttr['phoneVerify'];
		$rnVerify=$userExtAttr['rnVerify'];
		if(null!=$phoneVerify) $webvar['phoneVerify']=$phoneVerify;
		if(null!=$rnVerify) $webvar['rnVerify']=$rnVerify;

		$dbConsump=D('Consump');
		$webvar['balance']=$dbConsump->getBalance($this->userId());
		$webvar['usable']=number_format($webvar['balance']+$this->getUserInfo('credit'));
		$webvar['balance']=number_format($webvar['balance']);
		
		$objPkg=new package();
		$webvar['packages']=$objPkg->pkgCount($this->userId());
		$dbRecFile=D('Recordfile');
		$webvar['recordFiles']=$dbRecFile->countByUser($this->userId());
		
		//频道信息
		$dbChannel=D('Channel');
		$chnList=$dbChannel->getListByOwner($this->userId(), 'id');
		$channels=count($chnList,COUNT_NORMAL);
		
		$dbStreamDt=D('StreamDetailView');
		//在attr字段抽取有用信息
		foreach ($chnList as $key=>$rec){
			$attr=json_decode($rec['attr'],true);
			$chnList[$key]['livetime'] =(isset($attr['livetime']))?substr($attr['livetime'],0,16):'未指定';
			$chnList[$key]['livetime'].=(''!=$attr['livekeep'])?' 时长 '.$attr['livekeep'].' 分钟':'';
			$chnList[$key]['logourl'] = $chn->getLogoImgUrl(json_decode($rec['attr'], true), $rec['id']);;
			//流信息
	
			$rec=$dbStreamDt->getDetailById($rec['streamid']);
			if(null!=$rec){
				//找到流
				$chnList[$key]['streamName']=mb_substr($rec['name'],0,16,'utf8');
				$chnList[$key]['isactive']=$rec['isactive'];
			}else {
				//没找到流
				$chnList[$key]['streamName']='没绑定';
				$chnList[$key]['isactive']='false';
			}
		}
		
		$webvar['channels']=$channels;
		$webvar['chnList']=$chnList;
		$webvar['userName']=$this->userName();
		$webvar['wxopenid']=$this->getUserInfo('wxopenid');
		if(empty($webvar['wxopenid']))
			$webvar['wxopenid'] = null;

		$this->assign($webvar);
    	$this->show('overView');
	}

	//用户提现界面,仅限手机
	public function takecashout()
	{
	}

	public function myaccount()
	{
		//检查是否登录
		$id = $this->userId();
		if(empty($id))
		{
			//认定未登录，跳转到登录界面
			$this->redirect('Home/login');
			exit;
		}

		$webvar['username'] = $_SESSION['userinfo']['userName'];
		$webvar['bozhu'] = $_SESSION['userinfo']['bozhu'];
		if(empty($_SESSION['userinfo']['password']))
		{
			$webvar['havePwd'] = 'no';
		}
		else
		{
			$webvar['havePwd'] = 'yes';
		}

		//获取推荐码
		$userDal = new UserModel();
		$userInfo = $this->auth->getUserInfo();
		$userInfo['refCode'] = $userDal->getRefCode($userInfo, $userInfo['userId']);
		//设置当前的SESSION，防止refCode不断更新
		$_SESSION['userinfo'] = $userInfo;
		$webvar['refCode'] = $userInfo['refCode'];

		$upDal = new UserpassModel();
		$webvar['refNum'] = $upDal->refCount($id, 'pay');

		//播主认证信息
		$userExtAttr=$this->auth->getUserInfo(UserModel::userExtAttr);
		if(!empty($userExtAttr['phoneVerify']))
		{
			$webvar['phoneVerify'] = $userExtAttr['phoneVerify'];
		}
		if(!empty($userExtAttr['rnVerify']))
		{
			$webvar['rnVerify'] = $userExtAttr['rnVerify'];
		}
		if(!empty($userExtAttr['refCodeId']))
		{
			$webvar['refCodeId'] = '1';
		}

		$dbConsump=D('Consump');
		$webvar['balance']=$dbConsump->getBalance($this->userId());
		$webvar['usable']=number_format($webvar['balance']+$this->getUserInfo('credit'));
		$webvar['balance']=number_format($webvar['balance']);

		$objPkg=new package();
		$webvar['packages']=$objPkg->pkgCount($this->userId());
		$dbRecFile=D('Recordfile');
		$webvar['recordFiles']=$dbRecFile->countByUser($this->userId());

		//频道信息
		$dbChannel=D('Channel');
		$chnList=$dbChannel->getListByOwner($this->userId(), 'id');
		$channels=count($chnList,COUNT_NORMAL);
		$webvar['channels']=$channels;

		//现金钱包
		$webvar['cash'] = 0;
		$dbCashflow=D('cashflow');
		$rs = $dbCashflow->field('balance')->where('userid='.$this->userId())->order('id desc')->find();
		if(isset($rs) && isset($rs['balance']))
		{
			$webvar['cash'] = $rs['balance'];
		}

		//已绑定的微信
		$webvar['wxopenid']=$this->getUserInfo('wxopenid');
		if(empty($webvar['wxopenid']))
			$webvar['wxopenid'] = null;

		$this->assign($webvar);
		$this->display();

	}
	
	/**
	 * 
	 * 查询套餐情况
	 */
	public function packageList(){
		$this->baseAssign();
		
		$webvar=array('mainTitle'=>'可用套餐列表');
		$this->assign($webvar);
    	$this->show();
	}
	public function getPkgListAjax(){
		$pkg=new package();
		$result=$pkg->pkgList($this->userId(),true);	//取可用消费包列表数组
		if(null!=$result) echo json_encode($result);
		else echo '[]';
	}
	
	/**
	 * 
	 * 收支明细查询
	 */
	public function consumeList(){
		$this->baseAssign();
	$webVar=array('work'=>'init','account'=>'','objtype'=>0,'name'=>'',
 			'beginTime'=>date('Y-m-d',strtotime('-1 month')),'endTime'=>date('Y-m-d'));
 		
 		pagination::clear(ConsumpUserViewModel::CONSUMPLIST);
 		pagination::clear(ConsumpUserViewModel::CONSUMPLIST.'total');
 		$db=D('userrelrole');
 		$isAdmin=$db->isInRole($this->userId(),C('adminGroup'));
 		if($isAdmin){
 			$webVar['isAdmin']='true';
 		}else{
 			$webVar['isAdmin']='false';
 			$webVar['account']=$this->getUserInfo('account');
//dump($webVar); 			
 		}
		$this->assign($webVar);
    	$this->show();
	}

	/**
	 * 
	 * 身份认证
	 */
	public function realname($scrType='w'){
		$this->baseAssign();
	
		$this->show();
	}
	
	/**
	 * 
	 * 推流源管理
	 */
	public function stream(){
		$f=microtime(true);
		$s=microtime(false);
//printf("%04X,%08X",$f,$f);
//var_dump($f,$s);		
		$this->baseAssign();
		pagination::clear(stream::STREAMINDEX);
		$webVar=array('mainTitle'=>'推流源管理');
		$webVar['isAdmin']=$this->isAdmin;
		if($this->isOpPermit('A')||'true'==$this->isAdmin){	//是否只能观看自己(没观看所有的 )
 			$webVar['viewSelf']='false';
 			$webVar['ownerAccount']='';
 		}else{
 			$webVar['viewSelf']='true';
 			$webVar['ownerAccount']=$this->getUserInfo('account');	//默认只查找当前用户所属频道/VOD的用户
 		}
 		//初始查询
		$_REQUEST['ownerAccount']=$webVar['ownerAccount'];
		$stream=new stream();
		$stream->recordIndexCache();
		
		$this->assign($webVar);
		$this->show();
	}
	//按查询条件返回datagrid格式数据
	public function streamListAjax($page=1,$rows=10,$work=''){
		if('init'==$work){ echo '[]'; return; }	//初始调用只返回空数组
		$stream=new stream();
		if('search'==$work){
			$stream->recordIndexCache();
		}
		$stream->getDetailListAjax($page,$rows);
		return;
	}
	//新增
	public function saveStreamAjax(){
		$recTpl=array('account'=>'','idstring'=>'','platform'=>'','name'=>'','pushkey'=>'','record'=>'');
		$rec=getRec($recTpl,false);
		try{
			if('' === $rec['account']){
				//没指定属主账号，用当前用户作为属主，这是播主的操作
				$rec['owner']=$this->userId();
				$rec['account']=$this->getUserInfo('account');
			}else {
				//管理员可以指定任何人的推流
				if(''==$rec['account']) throw new Exception('必须指定推流所属的播主！');
				include_once(LIB_PATH.'Model/UserModel.php');
				$dbUser=D('User');
				$cond=array('account'=>$rec['account'],'bozhu'=>array('NEQ','no'));
				$result=$dbUser->where($cond)->getField('id');
//var_dump($result);				
				if(1>$result) throw new Exception('找不到指定的播主。');
				$rec['owner']=$result;
			}
			
			$rec['creator']=$this->userId();
			$stream=new stream();
			if($stream->checkMaxStreamLimit($rec['owner'])) throw new Exception($rec['account'].'已达到最大推流数量限制，保存失败。');
			$result=$stream->createRec($rec);
			if(false==$result) throw new Exception('无法增加推流源，可能是识别字串已被占用。');
			$rec['id']=$result;
		}catch (Exception $e){
			//出错
			echo json_encode(array(	'isError' => true,
				'msg' => $e->getMessage() ));
			return;
		}
		echo json_encode($rec);
	}
	
	//更新
	public function updateStreamAjax(){
		$recTpl=array('id'=>0,'account'=>'','owner'=>'','idstring'=>'','platform'=>'','name'=>'','pushkey'=>'','record'=>'','status'=>'');
		$rec=getRec($recTpl,false);
		$stream=new stream();
		try{
			if(1>$rec['id']) throw new Exception('必须指定要更新的记录。');
			if(''==$rec['owner']) throw new Exception('要按“查询”按钮取得查询结果后才能添加记录。');
			//管理员可能修改属主
			if('true'==$this->isAdmin){
				include_once(LIB_PATH.'Model/UserModel.php');
				$dbUser=D('User');
				$owner=$dbUser->getUserId($rec['account']);
				if(1>$owner) throw new Exception('错误：找不到您输入的属主！');
				$rec['owner']=$owner;
			}
			$result=$stream->updataRec($rec);
			if(false===$result) throw new Exception('更新错误，请重新查询后再试。');
		}catch (Exception $e){
			echo json_encode(array(	'isError' => true,'msg' => $e->getMessage() ));
			return;
		}
		echo json_encode($rec);
		return;
	}
	//删除
	public function destroyStreamAjax($id){
		$stream=new stream();
		$result=$stream->deleteRec($id);
		if(false!=$result) echo json_encode(array(	'success' => true));
		else echo json_encode(array(	'isError' => true,
					'msg' => '无法删除'	));
	}
	
	/**
	 * 
	 * 流录像管理
	 */
	public function record(){
		$this->baseAssign();

		//$this->show();
	}

	public function memberMgr()
	{
		$this->baseAssign();
		$this->show();
	}

	public function EditBaseClearDis($chnId)
	{
		$chnAct = new ChannelAction();
		$chnAct->EditBaseClearDis($chnId);
	}

	public function chnBase()
	{
		$webVar['chnId'] = getPara('chnId');;
		$chnDal = D('channel');
		$chn = new ChannelAction();
		$r = $chnDal->where(array('id'=>$webVar['chnId']))->find();
		if(!is_array($r))
		{
			$r = $chnDal->where(array('owner'=>$this->userId()))->find();
			$webVar['chnId'] = $r['id'];
		}
		$webVar['chnName'] = $r['name'];
		//var_dump($r);
		$attr = json_decode($r['attr'], true);
		$webVar['discuss'] = $attr['discuss'];
		$webVar['stream'] = $r['streamid'];
		$webVar['livetime'] = $attr['livetime'];
		$webVar['livekeep'] = $attr['livekeep'];
		if(empty($attr['tplname']))
			$attr['tplname'] = 'play';
		$webVar['tplname'] = $attr['tplname'];

		$webVar['EditBaseClearDis'] = U('EditBaseClearDis');
		$webVar['viewurl'] = C('webdomain').'r.php?i='.$webVar['chnId'].'&u='.$r['owner'];
		$webVar['editurl'] = U('chnEdit', array('chnId' => $webVar['chnId']));
		$webVar['logoUrl'] = $chn->getLogoImgUrl($attr, $webVar['chnId']).'?'.time();
		$webVar['coverUrl'] = $chn->getPosterImgUrl($attr, $webVar['chnId']).'?'.time();

		$this->baseAssign();
		$this->assign($webVar);
		$this->assign($r);

		setPara('chnId', $webVar['chnId']);
		$this->show('chnBase');
	}

	public function chnEdit($chnId = 0)
	{
		$chnDal = D('channel');
		$u = $_POST;

		//判断权限
		$power = $this->IsGetRightChn($chnId);
		if(0 < $power)
		{
			$r = $chnDal->where(array('id'=>$chnId))->find();
			$r['name'] = htmlspecialchars(str_replace("\n", "", $u['name']));
			$r['descript'] = htmlspecialchars(str_replace("\n", "", $u['descript']));
			$r['status'] = $u['status'];
			$attr = json_decode($r['attr'], true);
			$attr['discuss'] = $u['discuss'];
			$attr['livetime'] = $u['livetime'];
			$attr['livekeep'] = $u['livekeep'];
			$attr['tplname'] = $u['tplname'];
			$r['attr'] = json_encode($attr);
			$ret = $chnDal->where(array('id'=>$chnId))->save($r);
			echo '{"result":"true"}';
		}
		else
		{
			echo '{"result":"false", "msg":"no right."}';
		}
	}

	public function chnAdvEdit($chnId = 0)
	{
		$chnDal = new ChannelModel();
		$u = $_POST;

		//判断权限
		$power = $this->IsGetRightChn($chnId);
		if(0 < $power)
		{
			$r = $chnDal->where(array('id'=>$chnId))->find();
			$attr = json_decode($r['attr'], true);
			$r['type'] = $u['type'];
			$r['streamid'] = $u['stream'];
			if(!empty($u['entrytimes']) && 0 <= $u['entrytimes'])
			{
				$r['entrytimes'] = $u['entrytimes'];
			}
			$attr['wxonly'] = $u['wxonly'];
			if(2 == $power)
			{
				if('on' == $u['multiplelogin'])
					$r['multiplelogin'] = 1;
				else
					$r['multiplelogin'] = 0;

				//if(!empty($u['maxvlimit']))
				$r['viewerlimit'] = $u['maxvlimit'];

				if(!empty($u['viewIncRand']) && 0 < $u['viewIncRand'])
				{
					$attr['viewIncRand'] = $u['viewIncRand'];
				}
			}

			$attr['userbill']['isbill'] = $u['userbill'];

			if(1 == $power)
			{
				if(!empty($u['vlimit']))
				{
					$attr['viewerlimit'] = $u['vlimit'];
				}

				if(0 != $r['viewerlimit'])
				{
					if($r['viewerlimit'] < $attr['viewerlimit'])
					{
						$attr['viewerlimit'] = $r['viewerlimit'];
					}
				}
			}

			$list = $chnDal->getBillNameList(true);
			foreach($list as $key => $item)
			{
				$tt = $item['type'];
				$attr['userbill']['bill'.$tt] = $u['bill'.$tt];
			}

			$r['attr'] = json_encode($attr);
			
			$ret = $chnDal->where(array('id'=>$chnId))->save($r);
			echo '{"result":"true"}';
		}
		else
		{
			echo '{"result":"false", "msg":"no right."}';
		}
	}

	public function chnInfoEdit($chnId = 0)
	{
		$chnDal = new ChannelModel();
		$u = $_POST['data'];

		//判断权限
		$power = $this->IsGetRightChn($chnId);
		if(0 < $power)
		{
			//直接把json格式写入数据库
			$u = str_replace("\n", "", $u);
			$attr['info'] = $u;
			$list = json_decode($attr['info'], true);

			if(!empty($attr['info']) && null == $list)
			{
				echo '{"result":"false", "msg":"保存失败，可能是有非法字符！"}';
				exit;
			}

			$chnDal->appendAttr($chnId, $attr);
			//var_dump($chnDal->getLastSQL());
			/*
			//获取attr
			$attr = $chnDal->getAttrArray($chnId);
			//更新attr
			$attr['info'] = $u;
			$save['attr'] = json_encode($attr);
			//var_dump($save['attr']);
			$ret = $chnDal->where(array('id' => $chnId))->save($save);
			*/

			//检查文件，指定目录里，没有使用的文件要删除
			$chn = new ChannelAction();
			$keep = array();
			$path = $chn->GetInfoImgSavePath($chnId);

			foreach($list as $v)
			{
				if(!empty($v['img']))
				{
					$p = strripos($v['img'], '/');
					$keep[] = substr($v['img'], $p+1);
				}
			}

			$dir = dir($path);
			while($f = $dir->read())
			{
				if(is_dir($f) || '.' == $f || '..' == $f)
				{
				}
				else
				{
					if(in_array($f, $keep))
					{
					}
					else
					{
						//echo 'del > '.$path.$f;
						//unlink($path.$f);
					}
				}
			}

			echo '{"result":"true"}';
		}
		else
		{
			echo '{"result":"false", "msg":"no right."}';
		}
	}

	/*
	 * 是否对该频道拥有权限
	 * return 1 是播主  2 拥有进阶权限  0 什么都不是
	 */
	public function IsGetRightChn($chnId = 0)
	{
		$chnDal = D('channel');
		$r = $chnDal->where(array('id'=>$chnId))->find();
		if(is_array($r))
		{
			$owner = $this->userId();
			//判断是否指定权限
			$str = $this->auth->getOperStr('Channel', 'all');
			//是否有F权限
			if(-1 < strpos($str, 'F'))
			{
				return 2;
			}

			if($r['owner'] == $owner)
			{
				//是播主
				return 1;
			}
		}
		return 0;
	}

	public function GetChnComboxData()
	{
		$owner = $this->userId();
		$chnDal = D('channel');
		$r = $chnDal->field('id,name')->where(array('owner'=>$owner))->select();
		echo json_encode($r);
	}

	public function TypeComboxData()
	{
		R("Channel/TypeComboxData");
	}

	public function PlayTypeComboxData()
	{
		R("Channel/PlayTypeComboxData");
	}

	public function StatusComboxData()
	{
		R("Channel/StatusComboxData");
	}

	public function StremComboxData($chnId)
	{
		//根据频道的ownerId来获取strem的记录
		$chnDal = D('channel');
		$cr = $chnDal->where(array('id'=>$chnId))->find();
		$sr = null;
		if(is_array($cr))
		{
			$owner = $cr['owner'];
			$str = D('stream');

			$opt = $this->auth->getOperStr('Stream', 'all');
			//是否有F权限
			if($owner == $this->userId() || -1 < strpos($opt, 'F'))
			{
				$sr = $str->field('id, name')->where(array('owner'=>$owner))->select();
			}
		}

		$ret = '[{"value":0, "name":"不使用"}';
		foreach($sr as $i => $item)
		{
			$ret .= ',{"value":'.$item['id'].', "name":"'.$item['name'].'"}';
		}
		$ret .= "]";
		echo $ret;

	}

	public function chnAdv()
	{
		$webVar['chnId'] = getPara('chnId');
		$chnDal = new ChannelModel();
		$chn = new ChannelAction();

		$r = $chnDal->where(array('id'=>$webVar['chnId']))->find();
		if(!is_array($r))
		{
			$r = $chnDal->where(array('owner'=>$this->userId()))->find();
			$webVar['chnId'] = $r['id'];
		}
		$attr = json_decode($r['attr'], true);

		$webVar['chnName'] = $r['name'];
		$webVar['type'] = $r['type'];
		$webVar['streamid'] = $r['streamid'];
		$webVar['wxonly'] = $attr['wxonly'];
		$webVar['viewIncRand'] = $attr['viewIncRand'];
		$webVar['vlimit'] = $attr['viewerlimit'];
		$webVar['entrytimes'] = $r['entrytimes'];

		//视频流
		$webVar['stream'] = $r['streamid'];

		$webVar['editurl'] = U('chnAdvEdit', array('chnId' => $webVar['chnId']));
		$webVar['getPushUrl'] = U('getStreamPushAjax');

		//支付
		$webVar['userbill'] = $attr['userbill']['isbill'];
		$list = $chnDal->getBillNameList(true);
		foreach($list as $key => $item)
		{
			$tt = $item['type'];
			$list[$key]['valueset'] = $attr['userbill']['bill'.$tt];
		}
		$webVar['billInfo'] = $list;

		//在线人数
		$webVar['isFOpt'] = $this->auth->isOperStr('Console', 'chnAdv', 'F');
		if($webVar['isFOpt'])
		{
			$webVar['maxvlimit'] = $r['viewerlimit'];
		}
		else
		{
			$webVar['maxvlimit'] = $r['viewerlimit'];
			$webVar['maxvlimit2'] = $webVar['maxvlimit'];
			if(0 == $webVar['maxvlimit'])
			{
				//系统没有限制上限
				$webVar['maxvlimit2'] = '999,999,999';
				$webVar['maxvlimit'] = '999999999';
			}
			$webVar['vlimit'] = $attr['viewerlimit'];
			if(empty($webVar['vlimit']))
			{
				$webVar['vlimit'] = $webVar['maxvlimit'];
			}
		}

		//单帐号重复登录
		if($webVar['isFOpt'])
		{
			if("1" == $r['multiplelogin'])
				$webVar['multiplelogin'] = 'checked="checked"';
			else
				$webVar['multiplelogin'] = '';
		}


		//修改访问次数
 		if($this->isOpPermit('C'))
		{
 			$webVar['canViewCount']='true';
		}


		
		$this->baseAssign();
		$this->assign($webVar);

		setPara('chnId', $webVar['chnId']);
		$this->show('chnAdv');
	}

	public function getStreamPushAjax($streamid = 0)
	{
		//权限判断

		if(0 < $streamid)
		{
			$streamDal = new StreamModel();
			$webVar['pushUrl'] = $streamDal->getPush($streamid);
		}
		else
		{
			$webVar['pushUrl'] = '';
		}
		echo '{"pushUrl":"'.$webVar['pushUrl'].'"}';
	}

	public function chnInfo()
	{
		$webVar['chnId'] = getPara('chnId');
		$chnDal = D('channel');
		$chn = new ChannelAction();
		$r = $chnDal->where(array('id'=>$webVar['chnId']))->find();
		$webVar['chnName'] = $r['name'];
		if(!is_array($r))
		{
			$u = $chnDal->where(array('owner'=>$this->userId()))->find();
			//TODO：判断有无权
		}
		$attr = json_decode($r['attr'], true);
		//var_dump($attr);

		$webVar['editurl'] = U('chnInfoEdit', array('chnId' => $webVar['chnId']));
		$webVar['info'] = str_replace("\n", "", $attr['info']);

		$this->baseAssign();
		$this->assign($webVar);
		$this->assign($r);

		setPara('chnId', $webVar['chnId']);
		$this->show('chnInfo');
	}

	public function viewerStat()
	{
		$this->baseAssign();

 		//网页传递的变量模板
 		$webVarTpl=array('work'=>'init','objtype'=>'0','name'=>'','beginTime'=>date('Y-m-d',strtotime('-1 day')),'endTime'=>date('Y-m-d'));
 		$condTpl=array('objtype'=>'0','name'=>'','beginTime'=>$webVarTpl['beginTime'],'endTime'=>$webVarTpl['endTime']);

  		condition::clear(ACTION_NAME);
 		pagination::clear(ACTION_NAME);
 		pagination::clear(ACTION_NAME.'Total');
 		$webVar=$this->getRec($webVarTpl,false);
 		
 		if('init'==$webVar['work']){
 			/*
 			//取下拉频道数据
 			$userInfo=authorize::getUserInfo();
 			//$userInfo['userId']=22;
 			$db=D('userrelrole');
 			$isAdmin=$db->isInRole($userInfo['userId'],C('adminGroup'));
 			$db=D(channel);
 			$chnList=($isAdmin)?$db->getPulldownList():$db->getPulldownList($userInfo['userId']);
 			if($isAdmin) {
 				$chnList=array_merge(array(array('id'=>0,'name'=>'全部')),$chnList);
 				$webVar['chnId']=0;
 			} else if(count($chnList)<1){
 				//没有任何频道的管理权限
 				$this->display('common:noRight');
 				return;
 			} else {
 				$webVar['chnId']=$chnList[0]['id'];
 			}
 			//dump($chnList);
 			$chnListJson=(null==$chnList)?'[]':json_encode($chnList);
 			setPara('chnListJson', $chnListJson);
 			$condTpl['chnId']=$webVar['chnId'];
 			*/
 			condition::save($condTpl,ACTION_NAME);	//更新并存储最新的查询条件
 		} else {
 			condition::update($condTpl,ACTION_NAME);
 		}

 		$webVar['work']='search';
 		$this->assign($webVar);


		$this->show();
	}

	public function consumpTypeListJson()
	{
		$this->redirect('Monitor/consumpTypeListJson');
	}

	public function viewersGetList($page=1,$rows=1)
	{
		$this->redirect('Monitor/viewersGetList');
	}

	/*
	 * 接收上传的图片文件
	 * $t 图片归属，是这用于什么地方的图片？
	 */
	public function uploadimg($t='', $c=0)
	{
		$power = $this->IsGetRightChn($c);

		$upload = new FileUpload();
		$uparray = array();

		$sizelimit = array('logo' => 20*1024, 'cover' => 200*1024, 'infoimg' => 300*1024);
		if(0 < $power)
		{
			if('logo' == $t || 'cover' == $t)
			{
				//处理上传文件
				try
				{
					$uparray = $upload->BeginUpload2($t, array('jpg','png','JPG','PNG'), $sizelimit[$t]);
				}
				catch(Exception $e)
				{
					echo '{"retcode":"false", "message":"'.$e->getMessage().'"}';
					exit;
				}

				$chn = new ChannelAction();
				//获取频道图片路径
				$path = $chn->getSavePath($c);
				$newName = $t.'.'.$uparray[0]['ext'];
				//复制文件
				$ret = move_uploaded_file($uparray[0]['tmp_name'], $path.$newName);
				if(!$ret)
				{
					//文件写入错误
					echo '{"retcode":"false", "message":"文件写入错误"}';
					exit;
				}
				//写入数据库
				$chnDal = new ChannelModel();
				$attr[$t] = $newName;
				$chnDal->appendAttr($c, $attr);
				//返回处理结果
				$url = $chn->GetWebPath($c).$newName;
				echo '{"retcode":"true","url":"'.$url.'", "message":"'.$t.'"}';
				exit;
			}
			else if('infoimg' == $t)
			{
				try
				{
					$uparray = $upload->BeginUpload2($t, array('jpg','png'), $sizelimit[$t]);
				}
				catch(Exception $e)
				{
					echo '{"retcode":"false", "message":"'.$e->getMessage().'"}';
					exit;
				}

				$chn = new ChannelAction();
				$up = $_FILES[$t];
				//获取频道图片路径
				$path = $chn->GetInfoImgSavePath($c);
				$newName = time().'.'.$uparray[0]['ext'];
				//复制文件
				$ret = move_uploaded_file($uparray[0]['tmp_name'], $path.$newName);
				if(!$ret)
				{
					//文件写入错误
					echo '{"retcode":"false", "message":"文件写入错误"}';
					exit;
				}
				//返回处理结果
				$url = $chn->GetInfoImgWebPath($c).$newName;
				echo '{"retcode":"true","url":"'.$url.'", "message":"'.$t.'"}';
			}
		}
	}

	/*
	 * 增加一个频道
	 */
	public function AddChn($userAccount = '', $force = false)
	{
		//获取播主ID
		$userInfo = $this->getUserInfo();
		if(!empty($userAccount))
		{
			$userDal = new UserModel();
			$userInfo = $userDal->where(array('account' => $userAccount))->find();
			$userInfo['userId'] = $userInfo['id'];
			$userInfo['userName'] = $userInfo['username'];
		}
		if(0 < $userInfo['userId'] && ('no' != $userInfo['bozhu'] || 'no' != $userInfo['userExtAttr']['bozhu']))
		{
			$chnDal = new ChannelModel();
			if(false === $force)
			{
				//查询已拥有多少频道
				$chnNum = $chnDal->where(array('owner'=>$userInfo['userId']))->count();
				if(0 == $chnNum)
				{
					$userDal = new UserModel();
					$fee = $userDal->getAvailableBalance($this->userId());
					if(0 == $fee)
					{
						echo '{"result":"true", "jump":"'.U('Home/toBroadcast').'"}';
						exit;
					}
					else
					{
						$chnDal->AddIfNone($userInfo['userId'], $userInfo['account'] );
						echo '{"result":"true", "jump":"'.U('Console/overView').'"}';
						exit;
					}
				}
			}

			//判断是否超最大频道数
			$dicDal = new DictionaryModel();
			$bozhuLimit = $dicDal->getBozhuAttr($userInfo['bozhu']);

			if(0 != $bozhuLimit['maxChannel']
				&& $bozhuLimit['maxChannel'] <= $chnNum)
			{
				echo '{"result":"false", "msg":"拥有的频道不能超过'.$bozhuLimit['maxChannel'].'个，请与系统管理员联系！"}';
				exit;
			}
			//初始化频道记录
			$newId = $chnDal->CreateNew($userInfo['userId'], 0, $userInfo['userName'].rand(1000,9999), $bozhuLimit['viewersPerChannel']);

			if(0 < $newId)
			{
				echo '{"result":"true", "jump":"'.U('Console/overView').'"}';
				exit;
			}
		}
		else
		{
			echo '{"result":"false", "msg":"不是播主，不能添加频道！"}';
			exit;
		}

		echo '{"result":"false", "msg":"您没有权限！"}';
		exit;
	}

	
	function userOverView()
	{
		$this->baseAssign();
		$this->display('userOverView_w');
	}

	function doEditPwd()
	{
		if($_POST['pswd2'] != $_POST['pswd3'])
		{
			//两次输入的密码不正确
			$this->assign('errorMsg','两次输入的密码不正确');
			$this->userOverView();
			exit;
		}
		if($_POST['pswd1'] == $_POST['pswd2'])
		{
			//新密码不能与旧密码一致
			$this->assign('errorMsg','新密码不能与旧密码一致');
			$this->userOverView();
			exit;
		}

		$record = array();
		$record['id'] = $this->userId();
		$record['oldpassword'] = $_POST['pswd1'];
		$record['password'] = $_POST['pswd2'];

		$userAction=A('User');
		try
		{
			$userAction->userValidateEditPwd($record, $record['id']);

			$db=D('User');
			$ret=$db->where("id=".$record['id'])->save(array('password'=>$record['password']));
			if($ret<=0) throw new Exception('保存失败');
			$this->assign('errorMsg','保存成功');
		}
		catch(Exception $ex)
		{
			$errorMsg=$ex->getMessage();
			$this->assign('errorMsg',$errorMsg);
		}
		$this->userOverView();
		exit;
	}

	public function chnListSel($key = '')
	{
		$key = htmlspecialchars($key);

		$ownerId = $this->userId();

		$str = $this->auth->getOperStr('Channel', 'all');
		//是否有F权限
		if(-1 < strpos($str, 'F'))
		{
			$ownerId = 0;
		}

		$chnDal = new ChannelModel();
		$json = $chnDal->GetNameJason($key, $ownerId, 'array');
		//$ret = '{"result":"true", "data":'.$json.'}';
		//echo $ret;
		$this->assign('chnList', $json);
		$this->display('chnListSel_w');
	}

	public function fullMsg($msg = '', $jump = '/')
	{
		$this->assign('msg', $msg);
		$this->assign('url', $jump);
		$this->display('fullMsg');
	}

	public function getPushUrlAjax($idstring,$pushkey,$platform){
		$isShowPullUrl=$this->author->isOperStr('Console','stream','A');
//var_dump($isShowPullUrl);	
		if(true==$isShowPullUrl){
			$dbStream=D('stream');
			//dump($_REQUEST);
			$hls=$dbStream->getHls($_REQUEST['id']);
			$hls ='HTTP收流地址：'.$hls.'<br>';
			$hls .='RTMP收流地址：'.$dbStream->getRtmp($_REQUEST['id']);
		} else
			$hls='';
			
		$pf=new platform();
		$pf->load($platform);
		echo '推流地址：'.$pf->getPush($idstring,$pushkey).'<br>'.$hls;
	}

	public function phoneVerify()
	{
		$webvar['smsUrl'] = U('/Home/smsSend');
    	$this->assign($webvar);

		$this->show('phoneVerify');
	}

	public function phoneVerifyPost($phone='', $code='', $refCode='')
	{
		$dbUser=D('User');
		$userAction=A('User');
		$userId=$this->userId();
		//是否有推荐码
		if(!empty($refCode))
		{
			$userExtAttr=$this->auth->getUserInfo(UserModel::userExtAttr);
			if(empty($userExtAttr['refCodeId']))
			{
				//推荐码是否有效
				$refCodeId = $userAction->isRefCode($refCode);
				if(null == $refCodeId)
				{
					echo '{"result":"false", "msg":"推荐码无效"}';
					exit;
				}
				else
				{
					//记录下推荐码
					$data['refCode']=$refCode;
					$data['refCodeId']=$refCodeId;
					$result=$dbUser->saveExtAttr($userId,$data);
					//更新当前的session
					$_SESSION['userinfo']['userExtAttr']['refCode'] = $refCode;
					$_SESSION['userinfo']['userExtAttr']['refCodeId'] = $refCodeId;

					//建立推荐关系
					$up = array();
					$up['pid'] = $refCodeId;
					$up['rid'] = $userId;
					$up['chnid'] = 0;
					$up['act'] = 'reg';
					$upDal = new UserPassModel();
					$ret = $upDal->CreateRecUni($up);
				}
			}
		}

		//检查
		$sms = new Sms();
		$smsCheck = $sms->Check($phone, $code);
		//$smsCheck = true;

		if($smsCheck)
		{

			//标记用户的手机验证时间
			$data = array();
			$data['phone'] = $phone;
			$data['phoneVerify'] = date('Y-m-d');
			$result=$dbUser->saveExtAttr($userId,$data);
			//更新当前的session
			$_SESSION['userinfo']['userExtAttr']['phoneVerify'] = $data['phoneVerify'];
			$_SESSION['userinfo']['userExtAttr']['phone'] = $data['phone'];

			echo '{"result":"true"}';
		}
		else
		{
			echo '{"result":"false", "msg":"手机与验证码不匹配"}';
		}
	}

	public function userToBozhu($refCode='')
	{
		$dbUser=D('User');
		$userAction=A('User');
		$userId=$this->userId();
		$webvar = array();

		if(!empty($refCode))
		{
			//判断是否已经提交过推荐码
			$userExtAttr=$this->auth->getUserInfo(UserModel::userExtAttr);
			if(empty($userExtAttr['refCodeId']))
			{
				//推荐码是否正确
				$refCodeId = $userAction->isRefCode($refCode, $userId);
				if(null == $refCodeId)
				{
					$webvar['errorMsg'] = '推荐码无效';
				}
				else
				{
					//记录下推荐码
					$data['refCode']=$refCode;
					$data['refCodeId']=$refCodeId;
					$result=$dbUser->saveExtAttr($userId,$data);
					//更新当前的session
					$_SESSION['userinfo']['userExtAttr']['refCode'] = $refCode;
					$_SESSION['userinfo']['userExtAttr']['refCodeId'] = $refCodeId;

					//建立推荐关系
					$up = array();
					$up['pid'] = $refCodeId;
					$up['rid'] = $userId;
					$up['chnid'] = 0;
					$up['act'] = 'reg';
					$upDal = new UserPassModel();
					$ret = $upDal->CreateRecUni($up);

					//已经提交过了，直接去付款
					$this->redirect('Home/toBroadcastPayCode');
				}
			}
			else
			{
				//已经提交过了，直接去付款
				$this->redirect('Home/toBroadcastPayCode');
			}
		}

		$this->assign($webvar);
		$this->display();
	}
}
?>