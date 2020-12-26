package com.jo.sys.role.dao;

import java.util.List;
import java.util.Map;

import com.jo.base.dao.BaseDao;
import com.jo.sys.role.bean.Role;
import com.jo.sys.role.bean.RoleMenu;

public interface RoleDao extends BaseDao<Role> {
	/**
	 * 给角色分配菜单权限
	 * @param t
	 * @return
	 * @throws Exception
	 */
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
