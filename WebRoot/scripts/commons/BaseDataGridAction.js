var BaseDataGridAction = function(){
	this.idField = null;
	this.namespace = null;
	this.dataGrid = null;
	this.queryField = [];
	this.editRow = null;
};

BaseDataGridAction.prototype.getQueryParams = function(params){
	params = $.extend(params,{});
	var self = this;
	for(var i = 0; i < $(self.queryField).length; i++){
		params[""+self.queryField[i]+""] = $("#"+self.queryField[i]).val();
	}
	return tool.getParams(params);
};

BaseDataGridAction.prototype.beforeAdd = function(){};

BaseDataGridAction.prototype.afterAdd = function(){};

BaseDataGridAction.prototype.add = function(){
	var self = this;
	var beforeRs = self.beforeAdd();
	if(beforeRs!=null && beforeRs==false){
		return false;
	}
	if(self.editRow == null){
		self.editRow = 0;
		$(self.dataGrid).datagrid('insertRow',{index:self.editRow,row:beforeRs||{}});
		$(self.dataGrid).datagrid("unselectAll");
		$(self.dataGrid).datagrid("selectRow",self.editRow);
		$(self.dataGrid).datagrid('beginEdit',self.editRow);
		var afterRs=self.afterAdd();
		if(afterRs!=null && afterRs==false){
			return false;
		}
	}
};

BaseDataGridAction.prototype.beforeEdit = function(params){};

BaseDataGridAction.prototype.afterEdit = function(params){};

BaseDataGridAction.prototype.edit = function(){
	var self = this;
	if(self.editRow == null){
		var rows = $(self.dataGrid).datagrid('getSelections');
		if($(rows).size() == 1){
			var beforeRs = self.beforeEdit(rows[0]);
			if(beforeRs!=null && beforeRs==false){
				return false;
			}
			self.editRow = $(self.dataGrid).datagrid('getRowIndex', rows[0]);
			$(self.dataGrid).datagrid('beginEdit',self.editRow);
			var afterRs=self.afterEdit(rows[0]);
			if(afterRs!=null && afterRs==false){
				return false;
			}
		}else{
			$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
			return false;
		}
	}
};

BaseDataGridAction.prototype.beforeRemove = function(params, rows, callBack){
	$.messager.confirm("请确认删除",'确定要删除这些记录吗？',function(data){
		if(data){
			callBack();
		}
	});
};

BaseDataGridAction.prototype.afterRemove = function(data){};

BaseDataGridAction.prototype.remove = function(){
	var self = this;
	var params = self.getQueryParams();
	if(self.editRow == null){
		var rows = $(self.dataGrid).datagrid('getSelections');
		if($(rows).size() > 0){
			var IDs = new Array();
			for(var i = 0; i < $(rows).size(); i++){
				IDs.push(rows[i][self.idField]);
			}
			params.ids = IDs.join(",");
			var beforeRs = self.beforeRemove(params, rows, function(){
				$.post(basePath+self.namespace+"/remove.shtml",params,function(data){
					if(data.success){
						var afterRs=self.afterRemove(data);
						if(afterRs!=null && afterRs==false){
							return false;
						}
						$(self.dataGrid).datagrid('reload',$.extend(self.getQueryParams(),afterRs));
					}else{
						$.messager.alert('错误提示',data.message,'error');
					}
				},'json');
			});
		}else{
			$.messager.alert('操作提示','请最少选择一条数据进行此操作!','warning');
			return false;
		}
	}
};
BaseDataGridAction.prototype.beforeSave = function(params){};

BaseDataGridAction.prototype.afterSave = function(data){};

BaseDataGridAction.prototype.save = function(){
	var self = this;
	if(self.editRow != null){
		if(!$(self.dataGrid).datagrid('validateRow',self.editRow)){
			return false;
		}
		$(self.dataGrid).datagrid('acceptChanges');
		$(self.dataGrid).datagrid('endEdit', self.editRow);
		var row = $(self.dataGrid).datagrid('getRows')[self.editRow];
		var params = $.extend(self.getQueryParams(),row);
		var url = basePath+self.namespace+"/add.shtml"
		if(row[self.idField] != undefined){
			url = basePath+self.namespace+"/modify.shtml"
		}
		var beforeRs = self.beforeSave(params);
		if(beforeRs!=null && beforeRs==false){
			return false;
		}
		$.post(url,params,function(data){
			if(data.success){
				var afterRs=self.afterSave(data);
				if(afterRs!=null && afterRs==false){
					return false;
				}
				self.editRow = null;
				$(self.dataGrid).datagrid("unselectAll");
				$(self.dataGrid).datagrid("load",$.extend(self.getQueryParams(),afterRs));
			}else{
				$(self.dataGrid).datagrid('beginEdit', self.editRow);
				$.messager.alert('错误提示',data.message,'warning');
			}
		},"json");
	}
};

BaseDataGridAction.prototype.cancel = function(){
	var self = this;
	if(self.editRow != null){
		var row = $(self.dataGrid).datagrid('getRows')[self.editRow];
		if(row[self.idField] == undefined){
			$(self.dataGrid).datagrid("unselectAll");
			$(self.dataGrid).datagrid('deleteRow', self.editRow);
		}else{
			$(self.dataGrid).datagrid('acceptChanges');
			$(self.dataGrid).datagrid('cancelEdit', self.editRow);
		}
		self.editRow = null;
	}
};

BaseDataGridAction.prototype.search = function(){
	var self = this;
	if(self.editRow == null){
		$(self.dataGrid).datagrid('load',self.getQueryParams());
	}
};

BaseDataGridAction.prototype.importExcel = function(){
	var self = this;
	var modNo = $(".z-menu li").find(".act").attr("menuNo");
	$("#fileUploadContent").empty();
	$("#fileUploadContent").initUpload({
        "uploadUrl":basePath+self.namespace+"/importExcel.shtml",//上传文件信息地址
        "selfUploadBtId":"importExcelData",//自定义文件上传按钮id
        "isHiddenUploadBt":false,//是否隐藏上传按钮
        "isHiddenCleanBt":true,//是否隐藏清除按钮
        "ismultiple":false,//是否选择多文件
        "maxFileNumber":1,//文件个数限制，为整数
        "beforeUpload":function(opt){
        	opt.otherData = self.getQueryParams();
        },//在上传前执行的函数
        "onUpload":function(){
        	$("#fileUploadContent").dialog("close");
        	$(self.dataGrid).datagrid('load',self.getQueryParams());
        },//在上传后执行的函数
        "autoCommit":true,//文件是否自动上传
        "fileType":['.xls','.xlsx']//文件类型限制，默认不限制，注意写的是文件后缀

    });
	
	$("#fileUploadContent").dialog({
		title:"导入Excel数据",
		iconCls: "icon-standard-page-white-excel", 
		width:250,
        height:400,
        resizable:true,
        autoOpen: false,
        modal: true
	});
};

