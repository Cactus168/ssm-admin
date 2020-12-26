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
	<link rel="stylesheet" type="text/css" href="styles/loginDialog.css" />
	<script type="text/javascript">var basePath="<%=basePath%>/";</script>
	<script type="text/javascript" src="resource/jquery.min.js"></script>
  </head>
  <script type="text/javascript">
	$(function ($) {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#LoginBox").fadeIn("slow");
		//按钮的透明度
		$("#loginbtn").hover(function () {
			$(this).stop().animate({
				opacity: '1'
			}, 600);
		}, function () {
			$(this).stop().animate({
				opacity: '0.8'
			}, 1000);
		});
		//文本框不允许为空---按钮触发
		$("#loginbtn").on('click', function () {
			var txtName = $("#txtName").val();
			var txtPwd = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$(".warning").css({ display: 'block' });
				}
				else {
					$("#warn").css({ display: 'block' });
					$("#warn2").css({ display: 'none' });
				}
			}
			else {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$("#warn").css({ display: 'none' });
					$(".warn2").css({ display: 'block' });
				}
				else {
					$(".warning").css({ display: 'none' });
					var params = {};
					params["userName"] = txtName;
					params["passWord"] = txtPwd;
					params["random"] = Math.random();
					$.post(basePath+"loginCheck.shtml",params,function(data){
						if(data.success){
							window.location.href="main/index.shtml";
						}else{
							if(data.msgIndex == 0){
								$("#loginbtn").val("登录异常！");
							}else{
								if(data.msgIndex == 1){
									$("#loginbtn").val("账号已被禁用！");
								}else{
									$("#loginbtn").val("登录");
								}
							}
						}
					},"json");
				}
			}
		});
		//文本框不允许为空---单个文本触发
		$("#txtName").on('blur', function () {
			var txtName = $("#txtName").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'none' });
			}
		});
		$("#txtName").on('focus', function () {
			$("#warn").css({ display: 'none' });
		});
		//
		$("#txtPwd").on('blur', function () {
			var txtName = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn2").css({ display: 'block' });
			}
			else {
				$("#warn2").css({ display: 'none' });
			}
		});
		$("#txtPwd").on('focus', function () {
			$("#warn2").css({ display: 'none' });
		});
	});
	</script>
<body style="width:450px;height:300px;">
<div id="LoginBox">
    <div class="row1">用户登录</div>
    <div class="row">
       	 用户名: 
       	 <span class="inputBox">
           	<input type="text" id="txtName" placeholder="账号" />
       	</span>
       	<a href="javascript:void(0)" title="提示" class="warning" id="warn">*</a>
    </div>
    <div class="row">
		密&nbsp;&nbsp;&nbsp;&nbsp;码: 
		<span class="inputBox">
            <input type="text" id="txtPwd" placeholder="密码" />
        </span>
        <a href="javascript:void(0)" title="提示" class="warning" id="warn2">*</a>
    </div>
    <div class="row">
        <a href="#" id="loginbtn">登录</a>
    </div>
</div>
</body>
</html>