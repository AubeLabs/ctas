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
<title>기관조회팝업</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">
<script type="text/javaScript" language="javascript" defer="defer">

function fncManageChecked() {

    var checkField = document.listForm.delYn;
    var checkId = document.listForm.checkId;
    var returnValue = "";

    if(checkField) {
        if(checkField.length > 1) {
            for(var i=0; i<checkField.length; i++) {
                if(checkField[i].checked)
                    checkField[i].value = checkId[i].value;
                if(returnValue == "")
                    returnValue = checkField[i].value;
                else 
                    returnValue = returnValue + ";" + checkField[i].value;
            }
        }
    } 

    document.listForm.groupIds.value = returnValue;
}

function fncSelectDeptList(pageNo){
    document.listForm.searchCondition.value = "1";
    document.listForm.pageIndex.value = pageNo;
    document.listForm.submit();
}

function fncSelectDept(deptCode, deptNm) {
	
    //opener.document.listForm.deptCode.value = deptCode;
    opener.document.ctasForm.srchOrg.value = deptNm;
    opener.goSearch();
    window.close();
}

function linkPage(pageNo){
    document.listForm.searchCondition.value = "1";
    document.listForm.pageIndex.value = pageNo;
    document.listForm.submit();
}

function fncSelectDeptConfirm() {
	var checkField = document.listForm.delYn;
    var checkFieldCd = document.listForm.checkId;
	var checkFieldNm = document.listForm.checkNm;
	var checkCount = 0;

	var org_cd;
	var org_nm;
	
	if(checkField) {
		if(checkField.length > 1) {
			for(var i=0; i<checkField.length; i++) {
				if(checkField[i].checked) {
					checkCount++;
                    org_cd = checkFieldCd[i].value;
                    org_nm = checkFieldNm[i].value;
				}
			}

			if(checkCount == 1) {
             // window.returnValue = org_cd + "|" + org_nm; 
             	opener.document.ctasForm.srchOrg.value = org_nm;
                //opener.document.listForm.deptCode.value = org_cd;
                //opener.document.lstForm.deptNm.value = org_nm;
                opener.goSearch();
                window.close();
		    } else {
			    alert("하나의 기관을 선택하세요.");
			    return;
			}
		} else {
			if(document.listForm.delYn.checked) {
             // window.returnValue = document.listForm.checkId.value + "|" + document.listForm.checkNm.value;
                opener.document.listForm.deptCode.value = document.listForm.checkId.value;
                opener.document.listForm.deptNm.value = document.listForm.checkNm.value;
                window.close();
			} else {
	            alert("선택된 항목이 없습니다.");
	            return;
			}
		} 
	} else {
        alert("조회 후 선택하시기 바랍니다.");
        return;
	}
}

function press() {

    if (event.keyCode==13) {
    	fncSelectDeptList('1');
    }
}
</script>
</head>
<body>

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>
<form:form name="listForm" action="${pageContext.request.contextPath}/OrgSearchList.do" method="post">
<div class="popup">
	<h1>기관조회 목록</h1>
	<!-- 검색영역 -->
	<div class="search_box" title="<spring:message code="common.searchCondition.msg" />">
		<ul>
			<li><div style="line-height:4px;">&nbsp;</div><div>기관명 : </div></li><!-- 기관명 -->
			<!-- 검색키워드 및 조회버튼 -->
			<li>
				<input class="s_input" name="searchKeyword" type="text"  size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />" value='<c:out value="${deptAuthorVO.searchKeyword}"/>'  maxlength="155" >
				<input type="submit" class="s_btn" value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" />
				<input type="button" class="s_btn" onClick="fncSelectDeptConfirm()" value="<spring:message code="button.confirm" />" title="<spring:message code="button.confirm" /> <spring:message code="input.button" />" />
			
			</li>
		</ul>
	</div>
	
	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
	<caption>${pageTitle} <spring:message code="title.list" /></caption>
	<colgroup>
		<col style="width: 10%;">
		<col style="width: 30%;">
		<col style="width: 30%;">
		<col style="width: 10%;">
		<col style="width: 10%;">
		<col style="width: 10%;">
	</colgroup>
	<thead>
	<tr>
		<th>선택</th><!-- 선택 -->
		<th class="board_th_link">기관ID</th><!-- 부서 ID -->
		<th>기관명</th><!-- 부서 명 -->
		<th>보고서</th>
		<th>실적<br>증빙</th>
		<th>평가</th>
	</tr>
	</thead>
	<tbody class="ov">
	<c:if test="${fn:length(deptList) == 0}">
	<tr>
		<td colspan="6"><spring:message code="common.nodata.msg" /></td>
	</tr>
	</c:if>
	<c:forEach var="dept" items="${deptList}" varStatus="status">
	<tr ondblclick="javascript:fncSelectDept('<c:out value="${dept.deptCode}"/>', '<c:out value="${dept.deptNm}"/>')">
	    <td><input type="checkbox" name="delYn" title="checkField <c:out value='${status.count}'/>"><input type="hidden" name="checkId" value="<c:out value="${dept.deptCode}"/>" /><input type="hidden" name="checkNm" value="<c:out value="${dept.deptNm}"/>" /></td>
	    <td><c:out value="${dept.deptCode}"/></td>
	    <td class="left"><c:out value="${dept.deptNm}"/></td>
	    <td><c:out value="${dept.ASSESS_FILE_CNT}"/></td>
	    <td><c:out value="${dept.ATCH_FILE_CNT}"/></td>
	    <td><c:out value="${dept.SCORE_CNT}"/></td>
	</tr>
	</c:forEach>
	</tbody>
	</table>
	
	<c:if test="${!empty deptAuthorVO.pageIndex }">
		<!-- paging navigation -->
		<div class="pagination">
			<ul><ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="linkPage"/></ul>
		</div>
	</c:if>


</div><!-- end div board -->


<input type="hidden" name="pageIndex" value="<c:out value='${deptAuthorVO.pageIndex}'/>"/>
<input type="hidden" name="searchCondition" value="1"/>
</form:form>

</body>
</html>
