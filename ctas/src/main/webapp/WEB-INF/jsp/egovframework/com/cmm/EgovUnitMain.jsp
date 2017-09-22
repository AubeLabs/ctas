<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="shortcut icon" href="http://www.mois.go.kr/images/frt/common/favicon.ico" type="image/x-icon" />
<link rel="apple-touch-icon-precomposed" href="http://www.mois.go.kr/images/com/114icon2.png" />
<link rel="shortcut icon" href="http://www.mois.go.kr/images/com/72icon2.png" />
<script type="text/javaScript" language="javascript">
var selectedMenu = "";
</script>

<title>민원서비스 종합평가</title>
</head>

<frameset frameborder="0" framespacing="0" rows="130, *">
	<frame name="_top" src="<c:url value='/EgovTop.do' />" scrolling="no" title="헤더">
		<frameset frameborder="0" framespacing="0" cols="0%, 90%">
			<frame name="_left" src="<c:url value='/EgovLeft.do' />" scrolling="yes" title="메뉴페이지">
			<frame name="_content" src="<c:url value='/EgovContent.do' />" title="메인페이지">
		</frameset>
	<%-- <frame name="_bottom" src="<c:url value='/EgovBottom.do' />" scrolling="no" title="푸터"> --%>
</frameset>

 