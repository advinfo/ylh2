<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-7
 * Time: 17:27
 * (第三方认证)支持基本类，采用工厂模式管理不同的第三方认证
 * 不同的第三方认证类文件默认存放在相同目录下，文件名Author.$第三方标识.class.php
 */
require_once(LIB_PATH.'Model/UserModel.php');

class AuthorBase
{
    //取指定认证类型实例。
    static public function instance($party,$name=''){
        $className=(''==$name)?'Author'.$party : $name;
        $fileName=COMMON_PATH.'author/'.$className.'.class.php';

//var_dump($fileName);
        if(is_file($fileName)){
            include_once($fileName);
            return new $className();
        }
        else {
            return null;
        }
    }


}