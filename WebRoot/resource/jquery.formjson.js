jQuery.fn.extend({ 
	/**
	 * 获取form表单值
	 */
    getForm:function(options){   
        var settings = jQuery.extend({   
            prefix:'' //表单项name前缀   
            ,data:{} //数据默认值   
        },options);   
        var ret =[];   
        var forms = this;   
        forms.each(function(){   
            var that =jQuery(this);   
            var o ={};   
            that.find('input,select,radio,textarea').each(function(){   
                var el = jQuery(this);   
                var fieldFullName = el.attr('name'); 
                var fieldName=fieldFullName;
                //var fieldName =fieldFullName.replace(settings.prefix,'');   
                if(settings.data[fieldName]){
                    o[fieldName] =settings.data[fieldName]; 
                    return;   
                }
                if(settings.prefix && fieldFullName.indexOf(settings.prefix)<0){   
                    //不符合前缀或已设置默认值   
                    return;   
                }
                if(o[fieldName]!=null){
                	var tmpF=o[fieldName];
                	if(el.attr("checked")&&el.attr("type")=="checkbox"){
                		o[fieldName]=tmpF+","+el.val();
                	}
                	if(el.attr("checked")&&el.attr("type")=="radio"){
                		o[fieldName]=el.val();
                	}
                }else{
                	if(el.val()!=null){
                		o[fieldName] = el.val(); 
                	}
                	
                } 
            });   
            ret.push(o);   
        });   
        if(ret.length === 1)return ret[0];   
        return ret;   
    },
    
    /**
	 * 填充表单
	 */
	fillForm:function (data,prefix,options){
	 	var settings = jQuery.extend({   
            prefix:'' //表单项name前缀   
           ,data:data //数据默认值   
        },options);   
        var forms = this;   
        forms.each(function(){   
            var that =jQuery(this);   
            that.find('input,select,radio,textarea').each(function(){ 
            	var el = jQuery(this);  
            	var fieldFullName = el.attr('name'); 
            	if(fieldFullName != undefined){
            		var itemName = fieldFullName.replace(settings.prefix,"");
                	el.val(settings.data[itemName]);
            	}
            })
        });
	},
	
	/**
	 * 清空表单元素
	 */
	emptyForm:function (options){
		var settings = jQuery.extend({   
            prefix:'' //表单项name前缀   
           ,data:{} //数据默认值   
        },options);   
        var forms = this;   
        forms.each(function(){   
            var that =jQuery(this);   
            that.find('input,select,radio,textarea').each(function(){ 
            	var el = jQuery(this);  
            	el.val("");
            })
        });
	},
	
	/**
	 * 设置表单不可编辑
	 */
	disableForm:function(options){
		var settings = jQuery.extend({   
            prefix:'' //表单项name前缀   
           ,data:{} //数据默认值   
        },options);   
        var forms = this;   
        forms.each(function(){   
            var that =jQuery(this);   
            that.find('input,select,radio,textarea').each(function(){ 
            	var el = jQuery(this);  
            	el.attr({"disabled":true,"readonly":true});
            })
        });
	},
	
	/**
	 * 设置表单可编辑
	 */
	enabledForm:function(options){
		var settings = jQuery.extend({   
            prefix:'' //表单项name前缀   
           ,data:{} //数据默认值   
        },options);   
        var forms = this;   
        forms.each(function(){   
            var that =jQuery(this);   
            that.find('input,select,radio,textarea').each(function(){ 
            	var el = jQuery(this);  
            	el.removeAttr("disabled").removeAttr("readonly");
            })
        });
	}
});