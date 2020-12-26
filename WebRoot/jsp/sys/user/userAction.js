var userAction = function(){
	$(".fixed_div").css("display","none");
	this.organTree = null;
	this.roleTree = null;
};

userAction.prototype = new BaseDataGridAction();

var user = new userAction();

userAction.prototype.init = function(){
	$(user.dataGrid).datagrid({
        height: tool.getGridHeight(),
        url: basePath+user.namespace+"/list.shtml",
        idField: 'userId',
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
            {field: 'userId', checkbox:true},
            {field: 'userName', title: '账号', width: 100,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'realName', title: '姓名', width: 100,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'organId', title: '机构', width: 100,editor:{
            	type:"combotree",
            	options:{
            		panelWidth:200,
            		url:basePath+user.namespace+"/getOrgansByUserId.shtml?userId=0",
            		loadFilter:function(data, parent){
            			return tool.toTreeData($(data.tree), {idFiled:'organId',textFiled:'organName',parentField:'_parentId'});
            		},
            		lines: true,
            		required: true  
            	}
            },formatter:function(value,rowData,rowIndex){ 
            	return rowData.organName;
            }},
            {field: 'sex', title: '性别', width: 80,editor:{
            	type:"combobox",
            	options:{
            		valueField: 'id',  
                    textField: 'text',  
            		data:[{id:1,text:'男'},{id:0,text:'女'}],
            		required:true,
            		editable:false,
            		validType:"string"
            	}
            },formatter:function(value,rowData,rowIndex){ 
            	return value == 1 ? '男' : '女';
            }},
            {field: 'birthday', title: '生日', width: 80,editor:{type:"datebox",options:{required:true}}},
            {field: 'email', title: 'Email', width: 100,editor:{type:"validatebox",options:{required:true,validType:"email"}}},
            {field: 'qq', title: 'QQ', width: 80,editor:{type:"validatebox",options:{required:true,validType:"QQ"}}},
            {field: 'phoneNum', title: '手机', width: 100,editor:{type:"validatebox",options:{required:true,validType:"phone"}}},
            {field: 'address', title: '地址', width: 200,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'userType', title: '类型', width: 80},
            {field: 'status', title: '状态', width: 80,editor:{
            	type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            }},
            {field: 'remarks', title: '备注', width: 200,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'createDate', title: '创建时间', width: 80}
        ]],
        queryParams:user.getQueryParams(),
        onClickRow:function(indexRow,row){
        	$(user.organTree).tree({
        		url:basePath+user.namespace+"/getOrgansByUserId.shtml",
        		idFiled:'organId',
        		textFiled:'organName',
        		parentField:'_parentId',
        		animate: true,
        		checkbox:true,
        		lines: true,
        		queryParams: tool.getParams({userId:row.userId})
        	});
        	$(user.roleTree).tree({
        		url:basePath+user.namespace+"/getRolesByUserId.shtml",
        		idFiled:'roleId',
        		textFiled:'roleName',
        		parentField:'_parentId',
        		animate: true,
        		checkbox:true,
        		lines: true,
        		queryParams: tool.getParams({userId:row.userId}),
        		onCheck: function(node, checked){
        			if(checked) {
        				var nodes = $(user.roleTree).tree("getRoots");
            			for(var i = 0; i < nodes.length; i++){
            				if(node.roleId != nodes[i].roleId){
            					$(user.roleTree).tree("uncheck",nodes[i].target);
            				}
            			}
                    }
        		}
        	});
        	$(".fixed_div").css("display","block");
        },
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(row){
            	user.save();
            },
            onRevokeEdit:function(row){
            	user.cancel();
            }
		},
	}).datagrid('followCustomHandle');
};
userAction.prototype.beforeRemove = function(params, rows, callBack) {
	var IDs = new Array();
	var uses = new Array();
	var delTotal = $(rows).size();
	var delTotalHtml = "<font color='red' size='5'>"+delTotal+"</font>";
	for(var i = 0; i < delTotal; i++){
		if(rows[i]["userUse"] > 0){
			uses.push(rows[i]["userName"])
		}else{
			IDs.push(rows[i][user.idField]);
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
	}
};
userAction.prototype.beforeAdd = function(){
	return {organId:""};
};
userAction.prototype.changeUserOrganRights = function(){
	var params = user.getQueryParams();
	var organs = $(user.organTree).tree("getChecked");
	if(organs){
		var organIds = new Array();
		for(var i = 0; i < $(organs).size(); i++){
			organIds.push(organs[i].organId)
		}
		params.organIds = organIds.join(",");
		params.roleId = $(user.dataGrid).datagrid("getSelected").userId;
		$.post(basePath+user.namespace+"/changeUserOrganRights.shtml",params,function(data){
			if(data.success){
				$.messager.alert('操作提示','机构授权成功！','info');
			}else{
				$.messager.alert('错误提示',data.message,'error');
			}
		},'json');
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};

userAction.prototype.changeUserRoleRights = function(){
	var params = user.getQueryParams();
	var roles = $(user.roleTree).tree("getChecked");
	if(roles){
		var roleIds = new Array();
		for(var i = 0; i < $(roles).size(); i++){
			roleIds.push(roles[i].roleId)
		}
		params.roleIds = roleIds.join(",");
		params.userId = $(user.dataGrid).datagrid("getSelected").userId;
		$.post(basePath+user.namespace+"/changeUserRoleRights.shtml",params,function(data){
			if(data.success){
				$.messager.alert('操作提示','角色授权成功！','info');
			}else{
				$.messager.alert('错误提示',data.message,'error');
			}
		},'json');
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};