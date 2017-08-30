

SecureTokenWindow =function (certObj) {
	/*
	MagicLine = {
			getCertVerify: function(){
				
				return 0;
			},
			getCertDetail: function(a,b,c){
				return "3$148bedaa4edd486a9784e77c253ea59a461dc7b1$sha256 With RSAEncryption$cn=Root CA,ou=GPKI,o=Government of Korea,c=KR$2012-04-04 10:10:26$2014-07-04 14:59:59$cn=RA7010000서울특별시교육청001,ou=교육과학기술부,o=Government of Korea,c=KR$kcdsa1 02040505489397539857205702934572095872587320985732095725873249573209572309527335792837509$KeyID=1e1f8c57d1a8c2686113e2e0998fe821798eed2b \n인증서 발급자: \n디렉토리 주소: \n	cn=Root CA,ou=GPKI,o=Government of Korea,c=KR \nCertificate SerialNumber=01 \n$a47f406991656510a3514ce89b3913b0142c859b$digitalSignature, nonRepudiation$[1] Certificate Policy : \n	PolicyIdentifier=1.2.410.100001.5.3.1.3 \n	[1,1] Policy Qualifier Info: \n		Policy Qualifier Id=CPS \n		Qualifier: \n			http://www.epki.go.kr/cps.html \n	[1,2] Policy Qualifier Info: \n		Policy Qualifier Id=User Notice \n		Qualifier: \n			Notice Text=Education Certificate \n$$[1] CRL Distribution Point \n     Distribution Point Name: \n	     Full Name: \n	          URL=ldap://catest.ldap.co.kr:10389/cn=crl1p1dp53,ou=CA131000001,ou=GPKI,o=Government of Korea,c=KR?certificateRevocationList;binary \n$[1]AuthorityInfoAccess :\n	Access Method = 온라인 인증서 상태 프로토콜(1.3.6.1.5.5.7.48.1)\n	Alternative Name:\n		URL=http://catest.ocsp.co.kr:8000/OCSPServer\n$sha1$c6488d960cb2125475bcf3ed4226817bd54525fa";
			}	
		};
	*/
	var callback = certObj;
	
	loadJavascript(gpkiScriptBase + "/ui/common.js",errorWin);
	var LangR = loadJavascript(gpkiScriptBase + "/ui/certviewR",errorWin,"ko-KR.js");
	function loadJavascript(URL,callback,langSt) { 
		
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

	    // GET 모드로 URL 주소의 값을 가져온다 
	    // 주의 해야 할점은 무조건 UTF 로 값이 들어옴 
	     if(langSt==null||typeof(langSt)=='undefined')
	    	xmlhttp.open('GET', URL,false);
	    else
	    	xmlhttp.open('GET', URL+"_"+langSt,false);  

	    // 값을 가져 왔을경우 호출할 메소드를 바로 선언 
	    xmlhttp.onreadystatechange = function() { 

	        // readyState 가 4 고 status 가 200 일 경우 올바르게 가져옴 
	        if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
	            // responseText 에 값을 저장 
	            responseText = xmlhttp.responseText;
	            //LangR = responseText;
	            //eval(xmlhttp.responseText);
	            //LangR = eval(LangR);
	            
	        } 
	    } 
	    xmlhttp.send('');
	    return eval(responseText);

	    // 가져온 xmlhttp 객체의 responseText 값을 반환 
	    //return ; 
	}
	function errorWin(){}

	var windowRoot;
	

/*	
	var LangR = {
			tab01:"일반",
			tab02:"자세히",
			certState : "상태",
			certState001 : "올바른 인증서 입니다.",
			certState002 : "유효하지 않은 인증서 입니다.",
			certState003 : "검증 중...",
			certState : "상태",
			CertGF01 : "인증서의 정보",				
			CertGF02 : "인증서의 용도",
			CertGF03:" * 자세한 정보는 인증기관의 설명을 참조하십시오",
			CertGF04:" 발급 대상 : ",
			CertGF05 :" 발급자 : ",
			CertGF06 : " 유효 기간 : ",
			CertGF07 : " 구    분 : ",
			CertGF08 : " 상   태 : 올바른 인증서 입니다.",
			CertGF09 :"인증서 검증",
			CertGF10:"사용자 알림",
			certFieldName : [
			         		"버전",
			         		"일련번호",
			         		"서명알고리즘",
			         		"발급자",
			         		"유효기간\(시작\)",
			         		"유효기간\(끝\)",
			         		"주체",
			         		"공개키",
			         		"기관키 식별자",
			         		"주체키식별자",
			         		"키사용",
			         		"인증서정책",
			         		"주체대체이름",
			         		"CRL배포지점",
			         		"기관정보지점",
			         		"손도장알고리즘",
			         		"손도장"		
			         ],
			 strConfirm : "확인",
			 CertDF01:"필드",
			 CertDF01:"내용"
	}
*/
	
	var __001 = document.createElement("div");
	//__001.style.border = 'dashed 1px red';
	__001.id = 'STpopup';
	__001.style.zIndex = '+1';
	__001.style.width='391px';
	__001.style.visibility ='hidden';
	__001.style.textAlign = 'center';
	__001.style.borderRadius = '6.0px';	
	__001.style.display ='none';
	
	var __002 = document.createElement("div");
	//__002.style.border = 'dashed 1px red';
	__002.id = 'STpopup_drag';
	__002.style.backgroundColor='gray';
	__002.style.height ='24px';
	__002.style.background = 'url("' + gpkiScriptBase + '/image/certificate/pop_tit_bg_01.png")';
	__002.style.borderBottom ='0px';

	//__002.style.cursor = 'default';
	//__002.style.verticalAlign='middle';
	__002.style.font='normal bold 13px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';

	
	__002.appendChild(document.createTextNode("보안토큰 선택창"));
	
	__001.appendChild(__002);
	
	//loadJavascript("js/common.js",loadedWin);
		
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
    // 백 배경 gray 처리
    overlay.style.opacity = 0.5;
    overlay.style.filter = "alpha(opacity='50')";
    overlay.style.backgroundColor = 'gray';
    
    document.getElementsByTagName("body")[0].appendChild(overlay);
    
	//windowRoot = __001;
	//dragArea =__002;
	//addOverlay();
	
	__001.style.zIndex = '525288';
	document.getElementsByTagName("body")[0].appendChild(__001);
	
	attachKeyboardNavigator();



function onCertAlert( ){
	
}
var win,selectedRow,preSelectedRow,preSelectedRow2;
function loadedWin(){
	//win = new Dialog();	
}	

var selecteRowNum ;


function selectRow(srcElement, target){
		
	if(selectedRow!=null && typeof(selectedRow)!='undefined' && srcElement!=selectedRow)
		selectedRow.setAttribute('selected',false);
	
	selectedRow = srcElement;
	
	setReleaseSectedMark(srcElement);
	
	srcElement.setAttribute('selected',true);		
	setSelectedMark(srcElement,'yellow');	
	
	var parent = srcElement.parentNode;
	var childs = parent.childNodes;
	
	for(i=0;i<childs.length;i++){
		if(srcElement==childs[i]){
			selecteRowNum = i;
			break;
		}
	}
	//document.getElementById('passwd').focus();
}

function checkSelected(element){
	var result = element.getAttribute('selected');
if(result!=null && typeof(srcElement)!='undefined')
		return result;
	else
		return false;
}

function setReleaseSectedMark(target){		
	var children = target.parentNode.childNodes;
	for(var j=0;j<children.length;j++){
		var releaseColumn =children[j];
		if(selectedRow==releaseColumn || target==releaseColumn)
			continue;
		
		setSelectedMark(releaseColumn,'white');		
	}
}

function setSelectedMark(target,color){
	
	target.style.backgroundColor = color;
	
	var childrend = target.childNodes;
	for(var i=0; i<childrend.length; i++){
		if(i%2==0)
			childrend[i].style.backgroundColor = color;
	}
}

/* 데이터 테이블 라이브러리 */
function  createSecurityRow(parent,columns,isheader,idx){
	var pElement, totalString,__001;
	totalString = '';
	
	if(isheader)
		pElement = parent;
	else{		
		pElement = document.createElement('div');
		pElement.style.backgroundColor = 'white';
		pElement.style.height = '20px';
		
		pElement.onclick = function(){
			if(selectedRow==this) 
				return; 
			
//			alert(this.getAttribute('title'));	// for debugging.
//			//document.getElementById('gp_secure_ok').onclick();
			//selectRow(this);			
			
			if(preSelectedRow2!=null && typeof(preSelectedRow2)!='undefined' && preSelectedRow2!=preSelectedRow)
				preSelectedRow2.style.backgroundColor = 'white';
			preSelectedRow2 = this.getElementsByTagName('BUTTON')[0];
			preSelectedRow2.setAttribute('idx', idx);
			preSelectedRow2.style.backgroundColor='yellow';
			document.getElementById('gp_secure_ok').onclick();
		};
		
		pElement.onmouseover = function(){
			setReleaseSectedMark(this);
			if(preSelectedRow!=null && typeof(preSelectedRow)!='undefined' && preSelectedRow2!=preSelectedRow)
				preSelectedRow.style.backgroundColor = 'white';
			
			if(selectedRow==this)
				return;
			setSelectedMark(this,'#E3E4FA');
			this.style.cursor = 'pointer';
						
			preSelectedRow = this.getElementsByTagName('BUTTON')[0];
			preSelectedRow.style.backgroundColor='#E3E4FA';
		};		
		
		parent.appendChild(pElement);		 
	}
	
	for(var i=0; i<columns.length; i++){
		var __003_01 = document.createElement('div');
		if(!isheader)
			__003_01.style.backgroundColor = 'white';
		__003_01.style.fontSize='11px';
		__003_01.style.height='17px';
		//__003_01.style.border = 'dashed 1px red';
		__003_01.style.width = '160px';
		
		if(navigator.appName == "Microsoft Internet Explorer")
//		if (browserType == BROWSER_IE)
			__003_01.style.styleFloat = 'left';
		else
			__003_01.style.cssFloat = 'left';
		__003_01.style.textAlign = 'center';
		__003_01.style.overflow = 'hidden';
				
		if(i==1 && !isheader){
			var selectLayer = document.createElement('button');
			//selectLayer.setAttribute('type', 'text');
			//selectLayer.readOnly = true;
			selectLayer.style.width = '158px';
			selectLayer.style.height ='17px';
			//selectLayer.value = columns[i];
			selectLayer.appendChild(document.createTextNode(columns[i]));
			selectLayer.style.backgroundColor='white';
			selectLayer.style.border = 'solid 0px white';
			//selectLayer.setAttribute('title',columns[0]);
			totalString += columns[i]+" ";		
			selectLayer.onfocus = function(){
				setReleaseSectedMark(this.parentNode.parentNode);
				if(preSelectedRow!=null && typeof(preSelectedRow)!='undefined' && preSelectedRow2!=preSelectedRow)
					preSelectedRow.style.backgroundColor = 'white';
				
				if(selectedRow==this.parentNode.parentNode)
					return;
				
				setSelectedMark(this.parentNode.parentNode,'#E3E4FA');	
				
				
				preSelectedRow = this.parentNode.parentNode.getElementsByTagName('BUTTON')[0];
				preSelectedRow.style.backgroundColor='#E3E4FA';	
				//this.style.border = '1px solid red';
			}				
			__003_01.appendChild(selectLayer);
			//(document.createTextNode(columns[i]));
		}else{
			__003_01.appendChild(document.createTextNode(columns[i]));
			totalString += columns[i]+" ";		
		}
				
		pElement.appendChild(__003_01);
		
		if(i!=(columns.length-1)){
			var __003_02 = document.createElement('div');
			if(navigator.appName == "Microsoft Internet Explorer"){
//			if (browserType == BROWSER_IE){
				__003_02.style.styleFloat = 'left';
			}else{
				__003_02.style.cssFloat = 'left';
				__003_02.innerHTML = '&nbsp';
			}
			__003_02.style.backgroundColor = 'white';
			//__003_02.style.border = 'solid 1px black';
			__003_02.style.width='0px';
			__003_02.style.height = '100%';
			//
			pElement.appendChild(__003_02);		
		}else{
			var __003_02 = document.createElement('div');
			__003_02.style.clear = 'both';
			pElement.appendChild(__003_02);			
		}	
	}	
		
	if(__001 !=null && typeof(__001)!='undefined')
		__001.setAttribute('title', totalString);
	
	pElement.setAttribute('title', totalString);
}
/*
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
		if(navigator.appName == "Microsoft Internet Explorer")
			__003_01.style.styleFloat = 'left';
		else
			__003_01.style.cssFloat = 'left';
		__003_01.style.textAlign = 'center';
		__003_01.appendChild(document.createTextNode(columns[i]));
		pElement.appendChild(__003_01);
		
		if(i!=(columns.length-1)){
			var __003_02 = document.createElement('div');
			if(navigator.appName == "Microsoft Internet Explorer")
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
*/
var tableobj ;
/* 보안 토큰 선택창 */
function init(){
	

	var winRoot = document.createElement('div');
	//winRoot.appendChild(document.createTextNode("1111"));
	winRoot.style.padding = '15px 0px 5px 0px';
	winRoot.style.marginTop='0px';
	winRoot.style.marginLeft='0px';
	winRoot.style.backgroundColor='#F4F4F4';
	winRoot.style.border = '1px solid #CCC';
	
	var __002 = document.createElement('div');
	//__002.style.border = '1px solid black';
	__002.style.width ='385px';
	winRoot.appendChild(__002);
	
	var __003 =  document.createElement('div')			;
	//width:470px; margin-Top:30px; height:150px
	__003.style.marginLeft = '20px';
	__003.style.marginTop = '20px';	
	__003.style.width = '340px';
	//__003.style.height = '150px';
	//__003.style.marginTop = '0px';
		
	__002.appendChild(__003);
	
	var __003_01 =  document.createElement('div');
	__003_01.style.backgroundColor = '#DDD';
	__003.appendChild(__003_01);
	
	var columnNames = ['드라이버 이름','드라이버 정보'];	
	createSecurityRow(__003_01,columnNames,true,0);	
	
	GPKISecureWeb.SetMediaType(3);			
	var columnData = new Array();
	for(var i=0;i<GPKISecureWeb.GetMediaSubCount();i++){
		columnData[i] = GPKISecureWeb.GetMediaSubInfo(i).split(',');
	}
	/*
	columnData[0] = ['MagicToken','1.0.0.0'];
	columnData[1] = ['EToken','1.0.0.0'];
	columnData[2] = ['MagicToken','1.0.0.0'];
	columnData[3] = ['EToken','1.0.0.0'];
	columnData[4] = ['MagicToken','1.0.0.0'];
	columnData[5] = ['EToken','1.0.0.0'];
	columnData[6] = ['MagicToken','1.0.0.0'];
	columnData[7] = ['EToken34085349534','1.0.0.0'];
	columnData[8] = ['EToken','1.0.0.0.0.0.0'];
	columnData[9] = ['MagicToken','1.0.0.0'];
	columnData[10] = ['EToken','1.0.0.0'];
	columnData[11] = ['MagicToken','1.0.0.0'];
	columnData[12] = ['EToken','1.0.0.0'];
	*/
	var __003_02 =  document.createElement('div');
	//__003_02.style.border = '1px solid #474747';
	__003_02.style.border = 'solid 1px #CCC';
	__003_02.id='secureTokenList'
	__003_02.style.height = '150px';
	__003_02.style.overflow ='auto';	
	__003.appendChild(__003_02);
	
		
	for(j=0;j<columnData.length;j++){
		createSecurityRow(__003_02,columnData[j],false,j);
	}
	tableobj = __003_02;
	
	
	
	var desc = new Array();
	
	desc[0] = '보안토큰을 선택하시고 확인 버튼을 눌러 주십시오 ';
	desc[1] = '사용하실 보안토큰이 항목에 없을 경우,';		
	desc[2] = '아래의 \"보안토큰 구동  프로그램 설치\"버튼을 클릭하여';
	desc[3] = '보안 토큰 구동프로그램을 설치하여 주십시오';	
	desc[4] = '보안토큰이 2개 이상 연결되어 있는 경우,';
	desc[5] = '하나만 연결하여 주십시오';
	
	var __004 =  document.createElement('div');
	__004.style.width = '340px';
	__004.style.marginLeft ='20px';
	__004.style.marginTop ='15px';
	__004.style.marginBottom ='15px';
	//__004.innerHTML = desc;
	__002.appendChild(__004);
	
	
	for(var i=0; i<desc.length; i++){
		var __004_01 = document.createElement('div');
		__004_01.style.textAlign = 'left';
		__004_01.style.font = 'normal normal 12px "돋움",Dotum,sans-serif';
		__004_01.style.marginBottom = '4px';
		__004_01.appendChild(document.createTextNode(desc[i]));
		__004.appendChild(__004_01);		
	}	
	
	var __005 =  document.createElement('div');
	__005.style.width = '340px';
	__005.style.textAlign = 'right';
	__005.style.marginLeft ='20px';
	__005.style.marginBottom ='15px';
	
	var __005_1 =  document.createElement('button');
	__005_1.id ='installSecureDriver';
	__005_1.style.width = '220px';
	__005_1.style.padding = '0px 0px 0px 0px';
	__005_1.style.height = '29px';
	__005_1.style.font = 'normal normal 12px "돋움",Dotum,sans-serif';
	//__005_1.style.background = " url('img/g_btn_300.gif')";
	//__005_1.style.borderTopLeftRadius="6px";
	//__005_1.style.borderTopRightRadius="6px";
	//__005_1.style.borderBottomLeftRadius="6px";
	//__005_1.style.borderBottomRightRadius="6px";
	__005_1.style.borderRadius = '6.0px';	
	__005_1.style.border = '1px solid #BBB';
	__005_1.appendChild(document.createTextNode('보안 프로그램 구동 프로그램 설치'));
	__005_1.onclick = function(){
		// 보안토큰 설치 페이지 링크
		window.open('http://rootca.kisa.or.kr/kor/hsm/hsm.jsp');
	}
	__005.appendChild(__005_1);
	__002.appendChild(__005);
	
	var __006 = document.createElement('div');
	//__006.style.width = '340px';
	__006.style.marginTop ='15px';
	__006.style.marginLeft ='20px';
	__006.style.marginRight ='20px';
	__006.style.paddingBottom ='15px';
	__006.style.textAlign = 'right';
	
	winRoot.appendChild(__006);
	
	var __006_01 = document.createElement('button');
	__006_01.id='gp_secure_ok';
	__006_01.style.width = '60px';
	__006_01.style.borderRadius = '6.0px';	
	__006_01.style.border = '1px solid #BBB';
	__006_01.style.padding = '0px 0px 0px 0px';
	__006_01.style.height = '29px';
	__006_01.style.font = 'normal normal 12px "돋움",Dotum,sans-serif';
	//__006_01.style.background = " url('img/g_btn_100.gif')";
	__006_01.appendChild(document.createTextNode('확인'));
	__006_01.onclick = function(){
		if(preSelectedRow2 ==null || typeof(preSelectedRow2)=='undefined'){
			alert('선택된 드라이버가 없습니다. 드라이버 선택  후 다시 시도하세요');
			return;
		}
		clickElement.setAttribute('action','end');
		// 선택한 인증서 Index 설정
		clickElement.setAttribute('idx',preSelectedRow2.getAttribute('idx'));
		document.getElementsByTagName("body")[0].removeChild(overlay);
		document.getElementsByTagName("body")[0].removeChild(__001);
		isFileDialog = false;
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;	
		
		
		//clickElement.focus();
		//clickElement.getAttribute('sucessProcess')(clickElement);
		callback(clickElement);
		//clickElement.getAttribute('sucessProcess').actionSeTokenSucess(clickElement);
		//clickElement.focus();
		//clickElement.onclick();
	};
		
		
	__006.appendChild(__006_01);
	
	var __006_02 = document.createElement('button');
	__006_02.style.marginLeft = '10px';	
	__006_02.style.width = '60px';
	__006_02.style.height = '29px';
	__006_02.id = 'secureTokenCancel';
	__006_02.style.borderRadius = '6.0px';	
	__006_02.style.border = '1px solid #BBB';
	//__006_02.style.background = " url('img/g_btn_100.gif')";
	__006_02.style.font = 'normal normal 12px "돋움",Dotum,sans-serif';
	__006_02.style.padding = '0px 0px 0px 0px';
	__006_02.appendChild(document.createTextNode('취소'));
	__006_02.onclick = function(){
		clickElement.setAttribute('action','end');
		document.getElementsByTagName("body")[0].removeChild(overlay);
		document.getElementsByTagName("body")[0].removeChild(__001);
		isFileDialog = false;
		clickElement.setAttribute('idx',-1);
		
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;
		
		clickElement.focus();
		
	};		
		
	__006.appendChild(__006_02);
	
	if(tableobj.childNodes[0]!=null && typeof(tableobj.childNodes[0])!='undefined')
		tableobj.childNodes[0].focus();
	
	return winRoot;
}

function attachKeyboardNavigator(){
	var myInput = document.getElementById("secureTokenList").getElementsByTagName("button");

	for(i=0; i<myInput.length; i++){
	    if(myInput[i].addEventListener ) {
	        myInput[i].addEventListener('keydown',keyHandler,false);
	    } else if(myInput[i].attachEvent ) {
	        myInput[i].attachEvent('onkeydown',keyHandler); /* damn IE hack */	        
	    }
	    if(i!=0)
	    	myInput[i].setAttribute('preElement',i-1);
	    	
	    if(i!=(myInput.length-1))
	    	myInput[i].setAttribute('nextElement',i+1);
		}
}

function keyHandler(e) {
	var myInput = document.getElementById("secureTokenList").getElementsByTagName("button");
		var target = e.target||e.srcElement;
		//var parent = target.parentNode.parentNode;
		    		
    var TABKEY = 9;
    var Up = 38;
    var Down =40;
    if(e.shiftKey && e.keyCode == TABKEY){
    	if(navigator.appName == "Microsoft Internet Explorer")
//		if (browserType == BROWSER_IE)
       	 	document.getElementById('secureTokenCancel').focus();
    	else{
	   		if(e.preventDefault) {
	   			e.preventDefault();
	   		}
	   		document.getElementById('secureTokenCancel').focus();
    	}
    	return false;
   	} else if(e.keyCode == TABKEY) {
        //this.value += "    ";
        //if(e.preventDefault) {
        //  e.preventDefault();
    	if(navigator.appName == "Microsoft Internet Explorer")
//		if (browserType == BROWSER_IE)
        	 document.getElementById('installSecureDriver').focus();
    	else{
    		if(e.preventDefault) {
    			e.preventDefault();
    		}
    		document.getElementById('installSecureDriver').focus();
    	}
    	
          // if(!isfocus )
        	//   document.getElementById('searchBtn').focus();
        //}
        return false;
    }else if(e.keyCode == Up) {
    	//alert('up');
    	var preNode = target.getAttribute('preElement');        	
    	if(preNode!=null && typeof(preNode)!='undefined')
    		  myInput[preNode].focus();    
    	
    	//상하 화살표 키로 인한 Scroll 이동 방지
    	if(e.preventDefault) {
   			e.preventDefault();
   		}else{
   			return false;
   		}
    }else if(e.keyCode == Down) {
    	//alert('down');
		var nextNode = target.getAttribute('nextElement');        	
		if(nextNode!=null && typeof(nextNode)!='undefined')
		  myInput[nextNode].focus();
		//상하 화살표 키로 인한 Scroll 이동 방지
    	if(e.preventDefault) {
   			e.preventDefault();
   		}else{
   			return false;
   		}
    }
}

var clickElement;
	return{

		show : function(target){

			//clickElement = event.target||event.srcElement;
			clickElement = target;
			
			overlay.style.display='';
			__001.style.display='';	
			
			new Dialog().show('STpopup', 'STpopup_drag', 'screen-center', 0, 0,'');
			if(clickElement!=null && typeof(clickElement)!='undefined'){
				//clickElement = element;
				clickElement.setAttribute('action','process');
			}else{
				alert('대상 객체가 없습니다.');
				return;
			}
			
/*
			if(tableobj.getElementsByTagName('button')!=null && typeof(tableobj.getElementsByTagName('button'))!='undefined'){
				alert('설치된 드라이버 정보가 없습니다. 드라이버 설치페이지로 이동합니다.');
				installSecureDriver.onclick();
			}else{
				var focusElements = tableobj.getElementsByTagName('button');
				focusElements[0].focus();
			}
*/
			var focusElements = tableobj.getElementsByTagName('button');
			if (focusElements == null || focusElements == 'undefined' || focusElements.length == 0) {
				alert('설치된 드라이버 정보가 없습니다. 드라이버 설치페이지로 이동합니다.');
				installSecureDriver.onclick();
			} else {
				var focusElements = tableobj.getElementsByTagName('button');
				focusElements[0].focus();
			}

			return __001;
							
		},
		dispose : function(){
			overlay.style.display='none';
			__001.style.display='none';
		}
	}
}
