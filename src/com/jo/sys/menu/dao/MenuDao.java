package com.jo.sys.menu.dao;
import java.util.List;
import java.util.Map;

import com.jo.base.dao.BaseDao;
import com.jo.sys.menu.bean.Menu;
import com.jo.sys.menu.bean.MenuButton;
import com.jo.sys.menu.bean.MenuDict;

public interface MenuDao extends BaseDao<Menu> {
	
	/**
	 * 给分配菜单按钮树
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int changeMenuButtonRights(Map<String, Object> params) throws Exception;
	/**
	 * 删除菜单分配按钮
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int removeButtonByMenuId(Map<String, Object> params) throws Exception;
	/**
	 * 根据菜单id获取分配的按钮
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	public List<MenuButton> getButtonsByMenuId(String menuId)throws Exception;
	
	/**
	 * 给菜单分配编码
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int changeMenuDictRights(Map<String, Object> params) throws Exception;
	/**
	 * 删除菜单分配编码
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int removeDictsByMenuId(Map<String, Object> params) throws Exception;
	/**
	 * 根据菜单id获取分配的编码
	 * @author huixiaoke
	 * @date 2016-4-28
	 */
	public List<MenuDict> getDictsByMenuId(String menuId)throws Exception;
}
