(function($){
    
    $.extend($.fn.datagrid.defaults.editors, {
		comboIcon: {    
            init: function(container, options){
            	var iconsHtml = new Array();
            	var iconDatas = $(options.data);
                var editor = $('<select class="datagrid-editable-select"></select>').appendTo(container).combo(options);
                for(var i = 0; i < iconDatas.size(); i++){
                	iconsHtml.push('<img value="');
                	iconsHtml.push(iconDatas[i].iconCls);
                	iconsHtml.push('" src="');
                	iconsHtml.push('resource/easyui/');
                	iconsHtml.push(iconDatas[i].path);
                	iconsHtml.push('" style="cursor: pointer;" />');
                }
                $(iconsHtml.join("")).appendTo(editor.combo('panel')).click(function(){
                	editor.combo('setValue',$(this).attr("value"));
                	editor.combo('setText',$(this).attr("value"));
                	editor.combo('hidePanel');
                });
                return editor;  
            },    
            getValue: function (target) {
            	return $(target).combo('getValue', $(target).val());
            },
        	setValue: function (target, value) {
            	if(value){
            		$(target).combo('panel').find("img[value='"+value+"']").click();
            	}else{
            		$(target).combo('setValue', '');
            	}
        	},
        	resize: function (target, width) {
        		$(target).combo('resize', width);
        	},
        	destroy: function (target) {
        		$(target).combo('destroy');
        	}  
        }  
    });
    
    $.fn.tree.defaults.loadFilter = function (data, parent) {
    	 return tool.toTreeData($(data.tree),$(this).data().tree.options);
    };
    
    $.extend($.fn.validatebox.defaults.rules, {
    	checkPw: {
            validator: function(_3e, _3f) {
                var _40 = {};
                _40[_3f[1]] = _3e;
                var _41 = $.ajax({
                    url: _3f[0],
                    dataType: "json",
                    data: _40,
                    async: false,
                    cache: false,
                    type: "post"
                }).responseText;
                return _41 == "true";
            },
            message: "请输入正确的原始密码！"
        },
    	pw:{
			validator: function(value){
				return /^[a-zA-Z0-9_]+$/.test(value);
			},
			message: '密码格式不正确！'
		},
        equals: {
    		validator: function(value,param){
    			return value == $(param[0]).val();
    		},
    		message: '两次输入的密码不一致！'
        },
        string:{
			validator: function (value) {
				
				return /^[a-zA-Z0-9_]+$/.test(value);
			
			},
			message: '只能输入字母和数字！'
		},
		postIntNum:{       
			validator: function (value) {
				
				return /^[+]?\d*$/.test(value);
				
		    },        
			message: '只能输入正整数！'
		},
		intNum:{       
			validator: function (value) {
				
				return /^[-+]?\d*$/.test(value);
				
		    },        
			message: '只能输入整数！'
		},
		postDouble:{
			validator: function (value) {
				
				return /^[+]?\d+(\.\d+)?$/.test(value);
				
		    },        
			message: '只能输入正双精度数！'
		},
		double:{
			validator: function (value) {
				
				return /^[-\+]?\d+(\.\d+)?$/.test(value);
				
		    },        
			message: '只能输入数字！'
		},
		tel:{
			validator: function(value){
				
				return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value);
				
			},
			message: '请输入正确的电话号码！'
		},
		phone:{
			validator: function(value){
				
				return /^(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})$/.test(value);
				
			},
			message: '请输入正确的手机号码！'
		},
		year:{
			validator: function(value){
				
				return /^([0-9]{4})$/.test(value);
				
			},
			message: '请输入正确年份！'
		},
		QQ:{
			validator: function(value){
				
				return /^[1-9]\d{4,8}$/.test(value);
				
			},
			message: '请输入正确的QQ号码！'
		},
		ch: {       
			validator: function (value) {            
				return /^[\u0391-\uFFE5]+$/.test(value);        
		    },        
			message: '只能输入汉字' 
		},
		packagex: {       
			validator: function (value) {            
				return /^[a-z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '请输入正确的java包名' 
		},
		clazz: {       
			validator: function (value) {            
				return /^[A-Z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '请输入正确的java类名' 
		},
		attr: {       
			validator: function (value) {            
				return /^[a-z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '请输入正确的java属性名' 
		},
		letter: {       
			validator: function (value) {            
				return /^[A-Za-z]+$/.test(value);        
		    },        
			message: '只能输入字母' 
		},
		num: {       
			validator: function (value) {            
				return /^[0-9]*$/.test(value);        
		    },        
			message: '只能输入数字' 
		},
		tableTop: {       
			validator: function (value) {            
				return /^[a-z]+_$/.test(value);        
		    },        
			message: '请输入正确的表前缀，并以下划线结尾' 
		}
    });
})(jQuery)