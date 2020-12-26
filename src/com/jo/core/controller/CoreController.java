package com.jo.core.controller;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.commons.CommonCodeUtils;
import com.jo.commons.CommonDataUtils;
import com.jo.commons.CommonFileUtils;
import com.jo.core.bean.CoreBean;
import com.jo.core.service.CoreService;
import com.jo.shiro.helper.ShiroAuthorizationHelper;
import com.jo.shiro.helper.ShiroSecurityHelper;
import com.jo.sys.log.bean.Log;
import com.jo.sys.log.service.LogService;
import com.jo.sys.message.service.MessageService;
import com.jo.sys.user.bean.User;

@Controller
public class CoreController extends BaseController<CoreBean> {
	@Autowired
	public CoreService coreService;
	@Autowired
	public LogService logService;
	@Autowired
	public MessageService messageService;
	
	@RequestMapping({"/toLogin.shtml"})
	public ModelAndView toLogin(HttpServletRequest request){
		ModelAndView view = new ModelAndView();
		view.setViewName("login");
		view.addObject("sysName", "ssm-Admin");
		return view;
	}
	
	@ResponseBody 
	@RequestMapping({"/loginCheck.shtml"})
	public Map<String, Object> loginCheck(HttpServletRequest request){
		Map<String, Object> rsMap = null;
		CoreBean coreBean = new CoreBean();
		try {
			rsMap = new HashMap<String, Object>();
			coreBean.setUserName(request.getParameter("userName"));
			coreBean.setPassWord(request.getParameter("passWord"));
			coreBean.setPassWord(CommonCodeUtils.code(coreBean.getPassWord()));
			//shiro加入身份验证
			Subject subject = SecurityUtils.getSubject();  
			if(subject.isRemembered()){  
			    String username = ShiroSecurityHelper.getCurrentUsername();  
			    ShiroAuthorizationHelper.clearAuthorizationInfo(username); // 用户是自动登录，首先清一下用户权限缓存，让重新加载  
			}  
			User user = this.coreService.loginCheck(coreBean);;
			if(user == null){
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("msgIndex", 2);
			}else{
				if(user.getStatus() == 1){
					String token = CommonDataUtils.createToken(user.getUserId());
					request.getSession().setAttribute("token", token);
					request.getSession().setAttribute("currUser", user);
					/*CommonUserBean commonUserBean = new CommonUserBean(user,token,1,request);
					Map<String, Object> checkUser = CommonCheckUser.loginUserCheck(user.getUserId(), commonUserBean);
					if(Boolean.parseBoolean(checkUser.get("success").toString())){
						Message message = new Message();
						message.setSendUser(1);
						if("0".equals(checkUser.get("msgType").toString())){
							message.setSendContent("您上次登录IP(" + checkUser.get("Ip1") + ")和本次登录IP(" + checkUser.get("Ip2") + ")不一样！如不是您本人登录，请修改密码!");
						}else{
							message.setSendContent("您上次登录IP(" + checkUser.get("Ip1") + ")和登录时间(" + checkUser.get("Ip2") + ")不一样！并没有按正常步骤退出系统！");
						}
						message.setReceiveUser(user.getUserId());
						//发送消息
						messageService.add(message);
					} */
					if (subject.isAuthenticated()) {  
						rsMap.put("success", Boolean.valueOf(false));
						rsMap.put("msgIndex", 1);
			        }  
			        //如果用户已登录，先踢出  
			        ShiroSecurityHelper.kickOutUser(user.getUserName());  
			        boolean rememberMe = ServletRequestUtils.getBooleanParameter(request, "rememberMe", false);  
			        UsernamePasswordToken shiroToken = new UsernamePasswordToken(user.getUserName(), user.getPassWord(), rememberMe);  
			        subject.login(shiroToken); // 登录  
			        if(this.logService.add(new Log(user,null,"登录系统",request)) > 0){
				    	rsMap.put("success", Boolean.valueOf(true));
				    }
				}else{
					rsMap.put("success", Boolean.valueOf(false));
					rsMap.put("msgIndex", 1);
				}
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("msgIndex", 0);
			e.printStackTrace();
		}finally{  
	        ShiroAuthorizationHelper.clearAuthorizationInfo(coreBean.getUserName());  
	    }  
		return rsMap;
	}
	@RequestMapping({"/main/{changeMenu}.shtml"})
	public ModelAndView loginIndex(@PathVariable("changeMenu") String changeMenu, HttpServletRequest request){
		ModelAndView view = new ModelAndView();
		try {
			Map<String, Object> params = this.getParams(request);
			String token = request.getSession().getAttribute("token").toString();
			User user = (User) request.getSession().getAttribute("currUser");
			params.put("userId", user.getUserId());
		    view.setViewName(changeMenu);
		    view.addObject("menus", this.coreService.getMenusByUserId(params));
		    view.addObject("token", token);
		    view.addObject("currUser", user);
		    view.addObject("sysName", "ssm-Admin");
		} catch (Exception e) {
			view.setViewName("login");
			e.printStackTrace();
		}
		return view;
	}
	@ResponseBody
	@RequestMapping({"/logout.shtml"})
	public Map<String, Object> logout(HttpServletRequest request){
		Map<String, Object> rsMap = null;
		try {
			rsMap = new HashMap<String, Object>();
			User user = (User) request.getSession().getAttribute("currUser");
			Log log = new Log(user,null,"退出系统",request);
			this.logService.add(log);
			//shiro销毁登录
			Subject subject = SecurityUtils.getSubject(); 
			if (subject.isAuthenticated()) {
				subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
				rsMap.put("success", Boolean.valueOf(true));
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	@ResponseBody
	@RequestMapping({"/checkingUser.shtml"})
	public Map<String, Object> checkingUser(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			User user = (User) request.getSession().getAttribute("currUser");
			if(user == null){
				rsMap.put("success", Boolean.valueOf(true));
				rsMap.put("url", WebUtils.getSavedRequest(request).getRequestUrl());
			}else{
				rsMap.put("success", Boolean.valueOf(false));
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(true));
			rsMap.put("url", WebUtils.getSavedRequest(request).getRequestUrl());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	@ResponseBody
	@RequestMapping({"/codePassWord.shtml"})
	public String codePassWord(HttpServletRequest request){
		 String rsVal = "false";
		try {
			Map<String, Object> params = this.getParams(request);
			User user = (User) request.getSession().getAttribute("currUser");
			String pw = CommonCodeUtils.code(params.get("password").toString());
			if(StringUtils.equals(user.getPassWord(), pw)){
				rsVal = "true";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rsVal;
	}
	
	@ResponseBody
	@RequestMapping({"/addCollectMenu.shtml"})
	public Map<String, Object> addCollectMenu(HttpServletRequest request){
		Map<String, Object> rsMap = null;
		try {
			rsMap = new HashMap<String, Object>();
			Map<String, Object> params = this.getParams(request);
			this.coreService.removeCollectMenu(params);
			if(this.coreService.addCollectMenu(params) > 0){
				rsMap.put("success", Boolean.valueOf(true));
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	@ResponseBody
	@RequestMapping({"/removeCollectMenu.shtml"})
	public Map<String, Object> removeCollectMenu(HttpServletRequest request){
		Map<String, Object> rsMap = null;
		try {
			rsMap = new HashMap<String, Object>();
			Map<String, Object> params = this.getParams(request);
			if(this.coreService.removeCollectMenu(params) > 0){
				rsMap.put("success", Boolean.valueOf(true));
			}
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	/**
	 * 获取数据列表
	 * @param t
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping({"/getCollectMenus.shtml"})
	public Map<String, Object> getCollectMenus(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			rsMap.put("menus", this.coreService.getCollectMenus(params));
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	@ResponseBody
	@RequestMapping({"/readXls.shtml"})
	public String readXls(HttpServletRequest request, HttpServletResponse response){
		String rs = "";
		FileInputStream fis = null;
		ByteArrayOutputStream bos = null;
		try {
			String url = request.getSession().getServletContext().getRealPath("/")+"temp/test.xls";
			fis = new FileInputStream(url);
	        bos = new ByteArrayOutputStream();
	        byte[] buffer=new byte[1024];
	        int length=-1;
	        while((length = fis.read(buffer)) != -1)
	        {
	            bos.write(buffer,0,length);
	        }
	        bos.close();
	        fis.close(); 
	        rs = bos.toString();
	        //rs = new String(bos.toByteArray(),"UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			 try {
				bos.close();
				fis.close();
			} catch (IOException e) {
				e.printStackTrace();
			} 
		}
		return rs;
	}
	
	@Override
	protected BaseService<CoreBean> service() {
		return coreService;
	}
}
