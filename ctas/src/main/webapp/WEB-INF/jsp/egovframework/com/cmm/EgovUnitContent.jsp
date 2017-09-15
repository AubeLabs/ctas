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
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/com/com.css' />">

<title>민원서비스 종합평가</title>
<script type="text/javaScript" language="javascript">
	//parent._top.menuDspl("block",'${loginVO.name}');
	parent.selectedMenu = "";
	parent._top.location.reload(true);
</script>
</head>
<body>
<%-- 	<c:if test="${loginVO != null}">
		${loginVO.name }님 환영합니다. <a href="${pageContext.request.contextPath }/uat/uia/actionLogout.do">로그아웃</a>
	</c:if> --%>
	<c:if test="${loginVO == null }">
		<jsp:forward page="/uat/uia/egovLoginUsr.do"/>
	</c:if>
	
	<!-- <h1 style="text-align: center; font-size:20px">민원서비스 종합평가시스템에 오신 걸 환영합니다.</h1> -->
	<br/><br/>

	<c:if test="${loginVO != null && loginVO.getGroupId() == 'GROUP_00000000000003' }">
<div class="board">
	<h1 class="circle_chck">종합평가현황</h1>
	<br/><br/>
	<!-- 목록영역 -->
	<table class="board_list" summary="종합평가현황">
	<caption>종합평가현황</caption>
	<colgroup>
		<col style="width: 20%;">
		<col style="width: 20%;">
		<col style="width: 20%;">
		<col style="width: 20%;">
		<col style="width: ;">
	</colgroup>
	<thead>
	<tr>
		<th class="board_th_link">대상기관</th>
		<th class="board_th_link">업로드 진행</th>
		<th class="board_th_link">업로드 완료</th>
		<th class="board_th_link">평정 진행</th>
		<th class="board_th_link">평정 완료</th>
	</tr>
	</thead>
	<tbody class="ov">
	<tr>
		<td class="center"><c:out value="${allStatus.ORG_CNT}"/></td>
		<td class="center"><c:out value="${allStatus.UPLOAD_PROGRESS_CNT}"/></td>
		<td class="center"><c:out value="${allStatus.UPLOAD_COMPLETE_CNT}"/></td>
		<td class="center"><c:out value="${allStatus.RATING_PROGRESS_CNT}"/></td>
		<td class="center"><c:out value="${allStatus.RAING_COMPLETE_CNT}"/></td>
	</tr>
	</tbody>
	</table>
	
</div><!-- end div board -->

	<br/><br/>
	</c:if>

<div class="board">
	<h1 class="circle_chck">공지사항</h1>
	<br/><br/>
	<!-- 목록영역 -->
	<table class="board_list" >
	<colgroup>
		<col style="width: 9%;">
		<col style="width: 40%;">
		<col style="width: 13%;">
		<col style="width: 13%;">
		<col style="width: 13%;">
	</colgroup>
	<thead>
	<tr>
		<th><spring:message code="table.num" /></th><!-- 번호 -->
		<th class="board_th_link"><spring:message code="comCopBbs.articleVO.list.nttSj" /></th><!--글 제목  -->
		<th><spring:message code="table.reger" /></th><!-- 작성자명 -->
		<th><spring:message code="table.regdate" /></th><!-- 작성시각 -->
		<th><spring:message code="comCopBbs.articleVO.list.inqireCo" /></th><!-- 조회수  -->
	</tr>
	</thead>
	<tbody class="ov">
	<!-- 본문 -->
	<c:forEach items="${noticeList}" var="resultInfo" varStatus="status">
	<tr>
		<td><c:out value="${status.count}"/></td>
		
	<c:choose>
		<c:when test="${resultInfo.sjBoldAt == 'Y'}">
		<!-- 제목 Bold인 경우  -->
		<td class="bold">
		<form name="subForm" method="post" action="<c:url value='/cop/bbs/selectArticleDetail.do'/>">
			    <input name="nttId" type="hidden" value="<c:out value="${resultInfo.nttId}"/>">
			    <input name="bbsId" type="hidden" value="<c:out value="${resultInfo.bbsId}"/>">
			    <input name="pageIndex" type="hidden" value="0"/>
			    <span class="link"><c:if test="${resultInfo.replyLc!=0}"><c:forEach begin="0" end="${resultInfo.replyLc}" step="1">&nbsp;	</c:forEach><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_reply.png'/>" alt="secret"></c:if><input type="submit" value="<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/><c:if test="${resultInfo.commentCo != ''}">	<c:out value='[${resultInfo.commentCo}]'/></c:if>" style="border:0px solid #e0e0e0;"></span>
		</form>
		</td>
		</c:when>
		<c:when test="${resultInfo.secretAt == 'Y' && loginVO.uniqId != resultInfo.frstRegisterId}">
		<!-- 비밀글이며 작성자가 본인이 아닌 경우(클릭 불가) -->
		<td class="left">
		<c:if test="${resultInfo.replyLc!=0}">
    		<c:forEach begin="0" end="${resultInfo.replyLc}" step="1">
    			&nbsp;
    		</c:forEach>
    	</c:if>
		<img src="<c:url value='/images/egovframework/com/cop/bbs/icon_lock.png'/>" alt="secret">&nbsp;<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/>
		<c:if test="${resultInfo.commentCo != ''}">
			<c:out value='[${resultInfo.commentCo}]'/>
		</c:if>
		</td>
		</c:when>
		<c:otherwise>
		<!-- 나머지 경우 -->
		<td class="left">
    	<form name="subForm" method="post" action="<c:url value='/cop/bbs/selectArticleDetail.do'/>">
			    <input name="nttId" type="hidden" value="<c:out value="${resultInfo.nttId}"/>">
			    <input name="bbsId" type="hidden" value="<c:out value="${resultInfo.bbsId}"/>">
			    <input name="pageIndex" type="hidden" value="0"/>
			    <span class="link"><c:if test="${resultInfo.replyLc!=0}"><c:forEach begin="0" end="${resultInfo.replyLc}" step="1">&nbsp;	</c:forEach><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_reply.png'/>" alt="secret"></c:if><input type="submit" value="<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/><c:if test="${resultInfo.commentCo != ''}">	<c:out value='[${resultInfo.commentCo}]'/></c:if>" style="border:0px solid #e0e0e0;"></span>
		</form>
		</td>
		</c:otherwise>
	</c:choose>
		<td><c:out value='${resultInfo.frstRegisterNm}'/></td>
		<td><c:out value='${resultInfo.frstRegisterPnttm}'/></td>
		<td><c:out value='${resultInfo.inqireCo}'/></td>		
	</tr>
	</c:forEach>

	<c:if test="${fn:length(noticeList) == 0}">
	<!-- 글이 없는 경우 -->
	<tr>
		<td colspan="5"><spring:message code="common.nodata.msg" /></td>
	</tr>
	</c:if>
	</tbody>
	</table>
</div><!-- end div board -->
	<br/><br/>
	
<div class="board">
	<h1 class="circle_chck">자료실</h1>
	<br/><br/>
	<!-- 목록영역 -->
	<table class="board_list" >
	<colgroup>
		<col style="width: 9%;">
		<col style="width: 40%;">
		<col style="width: 13%;">
		<col style="width: 13%;">
		<col style="width: 13%;">
	</colgroup>
	<thead>
	<tr>
		<th><spring:message code="table.num" /></th><!-- 번호 -->
		<th class="board_th_link"><spring:message code="comCopBbs.articleVO.list.nttSj" /></th><!--글 제목  -->
		<th><spring:message code="table.reger" /></th><!-- 작성자명 -->
		<th><spring:message code="table.regdate" /></th><!-- 작성시각 -->
		<th><spring:message code="comCopBbs.articleVO.list.inqireCo" /></th><!-- 조회수  -->
	</tr>
	</thead>
	<tbody class="ov">
	<!-- 본문 -->
	<c:forEach items="${databoardList}" var="resultInfo" varStatus="status">
	<tr>
		<td><c:out value="${status.count}"/></td>
		
	<c:choose>
		<c:when test="${resultInfo.sjBoldAt == 'Y'}">
		<!-- 제목 Bold인 경우  -->
		<td class="bold">
		<form name="subForm" method="post" action="<c:url value='/cop/bbs/selectArticleDetail.do'/>">
			    <input name="nttId" type="hidden" value="<c:out value="${resultInfo.nttId}"/>">
			    <input name="bbsId" type="hidden" value="<c:out value="${resultInfo.bbsId}"/>">
			    <input name="pageIndex" type="hidden" value="0"/>
			    <span class="link"><c:if test="${resultInfo.replyLc!=0}"><c:forEach begin="0" end="${resultInfo.replyLc}" step="1">&nbsp;	</c:forEach><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_reply.png'/>" alt="secret"></c:if><input type="submit" value="<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/><c:if test="${resultInfo.commentCo != ''}">	<c:out value='[${resultInfo.commentCo}]'/></c:if>" style="border:0px solid #e0e0e0;"></span>
		</form>
		</td>
		</c:when>
		<c:when test="${resultInfo.secretAt == 'Y' && loginVO.uniqId != resultInfo.frstRegisterId}">
		<!-- 비밀글이며 작성자가 본인이 아닌 경우(클릭 불가) -->
		<td class="left">
		<c:if test="${resultInfo.replyLc!=0}">
    		<c:forEach begin="0" end="${resultInfo.replyLc}" step="1">
    			&nbsp;
    		</c:forEach>
    	</c:if>
		<img src="<c:url value='/images/egovframework/com/cop/bbs/icon_lock.png'/>" alt="secret">&nbsp;<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/>
		<c:if test="${resultInfo.commentCo != ''}">
			<c:out value='[${resultInfo.commentCo}]'/>
		</c:if>
		</td>
		</c:when>
		<c:otherwise>
		<!-- 나머지 경우 -->
		<td class="left">
    	<form name="subForm" method="post" action="<c:url value='/cop/bbs/selectArticleDetail.do'/>">
			    <input name="nttId" type="hidden" value="<c:out value="${resultInfo.nttId}"/>">
			    <input name="bbsId" type="hidden" value="<c:out value="${resultInfo.bbsId}"/>">
			    <input name="pageIndex" type="hidden" value="0"/>
			    <span class="link"><c:if test="${resultInfo.replyLc!=0}"><c:forEach begin="0" end="${resultInfo.replyLc}" step="1">&nbsp;	</c:forEach><img src="<c:url value='/images/egovframework/com/cop/bbs/icon_reply.png'/>" alt="secret"></c:if><input type="submit" value="<c:out value='${fn:substring(resultInfo.nttSj, 0, 40)}'/><c:if test="${resultInfo.commentCo != ''}">	<c:out value='[${resultInfo.commentCo}]'/></c:if>" style="border:0px solid #e0e0e0;"></span>
		</form>
		</td>
		</c:otherwise>
	</c:choose>
		<td><c:out value='${resultInfo.frstRegisterNm}'/></td>
		<td><c:out value='${resultInfo.frstRegisterPnttm}'/></td>
		<td><c:out value='${resultInfo.inqireCo}'/></td>		
	</tr>
	</c:forEach>

	<c:if test="${fn:length(databoardList) == 0}">
	<!-- 글이 없는 경우 -->
	<tr>
		<td colspan="5"><spring:message code="common.nodata.msg" /></td>
	</tr>
	</c:if>
	</tbody>
	</table>
</div><!-- end div board -->
	<br/><br/>
</body>
</html>