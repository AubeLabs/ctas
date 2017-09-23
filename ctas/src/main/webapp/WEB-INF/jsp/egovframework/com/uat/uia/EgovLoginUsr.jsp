<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
 /**
  * @Class Name : EgovLoginUsr.jsp
  * @Description : Login 인증 화면
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.03    박지욱          최초 생성
  *   2011.09.25    서준식          사용자 관리 패키지가 미포함 되었을때에 회원가입 오류 메시지 표시
  *   2011.10.27    서준식          사용자 입력 탭 순서 변경
  *  @author 공통서비스 개발팀 박지욱
  *  @since 2009.03.03
  *  @version 1.0
  *  @see
  *
  *  Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>

<!DOCTYPE html>
<html>
<head>
<title><spring:message code="comUatUia.title" /></title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/uat/uia/login.css' />">
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/showModalDialog.js'/>" ></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/jquery.js'/>" ></script>
<script type="text/javaScript" language="javascript">
function checkLogin(userSe) {
    // 관리자
    if (userSe == "GNR") {
        document.loginForm.rdoSlctUsr[0].checked = true;
        document.loginForm.rdoSlctUsr[1].checked = false;
        document.loginForm.rdoSlctUsr[2].checked = false;
        document.loginForm.userSe.value = "GNR";
    // 업무사용자
    } else if (userSe == "USR") {
        document.loginForm.rdoSlctUsr[0].checked = false;
        document.loginForm.rdoSlctUsr[1].checked = false;
        document.loginForm.rdoSlctUsr[2].checked = true;
        document.loginForm.userSe.value = "USR";
    }
}

function actionLogin() {
	
	if (document.loginForm.id.value =="") {
        alert("<spring:message code="comUatUia.validate.idCheck" />"); <%-- 아이디를 입력하세요 --%>
    } else if (document.loginForm.password.value =="") {
        alert("<spring:message code="comUatUia.validate.passCheck" />"); <%-- 비밀번호를 입력하세요 --%>
    } else {
        document.loginForm.action="<c:url value='/uat/uia/actionLogin.do'/>";
        //document.loginForm.j_username.value = document.loginForm.userSe.value + document.loginForm.username.value;
        //document.loginForm.action="<c:url value='/j_spring_security_check'/>";
        document.loginForm.submit();
    }
}
function actionLogin2(){
	document.getElementById("loading").style.display = 'block';
	document.getElementById("test").style.display = 'block';
	test.Login(this, test.popForm);
}

function actionCrtfctLogin() {
    document.defaultForm.action="<c:url value='/uat/uia/actionCrtfctLogin.do'/>";
    document.defaultForm.submit();
}

function goFindId() {
    document.defaultForm.action="<c:url value='/uat/uia/egovIdPasswordSearch.do'/>";
    document.defaultForm.submit();
}

function goRegiUsr() {
	
	<%-- var useMemberManage = '${useMemberManage}';

	if(useMemberManage != 'true'){
		사용자 관리 컴포넌트가 설치되어 있지 않습니다. \n관리자에게 문의하세요.
		alert("<spring:message code="comUatUia.validate.userManagmentCheck" />");
		return false;
	} --%>

    var userSe = document.loginForm.userSe.value;
 
    // 일반회원
    if (userSe == "GNR") {
        document.loginForm.action="<c:url value='/uss/umt/EgovStplatCnfirmMber.do'/>";
        document.loginForm.submit();
    // 기업회원
    } else if (userSe == "ENT") {
        document.loginForm.action="<c:url value='/uss/umt/EgovStplatCnfirmEntrprs.do'/>";
        document.loginForm.submit();
    // 업무사용자
    } else if (userSe == "USR") {
    	document.loginForm.action="<c:url value='/MberInsert.do'/>";
        document.loginForm.submit();
    	<%-- 업무사용자는 별도의 회원가입이 필요하지 않습니다.
        alert("<spring:message code="comUatUia.validate.membershipCheck" />"); --%>
        
    }
}

function goGpkiIssu() {
    document.defaultForm.action="<c:url value='/uat/uia/egovGpkiIssu.do'/>";
    document.defaultForm.submit();
}

function setCookie (name, value, expires) {
    document.cookie = name + "=" + escape (value) + "; path=/; expires=" + expires.toGMTString();
}

function getCookie(Name) {
    var search = Name + "=";
    if (document.cookie.length > 0) { // 쿠키가 설정되어 있다면
        offset = document.cookie.indexOf(search);
        if (offset != -1) { // 쿠키가 존재하면
            offset += search.length;
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // 쿠키 값의 마지막 위치 인덱스 번호 설정
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
    return "";
}

function saveid(form) {
    var expdate = new Date();
    // 기본적으로 30일동안 기억하게 함. 일수를 조절하려면 * 30에서 숫자를 조절하면 됨
    if (form.checkId.checked)
        expdate.setTime(expdate.getTime() + 1000 * 3600 * 24 * 30); // 30일
    else
        expdate.setTime(expdate.getTime() - 1); // 쿠키 삭제조건
    setCookie("saveid", form.id.value, expdate);
}

function getid(form) {
    form.checkId.checked = ((form.id.value = getCookie("saveid")) != "");
}

function fnInit() {
	parent._top.location.reload(true);
	//parent._top.menuDspl("none");

	 if (document.getElementById('loginForm').message.value != null) {
	    var message = document.getElementById('loginForm').message.value;
	    if (message != "") {
	        alert(message);
	    } 
	} 
	/*
     if (${message} != "") {
        alert(${message});
    } 

    /* *************************
    document.loginForm.rdoSlctUsr[0].checked = false;
    document.loginForm.rdoSlctUsr[1].checked = false;
    document.loginForm.rdoSlctUsr[2].checked = true;
    document.loginForm.userSe.value = "USR";
    document.loginForm.id.value="TEST1";
    document.loginForm.password.value="rhdxhd12";
    **************************** */

    //getid(document.loginForm);
    // 포커스
    //document.loginForm.rdoSlctUsr.focus();
    
    getid(document.loginForm);
    
    fnLoginTypeSelect("typeUsr");
}

function fnLoginTypeSelect(objName){

		document.getElementById("typeGnr").className = "";
		document.getElementById("typeUsr").className = "";
		
		document.getElementById(objName).className = "on";

		if(objName == "typeGnr"){ //관리자
			document.loginForm.userSe.value = "GNR";
			document.getElementById("login_input").style.display="block";
			document.getElementById("login_input2").style.display="none";
		}else if(objName == "typeUsr"){	//업무사용자
		 	document.loginForm.userSe.value = "USR";
		 	document.getElementById("login_input").style.display="none";
		 	document.getElementById("login_input2").style.display="block";
		}

}
function lol(dn){
	document.loginForm.dn.value = dn;
	document.loginForm.submit();
}
function press() {

    if (event.keyCode==13) {
    	actionLogin();
    }
}
</script>
</head>
<body onLoad="fnInit();">

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<!-- login영역 -->
<form name="loginForm" id="loginForm" action="<c:url value='/uat/uia/actionLogin.do'/>" method="post">
<input type="hidden" id="message" name="message" value="<c:out value='${message}'/>">
<table>
<tr>
<td>     
<fieldset class="login_form">
	<%-- <img src="<c:url value='/images/egovframework/com/uat/uia/login_tit.png'/>" style="margin:30px 0 0px 60px" alt="login title image"  title="login title image"> --%>
	<div class="login_type">
		<ul id="ulLoginType">
			<li><a href="javascript:fnLoginTypeSelect('typeUsr');" id="typeUsr" title=""><spring:message code="comUatUia.loginForm.USR"/></a></li> <!-- 업무 -->
			<li><a href="javascript:fnLoginTypeSelect('typeGnr');" id="typeGnr" title=""><spring:message code="comUatUia.loginForm.GNR"/></a></li> <!-- 관리자 -->
		</ul>
	</div>

	<div class="login_input" style="display:none;" id="login_input">
		<ul>
			<!-- 아이디 -->
			<c:set var="title"><spring:message code="comUatUia.loginForm.id"/></c:set>
			<li>
				<label for="id">${title}</label>
				<input type="text" name="id" id="id" maxlength="20" title="${title} ${inputTxt}" placeholder="${title} ${inputTxt}" onkeypress="press();">
			</li>
			<!-- 비밀번호 -->
			<c:set var="title"><spring:message code="comUatUia.loginForm.pw"/></c:set>
			<li>
				<label for="password">${title}</label>
				<input type="password" name="password" id="password" maxlength="12" title="${title} ${inputTxt}" placeholder="${title} ${inputTxt}" onkeypress="press();">
			</li>
			<!-- 아이디 저장 -->
			<c:set var="title"><spring:message code="comUatUia.loginForm.idSave"/></c:set>
			<li class="chk">
				<input type="checkbox" name="checkId" class="check2" onClick="javascript:saveid(document.loginForm);" id="checkId">${title}
			</li>
			<li>
				<input type="button" class="btn_login" value="<spring:message code="comUatUia.loginForm.login"/>" onClick="actionLogin()"> <!-- 로그인  -->
			</li>
			<%-- <li>
				<ul class="btn_idpw" >
					<li><a href="#" onClick="goRegiUsr(); return false;"><spring:message code="comUatUia.loginForm.regist"/></a></li> <!-- 회원가입  -->
					<li><a href="#" onClick="goFindId(); return false;"><spring:message code="comUatUia.loginForm.idPwSearch"/></a></li> <!-- 아이디/비밀번호 찾기 -->
				</ul>
			</li> --%> 
		</ul>
	</div>
	<div class="login_input" id="login_input2">
		<ul>
			<li>
				<input type="button" class="btn_login" value="<spring:message code="comUatUia.loginForm.login2"/>" onClick="actionLogin2()"> <!-- 로그인  -->
			</li>
			<li>
				<ul class="btn_idpw" >
					<li><a href="#" onClick="goRegiUsr(); return false;"><font>인증서 등록</font></a></li> <!-- 회원가입  -->
					<%-- <li><a href="#" onClick="goFindId(); return false;"><spring:message code="comUatUia.loginForm.idPwSearch"/></a></li> <!-- 아이디/비밀번호 찾기 --> --%>
				</ul>
			</li>
		</ul>
	</div>
	
</fieldset>
</td>
<td style="width:50px;" />
<td>
<div style="border:1px solid #E6E6E6; width:450px;">
<pre style="margin:10px;">
■ 시스템 안내

주의 : 각 기관당 1개의 인증서만 등록이 되는 점, 유의하시기 바랍니다.


1. 처음 시스템에 접속하는 기관

  1) 인증서 등록

  2) 공인인증서 로그인

  3) 상단 '자료제출' 탭으로 이동하여 자료 등록


2. 인증서를 이미 등록한 기관

  1) 공인인증서 로그인

  2) 상단 '자료제출' 탭으로 이동하여 자료 등록


* 공인인증서 등록이 안되거나, 로그인이 안되는 경우,
 010-4835-8167, 010-4836-8134 로 연락주시기 바랍니다.
</pre>
</div>
</td>
</tr>
<input name="userSe" type="hidden" value="GNR"/>
<input name="dn" type="hidden" value=""/>
<input name="j_username" type="hidden"/>
</form>


	
<img id='loading' src="<c:url value='/images/egovframework/com/cmm/loading1.gif' />" style="position:absolute; left:400px; top:100px;  display:none;">


<iframe id='test' style="position:absolute; left:0px; top:0px;width:100%; height:100%; display:none;" src="<c:url value='/jsp/createSecureSession_1_1.jsp' />" frameborder="0" scrolling="no">
</iframe>



<!-- 팝업 폼 -->
<form name="defaultForm" action ="" method="post" target="_blank">
<div style="visibility:hidden;display:none;">
<input name="iptSubmit3" type="submit" value="<spring:message code="comUatUia.loginForm.submit"/>" title="<spring:message code="comUatUia.loginForm.submit"/>">
</div>
</form>
<!-- login영역 //-->



</body>
</html>


