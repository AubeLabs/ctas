<%@ page language="java" contentType="text/html; charset=utf-8" %>
<%@ page import="com.gpki.gpkiapi.cert.*" %>
<%@ page import="com.gpki.gpkiapi.cms.*" %>
<%@ page import="com.gpki.gpkiapi.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" %>
<%@include file="./gpkisecureweb.jsp"%>
<%
	String juminNumber = "801378-5837231한글";
	String sessionid   = session.getId(); 
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
		gpSessionId = "<%=sessionid%>";
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
					<h2><span class="subject">2. 보안 세션(세션키)을 이용한 암호 메시지 (송수신 자료 암호화)</span><br/></h2>
				</div>
				<div class="list_01">
					<ul>
						<li><span class="subject">- 서버에서 암호화 메시지 만들어 클라이언트에서 복호화 하기</span><span class="sub"><br /><br /></span></li>
						<li><strong>&nbsp;&nbsp;&nbsp;* 암호 메시지 복호화 하기 (Decrypt)</strong></li>
						<li><span>&nbsp;&nbsp;&nbsp;버에서 전송된 메시지를 클라이언트에서 복호화 합니다.<br/></span></li>
					</ul>
					<div class="form">
						[보안 세션 암호 메시지 원본]<br/>
						주민번호 : <%=juminNumber %><br/><br/>
						[서버에서 암호 처리된 메시지]<br/>
						<ENCRYPT_DATA>
						주민번호 : <%=juminNumber %>
						</ENCRYPT_DATA>
						<br/><br/><br/>
						<button  onclick="alert(data);"> 서버에서 만든 암호 메시지 보기</button><br/><br/>
					</div>
				</div>
			</div>
		</div>
		<div class="sp"></div>
	</div>
</body>
</html>

