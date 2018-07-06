<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-7-3
 * Time: 21:46
 */
require_once COMMON_PATH.'AdminBaseAction.class.php';

class MG_ChannelAction extends AdminBaseAction
{
    public function main(){
        $this->baseAssign();
        $this->display();
    }

    /**
     * 权限：{"operation":[{"text":"查看自己频道","val":"R"},{"text":"查看所有频道","val":"A"},{"text":"平台管理操作","val":"P"}]}
     */
    public function setting(){
        $webVarTpl=array('chnId'=>0, 'chnName'=>'', 'owner'=>'', 'work'=>'init');
        $webVar=getRec($webVarTpl,true);

        $webVar['mgrAll']=$mgrAll=$this->isOpPermit('A');     //是否可管理所有频道
        $webVar['platformOpt']=$platformOpt=$this->isOpPermit('P');    //是否可进行平台操作
var_dump($mgrAll,$platformOpt);
        if('search'==$webVar['work'] ||true==$mgrAll){

        }
        $this->display('setting');
    }
}