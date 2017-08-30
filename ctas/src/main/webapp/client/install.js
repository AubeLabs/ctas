var sProxyData = "DIRECT";
var nEndLoop   = -1;
var nContinue  = -1;
var Count      = 0;

// GPKIInstaller 객체 생성되었는지 확인
function HaveObject()
{
	if(GPKISecureWeb==null || typeof(GPKISecureWeb)=='undefined') {
		return false;
	} else {
		return !needInstall();
	}
}

// xp sp2 인지 체크해서 페이지 이동한다.
function SP2Check()
{
	var userAgent;
	userAgent = navigator.userAgent;

	if( userAgent.indexOf("SV1") > 0 ) // xp sp2 이다. 
	{
		return true;
	}

	return false;
}

function DisplayMsg(title, body)
{
	msg = "&nbsp;<font color='blue' class='12p'>\r\n";
	msg = msg + "<B>" + title +" : </B></font>";
	msg = msg + "<font class='12p'>\r\n";
	msg = msg + body +"</font><br>";
	document.write(msg);
}

function getOSVersion()
{
	version=/NT \d+.\d+/;
	strTemp = String(navigator.appVersion.match(version));
	if(strTemp == "null")
		return null;
	re = /(\w+)\s(\w+)/;
	return Number(strTemp.replace(re, "$2"));
}

