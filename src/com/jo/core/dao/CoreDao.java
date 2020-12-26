package com.jo.core.dao;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jo.base.dao.BaseDao;
import com.jo.core.bean.CoreBean;
import com.jo.sys.button.bean.Button;
import com.jo.sys.dict.bean.Dict;
import com.jo.sys.menu.bean.Menu;
import com.jo.sys.user.bean.User;
@Repository("coreDao")
public interface CoreDao extends BaseDao<CoreBean> {

	public User loginCheck(CoreBean coreBean) throws Exception;
	
	/**
	 * 获取模块的菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Menu> getMenusByUserId(Map<String, Object> params) throws Exception;
	
	/**
	 * 获取模块匹配的编码
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Dict> getDictsByMenuId(Map<String, Object> params) throws Exception;
	
	/**
	 * 获取模块的按钮
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Button> getButtonsByMenuId(Map<String, Object> params) throws Exception;
	
	/**
	 * 获取获取收藏菜单数据
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getCollectMenus(Map<String, Object> params) throws Exception;
	
	/**
	 * 添加收藏菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public int addCollectMenu(Map<String, Object> params) throws Exception;
	
	/**
	 * 删除收藏菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public int removeCollectMenu(Map<String, Object> params) throws Exception;
}
