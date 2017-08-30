

PinWindow =function (flowNumber) {
	/*
	MagicLine = {
			getCertVerify: function(){
				
				return 0;
			},
			getCertDetail: function(a,b,c){
				return "3$148bedaa4edd486a9784e77c253ea59a461dc7b1$sha256 With RSAEncryption$cn=Root CA,ou=GPKI,o=Government of Korea,c=KR$2012-04-04 10:10:26$2014-07-04 14:59:59$cn=RA7010000�쒖슱�밸퀎�쒓탳�≪껌001,ou=援먯쑁怨쇳븰湲곗닠遺�o=Government of Korea,c=KR$kcdsa1 02040505489397539857205702934572095872587320985732095725873249573209572309527335792837509$KeyID=1e1f8c57d1a8c2686113e2e0998fe821798eed2b \n�몄쬆��諛쒓툒�� \n�붾젆�좊━ 二쇱냼: \n	cn=Root CA,ou=GPKI,o=Government of Korea,c=KR \nCertificate SerialNumber=01 \n$a47f406991656510a3514ce89b3913b0142c859b$digitalSignature, nonRepudiation$[1] Certificate Policy : \n	PolicyIdentifier=1.2.410.100001.5.3.1.3 \n	[1,1] Policy Qualifier Info: \n		Policy Qualifier Id=CPS \n		Qualifier: \n			http://www.epki.go.kr/cps.html \n	[1,2] Policy Qualifier Info: \n		Policy Qualifier Id=User Notice \n		Qualifier: \n			Notice Text=Education Certificate \n$$[1] CRL Distribution Point \n     Distribution Point Name: \n	     Full Name: \n	          URL=ldap://catest.ldap.co.kr:10389/cn=crl1p1dp53,ou=CA131000001,ou=GPKI,o=Government of Korea,c=KR?certificateRevocationList;binary \n$[1]AuthorityInfoAccess :\n	Access Method = �⑤씪���몄쬆���곹깭 �꾨줈�좎퐳(1.3.6.1.5.5.7.48.1)\n	Alternative Name:\n		URL=http://catest.ocsp.co.kr:8000/OCSPServer\n$sha1$c6488d960cb2125475bcf3ed4226817bd54525fa";
			}	
		};
	*/
	var CertInfo = flowNumber;
	
	loadJavascript(gpkiScriptBase + "/ui/common.js",errorWin);
	loadJavascript(gpkiScriptBase + "/ui/pinWindowR",errorWin,null,"ko-KR.js");
	
	function loadJavascript(URL,callback,event,charet) { 
		
	    // 기본적인 변수 선언 
	    var xmlhttp = null; 
	    // FF일 경우 window.XMLHttpRequest 객체가 존재한다. 
	    if(window.XMLHttpRequest) { 
	        // FF 로 객체선언 
	        xmlhttp = new XMLHttpRequest(); 
	    } else { 
	        // IE 경우 객체선언 
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
	    } 

			URL = (charet!=null && typeof(charet)!='undefined' &&charet.length!=0)?URL+'_'+charet:URL;
	    // GET 모드로 URL 주소의 값을 가져온다 
	    // 주의 해야 할점은 무조건 UTF 로 값이 들어옴 
	    xmlhttp.open('GET', URL,false); 

	    // 값을 가져 왔을경우 호출할 메소드를 바로 선언 
	    xmlhttp.onreadystatechange = function() { 
	    	 // readyState 가 4 고 status 가 200 일 경우 올바르게 가져옴 
	        if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
	            // responseText 에 값을 저장 
	            //responseText = xmlhttp.responseText;
	            eval(xmlhttp.responseText);           
	        } 
	    } 
	    xmlhttp.send('');
	 
	    var userAgent = navigator.userAgent;
	    if(userAgent.indexOf('Firefox')>-1 && userAgent.indexOf('3.6.')>-1){
	    	if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
	            // responseText 에 값을 저장    
	            eval(xmlhttp.responseText);         
	            //responseText = xmlhttp.responseText;            
	        }
	    }
	    
	    if(event!=null && typeof(event)!='undefined')
	    	return callback(event);
	    else
	    	return callback();
	    
	  

	    // 가져온 xmlhttp 객체의 responseText 값을 반환 
	    //return ; 
	}
	function errorWin(){}

	var windowRoot;
	
	var __001 = document.createElement("div");
	//__001.style.border = 'dashed 1px red';
	__001.id = 'ppopup';
	__001.style.zIndex = '+1';
	__001.style.width='263px';
	__001.style.visibility ='hidden';
	__001.style.textAlign = 'center';
	__001.style.borderRadius = '6.0px';	
	__001.style.display ='none';
	
	var __002 = document.createElement("div");
	//__002.style.border = 'dashed 1px red';
	__002.id = 'ppopup_drag';
	__002.style.backgroundColor='gray';
	__002.style.height ='24px';
	__002.style.background = 'url("' + gpkiScriptBase + '/image/certificate/pop_tit_bg.png")';
	__002.style.borderBottom ='0px';
	//__002.style.fontcolor ='white';
	//__002.style.cursor = 'default';
	//__002.style.verticalAlign='middle';
	__002.style.font="normal bold 12px Malgun Gothic, Dotum, Verdana, sans-serif";
	
	
	__002.appendChild(document.createTextNode(pinStr.pinWinTitle));
	
	__001.appendChild(__002);
	
//	/loadJavascript("js/common.js",loadedWin);
		
	__001.appendChild(init());
	
	var overlay = document.createElement('div');
	var _resizeOverlayFunction;
	overlay.style.zIndex = '525287';
    overlay.onclick = null;
	
    overlay.style.position = 'absolute';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
	
   	overlay.style.top = '0';
    overlay.style.left = '0';
    //overlay.style.display = 'none';
    // 諛�諛곌꼍 gray 泥섎━
    overlay.style.opacity = 0.5;
    overlay.style.filter = "alpha(opacity='50')";
    overlay.style.backgroundColor = 'gray';
    
    document.getElementsByTagName("body")[0].appendChild(overlay);
    
	//windowRoot = __001;
	//dragArea =__002;
	//addOverlay();
	
	__001.style.zIndex = '525288';
	document.getElementsByTagName("body")[0].appendChild(__001);



function onCertAlert( ){
	
}
var win;
function loadedWin(){
	//win = new Dialog();	
}	
	
var selectedRow ;

function  createSecurityRow(parent,columns,isheader){
	var pElement;
	if(isheader)
		pElement = parent;
	else{
		pElement = document.createElement('a');
		pElement.href = '#';
		parent.appendChild(pElement);		
	}
	
	for(i=0; i<columns.length; i++){
		var __003_01 = document.createElement('div');
		__003_01.style.width = '160px';
//		if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
			__003_01.style.styleFloat = 'left';
		else
			__003_01.style.cssFloat = 'left';
		__003_01.style.textAlign = 'center';
		__003_01.appendChild(document.createTextNode(columns[i]));
		pElement.appendChild(__003_01);
		
		if(i!=(columns.length-1)){
			var __003_02 = document.createElement('div');
//			if(navigator.appName == "Microsoft Internet Explorer")
			if (browserType == BROWSER_IE)
				__003_02.style.styleFloat = 'left';
			else
				__003_02.style.cssFloat = 'left';
			__003_02.style.backgroundColor = 'black';
			__003_02.style.width='1px';
			__003_02.innerHTML = '&nbsp';
			pElement.appendChild(__003_02);		
		}else{
			var __003_02 = document.createElement('div');
			__003_02.style.clear = 'both';
			pElement.appendChild(__003_02);
			
		}	
	}	
}

function init(){
		
	var winRoot = document.createElement('div');
	winRoot.id = 'pinDiloag';
	winRoot.style.border = '1px solid #CCC';
	winRoot.style.width = '260px';
	winRoot.style.height ='80px';
	winRoot.style.marginTop='0px';
	winRoot.style.marginLeft='0px';
	winRoot.style.backgroundColor='#E3E3E3';
	
	var __002 = document.createElement('div');
	__002.style.height = '20px';
		
	var __002_1 = document.createElement('label');
	__002_1.style.font='normal normal 12px "돋움",Dotum,sans-serif';
	__002_1.appendChild(document.createTextNode(pinStr.errMsg));
	__002.appendChild(__002_1);
	winRoot.appendChild(__002);
	
	var __003 = document.createElement('input');
	__003.type = 'password';
	__003.id = 'pn_passwd';
	__003.style.marginTop = '5px';
	__003.style.width = '250px';
	__003.setAttribute('title',pinStr.errMsg);
	__003.style.font = 'italic bold 14px arial,serif';
	// Enter �낅젰�� 泥섎━
	if(__003.addEventListener ) {
		__003.addEventListener('keydown',keyHandler,false);
    } else if(__003.attachEvent ) {
    	__003.attachEvent('onkeydown',keyHandler); /* damn IE hack */	        
    }
	
	winRoot.appendChild(__003);	
	
	var __004 = document.createElement('div');
	__004.style.maginTop = '5px';
	winRoot.appendChild(__004);
	
	var __004_01 = document.createElement('button');
	__004_01.id = 'pOkAction';
	__004.style.marginTop ='5px';
	__004.style.height ='10px';
	
	__004_01.style.width = '75.0px';
	__004_01.style.height = '25.0px';
	__004_01.style.borderRadius = '6px';
	__004_01.style.border = '1px solid #BBB';
	
	__004_01.style.font='normal normal 12px "돋움",Dotum,sans-serif';
	__004_01.appendChild(document.createTextNode(pinStr.okButtonStr));	
	
	__004_01.onclick = function(){
		//alert();
		// ��옣留ㅼ껜 �뺣낫��Pin 踰덊샇 �낅젰
		var value = document.getElementById('pn_passwd')!=null?document.getElementById('pn_passwd').value:null;
		value = ((value==null)&&(typeof(value)=='undefined'))?'':value;
		if(value==''){
			alert(pinStr.retryStr);
			document.getElementById('pn_passwd').focus();
			return;
		}
		
		document.getElementsByTagName("body")[0].removeChild(overlay);
		document.getElementsByTagName("body")[0].removeChild(__001);
		isFileDialog = false;
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;
		clickElement.setAttribute('action','end');
		
		clickElement.setAttribute('pin',value);
		clickElement.focus();
		CertInfo(clickElement);
	};
		__004.appendChild(__004_01);
		
			
		var __004_02 = document.createElement('button');
		__004_02.style.marginLeft='15px';
		__004_02.style.height='15px';
		
		__004_02.style.width = '75.0px';
		__004_02.style.height = '25.0px';
		__004_02.style.borderRadius = '6px';
		__004_02.style.border = '1px solid #BBB';
		
		__004_02.appendChild(document.createTextNode(pinStr.cancelButtonStr));
		__004_02.style.font='normal normal 12px "돋움",Dotum,sans-serif';
		__004_02.onclick = function(){
			clickElement.setAttribute('action','end');
			document.getElementsByTagName("body")[0].removeChild(overlay);
			document.getElementsByTagName("body")[0].removeChild(__001);
			isFileDialog = false;
			if(clickElement!=null && typeof(clickElement)!='undefined')
				clickElement.disabled = false;
			clickElement.focus();
			};
		__004.appendChild(__004_02);
	
	
	
	
	return winRoot; 
}

function keyHandler(e) {
		
	var target = e.target||e.srcElement;
		//var parent = target.parentNode.parentNode;
		    		
    var TABKEY = 9;
    var Up = 38;
    var Down =40;
    var enter = 13;
    
    if(e.keyCode == enter){
//    	if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
       	 	document.getElementById('pOkAction').onclick();
    	else{
	   		if(e.preventDefault) {
	   			e.preventDefault();
	   		}
	   		document.getElementById('pOkAction').onclick();
    	}
    	return false;
   	}
}

var clickElement;
	return{
	
		show : function(element){
			overlay.style.display='';
			__001.style.display='';	
			element.setAttribute('action','process');
			new Dialog().show('ppopup', 'ppopup_drag', 'screen-center', 0, 0,'');
			if(element!=null && typeof(element)!='undefined')
				clickElement = element;
			document.getElementById('pn_passwd').focus();
			return __001;
							
		},
		dispose : function(){
			overlay.style.display='none';
			__001.style.display='none';
		}
	}
}