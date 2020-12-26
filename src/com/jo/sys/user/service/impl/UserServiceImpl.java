package com.jo.sys.user.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.user.bean.User;
import com.jo.sys.user.bean.UserOrgan;
import com.jo.sys.user.bean.UserRole;
import com.jo.sys.user.dao.UserDao;
import com.jo.sys.user.service.UserService;
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {
	@Autowired
	private UserDao userDao;
	
	@Override
	public int changeUserOrganRights(Map<String, Object> params) throws Exception {
		return this.userDao.changeUserOrganRights(params);
	}

	@Override
	public int removeOrgansByUserId(Map<String, Object> params) throws Exception {
		return this.userDao.removeOrgansByUserId(params);
	}

	@Override
	public List<UserOrgan> getOrgansByUserId(Map<String, Object> params) throws Exception {
		return this.userDao.getOrgansByUserId(params);
	}

	@Override
	public int changeUserRoleRights(Map<String, Object> params) throws Exception {
		return this.userDao.changeUserRoleRights(params);
	}

	@Override
	public int removeRolesByUserId(Map<String, Object> params) throws Exception {
		return this.userDao.removeRolesByUserId(params);
	}

	@Override
	public List<UserRole> getRolesByUserId(Map<String, Object> params) throws Exception {
		return this.userDao.getRolesByUserId(params);
	}
	
	@Override
	public BaseDao<User> dao() throws Exception {
		return this.userDao;
	}
}
