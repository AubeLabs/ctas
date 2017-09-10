<%
 /**
  * @Class Name : EgovMberInsert.jsp
  * @Description : 일반회원등록 JSP
  * @Modification Information
  * @
  * @  수정일         수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.03.02    조재영          최초 생성
  *   2016.06.13    장동한          표준프레임워크 v3.6 개선
  *
  *  @author 공통서비스 개발팀 조재영
  *  @since 2009.03.02
  *  @version 1.0
  *  @see
  *
  */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<c:set var="pageTitle"><spring:message code="comUssUmt.userManage.title"/></c:set>
<!DOCTYPE html>
<html>
<head>
<title>인증서 등록</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<validator:javascript formName="mberManageVO" staticJavascript="false" xhtml="true" cdata="false"/>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/sym/ccm/zip/EgovZipPopup.js' />" ></script>
<script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
<script type="text/javaScript" language="javascript" defer="defer">
/*********************************************************
 * 초기화
 ******************************************************** */
function fn_egov_init(){
	if ("${msg}" != "") {
		alert("${msg}");
		if("${sucess}" == 1){
			document.mber.action="<c:url value='/EgovContent.do'/>";
	        document.mber.submit();
		}
	}
}
//기관조회
function fncSelectOrgPop() {
    var url = "<c:url value='/OrgSearchList.do?GUBUN=1'/>";
    //var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
    window.open(url,"기관검색",'width=500,height=485,scrollbars=yes,resizable=yes,status=no,center:yes');
}
//등록
function fnInsert(form){
	if(document.mber.nm.value == ""){
		alert("이름을 입력하세요");
		return false;
	}
	if(document.mber.orgId.value == ""){
		alert("기관을 선택하세요");
		return false;
	}
	if(document.mber.certDn.value == ""){
		alert("인증서를 선택하세요");
		return false;
	}
	if(!confirm("등록 하시겠습니까?")) return false;
	form.submit();
}
//인증서선택
function actionLogin2(){
	document.getElementById("loading").style.display = 'block';
	document.getElementById("test").style.display = 'block';
	test.Login(this, test.popForm);
	
}
//인증서선택콜백
function lol(dn){
	document.mber.certDn.value = dn;
	document.getElementById("loading").style.display = 'none';
	document.getElementById("test").style.display = 'none';
	document.getElementById("test").src = '/ctas/jsp/createSecureSession_1_1.jsp';
	
}
</script>
</head>

<body onload="fn_egov_init()" >
<form action="${pageContext.request.contextPath}/MberInsert.do" name="mber"  method="post" onSubmit="fnInsert(document.forms[0]); return false;"> 

<div class="board">
	<!-- 타이틀 -->
	<h2>인증서 등록</h2>
	<br><br><br><br>
	<!-- 등록폼 -->
	<table class="wTable2" summary="<spring:message code="common.summary.list" />">

	<colgroup>
		<col style="width: 22%;"><col style="width: ;">
	</colgroup>
	<tbody>
		<tr>
			<th>이름</th>
			<td class="left">
				<input name="nm"  type="text" value="<c:out value="${ctasVO.nm}"/>" size="22" title="이름"  />
			</td>
		</tr>
		<tr>
			<th>기관</th>
			<td class="left">
				<input name="orgNm" readonly='readOnly' type="text" style="width:67%;" value="<c:out value="${ctasVO.orgNm}"/>" size="22" title="기관"   />
				<input type="button" class="btn_s" onClick="fncSelectOrgPop();return false;" style="width:30%;" value="기관조회" title="기관조회팝업" />
				<input name="orgId" id="orgId" type="hidden" value="<c:out value="${ctasVO.orgId}"/>"/>
			</td>
		</tr>
		<tr>
			<th>인증서</th>
			<td class="left">
				<input name="certDn" readonly='readOnly' type="text" style="width:67%;" value="<c:out value="${ctasVO.certDn}"/>" size="22" title="인증서"  />
				<input type="button" class="btn_s" onClick="actionLogin2()"  style="width:30%;"value="인증서선택" title="인증서선택" />
			</td>
		</tr>
		
	</tbody>
	</table>
	
	<table>
		<colgroup>
			<col style="width: 49%;"><col style="width: ;">
		</colgroup>
		<tbody>
			<tr>
				<td>
					<div class="btn">
						<input type="submit" class="s_submit" value="<spring:message code="button.create" />" title="<spring:message code="button.create" /> <spring:message code="input.button" />" />
						<span class="btn_s"><a href="<c:url value='/uat/uia/egovLoginUsr.do' />" >등록취소</a></span>
					</div><div style="clear:both;"></div>
				</td>
				<td/>
			</tr>
		</tbody>
	</table>
</div><!-- div end(wTableFrm)  -->

</form>
<img id='loading' src="<c:url value='/images/egovframework/com/cmm/loading1.gif' />" style="position:absolute; left:400px; top:100px;  display:none;">
	
<!-- 인증서 iframe -->
<iframe id='test' style="position:absolute; left:0px; top:0px;width:100%; height:100%; display:none;" src="<c:url value='/jsp/createSecureSession_1_1.jsp' />" frameborder="0" scrolling="no">
</iframe>

						     
</body>
</html>
