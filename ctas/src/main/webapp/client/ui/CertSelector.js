CertSelect = function(isEmbeded,sessionid){
UI = {};

UI.Event = {
		add: function(action,handler){
			 if (button.addEventListener) {  // all browsers except IE before version 9
	                //button.addEventListener (action, function () {OnButtonDown (button)}, false);
				 button.addEventListener (action, handler, false);
            }else {
                if (button.attachEvent) {   // IE before version 9
                    //button.attachEvent ("on"+action, function () {OnButtonDown (button)});                   
                    button.attachEvent ("on"+action, handler);
                }
            }
		}
} 

//마우스 오른쪽 버튼 막기
document.oncontextmenu = function (){ return false }; 
// 텍스트 드레그로 선택하기 막기
document.ondragstart = function (){ return false };
document.onselectstart = function (){ return false };


var popupflag = 0;
var embeded = isEmbeded;
var clickElement = document.getElementById('embededlogin');;

	loadJavascript(gpkiScriptBase + "/ui/common.js",loadedWin);
	loadJavascript(gpkiScriptBase + "/ui/CertSelector",loadedWin,null,'ko-KR.js');
	//loadJavascript(gpkiScriptBase + "/ui/AlertWindow.js",loadedWin);
  
	var firstFocusElement;
	var __001 ;
	if(!isEmbeded){
		__001 = document.createElement("div");
		//__001.style.border = 'dashed 1px red';
		__001.id = 'popup';
		__001.style.zIndex = '+1';
		__001.style.width='389px';
		__001.style.marginLeft = '0px';
		__001.style.marginTop = '0px';
		__001.style.visibility ='hidden';
		__001.style.textAlign = 'center';
		//__001.style.borderRadius = '6.0px';	
		__001.style.display ='none';
		
		var __002 = document.createElement("div");
		//__002.style.border = 'dashed 1px red';
		__002.id = 'popup_drag';
		__002.style.backgroundColor='gray';
		__002.style.height ='24px';
		__002.style.marginTop = '0px';
		__002.style.marginLeft = '0px';
		__002.style.marginBottom = '0px';
		//__002.style.background = " url('image/cert_bg_title.png')";
		//__002.style.borderBottom ='0px';
		__002.style.fontcolor ='white';
		//__002.style.cursor = 'default';
		//__002.style.verticalAlign='middle';
		__002.style.font='normal bold 13px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
		__002.style.background = 'url("' + gpkiScriptBase + '/image/certificate/pop_tit_bg_01.png")';
		__002.appendChild(document.createTextNode(LangCS.title));
		
		var __003 = document.createElement("div");
		//__002.style.border = 'dashed 1px red';
		__003.style.border = 'solid 0px #F4F4F4';
		__003.style.backgroundColor='#F4F4F4';
		__003.style.height ='15px';
		__003.style.width = '388px';
		__003.style.textAlign = 'right';
		__003.style.marginTop = '0px';
		__003.style.marginLeft='1px';
		__003.style.marginRight = '0px';
		__003.style.marginBottom = '0px';
		__003.appendChild(document.createTextNode("ver."+GPKISecureWeb.GetAPIVersion()));
		
		__001.appendChild(__002);		
		__001.appendChild(init());
		__001.appendChild(__003);
	}else{
		__001 = init();
		__001.style.position = 'relative';
		//__001.style.top = '-500px';
	}
	
	var overlayCS = document.createElement('div');
	var _resizeOverlayFunction;
	overlayCS.style.zIndex = '524287';
    overlayCS.onclick = null;
	
    overlayCS.style.position = 'fixed';		// modified on 2015.08.17
    overlayCS.style.width = '100%';
    overlayCS.style.height = '100%';
	
   	overlayCS.style.top = '0';
    overlayCS.style.left = '0';
    //overlayCS.style.display = 'none';
    // 백 배경 gray 처리
    overlayCS.style.opacity = 0.5;
    overlayCS.style.filter = "alpha(opacity='50')";
    overlayCS.style.backgroundColor = 'black';
    
    if(!embeded)
    	document.getElementsByTagName("body")[0].appendChild(overlayCS);
    
	//windowRoot = __001;
	//dragArea =__002;
	//addOverlay();
	
	__001.style.zIndex = '524288';
	if(!embeded)
		document.getElementsByTagName("body")[0].appendChild(__001);
	else{
		try{
			clickElement.appendChild(__001);
		}catch(err){
			alert(err);
			//var altObj = new AlertWindow(__001);
			//altObj.setMessage(err);
			//altObj.show();
		}			
	}
	
	var win;
function loadedWin(){
	win = new Dialog();
	
}	

function createImgCell(state){
	var url = "";
	switch (state) {
	case "0":
		url = gpkiScriptBase + "/image/certificate/cert/on.png";
		break;
	case "1":
		url = gpkiScriptBase + "/image/certificate/cert/off.png";
		break;
	case "2":
		url = gpkiScriptBase + "/image/certificate/cert/limit.png";
		break;

	default:
		break;
	}
	
	var __002_1 = document.createElement("img");
	
	__002_1.setAttribute("src", url);	
	return __002_1;	
}

var selectedRow,mycerts,CertInfo,selecteRowNum, selectedStorageType  ;


function selectRow(srcElement, target){
		
	if(selectedRow!=null && typeof(selectedRow)!='undefined' && srcElement!=selectedRow)
		selectedRow.setAttribute('selected',false);
	
	selectedRow = srcElement;
	
	setReleaseSectedMark(srcElement);
	
	srcElement.setAttribute('selected',true);	
	setSelectedMark(srcElement,'#77B1EE');	
	
	var parent = srcElement.parentNode;
	var childs = parent.childNodes;
	
	for(i=0;i<childs.length;i++){
		if(srcElement==childs[i]){
			selecteRowNum = i;
			break;
		}
	}
	if(embeded){
		document.getElementById('gpkiEmObj').setAttribute('idx', selectedRow.getAttribute('CertIndex'));
		
		//alert(selectedRow.getAttribute('CertIndex'));
	}
	if(selectedRow == null){
		alert(LangCS.needSelectCert);
		
		firstFocusElement.focus();
		return;
	}else{
		if(document.getElementById('passwd') !=null && typeof(document.getElementById('passwd')!='undefined') && !document.getElementById('passwd').disabled)
			document.getElementById('passwd').focus();
	}
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
		
		setSelectedMark(releaseColumn,'');		
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
function  createSecurityRow(parent,columns,isheader){
	var pElement, totalString,__001;
	totalString = '';
	
	if(isheader)
		pElement = parent;
	else{
		
		pElement = document.createElement('div');
		pElement.setAttribute('certIndex',parent.childNodes.length);
		pElement.onclick = function(){
			if(selectedRow==this) 
				return; 
			else 
				selectRow(this);
		};
		
		pElement.onmouseover = function(){
			setReleaseSectedMark(this);
			if(selectedRow==this)
				return;
			this.style.cursor = 'pointer';
			setSelectedMark(this,'#E3E4FA');			
		};		
				
		if(embeded){
			var emColumns = new Array();
			emColumns[0] = columns[0];
			emColumns[1] = columns[1];
			emColumns[2] = columns[4];
			emColumns[3] = columns[2]+columns[3];
			columns = emColumns;
		}	else{
			var popColumns = new Array();
			popColumns[0] = columns[0];
			popColumns[1] = columns[1];
			popColumns[2] = columns[4];
			popColumns[3] = columns[3];
			popColumns[4] = columns[2];
			columns = popColumns;
			
			}
		parent.appendChild(pElement);
	}
	
	var disColumns = new Array();
	
	for(var i=0; i<columns.length; i++){
		var __003_01 = document.createElement('div');
		__003_01.style.fontSize='11px';
		__003_01.style.height='17px';
		//__003_01.style.border = 'dashed 1px red';
		switch (i) {
		case 0:
			__003_01.style.width = (!embeded?'28px':'25px');
			disColumns[i] = columns[i];
			break;
		case 1:
			__003_01.style.width = (!embeded?'110px':'113px');
			if(!embeded && columns[i].length>15){
				disColumns[i] = columns[i].substring(0,15)+'..';
			}else if(embeded && columns[i].length>13){
				disColumns[i] = columns[i].substring(0,13)+'..';
			}else{
				disColumns[i] = columns[i];
			}
			break;
		case 2:
			__003_01.style.width = (!embeded?'80px':'70px');
			//if(!embeded && columns[i].length>4){
			//	disColumns[i] = columns[i].substring(0,3)+'..';
			//}else if(embeded && columns[i].length>10){
			//	disColumns[i] = columns[i].substring(0,10);
			//}else{
				disColumns[i] = columns[i];
			//}
			break;
		case 3:
			__003_01.style.width = (!embeded?'55px':'55px');
			
			if(embeded && columns[i].length>5){
				disColumns[i] = columns[i].substring(0,5);
			}else{
				disColumns[i] = columns[i];
			}
			break;
		case 4:
			if(isheader)
				__003_01.style.width = '65px';
			else
				__003_01.style.width = '70px';
			disColumns[i] = columns[i];
			break;

		default:
			break;
		}
//		if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
			__003_01.style.styleFloat = 'left';
		else
			__003_01.style.cssFloat = 'left';
		__003_01.style.textAlign = 'center';
		__003_01.style.overflow = 'hidden';
		__003_01.style.fontSize = (!embeded?'11px':'10px');
		
		if(i==0 && !isheader){
			var imgElement = document.createElement('input');
			imgElement.setAttribute('type','image');
			
			var imgNames = 'cert';
			if(disColumns[i]<3){
				imgNames += '_1024';
				imgNames += (disColumns[i]==0)?'_v':(disColumns[i]==1)?'_u':(disColumns[i]==2)?'_e':'';
			}else{
				imgNames += '_2048';
				imgNames += (disColumns[i]==3)?'_v':(disColumns[i]==4)?'_u':(disColumns[i]==5)?'_e':'';
			}			
			
			imgElement.setAttribute('src', gpkiScriptBase + '/image/certificate/cert/'+imgNames+'.bmp');
			imgElement.style.height='0px';
			imgElement.style.width='0px';
			imgElement.style.padding='0px';	// added on 2015.08.17

			__003_01.style.backgroundImage='url("'+gpkiScriptBase +'/image/certificate/cert/'+imgNames+'.bmp")' ;
			__003_01.style.backgroundRepeat='no-repeat';
			__003_01.style.backgroundSize='18px 13px'; 
			__003_01.style.backgroundPosition='4px 0px';			

			imgElement.onclick = function(){
				if(selectedRow==this.parentNode.parentNode) 
					return; 
				else 
					selectRow(this.parentNode.parentNode);
			};
			imgElement.onfocus = function(){
				setReleaseSectedMark(this.parentNode.parentNode);
				
				var certInfo = '';
				if(selectedRow!=null && selectedRow==this.parentNode.parentNode){
					certInfo = selectedRow.getAttribute('alt');
					if(certInfo.indexOf('선택된 인증서.')==-1){
								var altName = '선택된 인증서.'+certInfo;
								this.setAttribute('alt',altName);						
								this.parentNode.parentNode.setAttribute('alt',altName);							
							}
								
					//alert(selectedRow.getAttribute('alt'));	
					return;
				}else if(selectedRow!=null && selectedRow!=this.parentNode.parentNode){
							certInfo = this.getAttribute('alt');
							certInfo=  certInfo.replace('선택된 인증서.','');
							
							this.setAttribute('alt',certInfo);							
							this.parentNode.parentNode.setAttribute('alt',certInfo);							
					}else{}
					
				setSelectedMark(this.parentNode.parentNode,'#E3E4FA');				
				
										
			};							
				
			__001 = imgElement; 
			__003_01.appendChild(imgElement);
		}else{
			if(i!=5)
				__003_01.appendChild(document.createTextNode(disColumns[i]));
		}
			
		
		
		if(i!=5){
			var enter = (i==4)?"":"\n";
			if(i==0){
				var strStaus = (columns[i]==0)?LangCS.vCertStat1024:(columns[i]==1)?LangCS.uCertStat1024:(columns[i]==2)?LangCS.eCertStat1024:(columns[i]==3)?LangCS.vCertStat2048:(columns[i]==4)?LangCS.uCertStat2048:(columns[i]==5)?LangCS.eCertStat2048:"";
				strStaus +='\n ';
				totalString += strStaus+enter;
			}else
				totalString += columns[i]+enter;
		}
		
		pElement.appendChild(__003_01);
		
		if(i!=(columns.length-1)){
			var __003_02 = document.createElement('div');
//			if(navigator.appName == "Microsoft Internet Explorer"){
			if (browserType == BROWSER_IE){
				__003_02.style.styleFloat = 'left';
			}else{
				__003_02.style.cssFloat = 'left';
				__003_02.innerHTML = '&nbsp';
			}
			__003_02.style.backgroundColor = '#BBB';
			//__003_02.style.border = 'solid 1px black';
			__003_02.style.width='1px';			
			//
			pElement.appendChild(__003_02);		
		}else{
			var __003_02 = document.createElement('div');
			__003_02.style.clear = 'both';
			pElement.appendChild(__003_02);
			
		}	
	}
	
	// 인증서 선택 리스트에 focus 가 갈 경우
	if(__001 !=null && typeof(__001)!='undefined'){
		if(pElement.parentNode.childNodes.length==1){
			
			//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
			//stroageName += selectSubMediaName;
			
			var datalistDesc = ((popupflag==1)?'인증서 선택창 팝업 ':'')+'인증서 목록 . 상하방향키를 이용하여 인증서를 선택해 주세요 ';
			totalString = datalistDesc+totalString;
			popupflag = (popupflag==1)?2:popupflag;
		}		
			
		//
		__001.setAttribute('alt', totalString);
		__001.setAttribute('title', totalString);
	}
		
	//pElement.setAttribute('title', totalString);
	pElement.setAttribute('alt', totalString);
	pElement.setAttribute('title', totalString);
}

function onTableRefresh(StorageElement,certlist){
	
		
	var tbody = document.getElementById("dataList");
	//tbody.setAttribute('storageInfo',StorageElement);
	
	if ( tbody.hasChildNodes() )
	{
	    while ( tbody.childNodes.length >= 1 )
	    {
	    	tbody.removeChild( tbody.firstChild );       
	    } 
	}
	
	//var totalList = new Array();
	//for(i=0; i<certlist.length;i++){
		/*
		var __004_12 = document.createElement("tr");
		__004_12.onclick = function(){selectRow(this)};
		__004_12.style.backgroundColor='white';
		__004_12.style.textAlign='center';
		var __004_12_1 = document.createElement("td");
		var __004_12_1_1 = document.createElement("div");
	
		__004_12_1_1.appendChild(createImgCell(certlist[i][0]));
		__004_12_1_1.style.borderWidth = '1.0px';
		__004_12_1_1.style.overflowX = 'hidden';
		__004_12_1_1.style.overflowY = 'hidden';
		__004_12_1_1.style.width = thElements[0].style.width;		
		__004_12_1_1.style.fontWeight = 'normal';
		__004_12_1.appendChild(__004_12_1_1);
		__004_12.appendChild(__004_12_1);
		*/
		
		//var rowLists = new Array();
		//for(j=0;j<5;j++){
		//	rowLists[j] = certlist[i][j];			
			/*
			var __004_12_2 = document.createElement("td");
			var __004_12_2_1 = document.createElement("div");
			__004_12_2_1.style.fontWeight = 'normal';
			__004_12_2_1.style.overflow = 'hidden';
			__004_12_2_1.style.textOverflow = 'ellipsis';
			__004_12_2_1.style.height = __004_12_1_1.style.height;
			__004_12_2_1.style.width = thElements[(i*5+j+1)%5].style.width;
			//__004_12_2_1.style.height = '14px';
			__004_12_2_1.appendChild(document.createTextNode(certlist[i][j+1]));
			__004_12_2.appendChild(__004_12_2_1);
			__004_12.appendChild(__004_12_2);
			*/
		//}		
		//totalList[i] = rowLists; 
			
		//tbody.appendChild(__004_12);
	//}	
	for(var i=0;i<certlist.length;i++)
		createSecurityRow(tbody,certlist[i],false);
	
	if(certlist.length !=0)
		tbody.childNodes[0].getElementsByTagName('input')[0].focus();
	
}





function stringToArray(str){
	// var certInfo = MagicLine.getCertDetail();
	var mycerts = new Array();
	//var strCerts = str.split('\t\n');
	//for(i=0;i<strCerts.length;i++){
	mycerts = str.split('\$');		
		
	return mycerts; 
}

var dummy=0;
function runKeyboardSec(){
	if(selectedRow == null){
		alert(LangCS.needSelectCert);
		//var altObj = new AlertWindow(__001);
		//	altObj.setMessage(LangCS.needSelectCert);
		//	altObj.show();

		firstFocusElement.focus();
		return;
	}
	
	if(!embeded){
		document.getElementById('passwd').value='';
		
		var vkeyObj = document.getElementById('vkeyboard');
		if(vkeyObj==null || typeof(vkeyObj)=='undefined')
			//new vKeyboard(dummy++).show(document.getElementById('passwd'));
			new vKeyboard(dummy++,document.getElementById('passwd'),encfunc,sessionid).show();
		else{
			//vkeyObj.parentNode.removeChild(vkeyObj);
			//new vKeyboard(dummy++,document.getElementById('passwd'),encfunc).show();
			document.getElementById('passwd').disabled = true;
			vkeyObj.style.display='';			
		}
	}
			
		//document.getElementById('passwd').parentNode.appendChild(vkeyObj);		
	
	
}

function init(){

	var __001_i = document.createElement("DIV");
	__001_i.id = 'gpkiEmObj';
	__001_i.style.border = 'solid 0px #CCC';	
	__001_i.style.padding = (!embeded?'15px 0px 5px 0px':'0px 0px 0px 0px');	
	__001_i.style.width= (!embeded?'388px':'285px');
	//__001.style.height='520px';
	__001_i.style.marginTop='0px';
	__001_i.style.marginLeft='1px';
	__001_i.style.backgroundColor='#F4F4F4';
	
	if(isEmbeded)
		__001 = __001_i; 	
	
	
	//__001.appendChild(document.createTextNode("출처:DIV Layout - 1 "));
	//__001.style.textAlign='center';
	
	if(!embeded){
		var __002 = document.createElement("DIV");
		//__002.style.border = 'dashed 1px #E3E3E3';
		//__002.style.padding = '5px';
		//__002.style.padding='0px 0px 0px 0px';
		//__002.style.marginTop='8px';
		//__002.style.marginLeft='8px';
		//__002.style.textAlign='left';
		
		var __002_1 = document.createElement("img");
		
		__002_1.style.width= '369px';
		__002_1.style.height='75px';
		__002_1.style.marginTop='0px';
		__002_1.style.marginLeft='0px';
		__002_1.setAttribute("src", gpkiScriptBase + "/image/certificate/GPKI_Logo.bmp");		
		__002.appendChild(__002_1);	
		__001_i.appendChild(__002);
	}

	
	var __003 = document.createElement("DIV");
	__003.style.border = 'dashed 1px #F4F4F4';
	//__003.style.padding = '5px';
	__003.style.textAlign='left';
	__003.style.height='100px';	
			
	var __003_1 = document.createElement("SPAN");
	__003_1.appendChild(document.createTextNode(LangCS.CertStorage));	
	__003_1.style.position = 'absolute';
	__003_1.style.height = '20px';
	__003_1.style.borderRadius ='6px';
	__003_1.style.backgroundColor = 'white';
	__003_1.style.fontSize ='12px';
	__003_1.style.textAlign='left';
	__003_1.style.padding = '0px 5px 0px 5px';
	__003_1.style.marginLeft='20px';	
	__003_1.style.marginTop='1px';
	
	var __003_2 = document.createElement("ul");
	__003_2.id = 'storages';
	//__003_2.style.border = '5px solid red';
	__003_2.style.width= (!embeded?'369px':'285px');
	__003_2.style.listStyle = 'none';
	__003_2.style.backgroundColor = 'white';
	__003_2.style.listPosition = 'outside';
	__003_2.style.listImage = 'none';
	__003_2.style.border = 'solid 1px #BBB';	
	__003_2.style.borderRadius = '6.0px';	
	//__003_2.style.padding = '10.0px';	
	//__003_2.style.height='70px';
	__003_2.style.marginTop=(!embeded?'8px':'0px');	
	__003_2.style.marginBottom=(!embeded?'8px':'0px');	
	__003_2.style.marginLeft=(!embeded?'8px':'0px');	
	__003_2.style.padding = (!embeded?'5.0px 0.0px 5.0px 0.0px':'0.0px');	
	//__003_2.style.verticalAlign = 'middle';
	
	var __003_2_0 = document.createElement('li');	
	//__003_2_0.style.border = 'dashed 1px red';
	//__003_2_0.style.border = '0px solid white';
	//__003_2_0.style.backgroundColor = 'white';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_2_0.style.styleFloat = 'left';
	else
		__003_2_0.style.cssFloat = 'left';
	__003_2_0.style.position = 'relative';
	
	
	var __003_2_1 = document.createElement('div');
	__003_2_1.style.zIndex ='+1';
	__003_2_1.style.marginTop = '3px';
	//__003_2_1.style.border = '0px solid white';
	__003_2_1.style.padding = '0.0px';	
	__003_2_1.style.marginLeft='0px';
	//__003_2_1.style.backgroundColor = 'white';
	
		var imgNames = ['token','smart','move','mobile','hdd'];
	
	var __003_2_1_0 = document.createElement('button');
	__003_2_1_0.style.border = 'solid 1px white';
	__003_2_1_0.id ='removeBtn';
	__003_2_1_0.style.backgroundColor = 'white';
		//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
	__003_2_1_0.setAttribute('alt',LangCS.removableDisk);
	__003_2_1_0.setAttribute('title',LangCS.removableDisk);
	__003_2_1_0.style.width=(!embeded?'68px':'53px');
	__003_2_1_0.style.padding = '0.0px';	
	__003_2_1_0.onclick = function(){
		// 인증서 리스트 삭제_121018 by jLion
		if(document.getElementById("dataList").hasChildNodes()){
			var tbody = document.getElementById("dataList");
			if ( tbody.hasChildNodes() )
			{
			    while ( tbody.childNodes.length >= 1 )
			    {
			    	tbody.removeChild( tbody.firstChild );       
			    } 
			}			
		}	
				
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n'+(!embeded?'':'_em')+'.bmp');
		}
		this.getElementsByTagName('img')[0].setAttribute('src', gpkiScriptBase + '/image/certificate/move_p'+(!embeded?'':'_em')+'.bmp');
		//this.getElementsByTagName('img')[0].style.borderBottom = '3px solid blue';
		
		var focusColumn = onRemovableList(this.parentNode); 
		if(focusColumn!=null)
			focusColumn.focus();
	};
	__003_2_1_0.onfocus = function(){
				var imgName = this.getElementsByTagName('img')[0].getAttribute('src');
				
				if(imgName.indexOf('_p')>-1)
					imgName = LangCS.removableDisk+'선택';					
				else
					imgName = LangCS.removableDisk;
				
				this.getElementsByTagName('img')[0].setAttribute('alt',imgName);
				this.setAttribute('alt',imgName);
				this.setAttribute('title',imgName);				
			}		
	__003_2_1.appendChild(__003_2_1_0);
	
	var __003_2_1_1 = document.createElement('img');
//	/__003_2_2.setAttribute('type','button');
	__003_2_1_1.style.verticalAlign = 'middle';
	__003_2_1_1.style.border = '0.0px';	
	__003_2_1_1.style.padding = '0.0px';	
	
	// added by gomsugy. 2015.08.26
	//[[
	__003_2_1_1.style.width=(!embeded?'57px':'51px');
	__003_2_1_1.style.height=(!embeded?'60px':'52px');
	//]]

	//__003_2_2.style.width='68px';
	//__003_2.setAttribute('src', MagicLine.mBasePath+'/img/icon_removable.png');
	__003_2_1_1.setAttribute('src', gpkiScriptBase + '/image/certificate/move_n'+(!embeded?'':'_em')+'.bmp');
	//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
	__003_2_1_1.setAttribute('alt',LangCS.removableDisk);
	__003_2_1_1.onmouseover = function(){	this.style.cursor = 'pointer';	};
		
	
	__003_2_1_0.appendChild(__003_2_1_1);
	__003_2_0.appendChild(__003_2_1);
	/*
	
	var __003_2_1_1 = document.createElement('ul');
	__003_2_1_1.style.listStyle = 'none';
	__003_2_1_1.style.border = 'dashed 1px red';
	__003_2_1_1.style.left = '0';
	//__003_2_1_1.style.position ='absolute';
	__003_2_0.appendChild(__003_2_1_1);
	var __003_2_1_1_1 = document.createElement('li');
	var __003_2_1_1_1_1 = document.createElement('a');
	__003_2_1_1_1_1.setAttribute('href','#');
	__003_2_1_1_1_1.appendChild(document.createTextNode('001'));
	__003_2_1_1_1.appendChild(__003_2_1_1_1_1);
	__003_2_1_1.appendChild(__003_2_1_1_1);
	var __003_2_1_1_2 = document.createElement('li');
	var __003_2_1_1_2_1 = document.createElement('a');
	__003_2_1_1_2_1.setAttribute('href','#');
	__003_2_1_1_2_1.appendChild(document.createTextNode('002'));
	__003_2_1_1_2.appendChild(__003_2_1_1_2_1);
	__003_2_1_1.appendChild(__003_2_1_1_2);
	var __003_2_1_1_3 = document.createElement('li');
	var __003_2_1_1_3_1 = document.createElement('a');
	__003_2_1_1_3_1.setAttribute('href','#');
	__003_2_1_1_3_1.appendChild(document.createTextNode('003'));
	__003_2_1_1_3.appendChild(__003_2_1_1_3_1);
	__003_2_1_1.appendChild(__003_2_1_1_3);
	*/
	var __003_2_2 = document.createElement('li');
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_2_2.style.styleFloat = 'left';
	else
		__003_2_2.style.cssFloat = 'left';
	__003_2_2.style.position = 'relative';
		
	var __003_2_2_0 = document.createElement('div');
	__003_2_2_0.style.marginTop = '3.0px';	
	__003_2_2_0.style.marginLeft='0px';
	__003_2_2_0.style.padding = '0.0px';
	
	var __003_2_2_1 = document.createElement('button');
	__003_2_2_1.style.border = 'solid 1px white';
	__003_2_2_1.style.backgroundColor = 'white';
	__003_2_2_1.id ='smartBtn';
	__003_2_2_1.style.width=(!embeded?'68px':'53px');
	
	__003_2_2_1.style.padding = '0px 0px 0px 0px';
	//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
	__003_2_2_1.setAttribute('alt',LangCS.smartCard);
	__003_2_2_1.setAttribute('title',LangCS.smartCard);
	//__003_2_2_1.style.marginTop = '3.0px';
	//__003_2_2_1.style.marginLeft='3px';
	__003_2_2_1.style.padding = '0.0px';
	__003_2_2_1.setAttribute('action','ready');
	__003_2_2_1.onclick = function(e){
		// 인증서 리스트 삭제_121018 by jLion
		if(document.getElementById("dataList").hasChildNodes()){
			var tbody = document.getElementById("dataList");
			if ( tbody.hasChildNodes() )
			{
			    while ( tbody.childNodes.length >= 1 )
			    {
			    	tbody.removeChild( tbody.firstChild );       
			    } 
			}			
		}		
		
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n'+(!embeded?'':'_em')+'.bmp');
		}
		this.getElementsByTagName('img')[0].setAttribute('src', gpkiScriptBase + '/image/certificate/smart_p'+(!embeded?'':'_em')+'.bmp');
		
		var focusElement = onSMTokenCertList(this.parentNode);
		focusElement.focus();
	};
	
	__003_2_2_1.onfocus = function(){
				var imgName = this.getElementsByTagName('img')[0].getAttribute('src');
				
				if(imgName.indexOf('_p')>-1)
					imgName = LangCS.smartCard+'선택';					
				else
					imgName = LangCS.smartCard;
				
				this.getElementsByTagName('img')[0].setAttribute('alt',imgName);
				this.setAttribute('alt',imgName);
				this.setAttribute('title',imgName);				
			}		
	
	
	var __003_2_2_2 = document.createElement('img');
	//__003_2_2_2.setAttribute('type','button');
	__003_2_2_2.style.verticalAlign = 'middle';
	__003_2_2_2.style.border = '0.0px';	
	__003_2_2_2.style.padding = '0.0px';
	
	// added by gomsugy. 2015.08.26
	//[[
	__003_2_2_2.style.width=(!embeded?'57px':'51px');
	__003_2_2_2.style.height=(!embeded?'60px':'52px');
	//]]
	
	//__003_2_2_2.style.width='68px';
	//__003_2.setAttribute('src', MagicLine.mBasePath+'/img/icon_removable.png');
	__003_2_2_2.setAttribute('src', gpkiScriptBase + '/image/certificate/smart_n'+(!embeded?'':'_em')+'.bmp');
	//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
	__003_2_2_2.setAttribute('title',LangCS.smartCard);
	//__003_2_2_2.onclick = function(){onSMTokenCertList(this);};
	__003_2_2_1.appendChild(__003_2_2_2);
	__003_2_2_0.appendChild(__003_2_2_1);
	__003_2_2.appendChild(__003_2_2_0);
	
	var __003_2_3 = document.createElement('li');
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_2_3.style.styleFloat = 'left';
	else
		__003_2_3.style.cssFloat = 'left';
	__003_2_3.style.position = 'relative';
	
	
	var __003_2_3_0 = document.createElement('div');
	__003_2_3_0.style.marginTop = '3.0px';	
	__003_2_3_0.style.marginLeft='0px';
	__003_2_3_0.style.padding = '0.0px';
	__003_2_3_0.style.marginLeft=(!embeded?'7px':'7px');
	
	var __003_2_3_1 = document.createElement('button');
	__003_2_3_1.style.border = 'solid 1px white';
	__003_2_3_1.style.backgroundColor = 'white';
	__003_2_3_1.style.width=(!embeded?'68px':'53px');
	__003_2_3_1.setAttribute('action','ready');
	//var stroageName = (selectedStorageType ==1)?'이동식디스크 선택':(selectedStorageType ==2)?'스마트 카드선택':(selectedStorageType ==3)?'보안토큰 선택':(selectedStorageType ==4)?'하드디스크 선택':'휴대전화 선택';
	__003_2_3_1.setAttribute('alt',LangCS.SecureToken);
	__003_2_3_1.setAttribute('title',LangCS.SecureToken);
	//__003_2_3_1.style.marginTop = (!embeded?'3px':'0px');
	//__003_2_3_1.style.marginLeft=(!embeded?'3px':'0px');;
	__003_2_3_1.style.padding = '0.0px';
	__003_2_3_1.setAttribute('action','ready');
	__003_2_3_1.onclick = function(event){
		// 인증서 리스트 삭제_121018 by jLion
		if(document.getElementById("dataList").hasChildNodes()){
			var tbody = document.getElementById("dataList");
			if ( tbody.hasChildNodes() )
			{
			    while ( tbody.childNodes.length >= 1 )
			    {
			    	tbody.removeChild( tbody.firstChild );       
			    } 
			}			
		}		
		
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n'+(!embeded?'':'_em')+'.bmp');
		}
		this.getElementsByTagName('img')[0].setAttribute('src', gpkiScriptBase + '/image/certificate/token_p'+(!embeded?'':'_em')+'.bmp');
		
		event = event||window.event;
		var target = event.target||event.srcElement;
		
		onSeTokenCertList(event);
		

	};	
	__003_2_3_1.onfocus = function(){
				var imgName = this.getElementsByTagName('img')[0].getAttribute('src');
				
				if(imgName.indexOf('_p')>-1)
					imgName = LangCS.SecureToken+'선택';					
				else
					imgName = LangCS.SecureToken;
				
				this.getElementsByTagName('img')[0].setAttribute('alt',imgName);
				this.setAttribute('alt',imgName);
				this.setAttribute('title',imgName);				
			}		
	/*
	__003_2_3_0.onfocus = function(){
		var action = this.getAttribute('action');
		
		
		if(action == 'end'){
			var optPanel = document.getElementById('drivePanel');
			if(optPanel!=null|| typeof(optPanel)=='undefined')
				optPanel.parentNode.removeChild(optPanel);
			
			selectedStorageType  = 3;
			
			if(((this.getAttribute('idx')==null) || typeof(this.getAttribute('idx'))=='undfined') && this.getAttribute('idx')==-1)
				return;
				
			getCertList(this);
			//mycerts = new Array();
			//mycerts[0] = new Array("0","805김수용003245","대검찰청","개인용","2014-08-21");
			//mycerts[1] = new Array("0","805김민수003245","행안부","개인용","2018-08-21");
				
			//onTableRefresh(this,mycerts);
		
			this.setAttribute('action','ready');
			attachKeyboardNavigator(document.getElementById("dataList"));
		}
		
		return;
	}
	*/
		
	
	var __003_2_3_2 = document.createElement('img');
	//__003_2_3_1.setAttribute('type','button');
	__003_2_3_2.style.verticalAlign = 'middle';
	__003_2_3_2.style.border = '0.0px';	
	__003_2_3_2.style.padding = '0.0px';	

	// added by gomsugy. 2015.08.26
	//[[
	__003_2_3_2.style.width=(!embeded?'57px':'51px');
	__003_2_3_2.style.height=(!embeded?'60px':'52px');
	//]]
	
	//__003_2.setAttribute('src', MagicLine.mBasePath+'/img/icon_removable.png');
	__003_2_3_2.setAttribute('src', gpkiScriptBase + '/image/certificate/token_n'+(!embeded?'':'_em')+'.bmp');
	__003_2_3_2.setAttribute('title',LangCS.SecureToken);
	__003_2_3_0.appendChild(__003_2_3_1);
	__003_2_3_1.appendChild(__003_2_3_2);
	__003_2_3.appendChild(__003_2_3_0);
		
	var __003_2_4 = document.createElement('li');
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_2_4.style.styleFloat = 'left';
	else
		__003_2_4.style.cssFloat = 'left';
	__003_2_4.style.position = 'relative';
	
	
	var __003_2_4_0 = document.createElement('div');
	__003_2_4_0.style.marginTop = '3.0px';	
	__003_2_4_0.style.marginLeft='0px';
	__003_2_4_0.style.padding = '0.0px';
	
	var __003_2_4_1 = document.createElement('button');
	__003_2_4_1.style.border = 'solid 1px white';
	__003_2_4_1.style.backgroundColor ='white';
	__003_2_4_1.style.width=(!embeded?'68px':'53px');
	__003_2_4_1.setAttribute('alt',LangCS.HardDisk );
	__003_2_4_1.setAttribute('title',LangCS.HardDisk);
	//__003_2_4_1.style.marginTop = '3.0px';
	//__003_2_4_1.style.marginLeft=(!embeded?'3px':'0px');
	__003_2_4_1.style.padding = '0.0px';	
	__003_2_4_1.onclick = function(){
		// 인증서 리스트 삭제_121018 by jLion
		if(document.getElementById("dataList").hasChildNodes()){
			var tbody = document.getElementById("dataList");
			if ( tbody.hasChildNodes() )
			{
			    while ( tbody.childNodes.length >= 1 )
			    {
			    	tbody.removeChild( tbody.firstChild );       
			    } 
			}			
		}
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n'+(!embeded?'':'_em')+'.bmp');
		}
		this.getElementsByTagName('img')[0].setAttribute('src', gpkiScriptBase + '/image/certificate/hdd_p'+(!embeded?'':'_em')+'.bmp');
		
		OnHddCertList(this);
			
		//~! added by gomsugy. 2016.01.13.
		// 인증서 목록의 첫번째 열 선택.
		var certList = document.getElementById("dataList");
		if (certList.hasChildNodes())
			certList.childNodes[0].onclick();
		};
		__003_2_4_1.onfocus = function(){
				var imgName = this.getElementsByTagName('img')[0].getAttribute('src');
				
				if(imgName.indexOf('_p')>-1)
					imgName = LangCS.HardDisk+'선택';					
				else
					imgName = LangCS.HardDisk;
				
				this.getElementsByTagName('img')[0].setAttribute('alt',imgName);
				this.setAttribute('alt',imgName);
				this.setAttribute('title',imgName);				
			}	
	firstFocusElement = __003_2_4_1;
	
	var __003_2_4_2 = document.createElement('img');	
	//__003_2_4_1.setAttribute('type','button');
	__003_2_4_2.style.verticalAlign = 'middle';
	__003_2_4_2.style.border = '0.0px';	
	__003_2_4_2.style.padding = '0.0px';	
	// added by gomsugy. 2015.08.26
	//[[
	__003_2_4_2.style.width=(!embeded?'57px':'51px');
	__003_2_4_2.style.height=(!embeded?'60px':'52px');
	//]]
	
	//__003_2.setAttribute('src', MagicLine.mBasePath+'/img/icon_removable.png');
	__003_2_4_2.setAttribute('src', gpkiScriptBase + '/image/certificate/hdd_n'+(!embeded?'':'_em')+'.bmp');	
	__003_2_4_2.setAttribute('title',LangCS.HardDisk);
	__003_2_4_0.appendChild(__003_2_4_1);
	__003_2_4_1.appendChild(__003_2_4_2);
	__003_2_4.appendChild(__003_2_4_0);
	
	var __003_2_5 = document.createElement('li');
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_2_5.style.styleFloat = 'left';
	else
		__003_2_5.style.cssFloat = 'left';
	__003_2_5.style.position = 'relative';	
	
	var __003_2_5_0 = document.createElement('div');
	__003_2_5_0.style.marginTop = '3.0px';	
	__003_2_5_0.style.marginLeft=(!embeded?'3px':'0px');
	__003_2_5_0.style.padding = '0.0px';
	
	var __003_2_5_1 = document.createElement('button');
	__003_2_5_1.id = 'stPhone';
	__003_2_5_1.style.width=(!embeded?'68px':'53px');
	__003_2_5_1.style.border = 'solid 1px white';
	__003_2_5_1.style.backgroundColor = 'white';
	
	__003_2_5_1.setAttribute('alt',LangCS.Phone);
	__003_2_5_1.setAttribute('title',LangCS.Phone);
	__003_2_5_1.style.padding = '0.0px';	
	__003_2_5_1.onclick = function(){
		if(navigator.userAgent.indexOf('Windows')==-1){
			alert(LangCS.alertMsg009);
			return;
		}else if(phoneOpt == 0)			{
			alert(LangCS.alertMsg010);
			return;
		}else{}
			
		// 인증서 리스트 삭제_121018 by jLion
		if(document.getElementById("dataList").hasChildNodes()){
			var tbody = document.getElementById("dataList");
			if ( tbody.hasChildNodes() )
			{
			    while ( tbody.childNodes.length >= 1 )
			    {
			    	tbody.removeChild( tbody.firstChild );       
			    } 
			}			
		}
		// [장애인 접근성]
		__003_2_5_1.onfocus = function(){
				var imgName = this.getElementsByTagName('img')[0].getAttribute('src');
				
				if(imgName.indexOf('_p')>-1)
					imgName = LangCS.Phone+'선택';					
				else
					imgName = LangCS.Phone;
				
				this.getElementsByTagName('img')[0].setAttribute('alt',imgName);
				this.setAttribute('alt',imgName);
				this.setAttribute('title',imgName);				
			}	
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n'+(!embeded?'':'_em')+'.bmp');
		}
		this.getElementsByTagName('img')[0].setAttribute('src', gpkiScriptBase + '/image/certificate/mobile_p'+(!embeded?'':'_em')+'.bmp');
		
		var focusElement = onPhoneCertList(this.parentNode);
		focusElement.focus();		
	};
	
	
	__003_2_5_0.appendChild(__003_2_5_1);
	
	
	var __003_2_6 = document.createElement('img');	
	//__003_2_6.setAttribute('type','image');
	__003_2_6.style.verticalAlign = 'middle';
	__003_2_6.style.border = '0.0px';
	__003_2_6.style.padding = '0.0px';	
	// added by gomsugy. 2015.08.26
	//[[
	__003_2_6.style.width=(!embeded?'57px':'51px');
	__003_2_6.style.height=(!embeded?'60px':'52px');
	//]]
	//__003_2_6.style.width='68px';
	//__003_2.setAttribute('src', MagicLine.mBasePath+'/img/icon_removable.png');
	__003_2_6.setAttribute('src', gpkiScriptBase + '/image/certificate/mobile_n'+(!embeded?'':'_em')+'.bmp');
	__003_2_6.setAttribute('title',LangCS.Phone);
	__003_2_6.onmouseover = function(){	this.style.cursor = 'pointer';	};
	
	__003_2_5_1.appendChild(__003_2_6);
	__003_2_5.appendChild(__003_2_5_0);
	/*
	var __003_2_6_1 = document.createElement('ul');
	__003_2_6_1.style.listStyle = 'none';
	__003_2_6_1.style.position = 'absolute';
	__003_2_6_1.style.border = 'dashed 1px red';
	__003_2_6_1.style.marginLeft = '300px';	
	__003_2_5.appendChild(__003_2_6_1);
	var __003_2_6_1_1 = document.createElement('li');
	__003_2_6_1_1.style.float = 'none';
	var __003_2_6_1_1_1 = document.createElement('a');
	__003_2_6_1_1_1.setAttribute('href','#');
	__003_2_6_1_1_1.appendChild(document.createTextNode('011'));
	__003_2_6_1_1.appendChild(__003_2_6_1_1_1);
	__003_2_6_1.appendChild(__003_2_6_1_1);
	var __003_2_6_1_2 = document.createElement('li');
	__003_2_6_1_2.style.float = 'none';
	var __003_2_6_1_2_1 = document.createElement('a');
	__003_2_6_1_2_1.setAttribute('href','#');
	__003_2_6_1_2_1.appendChild(document.createTextNode('012'));
	__003_2_6_1_2.appendChild(__003_2_6_1_2_1);
	__003_2_6_1.appendChild(__003_2_6_1_2);
	var __003_2_6_1_3 = document.createElement('li');
	__003_2_6_1_3.style.float = 'none';
	var __003_2_6_1_3_1 = document.createElement('a');
	__003_2_6_1_3_1.setAttribute('href','#');
	__003_2_6_1_3_1.appendChild(document.createTextNode('013'));
	__003_2_6_1_3.appendChild(__003_2_6_1_3_1);
	__003_2_6_1.appendChild(__003_2_6_1_3);
	*/
	__003_2.appendChild(__003_2_3);//보안토큰
	__003_2.appendChild(__003_2_2);// 스마트
	__003_2.appendChild(__003_2_0);// 이동식
	__003_2.appendChild(__003_2_5);//휴대전화		
	__003_2.appendChild(__003_2_4);//하드디스크	
	
	var __003_2_7 = document.createElement('div');
	//__003_2_7.style.border = 'solid 1px red';
	__003_2_7.style.clear = 'both';
	__003_2_7.style.marginTop = '0px';
	__003_2_7.style.marginBottom = '0px';
	__003_2.appendChild(__003_2_7);	
	
	__003.appendChild(__003_1);	
	__003.appendChild(__003_2);
	
	var __004 = document.createElement("DIV");
		
	//__003.style.padding = '5px';
	__004.style.textAlign='left';
	__004.style.height=(!embeded?'130px':'80px');	
	__004.style.marginTop='0px';
	//__004.style.padding ='0px 0px 0px 0px';
	//__004.style.marginLeft='8px';
	//__004.style.width= '371px';
		
	var __004_10 = document.createElement("div");
	__004_10.style.width= (!embeded?'369px':'285px');
	__004_10.style.border = (!embeded?'solid 1px #D1D1D1':'solid 0px #D1D1D1');
	__004_10.style.fontSize = '11.0px';
	//__004_10.style.position = 'relative';
	__004_10.style.fontSize = '12px';
	__004_10.style.marginLeft=(!embeded?'8px':'0px');
	__004_10.style.font ='normal bold 12px 돋움",Dotum,sans-serif';
	__004_10.style.color = '#474747';
	//__004_10.style.marginTop='8px';
	//__004_10.style.marginLeft='8px';
	__004_10.style.textAlign='center';
	__004.appendChild(__004_10);	
		
	var headerName ;
	if(!embeded)
		headerName = [LangCS.CertStat,LangCS.CertOwner,LangCS.CertExDatae,LangCS.CertUsage, LangCS.CertIssuer];
	else
		headerName = [LangCS.CertStat,LangCS.CertOwner,LangCS.CertExDatae,LangCS.CertUsage];
	
	createSecurityRow(__004_10,headerName,true);
	
	var __004_11 = document.createElement("div");
	__004_11.id = 'dataList';
	__004_11.style.border = (!embeded?'solid 1px #D1D1D1':'solid 0px #D1D1D1');
	__004_11.style.height=(!embeded?'100px':'60px');
	//__004_11.style.position = 'relative';
	//__004_11.style.marginTop='8px';
	__004_11.style.width= (!embeded?'369px':'285px');
	__004_11.style.backgroundColor = 'white';
	__004_11.style.marginLeft=(!embeded?'8px':'0px');
	__004_11.style.textAlign='left';
	__004_11.style.overflowX = "hidden";
	__004_11.style.fontSize = '8px';
	__004_11.style.overflowY = "scroll";
	__004.appendChild(__004_11);	
		
	var __005 = document.createElement("DIV");
	//__005.style.border = 'solid 1px #D1D1D1';
	
	//__005.style.padding = '5px';
	//__005.style.width= '371px';
	//__005.style.height='100px';
	//__005.style.marginTop='8px';
	__005.style.marginLeft='0px';
	//__005.style.marginLeft='8px';
	__005.style.textAlign='left';
	
	var __005_1 = document.createElement("DIV");
	//__005_1.style.border = 'dashed 1px red';
	
	__005_1.style.textAlign='left';
	__005_1.style.marginTop='3px';
	__005_1.style.marginBottom='7px';
	__005_1.style.marginLeft='8px';
	__005_1.style.width= '371px';
	//__005_1.style.padding = '0px 0px 5px 0px';
	
	
	var __005_1_1 = document.createElement('div');
	//__005_1_1.style.border = 'dashed 1px black';
	//__005_1_1.style.height='12px';
	//__005_1_1.style.marginTop='2px';
	//
	__005_1_1.style.width = '290px';
	__005_1_1.style.marginTop = '3px';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__005_1_1.style.styleFloat = 'left';
	else
		__005_1_1.style.cssFloat = 'left';
	
	__005_1_1.style.padding = '0px 0px 0px 0px';
	__005_1_1.style.marginLeft = '0px';
	//__005_1_1.style.fontSize = '12.0px';
	//__005_1_1.style.height = '23.0px';
	//__005_1_1.style.textAlign='right';
	//__005_1_1.style.width = '290.0px';
	//__005_1_1.style.padding = '1px';
	//__005_1_1.style.lineHeight="10px";
	__005_1_1.style.color = '#3C4988';
	
	__005_1_1.style.font = 'normal bold 12px Arial, Helvetica, sans-serif, "돋움", Dotum';
	__005_1_1.appendChild(document.createTextNode(LangCS.CertSearch));
	__005_1.appendChild(__005_1_1);
	
	var __005_1_2 = document.createElement('div');
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__005_1_2.style.styleFloat = 'left';
	else
		__005_1_2.style.cssFloat = 'left';
	__005_1_2.style.width = '81px';
	__005_1_2.style.marginLeft = '0px';
	__005_1_2.style.textAlign = 'right';
	
	var __005_1_2_1 = document.createElement('BUTTON');
	//__005_1_2.style.width= '371px';
	//__005_1_2.style.marginLeft='0px';
	__005_1_2_1.setAttribute('title', LangCS.FindStat);
	__005_1_2_1.style.background = 'url("' + gpkiScriptBase + '/image/certificate/btn_search.png")';
	__005_1_2_1.style.border = '0px solid gray';
	__005_1_2_1.id='searchBtn';
	__005_1_2_1.onmouseover = function(){
		this.style.cursor = 'pointer';
	}
	//__005_2.style.fontSize = '12.0px';
	//__005_1_2.style.border = '1.0px solid blue';
	//__005_2.style.width = '75.0px';
	//__005_2.style.height = '25.0px';
	//__005_2.style.borderRadius = '6.0px';
	//__005_2.style.MozBorderRadius = '6.0px';
	//__005_1_2.style.padding = '0px';
	__005_1_2_1.style.width = '70.0px';
	__005_1_2_1.style.height = '20.0px';
	//__005_1_2.style.borderRadius = '6px';
	__005_1_2_1.style.marginTop ='0px';
	//__005_1_2.style.padding ='0px 0px 0px 0px ';
	
	__005_1_2_1.onclick = function(event){
		event = event||window.event;
		
		//~! disabled by gomsugy. 2016.01.13
// 		if(document.getElementById("dataList").hasChildNodes()){
// 			var tbody = document.getElementById("dataList");
// 			if ( tbody.hasChildNodes() )
// 			{
// 			    while ( tbody.childNodes.length >= 1 )
// 			    {
// 			    	tbody.removeChild( tbody.firstChild );       
// 			    } 
// 			}			
// 		}
		
		var imgList = document.getElementById('storages').getElementsByTagName('img');
		for(var i=0; i<imgList.length;i++){
			imgList[i].setAttribute('src', gpkiScriptBase + '/image/certificate/'+imgNames[i]+'_n.bmp');
		}
		
		loadJavascript(gpkiScriptBase + "/ui/CertSearchWindow.js",onPKCS12FileDialog,event);
		//onPKCS12FileDialog(event);		
	};
	
	//__005_1_2.appendChild(document.createTextNode("찾아보기"));	
	__005_1_2.appendChild(__005_1_2_1);
	__005_1.appendChild(__005_1_2);
	
	var __005_1_3 = document.createElement('div');
	//__003_2_7.style.border = 'solid 1px red';
	__005_1_3.style.clear = 'both';
	__005_1.appendChild(__005_1_3);
	__005.appendChild(__005_1);
	
	var __005_2 = document.createElement("DIV");
	__005_2.id = 'passwdArea';
	__005_2.id = 'attachTarget';
	//__005_2.style.border = '1px solid red';
	__005_2.style.padding = '0px 0px 0px 0px';
	__005_2.style.marginLeft='8px';
	__005_2.style.width= '371px';
	//__005_2.style.padding = '5px';
	
	var __005_2_1 = document.createElement('div');
	//__005_2_1.id = 'attachTarget';
	//__005_2_1.style.border = '1px solid red';
	__005_2_1.style.padding = '0px 0px 0px 0px';
	__005_2_1.style.marginTop = '5px';
	__005_2_1.style.width = '25%';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__005_2_1.style.styleFloat = 'left';
	else
		__005_2_1.style.cssFloat = 'left';
	__005_2_1.style.fontSize = '12.0px';
	//__005_2_1.style.padding = '1.0px';
	__005_2_1.style.fontFamily = 'Arial, Helvetica, sans-serif, "돋움", Dotum';
	__005_2_1.style.fontSize ='12px';
	__005_2_1.appendChild(document.createTextNode("인증서 비밀번호"));
	__005_2.appendChild(__005_2_1);
	
	var __005_2_2 = document.createElement('div');
	__005_2_2.style.textAlign = 'right';
	__005_2_2.style.width = '75%';
	__005_2_2.style.padding = '0px 0px 0px 0px';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__005_2_2.style.styleFloat = 'left';
	else
		__005_2_2.style.cssFloat = 'left';
	
	var __005_2_2_1 = document.createElement('INPUT');
	//__005_2_2_1.style.marginLeft = "5px";
	__005_2_2_1.style.width = '100%';	
	__005_2_2_1.setAttribute('type', 'password');
	__005_2_2_1.id='passwd';
	//__005_2_2_1.setAttribute('title','가상키보드');
	
	__005_2_2_1.onclick=function(event){
		gpSessionId =sessionid;
		event = event||window.event;
		//loadJavascript('js/vKeyboardWindow',runKeyboardSec);
		if(keysecOpt==1)
			loadJavascript(gpkiScriptBase + '/ui/vKeyboardWindow.js',runKeyboardSec);
			//runKeyboardSec();		
	};
	__005_2_2_1.onfocus=function(event){
		//event = event||window.event;
		//loadJavascript('js/vKeyboardWindow',runKeyboardSec);
		gpSessionId =sessionid;
		if(keysecOpt==1)
			loadJavascript(gpkiScriptBase + '/ui/vKeyboardWindow.js',runKeyboardSec);
			//runKeyboardSec();
	};
	__005_2_2_1.onkeypress=pwdEnterEvent;
	__005_2_2.appendChild(__005_2_2_1);
	__005_2.appendChild(__005_2_2);	
		
	var __005_2_3 = document.createElement('div');
	__005_2_3.style.clear = 'both';
	__005_2.appendChild(__005_2_3);
	
	//var __005_2_3_1 = document.createElement('div');
	//__005_2_3_1.style.fontSize = '12.0px';
	//__005_2_3_1.style.border = 'solid 1px #D1D1D1';
	//__005_2_3_1.style.height = '23.0px';
	//__005_2_3_1.style.marginTop='5px';
	//__005_2_3.appendChild(__005_2_3_1);
	__005.appendChild(__005_2);
	
	//__005_2_4.setAttribute('type', 'text');
	//__005_2_3.setAttribute('readonly', 'readonly');

	
	
	var __006 = document.createElement("DIV");
	//__006.style.border = 'dashed 1px red';
	//__006.style.padding = '5px';
	__006.style.width= '371px';
	__006.style.height='30px';
	__006.style.marginTop='8px';
	__006.style.marginLeft='8px';
	//__006.appendChild(document.createTextNode("출처:DIV Layout - 6 "));
	__006.style.textAlign='center';
	
	var __006_1 = document.createElement('BUTTON');	
	__006_1.style.width = '75.0px';
	__006_1.style.height = '25.0px';
	__006_1.style.borderRadius = '6px';
	__006_1.style.border = '1px solid #BBB';
	__006_1.style.marginLeft='15px';
	__006_1.style.fontSize = '12.0px';
	__006_1.onclick = function(){onOKClickButton()};
	__006_1.appendChild(document.createTextNode(LangCS.OKStat));	
	__006.appendChild(__006_1);
	
	var __006_2 = document.createElement('BUTTON');	
	__006_2.style.width = '75.0px';
	__006_2.style.height = '25.0px';
	__006_2.style.borderRadius = '6px';
	__006_2.style.border = '1px solid #BBB';
	__006_2.style.marginLeft='15px';
	__006_2.style.fontSize = '12.0px';
	__006_2.onclick = function(){onCancelClickButton()};
	__006_2.appendChild(document.createTextNode(LangCS.CancelStat));
	__006.appendChild(__006_2);
	
	var __006_3 = document.createElement('BUTTON');	
	__006_3.style.width = '80.0px';
	__006_3.style.height = '25.0px';
	__006_3.style.borderRadius = '6px';
	__006_3.style.border = '1px solid #BBB';
	__006_3.style.marginLeft='15px';
	__006_3.style.fontSize = '12.0px';
	__006_3.onclick = function(event){
		event = event||window.event;
		loadJavascript(gpkiScriptBase + "/ui/CertViewer.js",showCertView);
		//showCertView(event);
		};
	__006_3.appendChild(document.createTextNode(LangCS.ViewVerify));
	__006.appendChild(__006_3);
	
	if(!embeded){		
		__001_i.appendChild(__003);
		__001_i.appendChild(__004);
		__001_i.appendChild(__005);
		__001_i.appendChild(__006);
	}else{
		__001_i.appendChild(__003_2);
		__001_i.appendChild(__004);		
	}	
			
	
	//document.getElementsByTagName("body")[0].appendChild(__001);
	
	return __001_i; 
}


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
}





function showCertView(event){
		
	if(selectedRow == null){
		alert(LangCS.needSelectCert);
		//var altObj = new AlertWindow(__001);
		//	altObj.setMessage(LangCS.needSelectCert);
		//	altObj.show();
		return;
	}
	
	var certview = new CertWindow(selecteRowNum);
	certview.show();
	
	
}



function OnHddCertList(target){
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null|| typeof(optPanel)=='undefined')
		optPanel.parentNode.removeChild(optPanel);
	
	selectedStorageType  = 4;
	GPKISecureWeb.SetMediaType(4);
	var mediaNum = GPKISecureWeb.GetMediaSubCount();
	selectSubMediaName = '';
	GPKISecureWeb.GetMediaSubInfo(0);
	
	target.setAttribute('idx','0');
	
	// 저장매체에서 인증서 가져오기
	if(!getCertList(target)){
		this.focus();
		return;
	}

	//var hddCert = MagicLine.
	//var hddCert = MagicLine.getCertList(4);	
	//mycerts = stringToArray(hddCert);
	
	//onTableRefresh(mycerts);
}

function onRemovableList(target){
	selectedStorageType  =1;
		
	var retObjs = showSubMemu(target);
	if(retObjs[0]!=null){	
		target.parentNode.appendChild(retObjs[0]);
		attachKeyboardNavigator(document.getElementById('drivePanel'));
	}
	
	return retObjs[1];
}

function getCertList(target){	
	
	//selectedStorageType  = 1;
	mycerts = new Array();
	
	var SubCountNum = 0;
	var certNum = 0;
		
	if(selectedStorageType ==6){
		// 1. 경로값 패스워드 설정
		var sdk = target.getAttribute('pin');
		var pfxFilePath = target.getAttribute('filePath');
		var ret = GPKISecureWeb.SetPFXPath(pfxFilePath,sdk);
		if(ret != 0){
			alert(LangCS.alertMsg003);
			return false;
		}
			
		certNum = GPKISecureWeb.GetCertCount(SubCountNum);
	}else{	
		SubCountNum = target.getAttribute('idx');
		certNum = GPKISecureWeb.GetCertCount(SubCountNum);
	}
	
	if(certNum == 0 || certNum > 30000){
		var optPanel = document.getElementById('drivePanel');
		if(optPanel!=null|| typeof(optPanel)=='undefined')
					optPanel.parentNode.removeChild(optPanel);
						
		if(certNum==30004){
			alert(LangCS.alertMsg006);	
			window.open(UbikeyPopupURL);
			return false;
		}else if(certNum==30022){
			alert(LangCS.alertMsg008);	
			window.open(UbikeyPopupURL);
			return false;
		}else
			alert(LangCS.alertMsg004);
				
		//var altObj = new AlertWindow(__001);
		//altObj.setMessage(LangCS.alertMsg004);
		//altObj.show();
		
		return false;
	}
	
	for(var i=0; i<certNum; i++){
		//mycerts = stringToArray(MagicLine.GetCertInfo(SubCountNum, i,'Status$CN$PolicyName$IssuerCN$ValidTo$SerialNum'));
		mycerts[i] = stringToArray(GPKISecureWeb.GetCertlistInfo(SubCountNum, i));
	}
	
	//var certs = MagicLine.getCertList(1);	
	//mycerts = stringToArray(certs);
		
	//alert(target.getAttribute('idx'));
		
	//document.getElementsByTagName("body")[0].removeChild(target.parentNode);
	
	if(target.tagName != 'IMG'){
		var optPanel = document.getElementById('drivePanel');
		
		if(optPanel!=null && typeof(optPanel)!='undefined'){
			var parent = optPanel.parentNode;//li tag							
			parent.removeChild(optPanel);
		}
	}
	
	onTableRefresh(target, mycerts);
	attachKeyboardNavigator(document.getElementById("dataList"));
	return true;
}

var selectSubMediaName = '';

function showSubMemu(target){
	var focusElement;
	GPKISecureWeb.SetMediaType(selectedStorageType);
	
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null && typeof(optPanel)!='undefined'){	
		
		if(target.parentNode.childNodes.length == 2){
			optPanel.parentNode.removeChild(optPanel);
			return [null,target.getElementsByTagName('button')[0]];
		}else{
			optPanel.parentNode.removeChild(optPanel);
		}
		
	}
	//e.srcElement.
	// 1. 드라이브 정보 가져오기
	// 2. 선택한 버튼 우측에 팝업 레이어 띄우기
	//var drives = ["C:\\","D:\\","E:\\","C:\\","D:\\","E:\\"];
	
	var mediaNum = GPKISecureWeb.GetMediaSubCount();
	
	if(mediaNum == 0){
		selectSubMediaName = '';
		alert(LangCS.alertMsg004);
		//var altObj = new AlertWindow(__001);
		//altObj.setMessage(LangCS.alertMsg004);
		//altObj.show();
		//return [null,target.getElementsByTagName('button')[0]];
		return [null,null];
	}
	
	if(selectedStorageType==5)
		mediaNum = 1;
	//var drives = MagicLine.GetMediaSubInfo(SubCountNumber);
	
	var __001_i = document.createElement('ul');
	__001_i.style.listStyle = 'none';
	__001_i.style.paddingLeft = '0px';
	__001_i.style.marginLeft = '40px';
	__001_i.id = 'drivePanel';
	__001_i.style.position='absolute';
	__001_i.style.zIndex = '+1';
	__001_i.style.backgroundColor='white';
	__001_i.style.border = 'solid 1px #CCC';
	__001_i.style.marginLeft = '40px';

	for (i=0; i<mediaNum;i++){
		var __002 = document.createElement('li');
		__001_i.appendChild(__002);
		
		var __002_01 = document.createElement('div');		
		__002_01.onclick = function(e){ 
			selectSubMediaName = this.getAttribute('subMediaName');
			if(selectedStorageType==2){
				//loadJavascript("./gpkisecureweb/ui/pinWindow.js",actionPassword,this);//(this);target.getElementsByTagName('button')[0]
				loadJavascript(gpkiScriptBase + "/ui/pinWindow.js",actionPassword,target.getElementsByTagName('button')[0]);//(
				var optPanel = document.getElementById('drivePanel');
				if(optPanel!=null && typeof(optPanel)!='undefined'){	
					
					if(target.parentNode.childNodes.length == 2){
						optPanel.parentNode.removeChild(optPanel);
						return [null,target.getElementsByTagName('button')[0]];
					}else{
						optPanel.parentNode.removeChild(optPanel);
					}
					
				}
			}else{			
				// 저장매체에서 인증서 가져오기
				if(!getCertList(this)){
					target.focus();
					return;					
				}
				
				//~! added by gomsugy. 2016.01.13.
				// 인증서 목록의 첫번째 열 선택.
				var certList = document.getElementById("dataList");
				if (certList.hasChildNodes())
					certList.childNodes[0].onclick();				
			}
		};
		__002_01.setAttribute('idx',i);
		__002_01.style.marginTop = '2px';
		__002_01.style.marginLeft = '2px';
		__002_01.style.padding = '0px 0px 0px 0px';
		__002_01.onfocus = function(e){this.style.backgroundColor='#E3E4FA'; };
		__002_01.onblur = function(e){this.style.backgroundColor='white'; };
		__002_01.onmouseover = function(e){
			this.style.cursor = 'pointer';
			this.style.backgroundColor='#E3E4FA'; 
			};
		__002_01.onmouseout = function(e){this.style.backgroundColor='white'; };
		
		var __002_02 = document.createElement('input');		
		__002_02.setAttribute('type','image');
		__002_02.setAttribute('src', gpkiScriptBase + '/image/certificate/cert/driver.png');
		__002_02.style.padding = '0px';
		__002_01.style.backgroundImage='url("'+gpkiScriptBase +'/image/certificate/cert/driver.png")' ;
		__002_01.style.backgroundRepeat='no-repeat';
		__002_01.style.backgroundPosition='4px 4px';
		__002_01.style.backgroundSize='16px 16px'; 
		__002_01.style.paddingLeft='30px';
		__002_02.style.height='0px';
		__002_02.style.width='0px';
		__002_02.onfocus = function(e){this.parentNode.style.backgroundColor='#E3E4FA'; };
		__002_02.onblur = function(e){this.parentNode.style.backgroundColor='white'; };
		__002_02.onmouseover = function(e){this.parentNode.style.backgroundColor='#E3E4FA'; };
		
		__002_02.onmouseout = function(e){this.parentNode.style.backgroundColor='white'; };
		
		__002_01.appendChild(__002_02);
		
		var dataVaule = GPKISecureWeb.GetMediaSubInfo(i);
		__001_i.style.width=((dataVaule.length<8)?'100px':(dataVaule.length<16)?'200px':(dataVaule.length<24)?'300px':'400px');					
		
		__002_01.setAttribute('subMediaName',dataVaule);
		__002_02.setAttribute('alt',dataVaule);
		__002_01.appendChild(document.createTextNode(dataVaule));	
		
		
		__002.appendChild(__002_01);
		
		if(i==0)
			focusElement =__002_02; 
	}
	
	return [__001_i,focusElement];
}

function onPhoneCertList(target){
	
	selectedStorageType = 5;
	
	var retObjs = showSubMemu(target);
	if(retObjs[0]!=null){	
		target.parentNode.appendChild(retObjs[0]);
		attachKeyboardNavigator(document.getElementById('drivePanel'));
	}
	
	return retObjs[1];	
}

function onPKCS12FileDialog(e){
	e = e||window.event;
	var target = e.target||e.srcElement;
	
	selectedStorageType = 6;
	GPKISecureWeb.SetMediaType(6);
	
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null && typeof(optPanel)!='undefined'){	
		
		if(target.parentNode.childNodes.length == 2){
			optPanel.parentNode.removeChild(optPanel);
			return [null,target.getElementsByTagName('button')[0]];
		}else{
			optPanel.parentNode.removeChild(optPanel);
		}
		
	}	
	
	var win = new CertSearchWindow(actionPassword);
	win.show(target);
}

function onSMTokenCertList(target){
		
	selectedStorageType = 2;		
	
	var retObjs = showSubMemu(target);
	if(retObjs[0]!=null){	
		target.parentNode.appendChild(retObjs[0]);
		attachKeyboardNavigator(document.getElementById('drivePanel'));
	}
	
	return retObjs[1];	
	/*
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null|| typeof(optPanel)=='undefined')
		optPanel.parentNode.removeChild(optPanel);
	
	selectedStorageType = 2;
	mycerts = new Array();
	mycerts[0] = new Array("0","805김제동003245","대검찰청","개인용","2014-08-21");
		
	onTableRefresh(target,mycerts);
	*/
}

function onSeTokenCertList(e){
	e = e||window.event;
	var target = e.target||e.srcElement;
	//target.setAttribute('sucessProcess',actionSeTokenSucess);	
	selectedStorageType = 3;
	
	loadJavascript(gpkiScriptBase + "/ui/SecureTokenWindow.js",actionSeToken,target);
	
	
	/*
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null|| typeof(optPanel)=='undefined')
		optPanel.parentNode.removeChild(optPanel);
	
	selectedStorageType = 3;
	mycerts = new Array();
	mycerts[0] = new Array("0","805이승기003245","행정안전부","개인용","2014-08-21");
	mycerts[1] = new Array("0","805박남정003245","행정안전부","개인용","2014-08-21");
		
	onTableRefresh(target,mycerts);
	*/
}

function actionSeToken(target){
	var win = new SecureTokenWindow(applyCertList);
	win.show(target);
}

function actionPassword(target){
	// 1. 패스워드 입력창 로드
	var winPW = new PinWindow(applyCertList);
	winPW.show(target);
}

function applyCertList(target){
	if(selectedStorageType==2){
		var nReturn = GPKISecureWeb.SetPINNumber(target.getAttribute('pin'));
		if( nReturn != 0 ){
			alert(LangCS.alertMsg005);
			//var altObj = new AlertWindow(__001);
			//altObj.setMessage(LangCS.alertMsg005);
			//altObj.show();
			target.focus();
			return ;
		}		
	}
	
	var action = target.getAttribute('action');
		
	if(action == 'end'){
		var optPanel = document.getElementById('drivePanel');
		if(optPanel!=null|| typeof(optPanel)=='undefined')
			optPanel.parentNode.removeChild(optPanel);
				
		if(!getCertList(target)){
			this.focus();
			return;
		}
		//mycerts = new Array();
		//mycerts[0] = new Array("0","805김수용003245","대검찰청","개인용","2014-08-21");
		//mycerts[1] = new Array("0","805김민수003245","행안부","개인용","2018-08-21");
			
		//onTableRefresh(this,mycerts);
	
		target.setAttribute('action','ready');
		attachKeyboardNavigator(document.getElementById("dataList"));
		
		//~! added by gomsugy. 2016.01.13.
		// 인증서 목록의 첫번째 열 선택.
		var certList = document.getElementById("dataList");
		if (certList.hasChildNodes())
			certList.childNodes[0].onclick();				
	}
	
	return;
}

var myInput;
function attachKeyboardNavigator(target){
	//var myInput = document.getElementById("dataList").getElementsByTagName("input");
			
	myInput = target.getElementsByTagName("input");

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

function onOKClickButton(){
		
	if(selectedRow == null){
		alert(LangCS.alertMsg001);
		//var altObj = new AlertWindow(__001);
		//altObj.setMessage(LangCS.alertMsg001);
		//altObj.show();
		return;
	}else if(document.getElementById('passwd').value.length == 0){
		alert(LangCS.alertMsg002);
		//var altObj = new AlertWindow(__002,clearPasswd);
		//altObj.setMessage(LangCS.alertMsg002);
		//altObj.show();
		return;
	}
	
	var cvalue = document.getElementById('passwd').value;
	//alert('password='+cvalue);
	
	// 인증서 인덱스 번호
	//alert('cert index='+selectedRow.getAttribute('CertIndex'));	
	
	
	var nResult = GPKISecureWeb.SelectCert(selectedRow.getAttribute('CertIndex'),(keysecOpt==1)?'':cvalue);
	
	if( nResult == 0 )
	{
		if(!embeded){
		document.getElementsByTagName("body")[0].removeChild(overlayCS);
		document.getElementsByTagName("body")[0].removeChild(__001);
	}
	
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;
		
		cipherAction();
	}else{
		// 예외처리
		if (selectedStorageType == 3)	// 보안토큰의 비밀번호가 틀렸을 경우
			alert(LangCS.alertMsg011);
		else
			alert(LangCS.alertMsg003);
		document.getElementById('passwd').value = "";
	} 

	 // 마우스 오른쪽 버튼 풀기
	 document.oncontextmenu = function (){ return true }; 
	 // 텍스트 드레그로 선택하기 풀기
	 document.ondragstart = function (){ return true };
	 document.onselectstart = function (){ return true };
}


function clearPasswd(){
	document.getElementById('passwd').value = '';
	document.getElementById('passwd').focus();
}

function onCancelClickButton(){
	var optPanel = document.getElementById('drivePanel');
	if(optPanel!=null|| typeof(optPanel)=='undefined')
		optPanel.parentNode.removeChild(optPanel);
		//document.getElementsByTagName("body")[0].removeChild(optPanel); 
	
	document.getElementsByTagName("body")[0].removeChild(overlayCS);
	document.getElementsByTagName("body")[0].removeChild(__001);
	if(clickElement!=null && typeof(clickElement)!='undefined')
		clickElement.disabled = false;
	
	 // 마우스 오른쪽 버튼 풀기
	 document.oncontextmenu = function (){ return true }; 
	 // 텍스트 드레그로 선택하기 풀기
	 document.ondragstart = function (){ return true };
	 document.onselectstart = function (){ return true };
	
}

var clickElement,keysecOpt,encfunc;

function keyHandler(e) {
	//var myInput = document.getElementById("dataList").getElementsByTagName("input");
		var target = e.target||e.srcElement;
		//var parent = target.parentNode.parentNode;
		//
		    		
    var TABKEY = 9;
    var Up = 38;
    var esc =27 ;
    var Down =40;
    if(e.shiftKey && e.keyCode == TABKEY){
//    	if(navigator.appName == "Microsoft Internet Explorer"){
		if (browserType == BROWSER_IE){
    		if(selectedStorageType==0)
    			document.getElementById('removeBtn').focus();
    		else
    			document.getElementById('stPhone').focus();
    	}else{
	   		if(e.preventDefault) {
	   			e.preventDefault();
	   		}
	   		if(selectedStorageType==0)
    			document.getElementById('removeBtn').focus();
    		else
    			document.getElementById('stPhone').focus();
    	}
    	return false;
   	} else if(e.keyCode == TABKEY) {
        //this.value += "    ";
        //if(e.preventDefault) {
        //  e.preventDefault();
//    	if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
    		if(selectedStorageType==0)
    			document.getElementById('smartBtn').focus();
    		else if(!embeded)
    			document.getElementById('searchBtn').focus();
    		else
    			clickElement.focus();
    	else{
    		if(e.preventDefault) {
    			e.preventDefault();
    		}
    		if(selectedStorageType==0)
    			document.getElementById('smartBtn').focus();
    		else if(!embeded)
    			document.getElementById('searchBtn').focus();
    		else
    			clickElement.focus();
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
    	if(e.preventDefault) {
   			e.preventDefault();
   		}
    	//alert('down');
    		var nextNode = target.getAttribute('nextElement');        	
    		if(nextNode!=null && typeof(nextNode)!='undefined'){
    		  myInput[nextNode].focus(); 
    		}
    		
    		// 상하 화살표 키로 인한 Scroll 이동 방지
    		if(e.preventDefault) {
       			e.preventDefault();
       		}else{
       			return false;
       		}
    }else if(e.keyCode == esc){
      var target = document.getElementById('drivePanel');
    	if(target!=null && typeof(target.id)!='undefined' ){
    		var parentElement = target.parentNode;
    			
    			target.parentNode.removeChild(target);
    			parentElement.getElementsByTagName('button')[0].focus();
    	}    			
    }
}

function pwdEnterEvent(event) 
{
	if (event == undefined)
		event = window.event;

	// Enter Key
	if (event.keyCode == 13)
	{
		onOKClickButton();
	}
	else
		return;
}

	return{
		setKeyboardSec : function(opt,mEncfunc){
				keysecOpt = opt;
				encfunc = mEncfunc;
		},
		startAction : function(){
			onOKClickButton();
		},			
		show : function(element){
			popupflag = 1;
			overlayCS.style.display='';
			__001.style.display='';	
			if(!embeded)
				win.show('popup', 'popup_drag', 'screen-center', 0, 0,'');
			
			if(element!=null && typeof(element)!='undefined')
				clickElement = element;
			firstFocusElement.onclick();
			
			return __001;
					
		},
		dispose : function(){
			overlayCS.style.display='none';
			__001.style.display='none';
		} 	
		
	}

}