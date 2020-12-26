package com.jo.sys.menu.controller;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jo.base.controller.BaseController;
import com.jo.base.service.BaseService;
import com.jo.sys.menu.bean.Menu;
import com.jo.sys.menu.service.MenuService;
@Controller
@RequestMapping({"sys/menu"})
public class MenuController extends BaseController<Menu> {

	@Autowired
	public MenuService menuService;
	/**
	 * 
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	@ResponseBody
	@RequestMapping({"/changeMenuButtonRights.shtml"})
	public Map<String, Object> changeMenuButtonRights(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			if(this.menuService.removeButtonByMenuId(params) >= 0){
				int isSuccess = this.menuService.changeMenuButtonRights(params);
				if(isSuccess >= 0){
					rsMap.put("success", Boolean.valueOf(true));
				}else{
					rsMap.put("success", Boolean.valueOf(false));
					rsMap.put("message", "分配失败！");
				}
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "分配失败！");
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
	@RequestMapping({"/getButtonsByMenuId.shtml"})
	public Map<String, Object> getButtonsByMenuId(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			rsMap.put("tree", this.menuService.getButtonsByMenuId(params.get("menuId").toString()));
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
	@RequestMapping({"/changeMenuDictRights.shtml"})
	public Map<String, Object> changeMenuDictRights(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			if(this.menuService.removeDictsByMenuId(params) >= 0){
				int isSuccess = this.menuService.changeMenuDictRights(params);
				if(isSuccess >= 0){
					rsMap.put("success", Boolean.valueOf(true));
				}else{
					rsMap.put("success", Boolean.valueOf(false));
					rsMap.put("message", "分配失败！");
				}
			}else{
				rsMap.put("success", Boolean.valueOf(false));
				rsMap.put("message", "分配失败！");
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
	@RequestMapping({"/getDictsByMenuId.shtml"})
	public Map<String, Object> getDictsByMenuId(HttpServletRequest request){
		Map<String, Object> rsMap = new HashMap<String, Object>();
		try {
			Map<String, Object> params = this.getParams(request);
			rsMap.put("tree", this.menuService.getDictsByMenuId(params.get("menuId").toString()));
			rsMap.put("success", Boolean.valueOf(true));
		} catch (Exception e) {
			rsMap.put("success", Boolean.valueOf(false));
			rsMap.put("message", e.getMessage());
			e.printStackTrace();
		}
		return rsMap;
	}
	
	@Override
	protected BaseService<Menu> service() {
		return menuService;
	}

}
