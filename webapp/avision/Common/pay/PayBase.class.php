<?php
/**
 * Created by PhpStorm.
 * User: outao
 * Date: 2018-5-7
 * Time: 21:02
 *
 * 第三方支付基本类
 * 不同的第三方支付类文件默认存放在相同目录下，文件名Pay.$第三方标识.class.php
 */

class PayBase
{
    //取实例
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