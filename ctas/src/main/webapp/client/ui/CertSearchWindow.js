

CertSearchWindow =function (certObj) {
	var popupflag = 1;
	var focusElement = new Array();
	loadJavascript(gpkiScriptBase + "/ui/pinWindow.js",loadedWin,null);	
	loadJavascript(gpkiScriptBase + "/ui/CertSearchWindow",loadedWin,'ko-KR.js');
	
	var fileSeperator = '\\';
	
	if (navigator.appVersion.indexOf("Win")==-1)
		fileSeperator = '/';
	
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
	var ds_CSW_myInput = new Array();
	var selectedFilePathType = 0;
	
	
	function loadJavascript(URL,callback,langSt,event) { 
		
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
	            eval(xmlhttp.responseText);
	            //LangR = eval(LangR);
	            
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
	    
	    //return eval(responseText);

	    // 가져온 xmlhttp 객체의 responseText 값을 반환 
	    //return ; 
	}
	function errorWin(){}

	var windowRoot;
	loadJavascript(gpkiScriptBase + "/ui/common.js",errorWin);
	var LangR = loadJavascript(gpkiScriptBase + "/ui/certviewR",errorWin,"ko-KR.js");
	
	var __001 = document.createElement("div");
	//__001.style.border = 'dashed 1px red';
	__001.id = 'f_popup';
	__001.style.zIndex = '+1';
	__001.style.width='634px';
	__001.style.visibility ='hidden';
	__001.style.textAlign = 'center';
	__001.style.borderRadius = '6.0px';	
	__001.style.display ='none';
	
	var __002 = document.createElement("div");
	//__002.style.border = 'dashed 1px red';
	__002.id = 'f_popup_drag';
	__002.style.backgroundColor='gray';
	__002.style.height ='24px';
	__002.style.width = '634px';
	__002.style.background = 'url("' + gpkiScriptBase + '/image/certificate/pop_tit_bg_02.png")';
	__002.style.borderBottom ='0px';
	__002.style.fontcolor ='white';
	//__002.style.cursor = 'default';
	//__002.style.verticalAlign='middle';
	__002.style.font='normal bold 13px "맑은고딕", Malgun Gothic, Dotum, Verdana, sans-serif';
	//__002.style.color="white";
	
	__002.appendChild(document.createTextNode(LangCSW.title));
	
	__001.appendChild(__002);
	
	loadJavascript(gpkiScriptBase + "/ui/common.js",loadedWin);
		
	__001.appendChild(init());
	
	var overlay = document.createElement('div');
	overlay.id = 'CertSearchOverlay';
	var _resizeOverlayFunction;
	overlay.style.zIndex = '524287';
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
	
	__001.style.zIndex = '524288';
	document.getElementsByTagName("body")[0].appendChild(__001);
	
	refreshPath('root');
	
function onCertAlert( ){
	
}
var win;
function loadedWin(){
	//win = new Dialog();	
}	

var selectedRow, selecteRowNum ;

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
	};	
}

/* 데이터 테이블 라이브러리 */
function  createSecurityRow(parent,columns,isheader){
	var pElement, totalString,__001;
	totalString = '';
	
	if(isheader)
		pElement = parent;
	else{		
		pElement = document.createElement('div');
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
			
			setSelectedMark(this,'#E3E4FA');
			this.style.cursor = 'pointer';
		};		
		
		parent.appendChild(pElement);
	}
	
	var filetype;
	for(var i=0; i<columns.length; i++){
		var __003_01 = document.createElement('div');
		__003_01.style.fontSize='11px';
		__003_01.style.height='20px';
		//__003_01.style.border = 'dashed 1px red';
		if(i==0)
			__003_01.style.width = '30px';
		else
			__003_01.style.width = '160px';
		
//		if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
			__003_01.style.styleFloat = 'left';
		else
			__003_01.style.cssFloat = 'left';
		__003_01.style.textAlign = 'left';
		__003_01.style.overflow = 'hidden';
		
		if(i==0 && !isheader){
			__003_01.style.paddingLeft = '8px';
			__003_01.style.paddingTop = '3px';
			var imgElement = document.createElement('input');
			//imgElement.setAttribute('type','text');
			imgElement.setAttribute('type','image');
			//imgElement.setAttribute('src','/MagicLine5/img/cert/on.png');
			//imgElement.value = columns[i];
			var fileName = ((columns[i]==0)?'driver':(columns[i]==1)?'Folder':'file');
			imgElement.setAttribute('src', gpkiScriptBase + '/image/certificate/cert/'+fileName+'.png');
			filetype = columns[i];
			imgElement.setAttribute('filetype',columns[i]);
			if(parent == document.getElementById('leftNavi'))
				imgElement.setAttribute('selectedFilePathType',0);
			else
				imgElement.setAttribute('selectedFilePathType',1);
				
			imgElement.onclick = function(){
				selectedFilePathType = this.getAttribute(selectedFilePathType); 
				if(selectedRow==this.parentNode.parentNode) 
					return; 
				else 
					selectRow(this.parentNode.parentNode);
			};
			imgElement.onfocus = function(){
				selectedFilePathType = this.getAttribute(selectedFilePathType);
				setReleaseSectedMark(this.parentNode.parentNode);
				
				if(selectedRow==this.parentNode.parentNode)
					return;
				setSelectedMark(this.parentNode.parentNode,'#E3E4FA');
				
			};							
				
			__001 = imgElement; 
			__003_01.appendChild(imgElement);
		}else{
			__003_01.style.paddingLeft = '8px';
			__003_01.style.paddingTop = '3px';
			__003_01.setAttribute('filetype', filetype)
			__003_01.appendChild(document.createTextNode(columns[i]));
		}
		
			
		
		
		if(i!=0 && i!=5)
			totalString += columns[i]+" "+fileName;
		
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
			__003_02.style.backgroundColor = '#F4F4F4';
			//__003_02.style.border = 'solid 1px black';
			__003_02.style.width='0px';			
			//
			pElement.appendChild(__003_02);		
		}else{
			var __003_02 = document.createElement('div');
			__003_02.style.clear = 'both';
			pElement.appendChild(__003_02);
			
		}	
	}
	
	if(__001 !=null && typeof(__001)!='undefined')	{	
		if(pElement.parentNode.childNodes.length==1){	
				var desc = (popupflag==1)?'파일,폴더 목록 리스트입니다. 두개의 폴더,파일목록이 준비되어 있으며, 하나는 상위 폴더목록만 표시하며, 다른 하나에서는 상위폴더 목록에서 선택한 폴더/드라이브에 속하는 하위 폴더와 파일 목록이 표시됩니다. Tab키를 이용하여 두개  목록을 이동할 수  있습니다.  ':'';
				var selectParent = '현재 선택된 경로는 '+document.getElementById('filePath').value+'입니다. 상하키로 드라이브,파일  목록을 선택하세요.';
				totalString = desc+selectParent+totalString;
				popupflag=0;
			}
		__001.setAttribute('title', totalString);
	}
	
	pElement.setAttribute('title', totalString);
	return pElement; 
}

/* 
function  createSecurityRow(parent,columns,isheader){
	var pElement;
	
	var __003 = document.createElement('div');
	
	if(!isheader){
		var accessObj = document.createElement('a');
		accessObj.href = '#';
		__003.appendChild(accessObj);
		pElement = accessObj;
	}else{
		pElement = __003;
	}
	parent.appendChild(__003);
		
	
	for(i=0; i<columns.length; i++){
		var __003_01 = document.createElement('div');
		if(i==0)
			__003_01.style.width = '30px';
		else
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
			__003_02.style.backgroundColor = 'white';
			__003_02.style.width='1px';
			__003_02.innerHTML = '&nbsp';
			pElement.appendChild(__003_02);		
		}else{
			var __003_02 = document.createElement('div');
			__003_02.style.clear = 'both';
			pElement.appendChild(__003_02);
			
		}	
	}	
	return __003;
}}
*/
function clearRemainData(parent,remainData){
		// # 영역별 이전 데이터 삭제
	for(i=0; i<remainData.length;i++)
		parent.removeChild(remainData[i]);
}

function upDirPath(currentPath){
	var upPath =''; 
	var dirs = currentPath.split(fileSeperator);
	if(dirs.length == 1)
		return '';
	
	for(i=0; i<(dirs.length-1);i++){
		if(i==(dirs.length-2))
			upPath += dirs[i];
		else
			upPath += dirs[i]+fileSeperator;
	}
	
	return upPath;	
}

var remaindata ;

function refreshPath(fileName){
	if(remaindata==null||typeof(remaindata)=='undefined')
		remaindata = new Array();
	
	var __001_01 = document.getElementById('filePath');
	__001_01.onfocus = function(){
		if(this.childNodes.length != 0){
			this.childNodes[0].focus();
			selectedFilePathType = 1;
		}
	};
	var __002_01 = document.getElementById('leftNavi');
	__002_01.onfocus = function(){
		if(this.childNodes.length != 0){
			this.childNodes[0].focus();
			selectedFilePathType = 0;
		}
	};
	
	var leftData = new Array();
	// # 1영역 업데이트( Full File Path)
	if(fileName=='root'){
		__001_01.value = getFileList(fileName)[0][1];
		__001_01.value = (__001_01.value.indexOf('(')>-1)?__001_01.value.substring(__001_01.value.indexOf('(')+1,__001_01.value.indexOf(')')):__001_01.value;
		leftData = getFileList(fileName);
	}else{
		__001_01.value = fileName;
		var parentElement = upDirPath(fileName);
		leftData = getFileList(parentElement==''?'root':parentElement);
	}
	var dirs = fileName.split(fileSeperator);
		//  # 2 3 영역 remain 데이터 삭제
	if(remaindata!=null && remaindata.length ==2)
		clearRemainData(__002_01,remaindata[0]);
	
	
	// # 2영역 업데이트	  Diretory Navigator  )
	var preLeftFileList = new Array();
	var fileList = leftData;
	var count = 0;
	//var focusElement;
	for(var j=0;j<fileList.length;j++){
		if(fileList[j][0]!='1' && fileList[j][0]!='0')
			continue;
				
		preLeftFileList[count] = createSecurityRow(__002_01,fileList[j],false);
		
		if(dirs.length==1 && dirs[0]=='root')
			focusElement[0] = preLeftFileList[0].childNodes[0].getElementsByTagName('INPUT')[0];
		else {
			var tmp = preLeftFileList[count].childNodes[2].innerHTML;
			tmp = (tmp.indexOf('(')>-1)?tmp.substring(tmp.indexOf('(')+1,tmp.indexOf(')')+1):tmp;
			if(dirs[dirs.length-1]==tmp)
				focusElement[0] = preLeftFileList[count].childNodes[0].getElementsByTagName('INPUT')[0];
		}	
			
		count++;
	}
	remaindata[0] = preLeftFileList;	
	
	//focusElement.focus();
	
	// # 3영역 업데이  ( File Navigator ))
	var parentPath = fileName=='root'?fileName:upDirPath(fileName);
	var selectfileName = (fileName=='root')?fileList[0][1].substring(fileList[0][1].indexOf('(')+1,fileList[0][1].indexOf(')')):fileName.split(fileSeperator)[fileName.split(fileSeperator).length-1];
	
	remaindata[1] = refreshLeftDirs(parentPath,selectfileName);
	
	selectedFilePathType = 0;
	attachKeyboardNavigator(document.getElementById("leftNavi"));
	selectedFilePathType = 1;
	attachKeyboardNavigator(document.getElementById("fileList"));
	
	popupflag = 0;
	
}

function refreshRightDirs(filetype,fileNames){
	var __002_01 = document.getElementById('filePath');	
	//__002_01 = (__002_01.indexOf(':(')>-1)?__002_01.substring(0,__002_01.indexOf(':\(')+1):__002_01;
	
	if(filetype=='1'){
		// #1,3영역 업데이트
		var folders  = __002_01.value.split(fileSeperator);
		var moveFolder ='';
		//if(folders.length<2){
			moveFolder = __002_01.value+fileSeperator+fileNames;
		//}else{
		//	for(i=0; i<(folders.length-1); i++)
		//		moveFolder +=folders[i]+fileSeperator;
		//}		
		
		refreshPath(moveFolder);
		return false;
	}else{
		selectPath =  __002_01.value+fileSeperator+fileNames;	
		document.getElementById('ds_cs_Ok').onclick();
		return true;
	}	
}

function refreshLeftDirs(parentPath,fileNames){
	
	//var columnData = new Array();
	var __002_01 = document.getElementById('filePath');
	var __003_02 = document.getElementById('fileList');	
	
	var columnData;
	
	// #1 영역 업데이트
	var parentPath = upDirPath(__002_01.value);
	__002_01.value = ((parentPath!='')?parentPath+fileSeperator:'')+fileNames;
	__002_01.value = (__002_01.value.indexOf('(')>-1)?__002_01.value.substring(__002_01.value.indexOf('(')+1,__002_01.value.indexOf(')')):__002_01.value;
	var inputPath = __002_01.value;
	/*
	if(parentPath!=inputPath){
		if(parentPath=='내컴퓨터' ||parentPath=='root')
			__002_01.value = fileNames;
		else
			__002_01.value = parentPath+fileNames;	
	}
		*/
	// #3 영역 업데이트	
	//1) 기존 데이터 삭제	
	if(remaindata.length==2){
		var __003_01 = document.getElementById('fileList');
		clearRemainData(__003_01,remaindata[1]);
	}
	/*
	
	if((preRightFileList!=null && typeof(preRightFileList)!='undefined') && preRightFileList.length!=0){
		for(i=0; i<preRightFileList.length;i++)
			__003_02.removeChild(preRightFileList[i]);			
	}*/
	
	//2) 파일 리스트 추가
	var preRightFileList = null;
	preRightFileList =  new Array();
	var rightAreaFiles = getFileList(__002_01.value);
	
	for(j=0;j<rightAreaFiles.length;j++){
		preRightFileList[j] = createSecurityRow(__003_02,rightAreaFiles[j],false);
	}
	remaindata[1] = preRightFileList;
	
	if(preRightFileList[0]!=null && typeof(preRightFileList[0])!='undefined')
		focusElement[1] = preRightFileList[0].getElementsByTagName('INPUT')[0];
	
	return preRightFileList;
}

var preLeftFileList ;//= new Array();



var isFileDialog = false;
var selectPath ='';

function init(){
	
	if(isFileDialog)
		return;
	else
		isFileDialog = true;
	
	var winRoot = document.createElement('div');
	//winRoot.style.paddingLeft = '0px';
	winRoot.style.marginLeft = '0px';
	winRoot.id = 'fileDialog';
	winRoot.style.backgroundColor = '#F4F4F4';
	winRoot.style.width ='632px';
	//winRoot.style.width ='630px';
	winRoot.style.border = '1px solid #CCC';
		
	var __001 = document.createElement('div');
	//__001.style.border = 'dashed 1px red';
	winRoot.style.textAlign = 'left';
	__001.style.marginLeft = '8px';
	__001.style.width ='618px';
	winRoot.appendChild(__001);
	
	
	var __002 = document.createElement('div');	
	__002.style.marginTop = '15px';
	__002.style.textAlign = 'left';
	//__002.style.width = '632px';
	//__002.style.border = 'solid 1px red';
	__001.appendChild(__002);
	
	var __002_00 = document.createElement('Label');
	//
	__002_00.appendChild(document.createTextNode(LangCSW.totalPath));
	__002.appendChild(__002_00);
	
	
	var __002_01 = document.createElement('input');
	__002_01.readOnly = 'true';
	//__002_01.style.border = 'dashed 1px red';
	__002_01.id = 'filePath';
	__002_01.value = '내컴퓨터';
	__002_01.style.marginLeft = '5px';
	__002_01.style.width = '430px';
	__002.appendChild(__002_01);
	
	var __002_02 = document.createElement('button');
	__002_02.id ='toUpDir';
	//__002_02.style.border = 'dashed 1px red';
	__002_02.style.padding = '0px 0px 0px 0px';
	__002_02.style.textAlign = 'center';
	__002_02.style.width = '70px';
	__002_02.style.height = '29px';
	__002_02.style.marginLeft = '5px';
	__002_02.style.borderRadius = '6.0px';	
	__002_02.style.border = '1px solid #BBB';
	__002_02.style.fontSize = '12px';
	//__002_02.style.marginRight = '0px';
	//__002_02.style.width = '45px';
	__002_02.appendChild(document.createTextNode(LangCSW.upperStr));
	__002_02.onclick = function(){
		if(__002_01.value.split(fileSeperator).length==1)
			return;
		var parentPath =upDirPath(__002_01.value);		
		refreshPath(parentPath);
		
		selectedFilePathType = 0;
		attachKeyboardNavigator(document.getElementById("leftNavi"));
		selectedFilePathType = 1;
		attachKeyboardNavigator(document.getElementById("fileList"));
		
		focusElement[0].focus();
		focusElement[1].focus();
	}
	//__002.appendChild(__002_02);
	
	var __002_03 = document.createElement('div');
	__002_03.style.height = '10px';
	__002.appendChild(__002_02);
		
	
	var __003 = document.createElement('div');
	
	__003.style.marginTop = '15px';
	//__003.style.width = '632px';
	__001.appendChild(__003);
	
	//var columnData1 = new Array();
	//columnData1[0] = [0,'c:\\'];
	//columnData1[1] = [0,'d:\\'];
		
	var __003_01 = document.createElement('div');
	//__003_01.style.border = '1px dashed red';
	__003_01.style.width = '301px';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_01.style.styleFloat = 'left';
	else
		__003_01.style.cssFloat = 'left';
	__003.appendChild(__003_01);
	
	var __003_01_00 = document.createElement('div');
	__003_01_00.style.height = '20px';
	__003_01_00.appendChild(document.createTextNode(LangCSW.leftStr));
	__003_01.appendChild(__003_01_00);
	
	
	var __003_01_01 = document.createElement('div');
	__003_01_01.id = 'leftNavi';		
	__003_01_01.style.width = '298px';
	__003_01_01.style.height = '280px';
	__003_01_01.style.border = '1px solid #CFCFCF';
	__003_01_01.style.overflowY ='scroll';
	__003_01_01.style.overflowX ='hidden';
	__003_01.appendChild(__003_01_01);
	
	var __003_02 =  document.createElement('div');
	//__003_02.style.border = '1px dashed red';
	__003_02.style.width = '302px';
//	if(navigator.appName == "Microsoft Internet Explorer")
	if (browserType == BROWSER_IE)
		__003_02.style.styleFloat = 'left';
	else
		__003_02.style.cssFloat = 'left';
	__003_02.style.marginLeft = '10px';
	__003.appendChild(__003_02);
	
	var __003_02_00 =  document.createElement('div');
	__003_02_00.appendChild(document.createTextNode(LangCSW.rightStr));
	
	__003_02_00.style.height = '20px';
	__003_02.appendChild(__003_02_00);
	
	var __003_02_01 =  document.createElement('div');
	__003_02_01.style.overflowY ='scroll';	
	__003_02_01.style.overflowX ='hidden';
	__003_02_01.id = 'fileList';		
	__003_02_01.style.width = '300px';
	__003_02_01.style.height = '280px';
	__003_02_01.style.border = '1px solid #CFCFCF';
	
	__003_02.appendChild(__003_02_01);
	
	__003_01_01.onclick = function(e){
		e = e|| window.event;
		var target = e.target || e.srcElement;
		
		if(target.id!=null && target.id=='leftNavi')
			return;
		
		var inputPath = __002_01.value;//filetype,target.parentNode.childNodes[2].innerHTML
				
		if(target.nodeName=='INPUT')
			target = target.parentNode;
		
		if(target.parentNode.childNodes[2].innerHTML.split(fileSeperator).length <=2){
			refreshLeftDirs('root',target.parentNode.childNodes[2].innerHTML);
		}else{			
			refreshLeftDirs(inputPath,target.parentNode.childNodes[2].innerHTML);
		}
		selectedFilePathType = 0;
		attachKeyboardNavigator(document.getElementById("leftNavi"));
		selectedFilePathType = 1;
		attachKeyboardNavigator(document.getElementById("fileList"));
	};
	var retunrPath;
	__003_02_01.onclick = function(e){
		e = e|| window.event;
		var target = e.target || e.srcElement;
		if(target.id!=null && target.id=='fileList')
			return;
		
		var filetype = target.getAttribute('filetype');
		if(target.nodeName=='INPUT')
			target = target.parentNode;
		
		if(filetype!=null && typeof(filetype)!='undefined'){
			var isSelected = refreshRightDirs(filetype,target.parentNode.childNodes[2].innerHTML);
			if(isSelected) return;
			
		}
		
		selectedFilePathType = 0;
		attachKeyboardNavigator(document.getElementById("leftNavi"));
		selectedFilePathType = 1;
		attachKeyboardNavigator(document.getElementById("fileList"));		
		
		focusElement[0].focus();
		focusElement[1].focus();
	}
	
	var __003_03 =  document.createElement('div');
	__003_03.style.clear = 'both';
	__003.appendChild(__003_03);
		
	var __004 = document.createElement('div');
//	__004.style.marginTop = '10px';
	__004.style.textAlign = 'center';
	__001.appendChild(__004);
	
	var __004_01 = document.createElement('button');
	__004_01.id ='ds_cs_Ok';
	__004_01.style.width = '100px';
	__004_01.style.height = '29px';
	__004_01.style.borderRadius = '6.0px';	
	__004_01.style.border = '1px solid #BBB';
	__004_01.style.marginTop = '10px';
	__004_01.style.marginBottom = '10px';

	//__004_01.style.background = " url('img/g_btn_100.gif')";
	
	__004_01.appendChild(document.createTextNode(LangCSW.okStr));
	__004_01.onclick = function(){
		if(selectPath==null || selectPath.length==0){
			alert(LangCSW.errMsg001);
			return ;
		}
		clickElement.setAttribute('action','end');
		document.getElementsByTagName("body")[0].removeChild(document.getElementById('CertSearchOverlay'));
		document.getElementsByTagName("body")[0].removeChild(document.getElementById('f_popup'));
		isFileDialog = false;
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;	
		//alert(selectPath);
		clickElement.setAttribute('filePath',selectPath);
		clickElement.focus();
		//alert(selectPath);
		
		callback(clickElement);
	};
	__004.appendChild(__004_01);
	
	var __004_02 = document.createElement('button');
	__004_02.style.width = '100px';
	__004_02.style.height = '29px';
	__004_02.style.marginLeft = '15px';
	__004_02.style.marginTop = '10px';
	__004_02.style.marginBottom = '10px';
	__004_02.style.borderRadius = '6.0px';	
	__004_02.style.border = '1px solid #BBB';
	
	//__004_02.style.background = " url('img/g_btn_100.gif')";

	__004_02.appendChild(document.createTextNode(LangCSW.cancelStr));
	__004_02.onclick = function(){
		clickElement.setAttribute('action','end');
		document.getElementsByTagName("body")[0].removeChild(document.getElementById('CertSearchOverlay'));
		document.getElementsByTagName("body")[0].removeChild(document.getElementById('f_popup'));
		isFileDialog = false;
		if(clickElement!=null && typeof(clickElement)!='undefined')
			clickElement.disabled = false;		
		};
	__004.appendChild(__004_02);
	
	return winRoot;
	
}

function getFileList(filePath){
	var returnObj = new Array();
	
	//alert(filePath);
	GPKISecureWeb.SetSearchFile(filePath,'pfx');
	
	
	var dCount =0;
	if(filePath=='root')
		dCount = GPKISecureWeb.GetFileCount(0);
	else
		dCount = GPKISecureWeb.GetFileCount(1);
	var fCount = GPKISecureWeb.GetFileCount(2);
	
	for(var i=0;i<(dCount+fCount);i++){
		if(i<dCount)
			returnObj[i] = [((filePath=='root')?0:1),GPKISecureWeb.GetFileList((filePath=='root')?0:1,i)];
		else
			returnObj[i] = [2,GPKISecureWeb.GetFileList(2,i-dCount)];
	}
	return returnObj;	
}


var clickElement;


function attachKeyboardNavigator(target){
	//var myInput = document.getElementById("dataList").getElementsByTagName("input");
	ds_CSW_myInput[selectedFilePathType] = target.getElementsByTagName("input");
	var myInput = ds_CSW_myInput[selectedFilePathType];

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
	//var myInput = document.getElementById("dataList").getElementsByTagName("input");
		var target = e.target||e.srcElement;
		//var parent = target.parentNode.parentNode;
		    		
    var TABKEY = 9;
    var Up = 38;
    var Down =40;
    
    var areaType = target.getAttribute('selectedFilePathType');
    
    if(e.shiftKey && e.keyCode == TABKEY){
    	
//    	if(navigator.appName == "Microsoft Internet Explorer"){
		if (browserType == BROWSER_IE){
    		if(areaType==0)
    			document.getElementById('toUpDir').focus();
    		else{
    			var parent = document.getElementById('leftNavi');
    			parent.childNodes[0].getElementsByTagName('input')[0].focus();
    		}
    	}else{
	   		if(e.preventDefault) {
	   			e.preventDefault();
	   		}
	   		if(areaType==0)
    			document.getElementById('toUpDir').focus();
    		else{
    			var parent = document.getElementById('leftNavi');
    			parent.childNodes[0].getElementsByTagName('input')[0].focus();
    		}
    			
    	}
    	return false;
   	} else if(e.keyCode == TABKEY) {
        //this.value += "    ";
        //if(e.preventDefault) {
        //  e.preventDefault();
   		
//    	if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
    		if(areaType==0){
    			var parent = document.getElementById('fileList');
    			parent.childNodes[0].getElementsByTagName('input')[0].focus();
    		}
    		else
    			document.getElementById('ds_cs_Ok').focus();
    	else{
    		if(e.preventDefault) {
    			e.preventDefault();
    		}
    		if(selectedFilePathType==0){
    			var parent = document.getElementById('fileList');
    			parent.childNodes[0].getElementsByTagName('input')[0].focus();
    		}
    		else
    			document.getElementById('ds_cs_Ok').focus();
    	}
    	
          // if(!isfocus )
        	//   document.getElementById('searchBtn').focus();
        //}
        return false;
    }else if(e.keyCode == Up) {
    	//alert('up');    	
    	var preNode = target.getAttribute('preElement');        	
    	if(preNode!=null && typeof(preNode)!='undefined')
    		ds_CSW_myInput[areaType][preNode].focus();
    	
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
    			ds_CSW_myInput[areaType][nextNode].focus(); 
    		}
    		
    		// 상하 화살표 키로 인한 Scroll 이동 방지
    		if(e.preventDefault) {
       			e.preventDefault();
       		}else{
       			return false;
       		}
    }
}
	return{
	
		show : function(element){
			
			overlay.style.display='';
			__001.style.display='';
			
			element.setAttribute('action','process');
			new Dialog().show('f_popup', 'f_popup_drag', 'screen-center', 0, 0,'');
			if(element!=null && typeof(element)!='undefined')
				clickElement = element;
			focusElement[0].focus();
			focusElement[1].focus();
			document.getElementById('filePath').focus();
			return 001;
		},
		dispose : function(){
			overlay.style.display='none';
			__001.style.display='none';
		}
	}
}