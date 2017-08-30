

CertWindow =function (selectCertIdx) {
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
	//CertInfo = certObj;
	var sIndex = selectCertIdx;
	
	loadJavascript(gpkiScriptBase + "/ui/common.js",errorWin);
	//var LangR = loadJavascript(gpkiScriptBase + "/ui/certviewR",errorWin,"ko-KR");
	loadJavascript(gpkiScriptBase + "/ui/certviewR",errorWin,"ko-KR.js");
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
	    
	    if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
            // responseText 에 값을 저장    
            //eval(xmlhttp.responseText);         
            responseText = xmlhttp.responseText;
        }
	    return eval(responseText);

	    // 가져온 xmlhttp 객체의 responseText 값을 반환 
	    //return ; 
	}
	function errorWin(){}

	var windowRoot;
	
	var strCertInfo = GPKISecureWeb.GetCertNormalInfo(sIndex);	
	
	var arrCertInfo = strCertInfo.split('\$');
	
	var strCertDetailFields = new Array();
	var strCertDetailValues = new Array();
	
	var detailFields = [2,3,4,10,20,21,8,5,24,25,13,16,23,15,26];
	for(var i=0; i<detailFields.length;i++){
		strCertDetailFields[i] = GPKISecureWeb.GetCertDetailField(sIndex,detailFields[i]);
		strCertDetailValues[i] = GPKISecureWeb.GetCertDetailInfo(sIndex,detailFields[i]);
	}
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
	__001.id = 'cv_popup';
	__001.style.zIndex = '+1';
	__001.style.width='389px';
	__001.style.visibility ='hidden';
	//__001.style.textAlign = 'center';
	__001.style.borderRadius = '6.0px';	
	__001.style.display ='none';
	
	var __002 = document.createElement("div");
	//__002.style.border = 'dashed 1px red';
	__002.id = 'cv_popup_drag';
	__002.style.backgroundColor='gray';
	__002.style.height ='24px';
	__002.style.background = 'url("' + gpkiScriptBase + '/image/certificate/pop_tit_bg_01.png")';
	__002.style.borderBottom ='0px';
	//__002.style.fontcolor ='white';
	//__002.style.cursor = 'default';
	//__002.style.verticalAlign='middle';
	__002.style.font='normal bold 13px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
	__002.style.textAlign = 'center';
	__002.style.verticalAlign = 'middle';
	//__002.style.fontColor = '#474747';
		
	__002.appendChild(document.createTextNode("인증서 보기"));
	
	__001.appendChild(__002);
	
	__001.appendChild(init());
	__001.style.zIndex = '524290';
	
	var overlay = document.createElement('div');
	var _resizeOverlayFunction;
	overlay.style.zIndex = '524289';
	overlay.onclick = null;
	
    	overlay.style.position = 'absolute';
    	overlay.style.width = '100%';
    	overlay.style.height = '100%';
	
   	overlay.style.top = '0';
    overlay.style.left = '0';
    //overlay.style.display = 'none';
    overlay.style.opacity = 0.5;
    overlay.style.filter = "alpha(opacity='50')";
    overlay.style.backgroundColor = 'gray';
    
    document.getElementsByTagName("body")[0].appendChild(overlay);
    
	windowRoot = __001;
	document.getElementsByTagName("body")[0].appendChild(__001);
	
	attachKeyboardNavigator();
	
	

function onCertAlert( ){
	
}
var selectedRow ;

CertWindow.Table = {
	
	selectRow : function(srcElement, target){
		//var evt = event || window.event;
		//var t = evt.target || evt.srcElement;
		
		if(selectedRow !=null &&  typeof(selectedRow)!='undefined')
			selectedRow.style.backgroundColor ='white';
			
		srcElement.style.backgroundColor ='#E3E3E3';
		selectedRow = srcElement;	
		
		if(target.firstChild!=null && typeof(target.firstChild)!='undefined')
			target.removeChild(target.firstChild);
		
		target.appendChild(document.createTextNode(srcElement.childNodes[1].getElementsByTagName('textarea')[0].value));//outerText));//textContent
		
	}
}

function setReleaseSectedMark(target){		
	var children = target.parentNode.childNodes;
	for(var j=0;j<children.length;j++){
		var releaseColumn =children[j];
		if(target==releaseColumn)
			continue;
		
		setSelectedMark(releaseColumn,'white');		
	}
}

var firstElement,preSelectData ;
function parseInfo(target,valueArea, fieldNames,strData){
	var detailView = target;
	//var certInfo = MagicLine.getCertDetail(4,"999드림시큐리티001","02aa15382f534afb3a98a0a8fe9c68a2a32198a2");
	//var certInfo = MagicLine.getCertDetail(CertInfo.strType,CertInfo.user,CertInfo.serialNum);
		
	//var certFields = certInfo.split('\$');
	
	for(i=0;i<fieldNames.length;i++){
		var tmp_0 = document.createElement("tr");
		tmp_0.style.backgroundColor='white';
		tmp_0.onclick = function(){
			CertWindow.Table.selectRow(this,valueArea);
			if(preSelectData!=null && typeof(preSelectData)!='undefined')
				preSelectData.style.backgroundColor = 'white';
			
			preSelectData = this;
			};
		detailView.appendChild(tmp_0);
		
		var tmp_1 = document.createElement("td");
		tmp_1.style.width ='100px';
		tmp_1.style.font = 'normal normal 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
		tmp_1.appendChild(document.createTextNode(fieldNames[i]));		
		tmp_0.appendChild(tmp_1);		
		
		
		var tmp_2 = document.createElement("textarea");
		tmp_2.style.overflow = 'hidden';
		tmp_2.style.font = 'normal normal 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
		tmp_2.onfocus = function(){
			CertWindow.Table.selectRow(this.parentNode.parentNode,valueArea);
			this.style.backgroundColor = '#E3E3E3';

			if(preSelectData!=null && typeof(preSelectData)!='undefined')
				preSelectData.style.backgroundColor = 'white';
			
			preSelectData = this;

			};		
		tmp_2.setAttribute('title',fieldNames[i]+strData[i]);
		tmp_2.style.scrollY = 'none';
		tmp_2.readOnly = true;
		tmp_2.value = strData[i];
		tmp_2.style.width='239px';
		tmp_2.style.border = 'solid 0px white';
		tmp_2.style.scrollY = 'none';
			
			
		var tmp_3 = document.createElement("td");
		tmp_3.style.width ='240px';
		tmp_3.appendChild(tmp_2);
		tmp_0.appendChild(tmp_3);	
		
		if(i==0){
			tmp_0.style.backgroundColor ='white';			
			firstElement = tmp_2;
		}
		
		
		//alert(certFields[i]);
	}	
}



function changetab(parent, contents, t){
	var tabChilds = parent.childNodes;
	var contentChilds = contents.childNodes;
	
	for(i=0; i<(tabChilds.length); i++){
		var target;
		//if(i==0)
		//	target = contentChilds[i].parentNode.getElementsByTagName('div');
		//else
			target = contentChilds[i];
		
		if(tabChilds[i] == t){
			tabChilds[i].style.backgroundColor ='#fff';							
			target.style.display = '';				
		}else{
			tabChilds[i].style.backgroundColor ='#e9e9e9';					
			target.style.display = 'none';					
		}
	}
}

function init(){
	var __001 = document.createElement("DIV");
	//__001.style.border = 'dashed 1px black';
	//__001.style.padding = '5.0px 0.0px 5.0px 0.0px';
	__001.style.width= '389px';
	__001.style.height='490px';
	//__001.style.marginTop='150px';
	//__001.style.marginLeft='250px';
	__001.style.backgroundColor='#F4F4F4';
	
	var __002 = document.createElement("div");
//	/__002.style.border = 'dashed 1px blue';
	//__002.style.padding = '5px';
	__002.style.width= '369px';
	//__002.style.height='27px';
	__002.style.paddingTop = '8px';
	//__002.style.marginTop='8px';
	//__002.style.marginBottom='0px';
	__002.style.marginLeft='8px';
	__002.style.textAlign='left';	
	__001.appendChild(__002);
	
	var __003 = document.createElement("DIV");	
	//__003.style.padding = '5px';
	__003.style.width= '369px';
	__003.style.height='400px';	
	__003.style.marginTop='0px';
	__003.style.marginLeft='8px';
	__003.style.backgroundColor='#F4F4F4';
	__001.appendChild(__003);
	
		
	var __002_1 = document.createElement("div");
	__002_1.style.marginBottom = '0px';
	__002_1.style.paddingTop = '11px';
	__002_1.style.paddingBottom = '5px';
	
	var __002_1_0 = document.createElement("div");
	__002_1_0.style.width = '55px';
	__002_1_0.style.height = '35px';
	__002_1_0.style.padding = '0px 0px 0px 0px';
	__002_1_0.style.border = '0px solid blue';
	
	
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__002_1_0.style.styleFloat = 'left';
	else
		__002_1_0.style.cssFloat = 'left';
	//__002_1.appendChild(__002_1_0);
	
	var __002_1_1 = document.createElement("button");
	//__002_1_1.setAttribute("href", "javascript:alert('11');");
	//__002_1_1.style.padding = '0px 0px 0px 0px';
	//__002_1_1.style.textAlign = 'left';
	__002_1_1.style.height = '27px';
	__002_1_1.style.width = '70px';
	__002_1_1.style.border ='1px solid #BBB';
	//__002_1_1.style.borderBottom ='0px';
	//__002_1_1.style.width = '50px';
	//__002_1_1.style.height = '30px';
	//__002_1_1.style.border ="1px solid #DDD";
	__002_1_1.style.backgroundColor = "white";
	//__002_1_1.style.padding = '6px 15px';
	__002_1_1.style.fontsize ='12px';
	__002_1_1.onclick = function(e){
		changetab(__002, __003,this )
		};
	__002_1_1.appendChild(document.createTextNode(LangR.tab01));
	//__002_1_0.appendChild(__002_1_1);
	__002.appendChild(__002_1_1);
		
	var __002_1_2 = document.createElement("div");//#fff
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__002_1_2.style.styleFloat = 'left';
	else
		__002_1_2.style.cssFloat = 'left';
	//__002_1.appendChild(__002_1_2);
	
	var __002_1_3 = document.createElement("button");//#fff
	//__002_1_3.style.width = '100px';
	__002_1_3.id='detailTab';
	__002_1_3.style.width = '70px';
	__002_1_3.style.height = '27px';
	//__002_1_2.setAttribute("href", "javascript:alert('22');");
	__002_1_3.style.marginLeft = '5px';
	__002_1_3.style.border ='1px solid #BBB';
	//__002_1_3.style.borderBottom ='0px';
	//__002_1_2.style.border ="1px solid #DDD";
	__002_1_3.style.backgroundColor = "#e9e9e9";
	//__002_1_3.style.padding = '6px 15px';
	__002_1_3.style.fontsize ='12px';
	__002_1_3.onclick = function(e){
		changetab(__002, __003,this ); 
		firstElement.focus();
		};
	__002_1_3.appendChild(document.createTextNode(LangR.tab02));
	//__002_1_2.appendChild(__002_1_3);
	__002.appendChild(__002_1_3);
	
	var __002_1_4 = document.createElement('div');
	__002_1_4.style.clear = 'both';
	//__002_1.appendChild(__002_1_4);
	
	//__002.appendChild(__002_1);				
	
	//__001.appendChild(__003);	
	//var tabContainer = initTab(__003);
	//__001.appendChild(tabContainer);	
	
	
	var __003_1 = document.createElement("DIV");
	//__003_1.style.border = 'dashed 0px red';
	__003_1.style.border = '#CCC solid 1px';
	//__003.style.padding = '5px';
	//__003_1.style.width= '371px';
	//__003_1.style.display = 'none';
	__003.appendChild(__003_1);
		
	var __003_1_1 = document.createElement("div");
	//__003_1_1.style.height ='330px';
	//
	__003_1_1.style.padding = '10px 0px 0px 10px';
	__003_1_1.style.margin='0px 0px 0px 0px';
	//__003_1_1.style.backgroundColor='#F4F4F4';
	__003_1_1.style.backgroundColor='#fff';
	
	__003_1_1.style.textAlign = 'left';
	//__003_1_1.style.border = 'solid 3px black';
	
	//__003_1_1.style.marginLeft='5px';
	//__003_1_1.style.marginTop='5px';
	
	//__003_1_1.style.overflow ='hidden';
	var __003_1_1_0 = document.createElement("button");
	__003_1_1_0.style.border = '#F4F4F4 solid 1px';
	//__003_1_1_0.style.border = 'solid 0px white';
	__003_1_1_0.style.width= '360px';
	__003_1_1_0.style.height='330px';
	__003_1_1_0.style.padding = '0px 0px 0px 0px';
	__003_1_1_0.style.marginLeft='3px';
	__003_1_1_0.style.marginTop='3px';
	//__003_1_1_0.style.marginButtom='8px';
	__003_1_1_0.style.backgroundColor='#F4F4F4';
	__003_1_1_0.style.backgroundColor='#fff';
	__003_1_1_0.appendChild(__003_1_1);
	__003_1.appendChild(__003_1_1_0);
	
	var __003_1_1_1 = document.createElement("img");
	//__003_1_1_1.setAttribute('src', MagicLine.getCertVerify()==0?'/MagicLine5/img/cert/on.png':MagicLine.getCertVerify()==2?'/MagicLine5/img/cert/limit.png':'/MagicLine5/img/cert/off.png');
	__003_1_1_1.setAttribute('src', gpkiScriptBase + '/image/certificate/cert/cert_2048.bmp');
	__003_1_1.appendChild(__003_1_1_1);
	
	var __003_1_1_2 = document.createElement("SPAN");
	//__003_1_1_2.style.border ='1px solid black';
	__003_1_1_2.style.marginLeft = '5px';
	__003_1_1_2.style.height='25px';
	__003_1_1_2.style.font = 'normal bold 1px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
	__003_1_1_2.appendChild(document.createTextNode(LangR.CertGF01));
	__003_1_1_2.style.fontSize = '14px';
	__003_1_1.appendChild(__003_1_1_2);
	
	var __003_1_1_3 = document.createElement("SPAN");
	__003_1_1_3.appendChild(document.createTextNode(LangR.CertGF02));
	__003_1_1_3.style.font = 'normal bold 1px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
	__003_1_1_3.style.fontSize = '14px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_3);
	
	var __003_1_1_4 = document.createElement("SPAN");
	__003_1_1_4.appendChild(document.createTextNode(" ▪ "+ arrCertInfo[1]));
	__003_1_1_4.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br>";
	__003_1_1.appendChild(__003_1_1_4);
	
	var __003_1_1_6 = document.createElement("SPAN");
	__003_1_1_6.style.font = 'normal bold 1px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
	__003_1_1_6.appendChild(document.createTextNode(LangR.CertGF03));//
	__003_1_1_6.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_6);
	
	var __003_1_1_7 = document.createElement("SPAN");
	__003_1_1_7.appendChild(document.createTextNode(" "+LangR.CertGF04+arrCertInfo[2]));//
	__003_1_1_7.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_7);
	
	var __003_1_1_8 = document.createElement("SPAN");
	__003_1_1_8.appendChild(document.createTextNode(LangR.CertGF05+arrCertInfo[3]));//
	__003_1_1_8.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_8);
	
	var __003_1_1_9 = document.createElement("SPAN");
	__003_1_1_9.appendChild(document.createTextNode(LangR.CertGF06+arrCertInfo[4]));//
	__003_1_1_9.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_9);
	
	var __003_1_1_7 = document.createElement("SPAN");
	__003_1_1_7.appendChild(document.createTextNode(LangR.CertGF07+arrCertInfo[5]));//
	__003_1_1_7.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_7);
	
	var __003_1_1_7 = document.createElement("SPAN");
	__003_1_1_7.appendChild(document.createTextNode(LangR.CertGF08+arrCertInfo[6]));//
	__003_1_1_7.style.fontSize = '12px';
	__003_1_1.innerHTML = __003_1_1.innerHTML + "<br><br>";
	__003_1_1.appendChild(__003_1_1_7);
	
			
	var __003_1_2 = document.createElement("DIV");
	//__003_1_2.style.border = 'dashed 1px red';
	//__003_1_2.style.padding = '5px 0px 0px 0px';
	__003_1_2.style.marginTop ='10px';
	//__003_1_2.style.width= '369px';
	__003_1_2.style.height='40px';
	__003_1_2.style.marginLeft = '140px';
	__003_1_2.style.textAlign='left';
	
	__003_1.appendChild(__003_1_2);
	
	
	var __003_1_2_2 = document.createElement('BUTTON');	
	__003_1_2_2.style.width = '100px';
	__003_1_2_2.style.height = '30px';
	__003_1_2_2.style.borderRadius = '6px';
	__003_1_2_2.style.border = '1px solid #BBB';
	
	__003_1_2_2.style.marginLeft='120px';
	__003_1_2_2.style.fontSize ='12px';
	__003_1_2_2.onclick = function(){
		// 알림 메시지 팝업창
		var alertMsg = GPKISecureWeb.GetCertDetailField(sIndex,31);
		var valueStarPoint =alertMsg.indexOf("=")+1; 
		alertMsg = LangR.alertMsg +": \n"+alertMsg.substr(valueStarPoint,alertMsg.length);
		
		alert(alertMsg);
		};
	__003_1_2_2.appendChild(document.createTextNode(LangR.CertGF10));//LangR.CertGF10:"사용자 알림"
	__003_1_2.appendChild(__003_1_2_2);
	
	__003_1.appendChild(__003_1_2);	
	
	
	var __003_2 = document.createElement("DIV");
	//__003_2.style.border = 'dashed 1px black';
	//__003.style.padding = '5px';
	
	__003_2.style.width= '369px';
	__003_2.style.display = 'none';
	__003.appendChild(__003_2);
		
	var __003_2_1 = document.createElement("DIV");
	__003_2_1.style.border = '#CCC solid 1px';
	//__003_2_1.style.border = 'dashed 1px black';
	//__003.style.padding = '5px';
	__003_2_1.style.width= '369px';
	__003_2_1.style.height='270px';
	__003_2_1.style.position = 'relative';
	__003_2_1.style.overflowX = "hidden";
	__003_2_1.style.overflowY = "scroll";
	//__003_2_1.appendChild(document.createTextNode("사용자 알림01"));
	__003_2.appendChild(__003_2_1);
	
	var __003_2_1_1 = document.createElement("table");
	__003_2_1_1.id = 'certInfotable';
	//__004_10.style.border = 'solid 1px black';
	//__003_2_1_1.style.width= '355px';	
	__003_2_1_1.style.fontSize = '12px';//table-layout: fixed
	//__003_2_1_1.style.tableLayout = 'fixed';
	
	var __003_2_1_2 = document.createElement("thead");
	//__004_11.style.height='30px';
	__003_2_1_2.style.fontSize = '12.0px';
		
	var __003_2_1_3 = document.createElement("tr");	
	__003_2_1_3.style.textAlign='center';
	var __003_2_1_4 = document.createElement("th");
	var __003_2_1_5 = document.createElement("div");
	__003_2_1_5.appendChild(document.createTextNode(LangR.CertDF01));//CertDF01:"필드",
	__003_2_1_5.style.width = '100px';
	__003_2_1_5.style.borderWidth = '1.0px';
	__003_2_1_5.style.borderStyle = 'none solid solid none';
	__003_2_1_5.style.borderColor = 'black';
	__003_2_1_5.style.font = 'normal normal 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
	__003_2_1_5.style.fontWeight = 'normal';
	__003_2_1_4.appendChild(__003_2_1_5);
	__003_2_1_3.appendChild(__003_2_1_4);	
	
	var __003_2_1_6 = document.createElement("th");
	__003_2_1_6.style.width = '240px';
	var __003_2_1_7 = document.createElement("div");
	__003_2_1_7.appendChild(document.createTextNode(LangR.CertDF02));//CertDF02:"내용",
	__003_2_1_7.style.borderWidth = '1.0px';
	__003_2_1_7.style.width = '240px';
	__003_2_1_7.style.borderStyle = 'none solid solid none';
	__003_2_1_7.style.borderColor = 'black';
	__003_2_1_7.style.font = 'normal normal 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
	__003_2_1_7.style.fontWeight = 'normal';
	__003_2_1_6.appendChild(__003_2_1_7);
	__003_2_1_3.appendChild(__003_2_1_6);
	__003_2_1_2.appendChild(__003_2_1_3);
	__003_2_1_1.appendChild(__003_2_1_2);
	
	var __003_2_1_8 = document.createElement("tbody");
	
	__003_2_1_1.appendChild(__003_2_1_8);
	__003_2_1.appendChild(__003_2_1_1);
	
	var __003_2_2 = document.createElement("textarea");
	//__003_2_2.style.border = 'dashed 1px black';
	__003_2_2.style.border = '#CCC solid 1px';
	__003_2_2.style.overflow ='auto';
	__003_2_2.style.backgroundColor = '#E3E3E3';
	__003_2_2.style.fontColor= 'black';
	__003_2_2.style.font = 'normal normal 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
	//__003.style.padding = '5px';
	__003_2_2.style.width= '100%';
	__003_2_2.style.height='110px';
	__003_2_2.style.marginTop='10px';
	//__003_2_2.appendChild(document.createTextNode("사용자 알림 02"));
	__003_2.appendChild(__003_2_2);		
	
	var __004 = document.createElement("DIV");
	//__004.style.border = 'dashed 1px red';
	//__004.style.padding = '5px';
	__004.style.width= '369px';
	__004.style.height='40px';
	__004.style.marginTop='8px';
	__004.style.marginLeft='8px';	
	__004.style.textAlign='right';
	__001.appendChild(__004);
	
	var __004_1 = document.createElement('BUTTON');
	__004_1.id = 'certViewOk';
	__004_1.style.width = '100px';
	__004_1.style.height = '30px';
	__004_1.style.borderRadius = '6px';
	__004_1.style.border = '1px solid #BBB';
	__004_1.style.margin='0px 0px 0px 0px ';
	__004_1.onclick = function(){
		document.getElementsByTagName("body")[0].removeChild(overlay);
		document.getElementsByTagName("body")[0].removeChild(windowRoot);
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;
	};
	__004_1.appendChild(document.createTextNode(LangR.strConfirm));
	__004.appendChild(__004_1);
	
	parseInfo( __003_2_1_8,__003_2_2,strCertDetailFields,strCertDetailValues);
	return __001;
	//document.getElementsByTagName("body")[0].appendChild(__001);
	//windowRoot = __001;
}

var clickElement;

function attachKeyboardNavigator(){
	var myInput = document.getElementById("certInfotable").getElementsByTagName("tr");

	for(i=1; i<myInput.length; i++){
	    if(myInput[i].addEventListener ) {
	        myInput[i].addEventListener('keydown',keyHandler,false);
	    } else if(myInput[i].attachEvent ) {
	        myInput[i].attachEvent('onkeydown',keyHandler); /* damn IE hack */	        
	    }
	    if(i!=1)
	    	myInput[i].setAttribute('preElement',i-1);
	    	
	    if(i!=(myInput.length-1))
	    	myInput[i].setAttribute('nextElement',i+1);
		}
}

function keyHandler(e) {
	var myInput = document.getElementById("certInfotable").getElementsByTagName("tr");
		var target = e.target||e.srcElement;
		var parent = target.parentNode.parentNode;
		    		
    var TABKEY = 9;
    var Up = 38;
    var Down =40;
    if(e.shiftKey && e.keyCode == TABKEY){
//    	if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
       	 	document.getElementById('detailTab').focus();
    	else{
	   		if(e.preventDefault) {
	   			e.preventDefault();
	   		}
	   		document.getElementById('detailTab').focus();
    	}
    	return false;
   	} else if(e.keyCode == TABKEY) {
        //this.value += "    ";
        //if(e.preventDefault) {
        //  e.preventDefault();
//    	if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
        	 document.getElementById('certViewOk').focus();
    	else{
    		if(e.preventDefault) {
    			e.preventDefault();
    		}
    		document.getElementById('certViewOk').focus();
    	}
    	
          // if(!isfocus )
        	//   document.getElementById('searchBtn').focus();
        //}
        return false;
    }else if(e.keyCode == Up) {
    	//alert('up');
    	var preNode = parent.getAttribute('preElement');        	
    	if(preNode!=null && typeof(preNode)!='undefined')
    		  myInput[preNode].getElementsByTagName('textarea')[0].focus();      	
    }else if(e.keyCode == Down) {
    	//alert('down');
    		var nextNode = parent.getAttribute('nextElement');        	
    		if(nextNode!=null && typeof(nextNode)!='undefined')
    		  myInput[nextNode].getElementsByTagName('textarea')[0].focus(); 
    }
}
return{
 	 show : function(element){
 	 	overlay.style.display = '';
 		__001.style.display = '';
 		new Dialog().show('cv_popup', 'cv_popup_drag', 'screen-center', 0, 0,'');
 		if(element!=null && typeof(element)!='undefined')
			clickElement = element;
 		return windowRoot; 
 	 },
 	 dispose :function(){
 	 	overlay.style.display = 'none';
 		__001.style.display = 'none';	
 	 }
 	 
}
}