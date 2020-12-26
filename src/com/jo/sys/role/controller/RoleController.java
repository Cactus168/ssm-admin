package com.jo.sys.role.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.role.bean.Role;
import com.jo.sys.role.bean.RoleMenu;
import com.jo.sys.role.service.RoleService;
import com.jo.sys.user.bean.User;
@Controller
@RequestMapping({"sys/role"})
public class RoleController extends BaseController<Role> {

	@Autowired
	private RoleService roleService;
	/**
	 * 给角色授权菜单权限
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	@ResponseBody
	@RequestMapping({"/changeRoleMenuRights.shtml"})
	public Map<String, Object> changeRoleMenuRights(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			if(this.roleService.removeMenusByRoleId(params) >= 0){
				int isSuccess = this.roleService.changeRoleMenuRights(params);
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
	@RequestMapping({"/getMenusByRoleId.shtml"})
	public Map<String, Object> getMenusByRoleId(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			User user = (User) request.getSession().getAttribute("currUser");
			params.put("menuType", user.getUserType());
			List<RoleMenu> list = this.roleService.getMenusByRoleId(params);
			for(RoleMenu roleMenu : list){
				System.out.println(roleMenu.toString());
			}
			rsMap.put("tree", list);
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	@Override
	protected BaseService<Role> service() {
		return this.roleService;
	}

}
