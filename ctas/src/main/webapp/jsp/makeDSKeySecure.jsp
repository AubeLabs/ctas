<%@ page language="java" contentType="text/html; charset=euc_kr" %>
<%@ page import="com.gpki.gpkiapi.cert.*" %>
<%@ page import="com.gpki.gpkiapi.cms.*" %>
<%@ page import="com.gpki.gpkiapi.util.*" %>
<%@ page import="com.dsjdf.jdf.Logger" %>
<%@ page import="com.gpki.secureweb.SecureKeyboard" %>
<%@include file="./gpkisecureweb.jsp"%>
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<%
	SecureKeyboard obj = new SecureKeyboard(gpkirequest,gpkiresponse);
	
	gpkiresponse.setContentType("image/jpeg");
	gpkiresponse.setHeader("Cache-Control","no-store");
	gpkiresponse.setHeader("Pragma","no-cache");	
	gpkiresponse.setDateHeader("Expires",0);
	
	out.clear();
	out = pageContext.pushBody();
	
	gpkiresponse.getOutputStream().write(obj.getImageByge());
%>
