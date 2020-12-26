var organAction = function(){
	
};

organAction.prototype = new BaseTreeGridAction();

var organ = new organAction();

organAction.prototype.init = function(){
	$(organ.treeGrid).treegrid({
        height: tool.getGridHeight(),
        url: basePath+organ.namespace+"/list.shtml",
		fit : true,
		lines: true,
        idField: organ.idField,
        rownumbers : true,// 行数
        treeField: 'organName',
        sortOrder:'asc',
		sortName:'organNo',
		collapsible : false,
		fitColumns : true,
		pagination : true,
		remoteSort: true,
		pageSize : 30,
        frozenColumns: [[
            {field: 'organNo', title: '机构编号', width: 80, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"string"}}}
        ]],
        columns: [[
            {field: 'organName', title: '机构名称', width: 100,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'parentName', title: '上级机构', width: 100,align:"center"},
            {field: 'organContent', title: '机构描述', width: 200,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'createDate', title: '创建', width: 100,align:"center"}
        ]],
        queryParams:organ.getQueryParams(),
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(row){
            	organ.save();
            },
            onRevokeEdit:function(row){
            	organ.cancel();
            }
		},
	}).treegrid('followCustomHandle');
};
organAction.prototype.beforeRemove = function(params, node, callBack) {
	if(node.organUse > 0){
		$.messager.alert('操作提示',"该机构已被系统分配引用，不能删除！",'warning');
	}else{
		$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
			if(data){
				callBack();
			}
		});
	}
};