/**
 * Created by zxm on 2017/3/10.
 */
$.fn.extend({
    "initUpload":function(opt) {
        if (typeof opt != "object") {
            $.messager.alert('错误提示','参数错误!','warning');
            return;
        }
        var uploadId = $(this).attr("id");
        if(uploadId==null||uploadId==""){
            $.messager.alert('错误提示','要设定一个id!','warning');
        }
        $.each(uploadTools.getInitOption(uploadId), function (key, value) {
            if (opt[key] == null) {
                opt[key] = value;
            }
        });
        if(opt.autoCommit){
            opt.isHiddenUploadBt = true;
        }
        uploadTools.flushOpt(opt);
        uploadTools.initWithLayout(opt);//初始化布局
        uploadTools.initWithDrag(opt);//初始化拖拽
        uploadTools.initWithSelectFile(opt);//初始化选择文件按钮
        uploadTools.initWithUpload(opt);//初始化上传
        uploadTools.initWithCleanFile(opt);
        uploadFileList.initFileList(opt);
    }
});
/**
 * 上传基本工具和操作
 */
var uploadTools = {
    /**
     * 基本配置参数
     * @param uploadId
     * @returns {{uploadId: *, url: string, autoCommit: string, canDrag: boolean, fileType: string, size: string, ismultiple: boolean, showSummerProgress: boolean}}
     */
    "getInitOption":function(uploadId){
        //url test测试需要更改
        var initOption={
            "uploadId":uploadId,
            "uploadUrl":"#",//必须，上传地址
            "progressUrl":"#",//可选，获取进去信息的url,注意需要返回的data格式如下（{bytesRead: 102516060, contentLength: 102516060, items: 1, percent: 100, startTime: 1489223136317, useTime: 2767}）
            "scheduleStandard":false,//模拟进度的模式
            "selfUploadBtId":"",//自定义文件上传按钮id
            "rememberUpload":false,//记住上传文件文件
            "velocity":10,//模拟进度速度
            "autoCommit":false,//是否自动上传
            "isHiddenUploadBt":false,//是否隐藏上传按钮
            "isHiddenCleanBt":false,//是否隐藏清除按钮
            "isAutoClean":false,//是否上传完成后自动清除
            "canDrag":true,//是否可以拖动
            "fileType":"*",//文件类型
            "size":"-1",//文件大小限制,单位kB
            "ismultiple":true,//是否选择多文件
            "showSummerProgress":true,//显示总进度条
            "showFileItemProgress":true,//是否显示文件单个总进度,设置为true是按总进度，用于控制上传时间，如果设置为false,按照文件数据的总量,默认为false
            "filelSavePath":"",//文件上传地址，后台设置的根目录
            "beforeUpload":function(){//在上传前面执行的回调函数
            },
            "onUpload":function(){//在上传之后
            }

        };
        return initOption;
    },
    /**
     * 初始化文件上传
     * @param opt
     */
    "initWithUpload":function(opt){
        var uploadId = opt.uploadId;
        if(!opt.isHiddenUploadBt){
            $("#"+uploadId+" .uploadBts .uploadFileBt").off();
            $("#"+uploadId+" .uploadBts .uploadFileBt").on("click",function(){
                uploadEvent.uploadFileEvent(opt);
            });
            $("#"+uploadId+" .uploadBts .uploadFileBt i").css("color","#0099FF");
        }
        if(opt.selfUploadBtId!=null&&opt.selfUploadBtId!=""){
            if(uploadTools.foundExitById(opt.selfUploadBtId)){
                $("#"+opt.selfUploadBtId).off();
                $("#"+opt.selfUploadBtId).on("click",function(){
                    uploadEvent.uploadFileEvent(opt);
                });
            }
        }

    },
    /**
     * 查找某个对象是否存在
     * @param id
     * @returns {boolean}
     */
    "foundExitById":function(id){
        return $("#"+id).size()>0;
    },
    /**
     * 初始化清除文件
     * @param opt
     */
    "initWithCleanFile":function(opt){
        var uploadId = opt.uploadId;
        if(!opt.isHiddenCleanBt){
            $("#"+uploadId+" .uploadBts .cleanFileBt").off();
            $("#"+uploadId+" .uploadBts .cleanFileBt").on("click",function(){
                uploadEvent.cleanFileEvent(opt);
            });
            $("#"+uploadId+" .uploadBts .cleanFileBt i").css("color","#0099FF");
        }
    },
    /**
     * 初始化选择文件按钮
     * @param opt
     */
    "initWithSelectFile":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId+" .uploadBts .selectFileBt").css("background-color","#0099FF");
        $("#"+uploadId+" .uploadBts .selectFileBt").off();
        $("#"+uploadId+" .uploadBts .selectFileBt").on("click",function(){
            if(opt.autoCommit){
                uploadEvent.cleanFileEvent(opt);
            }
            uploadEvent.selectFileEvent(opt);
        });
    },
    /**
     * 返回显示文件类型的模板
     * @param isImg 是否式图片：true/false
     * @param fileType 文件类型
     * @param fileName 文件名字
     * @param isImgUrl 如果事文件时的文件地址默认为null
     */
    "getShowFileType":function(isImg,fileType,fileName,isImgUrl,fileCodeId){
        var showTypeStr="<div class='fileType'>"+fileType+"</div> <i class='iconfont icon-wenjian'></i>";//默认显示类型
        if(isImg){
            if(isImgUrl!=null&&isImgUrl!="null"&&isImgUrl!=""){//图片显示类型
                showTypeStr = "<img src='"+isImgUrl+"'/>";
            }
        }
        var modelStr="";
        modelStr+="<div class='fileItem'  fileCodeId='"+fileCodeId+"'>";
        modelStr+="<div class='imgShow'>";
        modelStr+=showTypeStr;
        modelStr+=" </div>";
        modelStr+=" <div class='progress'>";
        modelStr+="<div class='progress_inner'></div>";
        modelStr+="</div>";
        modelStr+="<div class='status'>";
        modelStr+="<i class='iconfont icon-shanchu'></i>";
        modelStr+="</div>";
        modelStr+=" <div class='fileName'>";
        modelStr+=fileName;
        modelStr+="</div>";
        modelStr+=" </div>";
        return modelStr;
    },
    /**
     * 初始化布局
     * @param opt 参数对象
     */
    "initWithLayout":function(opt){
        var uploadId = opt.uploadId;
        //选择文件和上传按钮模板
        var btsStr = "";
        btsStr += "<div class='uploadBts'>";
        btsStr += "<div>";
        btsStr += "<div class='selectFileBt'>选择文件</div>";
        btsStr += "</div>";
        //上传按钮
        if(!opt.isHiddenUploadBt){
            btsStr += "<div class='uploadFileBt'>";
            btsStr += "<i class='iconfont icon-shangchuan'></i>";
            btsStr += " </div>";
        }
        //清理按钮
        if(!opt.isHiddenCleanBt){
            btsStr += "<div class='cleanFileBt'>";
            btsStr += "<i class='iconfont icon-qingchu'></i>";
            btsStr += " </div>";
        }
        btsStr += "</div>";
        $("#"+uploadId).append(btsStr);
        //添加总进度条
        if(opt.showSummerProgress){
            var summerProgressStr = "<div class='subberProgress'>";
            summerProgressStr += "<div class='progress'>";
            summerProgressStr += "<div>0%</div>";
            summerProgressStr += "</div>";
            summerProgressStr += " </div>";
            $("#"+uploadId).append(summerProgressStr);
        }
        //添加文件显示框
        var boxStr = "<div class='box'></div>";
        $("#"+uploadId).append(boxStr);
    },
    /**
     * 初始化拖拽事件
     * @param opt 参数对象
     */
    "initWithDrag":function(opt){
        var canDrag = opt.canDrag;
        var uploadId = opt.uploadId;
        if(canDrag){
            $(document).on({
                dragleave:function(e){//拖离 
                    e.preventDefault();
                },
                drop:function(e){//拖后放 
                    e.preventDefault();
                },
                dragenter:function(e){//拖进 
                    e.preventDefault();
                },
                dragover:function(e){//拖来拖去 
                    e.preventDefault();
                }
            });
            var box = $("#"+uploadId+" .box").get(0);
            if(box!=null){
                //验证图片格式，大小，是否存在
                box.addEventListener("drop",function(e) {

                    if($("#"+uploadId).attr("isUpload")=="true"){
                        e.preventDefault();
                    }else{
                        uploadEvent.dragListingEvent(e,opt);
                    }

                });
            }
        }
    },
    /**
     * 删除文件
     * @param opt
     */
    "initWithDeleteFile":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId+" .fileItem .status i").off();
        $("#"+uploadId+" .fileItem .status i").on("click",function(){
            uploadEvent.deleteFileEvent(opt,this);
        })
    },
    /**
     * 获取文件名后缀
     * @param fileName 文件名全名
     * */
    "getSuffixNameByFileName":function(fileName){
        var str = fileName;
        var pos = str.lastIndexOf(".")+1;
        var lastname = str.substring(pos,str.length);
        return lastname;
    },
    /**
     * 判断某个值是否在这个数组内
     * */
    "isInArray":function(strFound,arrays){
        var ishave = false;
        for(var i=0;i<arrays.length;i++){
            if(strFound==arrays[i]){
                ishave = true;
                break;
            }
        }
        return ishave;
    },
    /**
     * 文件是否已经存在
     * */
    "fileIsExit":function(file,opt){
        var fileList = uploadFileList.getFileList(opt);
        var ishave = false;
        for(var i=0;i<fileList.length;i++){
            //文件名相同，文件大小相同
            if(fileList[i]!=null&&fileList[i].name ==file.name&&fileList[i].size==file.size){
                ishave = true;
            }
        }
        return ishave;
    },
    /**
     * 文件是否已经被上传
     * @param file
     * @param opt
     * @returns {boolean}
     */
    "fileIsHaveUpload":function(file,opt){
        var fileList = opt.rememberFile;
        var ishave = false;
        if(fileList!=null){
            for(var i=0;i<fileList.length;i++){
                //文件名相同，文件大小相同
                if(fileList[i]!=null&&fileList[i].name ==file.name&&fileList[i].size==file.size){
                    ishave = true;
                }
            }
        }
        return ishave;
    },
    /**
     * 添加文件到列表
     * */
    "addFileList":function(fileList,opt){
        var uploadId = opt.uploadId;
        var boxJsObj =  $("#"+uploadId+" .box").get(0);
        var fileListArray=uploadFileList.getFileList(opt);
        var fileNumber = uploadTools.getFileNumber(opt);
        if(fileNumber+fileList.length>opt.maxFileNumber){
            $.messager.alert('操作提示','最多只能上传'+opt.maxFileNumber+'个文件','warning');
            return;
        }
        var imgtest=/image\/(\w)*/;//图片文件测试
        var fileTypeArray = opt.fileType;//文件类型集合
        var fileSizeLimit = opt.size;//文件大小限制
        for(var i=0;i<fileList.length;i++){
            //判断文件是否存在
            if(uploadTools.fileIsExit(fileList[i],opt)){
                $.messager.alert('操作提示','文件（'+fileList[i].name+'）已经存在！','warning');
                continue;
            }
            if(opt.rememberUpload){
                if(uploadTools.fileIsHaveUpload(fileList[i],opt)){
                    $.messager.alert('操作提示','文件（'+fileList[i].name+'）已经上传过，不能再次上传！','warning');
                    continue;
                }
            }
            var fileTypeStr =  uploadTools.getSuffixNameByFileName(fileList[i].name);
            //文件大小显示判断
            if(fileSizeLimit!=-1&&fileList[i].size>(fileSizeLimit*1000)){
            	$.messager.alert('操作提示','文件（'+fileList[i].name+'）超出了大小限制！请控制在'+fileSizeLimit+'KB内','warning');
                continue;
            }
            //文件类型判断
            if(fileTypeArray=="*"||uploadTools.isInArray("."+fileTypeStr,fileTypeArray)){
                var fileTypeUpcaseStr = fileTypeStr.toUpperCase();
                if(imgtest.test(fileList[i].type)){
                    //var imgUrlStr = window.webkitURL.createObjectURL(fileList[i]);//获取文件路径
                    var imgUrlStr ="";//获取文件路径
                    if (window.createObjectURL != undefined) { // basic
                        imgUrlStr = window.createObjectURL(fileList[i]);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        imgUrlStr = window.URL.createObjectURL(fileList[i]);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        imgUrlStr = window.webkitURL.createObjectURL(fileList[i]);
                    }
                    var fileModel = uploadTools.getShowFileType(true,fileTypeUpcaseStr,fileList[i].name,imgUrlStr,fileListArray.length);
                    $(boxJsObj).append(fileModel);
                }else{
                    var fileModel = uploadTools.getShowFileType(true,fileTypeUpcaseStr,fileList[i].name,null,fileListArray.length);
                    $(boxJsObj).append(fileModel);
                }
                uploadTools.initWithDeleteFile(opt);
                fileListArray[fileListArray.length] = fileList[i];
            }else{
                $.messager.alert('操作提示','不支持该格式文件上传:'+fileList[i].name,'warning');
                return;
            }
        }
        uploadFileList.setFileList(fileListArray,opt);

    },
    /**
     * 清除选择文件的input
     * */
    "cleanFilInputWithSelectFile":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId+"_file").remove();
    },
    /**
     * 根据制定信息显示
     */
    "showUploadProgress":function(opt,bytesRead,percent){

        var uploadId = opt.uploadId;
        var fileListArray = uploadFileList.getFileList(opt);
        if(opt.showSummerProgress){
            var progressBar = $("#"+uploadId+" .subberProgress .progress>div");
            progressBar.css("width",percent+"%");
            progressBar.html(percent+"%");
            if(percent==100){
                if(opt.isAutoClean){
                   setTimeout(function () {
                       uploadEvent.cleanFileEvent(opt);
                   },2000) ;
                }
            }
        }
        for(var i=0;i<fileListArray.length;i++){
            if(fileListArray[i]==null){
                continue;
            }
            var testbytesRead =bytesRead -fileListArray[i].size;
            if(testbytesRead<0){
                if(percent==100){
                    if(opt.showFileItemProgress){
                        $("#"+uploadId+" .box .fileItem[fileCodeId='"+i+"'] .progress>div").addClass("error");
                        $("#"+uploadId+" .box .fileItem[fileCodeId='"+i+"'] .progress>div").css("width","100%");
                    }
                    $("#"+uploadId+" .box .fileItem[fileCodeId='"+i+"'] .status>i").addClass("iconfont icon-cha");
                    bytesRead = bytesRead-fileListArray[i].size;
                }else{
                    if(opt.showFileItemProgress) {
                        $("#" + uploadId + " .box .fileItem[fileCodeId='" + i + "'] .progress>div").css("width", (bytesRead / fileListArray[i].size * 100) + "%");
                    }
                    break;
                }
            }else if(testbytesRead>=0){
                $("#"+uploadId+" .box .fileItem[fileCodeId='"+i+"'] .status>i").off();
                $("#"+uploadId+" .box .fileItem[fileCodeId='"+i+"'] .status>i").addClass("iconfont icon-gou");
                if(opt.showFileItemProgress) {
                    $("#" + uploadId + " .box .fileItem[fileCodeId='" + i + "'] .progress>div").css("width", "100%");
                }
                bytesRead = bytesRead-fileListArray[i].size;
            }
        }
    },
	/**
     * 上传文件失败集体显示
     * @param opt
     */
    "uploadError":function(opt){
        var uploadId = opt.uploadId;
        if(opt.showFileItemProgress){
            $("#"+uploadId+" .box .fileItem .progress>div").addClass("error");
            $("#"+uploadId+" .box .fileItem .progress>div").css("width","100%");
        }

        $("#"+uploadId+" .box .fileItem .status>i").addClass("iconfont icon-cha");
        var progressBar = $("#"+uploadId+" .subberProgress .progress>div");
        progressBar.css("width","0%");
        progressBar.html("0%");
    },
    /**
     * 获取文件上传总数据量
     * @param opt
     * @returns {number}
     */
    "getFilesDataAmount":function(opt){
        var fileList = uploadFileList.getFileList(opt);
        var summer = 0;
        for(var i=0;i<fileList.length;i++){
            var fileItem = fileList[i];
            if(fileItem!=null)
            summer=parseFloat(summer)+fileItem.size;
        }
        return summer;
    },

    "startUpload":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId).attr("isUpload","true")
    },
    "stopUpload":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId).removeAttr("isUpload");
    },
    /**
     * 上传文件
     */
    "uploadFile":function(opt){
        uploadTools.startUpload(opt);
        var uploadUrl = opt.uploadUrl;
        var fileList = uploadFileList.getFileList(opt);
        var rememberFile = [];
        var formData = new FormData();
        var fileNumber = uploadTools.getFileNumber(opt);
        if(fileNumber<=0){
            $.messager.alert('操作提示','没有文件，不支持上传','warning');
            return;
        }
        for(var i=0;i<fileList.length;i++){
            if(fileList[i]!=null){
                formData.append("file",fileList[i]);
                rememberFile[rememberFile.length] = fileList[i];
            }
        }
        if(opt.otherData!=null&&opt.otherData!=""){
        	for(var key in opt.otherData){//遍历json对象的每个key/value对,p为key
        		formData.append(key, opt.otherData[key]);
        	}
        }
        formData.append("filelSavePath",opt.filelSavePath);
        if(uploadUrl!="#"&&uploadUrl!=""){
            uploadTools.disableFileUpload(opt);//禁用文件上传
            uploadTools.disableCleanFile(opt);//禁用清除文件
            uploadTools.disableFileSelect(opt);
            $.ajax({
                type:"post",
                url:uploadUrl,
                data:formData,
                processData : false,
                contentType : false,
                success:function(data){
                    uploadFileList.flushRememberFile(rememberFile,opt);
                    setTimeout(function(){opt.onUpload(opt,data)},500);
                    if(!opt.showSummerProgress&&opt.isAutoClean){
                        setTimeout(function () {uploadEvent.cleanFileEvent(opt);},2000) ;
                    }
                },
                error:function(e){
                    uploadTools.uploadError(opt);//显示上传错误
                }
            });

        }else{
            uploadTools.disableFileSelect(opt);
            uploadTools.disableFileUpload(opt);//禁用文件上传
            uploadTools.disableCleanFile(opt);//禁用清除文件
            uploadFileList.flushRememberFile(rememberFile,opt);//模拟上传成功
        }

        uploadTools.getFileUploadPregressMsg(opt);

    },
    /**
     *  获取文件上传进度信息
     */
    "getFileUploadPregressMsg":function(opt){
        var uploadId = opt.uploadId;
        var progressUrl = opt.progressUrl;
        if(opt.showSummerProgress){
            $("#"+uploadId+" .subberProgress").css("display","block");
        }
        $("#"+uploadId+" .box .fileItem .status>i").removeClass();
        if(progressUrl!="#"&&progressUrl!="") {
            var intervalId = setInterval(function(){
                $.get(progressUrl,{},function(data,status){
                    console.log(data);
                    var percent = data.percent;
                    var bytesRead = data.bytesRead;
                    if(percent >= 100){
                        clearInterval(intervalId);
                        percent = 100;//不能大于100
                        uploadTools.initWithCleanFile(opt);
                    }
                    uploadTools.showUploadProgress(opt, bytesRead, percent);
                },"json");
            },500);
        }else{
            if(opt.velocity==null||opt.velocity==""||opt.velocity<=0){
                opt.velocity = 1;
            }
            var filesDataAmount = uploadTools.getFilesDataAmount(opt);
            var percent = 0;
            var bytesRead = 0;
            var intervalId = setInterval(function(){

                bytesRead+=5000*parseFloat(opt.velocity);

                if(!opt.scheduleStandard){
                    percent = bytesRead/filesDataAmount*100;
                    percent = percent.toFixed(2);
                    if(percent >= 100){
                        clearInterval(intervalId);
                        percent = 100;//不能大于100
                        uploadTools.initWithCleanFile(opt);
                    }
                }else{
                    percent+=parseFloat(opt.velocity);
                    if(percent >= 100){
                        clearInterval(intervalId);
                        percent = 100;//不能大于100
                        uploadTools.initWithCleanFile(opt);
                    }
                }

                uploadTools.showUploadProgress(opt, bytesRead, percent);
            },500);
        }
    },
    /**
     * 禁用文件选择
     * @param opt
     */
    "disableFileSelect":function(opt){
        var uploadId = opt.uploadId;
        $("#"+uploadId+" .uploadBts .selectFileBt").css("background-color","#DDDDDD");
        $("#"+uploadId+" .uploadBts .selectFileBt").off();
    },
    /**
     * 禁用文件上传
     */
    "disableFileUpload":function(opt){
        if(!opt.isHiddenUploadBt){
            var uploadId = opt.uploadId;
            $("#"+uploadId+" .uploadBts .uploadFileBt").off();
            $("#"+uploadId+" .uploadBts .uploadFileBt i").css("color","#DDDDDD");
        }
    },
    /**
     * 禁用文件清除
     */
    "disableCleanFile":function(opt){
        if(!opt.isHiddenCleanBt){
            var uploadId = opt.uploadId;
            $("#"+uploadId+" .uploadBts .cleanFileBt").off();
            $("#"+uploadId+" .uploadBts .cleanFileBt i").css("color","#DDDDDD");
        }

    },
    /**
     * 获取文件个数
     * @param opt
     */
    "getFileNumber":function(opt){
        var number = 0;
        var fileList = uploadFileList.getFileList(opt);
        for(var i=0;i<fileList.length;i++){
            if(fileList[i]!=null){
                number++;
            }
        }
        return number;
    },
    "flushOpt":function(opt){
    	 var uploadId = opt.uploadId;
         $("#"+uploadId).data("opt",opt);

    },
    "getOpt":function(uploadId){
    	var opt = $("#"+uploadId).data("opt");
    	return opt;
    }
};
/**
 * 上传事件操作
 * */
var uploadEvent = {
    /**
     * 拖动时操作事件
     */
    "dragListingEvent":function(e,opt){
        if(opt.autoCommit){
            uploadEvent.cleanFileEvent(opt);
        }
        e.preventDefault();//取消默认浏览器拖拽效果 
        var fileList = e.dataTransfer.files;//获取文件对象
        uploadTools.addFileList(fileList,opt);
        if(opt.autoCommit){
            uploadEvent.uploadFileEvent(opt);
        }

    },
    /**
     * 删除文件对应的事件
     * */
    "deleteFileEvent":function(opt,obj){
        var fileItem = $(obj).parent().parent();
        var fileCodeId = fileItem.attr("fileCodeId");
        var fileListArray = uploadFileList.getFileList(opt);
        delete fileListArray[fileCodeId];
        uploadFileList.setFileList(fileListArray,opt);
        fileItem.remove();

    },
    /**
     * 选择文件按钮事件
     * @param opt
     */
    "selectFileEvent":function(opt){
        var uploadId = opt.uploadId;
        var ismultiple = opt.ismultiple;
        var fileType = opt.fileType;
        var inputObj=document.createElement('input');
        inputObj.setAttribute('id',uploadId+'_file');
        inputObj.setAttribute('type','file');
        inputObj.setAttribute("style",'visibility:hidden');
        if(ismultiple){//是否选择多文件
            inputObj.setAttribute("multiple","multiple");
        }
        if(fileType){
        	inputObj.setAttribute("accept",fileType.join(","));
        }
        $(inputObj).on("change",function(){
            uploadEvent.selectFileChangeEvent(this.files,opt);
        });
        document.body.appendChild(inputObj);
        inputObj.click();
    },
    /**
     * 选择文件后对文件的回调事件
     * @param opt
     */
    "selectFileChangeEvent":function(files,opt){
        uploadTools.addFileList(files,opt);
        uploadTools.cleanFilInputWithSelectFile(opt);

        if(opt.autoCommit){
            uploadEvent.uploadFileEvent(opt);
        }
    },
    /**
     * 上传文件的事件
     * */
    "uploadFileEvent":function(opt){
        uploadTools.flushOpt(opt);
        if(opt.beforeUpload!=null&&(typeof opt.beforeUpload === "function")) {
            opt.beforeUpload(opt);
        }
        uploadTools.uploadFile(opt);
    },
    /**
     * 清除文件事件
     */
    "cleanFileEvent":function(opt){
        var uploadId = opt.uploadId;
        if(opt.showSummerProgress){
            $("#"+uploadId+" .subberProgress").css("display","none");
            $("#"+uploadId+" .subberProgress .progress>div").css("width","0%");
            $("#"+uploadId+" .subberProgress .progress>div").html("0%");
        }
        uploadTools.cleanFilInputWithSelectFile(opt);
        uploadFileList.setFileList([],opt);
        $("#"+uploadId+" .box").html("");
        uploadTools.initWithUpload(opt);//初始化上传
        uploadTools.initWithSelectFile(opt);
        uploadTools.stopUpload(opt);
    }
};

var uploadFileList={
    "initFileList":function(opt){
        opt.fileList = new Array();
    },

    "getFileList":function(opt){
        return opt.fileList;
    },
    "setFileList":function(fileList,opt){
        opt.fileList = fileList;
         uploadTools.flushOpt(opt);
    },
    "flushRememberFile":function(fileList,opt){
        if(opt.rememberUpload){
            if(opt.rememberFile==null||opt.rememberFile==""||opt.rememberFile.length==0){
                opt.rememberFile = opt.fileList;
            }else{
                var rememberFileArray = opt.rememberFile;
                for(var i=0;i<fileList.length;i++){
                    rememberFileArray[rememberFileArray.length] = fileList[i];
                }
                opt.rememberFile = rememberFileArray;
                alert(opt.rememberFile.length);
            }
        }
    }
};
var formTake={
    "getData":function(formId){
        var formData = {};
        var $form = $("#"+formId);
        var input_doms = $form.find("input[name][ignore!='true'],textarea[name][ignore!='true']");
        var select_doms = $form.find("select[name][ignore!='true']");
        for(var i=0;i<input_doms.length;i++){
            var inputItem = input_doms.eq(i);
            var inputName="";
            if(inputItem.attr("type")=="radio"){
                if(inputItem.is(":checked")){
                    inputName = inputItem.attr("name");
                    formData[inputName]=$.trim(inputItem.val());
                }
            }else{
                inputName = inputItem.attr("name");
                formData[inputName]=$.trim(inputItem.val());
            }

        }
        for(var j=0;j<select_doms.length;j++){
            var selectItem = select_doms.eq(j);
            var selectName = selectItem.attr("name");
            formData[selectName] = $.trim(selectItem.val());
        }
        return formData;
    },
    "getDataWithUploadFile":function(formId){
        var formData = [];
        var $form = $("#"+formId);
        var input_doms = $form.find("input[name][ignore!='true'],textarea[name][ignore!='true']");
        var select_doms = $form.find("select[name][ignore!='true']");
        for(var i=0;i<input_doms.length;i++){
            var inputItem = input_doms.eq(i);
            var inputName="";
            if(inputItem.attr("type")=="radio"){
                if(inputItem.is(":checked")){
                    inputName = inputItem.attr("name");
                    formData[formData.length] = {"name":inputName,"value":$.trim(inputItem.val())}
                }
            }else{
                inputName = inputItem.attr("name");
                formData[formData.length] = {"name":inputName,"value":$.trim(inputItem.val())}
            }
        }
        for(var j=0;j<select_doms.length;j++){
            var selectItem = select_doms.eq(j);
            var selectName = selectItem.attr("name");
            formData[formData.length] = {"name":selectName,"value":$.trim(selectItem.val())}
        }
        return formData;
    }
};