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
//alert("${GUBUN}"); //1:인증서등록 2:통계
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
	if("${GUBUN}" == 1){
		opener.document.mber.orgId.value = deptCode;
		opener.document.mber.orgNm.value = deptNm;
	}else if("${GUBUN}" == 2){
		opener.document.ctasForm.items1.value = "AND A2.ORGNZT_ID='"+deptCode+"'";
		opener.document.ctasForm.select1.value = deptNm;
	    //opener.goSearch();
	}else{
	    opener.document.ctasForm.srchOrg.value = deptNm;
	    opener.goSearch();
	}
    window.close();
}

function linkPage(pageNo){
    document.listForm.searchCondition.value = "1";
    document.listForm.pageIndex.value = pageNo;
    document.listForm.submit();
}
function CheckedEvt(obj, cd){
	var chkChg = document.getElementById("chkChg");
	if(obj.checked){
		chkChg.value += "'"+cd+"'";
	}else{
		chkChg.value = chkChg.value.replace("'"+cd+"'", "");
	}
}
function fncSelectDeptConfirm() {
	var checkField = document.listForm.delYn;
    var checkFieldCd = document.listForm.checkId;
	var checkFieldNm = document.listForm.checkNm;
	var checkCount = 0;

	var org_cd;
	var org_nm;
	var inItems="''";
	var notInItems="''";
	
	if(checkField) {
		if(checkField.length > 1) {
			for(var i=0; i<checkField.length; i++) {
				if(checkField[i].checked) {
					checkCount++;
                    org_cd = checkFieldCd[i].value;
                    org_nm = checkFieldNm[i].value;
                    inItems  +=  ","+("'"+checkFieldCd[i].value+"'");
				}else{
					notInItems  +=  ","+("'"+checkFieldCd[i].value+"'");
				}
			}
			if(checkCount == 0){
				alert("선택된 항목이 없습니다.");
				return;
			}
			if("${GUBUN}" == 2){
				if(checkField.length == checkCount){
					opener.document.ctasForm.items1.value = "";
					opener.document.ctasForm.select1.value = "전체";
					window.close();
					return;
				}else if(inItems.length <= notInItems.length){
					opener.document.ctasForm.items1.value = "AND A2.ORGNZT_ID IN("+inItems+")";
				}else {
					opener.document.ctasForm.items1.value = "AND A2.ORGNZT_ID NOT IN("+notInItems+")";
				}
				opener.document.ctasForm.select1.value = org_nm+(checkCount>1?" 외 "+(checkCount-1)+"개 기관":"");
				window.close();
				return;
			}else{
				if(checkCount == 1) {
					if("${GUBUN}" == 1){
						opener.document.mber.orgId.value = org_cd;
						opener.document.mber.orgNm.value = org_nm;
					}else{
		             	opener.document.ctasForm.srchOrg.value = org_nm;
		                opener.goSearch();
					}
	             	
	                window.close();
			    } else {
				    alert("하나의 기관을 선택하세요.");
				    return;
				}
			}

		} else {
			if(document.listForm.delYn.checked) {
				if("${GUBUN}" == 1){
					opener.document.mber.orgId.value = document.listForm.checkId.value;
					opener.document.mber.orgNm.value = document.listForm.checkNm.value;
				}else if("${GUBUN}" == 2){
					opener.document.ctasForm.items1.value = "AND A2.ORGNZT_ID='"+document.listForm.checkId.value+"'";
					opener.document.ctasForm.select1.value = document.listForm.checkNm.value;
				    //opener.goSearch();
				}else{
				    opener.document.ctasForm.srchOrg.value = document.listForm.checkNm.value;
				    opener.goSearch();
				}
			    window.close();
			    return;
                /* opener.document.listForm.deptCode.value = document.listForm.checkId.value;
                opener.document.listForm.deptNm.value = document.listForm.checkNm.value;
                window.close(); */
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
//등록
function fnSearch(form){
	if("${GUBUN}" == '1') form.action = "${pageContext.request.contextPath}/OrgSearchList.do?GUBUN=1";
	else if("${GUBUN}" == '2') form.action = "${pageContext.request.contextPath}/OrgSearchList.do?GUBUN=2";
	form.submit();
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
function fnOrd(selectQryOrd){
	if(selectQryOrd == document.getElementById("ordCol").value){//기존에 선택되어있다면 ordTyp도 값이있음.
		if(document.getElementById("ordTyp").value == "")//오름차순이면
			document.getElementById("ordTyp").value = "DESC";//내림차순으로
		else document.getElementById("ordTyp").value = "";
	}else{
		document.getElementById("ordCol").value = selectQryOrd;
		document.getElementById("ordTyp").value = "DESC";
	}
	fnSearch(document.forms[0]);
}
function getChecked(){
	var chkChg = document.getElementById("chkChg");
	var checkField = document.listForm.delYn;
	var checkFieldCd = document.listForm.checkId;
	
	for(var i=0; i < checkField.length; i++) {
		if(checkField[i].checked) {
    		chkChg.value += "'"+checkFieldCd[i].value+"'";//최초 담아주기
    	}
    }
}
function setChecked(){

	var chkChg = document.getElementById("chkChg");
	var str = opener.document.ctasForm.items1.value;
	var checkField = document.listForm.delYn;
	var checkFieldCd = document.listForm.checkId;
	
	if(chkChg.value != ""){
		if(checkField) {
			if(checkField.length > 1) {
	            for(var i=0; i < checkField.length; i++) {
	            	if(chkChg.value.indexOf("'"+checkFieldCd[i].value+"'") != -1){
	            		checkField[i].checked = true;
	            	}
	            }
	        }
		}
		return;
	}
	
	if(str == ""){
		document.listForm.checkAll.checked = true;
		fncCheckAll();
		getChecked();
		return;
	}

	if(checkField) {
		if(str.indexOf("NOT IN") == -1){//IN절일때는 찾으면(-1이아닌경우) 체크
	        if(checkField.length > 1) {
	            for(var i=0; i < checkField.length; i++) {
	            	if(str.indexOf("'"+checkFieldCd[i].value+"'") != -1){
	            		checkField[i].checked = true;
	            	}
	            }
	        }
		}else{ //NOT IN절일때는 찾지못하면(-1인경우) 체크
			if(checkField.length > 1) {
	            for(var i=0; i < checkField.length; i++) {
	            	if(str.indexOf("'"+checkFieldCd[i].value+"'") == -1){
	            		checkField[i].checked = true;
	            	}
	            }
	        }
		}
    }
	getChecked();
}
function setOrd(){
	var col = document.getElementById("ordCol").value;
	var typ = document.getElementById("ordTyp").value;
	if(col == "") return;
	var td = eval('document.getElementById("Col'+col+'")');
	var hdStr = td.innerHTML;
	td.innerHTML = hdStr+(typ==""?'▲':'▼');
}
function fn_init(){
	if('${GUBUN}' != 1 ) {
		setOrd();
	}
	if('${GUBUN}' == 2) {
		setChecked();
	}
}

</script>
</head>
<body onload="fn_init()">

<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<form:form name="listForm" action="${pageContext.request.contextPath}/OrgSearchList.do" onSubmit="fnSearch(document.forms[0]); return false;" method="post">

<div class="popup">
	<h1>기관조회 목록</h1>
	<!-- 검색영역 -->
	<div class="search_box" title="<spring:message code="common.searchCondition.msg" />">
		<ul>
			<li><div style="line-height:4px;">&nbsp;</div><div>기관명 : </div></li><!-- 기관명 -->
			<!-- 검색키워드 및 조회버튼 -->
			<li>
				<input class="s_input" name="searchKeyword" type="text"  size="35" title="<spring:message code="title.search" /> <spring:message code="input.input" />" value='<c:out value="${ctasVO.searchKeyword}"/>'  maxlength="155" >
				<input type="submit" class="s_btn" value="<spring:message code="button.inquire" />" title="<spring:message code="title.inquire" /> <spring:message code="input.button" />" />
				<input type="button" class="s_btn" onClick="fncSelectDeptConfirm()" value="<spring:message code="button.confirm" />" title="<spring:message code="button.confirm" /> <spring:message code="input.button" />" />
			</li>
		</ul>
	</div>
	
	<input name="ordCol" id="ordCol" type="hidden" value="<c:out value="${ctasVO.ordCol}"/>">
	<input name="ordTyp" id="ordTyp" type="hidden" value="<c:out value="${ctasVO.ordTyp}"/>">
	<input name="chkChg" id="chkChg" type="hidden" value="<c:out value="${ctasVO.chkChg}"/>">
	
	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
	<caption>${pageTitle} <spring:message code="title.list" /></caption>
	<colgroup>
		<col style="width: 10%;">
		<%-- <col style="width: 30%;"> --%>
		<col style="width: 30%;">
		<c:if test="${GUBUN != '1'}">
			<col style="width: 10%;">
			<col style="width: 10%;">
			<col style="width: 10%;">
			<col style="width: 10%;">
		</c:if>
	</colgroup>
	<thead>
	<tr>
		<th>
			<c:if test="${GUBUN == '2'}">
				<input type="checkbox" name="checkAll" class="check2" onclick="javascript:fncCheckAll()" title="<spring:message code="input.selectAll.title" />">
			</c:if>
			<c:if test="${GUBUN != '2'}">선택</c:if>
		</th><!-- 선택 -->
		<!-- <th class="board_th_link">기관ID</th> -->
		<th>기관명</th><!-- 부서 명 -->
		<c:if test="${GUBUN != '1'}">
			<th id="Col3" onclick="fnOrd('3');">보고서<br>업로드수</th>
			<th id="Col4" onclick="fnOrd('4');">실적증빙<br>업로드수</th>
			<th id="Col5" onclick="fnOrd('5');">평가<br>지표수</th>
			<th id="Col6" onclick="fnOrd('6');">점수<br>합계</th>
		</c:if>
	</tr>
	</thead>
	<tbody class="ov">
	<c:if test="${fn:length(orgList) == 0}">
	<tr>
		<c:if test="${GUBUN != '1'}">
		<td colspan="6"><spring:message code="common.nodata.msg" /></td>
		</c:if>
		<c:if test="${GUBUN == '1'}">
		<td colspan="2"><spring:message code="common.nodata.msg" /></td>
		</c:if>
	</tr>
	</c:if>
	<c:forEach var="org" items="${orgList}" varStatus="status">
	<tr ondblclick="javascript:fncSelectDept('<c:out value="${org.ORG_CODE}"/>', '<c:out value="${org.ORG_NM}"/>')">
	    <td><input type="checkbox" onchange="CheckedEvt(this, '${org.ORG_CODE}')" name="delYn" title="checkField <c:out value='${status.count}'/>"><input type="hidden" name="checkId" value="<c:out value="${org.ORG_CODE}"/>" /><input type="hidden" name="checkNm" value="<c:out value="${org.ORG_NM}"/>" /></td>
	    <%-- <td><c:out value="${dept.ORG_NM}"/></td> --%>
	    <td class="left">${org.ORG_NM2}</td>
	    <c:if test="${GUBUN != '1'}">
		    <td><c:out value="${org.ASSESS_FILE_CNT}"/></td>
		    <td><c:out value="${org.ATCH_FILE_CNT}"/></td>
		    <td><c:out value="${org.SCORE_CNT}"/></td>
		    <td><c:out value="${org.SCORE_SUM}"/></td>
	    </c:if>
	</tr>
	</c:forEach>
	</tbody>
	</table>

</div><!-- end div board -->

</form:form>
<br><br><br>
</body>
</html>
