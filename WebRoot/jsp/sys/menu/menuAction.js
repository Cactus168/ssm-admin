var menuAction = function(){
	$(".fixed_div").css("display","none");
	this.buttonTree = null;
	this.dictTree =null;
	this.menuTypes = {};
	this.selectButtonDatas=null;
};

menuAction.prototype = new BaseTreeGridAction();

var menu = new menuAction();

menuAction.prototype.init = function(){
	$(menu.treeGrid).treegrid({
        height: tool.getGridHeight(),
        url: basePath+menu.namespace+"/list.shtml",
		fit : true,
		lines: true,
        idField: menu.idField,
        rownumbers : true,// 行数
        treeField: 'menuName',
        sortOrder:'asc',
		sortName:'menuOrder',
		collapsible : false,
		fitColumns : true,
		pageSize : 30,
		pagination : true,
		remoteSort: true,
        frozenColumns: [[
            {field: 'menuNo', title: '菜单编号', width: 80, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"string"}}}
        ]],
        columns: [[
            {field: 'menuName', title: '菜单名称', width: 100,editor:{type:"validatebox",options:{required:true,validType:"ch"}}},
            {field: 'menuIcon', title: '图标', width: 50,align:"center",editor:{
            	type:"comboIcon",
            	options:{ 
            		panelWidth: 150,
        			panelMinWidth: '20%',
            		data:$.icons.hamburg_16,
            		required:true,
            		editable:false
            	}},formatter:function(value,rowData,rowIndex){ 
            		if(value != undefined){
            			value = "<img src="+$.icons.getIconPath($.icons.hamburg_16,value)+" />";
            		}
            		return value;
            	}},
            {field: 'menuUrl', title: 'url', width: 200,editor:{type:"validatebox",options:{required:true}},formatter:function(value,rowData,rowIndex){ 
        		return (value == undefined || value == "") ? "---" : value;
        	}},
            {field: 'menuType', title: '类型', width: 100,align:"center",editor:{
            	type:"combobox",
            	options:{
            		valueField: 'dictKey',  
                    textField: 'dictValue',  
            		data:menu.menuTypes,
            		required:true,
            		editable:false
            	}
            },formatter:function(value,rowData,rowIndex){ 
            	return value == null ? "" : tool.getJsonDataByFieldVal(menu.menuTypes, 'dictKey', value).dictValue;
            }},
            {field: 'parentName', title: '父菜单名称', width: 100,align:"center"},
            {field: 'menuOrder', title: '顺序', width: 50,align:"center",editor:{type:"validatebox",options:{required:true,validType:"postIntNum"}},sortable: true},
            {field: 'menuStatus', title: '状态', width: 80,align:"center",editor:{  
                type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            },formatter:function(value,rowData,rowIndex){ 
        		return "<input type='checkbox' "+ (value == "1" ? "checked='checked' disabled='disabled' />" : " disabled='disabled' />");
        	}},
            {field: 'menuRemark', title: '描述', width: 200,editor:{type:"validatebox",options:{required:true,validType:"ch"}}}
        ]],
        queryParams:menu.getQueryParams(),
        onClickRow:function(row){
        	if(row.parentId != 0){
        		$.post(basePath+menu.namespace+"/getButtonsByMenuId.shtml",{menuId:row.menuId},function(data){
        			menu.selectButtonDatas = data.tree;
        			$(menu.buttonTree).tree({
                		idFiled:'buttonId',
                		textFiled:'buttonName',
                		parentField:'_parentId',
                		animate: true,
                		checkbox:true,
                		lines: true,
                		data:data,
                		parentData:{buttonId:'0',buttonName:"系统按钮",_parentId:'-1'}
                	});
        		});
            	$(menu.dictTree).tree({
            		url:basePath+menu.namespace+"/getDictsByMenuId.shtml",
            		idFiled:'dictId',
            		textFiled:'dictName',
            		parentField:'_parentId',
            		animate: true,
            		checkbox:true,
            		lines: true,
            		queryParams: {menuId:row.menuId}
            	});
            	$(".fixed_div").css("display","block");
        	}else{
        		$(menu.buttonTree).empty();
        		$(menu.dictTree).empty();
        		$(".fixed_div").css("display","none");
        	}
        },
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(row){
            	menu.save();
            },
            onRevokeEdit:function(row){
            	menu.cancel();
            }
		},
	}).treegrid('followCustomHandle');
	
};
menuAction.prototype.beforeRemove = function(params, node, callBack) {
	if(node.menuUse > 0){
		$.messager.alert('操作提示',"该菜单已被系统分配引用，不能删除！",'warning');
	}else{
		$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
			if(data){
				callBack();
			}
		});
	}
};
menuAction.prototype.beforeAdd = function(){
	var node = $(menu.treeGrid).treegrid('getSelected');
	if(!node){
		$(menu.treeGrid).treegrid('getColumnOption','menuUrl').editor = null;
	}else{
		$(menu.treeGrid).treegrid('getColumnOption','menuUrl').editor = {type:"validatebox",options:{required:true}};
	}
};
menuAction.prototype.beforeEdit = function(params){
	if(params.parentId == 0){
		$(menu.treeGrid).treegrid('getColumnOption','menuUrl').editor = null;
	}else{
		$(menu.treeGrid).treegrid('getColumnOption','menuUrl').editor = {type:"validatebox",options:{required:true}};
	}
};
menuAction.prototype.changeMenuButtonRights = function(){
	var params = menu.getQueryParams();
	var buttons = $(menu.buttonTree).tree("getChecked",['checked','indeterminate']);
	if(buttons){
		var buttonIds = new Array();
		var buttonNames = new Array();
		for(var i = 0; i <  $(menu.selectButtonDatas).size(); i++){
			var button = tool.getJsonDataByFieldVal(buttons, "buttonId", menu.selectButtonDatas[i].buttonId);
			if(button){
				if(button.buttonUse == 0){
					buttonIds.push(button.buttonId)
				}
			}else{
				if(menu.selectButtonDatas[i].buttonUse > 0){
					buttonNames.push(menu.selectButtonDatas[i].buttonName);
				}
			}
		}
		params.buttonIds = buttonIds.join(",");
		params.menuId = $(menu.treeGrid).treegrid("getSelected").menuId;
		params.menuType = $(menu.treeGrid).treegrid("getSelected").menuType;
		if(buttonNames.length > 0){
			$.messager.confirm("请确认分配","您给【"+$(menu.treeGrid).treegrid("getSelected").menuName+"】菜单共分配按钮<font color='red' size='5'>"+($(buttons).size()-1)+"</font>个，删除按钮<font color='red' size='5'>"+buttonNames.length+"</font>个，但按钮【"+buttonNames.join(",")+"】已被系统引用，本次将不被删除？",function(data){
				if(data){
					if(buttonIds.length > 0){
						$.post(basePath+menu.namespace+"/changeMenuButtonRights.shtml",params,function(data){
							if(data.success){
								$.messager.alert('操作提示','分配按钮成功！','info');
							}else{
								$.messager.alert('错误提示',data.message,'error');
							}
						},'json');
					}else{
						$.messager.alert('操作提示','分配按钮成功！','info');
					}
				}
			});
		}else{
			if(buttonIds.length > 0){
				$.post(basePath+menu.namespace+"/changeMenuButtonRights.shtml",params,function(data){
					if(data.success){
						$.messager.alert('操作提示','分配按钮成功！','info');
					}else{
						$.messager.alert('错误提示',data.message,'error');
					}
				},'json');
			}else{
				$.messager.alert('操作提示','分配按钮成功！','info');
			}
		}
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};

menuAction.prototype.changeMenuDictRights = function(){
	var params = menu.getQueryParams();
	var dicts = $(menu.dictTree).tree("getChecked");
	if(dicts){
		var dictIds = new Array();
		dictIds.push(0);
		for(var i = 0; i < $(dicts).size(); i++){
			dictIds.push(dicts[i].dictId)
		}
		params.dictIds = dictIds.join(",");
		params.menuId = $(menu.treeGrid).treegrid("getSelected").menuId;
		$.post(basePath+menu.namespace+"/changeMenuDictRights.shtml",params,function(data){
			if(data.success){
				$.messager.alert('操作提示','分配编码成功！','info');
			}else{
				$.messager.alert('错误提示',data.message,'error');
			}
		},'json');
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};