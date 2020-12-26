<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="commons" uri="/commons"%>
<div id="buttonToolBar-${modNo}" style="display: none;">
	名称：<input id="buttonName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=button"/>
</div>
<table id="buttonGrid-${modNo}" toolbar="#buttonToolBar-${modNo}"></table>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/button/buttonAction.js",function(){
			button.idField = 'buttonId';
			button.nameField = 'buttonName';
			button.parentIdField = 'parentId';
			button.parentNameField = 'parentName';
			button.namespace = 'sys/button';
			button.treeGrid = '#buttonGrid-${modNo}';
			button.queryField = ["buttonName"];
			button.buttonTypes = ${commons:toJsonString(buttonTypes)} || {};
			button.init();
		});
	});
</script>