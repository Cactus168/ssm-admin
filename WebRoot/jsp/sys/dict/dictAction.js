var dictAction = function(){
	
};

dictAction.prototype = new BaseTreeGridAction();

var dict = new dictAction();

dictAction.prototype.init = function(){
	$(dict.treeGrid).treegrid({
        height: tool.getGridHeight(),
        url: basePath+dict.namespace+"/list.shtml",
        fit : true,
        lines: true,
        idField: dict.idField,
        treeField: dict.nameField,
        remoteSort: false,
        sortOrder:'asc',
		sortName:'dictNo',
		fitColumns:true,//自动拉大列
        pagination : true,// 分页
        rownumbers : true,// 行数
        pageSize : 30,
        columns: [[
            {field: 'dictNo', title: '编码', width: 80, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'dictName', title: '类型', width: 100,editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'parentName', title: '父菜单名称', width: 100,align:"center"},
            {field: 'dictKey', title: '编码Key', width: 100, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'dictValue', title: '编码Value', width: 100,editor:{type:"validatebox",options:{required:true,validType:"string"}}}
        ]],
        queryParams:dict.getQueryParams(),
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	dict.save();
            },
            onRevokeEdit:function(rowIndex){
            	dict.cancel();
            }
		}
	}).treegrid('followCustomHandle');
};
dictAction.prototype.beforeRemove = function(params, node, callBack) {
	if(node.dictUse > 0){
		$.messager.alert('操作提示',"该编码已被系统分配引用，不能删除！",'warning');
	}else{
		$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
			if(data){
				callBack();
			}
		});
	}
};
dictAction.prototype.beforeAdd = function(){
	var rsBefore = {};
	var node = $(dict.treeGrid).treegrid('getSelected');
	if(node){
		$(dict.treeGrid).treegrid('getColumnOption','dictNo').editor = null;
		$(dict.treeGrid).treegrid('getColumnOption','dictName').editor = null;
		rsBefore.dictName = node['dictName']+"子项";
	}else{
		$(dict.treeGrid).treegrid('getColumnOption','dictKey').editor = null;
		$(dict.treeGrid).treegrid('getColumnOption','dictValue').editor = null;
	}
	return rsBefore;
};
dictAction.prototype.beforeEdit = function(params){
	if(params.parentId == 0){
		$(dict.treeGrid).treegrid('getColumnOption','dictKey').editor = null;
		$(dict.treeGrid).treegrid('getColumnOption','dictValue').editor = null;
	}else{
		$(dict.treeGrid).treegrid('getColumnOption','dictNo').editor = null;
		$(dict.treeGrid).treegrid('getColumnOption','dictName').editor = null;
	}
};