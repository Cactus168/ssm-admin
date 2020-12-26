<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>${sysName }</title>
    <base href="<%=basePath%>/">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="Shortcut Icon" href="styles/images/erpico.ico">
	<link id="easyUiTheme" rel="stylesheet" type="text/css" href="resource/easyui/themes/default/easyui.css">
	<link id="easyUiStyle" rel="stylesheet" type="text/css" href="resource/easyui/themes/default/style.css">
	<link rel="stylesheet" type="text/css" href="resource/easyui/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="resource/easyui/themes/textbox.css" />
	<link rel="stylesheet" type="text/css" href="resource/easyui/icons/icon-all.css" />
	<link rel="stylesheet" type="text/css" href="resource/mask/style/mask.css"></link>
	<link rel="stylesheet" type="text/css" href="resource/step/css/element.min.css" />
	<link rel="stylesheet" type="text/css" href="resource/fileUpload/css/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="resource/fileUpload/css/fileUpload.css" />
	<link rel="stylesheet" type="text/css" href="styles/style.css" />
	<link rel="stylesheet" type="text/css" href="styles/loginDialog.css" />
	<script type="text/javascript">var basePath="<%=basePath%>/";</script>
	<script type="text/javascript" src="resource/jquery.min.js"></script>
	<script type="text/javascript" src="resource/json2.js"></script>
	<script type="text/javascript" src="resource/jquery.cookie.js"></script>
	<script type="text/javascript" src="resource/jquery.formjson.js"></script>
	<script type="text/javascript" src="resource/mask/jquery.mask.js"></script>
	<script type="text/javascript" src="resource/step/js/vue.min.js"></script>
	<script type="text/javascript" src="resource/step/js/element.min.js"></script>
	<script type="text/javascript" src="resource/fileUpload/js/fileUpload.js"></script>
	<script type="text/javascript" src="resource/jquery.timers-1.2.js"></script>
	<script type="text/javascript" src="resource/easyui/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="resource/easyui/extend/jquery.easyui.commons.extend.js"></script>
	<script type="text/javascript" src="resource/easyui/extend/jquery.easyui.datagrid.extend.js"></script>
	<script type="text/javascript" src="resource/easyui/extend/jquery.easyui.treegrid.extend.js"></script>
	<script type="text/javascript" src="resource/easyui/extend/jquery.datagrid.detailview.js"></script>
	<script type="text/javascript" src="resource/easyui/icons/jeasyui.icons.all.js"></script>
	<script type="text/javascript" src="resource/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="resource/easyui/locale/easyui-lang-zh_CN.js"></script>
	<script type="text/javascript" src="scripts/utils/coreUtil.js"></script>
	<script type="text/javascript" src="scripts/utils/arrayUtil.js"></script>
	<script type="text/javascript" src="scripts/utils/dateUtil.js"></script>
	<script type="text/javascript" src="scripts/utils/numberUtil.js"></script>
	<script type="text/javascript" src="scripts/utils/stringUtil.js"></script>
	<script type="text/javascript" src="scripts/commons/CommonTools.js?v=<%=Math.random() %>"></script>
	<script type="text/javascript" src="scripts/commons/BaseTreeGridAction.js?v=<%=Math.random() %>"></script>
	<script type="text/javascript" src="scripts/commons/BaseDataGridAction.js?v=<%=Math.random() %>"></script>
	<script type="text/javascript">
		$("document").ready(function(){
			var flag = 1;
			$.coreUtil.runJs(basePath+"scripts/index.js",function(){$.index.init();});
		});
	</script>
	</head>
<body>
<div id="mainLayout" class="easyui-layout" data-options="fit: true">
  <!-- 上 -->
  <div id="northPanel" data-options="region: 'north', border: false" style="height: 50px; overflow: hidden;">
    <div id="topbar" class="panel-header panel-header-noborder top-toolbar" style="height: 50px; overflow: hidden;">
       <div class="fl logo">
          <img src="styles/images/erpico.ico" alt="${sysName }">${sysName }
       </div>
       <div class="fr" style="padding: 0px;margin: 0px;line-height: 50px;height: 50px;">
       		<div id="photo_info" class="photo_info fr">
         		<div id="photo" class="photo fl">
           			<img src="<%=request.getContextPath()%>/styles/images/index/${currUser.sex == 0 ? 'girl.jpg' : 'boy.jpg' }" alt="用户头像">
         		</div>
      		</div>
	      	<div id="opts" class="nav fr icon-index-skin" title="更换皮肤"></div>
	       	<div id="sysMsg" class="nav fr icon-index-bell nav-link" title="系统消息">
	       		<span id="msgNum" class="nav-counter nav-counter-green">2</span>
	        </div>
		</div>
     </div>
   </div>
   <!-- 中左 -->
   <div data-options="region: 'west', title: '菜单导航栏', iconCls: 'icon-standard-map', split: true, minWidth: 200, maxWidth: 300" style="width: 200px; padding: 1px;">
      <div id="navTabs" class="easyui-tabs" data-options="fit: true, border: true">
          <div data-options="title: '菜单导航', iconCls: 'icon-standard-application-view-tile', refreshable: false">
              <div id="nva" class="easyui-accordion" fit="true" border="false">
	              <c:forEach items="${menus }" var="menu">
	              	<c:if test="${menu.parentId == 0 }">
	              		<div title="${menu.menuName}" data-options="iconCls:'${menu.menuIcon }'">
	              			<ul class="z-menu">
		              			<c:forEach items="${menus }" var="menux">
		              				<c:if test="${menux.parentId == menu.menuId }">
		              					<li class="${menux.menuIcon }" menuId = "${menux.menuId }" menuNo="${menux.menuNo }" menuIcon="${menux.menuIcon }" menuUrl="${menux.menuUrl }" onClick="clickMenu(this)">${menux.menuName}</li>
		              				</c:if>
		              			</c:forEach>
	              			</ul>
	              		</div>
	              	</c:if>
	              </c:forEach>
			 </div>
          </div>
          <div id="collectDiv" data-options="title: '个人收藏', iconCls: 'icon-hamburg-star', refreshable: false">
          	<div id="collectNva" class="easyui-accordion" fit="true" border="false">
          		<div title="快捷菜单" data-options="iconCls:'icon-hamburg-star'">
              		<ul id="collectMenu" class="z-menu"></ul>
              	</div>
            </div>
          </div>
      </div>
  </div>
  <!-- 中中 -->
   <div data-options="region: 'center'" style="padding: 1px;">
       <div id="mainTabs_tools" class="tabs-tool">
           <table>
               <tr>
                   <td><a id="mainTabs_jumpHome" class="easyui-linkbutton easyui-tooltip" title="跳转至主页选项卡" data-options="plain: true, iconCls: 'icon-hamburg-home'"></a></td>
                   <td><div class="datagrid-btn-separator"></div></td>
                   <td><a id="mainTabs_toggleAll" class="easyui-linkbutton easyui-tooltip" title="展开/折叠面板使选项卡最大化" data-options="plain: true, iconCls: 'icon-standard-arrow-inout'"></a></td>
                   <td><div class="datagrid-btn-separator"></div></td>
                   <td><a id="mainTabs_closeTab" class="easyui-linkbutton easyui-tooltip" title="关闭当前选中的选项卡" data-options="plain: true, iconCls: 'icon-standard-application-form-delete'"></a></td>
                   <td><a id="mainTabs_closeOther" class="easyui-linkbutton easyui-tooltip" title="关闭除当前选中外的其他所有选项卡" data-options="plain: true, iconCls: 'icon-standard-cancel'"></a></td>
                   <td><div class="datagrid-btn-separator"></div></td>
                   <td><a id="mainTabs_closeLeft" class="easyui-linkbutton easyui-tooltip" title="关闭左侧所有选项卡" data-options="plain: true, iconCls: 'icon-standard-tab-close-left'"></a></td>
                   <td><a id="mainTabs_closeRight" class="easyui-linkbutton easyui-tooltip" title="关闭右侧所有选项卡" data-options="plain: true, iconCls: 'icon-standard-tab-close-right'"></a></td>
                   <td><div class="datagrid-btn-separator"></div></td>
                   <td><a id="mainTabs_closeAll" class="easyui-linkbutton easyui-tooltip" title="关闭所有选项卡" data-options="plain: true, iconCls: 'icon-standard-cross'"></a></td>
               </tr>
           </table>
       </div>
       <div id="mainTabs" class="easyui-tabs" data-options="fit: true, border: true, showOption: true, enableNewTabMenu: true, tools: '#mainTabs_tools', enableJumpTabMenu: true">
           <div id="homePanel" data-options="title: '主页', iconCls: 'icon-hamburg-home'">
	           
           </div>
       </div>
   </div>
   <!-- 底 -->
   <div id="southPanel" data-options="region: 'south', border: true," style="height: 30px; overflow: hidden;">
       <table id="southTool" width="100%" border="0" cellpadding="0" cellspacing="0">
       		<tr>
       			<td align="left">
       				<div id="userInfo" class="icon-index-user" no="${currUser.userId }" token="${token }" userName="${currUser.userName }" modNo="" modId="">您好！${currUser.realName }</div>
       			</td>
       			<td align="right">
       				<div id="timerSpan" class="icon-index-time">2016年01月06日 星期三 春季, 上午 10:22:33</div>
       			</td>
       		</tr>
       </table>
       <div id="southTabs" class="easyui-tabs" data-options="fit: true, border: true,tools: '#southTool'"></div>
   </div>
</div>
<div id="resetTheme">
	<div class="theme-boxs">
		<div id="themeItmes" class="theme-itme"></div>
	</div>
</div>
<div id="userTip" style="width: 120px;">
	<div id="mm" data-options="inline:true" style="width:100%;">
		<div id="selfInfo" data-options="iconCls:'icon-standard-user'">个人信息</div>
		<div class="menu-sep"></div>
		<div id="userPassWord" data-options="iconCls:'icon-standard-application-key'">修改密码</div>
		<div class="menu-sep"></div>
		<div id="userQuit" data-options="iconCls:'icon-standard-cancel'">退出系统</div>
	</div>
</div>
<div id="tabsMenu" class="easyui-menu" style="display: none;">
    <div id="mainTabs_closeTab" data-options="iconCls:'icon-standard-application-form-delete'" name="cur">关闭当前</div>
    <div id="mainTabs_closeAll" data-options="iconCls:'icon-standard-cross'" name="all">关闭全部</div>
    <div id="mainTabs_closeOther" data-options="iconCls:'icon-standard-cancel'" name="oth">关闭其他</div>
    <div id="mainTabs_closeLeft" data-options="iconCls:'icon-standard-tab-close-left'" name="oth">关闭左边</div> 
    <div id="mainTabs_closeRight" data-options="iconCls:'icon-standard-tab-close-right'" name="oth">关闭右边</div>               
</div>
<div id="LoginBox" style="width:426px;height:282px;">
	<input type="hidden" id="url">
	<div class="row">
		用户名: 
		<span class="inputBox">
			<input type="text" id="txtName" placeholder="账号/邮箱" />
		</span>
		<a href="javascript:void(0)" title="提示" class="warning" id="warn">*</a>
	</div>
	<div class="row">
		密&nbsp;&nbsp;&nbsp;&nbsp;码: 
		<span class="inputBox">
			<input type="password" id="txtPwd" placeholder="密码" />
		</span>
		<a href="javascript:void(0)" title="提示" class="warning" id="warn2">*</a>
	</div>
	<div class="row">
		<a href="javascript:void(0);" id="loginbtn" >登录</a>
	</div>
</div>
<div id="selfInfoWin" class="easyui-toolbar">
<form id="userInfoForm" name="userInfoForm" method="post">
	<table cellpadding="0" cellspacing="5" border="0">
		<tr>
			<td>姓&nbsp;&nbsp;名：</td>
			<td><input class="easyui-validatebox textbox" name="realName" type="text" data-options="required:true" style="width:100%;height:35px;"/></td>
			<td rowspan="3" id="userinfo_head"><img src="<%=request.getContextPath()%>/styles/images/index/${currUser.sex == 0 ? 'girl.jpg' : 'boy.jpg' }" alt="用户头像" width="103px" height="103px"></td>
		</tr>
		<tr>
			<td>性&nbsp;&nbsp;别：</td>
			<td><select id="sex" name="sex" class="easyui-validatebox textbox" style="width:100%;height:35px;"><option value="1">男</option><option value="0">女</option></select></td>
		</tr>
		<tr>
			<td>生&nbsp;&nbsp;日：</td>
			<td><input class="easyui-datebox" id="birthday" name="birthday" type="text" style="width:100%;height:35px;"/></td>
		</tr>
		<tr>
			<td>QQ帐号：</td>
			<td colspan="2"><input class="easyui-validatebox textbox" name="qq" data-options="validType:'QQ'" type="text" style="width:100%;height:35px;"/></td>
		</tr>
		<tr>
			<td>手&nbsp;&nbsp;机：</td>
			<td colspan="2"><input class="easyui-validatebox textbox" name="phoneNum" type="text" data-options="required:true,validType:'phone'" style="width: 100%;height:35px;"/></td>
		</tr>
		<tr>
			<td>邮&nbsp;&nbsp;箱：</td>
			<td colspan="2"><input class="easyui-validatebox textbox" name="email" data-options="validType:'email'" type="text" style="width:100%;height:35px;"/></td>
		</tr>
		<tr>
			<td>地&nbsp;&nbsp;址：</td>
			<td colspan="2"><input class="easyui-validatebox textbox" name="address" type="text" style="width:100%;height:35px;"/></td>
		</tr>
		<tr>
			<td>个人简介：</td>
			<td colspan="2"><input class="easyui-textbox" name="remarks" data-options="multiline:true" style="width:100%;height:100px"></td>
		</tr>
	</table>
</form>
</div>
<div id="userPassWordWin" class="easyui-toolbar">
	<form id="userPassWordForm" method="post">   
	   	<table cellpadding="5" style="width:380px" border="0">
	   		<tr>
	   			<td style="width:100px;"><lable>原始密码：</lable></td>
	   			<td id="oldPw"><input class="easyui-validatebox textbox" data-options="required:true,validType:['pw','length[1,16]','checkPw[\'codePassWord.shtml\',\'password\']']" type="password" id="oldPassWord" name="oldPassWord" style="width: 100%;height:35px;"/></td>
	   		</tr>
	   		<tr>
	   			<td style="width:100px;"><label>新&nbsp;密&nbsp;码：</label></td>
	   			<td id="newPw"><input class="easyui-validatebox textbox" data-options="required:true,validType:['pw','length[1,16]']" type="password" id="newPassWord" name="newPassWord" style="width: 100%;height:35px;"/></td>
	   		</tr>
	   		<tr>
	   			<td style="width:100px;"><label>确认密码：</label></td>
	   			<td id="confirmPw"><input class="easyui-validatebox textbox" data-options="required:true,validType:['pw','length[1,16]','equals[\'#newPassWord\']']" type="password" id="confirmPassWord" name="confirmPassWord" style="width: 100%;height:35px;"/></td>
	   		</tr>
	   		<tr align="center">
	   			<td colspan="2"><input id="showPassWord" name="showPassWord" type="checkbox">显示密码</td>
	   		</tr>
	   	</table>
   	</form>
</div>
<div id="collectMenuWin" class="easyui-toolbar">
	<form id="collectMenuForm" method="post">   
	   	<table cellpadding="0" cellspacing="5" border="0">
	   		<tr>
	   			<td style="width:50px;"><lable>名称：</lable></td>
	   			<td style="width:100px;"><input class="easyui-validatebox textbox" data-options="required:true" type="text" name="collectName" style="width:100%;height:35px;"/></td>
	   		</tr>
	   		<tr>
	   			<td style="width:50px;"><label>网址：</label></td>
	   			<td style="width:300px;"><input class="easyui-validatebox textbox" data-options="required:true,validType:'url'" type="text" name="collectUrl" style="width:100%;height:35px;"/></td>
	   		</tr>
	   	</table>
   	</form>
</div>
<div id="sysMsgWin">

</div>
<div id="menu-mm" class="easyui-menu" style="width:120px;">
	<div id="openMenu" data-options="name:'open',iconCls:'icon-standard-book-open'">打开</div>
	<div id="collectMenu" data-options="name:'collection',iconCls:'icon-standard-book-add'">添加到收藏</div>
</div>
<div id="collectMenu-mm" class="easyui-menu" style="width:120px;">
	<div id="addCollect" data-options="name:'addCollect',iconCls:'icon-standard-book-open'">添加收藏</div>
	<div id="removeCollect" data-options="name:'removeCollect',iconCls:'icon-standard-book-add'">删除收藏</div>
</div>
<div id="fileUploadContent" class="fileUploadContent" style="padding: 15px 15px 15px 15px;"></div>
<div id="popWin" style="display:none;"></div>
</body>
</html>