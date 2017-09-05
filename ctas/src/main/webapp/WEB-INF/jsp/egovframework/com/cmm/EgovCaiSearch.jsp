<%
 /** 
  * @Class Name : EgovDeptSearch.java
  * @Description : EgovDeptSearch Search 화면
  * @Modification Information
  * @
  * @  수정일                     수정자               수정내용
  * @ ----------    --------    ---------------------------
  * @ 2009.03.26    lee.m.j     최초 생성
  *   2016.07.06    장동한        표준프레임워크 v3.6 개선
  *
  *  @author lee.m.j
  *  @since 2009.03.26
  *  @version 1.0
  *  @see
  *  
  */
%>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="pageTitle"><spring:message code="comCopSecDrm.deptSearchPopup.title"/></c:set>
<!DOCTYPE html>
<html>
<head>
<title>지표선택팝업</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
<script type="text/javaScript" language="javascript" defer="defer">

function fncSelectCai(deptCode) {
	opener.document.ctasForm.items2.value = "AND A.CODE='"+deptCode+"'";
	opener.document.ctasForm.select2.value = "1개 항목 선택";
    window.close();
}

function fncSelectCaiConfirm() {

	var checkField = document.listForm.delYn;
    var checkFieldCd = document.listForm.checkId;
	var checkCount = 0;
	
	var org_cd;
	var org_nm;
	var items="";
	
	for(var i=0; i<checkField.length; i++) {
		if(checkField[i].checked) {
			checkCount++;
          	org_cd = checkFieldCd[i].value;
           	items  +=  (checkCount==1?"":",")+("'"+checkFieldCd[i].value+"'");
		}
	}
	if(checkCount == 0){
		alert("선택된 항목이 없습니다.");
		return;
	}
	opener.document.ctasForm.items2.value = "AND A.CODE IN("+items+")";
	opener.document.ctasForm.select2.value = checkCount+"개 항목 선택";
	window.close();

}
function fncCheckAll() {
    var checkField = document.listForm.delYn;
    if(document.listForm.checkAll.checked) {
        if(checkField) {
            if(checkField.length > 1) {
                for(var i=0; i < checkField.length; i++) {
                    checkField[i].checked = true;
                }
            } else {
                checkField.checked = true;
            }
        }
    } else {
        if(checkField) {
            if(checkField.length > 1) {
                for(var j=0; j < checkField.length; j++) {
                    checkField[j].checked = false;
                }
            } else {
                checkField.checked = false;
            }
        }
    }
}
</script>
</head>
<body>

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<form:form name="listForm" action="${pageContext.request.contextPath}/OrgSearchList.do" onSubmit="fnSearch(document.forms[0]); return false;" method="post">

<div class="popup">
	<h1>평가지표 목록</h1>

	<div class="search_box" title="<spring:message code="common.searchCondition.msg" />">
		<ul>
			<li>
				<input type="button" class="s_btn" onClick="fncSelectCaiConfirm()" value="<spring:message code="button.confirm" />" title="<spring:message code="button.confirm" /> <spring:message code="input.button" />" />
			</li>
		</ul>
	</div>
	
	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list"  />">
	<colgroup>
		<col style="width: 10%;">
		<col style="width: 30%;">
	</colgroup>
	<thead>
	<tr>
		<th><input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="<spring:message code="input.selectAll.title" />"></th><!-- 선택 -->
		<th>평가지표</th><!-- 부서 명 -->
	</tr>
	</thead>
	<tbody class="ov">
	<tr ondblclick="javascript:fncSelectCai('CAI001')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI001" /></td>
		<td class="left">민원행정 및 제도개선 계획수립의 적합성</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI002')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI002" /></td>
		<td class="left">기관장의 의지 및 관심도</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI003')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI003" /></td>
		<td class="left">민원 우수 인센티브 제공</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI004')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI004" /></td>
		<td class="left">민원행정 수행기반</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI005')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI005" /></td>
		<td class="left">민원정보 제공 및 민원법령 운영</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI006')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI006" /></td>
		<td class="left">민원처리상황 확인·점검</td>
	</tr>
	<tr ondblclick="javascript:fncSelectCai('CAI007')">
		<td><input type="checkbox" name="delYn" title="checkField">
			<input type="hidden" name="checkId" value="CAI007" /></td>
		<td class="left">민원행정 및 제도개선</td>
	</tr>
	</tbody>
	</table>
	
</div><!-- end div board -->
</form:form>

</body>
</html>
