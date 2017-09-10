<%
 /**
  * @Class Name : EgovArticleList.jsp
  * @Description : EgovArticleList 화면
  * @Modification Information
  * @
  * @  수정일             수정자                   수정내용
  * @ -------    --------    ---------------------------
  * @ 2009.02.01   박정규              최초 생성
  *   2016.06.13   김연호              표준프레임워크 v3.6 개선
  *  @author 공통서비스팀
  *  @since 2009.02.01
  *  @version 1.0
  *  @see
  *
  */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="ckeditor" uri="http://ckeditor.com" %>
<c:set var="pageTitle"><spring:message code="comCopBbs.articleVO.title"/></c:set>
<!DOCTYPE html>
<html>
<head>
<title>${pageTitle} <spring:message code="title.list" /></title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/cmm/jqueryui.css' />">
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFile2.js'/>" ></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/utl/EgovCmmUtl.js'/>" ></script>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
<script src="<c:url value='/js/egovframework/com/cmm/jqueryui.js' />"></script>

<script type="text/javascript">
/*********************************************************
 * init
 ******************************************************** */
function fn_egov_init(){
	if(document.ctasForm.items1.value == "") document.ctasForm.select1.value = "전체";
	if(document.ctasForm.items2.value == "") document.ctasForm.select2.value = "전체";
	//alert('GUBUN:${GUBUN}');
}
/* ********************************************************
 * 조회
 ******************************************************** */
function goSearch(){
	ctasVO.action = "<c:url value='/Stats.do'/>";
	ctasVO.submit();
}
/* ********************************************************
 * 기관선택
 ******************************************************** */
function fncSelectOrgPop() {
    var url = "<c:url value='/OrgSearchList.do?GUBUN=2'/>";
    //var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
    window.open(url,"기관검색",'width=600,height=485,scrollbars=yes,resizable=yes,status=no,center:yes');
}
/* ********************************************************
 * 평가지표선택
 ******************************************************** */
function fncSelectCaiPop() {
    var url = "<c:url value='/CaiSearchList.do'/>";
    //var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
    window.open(url,"평가지표검색",'width=500,height=485,scrollbars=no,resizable=no,status=no,center:yes');
}
</script>
</head>
<body onload="fn_egov_init()">
<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<form:form commandName="ctasVO" name = "ctasForm" action="${pageContext.request.contextPath}/insertUpLoad.do" method="post" onSubmit="fn_egov_regist_article(document.forms[0]); return false;" enctype="multipart/form-data">

	<input name="items1" id="items1" type="hidden" value="<c:out value="${ctasVO.items1}"/>">
	<input name="items2" id="items2" type="hidden" value="<c:out value="${ctasVO.items2}"/>">
	
	<div class="board">
	<h1 class="circle_chck">기관별현황</h1>

	<br/><br/>
	
	<!-- 검색영역 -->
	<div class="search_box2" title="<spring:message code="common.searchCondition.msg" />">
		<ul>
			<!-- 검색키워드 및 조회버튼 -->
			<li><div style="line-height:4px;">&nbsp;</div><div>기관 </div></li>
			<li>
				<input readonly= "readonly" name="select1" type="text" value="<c:out value='${ctasVO.select1}' />" size="22" title="기관" onkeypress="press();"  />
				<input type="button" class="s_btn" onClick="fncSelectOrgPop();return false;" value="기관찾기" title="기관찾기" />
			</li>
			<li><div style="line-height:4px;">&nbsp;</div><div>지표 </div></li>
			<li>
				<input readonly= "readonly" name="select2" type="text" value="<c:out value='${ctasVO.select2}' />" size="22" title="기관" onkeypress="press();"  />
				<input type="button" class="s_btn" onClick="fncSelectCaiPop();return false;" value="지표찾기" title="지표찾기" />
				<input type="button" class="s_btn" onClick="goSearch();return false;" value="<spring:message code="button.inquire" />" title="<spring:message code="button.inquire" /> <spring:message code="input.button" />" />
			</li>
		</ul>
	</div>
	
	<br/><br/>
	
	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
	<caption>${pageTitle} <spring:message code="title.list" /></caption>
	<colgroup>
		<col style="width: 40%;">
		<col style="width: 20%;">
		<col style="width: 20%;">
		<col style="width: 20%;">
	</colgroup>
	<thead>
	<tr>
		<th>평가지표</th>
		<th>보고서수</th>
		<th>합계점수</th>
		<th>평   균</th>
	</tr>
	</thead>
	<tbody class="ov">
		<c:forEach items="${statsList}" var="statsInfo" varStatus="status">
		<tr>
			<td style="text-align: left;">${statsInfo.NM}</td>
			<td>${statsInfo.COUNT}</td>
			<td>${statsInfo.SUM}</td>
			<td>${statsInfo.AVG}</td>
		</tr>
		</c:forEach>
		<c:if test="${fn:length(statsList) == 0}">
			<tr>
				<td colspan="4">조회하세요.</td>
			</tr>
		</c:if>
		<c:if test="${fn:length(statsList) != 0}">
			<tr>
				<td>합계</td>
				<td>${statsGrp.COUNT}</td>
				<td>${statsGrp.SUM}</td>
				<td>${statsGrp.AVG}</td>
			</tr>
		</c:if>
	</tbody>
	</table>

	<br/><br/><br/>
</form:form>

</body>
</html>