<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="easyui-layout" data-options="fit:true,border: false" style="width:100%;height:100%;">
	<div data-options="region: 'center',split:true,border: false">
		<div id="roleToolBar-${modNo}" style="display: none;">
			角色名称：<input id="roleName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=role"/>
		</div>
		<table id="roleGrid-${modNo}" toolbar="#roleToolBar-${modNo}"></table>
	</div>
	<div class="virtual_body" data-options="region:'east',split:true,title: '分配菜单权限树', iconCls: 'icon-standard-map'" style="width: 300px;">
		<ul id="menuTree-${modNo}" class="easyui-tree"></ul>
		<div class="fixed_div">
			<a class="easyui-linkbutton" icon="icon-ok" plain="false" style="vertical-align:middle;" onclick="role.changeRoleMenuRights();">授权</a>
		</div>
	</div>
</div>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/role/roleAction.js",function(){
			role.idField = 'roleId';
			role.namespace = 'sys/role';
			role.dataGrid = '#roleGrid-${modNo}';
			role.menuTree = '#menuTree-${modNo}';
			role.queryField = ["roleName"];
			role.init();
		});
	});
</script>