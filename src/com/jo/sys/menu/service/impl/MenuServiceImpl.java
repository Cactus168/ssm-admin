package com.jo.sys.menu.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.sys.menu.bean.Menu;
import com.jo.sys.menu.bean.MenuButton;
import com.jo.sys.menu.bean.MenuDict;
import com.jo.sys.menu.dao.MenuDao;
import com.jo.sys.menu.service.MenuService;
@Service
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements MenuService {
	@Autowired
	public MenuDao menuDao;

	@Override
	public int changeMenuButtonRights(Map<String, Object> params) throws Exception {
		return this.menuDao.changeMenuButtonRights(params);
	}

	@Override
	public int removeButtonByMenuId(Map<String, Object> params) throws Exception {
		return this.menuDao.removeButtonByMenuId(params);
	}

	@Override
	public List<MenuButton> getButtonsByMenuId(String menuId) throws Exception {
		return this.menuDao.getButtonsByMenuId(menuId);
	}

	@Override
	public int changeMenuDictRights(Map<String, Object> params) throws Exception {
		return this.menuDao.changeMenuDictRights(params);
	}

	@Override
	public int removeDictsByMenuId(Map<String, Object> params) throws Exception {
		return this.menuDao.removeDictsByMenuId(params);
	}

	@Override
	public List<MenuDict> getDictsByMenuId(String menuId) throws Exception {
		return this.menuDao.getDictsByMenuId(menuId);
	}

	@Override
	public BaseDao<Menu> dao() throws Exception {
		return this.menuDao;
	}
	
}
