package com.jo.sys.role.service;

import java.util.List;
import java.util.Map;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.jo.base.service.BaseService;
import com.jo.sys.role.bean.Role;
import com.jo.sys.role.bean.RoleMenu;
@Service
public interface RoleService extends BaseService<Role> {

	/**
	 * 给角色分配菜单权限
	 * @param t
	 * @return
	 * @throws Exception
	 */
	 @CacheEvict(value="menus",allEntries=true)  
	public int changeRoleMenuRights(Map<String, Object> params) throws Exception;
	/**
	 * 删除角色分配菜单权限
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int removeMenusByRoleId(Map<String, Object> params) throws Exception;
	/**
	 * 根据角色id获取授权的菜单
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	public List<RoleMenu> getMenusByRoleId(Map<String, Object> params)throws Exception;
	
}
