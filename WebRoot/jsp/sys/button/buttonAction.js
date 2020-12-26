var buttonAction = function(){
	this.buttonTypes = {};
};

buttonAction.prototype = new BaseTreeGridAction();

var button = new buttonAction();

buttonAction.prototype.init = function(){
	$(button.treeGrid).treegrid({
        height: tool.getGridHeight(),
        url: basePath+button.namespace+"/list.shtml",
        fit : true,
		lines: true,
        idField: button.idField,
        treeField: button.nameField,
        remoteSort: true,
        sortOrder:'asc',
		sortName:'buttonSort',
		fitColumns : true,
		pagination : true,
		rownumbers : true,// 行数
		singleSelect:true,//是否单选
		pageSize : 30,
        columns: [[
            {field: 'buttonNo', title: 'ID', width: 80, editor:{type:"validatebox",options:{required:true,validType:"string"}}},
            {field: 'buttonName', title: '名称', width: 100, editor:{type:"validatebox",options:{required:true}}},
            {field: 'buttonIcon', title: '图标', width: 100,align:"center",editor:{
            	type:"comboIcon",
            	options:{ 
            		panelWidth: 150,
        			panelMinWidth: '20%',
            		data:$.extend($.icons.standard_16,$.icons.easyUiIcon),
            		required:true,
            		editable:false
            	}},formatter:function(value,rowData,rowIndex){ 
            		if(value != undefined){
            			value = "<img src="+$.icons.getIconPath($.extend($.icons.standard_16,$.icons.easyUiIcon),value)+" />";
            		}
            		return value;
            	}},
            {field: 'buttonType', title: '类型', width: 100,align:"center",editor:{
            	type:"combobox",
            	options:{
            		valueField: 'dictKey',  
                    textField: 'dictValue',  
            		data:button.buttonTypes,
            		required:true,
            		editable:false
            	}
            },formatter:function(value,rowData,rowIndex){ 
            	return value == null ? "" : tool.getJsonDataByFieldVal(button.buttonTypes, 'dictKey', value).dictValue;
            }},
            {field: 'buttonEvent', title: '事件', width: 100, editor:{type:"validatebox",options:{required:true}}},
            {field: 'parentName', title: '父按钮名称', width: 100,align:"center"},
            {field: 'buttonSort', title: '排序', width: 50, editor:{type:"validatebox",options:{required:true,validType:"int"}}},
            {field: 'buttonContent', title: '备注', width: 220, editor:{type:"text"}}
        ]],
        queryParams:button.getQueryParams(),
	    customAttr: {//启用Ext.grid的rowEditing风格
	        rowediting: true,
	        onConfirmEdit:function(rowIndex){
	        	button.save();
	        },
	        onRevokeEdit:function(rowIndex){
	        	button.cancel();
	        }
		}
	}).treegrid('followCustomHandle');
};

buttonAction.prototype.beforeRemove = function(params, node, callBack) {
	if(node.buttonUse > 0){
		$.messager.alert('操作提示',"该按钮已被系统菜单引用，不能删除！",'warning');
	}else{
		$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
			if(data){
				callBack();
			}
		});
	}
};

buttonAction.prototype.remove111 = function(){
	var params = button.getQueryParams();
	if(button.editRow == null){
		var rows = $(button.treeGrid).treegrid('getSelections');
		if($(rows).size() > 0){
			var IDs = new Array();
			var useButtons = new Array();
			for(var i = 0; i < $(rows).size(); i++){
				if(rows[i]["buttonUse"] > 0){
					useButtons.push(rows[i]["buttonName"])
				}else{
					IDs.push(rows[i][button.idField]);
				}
			}
			params.ids = IDs.join(",");
			if(useButtons.length > 0){
				if($(rows).size() == useButtons.length){
					flag = false;
					$.messager.alert('操作提示',"您本次删除数据共<font color='red' size='5'>"+$(rows).size()+"</font>条，但这<font color='red' size='5'>"+useButtons.length+"</font>条数据已被系统引用，不能执行此操作！",'warning');
				}else{
					$.messager.confirm("请确认删除","您本次要删除数据共<font color='red' size='5'>"+$(rows).size()+"</font>条，其中【"+useButtons.join(",")+"】<font color='red' size='5'>"+useButtons.length+"</font>条数据已被系统引用，本次操作只对<font color='red' size='5'>"+($(rows).size()-useButtons.length)+"</font>条数据进行删除,确定要删除这些记录吗？",function(data){
						if(data){
							$.post(basePath+self.namespace+"/remove.shtml",params,function(data){
								if(data.success){
									$(button.treeGrid).treegrid('reload',button.getQueryParams());
								}else{
									$.messager.alert('错误提示',data.message,'error');
								}
							},'json');
						}
					});
				}
			}
		}else{
			$.messager.alert('操作提示','请最少选择一条数据进行此操作!','warning');
			return false;
		}
	}
};
