(function(){
	
	/**
	 * 绑定页面事件
	 */
	this.bindEvent = function(){
		/* 系统登录事件 */
		$("#login").click(function(){
			var userName = $('#name').val();
			var passWord = $('#psd').val();
			if($.trim(userName) == "" || $.trim(passWord) == ""){
				$("#loginMsg").text("操作提示：帐号或密码不能为空！");
				return false;
			}else {
				var params = {};
				params["userName"] = userName;
				params["passWord"] = passWord;
				params["random"] = Math.random();
				$.post(basePath+"loginCheck.shtml",params,function(data){
					if(data.success){
						window.location.href="main/index.shtml";
					}else{
						if(data.msgIndex == 0){
							$("#loginMsg").text("操作提示：登录异常！");
							return false;
						}else{
							if(data.msgIndex == 1){
								$("#loginMsg").text("操作提示：账号已被禁用！");
								return false;
							}else{
								$("#loginMsg").text("操作提示：帐号或密码错误！");
								return false;
							}
						}
					}
				},"json");
			}
		});
		
	};
	/*初始化应用*/
	this.init = function(){
		bindEvent();
		$("#name").focus();
	};
	
	jQuery.login = this;
	
	return jQuery;
	
})(jQuery);