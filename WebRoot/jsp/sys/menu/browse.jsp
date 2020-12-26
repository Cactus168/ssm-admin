<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="commons" uri="/commons"%>
<div class="easyui-layout" data-options="fit:true,border: false" style="width:100%;height:100%;">
	<div data-options="region: 'center',border: false">
		<div id="menuToolBar-${modNo}" style="display: none">
			菜单编号：<input id="menuNo" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			菜单名称：<input id="menuName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=menu"/>
		</div>
		<table id="menuGrid-${modNo}" toolbar="#menuToolBar-${modNo}"></table>
	</div>
	<div data-options="region: 'east',split:true" style="width: 300px;">
	 	<div class="easyui-layout" data-options="fit:true,border: false" style="width:300px;">
			<div class="virtual_body" data-options="region:'north',split:true,title: '分配菜单按钮树', iconCls: 'icon-standard-map',border: false" style="height:50%;">
				<ul id="buttonTree-${modNo}" class="easyui-tree"></ul>
				<div class="fixed_div">
					<a class="easyui-linkbutton" icon="icon-ok" plain="false" style="vertical-align:middle;" onclick="menu.changeMenuButtonRights();">分配</a>
				</div>
			</div>
			<div calss= "virtual_body" data-options="region:'center',split:true,title: '分配菜单编码树', iconCls: 'icon-standard-map',border: false" style="height: 50%">
				<ul id="dictTree-${modNo}" class="easyui-tree"></ul>
				<div class="fixed_div">
					<a class="easyui-linkbutton" icon="icon-ok" plain="false" style="vertical-align:middle;" onclick="menu.changeMenuDictRights();">分配</a>
				</div>
	        </div
        </div>
	</div>
</div>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/menu/menuAction.js",function(){
			menu.idField = 'menuId';
			menu.nameField = 'menuName';
			menu.parentIdField = 'parentId';
			menu.parentNameField = 'parentName';
			menu.namespace = 'sys/menu';
			menu.treeGrid = '#menuGrid-${modNo}';
			menu.buttonTree = '#buttonTree-${modNo}';
			menu.dictTree = '#dictTree-${modNo}';
			menu.queryField = ["menuNo","menuName"];
			menu.menuTypes = ${commons:toJsonString(menuTypes)} || {};
			menu.init();
		});
	});
</script>