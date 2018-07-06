
var _wxPayUrl = '';
var _wxFee = 0;
var _m = false;

function _wxSetFee(v)
{
	if(0 < v)
	{
		$('#wxpaynum').numberbox('setValue', v);
	}
	else
	{
		//$('#wxpaynum').textbox('setValue', '');
		$('#wxpaynum').next('span').find('input').focus();
	}
}

//调用页面支付
function _wxpay(payurl, txt)
{
	_wxPayUrl = payurl;

	//弹出选择打赏多少钱
	var newDiv = document.createElement("div");
	$(newDiv).attr('id', '_wxpay');
	$(newDiv).attr('class', "divCenter");
	$(newDiv).attr('style', "text-align:center;position:absolute;top:200px;z-index:99;");

	document.body.appendChild(newDiv);
	//$(newDiv).html('<div style="margin:5px;"><img onclick="_wxDaRed()" src="/Public/jeasyui/themes/icons/edit_remove.png" style="vertical-align:middle;padding:5px;"/><input class="easyui-textbox" id="wxpaynum" name="wxpaynum" value="1" style="width:50px" data-options="min:1"/>元<img onclick="_wxDaAdd()" src="/Public/jeasyui/themes/icons/edit_add.png" style="vertical-align:middle;padding:5px;"/></div><div style="margin:5px;"><a href="javascript:_payPrepare();" class="easyui-linkbutton" iconcls="icon-ok" plain="true">' + txt + '</a></div>');
	//$.parser.parse(newDiv);


	var cont = '<div class="divCenter" style="position:relative;"><img style="position:absolute;top:0px;width:32px;left:calc(50% - 16px);" ' +
		'src="/player/default/images/btnCancel.png" onclick="_wxpayClose();"><img src="/player/default/images/dsbg.png" width="80%">' +
		'<div class="divCenter" style="position: absolute;top: 45px;">' +
		'<input class="easyui-numberbox" data-options="min:1" id="wxpaynum" name="wxpaynum" type="text" value="1" style="border-width:inherit;width:100px;">' +
		'<span style="font-size:0.8em;margin-left:3px;">元</span></div><div class="divCenter" style="position: absolute;top: 28%;">' +
		'<div onclick="_wxSetFee(5)" class="wxFitV">5元</div><div onclick="_wxSetFee(10)" class="wxFitV">10元</div>' +
		'<div onclick="_wxSetFee(20)" class="wxFitV">20元</div></div><div class="divCenter" style="position: absolute;top: 40%;">' +
		'<div onclick="_wxSetFee(50)" class="wxFitV">50元</div><div onclick="_wxSetFee(100)" class="wxFitV">100元</div>' +
		'<span onclick="_wxSetFee(0)" class="wxFitV">其它</span></div><div class="divCenter" style="position:absolute;top:230px;">' +
		'<span onclick="javascript:_payPrepare();" class="btn btn-control">打赏1</span></div>';
/*
	<div id="_wxpay" class="divCenter" style="text-align:center;position:absolute;height:80px;top:10%;">
  <div class="divCenter" style="position:relative;">
    <img src="/player/default/images/dsbg.png" width="80%">
<div class="divCenter" style="position: absolute;top: 80px;"><input type="text" value="abc" style="
    border-width: inherit;
">
</div>
<div class="divCenter" style="position: absolute;top: 230px;">
<input type="button" value="打赏">
</div>    
  </div>
*/

	$(newDiv).html(cont);
	$.parser.parse(newDiv);

}

function _wxpayClose()
{
	$('#_wxpay').remove();
	try
	{
		dashanHideEnd();
	}
	catch (e)
	{
	}
}

function _wxDaAdd()
{
	var v = $('#wxpaynum').numberbox('getValue');
	v++;
	$('#wxpaynum').numberbox('setValue', v);
}

function _wxDaRed()
{
	var v = $('#wxpaynum').numberbox('getValue');
	v--;
	if(1 > v)
	{
		v = 1;
	}
	$('#wxpaynum').numberbox('setValue', v);
}

//生成预付单
function _payPrepare()
{
	//alert(_wxPayUrl); return;
	if(_m == true)
		return;
	_m = true;
	try
	{
		var val = $('#wxpaynum').numberbox('getValue');
		if(0 < parseFloat(val))
		{
			var payurl = _wxPayUrl + '?val=' + val;
			var _t = 0;

			_wxFee = val;

			$.ajax({
				//url: '/home.php/Test/prepay/val/' + val,
				url: payurl,
				type: 'post',
				data: '',
				cache: false,
				timeout:1000,
				dataType: 'json',
				success:function(data){
					try{
						if(null != data.h5js)
						{
							_wxgetPara(data.h5js);
						}
					}
					catch(e){
						//alert(e);
					}
				},
				complete:function(){	//无论是否成功都会调用
					_m = false;
				},
				error:function(){
					//alert('网络或服务中断！');
					_t++;
					if(5 < _t)
					{
						_m = false;
						return;
					}
					setTimeout('_wxpay("'+payurl+'")', 100);
				}
			});
		}
	}
	catch (e)
	{
	}
	_m = false;
	//先生成预付单，得到获取支付参数的地址

}

function _wxgetPara(url)
{
	var _t = 0;
	//console.log(url);
	//获取支付参数
	$.ajax({
		url: url,
		type: 'post',
		data: '',
		cache: false,
		timeout:1000,
		dataType: 'json',
		success:function(data){
			try{
				_wxcallWxPay(data);
			}
			catch(e){
				//alert(e);
			}
		},
		complete:function(){	//无论是否成功都会调用
		},
		error:function(){
			//alert('网络或服务中断！');
			_t++;
			if(5 < _t)
			{
				return;
			}
			setTimeout('_wxgetPara("'+url+'")', 100);
		}
	});
}

function _wxcallWxPay(p)
{
	wx.chooseWXPay({
	timestamp: p.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	nonceStr: ''+p.nonceStr, // 支付签名随机串，不长于 32 位
	package: ''+p.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	signType: ''+p.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	paySign: ''+p.paySign, // 支付签名
	success: function (res) {
		// 支付成功后的回调函数
		_wxpayClose();
		_wxcallWxPaySuc();
	},
	fail: function (res) {
		alert('支付失败！');
	}
	});
}

function _wxcallWxPaySuc()
{
	try{
		dashanSuc();
	}
	catch(e){
		//alert(e);
	}
}