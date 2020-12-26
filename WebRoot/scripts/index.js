/**
 * 主框架页面布局、事件
 */
(function() {
	
	this.themeItmes = "#themeItmes";
	this.mainLayout = "#mainLayout";
	this.mainTabs = "#mainTabs";
	this.homePageTitle = "主页";
	this.homePageHref = null;
	this.themeDataSource = [
        { id: 1, name: "天空蓝", path: "default", color:"#95B8E7" },
        { id: 2, name: "金属黑", path: "black", color:"#383838" },
        { id: 3, name: "银色", path: "bootstrap", color:"#F2F2F2" },
        { id: 4, name: "灰霾", path: "gray", color:"#EEE" },

        { id: 5, name: "清泉", path: "ui-cupertino", disabled: false, color:"#D7EBF9"},
        { id: 6, name: "黑巢", path: "ui-dark-hive", disabled: false, color:"#222" },
        { id: 7, name: "杏黄", path: "ui-pepper-grinder", disabled: false, color:"#F8F7F6" },
        { id: 8, name: "阳光", path: "ui-sunny", disabled: false, color:"#817865" },

        { id: 9, name: "磁贴（白）", path: "metro-standard", color:"#FFF" },
        { id: 10, name: "磁贴（蓝）", path: "metro-blue", color:"#DAEEF5" },
        { id: 11, name: "磁贴（灰）", path: "metro-gray", color:"#C7CCD1" },
        { id: 12, name: "磁贴（绿）", path: "metro-green", color:"#E5F0C9" },
        { id: 13, name: "磁贴（橙）", path: "metro-orange", color:"#F0E3BF" },
        { id: 14, name: "磁贴（红）", path: "metro-red", color:"#F0E1E3" }
    ];
	this.imgDom = new Array("<img src='"+basePath+"styles/images/index/girl.jpg' width='103px' height='103px'/>","<img src='"+basePath+"styles/images/index/boy.jpg' width='103px' height='103px'/>");
	function AjaxModel(id, status) {
	    this.id = id;
	    this.status = status;
	    return this;
	}
	/**
	 * 初始化主界面
	 */
	this.init = function() {
		initAppDefaultTheme();
		instTimerSpan();
		bindAppAction();
		loadCollectMenus();
		$(document).ajaxStart(function(){
			tool.ajaxRequest(basePath+"checkingUser.shtml", "GET", true, tool.getParams({}), function(xmlHttp,obj){
				if(xmlHttp.responseText.indexOf("<body class=\"login_body\">") > -1){
					$("#txtName,#LoginBox").val("");
	     			$("#txtPwd,#LoginBox").val("");
	     			$("#LoginBox").css("display","block");
	     			$("#LoginBox").dialog({
	     				title:"重新登录",
	     				iconCls: "icon-standard-lock-open", 
	     				width:450,
	 			        height:300,
	 			        resizable:true,
	 			        autoOpen: false,
	 			        modal: true 
	     			});
				}
			},document);
		});
	};
	/**
	 * 初始化系统时间
	 */	
	this.instTimerSpan = function () {
        $("#timerSpan","#southPanel").everyTime('1s','A',function(){
        	$("#timerSpan","#southPanel").html($.dateUtil.toLongDateTimeString(new Date()));
        },0,true);
        $(mainTabs).tabs({ cache: true });
    };
	/**
	 * 设置默认程序背景
	 */
	this.initAppDefaultTheme = function() {
		var isExists = false;
		var themeHtml = new Array();
		var theme = $.cookie("lserpThemeName");
		var themes = themeDataSource;
		themeHtml.push('<ul>');
		for(var i = 0; i < themes.length; i++){
			if(theme == themes[i].path){
				isExists = true;
			}
			themeHtml.push('<li>');
			themeHtml.push('<div class="themeColor" style="background: '+themes[i].color+';" theme="'+themes[i].path+'"><i></i></div>');
			themeHtml.push('<div class="themeName">'+themes[i].name+'</div>');
			themeHtml.push('</li>');
		}
		themeHtml.push('</ul>')
		$(themeItmes).html(themeHtml.join(""));
		if(isExists){
			$(".themeColor[theme='"+theme+"']").find("i").addClass("theme_yes icon-theme-yes");
			$("#easyUiTheme").attr("href",basePath+"resource/easyui/themes/"+theme+"/easyui.css");
			$("#easyUiStyle").attr("href",basePath+"resource/easyui/themes/"+theme+"/style.css");
		}else{
			$(".themeColor[theme='default']").find("i").addClass("theme_yes icon-theme-yes");
		}
	};
	/**
	 * 获取个人收藏菜单
	 */
	this.loadCollectMenus = function(){
		$("#collectMenu").empty();
		var params = tool.getParams();
		params.userId = params.currUserId;
		var url = basePath+"getCollectMenus.shtml";
    	$.post(url,params,function(data){
    		if(data.success){
    			var array=new Array();
				for(var i=0,size=$(data.menus).size();i<size;i++){
					var li = '<li class="'+(data.menus[i].menuIcon == undefined ? 'icon-hamburg-star' : data.menus[i].menuIcon)+'"';
					li = li +' menuId="'+data.menus[i].menuId+'" menuIcon="'+(data.menus[i].menuIcon == undefined ? 'icon-hamburg-star' : data.menus[i].menuIcon)+'" menuNo = "'+data.menus[i].menuNo+'" menuUrl = "'+data.menus[i].menuUrl+'" collectUrl = "'+data.menus[i].collectUrl+'">';
					li = li + ''+(data.menus[i].menuName == undefined ? data.menus[i].collectName : data.menus[i].menuName)+'</li>';
					$(li).appendTo("#collectMenu").click(function(){
						clickMenu(this);
					}).contextmenu(function(e){
						e.preventDefault();
						var menu = $(this);
						$('#collectMenu-mm').menu('show', {
							left: e.pageX,
							top: e.pageY,
							onClick:function(item){
								if(item.id == "addCollect"){
									$('#collectMenuWin').dialog({
				                	    title: '添加收藏',
				                	    iconCls:'icon-hamburg-star',
				                	    closed: false,
				                	    cache: false,
				                	    modal: true,
				                	    buttons:[{
				            				text:'保存',
				            				iconCls:'icon-save',
				            				handler:function(){
				            					if($("#collectMenuForm").form('validate')){
				            						var params = tool.getParams();
				            						params.userId = params.currUserId;
				            						params = $.extend(params,$("#collectMenuForm").getForm());
				            						var url = basePath+"addCollectMenu.shtml";
				            						$.post(url,params,function(data){
				            							if(data.success){
				            								$.messager.alert('操作提示','收藏成功！','info');
				            								$('#collectMenuWin').dialog("close");
				            								loadCollectMenus();
				            							}else{
				            								$.messager.alert('错误提示',data.message,'warning');
				            							}
				                					});
				            					}
				            				}
				            			},{
				            				text:'取消',
				            				iconCls:'icon-standard-cross',
				            				handler:function(){
				            					$('#collectMenuWin').dialog("close");
				            				}
				            			}]
				                	});
								}else{
									var params = tool.getParams();
									params.userId = params.currUserId;
									params.menuId = menu.attr("menuId") == "undefined" ? null : menu.attr("menuId");
									params.collectUrl = menu.attr("collectUrl") == "undefined" ? null : menu.attr("collectUrl");;
									$.post(basePath+"removeCollectMenu.shtml",params,function(data){
				                		if(data.success){
				                			$.messager.alert('操作提示','删除成功！','info');
				                			loadCollectMenus();
				                		}else{
				                			$.messager.alert('错误提示',data.message,'error');
				                		}
				                	});
								}
						    }
						});
					});
				}
    		}else{
				$.messager.alert('错误提示',data.message,'warning');
			}
    	});
	};
	/**
	 * 选择菜单
	 * @param ement
	 */
	this.clickMenu = function(ement){
		$(".z-menu li").removeClass("act")
		var title = $(ement).text();
		$(ement).addClass("act");
		if($(ement).attr("menuUrl") != "undefined"){
			$("#userInfo").attr("modNo",$(ement).attr("menuNo"));
			$("#userInfo").attr("modId",$(ement).attr("menuId"));
			var url = basePath+$(ement).attr("menuUrl")+"?random="+Math.random()+"&modNo="+$(ement).attr("menuNo")+"&menuId="+$(ement).attr("menuId");
			url = tool.getStrParams(url);
			if ($(mainTabs).tabs('exists', title)){
				$(mainTabs).tabs('select', title);
				var tab = $(mainTabs).tabs('getSelected');
			    $(mainTabs).tabs('update',{
			    	iconCls:$(ement).attr("menuIcon"),
			        tab: tab,
			        options: {
			           href:url 
			        }
			    });
			    tab.panel('refresh');
			} else {
				$(mainTabs).tabs('add',{
					iconCls:$(ement).attr("menuIcon"),
					title:title,
					href:url,
					closable:true
				});
			}	
		}else{
			var url = $(ement).attr("collectUrl");
			if ($(mainTabs).tabs('exists', title)){
				$(mainTabs).tabs('select', title);
				var tab = $(mainTabs).tabs('getSelected');
			    $(mainTabs).tabs('update',{
			    	iconCls:$(ement).attr("menuIcon"),
			        tab: tab,
			        options: {
			        	content:'<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:100%;z-index:800;"></iframe>',
			        }
			    });
			    tab.panel('refresh');
			} else {
				$(mainTabs).tabs('add',{
					iconCls:$(ement).attr("menuIcon"),
					title:title,
					content:'<iframe scrolling="no" frameborder="0"  src="'+url+'" style="width:100%;height:100%;z-index:800;"></iframe>',
					closable:true
				});
			}	
		}
	};
	/**
	 * 绑定页面事件
	 */
	this.bindAppAction = function() {
		/**回到主页*/
		$("#mainTabs_jumpHome").click(function () { 
			var t = $(mainTabs)
			var tabs = t.tabs("tabs")
			var panel = $.arrayUtil.first(tabs, function (val) {
	            var opts = val.panel("options");
	            return opts.title == homePageTitle && opts.href == homePageHref;
	        });
	        if (panel && panel.length) {
	            var index = t.tabs("getTabIndex", panel);
	            t.tabs("select", index);
	        }
		});
		/**展开/折叠面板使选项卡最大化*/
        $("#mainTabs_toggleAll").click(function () { 
        	var num = 0;
        	var regions = ["north", "west", "south"];
        	for(var i = 0; i < regions.length; i++){
	    		if($(mainLayout).layout("panel", regions[i]).panel("options").collapsed){
	    			num++;
	    		}
        	}
    		for(var i = 0; i < regions.length; i++){
    			$(mainLayout).layout(num == regions.length ? "expand" : "collapse",regions[i]);
    		}
        });
        /**关闭当前选中的选项卡*/
        $("#mainTabs_closeTab").click(function () { 
        	var title = $(mainTabs).tabs('getSelected').panel("options").title;
        	if(title != homePageTitle){
        		$(mainTabs).tabs("close", title);
        	}
        });
        /**关闭除当前选中外的其他所有选项卡*/
        $("#mainTabs_closeOther").click(function () {
        	$("#mainTabs_closeRight").click()
        	$("#mainTabs_closeLeft").click();
        	
        });
        /**关闭左侧所有选项卡*/
        $("#mainTabs_closeLeft").click(function () { 
        	var tabs = $.arrayUtil.copy([],$(mainTabs).tabs("tabs"));
        	var title = $(mainTabs).tabs('getSelected').panel("options").title;
        	var index = $(mainTabs).tabs('getTabIndex',$(mainTabs).tabs('getSelected'));
        	if((index-1) > 1){
        		for(var i = (index-1); i > 0; i--){
        			$(mainTabs).tabs("close", tabs[i].panel("options").title);
        		}
        	}
        	$(mainTabs).tabs("select", title);
        });
        /**系统皮肤更换**/
        $('#opts').tooltip({
    		showEvent: 'click',
			content: function(){
				return $('#resetTheme');
			},
			onShow: function(){
				var t = $(this);
				t.tooltip('tip').unbind().bind('mouseenter', function(){
					t.tooltip('show');
				}).bind('mouseleave', function(){
					t.tooltip('hide');
				});
			}
		});
        /**关闭右侧所有选项卡*/
        $("#mainTabs_closeRight").click(function () {
        	var tabs = $.arrayUtil.copy([],$(mainTabs).tabs("tabs"));
        	var title = $(mainTabs).tabs('getSelected').panel("options").title;
        	var index = $(mainTabs).tabs('getTabIndex',$(mainTabs).tabs('getSelected'));
        	if(tabs.length > (index+1)){
        		for(var i = (index+1); i < tabs.length; i++){
        			$(mainTabs).tabs("close", tabs[i].panel("options").title);
        		}
        	}
        	$(mainTabs).tabs("select", title);
        });
        /**关闭所有选项卡*/
        $("#mainTabs_closeAll").click(function () { 
        	var tabs = $.arrayUtil.copy([],$(mainTabs).tabs("tabs"));
        	for(var i = 1; i < tabs.length; i++){
    			$(mainTabs).tabs("close", tabs[i].panel("options").title);
    		}
        });
        /**个人信息**/
        $("#selfInfo").unbind("click").bind("click",function(){
        	var params = tool.getParams();
			params.userId = params.currUserId;
			var url = basePath+"sys/user/queryById.shtml";
        	$.post(url,params,function(data){
        		if(data){
        			$("#userInfoForm").fillForm(data);
        			$('#birthday').datebox('setValue', data.birthday);
        			//$("#userInfoForm").form('validate');
        			$('#selfInfoWin').dialog({
                	    title: '个人信息',
                	    iconCls:'icon-standard-user',
                	    closed: false,
                	    cache: false,
                	    modal: true,
                	    buttons:[{
            				text:'保存',
            				iconCls:'icon-save',
            				handler:function(){
            					if($("#userInfoForm").form('validate')){
            						params = $.extend(params,$("#userInfoForm").getForm());
            						var url = basePath+"sys/user/modify.shtml";
            						$.post(url,params,function(data){
            							if(data.success){
            								$.messager.alert('操作提示','修改成功！','info');
            								$('#selfInfoWin').dialog("close");
            							}else{
            								$.messager.alert('错误提示',data.message,'warning');
            							}
                					});
            					}
            				}
            			},{
            				text:'取消',
            				iconCls:'icon-standard-cross',
            				handler:function(){
            					$('#selfInfoWin').dialog("close");
            				}
            			}]
                	});
        		}
        	});
        });
        /**修改密码**/
        $("#userPassWord").unbind("click").bind("click",function(){
        	$("#userPassWordForm").emptyForm();
        	$('#userPassWordWin').dialog({
        	    title: '修改密码',
        	    iconCls:'icon-standard-application-key',
        	    width: 400,
        	    closed: false,
        	    cache: false,
        	    modal: true,
        	    buttons:[{
    				text:'保存',
    				iconCls:'icon-save',
    				handler:function(){
    					if($("#userPassWordForm").form('validate')){
    						var params = tool.getParams($("#userPassWordForm").getForm());
    						params.userId = params.currUserId;
    						params.passWord = params.confirmPassWord;
    						var url = basePath+"sys/user/modify.shtml";
    						$.post(url,params,function(data){
    							if(data.success){
    								$.messager.alert('操作提示','密码修改成功,去重新登陆！','info');
    								window.location.href = basePath;
    							}else{
    								$.messager.alert('错误提示',data.message,'warning');
    							}
        					});
    					}
    				}
    			},{
    				text:'取消',
    				iconCls:'icon-standard-cross',
    				handler:function(){
    					$('#userPassWordWin').dialog("close");
    				}
    			}]
        	});
        });
        /**显示密码*/
        $("#showPassWord").unbind("click").bind("click",function(){
        	var oldPw = $("#oldPassWord").val();
			var newPw = $("#newPassWord").val();
			var confirmPw = $("#confirmPassWord").val();
    		if($(this).is(':checked')) {
    			var reg = new RegExp("type=\"password\"","g");//g,表示全部替换。
    			$("#oldPw").html($("#oldPw").html().replace(reg,"type=\"text\""));
    			$("#newPw").html($("#newPw").html().replace(reg,"type=\"text\""));
    			$("#confirmPw").html($("#confirmPw").html().replace(reg,"type=\"text\""));
    		}else {
    			var reg = new RegExp("type=\"text\"","g");//g,表示全部替换。
    			$("#oldPw").html($("#oldPw").html().replace(reg,"type=\"password\""));
    			$("#newPw").html($("#newPw").html().replace(reg,"type=\"password\""));
    			$("#confirmPw").html($("#confirmPw").html().replace(reg,"type=\"password\""));
    		}
    		$("#oldPassWord").val(oldPw);
			$("#newPassWord").val(newPw);
			$("#confirmPassWord").val(confirmPw);
        });
		/**用户退出*/
		$("#userQuit").unbind("click").bind("click",function() {
			$.messager.confirm("操作提醒", "您确定要退出系统重新登录？", function (c) {
                if(c){
                	$.post(basePath+"logout.shtml",{},function(data){
                		if(data){
                			setTimeout(function(){ window.location.href=basePath; }, 2000);
                		}
                	});
                }
            });
		});
		/**修改用户信息*/
		$("#photo_info").tooltip({
			showEvent: 'click',
			content: function(){
				$('#mm').menu();
				return $('#userTip');
			},
			onShow: function(){
				var t = $(this);
				t.tooltip('tip').unbind().bind('mouseenter', function(){
					t.tooltip('show');
				}).bind('mouseleave', function(){
					t.tooltip('hide');
				});
			}
		});
		/**查看系统消息*/
		$("#sysMsg").tooltip({
			showEvent: 'click',
			content: function(){
				return $('#sysMsgWin');
			},
			onUpdate: function(content){
				content.panel({
					width: 200,
					border: false,
					content: '无消息！'
				});
			},
			onShow: function(){
				var t = $(this);
				t.tooltip('tip').unbind().bind('mouseenter', function(){
					t.tooltip('show');
				}).bind('mouseleave', function(){
					t.tooltip('hide');
				});
			}
		});
		/**菜单右键**/
		$(".z-menu li","#nva").unbind("contextmenu").bind("contextmenu",function(e){
			e.preventDefault();
			var menu = $(this);
			$('#menu-mm').menu('show', {
				left: e.pageX,
				top: e.pageY,
				onClick:function(item){
					if(item.id == "openMenu"){
						menu.click();
					}else{
						var params = tool.getParams();
						params.userId = params.currUserId;
						params.menuId = menu.attr("menuId");
						$.post(basePath+"addCollectMenu.shtml",params,function(data){
	                		if(data.success){
	                			$.messager.alert('操作提示','收藏成功！','info');
	                			loadCollectMenus();
	                		}else{
	                			$.messager.alert('错误提示',data.message,'error');
	                		}
	                	});
					}
			    }
			});
		});
		/**更改程序背景*/
		$(".themeColor").unbind("click").bind("click", function() {
			$(".themeColor i").removeClass("theme_yes icon-theme-yes");
			$(this).find('i').addClass("theme_yes icon-theme-yes");
			$("#easyUiTheme").attr("href",basePath+"resource/easyui/themes/"+$(this).attr("theme")+"/easyui.css");
			$("#easyUiStyle").attr("href",basePath+"resource/easyui/themes/"+$(this).attr("theme")+"/style.css");
		    $.cookie("lserpThemeName", $(this).attr("theme"), { expires: 30 });
		});
		/**为选项卡绑定右键*/
		$("#mainTabs .tabs").bind('contextmenu',function(e){
			$('#tabsMenu').menu('show', {
				left: e.pageX,
				top: e.pageY,
				onClick:function(item){
					$("#"+item.id).click();
				}
			});
			var subtitle =$(this).children(".tabs-closable").text();
			$('#tabsMenu').data("currtab",subtitle);
			$(mainTabs).tabs('select',subtitle);
			return false;
		});
	
		$("#loginbtn").on('click', function () {
			var txtName = $("#txtName").val();
			var txtPwd = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$(".warning").css({ display: 'block' });
				}
				else {
					$("#warn").css({ display: 'block' });
					$("#warn2").css({ display: 'none' });
				}
			}
			else {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$("#warn").css({ display: 'none' });
					$(".warn2").css({ display: 'block' });
				}
				else {
					$(".warning").css({ display: 'none' });
					var params = {};
					params["userName"] = txtName;
					params["passWord"] = txtPwd;
					params["random"] = Math.random();
					$.post(basePath+"loginCheck.shtml",params,function(data){
						if(data.success){
							$("#LoginBox").css("display","block");
		        			$("#LoginBox").dialog('close');
						}else{
							if(data.msgIndex == 0){
								$("#loginbtn").val("登录异常！");
							}else{
								if(data.msgIndex == 1){
									$("#loginbtn").val("账号已被禁用！");
								}else{
									$("#loginbtn").val("登录");
								}
							}
						}
					},"json");
				}
			}
		});
		//文本框不允许为空---单个文本触发
		$("#txtName").on('blur', function () {
			var txtName = $("#txtName").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'none' });
			}
		});
		$("#txtName").on('focus', function () {
			$("#warn").css({ display: 'none' });
		});
		//
		$("#txtPwd").on('blur', function () {
			var txtName = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn2").css({ display: 'block' });
			}
			else {
				$("#warn2").css({ display: 'none' });
			}
		});
		$("#txtPwd").on('focus', function () {
			$("#warn2").css({ display: 'none' });
		});
		
		$("#sex").unbind("change").bind("change",function(){
			$("#userinfo_head").html(imgDom[$(this).val()]);
		});
	};

	jQuery.index = this;
	
	return jQuery;

})(jQuery);