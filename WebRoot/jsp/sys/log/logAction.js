var logAction = function(){
	
};

logAction.prototype = new BaseDataGridAction();

var log = new logAction();

logAction.prototype.init = function(){
	$(log.dataGrid).datagrid({
        height: tool.getGridHeight(),
        url: basePath+log.namespace+"/list.shtml",
        idField: 'logId',
        remoteSort: false,
        sortOrder:'asc',
		sortName:'logDate',
        fitColumns:true,//自动拉大列
        pagination : true,// 分页
        rownumbers : true,// 行数
		showFooter: true,
		pageSize : 30,
        columns: [[
            {field: 'userName', title: '用户帐号', width: 180},
            {field: 'realName', title: '用户名', width: 120},
            {field: 'logIp', title: 'IP', width: 120},
            {field: 'menuName', title: '模块', width: 180, formatter:function(val,row){
            	return val == null ? "系统信息" : val;
            }},
            {field: 'logContent', title: '内容', width: 140},
            {field: 'logDate', title: '时间', width: 140,sortable: true}
        ]],
        queryParams:log.getQueryParams()
	});
	/**开始时间**/
	$('#beginDate').datetimebox({
	   showSeconds:true,
	   onSelect:function(date){
		  var time=$('#beginDate').datetimebox('spinner').spinner('getValue');
		  $('#beginDate').datetimebox('setText',date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate()+' '+ time);
		  $('#beginDate').datetimebox('setValue',date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate()+' '+ time);
		  $('#beginDate').val(date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate()+' '+ time);
		  $('#beginDate').datetimebox('hidePanel');
		  $('#endDate').datetimebox('showPanel');
	   }
	});
	/**结束时间**/
	$('#endDate').datetimebox({
		showSeconds:true,
	    onSelect:function(date){
		  var time=$('#endDate').datetimebox('spinner').spinner('getValue');
		  $('#endDate').datetimebox('setText',date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate()+' '+ time);
		  $('#endDate').val(date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+date.getDate()+' '+ time);
		  $('#endDate').datetimebox('hidePanel');
	   }
	});
	/**设置结束时间大于开始时间**/
	$('#endDate').datetimebox().datetimebox('calendar').calendar({
		validator: function(date){
			return date>=new Date($('#beginDate').datetimebox('getValue').replace(/-/g,"/"));
		}
	});
};