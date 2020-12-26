<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="logToolBar-${modNo}" style="display: none;">
	账号：<input id="userName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	用户名：<input id="realName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	模块：<input id="menuName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	时间：<input id="beginDate" style="vertical-align:middle;height: 23px;"/>～<input id="endDate" style="vertical-align:middle;height: 23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=log"/>
</div>
<table id="logGrid-${modNo}" toolbar="#logToolBar-${modNo}"></table>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/log/logAction.js",function(){
			log.idField = 'menuId';
			log.namespace = 'sys/log';
			log.dataGrid = '#logGrid-${modNo}';
			log.queryField = ["userName","realName","menuName","beginDate","endDate"];
			log.init();
		});
	});
</script>