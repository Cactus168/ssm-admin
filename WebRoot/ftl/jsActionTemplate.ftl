var ${objectNameLower}Action = function(){
	
};
<#if dataView == "treeGrid">  
${objectNameLower}Action.prototype = new BaseTreeGridAction();
<#else>  
${objectNameLower}Action.prototype = new BaseDataGridAction();
</#if>  
var ${objectNameLower} = new ${objectNameLower}Action();

${objectNameLower}Action.prototype.init = function(){
<#if dataView == "treeGrid"> 
	$(${objectNameLower}.treeGrid).treegrid({
<#else> 
	$(${objectNameLower}.dataGrid).datagrid({
</#if>  	
        height     : tool.getGridHeight(),
        url        : basePath+${objectNameLower}.namespace+"/list.shtml",
		idField    : ${objectNameLower}.idField,
<#if dataView == "treeGrid">   
        lines      : true,
        treeField  : ${objectNameLower}.treeField,
</#if>  
        remoteSort : false,
        sortOrder  : 'asc',
		sortName   : 'createDate',
		fitColumns : true,//自动拉大列
        pagination : true,// 分页
        rownumbers : true,// 行数
		fit        : true,
        pageSize   : 30,
		<#if dataSelect == "1">
	    singleSelect:true,//是否单选
		</#if>
        columns: [[
		<#if dataSelect == "2">
			{field: '${objectNameLower}Id', checkbox:true},
		</#if>
		<#list fieldList as field>
			{field: '${field.attrName}', title: '${field.attrTitle}', width: 100<#if field.attrSor == 1>, sortable: true</#if><#if field.attrEdit == 1>, editor:{<#if field.attrRequired == 1>type: "validatebox", options:{required: true<#if field.dataValidType != "--">, validType: "${field.dataValidType}"</#if>}</#if><#if field.attrRequired == 0><#if field.dataValidType != "--">type: "validatebox", options:{validType: "${field.dataValidType}"}</#if><#if field.dataValidType == "--">type: "text"</#if></#if>}</#if>},
		</#list> 
			{field: 'creatorName', title: '录入人', width: 80},
			{field: 'createDate', title: '录入时间', width: 80,sortable: true}
        ]],
        queryParams:${objectNameLower}.getQueryParams(),
        customAttr: {//启用Ext.grid的rowEditing风格
            rowediting: true,
            onConfirmEdit:function(rowIndex){
            	${objectNameLower}.save();
            },
            onRevokeEdit:function(rowIndex){
            	${objectNameLower}.cancel();
            }
		}
	<#if dataView == "treeGrid"> 
	}).treegrid('followCustomHandle');
	<#else> 
	}).datagrid('followCustomHandle');
	</#if>
};