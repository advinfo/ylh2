<?php
/**
 * @file
 * @brief 阿里云短讯接口
 * @author Rocky
 * @date 2017-01-03
 * 
 * 
 * 
 */

require_once APP_PUBLIC.'CommonFun.php';
require_once LIB_PATH.'Model/MessageModel.php';

class Sms
{
	//验证码30分钟内有效
	protected $timeout = 1800;
	//限制120秒内只能发送一次短讯
	protected $timelimit = 60;
	//message中的task
	protected $task = 'AliyunSms';
	//注册验证动作
	protected $actReg = 'regist';
	//限制24小时内发送的次数
	protected $sendlimit = 10;
	//message表操作对象
	protected $msgDal = null;


	//本次操作的唯一字串
	protected $serno = '';

	function __Construct()
	{
		$this->msgDal = new MessageModel();
	}

	/*
	 * 根据电话号码和验证码生成唯一字串
	 */
	protected function GetSerno($phone, $ip = '')
	{
		if('' == $ip)
		{
			$ip = getip();
		}
		//电话号码加IP作为唯一标识，防止暴力
		$this->serno = $phone.'_'.$ip;
	}

	/*
	 * 通过阿里接口发送短信
	 */
	public function sendSmsTmp($phone, $code, $tmp)
	{
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/ProductDomain.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/Endpoint.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/EndpointProvider.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Config.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/IClientProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/IAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/DefaultProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/DefaultAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Exception/ClientException.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpHelper.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpResponse.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ISigner.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ShaHmac1Signer.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/Credential.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/AcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/RpcAcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-sms/Sms/Request/V20160927/SingleSendSmsRequest.php';
		
		$iClientProfile = DefaultProfile::getProfile("cn-hangzhou", "LTAIHIJJOExv9Dqv", "uq9PjUwvCts4Sdomytl6ciEiCw3Cxr");
		$client = new DefaultAcsClient($iClientProfile);
		$request = new SingleSendSmsRequest();
		$request->setSignName("易网真");//签名名称
		$request->setTemplateCode($tmp);//模板code
		$request->setRecNum($phone);//目标手机号
		$request->setParamString("{\"code\":\"".$code."\"}");//模板变量，数字一定要转换为字符串
		try
		{
			$response = $client->getAcsResponse($request);
		}
		catch (ClientException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}
		catch (ServerException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}

		return '';
	}

	/*
	 * 通过阿里接口发送短信
	 */
	protected function SendSms($phone, $code)
	{
		//just for test
		//echo $this->RetJson('SendSms phone:'.$phone.' code:'.$code, 'true');
		//echo $this->RetJson('', 'true');
		//exit;
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/ProductDomain.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/Endpoint.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/EndpointProvider.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Config.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/IClientProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/IAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/DefaultProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/DefaultAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Exception/ClientException.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpHelper.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpResponse.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ISigner.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ShaHmac1Signer.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/Credential.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/AcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/RpcAcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-sms/Sms/Request/V20160927/SingleSendSmsRequest.php';
		

		$iClientProfile = DefaultProfile::getProfile("cn-hangzhou", "LTAIHIJJOExv9Dqv", "uq9PjUwvCts4Sdomytl6ciEiCw3Cxr");
		$client = new DefaultAcsClient($iClientProfile);
		$request = new SingleSendSmsRequest();
		$request->setSignName("易网真");//签名名称
		$request->setTemplateCode("SMS_37125132");//模板code
		$request->setRecNum($phone);//目标手机号
		$request->setParamString("{\"code\":\"".$code."\",\"product\":\"易网真\"}");//模板变量，数字一定要转换为字符串
		try
		{
			$response = $client->getAcsResponse($request);
		}
		catch (ClientException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}
		catch (ServerException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}

		return '';
	}

	/*
	 * 页面返回Json格式结果
	 */
	protected function RetJson($msg, $ret = 'true')
	{
		return '{"result":"'.$ret.'", "msg":"'.$msg.'"}';
	}

	/*
	 * 获取单位发送频道内的发送记录
	 */
	protected function IsExpMsg()
	{
		//限制发送的频率，有效间隔时间内只能发送一次
		$m = $this->msgDal->where(array('keystr'=>$this->serno, 'step'=>'0', 'task'=>$this->task, 'action'=>$this->actReg, 'createtime'=>array('gt', (time() - $this->timelimit))))->select();

		//echo $this->msgDal->getLastSQL();
		if(is_array($m))
		{
			return true;
		}
		return false;
	}

	/*
	 * 获取一天内发送记录的次数
	 */
	protected function GetExpMsgNumPerDay()
	{
		//限制发送的频率，有效间隔时间内只能发送一次
		$count = $this->msgDal->where(array('keystr'=>$this->serno, 'task'=>$this->task, 'action'=>$this->actReg, 'createtime'=>array('gt', time() - 86400)))->count();
		//echo $this->msgDal->getLastSQL();

		return $count;
	}

	/*
	 * 需要发送，生成一条message记录
	 */
	protected function AddMessage($code)
	{
		$attr = '{"code":"'.$code.'"}';
		$this->msgDal->AddMsg($this->task, $this->actReg, $this->serno, $attr);
	}

	/*
	 * 获取等待验证的记录
	 */
	protected function GetVaildMsg()
	{
		$m = $this->msgDal->where(array('keystr'=>$this->serno, 'task'=>$this->task, 'action'=>$this->actReg, 'step'=>'0', 'createtime'=>array('gt', time() - $this->timeout)))->select();
		return $m;
	}

	/*
	 * 发送验证短讯
	 */
	public function SendRegSms($phone, $code, $ip = '')
	{
		if('' == $ip)
		{
			$ip = getip();
		}
		//echo $ip;

		//单位发送频道内有效记录标记
		$isExp = false;

		//根据phone和code生成唯一字串
		$this->GetSerno($phone, $ip);

		//检查message表中是否有生效的记录
		$isExp = $this->IsExpMsg();

		if($isExp)
		{
			//echo '不能操作太频密';
			return $this->RetJson('不能操作太频密,验证码'.($this->timeout/60).'分钟内有效！', 'false');
		}
		else
		{
			//24小时内限制发送次数判断
			if($this->sendlimit > $this->GetExpMsgNumPerDay())
			{
				//没有超过限制次数，允许发送
				//没有，生成新的message记录
				$this->AddMessage($code);

				//发送短讯
				$msg = $this->SendSms($phone, $code);
				if(empty($msg))
				{
					return $this->RetJson('发送成功');
				}
				else
				{
					return $this->RetJson($msg, 'false');
				}
			}
			else
			{
				//超出一天的发送次数
				return $this->RetJson('24小时内限制发送次数：'.$this->sendlimit, 'false');
			}
		}
	}


	/*
	 * 发送活动通知短信
	 */
	public function SendNoticeSms($phone)
	{
		//just for test
		//echo $this->RetJson('SendSms phone:'.$phone.' code:'.$code, 'true');
		//echo $this->RetJson('', 'true');
		//exit;
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/ProductDomain.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/Endpoint.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Regions/EndpointProvider.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Config.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/IClientProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/IAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Profile/DefaultProfile.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/DefaultAcsClient.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Exception/ClientException.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpHelper.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Http/HttpResponse.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ISigner.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/ShaHmac1Signer.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/Auth/Credential.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/AcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-core/RpcAcsRequest.php';
		require_once ALI_SMS_PATH.'aliyun-php-sdk-sms/Sms/Request/V20160927/SingleSendSmsRequest.php';
		

		$iClientProfile = DefaultProfile::getProfile("cn-hangzhou", "LTAIHIJJOExv9Dqv", "uq9PjUwvCts4Sdomytl6ciEiCw3Cxr");
		$client = new DefaultAcsClient($iClientProfile);
		$request = new SingleSendSmsRequest();
		$request->setSignName("易网真");//签名名称
		$request->setTemplateCode("SMS_37125131");//模板code
		$request->setRecNum($phone);//目标手机号
		$request->setParamString("{\"code\":\"0\",\"product\":\"高考志愿填报大型公益讲座，于19点30分直播，请点击“易网真”微信公众号活动菜单进入。或用微信进入之前分享的页面进行收看，多谢参与我们\",\"item\":\"\"}");//模板变量，数字一定要转换为字符串
		try
		{
			$response = $client->getAcsResponse($request);
		}
		catch (ClientException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}
		catch (ServerException $e)
		{
			//print_r($e->getErrorCode());
			return $e->getErrorMessage();
		}

		return '';
	}

	/*
	 * 检查短讯验证码是否正确，正确返回true 错误返回false
	 */
	public function Check($phone, $code)
	{
		//根据phone和code生成唯一字串
		$ip = getip();
		$this->GetSerno($phone, $ip);

		//获取message表中记录
		$m = $this->GetVaildMsg();
		foreach($m as $i => $r)
		{
			$attr = json_decode($r['attr'], true);
			if($code == $attr['code'])
			{
				//NOTE:在有效时间内可多次使用
				//把记录标记为已使用
				//$this->msgDal->UpdateMsgStep($r['id'], null, -1);
				return true;
			}
		}

		return false;
	}
}


?>