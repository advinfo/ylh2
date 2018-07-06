<?php

require_once COMMON_PATH.'ywzSISDK.php';
class StreamDetailViewModel extends ViewModel {
	
	public $viewFields=array(
		'Stream'=>array('id','idstring','platform','owner','status','pushkey','name','attr','_type'=>'LEFT'),
		'User'=>array('account'=>'account','_on'=>'Stream.owner=User.id','_type'=>'LEFT')
		//'Activestream'=>array('isactive','_on'=>'Stream.id=Activestream.streamid and isactive="true"')
	);
	
	public function getDetailById($streamid){
		if(1>$streamid) return null;
		$rt=$this->where('Stream.id='.$streamid)->find();
		if(is_array($rt)){
            $sdk=new ywzSISDK(C('SIaccount'),C('SIcommkey'),C('coreUrl'));
            $rt['isactive']=$sdk->isStreamActive($streamid);
        }

//var_dump($rt); echo '<br>';
//echo $this->getLastSql();		
		return $rt;
	}
}
?>