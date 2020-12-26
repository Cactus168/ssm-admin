<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
Map<String, String[]>  pms = request.getParameterMap();
for(Map.Entry<String, String[]> entry : pms.entrySet()){
	System.out.println(entry.getKey()+">>>>"+entry.getValue());
}
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>正在检测您的浏览器版本是否符合系统访问要求。。。</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=8"> <!--以IE8模式渲染-->
	<link rel="Shortcut Icon" href="<%=basePath%>/styles/images/erpico.ico">
	<script type="text/javascript">var basePath="<%=basePath%>/";</script>
	<script type="text/javascript" src="<%=basePath%>/resource/jquery.js"></script>
  	<script type="text/javascript">
	$("document").ready(function(){
		if ($.browser.msie) {
	        if ($.browser.version == "7.0"){
	        	alert("您的IE浏览器版本过低无法获得系统的最佳体验，请升级到IE8以上！");
	        	return false;
	        }
	    }
	    $("#forwardDiv").html('<jsp:forward page="/toLogin.shtml" />');
	});
	</script>
  </head>
<body>
<div id="forwardDiv"></div>
</body>
</html>