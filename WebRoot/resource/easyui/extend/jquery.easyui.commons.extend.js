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
            message: "?????????????????????????????????"
        },
    	pw:{
			validator: function(value){
				return /^[a-zA-Z0-9_]+$/.test(value);
			},
			message: '????????????????????????'
		},
        equals: {
    		validator: function(value,param){
    			return value == $(param[0]).val();
    		},
    		message: '?????????????????????????????????'
        },
        string:{
			validator: function (value) {
				
				return /^[a-zA-Z0-9_]+$/.test(value);
			
			},
			message: '??????????????????????????????'
		},
		postIntNum:{       
			validator: function (value) {
				
				return /^[+]?\d*$/.test(value);
				
		    },        
			message: '????????????????????????'
		},
		intNum:{       
			validator: function (value) {
				
				return /^[-+]?\d*$/.test(value);
				
		    },        
			message: '?????????????????????'
		},
		postDouble:{
			validator: function (value) {
				
				return /^[+]?\d+(\.\d+)?$/.test(value);
				
		    },        
			message: '??????????????????????????????'
		},
		double:{
			validator: function (value) {
				
				return /^[-\+]?\d+(\.\d+)?$/.test(value);
				
		    },        
			message: '?????????????????????'
		},
		tel:{
			validator: function(value){
				
				return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/.test(value);
				
			},
			message: '?????????????????????????????????'
		},
		phone:{
			validator: function(value){
				
				return /^(13[0-9]{9})|(15[0-9]{9})|(18[0-9]{9})$/.test(value);
				
			},
			message: '?????????????????????????????????'
		},
		year:{
			validator: function(value){
				
				return /^([0-9]{4})$/.test(value);
				
			},
			message: '????????????????????????'
		},
		QQ:{
			validator: function(value){
				
				return /^[1-9]\d{4,8}$/.test(value);
				
			},
			message: '??????????????????QQ?????????'
		},
		ch: {       
			validator: function (value) {            
				return /^[\u0391-\uFFE5]+$/.test(value);        
		    },        
			message: '??????????????????' 
		},
		packagex: {       
			validator: function (value) {            
				return /^[a-z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '??????????????????java??????' 
		},
		clazz: {       
			validator: function (value) {            
				return /^[A-Z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '??????????????????java??????' 
		},
		attr: {       
			validator: function (value) {            
				return /^[a-z][a-zA-Z0-9]+$/.test(value);        
		    },        
			message: '??????????????????java?????????' 
		},
		letter: {       
			validator: function (value) {            
				return /^[A-Za-z]+$/.test(value);        
		    },        
			message: '??????????????????' 
		},
		num: {       
			validator: function (value) {            
				return /^[0-9]*$/.test(value);        
		    },        
			message: '??????????????????' 
		},
		tableTop: {       
			validator: function (value) {            
				return /^[a-z]+_$/.test(value);        
		    },        
			message: '???????????????????????????????????????????????????' 
		}
    });
})(jQuery)