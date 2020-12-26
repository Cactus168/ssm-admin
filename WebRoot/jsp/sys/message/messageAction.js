var messageAction = function(){
	
};

messageAction.prototype = new BaseDataGridAction();

var message = new messageAction();

messageAction.prototype.init = function(){
	$(message.dataGrid).datagrid({
        height: tool.getGridHeight(),
        url: basePath+message.namespace+"/list.shtml",
        idField: 'logId',
        remoteSort: false,
        sortOrder:'asc',
		sortName:'logDate',
        fitColumns:true,//自动拉大列
        pagination : true,// 分页
        rownumbers : true,// 行数
		showFooter: true,
		pageSize : 30,
        columns: [[
            {field: 'userName', title: '用户帐号', width: 180},
            {field: 'realName', title: '用户名', width: 120},
            {field: 'logIp', title: 'IP', width: 120},
            {field: 'menuName', title: '模块', width: 180, formatter:function(val,row){
            	return val == null ? "系统信息" : val;
            }},
            {field: 'logContent', title: '内容', width: 140},
            {field: 'logDate', title: '时间', width: 140,sortable: true}
        ]],
        queryParams:message.getQueryParams(),
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	message.save();
            },
            onRevokeEdit:function(rowIndex){
            	message.cancel();
            }
		}
	}).datagrid('followCustomHandle');
};