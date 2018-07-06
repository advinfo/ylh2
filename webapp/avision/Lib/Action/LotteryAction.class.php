<?php
/**
 * 抽奖模块控制器
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-4-24
 * Time: 9:01
 */

require_once COMMON_PATH.'AdminBaseAction.class.php';
require_once LIB_PATH.'Model/LotteryModel.php';

class LotteryAction extends AdminBaseAction {
    protected $dbLottery=null;
    protected $record=array();  //当前处理的抽奖记录

    function __construct(){
        parent::__construct();
        $this->dbLottery=D('Lottery');
    }

    /**
     * 响应点击抽奖箱，输出提示信息
     * @param int $id   抽奖ID
     * @param array $attr   前端参数数组
     */
    public function showPopupAjax($id=0,$attr=null){

        $webVar=array();
        $webVar['id']=$id;
        $webVar['attr']=print_r($attr,true);
        $this->assign($webVar);
        $this->display("showPopup");
    }

    public function lotteryList(){
        $this->baseAssign();
        $webvar=array();

        $this->show('lotteryList');
    }

    public function getListJson(){
        var_dump($_SERVER);
    }

    //========为纯前端做的接口=========
    public function showJson($lotteryid=0){
        $output=array();

        try{

            if(!$this->author->isLogin())  throw new Exception('登录后才能抽奖。');
            $cond=array('id'=>$lotteryid,'status'=>array('in',array('发布')));
            $this->record=$this->dbLottery->where($cond)->find();
//echo $this->dbLottery->getLastSql();
            if(null == $this->record) throw new Exception('找不到抽奖记录！');
//dump($this->record);
            $userid=$this->userId();
//echo $userid;
            $db=D('winnerlist');
            $cond=array('lotteryid'=>$lotteryid, 'userid'=>$userid);
            $winnerRec=$db->where($cond)->find();
            switch ($this->record['type']){
                case '定时':
                    $output['type']=1;
                    if(null==$winnerRec){
                        //未登记
                        $output['msg']='提示：抽奖口令是['.$this->record['luckword'].'] 请输入抽奖口令：';
                    }else{
                        $output['msg']='您已登记了抽奖，开奖日期为:'.$this->record['draw'];
                    }
                    break;
                case '即兴':
                    break;
                case '竞猜':
                    break;
                case '投票':
                    break;
            }
        }catch (Exception $e){
            Oajax::errorReturn($e->getMessage());
        }
        Oajax::successReturn($output);
    }

    public function enrollJson($lotteryid,$type=0,$data=array()){

        try{
            if(!$this->author->isLogin())  throw new Exception('登录后才能抽奖。');
            $cond=array('id'=>$lotteryid,'status'=>array('in',array('发布')));
            $this->record=$this->dbLottery->where($cond)->find();
//echo $this->dbLottery->getLastSql();
            if(null == $this->record) throw new Exception('找不到抽奖记录！');
//dump($this->record);
            $userid=$this->userId();
            $db=D('winnerlist');
            $cond=array('lotteryid'=>$lotteryid, 'userid'=>$userid);
            $winnerRec=$db->where($cond)->find();
            if(null!=$winnerRec) throw new Exception('您已经登记过了！');
            if(2==$type){
                if($data[0]!=$this->record['luckword']) throw new Exception('口令错误！');
                $data=array('lotteryid'=>$lotteryid, 'userid'=>$userid, 'plevel'=>0);
            }elseif (3==$type){
                $data=array('lotteryid'=>$lotteryid, 'userid'=>$userid, 'plevel'=>$data[0]);
            }else{
                throw new Exception('type error:'.$type);
            }
            $db->add($data);
        }catch (Exception $e){
            Oajax::errorReturn($e->getMessage());
        }
        Oajax::successReturn();
    }
}
?>