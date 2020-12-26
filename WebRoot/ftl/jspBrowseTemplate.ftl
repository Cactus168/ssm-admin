<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="${objectNameLower}ToolBar-${r"${"}modNo${r"}"}" style="display: none;">
	<#list fieldList as field>
	<#if field.attrSearch == 1>
	${field.attrTitle}：<input id="${field.attrName}" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	</#if>  
	</#list> 
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=${objectNameLower}"/>
</div>
<table id="${objectNameLower}Grid-${r"${"}modNo${r"}"}" toolbar="#${objectNameLower}ToolBar-${r"${"}modNo${r"}"}"></table>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/${packageName}/${objectNameLower}/${objectNameLower}Action.js",function(){
			${objectNameLower}.idField = '${objectNameLower}Id';
			${objectNameLower}.namespace = '${packageName}/${objectNameLower}';
			<#if dataView == "treeGrid"> 
			${objectNameLower}.treeField = '${attrTreeField}';			
			${objectNameLower}.parentIdField = 'parentId';
			${objectNameLower}.parentNameField = 'parentName';
			${objectNameLower}.treeGrid = '#${objectNameLower}Grid-${r"${"}modNo${r"}"}';
			</#if> 
			<#if dataView == "dataGrid">  
			${objectNameLower}.dataGrid = '#${objectNameLower}Grid-${r"${"}modNo${r"}"}';
			</#if>			
			${objectNameLower}.queryField = [
			<#list fieldList as field>
			<#if field.attrSearch == 1>
				"${field.attrName}",
			</#if>  
			</#list>
				"flag"
			];
			${objectNameLower}.init();
		});
	});
</script>