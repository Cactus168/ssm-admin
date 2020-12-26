package com.jo.sys.role.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.role.bean.Role;
import com.jo.sys.role.bean.RoleMenu;
import com.jo.sys.role.dao.RoleDao;
import com.jo.sys.role.service.RoleService;
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {
	@Autowired
	private RoleDao roleDao;
	
	@Override
	public int changeRoleMenuRights(Map<String, Object> params)throws Exception {
		return this.roleDao.changeRoleMenuRights(params);
	}

	@Override
	public List<RoleMenu> getMenusByRoleId(Map<String, Object> params) throws Exception {
		return this.roleDao.getMenusByRoleId(params);
	}
	
	@Override
	public int removeMenusByRoleId(Map<String, Object> params) throws Exception {
		return this.roleDao.removeMenusByRoleId(params);
	}
	
	@Override
	public BaseDao<Role> dao() throws Exception {
		return this.roleDao;
	}
	
}
