package com.jo.core.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.impl.BaseServiceImpl;
import com.jo.core.bean.CoreBean;
import com.jo.core.dao.CoreDao;
import com.jo.core.service.CoreService;
import com.jo.sys.button.bean.Button;
import com.jo.sys.dict.bean.Dict;
import com.jo.sys.menu.bean.Menu;
import com.jo.sys.user.bean.User;
@Service
public class CoreServiceImpl extends BaseServiceImpl<CoreBean> implements CoreService {

	@Autowired
	public CoreDao coreDao;

	@Override
	public User loginCheck(CoreBean coreBean) throws Exception {
		return this.coreDao.loginCheck(coreBean);
	}
	/**
	 * 获取模块的菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Menu> getMenusByUserId(Map<String, Object> params) throws Exception{
		return this.coreDao.getMenusByUserId(params);
	}
	
	/**
	 * 获取模块匹配的编码
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Dict> getDictsByMenuId(Map<String, Object> params) throws Exception{
		return this.coreDao.getDictsByMenuId(params);
	}
	
	/**
	 * 获取模块的按钮
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Button> getButtonsByMenuId(Map<String, Object> params) throws Exception{
		return this.coreDao.getButtonsByMenuId(params);
	}
	
	/**
	 * 获取获取收藏菜单数据
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<Map<String, Object>> getCollectMenus(Map<String, Object> params) throws Exception{
		return this.coreDao.getCollectMenus(params);
	}
	
	/**
	 * 添加收藏菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public int addCollectMenu(Map<String, Object> params) throws Exception{
		return this.coreDao.addCollectMenu(params);
	}
	
	/**
	 * 删除收藏菜单
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public int removeCollectMenu(Map<String, Object> params) throws Exception{
		return this.coreDao.removeCollectMenu(params);
	}
	
	@Override
	public BaseDao<CoreBean> dao() throws Exception {
		return this.coreDao;
	}

}
