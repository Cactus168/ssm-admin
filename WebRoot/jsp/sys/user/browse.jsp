<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="easyui-layout" data-options="fit:true,border: false" style="width:100%;height:100%;">
	<div data-options="region: 'center',split:true,border: false">
		<div id="userToolBar-${modNo}" style="display: none">
			姓名：<input id="realName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			账号：<input id="userName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=user"/>
		</div>
		<table id="userGrid-${modNo}" toolbar="#userToolBar-${modNo}"></table>
	</div>
	<div data-options="region: 'east',split:true" style="width: 300px;">
	 	<div class="easyui-layout" data-options="fit:true,border: false" style="width:300px;">
			<div class="virtual_body" data-options="region:'north',split:true,title: '分配结构管理权限树', iconCls: 'icon-standard-map',border: false" style="height:50%;">
				<ul id="organTree-${modNo}" class="easyui-tree"></ul>
				<div class="fixed_div">
					<a class="easyui-linkbutton" icon="icon-ok" plain="false" style="vertical-align:middle;" onclick="user.changeUserOrganRights();">授权</a>
				</div>
			</div>
			<div calss= "virtual_body" data-options="region:'center',split:true,title: '分配所属角色权限树', iconCls: 'icon-standard-map',border: false" style="height: 50%">
				<ul id="roleTree-${modNo}" class="easyui-tree"></ul>
				<div class="fixed_div">
					<a class="easyui-linkbutton" icon="icon-ok" plain="false" style="vertical-align:middle;" onclick="user.changeUserRoleRights();">授权</a>
				</div>
	        </div
        </div>
	</div>
</div>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/user/userAction.js",function(){
			user.idField = 'userId';
			user.nameField = 'userName';
			user.namespace = 'sys/user';
			user.dataGrid = '#userGrid-${modNo}';
			user.organTree = '#organTree-${modNo}';
			user.roleTree = '#roleTree-${modNo}';
			user.queryField = ["realName","userName"];
			user.init();
		});
	});
</script>