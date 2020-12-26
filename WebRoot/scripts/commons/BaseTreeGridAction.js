var BaseTreeGridAction = function(){
	this.idField = null;
	this.nameField = null;
	this.parentIdField = null;
	this.parentNameField = null;
	this.namespace = null;
	this.treeGrid = null;
	this.queryField = [];
	this.editRow = null;
};

BaseTreeGridAction.prototype.getQueryParams = function(){
	var self = this;
	var params = {};
	for(var i = 0; i < $(self.queryField).length; i++){
		params[""+self.queryField[i]+""] = $("#"+self.queryField[i]).val();
	}
	return tool.getParams(params);
};

BaseTreeGridAction.prototype.beforeAdd = function(){};

BaseTreeGridAction.prototype.afterAdd = function(){};

BaseTreeGridAction.prototype.add = function(){
	var self = this;
	var params = self.getQueryParams();
	if(self.editRow == null){
		var beforeRs = self.beforeAdd();
		if(beforeRs!=null && beforeRs==false){
			return false;
		}
		self.editRow = 0;
		var node = $(self.treeGrid).treegrid('getSelected');
		if(node){
			if(node[self.parentIdField] == 0){
				params[self.idField] = self.editRow;
				params[self.parentIdField] = node[self.idField];
				params[self.parentNameField] = node[self.nameField]
				params = $.extend(params,beforeRs);
			}else{
				$.messager.alert('操作提示','系统目前只支持构建两级菜单!请重新选择父节点！','warning');
				$(self.treeGrid).treegrid('unselectAll');
				self.editRow = null;
				return false;
			}
		}else{
			params[self.idField] = self.editRow;
			params[self.parentIdField] = 0;
			params[self.parentNameField] = '---';
			params = $.extend(params,beforeRs);
		}
		$(self.treeGrid).treegrid('append',{
			parent: params[self.parentIdField],
			data: [params]
		});
		$(self.treeGrid).treegrid('select', self.editRow);
		$(self.treeGrid).treegrid('beginEdit', self.editRow);
		var afterRs=self.afterAdd();
		if(afterRs!=null && afterRs==false){
			return false;
		}
	}
};

BaseTreeGridAction.prototype.beforeEdit = function(params){};

BaseTreeGridAction.prototype.afterEdit = function(params){};

BaseTreeGridAction.prototype.edit = function(){
	var self = this;
	if(self.editRow == null){
		var node = $(self.treeGrid).treegrid('getSelected');
		if(node){
			self.editRow = node[self.idField];
			var beforeRs = self.beforeEdit(node);
			if(beforeRs!=null && beforeRs==false){
				return false;
			}
			$(self.treeGrid).treegrid('beginEdit',self.editRow);
			var afterRs=self.afterEdit(node);
			if(afterRs!=null && afterRs==false){
				return false;
			}
		}else{
			$.messager.alert('操作提示','请选择一条数据进行此操作!','warning');
			return false;
		}
	}
};

BaseTreeGridAction.prototype.beforeRemove = function(params, node, callBack){
	$.messager.confirm("请确认删除",'确定要删除这条记录吗？',function(data){
		if(data){
			callBack();
		}
	});
};

BaseTreeGridAction.prototype.afterRemove = function(data){};

BaseTreeGridAction.prototype.remove = function(){
	var self = this;
	var params = self.getQueryParams();
	if(self.editRow == null){
		var node = $(self.treeGrid).treegrid('getSelected');
		if(node){
			if($(self.treeGrid).treegrid('getChildren',node[self.idField]).length == 0){
				params.ids = node[self.idField];
				var beforeRs = self.beforeRemove(params, node, function(){
					$.post(basePath+self.namespace+"/remove.shtml",params,function(data){
						if(data.success){
							var afterRs=self.afterRemove(data);
							if(afterRs!=null && afterRs==false){
								return false;
							}
							$(self.treeGrid).treegrid('reload',$.extend(self.getQueryParams(),afterRs));
						}else{
							$.messager.alert('错误提示',data.message,'error');
						}
					},'json');
				});
			}else{
				$.messager.alert('操作提示','该数据有子节点数据，请先删除子节点数据!','warning');
				return false;
			}
		}else{
			$.messager.alert('操作提示','请最少选择一条数据进行此操作!','warning');
			return false;
		}
	}
};
BaseTreeGridAction.prototype.beforeSave = function(params){};

BaseTreeGridAction.prototype.afterSave = function(data){};

BaseTreeGridAction.prototype.save = function(){
	var self = this;
	if(self.editRow != null){
		if(!$(self.treeGrid).treegrid('validateRow',self.editRow)){
			return false;
		}
		$(self.treeGrid).treegrid('endEdit', self.editRow);
		var row = $(self.treeGrid).treegrid('find',self.editRow);
		var params = $.extend(self.getQueryParams(),row);
		var url = basePath+self.namespace+"/add.shtml"
		if(row[self.idField] != 0){
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
				$(self.treeGrid).treegrid("unselectAll");
				$(self.treeGrid).treegrid("load",$.extend(self.getQueryParams(),afterRs));
			}else{
				$(self.treeGrid).treegrid('beginEdit', self.editRow);
				$.messager.alert('错误提示',data.message,'warning');
			}
		},"json");
	}
};

BaseTreeGridAction.prototype.cancel = function(){
	var self = this;
	if(self.editRow != null){
		var row = $(self.treeGrid).treegrid('find',self.editRow);
		if(row[self.idField] == 0){
			$(self.treeGrid).treegrid("unselectAll");
			$(self.treeGrid).treegrid('remove', self.editRow);
		}else{
			$(self.treeGrid).treegrid('cancelEdit', self.editRow);
		}
		self.editRow = null;
	}
};

BaseTreeGridAction.prototype.search = function(){
	var self = this;
	if(self.editRow == null){
		$(self.treeGrid).treegrid('load',self.getQueryParams());
	}
};

BaseTreeGridAction.prototype.importExcel = function(){
	var self = this;
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
        	$(self.treeGrid).treegrid('load',self.getQueryParams());
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
