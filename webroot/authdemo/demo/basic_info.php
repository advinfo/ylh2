<?php
/* *
 * 功能：云联惠支付接口 接口调试入口页面
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 请确保项目文件有可写权限，不然打印不了日志。
 */
require '../vendor/autoload.php';
require_once 'config.php';

use YunLianHui\OAuth2;


if (!empty($_POST['token'])&& trim($_POST['token'])!=""){

    $oauth_client = new OAuth2($config['gatewayUrl'],$config['client_id'],$config['client_secret'],$config['client_private_key'],$config['redirect_uri']);

    try{
        $result=$oauth_client->sendAnResourceRequest([
            'client_id' => $config['client_id'],
            'access_token' => $_POST['token'],
            'timestamp' => (string)time(),
        ],'api/v2/getUserInfo');
        echo "获取成功<br />member_id：".$result['member_id']
        ."<br />member_class：".$result['member_class']
        ."<br />member_type：".$result['member_type']
        ."<br />mobile：".$result['mobile']
        ."<br />rcm_id：".$result['rcm_id']
            ."<br />email：".$result['email'];
    }catch (\YunLianHui\ApiException $exception){
        print_r('接口请求失败<br> '.'错误信息是:'.$exception->getMessage());
    }


    return ;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>云联惠开放平台支付接口</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
        *{
            margin:0;
            padding:0;
        }
        ul,ol{
            list-style:none;
        }
        body{
            font-family: "Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
        }
        .hidden{
            display:none;
        }
        .new-btn-login-sp{
            padding: 1px;
            display: inline-block;
            width: 75%;
        }
        .new-btn-login {
            background-color: #02aaf1;
            color: #FFFFFF;
            font-weight: bold;
            border: none;
            width: 100%;
            height: 30px;
            border-radius: 5px;
            font-size: 16px;
        }
        #main{
            width:100%;
            margin:0 auto;
            font-size:14px;
        }
        .red-star{
            color:#f00;
            width:10px;
            display:inline-block;
        }
        .null-star{
            color:#fff;
        }
        .content{
            margin-top:5px;
        }
        .content dt{
            width:100px;
            display:inline-block;
            float: left;
            margin-left: 20px;
            color: #666;
            font-size: 13px;
            margin-top: 8px;
        }
        .content dd{
            margin-left:120px;
            margin-bottom:5px;
        }
        .content dd input {
            width: 85%;
            height: 28px;
            border: 0;
            -webkit-border-radius: 0;
            -webkit-appearance: none;
        }
        #foot{
            margin-top:10px;
            position: absolute;
            bottom: 15px;
            width: 100%;
        }
        .foot-ul{
            width: 100%;
        }
        .foot-ul li {
            width: 100%;
            text-align:center;
            color: #666;
        }
        .note-help {
            color: #999999;
            font-size: 12px;
            line-height: 130%;
            margin-top: 5px;
            width: 100%;
            display: block;
        }
        #btn-dd{
            margin: 20px;
            text-align: center;
        }
        .foot-ul{
            width: 100%;
        }
        .one_line{
            display: block;
            height: 1px;
            border: 0;
            border-top: 1px solid #eeeeee;
            width: 100%;
            margin-left: 20px;
        }
        .am-header {
            display: -webkit-box;
            display: -ms-flexbox;
            display: box;
            width: 100%;
            position: relative;
            padding: 7px 0;
            -webkit-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
            background: #1D222D;
            height: 50px;
            text-align: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            box-pack: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            box-align: center;
        }
        .am-header h1 {
            -webkit-box-flex: 1;
            -ms-flex: 1;
            box-flex: 1;
            line-height: 18px;
            text-align: center;
            font-size: 18px;
            font-weight: 300;
            color: #fff;
        }
    </style>
</head>
<body text=#000000 bgColor="#ffffff" leftMargin=0 topMargin=4>
<header class="am-header">
    <h1>查询会员基本信息</h1>
</header>
<div id="main">
    <form name=alipayment action='' method=post target="_blank">
        <div id="body" style="clear:left">
            <dl class="content">
                <dt>令牌
                    ：</dt>
                <dd>
                    <input id="token" name="token" />
                </dd>
                <hr class="one_line">
                <dd>
                    <span style="line-height: 28px; color:red;">注意：令牌必须由code换取token得到</span>
                </dd>
                <dt></dt>
                <dd id="btn-dd">
                        <span class="new-btn-login-sp">
                            <button class="new-btn-login" type="submit" style="text-align:center;">确 认</button>
                        </span>
                    <span class="note-help">如果您点击“确认”按钮，即表示您同意该次的执行操作。</span>
                </dd>
            </dl>
        </div>
    </form>

</div>
</body>
<script language="javascript">

</script>
</html>