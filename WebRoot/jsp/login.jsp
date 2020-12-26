<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>${sysName }---用户登录</title>
    <base href="<%=basePath%>/">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="Shortcut Icon" href="styles/images/erpico.ico">
	<link rel="stylesheet" type="text/css" href="styles/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="styles/login.css" />
	<link rel="stylesheet" type="text/css" href="resource/easyui/themes/default/easyui.css">
	<script type="text/javascript">var basePath="<%=basePath%>/";</script>
	<script type="text/javascript" src="resource/jquery.min.js"></script>
	<script type="text/javascript" src="scripts/utils/coreUtil.js"></script>
	<script type="text/javascript" src="resource/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript">
		$("document").ready(function(){
			$.coreUtil.runJs(basePath+"scripts/login.js",function(){$.login.init();});
		});
	</script>
  </head>
<body>
<div class="login_box">
   <div class="login_l_img"><img src="styles/images/login/login-img.png" /></div>
   <div class="login">
       <div class="login_logo"><a href="#"><img src="styles/images/login/login_logo.png" /></a></div>
       <div class="login_name"><p>${sysName }</p></div>
          <input id="name" name="username" type="text" value="用户名" onfocus="this.value=''" onblur="if(this.value==''){this.value='用户名'}">
          <span id="password_text" onclick="this.style.display='none';document.getElementById('psd').style.display='block';document.getElementById('psd').focus().select();" >密码</span>
	   	  <input id="psd" name="password" type="password" style="display:none;" onblur="if(this.value==''){document.getElementById('password_text').style.display='block';this.style.display='none'};"/>
          <input id="login" value="登录" style="width:100%;" type="submit">
          <span id="loginMsg" style="color: red;height: 15px;">&nbsp;</span>
       </div>
   <div class="copyright">某某有限公司 版权所有©2016-2018 技术支持电话：000-00000000</div>
</div>
</body>
</html>