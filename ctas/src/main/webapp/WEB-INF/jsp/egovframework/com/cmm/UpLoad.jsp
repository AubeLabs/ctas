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
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/fms/EgovMultiFile.js'/>" ></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/com/cmm/utl/EgovCmmUtl.js'/>" ></script>
<script type="text/javascript" src="<c:url value="/validator.do"/>"></script>
<script src="<c:url value='/js/egovframework/com/cmm/jquery.js' />"></script>
<script src="<c:url value='/js/egovframework/com/cmm/jqueryui.js' />"></script>
<script type="text/javascript">
/*********************************************************
 * 초기화
 ******************************************************** */
function fn_egov_init(){
	//alert('init');
	try{
	 var multi_selector_1 = new MultiSelector( document.getElementById( 'egovComFileList_1' ), 1, 'file_label_1' );
	 multi_selector_1.addElement( document.getElementById( 'egovfile_1' ) );
	// 첫 입력란에 포커스..
	}catch(e){alert(e);}
}
/* ********************************************************
 * 파일첨부 
 ******************************************************** */
function makeFileAttachment(){
	//alert('ASDF');
	 var maxFileNum = 1;
	 var multi_selector = new MultiSelector( document.getElementById( 'egovComFileList' ), maxFileNum );
	 multi_selector.addElement( document.getElementById( 'egovComFileUploader' ) );
}
/* excel download function */
function fn_egov_excel(){
	document.listForm.action = "<c:url value='/gds/excelDownload.do'/>";
   	document.listForm.submit();
}
/*********************************************************
 * 페이징 처리 함수
 ******************************************************** */
function fn_egov_select_linkPage(pageNo){
	document.articleForm.pageIndex.value = pageNo;
	document.articleForm.action = "<c:url value='/cop/bbs/selectArticleList.do'/>";
   	document.articleForm.submit();
}
/*********************************************************
 * 조회 처리 함수
 ******************************************************** */
function fn_egov_search_article(){
	document.articleForm.pageIndex.value = 1;
	document.articleForm.submit();
}
/* ********************************************************
 * 상세회면 처리 함수
 ******************************************************** */
function fn_egov_inquire_articledetail(bbsId, nttId) {
	// 사이트 키값(siteId) 셋팅.
	document.articleForm.bbsId.value = bbsId;
	document.articleForm.nttId.value = nttId;
  	document.articleForm.action = "<c:url value='/cop/bbs/selectArticleDetail.do'/>";
  	document.articleForm.submit();
}
</script>
<script type="text/javaScript" language="javascript">
	parent._top.menuDspl("block",'${loginVO.name}');
</script>
</head>
<body onload="fn_egov_init()">
<!-- javascript warning tag  -->
<noscript class="noScriptTitle"><spring:message code="common.noScriptTitle.msg" /></noscript>

<form:form commandName="articleVO" action="${pageContext.request.contextPath}/cop/bbs/insertArticle.do" method="post" onSubmit="fn_egov_regist_article(document.forms[0]); return false;" enctype="multipart/form-data">

<div class="board">
	<h1 style = "margin-bottom:30px;">평가실시</h1>

	<input name="bbsId" type="hidden" value="${boardMasterVO.bbsId}">
	</form>
	

	<!-- 목록영역 -->
	<table class="board_list" summary="<spring:message code="common.summary.list" arguments="${pageTitle}" />">
	<caption>${pageTitle} <spring:message code="title.list" /></caption>
	<colgroup>
		<col style="width: 15%;">
		<col style="width: 15%;">
		<col style="width: 40%;">
		<col style="width: 30%;">
	</colgroup>
	<thead>
	<tr>
		<th>평가<br>분야</th><!-- 번호 -->
		<th>평가<br>항목</th><!--글 제목  -->
		<th>평가<br>지표</th><!-- 작성자명 -->
		<th>첨부파일</th><!-- 작성시각 -->
	</tr>
	</thead>
	<tbody class="ov">
	
	<tr>
		<td rowspan="4">민원<br>행정<br>관리<br>기반</td>
		<td rowspan="4">민원<br>행정<br>전략 및<br>체계</td>
		<td>민원행정 및 제도개선 계획수립의 적합성</td>
		<td>			
			<div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label_1"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList_1"></div>
			</div>
		</td>		
	</tr>
	<tr>
		<td>기관장의 의지 및 관심도</td>
		<td>			
			<div>
				<div class="egov_file_box">
				<label for="egovfile_2" id="file_label_2"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_2" id="egovfile_2"> 
				</div>
				<div id="egovComFileList_2"></div>
			</div>
		</td>		
	</tr>
	<tr>
		<td>민원 우수 인센티브 제공</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td>민원행정 수행기반</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td rowspan="4">민원<br>행정<br>활동</td>
		<td rowspan="3">민원<br>제도<br>운영</td>
		<td>민원정보 제공 및 민원법령 운영</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td>민원처리상황 확인·점검</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td>민원행정 및 제도개선</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td>민원<br>처리</td>
		<td>처리기간 준수율</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	<tr>
		<td>민원<br>처리<br>성과</td>
		<td>민원<br>만족도</td>
		<td>자체포털민원 만족도</td>
		<td>			
			<%-- <div>
				<div class="egov_file_box">
				<label for="egovfile_1" id="file_label"><spring:message code="title.attachedFileSelect" /></label> 
				<input type="file" name="file_1" id="egovfile_1"> 
				</div>
				<div id="egovComFileList"></div>
			</div> --%>
		</td>		
	</tr>
	</tbody>
	</table>
	
<input type="hidden" name="replyPosblAt" value="<c:out value='${boardMasterVO.replyPosblAt}'/>" />
<input type="hidden" name="fileAtchPosblAt" value="<c:out value='${boardMasterVO.fileAtchPosblAt}'/>" />
<input type="hidden" name="atchPosblFileNumber" value="<c:out value='${boardMasterVO.atchPosblFileNumber}'/>" />
<input type="hidden" name="atchPosblFileSize" value="<c:out value='${boardMasterVO.atchPosblFileSize}'/>" />
<input type="hidden" name="tmplatId" value="<c:out value='${boardMasterVO.tmplatId}'/>" />
</form:form>

<%-- 
	<!-- paging navigation -->
	<div class="pagination">
		<ul>
		<ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_egov_select_linkPage"/>
		</ul>
	</div>
	
	<!-- 등록버튼 -->
	
	<div class="btn">
		<span class="btn_s"><a href="<c:url value='/cop/bbs/excelDownload.do' />"  title="<spring:message code="button.create" /> <spring:message code="input.button" />"><spring:message code="button.create" /></a></span>
	</div>
	
	
</div>

<input name="nttId" type="hidden" value="0">
<input name="bbsId" type="hidden" value="${boardMasterVO.bbsId}">
<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>">

 --%>
</body>
</html>