var codeAction = function(){};

codeAction.prototype = new BaseDataGridAction();

var code = new codeAction();

codeAction.prototype.init = function(){
	$(code.dataGrid).datagrid({
        height      : tool.getGridHeight(),
        url         : basePath+code.namespace+"/list.shtml",
        fit         : true,
        idField     : code.idField,
        sortOrder   : 'desc',
		sortName    : 'codeId',
		fitColumns  : true,//自动拉大列
        pagination  : true,// 分页
        rownumbers  : true,// 行数
        singleSelect: true,//是否单选
        pageSize    : 30,
        columns: [[
            {field: 'packageName', title: '上级包名（例如:com.jo.xxx 中的xxx）', width: 150, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"packagex"}}},
            {field: 'objectName', title: '处理类名', width: 100,editor:{type:"validatebox",options:{required:true,validType:"clazz"}}},
            {field: 'tableTop', title: '表前缀（如：sys_）', width: 100,editor:{type:"validatebox",options:{required:true,validType:"tableTop"}}},
            {field: 'dataView', title: '数据展示', width: 80, sortable: true,editor:{
            	type:"combobox",
            	options:{
            		valueField: 'id',  
                    textField: 'text',  
            		data:[{id:'dataGrid',text:'dataGrid'},{id:'treeGrid',text:'treeGrid'}],
            		required:true,
            		editable:false,
            		ed:"string"
            	}
            }},
            {field: 'dataSelect', title: '数据选取', width: 80, sortable: true,editor:{
            	type:"combobox",
            	options:{
            		valueField: 'id',  
                    textField: 'text',  
            		data:[{id:'1',text:'单选'},{id:'2',text:'多选'}],
            		required:true,
            		editable:false,
            		ed:"string"
            	}
            },formatter:function(value,rowData,rowIndex){ 
        		return value == 1 ? "单选" : "多选";
        	}}
        ]],
        queryParams:code.getQueryParams(),
        onClickRow:function(indexRow,row){
        	codeAttr.codeId = row.codeId;
        	$("#addx").linkbutton({disabled: false});
        	$("#editx").linkbutton({disabled: false});
        	$("#removex").linkbutton({disabled: false});
        	$(codeAttr.dataGrid).datagrid('load',codeAttr.getQueryParams());
        	code.editRow = null;
        },
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	code.save();
            	$(code.dataGrid).datagrid('fixDetailRowHeight',0);  
            },
            onRevokeEdit:function(rowIndex){
            	code.cancel();
            }
		}
	}).datagrid('followCustomHandle');
	
};

codeAction.prototype.create = function(){
	var rows = $(code.dataGrid).datagrid('getSelections');
	if($(rows).size() == 1){
		var row = rows[0];
		var attrs = $(codeAttr.dataGrid).datagrid("getRows");
		if(attrs.length > 0){
			if(row.dataView == "treeGrid"){
				var treeFildArray = new Array();
				for(var i = 0; i < attrs.length; i++){
					treeFildArray.push('<input type="radio" class="easyui-validatebox radio" name="treeFild" '+(i == 0 ? "checked = checked" : "")+' value="'+attrs[i].attrName+'"/>'+attrs[i].attrTitle);
				}
				$('#treeFildDiv').html(treeFildArray.join("&nbsp;&nbsp;"));
				$('#treeFildDiv').dialog({
            	    title: 'treeField设置',
            	    iconCls:'icon-hamburg-star',
            	    closed: false,
            	    cache: false,
            	    modal: true,
            	    buttons:[{
        				text:'保存',
        				iconCls:'icon-save',
        				handler:function(){
        					var treeFieldName = $("input[name='treeFild']:checked").val(); 
        					var params = $.extend(code.getQueryParams(),row);
        					var params = $.extend(params,{fieldList:JSON.stringify(attrs),treeFieldName:treeFieldName});
        					$('#treeFildDiv').dialog("close");
        					var url = basePath+code.namespace+"/create.shtml"
        					$.post(url,params,function(data){
        						if(data.success){
        							tool.download(code.namespace, data.filePath, data.fileName);
        						}else{
        							$.messager.alert('错误提示',data.message,'warning');
        						}
        					},"json");
        				}
        			}]
            	});
			}else{
				var params = $.extend(code.getQueryParams(),row);
				var params = $.extend(params,{fieldList:JSON.stringify(attrs),treeFieldName:""});
				var url = basePath+code.namespace+"/create.shtml"
				$.post(url,params,function(data){
					if(data.success){
						tool.download(code.namespace, data.filePath, data.fileName);
					}else{
						$.messager.alert('错误提示',data.message,'warning');
					}
				},"json");
			}
		}else{
			$.messager.alert('操作提示','请最少添加一条属性数据!','warning');
			return false;
		}
	}else{
		$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
		return false;
	}
};