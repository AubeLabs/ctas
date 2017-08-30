<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.sql.*, java.io.*, java.net.*, java.util.*" %>
<%@ include file="./gpkisecureweb.jsp" %>
<%@ page import="com.gpki.servlet.GPKIHttpServletResponse" %>
<%
	String challenge = gpkiresponse.getChallenge();
	String sessionid = gpkirequest.getSession().getId();
	String url = javax.servlet.http.HttpUtils.getRequestURL(request).toString();
	session.setAttribute("currentpage",url);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>GPKI 사용자용 표준보안API</title>
	<script type="text/javascript" src="../client/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="../client/var.js"></script>
	<script type="text/javascript" src="../client/install.js"></script>
	<script type="text/javascript" src="../client/GPKIFunc.js"></script>
	<script type="text/javascript" src="../client/object.js"></script>
	<link rel="stylesheet" type="text/css" href="../css/style.css" />
	<script type="text/javascript">
		// 가상 키보드 사용을 위한 보안 세션 초기화
		initSecureSession("<%=sessionid%>");
	</script>
</head>

<body>
	<div class="wrap">
		<div class="header">
			<h1><a href="../index.html"><strong>GPKI 사용자용 표준보안API</strong></a></h1>
		</div>
		<div class="content">
			<div class="course course1">
				<div class="title">
					<h2><span class="subject">1. 사용자 인증 및 보안 세션 만들기</span></h2><br/>
				</div>
				<div class="list_01">
					<ul>
						<li><span class="subject">- 사용자와 서버 인증서 인증 후 보안 세션 만들기 (인증서 로그인)</span><span class="sub"><br/><br/></span></li>
						<li><strong>&nbsp;&nbsp;&nbsp;* URL Link를 이용한 로그인</strong></li>
						<li><span>
							&nbsp;&nbsp;&nbsp;PopUp 형태의 인증서 사용자 인터페이스를 이용하여 사용자 인증서를 선택할 수 있으며,<br/>
							&nbsp;&nbsp;&nbsp;URL Link 를 파라미터로 받아 로그인 메시지를 생성하여 서버에 전송합니다.<br/>
							&nbsp;&nbsp;&nbsp;서버 인증서를 이용하여 전달받은 URL Link 내 파라미터 값들에 대한 공개키 암호화<br/>
							&nbsp;&nbsp;&nbsp;메시지를 생성합니다.<br/>
							&nbsp;&nbsp;&nbsp;또한, 로그인 이후 보안 세션 구성을 위한 세션키도 암호화 하여 서버와 공유 합니다.<br/>
						</span></li>
					</ul>
					<br/>&nbsp;&nbsp;&nbsp;키보드 보안 옵션:
					<select id="keysec">
						<option value="1">가상 키보드</option>
						<option value="2" selected="selected">키보드 보안</option>
						<option value="0">사용하지 않음</option>
					</select><br/><br/>
					<div class="form_01">
						암호화 원문 데이터 : <p style="width:50px">http://192.168.0.11:18080/createSecureSessi <br/></p>
						<p>on_1_1_response.jsp?param1=123& param2=345</p>
						<p>&challenge=<%=challenge%></p>
						<br/>
						Replay Attack 방지 : <input type="text" name="challenge" width="40px" value="<%=challenge%>" disabled><br/><br/><br/><br/>
						<a href="./createSecureSession_1_1_response.jsp?param1=123&param2=345&challenge=<%=challenge%>" onclick="return LoginLink(this,'<%=sessionid%>');">보안 세션 요청(로그인)</a>
					</div>
				</div>
			</div>
		</div>
		<div class="sp"></div>
	</div>
</body>
</html>

