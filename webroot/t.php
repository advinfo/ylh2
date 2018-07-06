<?php
$aurl=urlencode("/ui/#/index");
$durl=urlencode("/t.php?d=3&e=4");
echo <<<END
    <a href="/t.php?accecpt={$aurl}&deny={$durl}">aaa</a>
    <br>
END;
print_r($_REQUEST);
$aurl=$_REQUEST['accecpt'];
$durl=$_REQUEST['deny'];
echo <<<END
    <br>
    <a href="{$aurl}">accecpt</a><br>
    <a href="{$durl}" >deny</a><br> 
END;
die('end111');
include_once '../webapp/public/Imgcompress.php';
$a=array("a中概股a","bb","cc");
$a['tm']=date("Y/m/d H:i:s",1525336325);
//phpinfo();

$j=json_encode($a,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
echo $j;

die("====end===");
//var_dump($_SERVER);
//print_r($_SERVER);
$o=new cc();
$o->aa();
class cc {
public function aa(){
	echo "In function:";
	global $a;
	var_dump($a);
}
}

die("===");
$html = file_get_contents('http://demo.av365.cn:8011/stat');
//$html="<xml><uptime>83258</uptime><naccepted>2004</naccepted><bw_in>1775008</bw_in></xml>";

//libxml_disable_entity_loader(true);
$xml=simplexml_load_string($html, 'SimpleXMLElement', LIBXML_NOCDATA);
$data = json_decode(json_encode($xml),TRUE);
var_dump($data);
?>