<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 
<div id="codeToolBar-${modNo}" style="display: none;">
	处理类名：<input id="objectName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=code"/>
</div>
<table id="codeGrid-${modNo}" toolbar="#codeToolBar-${modNo}"></table>
<div id="codeAttrToolBar" style="display: none;">
	<a id="addx" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="codeAttr.add()">添加</a>
	<a id="editx" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="codeAttr.edit()">编辑</a>
	<a id="removex" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="codeAttr.remove()">删除</a>
</div>
 -->
<div class="easyui-layout" data-options="fit:true,border: false" style="width:100%;height:100%;">
	<div data-options="region: 'center',split:true,border: false">
		<div id="codeToolBar-${modNo}" style="display: none;">
			处理类名：<input id="objectName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
			<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=code"/>
		</div>
		<table id="codeGrid-${modNo}" toolbar="#codeToolBar-${modNo}"></table>
	</div>
	<div data-options="region:'east',split:true,border: false" style="width: 50%;">
		<div id="codeAttrToolBar-${modNo}" style="display: none;">
			<a id="addx" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="codeAttr.add()">添加</a>
			<a id="editx" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="codeAttr.edit()">编辑</a>
			<a id="removex" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="codeAttr.remove()">删除</a>
		</div>
		<table id="codeAttrGrid-${modNo}" toolbar="#codeAttrToolBar-${modNo}"></table>
	</div>
</div>
<div id="treeFildDiv" style="width:400px;min-height: 200px;"></div>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/code/codeAction.js",function(){
			code.idField = 'codeId';
			code.namespace = 'sys/code';
			code.dataGrid = '#codeGrid-${modNo}';
			code.init();
		});
		$.coreUtil.runJs(basePath+"jsp/sys/code/codeAttrAction.js",function(){
			codeAttr.idField = 'attrId';
			codeAttr.namespace = 'sys/codeAttr';
			codeAttr.dataGrid = '#codeAttrGrid-${modNo}';
			codeAttr.init();
		});
	});
</script>