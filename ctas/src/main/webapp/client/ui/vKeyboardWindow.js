vKeyboard = function(dummy,pwElement,encFunc,sessionid){
var passwdElement = pwElement?pwElement:null;
var params = new Array();

var RequestSKeyboard = encFunc;
var isInit=1;

function loadJavascript(URL,callback,charet) { 
	
    
    var xmlhttp = null; 
   
    if(window.XMLHttpRequest) { 
       
        xmlhttp = new XMLHttpRequest(); 
    } else { 
       
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
    } 

  
    xmlhttp.open('GET', URL,false); 

  
    xmlhttp.onreadystatechange = function() { 

     
        if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
         
        	clearTimeout(xmlHttpTimeout); 
            responseText = xmlhttp.responseText;
            if(callback!=null && typeof(callback)!='undefined')
            		callback(xmlhttp.responseText);
          
            
        } 
    } 
    xmlhttp.send('');
    
    var userAgent = navigator.userAgent;
  
	if(xmlhttp.readyState==4 && xmlhttp.status == 200 && xmlhttp.statusText=='OK') { 
        // responseText 에 값을 저장    
        //eval(xmlhttp.responseText);     
				clearTimeout(xmlHttpTimeout); 
        if(callback!=null && typeof(callback)!='undefined')
            		callback(xmlhttp.responseText);
    }

	var xmlHttpTimeout=setTimeout(ajaxTimeout,10000);
	function ajaxTimeout(){
	   xmlhttp.abort();
	 
	}
    
}

function errorWin(){}

var randomPoints;
    
function init(){
	var __001 = document.createElement("div");
	__001.style.border = 'dashed 1px red';
	__001.id = 'vk_popup';
	//__001.style.zIndex = '+1';
	__001.style.width='382px';
	__001.style.visibility ='hidden';
	//__001.style.textAlign = 'center';
	__001.style.borderRadius = '6.0px';	
	__001.style.display ='none';
	
	var __002 = document.createElement("div");
	//__002.style.border = 'dashed 1px red';
	__002.id = 'vk_popup_drag';
	__002.style.backgroundColor='gray';
	
	//__002.style.background = " url('image/cert_bg_title.png')";
	__002.style.borderBottom ='0px';
	__002.style.fontcolor ='white';
	//__002.style.cursor = 'default';
	//__002.style.verticalAlign='middle';
	__002.style.fontSize='16px';
	__002.style.color="white";
	
	if(passwdElement!=null && typeof(passwdElement)=='undefined'){
		__002.style.height ='24px';
		__002.appendChild(document.createTextNode("가상 키보드"));
	}
	
	__001.appendChild(__002);
	//__001.appendChild(setupKeyboard());
	
	
	var overlay = document.createElement('div');
	var _resizeOverlayFunction;
	overlay.style.zIndex = '524296';
    overlay.onclick = null;
	
    	overlay.style.position = 'absolute';
    	overlay.style.width = '100%';
    	overlay.style.height = '100%';
	
   	overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.display = 'none';
    overlay.style.opacity = 0.5;
    overlay.style.filter = "alpha(opacity='50')";
    overlay.style.backgroundColor = 'gray';
    
    document.getElementsByTagName("body")[0].appendChild(overlay);
	
	loadJavascript(gpkiScriptBase + "/ui/common.js",eval);
	
	__001.style.zIndex = '524299';
	document.getElementsByTagName("body")[0].appendChild(setupKeyboard());	
		
}

function setupKeyboard(){
	
	var __001 = document.createElement("div");
	__001.id = 'vkeyboard';
	__001.style.backgroundColor='#F4F4F4';
	__001.style.marginLeft = '-5px';
	__001.style.marginTop = '-3px';
	//__001.style.display='none';
	//__001.style.zIndex = '524294';
	__001.style.position = 'absolute';
	//__001.style.top = '35px';
	__001.style.width='378px';
	__001.style.border = 'solid 1px #D1D1D1';
	
	if(passwdElement!=null && typeof(passwdElement)=='undefined'){
		var __002 = document.createElement("input");
		__002.id='mainpasswd';
		__002.setAttribute("type",'password');
		__002.style.width='130px';
		__002.style.marginLeft = '5px';
		
		__002.style.value='';
		__001.appendChild(__002);
		
		passwdElement = __002;
	}
	
	var __002_0 = document.createElement("input");
	__002_0.style.marginLeft ='10px';
	__002_0.style.border ='0px solid #CCC';
	__002_0.style.backgroundColor = '#F4F4F4';
	__002_0.style.width = '170px';
	__002_0.value = 'GPKI Secure Keyboard';
	__002_0.disabled = true;
	__001.appendChild(__002_0);
	
	var __002_1 = document.createElement("img");
	__002_1.setAttribute('src', gpkiScriptBase + '/image/certificate/btn_refrash_on.png');
	__002_1.style.marginLeft = '110px';
	__002_1.onclick=function(e){refreshKeyBoard()};
	__001.appendChild(__002_1);
	
	var __002_2 = document.createElement("img");
	__002_2.setAttribute('src', gpkiScriptBase + '/image/certificate/pc/btn_close_on.png');
	__002_2.onclick=function(e){closeKeyboard()};
	__002_2.style.marginLeft = '10px';
	//__001.appendChild(__002_2);
	
	var __003 = document.createElement("img");
	__001.style.position = 'absolute';
	__003.id = 'keyboard';
	__003.style.width = '380px';
	__003.style.height = '112px';
	
	
	params[0] = 'none';
	params[1] = true;
	params[2] = dummy++;
	params[3] = sessionid;
	
	gpSessionId = sessionid;
	RequestSKeyboard[0](__003,params);
	//__003.setAttribute('src','./requestSecureKeyboard.asp?func=none&change=true&dummy='+dummy++);
	//__003.onclick=function(event){clickPoint(event);}
	__003.onload = function(){
		params = new Array();
		params[0] = 10248;

		var link = document.createElement('a');
		var forwardLink = './pleaseDSKeySecure';

// 		if ((navigator.userAgent.indexOf('MSIE') > -1) || (navigator.userAgent.toLowerCase().indexOf('trident') > -1))
		if (browserType == BROWSER_IE)
			forwardLink = location.href.substr(0,location.href.lastIndexOf('/'))+'/pleaseDSKeySecure';
		
		forwardLink += '.'+addPageExt();
		link.href = forwardLink +'?func=10248';		
		
		RequestSKeyboard[1](link,false,sessionid);	

		var encdata = link.href.substr(link.href.indexOf('?')+1,link.href.length);
		
		loadJavascript(forwardLink+'?'+encdata,setVKInit,false);
	}
	__003.onclick=function(event){var e=event?event:window.event; clickPoint(e)};
	__001.appendChild(__003);
	
	//__003.onload=function(){
		
	//}
	return __001;
}

function clickPoint(e){
	//alert(document.getElementById("vk_popup").offsetLeft+" "+document.getElementById("vk_popup").offsetTop);
	var typePosition = point_it(e);
		
	if(typePosition[0]>=12){
		switch (typePosition[1]) {
			case 0:
				// del
				var predata = passwdElement.value;
				passwdElement.value = predata.substring(0,predata.length-1);
				RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
				break;
			case 1:
				// all clear
				passwdElement.value ='';
				RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
				break;
			case 2:
				// symbol
				funs[2] = funs[2]?false:true;
				var funcName = funs[2]?'symbol':(funs[0]||funs[1])?(funs[0]&&funs[1])?'none':'shift':'none';
				
				var capsShift = funs[0]?"1":"0";
				capsShift += funs[1]?"1":"0";
				
				params[0] = funcName+"_"+capsShift;				
				params[1] = false;
				params[2] = dummy++;
				params[3] = sessionid;
				
				gpSessionId = sessionid;
				RequestSKeyboard[0](document.getElementById('keyboard'),params);
				RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);				
				//var imgObj = document.getElementById('keyboard');
				//imgObj.setAttribute('src', './requestSecureKeyboard.asp?func='+funcName+'&change=false&dummy='+dummy++);
				break;
			case 3:
				// enter 
				//document.getElementById('mainpasswd').value = '';		
				//passwdElement.value='';		
				//var result = document.getElementById('passwd');				
				//certpasswdElement.value = loadJavascript('/KeyResult',null,false);
				
				//alert(certpasswdElement.value);
	
				//typeEncData(typePosition);
				
				//closeKeyboard();
				document.onkeydown = enableKeyboard;		
				document.keydown =	enableKeyboard;
				document.onkeyup = enableKeyboard;		
				document.keyup =	enableKeyboard;
				
				var vkeyObj = document.getElementById('vkeyboard');
				vkeyObj.style.display='none';
				certpasswdElement.disabled = false;
				
				if(clickParent!=null && typeof(clickParent)!='undefined')
					clickParent.disabled = false;
				
				params = new Array();
				params[0] = 10250;
								
				//RequestSKeyboard(document.getElementById('keyboard'),params);
				
				//loadJavascript('./requestSecureKeyboard.asp?func=10250',null,false);
				RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
				break;	
			default:
				break;
		}
				
	}else if(typePosition[0]==0){
		switch (typePosition[1]) {
		case 2:
			// caps lock
			if(funs[2])
				return;
			funs[0] = funs[0]?false:true;
			var funcName = (funs[0]||funs[1])?(funs[0]&&funs[1])?'none':'shift':'none';
						
			funcName = funs[2]?"symbol":funcName;
			var capsShift = funs[0]?"1":"0";
			capsShift += funs[1]?"1":"0";
			
			params[0] = funcName+"_"+capsShift;
			params[1] = false;
			params[2] = dummy++;
			params[3] = sessionid;
			
			gpSessionId = sessionid;
			
			RequestSKeyboard[0](document.getElementById('keyboard'),params);
			RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
			//var imgObj = document.getElementById('keyboard');
			//imgObj.setAttribute('src', './requestSecureKeyboard.asp?func='+funcName+'_1&change=false&dummy='+dummy++);
			break;
		case 3:
			// shift
			if(funs[2])
				return;
			funs[1] = funs[2]?funs[1]:funs[1]?false:true;
			var funcName = (funs[0]||funs[1])?(funs[0]&&funs[1])?'none':'shift':'none';
			funcName = funs[2]?"symbol":funcName;
			
			var capsShift = funs[0]?"1":"0";
			capsShift += funs[1]?"1":"0";
			
			params[0] = funcName+"_"+capsShift;
			params[1] = false;
			params[2] = dummy++;
			params[3] = sessionid;
			
			gpSessionId = sessionid;
			
			RequestSKeyboard[0](document.getElementById('keyboard'),params);
			RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
			//var imgObj = document.getElementById('keyboard');
			//imgObj.setAttribute('src', './requestSecureKeyboard.asp?func='+funcName+'_2&change=false&dummy='+dummy++);
			break;			

		default:
			RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
			typeEncData(typePosition);
			break;
		}
	}else{
		RequestSKeyboard[3](typePosition[0]+'$'+typePosition[1]);
		typeEncData(typePosition);
	}
		
	//var coodinate = e.offsetLeft+" "+e.offsetHeight;
	//alert(coodinate);
}

var positions = new Array();
var count=0;

// Main function to retrieve mouse x-y pos.s

function point_it(event){
	//pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("vk_popup").offsetLeft;
	//pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("vk_popup").offsetTop;
	pos_x = event.offsetX?(event.offsetX):event.layerX;
	pos_y = event.offsetY?(event.offsetY):event.layerY;
	
	//alert(event.pageX+"="+document.getElementById("vk_popup").offsetLeft);
	//alert(event.pageY+"="+document.getElementById("vk_popup").offsetTop);
	
	//alert(pos_x+" "+pos_y);
	//alert("margin ="+event.target.offsetLeft+" "+event.target.offsetTop);
	//e= event||window.event;
	
	//document.getElementById("cross").style.left = (pos_x-1) ;
	//document.getElementById("cross").style.top = (pos_y-15) ;
	//document.getElementById("cross").style.visibility = "visible" ;
	//document.pointform.form_x.value = pos_x;
	//document.pointform.form_y.value = pos_y;
	positions[count] = pos_x+" "+pos_y; 
	//document.getElementById('passwd').innerHTML += positions[count++];
	//document.getElementById('passwd').value += count;
	//alert(pos_x+" "+pos_y);
	//document.get
	var xcood,ycood;
	if(event.offsetX){
		xcood = (pos_x)/28;
		ycood = (pos_y)/28;
		//alert('offsetX='+xcood+","+ycood);		
	}else{		
		//xcood= (pos_x-event.target.offsetLeft-event.target.parentNode.offsetLeft)/28;
		//ycood = (pos_y-event.target.offsetTop-event.target.parentNode.offsetTop)/28;
		xcood = (pos_x-event.target.offsetLeft)/28;
		ycood = (pos_y-event.target.offsetTop)/28;
		//alert('pos_x='+xcood+","+ycood);
	}
	
	var btn01 = Math.round(xcood);
	btn01 = btn01>xcood?btn01-1:btn01;
	var btn02 = Math.round(ycood);
	btn02 = btn02>ycood?btn02-1:btn02;
	var retObj = new Array();
	retObj[0] = btn01>xcood?btn01-1:btn01;
	retObj[1] = btn02>ycood?btn02-1:btn02;
	
	return retObj;
}

function typeEncData(retObj){
	
	var func = (funs[2]?'symbol':(!funs[0] && !funs[1])?'none':(funs[0] && funs[1])?'none':'shift');
	//var response = loadJavascript('/CheckValidate?func='+func+'&encdata='+retObj[0]+' '+retObj[1],checkButton, false);
			
	passwdElement.value += '1';
	// shit 버튼 풀리는 모듈
	if(funs[1] && !funs[2]){
		funs[1] = funs[1]?false:true;
		var funcName = (funs[0]||funs[1])?(funs[0]&&funs[1])?'none':'shift':'none';
		
		var capsShift = funs[0]?"1":"0";
		capsShift += funs[1]?"1":"0";
		
		funcName = funs[2]?"symbol":funcName+"_"+capsShift;
		
		params[0] = funcName;
		params[1] = false;
		params[2] = dummy++;
		params[3] = sessionid;
		
		gpSessionId = sessionid;
		
		RequestSKeyboard[0](document.getElementById('keyboard'),params);
		
		//var imgObj = document.getElementById('keyboard');
		//imgObj.setAttribute('src', './requestSecureKeyboard.asp?func='+funcName+'&change=false&dummy='+dummy++);
	}
}

function checkButton(ret){
	var retBooelan;
	if(ret==null || typeof(ret)=='undefined'||ret.length==0||ret=='ok')
		retBooelan = false;
	else 
		retBooelan = true;
	return retBooelan;
}

function refreshKeyBoard(){
	isInit = 2;
	var vkeyboard = document.getElementById('vkeyboard');
	var keyboardContent = document.getElementById('keyboard')
	
	//document.getElementById('mainpasswd').value='';
	//document.getElementById('passwd').value='';
	//vkeyboard.removeChild(keyboardContent);
	
	//keyboardContent.setAttribute('src','./requestSecureKeyboard.asp?func=none&change=true&rd=1&rnd='+count++);
	var func = (funs[2]?'symbol':(!funs[0] && !funs[1])?'none':(funs[0] && funs[1])?'none':'shift');
	
	var capsShift = funs[0]?"1":"0";
	capsShift += funs[1]?"1":"0";
	
	var funcName = (funs[0]||funs[1])?(funs[0]&&funs[1])?'none':'shift':'none';	
		
	funcName = funs[2]?"symbol"+"_"+capsShift:funcName+"_"+capsShift;	
	//params[0] = 'none'+"_"+capsShift;
	params[0] = funcName;
	params[1] = true;
	params[2] = dummy++;
	params[3] = sessionid;
	
	gpSessionId = sessionid;
	
	RequestSKeyboard[0](document.getElementById('keyboard'),params);
	
	//vkeyboard.appendChild(keyboardContent);

}

var funs = [false,false,false];//caps lock, shift, symbol
var keyboard ;

init();

function setVKInit(randomPoints){
	if(isInit==1){
		RequestSKeyboard[2](SiteID+sessionid,randomPoints,isInit);	
	}else if(isInit==2){
		RequestSKeyboard[2](SiteID+sessionid,randomPoints,0);	
	}
	
isInit = 0;
}

function closeKeyboard(){
	var vkeyObj = document.getElementById('vkeyboard');
	vkeyObj.style.display='none';
	certpasswdElement.disabled = false;
	if(clickParent!=null && typeof(clickParent)!='undefined')
		clickParent.disabled = false;

	alert("close vkeyboard");
	
	document.onkeydown = enableKeyboard;		
	document.keydown =	enableKeyboard;
	document.onkeyup = enableKeyboard;		
	document.keyup =	enableKeyboard;
}

function showKeyboard(){
	
	document.onkeydown = disableKeyboard;		
	document.keydown =	disableKeyboard;
	document.onkeyup = disableKeyboard;		
	document.keyup =	disableKeyboard;

	if(keyboard == null || typeof(keyboard)=='undefined' ){		
		
//		if(navigator.appName == "Microsoft Internet Explorer")
		if (browserType == BROWSER_IE)
			keyboard = new Dialog().show('vk_popup', 'vk_popup_drag', 'element-bottom', -185, 25,'passwdArea');
		else
			keyboard = new Dialog().show('vk_popup', 'vk_popup_drag', 'element-bottom', 0, 0,'passwdArea');
	}else
		keyboard.show();		
}

function enableKeyboard(){}

function disableKeyboard(){
	 refreshKeyBoard();
	 
	 var a;
   ev = window.event;
   if (typeof ev == "undefined") {
     alert("키보드 사용이 제한됩니다.\n 가상키보드 종료 후 사용하시기 바랍니다.");
   }
   
   a = ev.keyCode;
   alert("키보드 사용이 제한됩니다.\n 가상키보드 종료 후 사용하시기 바랍니다.");
   
   
   
   return false;
}



var certpasswdElement;
var clickParent;
	return{
		show:function(elements){
			
			isInit = 1;
			if(elements==null || typeof(elements)=='undefiend')
				certpasswdElement = passwdElement;
			else
				certpasswdElement = elements;
		
			certpasswdElement.disabled = true;
			
			//passwdElement.parentNode.appendChild(document.getElementById('vkeyboard'));
			var passElement = document.getElementById('attachTarget');
			if(passElement==null)
				passElement = document.getElementById('keysec');
				
			keyboard = document.getElementById('vkeyboard');
			passElement.appendChild(keyboard);	
			
			document.onkeydown = disableKeyboard;		
			document.keydown =	disableKeyboard;
			document.onkeyup = disableKeyboard;		
			document.keyup =	disableKeyboard;
			
			return keyboard;			
		},
		setParentButton:function(element){			
			clickParent = element;
		},
		reFreshKeyboard : function(mChallenge){
			
			params[0] = 'none';
			params[1] = true;
			params[2] = dummy++;
			params[3] = sessionid;
			
			gpSessionId = sessionid;
			
			RequestSKeyboard[0](document.getElementById('keyboard'),params);
			//document.getElementById('keyboard').setAttribute('src','./requestSecureKeyboard.asp?func=none&change=true&dummy='+dummy++);			
		}
		
	}
	
}