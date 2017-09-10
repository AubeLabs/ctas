document.writeln('<form name=gpkiForm METHOD=POST>');
document.writeln('      <input name=encryptedData type=hidden>');
document.writeln('      <input name=signedData type=hidden>');
document.writeln('</form>');

function bar(arg){return 4;}
/*********************************************************************/
//				init		                     //
/*********************************************************************/
function Init()
{
	if (GPKISecureWeb==null || typeof(GPKISecureWeb)=='undefined') {
		location.href = ClientInstallPage;
		return -1;
	} else {
		if (needInstall()) {
			location.href = ClientInstallPage;
			return -1;		
		}
	}

	GPKISecureWeb.SetProperty(1,WorkDir);
	GPKISecureWeb.SetProperty(2,ServerCert);
	GPKISecureWeb.SetProperty(3,AlgoMode);
	GPKISecureWeb.SetProperty(4,HashAlg);
	GPKISecureWeb.SetProperty(5,GNCertType);
	GPKISecureWeb.SetProperty(6,ValidCertInfo); 
	GPKISecureWeb.SetProperty(7,'');						
	GPKISecureWeb.SetProperty(8,'');					
	GPKISecureWeb.SetProperty(9,smartCardOpt);	
	GPKISecureWeb.SetProperty(10,phoneOpt);			
	
	GPKISecureWeb.SetProperty(11,langOpt);			
	GPKISecureWeb.SetProperty(12,secureApiOpt);
	
	GPKISecureWeb.SetProperty(13,UbikeyWParam);
	GPKISecureWeb.SetProperty(14,UbikeyCompany);
	GPKISecureWeb.SetProperty(15,UbikeyKeyboardSec);
	if(	typeof(UbikeyVersion)!='undefined' && UbikeyVersion != null)
		GPKISecureWeb.SetProperty(17,UbikeyVersion);  
	GPKISecureWeb.SetProperty(19, "행정자치부: 행정안전부");
	
	var ret = GPKISecureWeb.init();
	if( ret != 0 ){
		alert('GPKISecureWeb init fail:'+ret);
		return -1;		
	}	

	//0:system default, 1:KSC5601,MS949,EUC-KR, 2: UTF8
	if (browserType == BROWSER_IE) {
		GPKISecureWeb.setServerEncoding(serverCharEnc);      // 서버 인코딩 지정 
		GPKISecureWeb.setClientEncoding(clientCharEnc);      // 클라이언트 인코딩 지정
	}
			
	return ret;
	
}

/*********************************************************************/
//				init		                     //
/*********************************************************************/
function EmbInit(form)
{
	return 0;
}


// ?????? embeded ?? ?????? ???????????????? ????? ?α??? 
/*********************************************************************/
//                   LoginEmbedded	                //
/*********************************************************************/
function LoginEmbedded(form){

	var strSendData; 
	strData= GPKISubmit(form);
	 
	gfNextParameters = strData+'$'+form.method+'$'+form.action+'$'+form.sessionid.value;
	embededWin.startAction();
	return false;
}

// C/S ?? ?????? ????? ????????? 
/*********************************************************************/
//                   Login                //
/*********************************************************************/
function Login(target,form)
{
	return Login(target,form,false)
}

function Login(target,form,isEmbeded)
{
	var strData;
	
	var strSendData; 
	strData= GPKISubmit(form); 
	nResult = Init();
	if( nResult == -1)
		return;

	var sessionID = "";
    if( form.sessionid.value != null)     
		sessionID = form.sessionid.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}	
	
	gfNextFunc = actionLogin;
	gfNextParameters = strData+'$'+form.method+'$'+form.action+'$'+form.sessionid.value;

	if (document.getElementById('keysec') != null) {
		keysecOpt = document.getElementById('keysec').value;
	}

	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	// 박종화 주석 2017.9.9
	//if(keysecOpt!=1)
	//	alert('스크린 리더 사용자는 원활한 서비스를 위해 가상커서 기능을 Off 시킨  후 사용하시기 바랍니다.');
	
	gpSessionId = form.sessionid.value;
	
	loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',(isEmbeded?displayEmbedWindow:displayWindow),target);
	//displayWindow(target);
	
	return false;
}

function replaceLtRt(data)
{
	if (aspxXSSvalidate && data != null) {
		data = data.replace(/</gi, '&lt');
		data = data.replace(/>/gi, '&gt');
	}
	return data;
}

function actionLogin(strData){
	var nResult;
	var strReturnData;
	
	var params = strData.split('$');
	
	nResult = GPKISecureWeb.Login(SiteID+params[3], params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();
	
	if( nResult == 0 )
	{
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = params[1];
		document.gpkiForm.action = params[2];
		document.gpkiForm.submit();
	}
	else
	{
		alert(strReturnData); 
	}
}

/*********************************************************************/
//                   Login                //
/*********************************************************************/
function LoginS(form)
{
	var strData;
	var nResult;
	var strReturnData;
	var strSignedData; // ???????? 
	var strSendData; 
	strData= GPKISubmit(form); 
	nResult = Init();
	if( nResult == 117)
		return;

	var sessionID = "";
    if( form.challenge.value != null)     
		sessionID = form.challenge.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}
	nResult = GPKISecureWeb.Login(SiteID, strData);
	strReturnData = GPKISecureWeb.GetReturnData();
	strSignedData = GPKISecureWeb.GetSignedData();
	if( nResult == 0 )
	{
		
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.signedData.value = strSignedData;
		document.gpkiForm.method = form.method;
		document.gpkiForm.action = form.action;
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult != 106)
			alert(strReturnData); 
	}

}

/*********************************************************************/
//                   LoginLink	                //
/*********************************************************************/
function LoginLink(link,sessionid)
{	
	var strData;
	var nResult;
	var strReturnData;
	var strSendData; 
	nResult = Init();
	if( nResult == 117)
		return;

	strData = GPKILink( link );
	//var sessionID = "";
	if( GPKISecureWeb.SetSessionID(sessionid) != 0) 
	{
		link.href = '';
		return false;
	}
	gfNextFunc = actionLoginLink;
	gfNextParameters = strData+'$'+link+'$'+link.target+'$'+sessionid;
	keysecOpt = document.getElementById('keysec').value;
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	gpSessionId = sessionid;
	loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',displayWindow,link);
	return false;
}

function actionLoginLink(strData){
	var nResult;
	var strReturnData;
	
	var params = strData.split('$');
	//nResult = GPKISecureWeb.Login(SiteID, strData);
	//strReturnData = GPKISecureWeb.GetReturnData();
	nResult = GPKISecureWeb.Login(SiteID+params[3], params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();	
	if( nResult == 0)
	{
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.action = params[1].substring(params[1].lastIndexOf('\/')+1,params[1].length-1);
		if ( params[2] == "" || params[2] == null ) {
			document.gpkiForm.target="_self";
		}else{
			document.gpkiForm.target=params[2];
		}
		//link.href = '#';
		document.gpkiForm.submit();
		return false;
	}
	else
	{
		alert(strReturnData); 
	}
}

//********************************************************************//
//		Logout					              //
//--------------------------------------------------------------------//
//		?α???(???????? ????)				      //	
//********************************************************************//
function Logout()
{
	var strData;
	var nResult;
	var strReturnData;
	var strSendData; 

	nResult = Init();
	if( nResult == 117)
		return;
		
	nResult = GPKISecureWeb.Logout(SiteID);
	if( nResult == 0 ) 
	{
		// ???? ???????? ???????
		alert("complet Logout.");
		top.location.href = ServiceStartPageURL;
	}
}

// cs ?? ?????? ???????????????? ????? SignAndEnv
/*********************************************************************/
//		       EnvelopedSignData			  //
/*********************************************************************/
function EnvelopedSignData(target,form)
{
	var strData;
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
		
	strData= GPKISubmit(form) ;
	
	nResult = Init();
	if( nResult == 117)
		return;

	var sessionID = "";
    if( form.sessionid.value != null)     
		sessionID = form.sessionid.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}
	
	gfNextFunc = actionEnvSingForm;
	gfNextParameters = strData+'$'+form.method+'$'+form.action;
	keysecOpt = document.getElementById('keysec').value;
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	gpSessionId = form.sessionid.value;
	if(CertOption == 0x01)
		loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',displayWindow,target);
	else
		actionEnvSingForm(strData+'$'+form.method+'$'+form.action);		
	
	return false;
}	

function actionEnvSingForm(strData){
	var nResult;
	var strReturnData;
	
	var params = strData.split('$');
	
	nResult = GPKISecureWeb.EnvelopedSignData(SiteID+gpSessionId, params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();
	
	if( nResult == 0 )
	{
		
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = params[1];
		document.gpkiForm.action = params[2];
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult != 106)
			alert(strReturnData); 
	}
}

/*********************************************************************/
//		       EnvelopData			  //
/*********************************************************************/
function EnvelopedData(form)
{
	var strData;
	
	var strSendData; 
	strData= GPKISubmit(form); 
	nResult = Init();
	if( nResult == 117)
		return;

	var sessionID = "";
    if( form.sessionid.value != null)     
		sessionID = form.sessionid.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}
	
	gfNextParameters = strData+'$'+form.method+'$'+form.action+'$'+form.sessionid.value;
	actionEnvSession(gfNextParameters);
	//loadJavascript('js/CertSelector.js',actionEnvSession,strData);
	return false;

}

function actionEnvSession(strData){
	
	var nResult;
	var strReturnData;
	
	var params = strData.split('$');
	
	nResult = GPKISecureWeb.EnvelopData(SiteID+params[3], params[0]);
	//nResult = GPKISecureWeb.EnvelopData(SiteID, params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();
	
	if( nResult == 0 )
	{
		
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = params[1];
		document.gpkiForm.action = params[2];
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult != 106)
			alert(strReturnData); 
	}
}

/*********************************************************************/
//		      SignedDataForm(form)										//
/*********************************************************************/
function SignedDataForm(target,form)
{
	var strData;
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
		
	strData= GPKISubmit(form) ;
	
	gfNextFunc = actionSingForm;
	gfNextParameters = strData+'$'+form.method+'$'+form.action;
	
	keysecOpt = document.getElementById('keysec').value;
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	gpSessionId = form.sessionid.value;
	
	if( CertOption==0x01 )
		loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',displayWindow,target);
	else
		actionSingForm(strData + '$' + form.method + '$' + form.action);
		
	
	return false;
}	


function actionSingForm(strData){
	var nResult;
	var strReturnData;
	
	var params = strData.split('$');
	
	nResult = GPKISecureWeb.SignedData(SiteID+gpSessionId, params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();
	
	if( nResult == 0 )
	{
		
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = params[1];
		document.gpkiForm.action = params[2];
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult == 30053 )
			strReturnData = 'Not Exist secureSession. \n Please retyr after you create SecureSession';
			
			alert(strReturnData); 
	}
}

/*********************************************************************/
//		      SignedData(data)										//
/*********************************************************************/
function SignedData(target,data)
{
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
	
	var dataOrg = data.split('_')[0];
		
	gfNextFunc = actionSign;
	gfNextParameters = dataOrg;
	keysecOpt = document.getElementById('keysec').value;
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	gpSessionId = data.split('_')[1];
	
	if(CertOption==0x01)
		loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',displayWindow,target);
	else
		actionSign(dataOrg);
		
	return false;
}	

function actionSign(strData){
	var nResult;
	var strReturnData;
	
	var tmp = document.getElementById('ssn');
	if(tmp !=null && typeof(tmp)!='undefined' && tmp.value.length > 0)
		nResult = GPKISecureWeb.SignedDataWithVIDCheck(SiteID+gpSessionId, strData, tmp.value);
	else
		nResult = GPKISecureWeb.SignedData(SiteID+gpSessionId, strData);
		
	strReturnData = GPKISecureWeb.GetReturnData();
	if( nResult == 0 ) 
	{
		var signedDataField = document.getElementById('signedDataValue');
		if (signedDataField != null && typeof(signedDataField) != 'undefined') {
			signedDataField.value = strReturnData;
		} else
			alert("Warning: input field, 'signedDataValue' for created SignedData is not found.");
		
		return strReturnData;
	}
	else
	{
		if( nResult == 30053)
			alert('Not Exist secureSession Info. Please retry after you create SecureSession');
		else			
		 	alert("error: " + nResult);			
		return "";
	}
}

/*********************************************************************/
//		      SignedDataWithVIDCheck(data, IDN)										//
/*********************************************************************/
function SignedDataWithVIDCheck(data, IDN)
{
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
		
	nResult = GPKISecureWeb.SignedDataWithVIDCheck(SiteID, CertOption, data, IDN);
	strReturnData = GPKISecureWeb.GetReturnData();

	if( nResult == 0 ) 
	{
		return strReturnData;
	}
	else
	{
		if( nResult != 106)
			alert(strReturnData);
		return "";
	}
}

/*********************************************************************/
//		      EncryptedSignData										//
/*********************************************************************/
function EncryptedSignData(target,form)
{
	var strData;
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
	strData= GPKISubmit( form);
	
	var sessionID = "";
    if( form.sessionid.value != null)     
		sessionID = form.sessionid.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}

	gfNextFunc = actionEncSingForm;
	gfNextParameters = strData+'$'+form.method+'$'+form.action ;
	keysecOpt = document.getElementById('keysec').value;
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	gpSessionId = form.sessionid.value;
	if(CertOption == 0x01)
		loadJavascript(gpkiScriptBase + '/ui/CertSelector.js',displayWindow,target);
	else
		actionEncSingForm(strData+'$'+form.method+'$'+form.action);
	
	return false;
}	

function actionEncSingForm(strData){
	var nResult;
	var strReturnData;
	
	//nResult = GPKISecureWeb.Login(SiteID, strData);
	//strReturnData = GPKISecureWeb.GetReturnData();
	var params = strData.split('$');
	
	nResult = GPKISecureWeb.EncryptedSignData(SiteID+gpSessionId, params[0]);
	strReturnData = GPKISecureWeb.GetReturnData();
	
	if( nResult == 0 )
	{
		
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = params[1];
		document.gpkiForm.action = params[2];
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult == 30053)
			strReturnData = 'Not Exist SecureSession. \n Please retry after you create Securesession';
					
		alert(strReturnData);
		location.href = ServiceStartPageURL;
	}
}

/*********************************************************************/
//		      Encrypt												//
/*********************************************************************/
function Encrypt(form)
{
	var strData;
	var nResult;
	var strReturnData;

	strData= GPKISubmit(form) 

	nResult = Init();
	
	if( nResult == 117)
		return;

	var sessionID = "";
    if( form.sessionid.value != null)     
		sessionID = form.sessionid.value;

	if( GPKISecureWeb.SetSessionID(sessionID) != 0) 
	{
		return;
	}
		
	nResult = GPKISecureWeb.Encrypt(SiteID+form.sessionid.value, strData);
	strReturnData = GPKISecureWeb.GetReturnData();

	if( nResult == 0 ) 
	{
		document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
		document.gpkiForm.method = form.method;
		document.gpkiForm.action = form.action;
		document.gpkiForm.submit();
	}
	else
	{
		if( nResult == 30053)
			alert('보안세션 정보가 없습니다. \n 보안세션 생성 후 다시 시도해 주세요');			
		else
			alert(strReturnData);
		location.href = ServiceStartPageURL;
	}
	return false;
}

/*********************************************************************/
//		      EncryptLink											//
/*********************************************************************/
function EncryptLink(link,isSubmit,sessionid)
{
	var strData;
	var nResult;
	var strReturnData;
	nResult = Init();
	if( nResult == 117)
		return;
	strData= GPKILink(link); 
	
	
    if( (sessionid != null) && typeof(sessionid)!='undefined')     
    	GPKISecureWeb.SetSessionID(sessionid);
		
	link.href += "encryptedData=";	
	nResult = GPKISecureWeb.Encrypt(SiteID+sessionid, strData);
	strReturnData = GPKISecureWeb.GetReturnData();
	if( nResult == 0)
	{
		if(isSubmit==null || typeof(isSubmit)=='undefined' || isSubmit){
			document.gpkiForm.encryptedData.value = replaceLtRt(strReturnData);
			document.gpkiForm.action = link.href.substring(link.href.lastIndexOf('\/')+1,link.href.lastIndexOf('\?'));
			document.gpkiForm.target="_self";
			
			//link.href = '#';
			document.gpkiForm.submit();
		}else{
			strData = replaceEscapeString(replaceLtRt(strReturnData));
			link.href += strData;
		}
	  
		return false;
	}else{
		if(nResult == 30053)
			strReturnData = 'Not Exist secureSession. \n Please retry after create secureSession';
		alert(strReturnData);
		//location.href = ServiceStartPageURL;
	}
}

function Decrypt(encData)
{
	var strData;
	var nResult;
	var strReturnData = "";
	
	nResult = Init();
	if( nResult == -1)
		return;
	
	var sessionID = gpSessionId;
    
	nResult = GPKISecureWeb.Decrypt(SiteID+sessionID, encData);
	strReturnData = GPKISecureWeb.GetReturnData();
	if( nResult == 0 ) 
	{
		return strReturnData;
	}
	else
	{
		if(nResult == 30053)
			alert('복호화 실패! 보안 세션 생성 후 다시 시도해 주세요');
		else
			alert("Decrypt Fail"+ strReturnData);
		
		location.href = ServiceStartPageURL;
	}
}


/*********************************************************************/
//		      WrapperTag 											//
/*********************************************************************/
//  <GPKI_ENC> Data </GPKI_ENC>	?? ?????.                
function WrapperTag(Msg)
{
	var TagData;
	
	TagDat = "<GPKI_ENC>";
	TagData += Msg;
	TagData += "</GPKI_ENC>"
	
	alert(TagDat);
	return TagData; 
}


/*********************************************************************/
//	               GPKISubmit(form)									//
/*********************************************************************/
function GPKISubmit( form ) 
{
	var queryString = "";
	var qs_index = "";
	var action = "";
	var noenc_qs = "";
	if ( form.action.indexOf('?') != -1 )
	{
		alert(form.action);
		action = form.action;
		document.gpkiForm.action = action.substring( 0, form.action.lastIndexOf('?') );
		queryString = action.substring( action.lastIndexOf('?') + 1, action.length) + '&';
	} 
	else
	{
		document.gpkiForm.action = form.action;
	}
	
	queryString += makeQueryString(form);
	return queryString;

}
/*********************************************************************/
//	               GPKILink(link)		                //
/*********************************************************************/
function GPKILink( link ) 
{
	nResult = Init();
	if( nResult == 117)
		return;
	var action = "";
	var queryString = "";
	var noenc_qs = "";
	var strResult ="";
	var strCode = ""
	var strMsg = ""
	
	if ( link.protocol != "http:" )
	{
		alert("http 프로토콜이 아닙니다.");
		return true;
	}
		
	if (link.search.length < 1) 
	{
		alert("링크 정보가 없습니다.");
		return false;
	}
	
	action = "http://" + link.hostname + ":" + link.port + "/" + link.pathname;
	queryString = link.search.substring( link.search.lastIndexOf('?') + 1, link.search.length);

	link.href = action + "?";	
	return queryString;
}

function makeQueryString( form ) 
{
	var name  =  new Array(form.elements.length); 
	var value =  new Array(form.elements.length); 
	var flag  = false;
	var j     = 0;
	var plain_text ="";

	len = form.elements.length; 
	
	for (i = 0; i < len; i++) 
	{

		if( (form.elements[i].type != "button") && (form.elements[i].type != "reset") && (form.elements[i].type != "submit") ) 
		{
			if (form.elements[i].type == "radio" || form.elements[i].type == "checkbox") 
			{ 
				if (form.elements[i].checked == true) 
				{
					name[j] = form.elements[i].name; 
					value[j] = encodeURIComponent(form.elements[i].value);
					j++;
				}
			}
			else {
				name[j] = form.elements[i].name; 
				if (form.elements[i].type == "select-one") 
				{
					var ind = form.elements[i].selectedIndex;
					if (form.elements[i].options[ind].value != '')
						value[j] = form.elements[i].options[ind].value;
					else
						value[j] = encodeURIComponent(form.elements[i].options[ind].text);
				}
				else
				{
					value[j] = form.elements[i].value;
				}
				j++;
			}
		}
	}

//	for (i = 0; i < j; i++) 
//	{
//		str = value[i]; 
//		value[i] = replaceEscapeString(str); 
//	}

	for (i = 0; i < j; i++) 
	{
		if (flag)
			plain_text += "&";
		else
			flag = true;
		plain_text += name[i] ;
		plain_text += "=";
		plain_text += (name[i]!='challenge')?encodeURIComponent(value[i]):value[i];
	}
	return plain_text;
}

// submit ????? ?????? ??u
function replaceEscapeString( qureyString ) 
{
	var i;
	var ch;
	var rstring = '';
	var qstring = '';

	qstring = String(qureyString);

	for (i = 0; i < qstring.length; i++) 
	{
		ch = qstring.charAt(i);

		if (ch == ' ')  rstring += '%20';
		else 
		if (ch == '%')  rstring += '%25';
		else 
		if (ch == '&')  rstring += '%26';
		else 
		if (ch == '+')  rstring += '%2B';
		else 
		if (ch == '=')  rstring += '%3D';
		else 
		if (ch == '?')  rstring += '%3F';
		else rstring += ch;
	}

	return rstring;
}

function embeddedEnterEvent(event) 
{
	// Enter Key
	if (event.keyCode == 13)
	{
		LoginEmbedded(document.getElementById("popForm"));
		return false;
	}
	
}

function loadJavascript(URL,callback,event,charet) { 
	    
    var xmlhttp = null; 
     
    if(window.XMLHttpRequest) { 
        
        xmlhttp = new XMLHttpRequest(); 
    } else { 
      
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 

      URL = (charet!=null && typeof(charet)!='undefined' &&charet.length!=0)?URL+'_'+charet:URL;
    	
    xmlhttp.open('GET', URL,false); 

   
    xmlhttp.onreadystatechange = function() { 
    	
        if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
          
             eval(xmlhttp.responseText);                     
        } 
    } 
    xmlhttp.send('');
 
    var userAgent = navigator.userAgent;
    if(userAgent.indexOf('Firefox')>-1 && userAgent.indexOf('3.6.')>-1){
    	if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
            // responseText ?? ???? ????    
            eval(xmlhttp.responseText);               
            //responseText = xmlhttp.responseText;            
        }
    }
    
    if(event!=null && typeof(event)!='undefined')
    	return callback(event);
    else
    	return callback();
    
  

    // ?????? xmlhttp ??u?? responseText ???? ??? 
    //return ; 
}

var gfNextFunc;
var gfNextParameters=new Array();

function cipherAction(){	 
	gfNextFunc(gfNextParameters);
}

function vKSetPointInit(session,params,isInit){
	var start = params.indexOf('<gpki');
	var endTag = '</gpki:ENCRYPTED DATA>';
	var end = params.indexOf(endTag)+endTag.length;
	
	var orgEncData = params.substring(start,end);
	
	var orgEncDatas = new Array();
	orgEncDatas = orgEncData.split("+ ");
	orgEncData="";
	for(var i=0; i<orgEncDatas.length;i++){
		var tmp= orgEncDatas[i].replace("'","");
		tmp=tmp.replace(/(^\s*)|(\s*$)/gi, "");
		orgEncData += tmp.replace("\n","");			
	}	
	
	GPKISecureWeb.SetPointInit(session,orgEncData,isInit);
}

function vKSetPoint(params){
	GPKISecureWeb.SetPoint(params);
}

function displayEmbedWindow(target){
	displayWindow(target,true);
}

function displayWindow(target,opt,sessionid){
	var win;
	if(sessionid!=null && typeof(sessionid)!='undefined')
		gpSessionId = sessionid;
	
	try{
		if(opt){
			win = new CertSelect(true,gpSessionId);
			 embededWin = win;
		}else
			win = new CertSelect(false,gpSessionId);
	}catch(err){
		win = new CertSelect(false,gpSessionId);		
	}
	
	var encFuncs = new Array();
	encFuncs[0] = RequestSKeyboard;
	encFuncs[1] = EncryptLink;
	encFuncs[2] = vKSetPointInit;
	encFuncs[3] = vKSetPoint;
	
	win.setKeyboardSec(keysecOpt,encFuncs);
	// ????? ???? ???
	GPKISecureWeb.SetProperty(16,keysecOpt);
	
	win.show(target);
}

var mkdummy = 0;

function RequestSKeyboard(imgElement,challenge)
{	
	var strData;
	var nResult;
	var strReturnData;
	var strSendData; 
	nResult = Init();
	if( nResult == 117)
		return;
		
	if(challenge.length == 1)
		strData = 'func='+challenge[0];
	else if(challenge.length == 4)
		strData = 'func='+challenge[0]+'&change='+challenge[1]+'&dummy='+challenge[2];
	else
		return;	
	
	
	if(challenge[3]!=null && typeof(challenge[3])!='undefined') 
	{
		GPKISecureWeb.SetSessionID(challenge[3]);
		gpSessionId = challenge[3];
	}
	
	nResult = GPKISecureWeb.Encrypt(SiteID+gpSessionId, strData);
	strReturnData = GPKISecureWeb.GetReturnData();

	if( nResult == 0 ) 
	{
		
		var target = './makeDSKeySecure';
		target += '.'+addPageExt();		
		target += '?encryptedData='+encodeURIComponent(replaceLtRt(strReturnData))+'&mkdummy='+challenge[2];
		
		if(addPageExt()!='php')
			imgElement.src =target;
		else{
			loadJavascript(target,showPHPVKeyboard,imgElement);
		}
			
		
	}
	else
	{
		if( nResult != 106)
			alert(strReturnData);
	}
			
}

function showPHPVKeyboard(target){
    var base64Img = decodeURIComponent(urlBase64Image);
    target.src = "data:image/jpeg;base64,"+base64Img ;
}

function initSecureSession(sessionid){
	var nResult = Init();
	var setSID = GPKISecureWeb.SetSessionID(sessionid);
	var resEnc = GPKISecureWeb.Encrypt(SiteID+sessionid, '111');
	if( (nResult != -1) && (setSID == 0) && (resEnc == 30053) )
		location.href = "./requestSecureSession." + serverLangExt + "?rnd=" + sessionid;

}

function addPageExt(){
	var currentUrl = window.location.href;
	var target ;
	
	if(currentUrl.indexOf('\.aspx')>-1)
		target = 'aspx';
	else if(currentUrl.indexOf('\.asp')>-1)
		target = 'asp';		
	else if(currentUrl.indexOf('\.php')>-1)
		target = 'php';	
	else
		target = 'jsp';
	
	return target;
}

function replaceServerScriptExt() {

	$("#gpkilink").find("a").each( function() {

		if ($(this).attr("href").indexOf(".html") < 0) {
			var linkrul = $(this).attr("href");
			$(this).attr("href", serverLangExt + "/" + linkrul + "." + serverLangExt);
		}
	} );
}
