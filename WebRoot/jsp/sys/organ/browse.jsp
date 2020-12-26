<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="organToolBar-${modNo}" style="display: none;">
	菜单编号：<input id="organNo" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	菜单名称：<input id="organName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=organ"/>
</div>
<table id="organGrid-${modNo}" toolbar="#organToolBar-${modNo}"></table>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/organ/organAction.js",function(){
			organ.idField = 'organId';
			organ.nameField = 'organName';
			organ.parentIdField = 'parentId';
			organ.parentNameField = 'parentName';
			organ.namespace = 'sys/organ';
			organ.treeGrid = '#organGrid-${modNo}';
			organ.queryField = ["organNo","organName"];
			organ.init();
		});
	});
</script>