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
	#menu_wrapper {white-space: nowrap; overflow-x: auto; overflow-y: hidden; padding: 0 0 0 0; display:none; float: left; width: 100%;}
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
	function fnMenuSelect(objName, objOrder){
		
		var foo = document.getElementById('menu');
		for (var i = 0; i < foo.children.length; i++) {
			if(i == objOrder) foo.children[i].className = "active";
			else foo.children[i].className = "";
		}
		parent.selectedMenu = objOrder;
		goLoc(objName);
	}
	function goLoc(objName){
		if(objName == "0"){	// HOME
			parent._content.location.href = "${pageContext.request.contextPath}/EgovContent.do";
		}else if(objName == "1"){	// 보고서 업로드
			parent._content.location.href = "${pageContext.request.contextPath}/UpLoad.do";
		}else if(objName == "2"){	// 공지사항
			parent._content.location.href = "${pageContext.request.contextPath}/cop/bbs/selectArticleList.do?bbsId=BBSMSTR_000000000001";
		}else if(objName == "3"){	// Q&A
			parent._content.location.href = "${pageContext.request.contextPath}/uss/olh/qna/selectQnaList.do";
		}else if(objName == "4"){	// 평정실시
			parent._content.location.href = "${pageContext.request.contextPath}/UpLoad.do";
		}else if(objName == "5"){	// 통계
			parent._content.location.href = "${pageContext.request.contextPath}/Stats.do";
		}else if(objName == "6"){	// 기관 관리
			parent._content.location.href = "${pageContext.request.contextPath}/uss/umt/dpt/selectDeptManageListView.do";
		}else if(objName == "7"){	// 기관담당자 조회
			parent._content.location.href = "${pageContext.request.contextPath}/uss/umt/EgovUserManage.do";
		}else if(objName == "8"){	// Q&A답변
			parent._content.location.href = "${pageContext.request.contextPath}/uss/olh/qna/selectQnaAnswerList.do";
		}else if(objName == "9"){	// 자료실
			parent._content.location.href = "${pageContext.request.contextPath}/cop/bbs/selectArticleList.do?bbsId=BBSMSTR_000000000011";
		}
	}
	function menuDspl(param1, param2){
		if (document.getElementById("menu")) {
			document.getElementById("menu_wrapper").style.display=param1;
			document.getElementById("welcome").style.display=param1;
			document.getElementById("welcome").innerHTML = "<a href='javascript:fnPasswordMove();' title='비밀번호 변경'>" + param2 + "</a> 님 환영합니다. <a href='javascript:contentLogout();'>로그아웃</a>";
			document.getElementById("menu").children[0].className = "active";
			var foo = document.getElementById('menu');
			for (var i = 0; i < foo.children.length; i++) {
				if(i == parent.selectedMenu) foo.children[i].className = "active";
				else foo.children[i].className = "";
			}
			if(window.innerWidth < 720 && param1 == "block"){
				document.getElementById("logo").style.display = "none";
				//document.getElementById("resize1").style.display = "none";
				//document.getElementById("welcome").style.margin = "0px";
				document.getElementById("welcome").innerHTML = "<a href='javascript:contentLogout();''>로그아웃</a>";
				document.getElementById("menu_wrapper").style.display="none";
				document.getElementById("menu_wrapper2").style.display="block";
				//document.getElementById("welcome").options.index = parent.selectedMenu;
				var ele = document.getElementById('selectMenu');
				for(var i = 0 ; i < ele.length; i++ ){
					if( i == parent.selectedMenu ){
						ele.options[i].selected = true; 
						break;
					}
				}
			}
		}
	}
	function contentLogout(){
		parent._content.location.href = "${pageContext.request.contextPath }/uat/uia/actionLogout.do";
	}
	function fnPasswordMove(){
		//parent._content.location.href = "${pageContext.request.contextPath}/UserPasswordUpdtView.do";
	}
	window.onresize = function() {
		location.reload(true);
	}
	function test(obj){
		parent.selectedMenu = obj.options.selectedIndex;
		goLoc(obj.value);
	}
</script>
</head>
<body onload="menuDspl('block','${loginVO.name}')">
<div id="header">
	<div class="header_box"> 
	<h1>
		<a href="<c:url value='/EgovContent.do' />" target="_content"><img id="logo" src="<c:url value='/images/egovframework/com/cmm/main/img_logo.png' />" alt="eGovframe"></a>
	</h1>
	<div id="resize1" style="margin-top:13px; float: left; width: 50%;"><strong class="top_title_strong">민원서비스 종합평가</strong></div>
	

	<div style="margin-top:30px; display:none;float: right; width: 20%; " id="welcome">
		<%-- ${loginVO.name }님 환영합니다. <a href="javascript:contentLogout();">로그아웃</a> --%>
	</div>

	
	<br/>

</div>
	<!-- Blue Menu -->
	<div id="menu_wrapper" class="blue">
	<div class="left"></div>
	<c:if test="${loginVO == null }">
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000001' }">
		<ul id="menu">
			<li><a href="javascript:fnMenuSelect(0,0);">HOME</a></li>
			<li><a href="javascript:fnMenuSelect(1,1);">보고서 업로드</a></li>
			<li><a href="javascript:fnMenuSelect(2,2);">공지사항</a></li>
			<li><a href="javascript:fnMenuSelect(3,3);">Q&A</a></li>
			<li><a href="javascript:fnMenuSelect(9,4);">자료실</a></li>
		</ul>
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000002' }">
		<ul id="menu">
			<li><a href="javascript:fnMenuSelect(0,0);">HOME</a></li>
			<li><a href="javascript:fnMenuSelect(4,1);">평정실시</a></li>
			<li><a href="javascript:fnMenuSelect(2,2);">공지사항</a></li>
			<li><a href="javascript:fnMenuSelect(3,3);">Q&A</a></li>
			<li><a href="javascript:fnMenuSelect(9,4);">자료실</a></li>
		</ul>
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000003' }">
		<ul id="menu">
			<li><a href="javascript:fnMenuSelect(0,0);">HOME</a></li>
			<li><a href="javascript:fnMenuSelect(4,1);">평정실시</a></li>
			<li><a href="javascript:fnMenuSelect(5,2);">기관별현황</a></li>
			<li><a href="javascript:fnMenuSelect(2,3);">공지사항</a></li>
			<li><a href="javascript:fnMenuSelect(3,4);">Q&A</a></li>
			<li><a href="javascript:fnMenuSelect(8,5);">Q&A답변</a></li>
			<li><a href="javascript:fnMenuSelect(9,6);">자료실</a></li>
			<li><a href="javascript:fnMenuSelect(6,7);">기관관리</a></li>
			<li><a href="javascript:fnMenuSelect(7,8);">기관담당자</a></li>
		</ul>
	</c:if>

	</div>
	
	
	<div id="menu_wrapper2" style="display:none; ">
	<div class="left"></div>
	<br/><br/><br/>
	&nbsp;&nbsp;&nbsp;메뉴선택 :
	<c:if test="${loginVO == null }">
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000001' }">
		<select style="margin-left:13px;background: #f5f5f5;" id="selectMenu" name="selectMenu" title="메뉴선택" onchange="test(this);">
			<option value="0"<c:if test="1==1">selected="selected"</c:if>>HOME</option>
			<option value="1">보고서 업로드</option>
			<option value="2">공지사항</option>
			<option value="3">Q&A</option>
			<option value="9">자료실</option>
		</select>
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000002' }">
		<select style="margin-left:13px;background: #f5f5f5;" id="selectMenu" name="selectMenu" title="메뉴선택" onchange="test(this);">
			<option value="0"<c:if test="1==1">selected="selected"</c:if>>HOME</option>
			<option value="4">평정실시</option>
			<option value="2">공지사항</option>
			<option value="3">Q&A</option>
			<option value="9">자료실</option>
		</select>
	</c:if>
	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000003' }">
		<select style="margin-left:13px;background: #f5f5f5;" id="selectMenu" name="selectMenu" title="메뉴선택" onchange="test(this);">
			<option value="0"<c:if test="1==1">selected="selected"</c:if>>HOME</option>
			<option value="4">평정실시</option>
			<option value="5">기관별현황</option>
			<option value="2">공지사항</option>
			<option value="3">Q&A</option>
			<option value="8">Q&A답변</option>
			<option value="9">자료실</option>
			<option value="6">기관관리</option>
			<option value="7">기관담당자</option>
		</select>
	</c:if>

	</div>
</body>
</html>