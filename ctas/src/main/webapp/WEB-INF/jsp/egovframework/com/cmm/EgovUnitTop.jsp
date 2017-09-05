<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/cmm/main.css' />">

<title>민원서비스 종합평가</title>

<style type="text/css">
	
	/* The CSS Code for the menu starts here */
	#menu {
		font-family: Arial, sans-serif;
		font-weight: bold;
		text-transform: uppercase;
		margin: 0px 0;
		padding: 0;
		list-style-type: none;
		background-color: #eee;
		font-size: 13px;
		height: 40px;
		border-top: 2px solid #eee;
		border-bottom: 2px solid #ccc;
	}
	#menu li {
		float: left;
		margin: 0;				
	}
	#menu li a {
		text-decoration: none;
		display: block;
		padding: 0 20px;
		line-height: 40px;
		color: #666;
	}
	#menu li a:hover, #menu li.active a {
		background-color: #f5f5f5;
		border-bottom: 2px solid #DDD;
		color: #999;
	}
	#menu_wrapper ul {margin-left: 0px;}
	#menu_wrapper {padding: 0 0 0 0; display:none;float: left; width: 100%;}
	#menu_wrapper div {float: left; height: 44px; width: 100px; }

	/* Blue Menu */
	#menu_wrapper.blue ul {
		border-top: 2px solid #356AA0;
		border-bottom: 2px solid #204061;
		background: #356AA0;}
	#menu_wrapper.blue a {color: #fff;}
	#menu_wrapper.blue li a:hover, #menu_wrapper.blue li.active a {color: #90CDFF; background: #3D7BBB; border-bottom: 2px solid #356AA0;}

</style>
<script type="text/javaScript" language="javascript">
	function fnMenuSelect(objName){
		
		var foo = document.getElementById('menu');
		for (var i = 0; i < foo.children.length; i++) {
			if(i==objName) foo.children[i].className = "active";
			else foo.children[i].className = "";
		}

		if(objName == "0"){//HOME
			parent._content.location.href = "${pageContext.request.contextPath}/EgovContent.do"
		}else if(objName == "1"){//UPLOAD
			parent._content.location.href = "${pageContext.request.contextPath}/UpLoad.do"
		}else if(objName == "2"){
			parent._content.location.href = "${pageContext.request.contextPath}/Stats.do"
		}
		
	}
	function menuDspl(param1, param2){
		document.getElementById("menu_wrapper").style.display=param1;
		document.getElementById("welcome").style.display=param1;
		//alert('${loginVO.name }');
		document.getElementById("welcome").innerHTML = param2+"님 환영합니다. <a href='javascript:contentLogout();''>로그아웃</a>";
		document.getElementById("menu").children[0].className = "active";
		
	}
	function contentLogout(){
		parent._content.location.href = "${pageContext.request.contextPath }/uat/uia/actionLogout.do"
	}
</script>
</head>
<body>
<div id="header">
	<div class="header_box"> 
	<h1>
		<a href="<c:url value='/EgovContent.do' />" target="_content"><img src="<c:url value='/images/egovframework/com/cmm/main/img_logo.png' />" alt="eGovframe"></a>
	</h1>
	<div style="margin-top:13px; float: left; width: 50%;"><strong class="top_title_strong">민원서비스 종합평가</strong></div>
	

	<div style="margin-top:30px; display:none;float: right; width: 20%; " id="welcome">
		<%-- ${loginVO.name }님 환영합니다. <a href="javascript:contentLogout();">로그아웃</a> --%>
	</div>

	
	<br/>

</div>
	<!-- Blue Menu -->
	<div id="menu_wrapper" class="blue">
	<div class="left"></div>
		<ul id="menu">
			<li><a href="javascript:fnMenuSelect(0);">HOME</a></li>
			<li><a href="javascript:fnMenuSelect(1);">UPLOAD</a></li>
			<li><a href="javascript:fnMenuSelect(2);">STATS</a></li>
			<li><a href="javascript:fnMenuSelect(3);">MENU4</a></li>
			<li><a href="javascript:fnMenuSelect(4);">MENU5</a></li>
			<li><a href="javascript:fnMenuSelect(5);">MENU6</a></li>
		</ul>
	</div>
</body>
</html>