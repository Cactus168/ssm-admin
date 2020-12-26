var roleAction = function(){
	$(".fixed_div").css("display","none");
	this.menuTree = null;
};

roleAction.prototype = new BaseDataGridAction();

var role = new roleAction();

roleAction.prototype.init = function(){
	$(role.dataGrid).datagrid({
        height: tool.getGridHeight(),
        url: basePath+role.namespace+"/list.shtml",
        idField: 'roleId',
        remoteSort: false,
        sortOrder:'asc',
		sortName:'createDate',
        fitColumns:true,//自动拉大列
        pagination : true,// 分页
        rownumbers : true,// 行数
		showFooter: true,
		fit:true,
		pageSize : 30,
        columns: [[
            {field: 'roleId', checkbox:true},
            {field: 'roleName', title: '名称', width: 180, editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'roleContent', title: '描述', width: 120, editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'createDate', title: '时间', width: 140,sortable: true}
        ]],
        queryParams:role.getQueryParams(),
        onClickRow:function(rowIndex, rowData){
        	$(role.menuTree).tree({
        		url:basePath+role.namespace+"/getMenusByRoleId.shtml",
        		idFiled:'menuId',
        		textFiled:'menuName',
        		parentField:'_parentId',
        		animate: true,
        		checkbox:true,
        		lines: true,
        		queryParams: {roleId:rowData.roleId}
        	});
        	$(".fixed_div").css("display","block");
        },
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	role.save();
            },
            onRevokeEdit:function(rowIndex){
            	role.cancel();
            }
		}
	}).datagrid('followCustomHandle');
};
roleAction.prototype.beforeRemove = function(params, rows, callBack) {
	var IDs = new Array();
	var uses = new Array();
	var delTotal = $(rows).size();
	var delTotalHtml = "<font color='red' size='5'>"+delTotal+"</font>";
	for(var i = 0; i < delTotal; i++){
		if(rows[i]["roleUse"] > 0){
			uses.push(rows[i]["roleName"])
		}else{
			IDs.push(rows[i][role.idField]);
		}
	}
	var delUseNum = uses.length;
	var delUseHtml = "<font color='red' size='5'>"+delUseNum+"</font>";
	var delDataHtml = "<font color='red' size='5'>"+(delTotal-delUseNum)+"</font>";
	params.ids = IDs.join(",");
	if(delUseNum > 0){
		if(delTotal == delUseNum){
			$.messager.alert('操作提示',"您本次删除数据共"+delTotalHtml+"条，但这"+delUseHtml+"条数据已被系统引用，不能删除！",'warning');
		}else{
			$.messager.confirm("请确认删除","您本次要删除数据共"+delTotalHtml+"条，其中【"+uses.join(",")+"】"+delUseHtml+"条数据已被系统引用，本次只能删除"+delDataHtml+"条数据，确定要删除这"+delDataHtml+"条数据吗？",function(data){
				if(data){
					callBack();
				}
			});
		}
	}else{
		$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
			if(data){
				callBack();
			}
		});
	}
};
roleAction.prototype.changeRoleMenuRights = function(){
	var params = role.getQueryParams();
	var menus = $(role.menuTree).tree("getChecked", ['checked','indeterminate']);
	if(menus){
		var menuIds = new Array();
		for(var i = 0; i < $(menus).size(); i++){
			menuIds.push(menus[i].menuId)
		}
		params.menuIds = menuIds.join(",");
		params.roleId = $(role.dataGrid).datagrid("getSelected").roleId;
		$.post(basePath+role.namespace+"/changeRoleMenuRights.shtml",params,function(data){
			if(data.success){
				$.messager.alert('操作提示','授权成功！','info');
			}else{
				$.messager.alert('错误提示',data.message,'error');
			}
		},'json');
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};