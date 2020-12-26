package com.jo.sys.user.dao;

import java.util.List;
import java.util.Map;

import com.jo.base.dao.BaseDao;
import com.jo.sys.user.bean.User;
import com.jo.sys.user.bean.UserOrgan;
import com.jo.sys.user.bean.UserRole;

public interface UserDao extends BaseDao<User> {
	/**
	 * 给用户分配机构权限
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int changeUserOrganRights(Map<String, Object> params) throws Exception;
	/**
	 * 删除用户分配机构权限
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int removeOrgansByUserId(Map<String, Object> params) throws Exception;
	/**
	 * 根据用户id获取授权的机构
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	public List<UserOrgan> getOrgansByUserId(Map<String, Object> params)throws Exception;
	
	/**
	 * 给用户分配角色权限
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int changeUserRoleRights(Map<String, Object> params) throws Exception;
	/**
	 * 删除用户分配角色权限
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int removeRolesByUserId(Map<String, Object> params) throws Exception;
	/**
	 * 根据用户id获取授权的角色
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	public List<UserRole> getRolesByUserId(Map<String, Object> params)throws Exception;
}
