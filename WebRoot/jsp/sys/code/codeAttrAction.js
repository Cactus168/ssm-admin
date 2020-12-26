var codeAttrAction = function(){
	this.codeId = null;
	$("#addx").linkbutton({disabled: true});
	$("#editx").linkbutton({disabled: true});
	$("#removex").linkbutton({disabled: true});
};

codeAttrAction.prototype = new BaseDataGridAction();

var codeAttr = new codeAttrAction();

codeAttrAction.prototype.getQueryParams = function(params){
	params = $.extend(params,{codeId:codeAttr.codeId});
	var self = this;
	for(var i = 0; i < $(self.queryField).length; i++){
		params[""+self.queryField[i]+""] = $("#"+self.queryField[i]).val();
	}
	return tool.getParams(params);
};

codeAttrAction.prototype.init = function(){
	$(codeAttr.dataGrid).datagrid({
		 height     : tool.getGridHeight(),
         url        : basePath+codeAttr.namespace+"/list.shtml",
		 idField    : codeAttr.idField,
         remoteSort : false,
         sortOrder  : 'asc',
		 sortName   : 'attrId',
		 fitColumns : true,//自动拉大列
         pagination : true,// 分页
         rownumbers : true,// 行数
		 fit        : true,
         pageSize   : 30,
         columns: [[
			{field: 'attrId', checkbox:true},
            {field: 'attrName', title: '属性', width: 120, sortable: true,editor:{type:"validatebox",options:{required:true,validType:"attr"}}},
            {field: 'attrType', title: '属性类型', width: 100,editor:{
            	type:"combobox",
            	options:{
            		valueField: 'id',  
                    textField: 'text',  
            		data:[{id:'String',text:'String'},
            		      {id:'Integer',text:'Integer'},
            		      {id:'Double',text:'Double'}
            		      ],
            		required:true,
            		editable:false,
            		validType:"string"
            	}
            }},
            {field: 'attrTitle', title: '属性名称', width: 120, sortable: true,editor:{type:"validatebox",options:{required:true}}},
            {field: 'attrEdit', title: '可编辑', width: 100,align:"center",editor:{
            	type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            },formatter:function(value,rowData,rowIndex){ 
        		return "<input type='checkbox' "+ (value == "1" ? "checked='checked' disabled='disabled' />" : " disabled='disabled' />");
        	}},
        	{field: 'attrRequired', title: '必填项', width: 100,align:"center",editor:{
            	type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            },formatter:function(value,rowData,rowIndex){ 
        		return "<input type='checkbox' "+ (value == "1" ? "checked='checked' disabled='disabled' />" : " disabled='disabled' />");
        	}},
        	{field: 'dataValidType', title: '匹配正则', width: 80, sortable: true,editor:{
            	type:"combobox",
            	options:{
            		valueField: 'id',  
                    textField: 'text',  
            		data:[
            		      {id:'--',text:'无'},
            		      {id:'email',text:'邮箱'},
            		      {id:'url',text:'网址'},
            		      {id:'string',text:'字符串'},
            		      {id:'postIntNum',text:'正整数'},
            		      {id:'postDouble',text:'小数'},
            		      {id:'tel',text:'电话'},
            		      {id:'phone',text:'手机'},
            		      {id:'QQ',text:'QQ'},
            		      {id:'ch',text:'汉字'},
            		      {id:'letter',text:'字母'},
            		      {id:'num',text:'数字'}
            		     ],
            		required:true,
            		editable:false,
            		ed:"string"
            	}
            }},
            {field: 'attrSearch', title: '可查询', width: 100,align:"center",editor:{
            	type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            },formatter:function(value,rowData,rowIndex){ 
        		return "<input type='checkbox' "+ (value == "1" ? "checked='checked' disabled='disabled' />" : " disabled='disabled' />");
        	}},
        	{field: 'attrSor', title: '可排序', width: 100,align:"center",editor:{
            	type:'checkbox',  
                options:{  
                    on: '1',  
                    off:'0'  
                }  
            },formatter:function(value,rowData,rowIndex){ 
        		return "<input type='checkbox' "+ (value == "1" ? "checked='checked' disabled='disabled' />" : " disabled='disabled' />");
        	}}
        ]],
        queryParams:codeAttr.getQueryParams(),
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	codeAttr.save();
            },
            onRevokeEdit:function(rowIndex){
            	codeAttr.cancel();
            }
		}
	}).datagrid('followCustomHandle');
};