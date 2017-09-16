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
	//alert('GUBUN:${GUBUN}');
}
/* ********************************************************
 * 파일첨부 버튼클릭시
 ******************************************************** */
function makeFileAttachment(idx, flag){ //0001~0010:자료, 1001~1010:실적증빙
	var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList'+idx ), 1, 'file_label'+idx );
	multi_selector.addElement( document.getElementById( 'egovfile'+idx ) );
	document.getElementById("ctacd").value=idx;
}
/* ********************************************************
 * 파일선택시
 ******************************************************** */
function goSubmit(){
	document.ctasForm.submit();
}
/* ********************************************************
 * 파일 다운로드
 ******************************************************** */
function fn_egov_downFile(atchFileId, fileSn){
	window.open("<c:url value='/cmm/fms/FileDown.do?atchFileId="+atchFileId+"&fileSn="+fileSn+"'/>");
}
/* ********************************************************
 * 파일삭제그림버튼
 ******************************************************** */
function fn_egov_deleteFile(atchFileId, fileSn, fileStreCours, streFileNm, fileNm) {
	if(!confirm(fileNm+" 파일을 삭제하시겠습니까?")) return;
	//alert(atchFileId+"    "+fileSn+"    "+path+"    "+nm);
	document.getElementById("atchFileId").value=atchFileId;
	document.getElementById("fileSn").value=fileSn;
	document.getElementById("fileStreCours").value=fileStreCours;
	document.getElementById("streFileNm").value=streFileNm;
	ctasVO.action = "<c:url value='/cmm/fms/deleteFile.do'/>";
	ctasVO.submit();
}
/* ********************************************************
 * 등록 버튼클릭시
 ******************************************************** */
function RATING(){
	if(str == ""){
		alert("등록할 자료가없습니다.");
		return;
	}
	if(!confirm("입력한 점수를 등록하시겠습니까?")) return;

	document.getElementById("rate").value=str;
	ctasVO.action = "<c:url value='/goRate.do'/>";
	ctasVO.submit();
}
/* ********************************************************
 * 조회
 ******************************************************** */
function goSearch(){
	document.ctasForm.srchOrg.value = document.ctasForm.srchOrg.value.replace(/^\s+|\s+$/g,""); //trim
	if(document.ctasForm.srchOrg.value == ""){
		alert("기관을 입력하세요.");
		window.setTimeout(function () { 
		    document.getElementById('srchOrg').focus(); 
		}, 0);
		return;
	}
	ctasVO.action = "<c:url value='/UpLoad.do'/>";
	ctasVO.submit();
}
/* ********************************************************
 * 기관조회
 ******************************************************** */
function fncSelectOrgPop() {

    var url = "<c:url value='/OrgSearchList.do'/>";
    //var openParam = "dialogWidth:500px;dialogHeight:485px;scroll:no;status:no;center:yes;resizable:yes;";
    window.open(url,"기관검색",'width=600,height=485,scrollbars=yes,resizable=yes,status=no,center:yes');

}
/* ********************************************************
 * 점수입력시
 ******************************************************** */
var str = "";
function setting(obj, org, pkstr, flag){
	if(flag == 0){
		alert("해당지표의 평가대상파일이 없습니다.");
		obj.value = "";
		return;
	}
	//alert("BEFORE TRIM : |"+obj.value+"|");	
	obj.value = obj.value.replace(/^\s+|\s+$/g,""); //trim
	//alert("AFTER TRIM : |"+obj.value+"|");
	var arrRow = str.split("；");
	str = "";
	if(isNaN(obj.value)){//입력에러
		alert("점수를 입력하세요");
		obj.value = "";
	}
	for(var i = 0 ; i < arrRow.length-1; i++){
		if(arrRow[i].indexOf(pkstr) == -1) str += arrRow[i]+"；"; 
	}
	if(obj.value == org){//원본
		
	}else{//update
		str += pkstr+"，RATING_SCORE："+obj.value+"；";
	}
	//alert(str);
	var scoreField = document.ctasForm.SCORE;
	var sum = 0;
	for(var i=0; i < scoreField.length; i++) {
		if(scoreField[i].value != "") {
			sum += Number(scoreField[i].value);
    	}
    }
	document.getElementById("SUM").innerHTML = sum;
}
function press() {

    if (event.keyCode==13) {
    	goSearch();
    }
}
</script>
</head>
<body onload="fn_egov_init()">
<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<form:form commandName="ctasVO" name = "ctasForm" action="${pageContext.request.contextPath}/insertUpLoad.do" method="post" onSubmit="fn_egov_regist_article(document.forms[0]); return false;" enctype="multipart/form-data">

	<input name="ctacd" id="ctacd" type="hidden" value="<c:out value="${ctasVO.ctacd}"/>">
	<input name="rate" id="rate" type="hidden" value="<c:out value="${ctasVO.rate}"/>">

	<input name="atchFileId" id="atchFileId" type="hidden" value="">
	<input name="fileSn" id="fileSn" type="hidden" value="">
	<input name="fileStreCours" id="fileStreCours" type="hidden" value="">
	<input name="streFileNm" id="streFileNm" type="hidden" value="">
	
	<div class="board">
	<h1 class="circle_chck">
		<c:if test="${GUBUN == 'A'}">
			지표별 자료 등록
		</c:if>
		<c:if test="${GUBUN != 'A'}">
			평정실시
		</c:if>
	</h1>

	<br/>
	
	<!-- 검색영역 -->
	<c:if test="${GUBUN != 'A'}">
		<div class="search_box2" title="<spring:message code="common.searchCondition.msg" />">
			<ul>
				<!-- 검색키워드 및 조회버튼 -->
				<li><div style="line-height:4px;">&nbsp;</div><div>기관 </div></li>
				<li>
					<input name="srchOrg" id="srchOrg" type="text" value="<c:out value='${ctasVO.srchOrg}' />" size="22" title="기관" onkeypress="press();"  />
					<input name="orgId" id="orgId" type="hidden" value="<c:out value="${ctasVO.orgId}"/>">
					<input type="button" class="s_btn" onClick="fncSelectOrgPop();return false;" value="기관찾기" title="기관찾기" />
					<input type="button" class="s_btn" onClick="goSearch();return false;" value="<spring:message code="button.inquire" />" title="<spring:message code="button.inquire" /> <spring:message code="input.button" />" />
					<input type="button" class="c_btn" onClick="RATING();return false;" value="<spring:message code="button.save" />" title="<spring:message code="button.save" /> <spring:message code="input.button" />" />
				</li>
			</ul>
		</div>
	</c:if>
	
	<br/>
	
	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
	<caption>${pageTitle} <spring:message code="title.list" /></caption>
	<colgroup>
		<c:if test="${GUBUN != 'A'}">
			<col style="width: 10%;">
		</c:if>
		<col style="width: 35%;">
		<col style="width: 20%;">
		<col style="width: 20%;">
		<c:if test="${GUBUN == 'A'}">
			<col style="width: 15%;">
		</c:if>
		<col style="width: 10%;">
	</colgroup>
	<thead>
	<tr>
		<c:if test="${GUBUN != 'A'}">
			<th>기관</th>
		</c:if>
		<th>평가지표</th>
		<th>자료</th>
		<th>실적증빙</th>
		<c:if test="${GUBUN == 'A'}">
			<th>등록</th>
		</c:if>
		<th>평가점수</th>
	</tr>
	</thead>
	<tbody class="ov">
		<c:forEach items="${uploadList}" var="uploadInfo" varStatus="status">
			<!-- 기관시작 : 실적증빙 데이터로 판단(실적증빙이 다수일수도 있기 때문) -->
			<c:if test="${uploadInfo.ORIGNL_FILE_NM == NULL || uploadInfo.MN == '1'}">
				<tr>
					<!-- 평가자 기관컬럼 보여주기 -->
					<c:if test="${GUBUN != 'A' && uploadInfo.CODE == 'CAI001'}">
						<td rowspan=10>${uploadInfo.ORGNZT_NM}
						</td>
					</c:if>
					<td style="text-align: left;">${uploadInfo.CODE_NM}</td>
					<!-- 법정민원은 실적증빙 없음 colspan으로 병합 -->
					<c:if test="${uploadInfo.RN != '010'}"><td></c:if>
					<c:if test="${uploadInfo.RN == '010' && GUBUN == 'A'}"><td colspan=2></c:if>
					<c:if test="${uploadInfo.RN == '010' && GUBUN != 'A'}"><td colspan=3></c:if>
				<!-- 자료 컬럼 -->
				<c:if test="${uploadInfo.ORIGNL_FILE_NM2 != NULL}">
					<a href="javascript:fn_egov_downFile('<c:out value="${uploadInfo.ATCH_FILE_ID2}"/>','<c:out value="${uploadInfo.FILE_SN2}"/>')">
					<c:out value="${uploadInfo.ORIGNL_FILE_NM2}"/>&nbsp;[<c:out value="${uploadInfo.FILE_SIZE2}"/>]
					</a>
						<c:if test="${GUBUN == 'A' && uploadInfo.RATING_SCORE == NULL}">
							<img src="<c:url value='/images/egovframework/com/cmm/btn/btn_del.png' />" class="cursor" 
							     onClick="fn_egov_deleteFile('<c:out value="${uploadInfo.ATCH_FILE_ID2}"/>','<c:out value="${uploadInfo.FILE_SN2}"/>','<c:out value="${uploadInfo.FILE_STRE_COURS2}"/>','<c:out value="${uploadInfo.STRE_FILE_NM2}"/>','${uploadInfo.ORIGNL_FILE_NM2}');" 
							     alt="<spring:message code="title.attachedFileDelete" />">
						</c:if>
					<br>
				</c:if>
				</td>
				<c:if test="${uploadInfo.RN != '010'}"><td></c:if>
			</c:if>
			<!-- 실적증빙 -->
			<c:if test="${uploadInfo.ORIGNL_FILE_NM != NULL && uploadInfo.RN != '010'}">
				<a href="javascript:fn_egov_downFile('<c:out value="${uploadInfo.ATCH_FILE_ID}"/>','<c:out value="${uploadInfo.FILE_SN}"/>')" title="<c:out value="${uploadInfo.ORIGNL_FILE_NM}"/>&nbsp;[<c:out value="${uploadInfo.FILE_SIZE}"/>]">
				<c:out value="${fn:substring(uploadInfo.ORIGNL_FILE_NM,0,10)}"/><c:if test="${fn:length(uploadInfo.ORIGNL_FILE_NM) > 10}">...</c:if><%-- &nbsp;[<c:out value="${uploadInfo.FILE_SIZE}"/>] --%>
				</a>
					<c:if test="${GUBUN == 'A' && uploadInfo.RATING_SCORE == NULL}">
						<img src="<c:url value='/images/egovframework/com/cmm/btn/btn_del.png' />" class="cursor" 
						     onClick="fn_egov_deleteFile('<c:out value="${uploadInfo.ATCH_FILE_ID}"/>','<c:out value="${uploadInfo.FILE_SN}"/>','<c:out value="${uploadInfo.FILE_STRE_COURS}"/>','<c:out value="${uploadInfo.STRE_FILE_NM}"/>','${uploadInfo.ORIGNL_FILE_NM}');" 
						     alt="<spring:message code="title.attachedFileDelete" />">
					</c:if>
				<br>
			</c:if>
			
			<!-- 업로드컬럼, 점수컬럼 -->
			<c:if test="${uploadInfo.ORIGNL_FILE_NM == NULL || uploadInfo.MX == '1'}">
				<!-- 법정민원이 아닌경우는 실적증빙 컬럼 td닫기 -->
				<c:if test="${uploadInfo.RN != '010'}"></td></c:if>
					<!-- 업로드컬럼 -->
					<c:if test="${GUBUN == 'A'}">
					<td>
						<!-- 자료 버튼 -->
						<div class="egov_file_box">
						<c:if test="${uploadInfo.ORIGNL_FILE_NM2 != NULL}">
							<label for="egovfile0${uploadInfo.RN}" id="file_label0${uploadInfo.RN}" onClick="if(${uploadInfo.FLAG2} == 0) alert('평가된 지표는 등록 할 수 없습니다.'); else alert('등록된 파일을 먼저삭제하세요.');" >
							<c:choose>
							<c:when test="${uploadInfo.RN == '010'}">&nbsp;명&nbsp;&nbsp;부&nbsp;</c:when>
							<c:otherwise>자료제출</c:otherwise>
							</c:choose>							
							</label>
						</c:if>
						<c:if test="${uploadInfo.ORIGNL_FILE_NM2 == NULL}">
							<label for="egovfile0${uploadInfo.RN}" id="file_label0${uploadInfo.RN}" >
							<c:choose>
							<c:when test="${uploadInfo.RN == '010'}">&nbsp;명&nbsp;&nbsp;부&nbsp;</c:when>
							<c:otherwise>자료제출</c:otherwise>
							</c:choose>
							</label>
							<input type="file" name="file0${uploadInfo.RN}" id="egovfile0${uploadInfo.RN}" onclick="javascript:makeFileAttachment('0${uploadInfo.RN}', ${uploadInfo.FLAG2});">
						</c:if>
						</div>
						<div id="egovComFileList0${uploadInfo.RN}" style="display:none;"></div>
						
						<!-- 실적증빙 버튼 -->
						<c:if test="${uploadInfo.RN != '010'}">
						<div class="egov_file_box">
						<c:if test="${uploadInfo.FLAG2 == 0}">
							<label for="egovfile1${uploadInfo.RN}" id="file_label1${uploadInfo.RN}" onClick="alert('평가된 지표는 등록 할 수 없습니다.');">실적증빙</label> 
						</c:if>
						<c:if test="${uploadInfo.FLAG2 == 1}">
							<label for="egovfile1${uploadInfo.RN}" id="file_label1${uploadInfo.RN}">실적증빙</label> 
							<input type="file" name="file1${uploadInfo.RN}" id="egovfile1${uploadInfo.RN}" onclick="javascript:makeFileAttachment('1${uploadInfo.RN}', ${uploadInfo.FLAG2});">
						</c:if>
						</div>
						<div id="egovComFileList1${uploadInfo.RN}" style="display:none;"></div>
						</c:if>
					</td>
					<td>
						${uploadInfo.RATING_SCORE}
					</td>
					</c:if>
					<!-- 점수입력컬럼 -->
					<c:if test="${GUBUN != 'A' && uploadInfo.RN != '010'}">
					<td>
					<input type="text" name="SCORE" id="SCORE" value="${uploadInfo.RATING_SCORE}" size="5" style = "text-align:right;" 
					onchange="setting(this, '${uploadInfo.RATING_SCORE}', 'ORGNZT_ID：${uploadInfo.ORGNZT_ID}，AI_CD：${uploadInfo.CODE}', ${uploadInfo.FLAG1});"  />
					</td>
					</c:if>
				
				</tr>
			</c:if>
		</c:forEach>
			
		<c:if test="${fn:length(uploadList) == 0}">
			<tr>
				<td colspan="5">기관명으로 조회하세요.</td>
			</tr>
		</c:if>
		<c:if test="${fn:length(uploadList) != 0}">
			<tr>
				<td colspan=4>합계</td>
				<td id="SUM">${uploadGrp.SUM}</td>
			</tr>
		</c:if>
	</tbody>
	</table>

	<br/><br/><br/>
</form:form>

</body>
</html>