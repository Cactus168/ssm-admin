var CommonTools = function(){
	this.popWin = "#popWin";
};

CommonTools.prototype.getParams = function(params){
	params = params || {};
	params.creator = $("#userInfo").attr("no");
	params.modify = $("#userInfo").attr("no");
	params.currUserId = $("#userInfo").attr("no");
	params.token = $("#userInfo").attr("token");
	params.modNo = $("#userInfo").attr("modNo");
	params.modId = $("#userInfo").attr("modId");
	params.currUserName = $("#userInfo").attr("userName");
	params.random = Math.random(); 
	return params;
};
CommonTools.prototype.getStrParams = function(paramsStr){
	return paramsStr+"&creator="+$("#userInfo").attr("no")
	+"&modify="+$("#userInfo").attr("no")
	+"&currUserId="+$("#userInfo").attr("no")
	+"&token="+$("#userInfo").attr("token")
	+"&modNo="+$("#userInfo").attr("modNo")
	+"&modId="+$("#userInfo").attr("modId")
	+"&currUserName="+$("#userInfo").attr("userName")
	+"&random="+Math.random();
};
CommonTools.prototype.getGridWidth = function(){
	return $("#mainTabs").parent().width();
};
CommonTools.prototype.getGridHeight = function(){
	return $("#mainTabs").parent().height()-31;
};
CommonTools.prototype.toTreeData = function(dataTree,options){
	  if(options.parentData != undefined){
		dataTree.push(options.parentData);
	 }
	 var idFiled = options.idFiled || 'id';
	 var textFiled = options.textFiled || 'text';
	 var parentField = options.parentField || '_parentId';
	 var treeData = [],tmpMap = [];
	 for(var i = 0; i < dataTree.size(); i++){
		 tmpMap[dataTree[i][idFiled]] = dataTree[i];
	 }
	 for(var i = 0; i < dataTree.size(); i++){
		 if(tmpMap[dataTree[i][parentField]] && dataTree[i][idFiled] != dataTree[i][parentField]) {
			 if (!tmpMap[dataTree[i][parentField]]['children']){
				 tmpMap[dataTree[i][parentField]]['children'] = [];  
			 }
			 dataTree[i]['id'] = dataTree[i][idFiled];
			 dataTree[i]['text'] = dataTree[i][textFiled];
			 tmpMap[dataTree[i][parentField]]['checked'] = (tmpMap[dataTree[i][parentField]]['checked']*dataTree[i]["checked"]);
	 		 tmpMap[dataTree[i][parentField]]['children'].push(dataTree[i]);	 	
		 } else {
			 dataTree[i]['id'] = dataTree[i][idFiled];
			 dataTree[i]['text'] = dataTree[i][textFiled];
			 treeData.push(dataTree[i]);
		 }
	 }
	 return treeData;
};
/**
 * 得到ajax对象
 */
CommonTools.prototype.getAjaxHttp = function() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
    return xmlHttp;
}
/**
 * 发送ajax请求
 * url--url
 * methodType(post/get)
 * asyn (true(异步)|false(同步))
 * params(参数)
 * callBack(回调方法名，不需要引号,这里只有成功的时候才调用)
 * (注意：这方法有二个参数，一个就是xmlhttp,一个就是要处理的对象)
 * obj需要到回调方法中处理的对象
 */
CommonTools.prototype.ajaxRequest = function(url,methodType,asyn,params,callBack,obj){
    var xmlHttp=tool.getAjaxHttp();
    xmlHttp.open(methodType,url,asyn);
    xmlHttp.send(params);
    xmlHttp.onreadystatechange=function(){
    	if(xmlHttp.readyState==4 && xmlHttp.status==200){
    		//HTTP响应已经完全接收才调用
    		callBack(xmlHttp,obj);
    	}
    };
}
/**
 * 从json数据中返回字段field值为fieldVal的数据
 * @param jsonData
 * @param field
 * @param fieldVal
 * @returns
 */
CommonTools.prototype.getJsonDataByFieldVal = function(jsonData,field,fieldVal){
	var rsVal = null;
	for(var n = 0; n < jsonData.length; n++){
		var json = jsonData[n];
		if(json[field] == fieldVal){
			rsVal = json;
			break;
		}
	}
	return rsVal;
}

/**
 * 从json数据中返回字段field值为fieldVal的数据
 * @param jsonData
 * @param field
 * @param fieldVal
 * @returns
 */
CommonTools.prototype.getJsonDatasByFieldVal = function(jsonData,field,fieldVal){
	var rsArray = new Array();
	for(var n = 0; n < jsonData.length; n++){
		var json = jsonData[n];
		if(json[field] == fieldVal){
			rsArray.push(json);
		}
	}
	return rsArray;
}
/**
 * 获取URL中的参数
 * @param name
 * @param url
 * @returns
 */
CommonTools.prototype.getQueryStringRegExp = function(name,url){
	var reg = new RegExp("(!|\\?|&)"+name+"=([^&]*)(\\s|&|$)","i");
	if(reg.test(url)){
		return decodeURIComponent(RegExp.$2.replace(/\+/g," "));
	}
	return "";
};
/**
 * 获取当前点击事件的Object对象
 * @returns
 */
CommonTools.prototype.getEvent = function(){
	if(document.all){
		return window.event;
	}
	func = tool.getEvent.caller;
	while(func != null){
		var arg0 = func.arguments[0];
		if(arg0){
			if((arg0.constructor == Event || arg0 == MouseEvent) 
					|| (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)){
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
/**
 * Ajax 文件下载
 * @param nameSpace 域
 * @param filePath 文件路径（保护文件名称 如：d:/text/text.txt）
 * @param fileName 文件名称 （如：text.txt）
 */
CommonTools.prototype.download = function(nameSpace, filePath, fileName) {
	var params = tool.getParams({"filePath":filePath,"fileName":fileName});
	// 把参数组装成 form的  input
	var inputs = '';
	for(var key in params){
		var val = params[key];
		inputs += '<input type="hidden" name="' + key + '" value="' + val + '" />';
	}
	// request发送请求
	$('<form action="'+ basePath+nameSpace+'/download.shtml" method="post">' + inputs + '</form>').appendTo('body').submit().remove();
};

var tool = new CommonTools();