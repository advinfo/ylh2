<?php
/* *
 * 功能：云联惠支付接口 接口调试入口页面
 * 说明：
 * 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 请确保项目文件有可写权限，不然打印不了日志。
 */


//根据配置修改相应信息
class YLHconfig {
public static $config = [
    //应用ID
    'client_id' => "b51c241e",
    //应用密钥
    'client_secret' => '7dc0865d8528fda20d1e153159f28a465dfb87158508d8ab3fd3ab01ae423579',
    //应用回调地址,用户认证时使用
    'redirect_uri' => 'https://push.av365.cn/home.php/Ylh/callback',
    //应用私钥，您的原始格式RSA私钥
    'client_private_key' => 'MIICWwIBAAKBgQCrtHxDYFG9Xl6/oSnSGPDOYoDG/kasL+GV8jv/+4MsAvDQgukNSUQSNot4EdNtOZ5WCROU23ke5XcxLWqB8+G2J0pSZSC3fQtqyWTqJep/JLgfdnjeDtfuzPqc9I012MIKLSnOmztH6o0qhMIGBLhgt0Pll6BNQM0uV3wbdmuoowIDAQABAoGAG38gsy12iYvWQnvNla6WyYYuty87JBHa30dWYmzlmaOy6sE8DvufogcIGKdKI2CpwX9cmmb3I4J9rutl9f+XMnA3BX9eIf0kyPOdi6mSqzfuJbbu3T9BIHlX67qPsQUDNnCIXO+IFjjtrtzT1qjcNNak3rte0smWVV/X1Ru++skCQQDWwrZ1pUjEtOE+0bZgKj63PjMT3nwScRnDTZZw1YWNGaVZt8ixg/9e7ky03zutdvapSKqH07h9t4Od0OzHA41VAkEAzK06vvlvkStJc8e8r1/6svY2USwyd2FAvnCHtc9DGOQlBW47F2DXlUIIj006SSKv3qq533CFCxBsZeAK0GIeFwJADdyHdlRyu++I0ksq4E4Zui4Tkea8T1xpc0egvCur8Q2EtKO+GmcQponu/YWjDnEtPoPoLdgmgkbEAf2oKrg5+QJADsARMsAhJTIcagaj93OQSqNpyLHJtUbB9rd/YD/ekwWmEV0fTxEAmFYY7dLf93NTf1WIbazbOa/mT/U0ck4P4wJADaYWbXUyuOfFabw/OkGfgQOHYf/ydCq8j60yRQzWMDTJZjSRIKBaDZBpndlmaLL7hkc5Zx3q/PGnVB3kDk35Gw==',
    //同步跳转，支付使用
    'return_url' => 'https://push.av365.cn/home.php/Ylh/payReturn',
    //异步通知地址，支付使用
    'notify_url' => 'https://push.av365.cn/home.php/Ylh/payNotify',
    //云联惠API网关
    //'gatewayUrl' => "https://openapi.yunlianhui.com", //沙箱环境openapidev 正式环境 openapi
    'gatewayUrl' => "https://openapidev.yunlianhui.com", //沙箱环境openapidev 正式环境 openapi
    //云联惠开放平台收银台
    //'gatewayPay' => "http://openpay.yunlianhui.com",//沙箱环境openpaydev 正式环境 openpay
    'gatewayPay' => "http://openpaydev.yunlianhui.com",//沙箱环境openpaydev 正式环境 openpay
    //云联惠公钥
    'yunlianhui_public_key' => 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmRojhWia2NLb3fUH6A2GM4k0infDLKYSeTqaN/RaHyVXU+Sbyq+Qt/ZhKUut7IK1ClBPEcsmK8+0yvA5b3/AZL2JIuKIF+g9Y53Wkio7CXDAQzCL1ZwhLTW0h0olN/89BcuVuapmmnsxl7dYGtskroAt6WZeSIJN3q8nxFJQV5QIDAQAB',

];
}
