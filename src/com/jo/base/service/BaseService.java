package com.jo.base.service;
import java.util.List;
import java.util.Map;
/**
 * service基类
 * 该类主要对dao层进行衔接数据的增删改查基础操作的方法
 * @author Cactus
 * @param <T>
 */
public interface BaseService<T> {

	/**
	 * 增加数据
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int add(T t) throws Exception;
	/**
	 * 删除数据
	 * @param ids
	 * @return
	 * @throws Exception
	 */
	public int remove(Map<String, Object> params) throws Exception;
	/***
	 * 修改数据
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int modify(T t) throws Exception;
	/**
	 * 获取数据条数
	 * @param t
	 * @return
	 * @throws Exception
	 */
	public int count(Map<String, Object> params) throws Exception;
	/**
	 * 根据id获取对象
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public T queryById(Map<String, Object> params) throws Exception;
	/**
	 * 模糊获取数据
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<T> queryByList(Map<String, Object> params) throws Exception;
	
}
