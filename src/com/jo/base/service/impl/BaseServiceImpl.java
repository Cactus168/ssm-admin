package com.jo.base.service.impl;

import java.util.List;
import java.util.Map;

import com.jo.base.dao.BaseDao;
import com.jo.base.service.BaseService;
/**
 * service实现基类
 * 该类主要对dao层进行衔接数据的增删改查基础操作的方法
 * @author Cactus
 * @param <T>
 */
public abstract class BaseServiceImpl<T> implements BaseService<T> {
	/**
	 * 增加数据
	 * @param t
	 * @return
	 * @throws Exception
	 */
	@Override
	public int add(T t) throws Exception {
		return this.dao().add(t);
	}
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	@Override
	public int remove(Map<String, Object> params) throws Exception {
		return this.dao().remove(params);
	}
	/***
	 * 修改数据
	 * @param t
	 * @return
	 * @throws Exception
	 */
	@Override
	public int modify(T t) throws Exception {
		return this.dao().modify(t);
	}
	/**
	 * 获取数据条数
	 * @param t
	 * @return
	 * @throws Exception
	 */
	@Override
	public int count(Map<String, Object> params) throws Exception {
		return this.dao().count(params);
	}
	/**
	 * 根据条件获取对象
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@Override
	public T queryById(Map<String, Object> params) throws Exception {
		return this.dao().queryById(params);
	}
	/**
	 * 模糊获取数据
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<T> queryByList(Map<String, Object> params) throws Exception {
		return this.dao().queryByList(params);
	}
	/**
	 * 获取dao类
	 * @return
	 * @throws Exception
	 */
	public abstract BaseDao<T> dao() throws Exception;
}
