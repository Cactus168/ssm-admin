<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="dictToolBar-${modNo}" style="display: none;">
	编号：<input id="dictNo" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	名称：<input id="dictName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=dict"/>
</div>
<table id="dictGrid-${modNo}" toolbar="#dictToolBar-${modNo}"></table>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/dict/dictAction.js",function(){
			dict.idField = 'dictId';
			dict.nameField = 'dictName';
			dict.parentIdField = 'parentId';
			dict.parentNameField = 'parentName';
			dict.namespace = 'sys/dict';
			dict.treeGrid = '#dictGrid-${modNo}';
			dict.queryField = ["dictNo","dictName"];
			dict.init();
		});
	});
</script>