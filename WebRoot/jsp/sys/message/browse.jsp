<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div id="messageToolBar-${modNo}" style="display: none;">
	菜单编号：<input id="menuNo" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	菜单名称：<input id="menuName" class="easyui-validatebox textbox" style="vertical-align:middle;height:23px;"/>
	<jsp:include page="/jsp/commons/buttonRights.jsp?actionName=message"/>
</div>
<!-- 显示区-->
<div class="easyui-layout" data-options="fit:false" style="width:100%;height:100%;">
	<div data-options="region:'west'" style="width:450px;height:100%;">
		<table id="messageGrid-${modNo}" toolbar="#messageToolBar-${modNo}"></table>
	</div>
	<div data-options="
		region:'center',
		title:'消息',
		tools: [{    
		id:'button_edit',
        iconCls:'icon-save',
        text:'保存消息',
        handler:function(){admin.baseAreaParameter.operate.SaveMessage()}    
    	}]" style="width:100%;height:100%;">
		<form id="baseAreaParameterDivForm" method="post">
			<input id="yxdyjId" name="basemessagenotice.messageId" type="hidden">
			<input id="messageContent" name="basemessagenotice.messageContent" type="hidden">
			<input id="sendDate" name="basemessagenotice.sendDate" type="hidden">
			<table border="0" cellspacing="0" cellpadding="4" width="100%">
				<tr>
					<td width="100" align="right">消息标题：</td>
					<td width="350">
					 	<input name="basemessagenotice.messageTitle" id="messageTitle" type="text" class="easyui-validatebox" data-options="required:true" style="float:left;background-color:transparent ;border:0px solid #ccc;border-bottom:1px solid #444;width: 99.5%" />	
					</td>
					<td width="100" align="right">时间：</td>
					<td>
					 	<input name="basemessagenotice.sendDateStr" id="sendDateStr" type="text" readonly="readonly" style="float:left;background-color:transparent ;border:0px solid #ccc;border-bottom:1px solid #444;width: 99.5%"/>		
					</td>
				</tr>
				<tr>
					<td colspan="4">
  							<iframe id="editor" name="editor" src="" width="100%;" frameborder=0></iframe>
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>
<script type="text/javascript">
	$("document").ready(function(){
		$.coreUtil.runJs(basePath+"jsp/sys/message/messageAction.js",function(){
			message.idField = 'messageId';
			message.namespace = 'sys/message';
			message.dataGrid = '#messageGrid';
			message.queryField = ["userName","realName","menuName","beginDate","endDate"];
			message.init();
		});
	});
</script>