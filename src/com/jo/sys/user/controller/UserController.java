package com.jo.sys.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.commons.CommonCodeUtils;
import com.jo.sys.user.bean.User;
import com.jo.sys.user.service.UserService;
@Controller
@RequestMapping({"sys/user"})
public class UserController extends BaseController<User> {

	@Autowired
	private UserService userService;
	
	@Override
	protected void beforeModify(User user, Map<String, Object> rsMap)throws Exception {
		if(!StringUtils.isBlank(user.getPassWord())){
			user.setPassWord(CommonCodeUtils.code(user.getPassWord()));
		}
	}
	/**
	 * 分配组织机构管理权限
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	@ResponseBody
	@RequestMapping({"/changeUserOrganRights.shtml"})
	public Map<String, Object> changeUserOrganRights(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			if(this.userService.removeOrgansByUserId(params) >= 0){
				int isSuccess = this.userService.changeUserOrganRights(params);
				if(isSuccess > 0){
					rsMap.put("success", Boolean.valueOf(true));
				}else{
					rsMap.put("success", Boolean.valueOf(false));
					rsMap.put("message", "授权失败！");
				}
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "授权失败！");
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
	@RequestMapping({"/getOrgansByUserId.shtml"})
	public Map<String, Object> getOrgansByUserId(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			rsMap.put("tree", this.userService.getOrgansByUserId(params));
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	/**
	 * 
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	@ResponseBody
	@RequestMapping({"/changeUserRoleRights.shtml"})
	public Map<String, Object> changeUserRoleRights(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			if(this.userService.removeRolesByUserId(params) >= 0){
				int isSuccess = this.userService.changeUserRoleRights(params);
				if(isSuccess > 0){
					rsMap.put("success", Boolean.valueOf(true));
				}else{
					rsMap.put("success", Boolean.valueOf(false));
					rsMap.put("message", "授权失败！");
				}
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "授权失败！");
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
	@RequestMapping({"/getRolesByUserId.shtml"})
	public Map<String, Object> getRolesByUserId(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			rsMap.put("tree", this.userService.getRolesByUserId(params));
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	@Override
	protected BaseService<User> service() {
		return this.userService;
	}

}
